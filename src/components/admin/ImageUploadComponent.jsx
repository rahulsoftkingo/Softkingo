'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Upload, X, Image as ImageIcon, Folder,
  FolderOpen, Search, ZoomIn, ChevronRight,
  Home, Loader2, CheckCircle2, Link as LinkIcon
} from 'lucide-react';

export default function ImageUploadComponent({
  value = '',
  onChange,
  placeholder = "https://example.com/image.png or /uploads/image.png",
  title = "Select Image",
  showRecent = true,
  maxHeight = "400px",
  folder = "general" // Default folder
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(folder);
  const [folderFiles, setFolderFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch files from folder
  const fetchFolderFiles = async (folder = '') => {
    setLoading(true);
    try {
      // Use the existing list API
      const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
      if (res.ok) {
        const data = await res.json();
        setFolderFiles(data.files || []);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
      setFolderFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Open popup
  const openPopup = () => {
    setIsOpen(true);
    fetchFolderFiles(currentFolder);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    // Use currentFolder if set, otherwise fallback to the component's default folder
    formData.append('folder', currentFolder || folder);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        // The API returns filePath or url
        const uploadedPath = data.filePath || data.url;
        onChange(uploadedPath);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Navigate
  const navigateToFolder = (path) => {
    setCurrentFolder(path);
    fetchFolderFiles(path);
  };

  const goToParent = () => {
    const parts = currentFolder.split('/').filter(Boolean);
    parts.pop();
    navigateToFolder(parts.join('/'));
  };

  // Select image
  const selectImage = (path) => {
    onChange(path);
    setIsOpen(false);
  };

  // Format size
  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Filters
  const filteredItems = folderFiles.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const folders = filteredItems.filter(f => f.isDir);
  const images = filteredItems.filter(f => !f.isDir && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f.name));

  return (
    <>
      <div className="space-y-2">
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
              <LinkIcon size={14} />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-24 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={openPopup}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-500 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FolderOpen size={14} />
              Browse
            </button>
          </div>
        </div>

        {value && (
          <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="h-14 w-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
              <img
                src={value.startsWith('http') || value.startsWith('/') ? value : `/uploads/${value}`}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.png'; // Fallback
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase truncate">Current Path</p>
              <p className="text-xs text-slate-600 truncate font-medium">{value}</p>
            </div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
              title="Remove Image"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Modal Library */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-sky-600 text-white rounded-xl shadow-lg shadow-sky-100">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 leading-none">Media Library</h2>
                  <p className="text-xs text-slate-500 mt-1">Select from existing files or upload a new one</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar - Actions */}
              <div className="w-64 border-r border-slate-100 p-6 space-y-8 bg-slate-50/30">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Actions</h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="w-full flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-all group"
                  >
                    {loading ? <Loader2 className="w-8 h-8 text-sky-600 animate-spin" /> : (
                      <>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-sky-600" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-700">Upload New</p>
                          <p className="text-[10px] text-slate-400 mt-1">Max 10MB</p>
                        </div>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Folders</h3>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Uploads', path: 'uploads', icon: Folder },
                      { name: 'Public Images', path: 'images', icon: Folder },
                      { name: 'All Files', path: '', icon: Home },
                    ].map((folder) => (
                      <button
                        key={folder.path}
                        onClick={() => navigateToFolder(folder.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${currentFolder === folder.path ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        <folder.icon size={16} />
                        {folder.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Search & Breadcrumbs */}
                <div className="p-6 space-y-4">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search files by name..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <button onClick={() => navigateToFolder('')} className="p-1 px-2 rounded-lg hover:bg-white hover:text-sky-600 flex items-center gap-1.5 transition-all">
                      <Home size={14} />
                      Root
                    </button>
                    {currentFolder.split('/').filter(Boolean).map((part, idx, arr) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ChevronRight size={12} className="text-slate-300" />
                        <button
                          onClick={() => navigateToFolder(arr.slice(0, idx + 1).join('/'))}
                          className="p-1 px-2 rounded-lg hover:bg-white hover:text-sky-600 transition-all font-bold"
                        >
                          {part}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  {loading && folderFiles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
                      <p className="text-sm font-medium text-slate-500">Scanning directory...</p>
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12">
                      <div className="p-6 bg-slate-50 rounded-full mb-4">
                        <ImageIcon size={48} className="text-slate-200" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-700">No items found</h4>
                      <p className="text-sm text-slate-500 max-w-xs mt-2">We couldn't find any files matching your search or in this folder.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {/* Folders first */}
                      {folders.map((folder, idx) => (
                        <button
                          key={`folder-${idx}`}
                          onClick={() => navigateToFolder(folder.path.substring(1))}
                          className="group p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-sky-300 hover:bg-sky-50 hover:shadow-lg hover:shadow-sky-50 transition-all flex flex-col items-center text-center"
                        >
                          <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                            <Folder size={32} className="text-sky-500 fill-sky-50" />
                          </div>
                          <span className="text-xs font-bold text-slate-700 group-hover:text-sky-700 truncate w-full">{folder.name}</span>
                        </button>
                      ))}

                      {/* Images */}
                      {images.map((img, idx) => (
                        <button
                          key={`img-${idx}`}
                          onClick={() => selectImage(img.path)}
                          className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-xl ${value === img.path ? 'border-sky-600 shadow-sky-100 shadow-xl' : 'border-slate-100'
                            }`}
                        >
                          <img
                            src={img.path}
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
                            <p className="text-[10px] font-bold text-white truncate w-full">{img.name}</p>
                            <p className="text-[8px] text-white/70 mt-0.5">{formatSize(img.size)}</p>
                          </div>
                          {value === img.path && (
                            <div className="absolute top-2 right-2 p-1 bg-sky-600 text-white rounded-lg shadow-lg">
                              <CheckCircle2 size={12} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
