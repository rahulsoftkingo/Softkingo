'use client';

import { useEffect, useState } from 'react';

export default function UserDrawer({
    open,
    onClose,
    onSaved,
    roles,
    editingUser,
    isAdmin,
}) {
    const isEdit = !!editingUser;
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        status: 'active',
        profileImage: '',
        phone: '',
        whatsapp: '',
        department: '',
        title: '',
        bio: '',
        roleIds: [],
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setForm({
                name: editingUser.name || '',
                email: editingUser.email || '',
                username: editingUser.username || '',
                password: '',
                status: editingUser.status || 'active',
                profileImage: editingUser.profileImage || '',
                phone: editingUser.phone || '',
                whatsapp: editingUser.whatsapp || '',
                department: editingUser.department || '',
                title: editingUser.title || '',
                bio: editingUser.bio || '',
                roleIds: editingUser.roles?.map((ur) => ur.roleId) || [],
            });
            setPreviewUrl(editingUser.profileImage || '');
        } else {
            setForm({
                name: '',
                email: '',
                username: '',
                password: '',
                status: 'active',
                profileImage: '',
                phone: '',
                department: '',
                title: '',
                roleIds: [],
            });
            setPreviewUrl('');
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setError('');
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRoleToggle = (roleId) => {
        if (!isAdmin) return; // only admin can change roles
        setForm((prev) => {
            const has = prev.roleIds.includes(roleId);
            return {
                ...prev,
                roleIds: has
                    ? prev.roleIds.filter((id) => id !== roleId)
                    : [...prev.roleIds, roleId],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const payload = {
            ...form,
            roleIds: form.roleIds,
        };

        const url = isEdit
            ? `/api/admin/users/${editingUser.id}`
            : '/api/admin/users';
        const method = isEdit ? 'PATCH' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.message || 'Failed to save user.');
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
                            {isEdit ? 'Edit user' : 'Add new user'}
                        </h2>
                        <p className="text-xs text-slate-500">
                            Define access, status and basic profile details.
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
                            Full name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="e.g. Hardev Singh"
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
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="user@softkingo.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Username
                        </label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="e.g. hardev"
                            required
                        />
                    </div>

                    {/* Profile image */}
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Profile image
                        </label>

                        {/* Preview */}
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                {previewUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-12 w-12 object-cover rounded-full"
                                    />
                                ) : (
                                    <span className="text-xs font-semibold text-slate-700">
                                        {form.name?.[0]?.toUpperCase() ||
                                            form.username?.[0]?.toUpperCase() ||
                                            '?'}
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px] text-slate-500 max-w-[220px]">
                                Use an image URL or choose a file. Only the URL is stored for
                                now.
                            </p>
                        </div>

                        {/* URL input */}
                        <input
                            name="profileImage"
                            value={form.profileImage}
                            onChange={(e) => {
                                handleChange(e);
                                setPreviewUrl(e.target.value || '');
                            }}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="/images/avatars/user-01.png or https://..."
                        />

                        {/* File chooser (local preview only) */}
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-[11px] text-slate-600
             file:mr-3 file:rounded-full file:border-0 file:bg-slate-100
             file:px-3 file:py-1.5 file:text-[11px] file:font-medium
             file:text-slate-700 hover:file:bg-slate-200"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                setError('');
                                setUploadingAvatar(true);
                                try {
                                    const fd = new FormData();
                                    fd.append('file', file);
                                    fd.append('folder', 'avatars');

                                    const res = await fetch('/api/admin/upload-avatar', {
                                        method: 'POST',
                                        body: fd,
                                    });

                                    if (!res.ok) {
                                        const data = await res.json().catch(() => ({}));
                                        setError(data.message || 'Failed to upload avatar.');
                                        setUploadingAvatar(false);
                                        return;
                                    }

                                    const data = await res.json();
                                    const url = data.url; // e.g. /uploads/avatars/123-abc.png

                                    setPreviewUrl(url);
                                    setForm((prev) => ({
                                        ...prev,
                                        profileImage: url,
                                    }));
                                } catch (err) {
                                    setError('Failed to upload avatar.');
                                } finally {
                                    setUploadingAvatar(false);
                                }
                            }}
                        />
                    </div>

                    {!isEdit && (
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Set an initial password"
                                required
                                minLength={6}
                            />
                        </div>
                    )}

                    {isEdit && (
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                New password (optional)
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Leave empty to keep current password"
                                minLength={6}
                            />
                        </div>
                    )}

                    {/* Meta */}
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
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-slate-700">
                                Department
                            </label>
                            <input
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="e.g. Sales, Content"
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
                                placeholder="e.g. Senior Engineer"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Short Bio
                        </label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Briefly describe the user..."
                        />
                    </div>

                    {/* Roles */}
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-700">
                            Roles {isAdmin ? '' : '(view only)'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {roles.map((r) => {
                                const active = form.roleIds.includes(r.id);
                                return (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => handleRoleToggle(r.id)}
                                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium ${active
                                                ? 'bg-sky-600 text-white'
                                                : 'bg-slate-50 text-slate-700'
                                            } ${!isAdmin ? 'cursor-not-allowed opacity-60' : ''}`}
                                    >
                                        {r.displayName || r.name}
                                    </button>
                                );
                            })}
                        </div>
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
                            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create user'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
