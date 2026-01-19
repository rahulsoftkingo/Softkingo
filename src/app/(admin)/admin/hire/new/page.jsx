// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { ArrowLeft, Save, Eye, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
// // import Link from 'next/link';

// // export default function NewHirePage() {
// //   const router = useRouter();
// //   const [saving, setSaving] = useState(false);
// //   const [activeTab, setActiveTab] = useState('basic');

// //   const [formData, setFormData] = useState({
// //     title: '',
// //     slug: '',
// //     key: 'hire-front-end',
// //     excerpt: '',
// //     status: 'draft',
// //     seoTitle: '',
// //     seoDescription: '',
// //     seoImage: '',

// //     // Hero
// //     heroBg: '/images/hire/h-bg.png',
// //     heroTitle: '',
// //     heroSubtitle: '',

// //     // Optional custom fields for hire layout
// //     badgeText: 'Hire Page',
// //     metrics: {
// //       avgTime: '48 Hours',
// //       network: '100+ Experts',
// //       rating: '4.9/5',
// //     },

// //     // Extra section titles
// //     aboutTitle: 'Front-End Developers by Softkingo',
// //     aboutSubtitle:
// //       'Softkingo has a pool of top Front-end developers who can deliver an extraordinary user experience.',
// //   });

// //   const tabs = [
// //     { id: 'basic', label: 'Basic Info' },
// //     { id: 'hero', label: 'Hero Section' },
// //     { id: 'content', label: 'Layout Text' },
// //     { id: 'seo', label: 'SEO' },
// //   ];

// //   const generateSlug = (title) =>
// //     title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// //   const handleTitleChange = (e) => {
// //     const title = e.target.value;
// //     setFormData((prev) => ({
// //       ...prev,
// //       title,
// //       slug: generateSlug(title),
// //       heroTitle: title,
// //       seoTitle: prev.seoTitle || title,
// //     }));
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleMetricsChange = (field, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       metrics: { ...prev.metrics, [field]: value },
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);

// //     try {
// //       const payload = {
// //         title: formData.title,
// //         slug: formData.slug,
// //         key: formData.key || 'hire',
// //         excerpt: formData.excerpt,
// //         status: formData.status,
// //         type: 'hire',
// //         featured: false,
// //         seoTitle: formData.seoTitle || formData.title,
// //         seoDescription: formData.seoDescription || formData.excerpt,
// //         seoImage: formData.seoImage || null,
// //         contentJson: JSON.stringify({
// //           heroBg: formData.heroBg,
// //           heroTitle: formData.heroTitle,
// //           heroSubtitle: formData.heroSubtitle,
// //           badgeText: formData.badgeText,
// //           metrics: formData.metrics,
// //           aboutTitle: formData.aboutTitle,
// //           aboutSubtitle: formData.aboutSubtitle,
// //         }),
// //       };

// //       const res = await fetch('/api/admin/pages', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload),
// //       });

// //       if (res.ok) {
// //         router.push('/admin/hire');
// //       } else {
// //         alert('Failed to save hire page');
// //       }
// //     } catch (error) {
// //       console.error('Save error:', error);
// //       alert('Error saving hire page');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
// //       {/* Header */}
// //       <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <Link
// //                 href="/admin/hire"
// //                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
// //               >
// //                 <ArrowLeft className="w-5 h-5 text-slate-600" />
// //               </Link>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-slate-900">Create New Hire Page</h1>
// //                 <p className="text-sm text-slate-500 mt-1">
// //                   Add a new hire landing page (uses Page model)
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 type="button"
// //                 onClick={() => window.open(`/hire/${formData.slug}`, '_blank')}
// //                 className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
// //                 disabled={!formData.slug}
// //               >
// //                 <Eye className="w-4 h-4" />
// //                 Preview
// //               </button>
// //               <button
// //                 onClick={handleSubmit}
// //                 disabled={saving || !formData.title}
// //                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
// //               >
// //                 <Save className="w-4 h-4" />
// //                 {saving ? 'Saving...' : 'Save Hire Page'}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Tabs */}
// //           <div className="flex gap-1 mt-4 border-b border-slate-200">
// //             {tabs.map((tab) => (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => setActiveTab(tab.id)}
// //                 className={`px-4 py-3 text-sm font-medium transition-colors relative ${
// //                   activeTab === tab.id ? 'text-cyan-600' : 'text-slate-600 hover:text-slate-900'
// //                 }`}
// //               >
// //                 {tab.label}
// //                 {activeTab === tab.id && (
// //                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600"></div>
// //                 )}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </header>

// //       {/* Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Basic Info */}
// //           {activeTab === 'basic' && (
// //             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Title
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.title}
// //                     onChange={handleTitleChange}
// //                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                     placeholder="e.g. Hire Front-End Developers in India"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Slug
// //                   </label>
// //                   <div className="mt-1 flex rounded-lg shadow-sm">
// //                     <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-sm text-slate-500">
// //                       /hire/
// //                     </span>
// //                     <input
// //                       type="text"
// //                       value={formData.slug}
// //                       onChange={(e) =>
// //                         setFormData((prev) => ({ ...prev, slug: e.target.value }))
// //                       }
// //                       className="flex-1 min-w-0 block w-full px-3 py-2 border border-slate-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700">
// //                   Key (identifier)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="key"
// //                   value={formData.key}
// //                   onChange={handleChange}
// //                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   placeholder="e.g. hire-front-end"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700">
// //                   Short Description / Excerpt
// //                 </label>
// //                 <textarea
// //                   name="excerpt"
// //                   value={formData.excerpt}
// //                   onChange={handleChange}
// //                   rows={3}
// //                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   placeholder="Short summary for this hire page..."
// //                 />
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Status
// //                   </label>
// //                   <select
// //                     name="status"
// //                     value={formData.status}
// //                     onChange={handleChange}
// //                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   >
// //                     <option value="draft">Draft</option>
// //                     <option value="published">Published</option>
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Hero */}
// //           {activeTab === 'hero' && (
// //             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
// //               <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700">
// //                       Hero Title
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="heroTitle"
// //                       value={formData.heroTitle}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700">
// //                       Hero Subtitle
// //                     </label>
// //                     <textarea
// //                       name="heroSubtitle"
// //                       value={formData.heroSubtitle}
// //                       onChange={handleChange}
// //                       rows={3}
// //                       className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700">
// //                       Badge Text
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="badgeText"
// //                       value={formData.badgeText}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                       placeholder="e.g. Trusted by 500+ companies"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="space-y-3">
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Hero Background Image
// //                   </label>
// //                   <div className="relative border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
// //                         <ImageIcon className="w-6 h-6 text-slate-500" />
// //                       </div>
// //                       <div className="flex-1">
// //                         <p className="text-sm font-medium text-slate-800">
// //                           {formData.heroBg || 'No image selected'}
// //                         </p>
// //                         <p className="text-xs text-slate-500 mt-1">
// //                           Put static path for now (e.g. /images/hire/h-bg.png)
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <input
// //                       type="text"
// //                       name="heroBg"
// //                       value={formData.heroBg}
// //                       onChange={handleChange}
// //                       className="mt-3 w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                       placeholder="/images/hire/h-bg.png"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Content text */}
// //           {activeTab === 'content' && (
// //             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     About Section Title
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="aboutTitle"
// //                     value={formData.aboutTitle}
// //                     onChange={handleChange}
// //                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Avg Hiring Time
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.metrics.avgTime}
// //                     onChange={(e) => handleMetricsChange('avgTime', e.target.value)}
// //                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                     placeholder="48 Hours"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700">
// //                   About Subtitle
// //                 </label>
// //                 <textarea
// //                   name="aboutSubtitle"
// //                   value={formData.aboutSubtitle}
// //                   onChange={handleChange}
// //                   rows={3}
// //                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                 />
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Developers Network
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.metrics.network}
// //                     onChange={(e) => handleMetricsChange('network', e.target.value)}
// //                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                     placeholder="100+ Experts"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700">
// //                     Rating
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.metrics.rating}
// //                     onChange={(e) => handleMetricsChange('rating', e.target.value)}
// //                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                     placeholder="4.9/5"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* SEO */}
// //           {activeTab === 'seo' && (
// //             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700">
// //                   SEO Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="seoTitle"
// //                   value={formData.seoTitle}
// //                   onChange={handleChange}
// //                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   placeholder="Meta title for this page"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700">
// //                   SEO Description
// //                 </label>
// //                 <textarea
// //                   name="seoDescription"
// //                   value={formData.seoDescription}
// //                   onChange={handleChange}
// //                   rows={3}
// //                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   placeholder="Meta description for this page"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-slate-700">
// //                   SEO Image URL
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="seoImage"
// //                   value={formData.seoImage}
// //                   onChange={handleChange}
// //                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
// //                   placeholder="https://..."
// //                 />
// //               </div>
// //             </div>
// //           )}
// //         </form>
// //       </main>
// //     </div>
// //   );
// // }
































