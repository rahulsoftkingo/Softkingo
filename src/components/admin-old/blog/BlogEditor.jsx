// src/components/admin/blog/BlogEditor.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink, FaImage, FaVideo, FaCode, FaQuoteRight, FaUndo, FaRedo, FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import slugify from 'slugify';
import 'react-quill-new/dist/quill.snow.css';


const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" /> }
);

export default function BlogEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [slugError, setSlugError] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
          if (data.length > 0) {
            setCategoryId(data[0].id.toString());
          }
        } else {
          console.error('Failed to fetch categories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !slug) {
      const generatedSlug = slugify(title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      setSlug(generatedSlug);
      setMetaTitle(title);
    }
  }, [title, slug]);

  // Handle tag input
  const handleTagKeyDown = (e) => {
    if (['Enter', ',', 'Tab'].includes(e.key)) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle slug change with validation
  const handleSlugChange = (e) => {
    const value = e.target.value;
    const slugified = slugify(value, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    setSlug(slugified);
    setSlugError('');
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsSaving(true);

      try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        // Upload image to server
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        // FIX: Only parse response once
        const data = await response.json();

        if (response.ok) {
          setFeaturedImage(data.url);
        } else {
          console.error('Image upload failed:', data.message);
          alert('Image upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        setIsSaving(true);

        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newCategory.trim() })
        });

        const data = await response.json();

        if (response.ok) {
          setCategories([...categories, data]);
          setCategoryId(data.id);
          setShowNewCategory(false);
          setNewCategory('');
        } else {
          console.error('Failed to add category:', data.message);
          alert('Failed to add category. Please try again.');
        }
      } catch (error) {
        console.error('Error adding category:', error);
        alert('An error occurred while adding the category.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Save blog post
  const handleSave = async () => {
    // Validate required fields
    // if (!title || !content || !categoryId) {
    //   alert('Please fill in all required fields');
    //   return;
    // }
    //    if (!content) {
    //   alert('Please fill in all required fields');
    //   return;
    // }

    //    if (!title ) {
    //   alert('Please fill in all required fields');
    //   return;
    // }

    //    if (!categoryId) {
    //   alert('Please fill in all required fields');
    //   return;
    // }

    const missing = [];
    if (!title.trim()) missing.push('Title');
    if (content.trim() === '' ||
      content === '<p><br></p>') missing.push('Content');
    if (!categoryId) missing.push('Category');

    if (missing.length) {
      alert('Please fill in the following: ' + missing.join(', '));
      return;
    }
    // Validate slug
    if (!slug) {
      setSlugError('Slug is required');
      return;
    }

    // Check slug uniqueness
    try {
      setIsSaving(true);
      setSlugError('');

      const slugCheck = await fetch(`/api/blogs/check-slug?slug=${slug}`);
      const slugData = await slugCheck.json();

      if (!slugCheck.ok || slugData.exists) {
        setSlugError('This slug is already in use. Please choose another.');
        setIsSaving(false);
        return;
      }

      // Prepare blog data
      const blogData = {
        title,
        slug,
        content,
        excerpt,
        categoryId,
        tags,
        featuredImage,
        metaTitle: metaTitle || title,
        metaDescription,
        metaKeywords: metaKeywords.split(',').map(k => k.trim()).filter(k => k),
        status: 'draft'
      };

      // Save to database
      const saveResponse = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      });

      const saveData = await saveResponse.json();

      if (saveResponse.ok) {
        alert('Blog post saved successfully!');
        router.push(`/admin/blog/${saveData.slug}`);
      } else {
        console.error('Failed to save blog:', saveData.message);
        alert('Failed to save blog. Please try again.');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('An error occurred while saving the blog.');
    } finally {
      setIsSaving(false);
    }
  };

  // Quill editor modules
  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //     ['bold', 'italic', 'underline', 'strike'],
  //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //     ['link', 'image', 'video'],
  //     ['blockquote', 'code-block'],
  //     ['clean']
  //   ],
  //   clipboard: {
  //     matchVisual: false,
  //   }
  // };

  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike',
  //   'list', 'bullet',
  //   'link', 'image', 'video',
  //   'blockquote', 'code-block'
  // ];

  const modules = {
    toolbar: [
      // Font family selector
      [{ 'font': [] }],
      // Font size dropdown: small, normal, large, huge
      [{ 'size': ['small', false, 'large', 'huge'] }],
      // Text align: left, center, right, justify
      [{ 'align': [] }],
      // Header level dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // Inline styles
      ['bold', 'italic', 'underline', 'strike'],
      // Lists
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // Links, images, video
      ['link', 'image', 'video'],
      // Color pickers
      [{ 'color': [] }, { 'background': [] }],
      // Blocks
      ['blockquote', 'code-block'],
      // Clean all formatting
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'font', 'size', 'align', 'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image', 'video',
    'color', 'background',
    'blockquote', 'code-block',
  ];
  return (
    <div className="w-full md:max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Blog Post</h1>
        <p className="text-gray-600">Fill in the details below to create a new blog post</p>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
        <div className="flex items-center">
          {featuredImage ? (
            <div className="relative w-full">
              <img
                src={featuredImage}
                alt="Featured"
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />

              <button
                onClick={() => setFeaturedImage('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
              </div>
              {/* <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              /> */}
              <input
                type="file"
                className="hidden"
                //  accept="image/*"
                onClick={e => {
                  // clear out the old file so onChange will fire even if same file is re-selected
                  e.currentTarget.value = null;
                }}
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          placeholder="Enter a catchy title..."
          required
        />
      </div>

      {/* Slug */}
      <div className="mb-6">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
          URL Slug *
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            yourblog.com/blog/
          </span>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={handleSlugChange}
            className={`flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${slugError ? 'border-red-500' : ''
              }`}
            placeholder="auto-generated-slug"
            required
          />
        </div>
        {slugError && (
          <p className="mt-1 text-sm text-red-500">{slugError}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          This will be the permanent URL for your blog post
        </p>
      </div>

      {/* SEO Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
            SEO Title
          </label>
          <input
            type="text"
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Optimized title for search engines"
          />
          <p className="mt-1 text-sm text-gray-500">
            {metaTitle.length}/60 characters
          </p>
        </div>

        <div>
          <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-2">
            SEO Keywords
          </label>
          <input
            type="text"
            id="metaKeywords"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="mt-1 text-sm text-gray-500">
            Comma-separated list of keywords
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
          SEO Description
        </label>
        <textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          placeholder="Description that will appear in search results"
        ></textarea>
        <p className="mt-1 text-sm text-gray-500">
          {metaDescription.length}/160 characters
        </p>
      </div>

      {/* Excerpt */}
      <div className="mb-6">
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          placeholder="A short summary of your post..."
        ></textarea>
        <p className="mt-1 text-sm text-gray-500">{excerpt.length}/255 characters</p>
      </div>

      {/* Rich Text Editor */}
      <div className="mb-6 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="bg-white rounded-lg border border-gray-300 focus-within:border-sky-500 min-h64"
          placeholder="Start writing your blog post here..."
        />
      </div>

      {/* Category and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>

          {showNewCategory ? (
            <div className="flex">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Enter new category"
              />
              <button
                onClick={handleAddCategory}
                className="bg-sky-600 text-white px-4 py-3 rounded-r-lg hover:bg-sky-700"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <div className="flex">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                onClick={() => setShowNewCategory(true)}
                className="bg-gray-200 text-gray-700 px-4 py-3 rounded-r-lg hover:bg-gray-300"
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[52px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-sky-100 text-sky-800 text-sm px-3 py-1 rounded-full flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-sky-600 hover:text-sky-800"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={addTag}
              className="flex-1 min-w-[100px] px-2 py-1 focus:outline-none"
              placeholder="Add tags..."
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Press Enter, Tab or comma to add tags</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center px-6 py-3 rounded-lg text-white font-medium ${isSaving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-sky-600 hover:bg-sky-700'
            }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="mr-2" />
              Save Post
            </>
          )}
        </button>
      </div>
    </div>
  );
}