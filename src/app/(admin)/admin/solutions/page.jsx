// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { 
//   Save, Plus, Trash2, Edit3, Globe, Layout, 
//   Smartphone, Layers, Search, X, RefreshCw,
//   ArrowLeft, Settings, Database, ListOrdered, 
//   HelpCircle, Target, Image as ImageIcon, ZoomIn, 
//   Folder, CheckCircle2, ChevronRight, Home, ExternalLink
// } from "lucide-react";
// import Image from "next/image";

// export default function SolutionsAdmin() {
//     const [items, setItems] = useState({ solutions: [], industries: [] });
//     const [loading, setLoading] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [uploadingField, setUploadingField] = useState(null);

//     // Image Browser States
//     const [showImageBrowser, setShowImageBrowser] = useState(false);
//     const [currentImageField, setCurrentImageField] = useState('');
//     const [currentFolder, setCurrentFolder] = useState('');
//     const [folderFiles, setFolderFiles] = useState([]);

//     const initialForm = {
//         section: "solutions",
//         type: "ondemand", 
//         slug: "",
//         content: {
//             hero: { title: "", subtitle: "", tag: "Premium", image: "" },
//             stats: [{ label: "Projects Delivered", value: "500+" }],
//             services: [{ title: "", image: "" }],
//             caseStudy: { title: "", description: "", tech: "Next.js, Tailwind v4", image: "" },
//             methodology: [{ title: "Analysis", desc: "Understanding goals" }],
//             benefits: [{ title: "Why Softkingo?", desc: "Industry-leading expertise." }], 
//             cta: { title: "Ready to Scale Your Vision?", btnText: "Start Now" }
//         }
//     };
//     const [formData, setFormData] = useState(initialForm);

//     // ========== API FETCHERS ==========
//     const fetchItems = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch("/api/admin/solutions?section=all");
//             const json = await res.json();
//             if (json.ok) setItems(json.data);
//         } catch (e) { console.error("List Fetch Error:", e); }
//         setLoading(false);
//     };

//     const fetchFolderFiles = async (folder = '') => {
//         try {
//             const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
//             if (res.ok) {
//                 const data = await res.json();
//                 setFolderFiles(data.files || []);
//             }
//         } catch (err) { console.error('Media fetch error:', err); }
//     };

//     useEffect(() => { fetchItems(); }, []);

//     // ========== HANDLERS ==========
//     const handleEdit = async (section, slug) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/admin/solutions?section=${section}&slug=${slug}`);
//             const json = await res.json();
//             if (json.ok) {
//                 setFormData(json.data);
//                 setIsEditing(true);
//             }
//         } catch (e) { alert("Failed to load data.json from folder"); }
//         setLoading(false);
//     };

//     const handleSave = async () => {
//         if (!formData.slug) return alert("URL Slug is required!");
//         setLoading(true);
//         const res = await fetch("/api/admin/solutions", {
//             method: "POST",
//             body: JSON.stringify(formData)
//         });
//         if (res.ok) {
//             setIsEditing(false);
//             fetchItems();
//             setFormData(initialForm);
//             alert("Folder and page.jsx generated successfully! ✅");
//         }
//         setLoading(false);
//     };

//     const handleDelete = async (section, slug) => {
//         if (!confirm(`Confirm deletion of /${section}/${slug}?`)) return;
//         const res = await fetch("/api/admin/solutions", {
//             method: "DELETE",
//             body: JSON.stringify({ section, slug })
//         });
//         if (res.ok) fetchItems();
//     };

//     const openBrowser = (fieldName) => {
//         setCurrentImageField(fieldName);
//         setShowImageBrowser(true);
//         fetchFolderFiles('');
//     };

//     // ========== UI COMPONENTS (LOCAL) ==========
//     const MediaInput = ({ label, value, path }) => (
//         <div className="space-y-2">
//             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</label>
//             <div className="flex gap-2">
//                 <input 
//                     className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
//                     value={value} 
//                     readOnly
//                 />
//                 <button 
//                     onClick={() => openBrowser(path)}
//                     className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-sky-600 transition-colors"
//                 >
//                     <Folder size={16}/>
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen text-slate-800">
//             {!isEditing ? (
//                 /* ---------------- DASHBOARD LIST VIEW ---------------- */
//                 <div className="max-w-7xl mx-auto space-y-10">
//                     <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl border shadow-sm">
//                         <div>
//                             <h1 className="text-3xl font-black tracking-tight">Solutions Architect</h1>
//                             <p className="text-slate-400 font-medium">Auto-generate folder-based page routes</p>
//                         </div>
//                         <button onClick={() => { setFormData(initialForm); setIsEditing(true); }} className="bg-sky-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black shadow-xl shadow-sky-200 hover:scale-105 transition-all">
//                             <Plus size={20}/> Build New Page
//                         </button>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-10">
//                         {["solutions", "industries"].map(sec => (
//                             <div key={sec} className="space-y-4">
//                                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 px-2 flex items-center gap-2">
//                                     <Layers size={14}/> {sec} Listing
//                                 </h3>
//                                 <div className="grid gap-3">
//                                     {items[sec]?.map(it => (
//                                         <div key={it.slug} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center group hover:border-sky-400 transition-all shadow-sm">
//                                             <div className="min-w-0">
//                                                 <div className="font-bold text-slate-700">{it.title || it.slug}</div>
//                                                 <div className="text-[10px] font-mono text-sky-500 uppercase tracking-tighter">{it.url}</div>
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <button onClick={() => handleEdit(sec, it.slug)} className="p-2.5 bg-slate-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-colors"><Edit3 size={16}/></button>
//                                                 <button onClick={() => handleDelete(sec, it.slug)} className="p-2.5 bg-slate-50 text-red-500 rounded-xl hover:bg-red-50 transition-colors"><Trash2 size={16}/></button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 /* ---------------- PAGE BUILDER EDITOR ---------------- */
//                 <div className="max-w-6xl mx-auto space-y-8">
//                     <div className="sticky top-4 z-[50] flex justify-between items-center bg-white/90 backdrop-blur-md p-5 rounded-[2.5rem] border shadow-2xl">
//                         <div className="flex items-center gap-4">
//                             <button onClick={() => setIsEditing(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200"><ArrowLeft size={20}/></button>
//                             <h2 className="text-xl font-black tracking-tight italic text-slate-900">Building URL: <span className="text-sky-600">{formData.slug || "---"}</span></h2>
//                         </div>
//                         <button onClick={handleSave} className="bg-emerald-600 text-white px-10 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all">
//                             {loading ? <RefreshCw className="animate-spin" size={20}/> : <Save size={20}/>} Build & Publish
//                         </button>
//                     </div>

//                     <div className="grid lg:grid-cols-12 gap-8">
//                         {/* LEFT COLUMN: CORE CONFIG */}
//                         <div className="lg:col-span-4 space-y-6">
//                             <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
//                                 <h4 className="font-black text-slate-900 flex items-center gap-2"><Settings size={18}/> 1. Route Configuration</h4>
//                                 <div className="space-y-4">
//                                     <select className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
//                                         <option value="solutions">Solutions Folder</option>
//                                         <option value="industries">Industries Folder</option>
//                                     </select>
//                                     <input placeholder="Slug (e.g. food-delivery)" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold placeholder-slate-300" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
//                                 </div>
//                             </div>

//                             <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
//                                 <h4 className="font-black text-slate-900 flex items-center gap-2"><Smartphone size={18}/> 2. Hero Design</h4>
//                                 <input placeholder="Main Heading" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-black text-lg" value={formData.content.hero.title} onChange={e => setFormData({...formData, content: {...formData.content, hero: {...formData.content.hero, title: e.target.value}}})} />
//                                 <textarea placeholder="Sub-heading description..." className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm" rows={3} value={formData.content.hero.subtitle} onChange={e => setFormData({...formData, content: {...formData.content, hero: {...formData.content.hero, subtitle: e.target.value}}})} />
//                                 <MediaInput label="Hero Image" value={formData.content.hero.image} path="content.hero.image" />
//                             </div>
//                         </div>

//                         {/* RIGHT COLUMN: REPEATER SECTIONS */}
//                         <div className="lg:col-span-8 space-y-8">
//                             {/* WHAT WE OFFER */}
//                             <div className="bg-white p-10 rounded-[3rem] border shadow-sm space-y-6">
//                                 <div className="flex justify-between items-center border-b pb-4">
//                                     <h4 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter"><Database size={20}/> 3. The Services Grid</h4>
//                                     <button onClick={() => {
//                                         let temp = [...formData.content.services]; temp.push({title: "", image: ""});
//                                         setFormData({...formData, content: {...formData.content, services: temp}});
//                                     }} className="text-sky-600 font-black text-sm flex items-center gap-1">+ Add Module</button>
//                                 </div>
//                                 <div className="grid md:grid-cols-2 gap-6">
//                                     {formData.content.services.map((s, i) => (
//                                         <div key={i} className="p-4 bg-slate-50 rounded-[2rem] space-y-4 relative group border border-slate-100">
//                                             <input placeholder="Module Title" className="w-full bg-transparent border-none font-bold text-slate-700" value={s.title} onChange={e => {
//                                                 let t = [...formData.content.services]; t[i].title = e.target.value; setFormData({...formData, content: {...formData.content, services: t}});
//                                             }} />
//                                             <MediaInput label="Icon" value={s.image} path={`content.services[${i}].image`} />
//                                             <button onClick={() => {
//                                                 let t = formData.content.services.filter((_, idx) => idx !== i);
//                                                 setFormData({...formData, content: {...formData.content, services: t}});
//                                             }} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* SUCCESS STORY */}
//                             <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
//                                 <div className="absolute top-0 right-0 p-10 opacity-5 font-black text-8xl">STORY</div>
//                                 <h4 className="font-black flex items-center gap-2 uppercase tracking-widest text-sky-400"><Target size={20}/> 4. Success Case (Potafo Style)</h4>
//                                 <div className="space-y-4 relative z-10">
//                                     <input placeholder="App Name" className="w-full bg-white/5 border-none rounded-2xl p-4 text-xl font-black text-white" value={formData.content.caseStudy.title} onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, title: e.target.value}}})} />
//                                     <textarea placeholder="Success Story Description" className="w-full bg-white/5 border-none rounded-2xl p-4 text-slate-400 text-sm" rows={3} value={formData.content.caseStudy.description} onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, description: e.target.value}}})} />
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <input placeholder="Tech Stack" className="bg-white/5 p-4 rounded-2xl border-none text-xs text-sky-400 font-bold" value={formData.content.caseStudy.tech} onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, tech: e.target.value}}})} />
//                                         <MediaInput label="Case Image" value={formData.content.caseStudy.image} path="content.caseStudy.image" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ---------------- IMAGE BROWSER MODAL ---------------- */}
//             {showImageBrowser && (
//                 <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
//                     <div className="bg-white w-full max-w-5xl h-[80vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border-8 border-white/20">
//                         <div className="p-6 border-b flex justify-between items-center bg-slate-50">
//                             <h2 className="font-black text-2xl flex items-center gap-3"><ImageIcon className="text-sky-500"/> Select Media Asset</h2>
//                             <button onClick={() => setShowImageBrowser(false)} className="p-3 bg-white rounded-full shadow-sm"><X/></button>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//                             {folderFiles.map((file, i) => (
//                                 <div 
//                                     key={i} 
//                                     onClick={() => {
//                                         // Dynamic field update logic
//                                         const pathArr = currentImageField.split(/[\[\].]+/ ).filter(Boolean);
//                                         setFormData(prev => {
//                                             const copy = JSON.parse(JSON.stringify(prev));
//                                             let cur = copy;
//                                             for(let k=0; k<pathArr.length-1; k++) cur = cur[pathArr[k]];
//                                             cur[pathArr[pathArr.length-1]] = file.path;
//                                             return copy;
//                                         });
//                                         setShowImageBrowser(false);
//                                     }}
//                                     className="group cursor-pointer space-y-2 text-center"
//                                 >
//                                     <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border-4 border-transparent group-hover:border-sky-500 transition-all relative">
//                                         <img src={file.path} className="w-full h-full object-cover" />
//                                     </div>
//                                     <p className="text-[10px] font-bold text-slate-400 truncate">{file.name}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }













// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { 
//   Save, Plus, Trash2, Edit3, Globe, Layout, 
//   Smartphone, Layers, Search, X, RefreshCw,
//   ArrowLeft, Settings, Database, ListOrdered, 
//   HelpCircle, Target, Image as ImageIcon, ZoomIn, 
//   Folder, CheckCircle2, ChevronRight, Home, ExternalLink,
//   Code, Eye, FileText, Zap ,Briefcase 
// } from "lucide-react";
// import Image from "next/image";

// export default function SolutionsAdmin() {
//     const [items, setItems] = useState({ solutions: [], industries: [] });
//     const [loading, setLoading] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
    
//     // Image Browser States
//     const [showImageBrowser, setShowImageBrowser] = useState(false);
//     const [currentImageField, setCurrentImageField] = useState('');
//     const [currentFolder, setCurrentFolder] = useState('');
//     const [folderFiles, setFolderFiles] = useState([]);

//     const initialForm = {
//         section: "solutions",
//         type: "ondemand", 
//         slug: "",
//         activeSections: ['hero', 'stats', 'services', 'caseStudy', 'methodology', 'benefits', 'cta'], // Default Active Sections
//         content: {
//             hero: { title: "", subtitle: "", tag: "Premium", image: "" },
//             stats: [{ label: "Projects Delivered", value: "500+" }],
//             services: [{ title: "", image: "" }],
//             caseStudy: { title: "", description: "", tech: "Next.js, Tailwind v4", image: "" },
//             methodology: [{ title: "Analysis", desc: "Understanding goals" }],
//             benefits: [{ title: "Why Softkingo?", desc: "Industry-leading expertise." }], 
//             cta: { title: "Ready to Scale Your Vision?", btnText: "Start Now" }
//         }
//     };
//     const [formData, setFormData] = useState(initialForm);

//     // ========== API FETCHERS ==========
//     const fetchItems = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch("/api/admin/solutions?section=all");
//             const json = await res.json();
//             if (json.ok) setItems(json.data);
//         } catch (e) { console.error("List Fetch Error:", e); }
//         setLoading(false);
//     };

//     const fetchFolderFiles = async (folder = '') => {
//         try {
//             const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
//             if (res.ok) {
//                 const data = await res.json();
//                 setFolderFiles(data.files || []);
//             }
//         } catch (err) { console.error('Media fetch error:', err); }
//     };

//     useEffect(() => { fetchItems(); }, []);

//     // ========== HANDLERS ==========
//     const handleEdit = async (section, slug) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/admin/solutions?section=${section}&slug=${slug}`);
//             const json = await res.json();
//             if (json.ok) {
//                 // Ensure activeSections exists for older data
//                 const loadedData = {
//                      ...json.data,
//                      activeSections: json.data.activeSections || initialForm.activeSections
//                 };
//                 setFormData(loadedData);
//                 setIsEditing(true);
//             }
//         } catch (e) { alert("Failed to load data.json from folder"); }
//         setLoading(false);
//     };

//     const handleSave = async () => {
//         if (!formData.slug) return alert("URL Slug is required!");
//         setLoading(true);
//         const res = await fetch("/api/admin/solutions", {
//             method: "POST",
//             body: JSON.stringify(formData)
//         });
//         if (res.ok) {
//             setIsEditing(false);
//             fetchItems();
//             setFormData(initialForm);
//             // alert("Page published successfully! 🚀");
//         }
//         setLoading(false);
//     };

//     const handleDelete = async (section, slug) => {
//         if (!confirm(`Confirm deletion of /${section}/${slug}?`)) return;
//         const res = await fetch("/api/admin/solutions", {
//             method: "DELETE",
//             body: JSON.stringify({ section, slug })
//         });
//         if (res.ok) fetchItems();
//     };

//     const openBrowser = (fieldName) => {
//         setCurrentImageField(fieldName);
//         setShowImageBrowser(true);
//         fetchFolderFiles('');
//     };

//     const toggleSection = (sectionKey) => {
//         setFormData(prev => {
//             const sections = new Set(prev.activeSections);
//             if (sections.has(sectionKey)) {
//                 sections.delete(sectionKey);
//             } else {
//                 sections.add(sectionKey);
//             }
//             return { ...prev, activeSections: Array.from(sections) };
//         });
//     };

//     // ========== UI COMPONENTS (LOCAL) ==========
//     const MediaInput = ({ label, value, path }) => (
//         <div className="group">
//             <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block group-hover:text-sky-600 transition-colors">{label}</label>
//             <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
//                 <div className="pl-3 text-slate-400"><ImageIcon size={14}/></div>
//                 <input 
//                     className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700 placeholder:text-slate-300 focus:ring-0"
//                     value={value} 
//                     placeholder="/images/..."
//                     readOnly
//                 />
//                 <button 
//                     onClick={() => openBrowser(path)}
//                     className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200 transition-colors"
//                 >
//                     <Folder size={14}/>
//                 </button>
//             </div>
//              {value && (
//                 <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-slate-200">
//                     <img src={value} alt="Preview" className="w-full h-full object-cover" />
//                 </div>
//             )}
//         </div>
//     );

//     const SectionToggle = ({ id, label, icon: Icon }) => {
//         const isActive = formData.activeSections.includes(id);
//         return (
//             <button 
//                 onClick={() => toggleSection(id)}
//                 className={`flex items-center gap-3 w-full p-3 rounded-xl border transition-all duration-200 ${
//                     isActive 
//                     ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm' 
//                     : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
//                 }`}
//             >
//                 <div className={`p-2 rounded-lg ${isActive ? 'bg-sky-100 text-sky-600' : 'bg-slate-50 text-slate-400'}`}>
//                     <Icon size={16} />
//                 </div>
//                 <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
//                 <div className={`ml-auto w-4 h-4 rounded-full border flex items-center justify-center ${isActive ? 'bg-sky-500 border-sky-500' : 'border-slate-300'}`}>
//                     {isActive && <CheckCircle2 size={10} className="text-white" />}
//                 </div>
//             </button>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
//             {!isEditing ? (
//                 /* ---------------- DASHBOARD VIEW ---------------- */
//                 <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-12">
//                     {/* Header */}
//                     <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pb-8 border-b border-slate-200">
//                         <div>
//                             <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Page Architect</h1>
//                             <p className="text-slate-500 font-medium">Manage dynamic landing pages for Solutions & Industries.</p>
//                         </div>
//                         <button 
//                             onClick={() => { setFormData(initialForm); setIsEditing(true); }} 
//                             className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-slate-200 transition-all hover:-translate-y-1"
//                         >
//                             <Plus size={18}/> Create New Page
//                         </button>
//                     </div>

//                     {/* Stats/Search Bar */}
//                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//                         <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Search size={20}/></div>
//                         <input 
//                             placeholder="Search pages by slug..." 
//                             className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-300"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <div className="flex gap-2">
//                              <div className="px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-bold">{items.solutions?.length || 0} Solutions</div>
//                              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">{items.industries?.length || 0} Industries</div>
//                         </div>
//                     </div>

//                     {/* Content Grid */}
//                     <div className="grid lg:grid-cols-2 gap-10">
//                         {["solutions", "industries"].map(sec => (
//                             <div key={sec} className="space-y-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className={`p-2 rounded-lg ${sec === 'solutions' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'}`}>
//                                         {sec === 'solutions' ? <Zap size={18}/> : <Globe size={18}/>}
//                                     </div>
//                                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">{sec}</h3>
//                                 </div>
                                
//                                 <div className="grid gap-3">
//                                     {items[sec]?.filter(i => i.slug.includes(searchTerm)).map(it => (
//                                         <div key={it.slug} className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex justify-between items-center relative overflow-hidden">
//                                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            
//                                             <div className="flex flex-col gap-1">
//                                                 <span className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors">{it.title || it.slug}</span>
//                                                 <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
//                                                     <Globe size={10}/> {it.url}
//                                                 </span>
//                                             </div>

//                                             <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
//                                                 <button onClick={() => handleEdit(sec, it.slug)} className="p-2 hover:bg-sky-50 text-slate-400 hover:text-sky-600 rounded-lg transition-colors" title="Edit Page">
//                                                     <Edit3 size={16}/>
//                                                 </button>
//                                                 <button onClick={() => window.open(it.url, '_blank')} className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors" title="View Live">
//                                                     <ExternalLink size={16}/>
//                                                 </button>
//                                                 <button onClick={() => handleDelete(sec, it.slug)} className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors" title="Delete">
//                                                     <Trash2 size={16}/>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {items[sec]?.length === 0 && (
//                                         <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-medium">No pages found.</div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 /* ---------------- EDITOR VIEW ---------------- */
//                 <div className="flex h-screen overflow-hidden">
//                     {/* LEFT SIDEBAR: NAVIGATION & CONFIG */}
//                     <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-20">
//                         <div className="p-6 border-b border-slate-100">
//                             <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors mb-6">
//                                 <ArrowLeft size={14}/> BACK TO DASHBOARD
//                             </button>
//                             <h2 className="text-xl font-black text-slate-900 tracking-tight">Page Settings</h2>
//                         </div>
                        
