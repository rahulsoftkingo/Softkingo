// src/app/(admin)/admin/blog/edit/BlogEditPageClient.jsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState, useCallback } from 'react';
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
  Calendar,
  Upload,
  Folder,
  FolderOpen,
  ZoomIn,
  Search as SearchIcon,
  ChevronRight,
  Home,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

import { BLOG_SECTIONS } from '@/app/(public)/blog/sectionConfig';

const AdvancedTipTapEditor = dynamic(() => import('../../AdvancedTipTapEditor'), {
  ssr: false,
});

const TABS = ['basics', 'content', 'seo', 'media'];

const IMAGE_SIZES = {
  thumbnail: { small: '1200×630', medium: '1920×1080', large: '2560×1440' },
  hero: { small: '1280×720', medium: '1920×1080', large: '2560×1440' },
  seo: { standard: '1200×630' },
};

const SITE_BASE =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://softkingo.com';

function slugify(str = '') {
  return str
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ✅ avoid next/image crash
function normalizeImageSrc(src) {
  const s = (src || '').toString().trim();
  if (!s) return null;
  if (s.startsWith('/')) return s;
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return null;
}

function toDateTimeLocalValue(dateLike) {
  if (!dateLike) return '';
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '';
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}
function datetimeLocalToIso(localValue) {
  if (!localValue) return null;
  const d = new Date(localValue);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function sectionKeyFromType(type) {
  return (
    Object.entries(BLOG_SECTIONS).find(([, cfg]) => cfg.types?.includes(type))?.[0] || 'blog'
  );
}

// ✅ placements must be sectionKeys only
function normalizePlacements(rawPlacements, type) {
  const primary = sectionKeyFromType(type);
  const cleaned = (rawPlacements || [])
    .map(String)
    .map((x) => x.trim())
    .filter(Boolean)
    .filter((x) => !!BLOG_SECTIONS[x]); // only valid section keys
  return Array.from(new Set([primary, ...cleaned]));
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

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

  // image browser
  const [uploadingField, setUploadingField] = useState(null);
  const [showImageBrowser, setShowImageBrowser] = useState(false);
  const [currentImageField, setCurrentImageField] = useState('');
  const [currentFolder, setCurrentFolder] = useState('blog');
  const [folderFiles, setFolderFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

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

    // ✅ store sectionKeys
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
    createdAtLocal: '',
  });

  const roles = session?.user?.roles || [];
  const canEdit = roles.some((r) => ['admin', 'manager', 'writer'].includes(r));


  // meta
useEffect(() => {
  const loadMeta = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch('/api/admin/blog-categories'),
        fetch('/api/admin/blog-tags'),
      ]);
      
      // ✅ FIXED: Handle both API shapes
      if (catRes.ok) {
        const catData = await catRes.json();
        console.log('Categories API response:', catData); // Debug
        // Handle {categories: []} OR direct []
        setCategories(
          Array.isArray(catData?.categories) 
            ? catData.categories 
            : Array.isArray(catData) 
              ? catData 
              : []
        );
      }
      
      if (tagRes.ok) {
        const tagData = await tagRes.json();
        console.log('Tags API response:', tagData); // Debug
        setAllTags(
          Array.isArray(tagData) 
            ? tagData 
            : tagData?.tags || []
        );
      }
    } catch (e) {
      console.error('Meta load error:', e);
    }
  };
  loadMeta();
}, []);

  // keep primary placement
  useEffect(() => {
    const primary = sectionKeyFromType(form.type);
    setForm((prev) => ({ ...prev, placements: normalizePlacements(prev.placements, prev.type) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.type]);

  // load post/draft
  useEffect(() => {
    const load = async () => {
      // draft
      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem(draftKey);
        if (raw) {
          try {
            const draft = JSON.parse(raw);
            setForm((prev) => ({
              ...prev,
              ...draft,
              placements: normalizePlacements(draft.placements, draft.type || prev.type),
            }));
            setLoading(false);
          } catch {
            window.localStorage.removeItem(draftKey);
          }
        }
      }

      if (isNew) {
        setForm((prev) => ({
          ...prev,
          createdAtLocal: prev.createdAtLocal || toDateTimeLocalValue(new Date()),
          placements: normalizePlacements(prev.placements, prev.type),
        }));
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await fetch(`/api/admin/blog/${idParam}`);
      if (!res.ok) {
        setError('Post not found.');
        setLoading(false);
        return;
      }
      const post = await res.json();

      const postPlacements = Array.isArray(post.placements)
        ? post.placements
        : (() => {
          // if API returns JSON string by mistake
          try {
            return JSON.parse(post.placements || '[]');
          } catch {
            return [];
          }
        })();

      setForm((prev) => ({
        ...prev,
        type: post.type || 'blog',
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        status: post.status || 'draft',
        featured: !!post.featured,
        pinned: !!post.pinned,
        placements: normalizePlacements(postPlacements, post.type || 'blog'),
        readTimeMinutes: post.readTimeMinutes ?? '',
        categoryId: post.categoryId ?? '',
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
        createdAtLocal: toDateTimeLocalValue(post.createdAt),
      }));

      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idParam, isNew]);

  // autosave
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const t = setTimeout(() => {
      window.localStorage.setItem(draftKey, JSON.stringify(form));
    }, 400);
    return () => clearTimeout(t);
  }, [draftKey, form]);

  // auto load folder files when open
  useEffect(() => {
    if (!showImageBrowser) return;
    fetchFolderFiles(currentFolder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showImageBrowser]);

  if (!canEdit) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">You are not authorized to manage blog posts.</p>
      </main>
    );
  }
 const handleThumbnailUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select valid image');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Max 5MB');
      e.target.value = '';
      return;
    }
    setThumbnailFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setThumbnailPreview(reader.result);
        const pureBase64 = reader.result.split(',')[1];
        setForm(prev => ({ ...prev, thumbnail: pureBase64 }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveThumbnail = useCallback(() => {
    setThumbnailFile(null);
    setThumbnailPreview('');
    setForm(prev => ({ ...prev, thumbnail: '' }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError('');
    setForm((prev) => {
      const next = { ...prev };

      if (name === 'title') next.slug = slugify(value);

      if (name === 'placements') {
        const v = value;
        const exists = prev.placements.includes(v);
        const updated = exists ? prev.placements.filter((p) => p !== v) : [...prev.placements, v];
        next.placements = normalizePlacements(updated, prev.type);
        return next;
      }

      next[name] = type === 'checkbox' ? checked : value;
      return next;
    });
  };

  const buildTagIds = () => {
    const names = (form.tagNames || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!names.length) return [];
    const ids = [];
    names.forEach((name) => {
      const existing = allTags.find((t) => t.name.toLowerCase() === name.toLowerCase());
      if (existing) ids.push(existing.id);
    });
    return ids;
  };

  // ✅ preview URL should be sectionKey based
  const computedUrl = useMemo(() => {
    const slug = form.slug || 'your-slug';
    const sectionKey =
      (Array.isArray(form.placements) && form.placements[0] && BLOG_SECTIONS[form.placements[0]]
        ? form.placements[0]
        : sectionKeyFromType(form.type)) || 'blog';
    const base = BLOG_SECTIONS[sectionKey]?.slugBase || '/blog';
    return `${SITE_BASE}${base}/${slug}`;
  }, [form.slug, form.type, form.placements]);


  async function fetchFolderFiles(folder) {
    setLoadingFiles(true);
    try {
      const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder || '')}`);
      if (res.ok) {
        const data = await res.json();
        setFolderFiles(Array.isArray(data.files) ? data.files : []);
      } else setFolderFiles([]);
    } catch (err) {
      console.error(err);
      setFolderFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  }

  const openImageBrowser = (fieldName) => {
    setCurrentImageField(fieldName);
    setCurrentFolder('blog');
    setSearchQuery('');
    setShowImageBrowser(true);
  };

  const navigateToFolder = (folderPath) => {
    setCurrentFolder(folderPath || '');
    setSearchQuery('');
    fetchFolderFiles(folderPath || '');
  };

  const goToParentFolder = () => {
    const parts = (currentFolder || '').split('/').filter(Boolean);
    parts.pop();
    navigateToFolder(parts.join('/'));
  };

  const selectImageFromBrowser = (path) => {
    setForm((prev) => ({ ...prev, [currentImageField]: path }));
    setShowImageBrowser(false);
  };
 
  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(fieldName);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'blog');
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (data?.url) setForm((prev) => ({ ...prev, [fieldName]: data.url }));
    } catch (err) {
      console.error(err);
      setError('Failed to upload image.');
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  const handleSave = async (publish = false) => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug required.');
      setActiveTab('basics');
      return;
    }

    if (form.createdAtLocal && !datetimeLocalToIso(form.createdAtLocal)) {
      setError('Created date invalid.');
      setActiveTab('basics');
      return;
    }

    const placements = normalizePlacements(form.placements, form.type);

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

      // ✅ sectionKeys
      placements,

      thumbnail: form.thumbnail || null,
      heroImage: form.heroImage || null,
      readTimeMinutes: form.readTimeMinutes ? Number(form.readTimeMinutes) : null,
      seoTitle: form.seoTitle || null,
      seoDescription: form.seoDescription || null,
      seoImage: form.seoImage || null,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      contentJson: form.contentJson || null,
      tagIds: buildTagIds(),
      ...(form.createdAtLocal ? { createdAt: datetimeLocalToIso(form.createdAtLocal) } : {}),
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

    if (typeof window !== 'undefined') window.localStorage.removeItem(draftKey);

    if (isNew) router.replace(`/admin/blog/edit/${saved.id}`);
    else router.push('/admin/blog');
  };

  const allPlacements = useMemo(
    () =>
      Object.entries(BLOG_SECTIONS).map(([key, cfg]) => ({
        value: key,
        label: cfg.title,
      })),
    [],
  );

  const wordCount = (() => {
    try {
      const doc = JSON.parse(form.contentJson || '{}');
      const text = JSON.stringify(doc);
      return text.split(/\s+/).filter(Boolean).length;
    } catch {
      return 0;
    }
  })();

  const filteredFiles = (folderFiles || []).filter((f) => {
    if (!searchQuery) return true;
    return (f.name || '').toLowerCase().includes(searchQuery.toLowerCase());
  });
  const folders = filteredFiles.filter((f) => f.isDir);
  const images = filteredFiles.filter((f) => !f.isDir && /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f.name || ''));

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading post…</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-screen overflow-hidden">
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
              <p className="text-xs sm:text-sm text-slate-500">Placements + images + SEO</p>
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

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[11px] text-slate-600 max-w-full">
          <LinkIcon className="h-3.5 w-3.5 text-sky-500" />
          <span className="truncate">{computedUrl}</span>
          <button
            type="button"
            onClick={() => window.open(computedUrl, '_blank')}
            className="ml-2 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
        </div>

        <nav className="flex flex-wrap gap-2 pb-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const icon =
              tab === 'basics' ? (
                <Type className="h-3.5 w-3.5" />
              ) : tab === 'content' ? (
                <FileText className="h-3.5 w-3.5" />
              ) : tab === 'seo' ? (
                <Settings2 className="h-3.5 w-3.5" />
              ) : (
                <ImageIcon className="h-3.5 w-3.5" />
              );
            const label =
              tab === 'basics' ? 'Basics' : tab === 'content' ? 'Content' : tab === 'seo' ? 'SEO' : 'Media';

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${isActive ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <section className="flex-1 overflow-y-auto hide-scrollbar bg-slate-50">
        <div className="max-w-7xl mx-auto p-4">
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5 space-y-4">
            {activeTab === 'basics' && (
              <BasicsTab form={form} onChange={handleChange} categories={categories} allPlacements={allPlacements} />
            )}

            {activeTab === 'content' && <ContentTab form={form} onChange={handleChange} />}

            {activeTab === 'seo' && (
              <SeoTab
                form={form}
                onChange={handleChange}
                onUpload={handleFileUpload}
                uploadingField={uploadingField}
                onBrowse={openImageBrowser}
                onPreview={setImagePreview}
              />
            )}

            {/* {activeTab === 'media' && (
              <MediaTab
                form={form}
                onChange={handleChange}
                onUpload={handleFileUpload}
                uploadingField={uploadingField}
                onBrowse={openImageBrowser}
                onPreview={setImagePreview}
              />
            )} */}

            {activeTab === 'media' && (
              <MediaTab
                form={form}
                onChange={handleChange}
                onUpload={handleFileUpload}
                uploadingField={uploadingField}
                onBrowse={openImageBrowser}
                onPreview={setImagePreview}
                // ✅ NEW PROPS
                thumbnailPreview={thumbnailPreview}
                thumbnailFile={thumbnailFile}
                onThumbnailUpload={handleThumbnailUpload}
                onRemoveThumbnail={handleRemoveThumbnail}
              />
            )}


            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Image Browser Modal */}
      {showImageBrowser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-slate-50">
              <div>
                <h3 className="text-base font-bold text-slate-900">Browse Images</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select from server folder (blog) or paste any https URL in input.
                </p>
              </div>
              <button
                onClick={() => setShowImageBrowser(false)}
                className="h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-sm overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => navigateToFolder('')}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white transition-colors flex-shrink-0"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Root</span>
                </button>

                {(currentFolder || '')
                  .split('/')
                  .filter(Boolean)
                  .map((part, idx, arr) => (
                    <div key={idx} className="flex items-center gap-1 flex-shrink-0">
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                      <button
                        onClick={() => {
                          const path = arr.slice(0, idx + 1).join('/');
                          navigateToFolder(path);
                        }}
                        className="px-2 py-1 rounded hover:bg-white transition-colors text-slate-700 hover:text-slate-900"
                      >
                        {part}
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="px-4 py-3 border-b border-slate-200">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search images..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {loadingFiles ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 text-sky-600 animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  {folders.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        <span>Folders ({folders.length})</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {folders.map((folder, idx) => (
                          <button
                            key={idx}
                            onClick={() => navigateToFolder(folder.path)}
                            className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all"
                          >
                            <Folder className="h-10 w-10 text-sky-500 group-hover:text-sky-600" />
                            <span className="text-xs text-slate-700 font-medium truncate w-full text-center">
                              {folder.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>Images ({images.length})</span>
                    </h4>

                    {images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectImageFromBrowser(img.path)}
                            className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-500 transition-all bg-slate-50"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.path} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-2">
                              <p className="text-[10px] text-white font-medium truncate w-full text-center">{img.name}</p>
                              <p className="text-[9px] text-white/80">{formatBytes(img.size)}</p>
                            </div>
                            <div className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <CheckCircle2 className="h-4 w-4 text-sky-600" />
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No images found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentFolder ? (
                  <button
                    onClick={goToParentFolder}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : null}
                <p className="text-xs text-slate-500">{folders.length + images.length} items</p>
              </div>

              <button
                onClick={() => setShowImageBrowser(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-sm font-medium text-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Preview */}
      {imagePreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setImagePreview(null)}>
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-10 right-0 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-[85vh] object-contain" />
              <div className="p-3 bg-slate-900/80 text-white text-xs truncate">{imagePreview}</div>
            </div>
          </div>
        </div>
      )}

      <style >{`
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

/* Tabs */
function BasicsTab({ form, onChange, categories, allPlacements }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">Primary type</label>
          <select
            name="type"
            value={form.type}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="blog">Blog</option>
            <option value="insights">Insights</option>
            <option value="featured">Featured</option>
            <option value="press-release">Press release</option>
            <option value="guides">Guides</option>
            <option value="media-coverage">Media Coverage</option>
            <option value="articles">Articles</option>
            <option value="whitepapers">Whitepapers</option>
            <option value="podcasts">Podcasts</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">Status</label>
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

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">None</option>

            {Array.isArray(categories) ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))
            ) : (
              null
            )}

          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700 flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          <span>Created date (admin override)</span>
        </label>
        <input
          type="datetime-local"
          name="createdAtLocal"
          value={form.createdAtLocal}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* placements */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Show this post in</label>
        <p className="text-xs text-slate-500 mb-2">Placements are section routes (blog/featured/press-releases...).</p>

        <div className="max-h-56 overflow-y-auto hide-scrollbar rounded-xl border border-slate-100 p-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allPlacements.map((p) => (
              <label
                key={p.value}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.placements.includes(p.value)
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
      </div>

      {/* title/slug/excerpt */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">Slug</label>
        <input
          name="slug"
          value={form.slug}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="my-first-post"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-700">Excerpt</label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={onChange}
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
    </div>
  );
}

function ContentTab({ form, onChange }) {
  const handleEditorChange = (jsonString) => {
    onChange({ target: { name: 'contentJson', value: jsonString } });
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-50/80 p-2 sm:p-3">
        <AdvancedTipTapEditor value={form.contentJson} onChange={handleEditorChange} />
      </div>
    </div>
  );
}

function SeoTab({ form, onChange, onUpload, uploadingField, onBrowse, onPreview }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-6">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">SEO title</label>
          <input
            name="seoTitle"
            value={form.seoTitle}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">SEO description</label>
          <textarea
            name="seoDescription"
            value={form.seoDescription}
            onChange={onChange}
            rows={3}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <ImageSmartField
        label={`SEO / OG image (recommended ${IMAGE_SIZES.seo.standard})`}
        name="seoImage"
        value={form.seoImage}
        onChange={onChange}
        onUpload={onUpload}
        uploading={uploadingField === 'seoImage'}
        onBrowse={() => onBrowse('seoImage')}
        onPreview={onPreview}
        placeholder="Paste https://... or /uploads/... "
        previewShape="og"
      />
    </div>
  );
}
// Add this BEFORE return statement (line 900 के पहले)
// function MediaTab({
//   form, onChange, onUpload, uploadingField, onBrowse, onPreview,
//   thumbnailPreview, thumbnailFile, onThumbnailUpload, onRemoveThumbnail
// }) {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* ✅ Thumbnail Bytes Upload */}
//       <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/50">
//         <label className="block text-sm font-semibold text-blue-900 flex items-center gap-2">
//           <ImageIcon className="h-4 w-4" />
//           Thumbnail (1200×675 recommended)
//         </label>

//         {thumbnailPreview ? (
//           <div className="relative group">
//             <div className="relative w-48 h-32 rounded-2xl overflow-hidden shadow-lg bg-slate-100">
//               <Image
//                 src={thumbnailPreview}
//                 alt="Thumbnail preview"
//                 width={384}
//                 height={216}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform"
//                 unoptimized
//               />
//             </div>
//             <button
//               onClick={onRemoveThumbnail}
//               className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100"
//               title="Remove"
//             >
//               <X className="h-3 w-3" />
//             </button>
//             <p className="text-xs text-slate-500">{thumbnailFile?.name || 'Uploaded'}</p>
//             <p className="text-xs text-slate-400">{formatBytes(thumbnailFile?.size || 0)}</p>
//           </div>
//         ) : (
//           <label className="w-48 h-32 rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-400 flex flex-col items-center justify-center bg-blue-50 cursor-pointer p-4 hover:bg-blue-50 group">
//             <Upload className="h-8 w-8 text-blue-400 group-hover:text-blue-500 mb-2" />
//             <div className="text-center text-xs">
//               <p className="font-medium text-slate-700">Upload thumbnail</p>
//               <p className="text-slate-500">JPG, PNG, WebP (max 5MB)</p>
//             </div>
//             <input
//               type="file"
//               accept="image/jpeg,image/png,image/webp"
//               onChange={onThumbnailUpload}
//               className="hidden"
//             />
//           </label>
//         )}
//       </div>

//       {/* Hero Image (URL only) */}
//       <ImageSmartField
//         label={`Hero image (${IMAGE_SIZES.hero.medium})`}
//         name="heroImage"
//         value={form.heroImage}
//         onChange={onChange}
//         onUpload={onUpload}
//         uploading={uploadingField === 'heroImage'}
//         onBrowse={() => onBrowse('heroImage')}
//         onPreview={onPreview}
//         placeholder="https://... or /uploads/..."
//         previewShape="videoLarge"
//       />
//     </div>
//   );
// }


// // ✅ FIXED ImageSmartField (URL only)
// function ImageSmartField({
//   label, name, value, onChange, onUpload, uploading, onBrowse, onPreview,
//   placeholder, previewShape = 'videoSmall'
// }) {
//   const safeSrc = normalizeImageSrc(value);
//   const previewClass = previewShape === 'og' ? 'aspect-[1200/630] max-h-40' :
//     previewShape === 'videoLarge' ? 'aspect-video max-h-72' : 'aspect-video max-h-40';

//   return (
//     <div className="space-y-2">
//       <label className="block text-xs font-medium text-slate-700">{label}</label>

//       <input
//         name={name}
//         value={value || ''}
//         onChange={onChange}
//         className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
//         placeholder={placeholder}
//       />

//       <div className="flex flex-wrap items-center gap-2">
//         <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer transition-colors">
//           {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//           <span>{uploading ? 'Uploading…' : 'Upload'}</span>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => onUpload(e, name)}
//             disabled={uploading}
//           />
//         </label>

//         <button
//           type="button"
//           onClick={onBrowse}
//           className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
//         >
//           <Folder className="h-4 w-4" />
//           Browse
//         </button>

//         {safeSrc && (
//           <button
//             type="button"
//             onClick={() => onPreview(safeSrc)}
//             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-xs font-medium text-sky-700 transition-colors"
//           >
//             <ZoomIn className="h-4 w-4" />
//             Preview
//           </button>
//         )}
//       </div>

//       {value && !safeSrc && (
//         <p className="text-[11px] text-rose-600">
//           Invalid URL. Use "https://..." or "/uploads/..."
//         </p>
//       )}

//       {safeSrc && (
//         <div className={`mt-3 space-y-2 ${previewClass}`}>
//           <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//             <Image
//               src={safeSrc}
//               alt="Preview"
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 100vw, 400px"
//             />
//           </div>
//           <p className="text-[11px] text-slate-400 truncate">{safeSrc}</p>
//         </div>
//       )}
//     </div>
//   );
// }

function MediaTab({ form, onChange, onUpload, uploadingField, onBrowse, onPreview }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ImageSmartField
        label={`Thumbnail (medium recommended ${IMAGE_SIZES.thumbnail.medium})`}
        name="thumbnail"
        value={form.thumbnail}
        onChange={onChange}
        onUpload={onUpload}
        uploading={uploadingField === 'thumbnail'}
        onBrowse={() => onBrowse('thumbnail')}
        onPreview={onPreview}
        placeholder="Paste https://... or /uploads/..."
        previewShape="videoSmall"
      />

      <ImageSmartField
        label={`Hero image (medium recommended ${IMAGE_SIZES.hero.medium})`}
        name="heroImage"
        value={form.heroImage}
        onChange={onChange}
        onUpload={onUpload}
        uploading={uploadingField === 'heroImage'}
        onBrowse={() => onBrowse('heroImage')}
        onPreview={onPreview}
        placeholder="Paste https://... or /uploads/..."
        previewShape="videoLarge"
      />
    </div>
  );
}

