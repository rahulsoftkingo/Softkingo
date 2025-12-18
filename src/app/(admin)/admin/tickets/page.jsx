// src/app/(admin)/admin/tickets/page.jsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import {
    Search,
    Filter,
    Plus,
    Edit2,
    Trash2,
    Users,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import TicketDrawer from './TicketDrawer';

function StatusBadge({ status }) {
    const map = {
        open: 'bg-emerald-50 text-emerald-700',
        in_progress: 'bg-sky-50 text-sky-700',
        waiting: 'bg-amber-50 text-amber-700',
        resolved: 'bg-slate-50 text-slate-700',
        closed: 'bg-slate-100 text-slate-500',
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${map[status] || 'bg-slate-50 text-slate-600'
                }`}
        >
            {status?.replace('_', ' ') || 'open'}
        </span>
    );
}

function PriorityBadge({ priority }) {
    const map = {
        low: 'bg-slate-50 text-slate-600',
        medium: 'bg-sky-50 text-sky-700',
        high: 'bg-amber-50 text-amber-700',
        urgent: 'bg-rose-50 text-rose-700',
    };
    const dot = {
        low: 'bg-slate-400',
        medium: 'bg-sky-500',
        high: 'bg-amber-500',
        urgent: 'bg-rose-500',
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${map[priority] || map.medium
                }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dot[priority] || dot.medium
                    }`}
            />
            {priority || 'medium'}
        </span>
    );
}