//                         <div className="flex-1 overflow-y-auto p-6 space-y-8">
//                             {/* Route Config */}
//                             <div className="space-y-4">
//                                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Route Definition</label>
//                                 <div className="space-y-3">
//                                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
//                                         <label className="text-[10px] font-bold text-slate-400 mb-1 block">FOLDER TYPE</label>
//                                         <select 
//                                             className="w-full bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 p-0" 
//                                             value={formData.section} 
//                                             onChange={e => setFormData({...formData, section: e.target.value})}
//                                         >
//                                             <option value="solutions">/solutions</option>
//                                             <option value="industries">/industries</option>
//                                         </select>
//                                     </div>
//                                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
//                                         <label className="text-[10px] font-bold text-slate-400 mb-1 block">PAGE SLUG</label>
//                                         <input 
//                                             placeholder="e.g. food-delivery" 
//                                             className="w-full bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 p-0 placeholder:text-slate-300" 
//                                             value={formData.slug} 
//                                             onChange={e => setFormData({...formData, slug: e.target.value})} 
//                                         />
//                                     </div>
//                                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
//                                         <label className="text-[10px] font-bold text-slate-400 mb-1 block">DESIGN THEME</label>
//                                         <select 
//                                             className="w-full bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 p-0" 
//                                             value={formData.type} 
//                                             onChange={e => setFormData({...formData, type: e.target.value})}
//                                         >
//                                             <option value="ondemand">App Solution (Blue)</option>
//                                             <option value="clone">Clone App (Orange)</option>
//                                             <option value="industry">Industry (Indigo)</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Section Toggles */}
//                             <div className="space-y-3">
//                                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Active Sections</label>
//                                 <SectionToggle id="hero" label="Hero Banner" icon={Smartphone} />
//                                 <SectionToggle id="industryTabs" label="Industry Tabs" icon={Layers} />
//                                 <SectionToggle id="stats" label="Impact Stats" icon={Target} />
//                                 <SectionToggle id="services" label="Services Grid" icon={Database} />
//                                 <SectionToggle id="caseStudy" label="Success Story" icon={Briefcase} />
//                                 <SectionToggle id="methodology" label="Roadmap" icon={ListOrdered} />
//                                 <SectionToggle id="benefits" label="FAQ / Benefits" icon={HelpCircle} />
//                                 <SectionToggle id="cta" label="Call to Action" icon={Zap} />
//                             </div>
//                         </div>

//                         <div className="p-6 border-t border-slate-200 bg-slate-50">
//                              <button onClick={handleSave} className="w-full bg-slate-900 hover:bg-sky-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg">
//                                 {loading ? <RefreshCw className="animate-spin" size={16}/> : <Save size={16}/>} 
//                                 {loading ? "Publishing..." : "Save & Publish"}
//                             </button>
//                         </div>
//                     </div>

//                     {/* RIGHT AREA: VISUAL EDITOR */}
//                     <div className="flex-1 bg-[#F1F5F9] overflow-y-auto p-8 lg:p-12">
//                         <div className="max-w-4xl mx-auto space-y-8">
                            
//                             {/* Editor Header */}
//                             <div className="flex items-center gap-4 mb-8">
//                                 <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
//                                     <Layout size={20}/>
//                                 </div>
//                                 <div>
//                                     <h1 className="text-2xl font-black text-slate-800">Visual Editor</h1>
//                                     <p className="text-slate-500 text-xs font-medium">Edit content for active sections.</p>
//                                 </div>
//                             </div>

//                             {/* DYNAMIC FORMS BASED ON ACTIVE SECTIONS */}
                            
//                             {/* 1. HERO SECTION FORM */}
//                             {formData.activeSections.includes('hero') && (
//                                 <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-6 animate-in fade-in slide-in-from-bottom-4">
//                                     <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
//                                         <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Smartphone size={16}/></span>
//                                         <h3 className="font-bold text-slate-800">Hero Section</h3>
//                                     </div>
//                                     <div className="grid gap-5">
//                                         <div>
//                                             <label className="text-xs font-bold text-slate-500 mb-1 block">MAIN HEADLINE</label>
//                                             <input 
//                                                 className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                                                 value={formData.content.hero.title}
//                                                 onChange={e => setFormData({...formData, content: {...formData.content, hero: {...formData.content.hero, title: e.target.value}}})}
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="text-xs font-bold text-slate-500 mb-1 block">SUBTITLE</label>
//                                             <textarea 
//                                                 className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                                                 rows={3}
//                                                 value={formData.content.hero.subtitle}
//                                                 onChange={e => setFormData({...formData, content: {...formData.content, hero: {...formData.content.hero, subtitle: e.target.value}}})}
//                                             />
//                                         </div>
//                                         <MediaInput label="Hero Mockup Image" value={formData.content.hero.image} path="content.hero.image" />
//                                     </div>
//                                 </div>
//                             )}

//                              {/* 2. SERVICES GRID FORM */}
//                             {formData.activeSections.includes('services') && (
//                                 <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-6 animate-in fade-in slide-in-from-bottom-8">
//                                     <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
//                                         <div className="flex items-center gap-3">
//                                             <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Database size={16}/></span>
//                                             <h3 className="font-bold text-slate-800">Services Grid</h3>
//                                         </div>
//                                         <button 
//                                             onClick={() => {
//                                                 const newServices = [...formData.content.services, { title: "", image: "" }];
//                                                 setFormData({...formData, content: {...formData.content, services: newServices}});
//                                             }}
//                                             className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
//                                         >
//                                             + Add Service
//                                         </button>
//                                     </div>
                                    
//                                     <div className="grid md:grid-cols-2 gap-4">
//                                         {formData.content.services.map((s, i) => (
//                                             <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group hover:border-emerald-300 transition-colors">
//                                                 <div className="space-y-3">
//                                                     <input 
//                                                         className="w-full bg-white p-2 rounded-lg border border-slate-200 text-xs font-bold" 
//                                                         placeholder="Service Title"
//                                                         value={s.title}
//                                                         onChange={e => {
//                                                             const list = [...formData.content.services];
//                                                             list[i].title = e.target.value;
//                                                             setFormData({...formData, content: {...formData.content, services: list}});
//                                                         }}
//                                                     />
//                                                     <MediaInput label="Icon Image" value={s.image} path={`content.services[${i}].image`} />
//                                                 </div>
//                                                 <button 
//                                                     onClick={() => {
//                                                         const list = formData.content.services.filter((_, idx) => idx !== i);
//                                                         setFormData({...formData, content: {...formData.content, services: list}});
//                                                     }}
//                                                     className="absolute -top-2 -right-2 bg-white text-rose-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-rose-100 hover:bg-rose-50"
//                                                 >
//                                                     <X size={12}/>
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* 3. CASE STUDY FORM */}
//                             {formData.activeSections.includes('caseStudy') && (
//                                 <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-800 space-y-6 animate-in fade-in slide-in-from-bottom-8">
//                                     <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-2">
//                                         <span className="p-2 bg-slate-800 text-sky-400 rounded-lg"><Target size={16}/></span>
//                                         <h3 className="font-bold text-white">Success Story</h3>
//                                     </div>
//                                     <div className="grid gap-5">
//                                         <div>
//                                             <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Case Title</label>
//                                             <input 
//                                                 className="w-full p-3 bg-slate-800 border-none rounded-xl text-sm font-bold text-white placeholder:text-slate-600 focus:ring-1 focus:ring-sky-500"
//                                                 value={formData.content.caseStudy.title}
//                                                 onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, title: e.target.value}}})}
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Description</label>
//                                             <textarea 
//                                                 className="w-full p-3 bg-slate-800 border-none rounded-xl text-xs text-slate-300 placeholder:text-slate-600 focus:ring-1 focus:ring-sky-500"
//                                                 rows={3}
//                                                 value={formData.content.caseStudy.description}
//                                                 onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, description: e.target.value}}})}
//                                             />
//                                         </div>
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div>
//                                                  <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Tech Stack</label>
//                                                  <input 
//                                                     className="w-full p-3 bg-slate-800 border-none rounded-xl text-xs font-mono text-sky-400"
//                                                     value={formData.content.caseStudy.tech}
//                                                     onChange={e => setFormData({...formData, content: {...formData.content, caseStudy: {...formData.content.caseStudy, tech: e.target.value}}})}
//                                                 />
//                                             </div>
//                                             <div className="text-white">
//                                                 <MediaInput label="Case Image" value={formData.content.caseStudy.image} path="content.caseStudy.image" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                              {/* 4. OTHER SECTIONS (Placeholders for now) */}
//                              {formData.activeSections.length === 0 && (
//                                  <div className="text-center p-20 opacity-50">
//                                      <Layout size={48} className="mx-auto mb-4 text-slate-300"/>
//                                      <p className="text-slate-400 font-medium">Select sections from the left sidebar to start editing.</p>
//                                  </div>
//                              )}
//                         </div>
//                     </div>

//                     {/* IMAGE BROWSER OVERLAY */}
//                     {showImageBrowser && (
//                         <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
//                             <div className="bg-white w-full max-w-4xl h-[75vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
//                                 <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
//                                     <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800"><ImageIcon size={20} className="text-sky-500"/> Media Library</h2>
//                                     <button onClick={() => setShowImageBrowser(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={18}/></button>
//                                 </div>
//                                 <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
//                                     <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
//                                         {folderFiles.map((file, i) => (
//                                             <div 
//                                                 key={i} 
//                                                 onClick={() => {
//                                                     const pathArr = currentImageField.split(/[\[\].]+/ ).filter(Boolean);
//                                                     setFormData(prev => {
//                                                         const copy = JSON.parse(JSON.stringify(prev));
//                                                         let cur = copy;
//                                                         for(let k=0; k<pathArr.length-1; k++) cur = cur[pathArr[k]];
//                                                         cur[pathArr[pathArr.length-1]] = file.path;
//                                                         return copy;
//                                                     });
//                                                     setShowImageBrowser(false);
//                                                 }}
//                                                 className="group cursor-pointer bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-sky-500"
//                                             >
//                                                 <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative mb-2">
//                                                     <img src={file.path} className="w-full h-full object-cover" />
//                                                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                                         <Plus className="text-white drop-shadow-md"/>
//                                                     </div>
//                                                 </div>
//                                                 <p className="text-[10px] font-bold text-slate-500 truncate px-1">{file.name}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }











// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   Save, Plus, Trash2, Edit3, Globe, Layout, 
//   Smartphone, Layers, Search, X, RefreshCw,
//   ArrowLeft, Settings, Database, ListOrdered, 
//   HelpCircle, Target, Image as ImageIcon, ZoomIn, 
//   Folder, CheckCircle2, ChevronRight, Home, ExternalLink,
//   Code, Eye, FileText, Zap, Briefcase 
// } from "lucide-react";
// import Image from "next/image";

// export default function SolutionsAdmin() {
//     const [items, setItems] = useState({ solutions: [], industries: [] });
//     const [loading, setLoading] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
    
