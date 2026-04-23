import React from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';
import {
    Smartphone, Layout, Database, Code, Settings, Zap,
    BarChart3, ShieldCheck, DollarSign, Plus, X, Trash2,
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare, Globe, Search,
    Image as ImageIcon, TrendingUp, Layers, BookOpen
} from "lucide-react";

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block";

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

// --- 3. MAIN SERVICE EDITOR ---
export default function ServiceEditor({ formData, updateField, MediaInput, TipTapEditor, activeSections, portfolioCategories }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Hero Title" value={content.heroTitle || ''} onChange={e => updateField('content.heroTitle', e.target.value)} />
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.heroSubtitle || ''} onChange={val => updateField('content.heroSubtitle', val)} />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Button Text</label>
                        <input className={inputStyle} placeholder="Let’s Work Together" value={content.heroButtonText || ''} onChange={e => updateField('content.heroButtonText', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Button Link</label>
                        <input className={inputStyle} placeholder="/contact" value={content.heroButtonLink || ''} onChange={e => updateField('content.heroButtonLink', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className={labelStyle}>Trusted By Text</label>
                    <input className={inputStyle} placeholder="Trusted By Leading Brands" value={content.trustedByText || ''} onChange={e => updateField('content.trustedByText', e.target.value)} />
                </div>
                <MediaInput label="Hero Background Image" value={content.heroBg} path="content.heroBg" />
            </SectionWrapper>

            {/* 2. STATISTICS */}
            <SectionWrapper id="stats" icon={BarChart3} title="2. Statistics Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className={labelStyle}>Primary Metrics</label>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className={labelStyle}>Years Value</label>
                                <input className={inputStyle} placeholder="6+" value={content.stats?.years || ''} onChange={e => updateField('content.stats.years', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Years Label</label>
                                <input className={inputStyle} placeholder="Experience" value={content.stats?.yearsLabel || ''} onChange={e => updateField('content.stats.yearsLabel', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className={labelStyle}>Projects Value</label>
                                <input className={inputStyle} placeholder="400+" value={content.stats?.projects || ''} onChange={e => updateField('content.stats.projects', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Projects Label</label>
                                <input className={inputStyle} placeholder="Completed" value={content.stats?.projectsLabel || ''} onChange={e => updateField('content.stats.projectsLabel', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className={labelStyle}>Team Value</label>
                                <input className={inputStyle} placeholder="50+" value={content.stats?.team || ''} onChange={e => updateField('content.stats.team', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Team Label</label>
                                <input className={inputStyle} placeholder="Experts" value={content.stats?.teamLabel || ''} onChange={e => updateField('content.stats.teamLabel', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className={labelStyle}>Rating Value</label>
                                <input className={inputStyle} placeholder="5.0" value={content.stats?.rating || ''} onChange={e => updateField('content.stats.rating', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Rating Label</label>
                                <input className={inputStyle} placeholder="Client Rating" value={content.stats?.ratingLabel || ''} onChange={e => updateField('content.stats.ratingLabel', e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Images removed as per request */}
                    </div>
                </div>
            </SectionWrapper>

            {/* 3. AWARDS SECTION */}
            <SectionWrapper id="awards" icon={Award} title="3. Awards Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Title (e.g. Our)" value={content.awards?.title || ''} onChange={e => updateField('content.awards.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Gradient Text (e.g. Awards & Recognitions)" value={content.awards?.gradientText || ''} onChange={e => updateField('content.awards.gradientText', e.target.value)} />
                </div>
                <textarea className={inputStyle} rows={2} placeholder="Section Subtitle" value={content.awards?.subtitle || ''} onChange={e => updateField('content.awards.subtitle', e.target.value)} />

                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className={labelStyle}>Award Items</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(content.awards?.items || []).map((award, i) => (
                            <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
                                <button type="button" onClick={() => updateField('content.awards.items', (prev) => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 text-rose-500 hover:bg-rose-50 p-1 rounded-lg"><X size={14} /></button>
                                <MediaInput label="Award Image" value={award.image} path={`content.awards.items.${i}.image`} />
                                <input className={inputStyle} placeholder="Alt Text" value={award.alt || ''} onChange={e => updateField(`content.awards.items.${i}.alt`, e.target.value)} />
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.awards.items', (prev) => [...(prev || []), { image: "", alt: "" }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                        <Plus size={20} /> Add Award
                    </button>
                </div>
            </SectionWrapper>

            {/* 4. SERVICE CATEGORIES */}
            <SectionWrapper id="services" icon={Layout} title="4. Service Categories (Tabs Layout)" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Title" value={content.services?.title || ''} onChange={e => updateField('content.services.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Section Subtitle" value={content.services?.subtitle || ''} onChange={e => updateField('content.services.subtitle', e.target.value)} />
                </div>

                <div className="space-y-8">
                    {(content.services?.categories || []).map((cat, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                            <button type="button" onClick={() => updateField('content.services.categories', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"><X size={20} /></button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelStyle}>Sidebar Small Title</label>
                                    <input className={inputStyle} placeholder="e.g. AI-Driven Apps" value={cat.shortTitle || ''} onChange={e => updateField(`content.services.categories.${i}.shortTitle`, e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelStyle}>Sidebar Small Desc</label>
                                    <input className={inputStyle} placeholder="e.g. Architect Smart Products" value={cat.shortDesc || ''} onChange={e => updateField(`content.services.categories.${i}.shortDesc`, e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelStyle}>Full Content Title</label>
                                <input className={inputStyle} placeholder="e.g. Your Partner in AI Engineering" value={cat.fullTitle || ''} onChange={e => updateField(`content.services.categories.${i}.fullTitle`, e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <label className={labelStyle}>Full Content Description (Rich Text)</label>
                                <MiniRichTextEditor value={cat.fullDesc || ''} onChange={val => updateField(`content.services.categories.${i}.fullDesc`, val)} />
                            </div>

                            {/* Expertise Nested List */}
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100">
                                <label className={labelStyle}>Certified Tech Expertise</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(cat.expertise || []).map((exp, j) => (
                                        <div key={j} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                            <input className="w-20 p-1.5 bg-white border rounded text-[10px]" placeholder="Icon" value={exp.iconName || ''} onChange={e => updateField(`content.services.categories.${i}.expertise.${j}.iconName`, e.target.value)} />
                                            <input className="flex-1 p-1.5 bg-white border rounded text-[10px]" placeholder="Label" value={exp.label || ''} onChange={e => updateField(`content.services.categories.${i}.expertise.${j}.label`, e.target.value)} />
                                            <button type="button" onClick={() => updateField(`content.services.categories.${i}.expertise`, (prev) => prev.filter((_, idx) => idx !== j))}><X size={12} className="text-slate-400" /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.services.categories.${i}.expertise`, (prev) => [...(prev || []), { iconName: "FaRobot", label: "" }])} className="text-[10px] font-black text-sky-600 border border-dashed border-sky-200 rounded-lg p-2">+ Add Expertise</button>
                                </div>
                            </div>

                            {/* Products Nested List */}
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100">
                                <label className={labelStyle}>Advanced Product Suite</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(cat.products || []).map((prod, j) => (
                                        <div key={j} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200 relative">
                                            <button type="button" onClick={() => updateField(`content.services.categories.${i}.products`, (prev) => prev.filter((_, idx) => idx !== j))} className="absolute top-1 right-1 text-slate-300"><X size={12} /></button>
                                            <input className="w-full p-1.5 bg-white border rounded text-[10px]" placeholder="Product Name" value={prod.name || ''} onChange={e => updateField(`content.services.categories.${i}.products.${j}.name`, e.target.value)} />
                                            <MediaInput label="Logo" value={prod.image} path={`content.services.categories.${i}.products.${j}.image`} />
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.services.categories.${i}.products`, (prev) => [...(prev || []), { name: "", image: "" }])} className="text-[10px] font-black text-sky-600 border border-dashed border-sky-200 rounded-lg p-2">+ Add Product</button>
                                </div>
                            </div>

                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.services.categories', (prev) => [...(prev || []), { shortTitle: "", shortDesc: "", fullTitle: "", fullDesc: "", expertise: [], products: [] }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                        <Plus size={20} /> Add New Service Category
                    </button>
                </div>
            </SectionWrapper>

            {/* 5. CONSULTATION CTA */}
            <SectionWrapper id="consultation" icon={TrendingUp} title="5. Consultation CTA" activeSections={activeSections}>
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

            {/* 6. TECH STACK (TABBED) */}
            <SectionWrapper id="tech" icon={Code} title="6. Tech Stack (Tabbed)" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Section Title" value={content.techStack?.title || ''} onChange={e => updateField('content.techStack.title', e.target.value)} />
                        <input className={inputStyle} placeholder="Gradient Highlight" value={content.techStack?.highlight || ''} onChange={e => updateField('content.techStack.highlight', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.techStack?.subtitle || ''} onChange={val => updateField('content.techStack.subtitle', val)} />
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
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {(tab.items || []).map((item, j) => (
                                                <div key={j} className="bg-white p-3 rounded-lg border border-slate-200 relative group/tech">
                                                    <input className="w-full p-2 bg-slate-50 border border-slate-100 rounded text-xs font-bold mb-2" placeholder="Tech Name" value={item.name || ''} onChange={e => updateField(`content.techStack.tabs.${i}.items.${j}.name`, e.target.value)} />
                                                    <MediaInput label="Icon" value={item.image} path={`content.techStack.tabs.${i}.items.${j}.image`} />
                                                    <button type="button" onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => (prev || []).filter((_, idx) => idx !== j))} className="absolute top-1 right-1 text-slate-200 hover:text-rose-500 opacity-0 group-hover/tech:opacity-100 transition-opacity"><X size={14} /></button>
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => [...(prev || []), { name: "", image: "" }])} className="mt-4 text-[10px] font-bold text-sky-600 uppercase">+ Add Tech Item</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => updateField('content.techStack.tabs', (prev) => [...(prev || []), { label: "", items: [] }])} className="mt-4 w-full py-3 border-2 border-dashed border-sky-200 rounded-xl text-sky-600 font-bold uppercase tracking-tight">+ Add Tech Category</button>
                    </div>
                </div>
            </SectionWrapper>

            {/* 7. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="7. Our Process" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Title" value={content.process?.title || ''} onChange={e => updateField('content.process.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Section Subtitle" value={content.process?.subtitle || ''} onChange={e => updateField('content.process.subtitle', e.target.value)} />
                </div>
                <div className="space-y-4">
                    {(content.process?.items || []).map((step, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 relative">
                            <button type="button" onClick={() => updateField('content.process.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500"><X size={18} /></button>

                            <div className="flex gap-4 items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                                <input className={inputStyle} placeholder="Step Title" value={step.title || ''} onChange={e => updateField(`content.process.items.${i}.title`, e.target.value)} />
                            </div>

                            <textarea className={inputStyle} placeholder="Step Description" value={step.description || ''} onChange={e => updateField(`content.process.items.${i}.description`, e.target.value)} />

                            {/* Bullets List */}
                            <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
                                <label className={labelStyle}>Features / Details (Bullets)</label>
                                <div className="space-y-2">
                                    {(step.bullets || []).map((bullet, j) => (
                                        <div key={j} className="flex gap-2 items-center">
                                            <input className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded text-xs" placeholder="e.g. Competitive Analysis" value={bullet || ''} onChange={e => updateField(`content.process.items.${i}.bullets.${j}`, e.target.value)} />
                                            <button type="button" onClick={() => updateField(`content.process.items.${i}.bullets`, (prev) => prev.filter((_, idx) => idx !== j))}><X size={14} className="text-slate-300" /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.process.items.${i}.bullets`, (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Detail Bullet</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.process.items', (prev) => [...(prev || []), { title: "", description: "", bullets: [] }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-sky-600 font-bold uppercase tracking-tight">+ Add Process Step</button>
                </div>
            </SectionWrapper>

            {/* 8. SOLUTION HIGHLIGHT */}
            <SectionWrapper id="highlight" icon={Zap} title="8. Solution Highlight (Mockup Design)" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="Section Title" value={content.highlight?.title || ''} onChange={e => updateField('content.highlight.title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.highlight?.subtitle || ''} onChange={val => updateField('content.highlight.subtitle', val)} />
                    </div>
                </div>

                <div className="space-y-6">
                    {(content.highlight?.tabs || []).map((tab, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                            <button type="button" onClick={() => updateField('content.highlight.tabs', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"><X size={20} /></button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelStyle}>Tab Label</label>
                                    <input className={inputStyle} placeholder="e.g. AI Predictions" value={tab.label || ''} onChange={e => updateField(`content.highlight.tabs.${i}.label`, e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelStyle}>Tab Icon (FaIcon Name)</label>
                                    <input className={inputStyle} placeholder="e.g. FaRobot" value={tab.iconName || ''} onChange={e => updateField(`content.highlight.tabs.${i}.iconName`, e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelStyle}>Tab Description (Rich Text)</label>
                                <MiniRichTextEditor value={tab.description || ''} onChange={val => updateField(`content.highlight.tabs.${i}.description`, val)} />
                            </div>

                            <div className="space-y-2">
                                <label className={labelStyle}>Full Content Title</label>
                                <input className={inputStyle} placeholder="e.g. AI Powered Intelligent Predictions" value={tab.fullTitle || ''} onChange={e => updateField(`content.highlight.tabs.${i}.fullTitle`, e.target.value)} />
                            </div>

                            {/* Features List */}
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100">
                                <label className={labelStyle}>Feature Points</label>
                                <div className="space-y-2">
                                    {(tab.features || []).map((feature, j) => (
                                        <div key={j} className="flex gap-2 items-center">
                                            <input className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded text-xs" placeholder="e.g. High precision models" value={feature || ''} onChange={e => updateField(`content.highlight.tabs.${i}.features.${j}`, e.target.value)} />
                                            <button type="button" onClick={() => updateField(`content.highlight.tabs.${i}.features`, (prev) => prev.filter((_, idx) => idx !== j))}><X size={14} className="text-slate-300" /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.highlight.tabs.${i}.features`, (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Feature</button>
                                </div>
                            </div>

                            {/* Bottom Icons Row */}
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100">
                                <label className={labelStyle}>Bottom Icons Row (Icons + Labels)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(tab.icons || []).map((iconObj, j) => (
                                        <div key={j} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                            <input className="w-20 p-1.5 bg-white border rounded text-[10px]" placeholder="Icon Name" value={iconObj.iconName || ''} onChange={e => updateField(`content.highlight.tabs.${i}.icons.${j}.iconName`, e.target.value)} />
                                            <input className="flex-1 p-1.5 bg-white border rounded text-[10px]" placeholder="Label" value={iconObj.label || ''} onChange={e => updateField(`content.highlight.tabs.${i}.icons.${j}.label`, e.target.value)} />
                                            <button type="button" onClick={() => updateField(`content.highlight.tabs.${i}.icons`, (prev) => prev.filter((_, idx) => idx !== j))}><X size={12} className="text-slate-400" /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.highlight.tabs.${i}.icons`, (prev) => [...(prev || []), { iconName: "FaRobot", label: "" }])} className="text-[10px] font-black text-sky-600 border border-dashed border-sky-200 rounded-lg p-2">+ Add Icon</button>
                                </div>
                            </div>

                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.highlight.tabs', (prev) => [...(prev || []), { label: "", iconName: "FaRobot", fullTitle: "", features: [], icons: [] }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                        <Plus size={20} /> Add New Tab
                    </button>
                </div>
            </SectionWrapper>

            {/* 9. PORTFOLIO */}
            <SectionWrapper id="portfolio" icon={Globe} title="9. Portfolio Section" activeSections={activeSections}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Section Title" value={content.portfolioTitle || ''} onChange={e => updateField('content.portfolioTitle', e.target.value)} />
                        <div className="space-y-1">
                            <label className={labelStyle}>Category Filter (Slug)</label>
                            <select
                                className={inputStyle}
                                value={content.portfolioCategory || ''}
                                onChange={e => updateField('content.portfolioCategory', e.target.value)}
                            >
                                <option value="">Default (Page Slug)</option>
                                {portfolioCategories?.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <textarea className={inputStyle} rows={2} placeholder="Section Subtitle" value={content.portfolioSubtitle || ''} onChange={e => updateField('content.portfolioSubtitle', e.target.value)} />
                    <p className="text-[10px] text-slate-400">Leave category blank → uses the page slug by default.</p>
                </div>
            </SectionWrapper>

            {/* 10. INDUSTRY SOLUTIONS */}
            <SectionWrapper id="solutions" icon={Zap} title="10. Industry Solutions (Grid)" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="Section Title" value={content.solutions?.title || ''} onChange={e => updateField('content.solutions.title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.solutions?.subtitle || ''} onChange={val => updateField('content.solutions.subtitle', val)} />
                    </div>
                </div>

                <div className="space-y-6">
                    {(content.solutions?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                            <button type="button" onClick={() => updateField('content.solutions.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"><X size={20} /></button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Item Title</label>
                                        <input className={inputStyle} placeholder="e.g. LGBTQ+ Dating Apps" value={item.itemTitle || ''} onChange={e => updateField(`content.solutions.items.${i}.itemTitle`, e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Item Description (Rich Text)</label>
                                        <MiniRichTextEditor value={item.itemDesc || ''} onChange={val => updateField(`content.solutions.items.${i}.itemDesc`, val)} />
                                    </div>

                                    {/* Sub-points for this solution */}
                                    <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-2">
                                        <label className={labelStyle}>Success Points / Features</label>
                                        {(item.points || []).map((point, j) => (
                                            <div key={j} className="flex gap-2">
                                                <input className="flex-1 p-1.5 bg-slate-50 border rounded text-[10px]" placeholder="Feature point..." value={point || ''} onChange={e => updateField(`content.solutions.items.${i}.points.${j}`, e.target.value)} />
                                                <button type="button" onClick={() => updateField(`content.solutions.items.${i}.points`, (prev) => prev.filter((_, idx) => idx !== j))}><X size={12} className="text-slate-300" /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => updateField(`content.solutions.items.${i}.points`, (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Point</button>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Button Link</label>
                                        <input className={inputStyle} placeholder="/contact or url" value={item.buttonLink || ''} onChange={e => updateField(`content.solutions.items.${i}.buttonLink`, e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <MediaInput label="Background Image" value={item.itemImage} path={`content.solutions.items.${i}.itemImage`} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.solutions.items', (prev) => [...(prev || []), { itemTitle: "", itemDesc: "", itemImage: "", points: [], buttonLink: "" }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                        <Plus size={20} /> Add Solution Card
                    </button>
                </div>
            </SectionWrapper>

            {/* 11. INDUSTRIES WE SERVE */}
            <SectionWrapper id="industries" icon={Layers} title="11. Industries We Serve (Slider)" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="Section Title" value={content.industrySection?.title || ''} onChange={e => updateField('content.industrySection.title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.industrySection?.subtitle || ''} onChange={val => updateField('content.industrySection.subtitle', val)} />
                    </div>
                </div>

                <div className="space-y-6">
                    {(content.industrySection?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                            <button type="button" onClick={() => updateField('content.industrySection.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"><X size={20} /></button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Industry Title</label>
                                        <input className={inputStyle} placeholder="e.g. Healthcare" value={item.itemTitle || ''} onChange={e => updateField(`content.industrySection.items.${i}.itemTitle`, e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Industry Description (Rich Text)</label>
                                        <MiniRichTextEditor value={item.itemDesc || ''} onChange={val => updateField(`content.industrySection.items.${i}.itemDesc`, val)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Industry Features (Points)</label>
                                        <div className="space-y-2">
                                            {(item.itemPoints || []).map((point, j) => (
                                                <div key={j} className="flex gap-2">
                                                    <input className="flex-1 p-2 bg-white border rounded text-xs" value={point || ''} onChange={e => updateField(`content.industrySection.items.${i}.itemPoints.${j}`, e.target.value)} />
                                                    <button type="button" onClick={() => updateField(`content.industrySection.items.${i}.itemPoints`, (prev) => (prev || []).filter((_, idx) => idx !== j))} className="text-rose-500 hover:bg-rose-50 p-1 rounded"><X size={14} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => updateField(`content.industrySection.items.${i}.itemPoints`, (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600 p-1">+ Add Point</button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Button Link (Slug)</label>
                                        <input className={inputStyle} placeholder="e.g. ecommerce" value={item.buttonLink || ''} onChange={e => updateField(`content.industrySection.items.${i}.buttonLink`, e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <MediaInput label="Background Image" value={item.itemImage} path={`content.industrySection.items.${i}.itemImage`} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.industrySection.items', (prev) => [...(prev || []), { itemTitle: "", itemDesc: "", itemImage: "" }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                        <Plus size={20} /> Add Industry Card
                    </button>
                </div>
            </SectionWrapper>

            {/* 12. USER GUIDE */}
            <SectionWrapper id="user-guide" icon={BookOpen} title="12. User Guide" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="Section Main Title" value={content.userGuide?.title || ''} onChange={e => updateField('content.userGuide.title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.userGuide?.subtitle || ''} onChange={val => updateField('content.userGuide.subtitle', val)} />
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <button
                        type="button"
                        onClick={() => updateField('content.userGuide.mode', 'structured')}
                        className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${content.userGuide?.mode !== 'rich' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        Structured Layout
                    </button>
                    <button
                        type="button"
                        onClick={() => updateField('content.userGuide.mode', 'rich')}
                        className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${content.userGuide?.mode === 'rich' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        Rich Text Editor
                    </button>
                </div>

                {content.userGuide?.mode === 'rich' ? (
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            <TipTapEditor
                                value={content.userGuide?.richContent || ''}
                                onChange={(val) => updateField('content.userGuide.richContent', val)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {(content.userGuide?.sections || []).map((section, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                                <button type="button" onClick={() => updateField('content.userGuide.sections', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"><X size={20} /></button>

                                <div className="space-y-2">
                                    <label className={labelStyle}>Tab Title</label>
                                    <input className={inputStyle} placeholder="e.g. What is App Development?" value={section.title || ''} onChange={e => updateField(`content.userGuide.sections.${i}.title`, e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <label className={labelStyle}>Intro Description</label>
                                    <textarea className={inputStyle} rows={3} placeholder="Intro text for this tab..." value={section.description || ''} onChange={e => updateField(`content.userGuide.sections.${i}.description`, e.target.value)} />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-200">
                                    <label className={labelStyle}>Sub-sections</label>
                                    {(section.subSections || []).map((sub, j) => (
                                        <div key={j} className="bg-white p-4 rounded-xl border border-slate-100 space-y-3 relative group/sub">
                                            <button type="button" onClick={() => updateField(`content.userGuide.sections.${i}.subSections`, (prev) => prev.filter((_, idx) => idx !== j))} className="absolute top-2 right-2 text-slate-200 hover:text-rose-500 opacity-0 group-hover/sub:opacity-100 transition-opacity"><X size={14} /></button>

                                            <input className={inputStyle} placeholder="Sub-section Title (e.g. Idea Generation)" value={sub.title || ''} onChange={e => updateField(`content.userGuide.sections.${i}.subSections.${j}.title`, e.target.value)} />

                                            <div className="space-y-2">
                                                <label className={labelStyle}>Bullet Points</label>
                                                {(sub.bullets || []).map((bullet, k) => (
                                                    <div key={k} className="flex gap-2 items-center">
                                                        <input className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded text-xs" placeholder="Add a point..." value={bullet || ''} onChange={e => updateField(`content.userGuide.sections.${i}.subSections.${j}.bullets.${k}`, e.target.value)} />
                                                        <button type="button" onClick={() => updateField(`content.userGuide.sections.${i}.subSections.${j}.bullets`, (prev) => prev.filter((_, idx) => idx !== k))}><X size={14} className="text-slate-300" /></button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => updateField(`content.userGuide.sections.${i}.subSections.${j}.bullets`, (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Bullet</button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => updateField(`content.userGuide.sections.${i}.subSections`, (prev) => [...(prev || []), { title: "", bullets: [] }])} className="text-[10px] font-black text-sky-600 border border-dashed border-sky-200 rounded-lg p-2 w-full">+ Add Sub-section</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => updateField('content.userGuide.sections', (prev) => [...(prev || []), { title: "", description: "", subSections: [] }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                            <Plus size={20} /> Add User Guide Tab
                        </button>
                    </div>
                )}
            </SectionWrapper>

            {/* 13. FAQ Section */}
            <SectionWrapper id="faq" icon={HelpCircle} title="13. FAQ Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Title</label>
                        <input className={inputStyle} placeholder="Section Title" value={content.faq?.title || ''} onChange={e => updateField('content.faq.title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Section Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.faq?.subtitle || ''} onChange={val => updateField('content.faq.subtitle', val)} />
                    </div>
                </div>
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

            {/* 14. BLOG SECTION */}
            <SectionWrapper id="blogs" icon={MessageSquare} title="14. Blog Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={labelStyle}>Blog Section Title</label>
                        <input className={inputStyle} placeholder="e.g. Latest Blogs" value={content.blogTitle || ''} onChange={e => updateField('content.blogTitle', e.target.value)} />
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



            {/* 15. INQUIRY SECTION */}
            <SectionWrapper id="inquiry" icon={MessageSquare} title="15. Inquiry Section" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Tagline (e.g. GET IN TOUCH)" value={content.inquiry?.tagline || ''} onChange={e => updateField('content.inquiry.tagline', e.target.value)} />
                    <input className={inputStyle} placeholder="Title Prefix (e.g. Let's )" value={content.inquiry?.titlePrefix || ''} onChange={e => updateField('content.inquiry.titlePrefix', e.target.value)} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <input className={inputStyle} placeholder="Main Title (e.g. Connect)" value={content.inquiry?.title || ''} onChange={e => updateField('content.inquiry.title', e.target.value)} />
                    <textarea className={inputStyle} rows={2} placeholder="Description/Subtitle" value={content.inquiry?.subtitle || ''} onChange={e => updateField('content.inquiry.subtitle', e.target.value)} />
                </div>
            </SectionWrapper>

            {/* 16. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="16. SEO Settings" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="SEO Title" value={formData.seoTitle || ''} onChange={e => updateField('seoTitle', e.target.value)} />
                    <textarea className={inputStyle} rows={3} placeholder="SEO Description" value={formData.seoDescription || ''} onChange={e => updateField('seoDescription', e.target.value)} />
                    <MediaInput label="SEO Image (OpenGraph)" value={formData.seoImage} path="seoImage" />
                </div>
            </SectionWrapper>

        </div>
    );
}
