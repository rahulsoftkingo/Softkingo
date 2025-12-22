// src/app/(admin)/admin/blog/edit/BlogEditPageClient.jsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  FileText,
  Image as ImageIcon,
  Settings2,
  Type,
  ArrowLeft,
  Link as LinkIcon,
  X,
  Eye,
} from 'lucide-react';

const AdvancedTipTapEditor = dynamic(
  () => import('../../AdvancedTipTapEditor'),
  { ssr: false },
);

const TABS = ['basics', 'content', 'seo', 'media'];

// Simple slugify (supports basic English + spaces -> hyphen)
function slugify(str = '') {
  return str
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const SITE_BASE =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://softkingo.com';

export default function BlogEditPageClient({ idParam }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isNew = idParam == null;

  const [activeTab, setActiveTab] = useState('basics');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // localStorage draft key
  const draftKey = useMemo(
    () => (isNew ? 'blog-draft:new' : `blog-draft:${idParam}`),
    [isNew, idParam],
  );

  const [form, setForm] = useState({
    type: 'blog',
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    featured: false,
    pinned: false,
    placements: ['blog'],
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

  // Load from API OR local draft
  useEffect(() => {
    const load = async () => {
      // 1) Try localStorage draft first (autosave)
      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem(draftKey);
        if (raw) {
          try {
            const draft = JSON.parse(raw);
            setForm((prev) => ({ ...prev, ...draft }));
            setLoading(false);
          } catch {
            window.localStorage.removeItem(draftKey);
          }
        }
      }

      if (isNew) {
        setLoading(false);
        return;
      }

      // 2) Load from API
      setLoading(true);
      const res = await fetch(`/api/admin/blog/${idParam}`);
      if (!res.ok) {
        setError('Post not found.');
        setLoading(false);
        return;
      }
      const post = await res.json();

      setForm((prev) => ({
        ...prev,
        type: post.type || 'blog',
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        status: post.status || 'draft',
        featured: !!post.featured,
        pinned: !!post.pinned,
        placements: buildPlacementsFromPost(post),
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
      }));
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idParam, isNew]);

  // Autosave to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const toSave = { ...form };
    const t = setTimeout(() => {
      window.localStorage.setItem(draftKey, JSON.stringify(toSave));
    }, 400);
    return () => clearTimeout(t);
  }, [draftKey, form]);

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
    setForm((prev) => {
      let next = { ...prev };

      // ✅ Auto-generate slug from title (always editable)
      if (name === 'title') {
        next.slug = slugify(value);
      }

      if (name === 'placements') {
        const v = e.target.value;
        const exists = prev.placements.includes(v);
        next.placements = exists
          ? prev.placements.filter((p) => p !== v)
          : [...prev.placements, v];
        return next;
      }

      next[name] = type === 'checkbox' ? checked : value;
      return next;
    });
  };

  const validateContentJson = () => {
    if (!form.contentJson?.trim()) return null;
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

  const computedUrl = useMemo(() => {
    const typeSegment = form.type || 'blog';
    const slugSegment = form.slug || 'your-slug';
    return `${SITE_BASE}/${typeSegment}/${slugSegment}`;
  }, [form.type, form.slug]);

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
      placements: form.placements,
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

    // clear local draft
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(draftKey);
    }

    if (isNew) {
      router.replace(`/admin/blog/edit/${saved.id}`);
    } else {
      router.push('/admin/blog');
    }
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
    <main className="flex flex-col h-screen overflow-hidden">
      {/* ✅ Fixed Header (no scroll) */}
      <header className="flex-shrink-0 bg-white border-b border-slate-200 p-4 space-y-3">
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
                Blog, featured, press releases, media — manage everything
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Words: {wordCount}</span>
              {!isNew && <span className="hidden sm:inline">ID: #{idParam}</span>}
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

        {/* URL preview */}
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[11px] text-slate-600 max-w-full">
          <LinkIcon className="h-3.5 w-3.5 text-sky-500" />
          <span className="truncate">{computedUrl}</span>
        </div>

        {/* Tabs */}
        <nav className="flex flex-wrap gap-2 pb-1">
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

      {/* ✅ Scrollable Content (hidden scrollbar) */}
      <section className="flex-1 overflow-y-auto hide-scrollbar bg-slate-50">
        <div className="max-w-7xl mx-auto p-4">
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5 space-y-4">
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
          </div>
        </div>
      </section>

      {/* ✅ Add global scrollbar hide CSS */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}

/* Helpers */
function buildPlacementsFromPost(post) {
  const placements = new Set();
  placements.add(post.type || 'blog');
  if (post.featured) placements.add('featured');
  if (post.type === 'media') placements.add('media');
  return Array.from(placements);
}

/* Tabs */

function BasicsTab({ form, onChange, categories }) {
  const allPlacements = [
    { value: 'blog', label: 'Blog Listing' },
    { value: 'featured', label: 'Featured Section' },
    { value: 'press-releases', label: 'Press Releases' },
    { value: 'guides', label: 'Guides' },
    { value: 'media-coverage', label: 'Media Coverage' },
    { value: 'articles', label: 'Articles' },
    { value: 'whitepapers', label: 'Whitepapers' },
    { value: 'podcasts', label: 'Podcasts' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Primary type
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
            <option value="guides">Guides</option>
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

      {/* Placements multi-select */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
          Show this post in
        </label>
        <p className="text-xs text-slate-500 mb-2">Select one or more sections where this post will appear</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allPlacements.map((p) => (
            <label
              key={p.value}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                form.placements.includes(p.value)
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                name="placements"
                value={p.value}
                checked={form.placements.includes(p.value)}
                onChange={onChange}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-xs font-medium text-slate-700">{p.label}</span>
            </label>
          ))}
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
      
      {/* ✅ Slug always editable, auto-generated */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700 flex items-center justify-between">
          <span>Slug</span>
          <span className="text-[10px] text-sky-600 font-medium">
            Auto-generated from title
          </span>
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
    <div className="space-y-3">
      <p className="text-[11px] text-slate-500">
        Write your full article here. Tables, lists, images, headings sab support hai.
      </p>
      {/* FULL WIDTH editor */}
      <div className="rounded-2xl bg-slate-50/80p-2sm:p-3">
        <AdvancedTipTapEditor
          value={form.contentJson}
          onChange={handleEditorChange}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Approx. {wordCount} words</span>
        <span className="italic">Autosave draft enabled (local only)</span>
      </div>

      {/* Optional raw JSON for debug */}
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
          placeholder="/uploads/blog/og.png"
        />
      </div>
    </div>
  );
}

function MediaTab({ form, onChange }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        value={form.thumbnail}
        onChange={onChange}
        placeholder="/uploads/blog/thumb.png"
      />
      <ImageField
        label="Hero image"
        name="heroImage"
        value={form.heroImage}
        onChange={onChange}
        placeholder="/uploads/blog/hero.png"
      />
    </div>
  );
}

/* ✅ Enhanced ImageField with bigger preview */

function ImageField({ label, name, value, onChange, placeholder }) {
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'blog');
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
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
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
      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
          <span className="rounded-full border border-slate-300 px-3 py-1 bg-white hover:bg-slate-50 transition-all">
            {uploading ? 'Uploading…' : 'Upload Image'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>

      {/* ✅ Bigger Image Preview */}
      {value && (
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="relative group w-full aspect-video rounded-xl border-2 border-slate-200 overflow-hidden bg-slate-50 hover:border-sky-400 transition-all"
          >
            <Image
              src={value}
              alt="preview"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
          <p className="text-[11px] text-slate-400 truncate">{value}</p>
        </div>
      )}

      {/* ✅ Full Screen Image Modal */}
      {showPreview && value && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all text-slate-600 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative w-full h-[80vh]">
              <Image
                src={value}
                alt="Full preview"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
