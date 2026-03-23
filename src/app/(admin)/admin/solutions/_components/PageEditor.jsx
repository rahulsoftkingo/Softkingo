
"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
    ArrowLeft, RefreshCw, Smartphone, Layout, Database,
    Target, Settings, Zap, CheckCircle2, X, Image as ImageIcon, Folder,
    Briefcase, Code, DollarSign, BarChart3, ShieldCheck, HelpCircle,
    UploadCloud, FolderPlus, ChevronRight, Home, Search, Loader2, FolderOpen,
    Award, MessageSquare, MousePointerClick, Layers, Save, Grid, Cpu, TrendingUp
} from "lucide-react";
import SolutionsEditor from "./SolutionEditor";
import IndustryEditor from "./IndustryEditor";
import CloneEditor from "./CloneEditor";

// --- 1. MEDIA INPUT COMPONENT (MOVED OUTSIDE) ---
const MediaInput = ({ label, value, path, onUpdate, onBrowse }) => (
    <div className="group">
        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
        <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500">
            <div className="pl-3 text-slate-400"><ImageIcon size={14} /></div>

            <input
                className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400"
                value={value || ''}
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
                <img src={value} className="w-full h-full object-contain" alt="preview" />
            </div>
        )}
    </div>
);

export default function PageEditor({ data, type, onBack }) {

    // --- CONFIGURATION ---
    const config = {
        solution: {
            theme: "sky", label: "Solution Page", uploadDir: "uploads/solutions",
            sections: [
                { id: 'hero', label: '1. Hero', icon: Smartphone },
                { id: 'stats', label: '2. Stats Banner', icon: BarChart3 },
                { id: 'intro', label: '3. Intro', icon: Layout },
                { id: 'features', label: '4. Features Grid', icon: Database },
                { id: 'awards', label: '5. Awards', icon: Award },
                { id: 'whyNeed', label: '6. Why Need', icon: HelpCircle },
                { id: 'servicesList', label: '7. Services List', icon: Briefcase },
                { id: 'appModules', label: '8. App Modules', icon: Smartphone },
                { id: 'aiCapabilities', label: '9. AI Features', icon: Zap },
                { id: 'portfolio', label: '10. Portfolio', icon: Layout },
                { id: 'process', label: '11. Process', icon: Settings },
                { id: 'techStack', label: '12. Tech Stack', icon: Code },
                { id: 'monetization', label: '13. Revenue', icon: DollarSign },
                { id: 'whyChoose', label: '14. Security/Why', icon: ShieldCheck },
                { id: 'consultation', label: '15. Consult CTA', icon: MessageSquare },
                { id: 'blogs', label: '16. Blog Section', icon: MessageSquare },
                { id: 'faq', label: '17. FAQ', icon: HelpCircle },
                { id: 'cta', label: '18. Bottom CTA', icon: MousePointerClick },
                { id: 'seo', label: '19. SEO Settings', icon: Search }
            ]
        },
        industry: {
            theme: "emerald", label: "Industry Page", uploadDir: "uploads/industries",
            sections: [
                { id: 'hero', label: '1. Hero Section', icon: Smartphone },
                { id: 'challenges', label: '2. Challenges We Solve', icon: Target },
                { id: 'covers', label: '3. What We Cover', icon: Layout },
                { id: 'technologies', label: '4. Advanced Tech', icon: Code },
                { id: 'portfolio', label: '5. Industry Portfolio', icon: Briefcase },
                { id: 'otherIndustries', label: '6. Other Industries', icon: Layers },
                { id: 'whyChoose', label: '7. Why Choose Us', icon: ShieldCheck },
                { id: 'process', label: '8. Development Process', icon: Settings },
                { id: 'faq', label: '9. FAQ', icon: HelpCircle },
                { id: 'testimonials', label: '10. Client Testimonials', icon: MessageSquare },
                { id: 'blogs', label: '11. Blog Section', icon: MessageSquare },
                { id: 'seo', label: '12. SEO Settings', icon: Search }
            ]
        },
        clone: {
            theme: "orange",
            label: "Clone Script Page",
            uploadDir: "uploads/clones",
            sections: [
                { id: 'hero', label: '1. Hero Section', icon: Smartphone },
                { id: 'about', label: '2. About Product', icon: Layout },
                { id: 'verticalSuite', label: '3. Features List', icon: Layers },
                { id: 'aiFeatures', label: '4. Advanced Features', icon: Zap },
                { id: 'aiSolutions', label: '5. Ai Feature Solutions', icon: Cpu },
                { id: 'investment', label: '6. Why to Invest', icon: TrendingUp },
                { id: 'revenue', label: '7. Revenue Model', icon: DollarSign },
                { id: 'techStack', label: '8. Tech Stack', icon: Code },
                { id: 'portfolio', label: '9. Portfolio', icon: Layout },
                { id: 'process', label: '10. Process', icon: Settings },
                { id: 'industries', label: '11. Industries', icon: Grid },
                { id: 'popularSolutions', label: '12. Popular Solutions', icon: Layout },
                { id: 'comparison', label: '13. Comparison Table', icon: BarChart3 },
                { id: 'consultation', label: '14. Consultation CTA', icon: TrendingUp },
                { id: 'faq', label: '15. FAQ', icon: HelpCircle },
                { id: 'blogs', label: '16. Blog Section', icon: MessageSquare },
                { id: 'seo', label: '17. SEO Settings', icon: Search }
            ]
        },
    }[type] || config.solution;

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
        // Initial fetch if empty
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
            const payload = { ...formData, type };
            // Determine API endpoint based on type
            const apiEndpoint = "/api/admin/solutions";

            const res = await fetch(apiEndpoint, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                if (res.status === 409) {
                    alert("⚠️ " + result.message);
                } else {
                    alert("❌ Error: " + result.message);
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

    // IN PageEditor.jsx - REPLACE updateField with this:

    const updateField = useCallback((path, valueOrFn) => {
        setFormData(prev => {
            // Deep clone state safely to avoid mutations
            const copy = JSON.parse(JSON.stringify(prev));
            if (!copy.content) copy.content = {};

            const keys = path.split('.');
            let current = copy;

            // Traverse all keys except the last one
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];

                // If the next key is a number, it means the current key should be an array
                const isNextKeyIndex = !isNaN(parseInt(keys[i + 1], 10));

                if (current[key] === undefined || current[key] === null) {
                    current[key] = isNextKeyIndex ? [] : {};
                } else if (isNextKeyIndex && !Array.isArray(current[key])) {
                    // FIX: If path expects array but found object, convert to array
                    current[key] = [];
                } else if (!isNextKeyIndex && (typeof current[key] !== 'object' || Array.isArray(current[key]))) {
                    // FIX: If path expects object but found array/primitive, convert to object
                    current[key] = {};
                }

                current = current[key];
            }

            // Assign the final value
            const finalKey = keys[keys.length - 1];

            // SUPPORT FUNCTIONAL UPDATES: valueOrFn can be a function like (prevVal) => newVal
            if (typeof valueOrFn === 'function') {
                current[finalKey] = valueOrFn(current[finalKey]);
            } else {
                current[finalKey] = valueOrFn;
            }

            return copy;
        });
    }, []);

    // Create a bound version of MediaInput to pass props easily
    const BoundMediaInput = useCallback((props) => (
        <MediaInput
            {...props}
            onUpdate={updateField}
            onBrowse={openBrowser}
        />
    ), [updateField]);

    // Filtering
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
                                if (newContent.hero) {
                                  if (!newContent.hero.title || newContent.hero.title === prev.title) {
                                    newContent.hero = { ...newContent.hero, title: val };
                                  }
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
                    {/* Render Solutions Editor */}
                    {type === 'solution' && (
                        <SolutionsEditor
                            formData={formData}
                            updateField={updateField}
                            MediaInput={BoundMediaInput}
                            activeSections={formData.activeSections}
                        />
                    )}

                    {/* Render Industry Editor */}
                    {type === 'industry' && (
                        <IndustryEditor
                            formData={formData}
                            updateField={updateField}
                            MediaInput={BoundMediaInput}
                            activeSections={formData.activeSections}
                        />
                    )}

                    {type === 'clone' && (
                        <CloneEditor
                            formData={formData}
                            updateField={updateField}
                            MediaInput={BoundMediaInput}
                            activeSections={formData.activeSections}
                        />
                    )}

                </div>
            </div>

            {/* Media Modal - FULLY IMPLEMENTED */}
            {showImageBrowser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Media Library</h3>
                                <p className="text-xs text-slate-500">Manage images and folders</p>
                            </div>
                            <button onClick={() => setShowImageBrowser(false)} className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg"><X size={16} /></button>
                        </div>

                        {/* Toolbar (Breadcrumbs + Upload) */}
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
                                {/* Search */}
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

                        {/* File Grid */}
                        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 min-h-[300px]">
                            {mediaLoading ? (
                                <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-slate-400" size={32} /></div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">

                                    {/* Folders */}
                                    {folders.map((f, i) => (
                                        <button key={i} onClick={() => fetchMedia(f.path.replace(/^\//, ''))} className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group text-center">
                                            <Folder className="h-10 w-10 text-yellow-400 fill-yellow-50 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-bold text-slate-600 mt-2 truncate w-full">{f.name}</span>
                                        </button>
                                    ))}

                                    {/* Files */}
                                    {images.map((f, i) => (
                                        <button key={i} onClick={() => { updateField(currentImageField, f.path); setShowImageBrowser(false); }} className="relative group aspect-square bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-green-500 hover:shadow-lg transition-all">
                                            <img src={f.path} className="w-full h-full object-cover" alt={f.name} />

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                                <p className="text-[10px] text-white font-medium truncate w-full">{f.name}</p>
                                                <p className="text-[8px] text-white/80">{(f.size / 1024).toFixed(1)} KB</p>
                                            </div>

                                            {/* Selection Indicator */}
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