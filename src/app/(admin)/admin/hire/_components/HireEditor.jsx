"use client";
import React, { useState, useEffect, useCallback } from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';
import {
    ArrowLeft, Save, Eye, Image as ImageIcon, Plus, X,
    Smartphone, Layout, Database, Settings, Briefcase, Users, Zap, CheckCircle2, Layers, DollarSign, BarChart3, MousePointerClick, FolderOpen, Loader2, MessageSquare,
    HelpCircle, Search, Home, ChevronRight, UploadCloud, FolderPlus, RefreshCw, Copy, Mail
} from 'lucide-react';

// --- STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block";

// --- MEDIA INPUT COMPONENT ---
const MediaInput = ({ label, value, path, onUpdate, onBrowse }) => (
    <div className="group">
        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
        <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-500">
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
                className="px-4 py-2.5 bg-slate-100 font-bold hover:bg-slate-200 text-slate-600 border-l border-slate-200 text-[10px] flex items-center gap-1 transition-colors uppercase"
            >
                <FolderOpen size={14} /> Select
            </button>
        </div>
        {value && (
            <div className="mt-2 h-24 w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} className="w-full h-full object-contain" alt="preview" />
            </div>
        )}
    </div>
);

// --- ARRAY FIELD HELPER ---
const ArrayField = ({ label, path, items = [], renderItem, updateField, defaultItem = {} }) => (
    <div className="space-y-2">
        {label && <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>}
        <div className="space-y-2">
            {(Array.isArray(items) ? items : []).map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100 group relative">
                    <div className="flex-1 grid gap-2">{renderItem(item, idx)}</div>
                    <button onClick={() => updateField(path, items.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                </div>
            ))}
        </div>
        <button onClick={() => {
            let newItem = typeof defaultItem === 'object' ? JSON.parse(JSON.stringify(defaultItem)) : defaultItem;
            updateField(path, [...items, newItem]);
        }} className="flex items-center gap-1 text-xs font-bold text-cyan-600 hover:bg-cyan-50 px-3 py-2 rounded-lg border border-cyan-100">
            <Plus size={14} /> Add Item
        </button>
    </div>
);

// --- SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 border-l-4 border-l-cyan-500 mb-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

