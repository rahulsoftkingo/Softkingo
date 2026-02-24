'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUploadComponent from '@/components/admin/ImageUploadComponent';
import {
  ArrowLeft, Save, Loader2, Info, Plus,
  Layout, Tag, Image as ImageIcon, Video,
  ChevronRight, CheckCircle2, Globe
} from 'lucide-react';

const GALLERY_TAGS = [
  { value: 'gallery-office', label: 'Office & Workspace', desc: 'Shows in the Workspace section' },
  { value: 'gallery-team', label: 'Team in Action', desc: 'Shows in the Teamwork section' },
  { value: 'gallery-client', label: 'Client Collaborations', desc: 'Shows in the Partnerships section' },
  { value: 'gallery-culture', label: 'Events & Culture', desc: 'Shows in the Culture section' },
];

export default function MediaEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const isNew = id === 'new';

  const [form, setForm] = useState({
    title: '',
    filePath: '',
    thumbnail: '',
    type: 'image',
    category: '',
    tags: '',
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Extract tags as an array for the UI
  const selectedTags = form.tags ? form.tags.split(',').filter(Boolean) : [];

  useEffect(() => {
    if (isNew) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/admin/media/${id}`);
        if (!res.ok) throw new Error('Failed to load media');
        const data = await res.json();

        setForm({
          title: data.title || '',
          filePath: data.filePath || '',
          thumbnail: data.thumbnail || '',
          type: data.type || 'image',
          category: data.category || '',
          tags: data.tags || '',
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, isNew]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleTag = (tag) => {
    const current = selectedTags;
    let next;
    if (current.includes(tag)) {
      next = current.filter(t => t !== tag);
    } else {
      next = [...current, tag];
    }
    setForm(p => ({ ...p, tags: next.join(',') }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(
        isNew ? '/api/admin/media' : `/api/admin/media/${id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save');
      }
      router.push('/admin/media');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
        <p className="text-slate-500 font-medium">Loading media details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/media')}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">
                  {isNew ? 'New Media' : 'Edit Media'}
                </h1>
                <p className="text-xs font-medium text-slate-500 mt-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  {isNew ? 'Asset Creation' : `Media ID: ${id}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/admin/media')}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Saving...' : 'Save Meta Data'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Configuration */}
          <div className="lg:col-span-2 space-y-6">

            {/* Asset Details */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
                  <Layout size={18} />
                </div>
                <h2 className="font-bold text-slate-800 tracking-tight">Asset Details</h2>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Media Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
                    placeholder="Enter a descriptive title for this media..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Media Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                      {[
                        { val: 'image', icon: ImageIcon, label: 'Image' },
                        { val: 'video', icon: Video, label: 'Video' }
                      ].map(t => (
                        <button
                          key={t.val}
                          type="button"
                          onClick={() => setForm(p => ({ ...p, type: t.val }))}
                          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${form.type === t.val ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                          <t.icon size={14} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={onChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                      placeholder="e.g. gallery, team, blog"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility & Tags */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Globe size={18} />
                  </div>
                  <h2 className="font-bold text-slate-800 tracking-tight">Public Visibility</h2>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full border border-emerald-100">
                  Global Site Integration
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">
                  Select where this media should appear across the public website. Media with gallery tags will automatically flow into the corresponding sections of the <Link href="/gallery" className="text-sky-600 hover:underline">Gallery Page</Link>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GALLERY_TAGS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => toggleTag(t.value)}
                      className={`flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all ${selectedTags.includes(t.value)
                          ? 'border-sky-500 bg-sky-50/30 ring-4 ring-sky-50'
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-sm font-bold ${selectedTags.includes(t.value) ? 'text-sky-700' : 'text-slate-700'}`}>
                          {t.label}
                        </span>
                        {selectedTags.includes(t.value) && <CheckCircle2 size={16} className="text-sky-500" />}
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Asset Selection & Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <ImageIcon size={18} />
                </div>
                <h2 className="font-bold text-slate-800 tracking-tight">Media Source</h2>
              </div>

              <div className="p-6 space-y-6">
                <ImageUploadComponent
                  value={form.filePath}
                  onChange={(val) => setForm(p => ({ ...p, filePath: val }))}
                  title="Source File"
                  placeholder="/uploads/gallery/example.jpg"
                  showRecent={true}
                  folder={form.category || "general"}
                />

                {!form.filePath && (
                  <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 mb-3">
                      <Plus size={24} />
                    </div>
                    <p className="text-xs font-bold text-slate-400">No content selected</p>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[150px]">Choose an existing file or upload a new one to start.</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-[11px] text-rose-600 font-bold leading-relaxed">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
