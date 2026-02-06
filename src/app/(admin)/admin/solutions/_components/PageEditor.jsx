"use client";
import React, { useState, useCallback } from "react";
import { 
    ArrowLeft, RefreshCw, Smartphone, Layout, Database, 
    Target, Settings, Zap, CheckCircle2, X, Image as ImageIcon, Folder, 
    Briefcase, Code, DollarSign, BarChart3, ShieldCheck, HelpCircle,
    UploadCloud, FolderPlus, ChevronRight, Home, Search, Loader2, FolderOpen,
    Award, MessageSquare, MousePointerClick
} from "lucide-react";
import SolutionsEditor from "./SolutionEditor";

// --- 1. MEDIA INPUT (MOVED OUTSIDE TO FIX FOCUS ISSUE) ---
const MediaInput = ({ label, value, path, onUpdate, onBrowse }) => (
    <div className="group">
        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
        <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500">
            <div className="pl-3 text-slate-400"><ImageIcon size={14}/></div>
            
            {/* ✅ FIXED: Input is editable for Copy/Paste */}
            <input 
                className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400" 
                value={value || ''} 
                onChange={(e) => onUpdate(path, e.target.value)} 
                placeholder="Paste URL or Select Image..." 
            />
            
            {value && (
                <button onClick={() => onUpdate(path, "")} className="px-2 text-slate-400 hover:text-red-500" title="Clear">
                    <X size={14}/>
                </button>
            )}
            
            <button 
                onClick={() => onBrowse(path)} 
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200 font-medium text-xs flex items-center gap-1 transition-colors"
            >
                <FolderOpen size={14}/> Select
            </button>
        </div>
        
        {/* Preview */}
        {value && (
            <div className="mt-2 h-32 w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative group/preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} className="w-full h-full object-contain" alt="preview"/>
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
                { id: 'faq', label: '16. FAQ', icon: HelpCircle },
                { id: 'cta', label: '17. Bottom CTA', icon: MousePointerClick }
            ]
        },
        industry: { theme: "emerald", label: "Industry Page", uploadDir: "uploads/industries", sections: [
            { id: 'hero', label: 'Hero', icon: Smartphone }, { id: 'marketStats', label: 'Stats', icon: BarChart3 },
            { id: 'challenges', label: 'Challenges', icon: Target }, { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
            { id: 'solutions', label: 'Solutions', icon: Briefcase }, { id: 'cta', label: 'CTA', icon: Zap }
        ]},
        clone: { theme: "orange", label: "Clone Script", uploadDir: "uploads/clone", sections: [
            { id: 'hero', label: 'Hero', icon: Smartphone }, { id: 'revenue', label: 'Revenue', icon: DollarSign },
            { id: 'appFlow', label: 'App Flow', icon: Layout }, { id: 'features', label: 'Features', icon: Database },
            { id: 'comparison', label: 'Comparison', icon: CheckCircle2 }, { id: 'cta', label: 'CTA', icon: Zap }
        ]}
    }[type] || config.solution;

    const themeColor = config.theme;

    // --- STATE ---
    // Deep merge to ensure content object exists
    const [formData, setFormData] = useState({
        ...data,
        activeSections: data?.activeSections || config.sections.map(s => s.id),
        content: data?.content || { hero: {} } // Ensure hero object exists
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
        } catch(e) { console.error(e); }
        setMediaLoading(false);
    };

    const openBrowser = (path) => {
        setCurrentImageField(path);
        setShowImageBrowser(true);
        fetchMedia(config.uploadDir); 
    };

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
        } catch(e) { alert("Failed"); }
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
            const res = await fetch("/api/admin/solutions", { 
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
                alert("✅ Saved Successfully!");
                if (result.data && result.data.id) {
                    setFormData(prev => ({ ...prev, id: result.data.id }));
                }
            }
        } catch(e) { 
            console.error(e);
            alert("Something went wrong");
        }
        setLoading(false);
    };

    // ✅ FIXED: useCallback ensures the function reference remains stable
    const updateField = useCallback((path, value) => {
        setFormData(prev => {
            const copy = JSON.parse(JSON.stringify(prev));
            if (!copy.content) copy.content = {};
            
            const keys = path.split('.');
            let current = copy;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return copy;
        });
    }, []);

    // Memoize the Bound Media Input
    const BoundMediaInput = useCallback((props) => (
        <MediaInput {...props} onUpdate={updateField} onBrowse={openBrowser} />
    ), [updateField]);

    const folders = mediaFiles.filter(f => f.isDir && f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const images = mediaFiles.filter(f => !f.isDir && f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex h-screen overflow-hidden bg-white fixed inset-0 z-50">
            {/* Sidebar */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-5 border-b bg-white">
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 mb-4"><ArrowLeft size={14}/> BACK</button>
                    <h2 className={`text-lg font-black text-${themeColor}-600 flex items-center gap-2 uppercase`}>{config.label}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 block">PAGE SETTINGS</label>
                        <input className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Page Title" />
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 px-2">
                            <span className="text-slate-400 text-xs">/</span>
                            <input className="w-full p-2 bg-transparent border-none text-sm font-mono text-slate-600 outline-none" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="slug-url" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 block">SECTIONS</label>
                        {config.sections.map((section) => {
                            const isActive = formData.activeSections?.includes(section.id);
                            return (
                                <button key={section.id} onClick={() => {
                                    const newSections = isActive ? formData.activeSections.filter(id => id !== section.id) : [...(formData.activeSections || []), section.id];
                                    setFormData({...formData, activeSections: newSections});
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
                        {loading ? <RefreshCw className="animate-spin" size={16}/> : <Save size={16}/>} Save Page
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 bg-slate-100 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    {type === 'solution' && (
                        <SolutionsEditor 
                            formData={formData} 
                            updateField={updateField} 
                            MediaInput={BoundMediaInput} 
                            activeSections={formData.activeSections}
                        />
                    )}
                    {/* ... other types ... */}
                </div>
            </div>

            {/* Media Modal */}
            {showImageBrowser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                     <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Media Library</h3>
                            <button onClick={() => setShowImageBrowser(false)} className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg"><X size={16}/></button>
                        </div>
                        {/* ... (Media Browser Body logic same as before) ... */}
                        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50">
                            {/* Copy-paste the inner body of modal from previous code or let me know if you need full again */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {folders.map((f, i) => (
                                    <button key={i} onClick={() => fetchMedia(f.path.replace(/^\//, ''))} className="flex flex-col items-center p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 group">
                                        <Folder className="h-10 w-10 text-yellow-400 fill-yellow-50" />
                                        <span className="text-[10px] font-medium text-slate-600 mt-2 truncate w-full text-center">{f.name}</span>
                                    </button>
                                ))}
                                {images.map((f, i) => (
                                    <button key={i} onClick={() => { updateField(currentImageField, f.path); setShowImageBrowser(false); }} className="relative group aspect-square bg-white border border-slate-200 rounded-xl overflow-hidden">
                                        <img src={f.path} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}