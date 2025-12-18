'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  FileText,
  Image as ImageIcon,
  Settings2,
  Type,
  ArrowLeft,
} from 'lucide-react';

const AdvancedTipTapEditor = dynamic(
  () => import('../../AdvancedTipTapEditor'),
  { ssr: false },
);

const TABS = ['basics', 'content', 'seo', 'media'];

export default function BlogEditPageClient({ idParam }) {
  const router = useRouter();
  const { data: session } = useSession();
//   const isNew = !idParam;
const isNew = idParam == null;

  const [activeTab, setActiveTab] = useState('basics');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [form, setForm] = useState({
    type: 'blog',
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    featured: false,
    pinned: false,
    readTimeMinutes: '',
    categoryId: '',
    tagNames: '',
    contentJson: '',
    seoTitle: '',
    seoDescription: '',
    seoImage: '',
    thumbnail: '',
    heroImage: '',
  });

  const roles = session?.user?.roles || [];
  const canEdit = roles.some((r) =>
    ['admin', 'manager', 'writer'].includes(r),
  );

  // Load categories + tags
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch('/api/admin/blog-categories'),
          fetch('/api/admin/blog-tags'),
        ]);
        if (catRes.ok) setCategories(await catRes.json());
        if (tagRes.ok) setAllTags(await tagRes.json());
      } catch (e) {
        console.error('meta load error', e);
      }
    };
    loadMeta();
  }, []);

  // Load existing post for edit
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }
    const load = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/blog/${idParam}`);
      if (!res.ok) {
        setError('Post not found.');
        setLoading(false);
        return;
      }
      const post = await res.json();

      setForm({
        type: post.type || 'blog',
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        status: post.status || 'draft',
        featured: !!post.featured,
        pinned: !!post.pinned,
        readTimeMinutes: post.readTimeMinutes || '',
        categoryId: post.categoryId || '',
        tagNames:
          (post.tags || [])
            .map((t) => t.tag?.name)
            .filter(Boolean)
            .join(', ') || '',
        contentJson: post.contentJson || '',
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || '',
        seoImage: post.seoImage || '',
        thumbnail: post.thumbnail || '',
        heroImage: post.heroImage || '',
      });
      setLoading(false);
    };
    load();
  }, [idParam, isNew]);

  if (!canEdit) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          You are not authorized to manage blog posts.
        </p>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError('');
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateContentJson = () => {
    if (!form.contentJson.trim()) return null;
    try {
      JSON.parse(form.contentJson);
      return null;
    } catch {
      return 'Content JSON invalid.';
    }
  };

  const buildTagIds = () => {
    const names = (form.tagNames || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!names.length) return [];
    const ids = [];
    names.forEach((name) => {
      const existing = allTags.find(
        (t) => t.name.toLowerCase() === name.toLowerCase(),
      );
      if (existing) ids.push(existing.id);
    });
    return ids;
  };

  const handleSave = async (publish = false) => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug required.');
      setActiveTab('basics');
      return;
    }
    const contentErr = validateContentJson();
    if (contentErr) {
      setError(contentErr);
      setActiveTab('content');
      return;
    }

    setSaving(true);
    setError('');

    const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${idParam}`;
    const method = isNew ? 'POST' : 'PATCH';

    const payload = {
      type: form.type,
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      status: publish ? 'published' : form.status,
      featured: !!form.featured,
      pinned: !!form.pinned,
      thumbnail: form.thumbnail || null,
      heroImage: form.heroImage || null,
      readTimeMinutes: form.readTimeMinutes
        ? Number(form.readTimeMinutes)
        : null,
      seoTitle: form.seoTitle || null,
      seoDescription: form.seoDescription || null,
      seoImage: form.seoImage || null,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      contentJson: form.contentJson || null,
      tagIds: buildTagIds(),
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save.');
      setSaving(false);
      return;
    }

    const saved = await res.json();
    setSaving(false);
    if (isNew) {
      router.replace(`/admin/blog/edit/${saved.id}`);
    }
    router.push('/admin/blog');

  };

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading post…</p>
      </main>
    );
  }

  const wordCount = (() => {
    try {
      const doc = JSON.parse(form.contentJson || '{}');
      const text = JSON.stringify(doc);
      return text.split(/\s+/).filter(Boolean).length;
    } catch {
      return 0;
    }
  })();

  return (
    <main className="space-y-5">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push('/admin/blog')}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white h-8 w-8 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
                {isNew ? 'Create blog post' : 'Edit blog post'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Blog, featured, press releases, media, articles, whitepapers,
                podcasts — sab yahin se manage honge.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Words: {wordCount}</span>
              <span className="hidden sm:inline">Type: {form.type}</span>
              {!isNew && (
                <span className="hidden sm:inline">ID: #{idParam}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save draft'}
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={saving}
                className="rounded-full bg-sky-600 px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-sky-500 disabled:bg-sky-300"
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-1.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const icon =
              tab === 'basics'
                ? <Type className="h-3.5 w-3.5" />
                : tab === 'content'
                ? <FileText className="h-3.5 w-3.5" />
                : tab === 'seo'
                ? <Settings2 className="h-3.5 w-3.5" />
                : <ImageIcon className="h-3.5 w-3.5" />;
            const label =
              tab === 'basics'
                ? 'Basics'
                : tab === 'content'
                ? 'Content'
                : tab === 'seo'
                ? 'SEO'
                : 'Media';
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Tab content card */}
      <section className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5 space-y-4">
        {activeTab === 'basics' && (
          <BasicsTab
            form={form}
            onChange={handleChange}
            categories={categories}
          />
        )}
        {activeTab === 'content' && (
          <ContentTab form={form} onChange={handleChange} />
        )}
        {activeTab === 'seo' && (
          <SeoTab form={form} onChange={handleChange} />
        )}
        {activeTab === 'media' && (
          <MediaTab form={form} onChange={handleChange} />
        )}

        {error && (
          <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

/* Tabs */

function BasicsTab({ form, onChange, categories }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="blog">Blog</option>
            <option value="featured">Featured</option>
            <option value="press-release">Press release</option>
            <option value="media">Media</option>
            <option value="article">Article</option>
            <option value="whitepaper">Whitepaper</option>
            <option value="podcast">Podcast</option>
          </select>
        </div>
        {/* Status */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Category
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">None</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Title / Slug / Excerpt */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">
          Slug
        </label>
        <input
          name="slug"
          value={form.slug}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="my-first-post"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={onChange}
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Short summary used on cards and lists."
        />
      </div>

      {/* Flags / read time / tags */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={onChange}
            className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span>Featured</span>
        </label>
        <label className="inline-flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            name="pinned"
            checked={form.pinned}
            onChange={onChange}
            className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span>Pinned</span>
        </label>
        <div className="flex items-center gap-2 ml-auto text-[11px] text-slate-500">
          <span>Read time (min)</span>
          <input
            name="readTimeMinutes"
            value={form.readTimeMinutes}
            onChange={onChange}
            type="number"
            min="0"
            className="w-16 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        <label className="block text-xs font-medium text-slate-700">
          Tags (comma separated)
        </label>
        <input
          name="tagNames"
          value={form.tagNames}
          onChange={onChange}
          placeholder="Next.js, Prisma, React"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
    </div>
  );
}

function ContentTab({ form, onChange }) {
  const handleEditorChange = (jsonString) => {
    onChange({
      target: { name: 'contentJson', value: jsonString },
    });
  };

  const wordCount = (() => {
    try {
      const doc = JSON.parse(form.contentJson || '{}');
      const text = JSON.stringify(doc);
      return text.split(/\s+/).filter(Boolean).length;
    } catch {
      return 0;
    }
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1.3fr)] gap-6">
      <div className="space-y-2">
        <p className="text-[11px] text-slate-500">
          Write your full article here. Tables, lists, images, headings sab
          support hai.
        </p>
        <div className="rounded-2xl bg-slate-50/80 p-2 sm:p-3">
          <AdvancedTipTapEditor
            value={form.contentJson}
            onChange={handleEditorChange}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 space-y-1">
          <p className="text-[11px] font-semibold text-slate-600">
            Content stats
          </p>
          <p className="text-[11px] text-slate-500">
            Approx. {wordCount} words
          </p>
        </div>

        <details className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2">
          <summary className="cursor-pointer text-[11px] font-semibold text-slate-600">
            Raw JSON (advanced)
          </summary>
          <textarea
            name="contentJson"
            value={form.contentJson}
            onChange={onChange}
            rows={8}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-mono leading-snug focus:outline-none focus:ring-2 focus:ring-sky-500"
            spellCheck={false}
          />
        </details>
      </div>
    </div>
  );
}

function SeoTab({ form, onChange }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-6">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            SEO title
          </label>
          <input
            name="seoTitle"
            value={form.seoTitle}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            SEO description
          </label>
          <textarea
            name="seoDescription"
            value={form.seoDescription}
            onChange={onChange}
            rows={3}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>
      <div>
        <ImageField
          label="SEO / OG image"
          name="seoImage"
          value={form.seoImage}
          onChange={onChange}
          placeholder="/images/blog/og.png"
        />
      </div>
    </div>
  );
}

function MediaTab({ form, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        value={form.thumbnail}
        onChange={onChange}
        placeholder="/images/blog/thumb.png"
      />
      <ImageField
        label="Hero image"
        name="heroImage"
        value={form.heroImage}
        onChange={onChange}
        placeholder="/images/blog/hero.png"
      />
    </div>
  );
}

/* ImageField */

function ImageField({ label, name, value, onChange, placeholder }) {
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) {
        console.error('Upload failed');
        return;
      }
      const data = await res.json();
      const url = data.url;
      onChange({ target: { name, value: url } });
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder={placeholder}
      />
      <div className="flex items-center gap-3 mt-0.5">
        <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
          <span className="rounded-full border border-slate-300 px-2 py-0.5 bg-white">
            Upload
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <span>Choose image</span>
        </label>

        {value && (
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-md border border-slate-200 overflow-hidden bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="preview"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
              {value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