//     // Image Browser States
//     const [showImageBrowser, setShowImageBrowser] = useState(false);
//     const [currentImageField, setCurrentImageField] = useState('');
//     const [folderFiles, setFolderFiles] = useState([]);

//     const initialForm = {
//         section: "solutions",
//         type: "ondemand", 
//         slug: "",
//         activeSections: ['hero', 'about', 'features', 'banner', 'whyInvest', 'tech', 'portfolio', 'awards', 'cta', 'blogs', 'faq'], 
//         content: {
//             hero: { title: "", subtitle: "", image: "" },
//             aboutTitle: "About Our Solution",
//             aboutSubtitle: "We provide comprehensive solutions.",
//             benefits: ["Scalable Architecture", "24/7 Support"],
//             services: [{ title: "User App", image: "" }, { title: "Admin Panel", image: "" }],
//             caseStudy: { image: "" }, // Using caseStudy.image for Why Invest section
//             portfolioCategory: "app",
//             cta: { title: "Ready to Scale?" }
//         }
//     };
//     const [formData, setFormData] = useState(initialForm);

//     // ========== API FETCHERS ==========
//     const fetchItems = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch("/api/admin/solutions?section=all");
//             const json = await res.json();
//             if (json.ok) setItems(json.data);
//         } catch (e) { console.error("List Fetch Error:", e); }
//         setLoading(false);
//     };

//     const fetchFolderFiles = async (folder = '') => {
//         try {
//             const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
//             if (res.ok) {
//                 const data = await res.json();
//                 setFolderFiles(data.files || []);
//             }
//         } catch (err) { console.error('Media fetch error:', err); }
//     };

//     useEffect(() => { fetchItems(); }, []);

//     // ========== HANDLERS ==========
//     const handleEdit = async (section, slug) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/admin/solutions?section=${section}&slug=${slug}`);
//             const json = await res.json();
//             if (json.ok) {
//                 const loadedData = {
//                      ...initialForm,
//                      ...json.data,
//                      content: { ...initialForm.content, ...json.data.content }
//                 };
//                 setFormData(loadedData);
//                 setIsEditing(true);
//             }
//         } catch (e) { alert("Failed to load data.json from folder"); }
//         setLoading(false);
//     };

//     const handleSave = async () => {
//         if (!formData.slug) return alert("URL Slug is required!");
//         setLoading(true);
//         const res = await fetch("/api/admin/solutions", {
//             method: "POST",
//             body: JSON.stringify(formData)
//         });
//         if (res.ok) {
//             setIsEditing(false);
//             fetchItems();
//             setFormData(initialForm);
//             alert("Page published successfully! 🚀");
//         }
//         setLoading(false);
//     };

//     const handleDelete = async (section, slug) => {
//         if (!confirm(`Confirm deletion of /${section}/${slug}?`)) return;
//         const res = await fetch("/api/admin/solutions", {
//             method: "DELETE",
//             body: JSON.stringify({ section, slug })
//         });
//         if (res.ok) fetchItems();
//     };

//     const openBrowser = (fieldName) => {
//         setCurrentImageField(fieldName);
//         setShowImageBrowser(true);
//         fetchFolderFiles('');
//     };

//     // Helper for nested field updates
//     const updateField = (path, value) => {
//         setFormData(prev => {
//             const copy = JSON.parse(JSON.stringify(prev));
//             const keys = path.split('.');
//             let current = copy;
//             for (let i = 0; i < keys.length - 1; i++) {
//                 if (!current[keys[i]]) current[keys[i]] = {};
//                 current = current[keys[i]];
//             }
//             current[keys[keys.length - 1]] = value;
//             return copy;
//         });
//     };

//     // ========== UI COMPONENTS (LOCAL) ==========
//     const MediaInput = ({ label, value, path }) => (
//         <div className="group">
//             <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block group-hover:text-sky-600 transition-colors">{label}</label>
//             <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
//                 <div className="pl-3 text-slate-400"><ImageIcon size={14}/></div>
//                 <input 
//                     className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700 placeholder:text-slate-300 focus:ring-0"
//                     value={value} 
//                     placeholder="/images/..."
//                     readOnly
//                 />
//                 <button 
//                     onClick={() => openBrowser(path)}
//                     className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200 transition-colors"
//                 >
//                     <Folder size={14}/>
//                 </button>
//             </div>
//              {value && (
//                 <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-slate-200">
//                     <img src={value} alt="Preview" className="w-full h-full object-cover" />
//                 </div>
//             )}
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
//             {!isEditing ? (
//                 /* ---------------- DASHBOARD LIST VIEW (Same as before) ---------------- */
//                 <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-12">
//                     <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pb-8 border-b border-slate-200">
//                         <div>
//                             <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Page Architect</h1>
//                             <p className="text-slate-500 font-medium">Manage dynamic landing pages for Solutions & Industries.</p>
//                         </div>
//                         <button 
//                             onClick={() => { setFormData(initialForm); setIsEditing(true); }} 
//                             className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-slate-200 transition-all hover:-translate-y-1"
//                         >
//                             <Plus size={18}/> Create New Page
//                         </button>
//                     </div>

//                     {/* Stats/Search Bar */}
//                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//                         <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Search size={20}/></div>
//                         <input 
//                             placeholder="Search pages by slug..." 
//                             className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-300"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <div className="flex gap-2">
//                              <div className="px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-bold">{items.solutions?.length || 0} Solutions</div>
//                              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">{items.industries?.length || 0} Industries</div>
//                         </div>
//                     </div>

//                     {/* Content Grid */}
//                     <div className="grid lg:grid-cols-2 gap-10">
//                         {["solutions", "industries"].map(sec => (
//                             <div key={sec} className="space-y-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className={`p-2 rounded-lg ${sec === 'solutions' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'}`}>
//                                         {sec === 'solutions' ? <Zap size={18}/> : <Globe size={18}/>}
//                                     </div>
//                                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">{sec}</h3>
//                                 </div>
//                                 <div className="grid gap-3">
//                                     {items[sec]?.filter(i => i.slug.includes(searchTerm)).map(it => (
//                                         <div key={it.slug} className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex justify-between items-center relative overflow-hidden">
//                                             <div className="flex flex-col gap-1">
//                                                 <span className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors">{it.title || it.slug}</span>
//                                                 <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
//                                                     <Globe size={10}/> {it.url}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
//                                                 <button onClick={() => handleEdit(sec, it.slug)} className="p-2 hover:bg-sky-50 text-slate-400 hover:text-sky-600 rounded-lg transition-colors"><Edit3 size={16}/></button>
//                                                 <button onClick={() => window.open(it.url, '_blank')} className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"><ExternalLink size={16}/></button>
//                                                 <button onClick={() => handleDelete(sec, it.slug)} className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"><Trash2 size={16}/></button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {items[sec]?.length === 0 && <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-medium">No pages found.</div>}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 /* ---------------- EDITOR VIEW (IMPROVED) ---------------- */
//                 <div className="flex h-screen overflow-hidden">
//                     {/* LEFT SIDEBAR: NAVIGATION & CONFIG */}
//                     <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-20">
//                         <div className="p-6 border-b border-slate-100">
//                             <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors mb-6">
//                                 <ArrowLeft size={14}/> BACK
//                             </button>
//                             <h2 className="text-xl font-black text-slate-900 tracking-tight">Page Settings</h2>
//                         </div>
                        
//                         <div className="flex-1 overflow-y-auto p-6 space-y-8">
//                             <div className="space-y-4">
//                                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Route Definition</label>
//                                 <div className="space-y-3">
//                                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
//                                         <label className="text-[10px] font-bold text-slate-400 mb-1 block">FOLDER TYPE</label>
//                                         <select 
//                                             className="w-full bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 p-0" 
//                                             value={formData.section} 
//                                             onChange={e => setFormData({...formData, section: e.target.value})}
//                                         >
//                                             <option value="solutions">/solutions</option>
//                                             <option value="industries">/industries</option>
//                                         </select>
//                                     </div>
//                                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
//                                         <label className="text-[10px] font-bold text-slate-400 mb-1 block">PAGE SLUG</label>
//                                         <input 
//                                             placeholder="e.g. food-delivery" 
//                                             className="w-full bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 p-0 placeholder:text-slate-300" 
//                                             value={formData.slug} 
//                                             onChange={e => setFormData({...formData, slug: e.target.value})} 
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="p-6 border-t border-slate-200 bg-slate-50">
//                              <button onClick={handleSave} className="w-full bg-slate-900 hover:bg-sky-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg">
//                                 {loading ? <RefreshCw className="animate-spin" size={16}/> : <Save size={16}/>} 
//                                 {loading ? "Publishing..." : "Save & Publish"}
//                             </button>
//                         </div>
//                     </div>

//                     {/* RIGHT AREA: VISUAL EDITOR */}
//                     <div className="flex-1 bg-[#F1F5F9] overflow-y-auto p-8 lg:p-12">
//                         <div className="max-w-4xl mx-auto space-y-8">
                            
//                             {/* Editor Header */}
//                             <div className="flex items-center gap-4 mb-8">
//                                 <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
//                                     <Layout size={20}/>
//                                 </div>
//                                 <div>
//                                     <h1 className="text-2xl font-black text-slate-800">Visual Editor</h1>
//                                     <p className="text-slate-500 text-xs font-medium">Edit content for all sections.</p>
//                                 </div>
//                             </div>

//                             {/* 1. HERO SECTION FORM */}
//                             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-6">
//                                 <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
//                                     <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Smartphone size={16}/></span>
//                                     <h3 className="font-bold text-slate-800">1. Hero Section</h3>
//                                 </div>
//                                 <div className="grid gap-5">
//                                     <input className="w-full p-3 bg-slate-50 rounded-xl font-bold text-slate-800" placeholder="Main Headline" value={formData.content.hero.title} onChange={e => updateField('content.hero.title', e.target.value)} />
//                                     <textarea className="w-full p-3 bg-slate-50 rounded-xl text-sm" placeholder="Subtitle..." rows={2} value={formData.content.hero.subtitle} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
//                                     <MediaInput label="Background Image" value={formData.content.hero.image} path="content.hero.image" />
//                                 </div>
//                             </div>

//                             {/* 2. ABOUT & FORM */}
//                             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-6">
//                                 <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
//                                     <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Layout size={16}/></span>
//                                     <h3 className="font-bold text-slate-800">2. About & Benefits</h3>
//                                 </div>
//                                 <div className="grid gap-5">
//                                     <input className="w-full p-3 bg-slate-50 rounded-xl font-bold" placeholder="About Title" value={formData.content.aboutTitle} onChange={e => updateField('content.aboutTitle', e.target.value)} />
//                                     <textarea className="w-full p-3 bg-slate-50 rounded-xl text-sm" placeholder="About Description..." rows={3} value={formData.content.aboutSubtitle} onChange={e => updateField('content.aboutSubtitle', e.target.value)} />
                                    
