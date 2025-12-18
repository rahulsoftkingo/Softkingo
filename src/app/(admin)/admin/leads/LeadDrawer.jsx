'use client';

import { useEffect, useState } from 'react';

export default function LeadDrawer({ open, onClose, onSaved, lead, users }) {
    const isEdit = !!lead;
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        source: 'website',
        campaign: '',
        message: '',
        status: 'new',
        ownerId: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [activities, setActivities] = useState([]);
    const [note, setNote] = useState('');
    const [noteSaving, setNoteSaving] = useState(false);

    useEffect(() => {
        if (lead) {
            setForm({
                name: lead.name || '',
                email: lead.email || '',
                phone: lead.phone || '',
                whatsapp: lead.whatsapp || '',
                source: lead.source || 'website',
                campaign: lead.campaign || '',
                message: lead.message || '',
                status: lead.status || 'new',
                ownerId: lead.ownerId ? String(lead.ownerId) : '',
            });
            setActivities(lead.activities || []);
        } else {
            setForm({
                name: '',
                email: '',
                phone: '',
                whatsapp: '',
                source: 'website',
                campaign: '',
                message: '',
                status: 'new',
                ownerId: '',
            });
            setActivities([]);
        }
    }, [lead]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError('');
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const url = isEdit ? `/api/admin/leads/${lead.id}` : '/api/admin/leads';
        const method = isEdit ? 'PATCH' : 'POST';

        const payload = {
            ...form,
            ownerId: form.ownerId ? Number(form.ownerId) : null,
        };

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.message || 'Failed to save lead.');
            setSaving(false);
            return;
        }

        setSaving(false);
        onSaved();
    };

    const addNote = async () => {
        if (!lead || !note.trim()) return;
        setNoteSaving(true);
        const res = await fetch(`/api/admin/leads/${lead.id}/activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'note', content: note }),
        });
        if (res.ok) {
            const data = await res.json();
            setActivities((prev) => [data, ...prev]);
            setNote('');
        }
        setNoteSaving(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40 flex">
            <div
                className="flex-1 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="w-full max-w-md bg-white h-full shadow-[0_18px_45px_rgba(15,23,42,0.25)] p-5 sm:p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                            {isEdit ? 'Edit lead' : 'Add lead'}
                        </h2>
                        <p className="text-xs text-slate-500">
                            View and update lead details, assign owner and status.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xs text-slate-500 hover:text-slate-700"
                    >
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic info */}
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Lead name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="lead@example.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Phone
                            </label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="+91…"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                WhatsApp
                            </label>
                            <input
                                name="whatsapp"
                                value={form.whatsapp}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="+91…"
                            />
                        </div>
                    </div>

                    {/* Source / campaign */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Source
                            </label>
                            <input
                                name="source"
                                value={form.source}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="website, campaign, referral…"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Campaign
                            </label>
                            <input
                                name="campaign"
                                value={form.campaign}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Campaign name"
                            />
                        </div>
                    </div>

                    {/* Status + owner */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Status
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="lost">Lost</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Owner
                            </label>
                            <select
                                name="ownerId"
                                value={form.ownerId}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                <option value="">Unassigned</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Short description of the requirement."
                        />
                    </div>

                    {/* Read-only meta */}
                    {lead && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                            <div>
                                <p>Form type: {lead.formType || '—'}</p>
                                <p>Form key: {lead.formKey || '—'}</p>
                                <p>UTM: {lead.utmSource || '—'}</p>
                            </div>
                            <div>
                                <p>Budget: {lead.budgetLabel || '—'}</p>
                                <p>
                                    NDA:{' '}
                                    {lead.ndaAccepted == null
                                        ? '—'
                                        : lead.ndaAccepted
                                            ? 'Yes'
                                            : 'No'}
                                </p>
                                <p>File: {lead.attachmentName || '—'}</p>
                            </div>
                        </div>
                    )}
                    

                    {lead && (
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                            <div className="text-[11px] text-slate-500">
                                <p className="font-medium text-slate-700">Tickets</p>
                                <p>
                                    Create a support ticket linked to this lead for bugs, requests or tasks.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    const params = new URLSearchParams({
                                        leadId: String(lead.id),
                                        title:
                                            lead.name || lead.email
                                                ? `Ticket for ${lead.name || lead.email}`
                                                : 'New ticket',
                                    });
                                    window.location.href = `/admin/tickets?${params.toString()}`;
                                }}
                                className="ml-2 inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800"
                            >
                                Create ticket
                            </button>
                        </div>
                    )}

                    {/* Notes */}
                    {isEdit && (
                        <div className="space-y-2 border-t border-slate-200 pt-3">
                            <label className="block text-xs font-medium text-slate-700">
                                Add internal note
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={2}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Call summary, next steps, objections…"
                            />
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={addNote}
                                    disabled={noteSaving || !note.trim()}
                                    className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white disabled:bg-slate-400"
                                >
                                    {noteSaving ? 'Saving…' : 'Add note'}
                                </button>
                                <span className="text-[11px] text-slate-400">
                                    {activities.length} note
                                    {activities.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                                {activities.map((a) => (
                                    <div key={a.id} className="rounded-lg bg-slate-50 px-3 py-2">
                                        <p className="text-xs text-slate-700 whitespace-pre-wrap">
                                            {a.content}
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-400">
                                            {a.createdBy
                                                ? (a.createdBy.name || a.createdBy.username) + ' · '
                                                : ''}
                                            {new Date(a.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-xs text-slate-500 hover:text-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 disabled:bg-sky-300"
                        >
                            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
