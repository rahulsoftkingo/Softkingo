import React from 'react';
import { 
    Smartphone, Layout, Database, Code, Settings, Zap, 
    BarChart3, ShieldCheck, DollarSign, Plus, X, 
    HelpCircle, Briefcase, MousePointerClick, Award, MessageSquare
} from "lucide-react";

// --- 1. GLOBAL STYLES ---
const inputStyle = "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-400";

// --- 2. ARRAY FIELD COMPONENT (FIXED) ---
// ✅ FIX: added 'updateField' to props destructuring below
const ArrayField = ({ label, path, items, renderItem, updateField, defaultItem = {} }) => (
    <div className="space-y-2">
        {label && <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>}
        <div className="space-y-2">
            {Array.isArray(items) && items.map((item, idx) => {
                if (!item && typeof item !== 'string') return null; // Simple null check
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
            onClick={() => {
                // Ensure items is an array before spreading
                const currentItems = Array.isArray(items) ? items : [];
                updateField(path, [...currentItems, defaultItem]);
            }}
            className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg transition-colors border border-sky-100"
        >
            <Plus size={14} /> Add Item
        </button>
    </div>
);

// --- 3. SECTION WRAPPER ---
const SectionWrapper = ({ id, icon: Icon, title, children, activeSections }) => {
    if (!activeSections?.includes(id)) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><Icon size={18} /></div>
                <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            {children}
        </div>
    );
};

// --- 4. MAIN EDITOR COMPONENT ---
export default function SolutionsEditor({ formData, updateField, MediaInput, activeSections }) {
    const content = formData?.content || {};

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            
            {/* 1. HERO SECTION */}
            <SectionWrapper id="hero" icon={Smartphone} title="1. Hero Section" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Badge (e.g. Trusted by 500+)" value={content.hero?.badge || ''} onChange={e => updateField('content.hero.badge', e.target.value)} />
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Main Title (Line 1)" value={content.hero?.title || ''} onChange={e => updateField('content.hero.title', e.target.value)} />
                    <input className={`${inputStyle} text-sky-600 font-semibold`} placeholder="Highlight Text (Line 2)" value={content.hero?.highlight || ''} onChange={e => updateField('content.hero.highlight', e.target.value)} />
                </div>
                <textarea className={inputStyle} rows={3} placeholder="Description" value={content.hero?.description || ''} onChange={e => updateField('content.hero.description', e.target.value)} />
                <MediaInput label="Hero Image" value={content.hero?.image} path="content.hero.image" />
            </SectionWrapper>

            {/* 2. STATS */}
            <SectionWrapper id="stats" icon={BarChart3} title="2. Statistics Banner" activeSections={activeSections}>
                <ArrayField 
                    label="Stats Items" 
                    path="content.stats.items" 
                    items={content.stats?.items} 
                    updateField={updateField}
                    defaultItem={{ value: "", label: "" }}
                    renderItem={(item, i) => (
                        <div className="grid grid-cols-2 gap-2">
                            <input className="bg-white p-2 border rounded text-sm" placeholder="Value (e.g. 1M+)" value={item.value || ''} onChange={e => {
                                const arr = [...(content.stats?.items || [])]; if(arr[i]) { arr[i].value = e.target.value; updateField('content.stats.items', arr); }
                            }} />
                            <input className="bg-white p-2 border rounded text-sm" placeholder="Label (e.g. Downloads)" value={item.label || ''} onChange={e => {
                                const arr = [...(content.stats?.items || [])]; if(arr[i]) { arr[i].label = e.target.value; updateField('content.stats.items', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 3. INTRO */}
            <SectionWrapper id="intro" icon={Layout} title="3. Introduction" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Section Title" value={content.intro?.title || ''} onChange={e => updateField('content.intro.title', e.target.value)} />
                <textarea className={inputStyle} rows={3} placeholder="Description" value={content.intro?.description || ''} onChange={e => updateField('content.intro.description', e.target.value)} />
                <div className="grid md:grid-cols-2 gap-4">
                    <MediaInput label="Intro Image" value={content.intro?.image} path="content.intro.image" />
                    <div>
                        <label className="text-xs font-bold text-slate-400 mb-2 block">KEY POINTS LIST</label>
                        <textarea 
                            className={`${inputStyle} font-mono text-xs`} 
                            rows={5} 
                            placeholder="Enter points separated by comma" 
                            value={content.intro?.listItems?.join(', ') || ''} 
                            onChange={e => updateField('content.intro.listItems', e.target.value.split(',').map(s => s.trim()))} 
                        />
                    </div>
                </div>
                <input className={inputStyle} placeholder="Pill Text (e.g. Smart LMS)" value={content.intro?.pill || ''} onChange={e => updateField('content.intro.pill', e.target.value)} />
            </SectionWrapper>

            {/* 4. FEATURES GRID */}
            <SectionWrapper id="features" icon={Database} title="4. Features Grid" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Title" value={content.features?.title || ''} onChange={e => updateField('content.features.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Highlight" value={content.features?.highlight || ''} onChange={e => updateField('content.features.highlight', e.target.value)} />
                </div>
                <input className={inputStyle} placeholder="Subtitle" value={content.features?.subtitle || ''} onChange={e => updateField('content.features.subtitle', e.target.value)} />
                
                <ArrayField 
                    label="Grid Items" 
                    path="content.features.items" 
                    items={content.features?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "", image: "" }}
                    renderItem={(item, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 w-full space-y-2">
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm font-bold" placeholder="Title" value={item.title || ''} onChange={e => {
                                const arr = [...(content.features?.items || [])]; if(arr[i]) { arr[i].title = e.target.value; updateField('content.features.items', arr); }
                            }} />
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm" placeholder="Image URL" value={item.image || ''} onChange={e => {
                                const arr = [...(content.features?.items || [])]; if(arr[i]) { arr[i].image = e.target.value; updateField('content.features.items', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                const arr = [...(content.features?.items || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.features.items', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 5. AWARDS */}
            <SectionWrapper id="awards" icon={Award} title="5. Awards Section" activeSections={activeSections}>
                <p className="text-sm text-slate-500">This section is static. Enable to show on page.</p>
            </SectionWrapper>

            {/* 6. WHY NEED */}
            <SectionWrapper id="whyNeed" icon={HelpCircle} title="6. Why Businesses Need This" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.whyNeed?.title || ''} onChange={e => updateField('content.whyNeed.title', e.target.value)} />
                <input className={inputStyle} placeholder="Subtitle" value={content.whyNeed?.subtitle || ''} onChange={e => updateField('content.whyNeed.subtitle', e.target.value)} />
                <ArrayField 
                    label="Benefits" 
                    path="content.whyNeed.items" 
                    items={content.whyNeed?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "", icon: "Zap" }}
                    renderItem={(item, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 w-full space-y-2">
                            <div className="flex gap-2">
                                <input className="w-1/4 p-2 bg-slate-50 border rounded text-sm" placeholder="Icon" value={item.icon || ''} onChange={e => {
                                    const arr = [...(content.whyNeed?.items || [])]; if(arr[i]) { arr[i].icon = e.target.value; updateField('content.whyNeed.items', arr); }
                                }} />
                                <input className="w-3/4 p-2 bg-slate-50 border rounded text-sm font-bold" placeholder="Title" value={item.title || ''} onChange={e => {
                                    const arr = [...(content.whyNeed?.items || [])]; if(arr[i]) { arr[i].title = e.target.value; updateField('content.whyNeed.items', arr); }
                                }} />
                            </div>
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                const arr = [...(content.whyNeed?.items || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.whyNeed.items', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 7. SERVICES LIST */}
            <SectionWrapper id="servicesList" icon={Briefcase} title="7. Solutions Services List" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.servicesList?.title || ''} onChange={e => updateField('content.servicesList.title', e.target.value)} />
                <input className={inputStyle} placeholder="Subtitle" value={content.servicesList?.subtitle || ''} onChange={e => updateField('content.servicesList.subtitle', e.target.value)} />
                
                <ArrayField 
                    label="Tabs" 
                    path="content.servicesList.tabs" 
                    items={content.servicesList?.tabs} 
                    updateField={updateField}
                    defaultItem={{ label: "New Tab", heading: "", description: "", image: "", isWeb: false, items: [] }}
                    renderItem={(tab, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 w-full space-y-3">
                            <div className="flex gap-2">
                                <input className="flex-1 p-2 bg-slate-50 border rounded text-sm font-bold" placeholder="Tab Label" value={tab.label || ''} onChange={e => {
                                    const arr = [...(content.servicesList?.tabs || [])]; if(arr[i]) { arr[i].label = e.target.value; updateField('content.servicesList.tabs', arr); }
                                }} />
                                <label className="flex items-center gap-2 text-xs cursor-pointer">
                                    <input type="checkbox" checked={tab.isWeb || false} onChange={e => {
                                        const arr = [...(content.servicesList?.tabs || [])]; if(arr[i]) { arr[i].isWeb = e.target.checked; updateField('content.servicesList.tabs', arr); }
                                    }} /> Is Web?
                                </label>
                            </div>
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm" placeholder="Tab Heading" value={tab.heading || ''} onChange={e => {
                                const arr = [...(content.servicesList?.tabs || [])]; if(arr[i]) { arr[i].heading = e.target.value; updateField('content.servicesList.tabs', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-sm" placeholder="Tab Description" value={tab.description || ''} onChange={e => {
                                const arr = [...(content.servicesList?.tabs || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.servicesList.tabs', arr); }
                            }} />
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm" placeholder="Image URL" value={tab.image || ''} onChange={e => {
                                const arr = [...(content.servicesList?.tabs || [])]; if(arr[i]) { arr[i].image = e.target.value; updateField('content.servicesList.tabs', arr); }
                            }} />
                            
                            {/* Nested Service Items */}
                            <div className="pl-3 border-l-2 border-slate-100 pt-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Tab List Items</label>
                                {(tab.items || []).map((subItem, sIdx) => (
                                    <div key={sIdx} className="flex gap-2 mt-2">
                                        <input className="w-1/4 p-1 text-xs border rounded" placeholder="Icon" value={subItem.icon} onChange={e => {
                                            const arr = [...(content.servicesList?.tabs || [])]; arr[i].items[sIdx].icon = e.target.value; updateField('content.servicesList.tabs', arr);
                                        }} />
                                        <input className="w-1/4 p-1 text-xs border rounded font-bold" placeholder="Title" value={subItem.title} onChange={e => {
                                            const arr = [...(content.servicesList?.tabs || [])]; arr[i].items[sIdx].title = e.target.value; updateField('content.servicesList.tabs', arr);
                                        }} />
                                        <input className="w-1/2 p-1 text-xs border rounded" placeholder="Desc" value={subItem.description} onChange={e => {
                                            const arr = [...(content.servicesList?.tabs || [])]; arr[i].items[sIdx].description = e.target.value; updateField('content.servicesList.tabs', arr);
                                        }} />
                                        <button onClick={() => {
                                            const arr = [...(content.servicesList?.tabs || [])]; arr[i].items = arr[i].items.filter((_, x) => x !== sIdx); updateField('content.servicesList.tabs', arr);
                                        }} className="text-rose-500"><X size={12}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const arr = [...(content.servicesList?.tabs || [])]; arr[i].items = [...(arr[i].items || []), { icon: "Zap", title: "", description: "" }]; updateField('content.servicesList.tabs', arr);
                                }} className="text-xs text-sky-600 font-bold mt-2">+ Add List Item</button>
                            </div>
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 8. APP MODULES (ONLY USER APP NOW) */}
            <SectionWrapper id="appModules" icon={Smartphone} title="8. User App Features" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Tag (e.g. For Students)" value={content.userApp?.tag || ''} onChange={e => updateField('content.userApp.tag', e.target.value)} />
                <input className={inputStyle} placeholder="Title" value={content.userApp?.title || ''} onChange={e => updateField('content.userApp.title', e.target.value)} />
                <textarea className={inputStyle} rows={2} placeholder="Description" value={content.userApp?.description || ''} onChange={e => updateField('content.userApp.description', e.target.value)} />
                <MediaInput label="Screen Image" value={content.userApp?.image} path="content.userApp.image" />
                
                <div className="bg-white p-3 rounded border border-slate-200">
                    <label className="text-xs font-bold text-slate-400 mb-2 block">FEATURES LIST</label>
                    <ArrayField 
                        label="" 
                        path="content.userApp.features" 
                        items={content.userApp?.features} 
                        updateField={updateField}
                        defaultItem=""
                        renderItem={(item, i) => (
                            <input className="bg-slate-50 p-2 border rounded text-sm w-full" placeholder="Feature Name" value={item || ''} onChange={e => {
                                const arr = [...(content.userApp?.features || [])]; 
                                arr[i] = e.target.value; updateField('content.userApp.features', arr);
                            }} />
                        )}
                    />
                </div>
            </SectionWrapper>

            {/* 9. AI CAPABILITIES */}
            <SectionWrapper id="aiCapabilities" icon={Zap} title="9. AI Capabilities" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.aiCapabilities?.title || ''} onChange={e => updateField('content.aiCapabilities.title', e.target.value)} />
                <ArrayField 
                    label="AI Features" 
                    path="content.aiCapabilities.items" 
                    items={content.aiCapabilities?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "", points: [], image: "" }}
                    renderItem={(item, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 space-y-2 w-full">
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm font-bold" placeholder="Feature Title" value={item.title || ''} onChange={e => {
                                const arr = [...(content.aiCapabilities?.items || [])]; if(arr[i]) { arr[i].title = e.target.value; updateField('content.aiCapabilities.items', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                const arr = [...(content.aiCapabilities?.items || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.aiCapabilities.items', arr); }
                            }} />
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm" placeholder="Image URL" value={item.image || ''} onChange={e => {
                                const arr = [...(content.aiCapabilities?.items || [])]; if(arr[i]) { arr[i].image = e.target.value; updateField('content.aiCapabilities.items', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-xs font-mono" rows={2} placeholder="Points (comma separated)" value={item.points?.join(', ') || ''} onChange={e => {
                                const arr = [...(content.aiCapabilities?.items || [])]; if(arr[i]) { arr[i].points = e.target.value.split(',').map(s=>s.trim()); updateField('content.aiCapabilities.items', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 10. PORTFOLIO CARD */}
            <SectionWrapper id="portfolio" icon={Layout} title="10. Portfolio Card" activeSections={activeSections}>
                <p className="text-sm text-slate-500">This section pulls data from Portfolio Module. Enable to show dynamic portfolio card.</p>
            </SectionWrapper>

            {/* 11. PROCESS */}
            <SectionWrapper id="process" icon={Settings} title="11. Process" activeSections={activeSections}>
                <ArrayField 
                    label="Development Steps" 
                    path="content.process.steps" 
                    items={content.process?.steps} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "" }}
                    renderItem={(step, i) => (
                        <div className="space-y-2 w-full">
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Step Title" value={step.title || ''} onChange={e => {
                                const arr = [...(content.process?.steps || [])]; if(arr[i]) { arr[i].title = e.target.value; updateField('content.process.steps', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={2} placeholder="Step Description" value={step.description || ''} onChange={e => {
                                const arr = [...(content.process?.steps || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.process.steps', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 12. TECH STACK */}
            <SectionWrapper id="techStack" icon={Code} title="12. Tech Stack" activeSections={activeSections}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input className={inputStyle} placeholder="Title" value={content.techStack?.title || ''} onChange={e => updateField('content.techStack.title', e.target.value)} />
                    <input className={inputStyle} placeholder="Highlight" value={content.techStack?.highlight || ''} onChange={e => updateField('content.techStack.highlight', e.target.value)} />
                </div>
                <input className={inputStyle} placeholder="Subtitle" value={content.techStack?.subtitle || ''} onChange={e => updateField('content.techStack.subtitle', e.target.value)} />
                
                <ArrayField 
                    label="Categories" 
                    path="content.techStack.tabs" 
                    items={content.techStack?.tabs} 
                    updateField={updateField}
                    defaultItem={{ label: "New", items: [] }}
                    renderItem={(tab, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 w-full">
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm font-bold mb-3" placeholder="Category Name" value={tab?.label || ''} onChange={e => {
                                const arr = [...(content.techStack?.tabs || [])]; if(arr[i]) { arr[i].label = e.target.value; updateField('content.techStack.tabs', arr); }
                            }} />
                            
                            <div className="pl-3 border-l-2 border-slate-100 space-y-2">
                                {(tab?.items || []).map((tech, tIdx) => (
                                    <div key={tIdx} className="flex gap-2 items-center">
                                        <input className="flex-1 p-2 bg-slate-50 border rounded text-xs" placeholder="Tech Name" value={tech?.name || ''} onChange={e => {
                                            const arr = [...(content.techStack?.tabs || [])]; if(arr[i] && arr[i].items[tIdx]) { arr[i].items[tIdx].name = e.target.value; updateField('content.techStack.tabs', arr); }
                                        }} />
                                        <input className="flex-1 p-2 bg-slate-50 border rounded text-xs" placeholder="Icon URL" value={tech?.image || ''} onChange={e => {
                                            const arr = [...(content.techStack?.tabs || [])]; if(arr[i] && arr[i].items[tIdx]) { arr[i].items[tIdx].image = e.target.value; updateField('content.techStack.tabs', arr); }
                                        }} />
                                        <button onClick={() => {
                                            const arr = [...(content.techStack?.tabs || [])]; if(arr[i]) { arr[i].items = arr[i].items.filter((_, x) => x !== tIdx); updateField('content.techStack.tabs', arr); }
                                        }} className="text-rose-500 p-1"><X size={14}/></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const arr = [...(content.techStack?.tabs || [])]; if(arr[i]) { arr[i].items = [...(arr[i].items || []), { name: "", image: "" }]; updateField('content.techStack.tabs', arr); }
                                }} className="text-xs text-sky-600 font-bold">+ Add Tech</button>
                            </div>
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 13. REVENUE MODELS */}
            <SectionWrapper id="monetization" icon={DollarSign} title="13. Revenue Models" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.monetization?.title || ''} onChange={e => updateField('content.monetization.title', e.target.value)} />
                <ArrayField 
                    label="Models" 
                    path="content.monetization.models" 
                    items={content.monetization?.models} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "", points: [] }}
                    renderItem={(item, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 space-y-2 w-full">
                            <input className="w-full p-2 bg-slate-50 border rounded text-sm font-bold" placeholder="Model Title" value={item.title || ''} onChange={e => {
                                const arr = [...(content.monetization?.models || [])]; if(arr[i]) { arr[i].title = e.target.value; updateField('content.monetization.models', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                const arr = [...(content.monetization?.models || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.monetization.models', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-xs font-mono" rows={2} placeholder="Points (comma separated)" value={item.points?.join(', ') || ''} onChange={e => {
                                const arr = [...(content.monetization?.models || [])]; if(arr[i]) { arr[i].points = e.target.value.split(',').map(s=>s.trim()); updateField('content.monetization.models', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 14. SECURITY / WHY CHOOSE */}
            <SectionWrapper id="whyChoose" icon={ShieldCheck} title="14. Security & Why Choose" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.whyChoose?.title || ''} onChange={e => updateField('content.whyChoose.title', e.target.value)} />
                <input className={inputStyle} placeholder="Subtitle" value={content.whyChoose?.subtitle || ''} onChange={e => updateField('content.whyChoose.subtitle', e.target.value)} />
                
                <ArrayField 
                    label="Reasons" 
                    path="content.whyChoose.items" 
                    items={content.whyChoose?.items} 
                    updateField={updateField}
                    defaultItem={{ title: "", description: "", icon: "Zap", points: [] }}
                    renderItem={(item, i) => (
                        <div className="bg-white p-3 rounded border border-slate-200 space-y-2 w-full">
                            <div className="flex gap-2">
                                <input className="w-1/4 p-2 bg-slate-50 border rounded text-sm" placeholder="Icon Name" value={item.icon || ''} onChange={e => {
                                    const arr = [...(content.whyChoose?.items || [])]; if(arr[i]) { arr[i].icon = e.target.value; updateField('content.whyChoose.items', arr); }
                                }} />
                                <input className="w-3/4 p-2 bg-slate-50 border rounded text-sm font-bold" placeholder="Title" value={item.title || ''} onChange={e => {
                                    const arr = [...(content.whyChoose?.items || [])]; if(arr[i]) { arr[i].title = e.target.value; updateField('content.whyChoose.items', arr); }
                                }} />
                            </div>
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-sm" rows={2} placeholder="Description" value={item.description || ''} onChange={e => {
                                    const arr = [...(content.whyChoose?.items || [])]; if(arr[i]) { arr[i].description = e.target.value; updateField('content.whyChoose.items', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-slate-50 border rounded text-xs font-mono" rows={2} placeholder="Points (comma separated)" value={item.points?.join(', ') || ''} onChange={e => {
                                    const arr = [...(content.whyChoose?.items || [])]; if(arr[i]) { arr[i].points = e.target.value.split(',').map(s=>s.trim()); updateField('content.whyChoose.items', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 15. CONSULTATION CTA */}
            <SectionWrapper id="consultation" icon={MessageSquare} title="15. Consultation CTA" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.consultation?.title || ''} onChange={e => updateField('content.consultation.title', e.target.value)} />
                <input className={inputStyle} placeholder="Subtitle" value={content.consultation?.subtitle || ''} onChange={e => updateField('content.consultation.subtitle', e.target.value)} />
                <input className={inputStyle} placeholder="Button Text" value={content.consultation?.btnText || ''} onChange={e => updateField('content.consultation.btnText', e.target.value)} />
                <MediaInput label="CTA Image" value={content.consultation?.image} path="content.consultation.image" />
            </SectionWrapper>

            {/* 16. FAQ */}
            <SectionWrapper id="faq" icon={HelpCircle} title="16. FAQ Section" activeSections={activeSections}>
                <input className={inputStyle} placeholder="FAQ Title" value={content.faq?.title || ''} onChange={e => updateField('content.faq.title', e.target.value)} />
                <input className={inputStyle} placeholder="FAQ Subtitle" value={content.faq?.subtitle || ''} onChange={e => updateField('content.faq.subtitle', e.target.value)} />
                <ArrayField 
                    label="Questions" 
                    path="content.faq.items" 
                    items={content.faq?.items} 
                    updateField={updateField}
                    defaultItem={{ q: "", a: "" }}
                    renderItem={(item, i) => (
                        <div className="space-y-2 w-full">
                            <input className="w-full p-2 bg-white border rounded text-sm font-bold" placeholder="Question" value={item.q || ''} onChange={e => {
                                const arr = [...(content.faq?.items || [])]; if(arr[i]) { arr[i].q = e.target.value; updateField('content.faq.items', arr); }
                            }} />
                            <textarea className="w-full p-2 bg-white border rounded text-sm" rows={3} placeholder="Answer" value={item.a || ''} onChange={e => {
                                const arr = [...(content.faq?.items || [])]; if(arr[i]) { arr[i].a = e.target.value; updateField('content.faq.items', arr); }
                            }} />
                        </div>
                    )}
                />
            </SectionWrapper>

            {/* 17. BOTTOM CTA */}
            <SectionWrapper id="cta" icon={MousePointerClick} title="17. Bottom CTA" activeSections={activeSections}>
                <input className={inputStyle} placeholder="Title" value={content.cta?.title || ''} onChange={e => updateField('content.cta.title', e.target.value)} />
                <input className={inputStyle} placeholder="Subtitle" value={content.cta?.subtitle || ''} onChange={e => updateField('content.cta.subtitle', e.target.value)} />
                <input className={inputStyle} placeholder="Button Text" value={content.cta?.btnText || ''} onChange={e => updateField('content.cta.btnText', e.target.value)} />
            </SectionWrapper>

        </div>
    );
}