// 'use client';

// import { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   ArrowLeft,
//   Save,
//   Eye,
//   Image as ImageIcon,
//   Plus,
//   Trash2,
//   Lock,
//   Unlock,
//   Code,
//   AlertTriangle,
// } from 'lucide-react';

// const ICON_OPTIONS = [
//   { key: 'FaUser', label: 'User' },
//   { key: 'FaUsers', label: 'Users' },
//   { key: 'FaRocket', label: 'Rocket' },
//   { key: 'FaLightbulb', label: 'Lightbulb' },
//   { key: 'FaComments', label: 'Comments' },
//   { key: 'FaSearch', label: 'Search' },
// ];

// function genSlug(title) {
//   return String(title || '')
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// }

// function safeJson(v) {
//   try {
//     return JSON.stringify(v, null, 2);
//   } catch {
//     return '{}';
//   }
// }

// export default function NewHirePage() {
//   const router = useRouter();
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('basic');
//   const [slugLocked, setSlugLocked] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     // Core
//     title: '',
//     slug: '',
//     key: 'hire-front-end',
//     excerpt: '',
//     status: 'draft',

//     // SEO
//     seoTitle: '',
//     seoDescription: '',
//     seoImage: '',

//     // Hero
//     heroBg: '/images/hire/h-bg.png',
//     heroTitle: '',
//     heroSubtitle: '',
//     badgeText: 'Hire Page',
//     metrics: {
//       avgTime: '48 Hours',
//       network: '100+ Experts',
//       rating: '4.9/5',
//     },

//     // About
//     aboutTitle: 'Front-End Developers by Softkingo',
//     aboutSubtitle:
//       'Softkingo has a pool of top Front-end developers who can deliver an extraordinary user experience.',

//     // Dynamic blocks (DB-safe)
//     features: [
//       {
//         title: 'People Cohesion',
//         description:
//           'Creating a collaborative atmosphere where individuals work and align with goals.',
//         iconKey: 'FaUser',
//       },
//       {
//         title: 'Team Leadership',
//         description:
//           'Taking a visionary and quiet approach by consistently delivering.',
//         iconKey: 'FaUsers',
//       },
//       {
//         title: 'Team Build Up',
//         description:
//           'Building the capability of our clients to attain learning growth.',
//         iconKey: 'FaRocket',
//       },
//       {
//         title: 'Strategy',
//         description:
//           'Providing superior creativity in employee benefits plan design.',
//         iconKey: 'FaLightbulb',
//       },
//       {
//         title: 'Communication',
//         description:
//           'Keeping our clients by maximizing the performance of their organization.',
//         iconKey: 'FaComments',
//       },
//       {
//         title: 'Find A Job',
//         description:
//           'Recruiting the right people who uphold corporate and wisdom to deliver.',
//         iconKey: 'FaSearch',
//       },
//     ],

//     benefits: [
//       'Experienced, skilled, & dedicated front end developers',
//       'Reduce 60% of development cost',
//       'Ensure project privacy with strict NDA signed documents',
//       'Complete source code authorization & premium code quality',
//     ],

//     steps: [
//       {
//         number: 1,
//         icon: '/images/hire/h1.png',
//         title: 'Place a free request',
//         description:
//           'Share a short form and shed all on ways to receive developers',
//       },
//       {
//         number: 2,
//         icon: '/images/hire/h2.png',
//         title: 'Tell Us about your needs',
//         description:
//           'On a brief 30-min call, our team will listen and get chooses experts for you',
//       },
//       {
//         number: 3,
//         icon: '/images/hire/h3.png',
//         title: 'Interview The Best',
//         description:
//           'Meet 3-5 hand-picked talents within 48 hours. Select the ones you like',
//       },
//       {
//         number: 4,
//         icon: '/images/hire/h4.png',
//         title: 'Onboard The chosen One',
//         description:
//           'Begin your journey alongside with new team members, Onboard them',
//       },
//     ],
//   });

//   const tabs = [
//     { id: 'basic', label: 'Basic' },
//     { id: 'hero', label: 'Hero' },
//     { id: 'content', label: 'Layout Text' },
//     { id: 'blocks', label: 'Blocks' },
//     { id: 'seo', label: 'SEO' },
//     { id: 'json', label: 'JSON Preview' },
//   ];

//   const contentJsonObject = useMemo(() => {
//     return {
//       heroBg: formData.heroBg,
//       heroTitle: formData.heroTitle || formData.title,
//       heroSubtitle: formData.heroSubtitle,
//       badgeText: formData.badgeText,
//       metrics: formData.metrics,
//       aboutTitle: formData.aboutTitle,
//       aboutSubtitle: formData.aboutSubtitle,
//       features: formData.features,
//       benefits: formData.benefits,
//       steps: formData.steps,
//     };
//   }, [formData]);

//   const contentJsonString = useMemo(
//     () => safeJson(contentJsonObject),
//     [contentJsonObject],
//   );

