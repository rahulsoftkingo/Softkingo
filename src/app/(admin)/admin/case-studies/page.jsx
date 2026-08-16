// src/app/(admin)/admin/case-studies/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Filter,
  Plus,
  Search,
  Edit2,
  Trash2,
  FileText,
  Loader2,
  X,
  Menu,
  Calendar,
  ExternalLink,
  TrendingUp,
  Smartphone,
  SearchCheck,
} from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All', icon: Filter },
  { id: 'digital', label: 'Digital', icon: Smartphone },
  { id: 'seo', label: 'SEO', icon: SearchCheck },
];

export default function CaseStudiesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'digital' | 'seo'
  const [loading, setLoading] = useState(true);

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  async function fetchItems(params = {}) {
    setLoading(true);
    const search = new URLSearchParams({
      q: params.q ?? q,
    });
    const activeType = params.type ?? typeFilter;

    try {
      const requests = [];

      if (activeType === 'all' || activeType === 'digital') {
        requests.push(
          fetch(`/api/admin/case-studies?${search.toString()}`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => data.map((row) => ({ ...row, _type: 'digital' })))
        );
      }

      if (activeType === 'all' || activeType === 'seo') {
        requests.push(
          fetch(`/api/admin/portfolio-seo?${search.toString()}`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => data.map((row) => ({ ...row, _type: 'seo' })))
        );
      }

      const results = await Promise.all(requests);
      const merged = results
        .flat()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      setItems(merged);
      setSelectedIds((prev) => prev.filter((id) => merged.some((x) => x.id === id && x._type)));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchItems({ q, type: typeFilter }), 300);
    return () => clearTimeout(t);
  }, [q, typeFilter]);

  const allSelected = selectedIds.length > 0 && selectedIds.length === items.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < items.length;

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(items.map((x) => x.id));
  };

  const apiPathFor = (type) =>
    type === 'seo' ? '/api/admin/portfolio-seo' : '/api/admin/case-studies';

  const editPathFor = (row) =>
    row._type === 'seo' ? `/admin/portfolio-seo/${row.id}` : `/admin/case-studies/${row.id}`;

  const handleDelete = async (row) => {
    if (!isAdminOrManager) return;
    const label = row._type === 'seo' ? 'Portfolio SEO case study' : 'case study';
    if (!confirm(`Delete this ${label}?`)) return;
    const res = await fetch(`${apiPathFor(row._type)}/${row.id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchItems();
  };

  const handleBulkDelete = async () => {
    if (!isAdminOrManager || selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} items?`)) return;
    setBulkDeleting(true);
    try {
      const selectedRows = items.filter((x) => selectedIds.includes(x.id));
      await Promise.all(
        selectedRows.map((row) =>
          fetch(`${apiPathFor(row._type)}/${row.id}`, {
            method: 'DELETE',
          })
        )
      );
      setSelectedIds([]);
      fetchItems();
    } finally {
      setBulkDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
        {/* Header with Gradient - Responsive */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-2 text-purple-100 text-xs font-medium">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Case Study Management</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Case Studies
              </h1>
              <p className="text-xs sm:text-sm text-purple-50/90 max-w-xl">
                Create detailed case studies to showcase your project success stories
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => router.push('/admin/portfolio-seo/new')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-white/25 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Portfolio SEO</span>
                <span className="xs:hidden">SEO</span>
              </button>

              {isAdminOrManager && (
                <button
                  onClick={() => router.push('/admin/case-studies/new')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-purple-700 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">New Case Study</span>
                  <span className="xs:hidden">New</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Stats Cards - Responsive */}
        <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Total Studies
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {items.length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Digital
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {items.filter((i) => i._type === 'digital').length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-sky-50 flex items-center justify-center">
                <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow xs:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  SEO
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {items.filter((i) => i._type === 'seo').length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <SearchCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Filters - Responsive */}
        <section className="rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg overflow-hidden">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Filter className="h-3.5 w-3.5" />
              <span>Search & Filter</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700"
            >
              <span>{showFilters ? 'Hide' : 'Show'}</span>
              {showFilters ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Desktop Filter Header */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 p-5 sm:p-6 pb-4">
            <Filter className="h-4 w-4" />
            <span>Search & Filter</span>
          </div>

          {/* Filter Content */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block p-4 sm:p-5 lg:p-6 lg:pt-0`}>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {/* Type filter pills */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Filter by type
                </label>
                <div className="inline-flex rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1">
                  {FILTERS.map((f) => {
                    const Icon = f.icon;
                    const active = typeFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setTypeFilter(f.id)}
                        className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          active
                            ? 'bg-white text-purple-700 shadow-sm border border-purple-200'
                            : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{f.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by title, slug, or subtitle..."
                    className="w-full rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table - Responsive */}
        <section className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden">
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] sm:text-xs font-bold">
                  {selectedIds.length}
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {selectedIds.length} selected
                </span>
              </div>
              {isAdminOrManager && (
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  disabled={bulkDeleting}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden xs:inline">{bulkDeleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              )}
            </div>
          )}

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 text-left w-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">No case studies yet</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Get started by creating your first case study
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((row) => (
                    <tr key={`${row._type}-${row.id}`} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleOne(row.id)}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-purple-600 transition-colors">
                            {row.title}
                          </p>
                          {row.subtitle && (
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              {row.subtitle}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {row._type === 'seo' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                            <SearchCheck className="h-3 w-3" />
                            SEO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-semibold border border-sky-200">
                            <Smartphone className="h-3 w-3" />
                            Digital
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-600 font-mono">{row.slug}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-600">
                          {new Date(row.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(editPathFor(row))}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          {isAdminOrManager && (
                            <button
                              onClick={() => handleDelete(row)}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
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

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">No case studies yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Create your first case study
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              items.map((row) => (
                <div key={`${row._type}-${row.id}`} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 mt-1"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                    />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {row.title}
                        </p>
                        {row.subtitle && (
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {row.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {row._type === 'seo' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                            <SearchCheck className="h-3 w-3" />
                            SEO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-semibold border border-sky-200">
                            <Smartphone className="h-3 w-3" />
                            Digital
                          </span>
                        )}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium font-mono">
                          {row.slug}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(row.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => router.push(editPathFor(row))}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-700 px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        {isAdminOrManager && (
                          <button
                            onClick={() => handleDelete(row)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}