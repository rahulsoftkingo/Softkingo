import React from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';
import { COMMON_TECH } from './TechConstants';
import {
    Smartphone, Layout, Database, Code, Settings, Zap, Cpu, Bot,
    BarChart3, ShieldCheck, DollarSign, Plus, X, Trash2,
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare,
    Users, Layers, Target, CheckCircle2, Globe, TrendingUp, Grid, Search
} from "lucide-react";

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

// --- 2. SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-orange-500 mb-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

const IndustriesSelector = ({ selections, onChange }) => {
    const [industries, setIndustries] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/admin/industries')
            .then(res => res.json())
            .then(data => setIndustries(data || []))
            .catch(err => console.error("Error loading industries:", err));
    }, []);

    const toggleSlug = (slug) => {
        const index = selections.findIndex(s => s.slug === slug);
        if (index > -1) {
            onChange(selections.filter(s => s.slug !== slug));
        } else {
            onChange([...selections, { slug, image: "" }]);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-[300px] overflow-y-auto">
            {industries.map((ind) => {
                const isSelected = selections.some(s => s.slug === ind.slug);
                return (
                    <label key={ind.slug} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all shadow-sm ${isSelected ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-200' : 'bg-white border-slate-100 hover:border-orange-100'}`}>
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-orange-500 rounded"
                            checked={isSelected}
                            onChange={() => toggleSlug(ind.slug)}
                        />
                        <span className="text-[10px] font-black text-slate-800 uppercase truncate">{ind.title}</span>
                    </label>
                );
            })}
            {industries.length === 0 && <p className="col-span-full text-center text-slate-400 text-xs py-4 italic">No industry pages found...</p>}
        </div>
    );
};

// --- 3. MAIN CLONE EDITOR ---
export default function CloneEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="Page Title (e.g. Build Your Own Uber Clone)" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Subtitle / Description (Rich Text)</label>
                        <MiniRichTextEditor value={content.hero?.subtitle || ''} onChange={val => updateField('content.hero.subtitle', val)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Button Label (e.g. Request A Quote)" value={content.hero?.buttonLabel || ''} onChange={e => updateField('content.hero.buttonLabel', e.target.value)} />
                        <input className={inputStyle} placeholder="Button Href (e.g. /contact)" value={content.hero?.buttonHref || ''} onChange={e => updateField('content.hero.buttonHref', e.target.value)} />
                    </div>
                    <MediaInput label="Hero Banner Image" value={content.hero?.image} path="content.hero.image" />

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Hero Slider Images (Mobile Mockups)</label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {(content.hero?.sliderImages || []).map((img, i) => (
                                <div key={i} className="relative bg-slate-50 p-2 rounded-lg border border-slate-200 group">
                                    <MediaInput label={`Slide ${i + 1}`} value={img} path={`content.hero.sliderImages.${i}`} />
                                    <button type="button" onClick={() => updateField('content.hero.sliderImages', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.hero.sliderImages', (prev) => [...(prev || []), ""])} className="mt-2 text-[10px] font-bold text-orange-600 uppercase">+ Add Slider Image</button>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Trusted By (Brand Logos)</label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {(content.hero?.brands || []).map((brand, i) => (
                                <div key={i} className="relative bg-slate-50 p-2 rounded-lg border border-slate-200 group">
                                    <MediaInput label={`Brand ${i + 1}`} value={brand} path={`content.hero.brands.${i}`} />
                                    <button type="button" onClick={() => updateField('content.hero.brands', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.hero.brands', (prev) => [...(prev || []), ""])} className="mt-2 text-[10px] font-bold text-orange-600 uppercase">+ Add Brand Logo</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 2. ABOUT & REASONS SECTION */}
            <SectionWrapper id="about" icon={Layout} title="2. About Product" activeSections={activeSections}>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className={labelStyle}>Main Content</label>
                        <input className={inputStyle} placeholder="Main Heading (e.g. Why Softkingo is the Best...)" value={content.about?.title || ''} onChange={e => updateField('content.about.title', e.target.value)} />
                        <textarea className={inputStyle} rows={3} placeholder="Intro Description" value={content.about?.description || ''} onChange={e => updateField('content.about.description', e.target.value)} />
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Stats Grid (4 Items)</label>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                    <input className="w-full p-2 bg-white border border-slate-200 rounded text-sm font-bold" placeholder="Number (e.g. 5+)" value={content.about?.stats?.[i]?.number || ''} onChange={e => updateField(`content.about.stats.${i}.number`, e.target.value)} />
                                    <input className="w-full p-2 bg-white border border-slate-200 rounded text-xs" placeholder="Label (e.g. Years of Experience)" value={content.about?.stats?.[i]?.label || ''} onChange={e => updateField(`content.about.stats.${i}.label`, e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Reasons To Choose Us (Right Panel)</label>
                        <div className="space-y-4">
                            {(content.about?.reasons || []).map((reason, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    <button type="button" onClick={() => updateField('content.about.reasons', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                                    <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold mb-2" placeholder="Reason Title" value={reason.title || ''} onChange={e => updateField(`content.about.reasons.${i}.title`, e.target.value)} />
                                    <textarea className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs" rows={2} placeholder="Reason Description" value={reason.description || ''} onChange={e => updateField(`content.about.reasons.${i}.description`, e.target.value)} />
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
                            <input className={inputStyle} placeholder="Main CTA Button Label" value={content.about?.buttonLabel || ''} onChange={e => updateField('content.about.buttonLabel', e.target.value)} />
                            <input className={inputStyle} placeholder="Main CTA Button Href" value={content.about?.buttonHref || ''} onChange={e => updateField('content.about.buttonHref', e.target.value)} />
                        </div>
                        <button type="button" onClick={() => updateField('content.about.reasons', (prev) => [...(prev || []), { title: "", description: "" }])} className="mt-2 text-[10px] font-bold text-orange-600 uppercase">+ Add Reason</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 3. FEATURES LIST */}
            <SectionWrapper id="verticalSuite" icon={Layers} title="3. Features List" activeSections={activeSections}>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Main Section Title" value={content.verticalSuite?.title || ''} onChange={e => updateField('content.verticalSuite.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Main Section Subtitle" value={content.verticalSuite?.subtitle || ''} onChange={e => updateField('content.verticalSuite.subtitle', e.target.value)} />
                    </div>

                    <div className="space-y-6">
                        <label className={labelStyle}>Feature Tabs (Add/Remove as needed)</label>
                        {(content.verticalSuite?.tabs || []).map((tab, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 relative group">
                                <button type="button" onClick={() => updateField('content.verticalSuite.tabs', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 z-20"><Trash2 size={18} /></button>

                                <div className="space-y-1 border-b border-slate-200 pb-3">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tab Navigation Name</label>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-orange-100 text-orange-600 rounded-md"><Layers size={14} /></div>
                                        <input
                                            className="flex-1 bg-white border border-slate-200 p-2 rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                            placeholder="e.g. User Panel, Admin Dashboard, etc."
                                            value={tab.label || ''}
                                            onChange={e => updateField(`content.verticalSuite.tabs.${i}.label`, e.target.value)}
                                        />
                                    </div>
                                </div>

                                <input className={inputStyle} placeholder="Tab Description (Small intro)" value={tab.description || ''} onChange={e => updateField(`content.verticalSuite.tabs.${i}.description`, e.target.value)} />
                                <MediaInput label="Tab Showcase Image" value={tab.image} path={`content.verticalSuite.tabs.${i}.image`} />

                                <div className="space-y-3 pt-2">
                                    <label className={labelStyle}>Features (Title & Description)</label>
                                    {(tab.items || []).map((item, j) => (
                                        <div key={j} className="bg-white p-4 rounded-xl border border-slate-200 relative group/feature">
                                            <button type="button" onClick={() => updateField(`content.verticalSuite.tabs.${i}.items`, (prev) => (prev || []).filter((_, idx) => idx !== j))} className="absolute top-2 right-2 text-slate-200 hover:text-rose-500 opacity-0 group-hover/feature:opacity-100 transition-opacity"><X size={16} /></button>
                                            <div className="grid gap-2">
                                                <input className="w-full p-2 bg-slate-50 border border-slate-100 rounded text-xs font-bold" placeholder="Feature Title" value={item.title || ''} onChange={e => updateField(`content.verticalSuite.tabs.${i}.items.${j}.title`, e.target.value)} />
                                                <textarea className="w-full p-2 bg-slate-50 border border-slate-100 rounded text-xs" rows={2} placeholder="Feature Description" value={item.description || ''} onChange={e => updateField(`content.verticalSuite.tabs.${i}.items.${j}.description`, e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.verticalSuite.tabs.${i}.items`, (prev) => [...(prev || []), { title: "", description: "" }])} className="text-[10px] font-bold text-orange-600 uppercase transition-colors hover:text-orange-700">+ Add Detailed Feature</button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => updateField('content.verticalSuite.tabs', (prev) => [...(prev || []), { label: "", description: "", image: "", items: [] }])}
                            className="w-full py-4 border-2 border-dashed border-orange-200 rounded-2xl text-orange-600 font-bold hover:bg-orange-50 hover:border-orange-400 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Add New Feature Tab
                        </button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 4. ADVANCED FEATURES */}
            <SectionWrapper id="aiFeatures" icon={Zap} title="4. Advanced Features" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Heading" value={content.aiFeatures?.title || ''} onChange={e => updateField('content.aiFeatures.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Subtitle" value={content.aiFeatures?.subtitle || ''} onChange={e => updateField('content.aiFeatures.subtitle', e.target.value)} />
                </div>
                <div className="space-y-4 pt-2">
                    <label className={labelStyle}>Features (Title & Description show in grid)</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {(content.aiFeatures?.items || []).map((item, i) => (
                            <div key={i} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200 relative group hover:border-orange-200 transition-colors">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-orange-600 shadow-sm"><Bot size={16} /></div>
                                <div className="flex-1 space-y-2">
                                    <input className="w-full p-2 bg-white border border-slate-200 rounded text-sm font-bold" placeholder="AI Title" value={item.title || ''} onChange={e => updateField(`content.aiFeatures.items.${i}.title`, e.target.value)} />
                                    <textarea className="w-full p-2 bg-white border border-slate-200 rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.aiFeatures.items.${i}.description`, e.target.value)} />
                                </div>
                                <button type="button" onClick={() => updateField('content.aiFeatures.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><X size={18} /></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.aiFeatures.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 py-2 px-4 rounded-lg border border-dashed border-orange-200 w-full text-center">+ Add AI Feature</button>
                </div>
            </SectionWrapper>

            {/* 5. AI FEATURE SOLUTIONS */}
            <SectionWrapper id="aiSolutions" icon={Cpu} title="5. Ai Feature Solutions" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Heading" value={content.aiSolutions?.title || ''} onChange={e => updateField('content.aiSolutions.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Subtitle" value={content.aiSolutions?.subtitle || ''} onChange={e => updateField('content.aiSolutions.subtitle', e.target.value)} />
                </div>
                <div className="space-y-4 pt-2">
                    <label className={labelStyle}>AI Solution Tabs</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {(content.aiSolutions?.items || []).map((item, i) => (
                            <div key={i} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                <div className="flex-1 space-y-3">
                                    <input className={inputStyle} placeholder="Tab Title" value={item.title || ''} onChange={e => updateField(`content.aiSolutions.items.${i}.title`, e.target.value)} />
                                    <textarea className={inputStyle} placeholder="Tab Description" rows={3} value={item.description || ''} onChange={e => updateField(`content.aiSolutions.items.${i}.description`, e.target.value)} />
                                </div>
                                <button type="button" onClick={() => updateField('content.aiSolutions.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.aiSolutions.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-orange-500 hover:text-orange-500 transition-all flex items-center justify-center gap-2 font-bold"><Plus size={18} /> Add New Tab</button>
                </div>
            </SectionWrapper>

            {/* 6. WHY TO INVEST SECTION */}
            <SectionWrapper id="investment" icon={TrendingUp} title="6. Why to Invest" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="Section Subtitle / Description" value={content.investment?.subtitle || ''} onChange={e => updateField('content.investment.subtitle', e.target.value)} />

                    <div className="space-y-4 pt-2">
                        <label className={labelStyle}>Features Cards (Max 3)</label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {(content.investment?.items || []).map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    <button type="button" onClick={() => updateField('content.investment.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500"><X size={16} /></button>
                                    <div className="space-y-2">
                                        <input className="w-full p-2 bg-white border border-slate-200 rounded text-sm font-bold text-[#2FB3E0]" placeholder="Number (e.g. 500M+)" value={item.number || ''} onChange={e => updateField(`content.investment.items.${i}.number`, e.target.value)} />
                                        <input className="w-full p-2 bg-white border border-slate-200 rounded text-xs font-bold" placeholder="Label" value={item.label || ''} onChange={e => updateField(`content.investment.items.${i}.label`, e.target.value)} />
                                        <textarea className="w-full p-2 bg-white border border-slate-200 rounded text-[10px]" rows={2} placeholder="Description" value={item.sublabel || ''} onChange={e => updateField(`content.investment.items.${i}.sublabel`, e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.investment.items', (prev) => [...(prev || []), { number: "", label: "", sublabel: "" }])} className="text-[10px] font-black text-orange-600 uppercase">+ Add Investment Item</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 7. REVENUE MODEL */}
            <SectionWrapper id="revenue" icon={DollarSign} title="7. Revenue Model" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-1 gap-4">
                        <input className={inputStyle} placeholder="Section Heading" value={content.revenue?.title || ''} onChange={e => updateField('content.revenue.title', e.target.value)} />
                    </div>
                    <textarea className={inputStyle} rows={3} placeholder="Right-side Description Text (Subtitle)" value={content.revenue?.rightDesc || ''} onChange={e => updateField('content.revenue.rightDesc', e.target.value)} />

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Revenue Mode Tabs</label>
                        <div className="space-y-6">
                            {(content.revenue?.tabs || []).map((tab, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group space-y-4">
                                    <button type="button" onClick={() => updateField('content.revenue.tabs', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input className={inputStyle} placeholder="Tab Label (Navigation)" value={tab.label || ''} onChange={e => updateField(`content.revenue.tabs.${i}.label`, e.target.value)} />
                                        <input className={inputStyle} placeholder="Content Title (Large italic)" value={tab.title || ''} onChange={e => updateField(`content.revenue.tabs.${i}.title`, e.target.value)} />
                                    </div>

                                    <textarea className={inputStyle} rows={2} placeholder="Tab Description" value={tab.description || ''} onChange={e => updateField(`content.revenue.tabs.${i}.description`, e.target.value)} />

                                    <div className="space-y-2">
                                        <label className={labelStyle}>Bulleted Points (Comma separated)</label>
                                        <input className={inputStyle} placeholder="Point 1, Point 2, Point 3" value={tab.bullets?.join(', ') || ''} onChange={e => updateField(`content.revenue.tabs.${i}.bullets`, e.target.value.split(',').map(s => s.trim()))} />
                                    </div>

                                    <MediaInput label="Tab Image" value={tab.image} path={`content.revenue.tabs.${i}.image`} />
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.revenue.tabs', (prev) => [...(prev || []), { label: "", title: "", description: "", bullets: [], image: "" }])} className="mt-4 w-full py-3 border-2 border-dashed border-orange-200 rounded-xl text-orange-600 font-bold">+ Add Revenue Tab</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 8. TECH STACK SECTION */}
            <SectionWrapper id="techStack" icon={Code} title="8. Tech Stack" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="Tech Stack Overview Title" value={content.techStack?.title || ''} onChange={e => updateField('content.techStack.title', e.target.value)} />
                    <textarea className={inputStyle} rows={2} placeholder="Subtitle text" value={content.techStack?.subtitle || ''} onChange={e => updateField('content.techStack.subtitle', e.target.value)} />
                    
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Description (Rich Text)</label>
                        <MiniRichTextEditor value={content.techStack?.description || ''} onChange={val => updateField('content.techStack.description', val)} />
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Categories (Tabs)</label>
                        <div className="space-y-6">
                            {(content.techStack?.tabs || []).map((tab, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group space-y-4">
                                    <button type="button" onClick={() => updateField('content.techStack.tabs', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500"><X size={18} /></button>
                                    <input className={inputStyle} placeholder="Category Label (e.g. Frontend)" value={tab.label || ''} onChange={e => updateField(`content.techStack.tabs.${i}.label`, e.target.value)} />

                                    <div className="space-y-3">
                                        <label className={labelStyle}>Technologies in this Category</label>
                                        <div className="space-y-4 pt-2">
                                            <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-dashed border-slate-200">
                                                <label className="w-full text-[10px] font-black text-slate-400 uppercase mb-1">Quick Add Common Tech:</label>
                                                {COMMON_TECH.map((tech) => (
                                                    <button
                                                        key={tech.name}
                                                        type="button"
                                                        onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => [...(prev || []), { ...tech }])}
                                                        className="p-1 px-2 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 rounded-md border border-slate-100 text-[10px] font-bold transition-all flex items-center gap-1.5 active:scale-95"
                                                    >
                                                        <img src={tech.image} className="w-3.5 h-3.5" alt="" />
                                                        {tech.name}
                                                    </button>
                                                ))}
                                            </div>
                                            <label className={labelStyle}>Selected Tech Stack</label>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {(tab.items || []).map((item, j) => (
                                                    <div key={j} className="bg-white p-3 rounded-xl border border-slate-200 relative group/tech">
                                                        <button type="button" onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => (prev || []).filter((_, idx) => idx !== j))} className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover/tech:opacity-100 transition-opacity z-10"><X size={12} /></button>
                                                        <div className="flex gap-2 items-center">
                                                            <div className="flex-1">
                                                                <input className="w-full p-1.5 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold" placeholder="Tech Name" value={item.name || ''} onChange={e => updateField(`content.techStack.tabs.${i}.items.${j}.name`, e.target.value)} />
                                                            </div>
                                                            <div className="w-16">
                                                                <MediaInput label="Icon" value={item.image} path={`content.techStack.tabs.${i}.items.${j}.image`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button type="button" onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => [...(prev || []), { name: "", image: "" }])} className="text-[10px] font-bold text-orange-600 uppercase transition-colors hover:text-orange-700">+ Add Custom Tech</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.techStack.tabs', (prev) => [...(prev || []), { label: "", items: [] }])} className="mt-4 w-full py-3 border-2 border-dashed border-orange-200 rounded-xl text-orange-600 font-bold uppercase tracking-tight">+ Add Tech Category</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 9. PORTFOLIO SECTION */}
            <SectionWrapper id="portfolio" icon={Layout} title="9. Portfolio" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Portfolio Title" value={content.portfolio?.title || ''} onChange={e => updateField('content.portfolio.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Portfolio Subtitle" value={content.portfolio?.subtitle || ''} onChange={e => updateField('content.portfolio.subtitle', e.target.value)} />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <label className={labelStyle}>Categorical Filter</label>
                        <select className={inputStyle} value={content.portfolio?.category || ''} onChange={e => updateField('content.portfolio.category', e.target.value)}>
                            <option value="">Select Category...</option>
                            <option value="dating">Dating Apps</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="delivery">Delivery Apps</option>
                            <option value="taxi">Taxi / Ride Sharing</option>
                            <option value="education">E-Learning</option>
                            <option value="fitness">Health & Fitness</option>
                        </select>
                        <p className="text-[10px] text-slate-400">Selecting a category will pull relevant portfolio entries for this clone page.</p>
                    </div>
                </div>
            </SectionWrapper>

            {/* 10. PROCESS SECTION */}
            <SectionWrapper id="process" icon={Settings} title="10. Process" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Roadmap Title" value={content.process?.title || ''} onChange={e => updateField('content.process.title', e.target.value)} />
                <textarea className={inputStyle} rows={2} placeholder="Roadmap Subtitle" value={content.process?.subtitle || ''} onChange={e => updateField('content.process.subtitle', e.target.value)} />
                <div className="space-y-6 pt-6 ml-4 border-l-2 border-slate-100 pl-8 relative">
                    {(content.process?.items || []).map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -left-[45px] top-0 z-10 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-orange-100 border-4 border-white group-hover:scale-110 transition-transform">{i + 1}</div>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 relative group-hover:border-orange-200 transition-colors shadow-sm">
                                <button type="button" onClick={() => updateField('content.process.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 z-20"><X size={18} /></button>
                                <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                                    <div className="space-y-2">
                                        <MediaInput label="Icon / Image" value={item.icon || ''} path={`content.process.items.${i}.icon`} />
                                        <input className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold" placeholder="Phase Name" value={item.title || ''} onChange={e => updateField(`content.process.items.${i}.title`, e.target.value)} />
                                    </div>
                                    <textarea className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none" rows={4} placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.process.items.${i}.description`, e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.process.items', (prev) => [...(prev || []), { title: "", description: "", icon: "" }])} className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-white py-2 px-4 rounded-lg border border-dashed border-orange-200 transition-all hover:bg-orange-50">+ Add Process Step</button>
                </div>
            </SectionWrapper>

            {/* 11. INDUSTRIES SECTION */}
            <SectionWrapper id="industries" icon={Grid} title="11. Industries" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Section Title" value={content.industries?.title || ''} onChange={e => updateField('content.industries.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Section Subtitle" value={content.industries?.subtitle || ''} onChange={e => updateField('content.industries.subtitle', e.target.value)} />
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Select Industries & Upload Multi-Device Image</label>
                        <IndustriesSelector
                            selections={content.industries?.items || []}
                            onChange={(items) => updateField('content.industries.items', items)}
                        />

                        {/* Image Uploads for Selected Industries */}
                        {content.industries?.items?.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <label className={labelStyle}>Industry Visuals (Combined Image)</label>
                                <div className="grid gap-4">
                                    {content.industries.items.map((item, i) => (
                                        <div key={item.slug} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:items-start gap-5 group hover:border-orange-300 transition-all shadow-sm">
                                            <div className="flex-1 w-full space-y-4">
                                                <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                                                    <span className="w-5 h-5 bg-orange-600 text-white flex items-center justify-center rounded-full text-[8px]">{i + 1}</span>
                                                    {item.slug.replace(/-/g, ' ')}
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                                    <div className="flex-1 w-full">
                                                        <MediaInput
                                                            label="Left Image (Laptop + Mobile)"
                                                            value={item.image}
                                                            path={`content.industries.items.${i}.image`}
                                                        />
                                                        <div className="mt-4 space-y-1">
                                                            <label className={labelStyle}>Button Link (Slug)</label>
                                                            <input 
                                                                className={inputStyle} 
                                                                placeholder="e.g. ecommerce" 
                                                                value={item.buttonLink || ''} 
                                                                onChange={e => updateField(`content.industries.items.${i}.buttonLink`, e.target.value)} 
                                                            />
                                                        </div>
                                                    </div>
                                                    {item.image && (
                                                        <div className="w-32 h-20 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden flex-shrink-0 mt-6 md:mt-0">
                                                            <img src={item.image} className="w-full h-full object-contain" alt="preview" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-3 pt-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Right Side Content (Overrides Default)</label>
                                                    <div className="grid md:grid-cols-2 gap-3">
                                                        <input className={inputStyle} placeholder="Custom Title" value={item.title || ''} onChange={e => updateField(`content.industries.items.${i}.title`, e.target.value)} />
                                                        <input className={inputStyle} placeholder="Button Label" value={item.buttonLabel || ''} onChange={e => updateField(`content.industries.items.${i}.buttonLabel`, e.target.value)} />
                                                    </div>
                                                    <textarea className={inputStyle} rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.industries.items.${i}.description`, e.target.value)} />
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] text-slate-400">Feature Points (Comma separated)</label>
                                                        <input className={inputStyle} placeholder="Point 1, Point 2, Point 3" value={item.points?.join(', ') || ''} onChange={e => updateField(`content.industries.items.${i}.points`, e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SectionWrapper>

            {/* 12. POPULAR APP SOLUTIONS GRID */}
            <SectionWrapper id="popularSolutions" icon={Layout} title="12. Popular App Solutions" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Section Title (e.g. Popular App Solutions)" value={content.popularSolutions?.title || ''} onChange={e => updateField('content.popularSolutions.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Section Subtitle" value={content.popularSolutions?.subtitle || ''} onChange={e => updateField('content.popularSolutions.subtitle', e.target.value)} />
                    </div>
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                        <label className={labelStyle}>Solution Cards Grid</label>
                        <div className="grid md:grid-cols-2 gap-4">
                            {(content.popularSolutions?.items || []).map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    <button type="button" onClick={() => updateField('content.popularSolutions.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                    <div className="space-y-4">
                                        <input className={inputStyle} placeholder="Solution Name (e.g. Taxi Apps)" value={item.title || ''} onChange={e => updateField(`content.popularSolutions.items.${i}.title`, e.target.value)} />
                                        <MediaInput label="Phone Mockup Image" value={item.image} path={`content.popularSolutions.items.${i}.image`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.popularSolutions.items', (prev) => [...(prev || []), { title: "", image: "" }])} className="w-full py-3 border-2 border-dashed border-orange-200 rounded-xl text-orange-600 font-bold uppercase tracking-tight">+ Add Solution Card</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 13. COMPARISON TABLE */}
            <SectionWrapper id="comparison" icon={BarChart3} title="13. Comparison Table" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Comparison Title" value={content.comparison?.title || ''} onChange={e => updateField('content.comparison.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Comparison Subtitle" value={content.comparison?.subtitle || ''} onChange={e => updateField('content.comparison.subtitle', e.target.value)} />
                    </div>
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                        <label className={labelStyle}>Comparison Rows</label>
                        <div className="space-y-3">
                            {(content.comparison?.rows || []).map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    <button type="button" onClick={() => updateField('content.comparison.rows', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                    <div className="grid md:grid-cols-5 gap-3">
                                        <input className={inputStyle} placeholder="Feature" value={item.feature || ''} onChange={e => updateField(`content.comparison.rows.${i}.feature`, e.target.value)} />
                                        <input className={inputStyle} placeholder="Icon (e.g. Brain)" value={item.iconKey || ''} onChange={e => updateField(`content.comparison.rows.${i}.iconKey`, e.target.value)} />
                                        <input className={inputStyle} placeholder="Softkingo (true/100%)" value={item.sk || ''} onChange={e => updateField(`content.comparison.rows.${i}.sk`, e.target.value)} />
                                        <input className={inputStyle} placeholder="Comp 1 (true/false)" value={item.comp1 || ''} onChange={e => updateField(`content.comparison.rows.${i}.comp1`, e.target.value)} />
                                        <input className={inputStyle} placeholder="Comp 2 (true/false)" value={item.comp2 || ''} onChange={e => updateField(`content.comparison.rows.${i}.comp2`, e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.comparison.rows', (prev) => [...(prev || []), { feature: "", iconKey: "CheckCircle2", sk: "true", comp1: "false", comp2: "false" }])} className="w-full py-2 border-2 border-dashed border-orange-200 rounded-lg text-orange-600 font-bold text-xs uppercase">+ Add Comparison Row</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 14. CONSULTATION CTA */}
            <SectionWrapper id="consultation" icon={TrendingUp} title="14. Consultation CTA" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="CTA Title" value={content.consultation?.title || ''} onChange={e => updateField('content.consultation.title', e.target.value)} />
                        <input className={inputStyle} placeholder="CTA Subtitle" value={content.consultation?.subtitle || ''} onChange={e => updateField('content.consultation.subtitle', e.target.value)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Button Label" value={content.consultation?.buttonLabel || ''} onChange={e => updateField('content.consultation.buttonLabel', e.target.value)} />
                        <MediaInput label="Consultant Image" value={content.consultation?.imageSrc} path="content.consultation.imageSrc" />
                    </div>
                </div>
            </SectionWrapper>


            {/* 15. BLOG SECTION */}
            <SectionWrapper id="blogs" icon={MessageSquare} title="15. Blog Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={labelStyle}>Blog Section Title</label>
                        <input className={inputStyle} placeholder="Latest Blogs" value={content.blogTitle || ''} onChange={e => updateField('content.blogTitle', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelStyle}>Blog Section Subtitle</label>
                        <input className={inputStyle} placeholder="Subtitle text..." value={content.blogSubtitle || ''} onChange={e => updateField('content.blogSubtitle', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className={labelStyle}>Blog Category</label>
                    <BlogCategorySelector
                        value={content.blogCategory || ''}
                        onChange={val => updateField('content.blogCategory', val)}
                        className={inputStyle}
                    />
                    <p className="text-[10px] text-slate-400 italic">Select specific category or leave for latest blogs.</p>
                </div>
            </SectionWrapper>

            {/* 16. FAQ SECTION */}
            <SectionWrapper id="faq" icon={HelpCircle} title="16. FAQ" activeSections={activeSections}>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="FAQ Title" value={content.faq?.title || ''} onChange={e => updateField('content.faq.title', e.target.value)} />
                        <input className={inputStyle} placeholder="FAQ Subtitle" value={content.faq?.subtitle || ''} onChange={e => updateField('content.faq.subtitle', e.target.value)} />
                    </div>
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                        <label className={labelStyle}>FAQ Bottom CTA</label>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input className={inputStyle} placeholder="CTA Title (e.g. Still Have Questions?)" value={content.faq?.ctaTitle || ''} onChange={e => updateField('content.faq.ctaTitle', e.target.value)} />
                            <input className={inputStyle} placeholder="CTA Subtitle" value={content.faq?.ctaSubtitle || ''} onChange={e => updateField('content.faq.ctaSubtitle', e.target.value)} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input className={inputStyle} placeholder="Button 1 Label" value={content.faq?.ctaBtn1 || ''} onChange={e => updateField('content.faq.ctaBtn1', e.target.value)} />
                            <input className={inputStyle} placeholder="Button 2 Label" value={content.faq?.ctaBtn2 || ''} onChange={e => updateField('content.faq.ctaBtn2', e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className={labelStyle}>Individual Questions</label>
                        <div className="space-y-3">
                            {(content.faq?.items || []).map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group hover:border-orange-200 transition-colors">
                                    <button type="button" onClick={() => updateField('content.faq.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><X size={18} /></button>
                                    <div className="space-y-3">
                                        <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold pr-12 outline-none" placeholder="Question Text" value={item.q || ''} onChange={e => updateField(`content.faq.items.${i}.q`, e.target.value)} />
                                        <div className="space-y-1">
                                            <label className={labelStyle}>Answer (Rich Text)</label>
                                            <MiniRichTextEditor value={item.a || ''} onChange={val => updateField(`content.faq.items.${i}.a`, val)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.faq.items', (prev) => [...(prev || []), { q: "", a: "" }])} className="text-xs font-bold text-orange-600 uppercase tracking-tight bg-orange-50 py-3 rounded-xl border border-dashed border-orange-200 w-full text-center hover:bg-orange-100 transition-colors">+ Add New FAQ Item</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 17. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="17. SEO Settings" activeSections={['seo', ...(activeSections || [])]}>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>SEO Title</label>
                        <input className={inputStyle} placeholder="Meta Title" value={formData.seoTitle || ''} onChange={e => updateField('seoTitle', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>SEO Description</label>
                        <textarea className={inputStyle} rows={3} placeholder="Meta Description" value={formData.seoDescription || ''} onChange={e => updateField('seoDescription', e.target.value)} />
                    </div>
                    <MediaInput label="SEO / OpenGraph Image" value={formData.seoImage} path="seoImage" />
                </div>
            </SectionWrapper>

        </div>
    );
}