//   const setField = (name, value) => {
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleTitleChange = (e) => {
//     const title = e.target.value;
//     const nextSlug = genSlug(title);

//     setFormData((prev) => ({
//       ...prev,
//       title,
//       slug: slugLocked ? prev.slug : nextSlug,
//       heroTitle: prev.heroTitle ? prev.heroTitle : title,
//       seoTitle: prev.seoTitle ? prev.seoTitle : title,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setField(name, value);
//   };

//   const handleMetricsChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       metrics: { ...prev.metrics, [field]: value },
//     }));
//   };

//   // Features CRUD
//   const addFeature = () => {
//     setFormData((p) => ({
//       ...p,
//       features: [
//         ...(p.features || []),
//         { title: '', description: '', iconKey: 'FaUser' },
//       ],
//     }));
//   };

//   const updateFeature = (idx, patch) => {
//     setFormData((p) => ({
//       ...p,
//       features: (p.features || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
//     }));
//   };

//   const removeFeature = (idx) => {
//     setFormData((p) => ({
//       ...p,
//       features: (p.features || []).filter((_, i) => i !== idx),
//     }));
//   };

//   // Benefits CRUD
//   const addBenefit = () => {
//     setFormData((p) => ({ ...p, benefits: [...(p.benefits || []), ''] }));
//   };

//   const updateBenefit = (idx, value) => {
//     setFormData((p) => ({
//       ...p,
//       benefits: (p.benefits || []).map((x, i) => (i === idx ? value : x)),
//     }));
//   };

//   const removeBenefit = (idx) => {
//     setFormData((p) => ({
//       ...p,
//       benefits: (p.benefits || []).filter((_, i) => i !== idx),
//     }));
//   };

//   // Steps CRUD
//   const addStep = () => {
//     setFormData((p) => ({
//       ...p,
//       steps: [
//         ...(p.steps || []),
//         {
//           number: (p.steps?.length || 0) + 1,
//           icon: '/images/hire/h1.png',
//           title: '',
//           description: '',
//         },
//       ],
//     }));
//   };

//   const updateStep = (idx, patch) => {
//     setFormData((p) => ({
//       ...p,
//       steps: (p.steps || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
//     }));
//   };

//   const removeStep = (idx) => {
//     setFormData((p) => {
//       const next = (p.steps || []).filter((_, i) => i !== idx);
//       // re-number
//       const renum = next.map((s, i) => ({ ...s, number: i + 1 }));
//       return { ...p, steps: renum };
//     });
//   };

//   const validate = () => {
//     if (!formData.title?.trim()) return 'Title is required.';
//     if (!formData.slug?.trim()) return 'Slug is required.';
//     if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
//       return 'Slug must be lowercase and hyphen-separated (no spaces).';
//     }
//     if (!formData.key?.trim()) return 'Key is required.';
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     const v = validate();
//     if (v) {
//       setError(v);
//       return;
//     }

//     setSaving(true);
//     try {
//       const payload = {
//         title: formData.title,
//         slug: formData.slug,
//         key: formData.key || 'hire',
//         excerpt: formData.excerpt,
//         status: formData.status,
//         type: 'hire',
//         featured: false,
//         seoTitle: formData.seoTitle || formData.title,
//         seoDescription: formData.seoDescription || formData.excerpt,
//         seoImage: formData.seoImage || null,
//         contentJson: contentJsonString,
//       };

//       const res = await fetch('/api/admin/pages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         router.push('/admin/hire');
//         return;
//       }

//       const data = await res.json().catch(() => ({}));
//       setError(data?.error || 'Failed to save hire page.');
//     } catch (err) {
//       console.error('Save error:', err);
//       setError('Error saving hire page.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//           <div className="flex items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/admin/hire"
//                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                 title="Back"
//               >
//                 <ArrowLeft className="w-5 h-5 text-slate-600" />
//               </Link>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Create New Hire Page
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1">
//                   Create a landing page using Page model + JSON blocks.
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={() => window.open(`/hire/${formData.slug}`, '_blank')}
//                 className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//                 disabled={!formData.slug}
//               >
//                 <Eye className="w-4 h-4" />
//                 Preview
//               </button>

//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={saving || !formData.title}
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
//               >
//                 <Save className="w-4 h-4" />
//                 {saving ? 'Saving...' : 'Save Hire Page'}
//               </button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-1 mt-4 border-b border-slate-200 overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'text-cyan-600'
//                     : 'text-slate-600 hover:text-slate-900'
//                 }`}
//               >
//                 {tab.label}
//                 {activeTab === tab.id && (
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
//         {error && (
//           <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
//             <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
//               <AlertTriangle className="w-5 h-5 text-rose-700" />
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-rose-900">
//                 Could not save
//               </p>
//               <p className="text-sm text-rose-800 mt-1">{error}</p>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* BASIC */}
//           {activeTab === 'basic' && (
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     placeholder="e.g. Hire Front-End Developers in India"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Slug
//                   </label>

//                   <div className="mt-1 flex items-stretch gap-2">
//                     <div className="flex flex-1 rounded-lg shadow-sm overflow-hidden">
//                       <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 bg-slate-50 text-sm text-slate-500">
//                         /hire/
//                       </span>
//                       <input
//                         type="text"
//                         value={formData.slug}
//                         onChange={(e) => setField('slug', e.target.value)}
//                         className="flex-1 min-w-0 block w-full px-3 py-2 border border-slate-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                         placeholder="hire-front-end-developers"
//                         required
//                       />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => setSlugLocked((v) => !v)}
//                       className={`px-3 rounded-lg border text-sm flex items-center gap-2 ${
//                         slugLocked
//                           ? 'border-sky-300 bg-sky-50 text-sky-700'
//                           : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
//                       }`}
//                       title={slugLocked ? 'Unlock slug' : 'Lock slug'}
//                     >
//                       {slugLocked ? (
//                         <>
//                           <Lock className="w-4 h-4" /> Locked
//                         </>
//                       ) : (
//                         <>
//                           <Unlock className="w-4 h-4" /> Auto
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   <p className="text-xs text-slate-500 mt-1">
//                     Keep it lowercase, hyphen-separated.
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   Key (identifier)
//                 </label>
//                 <input
//                   type="text"
//                   name="key"
//                   value={formData.key}
//                   onChange={handleChange}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="e.g. hire-front-end"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   Short Description / Excerpt
//                 </label>
//                 <textarea
//                   name="excerpt"
//                   value={formData.excerpt}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="Short summary for this hire page..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Status
//                   </label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* HERO */}
//           {activeTab === 'hero' && (
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">
//                       Hero Title
//                     </label>
//                     <input
//                       type="text"
//                       name="heroTitle"
//                       value={formData.heroTitle}
//                       onChange={handleChange}
//                       className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       placeholder="Defaults to Title if empty"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">
//                       Hero Subtitle
//                     </label>
//                     <textarea
//                       name="heroSubtitle"
//                       value={formData.heroSubtitle}
//                       onChange={handleChange}
//                       rows={3}
//                       className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       placeholder="Short hero description..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">
//                       Badge Text
//                     </label>
//                     <input
//                       type="text"
//                       name="badgeText"
//                       value={formData.badgeText}
//                       onChange={handleChange}
//                       className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       placeholder="e.g. Trusted by 500+ companies"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700">
//                         Avg Hiring Time
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.metrics.avgTime}
//                         onChange={(e) =>
//                           handleMetricsChange('avgTime', e.target.value)
//                         }
//                         className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700">
//                         Developers Network
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.metrics.network}
//                         onChange={(e) =>
//                           handleMetricsChange('network', e.target.value)
//                         }
//                         className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700">
//                         Rating
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.metrics.rating}
//                         onChange={(e) =>
//                           handleMetricsChange('rating', e.target.value)
//                         }
//                         className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Hero Background Image
//                   </label>

//                   <div className="relative border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
//                         <ImageIcon className="w-6 h-6 text-slate-500" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-slate-800">
//                           {formData.heroBg || 'No image selected'}
//                         </p>
//                         <p className="text-xs text-slate-500 mt-1">
//                           Use static path (e.g. /images/hire/h-bg.png)
//                         </p>
//                       </div>
//                     </div>

//                     <input
//                       type="text"
//                       name="heroBg"
//                       value={formData.heroBg}
//                       onChange={handleChange}
//                       className="mt-3 w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       placeholder="/images/hire/h-bg.png"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* CONTENT */}
//           {activeTab === 'content' && (
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   About Section Title
//                 </label>
//                 <input
//                   type="text"
//                   name="aboutTitle"
//                   value={formData.aboutTitle}
//                   onChange={handleChange}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   About Subtitle
//                 </label>
//                 <textarea
//                   name="aboutSubtitle"
//                   value={formData.aboutSubtitle}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 />
//               </div>
//             </div>
//           )}

//           {/* BLOCKS (Features/Benefits/Steps) */}
//           {activeTab === 'blocks' && (
//             <div className="space-y-6">
//               {/* Features editor */}
//               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                 <div className="flex items-center justify-between gap-4">
//                   <div>
//                     <h3 className="text-lg font-bold text-slate-900">
//                       Features (Top Cards)
//                     </h3>
//                     <p className="text-sm text-slate-500 mt-1">
//                       These appear in the cards grid below hero.
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={addFeature}
//                     className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Feature
//                   </button>
//                 </div>

//                 <div className="mt-5 space-y-4">
//                   {(formData.features || []).map((f, idx) => (
//                     <div
//                       key={idx}
//                       className="border border-slate-200 rounded-xl p-4"
//                     >
//                       <div className="flex items-center justify-between gap-3">
//                         <p className="text-sm font-semibold text-slate-900">
//                           Feature #{idx + 1}
//                         </p>

//                         <button
//                           type="button"
//                           onClick={() => removeFeature(idx)}
//                           className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
//                         <div>
//                           <label className="block text-xs font-medium text-slate-600">
//                             Title
//                           </label>
//                           <input
//                             value={f.title}
//                             onChange={(e) =>
//                               updateFeature(idx, { title: e.target.value })
//                             }
//                             className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           />
//                         </div>

//                         <div className="md:col-span-2">
//                           <label className="block text-xs font-medium text-slate-600">
//                             Description
//                           </label>
//                           <input
//                             value={f.description}
//                             onChange={(e) =>
//                               updateFeature(idx, { description: e.target.value })
//                             }
//                             className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-slate-600">
//                             Icon
//                           </label>
//                           <select
//                             value={f.iconKey || 'FaUser'}
//                             onChange={(e) =>
//                               updateFeature(idx, { iconKey: e.target.value })
//                             }
//                             className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           >
//                             {ICON_OPTIONS.map((o) => (
//                               <option key={o.key} value={o.key}>
//                                 {o.label} ({o.key})
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Benefits editor */}
//               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                 <div className="flex items-center justify-between gap-4">
//                   <div>
//                     <h3 className="text-lg font-bold text-slate-900">
//                       Benefits (Bullet List)
//                     </h3>
//                     <p className="text-sm text-slate-500 mt-1">
//                       Shown in about section list.
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={addBenefit}
//                     className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Benefit
//                   </button>
//                 </div>

//                 <div className="mt-5 space-y-3">
//                   {(formData.benefits || []).map((b, idx) => (
//                     <div key={idx} className="flex gap-2 items-start">
//                       <input
//                         value={b}
//                         onChange={(e) => updateBenefit(idx, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                         placeholder="Benefit text..."
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeBenefit(idx)}
//                         className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
//                         title="Remove"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Steps editor */}
//               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                 <div className="flex items-center justify-between gap-4">
//                   <div>
//                     <h3 className="text-lg font-bold text-slate-900">
//                       Steps (How to Hire)
//                     </h3>
//                     <p className="text-sm text-slate-500 mt-1">
//                       4-step process section.
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={addStep}
//                     className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Step
//                   </button>
//                 </div>

//                 <div className="mt-5 space-y-4">
//                   {(formData.steps || []).map((s, idx) => (
//                     <div
//                       key={idx}
//                       className="border border-slate-200 rounded-xl p-4"
//                     >
//                       <div className="flex items-center justify-between gap-3">
//                         <p className="text-sm font-semibold text-slate-900">
//                           Step #{s.number}
//                         </p>

