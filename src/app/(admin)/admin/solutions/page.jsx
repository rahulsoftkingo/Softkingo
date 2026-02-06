"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Globe, Search, Zap, Briefcase, Code, Database, Folder, ExternalLink, RefreshCw, AlertTriangle } from "lucide-react";
import PageEditor from "./_components/PageEditor";

export default function SolutionsAdmin() {
    const [view, setView] = useState("list"); // 'list' | 'editor'
    const [editorType, setEditorType] = useState("solution"); // 'solution' | 'industry' | 'clone'
    
    // Data Container
    const [items, setItems] = useState({ 
        solutions: [], 
        industries: [], 
        clones: [] 
    });
    
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editorData, setEditorData] = useState(null);

    // Initial Form State
    const initialForm = {
        section: "solutions",
        slug: "",
        activeSections: ['hero', 'about', 'features', 'banner', 'whyInvest', 'tech', 'portfolio', 'awards', 'cta', 'blogs', 'faq'], 
        content: {
            hero: { title: "", subtitle: "", image: "" },
            aboutTitle: "About Our Solution",
            aboutSubtitle: "We provide comprehensive solutions.",
            benefits: ["Scalable Architecture", "24/7 Support"],
            services: [{ title: "User App", image: "" }, { title: "Admin Panel", image: "" }],
            caseStudy: { image: "" },
            portfolioCategory: "app",
            banner: { title: "Hungry For More?", subtitle: "Explore potential.", btnText: "Get Started" },
            cta: { title: "Ready to Scale?" }
        }
    };

    // --- API Fetch ---
    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/solutions?section=all");
            const json = await res.json();
            if (json.ok) {
                setItems(json.data);
            }
        } catch (e) { console.error("Fetch Error:", e); }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    // --- Handlers ---
    const handleCreate = (type) => {
        setEditorType(type);
        setEditorData({ 
            ...initialForm, 
            type, 
            // Map generic types to specific DB tables/sections
            section: type === 'industry' ? 'industries' : 'solutions' 
        });
        setView("editor");
    };

    // ✅ FIXED: Edit Handler using ID or Slug
    const handleEdit = async (item) => {
        setLoading(true);
        try {
            // Prefer fetching by ID if available, otherwise Slug
            const query = item.id ? `id=${item.id}` : `slug=${item.slug}`;
            const res = await fetch(`/api/admin/solutions?${query}`);
            const json = await res.json();

            if (json.success && json.data) {
                setEditorType(json.data.type || 'solution');
                setEditorData(json.data); // Load full data into editor
                setView("editor");
            } else {
                alert("Error loading page data.");
            }
        } catch (e) { 
            console.error(e);
            alert("Failed to fetch page details."); 
        }
        setLoading(false);
    };

    // ✅ FIXED: Delete Handler
    const handleDelete = async (item) => {
        if (!confirm(`Are you sure you want to delete "${item.title}"? This cannot be undone.`)) return;
        
        try {
            const res = await fetch("/api/admin/solutions", { 
                method: "DELETE", 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, slug: item.slug }) // Send both to be safe
            });
            
            const result = await res.json();
            
            if (result.ok || result.success) {
                // Remove from local state immediately for snappy feel
                fetchItems(); 
            } else {
                alert("Delete failed: " + result.message);
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred while deleting.");
        }
    };

    // --- Configuration ---
    const categories = [
        { 
            key: 'solutions', 
            label: 'Core Solutions', 
            icon: Zap, 
            color: 'text-sky-600', 
            bg: 'bg-sky-50',
            borderColor: 'border-sky-100'
        },
        { 
            key: 'industries', 
            label: 'Industries', 
            icon: Briefcase, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            borderColor: 'border-emerald-100'
        },
        { 
            key: 'clones', 
            label: 'Clone Scripts', 
            icon: Code, 
            color: 'text-orange-600', 
            bg: 'bg-orange-50',
            borderColor: 'border-orange-100'
        }
    ];

    if (view === "editor") {
        return <PageEditor data={editorData} type={editorType} onBack={() => { setView("list"); fetchItems(); }} />;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-6 md:p-8">
            <div className="max-w-[1800px] mx-auto space-y-8">
                
                {/* ================= HEADER ================= */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3">
                            Page Management
                            {loading && <RefreshCw size={18} className="animate-spin text-slate-400"/>}
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Manage Dynamic DB Pages</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                         <button onClick={fetchItems} className="bg-white border border-slate-200 text-slate-600 px-3 py-2.5 rounded-lg hover:bg-slate-50 shadow-sm transition-all" title="Refresh List"><RefreshCw size={18}/></button>
                         <button onClick={() => handleCreate('solution')} className="bg-sky-600 text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-sky-700 shadow-md text-xs transition-all"><Plus size={16}/> Add Solution</button>
                         <button onClick={() => handleCreate('industry')} className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-md text-xs transition-all"><Plus size={16}/> Add Industry</button>
                         <button onClick={() => handleCreate('clone')} className="bg-orange-600 text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 shadow-md text-xs transition-all"><Plus size={16}/> Add Clone</button>
                    </div>
                </div>

                {/* ================= SEARCH ================= */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 w-full md:w-auto px-2">
                        <Search size={18} className="text-slate-400"/>
                        <input 
                            placeholder="Filter pages by slug or title..." 
                            className="bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-400 w-full md:w-80 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* ================= 3 COLUMN GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.key} className={`bg-slate-50/50 rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden`}>
                            
                            {/* --- Category Header --- */}
                            <div className={`p-4 border-b border-slate-200 bg-white flex items-center justify-between`}>
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${cat.bg}`}>
                                        <cat.icon size={18} className={cat.color} />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-800">{cat.label}</h3>
                                </div>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200">
                                    {items[cat.key]?.length || 0}
                                </span>
                            </div>

                            {/* --- Scrollable List --- */}
                            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-320px)] custom-scrollbar">
                                {items[cat.key]?.filter(i => (i.slug + i.title).toLowerCase().includes(searchTerm.toLowerCase())).map((it) => {
                                    
                                    // Determine Routes
                                    const viewUrl = cat.key === 'industries' ? `/industries/${it.slug}` : `/solutions/${it.slug}`;
                                    
                                    // Since we moved to DB only, these are mostly true now
                                    // But keeping check for legacy file support if any
                                    const isDb = true; 

                                    return (
                                        <div key={it.id || it.slug} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group relative">
                                            
                                            {/* --- Title & Info --- */}
                                            <div className="pr-12 mb-4">
                                                <div className="font-bold text-slate-800 text-sm truncate" title={it.title}>
                                                    {it.title || it.slug}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="text-[10px] text-slate-500 font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[150px]">
                                                        /{it.slug}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --- ACTION BUTTONS (FIXED) --- */}
                                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-50">
                                                
                                                {/* View Button */}
                                                <button 
                                                    onClick={() => window.open(viewUrl, '_blank')}
                                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-100 hover:border-emerald-200 transition-all text-xs font-semibold"
                                                    title="View Live Page"
                                                >
                                                    <ExternalLink size={13} /> View
                                                </button>

                                                {/* Edit Button */}
                                                <button 
                                                    onClick={() => handleEdit(it)}
                                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-700 border-slate-100 hover:border-sky-200 transition-all text-xs font-semibold"
                                                    title="Edit Content"
                                                >
                                                    <Edit3 size={13} /> Edit
                                                </button>

                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleDelete(it)}
                                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-700 border-slate-100 hover:border-rose-200 transition-all text-xs font-semibold"
                                                    title="Delete Page"
                                                >
                                                    <Trash2 size={13} /> Del
                                                </button>
                                            </div>

                                        </div>
                                    );
                                })}

                                {/* --- Empty State --- */}
                                {items[cat.key]?.length === 0 && (
                                    <div className="h-40 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl m-2 bg-slate-50">
                                            <cat.icon size={24} className="mb-2 opacity-30"/>
                                            <p className="text-xs font-medium opacity-60">No pages found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}