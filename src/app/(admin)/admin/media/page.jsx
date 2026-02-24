'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageUploadComponent from '@/components/admin/ImageUploadComponent';
import { Image as ImageIcon, Plus, Upload, Tag, ChevronRight, Trash2, Video, Loader2 } from 'lucide-react';

export default function AdminMediaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('image');
  const [filterTag, setFilterTag] = useState('all');
  const [showUploader, setShowUploader] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterType !== 'all') params.set('type', filterType);
      if (filterTag !== 'all') params.set('tag', filterTag);
      const res = await fetch(`/api/admin/media?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      console.error('Failed to load media', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [filterType, filterTag]);

  const handleUploadComplete = () => {
    setShowUploader(false);
    fetchMedia();
  };

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this media item? This cannot be undone.')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert('Failed to delete. Please try again.');
      }
    } catch (e) {
      console.error('Delete error', e);
      alert('Error deleting item.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-600 text-white rounded-xl shadow-lg shadow-sky-100">
                <ImageIcon size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">Media Library</h1>
                <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Digital Asset Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/media/new"
                className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={16} className="text-sky-600" />
                Add Details
              </Link>
              <button
                type="button"
                onClick={() => setShowUploader(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Upload size={16} />
                Quick Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Upload Panel */}
      {showUploader && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-xl border border-sky-200 shadow-md p-6 relative">
            <button
              type="button"
              onClick={() => setShowUploader(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Image</h2>
            <ImageUploadComponent
              value=""
              onChange={handleUploadComplete}
              title="Select or Upload Image"
              showRecent={true}
              folder="general"
              hidePreview={true}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Control Bar */}
        <div className="mb-10 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-1.5 flex flex-wrap items-center gap-2">
            <div className="px-4 py-2 border-r border-slate-100 hidden md:block">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Filters</span>
            </div>

            <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
              {[
                { val: 'image', label: 'Images' },
                { val: 'video', label: 'Videos' },
                { val: 'all', label: 'All' }
              ].map(t => (
                <button
                  key={t.val}
                  onClick={() => setFilterType(t.val)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${filterType === t.val ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>

            <div className="flex-1 min-w-[200px]">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Tag size={14} />
                </div>
                <select
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="w-full rounded-2xl border border-transparent bg-slate-50 pl-9 pr-10 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="all">View All Sections</option>
                  <option value="gallery-office">Workspace Gallery</option>
                  <option value="gallery-team">Team Gallery</option>
                  <option value="gallery-client">Partnership Gallery</option>
                  <option value="gallery-culture">Culture Gallery</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronRight size={14} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2 text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                {items.length} Assets Found
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
            <p className="text-slate-500 font-medium">Syncing Library...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="min-h-[40vh] bg-white rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <ImageIcon size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No Assets Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-8">
              Your search for {filterTag === 'all' ? 'all assets' : `"${filterTag}"`} didn't return any results.
              Try adjusting your filters or upload a new asset.
            </p>
            <button
              onClick={() => setShowUploader(true)}
              className="px-6 py-3 bg-sky-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all"
            >
              Upload First Asset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                {/* Action Buttons Layer */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                    disabled={deleting === item.id}
                    className="p-3 bg-white/90 backdrop-blur-sm text-rose-600 rounded-2xl shadow-lg hover:bg-rose-600 hover:text-white transition-all disabled:opacity-50"
                    title="Delete Permanently"
                  >
                    {deleting === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>

                <Link href={`/admin/media/${item.id}`} className="block">
                  <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                    {item.type === 'image' ? (
                      <img
                        src={
                          item.filePath.startsWith('http')
                            ? item.filePath
                            : item.filePath.startsWith('/')
                              ? item.filePath
                              : `/uploads/${item.filePath}`
                        }
                        alt={item.title || ''}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full bg-slate-800 text-white">
                        <Video size={48} className="mb-4 opacity-50" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Video Media</span>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg ${item.type === 'image'
                          ? 'bg-sky-500/90 text-white'
                          : 'bg-purple-500/90 text-white'
                        }`}>
                        {item.type}
                      </div>
                    </div>

                    {/* Meta Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                        {item.category || 'Asset'}
                      </p>
                      <h3 className="text-white font-bold text-sm line-clamp-1 leading-tight">
                        {item.title || 'Untitled Archive'}
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* Secondary Info */}
                <div className="p-5 flex items-center justify-between bg-white border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {item.id}</span>
                  </div>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {(item.tags || '').split(',').filter(Boolean).map((t, idx) => (
                      <div key={idx} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase" title={t}>
                        {t.split('-').pop()?.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
