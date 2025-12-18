// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Mail, 
//   Send, 
//   Users, 
//   TrendingUp,
//   Eye,
//   MousePointer,
//   Plus,
//   Search,
//   Filter,
//   Calendar,
//   FileText,
//   Download,
//   BarChart3,
//   Edit,
//   Trash2,
//   Copy,
//   Clock,
//   CheckCircle2,
//   XCircle
// } from 'lucide-react';

// export default function EmailCampaignsPage() {
//   const [activeTab, setActiveTab] = useState('campaigns');
//   const [campaigns, setCampaigns] = useState([]);
//   const [lists, setLists] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showNewCampaign, setShowNewCampaign] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, [activeTab]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === 'campaigns') {
//         const res = await fetch('/api/admin/email-campaigns');
//         const data = await res.json();
//         setCampaigns(data.campaigns || []);
//       } else if (activeTab === 'lists') {
//         const res = await fetch('/api/admin/newsletters');
//         const data = await res.json();
//         setLists(data.lists || []);
//       } else if (activeTab === 'templates') {
//         const res = await fetch('/api/admin/email-campaigns/templates');
//         const data = await res.json();
//         setTemplates(data.templates || []);
//       }
//     } catch (error) {
//       console.error('Load error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
//                 <Mail className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-slate-900">Email Campaigns</h1>
//                 <p className="text-sm text-slate-500">Create and manage email marketing</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowNewCampaign(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
//             >
//               <Plus className="w-4 h-4" />
//               New Campaign
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-1 mt-4 border-b border-slate-200">
//             {[
//               { id: 'campaigns', label: 'Campaigns', icon: Send, count: 12 },
//               { id: 'lists', label: 'Email Lists', icon: Users, count: 5 },
//               { id: 'templates', label: 'Templates', icon: FileText, count: 8 },
//               { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
//                   activeTab === tab.id
//                     ? 'text-blue-600'
//                     : 'text-slate-600 hover:text-slate-900'
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4" />
//                 {tab.label}
//                 {tab.count > 0 && (
//                   <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
//                     {tab.count}
//                   </span>
//                 )}
//                 {activeTab === tab.id && (
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
//         {activeTab === 'campaigns' && <CampaignsTab campaigns={campaigns} loading={loading} onRefresh={loadData} />}
//         {activeTab === 'lists' && <EmailListsTab lists={lists} loading={loading} />}
//         {activeTab === 'templates' && <TemplatesTab templates={templates} loading={loading} />}
//         {activeTab === 'analytics' && <AnalyticsTab loading={loading} />}
//       </main>

//       {/* New Campaign Modal */}
//       {showNewCampaign && (
//         <NewCampaignModal onClose={() => setShowNewCampaign(false)} onSuccess={loadData} />
//       )}
//     </div>
//   );
// }

// // Campaigns Tab
// function CampaignsTab({ campaigns, loading, onRefresh }) {
//   const [filter, setFilter] = useState('all');

//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   const stats = [
//     { label: 'Total Campaigns', value: '24', icon: Send, color: 'blue', trend: '+12%' },
//     { label: 'Total Sent', value: '45.2K', icon: Mail, color: 'emerald', trend: '+8%' },
//     { label: 'Avg Open Rate', value: '24.5%', icon: Eye, color: 'purple', trend: '+3%' },
//     { label: 'Avg Click Rate', value: '3.2%', icon: MousePointer, color: 'orange', trend: '+1%' },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat) => (
//           <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//               <span className="text-sm font-semibold text-emerald-600">{stat.trend}</span>
//             </div>
//             <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
//             <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex items-center justify-between">
//         <div className="flex gap-2">
//           {['all', 'draft', 'scheduled', 'sent', 'active'].map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 filter === status
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
//               }`}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search campaigns..."
//               className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
//             <Filter className="w-4 h-4 text-slate-600" />
//           </button>
//         </div>
//       </div>

