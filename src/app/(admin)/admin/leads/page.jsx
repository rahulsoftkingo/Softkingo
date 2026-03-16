// src/app/(admin)/admin/leads/page.jsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import LeadEditModal from './LeadEditModal';

function StatusBadge({ status }) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium';
  const map = {
    new: 'bg-sky-50 text-sky-700',
    contacted: 'bg-amber-50 text-amber-700',
    qualified: 'bg-emerald-50 text-emerald-700',
    lost: 'bg-rose-50 text-rose-700',
  };
  return (
    <span className={`${base} ${map[status] || 'bg-slate-50 text-slate-600'}`}>
      {status || 'unknown'}
    </span>
  );
}

export default function LeadsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [source, setSource] = useState('all');
  const [formType, setFormType] = useState('all');
  const [ownerId, setOwnerId] = useState('all');
  const [scope, setScope] = useState('mine');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkMode, setBulkMode] = useState(null); // 'assign' | 'status' | 'delete'
  const [bulkOwnerId, setBulkOwnerId] = useState('');
  const [bulkStatus, setBulkStatus] = useState('contacted');
  const [bulkSaving, setBulkSaving] = useState(false);

  const [importing, setImporting] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function fetchUsers() {
    const res = await fetch('/api/admin/users?status=active&role=all');
    if (res.ok) {
      const data = await res.json();
      setUsers(
        data.map((u) => ({
          id: u.id,
          name: u.name || u.username,
          email: u.email,
        }))
      );
    }
  }

  async function fetchLeads(params = {}) {
    setLoading(true);
    const search = new URLSearchParams({
      q: params.q ?? q,
      status: params.status ?? status,
      source: params.source ?? source,
      formType: params.formType ?? formType,
      ownerId: params.ownerId ?? ownerId,
      scope: params.scope ?? scope,
    });
    const res = await fetch(`/api/admin/leads?${search.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setLeads(data);
      setSelectedIds((prev) => prev.filter((id) => data.some((l) => l.id === id)));
      setPage(1); // filters change pe first page
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
    fetchLeads();
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () =>
        fetchLeads({
          q,
          status,
          source,
          formType,
          ownerId,
          scope,
        }),
      300
    );
    return () => clearTimeout(t);
  }, [q, status, source, formType, ownerId, scope]);

  const allSelected =
    selectedIds.length > 0 && selectedIds.length === leads.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < leads.length;

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(leads.map((l) => l.id));
  };

  const openCreate = () => {
    setSelectedLead(null);
    setModalOpen(true);
  };

  const openEdit = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const onSaved = () => {
    setModalOpen(false);
    fetchLeads();
  };

  const handleDelete = async (id) => {
    if (!isAdminOrManager) return;
    if (!confirm('Delete this lead?')) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    if (res.ok) fetchLeads();
  };

  const runBulk = async (action) => {
    if (!isAdminOrManager || selectedIds.length === 0) return;
    setBulkSaving(true);
    const res = await fetch('/api/admin/leads/bulk', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        ids: selectedIds,
        ownerId: action === 'assign' ? bulkOwnerId : undefined,
        status: action === 'status' ? bulkStatus : undefined,
      }),
    });
    setBulkSaving(false);
    if (res.ok) {
      setBulkMode(null);
      setSelectedIds([]);
      fetchLeads();
    }
  };

  const downloadCsv = () => {
    const search = new URLSearchParams({
      q,
      status,
      source,
      formType,
      ownerId,
      scope,
    });
    window.location.href = `/api/admin/leads/export?${search.toString()}`;
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/admin/leads/import', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Import failed');
        return;
      }

      const data = await res.json();
      alert(`Imported ${data.created} leads`);
      fetchLeads();
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  const selectedCount = selectedIds.length;
  const currentScopeLabel = useMemo(
    () => (scope === 'mine' ? 'My leads' : 'Team leads'),
    [scope]
  );

  // pagination slice
  const total = leads.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleLeads = leads.slice(startIndex, startIndex + pageSize);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="space-y-5">
      {/* Header + actions */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Leads
          </h1>
          <p className="text-sm text-slate-500">
            Advanced lead management with assignments, notes, bulk actions and CSV.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-1 py-1 text-xs">
            <button
              type="button"
              onClick={() => setScope('mine')}
              className={`flex items-center gap-1 rounded-full px-3 py-1 ${
                scope === 'mine'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>My</span>
            </button>
            {isAdminOrManager && (
              <button
                type="button"
                onClick={() => setScope('team')}
                className={`flex items-center gap-1 rounded-full px-3 py-1 ${
                  scope === 'team'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <span>Team</span>
              </button>
            )}
          </div>
          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>

          <label className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 cursor-pointer">
            <Upload className="h-3.5 w-3.5" />
            <span>{importing ? 'Uploading…' : 'Upload CSV'}</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImport}
            />
          </label>

          {isAdminOrManager && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
            >
              <Plus className="h-4 w-4" />
              <span>Add lead</span>
            </button>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters · {currentScopeLabel}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, email, phone, campaign, message"
                className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              <option value="website">Website</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="campaign">Campaign</option>
              <option value="referral">Referral</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Form type
            </label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              <option value="inquiry">Inquiry</option>
              <option value="service">Service</option>
              <option value="ebook">Ebook</option>
              <option value="hire">Hire</option>
              <option value="popup">Popup</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Owner
            </label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Table + bulk bar + pagination */}
      <section className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-sky-600 text-xs text-slate-100">
            <span>
              {selectedIds.length} lead
              {selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              {isAdminOrManager && (
                <>
                  <button
                    type="button"
                    onClick={() => setBulkMode('assign')}
                    className="rounded-full bg-sky-900 px-3 py-1 font-medium hover:bg-slate-700"
                  >
                    Assign owner
                  </button>
                  <button
                    type="button"
                    onClick={() => setBulkMode('status')}
                    className="rounded-full bg-sky-900 px-3 py-1 font-medium hover:bg-slate-700"
                  >
                    Change status
                  </button>
                  <button
                    type="button"
                    onClick={() => setBulkMode('delete')}
                    className="rounded-full bg-rose-600 px-3 py-1 font-medium hover:bg-rose-500"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-sky-50">
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
                <th className="px-4 py-2.5 sm:px-5">Lead</th>
                <th className="px-4 py-2.5 sm:px-5">Source</th>
                <th className="px-4 py-2.5 sm:px-5">Owner</th>
                <th className="px-4 py-2.5 sm:px-5">Status</th>
                <th className="px-4 py-2.5 sm:px-5">Created</th>
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
                    Loading leads…
                  </td>
                </tr>
              ) : visibleLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                visibleLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 sm:px-5 w-10">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                        checked={selectedIds.includes(lead.id)}
                        onChange={() => toggleOne(lead.id)}
                      />
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {lead.email} ·{' '}
                          {lead.phone || lead.whatsapp || 'No phone'}
                        </p>
                        {lead.campaign && (
                          <p className="text-[11px] text-slate-400 truncate">
                            Campaign: {lead.campaign}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600 space-y-1">
                      <p className="capitalize">
                        {lead.source || 'unknown'} ·{' '}
                        {lead.formType || 'generic'}
                      </p>
                      {lead.formKey && (
                        <p className="text-[11px] text-slate-400 truncate">
                          {lead.formKey}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      {lead.owner ? (
                        <>
                          <p className="truncate">
                            {lead.owner.name || lead.owner.username}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {lead.owner.email || ''}
                          </p>
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(lead)}
                          className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        {isAdminOrManager && (
                          <button
                            onClick={() => handleDelete(lead.id)}
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

        {/* Mobile cards – use visibleLeads for pagination, same layout */}
        <div className="md:hidden">
          {loading ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              Loading leads…
            </p>
          ) : visibleLeads.length === 0 ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              No leads found.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {visibleLeads.map((lead) => (
                <div key={lead.id} className="px-4 py-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {lead.email} ·{' '}
                        {lead.phone || lead.whatsapp || 'No phone'}
                      </p>
                      {lead.campaign && (
                        <p className="text-[11px] text-slate-400 truncate">
                          Campaign: {lead.campaign}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-500">
                        {lead.source || 'unknown'} ·{' '}
                        {lead.formType || 'generic'}
                      </p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      {lead.owner
                        ? lead.owner.name || lead.owner.username
                        : 'Unassigned'}
                    </span>
                    <span>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-end gap-1.5 pt-1">
                    <button
                      onClick={() => toggleOne(lead.id)}
                      className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] ${
                        selectedIds.includes(lead.id)
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      Select
                    </button>
                    <button
                      onClick={() => openEdit(lead)}
                      className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2 py-1 text-[11px] text-slate-700"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                    {isAdminOrManager && (
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2 border-t border-slate-100 bg-white text-xs text-slate-600">
          <span>
            Page {currentPage} of {totalPages} · {total} leads
          </span>
          <div className="inline-flex items-center gap-1 self-end sm:self-auto">
            <button
              disabled={!canPrev}
              onClick={() => canPrev && setPage((p) => p - 1)}
              className={`inline-flex items-center rounded-full px-2.5 py-1 border text-xs ${
                canPrev
                  ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-3 w-3" />
              <span className="ml-0.5">Prev</span>
            </button>
            <button
              disabled={!canNext}
              onClick={() => canNext && setPage((p) => p + 1)}
              className={`inline-flex items-center rounded-full px-2.5 py-1 border text-xs ${
                canNext
                  ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <span className="mr-0.5">Next</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Bulk modals (same as tumhare code) */}
      {bulkMode === 'assign' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Assign {selectedCount} leads
            </h3>
            <select
              value={bulkOwnerId}
              onChange={(e) => setBulkOwnerId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setBulkMode(null)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => runBulk('assign')}
                disabled={bulkSaving}
                className="inline-flex items-center rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white disabled:bg-sky-300"
              >
                {bulkSaving ? 'Assigning…' : 'Assign'}
              </button>
            </div>
          </div>
        </div>
      )}

      {bulkMode === 'status' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Change status for {selectedCount} leads
            </h3>
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setBulkMode(null)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => runBulk('status')}
                disabled={bulkSaving}
                className="inline-flex items-center rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white disabled:bg-sky-300"
              >
                {bulkSaving ? 'Updating…' : 'Update status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {bulkMode === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Delete {selectedCount} leads?
            </h3>
            <p className="text-xs text-slate-500">
              This action cannot be undone. Notes for these leads will also be
              removed.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setBulkMode(null)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => runBulk('delete')}
                disabled={bulkSaving}
                className="inline-flex items-center rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white disabled:bg-rose-300"
              >
                {bulkSaving ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <LeadEditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={onSaved}
          lead={selectedLead}
          users={users}
        />
      )}
    </div>
  );
}