export default function HireEditor({ data, onBack, onSave, loading }) {

    // Config: Sections List
    const sections = [
        { id: 'hero', label: '1. Hero Section', icon: Smartphone },
        { id: 'features', label: '2. Stats & Awards', icon: Database },
        { id: 'about', label: '3. About Section', icon: Layout },
        { id: 'steps', label: '4. Development Process', icon: Settings },
        { id: 'services', label: '5. Our Services', icon: Briefcase },
        { id: 'industryHire', label: '6. Industry Solutions', icon: Layers },
        { id: 'moreServices', label: '7. Solutions List', icon: Copy },
        { id: 'profile', label: '8. Detailed Profile', icon: Users },
        { id: 'portfolio', label: '9. Portfolio', icon: FolderOpen },
        { id: 'techStack', label: '10. Tech Stack', icon: Settings },
        { id: 'models', label: '11. Working Models', icon: Zap },
        { id: 'pricing', label: '12. Pricing Plans', icon: DollarSign },
        { id: 'comparison', label: '13. Comparison Table', icon: BarChart3 },
        { id: 'blogs', label: '14. Blog Section', icon: MessageSquare },
        { id: 'faq', label: '15. FAQ Section', icon: HelpCircle },
        { id: 'inquiry', label: '16. Inquiry Section', icon: Mail },
        { id: 'ctaBanner', label: '17. CTA Banner', icon: Mail }
    ];

    // State - always ensure new sections are included even in older saved pages
    const allSectionIds = sections.map(s => s.id);
    const savedSections = data?.activeSections || [];
    const mergedSections = savedSections.length > 0
        ? [...new Set([...savedSections, 'portfolio'])] // ensure portfolio always present
        : allSectionIds;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        ...data,
        activeSections: mergedSections,
        content: data?.content || {}
    });

    const [availableCategories, setAvailableCategories] = useState([]);
    const [showImageBrowser, setShowImageBrowser] = useState(false);
    const [currentImageField, setCurrentImageField] = useState("");
    const [mediaPath, setMediaPath] = useState("uploads/hire");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('/api/admin/portfolio-projects/categories');
                if (res.ok) {
                    const data = await res.json();
                    setAvailableCategories(data || []);
                }
            } catch (err) {
                console.error('Error fetching portfolio categories:', err);
            }
        }
        fetchCategories();
    }, []);

    // --- Helper: Update Fields ---
    const updateField = useCallback((path, value) => {
        setFormData(prev => {
            const keys = path.split('.');
            const copy = JSON.parse(JSON.stringify(prev));
            let current = copy;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!current[key]) current[key] = {};
                current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
                current = current[key];
            }

            current[keys[keys.length - 1]] = value;
            return copy;
        });
    }, []);

    // --- Helper: Update Nested Arrays ---
    const updateArrayObject = (path, index, field, value) => {
        const parts = path.split('.');
        let currentArr = formData;
        for (let part of parts) {
            currentArr = currentArr[part];
        }
        const newArr = [...(currentArr || [])];
        if (!newArr[index]) newArr[index] = {};
        newArr[index] = { ...newArr[index], [field]: value };
        updateField(path, newArr);
    };

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
        fetchMedia(mediaPath);
    }, [mediaPath]);

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

    const BoundMediaInput = useCallback((props) => (
        <MediaInput {...props} onUpdate={updateField} onBrowse={openBrowser} />
    ), [updateField, openBrowser]);

    const folders = mediaFiles.filter(f => f.isDir && f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const images = mediaFiles.filter(f => !f.isDir && f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // --- RENDER ---
    return (
        <div className="flex h-screen overflow-hidden bg-white fixed inset-0 z-50">
            {/* SIDEBAR */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-5 border-b bg-white">
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 mb-4"><ArrowLeft size={14} /> BACK</button>
                    <h2 className="text-lg font-black text-cyan-600 flex items-center gap-2 uppercase">Hire Page Editor</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {/* Basic Settings */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 block">PAGE INFO</label>
                        <input className={inputStyle} value={formData.title || ''} onChange={e => {
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
                            <span className="text-slate-400 text-xs">/hire/</span>
                            <input className="w-full p-2 bg-transparent border-none text-sm font-mono text-slate-600 outline-none" value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="slug" />
                        </div>

                        <input className={inputStyle} value={formData.key} onChange={e => setFormData({ ...formData, key: e.target.value })} placeholder="Page Key (e.g. hire-android)" />

                        <textarea className={inputStyle} rows={3} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Excerpt / Short Description" />

                        <select className={inputStyle} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Section Toggles */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 block">SECTIONS</label>
                        {sections.map((section) => {
                            const isActive = formData.activeSections?.includes(section.id);
                            return (
                                <button key={section.id} onClick={() => {
                                    const newSections = isActive ? formData.activeSections.filter(id => id !== section.id) : [...(formData.activeSections || []), section.id];
                                    setFormData({ ...formData, activeSections: newSections });
                                }} className={`flex items-center gap-3 w-full p-3 rounded-xl border transition-all ${isActive ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-white border-slate-100 text-slate-400'}`}>
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-100' : 'bg-slate-50'}`}><section.icon size={16} /></div>
                                    <span className="text-xs font-bold uppercase">{section.label}</span>
                                    {isActive && <CheckCircle2 size={14} className="ml-auto text-cyan-500" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-5 border-t bg-white">
                    <button onClick={() => onSave(formData)} className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold text-sm flex justify-center gap-2 hover:bg-cyan-700 transition-all shadow-lg">
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Page
                    </button>
                </div>
            </div>

            {/* MAIN EDITOR AREA */}
            <div className="flex-1 bg-slate-100 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">

                    {/* 1. HERO */}
                    <div id="section-hero">
                        <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input className={inputStyle} placeholder="Hero Title" value={formData.content.heroTitle || ''} onChange={e => updateField('content.heroTitle', e.target.value)} />
                                <input className={inputStyle} placeholder="Badge Text" value={formData.content.badgeText || ''} onChange={e => updateField('content.badgeText', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Hero Subtitle (Rich Text)</label>
                                <MiniRichTextEditor value={formData.content.heroSubtitle || ''} onChange={val => updateField('content.heroSubtitle', val)} />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="space-y-1">
                                    <label className={labelStyle}>Avg Time</label>
                                    <input className={inputStyle} placeholder="48 Hours" value={formData.content.metrics?.avgTime || ''} onChange={e => updateField('content.metrics.avgTime', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Network</label>
                                    <input className={inputStyle} placeholder="100+ Experts" value={formData.content.metrics?.network || ''} onChange={e => updateField('content.metrics.network', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Rating</label>
                                    <input className={inputStyle} placeholder="4.9/5" value={formData.content.metrics?.rating || ''} onChange={e => updateField('content.metrics.rating', e.target.value)} />
                                </div>
                            </div>
                            <BoundMediaInput label="Hero Background Image" value={formData.content.heroBg} path="content.heroBg" />
                        </SectionWrapper>
                    </div>

                    {/* 2. FEATURES (STATS) */}
                    <div id="section-features">
                        <SectionWrapper id="features" icon={Database} title="2. Stats & Awards" activeSections={formData.activeSections}>
                            <ArrayField path="content.features" items={formData.content.features} updateField={updateField} defaultItem={{ title: "", description: "", iconKey: "FaUser" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2 border-b pb-4 mb-2 border-slate-100 last:border-0">
                                        <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.features', i, 'title', e.target.value)} />
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Description (Plain Text)</label>
                                            <textarea className={inputStyle} rows={2} placeholder="Brief description..." value={item.description || ''} onChange={e => updateArrayObject('content.features', i, 'description', e.target.value)} />
                                        </div>
                                        <input className={inputStyle} placeholder="Icon Key (e.g. FaUser)" value={item.iconKey || ''} onChange={e => updateArrayObject('content.features', i, 'iconKey', e.target.value)} />
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 3. ABOUT SECTION */}
                    <div id="section-about">
                        <SectionWrapper id="about" icon={Layout} title="3. About Section" activeSections={formData.activeSections}>
                            <input className={inputStyle} placeholder="About Title" value={formData.content.aboutTitle || ''} onChange={e => updateField('content.aboutTitle', e.target.value)} />
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">About Subtitle (Rich Text)</label>
                                <MiniRichTextEditor value={formData.content.aboutSubtitle || ''} onChange={val => updateField('content.aboutSubtitle', val)} />
                            </div>
                            <div className="border-t pt-4">
                                <label className="text-xs font-bold text-slate-400 mb-2 block">BENEFITS LIST</label>
                                <ArrayField path="content.benefits" items={formData.content.benefits} updateField={updateField} defaultItem=""
                                    renderItem={(item, i) => (
                                        <input className={inputStyle} value={item || ''} onChange={e => {
                                            const arr = [...(formData.content.benefits || [])]; arr[i] = e.target.value; updateField('content.benefits', arr);
                                        }} />
                                    )}
                                />
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* 4. HIRING STEPS */}
                    <div id="section-steps">
                        <SectionWrapper id="steps" icon={Settings} title="4. Hiring Steps" activeSections={formData.activeSections}>
                            <ArrayField path="content.steps" items={formData.content.steps} updateField={updateField} defaultItem={{ number: 1, title: "", description: "", icon: "" }}
                                renderItem={(item, i) => (
                                    <div className="flex gap-2 border-b pb-4 mb-2 border-slate-100 last:border-0 text-left">
                                        <div className="w-8 pt-2 text-center font-bold text-slate-300">{i + 1}</div>
                                        <div className="flex-1 space-y-2">
                                            <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.steps', i, 'title', e.target.value)} />
                                            <textarea className={inputStyle} rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateArrayObject('content.steps', i, 'description', e.target.value)} />
                                            <BoundMediaInput label="Step Icon" value={item.icon} path={`content.steps.${i}.icon`} />
                                        </div>
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 5. SERVICES */}
                    <div id="section-services">
                        <SectionWrapper id="services" icon={Briefcase} title="5. Services Cards" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <input className={inputStyle} placeholder="Section Title" value={formData.content.servicesTitle || ''} onChange={e => updateField('content.servicesTitle', e.target.value)} />
                                <input className={inputStyle} placeholder="Section Subtitle" value={formData.content.servicesSubtitle || ''} onChange={e => updateField('content.servicesSubtitle', e.target.value)} />
                            </div>
                            <ArrayField path="content.services" items={formData.content.services} updateField={updateField} defaultItem={{ title: "", description: "", iconKey: "BsTransparency", bg: "from-sky-500 to-sky-600" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2">
                                        <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.services', i, 'title', e.target.value)} />
                                        <input className={inputStyle} placeholder="Description" value={item.description || ''} onChange={e => updateArrayObject('content.services', i, 'description', e.target.value)} />
                                        <div className="flex gap-2">
                                            <input className={inputStyle} placeholder="Icon Key" value={item.iconKey || ''} onChange={e => updateArrayObject('content.services', i, 'iconKey', e.target.value)} />
                                            <input className={inputStyle} placeholder="Gradient Class" value={item.bg || ''} onChange={e => updateArrayObject('content.services', i, 'bg', e.target.value)} />
                                        </div>
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 6. INDUSTRY HIRE */}
                    <div id="section-industryHire">
                        <SectionWrapper id="industryHire" icon={Layers} title="6. Industry Specific Solutions" activeSections={formData.activeSections}>
                            <input className={inputStyle} placeholder="Section Title" value={formData.content.industryHire?.title || ''} onChange={e => updateField('content.industryHire.title', e.target.value)} />
                            <textarea className={inputStyle} rows={2} placeholder="Section Subtitle" value={formData.content.industryHire?.subtitle || ''} onChange={e => updateField('content.industryHire.subtitle', e.target.value)} />
                            <ArrayField path="content.industryHire.items" items={formData.content.industryHire?.items} updateField={updateField} defaultItem={{ name: "", title: "", description: "", href: "", iconKey: "FaBuilding" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2 border-b pb-4 mb-2 border-slate-200">
                                        <div className="grid grid-cols-2 gap-2">
                                            <input className={inputStyle} placeholder="Industry Name (e.g. Healthcare)" value={item.name || ''} onChange={e => updateArrayObject('content.industryHire.items', i, 'name', e.target.value)} />
                                            <input className={inputStyle} placeholder="Card Title" value={item.title || ''} onChange={e => updateArrayObject('content.industryHire.items', i, 'title', e.target.value)} />
                                        </div>
                                        <textarea className={inputStyle} rows={2} placeholder="Card Description" value={item.description || ''} onChange={e => updateArrayObject('content.industryHire.items', i, 'description', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input className={inputStyle} placeholder="Know More Link" value={item.href || ''} onChange={e => updateArrayObject('content.industryHire.items', i, 'href', e.target.value)} />
                                            <input className={inputStyle} placeholder="Icon Key" value={item.iconKey || ''} onChange={e => updateArrayObject('content.industryHire.items', i, 'iconKey', e.target.value)} />
                                        </div>
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 7. MORE SERVICES */}
                    <div id="section-moreServices">
                        <SectionWrapper id="moreServices" icon={Layers} title="7. Solutions List" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <input className={inputStyle} placeholder="Section Title" value={formData.content.moreServicesTitle || ''} onChange={e => updateField('content.moreServicesTitle', e.target.value)} />
                                <input className={inputStyle} placeholder="Section Subtitle" value={formData.content.moreServicesSubtitle || ''} onChange={e => updateField('content.moreServicesSubtitle', e.target.value)} />
                            </div>
                            <ArrayField path="content.moreServices" items={formData.content.moreServices} updateField={updateField} defaultItem={{ title: "", description: "", iconKey: "BsFileEarmarkBarGraph" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2">
                                        <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.moreServices', i, 'title', e.target.value)} />
                                        <textarea className={inputStyle} rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateArrayObject('content.moreServices', i, 'description', e.target.value)} />
                                        <input className={inputStyle} placeholder="Icon Key" value={item.iconKey || ''} onChange={e => updateArrayObject('content.moreServices', i, 'iconKey', e.target.value)} />
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 8. PROFILE */}
                    <div id="section-profile">
                        <SectionWrapper id="profile" icon={Users} title="8. Detailed Profile" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input className={inputStyle} placeholder="Title" value={formData.content.profileSection?.title || ''} onChange={e => updateField('content.profileSection.title', e.target.value)} />
                                <input className={inputStyle} placeholder="Subtitle" value={formData.content.profileSection?.subtitle || ''} onChange={e => updateField('content.profileSection.subtitle', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <BoundMediaInput label="Left Top Image" value={formData.content.profileSection?.images?.leftTop} path="content.profileSection.images.leftTop" />
                                <BoundMediaInput label="Right Top Image" value={formData.content.profileSection?.images?.rightTop} path="content.profileSection.images.rightTop" />
                                <BoundMediaInput label="Right Bottom Image" value={formData.content.profileSection?.images?.rightBottom} path="content.profileSection.images.rightBottom" />
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* 9. PORTFOLIO SECTION */}
                    <div id="section-portfolio">
                        <SectionWrapper id="portfolio" icon={FolderOpen} title="9. Portfolio" activeSections={formData.activeSections}>
                            <div className="space-y-3">
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Portfolio Title</label>
                                        <input className={inputStyle} placeholder="e.g. Our Success Stories" value={formData.content.portfolioTitle || ''} onChange={e => updateField('content.portfolioTitle', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category Filter</label>
                                        <select className={inputStyle} value={formData.content.portfolioCategory || ''} onChange={e => updateField('content.portfolioCategory', e.target.value)}>
                                            <option value="">Select Category (Top 7)...</option>
                                            {availableCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <p className="text-[10px] text-slate-400 mt-1">Leave blank → shows top 7 projects</p>
                                    </div>
                                </div>
                                <textarea className={inputStyle} rows={2} placeholder="Portfolio subtitle..." value={formData.content.portfolioSubtitle || ''} onChange={e => updateField('content.portfolioSubtitle', e.target.value)} />
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* 10. TECH STACK */}
                    <div id="section-techStack">
                        <SectionWrapper id="techStack" icon={Settings} title="10. Tech Stack" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <input className={inputStyle} placeholder="Section Title" value={formData.content.techStackTitle || ''} onChange={e => updateField('content.techStackTitle', e.target.value)} />
                                <input className={inputStyle} placeholder="Section Subtitle" value={formData.content.techStackSubtitle || ''} onChange={e => updateField('content.techStackSubtitle', e.target.value)} />
                            </div>
                            <p className="text-[10px] text-slate-400 italic mb-2">Note: This section currently uses default tech data if left empty. Full custom tech stack editing coming soon.</p>
                            <textarea className={inputStyle} rows={4} placeholder="Custom JSON for Tech Stack (Optional)" value={formData.content.techStack ? JSON.stringify(formData.content.techStack, null, 2) : ''} onChange={e => {
                                try { updateField('content.techStack', JSON.parse(e.target.value)); } catch (err) { /* ignore invalid json while typing */ }
                            }} />
                        </SectionWrapper>
                    </div>

                    {/* 11. WORKING MODELS */}
                    <div id="section-models">
                        <SectionWrapper id="models" icon={Zap} title="11. Working Models" activeSections={formData.activeSections}>
                            <input className={inputStyle} placeholder="Title" value={formData.content.modelsSection?.title || ''} onChange={e => updateField('content.modelsSection.title', e.target.value)} />
                            <input className={inputStyle} placeholder="Subtitle" value={formData.content.modelsSection?.subtitle || ''} onChange={e => updateField('content.modelsSection.subtitle', e.target.value)} />
                            <ArrayField path="content.modelsSection.models" items={formData.content.modelsSection?.models} updateField={updateField} defaultItem={{ title: "", description: "", iconKey: "CiClock1", features: [], buttonText: "" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2 border-b pb-4 mb-2 border-slate-200">
                                        <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.modelsSection.models', i, 'title', e.target.value)} />
                                        <textarea className={inputStyle} rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateArrayObject('content.modelsSection.models', i, 'description', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input className={inputStyle} placeholder="Icon Key" value={item.iconKey || ''} onChange={e => updateArrayObject('content.modelsSection.models', i, 'iconKey', e.target.value)} />
                                            <input className={inputStyle} placeholder="Button Text" value={item.buttonText || ''} onChange={e => updateArrayObject('content.modelsSection.models', i, 'buttonText', e.target.value)} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features List</label>
                                            <ArrayField path={`content.modelsSection.models.${i}.features`} items={item.features} updateField={updateField} defaultItem=""
                                                renderItem={(f, fi) => (
                                                    <input className={inputStyle} value={f || ''} onChange={e => {
                                                        const arr = [...(item.features || [])]; arr[fi] = e.target.value; updateField(`content.modelsSection.models.${i}.features`, arr);
                                                    }} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 12. PRICING */}
                    <div id="section-pricing">
                        <SectionWrapper id="pricing" icon={DollarSign} title="12. Pricing Plans" activeSections={formData.activeSections}>
                            <input className={inputStyle} placeholder="Title" value={formData.content.pricingSection?.title || ''} onChange={e => updateField('content.pricingSection.title', e.target.value)} />
                            <input className={inputStyle} placeholder="Subtitle" value={formData.content.pricingSection?.subtitle || ''} onChange={e => updateField('content.pricingSection.subtitle', e.target.value)} />

                            <ArrayField path="content.pricingSection.plans" items={formData.content.pricingSection?.plans} updateField={updateField} defaultItem={{ title: "", price: "", priceNote: "month", subtitle: "", features: [], featured: false, buttonText: "" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2 border-b pb-4 mb-2 border-slate-200">
                                        <div className="grid grid-cols-3 gap-2">
                                            <input className={inputStyle} placeholder="Plan Name" value={item.title || ''} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'title', e.target.value)} />
                                            <input className={inputStyle} placeholder="Price" value={item.price || ''} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'price', e.target.value)} />
                                            <input className={inputStyle} placeholder="Price Note" value={item.priceNote || ''} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'priceNote', e.target.value)} />
                                        </div>
                                        <input className={inputStyle} placeholder="Subtitle" value={item.subtitle || ''} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'subtitle', e.target.value)} />
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" checked={item.featured || false} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'featured', e.target.checked)} />
                                            <label className="text-xs font-bold text-slate-600 uppercase">Featured Plan</label>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features</label>
                                            <ArrayField path={`content.pricingSection.plans.${i}.features`} items={item.features} updateField={updateField} defaultItem=""
                                                renderItem={(f, fi) => (
                                                    <input className={inputStyle} value={f || ''} onChange={e => {
                                                        const arr = [...(item.features || [])]; arr[fi] = e.target.value; updateField(`content.pricingSection.plans.${i}.features`, arr);
                                                    }} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 13. COMPARISON TABLE */}
                    <div id="section-comparison">
                        <SectionWrapper id="comparison" icon={BarChart3} title="13. Comparison Table" activeSections={formData.activeSections}>
                            <input className={inputStyle} placeholder="Table Title" value={formData.content.comparisonSection?.title || ''} onChange={e => updateField('content.comparisonSection.title', e.target.value)} />
                            <ArrayField path="content.comparisonSection.rows" items={formData.content.comparisonSection?.rows} updateField={updateField} defaultItem={{ category: "", softkingo: { text: "", iconKey: "FaCheckCircle" }, recruiting: { text: "", iconKey: "FaTimesCircle" }, outsourcing: { text: "", iconKey: "FaTimesCircle" } }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2 border-b pb-4 mb-2 border-slate-200">
                                        <input className={inputStyle} placeholder="Feature Category (e.g. Talent Quality)" value={item.category || ''} onChange={e => updateArrayObject('content.comparisonSection.rows', i, 'category', e.target.value)} />
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-cyan-600 uppercase">Softkingo</label>
                                                <input className={inputStyle} placeholder="Text" value={item.softkingo?.text || ''} onChange={e => {
                                                    const newRow = { ...item, softkingo: { ...item.softkingo, text: e.target.value } };
                                                    updateArrayObject('content.comparisonSection.rows', i, 'softkingo', newRow.softkingo);
                                                }} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase">Recruiting</label>
                                                <input className={inputStyle} placeholder="Text" value={item.recruiting?.text || ''} onChange={e => {
                                                    const newRow = { ...item, recruiting: { ...item.recruiting, text: e.target.value } };
                                                    updateArrayObject('content.comparisonSection.rows', i, 'recruiting', newRow.recruiting);
                                                }} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase">Outsourcing</label>
                                                <input className={inputStyle} placeholder="Text" value={item.outsourcing?.text || ''} onChange={e => {
                                                    const newRow = { ...item, outsourcing: { ...item.outsourcing, text: e.target.value } };
                                                    updateArrayObject('content.comparisonSection.rows', i, 'outsourcing', newRow.outsourcing);
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 14. BLOG SECTION */}
                    <div id="section-blogs">
                        <SectionWrapper id="blogs" icon={MessageSquare} title="14. Blog Section" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Blog Section Title</label>
                                    <input className={inputStyle} placeholder="Latest Blogs" value={formData.content.blogTitle || ''} onChange={e => updateField('content.blogTitle', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Blog Section Subtitle</label>
                                    <input className={inputStyle} placeholder="Subtitle text..." value={formData.content.blogSubtitle || ''} onChange={e => updateField('content.blogSubtitle', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={labelStyle}>Blog Category</label>
                                <BlogCategorySelector 
                                    value={formData.content.blogCategory || ''} 
                                    onChange={val => updateField('content.blogCategory', val)}
                                    className={inputStyle}
                                />
                                <p className="text-[10px] text-slate-400 italic">Select specific category or leave for latest blogs.</p>
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* 15. FAQ SECTION */}
                    <div id="section-faq">
                        <SectionWrapper id="faq" icon={HelpCircle} title="15. FAQ Section" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <input className={inputStyle} placeholder="FAQ Title" value={formData.content.faq?.title || ''} onChange={e => updateField('content.faq.title', e.target.value)} />
                                <input className={inputStyle} placeholder="FAQ Subtitle" value={formData.content.faq?.subtitle || ''} onChange={e => updateField('content.faq.subtitle', e.target.value)} />
                            </div>
                            <ArrayField path="content.faq.items" items={formData.content.faq?.items} updateField={updateField} defaultItem={{ question: "", answer: "" }}
                                renderItem={(item, i) => (
                                    <div className="space-y-2 border-b pb-4 mb-2 border-slate-200 last:border-0 text-left">
                                        <input className={inputStyle} placeholder="Question" value={item.question || ''} onChange={e => updateArrayObject('content.faq.items', i, 'question', e.target.value)} />
                                        <textarea className={inputStyle} rows={3} placeholder="Answer" value={item.answer || ''} onChange={e => updateArrayObject('content.faq.items', i, 'answer', e.target.value)} />
                                    </div>
                                )}
                            />
                        </SectionWrapper>
                    </div>

                    {/* 16. INQUIRY SECTION */}
                    <div id="section-inquiry">
                        <SectionWrapper id="inquiry" icon={Mail} title="16. Inquiry Section" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-3 gap-4">
                                <input className={inputStyle} placeholder="Tagline" value={formData.content.inquiry?.tagline || ''} onChange={e => updateField('content.inquiry.tagline', e.target.value)} />
                                <input className={inputStyle} placeholder="Title" value={formData.content.inquiry?.title || ''} onChange={e => updateField('content.inquiry.title', e.target.value)} />
                                <input className={inputStyle} placeholder="Subtitle" value={formData.content.inquiry?.subtitle || ''} onChange={e => updateField('content.inquiry.subtitle', e.target.value)} />
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* 17. CTA BANNER */}
                    <div id="section-ctaBanner">
                        <SectionWrapper id="ctaBanner" icon={MousePointerClick} title="17. Footer CTA Banner" activeSections={formData.activeSections}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input className={inputStyle} placeholder="Main Title" value={formData.content.ctaBanner?.title || ''} onChange={e => updateField('content.ctaBanner.title', e.target.value)} />
                                <input className={inputStyle} placeholder="Subtitle" value={formData.content.ctaBanner?.subtitle || ''} onChange={e => updateField('content.ctaBanner.subtitle', e.target.value)} />
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 mt-2">
                                <input className={inputStyle} placeholder="Button Text" value={formData.content.ctaBanner?.buttonText || ''} onChange={e => updateField('content.ctaBanner.buttonText', e.target.value)} />
                                <input className={inputStyle} placeholder="Button Link" value={formData.content.ctaBanner?.buttonHref || ''} onChange={e => updateField('content.ctaBanner.buttonHref', e.target.value)} />
                                <BoundMediaInput label="Banner Image" value={formData.content.ctaBanner?.image} path="content.ctaBanner.image" />
                            </div>
                        </SectionWrapper>
                    </div>

                </div>
            </div>
            {/* MEDIA MODAL */}
            {showImageBrowser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col scale-in-center transition-transform">
                        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Media Library</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Browse and select assets</p>
                            </div>
                            <button onClick={() => setShowImageBrowser(false)} className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-xl transition-all"><X size={18} /></button>
                        </div>

                        <div className="px-5 py-3 border-b border-slate-200 bg-white flex flex-wrap justify-between items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-slate-600 overflow-x-auto flex-1 font-bold uppercase tracking-tighter">
                                <button onClick={() => fetchMedia("uploads")} className="flex items-center gap-1 hover:text-cyan-600 transition-colors"><Home size={12} /> Root</button>
                                {mediaPath.split('/').filter(Boolean).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        <ChevronRight size={10} className="text-slate-400" />
                                        <button onClick={() => fetchMedia(arr.slice(0, i + 1).join('/'))} className="hover:text-cyan-600 transition-colors">{part}</button>
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input className="pl-9 pr-3 py-2 bg-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-cyan-500 w-40 transition-all" placeholder="Search files..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                                </div>
                                <label className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl cursor-pointer text-xs font-bold transition-all shadow-md active:scale-95">
                                    {uploading ? <Loader2 className="animate-spin" size={14} /> : <UploadCloud size={14} />}
                                    <span>Upload</span>
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                </label>
                                <button onClick={handleCreateFolder} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95">
                                    <FolderPlus size={14} /> <span>New Folder</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 min-h-[400px]">
                            {mediaLoading ? (
                                <div className="flex flex-col justify-center items-center h-full gap-3">
                                    <RefreshCw className="animate-spin text-cyan-600" size={40} />
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Assets...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                                    {folders.map((f, i) => (
                                        <button key={i} onClick={() => fetchMedia(f.path.replace(/^\//, ''))} className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-cyan-400 hover:shadow-xl transition-all group text-center aspect-square flex-center shadow-sm">
                                            <FolderOpen className="h-12 w-12 text-amber-400 fill-amber-50 group-hover:scale-110 transition-transform mb-2" />
                                            <span className="text-[10px] font-black text-slate-600 truncate w-full uppercase">{f.name}</span>
                                        </button>
                                    ))}
                                    {images.map((f, i) => (
                                        <button key={i} onClick={() => { updateField(currentImageField, f.path); setShowImageBrowser(false); }} className="relative group aspect-square bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-cyan-500 hover:shadow-2xl transition-all shadow-sm">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.path} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={f.name} />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                                                <p className="text-[10px] text-white font-bold truncate">{f.name}</p>
                                                <p className="text-[8px] text-white/60">{(f.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                            <div className="absolute top-3 right-3 bg-cyan-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <CheckCircle2 size={12} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}