//       {/* Campaigns List */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Campaign</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Recipients</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Open Rate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Click Rate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Scheduled</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {[
//                 { name: 'New Year Sale 2025', status: 'sent', recipients: 2500, opens: 24.5, clicks: 3.2, date: 'Dec 31, 2024' },
//                 { name: 'Product Launch Newsletter', status: 'scheduled', recipients: 3200, opens: 0, clicks: 0, date: 'Jan 5, 2025' },
//                 { name: 'Weekly Digest #42', status: 'draft', recipients: 1800, opens: 0, clicks: 0, date: 'Not set' },
//                 { name: 'Holiday Special Offer', status: 'sent', recipients: 4100, opens: 28.3, clicks: 4.5, date: 'Dec 25, 2024' },
//               ].map((campaign, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <Mail className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-slate-900">{campaign.name}</p>
//                         <p className="text-sm text-slate-500">Email Campaign</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
//                       campaign.status === 'sent' 
//                         ? 'bg-emerald-100 text-emerald-700'
//                         : campaign.status === 'scheduled'
//                         ? 'bg-blue-100 text-blue-700'
//                         : 'bg-slate-100 text-slate-700'
//                     }`}>
//                       {campaign.status === 'sent' && <CheckCircle2 className="w-3 h-3" />}
//                       {campaign.status === 'scheduled' && <Clock className="w-3 h-3" />}
//                       {campaign.status === 'draft' && <FileText className="w-3 h-3" />}
//                       {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-slate-600">
//                     {campaign.recipients.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4">
//                     {campaign.opens > 0 ? (
//                       <div className="flex items-center gap-2">
//                         <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[60px]">
//                           <div 
//                             className="bg-blue-600 rounded-full h-2" 
//                             style={{ width: `${campaign.opens}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-medium text-slate-900">{campaign.opens}%</span>
//                       </div>
//                     ) : (
//                       <span className="text-sm text-slate-400">—</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     {campaign.clicks > 0 ? (
//                       <div className="flex items-center gap-2">
//                         <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[60px]">
//                           <div 
//                             className="bg-orange-600 rounded-full h-2" 
//                             style={{ width: `${campaign.clicks * 10}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-medium text-slate-900">{campaign.clicks}%</span>
//                       </div>
//                     ) : (
//                       <span className="text-sm text-slate-400">—</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-slate-600">{campaign.date}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-1">
//                       <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="View">
//                         <Eye className="w-4 h-4 text-slate-600" />
//                       </button>
//                       <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
//                         <Edit className="w-4 h-4 text-slate-600" />
//                       </button>
//                       <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Duplicate">
//                         <Copy className="w-4 h-4 text-slate-600" />
//                       </button>
//                       <button className="p-2 hover:bg-rose-100 rounded-lg transition-colors" title="Delete">
//                         <Trash2 className="w-4 h-4 text-rose-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Email Lists Tab
// function EmailListsTab({ lists, loading }) {
//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold text-slate-900">Email Lists</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
//           <Plus className="w-4 h-4" />
//           New List
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[
//           { name: 'Newsletter Subscribers', count: 2500, active: 2450, growth: '+12%' },
//           { name: 'Product Updates', count: 1800, active: 1750, growth: '+8%' },
//           { name: 'VIP Customers', count: 450, active: 445, growth: '+5%' },
//           { name: 'Trial Users', count: 680, active: 520, growth: '+15%' },
//         ].map((list, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//               <span className="text-sm font-semibold text-emerald-600">{list.growth}</span>
//             </div>
//             <h3 className="font-semibold text-slate-900 mb-2">{list.name}</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-600">Total subscribers</span>
//                 <span className="font-semibold text-slate-900">{list.count}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-600">Active</span>
//                 <span className="font-semibold text-emerald-600">{list.active}</span>
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
//               <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
//                 View List
//               </button>
//               <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//                 <Download className="w-4 h-4 text-slate-600" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Templates Tab
// function TemplatesTab({ templates, loading }) {
//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold text-slate-900">Email Templates</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
//           <Plus className="w-4 h-4" />
//           New Template
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[
//           { name: 'Welcome Email', category: 'Onboarding', used: 245 },
//           { name: 'Newsletter Basic', category: 'Newsletter', used: 180 },
//           { name: 'Product Launch', category: 'Marketing', used: 95 },
//           { name: 'Order Confirmation', category: 'Transactional', used: 1250 },
//           { name: 'Abandoned Cart', category: 'Marketing', used: 340 },
//           { name: 'Survey Request', category: 'Feedback', used: 78 },
//         ].map((template, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
//             <div className="h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
//               <Mail className="w-16 h-16 text-blue-400" />
//             </div>
//             <div className="p-4">
//               <div className="flex items-start justify-between mb-2">
//                 <h3 className="font-semibold text-slate-900">{template.name}</h3>
//                 <button className="p-1 hover:bg-slate-100 rounded transition-colors">
//                   <Edit className="w-4 h-4 text-slate-600" />
//                 </button>
//               </div>
//               <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-3">
//                 {template.category}
//               </span>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-slate-600">Used {template.used} times</span>
//                 <button className="text-blue-600 hover:text-blue-700 font-medium">
//                   Use Template
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Analytics Tab
// function AnalyticsTab({ loading }) {
//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-bold text-slate-900">Campaign Analytics</h2>
//         <div className="flex gap-2">
//           <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
//             <option>Last 7 days</option>
//             <option>Last 30 days</option>
//             <option>Last 3 months</option>
//             <option>Last year</option>
//           </select>
//           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Performance Overview */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//           <h3 className="font-semibold text-slate-900 mb-4">Email Performance</h3>
//           <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
//             <p className="text-slate-500">Chart: Open & Click Rates Over Time</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//           <h3 className="font-semibold text-slate-900 mb-4">Top Performing Campaigns</h3>
//           <div className="space-y-3">
//             {[
//               { name: 'Holiday Special', opens: 32.5, clicks: 5.8 },
//               { name: 'Product Launch', opens: 28.3, clicks: 4.2 },
//               { name: 'Weekly Newsletter', opens: 24.7, clicks: 3.5 },
//             ].map((campaign, idx) => (
//               <div key={idx} className="p-3 bg-slate-50 rounded-lg">
//                 <p className="font-medium text-slate-900 mb-2">{campaign.name}</p>
//                 <div className="flex gap-4 text-sm">
//                   <div>
//                     <span className="text-slate-600">Opens: </span>
//                     <span className="font-semibold text-blue-600">{campaign.opens}%</span>
//                   </div>
//                   <div>
//                     <span className="text-slate-600">Clicks: </span>
//                     <span className="font-semibold text-orange-600">{campaign.clicks}%</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Detailed Stats */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//         <h3 className="font-semibold text-slate-900 mb-4">Engagement Metrics</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: 'Bounce Rate', value: '2.3%', change: '-0.5%', good: true },
//             { label: 'Unsubscribe Rate', value: '0.8%', change: '+0.2%', good: false },
//             { label: 'Forward Rate', value: '1.2%', change: '+0.3%', good: true },
//             { label: 'Complaint Rate', value: '0.1%', change: '0%', good: true },
//           ].map((metric, idx) => (
//             <div key={idx} className="p-4 bg-slate-50 rounded-lg">
//               <p className="text-sm text-slate-600 mb-1">{metric.label}</p>
//               <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
//               <p className={`text-sm font-medium ${metric.good ? 'text-emerald-600' : 'text-rose-600'}`}>
//                 {metric.change}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // New Campaign Modal
// function NewCampaignModal({ onClose, onSuccess }) {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     subject: '',
//     preheader: '',
//     listId: '',
//     templateId: '',
//     scheduledFor: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('/api/admin/email-campaigns', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
      
//       if (res.ok) {
//         onSuccess();
//         onClose();
//       }
//     } catch (error) {
//       console.error('Create campaign error:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-slate-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-lg font-bold text-slate-900">Create New Campaign</h2>
//               <p className="text-sm text-slate-500">Step {step} of 3</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//             >
//               <span className="text-2xl text-slate-600">×</span>
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4 flex gap-2">
//             {[1, 2, 3].map((s) => (
//               <div
//                 key={s}
//                 className={`flex-1 h-1 rounded-full ${
//                   s <= step ? 'bg-blue-600' : 'bg-slate-200'
//                 }`}
//               ></div>
//             ))}
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {step === 1 && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Campaign Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="e.g., New Year Sale 2025"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Email Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.subject}
//                   onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                   placeholder="Don't miss our biggest sale of the year!"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Preheader Text
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.preheader}
//                   onChange={(e) => setFormData({ ...formData, preheader: e.target.value })}
//                   placeholder="Up to 50% off on selected items"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-slate-500 mt-1">
//                   Preview text shown after the subject line
//                 </p>
//               </div>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Select Email List
//                 </label>
//                 <select
//                   value={formData.listId}
//                   onChange={(e) => setFormData({ ...formData, listId: e.target.value })}
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Choose a list...</option>
//                   <option value="1">Newsletter Subscribers (2,500)</option>
//                   <option value="2">Product Updates (1,800)</option>
//                   <option value="3">VIP Customers (450)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Select Template
//                 </label>
//                 <select
//                   value={formData.templateId}
//                   onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Choose a template...</option>
//                   <option value="1">Newsletter Basic</option>
//                   <option value="2">Product Launch</option>
//                   <option value="3">Promotional Offer</option>
//                 </select>
//               </div>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Schedule Campaign
//                 </label>
//                 <div className="space-y-3">
//                   <label className="flex items-center gap-3 p-4 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
//                     <input type="radio" name="schedule" defaultChecked className="w-4 h-4 text-blue-600" />
//                     <div>
//                       <p className="font-medium text-slate-900">Send Now</p>
//                       <p className="text-sm text-slate-500">Campaign will be sent immediately</p>
//                     </div>
//                   </label>
//                   <label className="flex items-center gap-3 p-4 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
//                     <input type="radio" name="schedule" className="w-4 h-4 text-blue-600" />
//                     <div className="flex-1">
//                       <p className="font-medium text-slate-900 mb-2">Schedule for Later</p>
//                       <input
//                         type="datetime-local"
//                         value={formData.scheduledFor}
//                         onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
//                         className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
//                       />
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </>
//           )}

//           <div className="flex justify-between pt-4">
//             <button
//               type="button"
//               onClick={() => step > 1 ? setStep(step - 1) : onClose()}
//               className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//             >
//               {step > 1 ? 'Back' : 'Cancel'}
//             </button>
//             <div className="flex gap-2">
//               {step < 3 ? (
//                 <button
//                   type="button"
//                   onClick={() => setStep(step + 1)}
//                   className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                 >
//                   Create Campaign
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }











































