//                         <button
//                           type="button"
//                           onClick={() => removeStep(idx)}
//                           className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//                         <div>
//                           <label className="block text-xs font-medium text-slate-600">
//                             Icon path
//                           </label>
//                           <input
//                             value={s.icon}
//                             onChange={(e) =>
//                               updateStep(idx, { icon: e.target.value })
//                             }
//                             className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                             placeholder="/images/hire/h1.png"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-slate-600">
//                             Title
//                           </label>
//                           <input
//                             value={s.title}
//                             onChange={(e) =>
//                               updateStep(idx, { title: e.target.value })
//                             }
//                             className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           />
//                         </div>

//                         <div className="md:col-span-2">
//                           <label className="block text-xs font-medium text-slate-600">
//                             Description
//                           </label>
//                           <textarea
//                             value={s.description}
//                             onChange={(e) =>
//                               updateStep(idx, { description: e.target.value })
//                             }
//                             rows={3}
//                             className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* SEO */}
//           {activeTab === 'seo' && (
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   SEO Title
//                 </label>
//                 <input
//                   type="text"
//                   name="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={handleChange}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="Meta title for this page"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   SEO Description
//                 </label>
//                 <textarea
//                   name="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="Meta description for this page"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   SEO Image URL
//                 </label>
//                 <input
//                   type="text"
//                   name="seoImage"
//                   value={formData.seoImage}
//                   onChange={handleChange}
//                   className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                   placeholder="https://..."
//                 />
//               </div>
//             </div>
//           )}

//           {/* JSON Preview */}
//           {activeTab === 'json' && (
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Code className="w-4 h-4 text-slate-600" />
//                   <p className="text-sm font-semibold text-slate-900">
//                     contentJson preview
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => navigator.clipboard.writeText(contentJsonString)}
//                   className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 hover:bg-slate-50"
//                 >
//                   Copy JSON
//                 </button>
//               </div>

//               <pre className="p-4 text-xs bg-slate-950 text-slate-100 overflow-auto max-h-[520px]">
// {contentJsonString}
//               </pre>
//             </div>
//           )}

//           {/* Submit (bottom) */}
//           <div className="flex items-center justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => window.open(`/hire/${formData.slug}`, '_blank')}
//               className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//               disabled={!formData.slug}
//             >
//               <Eye className="w-4 h-4" />
//               Preview
//             </button>

//             <button
//               type="submit"
//               disabled={saving || !formData.title}
//               className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
//             >
//               <Save className="w-4 h-4" />
//               {saving ? 'Saving...' : 'Save Hire Page'}
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }









































'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  Image as ImageIcon,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Code,
  AlertTriangle,
} from 'lucide-react';

// -------- Icon keys (stored in DB) --------
const FEATURE_ICON_OPTIONS = [
  { key: 'FaUser', label: 'User' },
  { key: 'FaUsers', label: 'Users' },
  { key: 'FaRocket', label: 'Rocket' },
  { key: 'FaLightbulb', label: 'Lightbulb' },
  { key: 'FaComments', label: 'Comments' },
  { key: 'FaSearch', label: 'Search' },
];

const SERVICE_ICON_OPTIONS = [
  { key: 'BsTransparency', label: 'Transparency' },
  { key: 'BsFileEarmarkBarGraph', label: 'Report / Growth' },
  { key: 'GiBullseye', label: 'Bullseye' },
];

const MODEL_ICON_OPTIONS = [
  { key: 'CiClock1', label: 'Clock' },
  { key: 'TbCalendarClock', label: 'Calendar Clock' },
  { key: 'CiTimer', label: 'Timer' },
];

const STATUS_ICON_OPTIONS = [
  { key: 'FaCheckCircle', label: 'Positive' },
  { key: 'FaTimesCircle', label: 'Negative' },
  { key: 'FaExclamationTriangle', label: 'Warning' },
];

function genSlug(title) {
  return String(title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function safeJson(v) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return '{}';
  }
}

