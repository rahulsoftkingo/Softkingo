'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FolderOpen, Search } from 'lucide-react';

export default function ImageUploadComponent({
  value = '',
  onChange,
  placeholder = "/images/team/member.png or https://...",
  title = "Select Image",
  showRecent = true,
  maxHeight = "400px"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentImages, setRecentImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch recent images from media library
  const fetchRecentImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media?type=image');
      if (res.ok) {
        const data = await res.json();
        setRecentImages(data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Open popup
  const openPopup = () => {
    setIsOpen(true);
    if (showRecent && recentImages.length === 0) {
      fetchRecentImages();
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        const data = await res.json();
        onChange(data.filePath);
        setIsOpen(false);
        // Refresh the image library
        fetchRecentImages();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Select image from library
  const selectImage = (imagePath) => {
    onChange(imagePath);
    setIsOpen(false);
  };

  // Filter images based on search
  const filteredImages = recentImages.filter(img => 
    img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.filePath?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Trigger Button */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-700">
          Photo URL
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={openPopup}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200 transition-colors flex items-center gap-1"
            >
              <ImageIcon className="w-3 h-3" />
              Browse
            </button>
          </div>
        </div>
        
        {/* Preview */}
        {value && (
          <div className="flex items-center gap-3 mt-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden border-2 border-white shadow-sm">
              <img
                src={value.startsWith('http') || value.startsWith('/') ? value : `/uploads/${value}`}
                alt="Preview"
                className="h-12 w-12 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-full h-full flex items-center justify-center bg-slate-100"
                style={{ display: 'none' }}
              >
                <ImageIcon className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">Choose from library or upload new</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full flex">
                {/* Sidebar - Upload & Categories */}
                <div className="w-80 border-r border-slate-200 p-6 space-y-6">
                  {/* Upload Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Upload New</h3>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-lg border-2 border-dashed border-slate-300 p-6 text-center hover:border-sky-400 hover:bg-sky-50 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">Click to upload</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </button>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Categories</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left rounded-lg px-3 py-2 text-sm bg-sky-50 text-sky-700 font-medium border border-sky-200">
                        All Images
                      </button>
                      <button className="w-full text-left rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        Team Photos
                      </button>
                      <button className="w-full text-left rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        Blog Images
                      </button>
                      <button className="w-full text-left rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        Case Studies
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Content - Image Grid */}
                <div className="flex-1 flex flex-col">
                  {/* Search Bar */}
                  <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search images..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div className="flex-1 overflow-auto p-4">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p className="text-sm text-slate-500">Loading images...</p>
                        </div>
                      </div>
                    ) : filteredImages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-medium">No images found</p>
                          <p className="text-sm text-slate-400 mt-1">Upload some images to get started</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredImages.map((image) => (
                          <div
                            key={image.id}
                            onClick={() => selectImage(image.filePath)}
                            className="group relative aspect-square rounded-lg overflow-hidden border-2 border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all cursor-pointer"
                          >
                            <img
                              src={image.filePath.startsWith('/') ? image.filePath : `/uploads/${image.filePath}`}
                              alt={image.title || 'Image'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="absolute bottom-0 left-0 right-0 p-2">
                                <p className="text-white text-xs font-medium truncate">
                                  {image.title || image.filePath.split('/').pop()}
                                </p>
                              </div>
                            </div>
                            {value === image.filePath && (
                              <div className="absolute top-2 right-2 bg-sky-600 text-white rounded-full p-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