'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Users,
  Eye,
  MousePointer,
  Plus,
  Search,
  Filter,
  FileText,
  Download,
  BarChart3,
  Edit,
  Trash2,
  Copy,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
} from 'lucide-react';

export default function EmailCampaignsPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([]);
  const [lists, setLists] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'campaigns') {
        const res = await fetch('/api/admin/email-campaigns');
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      } else if (activeTab === 'lists') {
        const res = await fetch('/api/admin/newsletters');
        const data = await res.json();
        setLists(data.lists || []);
      } else if (activeTab === 'templates') {
        const res = await fetch('/api/admin/email-templates');
        const data = await res.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      console.error('Email load error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Email Campaigns</h1>
                <p className="text-sm text-slate-500">
                  Create and manage email marketing
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNewCampaign(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-slate-200">
            {[
              { id: 'campaigns', label: 'Campaigns', icon: Send },
              { id: 'lists', label: 'Email Lists', icon: Users },
              { id: 'templates', label: 'Templates', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'campaigns' && (
          <CampaignsTab
            campaigns={campaigns}
            loading={loading}
            onRefresh={loadData}
          />
        )}
        {activeTab === 'lists' && (
          <EmailListsTab lists={lists} loading={loading} />
        )}
        {activeTab === 'templates' && (
          <TemplatesTab templates={templates} loading={loading} />
        )}
        {activeTab === 'analytics' && <AnalyticsTab loading={loading} />}
      </main>

      {showNewCampaign && (
        <NewCampaignModal
          lists={lists}
          onClose={() => setShowNewCampaign(false)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}

/* ===================== Campaigns Tab ===================== */

function CampaignsTab({ campaigns, loading, onRefresh }) {
  const [filter, setFilter] = useState('all');

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const totalCampaigns = campaigns.length;
  const sentCampaigns = campaigns.filter((c) => c.status === 'sent').length;
  const scheduledCampaigns = campaigns.filter(
    (c) => c.status === 'scheduled'
  ).length;

  const stats = [
    {
      label: 'Total Campaigns',
      value: totalCampaigns,
      icon: Send,
      color: 'blue',
    },
    {
      label: 'Sent Campaigns',
      value: sentCampaigns,
      icon: Mail,
      color: 'emerald',
    },
    {
      label: 'Scheduled',
      value: scheduledCampaigns,
      icon: Clock,
      color: 'amber',
    },
    {
      label: 'Drafts',
      value: campaigns.filter((c) => c.status === 'draft').length,
      icon: FileText,
      color: 'purple',
    },
  ];

  const filtered = campaigns.filter((c) =>
    filter === 'all' ? true : c.status === filter
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['all', 'draft', 'scheduled', 'sent'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  List
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Scheduled / Sent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{c.name}</p>
                    <p className="text-sm text-slate-500">{c.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        c.status === 'sent'
                          ? 'bg-emerald-100 text-emerald-700'
                          : c.status === 'scheduled'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.status === 'sent' && (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {c.status === 'scheduled' && (
                        <Clock className="w-3 h-3" />
                      )}
                      {c.status === 'draft' && (
                        <FileText className="w-3 h-3" />
                      )}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {c.list?.name || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {c.sentAt
                      ? `Sent: ${new Date(c.sentAt).toLocaleString()}`
                      : c.scheduledFor
                      ? `Scheduled: ${new Date(
                          c.scheduledFor
                        ).toLocaleString()}`
                      : 'Not scheduled'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {/* Send button */}
                      <button
                        className="p-1.5 rounded hover:bg-emerald-50"
                        title="Send campaign"
                        onClick={async () => {
                          if (
                            !confirm(
                              'Send this campaign to all active subscribers in its list?'
                            )
                          )
                            return;
                          const res = await fetch(
                            `/api/admin/email-campaigns/${c.id}/send`,
                            { method: 'POST' }
                          );
                          const data = await res.json();
                          if (res.ok) {
                            alert('Campaign sent successfully');
                            onRefresh?.();
                          } else {
                            alert(data.error || 'Failed to send campaign');
                          }
                        }}
                      >
                        <Send className="w-4 h-4 text-emerald-600" />
                      </button>

                      <button className="p-1.5 rounded hover:bg-slate-100">
                        <Eye className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-slate-100">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-slate-100">
                        <Copy className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-rose-100">
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No campaigns yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== Email Lists Tab ===================== */

function EmailListsTab({ lists, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Email Lists</h2>
          <p className="text-sm text-slate-500">
            Manage your subscribers by list
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New List
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  List
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Subscribers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {lists.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{l.name}</p>
                    <p className="text-sm text-slate-500">{l.description}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {l.subscriberCount}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {l.campaignCount}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Subscribers
                    </button>
                  </td>
                </tr>
              ))}
              {lists.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No lists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== Templates Tab ===================== */

function TemplatesTab({ templates, loading }) {
  const [showNewTemplate, setShowNewTemplate] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Email Templates</h2>
          <p className="text-sm text-slate-500">
            Reusable templates for your campaigns
          </p>
        </div>
        <button
          onClick={() => setShowNewTemplate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-900">{t.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.category || 'General'} • {t.status}
                </p>
              </div>
              <button className="p-1 hover:bg-slate-100 rounded-lg">
                <MoreVertical className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <p className="text-sm font-medium text-slate-800 mb-1">
              {t.subject}
            </p>
            <p className="text-sm text-slate-500 line-clamp-2">
              {t.preview || t.bodyText?.slice(0, 100) || 'No preview text'}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">
                {new Date(t.createdAt).toLocaleDateString()}
              </span>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Use in campaign
              </button>
            </div>
          </div>
        ))}
        {templates.length === 0 && (
          <p className="text-sm text-slate-500">No templates created yet.</p>
        )}
      </div>

      {showNewTemplate && (
        <NewEmailTemplateModal onClose={() => setShowNewTemplate(false)} />
      )}
    </div>
  );
}

/* ===================== Analytics Tab (placeholder) ===================== */

function AnalyticsTab({ loading }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <p className="text-sm text-slate-500">
        Analytics can use EmailDeliveryLog data later (open/click tracking).
      </p>
    </div>
  );
}

/* ===================== New Campaign Modal ===================== */

function NewCampaignModal({ lists, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [listId, setListId] = useState('');
  const [contentText, setContentText] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !listId || !contentText.trim()) {
      alert('Name, List and Message are required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/email-campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          subject,
          listId: Number(listId),
          contentText,
          scheduledFor: scheduleDate || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create campaign');
      } else {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error('Create campaign error:', error);
      alert('Error creating campaign');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              New Email Campaign
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Year Offer"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject (optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject line for recipients"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email List
            </label>
            <select
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a list</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.subscriberCount} subscribers)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Schedule (optional)
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Message Text
            </label>
            <textarea
              rows={4}
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="Your email message content..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Campaign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== New Email Template Modal ===================== */

function NewEmailTemplateModal({ onClose }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [preview, setPreview] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !subject.trim()) {
      alert('Name and subject are required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/email-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          subject,
          preview,
          bodyText,
          bodyHtml: bodyHtml || null,
          category: category || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create template');
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Create email template error:', error);
      alert('Error creating template');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              New Email Template
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Template Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Welcome Series"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="welcome / promo / newsletter"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Welcome to our service, {name}!"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Preview Text
            </label>
            <input
              type="text"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="Short summary shown in inbox preview"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Plain Text Body
            </label>
            <textarea
              rows={4}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Hi {name}, welcome to our service..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <details className="border border-slate-200 rounded-lg">
            <summary className="px-4 py-2 text-sm font-medium text-slate-700 cursor-pointer">
              HTML Body (optional)
            </summary>
            <div className="p-4 border-t border-slate-200">
              <textarea
                rows={6}
                value={bodyHtml}
                onChange={(e) => setBodyHtml(e.target.value)}
                placeholder="<p>Hi {name}, welcome...</p>"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </details>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Template'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
