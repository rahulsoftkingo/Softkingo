'use client';

import { useEffect, useState } from 'react';
import ImageUploadComponent from '@/components/admin/ImageUploadComponent';
import { X, Save, User as UserIcon, Briefcase, Tag, Link2, Info, Star, Loader2 } from 'lucide-react';

export default function TeamModal({ open, onClose, onSaved, editing }) {
    const isEdit = !!editing;
    const [form, setForm] = useState({
        name: '',
        title: '',
        department: '',
        category: 'employee',
        photo: '',
        bio: '',
        linkedinUrl: '',
        order: 0,
        featured: false,
        status: 'active',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editing) {
            setForm({
                name: editing.name || '',
                title: editing.title || '',
                department: editing.department || '',
                category: editing.category || 'employee',
                photo: editing.photo || '',
                bio: editing.bio || '',
                linkedinUrl: editing.linkedinUrl || '',
                order: editing.order || 0,
                featured: editing.featured || false,
                status: editing.status || 'active',
            });
        } else {
            setForm({
                name: '',
                title: '',
                department: '',
                category: 'employee',
                photo: '',
                bio: '',
                linkedinUrl: '',
                order: 0,
                featured: false,
                status: 'active',
            });
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-600 text-white rounded-2xl shadow-xl shadow-sky-100">
                            <UserIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                {isEdit ? 'Update Member' : 'New Team Member'}
                            </h2>
                            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
                                Website Content Management
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <form onSubmit={handleSubmit} id="team-form" className="space-y-8">

                        {/* Photo Section */}
                        <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100">
                            <ImageUploadComponent
                                value={form.photo}
                                onChange={(value) => setForm(prev => ({ ...prev, photo: value }))}
                                placeholder="/images/team/john-doe.png"
                                title="Profile Photo"
                                showRecent={true}
                                folder="team"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basics Column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        <UserIcon size={12} className="text-sky-500" />
                                        Full Name
                                    </label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="e.g. Ansh Raj"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        <Briefcase size={12} className="text-sky-500" />
                                        Job Title
                                    </label>
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="e.g. Lead UI Designer"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        <Tag size={12} className="text-sky-500" />
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="management">Management</option>
                                        <option value="tech-lead">Tech Lead</option>
                                        <option value="intern">Intern</option>
                                    </select>
                                </div>
                            </div>

                            {/* Extras Column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        <Briefcase size={12} className="text-sky-500" />
                                        Department
                                    </label>
                                    <input
                                        name="department"
                                        value={form.department}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="e.g. Development"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        <Link2 size={12} className="text-sky-500" />
                                        LinkedIn URL
                                    </label>
                                    <input
                                        name="linkedinUrl"
                                        value={form.linkedinUrl}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="https://linkedin.com/..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Order
                                        </label>
                                        <input
                                            name="order"
                                            type="number"
                                            value={form.order}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all appearance-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="alumni">Alumni</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                                <Info size={12} className="text-sky-500" />
                                Specialization / Bio
                            </label>
                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
                                placeholder="Briefly describe their role or background..."
                            />
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-200 text-amber-700 rounded-lg">
                                    <Star size={18} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-none">Featured Member</p>
                                    <p className="text-[10px] text-amber-600 mt-1 uppercase font-bold tracking-wider">Top prominence on website</p>
                                </div>
                            </div>
                            <input
                                id="featured"
                                name="featured"
                                type="checkbox"
                                checked={form.featured}
                                onChange={handleChange}
                                className="h-6 w-6 rounded-lg border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 animate-shake">
                                <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                <p className="text-sm font-bold text-rose-700">{error}</p>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-white rounded-2xl transition-all"
                    >
                        Go Back
                    </button>
                    <button
                        type="submit"
                        form="team-form"
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 bg-sky-600 text-white font-bold rounded-2xl shadow-xl shadow-sky-100 hover:bg-sky-500 hover:shadow-sky-200 active:scale-95 transition-all disabled:bg-sky-300 disabled:scale-100"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                        {saving ? 'Processing...' : isEdit ? 'Update Highlights' : 'Confirm Registration'}
                    </button>
                </div>
            </div>
        </div>
    );
}
