// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Plus,
//   Search,
//   Edit,
//   Trash2,
//   Eye,
//   Copy,
//   MoreVertical,
//   Filter,
//   Globe,
//   FileText,
//   Calendar,
// } from 'lucide-react';

// export default function AdminServicesPage() {
//   const router = useRouter();
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);

//   useEffect(() => {
//     loadServices();
//   }, [filter]);

//   const loadServices = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/admin/services?status=${filter}`);
//       const data = await res.json();
//       setServices(data.services || []);
//     } catch (error) {
//       console.error('Load services error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/admin/services/${id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok) {
//         loadServices();
//         setShowDeleteModal(false);
//         setSelectedService(null);
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   const handleDuplicate = async (service) => {
//     try {
//       const content = JSON.parse(service.contentJson);
//       const res = await fetch('/api/admin/services', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: `${service.title} (Copy)`,
//           slug: `${service.slug}-copy`,
//           excerpt: service.excerpt,
//           status: 'draft',
//           type: 'service',
//           contentJson: JSON.stringify(content),
//         }),
//       });

//       if (res.ok) {
//         loadServices();
//       }
//     } catch (error) {
//       console.error('Duplicate error:', error);
//     }
//   };

//   const filteredServices = services.filter((service) =>
//     service.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const stats = [
//     {
//       label: 'Total Services',
//       value: services.length,
//       icon: FileText,
//       color: 'from-blue-500 to-blue-600',
//     },
//     {
//       label: 'Published',
//       value: services.filter((s) => s.status === 'published').length,
//       icon: Globe,
//       color: 'from-emerald-500 to-emerald-600',
//     },
//     {
//       label: 'Draft',
//       value: services.filter((s) => s.status === 'draft').length,
//       icon: Edit,
//       color: 'from-amber-500 to-amber-600',
//     },
//     {
//       label: 'Total Views',
//       value: '12.5K',
//       icon: Eye,
//       color: 'from-purple-500 to-purple-600',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">Services Management</h1>
//               <p className="text-sm text-slate-500 mt-1">Manage your service pages</p>
//             </div>
//             <Link
//               href="/admin/services/new"
//               className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-cyan-200/50 hover:scale-105 active:scale-95 text-sm"
//             >
//               <Plus className="w-4 h-4" />
//               Add New Service
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
//                   <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
//                 </div>
//                 <div
//                   className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
//                 >
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Filters & Search */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex gap-2">
//               {['all', 'published', 'draft'].map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setFilter(status)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     filter === status
//                       ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-md'
//                       : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                   }`}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </button>
//               ))}
//             </div>

//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search services..."
//                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Services Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
//             </div>
//           ) : filteredServices.length === 0 ? (
//             <div className="text-center py-12">
//               <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//               <p className="text-slate-600 font-medium">No services found</p>
//               <p className="text-sm text-slate-500 mt-1">
//                 {searchQuery ? 'Try a different search' : 'Create your first service'}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-slate-50 border-b border-slate-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Service
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Created
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Updated
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-200">
//                   {filteredServices.map((service) => (
//                     <tr key={service.id} className="hover:bg-slate-50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center flex-shrink-0">
//                             <FileText className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-slate-900">{service.title}</p>
//                             <p className="text-sm text-slate-500">/services/{service.slug}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
//                             service.status === 'published'
//                               ? 'bg-emerald-100 text-emerald-700'
//                               : 'bg-amber-100 text-amber-700'
//                           }`}
//                         >
//                           <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
//                           {service.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-slate-600">
//                         {new Date(service.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-slate-600">
//                         {new Date(service.updatedAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Link
//                             href={`/services/${service.slug}`}
//                             target="_blank"
//                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                             title="View"
//                           >
//                             <Eye className="w-4 h-4 text-slate-600" />
//                           </Link>
//                           <Link
//                             href={`/admin/services/${service.id}/edit`}
//                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                             title="Edit"
//                           >
//                             <Edit className="w-4 h-4 text-slate-600" />
//                           </Link>
//                           <button
//                             onClick={() => handleDuplicate(service)}
//                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                             title="Duplicate"
//                           >
//                             <Copy className="w-4 h-4 text-slate-600" />
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedService(service);
//                               setShowDeleteModal(true);
//                             }}
//                             className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedService && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
//                 <Trash2 className="w-6 h-6 text-rose-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-slate-900">Delete Service</h3>
//                 <p className="text-sm text-slate-500">This action cannot be undone</p>
//               </div>
//             </div>
//             <p className="text-slate-600 mb-6">
//               Are you sure you want to delete <span className="font-semibold">{selectedService.title}</span>?
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowDeleteModal(false);
//                   setSelectedService(null);
//                 }}
//                 className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(selectedService.id)}
//                 className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
                        <button onClick={() => handleCreate('digital')} className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-violet-500 shadow-lg shadow-violet-100 hover:scale-105 transition-all text-xs active:scale-95">
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
                                                routeBase={"services"}
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