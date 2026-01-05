'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Tag, Search, Pencil, Trash2, X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

export default function BlogCategoriesPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const canManage = roles.some((r) =>
    ['admin', 'manager', 'writer'].includes(r),
  );

  // Categories
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [savingCat, setSavingCat] = useState(false);
  const [catError, setCatError] = useState('');
  const [qCat, setQCat] = useState('');
  const [editingCat, setEditingCat] = useState(null);
  const [deletingCat, setDeletingCat] = useState(null);
  const [catPage, setCatPage] = useState(1);
  const catPerPage = 10;

  // Tags
  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [tagName, setTagName] = useState('');
  const [tagSlug, setTagSlug] = useState('');
  const [savingTag, setSavingTag] = useState(false);
  const [tagError, setTagError] = useState('');
  const [qTag, setQTag] = useState('');
  const [editingTag, setEditingTag] = useState(null);
  const [deletingTag, setDeletingTag] = useState(null);
  const [tagPage, setTagPage] = useState(1);
  const tagPerPage = 10;

  // Active tab
  const [activeTab, setActiveTab] = useState('categories');

  // Filter & paginate categories
  const filteredCats = categories.filter((c) => {
    const s = qCat.toLowerCase();
    if (!s) return true;
    return c.name.toLowerCase().includes(s) || c.slug.toLowerCase().includes(s);
  });
  const totalCatPages = Math.ceil(filteredCats.length / catPerPage);
  const paginatedCats = filteredCats.slice(
    (catPage - 1) * catPerPage,
    catPage * catPerPage
  );

  // Filter & paginate tags
  const filteredTags = tags.filter((t) => {
    const s = qTag.toLowerCase();
    if (!s) return true;
    return t.name.toLowerCase().includes(s) || t.slug.toLowerCase().includes(s);
  });
  const totalTagPages = Math.ceil(filteredTags.length / tagPerPage);
  const paginatedTags = filteredTags.slice(
    (tagPage - 1) * tagPerPage,
    tagPage * tagPerPage
  );

  // const loadCategories = async () => {
  //   setLoadingCats(true);
  //   const res = await fetch('/api/admin/blog-categories');
  //   if (res.ok) setCategories(await res.json());
  //   setLoadingCats(false);
  // };