export default function TicketsPage() {
    const { data: session } = useSession();
    const roles = session?.user?.roles || [];
    const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

    const searchParams = useSearchParams();
    const [prefillFromLead, setPrefillFromLead] = useState(null);

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [q, setQ] = useState('');
    const [status, setStatus] = useState('all');
    const [priority, setPriority] = useState('all');
    const [channel, setChannel] = useState('all');
    const [ownerId, setOwnerId] = useState('all');
    const [scope, setScope] = useState('mine');
    const [loading, setLoading] = useState(true);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);

    const [selectedIds, setSelectedIds] = useState([]);
    const [bulkMode, setBulkMode] = useState(null); // 'assign' | 'status' | 'priority' | 'delete'
    const [bulkOwnerId, setBulkOwnerId] = useState('');
    const [bulkStatus, setBulkStatus] = useState('in_progress');
    const [bulkPriority, setBulkPriority] = useState('medium');
    const [bulkSaving, setBulkSaving] = useState(false);

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

    async function fetchTickets(params = {}) {
        setLoading(true);
        const search = new URLSearchParams({
            q: params.q ?? q,
            status: params.status ?? status,
            priority: params.priority ?? priority,
            channel: params.channel ?? channel,
            ownerId: params.ownerId ?? ownerId,
            scope: params.scope ?? scope,
        });
        const res = await fetch(`/api/admin/tickets?${search.toString()}`);
        if (res.ok) {
            const data = await res.json();
            setTickets(data);
            setSelectedIds((prev) => prev.filter((id) => data.some((t) => t.id === id)));
            setPage(1);
        }
        setLoading(false);
    }
    useEffect(() => {
        const leadIdParam = searchParams.get('leadId');
        const titleParam = searchParams.get('title');

        if (leadIdParam || titleParam) {
            setPrefillFromLead({
                leadId: leadIdParam || '',
                title: titleParam || '',
            });
            setEditingTicket(null);
            setDrawerOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchUsers();
        fetchTickets();
    }, []);

    useEffect(() => {
        const t = setTimeout(
            () =>
                fetchTickets({
                    q,
                    status,
                    priority,
                    channel,
                    ownerId,
                    scope,
                }),
            300
        );
        return () => clearTimeout(t);
    }, [q, status, priority, channel, ownerId, scope]);

    const allSelected =
        selectedIds.length > 0 && selectedIds.length === tickets.length;
    const someSelected =
        selectedIds.length > 0 && selectedIds.length < tickets.length;

    const toggleOne = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (allSelected) setSelectedIds([]);
        else setSelectedIds(tickets.map((t) => t.id));
    };

    const openCreate = () => {
        setEditingTicket(null);
        setDrawerOpen(true);
    };

    const openEdit = (ticket) => {
        setEditingTicket(ticket);
        setDrawerOpen(true);
    };

    const onSaved = () => {
        setDrawerOpen(false);
        fetchTickets();
    };

    const handleDelete = async (id) => {
        if (!isAdminOrManager) return;
        if (!confirm('Delete this ticket?')) return;
        const res = await fetch(`/api/admin/tickets/${id}`, { method: 'DELETE' });
        if (res.ok) fetchTickets();
    };

    const runBulk = async (action) => {
        if (!isAdminOrManager || selectedIds.length === 0) return;
        setBulkSaving(true);
        const res = await fetch('/api/admin/tickets/bulk', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action,
                ids: selectedIds,
                ownerId: action === 'assign' ? bulkOwnerId : undefined,
                status: action === 'status' ? bulkStatus : undefined,
                priority: action === 'priority' ? bulkPriority : undefined,
            }),
        });
        setBulkSaving(false);
        if (res.ok) {
            setBulkMode(null);
            setSelectedIds([]);
            fetchTickets();
        }
    };

    const selectedCount = selectedIds.length;
    const currentScopeLabel = useMemo(
        () => (scope === 'mine' ? 'My tickets' : 'Team tickets'),
        [scope]
    );

    // pagination slice
    const total = tickets.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const visibleTickets = tickets.slice(startIndex, startIndex + pageSize);

    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    return (
        <div className="space-y-5">
            {/* Header */}
            <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                        Tickets
                    </h1>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        <span>Support & internal tickets with priorities and assignments.</span>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center rounded-full bg-slate-100 px-1 py-1 text-xs">
                        <button
                            type="button"
                            onClick={() => setScope('mine')}
                            className={`flex items-center gap-1 rounded-full px-3 py-1 ${scope === 'mine'
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
                                className={`flex items-center gap-1 rounded-full px-3 py-1 ${scope === 'team'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-600'
                                    }`}
                            >
                                <span>Team</span>
                            </button>
                        )}
                    </div>
                    {isAdminOrManager && (
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Create ticket</span>
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
                                placeholder="Title, description, tags"
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
                            <option value="open">Open</option>
                            <option value="in_progress">In progress</option>
                            <option value="waiting">Waiting</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Priority
                        </label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="all">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Channel
                        </label>
                        <select
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                            className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="all">All</option>
                            <option value="web">Web</option>
                            <option value="email">Email</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="internal">Internal</option>
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

            {/* Table + bulk + pagination */}
            <section className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
                {selectedIds.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-2 bg-sky-600 text-xs text-slate-100">
                        <span>
                            {selectedIds.length} ticket
                            {selectedIds.length > 1 ? 's' : ''} selected
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
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
                                        onClick={() => setBulkMode('priority')}
                                        className="rounded-full bg-sky-900 px-3 py-1 font-medium hover:bg-slate-700"
                                    >
                                        Change priority
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
                                <th className="px-4 py-2.5 sm:px-5">Ticket</th>
                                <th className="px-4 py-2.5 sm:px-5">Priority</th>
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
                                        Loading tickets…
                                    </td>
                                </tr>
                            ) : visibleTickets.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-sm text-slate-500"
                                    >
                                        No tickets found.
                                    </td>
                                </tr>
                            ) : (
                                visibleTickets.map((ticket) => (
                                    <tr
                                        key={ticket.id}
                                        className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                                    >
                                        <td className="px-4 py-3 sm:px-5 w-10">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                                checked={selectedIds.includes(ticket.id)}
                                                onChange={() => toggleOne(ticket.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 sm:px-5">
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    {ticket.title}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate">
                                                    {ticket.channel || 'internal'} ·{' '}
                                                    {ticket.lead
                                                        ? `Lead: ${ticket.lead.name || ticket.lead.email}`
                                                        : ticket.requester
                                                            ? ticket.requester.email
                                                            : 'No requester'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 sm:px-5">
                                            <PriorityBadge priority={ticket.priority} />
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                                            {ticket.owner ? (
                                                <>
                                                    <p className="truncate">
                                                        {ticket.owner.name || ticket.owner.username}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 truncate">
                                                        {ticket.owner.email || ''}
                                                    </p>
                                                </>
                                            ) : (
                                                <span className="text-[11px] text-slate-400">
                                                    Unassigned
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 sm:px-5">
                                            <StatusBadge status={ticket.status} />
                                        </td>
                                        <td className="px-4 py-3 sm:px-5 text-xs text-slate-500">
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 sm:px-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(ticket)}
                                                    className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </button>
                                                {isAdminOrManager && (
                                                    <button
                                                        onClick={() => handleDelete(ticket.id)}
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

                {/* Mobile cards */}
                <div className="md:hidden">
                    {loading ? (
                        <p className="px-4 py-5 text-sm text-slate-500 text-center">
                            Loading tickets…
                        </p>
                    ) : visibleTickets.length === 0 ? (
                        <p className="px-4 py-5 text-sm text-slate-500 text-center">
                            No tickets found.
                        </p>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {visibleTickets.map((ticket) => (
                                <div key={ticket.id} className="px-4 py-4 space-y-1.5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">
                                                {ticket.title}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate">
                                                {ticket.channel || 'internal'} ·{' '}
                                                {ticket.priority.toUpperCase()}
                                            </p>
                                            {ticket.lead && (
                                                <p className="text-[11px] text-slate-400 truncate">
                                                    Lead: {ticket.lead.name || ticket.lead.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <PriorityBadge priority={ticket.priority} />
                                            <StatusBadge status={ticket.status} />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                                        <span>
                                            {ticket.owner
                                                ? ticket.owner.name || ticket.owner.username
                                                : 'Unassigned'}
                                        </span>
                                        <span>
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-end gap-1.5 pt-1">
                                        <button
                                            onClick={() => toggleOne(ticket.id)}
                                            className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] ${selectedIds.includes(ticket.id)
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-slate-50 text-slate-700'
                                                }`}
                                        >
                                            Select
                                        </button>
                                        <button
                                            onClick={() => openEdit(ticket)}
                                            className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2 py-1 text-[11px] text-slate-700"
                                        >
                                            <Edit2 className="h-3 w-3" />
                                        </button>
                                        {isAdminOrManager && (
                                            <button
                                                onClick={() => handleDelete(ticket.id)}
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

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2 border-t border-slate-100 bg-white text-xs text-slate-600">
                    <span>
                        Page {currentPage} of {totalPages} · {total} tickets
                    </span>
                    <div className="inline-flex items-center gap-1 self-end sm:self-auto">
                        <button
                            disabled={!canPrev}
                            onClick={() => canPrev && setPage((p) => p - 1)}
                            className={`inline-flex items-center rounded-full px-2.5 py-1 border text-xs ${canPrev
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
                            className={`inline-flex items-center rounded-full px-2.5 py-1 border text-xs ${canNext
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

            {/* Bulk modals */}
            {bulkMode === 'assign' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl space-y-3">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Assign {selectedCount} tickets
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
                            Change status for {selectedCount} tickets
                        </h3>
                        <select
                            value={bulkStatus}
                            onChange={(e) => setBulkStatus(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In progress</option>
                            <option value="waiting">Waiting</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
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

            {bulkMode === 'priority' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl space-y-3">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Change priority for {selectedCount} tickets
                        </h3>
                        <select
                            value={bulkPriority}
                            onChange={(e) => setBulkPriority(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setBulkMode(null)}
                                className="text-xs text-slate-500 hover:text-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => runBulk('priority')}
                                disabled={bulkSaving}
                                className="inline-flex items-center rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white disabled:bg-sky-300"
                            >
                                {bulkSaving ? 'Updating…' : 'Update priority'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {bulkMode === 'delete' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl space-y-3">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Delete {selectedCount} tickets?
                        </h3>
                        <p className="text-xs text-slate-500">
                            This action cannot be undone. Comments on these tickets will also be
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

            {drawerOpen && (
                <TicketDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    onSaved={onSaved}
                    ticket={editingTicket}
                    users={users}
                    prefillFromLead={prefillFromLead}   // NEW

                />
            )}
        </div>
    );
}
