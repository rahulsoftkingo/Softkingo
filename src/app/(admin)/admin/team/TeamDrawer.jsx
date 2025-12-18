'use client';

import { useEffect, useState } from 'react';

export default function TeamDrawer({ open, onClose, onSaved, editing }) {
  const isEdit = !!editing;
  const [form, setForm] = useState({
    name: '',
    title: '',
    department: '',
    photo: '',
    bio: '',
    linkedinUrl: '',
    order: 0,
    featured: false,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || '',
        title: editing.title || '',
        department: editing.department || '',
        photo: editing.photo || '',
        bio: editing.bio || '',
        linkedinUrl: editing.linkedinUrl || '',
        order: editing.order || 0,
        featured: editing.featured || false,
      });
      setPreviewUrl(editing.photo || '');
    } else {
      setForm({
        name: '',
        title: '',
        department: '',
        photo: '',
        bio: '',
        linkedinUrl: '',
        order: 0,
        featured: false,
      });
      setPreviewUrl('');
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError('');
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEdit ? `/api/admin/team/${editing.id}` : '/api/admin/team';
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save team member.');
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved();
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
              {isEdit ? 'Edit team member' : 'Add team member'}
            </h2>
            <p className="text-xs text-slate-500">
              Shown on the website team section.
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
          {/* Photo */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Photo URL
            </label>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-200 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-12 w-12 object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-slate-700">
                    {form.name?.[0]?.toUpperCase() || '?'}
                  </span>
                )}
              </div>
              <input
                name="photo"
                value={form.photo}
                onChange={(e) => {
                  handleChange(e);
                  setPreviewUrl(e.target.value || '');
                }}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="/images/team/member.png or https://..."
              />
            </div>
          </div>

          {/* Basics */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="e.g. Lead Engineer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="e.g. Engineering, Marketing"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              LinkedIn URL
            </label>
            <input
              name="linkedinUrl"
              value={form.linkedinUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Order + featured */}
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Display order
              </label>
              <input
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <label
                htmlFor="featured"
                className="text-xs text-slate-600 select-none"
              >
                Mark as featured
              </label>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Short bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="2–3 line summary for the website."
            />
          </div>

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
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