//                                     <div className="bg-slate-50 p-4 rounded-xl space-y-3">
//                                         <label className="text-xs font-bold text-slate-400">BENEFITS LIST</label>
//                                         {(formData.content.benefits || []).map((b, i) => (
//                                             <div key={i} className="flex gap-2">
//                                                 <input className="flex-1 p-2 bg-white rounded-lg text-sm border border-slate-200" value={b} onChange={e => {
//                                                     const newArr = [...formData.content.benefits];
//                                                     newArr[i] = e.target.value;
//                                                     updateField('content.benefits', newArr);
//                                                 }} />
//                                                 <button onClick={() => {
//                                                     const newArr = formData.content.benefits.filter((_, idx) => idx !== i);
//                                                     updateField('content.benefits', newArr);
//                                                 }} className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100"><X size={14}/></button>
//                                             </div>
//                                         ))}
//                                         <button onClick={() => updateField('content.benefits', [...(formData.content.benefits || []), "New Benefit"])} className="text-xs font-bold text-sky-600 flex items-center gap-1">+ Add Benefit</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* 3. FEATURES GRID */}
//                             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-6">
//                                 <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
//                                     <div className="flex items-center gap-3">
//                                         <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Database size={16}/></span>
//                                         <h3 className="font-bold text-slate-800">3. Features Grid</h3>
//                                     </div>
//                                     <button onClick={() => updateField('content.services', [...(formData.content.services || []), {title:"", image:""}])} className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100">+ Add Feature</button>
//                                 </div>
//                                 <div className="grid md:grid-cols-2 gap-4">
//                                     {(formData.content.services || []).map((s, i) => (
//                                         <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group">
//                                             <input className="w-full bg-white p-2 rounded-lg border border-slate-200 text-xs font-bold mb-2" value={s.title} placeholder="Title" onChange={e => {
//                                                 const newArr = [...formData.content.services];
//                                                 newArr[i].title = e.target.value;
//                                                 updateField('content.services', newArr);
//                                             }} />
//                                             <MediaInput label="Icon" value={s.image} path={`content.services[${i}].image`} />
//                                             <button onClick={() => {
//                                                 const newArr = formData.content.services.filter((_, idx) => idx !== i);
//                                                 updateField('content.services', newArr);
//                                             }} className="absolute -top-2 -right-2 bg-white text-rose-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 border border-rose-100"><X size={12}/></button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* 4. EXTRAS & PORTFOLIO */}
//                             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-6">
//                                 <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
//                                     <span className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Settings size={16}/></span>
//                                     <h3 className="font-bold text-slate-800">4. Extras</h3>
//                                 </div>
//                                 <div className="grid md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="text-[10px] font-bold text-slate-400 block mb-1">WHY INVEST IMAGE</label>
//                                         <MediaInput value={formData.content.caseStudy?.image} path="content.caseStudy.image" label="Side Image"/>
//                                     </div>
//                                     <div>
//                                         <label className="text-[10px] font-bold text-slate-400 block mb-1">PORTFOLIO CATEGORY</label>
//                                         <input className="w-full p-3 bg-slate-50 rounded-xl font-bold text-sm border border-slate-200" placeholder="e.g. food, fitness" value={formData.content.portfolioCategory} onChange={e => updateField('content.portfolioCategory', e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-[10px] font-bold text-slate-400 block mb-1">CTA TITLE</label>
//                                     <input className="w-full p-3 bg-slate-50 rounded-xl font-bold text-sm border border-slate-200" placeholder="e.g. Ready to Scale?" value={formData.content.cta?.title} onChange={e => updateField('content.cta.title', e.target.value)} />
//                                 </div>
//                             </div>

//                         </div>
//                     </div>

//                     {/* IMAGE BROWSER MODAL */}
//                     {showImageBrowser && (
//                         <div className="fixed inset-0 bg-slate-900/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
//                             <div className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95">
//                                 <div className="p-5 border-b flex justify-between items-center bg-slate-50">
//                                     <h3 className="font-bold flex items-center gap-2"><ImageIcon size={18} className="text-sky-500"/> Media Library</h3>
//                                     <button onClick={() => setShowImageBrowser(false)} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100"><X size={18}/></button>
//                                 </div>
//                                 <div className="flex-1 overflow-y-auto p-6 grid grid-cols-3 md:grid-cols-5 gap-4 bg-slate-50/50">
//                                     {folderFiles.map((f, i) => (
//                                         <div key={i} onClick={() => {
//                                             const pathArr = currentImageField.split(/[\[\].]+/).filter(Boolean);
//                                             setFormData(prev => {
//                                                 const copy = JSON.parse(JSON.stringify(prev));
//                                                 let cur = copy;
//                                                 for(let k=0; k<pathArr.length-1; k++) cur = cur[pathArr[k]];
//                                                 cur[pathArr[pathArr.length-1]] = f.path;
//                                                 return copy;
//                                             });
//                                             setShowImageBrowser(false);
//                                         }} className="cursor-pointer group bg-white p-2 rounded-xl border border-slate-200 hover:border-sky-500 transition-all shadow-sm hover:shadow-md">
//                                             <div className="aspect-square relative bg-slate-100 rounded-lg overflow-hidden mb-2">
//                                                 <img src={f.path} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
//                                             </div>
//                                             <p className="text-[10px] font-bold text-slate-500 truncate px-1">{f.name}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }
















// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   Save, Plus, Trash2, Edit3, Globe, Layout, 
//   Smartphone, Layers, Search, X, RefreshCw,
//   ArrowLeft, Settings, Database, ListOrdered, 
//   HelpCircle, Target, Image as ImageIcon, ZoomIn, 
//   Folder, CheckCircle2, Zap, Briefcase, FileText, Code 
// } from "lucide-react";

// export default function SolutionsAdmin() {
//     const [items, setItems] = useState({ solutions: [], industries: [] });
//     const [loading, setLoading] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
    
//     // Image Browser
//     const [showImageBrowser, setShowImageBrowser] = useState(false);
//     const [currentImageField, setCurrentImageField] = useState('');
//     const [folderFiles, setFolderFiles] = useState([]);

//     const initialForm = {
//         section: "solutions",
//         slug: "",
//         activeSections: ['hero', 'about', 'features', 'banner', 'whyInvest', 'tech', 'portfolio', 'awards', 'cta', 'blogs', 'faq'], 
//         content: {
//             hero: { title: "", subtitle: "", image: "" },
//             aboutTitle: "About Our Solution",
//             aboutSubtitle: "We provide comprehensive solutions that cover the entire development lifecycle.",
//             benefits: ["Scalable Architecture", "24/7 Support", "Secure Payment Gateways"], 
//             // Features Grid (Dynamic List)
//             services: [
//                 { title: "100% Quality Assurance", image: "" },
//                 { title: "On-time Delivery", image: "" },
//                 { title: "Fully Customisable", image: "" },
//                 { title: "Scalability", image: "" }
//             ],
//             banner: { title: "Hungry For More?", subtitle: "Explore your delivery app potential.", btnText: "Get Started" },
//             caseStudy: { image: "" }, // Used for Why Invest image
//             portfolioCategory: "app",
//             cta: { title: "Ready to Scale?" }
//         }
//     };
//     const [formData, setFormData] = useState(initialForm);

//     // ... (Fetchers same as before) ...
//     const fetchItems = async () => {
//         setLoading(true);
//         const res = await fetch("/api/admin/solutions?section=all");
//         const json = await res.json();
//         if (json.ok) setItems(json.data);
//         setLoading(false);
//     };

//     const fetchFolderFiles = async () => {
//         const res = await fetch(`/api/media/list`);
//         if (res.ok) {
//             const json = await res.json();
//             setFolderFiles(json.files || []);
//         }
//     };

//     useEffect(() => { fetchItems(); }, []);

//     const handleEdit = async (section, slug) => {
//         setLoading(true);
//         const res = await fetch(`/api/admin/solutions?section=${section}&slug=${slug}`);
//         const json = await res.json();
//         if (json.ok) {
//             // Merge defaults to avoid crashes
//             setFormData({ 
//                 ...initialForm, 
//                 ...json.data, 
//                 activeSections: json.data.activeSections || initialForm.activeSections,
//                 content: { ...initialForm.content, ...json.data.content } 
//             });
//             setIsEditing(true);
//         }
//         setLoading(false);
//     };

//     const handleSave = async () => {
//         if (!formData.slug) return alert("Slug is required!");
//         setLoading(true);
//         const res = await fetch("/api/admin/solutions", {
//             method: "POST",
//             body: JSON.stringify(formData)
//         });
//         if (res.ok) {
//             setIsEditing(false);
//             fetchItems();
//             alert("Page Saved Successfully!");
//         }
//         setLoading(false);
//     };

//     const handleDelete = async (section, slug) => {
//         if (!confirm("Delete this page?")) return;
//         await fetch("/api/admin/solutions", { method: "DELETE", body: JSON.stringify({ section, slug }) });
//         fetchItems();
//     };

//     const openBrowser = (fieldName) => {
//         setCurrentImageField(fieldName);
//         setShowImageBrowser(true);
//         fetchFolderFiles();
//     };

//     // Helper for nested field updates
//     const updateField = (path, value) => {
//         setFormData(prev => {
//             const copy = JSON.parse(JSON.stringify(prev));
//             const keys = path.split('.');
//             let current = copy;
//             for (let i = 0; i < keys.length - 1; i++) {
//                 if (!current[keys[i]]) current[keys[i]] = {};
//                 current = current[keys[i]];
//             }
//             current[keys[keys.length - 1]] = value;
//             return copy;
//         });
//     };

//     const toggleSection = (id) => {
//         setFormData(prev => {
//             const sections = new Set(prev.activeSections);
//             sections.has(id) ? sections.delete(id) : sections.add(id);
//             return { ...prev, activeSections: Array.from(sections) };
//         });
//     };

//     const MediaInput = ({ label, value, path }) => (
//         <div className="group">
//             <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
//             <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
//                 <div className="pl-3 text-slate-400"><ImageIcon size={14}/></div>
//                 <input className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700" value={value} readOnly placeholder="Select image..." />
//                 <button onClick={() => openBrowser(path)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200"><Folder size={14}/></button>
//             </div>
//             {value && <img src={value} className="h-16 w-full object-cover mt-2 rounded-lg border border-slate-200" alt="preview"/>}
//         </div>
//     );

