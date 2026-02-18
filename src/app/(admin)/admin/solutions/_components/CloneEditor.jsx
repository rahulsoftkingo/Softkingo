import React from 'react';
import { 
    Smartphone, Layout, Database, Code, Settings, Zap, 
    BarChart3, ShieldCheck, DollarSign, Plus, X, 
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare, Users, Layers, Target, Grid, CheckCircle2, Globe
} from "lucide-react";

// --- GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

// --- ARRAY FIELD HELPER (Fixed Buttons & Logic) ---
const ArrayField = ({ label, path, items, renderItem, updateField, defaultItem = {} }) => (
    <div className="space-y-2">
        {label && <label className={labelStyle}>{label}</label>}
        <div className="space-y-2">
            {(Array.isArray(items) ? items : []).map((item, idx) => {
                if (item === undefined || item === null) return null;
                return (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100 group relative hover:border-orange-200 transition-colors">
                        <div className="flex-1 grid gap-2">{renderItem(item, idx)}</div>
                        <button 
                            type="button" 
                            onClick={() => {
                                const newItems = items.filter((_, i) => i !== idx);
                                updateField(path, newItems);
                            }} 
                            className="text-slate-400 hover:text-rose-500 p-1 hover:bg-rose-50 rounded transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
        <button 
            type="button" 
            onClick={() => {
                let newItem = typeof defaultItem === 'object' && defaultItem !== null ? JSON.parse(JSON.stringify(defaultItem)) : defaultItem;
                const currentItems = Array.isArray(items) ? items : [];
                updateField(path, [...currentItems, newItem]);
            }} 
            className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors border border-orange-100 w-full justify-center border-dashed"
        >
            <Plus size={14} /> Add Item
        </button>
    </div>
);

// --- SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 border-l-4 border-l-orange-500 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

export default function CloneEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    // Helper to safely update an item within an array
    const updateItemField = (basePath, index, field, value) => {
        const pathParts = basePath.split('.');
        const fieldName = pathParts[1]; 
        
        const currentItems = [...(content[fieldName]?.items || [])];
        
        if (!currentItems[index]) currentItems[index] = {};
        
        if (typeof currentItems[index] === 'object') {
            currentItems[index] = { ...currentItems[index], [field]: value };
        } else {
            currentItems[index] = value;
        }
        
        updateField(`${basePath}.items`, currentItems);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-8">
            
            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Page Title</label>
                        <input className={inputStyle} placeholder="e.g. Build Your Own Uber Clone" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle}>Subtitle</label>
                        <textarea className={inputStyle} rows={2} placeholder="e.g. Launch a successful platform fast..." value={content.hero?.subtitle || ''} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
                    </div>
                    <MediaInput label="Hero Image (Right Side)" value={content.hero?.image} path="content.hero.image" />
                </div>
            </SectionWrapper>

            {/* 2. ABOUT CLONE SECTION */}
            <SectionWrapper id="about" icon={Layout} title="2. About Our Clone App" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. About Our Taxi Clone" value={content.about?.title || ''} onChange={e => updateField('content.about.title', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle}>Description</label>
                        <textarea className={inputStyle} rows={4} placeholder="Detailed description..." value={content.about?.description || ''} onChange={e => updateField('content.about.description', e.target.value)} />
                    </div>
                    <MediaInput label="About Image (Right Side)" value={content.about?.image} path="content.about.image" />
                </div>
            </SectionWrapper>

            {/* 3. WHY BUILD SECTION */}
            <SectionWrapper id="whyBuild" icon={Target} title="3. Why Build a Clone App?" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. Why Build a Clone App?" value={content.whyBuild?.title || ''} onChange={e => updateField('content.whyBuild.title', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle}>Section Subtitle</label>
                        <textarea className={inputStyle} rows={2} placeholder="e.g. Clone apps offer a strategic advantage..." value={content.whyBuild?.subtitle || ''} onChange={e => updateField('content.whyBuild.subtitle', e.target.value)} />
                    </div>
                </div>
                <ArrayField label="Key Benefits (Cards)" path="content.whyBuild.items" items={content.whyBuild?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border border-slate-200 rounded text-sm font-bold placeholder:text-slate-400" placeholder="Benefit Title (e.g. Proven Success)" value={item.title || ''} onChange={e => updateItemField('content.whyBuild', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border border-slate-200 rounded text-sm placeholder:text-slate-400" rows={2} placeholder="Short description..." value={item.description || ''} onChange={e => updateItemField('content.whyBuild', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 4. SERVICES / MODULES */}
            <SectionWrapper id="services" icon={Briefcase} title="4. Development Services / Included Apps" activeSections={activeSections}>
                <p className="text-xs text-slate-500 mb-4">List the apps or panels included (e.g., User App, Driver App, Admin Panel).</p>
                <ArrayField label="Included Components" path="content.services.items" items={content.services?.items} updateField={updateField} defaultItem={{ title: "", icon: "" }}
                    renderItem={(item, i) => (
                        <div className="flex gap-2 items-center">
                            <input className="flex-1 p-2 border border-slate-200 rounded text-sm" placeholder="Component Name (e.g. User App)" value={item.title || ''} onChange={e => updateItemField('content.services', i, 'title', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 5. APP FEATURES (User, Vendor, Admin) */}
            <SectionWrapper id="appFeatures" icon={Grid} title="5. App Modules & Features" activeSections={activeSections}>
                <p className="text-xs text-slate-500 mb-4">Define specific features for each stakeholder app.</p>
                
                <div className="grid gap-6">
                    {/* User App Features */}
                    <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Users size={16} className="text-orange-500"/> User App Features</h4>
                        <ArrayField path="content.appFeatures.user.items" items={content.appFeatures?.user?.items} updateField={updateField} defaultItem={{ title: "" }}
                            renderItem={(item, i) => (
                                <input className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Feature (e.g. Real-time Tracking)" value={item.title || ''} 
                                    onChange={e => {
                                        const items = [...(content.appFeatures?.user?.items || [])];
                                        if(!items[i]) items[i] = {};
                                        items[i].title = e.target.value;
                                        updateField('content.appFeatures.user.items', items);
                                    }} />
                            )} />
                    </div>

                    {/* Vendor/Driver/Partner Features */}
                    <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Briefcase size={16} className="text-orange-500"/> Vendor/Driver Features</h4>
                        <ArrayField path="content.appFeatures.vendor.items" items={content.appFeatures?.vendor?.items} updateField={updateField} defaultItem={{ title: "" }}
                            renderItem={(item, i) => (
                                <input className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Feature (e.g. Earnings Dashboard)" value={item.title || ''} 
                                    onChange={e => {
                                        const items = [...(content.appFeatures?.vendor?.items || [])];
                                        if(!items[i]) items[i] = {};
                                        items[i].title = e.target.value;
                                        updateField('content.appFeatures.vendor.items', items);
                                    }} />
                            )} />
                    </div>

                    {/* Admin Panel Features */}
                    <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Settings size={16} className="text-orange-500"/> Admin Dashboard Features</h4>
                        <ArrayField path="content.appFeatures.admin.items" items={content.appFeatures?.admin?.items} updateField={updateField} defaultItem={{ title: "" }}
                            renderItem={(item, i) => (
                                <input className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Feature (e.g. User Management)" value={item.title || ''} 
                                    onChange={e => {
                                        const items = [...(content.appFeatures?.admin?.items || [])];
                                        if(!items[i]) items[i] = {};
                                        items[i].title = e.target.value;
                                        updateField('content.appFeatures.admin.items', items);
                                    }} />
                            )} />
                    </div>
                </div>
            </SectionWrapper>

            {/* 6. AI & ADVANCED FEATURES */}
            <SectionWrapper id="aiFeatures" icon={Zap} title="6. AI & Advanced Features" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. AI-Powered Advanced Features" value={content.aiFeatures?.title || ''} onChange={e => updateField('content.aiFeatures.title', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle}>Section Subtitle</label>
                        <textarea className={inputStyle} rows={2} placeholder="e.g. Cutting-edge artificial intelligence capabilities..." value={content.aiFeatures?.subtitle || ''} onChange={e => updateField('content.aiFeatures.subtitle', e.target.value)} />
                    </div>
                </div>
                <ArrayField label="Advanced Capabilities" path="content.aiFeatures.items" items={content.aiFeatures?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border border-slate-200 rounded text-sm font-bold" placeholder="Feature Title (e.g. Smart Routing)" value={item.title || ''} onChange={e => updateItemField('content.aiFeatures', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border border-slate-200 rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateItemField('content.aiFeatures', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 7. TECH STACK */}
            <SectionWrapper id="techStack" icon={Code} title="7. Technology Stack" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. Technology Stack We Use" value={content.techStack?.title || ''} onChange={e => updateField('content.techStack.title', e.target.value)} />
                    </div>
                </div>
                <ArrayField label="Technologies Used" path="content.techStack.items" items={content.techStack?.items} updateField={updateField} defaultItem={{ name: "", image: "" }}
                    renderItem={(item, i) => (
                        <div className="flex gap-4 items-start">
                            <div className="flex-1 space-y-2">
                                <label className="text-[10px] uppercase text-slate-400 font-bold">Tech Name</label>
                                <input className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="e.g. Flutter" value={item.name || ''} onChange={e => updateItemField('content.techStack', i, 'name', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-2 block">Logo</label>
                                <MediaInput value={item.image} path={`content.techStack.items.${i}.image`} />
                            </div>
                        </div>
                    )} />
            </SectionWrapper>

            {/* 8. REVENUE MODELS */}
            <SectionWrapper id="revenue" icon={DollarSign} title="8. Revenue & Monetization" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. Revenue & Monetization Models" value={content.revenue?.title || ''} onChange={e => updateField('content.revenue.title', e.target.value)} />
                    </div>
                </div>
                <ArrayField label="Monetization Strategies" path="content.revenue.items" items={content.revenue?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border border-slate-200 rounded text-sm font-bold" placeholder="Model Name (e.g. Commissions)" value={item.title || ''} onChange={e => updateItemField('content.revenue', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border border-slate-200 rounded text-sm" rows={2} placeholder="How it works..." value={item.description || ''} onChange={e => updateItemField('content.revenue', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 9. PORTFOLIO & INDUSTRIES */}
            <SectionWrapper id="portfolio" icon={Globe} title="9. Industries & Sectors" activeSections={activeSections}>
                <p className="text-xs text-slate-500 mb-4">Add industries where this clone app is applicable.</p>
                <ArrayField label="Industries List" path="content.portfolio.items" items={content.portfolio?.items} updateField={updateField} defaultItem={{ title: "" }}
                    renderItem={(item, i) => (
                        <input className="w-full p-2 border border-slate-200 rounded text-sm" placeholder="Industry Name (e.g. Healthcare, Transport)" value={item.title || ''} 
                            onChange={e => {
                                const items = [...(content.portfolio?.items || [])];
                                if(!items[i]) items[i] = {};
                                items[i].title = e.target.value;
                                updateField('content.portfolio.items', items);
                            }} />
                    )} />
            </SectionWrapper>

            {/* 10. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="10. Development Process" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. Our Clone Development Process" value={content.process?.title || ''} onChange={e => updateField('content.process.title', e.target.value)} />
                    </div>
                </div>
                <ArrayField label="Process Steps" path="content.process.items" items={content.process?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">Step {i+1}</span>
                                <input className="flex-1 p-2 border border-slate-200 rounded text-sm font-bold" placeholder="Step Title" value={item.title || ''} onChange={e => updateItemField('content.process', i, 'title', e.target.value)} />
                            </div>
                            <textarea className="w-full p-2 border border-slate-200 rounded text-sm" rows={2} placeholder="Step Description..." value={item.description || ''} onChange={e => updateItemField('content.process', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 11. FAQ & CTA */}
            <SectionWrapper id="faq" icon={HelpCircle} title="11. FAQ & Bottom CTA" activeSections={activeSections}>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="e.g. Frequently Asked Questions" value={content.faq?.title || ''} onChange={e => updateField('content.faq.title', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle}>Section Subtitle</label>
                        <textarea className={inputStyle} rows={2} placeholder="e.g. Everything you need to know..." value={content.faq?.subtitle || ''} onChange={e => updateField('content.faq.subtitle', e.target.value)} />
                    </div>
                </div>
                <div className="mb-8">
                    <label className={labelStyle}>Frequently Asked Questions</label>
                    <ArrayField path="content.faq.items" items={content.faq?.items} updateField={updateField} defaultItem={{ q: "", a: "" }}
                        renderItem={(item, i) => (
                            <div className="space-y-2">
                                <input className="w-full p-2 border border-slate-200 rounded text-sm font-bold" placeholder="Question" value={item.q || ''} onChange={e => updateItemField('content.faq', i, 'q', e.target.value)} />
                                <textarea className="w-full p-2 border border-slate-200 rounded text-sm" rows={3} placeholder="Answer" value={item.a || ''} onChange={e => updateItemField('content.faq', i, 'a', e.target.value)} />
                            </div>
                        )} />
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                    <label className={labelStyle}>Bottom Call To Action</label>
                    <div className="space-y-4">
                        <input className={inputStyle} placeholder="CTA Title (e.g. Ready to Launch?)" value={content.cta?.title || ''} onChange={e => updateField('content.cta.title', e.target.value)} />
                        <input className={inputStyle} placeholder="CTA Subtitle" value={content.cta?.subtitle || ''} onChange={e => updateField('content.cta.subtitle', e.target.value)} />
                    </div>
                </div>
            </SectionWrapper>

        </div>
    );
}