
"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
    ArrowLeft, RefreshCw, Smartphone, Layout, Database,
    Target, Settings, Zap, CheckCircle2, X, Image as ImageIcon, Folder,
    Briefcase, Code, DollarSign, BarChart3, ShieldCheck, HelpCircle,
    UploadCloud, FolderPlus, ChevronRight, Home, Search, Loader2, FolderOpen,
    Award, MessageSquare, MousePointerClick, Layers, Save, Grid, Cpu, TrendingUp,
    Globe, BookOpen
} from "lucide-react";
import dynamic from 'next/dynamic';
import ServiceEditor from "./ServiceEditor";

const AdvancedTipTapEditor = dynamic(() => import('../../blog/AdvancedTipTapEditor'), {
    ssr: false,
});

// --- 1. MEDIA INPUT COMPONENT ---
const MediaInput = ({ label, value, path, onUpdate, onBrowse }) => (
    <div className="group">
        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
        <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500">
            <div className="pl-3 text-slate-400"><ImageIcon size={14} /></div>

            <input
                className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400"
                value={value?.toLowerCase() || ''}
                onChange={(e) => onUpdate(path, e.target.value)}
                placeholder="Paste URL or Select Image..."
            />

            {value && (
                <button onClick={() => onUpdate(path, "")} className="px-2 text-slate-400 hover:text-red-500" title="Clear">
                    <X size={14} />
                </button>
            )}

            <button
                onClick={() => onBrowse(path)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200 font-medium text-xs flex items-center gap-1 transition-colors"
            >
                <FolderOpen size={14} /> Select
            </button>
        </div>

        {value && (
            <div className="mt-2 h-32 w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative group/preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value?.toLowerCase()} className="w-full h-full object-contain" alt="preview" />
            </div>
        )}
    </div>
);

export default function ServicePageEditor({ data, onBack }) {

    // --- CONFIGURATION ---
    const config = {
        theme: "sky",
        label: "Service Page",
        uploadDir: "uploads/services",
        sections: [
            { id: 'hero', label: '1. Hero Section', icon: Smartphone },
            { id: 'seo', label: '2. SEO Settings', icon: Search },
            { id: 'stats', label: '3. Stats Section', icon: BarChart3 },
            { id: 'awards', label: '4. Awards Section', icon: Award },
            { id: 'services', label: '5. Service Categories', icon: Layout },
            { id: 'consultation', label: '6. Consultation CTA', icon: TrendingUp },
            { id: 'tech', label: '7. Tech Stack', icon: Code },
            { id: 'process', label: '8. Our Process', icon: Settings },
            { id: 'highlight', label: '9. Solution Highlight', icon: Zap },
            { id: 'portfolio', label: '10. Portfolio', icon: Globe },
            { id: 'solutions', label: '11. Industry Solutions', icon: Grid },
            { id: 'industries', label: '12. Industries We Serve', icon: Layers },
            { id: 'user-guide', label: '13. User Guide', icon: BookOpen },
            { id: 'faq', label: '14. FAQ Section', icon: HelpCircle },
            { id: 'blogs', label: '15. Blog Section', icon: MessageSquare },
            { id: 'inquiry', label: '16. Inquiry Section', icon: MessageSquare },
           
        ]
    };

    const themeColor = config.theme;

    // --- STATE ---
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        ...data,
        activeSections: data?.activeSections || config.sections.map(s => s.id),
        content: data?.content || { hero: {} }
    });

    const [loading, setLoading] = useState(false);
    const [portfolioCategories, setPortfolioCategories] = useState([]);

    // Fetch Portfolio Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/admin/portfolio-projects/categories");
                if (res.ok) {
                    const data = await res.json();
                    setPortfolioCategories(data || []);
                }
            } catch (err) {
                console.error("Error fetching portfolio categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Media Manager State
    const [showImageBrowser, setShowImageBrowser] = useState(false);
    const [currentImageField, setCurrentImageField] = useState('');
    const [mediaPath, setMediaPath] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // --- MEDIA HANDLERS ---
    const fetchMedia = async (folderPath) => {
        setMediaLoading(true);
        try {
            const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folderPath)}`);
            if (res.ok) {
                const json = await res.json();
                setMediaFiles(json.files || []);
                setMediaPath(folderPath);
            }
        } catch (e) { console.error(e); }
        setMediaLoading(false);
    };

    const openBrowser = useCallback((path) => {
        setCurrentImageField(path);
        setShowImageBrowser(true);
        if (!mediaPath) fetchMedia(config.uploadDir);
        else fetchMedia(mediaPath);
    }, [config.uploadDir, mediaPath]);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", mediaPath);
        try {
            const res = await fetch("/api/media/upload", { method: "POST", body: fd });
            if (res.ok) await fetchMedia(mediaPath);
            else alert("Upload failed");
        } catch (err) { alert(err.message); }
        setUploading(false);
    };

    const handleCreateFolder = async () => {
        const name = prompt("Folder Name:");
        if (!name) return;
        try {
            await fetch("/api/media/mkdir", { method: "POST", body: JSON.stringify({ folder: `${mediaPath}/${name}` }) });
            fetchMedia(mediaPath);
        } catch (e) { alert("Failed"); }
    };

    // --- SAVE HANDLER ---
    const handleSave = async () => {
        if (!formData.title || !formData.slug) {
            alert("Title and Slug are required!");
            return;
        }

        setLoading(true);
        try {
            const payload = { ...formData, type: 'service' };
            const isEdit = !!formData.id;
            const apiEndpoint = isEdit ? `/api/admin/services/${formData.id}` : "/api/admin/services";

            const res = await fetch(apiEndpoint, {
                method: isEdit ? "PUT" : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                if (res.status === 409) {
                    alert("⚠️ " + (result.message || "Conflict error"));
                } else {
                    alert("❌ Error: " + (result.message || "Failed to save"));
                }
            } else {
                const savedData = result.data || result.page || result.service;
                if (savedData && savedData.id) {
                    setFormData(prev => ({ ...prev, id: savedData.id }));
                }
                alert("✅ Saved Successfully!");
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong");
        }
        setLoading(false);
    };

    const updateField = useCallback((path, valueOrFn) => {
        setFormData(prev => {
            const copy = JSON.parse(JSON.stringify(prev));
            if (!copy.content) copy.content = {};

            const keys = path.split('.');
            let current = copy;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                const isNextKeyIndex = !isNaN(parseInt(keys[i + 1], 10));

                if (current[key] === undefined || current[key] === null) {
                    current[key] = isNextKeyIndex ? [] : {};
                } else if (isNextKeyIndex && !Array.isArray(current[key])) {
                    current[key] = [];
                } else if (!isNextKeyIndex && (typeof current[key] !== 'object' || Array.isArray(current[key]))) {
                    current[key] = {};
                }
                current = current[key];
            }

            const finalKey = keys[keys.length - 1];
            if (typeof valueOrFn === 'function') {
                current[finalKey] = valueOrFn(current[finalKey]);
            } else {
                current[finalKey] = valueOrFn;
            }
            return copy;
        });
    }, []);

    const BoundMediaInput = useCallback((props) => (
        <MediaInput
            {...props}
            onUpdate={updateField}
            onBrowse={openBrowser}
        />
    ), [updateField, openBrowser]);

    const folders = mediaFiles.filter(f => f.isDir && f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const images = mediaFiles.filter(f => !f.isDir && f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex h-screen overflow-hidden bg-white fixed inset-0 z-50">
            {/* Sidebar */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-5 border-b bg-white">
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 mb-4"><ArrowLeft size={14} /> BACK</button>
                    <h2 className={`text-lg font-black text-${themeColor}-600 flex items-center gap-2 uppercase`}>{config.label}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 block">PAGE SETTINGS</label>
                        <input className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-bold" value={formData.title || ''} onChange={e => {
                            const val = e.target.value;
                            setFormData(prev => {
                                const newContent = { ...(prev.content || {}) };
                                if (!newContent.heroTitle || newContent.heroTitle === prev.title) {
                                    newContent.heroTitle = val;
                                }
                                return { ...prev, title: val, content: newContent };
                            });
                        }} placeholder="Page Title" />
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 px-2">
                            <span className="text-slate-400 text-xs">/</span>
                            <input className="w-full p-2 bg-transparent border-none text-sm font-mono text-slate-600 outline-none" value={formData.slug || ''} onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))} placeholder="slug-url" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 block">SECTIONS</label>
                        {config.sections.map((section) => {
                            const isActive = formData.activeSections?.includes(section.id);
                            return (
                                <button key={section.id} onClick={() => {
                                    setFormData(prev => {
                                        const isActive = prev.activeSections?.includes(section.id);
                                        const newSections = isActive
                                            ? prev.activeSections.filter(id => id !== section.id)
                                            : [...(prev.activeSections || []), section.id];
                                        return { ...prev, activeSections: newSections };
                                    });
                                }} className={`flex items-center gap-3 w-full p-3 rounded-xl border transition-all ${isActive ? `bg-${themeColor}-50 border-${themeColor}-200 text-${themeColor}-700` : `bg-white border-slate-100 text-slate-400`}`}>
                                    <div className={`p-2 rounded-lg ${isActive ? `bg-${themeColor}-100` : 'bg-slate-50'}`}><section.icon size={16} /></div>
                                    <span className="text-xs font-bold uppercase">{section.label}</span>
                                    {isActive && <CheckCircle2 size={14} className={`ml-auto text-${themeColor}-500`} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="p-5 border-t bg-white">
                    <button onClick={handleSave} className={`w-full bg-${themeColor}-600 text-white py-3 rounded-xl font-bold text-sm flex justify-center gap-2 hover:bg-${themeColor}-700 transition-all shadow-lg`}>
                        {loading ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />} Save Page
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 bg-slate-100 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <ServiceEditor
                        formData={formData}
                        updateField={updateField}
                        MediaInput={BoundMediaInput}
                        TipTapEditor={AdvancedTipTapEditor}
                        activeSections={formData.activeSections}
                        portfolioCategories={portfolioCategories}
                    />
                </div>
            </div>

            {/* Media Modal */}
            {showImageBrowser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Media Library</h3>
                                <p className="text-xs text-slate-500">Manage images and folders</p>
                            </div>
                            <button onClick={() => setShowImageBrowser(false)} className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg"><X size={16} /></button>
                        </div>

                        <div className="px-4 py-2 border-b border-slate-200 bg-white flex justify-between items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-slate-600 overflow-x-auto flex-1">
                                <button onClick={() => fetchMedia("")} className="flex items-center gap-1 hover:text-blue-600 font-bold whitespace-nowrap"><Home size={12} /> Root</button>
                                {mediaPath.split('/').filter(Boolean).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        <ChevronRight size={10} className="text-slate-400" />
                                        <button onClick={() => fetchMedia(arr.slice(0, i + 1).join('/'))} className="hover:text-blue-600 font-medium whitespace-nowrap">{part}</button>
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <div className="relative hidden sm:block">
                                    <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input className="pl-7 pr-3 py-1.5 bg-slate-100 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 w-32" placeholder="Filter..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                                </div>
                                <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer text-xs font-bold transition-all">
                                    {uploading ? <Loader2 className="animate-spin" size={14} /> : <UploadCloud size={14} />}
                                    <span className="hidden sm:inline">Upload</span>
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                </label>
                                <button onClick={handleCreateFolder} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold">
                                    <FolderPlus size={14} /> <span className="hidden sm:inline">New Folder</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 min-h-[300px]">
                            {mediaLoading ? (
                                <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-slate-400" size={32} /></div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                    {folders.map((f, i) => (
                                        <button key={i} onClick={() => fetchMedia(f.path.replace(/^\//, ''))} className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group text-center">
                                            <Folder className="h-10 w-10 text-yellow-400 fill-yellow-50 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-bold text-slate-600 mt-2 truncate w-full">{f.name}</span>
                                        </button>
                                    ))}
                                    {images.map((f, i) => (
                                        <button key={i} onClick={() => { updateField(currentImageField, f.path); setShowImageBrowser(false); }} className="relative group aspect-square bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-green-500 hover:shadow-lg transition-all">
                                            <img src={f.path} className="w-full h-full object-cover" alt={f.name} />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                                <p className="text-[10px] text-white font-medium truncate w-full">{f.name}</p>
                                                <p className="text-[8px] text-white/80">{(f.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                                                <CheckCircle2 size={12} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                            {!mediaLoading && folders.length === 0 && images.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                    <FolderOpen size={48} className="mb-3 opacity-30" />
                                    <p className="text-sm font-medium">This folder is empty</p>
                                    <p className="text-xs opacity-70">Upload images or create a folder to get started</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