const loadCategories = async () => {
  setLoadingCats(true);
  const res = await fetch('/api/admin/blog-categories');
  if (res.ok) {
    const data = await res.json();
    setCategories(Array.isArray(data.categories) ? data.categories : []); // ✅ Safe array
  }
  setLoadingCats(false);
};

  const loadTags = async () => {
    setLoadingTags(true);
    const res = await fetch('/api/admin/blog-tags');
    if (res.ok) setTags(await res.json());
    setLoadingTags(false);
  };

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  // Category handlers
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!canManage) return;
    if (!catName.trim() || !catSlug.trim()) {
      setCatError('Name and slug required.');
      return;
    }
    setSavingCat(true);
    setCatError('');
    const res = await fetch('/api/admin/blog-categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: catName.trim(), slug: catSlug.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setCatError(data.message || 'Failed to create category.');
      setSavingCat(false);
      return;
    }
    setCatName('');
    setCatSlug('');
    setSavingCat(false);
    loadCategories();
  };

  const handleEditCategory = async (cat) => {
    if (!canManage) return;
    setEditingCat(cat);
    setCatName(cat.name);
    setCatSlug(cat.slug);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingCat || !canManage) return;
    if (!catName.trim() || !catSlug.trim()) {
      setCatError('Name and slug required.');
      return;
    }
    setSavingCat(true);
    setCatError('');
    const res = await fetch(`/api/admin/blog-categories/${editingCat.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: catName.trim(), slug: catSlug.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setCatError(data.message || 'Failed to update category.');
      setSavingCat(false);
      return;
    }
    setCatName('');
    setCatSlug('');
    setEditingCat(null);
    setSavingCat(false);
    loadCategories();
  };

  const handleDeleteCategory = async (id) => {
    if (!canManage) return;
    if (deletingCat !== id) {
      setDeletingCat(id);
      return;
    }
    const res = await fetch(`/api/admin/blog-categories/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setDeletingCat(null);
      loadCategories();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || 'Failed to delete category.');
      setDeletingCat(null);
    }
  };

  // Tag handlers
  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!canManage) return;
    if (!tagName.trim() || !tagSlug.trim()) {
      setTagError('Name and slug required.');
      return;
    }
    setSavingTag(true);
    setTagError('');
    const res = await fetch('/api/admin/blog-tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tagName.trim(), slug: tagSlug.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setTagError(data.message || 'Failed to create tag.');
      setSavingTag(false);
      return;
    }
    setTagName('');
    setTagSlug('');
    setSavingTag(false);
    loadTags();
  };

  const handleEditTag = async (tag) => {
    if (!canManage) return;
    setEditingTag(tag);
    setTagName(tag.name);
    setTagSlug(tag.slug);
  };

  const handleUpdateTag = async (e) => {
    e.preventDefault();
    if (!editingTag || !canManage) return;
    if (!tagName.trim() || !tagSlug.trim()) {
      setTagError('Name and slug required.');
      return;
    }
    setSavingTag(true);
    setTagError('');
    const res = await fetch(`/api/admin/blog-tags/${editingTag.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tagName.trim(), slug: tagSlug.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setTagError(data.message || 'Failed to update tag.');
      setSavingTag(false);
      return;
    }
    setTagName('');
    setTagSlug('');
    setEditingTag(null);
    setSavingTag(false);
    loadTags();
  };

  const handleDeleteTag = async (id) => {
    if (!canManage) return;
    if (deletingTag !== id) {
      setDeletingTag(id);
      return;
    }
    const res = await fetch(`/api/admin/blog-tags/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setDeletingTag(null);
      loadTags();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || 'Failed to delete tag.');
      setDeletingTag(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Categories & Tags
            </h1>
            <p className="text-sm lg:text-base text-slate-600 mt-1">
              Organize your blog content with categories and tags
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('categories')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-t-xl text-sm font-semibold transition-all ${
            activeTab === 'categories'
              ? 'bg-white text-sky-600 border-b-2 border-sky-600 -mb-[2px]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Tag className="h-4 w-4" />
          Categories ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-t-xl text-sm font-semibold transition-all ${
            activeTab === 'tags'
              ? 'bg-white text-purple-600 border-b-2 border-purple-600 -mb-[2px]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Tag className="h-4 w-4" />
          Tags ({tags.length})
        </button>
      </nav>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-5">
          {/* Create/Edit Form */}
          {canManage && (
            <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-sky-100/50 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {editingCat ? 'Edit Category' : 'New Category'}
                </h2>
                {editingCat && (
                  <button
                    onClick={() => {
                      setEditingCat(null);
                      setCatName('');
                      setCatSlug('');
                      setCatError('');
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <form
                onSubmit={editingCat ? handleUpdateCategory : handleCreateCategory}
                className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_auto] gap-3 items-end"
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    value={catName}
                    onChange={(e) => {
                      setCatName(e.target.value);
                      if (!editingCat) {
                        setCatSlug(
                          e.target.value
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')
                        );
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    placeholder="Technology"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Slug
                  </label>
                  <input
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    placeholder="technology"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingCat}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all disabled:opacity-50"
                >
                  {editingCat ? (
                    <>
                      <Pencil className="h-4 w-4" />
                      <span>{savingCat ? 'Updating…' : 'Update'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>{savingCat ? 'Adding…' : 'Add'}</span>
                    </>
                  )}
                </button>
              </form>
              {catError && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                  {catError}
                </p>
              )}
            </section>
          )}

          {/* List */}
          <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-sky-100/50 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  All Categories
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={qCat}
                    onChange={(e) => {
                      setQCat(e.target.value);
                      setCatPage(1);
                    }}
                    placeholder="Search categories…"
                    className="w-full rounded-2xl bg-slate-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              {loadingCats ? (
                <p className="text-sm text-slate-500 py-8 text-center">Loading…</p>
              ) : paginatedCats.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">
                  {qCat ? 'No categories found.' : 'No categories yet.'}
                </p>
              ) : (
                <div className="space-y-2">
                  {paginatedCats.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all group"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {cat.name}
                        </p>
                        <p className="text-xs text-slate-500">/{cat.slug}</p>
                      </div>
                      {canManage && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditCategory(cat)}
                            className="p-2 rounded-xl hover:bg-sky-100 text-sky-600 transition-all"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          {deletingCat === cat.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-all"
                              >
                                Confirm?
                              </button>
                              <button
                                onClick={() => setDeletingCat(null)}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-2 rounded-xl hover:bg-rose-100 text-rose-600 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loadingCats && totalCatPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="text-sm text-slate-600">
                  Page {catPage} of {totalCatPages} • {filteredCats.length} total
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCatPage(catPage - 1)}
                    disabled={catPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {[...Array(totalCatPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalCatPages ||
                        (page >= catPage - 1 && page <= catPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCatPage(page)}
                            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                              page === catPage
                                ? 'bg-sky-600 text-white shadow-md'
                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === catPage - 2 || page === catPage + 2) {
                        return <span key={page} className="px-2 text-slate-400">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <button
                    onClick={() => setCatPage(catPage + 1)}
                    disabled={catPage === totalCatPages}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Tags Tab */}
      {activeTab === 'tags' && (
        <div className="space-y-5">
          {/* Create/Edit Form */}
          {canManage && (
            <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-purple-100/50 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {editingTag ? 'Edit Tag' : 'New Tag'}
                </h2>
                {editingTag && (
                  <button
                    onClick={() => {
                      setEditingTag(null);
                      setTagName('');
                      setTagSlug('');
                      setTagError('');
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <form
                onSubmit={editingTag ? handleUpdateTag : handleCreateTag}
                className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_auto] gap-3 items-end"
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    value={tagName}
                    onChange={(e) => {
                      setTagName(e.target.value);
                      if (!editingTag) {
                        setTagSlug(
                          e.target.value
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')
                        );
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    placeholder="Next.js"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Slug
                  </label>
                  <input
                    value={tagSlug}
                    onChange={(e) => setTagSlug(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    placeholder="nextjs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingTag}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
                >
                  {editingTag ? (
                    <>
                      <Pencil className="h-4 w-4" />
                      <span>{savingTag ? 'Updating…' : 'Update'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>{savingTag ? 'Adding…' : 'Add'}</span>
                    </>
                  )}
                </button>
              </form>
              {tagError && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                  {tagError}
                </p>
              )}
            </section>
          )}

          {/* List */}
          <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-purple-100/50 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  All Tags
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={qTag}
                    onChange={(e) => {
                      setQTag(e.target.value);
                      setTagPage(1);
                    }}
                    placeholder="Search tags…"
                    className="w-full rounded-2xl bg-slate-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              {loadingTags ? (
                <p className="text-sm text-slate-500 py-8 text-center">Loading…</p>
              ) : paginatedTags.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">
                  {qTag ? 'No tags found.' : 'No tags yet.'}
                </p>
              ) : (
                <div className="space-y-2">
                  {paginatedTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {tag.name}
                        </p>
                        <p className="text-xs text-slate-500">/{tag.slug}</p>
                      </div>
                      {canManage && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditTag(tag)}
                            className="p-2 rounded-xl hover:bg-purple-100 text-purple-600 transition-all"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          {deletingTag === tag.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDeleteTag(tag.id)}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-all"
                              >
                                Confirm?
                              </button>
                              <button
                                onClick={() => setDeletingTag(null)}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDeleteTag(tag.id)}
                              className="p-2 rounded-xl hover:bg-rose-100 text-rose-600 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loadingTags && totalTagPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="text-sm text-slate-600">
                  Page {tagPage} of {totalTagPages} • {filteredTags.length} total
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTagPage(tagPage - 1)}
                    disabled={tagPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {[...Array(totalTagPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalTagPages ||
                        (page >= tagPage - 1 && page <= tagPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setTagPage(page)}
                            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                              page === tagPage
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === tagPage - 2 || page === tagPage + 2) {
                        return <span key={page} className="px-2 text-slate-400">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <button
                    onClick={() => setTagPage(tagPage + 1)}
                    disabled={tagPage === totalTagPages}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
