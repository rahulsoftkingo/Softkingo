'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Filter, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import CaseStudyDrawer from './CaseStudyDrawer';

export default function CaseStudiesPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) =>
    ['admin', 'manager'].includes(r),
  );

  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  async function fetchItems(params = {}) {
    setLoading(true);
    const search = new URLSearchParams({
      q: params.q ?? q,
    });
    const res = await fetch(`/api/admin/case-studies?${search.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data);
      setSelectedIds((prev) =>
        prev.filter((id) => data.some((x) => x.id === id)),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchItems({ q }), 300);
    return () => clearTimeout(t);
  }, [q]);

  const allSelected =
    selectedIds.length > 0 && selectedIds.length === items.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < items.length;

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(items.map((x) => x.id));
  };

  const openCreate = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setDrawerOpen(true);
  };

  const onSaved = () => {
    setDrawerOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!isAdminOrManager) return;
    if (!confirm('Delete this case study?')) return;
    const res = await fetch(`/api/admin/case-studies/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchItems();
  };

  const handleBulkDelete = async () => {
    if (!isAdminOrManager || selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} case studies?`)) return;
    setBulkDeleting(true);
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/admin/case-studies/${id}`, {
            method: 'DELETE',
          }),
        ),
      );
      setSelectedIds([]);
      fetchItems();
    } finally {
      setBulkDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Case studies
          </h1>
          <p className="text-sm text-slate-500">
            Manage detailed case studies linked from portfolio projects.
          </p>
        </div>
        {isAdminOrManager && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
          >
            <Plus className="h-4 w-4" />
            <span>Add case study</span>
          </button>
        )}
      </section>

      {/* Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                placeholder="Title, slug, subtitle"
                className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-sky-600 text-xs text-slate-100">
            <span>
              {selectedIds.length} selected
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
                <th className="px-4 py-2.5 sm:px-5">Title</th>
                <th className="px-4 py-2.5 sm:px-5">Slug</th>
                <th className="px-4 py-2.5 sm:px-5">Updated</th>
                <th className="px-4 py-2.5 sm:px-5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No case studies yet.
                  </td>
                </tr>
              ) : (
                items.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 sm:px-5 w-10">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleOne(row.id)}
                      />
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {row.title}
                        </p>
                        {row.subtitle && (
                          <p className="text-[11px] text-slate-400 truncate">
                            {row.subtitle}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {row.slug}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {new Date(row.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        {isAdminOrManager && (
                          <button
                            onClick={() => handleDelete(row.id)}
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
        <CaseStudyDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSaved={onSaved}
          caseStudy={editing}
        />
      )}
    </div>
  );
}
