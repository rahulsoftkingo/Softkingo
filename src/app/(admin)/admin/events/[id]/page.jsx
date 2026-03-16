'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EventEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const isNew = id === 'new';

  const [form, setForm] = useState({
    title: '',
    message: '',
    ctaLabel: '',
    ctaHref: '',
    imageUrl: '',
    status: 'draft',
    startsAt: '',
    endsAt: '',
    theme: '',
    showOnSlugs: '',
    triggerDelayMs: 2000,
    triggerScrollPercent: 0,
    maxShowsPerUser: 1,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/admin/events/${id}`);
        if (!res.ok) throw new Error('Failed to load event');
        const data = await res.json();
        setForm({
          title: data.title || '',
          message: data.message || '',
          ctaLabel: data.ctaLabel || '',
          ctaHref: data.ctaHref || '',
          imageUrl: data.imageUrl || '',
          status: data.status || 'draft',
          startsAt: data.startsAt
            ? new Date(data.startsAt).toISOString().slice(0, 16)
            : '',
          endsAt: data.endsAt
            ? new Date(data.endsAt).toISOString().slice(0, 16)
            : '',
          theme: data.theme || '',
          showOnSlugs: data.showOnSlugs || '',
          triggerDelayMs: data.triggerDelayMs ?? 2000,
          triggerScrollPercent: data.triggerScrollPercent ?? 0,
          maxShowsPerUser: data.maxShowsPerUser ?? 1,
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
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'triggerDelayMs' ||
        name === 'triggerScrollPercent' ||
        name === 'maxShowsPerUser'
          ? value === ''
            ? ''
            : Number(value)
          : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(
        isNew ? '/api/admin/events' : `/api/admin/events/${id}`,
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
      router.push('/admin/events');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/admin/events')}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Back"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {isNew ? 'Create Event Banner' : 'Edit Event Banner'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure promotional popup with images and timing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push('/admin/events')}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                {saving ? 'Saving...' : isNew ? 'Create Event' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <svg className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-rose-800 font-medium">{error}</p>
              </div>
            )}

            {/* Banner Image Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-base font-semibold text-slate-900">Banner Image</h2>
                <p className="text-xs text-slate-500 mt-1">Upload promotional banner (recommended: 1920x1080px)</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Image Preview */}
                  {form.imageUrl && (
                    <div className="relative rounded-lg border-2 border-dashed border-slate-300 overflow-hidden bg-slate-50">
                      <img
                        src={form.imageUrl}
                        alt="Banner preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, imageUrl: '' }))}
                        className="absolute top-3 right-3 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 border-2 border-dashed border-slate-300 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700">
                          {uploading ? 'Uploading...' : 'Choose Image'}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-slate-500">Max 2MB • JPG, PNG, WebP, GIF</span>
                  </div>

                  {/* URL Input */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Or paste image URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={onChange}
                      placeholder="https://example.com/banner.jpg"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-base font-semibold text-slate-900">Content</h2>
                <p className="text-xs text-slate-500 mt-1">Event title, message, and call-to-action</p>
              </div>
              <div className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    placeholder="Black Friday Sale - Up to 50% OFF!"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={3}
                    placeholder="Limited time offer! Get amazing discounts on all mobile app development services until December 31st."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Button Label</label>
                    <input
                      name="ctaLabel"
                      value={form.ctaLabel}
                      onChange={onChange}
                      placeholder="Get Started"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
                    <input
                      name="ctaHref"
                      value={form.ctaHref}
                      onChange={onChange}
                      placeholder="/contact"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Behavior Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-base font-semibold text-slate-900">Behavior Settings</h2>
                <p className="text-xs text-slate-500 mt-1">When and where to display this popup</p>
              </div>
              <div className="p-6 space-y-5">
                {/* Status & Theme */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={onChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
                    <input
                      name="theme"
                      value={form.theme}
                      onChange={onChange}
                      placeholder="black-friday"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Trigger Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Delay (ms)</label>
                    <input
                      type="number"
                      name="triggerDelayMs"
                      value={form.triggerDelayMs}
                      onChange={onChange}
                      min={0}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Scroll %</label>
                    <input
                      type="number"
                      name="triggerScrollPercent"
                      value={form.triggerScrollPercent}
                      onChange={onChange}
                      min={0}
                      max={100}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Max Shows</label>
                    <input
                      type="number"
                      name="maxShowsPerUser"
                      value={form.maxShowsPerUser}
                      onChange={onChange}
                      min={1}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      name="startsAt"
                      value={form.startsAt}
                      onChange={onChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">End Date & Time</label>
                    <input
                      type="datetime-local"
                      name="endsAt"
                      value={form.endsAt}
                      onChange={onChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Show on Slugs */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Show on Pages (comma-separated slugs)</label>
                  <input
                    name="showOnSlugs"
                    value={form.showOnSlugs}
                    onChange={onChange}
                    placeholder="/,/ebooks,/blog"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">Leave empty to show on all pages</p>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
