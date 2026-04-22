// src/app/(admin)/admin/blog/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  Filter,
  Plus,
  Search,
  FileText,
  RefreshCw,
  Pencil,
  Eye,
  ExternalLink,
  Clock,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
 import { BLOG_SECTIONS } from "@/app/(public)/[sectionKey]/sectionConfig";

export default function BlogListPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const canEdit = roles.some((r) =>
    ['admin', 'manager', 'writer'].includes(r),
  );

  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  async function fetchItems(params = {}, isManualRefresh = false) {
    if (isManualRefresh) setRefreshing(true);
    setLoading(true);
    
    const search = new URLSearchParams({
      q: params.q ?? q,
      status: params.status ?? status,
      type: params.type ?? type,
      page: params.page ?? currentPage,
      limit: itemsPerPage,
    });
    
    const res = await fetch(`/api/admin/blog?${search.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.posts || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.total || 0);
    }
    setLoading(false);
    if (isManualRefresh) setRefreshing(false);
  }

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on filter change
    const t = setTimeout(
      () => fetchItems({ q, status, type, page: 1 }),
      300,
    );
    return () => clearTimeout(t);
  }, [q, status, type]);

  const openNew = () => router.push('/admin/blog/new');
  const openEdit = (id) => router.push(`/admin/blog/edit/${id}`);
  // const openPreview = (slug) => window.open(`/blog/${slug}`, '_blank');
   const openPreview = (row) => {
  const sectionKey =
     Object.entries(BLOG_SECTIONS).find(([, cfg]) =>
       cfg.types?.includes(row.type)
     )?.[0] || "blog";

   const base = BLOG_SECTIONS[sectionKey]?.slugBase || "/blog";
   window.open(`${base}/${row.slug}`, "_blank");
 };

  const closeImageModal = () => setSelectedImage(null);

  const handleDelete = async (id) => {
    if (!deleteConfirm || deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchItems();
        setDeleteConfirm(null);
        // Show success (you can add toast notification here)
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => setDeleteConfirm(null);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderStatusChip = (row) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border shadow-sm';
    const colors = {
      published: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      draft: 'bg-slate-100 text-slate-700 border-slate-200',
      scheduled: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      archived: 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return (
      <span className={`${base} ${colors[row.status] || colors.draft}`}>
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    );
  };

  const renderTypeChip = (row) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border shadow-sm';
    const colors = {
      featured: 'bg-sky-100 text-sky-800 border-sky-200',
      'press-release': 'bg-purple-100 text-purple-800 border-purple-200',
      media: 'bg-rose-100 text-rose-800 border-rose-200',
      blog: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return (
      <span className={`${base} ${colors[row.type] || colors.blog}`}>
        {row.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Blog & Insights
            </h1>
            <p className="text-sm lg:text-base text-slate-600 mt-1">
              Manage blogs, featured stories, press releases, and media content
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => fetchItems({}, true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 hover:shadow-md transition-all shadow-sm"
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
          {canEdit && (
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200/50 hover:from-sky-500 hover:to-cyan-500 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              New Post
            </button>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-sky-100/50 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Filter className="h-4 w-4 text-sky-500" />
            <span>Filters</span>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {totalItems} {totalItems === 1 ? 'result' : 'results'} found
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, slug, excerpt..."
                className="w-full rounded-2xl bg-slate-50/80 px-10 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:bg-white border border-slate-200 hover:border-sky-300 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl bg-slate-50/80 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:bg-white border border-slate-200 hover:border-sky-300 transition-all"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl bg-slate-50/80 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:bg-white border border-slate-200 hover:border-sky-300 transition-all"
            >
              <option value="all">All Types</option>
              <option value="blog">Blog</option>
              <option value="featured">Featured</option>
              <option value="press-release">Press Release</option>
              <option value="media">Media</option>
              <option value="article">Article</option>
              <option value="whitepaper">Whitepaper</option>
              <option value="podcast">Podcast</option>
            </select>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-sky-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-sky-50 to-cyan-50/50 border-b border-sky-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Title & Preview
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider hidden xl:table-cell">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <RefreshCw className="h-8 w-8 text-sky-400 animate-spin" />
                      <p className="text-sm text-slate-500">Loading posts...</p>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <FileText className="h-12 w-12 text-slate-400" />
                      <div>
                        <p className="text-lg font-medium text-slate-900">No posts found</p>
                        <p className="text-sm text-slate-500 mt-1">
                          {q || status !== 'all' || type !== 'all'
                            ? 'Try adjusting your filters'
                            : 'Create your first post to get started'}
                        </p>
                      </div>
                      {canEdit && (
                        <button
                          onClick={openNew}
                          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all"
                        >
                          <Plus className="h-4 w-4" />
                          Create First Post
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-sky-50/30 transition-all duration-200 border-b border-sky-50/50 group"
                  >
                    {/* Title & Thumbnail */}
                    <td className="px-6 py-5 max-w-0">
                      <div className="flex items-start gap-4">
                        {row.thumbnail && (
                          <div className="flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(row.thumbnail);
                              }}
                              className="group/image relative p-1 rounded-xl hover:bg-sky-100 transition-all hover:shadow-md hover:scale-105"
                              title="View image"
                            >
                              <div className="w-14 h-14 overflow-hidden rounded-lg bg-sky-50 border-2 border-sky-100">
                                <Image
                                  src={row.thumbnail}
                                  alt={row.title}
                                  width={120}
                                  height={80}
                                  className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-200 hover:brightness-110"
                                />
                              </div>
                              <Eye className="absolute -top-2 -right-2 w-5 h-5 text-sky-500 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover/image:opacity-100 transition-all duration-200" />
                            </button>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <button
                              onClick={() => openEdit(row.id)}
                              className="text-sm font-semibold text-slate-900 hover:text-sky-600 truncate max-w-[300px] lg:max-w-none hover:underline flex items-center gap-1"
                            >
                              {row.title}
                              {row.featured && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-xs font-bold text-amber-800 border border-amber-200 shadow-sm">
                                  ★ Featured
                                </span>
                              )}
                              {row.pinned && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-100 text-xs font-bold text-indigo-800 border border-indigo-200 shadow-sm">
                                  📌 Pinned
                                </span>
                              )}
                            </button>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              /{row.slug}
                            </span>
                            {row.category && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200">
                                {row.category.name}
                              </span>
                            )}
                            {row.readTimeMinutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {row.readTimeMinutes} min
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-5 text-xs hidden lg:table-cell">
                      {renderTypeChip(row)}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5 text-xs hidden xl:table-cell">
                      {row.category ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-800 border border-blue-200 shadow-sm">
                          {row.category.name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Uncategorized</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 text-xs hidden lg:table-cell">
                      {renderStatusChip(row)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openPreview(row)}
                          className="p-2 rounded-xl hover:bg-sky-100 text-sky-600 hover:text-sky-700 transition-all hidden md:inline-flex items-center"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canEdit && (
                          <>
                            <button
                              onClick={() => openEdit(row.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 hover:shadow-md hover:border-sky-300 transition-all shadow-sm"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            {deleteConfirm === row.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(row.id)}
                                  disabled={deleting}
                                  className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition-all disabled:opacity-50"
                                >
                                  {deleting ? 'Deleting...' : 'Confirm?'}
                                </button>
                                <button
                                  onClick={cancelDelete}
                                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(row.id)}
                                className="p-2 rounded-xl hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 text-right mt-1">
                        {new Date(row.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
            <div className="text-sm text-slate-600">
              Page {currentPage} of {totalPages} • Showing {items.length} of {totalItems} posts
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Show first, last, current, and adjacent pages
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                          page === currentPage
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-slate-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={closeImageModal}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white shadow-lg hover:shadow-xl transition-all text-slate-600 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="w-full h-[70vh] flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-sky-50">
              <Image
                src={selectedImage}
                alt="Preview"
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Warning Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Delete Post?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  This action cannot be undone. The post will be permanently deleted.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    disabled={deleting}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 transition-all disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