//     const SectionToggle = ({ id, label, icon: Icon }) => {
//         const isActive = formData.activeSections.includes(id);
//         return (
//             <button onClick={() => toggleSection(id)} className={`flex items-center gap-3 w-full p-3 rounded-xl border transition-all ${isActive ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white border-slate-100 text-slate-400'}`}>
//                 <div className={`p-2 rounded-lg ${isActive ? 'bg-sky-100 text-sky-600' : 'bg-slate-50 text-slate-400'}`}><Icon size={16} /></div>
//                 <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
//                 {isActive && <CheckCircle2 size={14} className="ml-auto text-sky-500" />}
//             </button>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-6">
//             {!isEditing ? (
//                 /* DASHBOARD LIST VIEW (BEST VERSION) */
//                 <div className="max-w-6xl mx-auto space-y-8">
//                     <div className="flex justify-between items-center bg-white p-6 rounded-3xl border shadow-sm">
//                         <div>
//                             <h1 className="text-3xl font-black text-slate-900">Solutions Manager</h1>
//                             <p className="text-slate-500 text-sm mt-1">Manage dynamic landing pages for Solutions & Industries.</p>
//                         </div>
//                         <button onClick={() => { setFormData(initialForm); setIsEditing(true); }} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all"><Plus size={18}/> New Page</button>
//                     </div>

//                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//                         <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Search size={20}/></div>
//                         <input 
//                             placeholder="Search pages by slug..." 
//                             className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-300"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <div className="flex gap-2">
//                              <div className="px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-bold">{items.solutions?.length || 0} Solutions</div>
//                              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">{items.industries?.length || 0} Industries</div>
//                         </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-8">
//                         {["solutions", "industries"].map(sec => (
//                             <div key={sec} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
//                                 <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b pb-2">{sec}</h3>
//                                 {items[sec]?.filter(i => i.slug.includes(searchTerm)).map(it => (
//                                     <div key={it.slug} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer group border border-transparent hover:border-sky-100">
//                                         <div>
//                                             <div className="font-bold text-slate-700 text-sm">{it.title || it.slug}</div>
//                                             <div className="text-[10px] text-slate-400 font-mono">/{it.slug}</div>
//                                         </div>
//                                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                             <button onClick={() => window.open(it.url, '_blank')} className="p-1.5 bg-white rounded border hover:text-emerald-600"><Globe size={14}/></button>
//                                             <button onClick={() => handleEdit(sec, it.slug)} className="p-1.5 bg-white rounded border hover:text-sky-600"><Edit3 size={14}/></button>
//                                             <button onClick={() => handleDelete(sec, it.slug)} className="p-1.5 bg-white rounded border hover:text-rose-600"><Trash2 size={14}/></button>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {items[sec]?.length === 0 && <p className="text-sm text-slate-400 italic">No pages yet.</p>}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 /* EDITOR VIEW (WITH LEFT SIDEBAR TOGGLES) */
//                 <div className="flex h-[calc(100vh-3rem)] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
//                     {/* LEFT SIDEBAR: Config & Toggles */}
//                     <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
//                         <div className="p-5 border-b bg-white">
//                             <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 mb-4"><ArrowLeft size={14}/> BACK</button>
//                             <h2 className="text-lg font-black text-slate-800">Page Config</h2>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-5 space-y-6">
//                             <div className="space-y-3">
//                                 <label className="text-[10px] font-bold text-slate-400 block">URL SETTINGS</label>
//                                 <select className="w-full p-2 bg-white rounded-lg border border-slate-200 text-sm font-bold" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
//                                     <option value="solutions">/solutions</option>
//                                     <option value="industries">/industries</option>
//                                 </select>
//                                 <input className="w-full p-2 bg-white rounded-lg border border-slate-200 text-sm font-bold" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="Slug (e.g. food-app)" />
//                             </div>
//                             <div className="space-y-2">
//                                 <label className="text-[10px] font-bold text-slate-400 block">SECTIONS</label>
//                                 <SectionToggle id="hero" label="Hero" icon={Smartphone} />
//                                 <SectionToggle id="about" label="About + Form" icon={Layout} />
//                                 <SectionToggle id="features" label="Features Grid" icon={Database} />
//                                 <SectionToggle id="banner" label="Hungry Banner" icon={Zap} />
//                                 <SectionToggle id="whyInvest" label="Why Invest" icon={Target} />
//                                 <SectionToggle id="tech" label="Tech Stack" icon={Code} />
//                                 <SectionToggle id="portfolio" label="Portfolio" icon={Briefcase} />
//                                 <SectionToggle id="awards" label="Awards" icon={CheckCircle2} />
//                                 <SectionToggle id="cta" label="Bottom CTA" icon={Zap} />
//                                 <SectionToggle id="blogs" label="Blogs" icon={FileText} />
//                                 <SectionToggle id="faq" label="FAQ" icon={HelpCircle} />
//                             </div>
//                         </div>
//                         <div className="p-5 border-t bg-white">
//                             <button onClick={handleSave} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm flex justify-center gap-2 hover:bg-emerald-700 transition-colors">
//                                 {loading ? <RefreshCw className="animate-spin" size={16}/> : <Save size={16}/>} Save Page
//                             </button>
//                         </div>
//                     </div>

//                     {/* RIGHT EDITOR: Dynamic Fields */}
//                     <div className="flex-1 bg-slate-100 overflow-y-auto p-8 lg:p-12">
//                         <div className="max-w-3xl mx-auto space-y-8">
//                             <h1 className="text-2xl font-black text-slate-800">Content Editor</h1>

//                             {/* 1. HERO */}
//                             {formData.activeSections.includes('hero') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Smartphone size={18} className="text-sky-500"/> Hero Section</h3>
//                                     <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="Hero Title" value={formData.content.hero.title} onChange={e => updateField('content.hero.title', e.target.value)} />
//                                     <textarea className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Hero Subtitle" rows={2} value={formData.content.hero.subtitle} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
//                                     <MediaInput label="Hero BG Image" value={formData.content.hero.image} path="content.hero.image" />
//                                 </div>
//                             )}

//                             {/* 2. ABOUT */}
//                             {formData.activeSections.includes('about') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Layout size={18} className="text-purple-500"/> About & Benefits</h3>
//                                     <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="About Title" value={formData.content.aboutTitle} onChange={e => updateField('content.aboutTitle', e.target.value)} />
//                                     <textarea className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="About Description" rows={3} value={formData.content.aboutSubtitle} onChange={e => updateField('content.aboutSubtitle', e.target.value)} />
                                    
//                                     <div className="space-y-2 bg-slate-50 p-3 rounded-lg">
//                                         <label className="text-[10px] font-bold text-slate-400">BENEFITS LIST</label>
//                                         {(formData.content.benefits || []).map((b, i) => (
//                                             <div key={i} className="flex gap-2">
//                                                 <input className="flex-1 p-2 bg-white border rounded-lg text-sm" value={b} onChange={e => {
//                                                     const newArr = [...formData.content.benefits];
//                                                     newArr[i] = e.target.value;
//                                                     updateField('content.benefits', newArr);
//                                                 }} />
//                                                 <button onClick={() => updateField('content.benefits', formData.content.benefits.filter((_, idx) => idx !== i))} className="p-2 bg-rose-50 text-rose-500 rounded"><X size={14}/></button>
//                                             </div>
//                                         ))}
//                                         <button onClick={() => updateField('content.benefits', [...(formData.content.benefits || []), "New Benefit"])} className="text-xs font-bold text-sky-600">+ Add Benefit</button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* 3. FEATURES GRID (SERVICES) */}
//                             {formData.activeSections.includes('features') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Database size={18} className="text-emerald-500"/> Features Grid</h3>
//                                     <div className="grid md:grid-cols-2 gap-4">
//                                         {(formData.content.services || []).map((s, i) => (
//                                             <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
//                                                 <input className="w-full bg-white p-2 rounded border mb-2 font-bold text-sm" value={s.title} onChange={e => {
//                                                     const newArr = [...formData.content.services]; newArr[i].title = e.target.value; updateField('content.services', newArr);
//                                                 }} placeholder="Title" />
//                                                 <MediaInput label="Feature Image" value={s.image} path={`content.services[${i}].image`} />
//                                                 <button onClick={() => updateField('content.services', formData.content.services.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-rose-500 bg-white rounded-full p-1 border hover:bg-rose-50"><X size={12}/></button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <button onClick={() => updateField('content.services', [...(formData.content.services || []), {title:"", image:""}])} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:text-emerald-600 hover:border-emerald-200">+ Add Feature Card</button>
//                                 </div>
//                             )}

//                             {/* 4. HUNGRY BANNER */}
//                             {formData.activeSections.includes('banner') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Zap size={18} className="text-amber-500"/> Hungry Banner</h3>
//                                     <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="Banner Title" value={formData.content.banner?.title} onChange={e => updateField('content.banner.title', e.target.value)} />
//                                     <textarea className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Banner Text..." rows={2} value={formData.content.banner?.subtitle} onChange={e => updateField('content.banner.subtitle', e.target.value)} />
//                                     <input className="w-full p-2 bg-slate-50 border rounded-lg text-sm" placeholder="Button Text" value={formData.content.banner?.btnText} onChange={e => updateField('content.banner.btnText', e.target.value)} />
//                                 </div>
//                             )}

//                             {/* 5. WHY INVEST */}
//                             {formData.activeSections.includes('whyInvest') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Target size={18} className="text-sky-600"/> Why Invest</h3>
//                                     <MediaInput label="Side Image" value={formData.content.caseStudy?.image} path="content.caseStudy.image" />
//                                 </div>
//                             )}

//                             {/* 6. PORTFOLIO CONFIG */}
//                             {formData.activeSections.includes('portfolio') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Briefcase size={18} className="text-indigo-500"/> Portfolio Config</h3>
//                                     <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="Category (e.g. food, fitness)" value={formData.content.portfolioCategory} onChange={e => updateField('content.portfolioCategory', e.target.value)} />
//                                 </div>
//                             )}

//                             {/* 7. CTA */}
//                             {formData.activeSections.includes('cta') && (
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
//                                     <h3 className="font-bold flex items-center gap-2 text-slate-700"><Zap size={18} className="text-pink-500"/> Bottom CTA</h3>
//                                     <input className="w-full p-2 bg-slate-50 border rounded-lg font-bold" placeholder="CTA Title" value={formData.content.cta?.title} onChange={e => updateField('content.cta.title', e.target.value)} />
//                                 </div>
//                             )}

//                         </div>
//                     </div>

