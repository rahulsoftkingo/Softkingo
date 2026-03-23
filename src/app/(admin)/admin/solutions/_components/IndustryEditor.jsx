import React from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import { COMMON_TECH } from './TechConstants';
import {
    Smartphone, Layout, Code, Settings, Zap,
    Plus, X, HelpCircle, Briefcase, MessageSquare,
    Users, Layers, Target, CheckCircle2, Search
} from "lucide-react";

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

// --- 2. SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

// --- 3. MAIN INDUSTRY EDITOR ---
export default function IndustryEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Industry Hero Section" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                <div className="space-y-1">
                    <label className={labelStyle}>Hero Description</label>
                    <MiniRichTextEditor value={content.hero?.description || ''} onChange={val => updateField('content.hero.description', val)} />
                </div>
                <MediaInput label="Hero Background Image" value={content.hero?.image} path="content.hero.image" />
            </SectionWrapper>

            {/* 2. CHALLENGES WE SOLVE */}
            <SectionWrapper id="challenges" icon={Target} title="2. Industry Challenges We Solve" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.challenges?.title || ''} onChange={e => updateField('content.challenges.title', e.target.value)} />
                <textarea className={inputStyle} rows={2} placeholder="Subtitle" value={content.challenges?.subtitle || ''} onChange={e => updateField('content.challenges.subtitle', e.target.value)} />

                <div className="border-t border-slate-100 pt-4 mt-2">
                    <MediaInput label="Side Image" value={content.challenges?.image} path="content.challenges.image" />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className={labelStyle}>Floating Stats (3 Items)</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="space-y-1">
                                <input className="w-full p-2 bg-white border rounded text-xs font-bold text-center" placeholder="Value" value={content.challenges?.stats?.[i]?.value || ''} onChange={e => updateField(`content.challenges.stats.${i}.value`, e.target.value)} />
                                <input className="w-full p-2 bg-white border rounded text-xs text-center text-slate-500" placeholder="Label" value={content.challenges?.stats?.[i]?.label || ''} onChange={e => updateField(`content.challenges.stats.${i}.label`, e.target.value)} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className={labelStyle}>Challenges List</label>
                    {(content.challenges?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Challenge Point" value={item.title || ''} onChange={e => updateField(`content.challenges.items.${i}.title`, e.target.value)} />
                            <button type="button" onClick={() => updateField('content.challenges.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.challenges.items', (prev) => [...(prev || []), { title: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Challenge</button>
                </div>
            </SectionWrapper>

            {/* 3. WHAT WE COVER */}
            <SectionWrapper id="covers" icon={Layers} title="3. What Softkingo Covers" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.covers?.title || ''} onChange={e => updateField('content.covers.title', e.target.value)} />
                <div className="space-y-4">
                    <label className={labelStyle}>Service Areas</label>
                    {(content.covers?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Service Title" value={item.title || ''} onChange={e => updateField(`content.covers.items.${i}.title`, e.target.value)} />
                                <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Icon Name / URL" value={item.icon || ''} onChange={e => updateField(`content.covers.items.${i}.icon`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.covers.items.${i}.description`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.covers.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.covers.items', (prev) => [...(prev || []), { title: "", description: "", icon: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Service Area</button>
                </div>
            </SectionWrapper>

            <SectionWrapper id="technologies" icon={Code} title="4. Advanced Technologies We Use" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.technologies?.title || ''} onChange={e => updateField('content.technologies.title', e.target.value)} />
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-dashed border-slate-200">
                        <label className="w-full text-[10px] font-black text-slate-400 uppercase mb-1">Quick Add Common Tech:</label>
                        {COMMON_TECH.map((tech) => (
                            <button 
                                key={tech.name} 
                                type="button" 
                                onClick={() => updateField(`content.technologies.items`, (prev) => [...(prev || []), { ...tech }])}
                                className="p-1 px-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 rounded-md border border-slate-100 text-[10px] font-bold transition-all flex items-center gap-1.5 active:scale-95"
                            >
                                <img src={tech.image} className="w-3.5 h-3.5" alt="" />
                                {tech.name}
                            </button>
                        ))}
                    </div>

                    <label className={labelStyle}>Selected Technologies</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {(content.technologies?.items || []).map((item, i) => (
                            <div key={i} className="flex gap-4 items-center bg-slate-50 p-3 rounded-lg border border-slate-100 relative group/tech">
                                <button type="button" onClick={() => updateField('content.technologies.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover/tech:opacity-100 transition-opacity z-10"><X size={12} /></button>
                                <div className="flex-1">
                                    <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Tech Name" value={item.name || ''} onChange={e => updateField(`content.technologies.items.${i}.name`, e.target.value)} />
                                </div>
                                <div className="w-1/2">
                                    <MediaInput label="Icon" value={item.image} path={`content.technologies.items.${i}.image`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => updateField('content.technologies.items', (prev) => [...(prev || []), { name: "", image: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Custom Tech</button>
                </div>
            </SectionWrapper>

            {/* 5. PORTFOLIO */}
            <SectionWrapper id="portfolio" icon={Layout} title="5. Industry Portfolio" activeSections={activeSections}>
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

            {/* 6. OTHER INDUSTRIES */}
            <SectionWrapper id="otherIndustries" icon={Briefcase} title="6. Other Industries / Sectors" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.otherIndustries?.title || ''} onChange={e => updateField('content.otherIndustries.title', e.target.value)} />
                <input className={inputStyle} placeholder="Subtitle" value={content.otherIndustries?.subtitle || ''} onChange={e => updateField('content.otherIndustries.subtitle', e.target.value)} />
                <div className="my-4 pt-4 border-t border-slate-100">
                    <MediaInput label="Center Image" value={content.otherIndustries?.image} path="content.otherIndustries.image" />
                </div>
                <div className="space-y-4">
                    <label className={labelStyle}>Industry Sectors</label>
                    {(content.otherIndustries?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Industry Name" value={item.title || ''} onChange={e => updateField(`content.otherIndustries.items.${i}.title`, e.target.value)} />
                            <input className="w-1/3 p-2 bg-white border rounded text-sm" placeholder="Icon/Img URL" value={item.icon || ''} onChange={e => updateField(`content.otherIndustries.items.${i}.icon`, e.target.value)} />
                            <button type="button" onClick={() => updateField('content.otherIndustries.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.otherIndustries.items', (prev) => [...(prev || []), { title: "", icon: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Industry</button>
                </div>
            </SectionWrapper>

            {/* 7. WHY CHOOSE */}
            <SectionWrapper id="whyChoose" icon={Target} title="7. Why Choose Softkingo" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.whyChoose?.title || ''} onChange={e => updateField('content.whyChoose.title', e.target.value)} />
                <div className="space-y-4">
                    {(content.whyChoose?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Reason Title" value={item.title || ''} onChange={e => updateField(`content.whyChoose.items.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateField(`content.whyChoose.items.${i}.description`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.whyChoose.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.whyChoose.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Reason</button>
                </div>
            </SectionWrapper>

            {/* 8. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="8. Our Development Process" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.process?.steps || []).map((step, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Step Title" value={step.title || ''} onChange={e => updateField(`content.process.steps.${i}.title`, e.target.value)} />
                                <textarea className="w-full p-2 bg-white border rounded text-sm" placeholder="Description" value={step.description || ''} onChange={e => updateField(`content.process.steps.${i}.description`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.process.steps', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.process.steps', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Process Step</button>
                </div>
            </SectionWrapper>

            {/* 9. FAQ */}
            <SectionWrapper id="faq" icon={HelpCircle} title="9. FAQ" activeSections={activeSections}>
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
                    <button type="button" onClick={() => updateField('content.faq.items', (prev) => [...(prev || []), { q: "", a: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add FAQ</button>
                </div>
            </SectionWrapper>

            {/* 10. TESTIMONIALS */}
            <SectionWrapper id="testimonials" icon={MessageSquare} title="10. Client Testimonials" activeSections={activeSections}>
                <div className="space-y-4">
                    {(content.testimonials?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <div className="flex gap-2">
                                    <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Client Name" value={item.name || ''} onChange={e => updateField(`content.testimonials.items.${i}.name`, e.target.value)} />
                                    <input className="flex-1 p-2 bg-white border rounded text-sm" placeholder="Role/Company" value={item.role || ''} onChange={e => updateField(`content.testimonials.items.${i}.role`, e.target.value)} />
                                </div>
                                <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Feedback" value={item.feedback || ''} onChange={e => updateField(`content.testimonials.items.${i}.feedback`, e.target.value)} />
                                <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Client Image URL" value={item.image || ''} onChange={e => updateField(`content.testimonials.items.${i}.image`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.testimonials.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.testimonials.items', (prev) => [...(prev || []), { name: "", role: "", feedback: "", image: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Testimonial</button>
                </div>
            </SectionWrapper>

            {/* 11. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="11. SEO Settings" activeSections={['seo', ...(activeSections || [])]}>
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