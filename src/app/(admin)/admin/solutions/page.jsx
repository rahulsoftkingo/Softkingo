"use client";
import React, { useState, useEffect, useCallback } from "react";
import { 
  Save, Plus, Trash2, Edit3, Globe, Layout, 
  Smartphone, Layers, Search, X, RefreshCw,
  ArrowLeft, Settings, Database, ListOrdered, 
  HelpCircle, Target, Image as ImageIcon, ZoomIn, 
  Folder, CheckCircle2, ChevronRight, Home, ExternalLink
} from "lucide-react";
import Image from "next/image";

export default function SolutionsAdmin() {
    const [items, setItems] = useState({ solutions: [], industries: [] });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [uploadingField, setUploadingField] = useState(null);

    // Image Browser States
    const [showImageBrowser, setShowImageBrowser] = useState(false);
    const [currentImageField, setCurrentImageField] = useState('');
    const [currentFolder, setCurrentFolder] = useState('');
    const [folderFiles, setFolderFiles] = useState([]);

    const initialForm = {
        section: "solutions",
        type: "ondemand", 
        slug: "",
        content: {
            hero: { title: "", subtitle: "", tag: "Premium", image: "" },
            stats: [{ label: "Projects Delivered", value: "500+" }],
            services: [{ title: "", image: "" }],
            caseStudy: { title: "", description: "", tech: "Next.js, Tailwind v4", image: "" },
            methodology: [{ title: "Analysis", desc: "Understanding goals" }],
            benefits: [{ title: "Why Softkingo?", desc: "Industry-leading expertise." }], 
            cta: { title: "Ready to Scale Your Vision?", btnText: "Start Now" }
        }
    };
    const [formData, setFormData] = useState(initialForm);

    // ========== API FETCHERS ==========
    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/solutions?section=all");
            const json = await res.json();
            if (json.ok) setItems(json.data);
        } catch (e) { console.error("List Fetch Error:", e); }
        setLoading(false);
    };

    const fetchFolderFiles = async (folder = '') => {
        try {
            const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
            if (res.ok) {
                const data = await res.json();
                setFolderFiles(data.files || []);
            }
        } catch (err) { console.error('Media fetch error:', err); }
    };

    useEffect(() => { fetchItems(); }, []);

    // ========== HANDLERS ==========
    const handleEdit = async (section, slug) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/solutions?section=${section}&slug=${slug}`);
            const json = await res.json();
            if (json.ok) {
                setFormData(json.data);
                setIsEditing(true);
            }
        } catch (e) { alert("Failed to load data.json from folder"); }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!formData.slug) return alert("URL Slug is required!");
        setLoading(true);
        const res = await fetch("/api/admin/solutions", {
            method: "POST",
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setIsEditing(false);
            fetchItems();
            setFormData(initialForm);
            alert("Folder and page.jsx generated successfully! ✅");
        }
        setLoading(false);
    };

    const handleDelete = async (section, slug) => {
        if (!confirm(`Confirm deletion of /${section}/${slug}?`)) return;
        const res = await fetch("/api/admin/solutions", {
            method: "DELETE",
            body: JSON.stringify({ section, slug })
        });
        if (res.ok) fetchItems();
    };

    const openBrowser = (fieldName) => {
        setCurrentImageField(fieldName);
        setShowImageBrowser(true);
        fetchFolderFiles('');
    };

    // ========== UI COMPONENTS (LOCAL) ==========
    const MediaInput = ({ label, value, path }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</label>
            <div className="flex gap-2">
                <input 
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                    value={value} 
                    readOnly
                />
                <button 
                    onClick={() => openBrowser(path)}
                    className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-sky-600 transition-colors"
                >
                    <Folder size={16}/>
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen text-slate-800">
            {!isEditing ? (
                /* ---------------- DASHBOARD LIST VIEW ---------------- */
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl border shadow-sm">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">Solutions Architect</h1>
                            <p className="text-slate-400 font-medium">Auto-generate folder-based page routes</p>
                        </div>
                        <button onClick={() => { setFormData(initialForm); setIsEditing(true); }} className="bg-sky-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black shadow-xl shadow-sky-200 hover:scale-105 transition-all">
                            <Plus size={20}/> Build New Page
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {["solutions", "industries"].map(sec => (
                            <div key={sec} className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 px-2 flex items-center gap-2">
                                    <Layers size={14}/> {sec} Listing
                                </h3>
                                <div className="grid gap-3">
                                    {items[sec]?.map(it => (
                                        <div key={it.slug} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center group hover:border-sky-400 transition-all shadow-sm">
                                            <div className="min-w-0">
                                                <div className="font-bold text-slate-700">{it.title || it.slug}</div>
                                                <div className="text-[10px] font-mono text-sky-500 uppercase tracking-tighter">{it.url}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(sec, it.slug)} className="p-2.5 bg-slate-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-colors"><Edit3 size={16}/></button>
                                                <button onClick={() => handleDelete(sec, it.slug)} className="p-2.5 bg-slate-50 text-red-500 rounded-xl hover:bg-red-50 transition-colors"><Trash2 size={16}/></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* ---------------- PAGE BUILDER EDITOR ---------------- */
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="sticky top-4 z-[50] flex justify-between items-center bg-white/90 backdrop-blur-md p-5 rounded-[2.5rem] border shadow-2xl">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsEditing(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200"><ArrowLeft size={20}/></button>
                            <h2 className="text-xl font-black tracking-tight italic text-slate-900">Building URL: <span className="text-sky-600">{formData.slug || "---"}</span></h2>
                        </div>
                        <button onClick={handleSave} className="bg-emerald-600 text-white px-10 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all">
                            {loading ? <RefreshCw className="animate-spin" size={20}/> : <Save size={20}/>} Build & Publish
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* LEFT COLUMN: CORE CONFIG */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
                                <h4 className="font-black text-slate-900 flex items-center gap-2"><Settings size={18}/> 1. Route Configuration</h4>
                                <div className="space-y-4">
                                    <select className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
                                        <option value="solutions">Solutions Folder</option>
                                        <option value="industries">Industries Folder</option>
                                    </select>
                                    <input placeholder="Slug (e.g. food-delivery)" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold placeholder-slate-300" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
                                <h4 className="font-black text-slate-900 flex items-center gap-2"><Smartphone size={18}/> 2. Hero Design</h4>
                                <input placeholder="Main Heading" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-black text-lg" value={formData.content.hero.title} onChange={e => setFormData({...formData, content: {...formData.content, hero: {...formData.content.hero, title: e.target.value}}})} />
                                <textarea placeholder="Sub-heading description..." className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm" rows={3} value={formData.content.hero.subtitle} onChange={e => setFormData({...formData, content: {...formData.content, hero: {...formData.content.hero, subtitle: e.target.value}}})} />
                                <MediaInput label="Hero Image" value={formData.content.hero.image} path="content.hero.image" />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: REPEATER SECTIONS */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* WHAT WE OFFER */}
                            <div className="bg-white p-10 rounded-[3rem] border shadow-sm space-y-6">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <h4 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter"><Database size={20}/> 3. The Services Grid</h4>
                                    <button onClick={() => {
                                        let temp = [...formData.content.services]; temp.push({title: "", image: ""});
                                        setFormData({...formData, content: {...formData.content, services: temp}});
                                    }} className="text-sky-600 font-black text-sm flex items-center gap-1">+ Add Module</button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {formData.content.services.map((s, i) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-[2rem] space-y-4 relative group border border-slate-100">
                                            <input placeholder="Module Title" className="w-full bg-transparent border-none font-bold text-slate-700" value={s.title} onChange={e => {
                                                let t = [...formData.content.services]; t[i].title = e.target.value; setFormData({...formData, content: {...formData.content, services: t}});
                                            }} />
                                            <MediaInput label="Icon" value={s.image} path={`content.services[${i}].image`} />
                                            <button onClick={() => {
                                                let t = formData.content.services.filter((_, idx) => idx !== i);
                                                setFormData({...formData, content: {...formData.content, services: t}});
                                            }} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SUCCESS STORY */}
                            <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 font-black text-8xl">STORY</div>
                                <h4 className="font-black flex items-center gap-2 uppercase tracking-widest text-sky-400"><Target size={20}/> 4. Success Case (Potafo Style)</h4>
                                <div className="space-y-4 relative z-10">
                                    <input placeholder="App Name" className="w-full bg-white/5 border-none rounded-2xl p-4 text-xl font-black text-white" value={formData.content.caseStudy.title} onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, title: e.target.value}}})} />
                                    <textarea placeholder="Success Story Description" className="w-full bg-white/5 border-none rounded-2xl p-4 text-slate-400 text-sm" rows={3} value={formData.content.caseStudy.description} onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, description: e.target.value}}})} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input placeholder="Tech Stack" className="bg-white/5 p-4 rounded-2xl border-none text-xs text-sky-400 font-bold" value={formData.content.caseStudy.tech} onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, tech: e.target.value}}})} />
                                        <MediaInput label="Case Image" value={formData.content.caseStudy.image} path="content.caseStudy.image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------------- IMAGE BROWSER MODAL ---------------- */}
            {showImageBrowser && (
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-5xl h-[80vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border-8 border-white/20">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <h2 className="font-black text-2xl flex items-center gap-3"><ImageIcon className="text-sky-500"/> Select Media Asset</h2>
                            <button onClick={() => setShowImageBrowser(false)} className="p-3 bg-white rounded-full shadow-sm"><X/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {folderFiles.map((file, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => {
                                        // Dynamic field update logic
                                        const pathArr = currentImageField.split(/[\[\].]+/ ).filter(Boolean);
                                        setFormData(prev => {
                                            const copy = JSON.parse(JSON.stringify(prev));
                                            let cur = copy;
                                            for(let k=0; k<pathArr.length-1; k++) cur = cur[pathArr[k]];
                                            cur[pathArr[pathArr.length-1]] = file.path;
                                            return copy;
                                        });
                                        setShowImageBrowser(false);
                                    }}
                                    className="group cursor-pointer space-y-2 text-center"
                                >
                                    <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border-4 border-transparent group-hover:border-sky-500 transition-all relative">
                                        <img src={file.path} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 truncate">{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}