'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Filter,
  Plus,
  Search,
  FileText,
  RefreshCw,
  Pencil,
} from 'lucide-react';

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

  async function fetchItems(params = {}, isManualRefresh = false) {
    if (isManualRefresh) setRefreshing(true);
    setLoading(true);
    const search = new URLSearchParams({
      q: params.q ?? q,
      status: params.status ?? status,
      type: params.type ?? type,
    });
    const res = await fetch(`/api/admin/blog?${search.toString()}`);
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
    if (isManualRefresh) setRefreshing(false);
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () => fetchItems({ q, status, type }),
      300,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, type]);

  const openNew = () => router.push('/admin/blog/new');
  const openEdit = (id) => router.push(`/admin/blog/edit/${id}`);

  const renderStatusChip = (row) => {
    const base =
      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border';
    if (row.status === 'published') {
      return (
        <span className={`${base} bg-emerald-50 text-emerald-700 border-emerald-100`}>
          Published
        </span>
      );
    }
    if (row.status === 'draft') {
      return (
        <span className={`${base} bg-slate-50 text-slate-700 border-slate-200`}>
          Draft
        </span>
      );
    }
    if (row.status === 'scheduled') {
      return (
        <span className={`${base} bg-indigo-50 text-indigo-700 border-indigo-100`}>
          Scheduled
        </span>
      );
    }
    if (row.status === 'archived') {
      return (
        <span className={`${base} bg-amber-50 text-amber-800 border-amber-100`}>
          Archived
        </span>
      );
    }
    return (
      <span className={`${base} bg-slate-50 text-slate-700 border-slate-200`}>
        {row.status}
      </span>
    );
  };

  const renderTypeChip = (row) => {
    const base =
      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border';
    if (row.type === 'featured') {
      return (
        <span className={`${base} bg-sky-50 text-sky-700 border-sky-100`}>
          Featured
        </span>
      );
    }
    if (row.type === 'press-release') {
      return (
        <span className={`${base} bg-purple-50 text-purple-700 border-purple-100`}>
          Press
        </span>
      );
    }
    if (row.type === 'media') {
      return (
        <span className={`${base} bg-rose-50 text-rose-700 border-rose-100`}>
          Media
        </span>
      );
    }
    return (
      <span className={`${base} bg-slate-50 text-slate-700 border-slate-200`}>
        {row.type}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-sky-600" />
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Blog & insights
            </h1>
            <p className="text-sm text-slate-500">
              Manage your blogs, featured stories, press releases, media and more.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fetchItems({}, true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${
                refreshing ? 'animate-spin' : ''
              }`}
            />
            <span>Refresh</span>
          </button>
          {canEdit && (
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-500"
            >
              <Plus className="h-4 w-4" />
              <span>New post</span>
            </button>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {items.length} result{items.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, slug, excerpt"
                className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              <option value="blog">Blog</option>
              <option value="featured">Featured</option>
              <option value="press-release">Press release</option>
              <option value="media">Media</option>
              <option value="article">Article</option>
              <option value="whitepaper">Whitepaper</option>
              <option value="podcast">Podcast</option>
            </select>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-2.5 sm:px-5">Title</th>
                <th className="px-4 py-2.5 sm:px-5 hidden md:table-cell">
                  Type
                </th>
                <th className="px-4 py-2.5 sm:px-5 hidden md:table-cell">
                  Status
                </th>
                <th className="px-4 py-2.5 sm:px-5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No posts yet.
                  </td>
                </tr>
              ) : (
                items.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                  >
                    <td
                      className="px-4 py-3 sm:px-5 cursor-pointer"
                      onClick={() => openEdit(row.id)}
                    >
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-medium text-slate-900 truncate flex items-center gap-1.5">
                          {row.title}
                          {row.featured && (
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-100">
                              Featured
                            </span>
                          )}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                          <span className="truncate max-w-[160px]">
                            /{row.slug}
                          </span>
                          {row.category && (
                            <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-100">
                              {row.category.name}
                            </span>
                          )}
                          {row.readTimeMinutes && (
                            <span>
                              • {row.readTimeMinutes} min read
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600 hidden md:table-cell">
                      {renderTypeChip(row)}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600 hidden md:table-cell">
                      {renderStatusChip(row)}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-right text-slate-600">
                      <div className="flex items-center justify-end gap-2">
                        <span className="hidden sm:inline text-[11px] text-slate-400">
                          {new Date(row.updatedAt).toLocaleDateString()}
                        </span>
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => openEdit(row.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