export default function NewHirePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [slugLocked, setSlugLocked] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Core
    title: '',
    slug: '',
    key: 'hire-front-end',
    excerpt: '',
    status: 'draft',

    // SEO
    seoTitle: '',
    seoDescription: '',
    seoImage: '',

    // Hero
    heroBg: '/images/hire/hire1.png',
    heroTitle: '',
    heroSubtitle: '',
    badgeText: 'Hire Page',
    metrics: {
      avgTime: '48 Hours',
      network: '100+ Experts',
      rating: '4.9/5',
    },

    // About
    aboutTitle: 'Front-End Developers by Softkingo',
    aboutSubtitle:
      'Softkingo has a pool of top Front-end developers who can deliver an extraordinary user experience.',

    // --- Dynamic blocks ---
    features: [
      {
        title: 'People Cohesion',
        description:
          'Creating a collaborative atmosphere where individuals work and align with goals.',
        iconKey: 'FaUser',
      },
      {
        title: 'Team Leadership',
        description:
          'Taking a visionary and quiet approach by consistently delivering.',
        iconKey: 'FaUsers',
      },
      {
        title: 'Team Build Up',
        description:
          'Building the capability of our clients to attain learning growth.',
        iconKey: 'FaRocket',
      },
    ],

    benefits: [
      'Experienced, skilled, & dedicated front end developers',
      'Reduce 60% of development cost',
      'Ensure project privacy with strict NDA signed documents',
      'Complete source code authorization & premium code quality',
    ],

    steps: [
      {
        number: 1,
        icon: '/images/hire/h1.png',
        title: 'Place a free request',
        description: 'Share a short form and shed all on ways to receive developers',
      },
      {
        number: 2,
        icon: '/images/hire/h2.png',
        title: 'Tell Us about your needs',
        description:
          'On a brief 30-min call, our team will listen and get chooses experts for you',
      },
      {
        number: 3,
        icon: '/images/hire/h3.png',
        title: 'Interview The Best',
        description: 'Meet 3-5 hand-picked talents within 48 hours. Select the ones you like',
      },
      {
        number: 4,
        icon: '/images/hire/h4.png',
        title: 'Onboard The chosen One',
        description: 'Begin your journey alongside with new team members, Onboard them',
      },
    ],

    // Services cards
    services: [
      {
        title: 'Transparent',
        iconKey: 'BsTransparency',
        description:
          'Set the rules for your journey by negotiating with us directly. Transparency with clients is our motto.',
        bg: 'from-sky-500 to-sky-600',
        textDark: false,
      },
      {
        title: 'Productive',
        iconKey: 'BsFileEarmarkBarGraph',
        description:
          'Enhance your team with distractions-spared developers and bring strong waves of productivity.',
        bg: 'from-emerald-500 to-emerald-600',
        textDark: false,
      },
      {
        title: 'To the point',
        iconKey: 'GiBullseye',
        description:
          'Find the perfect remote developers for the busy market. Just tailored services to your needs.',
        bg: 'from-slate-100 to-slate-200',
        textDark: true,
      },
    ],

    // Services Provided
    moreServices: [
      {
        title: 'Front-end web development',
        iconKey: 'FaLaptopCode',
        description:
          'Our front-end developers build fast, responsive interfaces with modern UI/UX.',
      },
      {
        title: 'Back-end development',
        iconKey: 'FaCogs',
        description:
          'Robust server-side solutions with scalable architecture and secure database handling.',
      },
      {
        title: 'Testing & debugging',
        iconKey: 'FaBug',
        description:
          'Comprehensive testing and debugging to ensure stable, bug-free applications.',
      },
    ],

    // Detailed profile
    profileSection: {
      enabled: true,
      title: 'Detailed profile for Confident Hiring Decisions',
      subtitle:
        'Each candidate profile includes comprehensive details to ensure you make the right choice.',
      profileFeatures: [
        'Professional Summary',
        'Major Projects',
        'Work History',
        'Intro Video',
        'Verified Profile',
      ],
      images: {
        leftTop: '/images/hire/h7.png',
        rightTop: '/images/hire/h6.png',
        rightBottom: '/images/hire/h5.png',
      },
    },

    // CTA banner
    ctaBanner: {
      enabled: true,
      title: 'Book A FREE Consultation With Us',
      subtitle:
        "Share your project idea and we'll provide a free consultation on how we can turn it into a reality and build an amazing digital product.",
      buttonText: 'Book a Free Demo',
      buttonHref: '#lead-form',
      image: '/images/consultant.png',
    },

    // Comparison section
    comparisonSection: {
      enabled: true,
      title: 'Why Softkingo is the better choice for Tech companies',
      columns: [
        { key: 'softkingo', label: 'Softkingo' },
        { key: 'recruiting', label: 'Recruiting Agencies' },
        { key: 'outsourcing', label: 'Outsourcing' },
      ],
      rows: [
        {
          category: 'Top Talents',
          softkingo: { iconKey: 'FaCheckCircle', text: 'Startup-experienced, vetted', highlight: true },
          recruiting: { iconKey: 'FaTimesCircle', text: 'No vetting' },
          outsourcing: { iconKey: 'FaExclamationTriangle', text: 'Generalist, mixed expertise' },
        },
        {
          category: 'Speed of Hiring',
          softkingo: { iconKey: 'FaCheckCircle', text: '48-hour hiring', highlight: true },
          recruiting: { iconKey: 'FaExclamationTriangle', text: 'Slow manual' },
          outsourcing: { iconKey: 'FaTimesCircle', text: 'Weeks/months' },
        },
      ],
    },

    // Models section
    modelsSection: {
      enabled: true,
      title: 'Our Flexible Working Model',
      subtitle: 'We make hiring dedicated developers easy with flexible models tailored to your needs.',
      models: [
        {
          title: 'Full-time',
          iconKey: 'CiClock1',
          description:
            'Hire dedicated developers to work exclusively on your project. Ideal for long-term needs.',
          features: ['8 hrs/day', 'Monthly billing', 'Team integration'],
          buttonText: 'Hire Now',
        },
        {
          title: 'Part-time',
          iconKey: 'TbCalendarClock',
          description:
            'Perfect when you need experts for a few hours a day. No long-term commitments.',
          features: ['4 hrs/day', 'Flexible slots', 'Reduced cost'],
          buttonText: 'Hire Now',
        },
        {
          title: 'Hourly',
          iconKey: 'CiTimer',
          description:
            'Hire top developers on-demand for tasks, urgent fixes, and quick deliveries.',
          features: ['Time-based', 'No contract', 'Budget-friendly'],
          buttonText: 'Hire Now',
        },
      ],
    },

    // Why hire section
    whyHireSection: {
      enabled: true,
      title: 'Why You Should Hire Dedicated Developers From Softkingo',
      items: [
        {
          title: 'Experienced & Skilled Resources',
          desc: 'Hire domain-expert developers with proven delivery records.',
        },
        {
          title: 'Cost effective & On-time Delivery',
          desc: 'Reduce costs without compromising quality, and deliver on time.',
        },
      ],
    },

    // Business types
    businessTypesSection: {
      enabled: true,
      title: 'Hire Front-end Developers Who Are Passionate to Turn Business Idea into A Reality',
      subtitle: 'Hire Futuristic Front-end Developers to Access Our Technical Proficiency.',
      items: [
        {
          title: 'Startups',
          description:
            'Fast-track MVP and product iterations with dedicated developers.',
          image: '/images/hire/h8.png',
        },
        {
          title: 'Mid-Size Businesses',
          description:
            'Scale features steadily with reliable engineering capacity.',
          image: '/images/hire/h9.png',
        },
        {
          title: 'Enterprise Level Businesses',
          description:
            'Handle complex programs and large-scale delivery with experienced teams.',
          image: '/images/hire/h10.png',
        },
      ],
    },

    // Pricing plans
    pricingSection: {
      enabled: true,
      title: 'Pricing Plans',
      subtitle: 'Our pricing plans, along with a free trial of 2 weeks',
      plans: [
        {
          title: 'Part-time Developer',
          subtitle:
            'Receive a few hours of assistance from our dedicated engineers to develop your tailored solution.',
          price: '80 hours',
          priceNote: 'month',
          featured: false,
          cardClass: 'bg-purple-500',
          features: [
            '4 Hours a Day, 5 Days a Week',
            'Billing cycle Weekly / Monthly',
            'Minimum 1 Month',
            'Available for You When Required',
          ],
          buttonText: 'Hire Part-time Developer',
        },
        {
          title: 'Full-time Developer',
          subtitle:
            'Harness the expertise of our dedicated engineers, who will dedicate themselves to your project.',
          price: '160 hours',
          priceNote: 'month',
          featured: true,
          cardClass: 'bg-emerald-500',
          features: [
            '8 Hours a Day, 5 Days a Week',
            'Billing cycle Weekly / Monthly',
            'Minimum 1 Month',
          ],
          buttonText: 'Hire Dedicated Developer',
        },
        {
          title: 'Hourly Developer',
          subtitle:
            'Engage dedicated engineers hourly for short tasks, maintenance, and urgent needs.',
          price: 'Custom Hours',
          priceNote: 'month',
          featured: false,
          cardClass: 'bg-teal-400',
          features: [
            'Billing cycle Weekly / Monthly',
            'Minimum 30 Hours',
            'Payment Based on Hours Worked',
          ],
          buttonText: 'Hire Hourly Developer',
        },
      ],
    },

    // Footer form toggle
    footerFormSection: {
      enabled: true,
    },
  });

  const tabs = [
    { id: 'basic', label: 'Basic' },
    { id: 'hero', label: 'Hero' },
    { id: 'content', label: 'Layout Text' },
    { id: 'blocks', label: 'Features/Steps' },

    { id: 'services', label: 'Services' },
    { id: 'profile', label: 'Profile' },
    { id: 'cta', label: 'CTA' },
    { id: 'comparison', label: 'Comparison' },

    { id: 'models', label: 'Models' },
    { id: 'why', label: 'Why Hire' },
    { id: 'business', label: 'Business Types' },
    { id: 'pricing', label: 'Pricing' },

    { id: 'seo', label: 'SEO' },
    { id: 'json', label: 'JSON Preview' },
  ];

  // ---- contentJson that will be stored in DB ----
  const contentJsonObject = useMemo(() => {
    return {
      heroBg: formData.heroBg,
      heroTitle: formData.heroTitle || formData.title,
      heroSubtitle: formData.heroSubtitle,
      badgeText: formData.badgeText,
      metrics: formData.metrics,

      aboutTitle: formData.aboutTitle,
      aboutSubtitle: formData.aboutSubtitle,

      features: formData.features,
      benefits: formData.benefits,
      steps: formData.steps,

      services: formData.services,
      moreServices: formData.moreServices,

      profileSection: formData.profileSection,
      ctaBanner: formData.ctaBanner,
      comparisonSection: formData.comparisonSection,

      modelsSection: formData.modelsSection,
      whyHireSection: formData.whyHireSection,
      businessTypesSection: formData.businessTypesSection,
      pricingSection: formData.pricingSection,

      footerFormSection: formData.footerFormSection,
    };
  }, [formData]);

  const contentJsonString = useMemo(() => safeJson(contentJsonObject), [contentJsonObject]);

  const setField = (name, value) => setFormData((p) => ({ ...p, [name]: value }));

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const nextSlug = genSlug(title);

    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugLocked ? prev.slug : nextSlug,
      heroTitle: prev.heroTitle ? prev.heroTitle : title,
      seoTitle: prev.seoTitle ? prev.seoTitle : title,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const handleMetricsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [field]: value },
    }));
  };

  // ---------- generic helpers ----------
  const toggleNested = (path, enabled) => {
    // path like: "profileSection.enabled"
    setFormData((prev) => {
      const copy = structuredClone(prev);
      const [root, key] = path.split('.');
      copy[root] = copy[root] || {};
      copy[root][key] = enabled;
      return copy;
    });
  };

  // ---------- Features CRUD ----------
  const addFeature = () => {
    setFormData((p) => ({
      ...p,
      features: [...(p.features || []), { title: '', description: '', iconKey: 'FaUser' }],
    }));
  };
  const updateFeature = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      features: (p.features || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
    }));
  };
  const removeFeature = (idx) => {
    setFormData((p) => ({ ...p, features: (p.features || []).filter((_, i) => i !== idx) }));
  };

  // ---------- Benefits CRUD ----------
  const addBenefit = () => setFormData((p) => ({ ...p, benefits: [...(p.benefits || []), ''] }));
  const updateBenefit = (idx, value) => {
    setFormData((p) => ({
      ...p,
      benefits: (p.benefits || []).map((x, i) => (i === idx ? value : x)),
    }));
  };
  const removeBenefit = (idx) => {
    setFormData((p) => ({ ...p, benefits: (p.benefits || []).filter((_, i) => i !== idx) }));
  };

  // ---------- Steps CRUD ----------
  const addStep = () => {
    setFormData((p) => ({
      ...p,
      steps: [
        ...(p.steps || []),
        { number: (p.steps?.length || 0) + 1, icon: '/images/hire/h1.png', title: '', description: '' },
      ],
    }));
  };
  const updateStep = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      steps: (p.steps || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
    }));
  };
  const removeStep = (idx) => {
    setFormData((p) => {
      const next = (p.steps || []).filter((_, i) => i !== idx);
      const renum = next.map((s, i) => ({ ...s, number: i + 1 }));
      return { ...p, steps: renum };
    });
  };

  // ---------- Services cards CRUD ----------
  const addServiceCard = () => {
    setFormData((p) => ({
      ...p,
      services: [
        ...(p.services || []),
        { title: '', iconKey: 'BsTransparency', description: '', bg: 'from-sky-500 to-sky-600', textDark: false },
      ],
    }));
  };
  const updateServiceCard = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      services: (p.services || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
    }));
  };
  const removeServiceCard = (idx) => {
    setFormData((p) => ({ ...p, services: (p.services || []).filter((_, i) => i !== idx) }));
  };

  // ---------- Services Provided CRUD ----------
  const addMoreService = () => {
    setFormData((p) => ({
      ...p,
      moreServices: [...(p.moreServices || []), { title: '', iconKey: 'FaCogs', description: '' }],
    }));
  };
  const updateMoreService = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      moreServices: (p.moreServices || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
    }));
  };
  const removeMoreService = (idx) => {
    setFormData((p) => ({ ...p, moreServices: (p.moreServices || []).filter((_, i) => i !== idx) }));
  };

  // ---------- Profile features CRUD ----------
  const addProfileFeature = () => {
    setFormData((p) => ({
      ...p,
      profileSection: {
        ...p.profileSection,
        profileFeatures: [...(p.profileSection?.profileFeatures || []), ''],
      },
    }));
  };
  const updateProfileFeature = (idx, value) => {
    setFormData((p) => ({
      ...p,
      profileSection: {
        ...p.profileSection,
        profileFeatures: (p.profileSection?.profileFeatures || []).map((x, i) => (i === idx ? value : x)),
      },
    }));
  };
  const removeProfileFeature = (idx) => {
    setFormData((p) => ({
      ...p,
      profileSection: {
        ...p.profileSection,
        profileFeatures: (p.profileSection?.profileFeatures || []).filter((_, i) => i !== idx),
      },
    }));
  };

  // ---------- Comparison rows CRUD ----------
  const addComparisonRow = () => {
    setFormData((p) => ({
      ...p,
      comparisonSection: {
        ...p.comparisonSection,
        rows: [
          ...(p.comparisonSection?.rows || []),
          {
            category: '',
            softkingo: { iconKey: 'FaCheckCircle', text: '', highlight: true },
            recruiting: { iconKey: 'FaTimesCircle', text: '' },
            outsourcing: { iconKey: 'FaExclamationTriangle', text: '' },
          },
        ],
      },
    }));
  };
  const updateComparisonRow = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      comparisonSection: {
        ...p.comparisonSection,
        rows: (p.comparisonSection?.rows || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
      },
    }));
  };
  const updateComparisonCell = (rowIdx, colKey, patch) => {
    setFormData((p) => ({
      ...p,
      comparisonSection: {
        ...p.comparisonSection,
        rows: (p.comparisonSection?.rows || []).map((r, i) => {
          if (i !== rowIdx) return r;
          return { ...r, [colKey]: { ...(r[colKey] || {}), ...patch } };
        }),
      },
    }));
  };
  const removeComparisonRow = (idx) => {
    setFormData((p) => ({
      ...p,
      comparisonSection: {
        ...p.comparisonSection,
        rows: (p.comparisonSection?.rows || []).filter((_, i) => i !== idx),
      },
    }));
  };

  // ---------- Models CRUD ----------
  const addModel = () => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: [
          ...(p.modelsSection?.models || []),
          { title: '', iconKey: 'CiClock1', description: '', features: [], buttonText: 'Hire Now' },
        ],
      },
    }));
  };
  const updateModel = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: (p.modelsSection?.models || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
      },
    }));
  };
  const removeModel = (idx) => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: (p.modelsSection?.models || []).filter((_, i) => i !== idx),
      },
    }));
  };
  const addModelFeature = (modelIdx) => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: (p.modelsSection?.models || []).map((m, i) =>
          i === modelIdx ? { ...m, features: [...(m.features || []), ''] } : m,
        ),
      },
    }));
  };
  const updateModelFeature = (modelIdx, featIdx, value) => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: (p.modelsSection?.models || []).map((m, i) => {
          if (i !== modelIdx) return m;
          return { ...m, features: (m.features || []).map((f, j) => (j === featIdx ? value : f)) };
        }),
      },
    }));
  };
  const removeModelFeature = (modelIdx, featIdx) => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: (p.modelsSection?.models || []).map((m, i) => {
          if (i !== modelIdx) return m;
          return { ...m, features: (m.features || []).filter((_, j) => j !== featIdx) };
        }),
      },
    }));
  };

  // ---------- Why hire CRUD ----------
  const addWhyHireItem = () => {
    setFormData((p) => ({
      ...p,
      whyHireSection: {
        ...p.whyHireSection,
        items: [...(p.whyHireSection?.items || []), { title: '', desc: '' }],
      },
    }));
  };
  const updateWhyHireItem = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      whyHireSection: {
        ...p.whyHireSection,
        items: (p.whyHireSection?.items || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
      },
    }));
  };
  const removeWhyHireItem = (idx) => {
    setFormData((p) => ({
      ...p,
      whyHireSection: {
        ...p.whyHireSection,
        items: (p.whyHireSection?.items || []).filter((_, i) => i !== idx),
      },
    }));
  };

  // ---------- Business types CRUD ----------
  const addBusinessType = () => {
    setFormData((p) => ({
      ...p,
      businessTypesSection: {
        ...p.businessTypesSection,
        items: [...(p.businessTypesSection?.items || []), { title: '', description: '', image: '' }],
      },
    }));
  };
  const updateBusinessType = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      businessTypesSection: {
        ...p.businessTypesSection,
        items: (p.businessTypesSection?.items || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
      },
    }));
  };
  const removeBusinessType = (idx) => {
    setFormData((p) => ({
      ...p,
      businessTypesSection: {
        ...p.businessTypesSection,
        items: (p.businessTypesSection?.items || []).filter((_, i) => i !== idx),
      },
    }));
  };

  // ---------- Pricing CRUD ----------
  const addPricingPlan = () => {
    setFormData((p) => ({
      ...p,
      pricingSection: {
        ...p.pricingSection,
        plans: [
          ...(p.pricingSection?.plans || []),
          {
            title: '',
            subtitle: '',
            price: '',
            priceNote: '',
            featured: false,
            cardClass: 'bg-slate-900',
            features: [],
            buttonText: 'Hire Now',
          },
        ],
      },
    }));
  };
  const updatePricingPlan = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      pricingSection: {
        ...p.pricingSection,
        plans: (p.pricingSection?.plans || []).map((x, i) => (i === idx ? { ...x, ...patch } : x)),
      },
    }));
  };
  const removePricingPlan = (idx) => {
    setFormData((p) => ({
      ...p,
      pricingSection: {
        ...p.pricingSection,
        plans: (p.pricingSection?.plans || []).filter((_, i) => i !== idx),
      },
    }));
  };
  const addPricingFeature = (planIdx) => {
    setFormData((p) => ({
      ...p,
      pricingSection: {
        ...p.pricingSection,
        plans: (p.pricingSection?.plans || []).map((pl, i) =>
          i === planIdx ? { ...pl, features: [...(pl.features || []), ''] } : pl,
        ),
      },
    }));
  };
  const updatePricingFeature = (planIdx, featIdx, value) => {
    setFormData((p) => ({
      ...p,
      pricingSection: {
        ...p.pricingSection,
        plans: (p.pricingSection?.plans || []).map((pl, i) => {
          if (i !== planIdx) return pl;
          return { ...pl, features: (pl.features || []).map((f, j) => (j === featIdx ? value : f)) };
        }),
      },
    }));
  };
  const removePricingFeature = (planIdx, featIdx) => {
    setFormData((p) => ({
      ...p,
      pricingSection: {
        ...p.pricingSection,
        plans: (p.pricingSection?.plans || []).map((pl, i) => {
          if (i !== planIdx) return pl;
          return { ...pl, features: (pl.features || []).filter((_, j) => j !== featIdx) };
        }),
      },
    }));
  };

  const validate = () => {
    if (!formData.title?.trim()) return 'Title is required.';
    if (!formData.slug?.trim()) return 'Slug is required.';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      return 'Slug must be lowercase and hyphen-separated (no spaces).';
    }
    if (!formData.key?.trim()) return 'Key is required.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        key: formData.key || 'hire',
        excerpt: formData.excerpt,
        status: formData.status,
        type: 'hire',
        featured: false,
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt,
        seoImage: formData.seoImage || null,
        contentJson: contentJsonString,
      };

      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/hire');
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data?.error || 'Failed to save hire page.');
    } catch (err) {
      console.error('Save error:', err);
      setError('Error saving hire page.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/hire"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Create New Hire Page
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Full hire page builder (all sections dynamic).
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.open(`/hire/${formData.slug}`, '_blank')}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                disabled={!formData.slug}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving || !formData.title}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Hire Page'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-slate-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-cyan-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-900">Could not save</p>
              <p className="text-sm text-rose-800 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g. Hire Front-End Developers in India"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Slug</label>
                  <div className="mt-1 flex items-stretch gap-2">
                    <div className="flex flex-1 rounded-lg shadow-sm overflow-hidden">
                      <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 bg-slate-50 text-sm text-slate-500">
                        /hire/
                      </span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setField('slug', e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 border border-slate-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="hire-front-end-developers"
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSlugLocked((v) => !v)}
                      className={`px-3 rounded-lg border text-sm flex items-center gap-2 ${
                        slugLocked
                          ? 'border-sky-300 bg-sky-50 text-sky-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                      title={slugLocked ? 'Unlock slug' : 'Lock slug'}
                    >
                      {slugLocked ? (
                        <>
                          <Lock className="w-4 h-4" /> Locked
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" /> Auto
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    Keep it lowercase, hyphen-separated.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Key (identifier)</label>
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Short Description / Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex items-end">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!formData.footerFormSection?.enabled}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          footerFormSection: { ...(p.footerFormSection || {}), enabled: e.target.checked },
                        }))
                      }
                    />
                    Enable footer form section
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* HERO */}
          {activeTab === 'hero' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Hero Title</label>
                    <input
                      type="text"
                      name="heroTitle"
                      value={formData.heroTitle}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Defaults to Title if empty"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Hero Subtitle</label>
                    <textarea
                      name="heroSubtitle"
                      value={formData.heroSubtitle}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Badge Text</label>
                    <input
                      type="text"
                      name="badgeText"
                      value={formData.badgeText}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Avg Hiring Time</label>
                      <input
                        type="text"
                        value={formData.metrics.avgTime}
                        onChange={(e) => handleMetricsChange('avgTime', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Developers Network</label>
                      <input
                        type="text"
                        value={formData.metrics.network}
                        onChange={(e) => handleMetricsChange('network', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Rating</label>
                      <input
                        type="text"
                        value={formData.metrics.rating}
                        onChange={(e) => handleMetricsChange('rating', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Hero Background Image
                  </label>
                  <div className="relative border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {formData.heroBg || 'No image selected'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Use static path (e.g. /images/hire/hire1.png)
                        </p>
                      </div>
                    </div>

                    <input
                      type="text"
                      name="heroBg"
                      value={formData.heroBg}
                      onChange={handleChange}
                      className="mt-3 w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === 'content' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">About Section Title</label>
                <input
                  type="text"
                  name="aboutTitle"
                  value={formData.aboutTitle}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">About Subtitle</label>
                <textarea
                  name="aboutSubtitle"
                  value={formData.aboutSubtitle}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* BLOCKS */}
          {activeTab === 'blocks' && (
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Features (Top Cards)</h3>
                    <p className="text-sm text-slate-500 mt-1">Shown under hero.</p>
                  </div>

                  <button
                    type="button"
                    onClick={addFeature}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {(formData.features || []).map((f, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">Feature #{idx + 1}</p>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600">Title</label>
                          <input
                            value={f.title}
                            onChange={(e) => updateFeature(idx, { title: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">Description</label>
                          <input
                            value={f.description}
                            onChange={(e) => updateFeature(idx, { description: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">Icon</label>
                          <select
                            value={f.iconKey || 'FaUser'}
                            onChange={(e) => updateFeature(idx, { iconKey: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan-500"
                          >
                            {FEATURE_ICON_OPTIONS.map((o) => (
                              <option key={o.key} value={o.key}>
                                {o.label} ({o.key})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Benefits</h3>
                    <p className="text-sm text-slate-500 mt-1">Shown in about list.</p>
                  </div>

                  <button
                    type="button"
                    onClick={addBenefit}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add Benefit
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {(formData.benefits || []).map((b, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <input
                        value={b}
                        onChange={(e) => updateBenefit(idx, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Steps</h3>
                    <p className="text-sm text-slate-500 mt-1">How to hire section.</p>
                  </div>

                  <button
                    type="button"
                    onClick={addStep}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add Step
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {(formData.steps || []).map((s, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">Step #{s.number}</p>
                        <button
                          type="button"
                          onClick={() => removeStep(idx)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600">Icon path</label>
                          <input
                            value={s.icon}
                            onChange={(e) => updateStep(idx, { icon: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">Title</label>
                          <input
                            value={s.title}
                            onChange={(e) => updateStep(idx, { title: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">Description</label>
                          <textarea
                            value={s.description}
                            onChange={(e) => updateStep(idx, { description: e.target.value })}
                            rows={3}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SERVICES (cards + provided list) */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Service cards */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Service Cards</h3>
                    <p className="text-sm text-slate-500 mt-1">Developers as a service section.</p>
                  </div>

                  <button
                    type="button"
                    onClick={addServiceCard}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add Card
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {(formData.services || []).map((s, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Card #{idx + 1}</p>
                        <button
                          type="button"
                          onClick={() => removeServiceCard(idx)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600">Title</label>
                          <input
                            value={s.title}
                            onChange={(e) => updateServiceCard(idx, { title: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">Icon</label>
                          <select
                            value={s.iconKey || 'BsTransparency'}
                            onChange={(e) => updateServiceCard(idx, { iconKey: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan-500"
                          >
                            {SERVICE_ICON_OPTIONS.map((o) => (
                              <option key={o.key} value={o.key}>
                                {o.label} ({o.key})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">Gradient</label>
                          <input
                            value={s.bg}
                            onChange={(e) => updateServiceCard(idx, { bg: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            placeholder="from-sky-500 to-sky-600"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">Description</label>
                          <input
                            value={s.description}
                            onChange={(e) => updateServiceCard(idx, { description: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-1">
                          <input
                            type="checkbox"
                            checked={!!s.textDark}
                            onChange={(e) => updateServiceCard(idx, { textDark: e.target.checked })}
                          />
                          Use dark text
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services provided */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Services Provided</h3>
                    <p className="text-sm text-slate-500 mt-1">List + detail cards section.</p>
                  </div>

                  <button
                    type="button"
                    onClick={addMoreService}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {(formData.moreServices || []).map((s, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Item #{idx + 1}</p>
                        <button
                          type="button"
                          onClick={() => removeMoreService(idx)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600">Title</label>
                          <input
                            value={s.title}
                            onChange={(e) => updateMoreService(idx, { title: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">
                            Icon Key (react-icons)
                          </label>
                          <input
                            value={s.iconKey || ''}
                            onChange={(e) => updateMoreService(idx, { iconKey: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            placeholder="e.g. FaCogs, FaLaptopCode, FaBug"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Public page can map these keys to real icons (no emojis).
                          </p>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">Description</label>
                          <textarea
                            value={s.description}
                            onChange={(e) => updateMoreService(idx, { description: e.target.value })}
                            rows={3}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.profileSection?.enabled}
                  onChange={(e) => toggleNested('profileSection.enabled', e.target.checked)}
                />
                Enable profile section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    value={formData.profileSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: { ...p.profileSection, title: e.target.value },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                  <input
                    value={formData.profileSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: { ...p.profileSection, subtitle: e.target.value },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Left image</label>
                  <input
                    value={formData.profileSection?.images?.leftTop || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: {
                          ...p.profileSection,
                          images: { ...(p.profileSection?.images || {}), leftTop: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Right top</label>
                  <input
                    value={formData.profileSection?.images?.rightTop || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: {
                          ...p.profileSection,
                          images: { ...(p.profileSection?.images || {}), rightTop: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Right bottom</label>
                  <input
                    value={formData.profileSection?.images?.rightBottom || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: {
                          ...p.profileSection,
                          images: { ...(p.profileSection?.images || {}), rightBottom: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Profile Features</p>
                  <button
                    type="button"
                    onClick={addProfileFeature}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                <div className="mt-3 space-y-3">
                  {(formData.profileSection?.profileFeatures || []).map((f, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        value={f}
                        onChange={(e) => updateProfileFeature(idx, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeProfileFeature(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* CTA */}
          {activeTab === 'cta' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.ctaBanner?.enabled}
                  onChange={(e) => toggleNested('ctaBanner.enabled', e.target.checked)}
                />
                Enable CTA banner
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    value={formData.ctaBanner?.title || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, ctaBanner: { ...p.ctaBanner, title: e.target.value } }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Button Text</label>
                  <input
                    value={formData.ctaBanner?.buttonText || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, ctaBanner: { ...p.ctaBanner, buttonText: e.target.value } }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Button Href</label>
                  <input
                    value={formData.ctaBanner?.buttonHref || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, ctaBanner: { ...p.ctaBanner, buttonHref: e.target.value } }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Image</label>
                  <input
                    value={formData.ctaBanner?.image || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, ctaBanner: { ...p.ctaBanner, image: e.target.value } }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                  <textarea
                    value={formData.ctaBanner?.subtitle || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, ctaBanner: { ...p.ctaBanner, subtitle: e.target.value } }))}
                    rows={4}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.comparisonSection?.enabled}
                  onChange={(e) => toggleNested('comparisonSection.enabled', e.target.checked)}
                />
                Enable comparison section
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={formData.comparisonSection?.title || ''}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      comparisonSection: { ...p.comparisonSection, title: e.target.value },
                    }))
                  }
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-semibold text-slate-900">Rows</p>
                <button
                  type="button"
                  onClick={addComparisonRow}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Row
                </button>
              </div>

              <div className="space-y-4">
                {(formData.comparisonSection?.rows || []).map((row, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Row #{idx + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeComparisonRow(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium text-slate-600">Category</label>
                      <input
                        value={row.category || ''}
                        onChange={(e) => updateComparisonRow(idx, { category: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {(['softkingo', 'recruiting', 'outsourcing']).map((col) => (
                        <div key={col} className="border border-slate-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-slate-800 capitalize">{col}</p>

                          <label className="block text-xs font-medium text-slate-600 mt-2">Icon</label>
                          <select
                            value={row[col]?.iconKey || 'FaCheckCircle'}
                            onChange={(e) => updateComparisonCell(idx, col, { iconKey: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan-500"
                          >
                            {STATUS_ICON_OPTIONS.map((o) => (
                              <option key={o.key} value={o.key}>
                                {o.label} ({o.key})
                              </option>
                            ))}
                          </select>

                          <label className="block text-xs font-medium text-slate-600 mt-2">Text</label>
                          <input
                            value={row[col]?.text || ''}
                            onChange={(e) => updateComparisonCell(idx, col, { text: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />

                          {col === 'softkingo' && (
                            <label className="flex items-center gap-2 text-sm text-slate-700 mt-2">
                              <input
                                type="checkbox"
                                checked={!!row.softkingo?.highlight}
                                onChange={(e) => updateComparisonCell(idx, 'softkingo', { highlight: e.target.checked })}
                              />
                              Highlight cell
                            </label>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* MODELS */}
          {activeTab === 'models' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.modelsSection?.enabled}
                  onChange={(e) => toggleNested('modelsSection.enabled', e.target.checked)}
                />
                Enable models section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    value={formData.modelsSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, modelsSection: { ...p.modelsSection, title: e.target.value } }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                  <input
                    value={formData.modelsSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, modelsSection: { ...p.modelsSection, subtitle: e.target.value } }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-semibold text-slate-900">Models</p>
                <button
                  type="button"
                  onClick={addModel}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Model
                </button>
              </div>

              <div className="space-y-4">
                {(formData.modelsSection?.models || []).map((m, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Model #{idx + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeModel(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Title</label>
                        <input
                          value={m.title || ''}
                          onChange={(e) => updateModel(idx, { title: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">Icon</label>
                        <select
                          value={m.iconKey || 'CiClock1'}
                          onChange={(e) => updateModel(idx, { iconKey: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan-500"
                        >
                          {MODEL_ICON_OPTIONS.map((o) => (
                            <option key={o.key} value={o.key}>
                              {o.label} ({o.key})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">Button Text</label>
                        <input
                          value={m.buttonText || ''}
                          onChange={(e) => updateModel(idx, { buttonText: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600">Description</label>
                        <textarea
                          value={m.description || ''}
                          onChange={(e) => updateModel(idx, { description: e.target.value })}
                          rows={3}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Features</p>
                        <button
                          type="button"
                          onClick={() => addModelFeature(idx)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>

                      <div className="mt-3 space-y-3">
                        {(m.features || []).map((f, fi) => (
                          <div key={fi} className="flex gap-2">
                            <input
                              value={f}
                              onChange={(e) => updateModelFeature(idx, fi, e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeModelFeature(idx, fi)}
                              className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WHY HIRE */}
          {activeTab === 'why' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.whyHireSection?.enabled}
                  onChange={(e) => toggleNested('whyHireSection.enabled', e.target.checked)}
                />
                Enable why hire section
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={formData.whyHireSection?.title || ''}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, whyHireSection: { ...p.whyHireSection, title: e.target.value } }))
                  }
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-semibold text-slate-900">Items</p>
                <button
                  type="button"
                  onClick={addWhyHireItem}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {(formData.whyHireSection?.items || []).map((it, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Item #{idx + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeWhyHireItem(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Title</label>
                        <input
                          value={it.title || ''}
                          onChange={(e) => updateWhyHireItem(idx, { title: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Description</label>
                        <input
                          value={it.desc || ''}
                          onChange={(e) => updateWhyHireItem(idx, { desc: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUSINESS TYPES */}
          {activeTab === 'business' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.businessTypesSection?.enabled}
                  onChange={(e) => toggleNested('businessTypesSection.enabled', e.target.checked)}
                />
                Enable business types section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    value={formData.businessTypesSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        businessTypesSection: { ...p.businessTypesSection, title: e.target.value },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                  <input
                    value={formData.businessTypesSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        businessTypesSection: { ...p.businessTypesSection, subtitle: e.target.value },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-semibold text-slate-900">Cards</p>
                <button
                  type="button"
                  onClick={addBusinessType}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
              </div>

              <div className="space-y-4">
                {(formData.businessTypesSection?.items || []).map((it, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Card #{idx + 1}</p>
                      <button
                        type="button"
                        onClick={() => removeBusinessType(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Title</label>
                        <input
                          value={it.title || ''}
                          onChange={(e) => updateBusinessType(idx, { title: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Image</label>
                        <input
                          value={it.image || ''}
                          onChange={(e) => updateBusinessType(idx, { image: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600">Description</label>
                        <textarea
                          value={it.description || ''}
                          onChange={(e) => updateBusinessType(idx, { description: e.target.value })}
                          rows={3}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRICING */}
          {activeTab === 'pricing' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={!!formData.pricingSection?.enabled}
                  onChange={(e) => toggleNested('pricingSection.enabled', e.target.checked)}
                />
                Enable pricing section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    value={formData.pricingSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, pricingSection: { ...p.pricingSection, title: e.target.value } }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                  <input
                    value={formData.pricingSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, pricingSection: { ...p.pricingSection, subtitle: e.target.value } }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-semibold text-slate-900">Plans</p>
                <button
                  type="button"
                  onClick={addPricingPlan}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Plan
                </button>
              </div>

              <div className="space-y-4">
                {(formData.pricingSection?.plans || []).map((pl, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Plan #{idx + 1}</p>
                      <button
                        type="button"
                        onClick={() => removePricingPlan(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Title</label>
                        <input
                          value={pl.title || ''}
                          onChange={(e) => updatePricingPlan(idx, { title: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Price</label>
                        <input
                          value={pl.price || ''}
                          onChange={(e) => updatePricingPlan(idx, { price: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          placeholder="160 hours"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Price Note</label>
                        <input
                          value={pl.priceNote || ''}
                          onChange={(e) => updatePricingPlan(idx, { priceNote: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          placeholder="month"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600">Subtitle</label>
                        <textarea
                          value={pl.subtitle || ''}
                          onChange={(e) => updatePricingPlan(idx, { subtitle: e.target.value })}
                          rows={3}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">Card Class</label>
                        <input
                          value={pl.cardClass || ''}
                          onChange={(e) => updatePricingPlan(idx, { cardClass: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          placeholder="bg-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">Button</label>
                        <input
                          value={pl.buttonText || ''}
                          onChange={(e) => updatePricingPlan(idx, { buttonText: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-1">
                        <input
                          type="checkbox"
                          checked={!!pl.featured}
                          onChange={(e) => updatePricingPlan(idx, { featured: e.target.checked })}
                        />
                        Featured
                      </label>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Plan Features</p>
                        <button
                          type="button"
                          onClick={() => addPricingFeature(idx)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>

                      <div className="mt-3 space-y-3">
                        {(pl.features || []).map((f, fi) => (
                          <div key={fi} className="flex gap-2">
                            <input
                              value={f}
                              onChange={(e) => updatePricingFeature(idx, fi, e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                              type="button"
                              onClick={() => removePricingFeature(idx, fi)}
                              className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">SEO Image URL</label>
                <input
                  type="text"
                  name="seoImage"
                  value={formData.seoImage}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* JSON */}
          {activeTab === 'json' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-slate-600" />
                  <p className="text-sm font-semibold text-slate-900">contentJson preview</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(contentJsonString)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 hover:bg-slate-50"
                >
                  Copy JSON
                </button>
              </div>

              <pre className="p-4 text-xs bg-slate-950 text-slate-100 overflow-auto max-h-[520px]">
{contentJsonString}
              </pre>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => window.open(`/hire/${formData.slug}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={!formData.slug}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              type="submit"
              disabled={saving || !formData.title}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Hire Page'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
