import React from 'react';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';
import {
    Smartphone, Layout, Database, Code, Settings, Zap,
    BarChart3, ShieldCheck, DollarSign, Plus, X, Trash2,
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare, Globe, Search,
    Image, TrendingUp, Layers, BookOpen, CheckCircle2, Puzzle, Share2
} from "lucide-react";
import { COMMON_TECH } from '../../solutions/_components/TechConstants';

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-400";
const labelStyle = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block";

// --- 2. SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-puple-50 text-sky-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

// --- Reusable Section Header (Title + Subtitle inputs) ---
const SectionHeader = ({ section, path, updateField }) => (
    <div className="grid md:grid-cols-2 gap-4">
        <input
            className={inputStyle}
            placeholder="Section Title"
            value={section?.title || ''}
            onChange={(e) => updateField(`${path}.title`, e.target.value)}
        />
        <input
            className={inputStyle}
            placeholder="Section Subtitle"
            value={section?.subtitle || ''}
            onChange={(e) => updateField(`${path}.subtitle`, e.target.value)}
        />
    </div>
);

// --- 3. MAIN DIGITAL EDITOR ---
export default function DigitalEditor({ formData, updateField, MediaInput, TipTapEditor, activeSections, portfolioCategories }) {

    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">

            {/* 1. HERO SECTION */}
            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <div className="grid grid-cols-1 gap-4">
                    <input className={inputStyle} placeholder="Hero Title" value={content.heroTitle || ''} onChange={e => updateField('content.heroTitle', e.target.value)} />
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Subtitle (Rich Text)</label>
                        <MiniRichTextEditor value={content.heroSubtitle || ''} onChange={val => updateField('content.heroSubtitle', val)} />
                    </div>

                    {/* Bullet Points below Subtitle */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                        <label className={labelStyle}>Hero Bullet Points</label>
                        <div className="space-y-2">
                            {(content.heroBullets || []).map((bullet, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input className="flex-1 p-2 bg-white border border-slate-200 rounded text-xs" placeholder="e.g. 24/7 Support" value={bullet || ''} onChange={e => updateField(`content.heroBullets.${i}`, e.target.value)} />
                                    <button type="button" onClick={() => updateField('content.heroBullets', (prev) => (prev || []).filter((_, idx) => idx !== i))}><X size={14} className="text-slate-300" /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => updateField('content.heroBullets', (prev) => [...(prev || []), ""])} className="text-[10px] font-bold text-sky-600">+ Add Bullet Point</button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Button Text</label>
                        <input className={inputStyle} placeholder="Let's Work Together" value={content.heroButtonText || ''} onChange={e => updateField('content.heroButtonText', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Button Link</label>
                        <input className={inputStyle} placeholder="/contact" value={content.heroButtonLink || ''} onChange={e => updateField('content.heroButtonLink', e.target.value)} />
                    </div>
                </div>

                {/* Second Button */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Button 2 Text</label>
                        <input className={inputStyle} placeholder="e.g. View Portfolio" value={content.heroButtonText2 || ''} onChange={e => updateField('content.heroButtonText2', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Hero Button 2 Link</label>
                        <input className={inputStyle} placeholder="/portfolio" value={content.heroButtonLink2 || ''} onChange={e => updateField('content.heroButtonLink2', e.target.value)} />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Trusted By Text</label>
                    <input className={inputStyle} placeholder="Trusted By Leading Brands" value={content.trustedByText || ''} onChange={e => updateField('content.trustedByText', e.target.value)} />
                </div>
                <MediaInput label="Hero Background Image" value={content.heroBg} path="content.heroBg" />
            </SectionWrapper>


            {/* 4. SEO SETTINGS */}
            <SectionWrapper id="seo" icon={Search} title="2. SEO Settings" activeSections={activeSections}>
                <div className="space-y-4">
                    <input className={inputStyle} placeholder="SEO Title" value={formData.seoTitle || ''} onChange={e => updateField('seoTitle', e.target.value)} />
                    <textarea className={inputStyle} rows={3} placeholder="SEO Description" value={formData.seoDescription || ''} onChange={e => updateField('seoDescription', e.target.value)} />
                    <MediaInput label="SEO Image (OpenGraph)" value={formData.seoImage} path="seoImage" />
                </div>
            </SectionWrapper>

            {/* 2. ENTERPRISE DIGITAL MARKETING (Radial Diagram) */}
            <SectionWrapper id="enterpriseMarketing" icon={Share2} title="3. Enterprise Digital Marketing" activeSections={activeSections}>

                {/* HEADER TEXT */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Title Lead (e.g. Enterprise Digital Marketing)</label>
                        <input
                            className={inputStyle}
                            placeholder="Enterprise Digital Marketing"
                            value={content.enterpriseMarketing?.titleLead || ''}
                            onChange={(e) => updateField('content.enterpriseMarketing.titleLead', e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Title Accent (highlighted, e.g. Services by Infosys)</label>
                        <input
                            className={inputStyle}
                            placeholder="Services by Infosys"
                            value={content.enterpriseMarketing?.titleAccent || ''}
                            onChange={(e) => updateField('content.enterpriseMarketing.titleAccent', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Description</label>
                    <textarea
                        className={inputStyle}
                        rows={4}
                        placeholder="Softkingo Digital Marketing practice helps enterprises..."
                        value={content.enterpriseMarketing?.description || ''}
                        onChange={(e) => updateField('content.enterpriseMarketing.description', e.target.value)}
                    />
                </div>

                {/* RING IMAGE (Radial Diagram center/ring) */}
                <MediaInput
                    label="Ring Image (Radial Diagram)"
                    value={content.enterpriseMarketing?.ringImage}
                    path="content.enterpriseMarketing.ringImage"
                />

                {/* STATS GRID */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                    <label className={labelStyle}>Stats Grid</label>

                    {(content.enterpriseMarketing?.stats || []).map((stat, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative space-y-3">
                            <button
                                type="button"
                                onClick={() =>
                                    updateField('content.enterpriseMarketing.stats', (prev) =>
                                        (prev || []).filter((_, idx) => idx !== i)
                                    )
                                }
                                className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"
                            >
                                <X size={16} />
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className={labelStyle}>Value (e.g. 50)</label>
                                    <input
                                        className="w-full p-2 bg-white border rounded text-sm font-bold"
                                        placeholder="50"
                                        value={stat.value || ''}
                                        onChange={(e) =>
                                            updateField(`content.enterpriseMarketing.stats.${i}.value`, e.target.value)
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Unit (e.g. %)</label>
                                    <input
                                        className="w-full p-2 bg-white border rounded text-sm font-bold"
                                        placeholder="%"
                                        value={stat.unit || ''}
                                        onChange={(e) =>
                                            updateField(`content.enterpriseMarketing.stats.${i}.unit`, e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelStyle}>Description</label>
                                <textarea
                                    className="w-full p-2 bg-white border rounded text-sm"
                                    rows={2}
                                    placeholder="of Indian shoppers check online before making an actual purchase."
                                    value={stat.description || ''}
                                    onChange={(e) =>
                                        updateField(`content.enterpriseMarketing.stats.${i}.description`, e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            updateField('content.enterpriseMarketing.stats', (prev) => [
                                ...(prev || []),
                                { value: "", unit: "", description: "" },
                            ])
                        }
                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold"
                    >
                        <Plus size={18} /> Add Stat
                    </button>
                </div>
            </SectionWrapper>


            {/* 2. SERVICE CATEGORIES */}
            <SectionWrapper
                id="services"
                icon={Layout}
                title="4. Service Categories"
                activeSections={activeSections}
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        className={inputStyle}
                        placeholder="Section Title"
                        value={content.services?.title || ""}
                        onChange={(e) =>
                            updateField("content.services.title", e.target.value)
                        }
                    />
                    <input
                        className={inputStyle}
                        placeholder="Section Subtitle"
                        value={content.services?.subtitle || ""}
                        onChange={(e) =>
                            updateField("content.services.subtitle", e.target.value)
                        }
                    />
                </div>

                <div className="space-y-8">
                    {(content.services?.categories || []).map((cat, i) => (
                        <div
                            key={i}
                            className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    updateField("content.services.categories", (prev) =>
                                        (prev || []).filter((_, idx) => idx !== i)
                                    )
                                }
                                className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelStyle}>
                                        Sidebar Small Title
                                    </label>
                                    <input
                                        className={inputStyle}
                                        placeholder="e.g. AI-Driven Apps"
                                        value={cat.shortTitle || ""}
                                        onChange={(e) =>
                                            updateField(
                                                `content.services.categories.${i}.shortTitle`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={labelStyle}>
                                        Sidebar Small Description
                                    </label>
                                    <input
                                        className={inputStyle}
                                        placeholder="e.g. Architect Smart Products"
                                        value={cat.shortDesc || ""}
                                        onChange={(e) =>
                                            updateField(
                                                `content.services.categories.${i}.shortDesc`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelStyle}>
                                    Full Content Title
                                </label>
                                <input
                                    className={inputStyle}
                                    placeholder="e.g. Your Partner in AI Engineering"
                                    value={cat.fullTitle || ""}
                                    onChange={(e) =>
                                        updateField(
                                            `content.services.categories.${i}.fullTitle`,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={labelStyle}>
                                    Full Content Description
                                </label>
                                <MiniRichTextEditor
                                    value={cat.fullDesc || ""}
                                    onChange={(val) =>
                                        updateField(
                                            `content.services.categories.${i}.fullDesc`,
                                            val
                                        )
                                    }
                                />
                            </div>

                            {/* Service Image */}
                            <div className="space-y-2">
                                <MediaInput
                                    label="Service Image"
                                    value={cat.image}
                                    path={`content.services.categories.${i}.image`}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            updateField("content.services.categories", (prev) => [
                                ...(prev || []),
                                {
                                    shortTitle: "",
                                    shortDesc: "",
                                    fullTitle: "",
                                    fullDesc: "",
                                    image: "",
                                },
                            ])
                        }
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold"
                    >
                        <Plus size={20} /> Add New Service Category
                    </button>
                </div>
            </SectionWrapper>

            {/* 3. EXTENSIVE SERVICES PROVIDED */}
            <SectionWrapper id="servicesList" icon={Briefcase} title="5. Extensive Services Provided" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Title" value={content.servicesList?.title || ''} onChange={e => updateField('content.servicesList.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Section Subtitle" value={content.servicesList?.subtitle || ''} onChange={e => updateField('content.servicesList.subtitle', e.target.value)} />
                </div>
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


            {/* 4. Industries with we works */}
            <SectionWrapper
                id="industries"
                icon={Layers}
                title="6. Industries We Serve"
                activeSections={activeSections}
            >
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <input
                        className={inputStyle}
                        placeholder="Section Title"
                        value={content.industries?.title || ""}
                        onChange={(e) =>
                            updateField("content.industries.title", e.target.value)
                        }
                    />

                    <input
                        className={inputStyle}
                        placeholder="Section Subtitle"
                        value={content.industries?.subtitle || ""}
                        onChange={(e) =>
                            updateField("content.industries.subtitle", e.target.value)
                        }
                    />
                </div>

                <div className="space-y-6">
                    {(content.industries?.items || []).map((item, i) => (
                        <div
                            key={i}
                            className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    updateField("content.industries.items", (prev) =>
                                        (prev || []).filter((_, idx) => idx !== i)
                                    )
                                }
                                className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-2 rounded-lg"
                            >
                                <X size={18} />
                            </button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelStyle}>Industry Name</label>
                                    <input
                                        className={inputStyle}
                                        placeholder="e.g. Healthcare"
                                        value={item.title || ""}
                                        onChange={(e) =>
                                            updateField(
                                                `content.industries.items.${i}.title`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    {/* <label className={labelStyle}>Industry Icon</label> */}
                                    <MediaInput
                                        label="Industry Icon"
                                        value={item.icon}
                                        path={`content.industries.items.${i}.icon`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelStyle}>Description</label>
                                <textarea
                                    className={inputStyle}
                                    rows={3}
                                    placeholder="Brief Description"
                                    value={item.description || ""}
                                    onChange={(e) =>
                                        updateField(
                                            `content.industries.items.${i}.description`,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            updateField("content.industries.items", (prev) => [
                                ...(prev || []),
                                {
                                    title: "",
                                    description: "",
                                    icon: "",
                                },
                            ])
                        }
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold"
                    >
                        <Plus size={20} />
                        Add Industry Item
                    </button>
                </div>
            </SectionWrapper>


            {/* 4. CORE FEATURES GRID */}
            <SectionWrapper id="features" icon={Database} title="7. Core Features Grid" activeSections={activeSections}>
                <SectionHeader section={content.features} path="content.features" updateField={updateField} />
                <div className="space-y-4">
                    <label className={labelStyle}>Feature Cards</label>
                    {(content.features?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                            <button
                                type="button"
                                onClick={() => updateField('content.features.items', (prev) => (prev || []).filter((_, idx) => idx !== i))}
                                className="absolute top-2 right-2 text-rose-500"
                            >
                                <X size={18} />
                            </button>
                            <div className="grid gap-3">
                                <input
                                    className="w-full p-2 bg-white border rounded text-sm font-bold"
                                    placeholder="Feature Title"
                                    value={item.title || ''}
                                    onChange={e => updateField(`content.features.items.${i}.title`, e.target.value)}
                                />
                                <div className="space-y-1">
                                    <label className={labelStyle}>Feature Description</label>
                                    <MiniRichTextEditor
                                        value={item.description || ''}
                                        onChange={val => updateField(`content.features.items.${i}.description`, val)}
                                    />
                                </div>
                                <MediaInput
                                    label="Icon"
                                    value={item.image}
                                    path={`content.features.items.${i}.image`}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => updateField('content.features.items', (prev) => [...(prev || []), { title: "", description: "", image: "" }])}
                        className="text-sm font-bold text-sky-600"
                    >
                        + Add Feature Card
                    </button>
                </div>
            </SectionWrapper>




            {/*
  Drop-in replacement for your two SectionWrapper blocks ("7. Pricing Cards"
  and "8. Pricing / Compare Plans"). Everything you already had still works
  the same way — I only added the pieces needed to support what the live
  page now does:

    1. A "Link ID" field on Solution Tabs AND on Feature Groups. These two
       must match (e.g. both "inbound") — that's what makes clicking
       "Compare all plans" jump to and open the right accordion section.

    2. A "Badge Tone" selector per feature row (sky / skyDark / pink), so
       you can make badges like "New" (sky), "Enterprise" (skyDark), or
       "COMING SOON" (pink) without touching code.

    3. A "Sub-rows" editor under each feature row — this is the nested
       accordion-inside-accordion (like "Forms" under Inbound, or
       "Sequences" under Outbound). Each sub-row has its own name, badge,
       tone, and per-plan values, same shape as its parent row.

  This assumes `SectionWrapper`, `labelStyle`, `inputStyle`, `updateField`,
  `content`, `activeSections`, and the lucide icons (CheckCircle2,
  DollarSign, X, Plus) are already available in this file's scope, exactly
  as in your original code.
*/}
            {/* 9. TECH STACK / TECHNOLOGIES USED */}
            <SectionWrapper id="tech" icon={Code} title="8. Tech Stack" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Section Title" value={content.tech?.title || ''} onChange={e => updateField('content.tech.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Section Subtitle" value={content.tech?.subtitle || ''} onChange={e => updateField('content.tech.subtitle', e.target.value)} />
                </div>
                <div className="space-y-4">
                    {(content.tech?.items || []).map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                            <button type="button" onClick={() => updateField('content.tech.items', (prev) => (prev || []).filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-rose-500"><X size={18} /></button>

                            <div className="grid md:grid-cols-2 gap-3 mb-2">
                                <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Technology Name (e.g. React)" value={item.name || ''} onChange={e => updateField(`content.tech.items.${i}.name`, e.target.value)} />
                                <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Category (e.g. Frontend)" value={item.category || ''} onChange={e => updateField(`content.tech.items.${i}.category`, e.target.value)} />
                            </div>

                            <textarea className="w-full p-2 bg-white border rounded text-sm mb-3" rows={2} placeholder="Brief Description" value={item.description || ''} onChange={e => updateField(`content.tech.items.${i}.description`, e.target.value)} />

                            <MediaInput
                                label="Technology Icon / Logo"
                                value={item.icon}
                                path={`content.tech.items.${i}.icon`}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('content.tech.items', (prev) => [...(prev || []), { name: "", category: "", description: "", icon: "" }])} className="text-sm font-bold text-sky-600">+ Add Technology</button>
                </div>
            </SectionWrapper>
            {/* PRICING CARDS / SOLUTIONS COMPARE SECTION */}
            <SectionWrapper id="pricingCards" icon={CheckCircle2} title="9. Pricing Cards (Solutions Tabs)" activeSections={activeSections}>

                {/* HEADING + SUBTITLE */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Heading</label>
                        <input className={inputStyle} placeholder="Simple, transparent pricing" value={content.pricingCards?.heading || ''} onChange={e => updateField('content.pricingCards.heading', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Subtitle</label>
                        <input className={inputStyle} placeholder="Choose the plan that fits your team" value={content.pricingCards?.subtitle || ''} onChange={e => updateField('content.pricingCards.subtitle', e.target.value)} />
                    </div>
                </div>

                {/* TOP TEXT + BILLING TOGGLE LABELS */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Top-right Intro Text</label>
                        <textarea className={inputStyle} rows={2} placeholder="Build pipeline smarter, close deals faster..." value={content.pricingCards?.topText || ''} onChange={e => updateField('content.pricingCards.topText', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className={labelStyle}>Annual Label</label>
                            <input className={inputStyle} placeholder="Annual billing" value={content.pricingCards?.annualLabel || ''} onChange={e => updateField('content.pricingCards.annualLabel', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <label className={labelStyle}>Annual Save Badge</label>
                            <input className={inputStyle} placeholder="SAVE 20%" value={content.pricingCards?.annualBadge || ''} onChange={e => updateField('content.pricingCards.annualBadge', e.target.value)} />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <label className={labelStyle}>Monthly Label</label>
                            <input className={inputStyle} placeholder="Monthly billing" value={content.pricingCards?.monthlyLabel || ''} onChange={e => updateField('content.pricingCards.monthlyLabel', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* TABS BAR TITLE/SUBTITLE */}
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <input className={inputStyle} placeholder="Tabs Bar Title (e.g. Explore features by solutions:)" value={content.pricingCards?.tabsTitle || ''} onChange={e => updateField('content.pricingCards.tabsTitle', e.target.value)} />
                    <input className={inputStyle} placeholder="Tabs Bar Subtitle (e.g. All tiers include every solution)" value={content.pricingCards?.tabsSubtitle || ''} onChange={e => updateField('content.pricingCards.tabsSubtitle', e.target.value)} />
                </div>

                {/* SOLUTION TABS — har tab ka apna independent Plan Cards set */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                    <label className={labelStyle}>Solution Tabs — har tab ke apne Plan Cards</label>

                    {(content.pricingCards?.solutionTabs || []).map((tab, ti) => {
                        const tabPlans = tab.plans || [];
                        return (
                            <div key={ti} className="bg-slate-50 p-6 rounded-2xl border-2 border-sky-100 relative space-y-5">
                                <button
                                    type="button"
                                    onClick={() => updateField('content.pricingCards.solutionTabs', (prev) => (prev || []).filter((_, idx) => idx !== ti))}
                                    className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg"
                                >
                                    <X size={18} />
                                </button>

                                {/* Tab meta */}
                                <div className="grid md:grid-cols-3 gap-3">
                                    <input className="p-2 bg-white border rounded text-xs font-bold" placeholder="Tab Label (e.g. Outbound)" value={tab.label || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.label`, e.target.value)} />
                                    <input className="p-2 bg-white border rounded text-xs" placeholder="Icon Name (e.g. Megaphone)" value={tab.iconName || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.iconName`, e.target.value)} />
                                    <input
                                        className="p-2 bg-amber-50 border border-amber-200 rounded text-xs font-mono"
                                        placeholder="Link ID (e.g. inbound)"
                                        value={tab.id || ''}
                                        onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.id`, e.target.value)}
                                    />
                                </div>

                                {/* Visibility toggle */}
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white p-3 rounded-lg border border-slate-200 w-fit">
                                    <input
                                        type="checkbox"
                                        checked={tab.visible !== false}
                                        onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.visible`, e.target.checked)}
                                    />
                                    Show this tab on frontend
                                </label>

                                {/* IS TAB KE APNE PLAN CARDS */}
                                <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200">
                                    <label className={labelStyle}>Plan Cards for "{tab.label || `Tab ${ti + 1}`}"</label>

                                    {tabPlans.map((plan, pi) => (
                                        <div key={pi} className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative space-y-3">
                                            <button
                                                type="button"
                                                onClick={() => updateField(`content.pricingCards.solutionTabs.${ti}.plans`, (prev) => (prev || []).filter((_, idx) => idx !== pi))}
                                                className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 p-1 rounded-lg"
                                            >
                                                <X size={16} />
                                            </button>

                                            <div className="grid md:grid-cols-2 gap-3">
                                                <input className={inputStyle} placeholder="Plan Name (e.g. Professional)" value={plan.name || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.name`, e.target.value)} />
                                                <input className={inputStyle} placeholder="Badge (e.g. MOST POPULAR)" value={plan.badge || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.badge`, e.target.value)} />
                                            </div>

                                            <textarea className={inputStyle} rows={2} placeholder="Short Description" value={plan.description || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.description`, e.target.value)} />

                                            <div className="grid md:grid-cols-2 gap-3">
                                                <input className={inputStyle} placeholder="Price (e.g. $79)" value={plan.price || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.price`, e.target.value)} />
                                                <input className={inputStyle} placeholder="Price Note" value={plan.priceNote || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.priceNote`, e.target.value)} />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-3">
                                                <input className={inputStyle} placeholder="Credits (e.g. 48,000 credits)" value={plan.credits || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.credits`, e.target.value)} />
                                                <input className={inputStyle} placeholder="Credits Note" value={plan.creditsNote || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.creditsNote`, e.target.value)} />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-3">
                                                <input className={inputStyle} placeholder="Learn More Link" value={plan.learnMoreLink || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.learnMoreLink`, e.target.value)} />
                                                <input className={inputStyle} placeholder="Trial Text" value={plan.trialText || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.trialText`, e.target.value)} />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 bg-white p-3 rounded-xl border border-slate-100">
                                                <div className="space-y-2">
                                                    <label className={labelStyle}>Primary Button</label>
                                                    <input className={inputStyle} placeholder="Label" value={plan.primaryButton?.label || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.primaryButton.label`, e.target.value)} />
                                                    <input className={inputStyle} placeholder="Link" value={plan.primaryButton?.link || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.primaryButton.link`, e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className={labelStyle}>Secondary Button (optional)</label>
                                                    <input className={inputStyle} placeholder="Label" value={plan.secondaryButton?.label || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.secondaryButton.label`, e.target.value)} />
                                                    <input className={inputStyle} placeholder="Link" value={plan.secondaryButton?.link || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.secondaryButton.link`, e.target.value)} />
                                                </div>
                                            </div>

                                            <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                <input type="checkbox" checked={!!plan.highlighted} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.highlighted`, e.target.checked)} />
                                                Highlighted Card
                                            </label>

                                            {/* FEATURES — ab simple hai, ab per-tab feature keying ki zaroorat nahi */}
                                            <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-100">
                                                <label className={labelStyle}>Feature List (checkmarks)</label>
                                                {(plan.features || []).map((feat, fi) => (
                                                    <div key={fi} className="flex gap-2 items-center">
                                                        <input
                                                            className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded text-xs"
                                                            placeholder="Feature text"
                                                            value={feat.text || ''}
                                                            onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.features.${fi}.text`, e.target.value)}
                                                        />
                                                        <input
                                                            className="w-40 p-2 bg-slate-50 border border-slate-100 rounded text-xs"
                                                            placeholder="Badge (optional)"
                                                            value={feat.badge || ''}
                                                            onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.features.${fi}.badge`, e.target.value)}
                                                        />
                                                        <button type="button" onClick={() => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.features`, (prev) => (prev || []).filter((_, idx) => idx !== fi))}>
                                                            <X size={14} className="text-slate-300" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.features`, (prev) => [...(prev || []), { text: "", badge: "" }])}
                                                    className="text-[10px] font-bold text-sky-600"
                                                >
                                                    + Add Feature Line
                                                </button>
                                            </div>

                                            <div className="space-y-1">
                                                <label className={labelStyle}>"Compare all plans" Link Text (optional)</label>
                                                <input className={inputStyle} placeholder="Compare all plans" value={plan.compareAllText || ''} onChange={e => updateField(`content.pricingCards.solutionTabs.${ti}.plans.${pi}.compareAllText`, e.target.value)} />
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => updateField(`content.pricingCards.solutionTabs.${ti}.plans`, (prev) => [...(prev || []), {
                                            name: "", badge: "", description: "", price: "", priceNote: "", credits: "", creditsNote: "",
                                            learnMoreLink: "", trialText: "", highlighted: false,
                                            primaryButton: { label: "", link: "" }, secondaryButton: { label: "", link: "" },
                                            features: [], compareAllText: ""
                                        }])}
                                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold text-sm"
                                    >
                                        <Plus size={16} /> Add Plan Card to "{tab.label || `Tab ${ti + 1}`}"
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => updateField('content.pricingCards.solutionTabs', (prev) => [...(prev || []), { label: "", iconName: "", id: "", visible: true, plans: [] }])}
                        className="w-full py-4 border-2 border-dashed border-sky-200 rounded-2xl flex items-center justify-center gap-2 text-sky-600 hover:bg-sky-50 transition-all font-bold"
                    >
                        <Plus size={20} /> Add Solution Tab
                    </button>
                </div>
            </SectionWrapper>

            {/* PRICING / COMPARE PLANS SECTION */}
            {/* PRICING / COMPARE PLANS SECTION */}
            <SectionWrapper id="pricing" icon={DollarSign} title="10. Pricing / Compare Plans" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Title (e.g. Compare)" value={content.pricing?.title || ''} onChange={e => updateField('content.pricing.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Highlight Text (e.g. Plans)" value={content.pricing?.highlight || ''} onChange={e => updateField('content.pricing.highlight', e.target.value)} />
                </div>
                <textarea className={inputStyle} rows={2} placeholder="Section Subtitle" value={content.pricing?.subtitle || ''} onChange={e => updateField('content.pricing.subtitle', e.target.value)} />

                {/* REFERENCE TAB — decides which tab's plans become the compare table columns */}
                <div className="space-y-1 bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <label className={labelStyle}>Reference Solution Tab (columns source)</label>
                    <select
                        className={inputStyle}
                        value={content.pricing?.referenceTabId || ''}
                        onChange={e => updateField('content.pricing.referenceTabId', e.target.value)}
                    >
                        <option value="">-- Select a tab --</option>
                        {(content.pricingCards?.solutionTabs || []).map((tab, ti) => (
                            <option key={ti} value={tab.id}>{tab.label || `Tab ${ti + 1}`}</option>
                        ))}
                    </select>
                    <p className="text-[10px] text-amber-700 italic">Compare table ke columns (plan names) isi tab ke Plan Cards (Section 8) se aayenge.</p>
                </div>

                {/* Reference tab ke plans nikalo */}
                {(() => {
                    const refTab = (content.pricingCards?.solutionTabs || []).find(t => t.id === content.pricing?.referenceTabId);
                    const refPlans = refTab?.plans || [];

                    return (
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <label className={labelStyle}>Feature Groups (Accordions — shared across all tabs)</label>

                            {refPlans.length === 0 && (
                                <p className="text-[11px] text-amber-600 italic">Upar Reference Tab select karo jiske plans compare table ke columns banenge.</p>
                            )}

                            <div className="space-y-6">
                                {(content.pricing?.featureGroups || []).map((group, gi) => (
                                    <div key={gi} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                                        <button type="button" onClick={() => updateField('content.pricing.featureGroups', (prev) => (prev || []).filter((_, idx) => idx !== gi))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg"><X size={18} /></button>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input className={inputStyle} placeholder="Group Title (e.g. Outbound, Inbound)" value={group.title || ''} onChange={e => updateField(`content.pricing.featureGroups.${gi}.title`, e.target.value)} />
                                            <input className={inputStyle} placeholder="Group Description" value={group.description || ''} onChange={e => updateField(`content.pricing.featureGroups.${gi}.description`, e.target.value)} />
                                        </div>

                                        <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100">
                                            <label className={labelStyle}>Features in this Group</label>
                                            {(group.features || []).map((feat, fi) => (
                                                <div key={fi} className="bg-slate-50 p-3 rounded-lg border border-slate-200 relative space-y-2">
                                                    <button type="button" onClick={() => updateField(`content.pricing.featureGroups.${gi}.features`, (prev) => prev.filter((_, idx) => idx !== fi))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500"><X size={14} /></button>

                                                    <div className="grid grid-cols-3 gap-2">
                                                        <input className="p-2 bg-white border rounded text-xs font-bold" placeholder="Feature Name" value={feat.name || ''} onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.name`, e.target.value)} />
                                                        <input className="p-2 bg-white border rounded text-xs" placeholder="Badge (optional, e.g. New)" value={feat.badge || ''} onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.badge`, e.target.value)} />
                                                        <select
                                                            className="p-2 bg-white border rounded text-xs"
                                                            value={feat.tone || ''}
                                                            onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.tone`, e.target.value)}
                                                        >
                                                            <option value="">Badge Tone: Sky (default)</option>
                                                            <option value="sky">Badge Tone: Sky</option>
                                                            <option value="skyDark">Badge Tone: Sky Dark (e.g. Enterprise)</option>
                                                            <option value="pink">Badge Tone: Pink (e.g. Coming Soon)</option>
                                                        </select>
                                                    </div>

                                                    {/* 👇 "check" input — ab refPlans (selected reference tab ke plans) se columns banta hai */}
                                                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${refPlans.length || 1}, minmax(0,1fr))` }}>
                                                        {refPlans.map((plan, pi) => (
                                                            <div key={pi} className="space-y-1">
                                                                <label className="text-[9px] font-bold text-slate-400 uppercase truncate block">{plan.name || `Plan ${pi + 1}`}</label>
                                                                <input
                                                                    className="w-full p-1.5 bg-white border rounded text-[10px] text-center"
                                                                    placeholder="check / text / blank"
                                                                    value={feat.values?.[pi] ?? ''}
                                                                    onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.values.${pi}`, e.target.value)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="text-[9px] text-slate-400 italic">Type "check" to display a ✓ checkmark, enter custom text (e.g. "5 chats") to display that text, or leave blank.</p>

                                                    {/* SUB-ROWS */}
                                                    <div className="space-y-2 bg-amber-50/50 p-3 rounded-lg border border-amber-100 mt-2">
                                                        <label className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Sub-rows (optional)</label>
                                                        {(feat.children || []).map((child, ci) => (
                                                            <div key={ci} className="bg-white p-3 rounded-lg border border-amber-200 relative space-y-2">
                                                                <button type="button" onClick={() => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.children`, (prev) => (prev || []).filter((_, idx) => idx !== ci))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500"><X size={14} /></button>

                                                                <div className="grid grid-cols-3 gap-2">
                                                                    <input className="p-2 bg-white border rounded text-xs font-bold" placeholder="Sub-row Name" value={child.name || ''} onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.children.${ci}.name`, e.target.value)} />
                                                                    <input className="p-2 bg-white border rounded text-xs" placeholder="Badge (optional)" value={child.badge || ''} onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.children.${ci}.badge`, e.target.value)} />
                                                                    <select
                                                                        className="p-2 bg-white border rounded text-xs"
                                                                        value={child.tone || ''}
                                                                        onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.children.${ci}.tone`, e.target.value)}
                                                                    >
                                                                        <option value="">Badge Tone: Sky (default)</option>
                                                                        <option value="sky">Badge Tone: Sky</option>
                                                                        <option value="skyDark">Badge Tone: Sky Dark</option>
                                                                        <option value="pink">Badge Tone: Pink</option>
                                                                    </select>
                                                                </div>

                                                                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${refPlans.length || 1}, minmax(0,1fr))` }}>
                                                                    {refPlans.map((plan, pi) => (
                                                                        <div key={pi} className="space-y-1">
                                                                            <label className="text-[9px] font-bold text-slate-400 uppercase truncate block">{plan.name || `Plan ${pi + 1}`}</label>
                                                                            <input
                                                                                className="w-full p-1.5 bg-slate-50 border rounded text-[10px] text-center"
                                                                                placeholder="check / text / blank"
                                                                                value={child.values?.[pi] ?? ''}
                                                                                onChange={e => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.children.${ci}.values.${pi}`, e.target.value)}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button type="button" onClick={() => updateField(`content.pricing.featureGroups.${gi}.features.${fi}.children`, (prev) => [...(prev || []), { name: "", badge: "", tone: "", values: [] }])} className="text-[10px] font-bold text-amber-700">
                                                            + Add Sub-row
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => updateField(`content.pricing.featureGroups.${gi}.features`, (prev) => [...(prev || []), { name: "", badge: "", tone: "", values: [], children: [] }])} className="text-[10px] font-bold text-sky-600">+ Add Feature Row</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => updateField('content.pricing.featureGroups', (prev) => [...(prev || []), { title: "", description: "", features: [] }])} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold">
                                <Plus size={18} /> Add Feature Group (Accordion)
                            </button>
                        </div>
                    );
                })()}
            </SectionWrapper>
            {/* 5. STATISTICS */}
            {/* <SectionWrapper id="stats" icon={BarChart3} title="6. Statistics Section" activeSections={activeSections}>
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
                    </div> */}
            {/* <div className="space-y-4"> */}
            {/* Images removed as per request */}
            {/* </div> */}
            {/* </div> */}
            {/* </SectionWrapper> */}

            {/* 7. AWARDS SECTION */}
            {/* <SectionWrapper id="awards" icon={Award} title="7. Awards Section" activeSections={activeSections}>
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
            </SectionWrapper> */}

            {/* 8. CONSULTATION CTA */}
            {/* <SectionWrapper id="consultation" icon={TrendingUp} title="8. Consultation CTA" activeSections={activeSections}>
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
            </SectionWrapper> */}

            {/* 9. TECH STACK (TABBED) */}
            {/* <SectionWrapper id="tech" icon={Code} title="9. Tech Stack (Tabbed)" activeSections={activeSections}>
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

                                        <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-dashed border-slate-200">
                                            <label className="w-full text-[10px] font-black text-slate-400 uppercase mb-1">Quick Add Common Tech:</label>
                                            {COMMON_TECH.map((tech) => (
                                                <button
                                                    key={tech.name}
                                                    type="button"
                                                    onClick={() => updateField(`content.techStack.tabs.${i}.items`, (prev) => [...(prev || []), { ...tech }])}
                                                    className="p-1 px-2 bg-slate-50 hover:bg-puple-50 hover:text-sky-600 rounded-md border border-slate-100 text-[10px] font-bold transition-all flex items-center gap-1.5 active:scale-95"
                                                >
                                                    <img src={tech.image} className="w-3.5 h-3.5" alt="" />
                                                    {tech.name}
                                                </button>
                                            ))}
                                        </div>

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
            </SectionWrapper> */}


            {/* <SectionWrapper id="process" icon={Settings} title="10. Our Process" activeSections={activeSections}>
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
                            </div> */}
            {/* 
                            <textarea className={inputStyle} placeholder="Step Description" value={step.description || ''} onChange={e => updateField(`content.process.items.${i}.description`, e.target.value)} /> */}

            {/* Bullets List */}
            {/* <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
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
                        </div> */}
            {/* ))}
                    <button type="button" onClick={() => updateField('content.process.items', (prev) => [...(prev || []), { title: "", description: "", bullets: [] }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-sky-600 font-bold uppercase tracking-tight">+ Add Process Step</button>
                </div> */}
            {/* </SectionWrapper> */}

            {/* 12. PORTFOLIO */}
            {/* <SectionWrapper id="portfolio" icon={Globe} title="12. Portfolio Section" activeSections={activeSections}>
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
            </SectionWrapper> */}

            {/* 13. INDUSTRY SOLUTIONS */}


            {/* 14. INDUSTRIES WE SERVE */}
            {/* <SectionWrapper id="industries" icon={Layers} title="14. Industries We Serve (Slider)" activeSections={activeSections}>
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
            </SectionWrapper> */}

            {/* 14. USER GUIDE */}
            {/* <SectionWrapper id="user-guide" icon={BookOpen} title="14. User Guide" activeSections={activeSections}>
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
            </SectionWrapper> */}




            {/* 17. BLOG SECTION */}
            <SectionWrapper id="feat" icon={MessageSquare} title="Blog Section" activeSections={activeSections}>
                {/* Core Fields: Title, Subtitle, Button Text, Button Link */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={labelStyle}>Blog Section Title</label>
                        <input
                            className={inputStyle}
                            placeholder="e.g. Latest Insights & Blogs"
                            value={content.blogTitle || ''}
                            onChange={e => updateField('content.blogTitle', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Blog Section Subtitle</label>
                        <input
                            className={inputStyle}
                            placeholder="Explore our latest thoughts, updates, and articles..."
                            value={content.blogSubtitle || ''}
                            onChange={e => updateField('content.blogSubtitle', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Button Text</label>
                        <input
                            className={inputStyle}
                            placeholder="e.g. View All Posts"
                            value={content.blogButtonText || ''}
                            onChange={e => updateField('content.blogButtonText', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Button URL / Link</label>
                        <input
                            className={inputStyle}
                            placeholder="e.g. /blog"
                            value={content.blogButtonLink || ''}
                            onChange={e => updateField('content.blogButtonLink', e.target.value)}
                        />
                    </div>
                </div>

                {/* Features Input List (Max 4 Items) */}
                <div className="space-y-3 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <label className={labelStyle}>
                            Blog Features <span className="text-xs text-slate-400 font-normal">(Max 4)</span>
                        </label>

                        {(content.blogFeatures || []).length < 4 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const currentFeatures = content.blogFeatures || [];
                                    if (currentFeatures.length < 4) {
                                        updateField('content.blogFeatures', [...currentFeatures, '']);
                                    }
                                }}
                                className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                            >
                                + Add Feature
                            </button>
                        )}
                    </div>

                    {(content.blogFeatures || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                                className={inputStyle}
                                placeholder={`Feature ${idx + 1}`}
                                value={feature}
                                onChange={e => {
                                    const updated = [...(content.blogFeatures || [])];
                                    updated[idx] = e.target.value;
                                    updateField('content.blogFeatures', updated);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = (content.blogFeatures || []).filter((_, i) => i !== idx);
                                    updateField('content.blogFeatures', updated);
                                }}
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-md transition-colors text-xs font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {(!content.blogFeatures || content.blogFeatures.length === 0) && (
                        <p className="text-xs text-slate-400 italic">No features added. Click "+ Add Feature" to add up to 4 features.</p>
                    )}
                </div>
            </SectionWrapper>
            {/* 17. BLOG SECTION */}
            {/* <SectionWrapper id="blogs" icon={MessageSquare} title="17. Blog Section" activeSections={activeSections}>
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
            </SectionWrapper> */}

            {/* 18. WORKFLOW ADD-ONS SECTION */}
            <SectionWrapper id="workflowAddOns" icon={Puzzle} title="11. Workflow Add-Ons" activeSections={activeSections}>

                {/* HEADER TEXT */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={labelStyle}>Title Lead (e.g. Add more power)</label>
                        <input
                            className={inputStyle}
                            placeholder="Add more power"
                            value={content.workflowAddOns?.titleLead || ''}
                            onChange={(e) => updateField('content.workflowAddOns.titleLead', e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className={labelStyle}>Title Accent (highlighted, e.g. to your workflow)</label>
                        <input
                            className={inputStyle}
                            placeholder="to your workflow"
                            value={content.workflowAddOns?.titleAccent || ''}
                            onChange={(e) => updateField('content.workflowAddOns.titleAccent', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Footnote</label>
                    <textarea
                        className={inputStyle}
                        rows={2}
                        placeholder="Select your paid plan first, then add any add-on in-app..."
                        value={content.workflowAddOns?.footnote || ''}
                        onChange={(e) => updateField('content.workflowAddOns.footnote', e.target.value)}
                    />
                </div>

                {/* CARDS */}
                <div className="space-y-6 pt-4 border-t border-slate-100">
                    <label className={labelStyle}>Add-on Cards</label>

                    {(content.workflowAddOns?.cards || []).map((card, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative space-y-4">
                            <button
                                type="button"
                                onClick={() =>
                                    updateField('content.workflowAddOns.cards', (prev) =>
                                        (prev || []).filter((_, idx) => idx !== i)
                                    )
                                }
                                className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Card header fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={labelStyle}>Eyebrow (e.g. Add-on)</label>
                                    <input
                                        className={inputStyle}
                                        placeholder="Add-on"
                                        value={card.eyebrow || ''}
                                        onChange={(e) => updateField(`content.workflowAddOns.cards.${i}.eyebrow`, e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Card Name</label>
                                    <input
                                        className={inputStyle}
                                        placeholder="e.g. Inbound"
                                        value={card.name || ''}
                                        onChange={(e) => updateField(`content.workflowAddOns.cards.${i}.name`, e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Pricing fields */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className={labelStyle}>Price (e.g. $119)</label>
                                    <input
                                        className={inputStyle}
                                        placeholder="$119"
                                        value={card.price || ''}
                                        onChange={(e) => updateField(`content.workflowAddOns.cards.${i}.price`, e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Price Unit</label>
                                    <input
                                        className={inputStyle}
                                        placeholder="Per team, per month"
                                        value={card.priceUnit || ''}
                                        onChange={(e) => updateField(`content.workflowAddOns.cards.${i}.priceUnit`, e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelStyle}>Price Note</label>
                                    <input
                                        className={inputStyle}
                                        placeholder="billed annually"
                                        value={card.priceNote || ''}
                                        onChange={(e) => updateField(`content.workflowAddOns.cards.${i}.priceNote`, e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Features list */}
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100">
                                <label className={labelStyle}>Features</label>

                                {(card.features || []).map((feature, j) => (
                                    <div key={j} className="bg-slate-50 p-3 rounded-lg border border-slate-200 relative space-y-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateField(`content.workflowAddOns.cards.${i}.features`, (prev) =>
                                                    (prev || []).filter((_, idx) => idx !== j)
                                                )
                                            }
                                            className="absolute top-2 right-2 text-slate-300 hover:text-rose-500"
                                        >
                                            <X size={14} />
                                        </button>

                                        <div className="grid md:grid-cols-2 gap-2">
                                            <input
                                                className="p-2 bg-white border rounded text-xs font-bold"
                                                placeholder="Feature Title"
                                                value={feature.title || ''}
                                                onChange={(e) =>
                                                    updateField(`content.workflowAddOns.cards.${i}.features.${j}.title`, e.target.value)
                                                }
                                            />
                                            <input
                                                className="p-2 bg-white border rounded text-xs"
                                                placeholder="Badge (optional, e.g. Coming soon)"
                                                value={feature.badge || ''}
                                                onChange={(e) =>
                                                    updateField(`content.workflowAddOns.cards.${i}.features.${j}.badge`, e.target.value)
                                                }
                                            />
                                        </div>

                                        <textarea
                                            className="w-full p-2 bg-white border rounded text-xs"
                                            rows={2}
                                            placeholder="Feature description"
                                            value={feature.description || ''}
                                            onChange={(e) =>
                                                updateField(`content.workflowAddOns.cards.${i}.features.${j}.description`, e.target.value)
                                            }
                                        />
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateField(`content.workflowAddOns.cards.${i}.features`, (prev) => [
                                            ...(prev || []),
                                            { title: "", description: "", badge: "" },
                                        ])
                                    }
                                    className="text-[10px] font-bold text-sky-600"
                                >
                                    + Add Feature
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            updateField('content.workflowAddOns.cards', (prev) => [
                                ...(prev || []),
                                {
                                    eyebrow: "Add-on",
                                    name: "",
                                    price: "",
                                    priceUnit: "",
                                    priceNote: "",
                                    features: [],
                                },
                            ])
                        }
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-sky-600 hover:border-sky-300 transition-all font-bold"
                    >
                        <Plus size={20} /> Add New Card
                    </button>
                </div>
            </SectionWrapper>


            {/* 15. FAQ Section */}
            <SectionWrapper id="faq" icon={HelpCircle} title="12. FAQ Section" activeSections={activeSections}>
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

            {/* 17. MOBILE FEATURES SECTION */}
            <SectionWrapper
                id="feat"
                icon={ Puzzle}
                title="13. Mobile Section"
                description="Manage the Mobile Features section content and feature list."
            >
                {/* Core Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={labelStyle}>Mobile Features Section Title</label>
                        <input
                            className={inputStyle}
                            placeholder="e.g. Powerful Mobile Features"
                            value={content.mobileFeaturesTitle || ''}
                            onChange={e => updateField('content.mobileFeaturesTitle', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Mobile Features Section Subtitle</label>
                        <input
                            className={inputStyle}
                            placeholder="Discover the powerful features of our mobile app..."
                            value={content.mobileFeaturesSubtitle || ''}
                            onChange={e => updateField('content.mobileFeaturesSubtitle', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Button Text</label>
                        <input
                            className={inputStyle}
                            placeholder="e.g. Explore Features"
                            value={content.mobileFeaturesButtonText || ''}
                            onChange={e => updateField('content.mobileFeaturesButtonText', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Button URL / Link</label>
                        <input
                            className={inputStyle}
                            placeholder="e.g. /features"
                            value={content.mobileFeaturesButtonLink || ''}
                            onChange={e => updateField('content.mobileFeaturesButtonLink', e.target.value)}
                        />
                    </div>
                </div>

                {/* Features Input List (Max 4 Items) */}
                <div className="space-y-3 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <label className={labelStyle}>
                            Mobile Features{" "}
                            <span className="text-xs text-slate-400 font-normal">
                                (Max 4)
                            </span>
                        </label>

                        {(content.mobileFeatures || []).length < 4 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const currentFeatures = content.mobileFeatures || [];
                                    if (currentFeatures.length < 4) {
                                        updateField("content.mobileFeatures", [
                                            ...currentFeatures,
                                            "",
                                        ]);
                                    }
                                }}
                                className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                            >
                                + Add Feature
                            </button>
                        )}
                    </div>

                    {(content.mobileFeatures || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                                className={inputStyle}
                                placeholder={`Feature ${idx + 1}`}
                                value={feature}
                                onChange={e => {
                                    const updated = [...(content.mobileFeatures || [])];
                                    updated[idx] = e.target.value;
                                    updateField("content.mobileFeatures", updated);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = (content.mobileFeatures || []).filter(
                                        (_, i) => i !== idx
                                    );
                                    updateField("content.mobileFeatures", updated);
                                }}
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-md transition-colors text-xs font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {(!content.mobileFeatures ||
                        content.mobileFeatures.length === 0) && (
                            <p className="text-xs text-slate-400 italic">
                                No features added. Click "+ Add Feature" to add up to 4
                                features.
                            </p>
                        )}
                </div>
            </SectionWrapper>

        </div>
    );
}