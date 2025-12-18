// app/(admin)/admin/portfolio-projects/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import ProjectDrawer from './ProjectDrawer';

export default function PortfolioProjectsPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  const [projects, setProjects] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  async function fetchCaseStudies() {
    const res = await fetch('/api/admin/case-studies');
    if (res.ok) {
      const data = await res.json();
      setCaseStudies(data);
    }
  }

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
    fetchCaseStudies();
    fetchProjects();
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () =>
        fetchProjects({
          q,
          category,
          type,
        }),
      300
    );
    return () => clearTimeout(t);
  }, [q, category, type]);

  const allSelected =
    selectedIds.length > 0 && selectedIds.length === projects.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < projects.length;

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(projects.map((p) => p.id));
  };

  const openCreate = () => {
    setEditingProject(null);
    setDrawerOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setDrawerOpen(true);
  };

  const onSaved = () => {
    setDrawerOpen(false);
    fetchProjects();
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
          fetch(`/api/admin/portfolio-projects/${id}`, {
            method: 'DELETE',
          })
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

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Portfolio projects
          </h1>
          <p className="text-sm text-slate-500">
            Manage portfolio cards and link them to detailed case studies.
          </p>
        </div>
        {isAdminOrManager && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
          >
            <Plus className="h-4 w-4" />
            <span>Add project</span>
          </button>
        )}
      </section>

      {/* Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, description, tech stack"
                className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All' : c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All' : t.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-sky-600 text-xs text-slate-100">
            <span>
              {selectedIds.length} project
              {selectedIds.length > 1 ? 's' : ''} selected
            </span>
            {isAdminOrManager && (
              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
                className="rounded-full bg-rose-600 px-3 py-1 font-medium hover:bg-rose-500 disabled:bg-rose-300"
              >
                {bulkDeleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-2.5 sm:px-5 w-10">
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
                <th className="px-4 py-2.5 sm:px-5">Project</th>
                <th className="px-4 py-2.5 sm:px-5">Category</th>
                <th className="px-4 py-2.5 sm:px-5">Type</th>
                <th className="px-4 py-2.5 sm:px-5">Tech stack</th>
                <th className="px-4 py-2.5 sm:px-5">Case study</th>
                <th className="px-4 py-2.5 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    Loading projects…
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 sm:px-5 w-10">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                        checked={selectedIds.includes(project.id)}
                        onChange={() => toggleOne(project.id)}
                      />
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {project.title}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          Key: {project.key}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {project.category || '—'}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {project.type?.toUpperCase() || '—'}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {project.techStack || '—'}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {project.caseStudy ? (
                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1">
                          <span className="truncate max-w-[120px]">
                            {project.caseStudy.title ||
                              project.caseStudy.slug}
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Not linked
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(project)}
                          className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        {isAdminOrManager && (
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

      {drawerOpen && (
        <ProjectDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSaved={onSaved}
          project={editingProject}
          caseStudies={caseStudies}
        />
      )}
    </div>
  );
}