function ImageSmartField({
  label,
  name,
  value,
  onChange,
  onUpload,
  uploading,
  onBrowse,
  onPreview,
  placeholder,
  previewShape = 'videoSmall', // videoSmall | videoLarge | og
}) {
  const safeSrc = normalizeImageSrc(value);
  const previewClass =
    previewShape === 'og'
      ? 'aspect-[1200/630] max-h-40'
      : previewShape === 'videoLarge'
        ? 'aspect-video max-h-72'
        : 'aspect-video max-h-40';

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-slate-700">{label}</label>

      <input
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder={placeholder}
      />

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer transition-colors">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span>{uploading ? 'Uploading…' : 'Upload'}</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(e, name)} disabled={uploading} />
        </label>

        <button
          type="button"
          onClick={onBrowse}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
        >
          <Folder className="h-4 w-4" />
          Browse
        </button>

        {safeSrc ? (
          <button
            type="button"
            onClick={() => onPreview(safeSrc)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-xs font-medium text-sky-700 transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
            Preview
          </button>
        ) : null}
      </div>

      {value && !safeSrc ? (
        <p className="text-[11px] text-rose-600">
          Invalid image src. Use “/path.png” or “https://...” (next/image requires this).
        </p>
      ) : null}

      {safeSrc ? (
        <div className="mt-3 space-y-2">
          <div className={`relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ${previewClass}`}>
            <Image src={safeSrc} alt="preview" fill className="object-cover" />
          </div>
          <p className="text-[11px] text-slate-400 truncate">{safeSrc}</p>
        </div>
      ) : null}
    </div>
  );
}
