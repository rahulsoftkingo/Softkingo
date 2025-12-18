// src/app/(admin)/admin/tickets/TicketDrawer.jsx
'use client';

import { useEffect, useState } from 'react';

export default function TicketDrawer({
  open,
  onClose,
  onSaved,
  ticket,
  users,
  prefillFromLead, // { leadId, title } | null
}) {
  const isEdit = !!ticket;

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    channel: 'internal',
    ownerId: '',
    requesterId: '',
    leadId: '',
    dueDate: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [comments, setComments] = useState([]);
  const [note, setNote] = useState('');
  const [noteVisibility, setNoteVisibility] = useState('internal');
  const [noteSaving, setNoteSaving] = useState(false);

  useEffect(() => {
    if (ticket) {
      setForm({
        title: ticket.title || '',
        description: ticket.description || '',
        status: ticket.status || 'open',
        priority: ticket.priority || 'medium',
        channel: ticket.channel || 'internal',
        ownerId: ticket.ownerId ? String(ticket.ownerId) : '',
        requesterId: ticket.requesterId ? String(ticket.requesterId) : '',
        leadId: ticket.leadId ? String(ticket.leadId) : '',
        dueDate: ticket.dueDate
          ? new Date(ticket.dueDate).toISOString().slice(0, 10)
          : '',
      });
      setComments(ticket.comments || []);
    } else {
      // NEW: prefill from lead query if provided
      setForm((prev) => ({
        ...prev,
        title: prefillFromLead?.title || '',
        leadId: prefillFromLead?.leadId || '',
      }));
      setComments([]);
    }
    setError('');
    setNote('');
  }, [ticket, prefillFromLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }

    setSaving(true);
    setError('');

    const url = isEdit ? `/api/admin/tickets/${ticket.id}` : '/api/admin/tickets';
    const method = isEdit ? 'PATCH' : 'POST';

    const payload = {
      title: form.title,
      description: form.description || null,
      status: form.status,
      priority: form.priority,
      channel: form.channel,
      ownerId: form.ownerId ? Number(form.ownerId) : null,
      requesterId: form.requesterId ? Number(form.requesterId) : null,
      leadId: form.leadId ? Number(form.leadId) : prefillFromLead?.leadId ? Number(prefillFromLead.leadId) : null,
      dueDate: form.dueDate || null,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save ticket.');
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved();
  };

  const addNote = async () => {
    if (!ticket || !note.trim()) return;
    setNoteSaving(true);
    const res = await fetch(`/api/admin/tickets/${ticket.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'note',
        visibility: noteVisibility,
        content: note,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setComments((prev) => [data, ...prev]);
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
              {isEdit ? 'Edit ticket' : 'Create ticket'}
            </h2>
            <p className="text-xs text-slate-500">
              Manage ticket details, priority, owner and internal notes.
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
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Short summary of the issue"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Details, steps to reproduce, or context"
            />
          </div>

          {/* Status / Priority */}
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
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
                <option value="waiting">Waiting</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Channel / Due date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Channel
              </label>
              <select
                name="channel"
                value={form.channel}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="internal">Internal</option>
                <option value="web">Web</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Due date
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Owner / Requester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Requester (optional)
              </label>
              <select
                name="requesterId"
                value={form.requesterId}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Auto / none</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Read-only meta if linked */}
          {ticket && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <div>
                <p>ID: {ticket.id}</p>
                <p>Channel: {ticket.channel || 'internal'}</p>
                <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p>
                  Lead:{' '}
                  {ticket.lead
                    ? `${ticket.lead.name || ticket.lead.email} (#${ticket.lead.id})`
                    : '—'}
                </p>
                <p>
                  Requester:{' '}
                  {ticket.requester
                    ? ticket.requester.name || ticket.requester.email
                    : '—'}
                </p>
              </div>
            </div>
          )}

          {/* Notes / comments */}
          {isEdit && (
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <label className="block text-xs font-medium text-slate-700">
                Add note / reply
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Internal note or customer reply..."
              />
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                  <span>Visibility:</span>
                  <button
                    type="button"
                    onClick={() => setNoteVisibility('internal')}
                    className={`px-2 py-1 rounded-full border ${
                      noteVisibility === 'internal'
                        ? 'border-slate-800 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    Internal
                  </button>
                  <button
                    type="button"
                    onClick={() => setNoteVisibility('public')}
                    className={`px-2 py-1 rounded-full border ${
                      noteVisibility === 'public'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    Public
                  </button>
                </div>
                <button
                  type="button"
                  onClick={addNote}
                  disabled={noteSaving || !note.trim()}
                  className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white disabled:bg-slate-400"
                >
                  {noteSaving ? 'Saving…' : 'Add note'}
                </button>
              </div>

              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {comments.map((c) => (
                  <div key={c.id} className="rounded-lg bg-slate-50 px-3 py-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>
                        {c.createdBy
                          ? c.createdBy.name || c.createdBy.username
                          : 'System'}
                      </span>
                      <span>
                        {new Date(c.createdAt).toLocaleString()} · {c.visibility}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 whitespace-pre-wrap">
                      {c.content}
                    </p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-[11px] text-slate-400">
                    No notes yet. Add the first note above.
                  </p>
                )}
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
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
