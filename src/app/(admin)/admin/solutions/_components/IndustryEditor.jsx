import React from 'react';
import { 
    Smartphone, Layout, Database, Code, Settings, Zap, 
    BarChart3, ShieldCheck, DollarSign, Plus, X, 
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare, Users, Layers, Target
} from "lucide-react";

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400";

// --- 2. ARRAY FIELD COMPONENT ---
const ArrayField = ({ label, path, items, renderItem, updateField, defaultItem = {} }) => (
    <div className="space-y-2">
        {label && <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>}
        <div className="space-y-2">
            {Array.isArray(items) && items.map((item, idx) => {
                if (!item) return null;
                return (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100 group relative">
                        <div className="flex-1 grid gap-2">
                            {renderItem(item, idx)}
                        </div>
                        <button 
                            onClick={() => {
                                const newItems = items.filter((_, i) => i !== idx);
                                updateField(path, newItems);
                            }} 
                            className="text-slate-400 hover:text-rose-500 p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
        <button 
            onClick={() => updateField(path, [...(items || []), defaultItem])}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors border border-emerald-100"
        >
            <Plus size={14} /> Add Item
        </button>
    </div>
);

// --- 3. SECTION WRAPPER ---
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

// --- 4. MAIN INDUSTRY EDITOR ---
export default function IndustryEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            
            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Industry Hero Section" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title (e.g. Healthcare Software Development)" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                <textarea className={inputStyle} rows={3} placeholder="Description" value={content.hero?.description || ''} onChange={e => updateField('content.hero.description', e.target.value)} />
                <MediaInput label="Hero Background Image" value={content.hero?.image} path="content.hero.image" />
            </SectionWrapper>

            {/* 2. CHALLENGES WE SOLVE (UPDATED with Image & Stats) */}
            <SectionWrapper id="challenges" icon={Target} title="2. Industry Challenges We Solve" activeSections={activeSections}>
                {/* Main Text */}
                <input className={inputStyle} placeholder="Section Title" value={content.challenges?.title || ''} onChange={e => updateField('content.challenges.title', e.target.value)} />
                <textarea className={inputStyle} rows={2} placeholder="Subtitle/Description" value={content.challenges?.subtitle || ''} onChange={e => updateField('content.challenges.subtitle', e.target.value)} />
                
                {/* Side Image Upload */}
                <div className="border-t border-slate-100 pt-4 mt-2">
                    <MediaInput label="Side Image" value={content.challenges?.image} path="content.challenges.image" />
                </div>

                {/* Floating Stats Inputs */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Floating Stats (3 Items)</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="space-y-1">
                                <input
                                    className="w-full p-2 bg-white border rounded text-xs font-bold text-center"
                                    placeholder="Value (e.g. 5+)"
                                    value={content.challenges?.stats?.[i]?.value || ''}
                                    onChange={e => {
                                        const arr = [...(content.challenges?.stats || [{}, {}, {}])];
                                        if(!arr[i]) arr[i] = {};
                                        arr[i].value = e.target.value;
                                        updateField('content.challenges.stats', arr);
                                    }}
                                />
                                <input
                                    className="w-full p-2 bg-white border rounded text-xs text-center text-slate-500"
                                    placeholder="Label (e.g. Years Exp)"
                                    value={content.challenges?.stats?.[i]?.label || ''}
                                    onChange={e => {
                                        const arr = [...(content.challenges?.stats || [{}, {}, {}])];
                                        if(!arr[i]) arr[i] = {};
                                        arr[i].label = e.target.value;
                                        updateField('content.challenges.stats', arr);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Challenges List (Only Title) */}
                <ArrayField 
                    label="Challenges List (Points Only)" 
                    path="content.challenges.items" 
                    items={content.challenges?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "" }}
                    renderItem={(item, i) => (
                        <input 
                            className="w-full p-2 bg-white border rounded text-sm font-bold" 
                            placeholder="Challenge Point (e.g. Data Security)" 
                            value={item.title || ''} 
                            onChange={e => {
                                const arr = [...(content.challenges?.items || [])]; 
                                arr[i].title = e.target.value; 
                                updateField('content.challenges.items', arr);
                            }} 
                        />
                    )}
                />
            </SectionWrapper>

          
{/* 3. WHAT WE COVER */}
            <SectionWrapper id="covers" icon={Layers} title="3. What Softkingo Covers" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.covers?.title || ''} onChange={e => updateField('content.covers.title', e.target.value)} />
                <ArrayField 
                    label="Service Areas" 
                    path="content.covers.items" 
                    items={content.covers?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "", icon: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Service Title" value={item.title || ''} onChange={e => {
                                const arr = [...(content.covers?.items || [])]; arr[i].title = e.target.value; updateField('content.covers.items', arr);
                            }} />
                            <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Icon Name / URL" value={item.icon || ''} onChange={e => {
                                const arr = [...(content.covers?.items || [])]; arr[i].icon = e.target.value; updateField('content.covers.items', arr);
                            }} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                const arr = [...(content.covers?.items || [])]; arr[i].description = e.target.value; updateField('content.covers.items', arr);
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 4. ADVANCED TECHNOLOGIES (Updated with MediaInput) */}
            <SectionWrapper id="technologies" icon={Code} title="4. Advanced Technologies We Use" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.technologies?.title || ''} onChange={e => updateField('content.technologies.title', e.target.value)} />
                <p className="text-xs text-slate-400 mb-2">These will appear in the carousel.</p>
                <ArrayField 
                    label="Technologies List" 
                    path="content.technologies.items" 
                    items={content.technologies?.items} 
                    updateField={updateField}
                    defaultItem={{ name: "", image: "" }}
                    renderItem={(item, i) => (
                        <div className="flex gap-4 items-center bg-white p-3 rounded border border-slate-100">
                            {/* Tech Name */}
                            <div className="flex-1">
                                <input 
                                    className="w-full p-2 bg-slate-50 border rounded text-sm font-bold" 
                                    placeholder="Tech Name (e.g. React Native)" 
                                    value={item.name || ''} 
                                    onChange={e => {
                                        const arr = [...(content.technologies?.items || [])]; 
                                        arr[i].name = e.target.value; 
                                        updateField('content.technologies.items', arr);
                                    }} 
                                />
                            </div>
                            
                            {/* Tech Image using MediaInput (Small) */}
                            <div className="w-1/2">
                                <MediaInput 
                                    label="Icon" 
                                    value={item.image} 
                                    path={`content.technologies.items.${i}.image`} 
                                    onUpdate={(path, val) => {
                                        const arr = [...(content.technologies?.items || [])];
                                        arr[i].image = val;
                                        updateField('content.technologies.items', arr);
                                    }}
                                    // Hack: We need to pass the browse trigger manually or handle it inside MediaInput wrapper
                                    // Since MediaInput expects onBrowse, ensure it's passed or handled correctly
                                /> 
                                {/* Note: Since MediaInput logic is in parent, you might need to adjust path handling 
                                    or pass a specific onBrowse/onUpdate wrapper if the generic one fails for arrays.
                                    Assuming MediaInput from props handles path string correctly. */}
                            </div>
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 5. PORTFOLIO (Updated Fields)  */}
            <SectionWrapper id="portfolio" icon={Layout} title="5. Industry Portfolio" activeSections={activeSections}>
                <div className="space-y-4">
                    <input 
                        className={inputStyle} 
                        placeholder="Portfolio Type (default: industry)" 
                        value={content.portfolio?.type || ''} 
                        onChange={e => updateField('content.portfolio.type', e.target.value)} 
                    />
                    <input 
                        className={inputStyle} 
                        placeholder="Category Tag (e.g. healthcare)" 
                        value={content.portfolio?.category || ''} 
                        onChange={e => updateField('content.portfolio.category', e.target.value)} 
                    />
                    <input 
                        className={inputStyle} 
                        placeholder="Section Title (e.g. Our Success Stories)" 
                        value={content.portfolio?.title || ''} 
                        onChange={e => updateField('content.portfolio.title', e.target.value)} 
                    />
                    <input 
                        className={inputStyle} 
                        placeholder="Subtitle (Optional)" 
                        value={content.portfolio?.subtitle || ''} 
                        onChange={e => updateField('content.portfolio.subtitle', e.target.value)} 
                    />
                </div>
            </SectionWrapper>
            {/* 6. OTHER INDUSTRIES */}
            <SectionWrapper id="otherIndustries" icon={Briefcase} title="6. Other Industries We Serve" activeSections={activeSections}>
                <p className="text-sm text-slate-500">Automatically displays other industry links.</p>
            </SectionWrapper>

            {/* 7. WHY CHOOSE */}
            <SectionWrapper id="whyChoose" icon={ShieldCheck} title="7. Why Choose Softkingo" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.whyChoose?.title || ''} onChange={e => updateField('content.whyChoose.title', e.target.value)} />
                <ArrayField 
                    label="Reasons" 
                    path="content.whyChoose.items" 
                    items={content.whyChoose?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Reason Title" value={item.title || ''} onChange={e => {
                                const arr = [...(content.whyChoose?.items || [])]; arr[i].title = e.target.value; updateField('content.whyChoose.items', arr);
                            }} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                const arr = [...(content.whyChoose?.items || [])]; arr[i].description = e.target.value; updateField('content.whyChoose.items', arr);
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 8. DEVELOPMENT PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="8. Our Development Process" activeSections={activeSections}>
                <ArrayField 
                    label="Process Steps" 
                    path="content.process.steps" 
                    items={content.process?.steps} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "" }}
                    renderItem={(step, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Step Name" value={step.title || ''} onChange={e => {
                                const arr = [...(content.process?.steps || [])]; arr[i].title = e.target.value; updateField('content.process.steps', arr);
                            }} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" placeholder="Description" value={step.description || ''} onChange={e => {
                                const arr = [...(content.process?.steps || [])]; arr[i].description = e.target.value; updateField('content.process.steps', arr);
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 9. FAQ */}
            <SectionWrapper id="faq" icon={HelpCircle} title="9. FAQ" activeSections={activeSections}>
                <ArrayField 
                    label="Questions" 
                    path="content.faq.items" 
                    items={content.faq?.items} 
                    updateField={updateField}
                    defaultItem={{ q: "", a: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Question" value={item.q || ''} onChange={e => {
                                const arr = [...(content.faq?.items || [])]; arr[i].q = e.target.value; updateField('content.faq.items', arr);
                            }} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Answer" value={item.a || ''} onChange={e => {
                                const arr = [...(content.faq?.items || [])]; arr[i].a = e.target.value; updateField('content.faq.items', arr);
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 10. TESTIMONIALS */}
            <SectionWrapper id="testimonials" icon={MessageSquare} title="10. Client Testimonials" activeSections={activeSections}>
                <ArrayField 
                    label="Testimonials" 
                    path="content.testimonials.items" 
                    items={content.testimonials?.items} 
                    updateField={updateField}
                    defaultItem={{ name: "", role: "", feedback: "", image: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input className="flex-1 p-2 bg-white border rounded text-sm font-bold" placeholder="Client Name" value={item.name || ''} onChange={e => {
                                    const arr = [...(content.testimonials?.items || [])]; arr[i].name = e.target.value; updateField('content.testimonials.items', arr);
                                }} />
                                <input className="flex-1 p-2 bg-white border rounded text-sm" placeholder="Role/Company" value={item.role || ''} onChange={e => {
                                    const arr = [...(content.testimonials?.items || [])]; arr[i].role = e.target.value; updateField('content.testimonials.items', arr);
                                }} />
                            </div>
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Feedback" value={item.feedback || ''} onChange={e => {
                                const arr = [...(content.testimonials?.items || [])]; arr[i].feedback = e.target.value; updateField('content.testimonials.items', arr);
                            }} />
                            <input className="w-full p-2 bg-white border rounded text-sm" placeholder="Client Image URL" value={item.image || ''} onChange={e => {
                                const arr = [...(content.testimonials?.items || [])]; arr[i].image = e.target.value; updateField('content.testimonials.items', arr);
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

        </div>
    );
}