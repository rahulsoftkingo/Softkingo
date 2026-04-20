import React, { useState } from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';
import { COMMON_TECH } from './TechConstants';
import {
    Smartphone, Layout, Database, Code, Settings, Zap,
    BarChart3, ShieldCheck, DollarSign, Plus, X, Trash2,
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare, Globe, Search
} from "lucide-react";

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

// --- 2. SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-sky-500">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

// --- 3. MAIN SOLUTIONS EDITOR ---
export default function SolutionsEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};
    const [activeAppTab, setActiveAppTab] = useState(0);

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <div className="grid grid-cols-1 gap-4">
                    <input className={inputStyle} placeholder="Main Title" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                </div>
                <div className="space-y-1">
                    <label className={labelStyle}>Hero Description</label>
                    <MiniRichTextEditor value={content.hero?.description || ''} onChange={val => updateField('content.hero.description', val)} />
                </div>
                <MediaInput label="Hero Image" value={content.hero?.image} path="content.hero.image" />
            </SectionWrapper>

            {/* 2. STATISTICS */}
            <SectionWrapper id="stats" icon={BarChart3} title="2. Statistics Banner" activeSections={activeSections}>
                <div className="space-y-4">
                    <label className={labelStyle}>Stats Items (Value & Label)</label>
                    {(content.stats?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Value (e.g. 1M+)" value={item.value || ''} onChange={e => updateField(`content.stats.items.${i}.value`, e.target.value)} />
                            <input className="flex-1 p-2 bg-white border rounded text-sm" placeholder="Label (e.g. Downloads)" value={item.label || ''} onChange={e => updateField(`content.stats.items.${i}.label`, e.target.value)} />
                            <button type="button" onClick={() => updateField('content.stats.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.stats.items', (prev) => [...(prev || []), { value: "", label: "" }])} className="text-xs font-bold text-sky-600 p-1">+ Add Stat Item</button>
                </div>
            </SectionWrapper>

            {/* 3. INTRODUCTION */}
            <SectionWrapper id="intro" icon={Layout} title="3. Introduction Section" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.intro?.title || ''} onChange={e => updateField('content.intro.title', e.target.value)} />
                <div className="space-y-1">
                    <label className={labelStyle}>Intro Description</label>
                    <MiniRichTextEditor value={content.intro?.description || ''} onChange={val => updateField('content.intro.description', val)} />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className={labelStyle}>Key Points (List)</label>
                        {(content.intro?.listItems || []).map((item, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input className="flex-1 p-2 bg-white border rounded text-xs" value={item || ''} onChange={e => updateField(`content.intro.listItems.${i}`, e.target.value)} />
                                <button type="button" onClick={() => updateField('content.intro.listItems', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-300"><X size={14} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => updateField('content.intro.listItems', (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Point</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 4. FEATURES GRID */}
            <SectionWrapper id="features" icon={Database} title="4. Core Features Grid" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Grid Title" value={content.features?.title || ''} onChange={e => updateField('content.features.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Title Highlight" value={content.features?.highlight || ''} onChange={e => updateField('content.features.highlight', e.target.value)} />
                </div>
                <div className="space-y-4">
                    <label className={labelStyle}>Feature Cards</label>
                    {(content.features?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                            <button type="button" onClick={() => updateField('content.features.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-rose-500"><X size={18} /></button>
                            <div className="grid gap-3">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Feature Title" value={item.title || ''} onChange={e => updateField(`content.features.items.${i}.title`, e.target.value)} />
                                <div className="space-y-1">
                                    <label className={labelStyle}>Feature Description</label>
                                    <MiniRichTextEditor value={item.description || ''} onChange={val => updateField(`content.features.items.${i}.description`, val)} />
                                </div>
                                <input className="w-full p-2 bg-white border rounded text-xs" placeholder="Icon URL" value={item.image || ''} onChange={e => updateField(`content.features.items.${i}.image`, e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.features.items', (prev) => [...(prev || []), { title: "", description: "", image: "" }])} className="text-sm font-bold text-sky-600">+ Add Feature Card</button>
                </div>
            </SectionWrapper>

            {/* 5. AWARDS */}
            <SectionWrapper id="awards" icon={Award} title="5. Client Recognition / Awards" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.awards?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-4 items-center bg-slate-50 p-2 rounded-lg">
                            <MediaInput label="Award Logo" value={item.image} path={`content.awards.items.${i}.image`} />
                            <button type="button" onClick={() => updateField('content.awards.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-300"><X size={18} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.awards.items', (prev) => [...(prev || []), { image: "" }])} className="text-xs font-bold text-sky-600">+ Add Award Logo</button>
                </div>
            </SectionWrapper>

            {/* 6. WHY NEED */}
            <SectionWrapper id="whyNeed" icon={HelpCircle} title="6. Growing Need / Why Choose" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Heading" value={content.whyNeed?.title || ''} onChange={e => updateField('content.whyNeed.title', e.target.value)} />
                <div className="space-y-4">
                    {(content.whyNeed?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Reason Title" value={item.title || ''} onChange={e => updateField(`content.whyNeed.items.${i}.title`, e.target.value)} />
                                    <input className="w-full p-2 bg-white border rounded text-sm font-mono text-sky-600" placeholder="Lucide Icon (e.g. Zap)" value={item.icon || ''} onChange={e => updateField(`content.whyNeed.items.${i}.icon`, e.target.value)} />
                                </div>
                                <textarea className="w-full p-2 bg-white border rounded text-sm" placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.whyNeed.items.${i}.description`, e.target.value)} />

                                {/* Bullets */}
                                <div className="p-2 bg-white rounded border border-slate-100">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-tight block mb-1">Bullets (Optional Tags)</label>
                                    {(item.bullets || []).map((bullet, bi) => (
                                        <div key={bi} className="flex gap-2 mb-1">
                                            <input className="flex-1 p-1.5 bg-slate-50 border rounded text-[11px]" value={bullet || ''} onChange={e => updateField(`content.whyNeed.items.${i}.bullets.${bi}`, e.target.value)} />
                                            <button type="button" onClick={() => updateField(`content.whyNeed.items.${i}.bullets`, (prev) => (prev || []).filter((_, bidx) => bidx !== bi))} className="text-slate-300 hover:text-rose-500"><X size={12} /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.whyNeed.items.${i}.bullets`, (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Bullet</button>
                                </div>
                            </div>
                            <button type="button" onClick={() => updateField('content.whyNeed.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.whyNeed.items', (prev) => [...(prev || []), { title: "", description: "", icon: "Zap", bullets: [] }])} className="text-xs font-bold text-sky-600 p-1">+ Add New Reason</button>
                </div>
            </SectionWrapper>

            {/* 7. SERVICES LIST */}
            <SectionWrapper id="servicesList" icon={Briefcase} title="7. Extensive Services Provided" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.servicesList?.title || ''} onChange={e => updateField('content.servicesList.title', e.target.value)} />
                <div className="space-y-4">
                    {(content.servicesList?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                            <button type="button" onClick={() => updateField('content.servicesList.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-rose-500"><X size={18} /></button>
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold mb-2" placeholder="Service Name" value={item.title || ''} onChange={e => updateField(`content.servicesList.items.${i}.title`, e.target.value)} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Brief Description" value={item.description || ''} onChange={e => updateField(`content.servicesList.items.${i}.description`, e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.servicesList.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-sm font-bold text-sky-600">+ Add Service Item</button>
                </div>
            </SectionWrapper>

            {/* 8. APP MODULES (Tabbed Editor) */}
            <SectionWrapper id="appModules" icon={Smartphone} title="8. App Modules (Tab Style)" activeSections={activeSections}>
                <div className="space-y-6">
                    {/* Section Header Inputs */}
                    <div className="grid md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="space-y-1">
                            <label className={labelStyle}>Section Title</label>
                            <input 
                                className={inputStyle} 
                                placeholder="e.g. Powerful Mobile & Web Modules" 
                                value={content.appModules?.title || ''} 
                                onChange={e => updateField('content.appModules.title', e.target.value)} 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className={labelStyle}>Section Subtitle</label>
                            <input 
                                className={inputStyle} 
                                placeholder="Describe the modules generally..." 
                                value={content.appModules?.subtitle || ''} 
                                onChange={e => updateField('content.appModules.subtitle', e.target.value)} 
                            />
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-2">
                        {(content.appModules?.tabs || []).map((tab, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveAppTab(i)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                    activeAppTab === i 
                                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm' 
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
                                }`}
                            >
                                {tab.tag || `Module ${i + 1}`}
                            </button>
                        ))}
                        <button 
                            type="button" 
                            onClick={() => {
                                const newIndex = (content.appModules?.tabs || []).length;
                                updateField('content.appModules.tabs', (prev) => [...(prev || []), { title: "", tag: "", description: "", image: "", isWeb: false, features: [] }]);
                                setActiveAppTab(newIndex);
                            }} 
                            className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-dashed border-slate-300 hover:bg-slate-200"
                        >
                            + Add New
                        </button>
                    </div>

                    {/* Active Tab Content */}
                    {(content.appModules?.tabs || []).map((tab, i) => i === activeAppTab && (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
                            <button 
                                type="button" 
                                onClick={() => {
                                    if(confirm("Are you sure you want to delete this module?")) {
                                        updateField('content.appModules.tabs', (prev) => prev.filter((_, idx) => idx !== i));
                                        setActiveAppTab(Math.max(0, i - 1));
                                    }
                                }} 
                                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-2 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={labelStyle}>Module Title (e.g. User App)</label>
                                    <input className={inputStyle} placeholder="Title" value={tab.title || ''} onChange={e => updateField(`content.appModules.tabs.${i}.title`, e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Tag (e.g. CUSTOMER / VENDOR)</label>
                                    <input className={inputStyle} placeholder="Tag" value={tab.tag || ''} onChange={e => updateField(`content.appModules.tabs.${i}.tag`, e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelStyle}>Description</label>
                                <MiniRichTextEditor value={tab.description || ''} onChange={val => updateField(`content.appModules.tabs.${i}.description`, val)} />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                        <input
                                            type="checkbox"
                                            id={`isWeb-${i}`}
                                            className="w-4 h-4 text-sky-600 rounded cursor-pointer"
                                            checked={!!tab.isWeb}
                                            onChange={e => updateField(`content.appModules.tabs.${i}.isWeb`, e.target.checked)}
                                        />
                                        <label htmlFor={`isWeb-${i}`} className="text-sm font-bold text-slate-700 cursor-pointer">Is Web Panel / Dashboard?</label>
                                    </div>
                                    <MediaInput label="Module Preview Image" value={tab.image} path={`content.appModules.tabs.${i}.image`} />
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                                    <label className="text-[10px] font-black text-slate-400 block mb-3 uppercase tracking-tighter">Detailed Features (Scrollable List)</label>
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {(tab.features || []).map((feat, fi) => (
                                            <div key={fi} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group hover:border-sky-200 transition-colors">
                                                <button type="button" onClick={() => updateField('content.appModules.tabs', (prev) => {
                                                    const newTabs = [...(prev || [])];
                                                    newTabs[i] = { ...newTabs[i], features: newTabs[i].features.filter((_, idx) => idx !== fi) };
                                                    return newTabs;
                                                })} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><X size={14} /></button>
                                                
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-slate-400">TITLE</label>
                                                    <input 
                                                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold" 
                                                        placeholder="Feature Title" 
                                                        value={typeof feat === 'string' ? feat : (feat.title || '')} 
                                                        onChange={e => updateField(`content.appModules.tabs.${i}.features.${fi}.title`, e.target.value)} 
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-slate-400">DESCRIPTION (RICH TEXT)</label>
                                                    <MiniRichTextEditor 
                                                        value={feat.desc || ''} 
                                                        onChange={val => updateField(`content.appModules.tabs.${i}.features.${fi}.desc`, val)} 
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => updateField('content.appModules.tabs', (prev) => {
                                            const newTabs = [...(prev || [])];
                                            newTabs[i] = { ...newTabs[i], features: [...(newTabs[i].features || []), { title: "", desc: "" }] };
                                            return newTabs;
                                        })} 
                                        className="mt-4 w-full py-2.5 rounded-xl border-2 border-dashed border-sky-100 text-sky-600 font-bold text-[10px] hover:bg-sky-50 transition-colors"
                                    >
                                        + Add New Detail Point
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {(!content.appModules?.tabs || content.appModules.tabs.length === 0) && (
                        <div className="py-12 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                            <Smartphone size={32} className="mb-2 opacity-20" />
                            <p className="text-sm font-medium">No app modules added yet.</p>
                            <p className="text-[10px]">Click "+ Add New" above to start.</p>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* 9. AI FEATURES */}
            <SectionWrapper id="aiCapabilities" icon={Zap} title="9. Advanced AI Capabilities" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.aiCapabilities?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="AI Feature Title" value={item.title || ''} onChange={e => updateField(`content.aiCapabilities.items.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border rounded text-sm" placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.aiCapabilities.items.${i}.description`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.aiCapabilities.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.aiCapabilities.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-sky-600 p-1">+ Add AI Capability</button>
                </div>
            </SectionWrapper>

            {/* 10. PORTFOLIO */}
            <SectionWrapper id="portfolio" icon={Globe} title="10. Portfolio" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Section Title" value={content.portfolio?.title || ''} onChange={e => updateField('content.portfolio.title', e.target.value)} />
                        <div className="space-y-1">
                            <label className={labelStyle}>Category Filter</label>
                            <select className={inputStyle} value={content.portfolio?.category || ''} onChange={e => updateField('content.portfolio.category', e.target.value)}>
                                <option value="">Select Category...</option>
                                <option value="dating">Dating Apps</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="delivery">Delivery Apps</option>
                                <option value="taxi">Taxi / Ride Sharing</option>
                                <option value="education">E-Learning</option>
                                <option value="fitness">Health & Fitness</option>
                                <option value="healthcare">Healthcare / Medical</option>
                                <option value="fintech">Fintech / Banking</option>
                                <option value="realestate">Real Estate / Property</option>
                                <option value="booking">Travel & Booking</option>
                                <option value="social">Social Media</option>
                            </select>
                        </div>
                    </div>
                    <textarea className={inputStyle} rows={2} placeholder="Section Subtitle" value={content.portfolio?.subtitle || ''} onChange={e => updateField('content.portfolio.subtitle', e.target.value)} />
                    <p className="text-[10px] text-slate-400">Leave category blank → shows top 7 projects by default.</p>
                </div>
            </SectionWrapper>

            {/* 11. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="11. Development Roadmap" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.process?.steps || []).map((step, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Step Title" value={step.title || ''} onChange={e => updateField(`content.process.steps.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border rounded text-sm" placeholder="Step Description" value={step.description || ''} onChange={e => updateField(`content.process.steps.${i}.description`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.process.steps', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.process.steps', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-sky-600 p-1">+ Add Roadmap Step</button>
                </div>
            </SectionWrapper>

            <SectionWrapper id="techStack" icon={Code} title="12. Technology Stack (Tabbed)" activeSections={activeSections}>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Section Title" value={content.techStack?.title || ''} onChange={e => updateField('content.techStack.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Highlight Text" value={content.techStack?.highlight || ''} onChange={e => updateField('content.techStack.highlight', e.target.value)} />
                    </div>
                    <textarea className={inputStyle} rows={2} placeholder="Section Subtitle" value={content.techStack?.subtitle || ''} onChange={e => updateField('content.techStack.subtitle', e.target.value)} />

                    <div className="space-y-6 pt-4 border-t border-slate-100">
                        <label className={labelStyle}>Categories (Tabs)</label>
                        {(content.techStack?.tabs || []).map((tab, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group space-y-4">
                                <button type="button" onClick={() => updateField('content.techStack.tabs', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500"><X size={18} /></button>
                                <input className={inputStyle} placeholder="Category Label (e.g. Frontend)" value={tab.label || ''} onChange={e => updateField(`content.techStack.tabs.${i}.label`, e.target.value)} />

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-dashed border-slate-200">
                                        <label className="w-full text-[10px] font-black text-slate-400 uppercase mb-1">Quick Add Common Tech:</label>
                                        {COMMON_TECH.map((tech) => (
                                            <button
                                                key={tech.name}
                                                type="button"
                                                onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => [...(prev || []), { ...tech }])}
                                                className="p-1 px-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-600 rounded-md border border-slate-100 text-[10px] font-bold transition-all flex items-center gap-1.5 active:scale-95"
                                            >
                                                <img src={tech.image} className="w-3.5 h-3.5" alt="" />
                                                {tech.name}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {(tab.items || []).map((item, j) => (
                                            <div key={j} className="bg-white p-3 rounded-xl border border-slate-200 relative group/tech">
                                                <button type="button" onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => (prev || []).filter((_, idx) => idx !== j))} className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover/tech:opacity-100 transition-opacity z-10"><X size={12} /></button>
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex-1">
                                                        <input className="w-full p-1.5 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold" placeholder="Tech Name" value={item.name || ''} onChange={e => updateField(`content.techStack.tabs.${i}.items.${j}.name`, e.target.value)} />
                                                    </div>
                                                    <div className="w-12 h-10">
                                                        <MediaInput label="Icon" value={item.image} path={`content.techStack.tabs.${i}.items.${j}.image`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => [...(prev || []), { name: "", image: "" }])} className="text-[10px] font-bold text-sky-600 uppercase">+ Add Custom Tech</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => updateField('content.techStack.tabs', (prev) => [...(prev || []), { label: "", items: [] }])} className="w-full py-4 border-2 border-dashed border-sky-200 rounded-2xl text-sky-600 font-bold hover:bg-sky-50 transition-all flex items-center justify-center gap-2">
                            <Plus size={18} /> Add Tech Category
                        </button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 13. MONETIZATION */}
            <SectionWrapper id="monetization" icon={DollarSign} title="13. Revenue Models" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.monetization?.models || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                            <button type="button" onClick={() => updateField('content.monetization.models', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-rose-500"><X size={18} /></button>
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold mb-2" placeholder="Model Title" value={item.title || ''} onChange={e => updateField(`content.monetization.models.${i}.title`, e.target.value)} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="How it generates revenue..." value={item.description || ''} onChange={e => updateField(`content.monetization.models.${i}.description`, e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.monetization.models', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-sm font-bold text-sky-600">+ Add Monetization Model</button>
                </div>
            </SectionWrapper>

            {/* 14. WHY CHOOSE / SECURITY */}
            <SectionWrapper id="whyChoose" icon={ShieldCheck} title="14. Enterprise Security & Quality" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.whyChoose?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Quality Point Title" value={item.title || ''} onChange={e => updateField(`content.whyChoose.items.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border rounded text-sm" placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.whyChoose.items.${i}.description`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.whyChoose.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.whyChoose.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-sky-600 p-1">+ Add Quality Point</button>
                </div>
            </SectionWrapper>

            {/* 15. CONSULTATION CTA */}
            <SectionWrapper id="consultation" icon={MessageSquare} title="15. Consultation CTA" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="CTA Title" value={content.consultation?.title || ''} onChange={e => updateField('content.consultation.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Button Label" value={content.consultation?.buttonLabel || ''} onChange={e => updateField('content.consultation.buttonLabel', e.target.value)} />
                </div>
                <div className="space-y-1">
                    <label className={labelStyle}>Subtitle (HTML Support)</label>
                    <MiniRichTextEditor value={content.consultation?.subtitle || ''} onChange={val => updateField('content.consultation.subtitle', val)} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <MediaInput label="Consultant Image" value={content.consultation?.imageSrc} path="content.consultation.imageSrc" />
                    <div className="space-y-1">
                        <label className={labelStyle}>Theme</label>
                        <select className={inputStyle} value={content.consultation?.theme || 'dark'} onChange={e => updateField('content.consultation.theme', e.target.value)}>
                            <option value="dark">Dark (Blue Gradient)</option>
                            <option value="white">White (Clean)</option>
                        </select>
                    </div>
                </div>
            </SectionWrapper>

            {/* 16. BLOG SECTION */}
            <SectionWrapper id="blogs" icon={MessageSquare} title="16. Blog Section" activeSections={activeSections}>
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

            {/* 17. FAQ */}
            <SectionWrapper id="faq" icon={HelpCircle} title="17. FAQ" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.faq?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Question" value={item.q || ''} onChange={e => updateField(`content.faq.items.${i}.q`, e.target.value)} />
                                <div className="space-y-1">
                                    <label className={labelStyle}>Answer (Rich Text)</label>
                                    <MiniRichTextEditor value={item.a || ''} onChange={val => updateField(`content.faq.items.${i}.a`, val)} />
                                </div>
                            </div>
                            <button type="button" onClick={() => updateField('content.faq.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.faq.items', (prev) => [...(prev || []), { q: "", a: "" }])} className="text-xs font-bold text-sky-600 p-1">+ Add FAQ Item</button>
                </div>
            </SectionWrapper>

            {/* 18. BOTTOM CTA
            <SectionWrapper id="cta" icon={MousePointerClick} title="18. Bottom CTA" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="CTA Title" value={content.cta?.title || ''} onChange={e => updateField('content.cta.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Button Text" value={content.cta?.btnText || ''} onChange={e => updateField('content.cta.btnText', e.target.value)} />
                </div>
                <div className="space-y-1">
                    <label className={labelStyle}>Subtitle</label>
                    <input className={inputStyle} placeholder="CTA Subtitle" value={content.cta?.subtitle || ''} onChange={e => updateField('content.cta.subtitle', e.target.value)} />
                </div>
            </SectionWrapper> */}


            {/* 19. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="19. SEO Settings" activeSections={['seo', ...(activeSections || [])]}>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>SEO Title</label>
                        <input className={inputStyle} placeholder="Meta Title" value={formData.seoTitle || ''} onChange={e => updateField('seoTitle', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>SEO Description</label>
                        <textarea className={inputStyle} rows={3} placeholder="Meta Description" value={formData.seoDescription || ''} onChange={e => updateField('seoDescription', e.target.value)} />
                    </div>
                    <MediaInput label="OG Image" value={formData.seoImage} path="seoImage" />
                </div>
            </SectionWrapper>

            {/* 20. INQUIRY SECTION */}
            <SectionWrapper id="inquiry" icon={MessageSquare} title="20. Inquiry Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Tagline (e.g. GET IN TOUCH)" value={content.inquiry?.tagline || ''} onChange={e => updateField('content.inquiry.tagline', e.target.value)} />
                    <input className={inputStyle} placeholder="Title Prefix (e.g. Let's )" value={content.inquiry?.titlePrefix || ''} onChange={e => updateField('content.inquiry.titlePrefix', e.target.value)} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Title (e.g. Connect)" value={content.inquiry?.title || ''} onChange={e => updateField('content.inquiry.title', e.target.value)} />
                </div>
                <div className="space-y-1">
                    <label className={labelStyle}>Subtitle (HTML Support)</label>
                    <MiniRichTextEditor value={content.inquiry?.subtitle || ''} onChange={val => updateField('content.inquiry.subtitle', val)} />
                </div>
            </SectionWrapper>

        </div>
    );
}