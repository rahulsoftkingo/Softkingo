// src/app/(admin)/admin/portfolio/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  Code,
  Smartphone,
  Globe,
  Layers,
  X,
  Menu,
} from 'lucide-react';

export default function PortfolioProjectsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  const [projects, setProjects] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  async function fetchProjects(params = {}) {
    setLoading(true);
    const search = new URLSearchParams({
      q: params.q ?? q,
      category: params.category ?? category,
      type: params.type ?? type,
    });
    const res = await fetch(`/api/admin/portfolio-projects?${search.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
      setSelectedIds((prev) => prev.filter((id) => data.some((p) => p.id === id)));
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchProjects({ q, category, type }), 300);
    return () => clearTimeout(t);
  }, [q, category, type]);

  const allSelected = selectedIds.length > 0 && selectedIds.length === projects.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < projects.length;

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(projects.map((p) => p.id));
  };

  const handleDelete = async (id) => {
    if (!isAdminOrManager) return;
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/admin/portfolio-projects/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchProjects();
  };

  const handleBulkDelete = async () => {
    if (!isAdminOrManager || selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} projects?`)) return;
    setBulkDeleting(true);
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/admin/portfolio-projects/${id}`, { method: 'DELETE' })
        )
      );
      setSelectedIds([]);
      fetchProjects();
    } finally {
      setBulkDeleting(false);
    }
  };

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects]
  );

  const types = useMemo(
    () => ['all', ...Array.from(new Set(projects.map((p) => p.type).filter(Boolean)))],
    [projects]
  );

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'app':
        return <Smartphone className="h-3.5 w-3.5" />;
      case 'web':
        return <Globe className="h-3.5 w-3.5" />;
      case 'design':
        return <Layers className="h-3.5 w-3.5" />;
      default:
        return <Package className="h-3.5 w-3.5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'app':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'web':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'design':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
        {/* Header with Gradient - Responsive */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500 p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-2 text-sky-100 text-xs font-medium">
                <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Portfolio Management</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Portfolio Projects
              </h1>
              <p className="text-xs sm:text-sm text-sky-50/90 max-w-xl">
                Showcase your best work. Manage portfolio cards and link them to detailed case studies.
              </p>
            </div>
            {isAdminOrManager && (
              <button
                onClick={() => router.push('/admin/portfolio/new')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-sky-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">New Project</span>
                <span className="xs:hidden">New</span>
              </button>
            )}
          </div>
        </section>

        {/* Stats Cards - Responsive Grid */}
        <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Total Projects
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {projects.length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-sky-50 flex items-center justify-center">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Categories
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {categories.length - 1}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow xs:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  With Case Studies
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {projects.filter((p) => p.caseStudyId).length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Filters - Mobile Toggle */}
        <section className="rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg overflow-hidden">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Filter className="h-3.5 w-3.5" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-700"
            >
              <span>{showFilters ? 'Hide' : 'Show'}</span>
              {showFilters ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Desktop Filter Header */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 p-5 sm:p-6 pb-4">
            <Filter className="h-4 w-4" />
            <span>Filter & Search</span>
          </div>

          {/* Filter Content */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block p-4 sm:p-5 lg:p-6 lg:pt-0`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
              <div className="sm:col-span-2 lg:col-span-6">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Search projects
                </label>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by title, tech..."
                    className="w-full rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'all' ? 'All Categories' : c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Project Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t === 'all' ? 'All Types' : t.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Table - Responsive */}
        <section className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden">
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white">
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
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Case Study
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                        <div className="h-4 w-4 border-2 border-slate-300 border-t-sky-600 rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                          <Package className="h-8 w-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">No projects found</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Try adjusting your filters or create a new project
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          checked={selectedIds.includes(project.id)}
                          onChange={() => toggleOne(project.id)}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {project.icon && (
                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                              <img
                                src={project.icon}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                              {project.title}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{project.key}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {project.category ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                            {project.category}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {project.type ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                              project.type
                            )}`}
                          >
                            {getTypeIcon(project.type)}
                            <span className="uppercase">{project.type}</span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {project.techStack ? (
                          <div className="flex items-center gap-1">
                            <Code className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                            <span className="text-xs text-slate-600 truncate max-w-[150px]">
                              {project.techStack}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {project.caseStudy ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                            <ExternalLink className="h-3 w-3" />
                            <span className="truncate max-w-[100px]">
                              {project.caseStudy.title || project.caseStudy.slug}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">Not linked</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/admin/portfolio/${project.id}`)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-700 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          {isAdminOrManager && (
                            <button
                              onClick={() => handleDelete(project.id)}
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
                  <div className="h-4 w-4 border-2 border-slate-300 border-t-sky-600 rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <Package className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">No projects found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try adjusting your filters
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 mt-1"
                      checked={selectedIds.includes(project.id)}
                      onChange={() => toggleOne(project.id)}
                    />
                    {project.icon && (
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={project.icon}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {project.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{project.key}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {project.type && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${getTypeColor(
                              project.type
                            )}`}
                          >
                            {getTypeIcon(project.type)}
                            <span className="uppercase">{project.type}</span>
                          </span>
                        )}
                        {project.category && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {project.category}
                          </span>
                        )}
                        {project.caseStudy && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                            <ExternalLink className="h-2.5 w-2.5" />
                            <span>Case Study</span>
                          </span>
                        )}
                      </div>

                      {project.techStack && (
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span className="text-xs text-slate-600 truncate">
                            {project.techStack}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => router.push(`/admin/portfolio/${project.id}`)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-sky-100 hover:text-sky-700 px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        {isAdminOrManager && (
                          <button
                            onClick={() => handleDelete(project.id)}
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
