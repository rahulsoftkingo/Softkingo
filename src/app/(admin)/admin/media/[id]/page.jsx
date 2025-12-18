'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const GALLERY_TAGS = [
  { value: 'gallery-office', label: 'Gallery: Office & Workspace' },
  { value: 'gallery-team', label: 'Gallery: Team in Action' },
  { value: 'gallery-client', label: 'Gallery: Client Collaborations' },
  { value: 'gallery-culture', label: 'Gallery: Events & Culture' },
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
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

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

        const url = data.filePath?.startsWith('http')
          ? data.filePath
          : data.filePath?.startsWith('/')
          ? data.filePath
          : `/uploads/${data.filePath}`;

        setPreviewUrl(url);
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

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Upload failed');
      }
      const data = await res.json();
      const url = data.url || data.filePath;
      setForm((p) => ({
        ...p,
        filePath: url,
      }));
      setPreviewUrl(url);
    } catch (err) {
      setError(err.message);
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
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isNew ? 'Upload Media' : 'Edit Media'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {isNew ? 'Add new media to your library' : 'Update media details'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push('/admin/media')}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Library
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <div className="flex items-center gap-2 text-red-800 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Media Information</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={onChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                      placeholder="Enter media title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={onChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                      placeholder="gallery, hero, blog..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gallery Tag
                    </label>
                    <select
                      name="tags"
                      value={form.tags}
                      onChange={onChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                      <option value="">Select a tag...</option>
                      {GALLERY_TAGS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      This tag will be used to organize media in the gallery sections
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Type
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={onChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - File Upload & Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Media File</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File URL
                    </label>
                    <input
                      name="filePath"
                      value={form.filePath}
                      onChange={onChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                      placeholder="/uploads/gallery/office-1.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      URL will be automatically set after upload, or you can manually enter the path
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept={form.type === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleUpload}
                        disabled={uploading}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer block"
                      >
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {form.type === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV up to 50MB'}
                        </p>
                      </label>
                    </div>
                  </div>

                  {previewUrl && form.type === 'image' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="rounded-lg border border-gray-200 overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/media')}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : isNew ? (
                    'Create Media'
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}