//                     {/* Image Browser Modal */}
//                     {showImageBrowser && (
//                         <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-10 backdrop-blur-sm">
//                             <div className="bg-white w-full max-w-4xl h-full rounded-2xl flex flex-col overflow-hidden">
//                                 <div className="p-4 border-b flex justify-between items-center"><h3 className="font-bold">Select Media</h3><button onClick={() => setShowImageBrowser(false)}><X/></button></div>
//                                 <div className="flex-1 overflow-y-auto p-4 grid grid-cols-5 gap-4">
//                                     {folderFiles.map((f, i) => (
//                                         <div key={i} onClick={() => {
//                                             const pathArr = currentImageField.split(/[\[\].]+/).filter(Boolean);
//                                             setFormData(prev => {
//                                                 const copy = JSON.parse(JSON.stringify(prev));
//                                                 let cur = copy;
//                                                 for(let k=0; k<pathArr.length-1; k++) cur = cur[pathArr[k]];
//                                                 cur[pathArr[pathArr.length-1]] = f.path;
//                                                 return copy;
//                                             });
//                                             setShowImageBrowser(false);
//                                         }} className="cursor-pointer group">
//                                             <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-2 relative">
//                                                 <img src={f.path} className="w-full h-full object-cover"/>
//                                             </div>
//                                             <p className="text-[10px] truncate mt-1">{f.name}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }





// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   Plus, Trash2, Edit3, Globe, Search, X, RefreshCw,
//   ArrowLeft, Settings, Image as ImageIcon, Folder, 
//   Layout, Smartphone, Database, Zap, Target, Briefcase, 
//   FileText, HelpCircle, CheckCircle2, ChevronRight 
// } from "lucide-react";
// import Image from "next/image";

// // ================== CONFIGURATION ==================
// const PAGE_TYPE = "solutions"; // Change to 'industries' or 'clones' for other pages
// const FOLDER_PATH = "solutions"; // Default folder path

// // ================== MAIN COMPONENT ==================
// export default function PageManager() {
//     const [view, setView] = useState("list"); // 'list' | 'editor'
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
    
//     // Editor State
//     const [currentData, setCurrentData] = useState(null);

//     // Initial Form State
//     const initialForm = {
//         section: FOLDER_PATH,
//         slug: "",
//         activeSections: ['hero', 'about', 'features', 'banner', 'whyInvest', 'tech', 'portfolio', 'awards', 'cta', 'blogs', 'faq'], 
//         content: {
//             hero: { title: "", subtitle: "", image: "" },
//             aboutTitle: "About Our Solution",
//             aboutSubtitle: "We provide comprehensive solutions.",
//             benefits: ["Scalable Architecture", "24/7 Support"],
//             services: [{ title: "User App", image: "" }, { title: "Admin Panel", image: "" }],
//             caseStudy: { image: "" }, 
//             portfolioCategory: "app",
//             banner: { title: "Hungry For More?", subtitle: "Explore potential.", btnText: "Get Started" },
//             cta: { title: "Ready to Scale?" }
//         }
//     };

//     // Fetch Items
//     const fetchItems = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/admin/solutions?section=${FOLDER_PATH}`);
//             const json = await res.json();
//             if (json.ok) setItems(json.data[FOLDER_PATH] || []);
//         } catch (e) { console.error(e); }
//         setLoading(false);
//     };

//     useEffect(() => { fetchItems(); }, []);

//     // Handlers
//     const handleCreate = () => {
//         setCurrentData(initialForm);
//         setView("editor");
//     };

//     const handleEdit = async (slug) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/admin/solutions?section=${FOLDER_PATH}&slug=${slug}`);
//             const json = await res.json();
//             if (json.ok) {
//                 setCurrentData({ ...initialForm, ...json.data, content: { ...initialForm.content, ...json.data.content } });
//                 setView("editor");
//             }
//         } catch (e) { alert("Error loading data"); }
//         setLoading(false);
//     };

//     const handleDelete = async (slug) => {
//         if (!confirm(`Delete ${slug}? This cannot be undone.`)) return;
//         await fetch("/api/admin/solutions", { 
//             method: "DELETE", 
//             body: JSON.stringify({ section: FOLDER_PATH, slug }) 
//         });
//         fetchItems();
//     };

//     const handleSaveSuccess = () => {
//         setView("list");
//         fetchItems();
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
//             {view === "list" && (
//                 <ListView 
//                     items={items} 
//                     loading={loading} 
//                     searchTerm={searchTerm} 
//                     setSearchTerm={setSearchTerm} 
//                     onCreate={handleCreate} 
//                     onEdit={handleEdit} 
//                     onDelete={handleDelete} 
//                 />
//             )}
//             {view === "editor" && currentData && (
//                 <EditorView 
//                     data={currentData} 
//                     onCancel={() => setView("list")} 
//                     onSaveSuccess={handleSaveSuccess} 
//                 />
//             )}
//         </div>
//     );
// }

// // ================== LIST VIEW COMPONENT ==================
// function ListView({ items, loading, searchTerm, setSearchTerm, onCreate, onEdit, onDelete }) {
//     const filteredItems = items.filter(i => i.slug.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div className="max-w-7xl mx-auto p-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
//                 <div>
//                     <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{PAGE_TYPE} Manager</h1>
//                     <p className="text-slate-500 mt-1">Manage your dynamic landing pages.</p>
//                 </div>
//                 <button onClick={onCreate} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all hover:-translate-y-1">
//                     <Plus size={18} /> Create New Page
//                 </button>
//             </div>

//             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 mb-8">
//                 <Search className="text-slate-400" size={20} />
//                 <input 
//                     className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium" 
//                     placeholder="Search pages..." 
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                 />
//                 <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">{filteredItems.length} Pages</span>
//             </div>

