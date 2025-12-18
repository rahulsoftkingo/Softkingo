'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminMediaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('image');
  const [filterTag, setFilterTag] = useState('all');

  useEffect(() => {
    const fetchMedia = async () => {
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

    setLoading(true);
    fetchMedia();
  }, [filterType, filterTag]);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage images and videos for your website
                </p>
              </div>
            </div>
            <Link
              href="/admin/media/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Media
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Type:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="all">All Types</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Tag:</label>
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                <option value="all">All Tags</option>
                <option value="gallery-office">Gallery: Office</option>
                <option value="gallery-team">Gallery: Team</option>
                <option value="gallery-client">Gallery: Client</option>
                <option value="gallery-culture">Gallery: Culture</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl aspect-[4/3] mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !items.length ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
            <p className="text-gray-500 mb-6">Try changing your filters or upload new media.</p>
            <Link
              href="/admin/media/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Upload Media
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/admin/media/${item.id}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-medium">Video File</span>
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium capitalize ${
                    item.type === 'image' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type}
                  </span>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title || 'Untitled'}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="line-clamp-1">
                      {item.category || item.tags || 'No category'}
                    </span>
                    <span>ID: {item.id}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}