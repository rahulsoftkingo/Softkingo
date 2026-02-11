import React from 'react';
import { 
    Smartphone, Layout, Database, Code, Settings, Zap, 
    BarChart3, ShieldCheck, DollarSign, Plus, X, 
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare, Users, Layers, Target, Grid
} from "lucide-react";

// --- GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-400";

// --- ARRAY FIELD HELPER ---
const ArrayField = ({ label, path, items = [], renderItem, updateField, defaultItem = {} }) => (
    <div className="space-y-2">
        {label && <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>}
        <div className="space-y-2">
            {(Array.isArray(items) ? items : []).map((item, idx) => {
                if (item === undefined || item === null) return null;
                return (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100 group relative">
                        <div className="flex-1 grid gap-2">{renderItem(item, idx)}</div>
                        <button onClick={() => {
                            const newItems = items.filter((_, i) => i !== idx);
                            updateField(path, newItems);
                        }} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                    </div>
                );
            })}
        </div>
        <button onClick={() => {
            let newItem = typeof defaultItem === 'object' && defaultItem !== null ? JSON.parse(JSON.stringify(defaultItem)) : defaultItem;
            updateField(path, [...(Array.isArray(items) ? items : []), newItem]);
        }} className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors border border-orange-100">
            <Plus size={14} /> Add Item
        </button>
    </div>
);