//             {loading && <div className="text-center py-20 text-slate-400">Loading pages...</div>}

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredItems.map(item => (
//                     <div key={item.slug} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-sky-200 transition-all relative overflow-hidden">
//                         <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//                         <div className="flex justify-between items-start mb-4">
//                             <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
//                                 <Layout size={20} />
//                             </div>
//                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <button onClick={() => window.open(item.url, '_blank')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"><Globe size={16}/></button>
//                                 <button onClick={() => onDelete(item.slug)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16}/></button>
//                             </div>
//                         </div>
//                         <h3 className="font-bold text-lg text-slate-800 mb-1 truncate">{item.title || item.slug}</h3>
//                         <p className="text-xs font-mono text-slate-400 mb-6">/{item.slug}</p>
//                         <button onClick={() => onEdit(item.slug)} className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2">
//                             <Edit3 size={14} /> Edit Content
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             {!loading && filteredItems.length === 0 && (
//                 <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
//                     <div className="text-slate-300 mb-4"><Folder size={48} className="mx-auto"/></div>
//                     <p className="text-slate-500 font-medium">No pages found. Create one to get started.</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// // ================== EDITOR VIEW COMPONENT ==================
// function EditorView({ data, onCancel, onSaveSuccess }) {
//     const [formData, setFormData] = useState(data);
//     const [saving, setSaving] = useState(false);
    
//     // Image Browser State
//     const [showImageBrowser, setShowImageBrowser] = useState(false);
//     const [currentField, setCurrentField] = useState("");
//     const [files, setFiles] = useState([]);

//     const fetchFiles = async () => {
//         const res = await fetch('/api/media/list');
//         const json = await res.json();
//         if (json.ok) setFiles(json.files || []);
//     };

//     const openBrowser = (field) => {
//         setCurrentField(field);
//         fetchFiles();
//         setShowImageBrowser(true);
//     };

//     const handleSelectImage = (path) => {
//         updateField(currentField, path);
//         setShowImageBrowser(false);
//     };

//     const updateField = (path, value) => {
//         setFormData(prev => {
//             const copy = JSON.parse(JSON.stringify(prev));
//             const keys = path.split('.');
//             let current = copy;
//             for (let i = 0; i < keys.length - 1; i++) {
//                 if (!current[keys[i]]) current[keys[i]] = {};
//                 current = current[keys[i]];
//             }
//             current[keys[keys.length - 1]] = value;
//             return copy;
//         });
//     };

//     const toggleSection = (id) => {
//         setFormData(prev => {
//             const set = new Set(prev.activeSections);
//             set.has(id) ? set.delete(id) : set.add(id);
//             return { ...prev, activeSections: Array.from(set) };
//         });
//     };

//     const savePage = async () => {
//         if (!formData.slug) return alert("Slug required!");
//         setSaving(true);
//         const res = await fetch("/api/admin/solutions", {
//             method: "POST",
//             body: JSON.stringify(formData)
//         });
//         if (res.ok) {
//             alert("Saved!");
//             onSaveSuccess();
//         }
//         setSaving(false);
//     };

//     const MediaInput = ({ label, path, val }) => (
//         <div className="space-y-1">
//             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
//             <div className="flex gap-2">
//                 <div className="relative w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
//                     {val ? <img src={val} className="w-full h-full object-cover" /> : <ImageIcon className="m-auto text-slate-300 w-5 h-5" />}
//                 </div>
//                 <div className="flex-1 flex border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-sky-500">
//                     <input className="flex-1 px-3 bg-white text-xs" value={val} readOnly placeholder="No image selected" />
//                     <button onClick={() => openBrowser(path)} className="px-3 bg-slate-50 hover:bg-slate-100 border-l border-slate-200 text-slate-600"><Folder size={14}/></button>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <div className="flex h-screen overflow-hidden bg-white">
//             {/* Left Config Panel */}
//             <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col z-20">
//                 <div className="p-5 border-b bg-white flex items-center justify-between">
//                     <button onClick={onCancel} className="text-slate-400 hover:text-slate-800"><ArrowLeft size={20}/></button>
//                     <h3 className="font-bold text-sm">Page Settings</h3>
//                     <div className="w-5" />
//                 </div>
//                 <div className="flex-1 overflow-y-auto p-6 space-y-8">
//                     <div className="space-y-3">
//                         <label className="text-xs font-bold text-slate-400 block">PAGE SLUG</label>
//                         <input className="w-full p-2.5 rounded-lg border border-slate-200 text-sm font-bold" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. food-delivery" />
//                     </div>
                    
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-400 block mb-2">SECTIONS</label>
//                         {['hero', 'about', 'features', 'banner', 'whyInvest', 'tech', 'portfolio', 'awards', 'cta', 'blogs', 'faq'].map(id => (
//                             <button key={id} onClick={() => toggleSection(id)} className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${formData.activeSections.includes(id) ? 'bg-white border-sky-500 text-sky-600 shadow-sm' : 'bg-slate-100 border-transparent text-slate-400'}`}>
//                                 <span className="uppercase">{id}</span>
//                                 {formData.activeSections.includes(id) && <CheckCircle2 size={14}/>}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="p-5 border-t bg-white">
//                     <button onClick={savePage} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors flex justify-center gap-2">
//                         {saving ? <RefreshCw className="animate-spin" size={18}/> : <Save size={18}/>} Save Changes
//                     </button>
//                 </div>
//             </div>

//             {/* Right Editor Panel */}
//             <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-8 md:p-12">
//                 <div className="max-w-3xl mx-auto space-y-8">
//                     <div className="flex items-center gap-3 mb-8">
//                          <div className="p-3 bg-white rounded-xl shadow-sm border"><Edit3 size={20} className="text-sky-500"/></div>
//                          <div>
//                              <h2 className="text-2xl font-black text-slate-900">Content Editor</h2>
//                              <p className="text-slate-500 text-sm">Edit texts and images for active sections.</p>
//                          </div>
//                     </div>

//                     {/* DYNAMIC FORMS */}
//                     {/* 1. HERO */}
//                     {formData.activeSections.includes('hero') && (
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
//                             <h3 className="font-bold flex items-center gap-2 text-slate-700 border-b pb-3"><Smartphone size={18} className="text-sky-500"/> Hero Section</h3>
//                             <input className="w-full p-3 bg-slate-50 rounded-xl font-bold border-none focus:ring-1 focus:ring-sky-500" placeholder="Hero Title" value={formData.content.hero.title} onChange={e => updateField('content.hero.title', e.target.value)} />
//                             <textarea className="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-1 focus:ring-sky-500" placeholder="Subtitle..." rows={2} value={formData.content.hero.subtitle} onChange={e => updateField('content.hero.subtitle', e.target.value)} />
//                             <MediaInput label="Background Image" val={formData.content.hero.image} path="content.hero.image" />
//                         </div>
//                     )}

//                     {/* 2. ABOUT */}
//                     {formData.activeSections.includes('about') && (
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
//                             <h3 className="font-bold flex items-center gap-2 text-slate-700 border-b pb-3"><Layout size={18} className="text-purple-500"/> About & Benefits</h3>
//                             <input className="w-full p-3 bg-slate-50 rounded-xl font-bold" placeholder="Title" value={formData.content.aboutTitle} onChange={e => updateField('content.aboutTitle', e.target.value)} />
//                             <textarea className="w-full p-3 bg-slate-50 rounded-xl text-sm" placeholder="Description..." rows={3} value={formData.content.aboutSubtitle} onChange={e => updateField('content.aboutSubtitle', e.target.value)} />
                            
//                             <div className="space-y-2">
//                                 <label className="text-[10px] font-bold text-slate-400 uppercase">Benefits List</label>
//                                 {(formData.content.benefits || []).map((b, i) => (
//                                     <div key={i} className="flex gap-2">
//                                         <input className="flex-1 p-2 bg-slate-50 rounded-lg text-sm border border-slate-200" value={b} onChange={e => {
//                                             const arr = [...formData.content.benefits]; arr[i] = e.target.value; updateField('content.benefits', arr);
//                                         }} />
//                                         <button onClick={() => updateField('content.benefits', formData.content.benefits.filter((_, x) => x !== i))} className="p-2 text-rose-500 bg-rose-50 rounded-lg"><X size={14}/></button>
//                                     </div>
//                                 ))}
//                                 <button onClick={() => updateField('content.benefits', [...(formData.content.benefits || []), ""])} className="text-xs font-bold text-sky-600">+ Add Item</button>
//                             </div>
//                         </div>
//                     )}

//                     {/* 3. FEATURES (SERVICES) */}
//                     {formData.activeSections.includes('features') && (
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
//                             <h3 className="font-bold flex items-center gap-2 text-slate-700 border-b pb-3"><Database size={18} className="text-emerald-500"/> Features Grid</h3>
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 {(formData.content.services || []).map((s, i) => (
//                                     <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
//                                         <input className="w-full bg-white p-2 rounded-lg border border-slate-200 text-sm font-bold mb-2" value={s.title} onChange={e => {
//                                             const arr = [...formData.content.services]; arr[i].title = e.target.value; updateField('content.services', arr);
//                                         }} placeholder="Feature Title" />
//                                         <MediaInput label="Icon" val={s.image} path={`content.services[${i}].image`} />
//                                         <button onClick={() => updateField('content.services', formData.content.services.filter((_, x) => x !== i))} className="absolute top-2 right-2 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <button onClick={() => updateField('content.services', [...(formData.content.services || []), { title: "", image: "" }])} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-sky-400 hover:text-sky-500 transition-colors">+ Add Card</button>
//                         </div>
//                     )}

//                     {/* 4. EXTRAS */}
//                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
//                         <h3 className="font-bold flex items-center gap-2 text-slate-700 border-b pb-3"><Settings size={18} className="text-orange-500"/> Extras</h3>
//                         <div className="grid md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="text-[10px] font-bold text-slate-400 block mb-1">WHY INVEST IMAGE</label>
//                                 <MediaInput val={formData.content.caseStudy?.image} path="content.caseStudy.image" />
//                             </div>
//                             <div>
//                                 <label className="text-[10px] font-bold text-slate-400 block mb-1">PORTFOLIO CATEGORY</label>
//                                 <input className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.content.portfolioCategory} onChange={e => updateField('content.portfolioCategory', e.target.value)} />
//                             </div>
//                         </div>
//                          <div>
//                             <label className="text-[10px] font-bold text-slate-400 block mb-1">CTA TITLE</label>
//                             <input className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.content.cta?.title} onChange={e => updateField('content.cta.title', e.target.value)} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* IMAGE BROWSER */}
//             {showImageBrowser && (
//                 <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
//                     <div className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
//                         <div className="p-5 border-b flex justify-between items-center bg-slate-50">
//                             <h3 className="font-bold">Select Media</h3>
//                             <button onClick={() => setShowImageBrowser(false)}><X/></button>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-6 grid grid-cols-4 md:grid-cols-6 gap-4">
//                             {files.map((f, i) => (
//                                 <div key={i} onClick={() => handleSelectImage(f.path)} className="cursor-pointer group">
//                                     <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:border-sky-500 relative">
//                                         <img src={f.path} className="w-full h-full object-cover" />
//                                     </div>
//                                     <p className="text-[10px] truncate mt-1 text-center text-slate-500">{f.name}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";
import React, { useState, useEffect } from "react";
import { 
  Plus, Search, Globe, Edit3, Trash2, Layers, Zap, Briefcase, Copy 
} from "lucide-react";

// Import Separate Editors
import SolutionEditor from "./_components/SolutionEditor";
import IndustryEditor from "./_components/IndustryEditor";
import CloneEditor from "./_components/CloneEditor";

export default function SolutionsAdmin() {
    const [view, setView] = useState("list"); // 'list', 'solution', 'industry', 'clone'
    const [items, setItems] = useState({ solutions: [], industries: [], clones: [] }); // Assuming clones added to API later, or reusing solutions
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentData, setCurrentData] = useState(null);

    // Initial Defaults
    const defaultData = {
        slug: "",
        activeSections: ['hero', 'about', 'features', 'cta'], // Default sections
        content: { hero: { title: "", subtitle: "" } } 
    };

    // Fetch All Data
    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/solutions?section=all");
            const json = await res.json();
            if (json.ok) setItems(json.data);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    // Handle Edit Click
    const handleEdit = async (section, slug) => {
        setLoading(true);
        const res = await fetch(`/api/admin/solutions?section=${section}&slug=${slug}`);
        const json = await res.json();
        if (json.ok) {
            setCurrentData({ ...json.data, section }); // Store section to know which API to hit on save
            
            // Logic to open correct editor based on section/type
            if (section === 'industries') setView('industry');
            else if (json.data.type === 'clone') setView('clone');
            else setView('solution');
        }
        setLoading(false);
    };

    // Handle Create Click
    const handleCreate = (type) => {
        const sectionMap = {
            'solution': 'solutions',
            'industry': 'industries',
            'clone': 'solutions' // Clones usually stored in solutions folder with type='clone'
        };
        
        setCurrentData({ 
            ...defaultData, 
            section: sectionMap[type], 
            type: type === 'clone' ? 'clone' : 'ondemand' 
        });
        setView(type);
    };

    const handleDelete = async (section, slug) => {
        if (!confirm("Delete this page?")) return;
        await fetch("/api/admin/solutions", { method: "DELETE", body: JSON.stringify({ section, slug }) });
        fetchItems();
    };

    const handleBack = () => {
        setView("list");
        setCurrentData(null);
        fetchItems(); // Refresh data on back
    };

    // ---------------- RENDER ----------------
    if (view === "solution") return <SolutionEditor data={currentData} onBack={handleBack} />;
    if (view === "industry") return <IndustryEditor data={currentData} onBack={handleBack} />;
    if (view === "clone") return <CloneEditor data={currentData} onBack={handleBack} />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pb-8 border-b border-slate-200">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Page Architect</h1>
                        <p className="text-slate-500 font-medium">Manage all your dynamic pages from one place.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => handleCreate('solution')} className="bg-sky-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-sky-700 shadow-lg transition-all text-xs">
                            <Zap size={16}/> New Solution
                        </button>
                        <button onClick={() => handleCreate('industry')} className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg transition-all text-xs">
                            <Briefcase size={16}/> New Industry
                        </button>
                        <button onClick={() => handleCreate('clone')} className="bg-orange-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg transition-all text-xs">
                            <Copy size={16}/> New Clone
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <Search className="text-slate-400 ml-2" size={20}/>
                    <input 
                        placeholder="Search pages..." 
                        className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Lists */}
                <div className="grid lg:grid-cols-2 gap-10">
                    
                    {/* SOLUTIONS LIST */}
                    <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b pb-2 flex items-center gap-2">
                            <Zap size={16}/> Solutions & Clones
                        </h3>
                        {items.solutions?.filter(i => i.slug.includes(searchTerm)).map(it => (
                            <div key={it.slug} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-sky-50 transition-colors group">
                                <div>
                                    <div className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                        {it.title || it.slug}
                                        {it.type === 'clone' && <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-black uppercase">Clone</span>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-mono">/solutions/{it.slug}</div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => window.open(it.url, '_blank')} className="p-1.5 bg-white rounded border hover:text-emerald-600"><Globe size={14}/></button>
                                    <button onClick={() => handleEdit('solutions', it.slug)} className="p-1.5 bg-white rounded border hover:text-sky-600"><Edit3 size={14}/></button>
                                    <button onClick={() => handleDelete('solutions', it.slug)} className="p-1.5 bg-white rounded border hover:text-rose-600"><Trash2 size={14}/></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* INDUSTRIES LIST */}
                    <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b pb-2 flex items-center gap-2">
                            <Briefcase size={16}/> Industries
                        </h3>
                        {items.industries?.filter(i => i.slug.includes(searchTerm)).map(it => (
                            <div key={it.slug} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors group">
                                <div>
                                    <div className="font-bold text-slate-700 text-sm">{it.title || it.slug}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">/industries/{it.slug}</div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => window.open(it.url, '_blank')} className="p-1.5 bg-white rounded border hover:text-emerald-600"><Globe size={14}/></button>
                                    <button onClick={() => handleEdit('industries', it.slug)} className="p-1.5 bg-white rounded border hover:text-sky-600"><Edit3 size={14}/></button>
                                    <button onClick={() => handleDelete('industries', it.slug)} className="p-1.5 bg-white rounded border hover:text-rose-600"><Trash2 size={14}/></button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}