// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   MessageCircle, 
//   Send, 
//   Users, 
//   Clock, 
//   CheckCircle,
//   Search,
//   Plus,
//   Download,
//   Upload,
//   Filter,
//   MoreVertical,
//   Phone,
//   Image as ImageIcon,
//   FileText,
//   Link as LinkIcon
// } from 'lucide-react';

// export default function WhatsAppPage() {
//   const [activeTab, setActiveTab] = useState('inbox');
//   const [messages, setMessages] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showNewMessage, setShowNewMessage] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, [activeTab]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       // Load based on active tab
//       if (activeTab === 'inbox') {
//         const res = await fetch('/api/admin/whatsapp/messages');
//         const data = await res.json();
//         setMessages(data.messages || []);
//       } else if (activeTab === 'contacts') {
//         const res = await fetch('/api/admin/whatsapp/contacts');
//         const data = await res.json();
//         setContacts(data.contacts || []);
//       } else if (activeTab === 'templates') {
//         const res = await fetch('/api/admin/whatsapp/templates');
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
//               <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
//                 <MessageCircle className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-slate-900">WhatsApp Business</h1>
//                 <p className="text-sm text-slate-500">Manage conversations & campaigns</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowNewMessage(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
//             >
//               <Plus className="w-4 h-4" />
//               New Message
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-1 mt-4 border-b border-slate-200">
//             {[
//               { id: 'inbox', label: 'Inbox', icon: MessageCircle, count: 12 },
//               { id: 'contacts', label: 'Contacts', icon: Users, count: 234 },
//               { id: 'templates', label: 'Templates', icon: FileText, count: 8 },
//               { id: 'campaigns', label: 'Campaigns', icon: Send, count: 3 },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
//                   activeTab === tab.id
//                     ? 'text-emerald-600'
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
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
//         {activeTab === 'inbox' && <InboxTab messages={messages} loading={loading} />}
//         {activeTab === 'contacts' && <ContactsTab contacts={contacts} loading={loading} />}
//         {activeTab === 'templates' && <TemplatesTab templates={templates} loading={loading} />}
//         {activeTab === 'campaigns' && <CampaignsTab loading={loading} />}
//       </main>

//       {/* New Message Modal */}
//       {showNewMessage && (
//         <NewMessageModal onClose={() => setShowNewMessage(false)} />
//       )}
//     </div>
//   );
// }

// // Inbox Tab Component
// function InboxTab({ messages, loading }) {
//   if (loading) {
//     return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>;
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Messages List */}
//       <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-4 border-b border-slate-200">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search messages..."
//               className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>
//         </div>

//         <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <button
//               key={i}
//               className="w-full p-4 hover:bg-slate-50 transition-colors text-left"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-emerald-700 font-semibold">JD</span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-1">
//                     <h3 className="font-semibold text-sm text-slate-900">John Doe</h3>
//                     <span className="text-xs text-slate-500">2:30 PM</span>
//                   </div>
//                   <p className="text-sm text-slate-600 truncate">Last message preview...</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
//                       Active
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
//         <div className="p-4 border-b border-slate-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
//                 <span className="text-emerald-700 font-semibold">JD</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-slate-900">John Doe</h3>
//                 <p className="text-xs text-slate-500">+91 9876543210</p>
//               </div>
//             </div>
//             <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//               <MoreVertical className="w-5 h-5 text-slate-600" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
//           <div className="space-y-4">
//             {/* Sample messages */}
//             <div className="flex justify-start">
//               <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm max-w-[75%]">
//                 <p className="text-sm text-slate-800">Hello! I need help with my order.</p>
//                 <span className="text-xs text-slate-500">10:30 AM</span>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <div className="bg-emerald-600 text-white rounded-2xl rounded-br-md px-4 py-2 shadow-sm max-w-[75%]">
//                 <p className="text-sm">Sure! I'd be happy to help. What's your order number?</p>
//                 <span className="text-xs text-emerald-100">10:32 AM</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-slate-200">
//           <div className="flex items-end gap-2">
//             <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//               <ImageIcon className="w-5 h-5 text-slate-600" />
//             </button>
//             <textarea
//               placeholder="Type a message..."
//               rows={1}
//               className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//             <button className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Contacts Tab Component
// function ContactsTab({ contacts, loading }) {
//   if (loading) {
//     return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>;
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200">
//       <div className="p-6 border-b border-slate-200">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-bold text-slate-900">WhatsApp Contacts</h2>
//           <div className="flex gap-2">
//             <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
//               <Upload className="w-4 h-4" />
//               Import
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
//               <Plus className="w-4 h-4" />
//               Add Contact
//             </button>
//           </div>
//         </div>

