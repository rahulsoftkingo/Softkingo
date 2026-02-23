import React from 'react';
import {
    Smartphone, Layout, Database, Code, Settings, Zap,
    BarChart3, ShieldCheck, DollarSign, Plus, X,
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

// --- 3. MAIN CLONE EDITOR ---
export default function CloneEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Clone Hero Section" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="Page Title (e.g. Build Your Own Uber Clone)" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                    <textarea className={inputStyle} rows={3} placeholder="Hero Subtitle / Description" value={content.hero?.subtitle || ''} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
                    <MediaInput label="Hero Banner Image" value={content.hero?.image} path="content.hero.image" />
                </div>
            </SectionWrapper>

            {/* 2. ABOUT SECTION */}
            <SectionWrapper id="about" icon={Layout} title="2. About the Clone Solution" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="Section Heading" value={content.about?.title || ''} onChange={e => updateField('content.about.title', e.target.value)} />
                    <textarea className={inputStyle} rows={4} placeholder="Detailed Product Overview" value={content.about?.description || ''} onChange={e => updateField('content.about.description', e.target.value)} />
                    <MediaInput label="Product Showcase Image" value={content.about?.image} path="content.about.image" />
                </div>
            </SectionWrapper>

            {/* 3. WHY BUILD SECTION */}
            <SectionWrapper id="whyBuild" icon={Target} title="3. Business Value / Why Build" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Main Heading" value={content.whyBuild?.title || ''} onChange={e => updateField('content.whyBuild.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Sub Heading" value={content.whyBuild?.subtitle || ''} onChange={e => updateField('content.whyBuild.subtitle', e.target.value)} />
                </div>
                <div className="space-y-4 pt-2">
                    <label className={labelStyle}>Value Points (Cards)</label>
                    {(content.whyBuild?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                            <button type="button" onClick={() => updateField('content.whyBuild.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-slate-300 hover:text-rose-500 transition-colors"><X size={18} /></button>
                            <div className="space-y-3">
                                <input className="w-full p-2 bg-white border border-slate-200 rounded text-sm font-bold" placeholder="Point Title" value={item.title || ''} onChange={e => updateField(`content.whyBuild.items.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border border-slate-200 rounded text-sm" rows={2} placeholder="Brief Description" value={item.description || ''} onChange={e => updateField(`content.whyBuild.items.${i}.description`, e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.whyBuild.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors px-1 tracking-tight uppercase">
                        <Plus size={14} /> Add Value Point
                    </button>
                </div>
            </SectionWrapper>

            {/* 4. SERVICES / MODULES SECTION */}
            <SectionWrapper id="services" icon={Briefcase} title="4. Core App Modules Included" activeSections={activeSections}>
                <div className="space-y-4">
                    <label className={labelStyle}>Included Apps & Panels (e.g. Android Customer App)</label>
                    <div className="grid md:grid-cols-2 gap-3">
                        {(content.services?.items || []).map((item, i) => (
                            <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <input className="flex-1 p-2 bg-white border border-slate-200 rounded text-xs font-bold" placeholder="App/Panel Name" value={item.title || ''} onChange={e => updateField(`content.services.items.${i}.title`, e.target.value)} />
                                <button type="button" onClick={() => updateField('content.services.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500"><X size={16} /></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.services.items', (prev) => [...(prev || []), { title: "" }])} className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:text-orange-700">+ Add New Module</button>
                </div>
            </SectionWrapper>

            {/* 5. APP FEATURES (MULTI-TIER) SECTION */}
            <SectionWrapper id="appFeatures" icon={Grid} title="5. App Modules & Features" activeSections={activeSections}>
                <div className="space-y-8">
                    {/* User Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-orange-100 pb-2">
                            <Users size={16} className="text-orange-600" />
                            <h4 className="text-sm font-bold text-slate-800 tracking-tight">User / Customer Application</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {(content.appFeatures?.user?.items || []).map((item, i) => (
                                <div key={i} className="flex gap-3 items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm hover:border-orange-200 transition-colors">
                                    <input className="flex-1 text-xs outline-none bg-transparent" placeholder="User Feature (e.g. Login via OTP)" value={item.title || ''} onChange={e => updateField(`content.appFeatures.user.items.${i}.title`, e.target.value)} />
                                    <button type="button" onClick={() => updateField('content.appFeatures.user.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500 transition-colors"><X size={14} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => updateField('content.appFeatures.user.items', (prev) => [...(prev || []), { title: "" }])} className="h-10 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-[11px] font-bold text-slate-400 hover:border-orange-200 hover:text-orange-600 transition-all bg-slate-50/50">+ Add Feature</button>
                        </div>
                    </div>

                    {/* Vendor / Professional Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-orange-100 pb-2">
                            <Briefcase size={16} className="text-orange-600" />
                            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Vendor / Driver Application</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {(content.appFeatures?.vendor?.items || []).map((item, i) => (
                                <div key={i} className="flex gap-3 items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm hover:border-orange-200 transition-colors">
                                    <input className="flex-1 text-xs outline-none bg-transparent" placeholder="Vendor Feature (e.g. Dynamic Pricing)" value={item.title || ''} onChange={e => updateField(`content.appFeatures.vendor.items.${i}.title`, e.target.value)} />
                                    <button type="button" onClick={() => updateField('content.appFeatures.vendor.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500 transition-colors"><X size={14} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => updateField('content.appFeatures.vendor.items', (prev) => [...(prev || []), { title: "" }])} className="h-10 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-[11px] font-bold text-slate-400 hover:border-orange-200 hover:text-orange-600 transition-all bg-slate-50/50">+ Add Feature</button>
                        </div>
                    </div>

                    {/* Admin Dashboard Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-orange-100 pb-2">
                            <Settings size={16} className="text-orange-600" />
                            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Master Admin Control Panel</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {(content.appFeatures?.admin?.items || []).map((item, i) => (
                                <div key={i} className="flex gap-3 items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm hover:border-orange-200 transition-colors">
                                    <input className="flex-1 text-xs outline-none bg-transparent" placeholder="Admin Feature (e.g. Earnings Reporting)" value={item.title || ''} onChange={e => updateField(`content.appFeatures.admin.items.${i}.title`, e.target.value)} />
                                    <button type="button" onClick={() => updateField('content.appFeatures.admin.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500 transition-colors"><X size={14} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => updateField('content.appFeatures.admin.items', (prev) => [...(prev || []), { title: "" }])} className="h-10 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-[11px] font-bold text-slate-400 hover:border-orange-200 hover:text-orange-600 transition-all bg-slate-50/50">+ Add Feature</button>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* 6. AI FEATURES SECTION */}
            <SectionWrapper id="aiFeatures" icon={Zap} title="6. Advanced AI Features" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="AI Section Heading (e.g. Smart Integration)" value={content.aiFeatures?.title || ''} onChange={e => updateField('content.aiFeatures.title', e.target.value)} />
                    <input className={inputStyle} placeholder="AI Subtitle" value={content.aiFeatures?.subtitle || ''} onChange={e => updateField('content.aiFeatures.subtitle', e.target.value)} />
                </div>
                <div className="space-y-4 pt-2">
                    <label className={labelStyle}>AI Capabilities (Cards)</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {(content.aiFeatures?.items || []).map((item, i) => (
                            <div key={i} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200 relative group hover:border-orange-200 transition-colors">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-orange-600 shadow-sm"><Zap size={16} /></div>
                                <div className="flex-1 space-y-2">
                                    <input className="w-full p-2 bg-white border border-slate-200 rounded text-sm font-bold" placeholder="AI Feature Title" value={item.title || ''} onChange={e => updateField(`content.aiFeatures.items.${i}.title`, e.target.value)} />
                                    <textarea className="w-full p-2 bg-white border border-slate-200 rounded text-sm" rows={2} placeholder="Impact / Description" value={item.description || ''} onChange={e => updateField(`content.aiFeatures.items.${i}.description`, e.target.value)} />
                                </div>
                                <button type="button" onClick={() => updateField('content.aiFeatures.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><X size={18} /></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.aiFeatures.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 py-2 px-4 rounded-lg border border-dashed border-orange-200 w-full text-center">+ Add AI Feature</button>
                </div>
            </SectionWrapper>

            {/* 7. TECH STACK SECTION */}
            <SectionWrapper id="techStack" icon={Code} title="7. Modern Technology Stack" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Tech Stack Overview Title (e.g. Scalable Tech for Modern Apps)" value={content.techStack?.title || ''} onChange={e => updateField('content.techStack.title', e.target.value)} />
                <div className="space-y-4 pt-2">
                    <label className={labelStyle}>Programming Languages & Frameworks</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {(content.techStack?.items || []).map((item, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3 group hover:border-orange-200 transition-colors">
                                <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                                    <input className="flex-1 p-1 bg-transparent border-none text-xs font-bold outline-none" placeholder="Tech Name (e.g. Node.js)" value={item.name || ''} onChange={e => updateField(`content.techStack.items.${i}.name`, e.target.value)} />
                                    <button type="button" onClick={() => updateField('content.techStack.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-200 hover:text-rose-500 transition-colors"><X size={16} /></button>
                                </div>
                                <MediaInput label="Tech Icon / Logo" value={item.image} path={`content.techStack.items.${i}.image`} />
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.techStack.items', (prev) => [...(prev || []), { name: "", image: "" }])} className="text-[10px] font-black text-orange-600 tracking-widest hover:text-orange-700 bg-white py-3 border-2 border-dashed border-slate-100 rounded-xl w-full transition-all hover:border-orange-200 uppercase">+ Add New Technology</button>
                </div>
            </SectionWrapper>

            {/* 8. REVENUE SECTION */}
            <SectionWrapper id="revenue" icon={DollarSign} title="8. Monetization / Revenue Models" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Heading" value={content.revenue?.title || ''} onChange={e => updateField('content.revenue.title', e.target.value)} />
                <div className="space-y-4 pt-2">
                    <label className={labelStyle}>Earning Pathways</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {(content.revenue?.items || []).map((item, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative">
                                <button type="button" onClick={() => updateField('content.revenue.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-slate-300 hover:text-rose-500"><X size={18} /></button>
                                <input className="w-full p-2 bg-white border border-slate-200 rounded text-sm font-bold" placeholder="Model Title" value={item.title || ''} onChange={e => updateField(`content.revenue.items.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border border-slate-200 rounded text-sm" rows={2} placeholder="Strategy Explanation" value={item.description || ''} onChange={e => updateField(`content.revenue.items.${i}.description`, e.target.value)} />
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.revenue.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-orange-600">+ Add Monetization Model</button>
                </div>
            </SectionWrapper>

            {/* 9. MARKET APPLICABILITY / INDUSTRIES SECTION */}
            <SectionWrapper id="portfolio" icon={Globe} title="9. Market Applicability / Industries" activeSections={activeSections}>
                <p className="text-[11px] text-slate-400 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">Select or add industries where this clone script can be successfully deployed.</p>
                <div className="grid md:grid-cols-3 gap-3">
                    {(content.portfolio?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-orange-300 hover:shadow-md group">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-125 transition-transform"></div>
                            <input className="flex-1 text-xs outline-none bg-transparent font-medium" placeholder="Industry Name" value={item.title || ''} onChange={e => updateField(`content.portfolio.items.${i}.title`, e.target.value)} />
                            <button type="button" onClick={() => updateField('content.portfolio.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-200 hover:text-rose-500 transition-colors"><X size={14} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.portfolio.items', (prev) => [...(prev || []), { title: "" }])} className="border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-400 hover:border-orange-200 hover:text-orange-600 h-11 transition-all bg-slate-50/30">+ Add Industry</button>
                </div>
            </SectionWrapper>

            {/* 10. PROCESS SECTION */}
            <SectionWrapper id="process" icon={Settings} title="10. Development & Launch Roadmap" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Roadmap Title (e.g. Our Structured Development Path)" value={content.process?.title || ''} onChange={e => updateField('content.process.title', e.target.value)} />
                <div className="space-y-6 pt-6 ml-4 border-l-2 border-slate-100 pl-8 relative">
                    {(content.process?.items || []).map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -left-[45px] top-0 z-10 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-orange-100 border-4 border-white group-hover:scale-110 transition-transform">{i + 1}</div>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 relative group-hover:border-orange-200 transition-colors shadow-sm">
                                <button type="button" onClick={() => updateField('content.process.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><X size={18} /></button>
                                <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Phase Name (e.g. Market Research)" value={item.title || ''} onChange={e => updateField(`content.process.items.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" rows={2} placeholder="Deliverables / Description" value={item.description || ''} onChange={e => updateField(`content.process.items.${i}.description`, e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.process.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-white py-2 px-4 rounded-lg border border-dashed border-orange-200 transition-all hover:bg-orange-50">+ Add Process Step</button>
                </div>
            </SectionWrapper>

            {/* 11. FAQ & CTA SECTION */}
            <SectionWrapper id="faq" icon={HelpCircle} title="11. FAQ & Global Call To Action" activeSections={activeSections}>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className={labelStyle}>Section Heading</label>
                            <input className={inputStyle} placeholder="FAQ Title (e.g. Solutions to your questions)" value={content.faq?.title || ''} onChange={e => updateField('content.faq.title', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyle}>Section Subtitle</label>
                            <input className={inputStyle} placeholder="FAQ Subtitle" value={content.faq?.subtitle || ''} onChange={e => updateField('content.faq.subtitle', e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className={labelStyle}>Individual Questions</label>
                        <div className="space-y-3">
                            {(content.faq?.items || []).map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group hover:border-orange-200 transition-colors">
                                    <button type="button" onClick={() => updateField('content.faq.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><X size={18} /></button>
                                    <div className="space-y-3">
                                        <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold pr-12 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Question Text" value={item.q || ''} onChange={e => updateField(`content.faq.items.${i}.q`, e.target.value)} />
                                        <textarea className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" rows={3} placeholder="Answer Content" value={item.a || ''} onChange={e => updateField(`content.faq.items.${i}.a`, e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.faq.items', (prev) => [...(prev || []), { q: "", a: "" }])} className="text-xs font-bold text-orange-600 uppercase tracking-tight bg-orange-50 py-3 rounded-xl border border-dashed border-orange-200 w-full text-center hover:bg-orange-100 transition-colors">+ Add New FAQ Item</button>
                    </div>

                    <div className="border-t border-slate-100 pt-8 mt-4 bg-orange-50/30 p-6 rounded-2xl border border-dashed border-orange-100">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-orange-600 text-white rounded-lg shadow-lg shadow-orange-100"><TrendingUp size={18} /></div>
                            <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm">Final Call To Action</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className={labelStyle}>CTA Headline</label>
                                <input className={inputStyle} placeholder="e.g. Build Your Future Today" value={content.cta?.title || ''} onChange={e => updateField('content.cta.title', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>CTA Button Text</label>
                                <input className={inputStyle} placeholder="e.g. Get Started Now" value={content.cta?.subtitle || ''} onChange={e => updateField('content.cta.subtitle', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* 12. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="12. SEO Settings" activeSections={['seo', ...(activeSections || [])]}>
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
