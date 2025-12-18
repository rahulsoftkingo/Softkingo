'use client';

import { useEffect, useState } from 'react';

// Image field with upload + preview
function ImageField({ label, name, value, onChange, placeholder }) {
  const [previewError, setPreviewError] = useState(false);

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
      setPreviewError(false);
      onChange({ target: { name, value: url } });
    } finally {
      e.target.value = '';
    }
  };

  const showPreview = value && !previewError;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={(e) => {
          setPreviewError(false);
          onChange(e);
        }}
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

        {showPreview ? (
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-md border border-slate-200 overflow-hidden bg-slate-50">
              <img
                src={value}
                alt="preview"
                className="h-full w-full object-cover"
                onError={() => setPreviewError(true)}
              />
            </div>
            <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
              {value}
            </span>
          </div>
        ) : value ? (
          <span className="text-[11px] text-rose-500">
            Preview not available
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function BlogDrawer({ open, onClose, onSaved, post }) {
  const isEdit = !!post;

  const [form, setForm] = useState({
    type: 'blog',
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    featured: false,
    pinned: false,
    thumbnail: '',
    heroImage: '',
    readTimeMinutes: '',
    categoryId: '',
    tagNames: '', // comma separated names
    contentJson: '',
    seoTitle: '',
    seoDescription: '',
    seoImage: '',
  });

  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Load categories + tags for selects
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch('/api/admin/blog-categories'),
          fetch('/api/admin/blog-tags'),
        ]);

        if (catRes.ok) {
          const cats = await catRes.json();
          setCategories(cats);
        }
        if (tagRes.ok) {
          const tags = await tagRes.json();
          setAllTags(tags);
        }
      } catch (e) {
        console.error('Failed to load blog meta', e);
      }
    };
    loadMeta();
  }, []);

  // Map existing post -> form
  useEffect(() => {
    if (post) {
      setForm({
        type: post.type || 'blog',
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        status: post.status || 'draft',
        featured: !!post.featured,
        pinned: !!post.pinned,
        thumbnail: post.thumbnail || '',
        heroImage: post.heroImage || '',
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
      });
    } else {
      setForm({
        type: 'blog',
        title: '',
        slug: '',
        excerpt: '',
        status: 'draft',
        featured: false,
        pinned: false,
        thumbnail: '',
        heroImage: '',
        readTimeMinutes: '',
        categoryId: '',
        tagNames: '',
        contentJson: '',
        seoTitle: '',
        seoDescription: '',
        seoImage: '',
      });
    }
    setError('');
  }, [post]);

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
      return 'Content JSON is invalid.';
    }
  };

  const buildTagIds = () => {
    const names = (form.tagNames || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (names.length === 0) return [];

    // Try to match existing tags; new tag creation ka route later add kar sakte ho
    const ids = [];
    names.forEach((name) => {
      const existing = allTags.find(
        (t) => t.name.toLowerCase() === name.toLowerCase(),
      );
      if (existing) ids.push(existing.id);
    });
    return ids;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }

    const contentErr = validateContentJson();
    if (contentErr) {
      setError(contentErr);
      return;
    }

    setSaving(true);
    setError('');

    const url = isEdit
      ? `/api/admin/blog/${post.id}`
      : '/api/admin/blog';
    const method = isEdit ? 'PATCH' : 'POST';

    const payload = {
      type: form.type,
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      status: form.status,
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
      setError(data.message || 'Failed to save post.');
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="flex-1 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="w-full max-w-xl bg-white h-full shadow-[0_18px_45px_rgba(15,23,42,0.25)] p-5 sm:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {isEdit ? 'Edit post' : 'New post'}
            </h2>
            <p className="text-xs text-slate-500">
              Manage blog posts and insights content.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pb-6">
          {/* Basics */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Basics
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="blog">Blog</option>
                  <option value="insight">Insight</option>
                  <option value="feature">Feature</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Short summary shown in listing pages."
              />
            </div>
            <div className="flex items-center gap-4 pt-1">
              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>Featured</span>
              </label>
              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  name="pinned"
                  checked={form.pinned}
                  onChange={handleChange}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>Pinned</span>
              </label>
              <div className="flex-1" />
              <div className="space-x-2 text-[11px] text-slate-500">
                <span>Read time (min):</span>
                <input
                  name="readTimeMinutes"
                  value={form.readTimeMinutes}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="w-16 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Media
            </p>
            <ImageField
              label="Thumbnail"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="/images/blog/thumb.png"
            />
            <ImageField
              label="Hero image"
              name="heroImage"
              value={form.heroImage}
              onChange={handleChange}
              placeholder="/images/blog/hero.png"
            />
          </section>

          {/* Category & tags */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Category & tags
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Category
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Tags (comma separated)
              </label>
              <input
                name="tagNames"
                value={form.tagNames}
                onChange={handleChange}
                placeholder="Next.js, Prisma, React"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-[11px] text-slate-400">
                Existing tags will be linked by name. New tag creation API
                add kar sakte ho alag se.
              </p>
            </div>
          </section>

          {/* Content JSON */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Content JSON
            </p>
            <textarea
              name="contentJson"
              value={form.contentJson}
              onChange={handleChange}
              rows={10}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-mono leading-snug focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder={`{\n  "sections": [\n    { "type": "hero", "title": "...", "subtitle": "..." },\n    { "type": "paragraph", "text": "..." }\n  ]\n}`}
              spellCheck={false}
            />
            <p className="text-[11px] text-slate-400">
              Should match the structure your blog front‑end expects (e.g.
              sections array). Agar chaho to baad me visual editor add kar
              sakte ho.
            </p>
          </section>

          {/* SEO */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              SEO
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                SEO title
              </label>
              <input
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
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
                onChange={handleChange}
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <ImageField
              label="SEO / OG image"
              name="seoImage"
              value={form.seoImage}
              onChange={handleChange}
              placeholder="/images/blog/og.png"
            />
          </section>

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between pt-1 pb-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 disabled:bg-sky-300"
            >
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
