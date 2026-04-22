import React from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import { COMMON_TECH } from './TechConstants';
import {
    Smartphone, Layout, Code, Settings, Zap,
    Plus, X, HelpCircle, Briefcase, MessageSquare,
    Users, Layers, Target, CheckCircle2, Search, TrendingUp
} from "lucide-react";
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400";
// --- 2. HELPERS ---
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";
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

const TitleInputs = ({ section, content, updateField, showSubtitle = true }) => (
    <div className="grid md:grid-cols-1 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-2">
        <div className="space-y-1">
            <label className={labelStyle}>Section Title</label>
            <input className={inputStyle} placeholder="e.g. Challenges We Solve" value={content[section]?.title || ''} onChange={e => updateField(`content.${section}.title`, e.target.value)} />
        </div>
        {showSubtitle && (
            <div className="space-y-1">
                <label className={labelStyle}>Subtitle / Description (Rich Text)</label>
                <MiniRichTextEditor value={content[section]?.subtitle || ''} onChange={val => updateField(`content.${section}.subtitle`, val)} />
            </div>
        )}
    </div>
);

// --- 3. MAIN INDUSTRY EDITOR ---
export default function IndustryEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Industry Hero Section" activeSections={activeSections}>
                <TitleInputs section="hero" content={content} updateField={updateField} showSubtitle={false} />
                <div className="space-y-1">
                    <label className={labelStyle}>Hero Detailed Description (Rich Text)</label>
                    <MiniRichTextEditor value={content.hero?.description || ''} onChange={val => updateField('content.hero.description', val)} />
                </div>
                <MediaInput label="Hero Background Image" value={content.hero?.image} path="content.hero.image" />
            </SectionWrapper>

            {/* 2. CHALLENGES WE SOLVE */}
            <SectionWrapper id="challenges" icon={Target} title="2. Industry Challenges We Solve" activeSections={activeSections}>
                <TitleInputs section="challenges" content={content} updateField={updateField} />

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
                <TitleInputs section="covers" content={content} updateField={updateField} />
                <div className="space-y-4">
                    <label className={labelStyle}>Service Areas</label>
                    {(content.covers?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Service Title" value={item.title || ''} onChange={e => updateField(`content.covers.items.${i}.title`, e.target.value)} />
                                <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Icon Name / URL" value={item.icon || ''} onChange={e => updateField(`content.covers.items.${i}.icon`, e.target.value)} />
                                <label className={labelStyle}>Description (Rich Text)</label>
                                <MiniRichTextEditor value={item.description || ''} onChange={val => updateField(`content.covers.items.${i}.description`, val)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.covers.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.covers.items', (prev) => [...(prev || []), { title: "", description: "", icon: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Service Area</button>
                </div>
            </SectionWrapper>

            <SectionWrapper id="technologies" icon={Code} title="4. Advanced Technologies We Use" activeSections={activeSections}>
                <TitleInputs section="technologies" content={content} updateField={updateField} />
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
                    <TitleInputs section="portfolio" content={content} updateField={updateField} />
                    <div className="space-y-1">
                        <label className={labelStyle}>Category Filter</label>
                        <BlogCategorySelector
                            value={content.portfolio?.category || ''}
                            onChange={val => updateField('content.portfolio.category', val)}
                            className={inputStyle}
                        />
                        <p className="text-[10px] text-slate-400 px-1 mt-1">Leave blank to show top 7 projects across all categories.</p>
                    </div>
                </div>
            </SectionWrapper>

            {/* 6. OTHER INDUSTRIES */}
            <SectionWrapper id="otherIndustries" icon={Briefcase} title="6. Other Industries / Sectors" activeSections={activeSections}>
                <TitleInputs section="otherIndustries" content={content} updateField={updateField} />
                <div className="my-4 pt-4 border-t border-slate-100">
                    <MediaInput label="Center Image" value={content.otherIndustries?.image} path="content.otherIndustries.image" />
                </div>
                <div className="space-y-4">
                    <label className={labelStyle}>Industry Sectors</label>
                    {(content.otherIndustries?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 relative group">
                            <button type="button" onClick={() => updateField('content.otherIndustries.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                            <div className="flex gap-2">
                                <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Industry Name" value={item.title || ''} onChange={e => updateField(`content.otherIndustries.items.${i}.title`, e.target.value)} />
                                <input className="w-1/3 p-2 bg-white border rounded text-sm" placeholder="Icon/Img URL" value={item.icon || ''} onChange={e => updateField(`content.otherIndustries.items.${i}.icon`, e.target.value)} />
                            </div>
                            <textarea className="w-full p-2 bg-white border rounded text-xs" placeholder="Short Description" rows={2} value={item.description || ''} onChange={e => updateField(`content.otherIndustries.items.${i}.description`, e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.otherIndustries.items', (prev) => [...(prev || []), { title: "", icon: "", description: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Industry</button>
                </div>
            </SectionWrapper>

            {/* 7. WHY CHOOSE */}
            <SectionWrapper id="whyChoose" icon={Target} title="7. Why Choose Softkingo" activeSections={activeSections}>
                <TitleInputs section="whyChoose" content={content} updateField={updateField} />
                <div className="space-y-4">
                    {(content.whyChoose?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Reason Title" value={item.title || ''} onChange={e => updateField(`content.whyChoose.items.${i}.title`, e.target.value)} />
                                <label className={labelStyle}>Description (Rich Text)</label>
                                <MiniRichTextEditor value={item.description || ''} onChange={val => updateField(`content.whyChoose.items.${i}.description`, val)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.whyChoose.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.whyChoose.items', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Reason</button>
                </div>
            </SectionWrapper>

            {/* 8. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="8. Our Development Process" activeSections={activeSections}>
                <TitleInputs section="process" content={content} updateField={updateField} />
                <div className="space-y-4">
                    {(content.process?.steps || []).map((step, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Step Title" value={step.title || ''} onChange={e => updateField(`content.process.steps.${i}.title`, e.target.value)} />
                                <label className={labelStyle}>Description (Rich Text)</label>
                                <MiniRichTextEditor value={step.description || ''} onChange={val => updateField(`content.process.steps.${i}.description`, val)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.process.steps', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.process.steps', (prev) => [...(prev || []), { title: "", description: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Process Step</button>
                </div>
            </SectionWrapper>


            {/* 9. CLIENT TESTIMONIALS */}
            <SectionWrapper id="testimonials" icon={MessageSquare} title="9. Client Testimonials" activeSections={activeSections}>
                <TitleInputs section="testimonials" content={content} updateField={updateField} />
                <div className="space-y-4">
                    {(content.testimonials?.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex-1 space-y-2">
                                <div className="flex gap-2">
                                    <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Client Name" value={item.name || ''} onChange={e => updateField(`content.testimonials.items.${i}.name`, e.target.value)} />
                                    <input className="flex-1 p-2 bg-white border rounded text-sm" placeholder="Role/Company" value={item.role || ''} onChange={e => updateField(`content.testimonials.items.${i}.role`, e.target.value)} />
                                </div>
                                <label className={labelStyle}>Feedback (Rich Text)</label>
                                <MiniRichTextEditor value={item.feedback || ''} onChange={val => updateField(`content.testimonials.items.${i}.feedback`, val)} />
                                <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Client Image URL" value={item.image || ''} onChange={e => updateField(`content.testimonials.items.${i}.image`, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => updateField('content.testimonials.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500 p-1"><X size={16} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.testimonials.items', (prev) => [...(prev || []), { name: "", role: "", feedback: "", image: "" }])} className="text-xs font-bold text-emerald-600 p-1">+ Add Testimonial</button>
                </div>
            </SectionWrapper>

            {/* 10. CONSULTATION CTA */}
            <SectionWrapper id="consultation" icon={TrendingUp} title="10. Consultation CTA" activeSections={activeSections}>
                <TitleInputs section="consultation" content={content} updateField={updateField} />
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Button Label</label>
                        <input className={inputStyle} placeholder="Get Started Now" value={content.consultation?.buttonLabel || ''} onChange={e => updateField('content.consultation.buttonLabel', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Button Href</label>
                        <input className={inputStyle} placeholder="/contact" value={content.consultation?.href || ''} onChange={e => updateField('content.consultation.href', e.target.value)} />
                    </div>
                </div>
            </SectionWrapper>

            {/* 11. BLOG SECTION */}
            <SectionWrapper id="blogs" icon={MessageSquare} title="11. Blog Section" activeSections={activeSections}>
                <div className="space-y-6">
                    <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <div className="space-y-1">
                            <label className={labelStyle}>Section Title</label>
                            <input className={inputStyle} placeholder="Latest Blogs" value={content.blogTitle || ''} onChange={e => updateField('content.blogTitle', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <label className={labelStyle}>Subtitle (Rich Text)</label>
                            <MiniRichTextEditor value={content.blogSubtitle || ''} onChange={val => updateField('content.blogSubtitle', val)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Blog Category Filter</label>
                        <BlogCategorySelector
                            value={content.blogCategory || ''}
                            onChange={val => updateField('content.blogCategory', val)}
                            className={inputStyle}
                        />
                    </div>
                </div>
            </SectionWrapper>

            {/* 12. FAQ */}
            <SectionWrapper id="faq" icon={HelpCircle} title="12. FAQ" activeSections={activeSections}>
                <TitleInputs section="faq" content={content} updateField={updateField} />
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

            {/* 13. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="13. SEO Settings" activeSections={['seo', ...(activeSections || [])]}>
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

            {/* 14. INQUIRY SECTION */}
            <SectionWrapper id="inquiry" icon={MessageSquare} title="14. Inquiry Section" activeSections={activeSections}>
                <TitleInputs section="inquiry" content={content} updateField={updateField} />
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Tagline</label>
                        <input className={inputStyle} placeholder="e.g. GET IN TOUCH" value={content.inquiry?.tagline || ''} onChange={e => updateField('content.inquiry.tagline', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Title Prefix</label>
                        <input className={inputStyle} placeholder="e.g. Let's " value={content.inquiry?.titlePrefix || ''} onChange={e => updateField('content.inquiry.titlePrefix', e.target.value)} />
                    </div>
                </div>
            </SectionWrapper>

        </div>
    );
}