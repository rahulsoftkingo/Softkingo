"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Search, Zap, Briefcase, Code, Database, Folder, ExternalLink, RefreshCw, Layers, Globe, Settings } from "lucide-react";
import ServicePageEditor from "./_components/ServicePageEditor";
import DigitalPageEditor from "../digitalmarket/_components/digitalPageEditor";


export default function ServicesDigitalAdmin() {
    const [view, setView] = useState("list");
    const [editorType, setEditorType] = useState("service");

    // Data Container
    const [items, setItems] = useState({
        services: [],
        digital: []
    });

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editorData, setEditorData] = useState(null);

    // Initial Form States
    const initialServiceForm = {
        type: 'service',
        slug: "",
        activeSections: ['hero', 'seo', 'stats', 'awards', 'services', 'consultation', 'tech', 'process', 'highlight', 'portfolio', 'solutions', 'industries', 'user-guide', 'faq', 'blogs', 'inquiry'],
        content: { hero: {} }
    };

    const initialDigitalForm = {
        type: 'digital',
        slug: "",
        activeSections: ['hero', 'seo', 'stats', 'awards', 'services', 'consultation', 'tech', 'process', 'highlight', 'portfolio', 'solutions', 'industries', 'user-guide', 'faq', 'blogs', 'inquiry'],
        content: { hero: {} }
    };

    // --- API Fetch ---
    const fetchItems = async () => {
        setLoading(true);
        try {
            const [servicesRes, digitalRes] = await Promise.all([
                fetch("/api/admin/services"),
                fetch("/api/admin/digital"),
            ]);

            const servicesJson = await servicesRes.json();
            const digitalJson = await digitalRes.json();

            setItems({
                services: servicesJson.services || [],
                digital: digitalJson.digitals || [],
            });
        } catch (e) { console.error("Fetch Error:", e); }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    // --- Handlers ---
    const handleCreate = (type) => {
        setEditorType(type);
        setEditorData(type === 'service' ? { ...initialServiceForm } : { ...initialDigitalForm });
        setView("editor");
    };

    const handleEdit = async (item, type) => {
        setLoading(true);
        try {
            const apiBase = type === 'service' ? '/api/admin/services' : '/api/admin/digital';
            const res = await fetch(`${apiBase}/${item.id}`);
            const json = await res.json();

            const pageData = json.service || json.digital || json.data || json.page;

            if (pageData) {
                setEditorType(type);
                setEditorData(pageData);
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

    const handleDelete = async (item, type) => {
        if (!confirm(`Are you sure you want to delete "${item.title || item.slug}"? This cannot be undone.`)) return;

        try {
            const apiBase = type === 'service' ? '/api/admin/services' : '/api/admin/digital';
            const res = await fetch(`${apiBase}/${item.id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await res.json();
            if (result.success || result.ok) {
                alert("Deleted successfully.");
                fetchItems();
            } else {
                alert("Delete failed: " + (result.message || "Unknown error"));
            }
        } catch (e) { alert("An error occurred while deleting."); }
    };

    // --- Config ---
    const categories = [
        { key: 'services', label: 'Services', icon: Settings, color: 'text-sky-600', bg: 'bg-sky-50', type: 'service', routeBase: 'services' },
        { key: 'digital', label: 'Digital Marketing', icon: Globe, color: 'text-violet-600', bg: 'bg-violet-50', type: 'digital', routeBase: 'digital' },
    ];

    if (view === "editor") {
        if (editorType === 'service') {
            return <ServicePageEditor data={editorData} onBack={() => { setView("list"); fetchItems(); }} />;
        }
        if (editorType === 'digital') {
            return <DigitalPageEditor data={editorData} onBack={() => { setView("list"); fetchItems(); }} />;
        }
    }

    const ListItem = ({ item, type, routeBase }) => {
        const viewUrl = `/${routeBase}/${item.slug}`;

        return (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group relative">

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.status === 'published'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                        {item.status || 'draft'}
                    </span>
                </div>

                {/* Title & Info */}
                <div className="pr-20 mb-4">
                    <div className="font-bold text-slate-800 text-sm truncate" title={item.title}>
                        {item.title || item.slug}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[160px]">
                            /{item.slug}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50">

                    {/* View */}
                    <button
                        onClick={() => window.open(viewUrl, '_blank')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-sky-600 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-all text-xs font-semibold shadow-sm"
                        title="View Live Page"
                    >
                        <ExternalLink size={13} /> View
                    </button>

                    {/* Edit */}
                    <button
                        onClick={() => handleEdit(item, type)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all text-xs font-semibold shadow-sm"
                        title="Edit Content"
                    >
                        <Edit3 size={13} /> Edit
                    </button>

                    {/* Delete */}
                    <button
                        onClick={() => handleDelete(item, type)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-rose-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-all text-xs font-semibold shadow-sm"
                        title="Delete Page"
                    >
                        <Trash2 size={13} /> Delete
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-6 md:p-8">
            <div className="max-w-[1400px] mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3">
                            Services & Digital {loading && <RefreshCw size={18} className="animate-spin text-slate-400" />}
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Manage Service Pages & Digital Marketing Pages</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={fetchItems} className="bg-white border border-slate-200 text-slate-600 p-2.5 rounded-full hover:bg-slate-50 shadow-sm transition-all hover:rotate-180 active:scale-95">
                            <RefreshCw size={18} />
                        </button>
                        <button onClick={() => handleCreate('service')} className="bg-sky-600 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-sky-500 shadow-lg shadow-sky-100 hover:scale-105 transition-all text-xs active:scale-95">
                            <Plus size={16} /> Add Service
                        </button>
                        <button onClick={() => handleCreate('digital')} className="bg-violet-600 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-violet-500 shadow-lg shadow-violet-100 hover:scale-105 transition-all text-xs active:scale-95">
                            <Plus size={16} /> Add Digital
                        </button>
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

                {/* 2 Column Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {categories.map((cat) => {
                        const allItems = (items[cat.key] || []).filter(i =>
                            (i.slug + (i.title || '')).toLowerCase().includes(searchTerm.toLowerCase())
                        );

                        return (
                            <div key={cat.key} className="bg-slate-50/50 rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden">
                                <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${cat.bg}`}>
                                            <cat.icon size={18} className={cat.color} />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-800">{cat.label}</h3>
                                    </div>
                                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200">
                                        {allItems.length}
                                    </span>
                                </div>

                                <div className="p-4 overflow-y-auto h-[calc(100vh-320px)] space-y-3">
                                    {allItems.length > 0 ? (
                                        allItems.map(item => (
                                            <ListItem
                                                key={item.id}
                                                item={item}
                                                type={cat.type}
                                                routeBase={cat.routeBase}
                                            />
                                        ))
                                    ) : (
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