//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search contacts..."
//             className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-slate-50 border-b border-slate-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Phone</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tags</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-200">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <tr key={i} className="hover:bg-slate-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
//                       <span className="text-emerald-700 font-semibold text-sm">JD</span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-slate-900">John Doe</p>
//                       <p className="text-sm text-slate-500">john@example.com</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-slate-600">+91 9876543210</td>
//                 <td className="px-6 py-4">
//                   <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
//                     Active
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-1">
//                     <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Customer</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//                     <MessageCircle className="w-4 h-4 text-slate-600" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // Templates Tab Component  
// function TemplatesTab({ templates, loading }) {
//   if (loading) {
//     return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold text-slate-900">Message Templates</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
//           <Plus className="w-4 h-4" />
//           New Template
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between mb-3">
//               <h3 className="font-semibold text-slate-900">Welcome Message</h3>
//               <button className="p-1 hover:bg-slate-100 rounded transition-colors">
//                 <MoreVertical className="w-4 h-4 text-slate-600" />
//               </button>
//             </div>
//             <p className="text-sm text-slate-600 mb-4">
//               Hi {'{name}'}, welcome to our service! We're excited to have you...
//             </p>
//             <div className="flex items-center justify-between">
//               <span className="text-xs text-slate-500">Used 45 times</span>
//               <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
//                 Use Template
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Campaigns Tab Component
// function CampaignsTab({ loading }) {
//   if (loading) {
//     return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold text-slate-900">WhatsApp Campaigns</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
//           <Plus className="w-4 h-4" />
//           Create Campaign
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {[
//           { label: 'Total Sent', value: '1,234', icon: Send, color: 'blue' },
//           { label: 'Delivered', value: '1,180', icon: CheckCircle, color: 'emerald' },
//           { label: 'Pending', value: '54', icon: Clock, color: 'amber' },
//         ].map((stat) => (
//           <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
//                 <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
//               </div>
//               <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-200">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Campaign</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Recipients</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Sent</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {[1, 2, 3].map((i) => (
//                 <tr key={i} className="hover:bg-slate-50">
//                   <td className="px-6 py-4">
//                     <p className="font-medium text-slate-900">New Year Promotion</p>
//                     <p className="text-sm text-slate-500">Special discount offer</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
//                       Completed
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-slate-600">500</td>
//                   <td className="px-6 py-4 text-sm text-slate-600">485</td>
//                   <td className="px-6 py-4 text-sm text-slate-600">Dec 28, 2025</td>
//                   <td className="px-6 py-4">
//                     <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
//                       View Details
//                     </button>
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

// // New Message Modal
// function NewMessageModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-slate-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-bold text-slate-900">New WhatsApp Message</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//             >
//               <span className="text-2xl text-slate-600">×</span>
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Recipient Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="+91 9876543210"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Message
//             </label>
//             <textarea
//               rows={4}
//               placeholder="Type your message..."
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
//               Send Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






























'use client';

import { useState, useEffect } from 'react';
import {
  MessageCircle,
  Send,
  Users,
  Clock,
  CheckCircle,
  Search,
  Plus,
  Upload,
  Image as ImageIcon,
  FileText,
  MoreVertical,
} from 'lucide-react';

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState('inbox'); // inbox | contacts | templates | campaigns

  // Inbox
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Contacts / Templates / Campaigns
  const [contacts, setContacts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const [contactsSearch, setContactsSearch] = useState('');

  useEffect(() => {
    loadTabData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'inbox' && selectedConversationId) {
      loadMessages(selectedConversationId);
    }
  }, [activeTab, selectedConversationId]);

  const loadTabData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'inbox') {
        const res = await fetch('/api/admin/whatsapp/conversations?status=active');
        const data = await res.json();
        setConversations(data.conversations || []);
        if (!selectedConversationId && data.conversations?.length > 0) {
          setSelectedConversationId(data.conversations[0].id);
        }
      } else if (activeTab === 'contacts') {
        const url =
          '/api/admin/whatsapp/contacts' +
          (contactsSearch ? `?search=${encodeURIComponent(contactsSearch)}` : '');
        const res = await fetch(url);
        const data = await res.json();
        setContacts(data.contacts || []);
      } else if (activeTab === 'templates') {
        const res = await fetch('/api/admin/whatsapp/message-templates');
        const data = await res.json();
        setTemplates(data.templates || []);
      } else if (activeTab === 'campaigns') {
        const res = await fetch('/api/admin/whatsapp/campaigns');
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.error('WhatsApp load tab error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    setChatLoading(true);
    try {
      const res = await fetch(
        `/api/admin/whatsapp/messages?conversationId=${conversationId}`
      );
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('WhatsApp load messages error:', error);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendMessage = async (conversationId, text) => {
    if (!text.trim()) return;
    try {
      const res = await fetch('/api/admin/whatsapp/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: text,
          sender: 'agent',
          senderName: 'Agent',
          type: 'text',
        }),
      });
      const data = await res.json();
      if (res.ok && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        alert(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('WhatsApp send message error:', error);
      alert('Error sending message');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">WhatsApp Business</h1>
                <p className="text-sm text-slate-500">
                  Manage conversations, templates & campaigns
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNewMessage(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Message
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-slate-200">
            {[
              { id: 'inbox', label: 'Inbox', icon: MessageCircle, count: 0 },
              { id: 'contacts', label: 'Contacts', icon: Users, count: 0 },
              { id: 'templates', label: 'Templates', icon: FileText, count: 0 },
              { id: 'campaigns', label: 'Campaigns', icon: Send, count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-emerald-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'inbox' && (
          <InboxTab
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
            messages={messages}
            loading={loading}
            chatLoading={chatLoading}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactsTab
            contacts={contacts}
            loading={loading}
            search={contactsSearch}
            onSearchChange={setContactsSearch}
            onReload={loadTabData}
            onAddContact={() => setShowContactModal(true)}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesTab
            templates={templates}
            loading={loading}
            onNewTemplate={() => setShowTemplateModal(true)}
          />
        )}

        {activeTab === 'campaigns' && (
          <CampaignsTab
            campaigns={campaigns}
            loading={loading}
            onNewCampaign={() => setShowCampaignModal(true)}
          />
        )}
      </main>

      {showNewMessage && (
        <NewMessageModal onClose={() => setShowNewMessage(false)} />
      )}

      {showTemplateModal && (
        <NewTemplateModal
          onClose={async () => {
            setShowTemplateModal(false);
            if (activeTab === 'templates') await loadTabData();
          }}
        />
      )}

      {showContactModal && (
        <NewContactModal
          onClose={async (reload) => {
            setShowContactModal(false);
            if (reload && activeTab === 'contacts') await loadTabData();
          }}
        />
      )}

      {showCampaignModal && (
        <NewCampaignModal
          onClose={async (reload) => {
            setShowCampaignModal(false);
            if (reload && activeTab === 'campaigns') await loadTabData();
          }}
        />
      )}
    </div>
  );
}

/* ===================== Inbox Tab ===================== */

function InboxTab({
  conversations,
  selectedConversationId,
  onSelectConversation,
  messages,
  loading,
  chatLoading,
  onSendMessage,
}) {
  const [draft, setDraft] = useState('');

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  const selected =
    conversations.find((c) => c.id === selectedConversationId) || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversations list */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
          {conversations.map((conv) => {
            const last = conv.messages?.[0];
            const initials =
              conv.visitorName?.trim()?.split(' ').map((p) => p[0]).join('') ||
              conv.visitorPhone?.slice(-2) ||
              'C';

            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full p-4 text-left transition-colors ${
                  selectedConversationId === conv.id
                    ? 'bg-slate-50'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-semibold">
                      {initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-slate-900">
                        {conv.visitorName || conv.visitorPhone || conv.visitorId}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {new Date(conv.updatedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 truncate">
                      {last?.content || 'No messages yet'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                        {conv.status}
                      </span>
                      {conv.priority !== 'normal' && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                          {conv.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a conversation
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold">
                      {(selected.visitorName ||
                        selected.visitorPhone ||
                        'C')
                        .toString()
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {selected.visitorName ||
                        selected.visitorPhone ||
                        selected.visitorId}
                    </h3>
                    {selected.visitorPhone && (
                      <p className="text-xs text-slate-500">
                        {selected.visitorPhone}
                      </p>
                    )}
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
              {chatLoading ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'agent'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 shadow-sm max-w-[75%] ${
                          msg.sender === 'agent'
                            ? 'bg-emerald-600 text-white rounded-br-md'
                            : 'bg-white text-slate-800 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            msg.sender === 'agent'
                              ? 'text-emerald-100'
                              : 'text-slate-500'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5 text-slate-600" />
                </button>
                <textarea
                  placeholder="Type a message..."
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => {
                    if (selectedConversationId) {
                      onSendMessage(selectedConversationId, draft);
                      setDraft('');
                    }
                  }}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ===================== Contacts Tab ===================== */

function ContactsTab({
  contacts,
  loading,
  search,
  onSearchChange,
  onReload,
  onAddContact,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">WhatsApp Contacts</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={onAddContact}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onBlur={onReload}
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-semibold text-sm">
                          {(c.name || 'C').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{c.name}</p>
                        <p className="text-sm text-slate-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.tags}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ===================== Templates Tab ===================== */

function TemplatesTab({ templates, loading, onNewTemplate }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Message Templates</h2>
        <button
          onClick={onNewTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900">{t.name}</h3>
              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4 whitespace-pre-line">
              {t.body}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {t.category || 'General'} • {t.language || 'en'}
              </span>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Use Template
              </button>
            </div>
          </div>
        ))}
        {templates.length === 0 && (
          <p className="text-sm text-slate-500">No templates found.</p>
        )}
      </div>
    </div>
  );
}

/* ===================== Campaigns Tab ===================== */

function CampaignsTab({ campaigns, loading, onNewCampaign }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">WhatsApp Campaigns</h2>
        <button
          onClick={onNewCampaign}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* Basic stats (dummy for now) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {[
          { label: 'Total Sent', value: '–', icon: Send, color: 'blue' },
          { label: 'Delivered', value: '–', icon: CheckCircle, color: 'emerald' },
          { label: 'Pending', value: '–', icon: Clock, color: 'amber' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
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
                  Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{c.name}</p>
                    <p className="text-sm text-slate-500">{c.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {c.list?.name || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {c.scheduledFor
                      ? new Date(c.scheduledFor).toLocaleString()
                      : 'Not scheduled'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No campaigns found.
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

/* ===================== New Message Modal ===================== */

function NewMessageModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">New WhatsApp Message</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Recipient Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== New Template Modal ===================== */

function NewTemplateModal({ onClose }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('en');
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !body.trim()) {
      alert('Name and body are required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/whatsapp/message-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category: category || null,
          language,
          body,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create template');
      } else {
        onClose(true);
      }
    } catch (err) {
      console.error('Create template error:', err);
      alert('Error creating template');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              New WhatsApp Template
            </h2>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Welcome Message"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="welcome / promo / support"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="en"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Template Body
            </label>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hi {name}, welcome to our service! ..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              You can use variables like {'{name}'} which will be replaced when sending.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Template'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== New Contact Modal ===================== */

function NewContactModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!phone.trim()) {
      alert('Phone is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/whatsapp/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create contact');
      } else {
        onClose(true);
      }
    } catch (error) {
      console.error('Create contact error:', error);
      alert('Error creating contact');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">New Contact</h2>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Contact'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== New Campaign Modal ===================== */

function NewCampaignModal({ onClose }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [listId, setListId] = useState('');
  const [contentText, setContentText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !listId.trim() || !contentText.trim()) {
      alert('Name, List and Message are required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/whatsapp/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          subject,
          listId: Number(listId),
          contentText,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create campaign');
      } else {
        onClose(true);
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
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              New WhatsApp Campaign
            </h2>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New Year Offer"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Internal Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Short description"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              List ID
            </label>
            <input
              type="number"
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              placeholder="Newsletter list id"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              placeholder="Your WhatsApp broadcast message..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Campaign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
