'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Copy,
  Globe,
  FileText,
} from 'lucide-react';

export default function AdminHirePage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    loadHirePages();
  }, [filter]);

  const loadHirePages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/pages?status=${filter}&type=hire`);
      const data = await res.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error('Load hire pages error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadHirePages();
        setShowDeleteModal(false);
        setSelectedPage(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleDuplicate = async (page) => {
    try {
      const content = page.contentJson ? JSON.parse(page.contentJson) : {};
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy`,
          key: page.key || 'hire',
          excerpt: page.excerpt,
          status: 'draft',
          type: 'hire',
          featured: page.featured || false,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          seoImage: page.seoImage,
          contentJson: JSON.stringify(content),
        }),
      });

      if (res.ok) {
        loadHirePages();
      }
    } catch (error) {
      console.error('Duplicate error:', error);
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: 'Total Hire Pages',
      value: pages.length,
      icon: FileText,
      color: 'from-sky-500 to-sky-600',
    },
    {
      label: 'Published',
      value: pages.filter((s) => s.status === 'published').length,
      icon: Globe,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      label: 'Draft',
      value: pages.filter((s) => s.status === 'draft').length,
      icon: Edit,
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Total Views',
      value: '–',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Hire Pages Management</h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your hire landing pages (from Page table)
              </p>
            </div>
            <Link
              href="/admin/hire/new"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              Add New Hire Page
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {['all', 'published', 'draft'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hire pages..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No hire pages found</p>
              <p className="text-sm text-slate-500 mt-1">
                {searchQuery ? 'Try a different search' : 'Create your first hire page'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{page.title}</p>
                            <p className="text-sm text-slate-500">/hire/{page.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            page.status === 'published'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(page.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/hire/${page.slug}`}
                            target="_blank"
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </Link>
                          <Link
                            href={`/admin/hire/${page.id}/edit`}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-slate-600" />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(page)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4 text-slate-600" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPage(page);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-rose-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Hire Page</h3>
                <p className="text-sm text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{selectedPage.title}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPage(null);
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedPage.id)}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { Plus, Trash2, Edit3, ExternalLink, RefreshCw, Search, Users } from "lucide-react";
// // import HireEditor from "./_components/HireEditor"; // Import new editor

// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   Plus,
//   Search,
//   Edit,
//   Trash2,
//   Eye,
//   Copy,
//   Globe,
//   FileText,
//   AlertTriangle,
//   RefreshCw,
//   ArrowLeft , Save 
// } from 'lucide-react';
// import HireEditor from "./_components/HireEditor"; // Import new editor

// export default function AdminHirePage() {
//   const [view, setView] = useState('list'); // 'list' | 'editor'
//   const [pages, setPages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedPage, setSelectedPage] = useState(null);
  
//   // Editor State
//   const [editorData, setEditorData] = useState(null);
//   const [saving, setSaving] = useState(false);

//   // Initial Form Data Template
//   const initialForm = {
//       title: "",
//       slug: "",
//       type: "hire",
//       status: "draft",
//       activeSections: ['hero', 'about', 'features', 'steps', 'services', 'profile', 'models', 'why', 'business', 'pricing', 'comparison', 'cta'],
//       content: { 
//           heroTitle: "", 
//           heroBg: "/images/hire/hire1.png",
//           // Default empty arrays to prevent crashes
//           features: [], benefits: [], steps: [], services: [], moreServices: [],
//           profileSection: { images: {} }, modelsSection: { models: [] }, 
//           whyHireSection: { items: [] }, businessTypesSection: { items: [] }, 
//           pricingSection: { plans: [] }, comparisonSection: { rows: [], columns: [] }
//       }
//   };

//   useEffect(() => {
//     loadHirePages();
//   }, [filter]);

//   const loadHirePages = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/admin/pages?status=${filter}&type=hire`);
//       const data = await res.json();
//       setPages(data.pages || []);
//     } catch (error) {
//       console.error('Load hire pages error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers ---

//   const handleCreate = () => {
//       setEditorData(initialForm);
//       setView("editor");
//   };

//   const handleEdit = (page) => {
//       let content = page.contentJson;
//       try {
//           if (typeof content === 'string') content = JSON.parse(content);
//       } catch (e) { content = {}; }

//       setEditorData({
//           ...page,
//           activeSections: content.activeSections || initialForm.activeSections,
//           content: content.content || content // Handle nested structure
//       });
//       setView("editor");
//   };

//   const handleSave = async (formData) => {
//       setSaving(true);
//       try {
//           // Prepare payload matching your API expectation
//           const payload = {
//               title: formData.title,
//               slug: formData.slug,
//               key: formData.key || 'hire', // Ensure key exists
//               status: formData.status,
//               type: 'hire',
//               excerpt: formData.excerpt,
//               seoTitle: formData.seoTitle,
//               seoDescription: formData.seoDescription,
//               seoImage: formData.seoImage,
//               contentJson: JSON.stringify({
//                   activeSections: formData.activeSections,
//                   content: formData.content // Wrap content inside content object
//               })
//           };

//           const url = formData.id ? `/api/admin/pages/${formData.id}` : `/api/admin/pages`;
//           const method = formData.id ? 'PUT' : 'POST';

//           const res = await fetch(url, {
//               method,
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(payload)
//           });

//           if (res.ok) {
//               alert("Saved Successfully!");
//               setView("list");
//               loadHirePages();
//           } else {
//               const err = await res.json();
//               alert("Failed: " + (err.error || err.message));
//           }
//       } catch(e) { 
//           console.error(e); 
//           alert("Error saving page"); 
//       }
//       setSaving(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         loadHirePages();
//         setShowDeleteModal(false);
//         setSelectedPage(null);
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   const handleDuplicate = async (page) => {
//     try {
//       // Parse content to stringify again
//       let contentStr = page.contentJson;
//       if (typeof contentStr !== 'string') contentStr = JSON.stringify(contentStr);

//       const res = await fetch('/api/admin/pages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: `${page.title} (Copy)`,
//           slug: `${page.slug}-copy-${Date.now()}`, // Ensure unique slug
//           key: page.key || 'hire',
//           excerpt: page.excerpt,
//           status: 'draft',
//           type: 'hire',
//           seoTitle: page.seoTitle,
//           contentJson: contentStr,
//         }),
//       });

//       if (res.ok) {
//         loadHirePages();
//       }
//     } catch (error) {
//       console.error('Duplicate error:', error);
//     }
//   };

//   const filteredPages = pages.filter((page) =>
//     page.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // --- Render Editor ---
//   if (view === "editor") {
//       // We reuse the HireEditor component we created.
//       // Need to define a wrapper to pass props correctly if HireEditor expects specific format
//       // Here assuming HireEditor is defined as in previous step.
      
//       // We need a wrapper to provide the MediaInput logic since we extracted it in PageEditor.
//       // To keep it simple, I will provide a MediaInput stub here or you should import the full PageEditor
//       // BUT you asked to keep this page separate.
//       // Ideally, HireEditor should be self-contained or passed MediaInput.
      
//       // Let's assume HireEditor is imported from `../solutions/_components/HireEditor`
//       // We need to provide the MediaInput prop to it.
      
//       return (
//         <HirePageEditorWrapper 
//             data={editorData} 
//             onBack={() => setView('list')} 
//             onSave={handleSave} 
//             loading={saving} 
//         />
//       );
//   }

//   // --- Render List ---
//   const stats = [
//     { label: 'Total Pages', value: pages.length, icon: FileText, color: 'from-sky-500 to-sky-600' },
//     { label: 'Published', value: pages.filter((s) => s.status === 'published').length, icon: Globe, color: 'from-emerald-500 to-emerald-600' },
//     { label: 'Draft', value: pages.filter((s) => s.status === 'draft').length, icon: Edit, color: 'from-amber-500 to-amber-600' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
      
//       {/* Header */}
//       <header className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Hire Pages</h1>
//             <p className="text-sm text-slate-500 mt-1">Manage landing pages for hiring developers.</p>
//           </div>
//           <button
//             onClick={handleCreate}
//             className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
//           >
//             <Plus className="w-4 h-4" /> Add New Page
//           </button>
//         </div>
//       </header>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {stats.map((stat, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
//             <div>
//               <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
//               <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
//             </div>
//             <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
//               <stat.icon size={20} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Toolbar */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
//         <div className="flex bg-slate-100 p-1 rounded-lg">
//             {['all', 'published', 'draft'].map((s) => (
//                 <button
//                     key={s}
//                     onClick={() => setFilter(s)}
//                     className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
//                 >
//                     {s.charAt(0).toUpperCase() + s.slice(1)}
//                 </button>
//             ))}
//         </div>
//         <div className="relative w-full md:w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
//             />
//         </div>
//       </div>

//       {/* List */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         {loading ? (
//             <div className="p-12 text-center text-slate-400"><RefreshCw className="w-8 h-8 animate-spin mx-auto"/> Loading...</div>
//         ) : filteredPages.length === 0 ? (
//             <div className="p-12 text-center text-slate-400">No pages found.</div>
//         ) : (
//             <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                     <thead>
//                         <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
//                             <th className="px-6 py-4">Title</th>
//                             <th className="px-6 py-4">Status</th>
//                             <th className="px-6 py-4">Key</th>
//                             <th className="px-6 py-4 text-right">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100">
//                         {filteredPages.map(page => (
//                             <tr key={page.id} className="hover:bg-slate-50 transition-colors group">
//                                 <td className="px-6 py-4">
//                                     <div className="font-bold text-slate-800">{page.title}</div>
//                                     <div className="text-xs text-slate-500 font-mono">/hire/{page.slug}</div>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${page.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
//                                         {page.status}
//                                     </span>
//                                 </td>
//                                 <td className="px-6 py-4 text-sm text-slate-600">{page.key}</td>
//                                 <td className="px-6 py-4 text-right">
//                                     <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                                         <button onClick={() => window.open(`/hire/${page.slug}`, '_blank')} className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg" title="View"><Eye size={16}/></button>
//                                         <button onClick={() => handleDuplicate(page)} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg" title="Duplicate"><Copy size={16}/></button>
//                                         <button onClick={() => handleEdit(page)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit"><Edit size={16}/></button>
//                                         <button onClick={() => { setSelectedPage(page); setShowDeleteModal(true); }} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg" title="Delete"><Trash2 size={16}/></button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         )}
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal && selectedPage && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
//             <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 mx-auto">
//                 <AlertTriangle className="w-6 h-6 text-rose-600" />
//             </div>
//             <h3 className="text-lg font-bold text-center text-slate-900 mb-2">Delete Page?</h3>
//             <p className="text-sm text-slate-500 text-center mb-6">
//               Are you sure you want to delete <strong>{selectedPage.title}</strong>? This action cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
//               <button onClick={() => handleDelete(selectedPage.id)} className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}

//       </div>
//     </div>
//   );
// }

// // --- Internal Wrapper to provide MediaInput to HireEditor ---
// // Since we are outside the main PageEditor context, we define a simple MediaInput here.
// // Or you can import the same MediaInput if you exported it.
// import { Image as ImageIcon2, FolderOpen as FolderOpen2, X as X2, Loader2 as Loader2_2, Home, ChevronRight, UploadCloud, FolderPlus } from 'lucide-react';

// const MediaInput = ({ label, value, path, onUpdate, onBrowse }) => (
//     <div className="group">
//         <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">{label}</label>
//         <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-500">
//             <div className="pl-3 text-slate-400"><ImageIcon2 size={14}/></div>
//             <input 
//                 className="flex-1 p-2.5 bg-transparent border-none text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400" 
//                 value={value || ''} 
//                 onChange={(e) => onUpdate(path, e.target.value)} 
//                 placeholder="Paste URL or Select Image..." 
//             />
//             {value && <button onClick={() => onUpdate(path, "")} className="px-2 text-slate-400 hover:text-red-500"><X2 size={14}/></button>}
//             <button onClick={() => onBrowse(path)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border-l border-slate-200 font-medium text-xs flex items-center gap-1">
//                 <FolderOpen2 size={14}/> Select
//             </button>
//         </div>
//         {value && <div className="mt-2 h-32 w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden"><img src={value} className="w-full h-full object-contain" alt="preview"/></div>}
//     </div>
// );

// // Wrapper to handle state logic for HireEditor including Media Browser
// function HirePageEditorWrapper({ data, onBack, onSave, loading }) {
//     const [formData, setFormData] = useState(data);
//     const [showImageBrowser, setShowImageBrowser] = useState(false);
//     const [currentImageField, setCurrentImageField] = useState('');
//     const [mediaPath, setMediaPath] = useState("uploads/hire"); 
//     const [mediaFiles, setMediaFiles] = useState([]);
//     const [mediaLoading, setMediaLoading] = useState(false);
//     const [uploading, setUploading] = useState(false);

//     // --- Helper: Update Fields ---
//     const updateField = (path, value) => {
//         setFormData(prev => {
//             const copy = JSON.parse(JSON.stringify(prev));
//             if (!copy.content) copy.content = {};
            
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

//     // --- Media Handlers (Copied logic) ---
//     const fetchMedia = async (folderPath) => {
//         setMediaLoading(true);
//         try {
//             const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folderPath)}`);
//             if (res.ok) {
//                 const json = await res.json();
//                 setMediaFiles(json.files || []);
//                 setMediaPath(folderPath);
//             }
//         } catch(e) { console.error(e); }
//         setMediaLoading(false);
//     };

//     const openBrowser = (path) => {
//         setCurrentImageField(path);
//         setShowImageBrowser(true);
//         fetchMedia(mediaPath || "uploads/hire"); 
//     };
    
//     const handleFileUpload = async (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;
//         setUploading(true);
//         const fd = new FormData();
//         fd.append("file", file);
//         fd.append("folder", mediaPath); 
//         try {
//             const res = await fetch("/api/media/upload", { method: "POST", body: fd });
//             if (res.ok) await fetchMedia(mediaPath);
//             else alert("Upload failed");
//         } catch (err) { alert(err.message); }
//         setUploading(false);
//     };

//     return (
//         <>
//             <HireEditor 
//                 formData={formData} 
//                 updateField={updateField} 
//                 MediaInput={(props) => <MediaInput {...props} onUpdate={updateField} onBrowse={openBrowser} />} 
//                 activeSections={formData.activeSections} 
//             />
            
//             {/* Sidebar Save Button is inside HireEditor? No, HireEditor is just inputs. 
//                 We need to wrap HireEditor in the Sidebar Layout here OR make HireEditor full page.
                
//                 Correction: The previous `HireEditor` I gave you INCLUDED the sidebar. 
//                 So we just need to pass props.
                
//                 Wait, `HireEditor` (component) I gave earlier renders:
//                 <div className="max-w-4xl mx-auto pb-20"> ... </div>
//                 It does NOT have sidebar. It is just the form content.
                
//                 So we need to reconstruct the Sidebar Layout here for consistent look.
//             */}
            
//             <div className="flex h-screen overflow-hidden bg-white fixed inset-0 z-50">
//                  {/* SIDEBAR */}
//                 <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
//                     <div className="p-5 border-b bg-white">
//                         <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 mb-4"><ArrowLeft size={14}/> BACK</button>
//                         <h2 className="text-lg font-black text-cyan-600 flex items-center gap-2 uppercase">Hire Editor</h2>
//                     </div>
                    
//                     <div className="flex-1 overflow-y-auto p-5 space-y-6">
//                         {/* Page Settings */}
//                          <div className="space-y-3">
//                             <label className="text-[10px] font-bold text-slate-400 block">PAGE SETTINGS</label>
//                             <input className={inputStyle} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Page Title" />
//                             <div className="flex items-center bg-white rounded-lg border border-slate-200 px-2">
//                                 <span className="text-slate-400 text-xs">/hire/</span>
//                                 <input className="w-full p-2 bg-transparent border-none text-sm font-mono text-slate-600 outline-none" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="slug" />
//                             </div>
//                              {/* Key */}
//                              <input className={inputStyle} value={formData.key} onChange={e => setFormData({...formData, key: e.target.value})} placeholder="Unique Key (e.g. hire-react)" />
                            
//                              <select className={inputStyle} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
//                                 <option value="draft">Draft</option>
//                                 <option value="published">Published</option>
//                             </select>
//                         </div>
                        
//                         {/* Sections Toggle List - could be added here if needed to toggle visibility */}
//                          <div className="space-y-2">
//                             <label className="text-[10px] font-bold text-slate-400 block">SECTIONS</label>
//                             <div className="text-xs text-slate-500">All sections are active by default.</div>
//                         </div>
//                     </div>

//                     <div className="p-5 border-t bg-white">
//                         <button onClick={() => onSave(formData)} className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold text-sm flex justify-center gap-2 hover:bg-cyan-700 transition-all shadow-lg">
//                             {loading ? <Loader2_2 className="animate-spin" size={16}/> : <Save size={16}/>} Save Page
//                         </button>
//                     </div>
//                 </div>

//                 {/* MAIN CONTENT */}
//                 <div className="flex-1 bg-slate-100 overflow-y-auto p-8 lg:p-12">
//                      <HireEditor 
//                         formData={formData} 
//                         updateField={updateField} 
//                         MediaInput={(props) => <MediaInput {...props} onUpdate={updateField} onBrowse={openBrowser} />} 
//                         activeSections={formData.activeSections} 
//                     />
//                 </div>
//             </div>

//             {/* Media Modal */}
//             {showImageBrowser && (
//                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
//                      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
//                         <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
//                             <div><h3 className="text-lg font-bold text-slate-900">Media Library</h3></div>
//                             <button onClick={() => setShowImageBrowser(false)} className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg"><X2 size={16}/></button>
//                         </div>
//                         <div className="px-4 py-2 border-b border-slate-200 bg-white flex justify-between items-center gap-4">
//                              <div className="flex items-center gap-1 text-xs text-slate-600 overflow-x-auto flex-1">
//                                 <button onClick={() => fetchMedia("")} className="flex items-center gap-1 hover:text-blue-600 font-bold whitespace-nowrap"><Home size={12}/> Root</button>
//                                 {mediaPath.split('/').filter(Boolean).map((part, i, arr) => (
//                                     <React.Fragment key={i}><ChevronRight size={10} className="text-slate-400"/><button onClick={() => fetchMedia(arr.slice(0, i+1).join('/'))} className="hover:text-blue-600 font-medium whitespace-nowrap">{part}</button></React.Fragment>
//                                 ))}
//                             </div>
//                             <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer text-xs font-bold transition-all">
//                                 {uploading ? <Loader2_2 className="animate-spin" size={14}/> : <UploadCloud size={14}/>} Upload
//                                 <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading}/>
//                             </label>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 min-h-[300px]">
//                             {mediaLoading ? <div className="flex justify-center h-full items-center"><Loader2_2 className="animate-spin text-slate-400"/></div> : (
//                                 <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
//                                      {mediaFiles.map((f, i) => (
//                                         <button key={i} onClick={() => f.isDir ? fetchMedia(f.path.replace(/^\//, '')) : (updateField(currentImageField, f.path), setShowImageBrowser(false))} className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
//                                             {f.isDir ? <FolderOpen2 className="h-10 w-10 text-yellow-400"/> : <img src={f.path} className="w-full h-20 object-cover rounded-lg"/>}
//                                             <span className="text-[10px] font-bold text-slate-600 mt-2 truncate w-full text-center">{f.name}</span>
//                                         </button>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// const inputStyle = "w-full p-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500 outline-none";