// --- SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 border-l-4 border-l-orange-500 mb-6">
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

    const updateItemField = (basePath, index, field, value) => {
        const currentItems = [...(content[basePath.split('.')[1]]?.items || [])];
        if (!currentItems[index]) currentItems[index] = {};
        if (typeof currentItems[index] === 'object') currentItems[index] = { ...currentItems[index], [field]: value };
        else currentItems[index] = value;
        updateField(`${basePath}.items`, currentItems);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            
            {/* 1. HERO */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Page Title (e.g. Build Your Own Uber Clone)" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                <textarea className={inputStyle} rows={2} placeholder="Subtitle" value={content.hero?.subtitle || ''} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
                <MediaInput label="Hero Image" value={content.hero?.image} path="content.hero.image" />
            </SectionWrapper>

            {/* 2. ABOUT CLONE */}
            <SectionWrapper id="about" icon={Layout} title="2. About Our Clone App" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.about?.title || ''} onChange={e => updateField('content.about.title', e.target.value)} />
                <textarea className={inputStyle} rows={4} placeholder="Description" value={content.about?.description || ''} onChange={e => updateField('content.about.description', e.target.value)} />
                <MediaInput label="About Image" value={content.about?.image} path="content.about.image" />
            </SectionWrapper>

            {/* 3. WHY BUILD */}
            <SectionWrapper id="whyBuild" icon={Target} title="3. Why Build a Clone App?" activeSections={activeSections}>
                <ArrayField label="Reasons" path="content.whyBuild" items={content.whyBuild?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border rounded text-sm font-bold" placeholder="Reason Title" value={item.title || ''} onChange={e => updateItemField('content.whyBuild', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border rounded text-sm" placeholder="Description" value={item.description || ''} onChange={e => updateItemField('content.whyBuild', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 4. SERVICES */}
            <SectionWrapper id="services" icon={Briefcase} title="4. Development Services" activeSections={activeSections}>
                <ArrayField label="Services List" path="content.services" items={content.services?.items} updateField={updateField} defaultItem={{ title: "", icon: "" }}
                    renderItem={(item, i) => (
                        <div className="flex gap-2">
                            <input className="flex-1 p-2 border rounded text-sm font-bold" placeholder="Service Name" value={item.title || ''} onChange={e => updateItemField('content.services', i, 'title', e.target.value)} />
                            <input className="w-1/3 p-2 border rounded text-sm" placeholder="Icon URL" value={item.icon || ''} onChange={e => updateItemField('content.services', i, 'icon', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 5. APP FEATURES (User, Vendor, Admin) */}
            <SectionWrapper id="appFeatures" icon={Grid} title="5. App Modules & Features" activeSections={activeSections}>
                <p className="text-xs text-slate-500 mb-4">Define features for Job Seeker (User), Recruiter (Vendor), and Admin.</p>
                
                {['user', 'vendor', 'admin'].map((role) => (
                    <div key={role} className="mb-6 border p-4 rounded-xl bg-slate-50">
                        <h4 className="font-bold text-slate-700 capitalize mb-2">{role} Features</h4>
                        <ArrayField path={`content.appFeatures.${role}`} items={content.appFeatures?.[role]?.items} updateField={updateField} defaultItem={{ title: "" }}
                            renderItem={(item, i) => (
                                <input className="w-full p-2 border rounded text-sm" placeholder="Feature Name" value={item.title || ''} 
                                    onChange={e => {
                                        const items = [...(content.appFeatures?.[role]?.items || [])];
                                        if(!items[i]) items[i] = {};
                                        items[i].title = e.target.value;
                                        updateField(`content.appFeatures.${role}.items`, items);
                                    }} />
                            )} />
                    </div>
                ))}
            </SectionWrapper>

            {/* 6. AI FEATURES */}
            <SectionWrapper id="aiFeatures" icon={Zap} title="6. AI & Advanced Features" activeSections={activeSections}>
                <ArrayField label="Advanced Features" path="content.aiFeatures" items={content.aiFeatures?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border rounded text-sm font-bold" placeholder="Feature Title" value={item.title || ''} onChange={e => updateItemField('content.aiFeatures', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border rounded text-sm" placeholder="Description" value={item.description || ''} onChange={e => updateItemField('content.aiFeatures', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 7. TECH STACK */}
            <SectionWrapper id="techStack" icon={Code} title="7. Technology Stack" activeSections={activeSections}>
                <ArrayField label="Technologies" path="content.techStack" items={content.techStack?.items} updateField={updateField} defaultItem={{ name: "", image: "" }}
                    renderItem={(item, i) => (
                        <div className="flex gap-2 items-center">
                            <input className="flex-1 p-2 border rounded text-sm" placeholder="Name" value={item.name || ''} onChange={e => updateItemField('content.techStack', i, 'name', e.target.value)} />
                            <div className="w-1/2">
                                <MediaInput label="Icon" value={item.image} path={`content.techStack.items.${i}.image`} />
                            </div>
                        </div>
                    )} />
            </SectionWrapper>

            {/* 8. REVENUE MODELS */}
            <SectionWrapper id="revenue" icon={DollarSign} title="8. Revenue & Monetization" activeSections={activeSections}>
                <ArrayField label="Models" path="content.revenue" items={content.revenue?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border rounded text-sm font-bold" placeholder="Model Name" value={item.title || ''} onChange={e => updateItemField('content.revenue', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border rounded text-sm" placeholder="How it earns money" value={item.description || ''} onChange={e => updateItemField('content.revenue', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 9. PORTFOLIO & INDUSTRIES (Reuse) */}
            <SectionWrapper id="portfolio" icon={Layout} title="9. Portfolio & Industries" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Portfolio Category Tag" value={content.portfolio?.category || ''} onChange={e => updateField('content.portfolio.category', e.target.value)} />
                <div className="mt-4"><p className="text-xs text-slate-500">Industry list is global.</p></div>
            </SectionWrapper>

            {/* 10. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="10. Development Process" activeSections={activeSections}>
                <ArrayField label="Steps" path="content.process" items={content.process?.items} updateField={updateField} defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 border rounded text-sm font-bold" placeholder="Step Name" value={item.title || ''} onChange={e => updateItemField('content.process', i, 'title', e.target.value)} />
                            <textarea className="w-full p-2 border rounded text-sm" placeholder="Description" value={item.description || ''} onChange={e => updateItemField('content.process', i, 'description', e.target.value)} />
                        </div>
                    )} />
            </SectionWrapper>

            {/* 11. FAQ & CTA */}
            <SectionWrapper id="faq" icon={HelpCircle} title="11. FAQ & CTA" activeSections={activeSections}>
                <div className="mb-6">
                    <label className="text-xs font-bold text-slate-400">FAQ ITEMS</label>
                    <ArrayField path="content.faq" items={content.faq?.items} updateField={updateField} defaultItem={{ q: "", a: "" }}
                        renderItem={(item, i) => (
                            <div className="space-y-2">
                                <input className="w-full p-2 border rounded text-sm font-bold" placeholder="Question" value={item.q || ''} onChange={e => updateItemField('content.faq', i, 'q', e.target.value)} />
                                <textarea className="w-full p-2 border rounded text-sm" placeholder="Answer" value={item.a || ''} onChange={e => updateItemField('content.faq', i, 'a', e.target.value)} />
                            </div>
                        )} />
                </div>
                <div className="border-t pt-4">
                    <label className="text-xs font-bold text-slate-400 block mb-2">BOTTOM CTA</label>
                    <input className={inputStyle} placeholder="CTA Title (e.g. Launch Your Job Portal)" value={content.cta?.title || ''} onChange={e => updateField('content.cta.title', e.target.value)} />
                </div>
            </SectionWrapper>

        </div>
    );
}