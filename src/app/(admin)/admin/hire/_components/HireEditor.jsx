"use client";
import React, { useState, useEffect } from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import {
    ArrowLeft, Save, Eye, Image as ImageIcon, Plus, X,
    Smartphone, Layout, Database, Settings, Briefcase, Users, Zap, CheckCircle2, Layers, DollarSign, BarChart3, MousePointerClick, FolderOpen, Loader2, MessageSquare
} from 'lucide-react';

// --- STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-400";

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
        { id: 'hero', label: '1. Hero', icon: Smartphone },
        { id: 'about', label: '2. About', icon: Layout },
        { id: 'features', label: '3. Features', icon: Database },
        { id: 'steps', label: '4. Steps', icon: Settings },
        { id: 'services', label: '5. Services', icon: Briefcase },
        { id: 'portfolio', label: '6. Portfolio', icon: FolderOpen },
        { id: 'profile', label: '7. Profile', icon: Users },
        { id: 'models', label: '8. Models', icon: Zap },
        { id: 'why', label: '9. Why Hire', icon: CheckCircle2 },
        { id: 'business', label: '10. Biz Types', icon: Layers },
        { id: 'pricing', label: '11. Pricing', icon: DollarSign },
        { id: 'comparison', label: '12. Compare', icon: BarChart3 },
        { id: 'cta', label: '13. CTA', icon: MousePointerClick },
        { id: 'blogs', label: '14. Blog Section', icon: MessageSquare }
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
    const updateField = (path, value) => {
        setFormData(prev => {
            const keys = path.split('.');
            const copy = { ...prev };
            let current = copy;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
                current = current[key];
            }

            current[keys[keys.length - 1]] = value;
            return copy;
        });
    };

    // --- Helper: Update Nested Arrays ---
    const updateArrayObject = (path, index, field, value) => {
        const parts = path.split('.');
        const parentKey = parts[1];
        const currentArr = [...(formData.content?.[parentKey] || [])];
        if (!currentArr[index]) currentArr[index] = {};
        currentArr[index] = { ...currentArr[index], [field]: value };
        updateField(path, currentArr);
    };

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
                    <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={formData.activeSections}>
                        <input className={inputStyle} placeholder="Hero Title" value={formData.content.heroTitle || ''} onChange={e => updateField('content.heroTitle', e.target.value)} />
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Hero Subtitle (Rich Text)</label>
                            <MiniRichTextEditor value={formData.content.heroSubtitle || ''} onChange={val => updateField('content.heroSubtitle', val)} />
                        </div>
                        <input className={inputStyle} placeholder="Badge Text" value={formData.content.badgeText || ''} onChange={e => updateField('content.badgeText', e.target.value)} />

                        <div className="grid grid-cols-3 gap-2">
                            <input className={inputStyle} placeholder="Avg Time" value={formData.content.metrics?.avgTime || ''} onChange={e => updateField('content.metrics.avgTime', e.target.value)} />
                            <input className={inputStyle} placeholder="Network" value={formData.content.metrics?.network || ''} onChange={e => updateField('content.metrics.network', e.target.value)} />
                            <input className={inputStyle} placeholder="Rating" value={formData.content.metrics?.rating || ''} onChange={e => updateField('content.metrics.rating', e.target.value)} />
                        </div>
                        <input className={inputStyle} placeholder="Hero Bg Image URL" value={formData.content.heroBg || ''} onChange={e => updateField('content.heroBg', e.target.value)} />
                    </SectionWrapper>

                    {/* 2. ABOUT */}
                    <SectionWrapper id="about" icon={Layout} title="2. About Section" activeSections={formData.activeSections}>
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

                    {/* 3. FEATURES */}
                    <SectionWrapper id="features" icon={Database} title="3. Features" activeSections={formData.activeSections}>
                        <ArrayField path="content.features" items={formData.content.features} updateField={updateField} defaultItem={{ title: "", description: "", iconKey: "FaUser" }}
                            renderItem={(item, i) => (
                                <div className="space-y-2">
                                    <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.features', i, 'title', e.target.value)} />
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Description (Rich Text)</label>
                                        <MiniRichTextEditor value={item.description || ''} onChange={val => updateArrayObject('content.features', i, 'description', val)} />
                                    </div>
                                    <input className={inputStyle} placeholder="Icon Key (e.g. FaUser)" value={item.iconKey || ''} onChange={e => updateArrayObject('content.features', i, 'iconKey', e.target.value)} />
                                </div>
                            )}
                        />
                    </SectionWrapper>

                    {/* 4. STEPS */}
                    <SectionWrapper id="steps" icon={Settings} title="4. Hiring Steps" activeSections={formData.activeSections}>
                        <ArrayField path="content.steps" items={formData.content.steps} updateField={updateField} defaultItem={{ number: 1, title: "", description: "", icon: "" }}
                            renderItem={(item, i) => (
                                <div className="flex gap-2">
                                    <div className="w-8 pt-2 text-center font-bold text-slate-300">{i + 1}</div>
                                    <div className="flex-1 space-y-2">
                                        <input className={inputStyle} placeholder="Title" value={item.title || ''} onChange={e => updateArrayObject('content.steps', i, 'title', e.target.value)} />
                                        <textarea className={inputStyle} rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateArrayObject('content.steps', i, 'description', e.target.value)} />
                                        <input className={inputStyle} placeholder="Icon URL" value={item.icon || ''} onChange={e => updateArrayObject('content.steps', i, 'icon', e.target.value)} />
                                    </div>
                                </div>
                            )}
                        />
                    </SectionWrapper>

                    {/* 5. SERVICES */}
                    <SectionWrapper id="services" icon={Briefcase} title="5. Services" activeSections={formData.activeSections}>
                        <div className="mb-6">
                            <label className="text-xs font-bold text-slate-400 mb-2 block">SERVICE CARDS</label>
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
                        </div>
                    </SectionWrapper>

                    {/* 6. PROFILE */}
                    <SectionWrapper id="profile" icon={Users} title="6. Detailed Profile" activeSections={formData.activeSections}>
                        <input className={inputStyle} placeholder="Title" value={formData.content.profileSection?.title || ''} onChange={e => updateField('content.profileSection.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Subtitle" value={formData.content.profileSection?.subtitle || ''} onChange={e => updateField('content.profileSection.subtitle', e.target.value)} />

                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <input className={inputStyle} placeholder="Left Img" value={formData.content.profileSection?.images?.leftTop || ''} onChange={e => updateField('content.profileSection.images.leftTop', e.target.value)} />
                            <input className={inputStyle} placeholder="Right Top" value={formData.content.profileSection?.images?.rightTop || ''} onChange={e => updateField('content.profileSection.images.rightTop', e.target.value)} />
                            <input className={inputStyle} placeholder="Right Btm" value={formData.content.profileSection?.images?.rightBottom || ''} onChange={e => updateField('content.profileSection.images.rightBottom', e.target.value)} />
                        </div>
                    </SectionWrapper>

                    {/* PORTFOLIO SECTION */}
                    <SectionWrapper id="portfolio" icon={FolderOpen} title="6. Portfolio" activeSections={formData.activeSections}>
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

                    {/* 10. PRICING */}
                    <SectionWrapper id="pricing" icon={DollarSign} title="10. Pricing Plans" activeSections={formData.activeSections}>
                        <input className={inputStyle} placeholder="Title" value={formData.content.pricingSection?.title || ''} onChange={e => updateField('content.pricingSection.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Subtitle" value={formData.content.pricingSection?.subtitle || ''} onChange={e => updateField('content.pricingSection.subtitle', e.target.value)} />

                        <ArrayField path="content.pricingSection.plans" items={formData.content.pricingSection?.plans} updateField={updateField} defaultItem={{ title: "", price: "", features: [] }}
                            renderItem={(item, i) => (
                                <div className="grid grid-cols-2 gap-2">
                                    <input className={inputStyle} placeholder="Plan Name" value={item.title || ''} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'title', e.target.value)} />
                                    <input className={inputStyle} placeholder="Price" value={item.price || ''} onChange={e => updateArrayObject('content.pricingSection.plans', i, 'price', e.target.value)} />
                                    {/* Features handling simplified for brevity */}
                                </div>
                            )}
                        />
                    </SectionWrapper>

                    {/* 14. BLOG SECTION */}
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
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Blog Category (Slug)</label>
                            <input className={inputStyle} placeholder="e.g. app-development (leave empty for latest)" value={formData.content.blogCategory || ''} onChange={e => updateField('content.blogCategory', e.target.value)} />
                            <p className="text-[10px] text-slate-400 italic">Tip: Use the category slug from the Blog categories section.</p>
                        </div>
                    </SectionWrapper>

                </div>
            </div>
        </div>
    );
}