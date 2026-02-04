"use client";
import React, { useState, useEffect } from "react";
import { 
  Save, ArrowLeft, RefreshCw, Smartphone, Layout, Database, 
  Target, Settings, Zap, CheckCircle2, X, Image as ImageIcon, Folder, Briefcase, FileText, HelpCircle, Code 
} from "lucide-react";

export default function PageEditor({ data, type, onBack }) {
    // Determine Color Theme based on Type
    const themeColor = {
        solution: "sky",
        industry: "emerald",
        clone: "orange"
    }[type] || "sky";

    const [formData, setFormData] = useState(data || {});
    const [loading, setLoading] = useState(false);
    
    // Image Browser State
    const [showImageBrowser, setShowImageBrowser] = useState(false);
    const [currentImageField, setCurrentImageField] = useState('');
    const [folderFiles, setFolderFiles] = useState([]);

    const fetchFolderFiles = async () => {
        const res = await fetch(`/api/media/list`);
        if (res.ok) {
            const json = await res.json();
            setFolderFiles(json.files || []);
        }
    };

    const handleSave = async () => {
        if (!formData.slug) return alert("Slug is required!");
        setLoading(true);
        // Ensure we send the correct 'section' based on type logic if needed, 
        // or rely on what was passed in 'data'
        const res = await fetch("/api/admin/solutions", {
            method: "POST",
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            alert(`${type.toUpperCase()} Page Saved! 🚀`);
            onBack(); // Go back to list
        }
        setLoading(false);
    };

    const openBrowser = (fieldName) => {
        setCurrentImageField(fieldName);
        setShowImageBrowser(true);
        fetchFolderFiles();
    };

    const updateField = (path, value) => {
        setFormData(prev => {
            const copy = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let current = copy;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return copy;
        });
    };

    const toggleSection = (id) => {
        setFormData(prev => {
            const sections = new Set(prev.activeSections || []);
            sections.has(id) ? sections.delete(id) : sections.add(id);
            return { ...prev, activeSections: Array.from(sections) };
        });
    };

    // --- SUB-COMPONENTS ---
    const MediaInput = ({ label, value, path }) => (
        <div className="group">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
            <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <div className="pl-3 text-slate-400"><ImageIcon size={14}/></div>
                <input className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700" value={value} readOnly placeholder="Select image..." />
                <button onClick={() => openBrowser(path)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200"><Folder size={14}/></button>
            </div>
            {value && <img src={value} className="h-16 w-full object-cover mt-2 rounded-lg border border-slate-200" alt="preview"/>}
        </div>
    );

    const SectionToggle = ({ id, label, icon: Icon }) => {
        const isActive = formData.activeSections?.includes(id);
        const activeClass = `bg-${themeColor}-50 border-${themeColor}-200 text-${themeColor}-700`;
        const inactiveClass = `bg-white border-slate-100 text-slate-400`;

        return (
            <button onClick={() => toggleSection(id)} className={`flex items-center gap-3 w-full p-3 rounded-xl border transition-all ${isActive ? activeClass : inactiveClass}`}>
                <div className={`p-2 rounded-lg ${isActive ? `bg-${themeColor}-100 text-${themeColor}-600` : 'bg-slate-50 text-slate-400'}`}><Icon size={16} /></div>
                <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                {isActive && <CheckCircle2 size={14} className={`ml-auto text-${themeColor}-500`} />}
            </button>
        );
    };

    return (
        <div className="flex h-screen overflow-hidden bg-white fixed inset-0 z-50">
            {/* LEFT SIDEBAR: Config */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-5 border-b bg-white">
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 mb-4"><ArrowLeft size={14}/> BACK TO LIST</button>
                    <h2 className={`text-lg font-black text-${themeColor}-600 flex items-center gap-2 uppercase`}>
                        {type} Editor
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 block">URL SETTINGS</label>
                        <select className="w-full p-2 bg-white rounded-lg border border-slate-200 text-sm font-bold" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
                             <option value="solutions">Solutions Folder</option>
                             <option value="industries">Industries Folder</option>
                        </select>
                        <input className="w-full p-2 bg-white rounded-lg border border-slate-200 text-sm font-bold" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="Slug" />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 block">ACTIVE SECTIONS</label>
                        <SectionToggle id="hero" label="Hero Banner" icon={Smartphone} />
                        <SectionToggle id="about" label="About + Lead Form" icon={Layout} />
                        <SectionToggle id="features" label="Features Grid" icon={Database} />
                        <SectionToggle id="banner" label="Hungry Banner" icon={Zap} />
                        <SectionToggle id="whyInvest" label="Why Invest" icon={Target} />
                        <SectionToggle id="tech" label="Tech Stack" icon={Settings} />
                        <SectionToggle id="portfolio" label="Portfolio" icon={Briefcase} />
                        <SectionToggle id="awards" label="Awards" icon={CheckCircle2} />
                        <SectionToggle id="cta" label="Bottom CTA" icon={Zap} />
                        <SectionToggle id="blogs" label="Blogs" icon={FileText} />
                        <SectionToggle id="faq" label="FAQ" icon={HelpCircle} />
                    </div>
                </div>
                <div className="p-5 border-t bg-white">
                    <button onClick={handleSave} className={`w-full bg-${themeColor}-600 text-white py-3 rounded-xl font-bold text-sm flex justify-center gap-2 hover:bg-${themeColor}-700 transition-colors`}>
                        {loading ? <RefreshCw className="animate-spin" size={16}/> : <Save size={16}/>} Save Page
                    </button>
                </div>
            </div>

            {/* RIGHT EDITOR */}
            <div className="flex-1 bg-slate-100 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                         <h1 className="text-2xl font-black text-slate-800">Content Editor</h1>
                         <span className="text-xs font-mono text-slate-400">Editing: /{formData.section}/{formData.slug}</span>
                    </div>

                    {/* HERO */}
                    {formData.activeSections?.includes('hero') && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="font-bold text-slate-700 border-b pb-2">Hero Section</h3>
                            <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="Title" value={formData.content?.hero?.title} onChange={e => updateField('content.hero.title', e.target.value)} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Subtitle" rows={2} value={formData.content?.hero?.subtitle} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
                            <MediaInput label="Background" value={formData.content?.hero?.image} path="content.hero.image" />
                        </div>
                    )}

                    {/* ABOUT */}
                    {formData.activeSections?.includes('about') && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="font-bold text-slate-700 border-b pb-2">About & Benefits</h3>
                            <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="About Title" value={formData.content?.aboutTitle} onChange={e => updateField('content.aboutTitle', e.target.value)} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Description" rows={2} value={formData.content?.aboutSubtitle} onChange={e => updateField('content.aboutSubtitle', e.target.value)} />
                            
                            <div className="bg-slate-50 p-3 rounded-lg space-y-2">
                                <label className="text-[10px] font-bold text-slate-400">BENEFITS LIST</label>
                                {(formData.content.benefits || []).map((b, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input className="flex-1 p-2 bg-white border rounded-lg text-sm" value={b} onChange={e => {
                                            const arr = [...formData.content.benefits]; arr[i] = e.target.value; updateField('content.benefits', arr);
                                        }} />
                                        <button onClick={() => updateField('content.benefits', formData.content.benefits.filter((_, x) => x !== i))} className="p-2 text-rose-500 hover:bg-rose-100 rounded"><X size={14}/></button>
                                    </div>
                                ))}
                                <button onClick={() => updateField('content.benefits', [...(formData.content.benefits || []), "New Benefit"])} className="text-xs font-bold text-sky-600">+ Add Benefit</button>
                            </div>
                        </div>
                    )}

                    {/* FEATURES (SERVICES) */}
                    {formData.activeSections?.includes('features') && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="font-bold text-slate-700 border-b pb-2">Features Grid</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {(formData.content?.services || []).map((s, i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
                                        <input className="w-full bg-white p-2 rounded-lg border border-slate-200 text-sm font-bold mb-2" value={s.title} onChange={e => {
                                            const arr = [...formData.content.services]; arr[i].title = e.target.value; updateField('content.services', arr);
                                        }} placeholder="Title" />
                                        <MediaInput label="Icon" value={s.image} path={`content.services[${i}].image`} />
                                        <button onClick={() => updateField('content.services', formData.content.services.filter((_, x) => x !== i))} className="absolute top-2 right-2 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => updateField('content.services', [...(formData.content.services || []), { title: "", image: "" }])} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-sky-400 hover:text-sky-500 transition-colors">+ Add Card</button>
                        </div>
                    )}

                    {/* BANNER */}
                    {formData.activeSections?.includes('banner') && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="font-bold text-slate-700 border-b pb-2">Hungry Banner</h3>
                            <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="Banner Title" value={formData.content?.banner?.title} onChange={e => updateField('content.banner.title', e.target.value)} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Banner Text..." rows={2} value={formData.content?.banner?.subtitle} onChange={e => updateField('content.banner.subtitle', e.target.value)} />
                            <input className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Button Text" value={formData.content?.banner?.btnText} onChange={e => updateField('content.banner.btnText', e.target.value)} />
                        </div>
                    )}

                    {/* WHY INVEST */}
                    {formData.activeSections?.includes('whyInvest') && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="font-bold text-slate-700 border-b pb-2">Why Invest</h3>
                            <MediaInput label="Side Image" value={formData.content?.caseStudy?.image} path="content.caseStudy.image" />
                        </div>
                    )}

                    {/* EXTRAS */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <h3 className="font-bold text-slate-700 border-b pb-2">Extras</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 block mb-1">PORTFOLIO CATEGORY</label>
                                <input className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.content?.portfolioCategory} onChange={e => updateField('content.portfolioCategory', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 block mb-1">CTA TITLE</label>
                                <input className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.content?.cta?.title} onChange={e => updateField('content.cta.title', e.target.value)} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* IMAGE BROWSER MODAL */}
             {showImageBrowser && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-10 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl h-full rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center"><h3 className="font-bold">Select Media</h3><button onClick={() => setShowImageBrowser(false)}><X/></button></div>
                        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-5 gap-4">
                            {folderFiles.map((f, i) => (
                                <div key={i} onClick={() => {
                                    const pathArr = currentImageField.split(/[\[\].]+/).filter(Boolean);
                                    setFormData(prev => {
                                        const copy = JSON.parse(JSON.stringify(prev));
                                        let cur = copy;
                                        for(let k=0; k<pathArr.length-1; k++) cur = cur[pathArr[k]];
                                        cur[pathArr[pathArr.length-1]] = f.path;
                                        return copy;
                                    });
                                    setShowImageBrowser(false);
                                }} className="cursor-pointer group">
                                    <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-2 relative"><img src={f.path} className="w-full h-full object-cover"/></div>
                                    <p className="text-[10px] truncate mt-1">{f.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}