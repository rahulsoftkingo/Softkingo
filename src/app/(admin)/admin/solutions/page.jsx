"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Search, Zap, Briefcase, Code, Database, Folder, ExternalLink, RefreshCw, Layers } from "lucide-react";
import PageEditor from "./_components/PageEditor";

export default function SolutionsAdmin() {
    const [view, setView] = useState("list");
    const [editorType, setEditorType] = useState("solution");

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
        content: { hero: {} }
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
            section: type === 'industry' ? 'industries' : 'solutions'
        });
        setView("editor");
    };

    const handleEdit = async (item) => {
        setLoading(true);
        try {
            const query = item.source === 'db' || item.source === 'both' ? `id=${item.id}` : `slug=${item.slug}`;
            const res = await fetch(`/api/admin/solutions?${query}`);
            const json = await res.json();

            if (json.success && json.data) {
                setEditorType(json.data.type || 'solution');
                setEditorData(json.data);
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

    // const handleDelete = async (item, section) => {
    //     const isFile = item.source === 'file';
    //     const msg = isFile 
    //         ? `⚠️ WARNING: This will PERMANENTLY DELETE the FOLDER "${item.slug}" from your server files. This cannot be undone.`
    //         : `Are you sure you want to delete "${item.title}"? This cannot be undone.`;

    //     if (!confirm(msg)) return;

    //     try {
    //         const res = await fetch("/api/admin/solutions", { 
    //             method: "DELETE", 
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ 
    //                 id: item.id, 
    //                 slug: item.slug,
    //                 source: item.source, // 'db', 'file', 'both'
    //                 section: section // needed for file deletion path
    //             }) 
    //         });
    //         const result = await res.json();
    //         if (result.ok || result.success) { fetchItems(); } 
    //         else { alert("Delete failed: " + result.message); }
    //     } catch (e) { alert("An error occurred while deleting."); }
    // };

    // Updated Delete Handler
    const handleDelete = async (item, section, deleteType) => {
        // deleteType: 'delete_db' or 'delete_file'

        const confirmMsg = deleteType === 'delete_file'
            ? `⚠️ DANGER: This will PERMANENTLY DELETE the folder "${item.slug}" from your server code. Cannot be undone.`
            : `Are you sure you want to delete "${item.title}" from the Database?`;

        if (!confirm(confirmMsg)) return;

        try {
            const res = await fetch("/api/admin/solutions", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: typeof item.id === 'number' ? item.id : null, // Only pass ID if it's a real DB id
                    slug: item.slug,
                    section: section, // needed for file path
                    action: deleteType // Tell API what to delete
                })
            });
            const result = await res.json();
            if (result.success) {
                alert(result.message);
                fetchItems(); // Refresh list
            } else {
                alert("Failed: " + result.message);
            }
        } catch (e) { alert("An error occurred."); }
    };
    // --- Config ---
    const categories = [
        { key: 'solutions', label: 'Core Solutions', icon: Zap, color: 'text-sky-600', bg: 'bg-sky-50' },
        { key: 'industries', label: 'Industries', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { key: 'clones', label: 'Clone Scripts', icon: Code, color: 'text-orange-600', bg: 'bg-orange-50' }
    ];

    if (view === "editor") {
        return <PageEditor data={editorData} type={editorType} onBack={() => { setView("list"); fetchItems(); }} />;
    }

    // Helper Component for List Item (UI Restored)
    // const ListItem = ({ item, catKey }) => {
    //     const isDb = item.source === 'db' || item.source === 'both';
    //     const isFile = item.source === 'file' || item.source === 'both';

    //     const routeSection = catKey === 'industries' ? 'industries' : 'solutions';
    //     const viewUrl = `/${routeSection}/${item.slug}`;

    //     return (
    //         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group relative">

    //             {/* Source Badges */}
    //             <div className="absolute top-3 right-3 flex gap-1.5">
    //                 {isDb && <Database size={14} className="text-blue-500" strokeWidth={2.5} title="Source: Database" />}
    //                 {isFile && <Folder size={14} className="text-yellow-500" strokeWidth={2.5} title="Source: File Folder" />}
    //             </div>

    //             {/* Title & Info */}
    //             <div className="pr-12 mb-4">
    //                 <div className="font-bold text-slate-800 text-sm truncate" title={item.title}>
    //                     {item.title || item.slug}
    //                 </div>
    //                 <div className="flex items-center gap-2 mt-1">
    //                     <div className="text-[10px] text-slate-500 font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[150px]">
    //                         /{item.slug}
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Action Buttons (Always Visible like before) */}
    //             <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-50">
    //                 <button 
    //                     onClick={() => window.open(viewUrl, '_blank')}
    //                     className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-100 hover:border-emerald-200 transition-all text-xs font-semibold"
    //                     title="View Live Page"
    //                 >
    //                     <ExternalLink size={13} /> View
    //                 </button>

    //                 <button 
    //                     onClick={() => handleEdit(item)}
    //                     // Edit is disabled ONLY if it's purely a file (no DB entry to edit in this editor)
    //                     disabled={!isDb} 
    //                     className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg transition-all text-xs font-semibold border
    //                         ${isDb 
    //                             ? "bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-700 border-slate-100 hover:border-sky-200" 
    //                             : "bg-slate-50 text-slate-300 border-transparent cursor-not-allowed opacity-50"}
    //                     `}
    //                     title={isDb ? "Edit Content" : "Static File (Cannot Edit)"}
    //                 >
    //                     <Edit3 size={13} /> Edit
    //                 </button>

    //                 <button 
    //                     onClick={() => handleDelete(item, catKey)}
    //                     className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-700 border-slate-100 hover:border-rose-200 transition-all text-xs font-semibold"
    //                     title="Delete Page/Folder"
    //                 >
    //                     <Trash2 size={13} /> Del
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // };

    const ListItem = ({ item, catKey }) => {
        const isDb = item.source === 'db' || item.source === 'both';
        const isFile = item.source === 'file' || item.source === 'both';

        const routeSection = catKey === 'industries' ? 'industries' : 'solutions';
        const viewUrl = `/${routeSection}/${item.slug}`;

        return (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group relative">

                {/* Source Badges */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                    {isDb && <span title="Exists in DB" className="bg-blue-100 text-blue-700 p-1 rounded"><Database size={12} /></span>}
                    {isFile && <span title="Exists as File" className="bg-yellow-100 text-yellow-700 p-1 rounded"><Folder size={12} /></span>}
                </div>

                {/* Title & Info */}
                <div className="pr-16 mb-4">
                    <div className="font-bold text-slate-800 text-sm truncate" title={item.title}>
                        {item.title || item.slug}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[150px]">
                            /{item.slug}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50">

                    {/* 1. View */}
                    <button onClick={() => window.open(viewUrl, '_blank')} className="btn-icon bg-slate-50 text-slate-600 hover:text-sky-600 transition-colors duration-200 shadow-sm hover:shadow-md px-6 py-2" title="View Live">
                        <ExternalLink size={14} />
                    </button>

                    {/* 2. Edit (Only for DB items) */}
                    {isDb && (
                        <button onClick={() => handleEdit(item)} className="btn-icon bg-slate-50 text-slate-600 hover:text-emerald-600 transition-colors duration-200 shadow-sm hover:shadow-md px-6 py-2" title="Edit Content">
                            <Edit3 size={14} />
                        </button>
                    )}

                    {/* 3. Delete DB (Only if in DB) */}
                    {isDb && (
                        <button onClick={() => handleDelete(item, catKey, 'delete_db')} className="btn-icon bg-slate-50 text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-200 shadow-sm hover:shadow-md shrink-1 flex gap-2 px-2 py-2" title="Delete from Database">
                            <Database size={14} /> <span className="text-[10px] ml-1">Del</span>
                        </button>
                    )}

                    {/* 4. Delete File (Only if in File) */}
                    {isFile && (
                        <button onClick={() => handleDelete(item, catKey, 'delete_file')} className="btn-icon bg-slate-50 text-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 shadow-sm hover:shadow-md shrink-1 flex gap-2 px-2 py-2" title="Delete Folder">
                            <Folder size={14} /> <span className="text-[10px] ml-1">Del</span>
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-6 md:p-8">
            <div className="max-w-[1800px] mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3">
                            Page Management {loading && <RefreshCw size={18} className="animate-spin text-slate-400" />}
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Manage Dynamic & Static Pages</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={fetchItems} className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 shadow-sm"><RefreshCw size={18} /></button>
                        <button onClick={() => handleCreate('solution')} className="bg-sky-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-sky-700 shadow-sm text-xs"><Plus size={16} /> Add Solution</button>
                        <button onClick={() => handleCreate('industry')} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-sm text-xs"><Plus size={16} /> Add Industry</button>
                        <button onClick={() => handleCreate('clone')} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 shadow-sm text-xs"><Plus size={16} /> Add Clone</button>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 px-4">
                    <Search size={18} className="text-slate-400" />
                    <input
                        placeholder="Search pages..."
                        className="bg-transparent border-none text-sm font-medium focus:ring-0 w-full outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categories.map((cat) => {
                        const allItems = items[cat.key]?.filter(i => (i.slug + i.title).toLowerCase().includes(searchTerm.toLowerCase())) || [];
                        const dbItems = allItems.filter(i => i.source === 'db' || i.source === 'both');
                        const fileItems = allItems.filter(i => i.source === 'file' && i.slug !== '[slug]');

                        return (
                            <div key={cat.key} className="bg-slate-50/50 rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden">
                                <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${cat.bg}`}><cat.icon size={18} className={cat.color} /></div>
                                        <h3 className="text-sm font-bold text-slate-800">{cat.label}</h3>
                                    </div>
                                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200">{allItems.length}</span>
                                </div>

                                <div className="p-4 overflow-y-auto h-[calc(100vh-320px)] custom-scrollbar space-y-6">

                                    {/* DB Pages Section */}
                                    {dbItems.length > 0 && (
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                <Database size={10} /> Database Pages
                                            </h4>
                                            <div className="space-y-3">
                                                {dbItems.map(item => <ListItem key={item.id} item={item} catKey={cat.key} />)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Static Files Section */}
                                    {fileItems.length > 0 && (
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                <Folder size={10} /> Static Files
                                            </h4>
                                            <div className="space-y-3">
                                                {fileItems.map(item => <ListItem key={item.id} item={item} catKey={cat.key} />)}
                                            </div>
                                        </div>
                                    )}

                                    {allItems.length === 0 && (
                                        <div className="h-40 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                            <Layers size={24} className="mb-2 opacity-30" />
                                            <p className="text-xs font-medium opacity-60">No pages found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}