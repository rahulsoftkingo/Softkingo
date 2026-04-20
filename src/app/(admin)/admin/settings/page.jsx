'use client';
import React, { useState } from 'react';
import { 
  Settings, Globe, Shield, Bell, Database, 
  Languages, Layout, Image as ImageIcon,
  Save, RefreshCw, AlertCircle, CheckCircle2
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'seo', label: 'SEO & Global', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Alerts', icon: Bell },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Admin Settings</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm tracking-tight">Configure site-wide preferences and system behaviors.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-xl font-bold shadow-xl shadow-sky-100 hover:bg-sky-700 transition-all disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : success ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : success ? 'Settings Saved' : 'Save Changes'}
          </button>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-sky-600 shadow-sm border border-slate-100' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-sky-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-12">
            
            {activeTab === 'general' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">General Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Site Name</label>
                            <input type="text" defaultValue="Softkingo Technologies" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Support Email</label>
                            <input type="email" defaultValue="support@softkingo.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium text-slate-700" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Maintenance Mode</label>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-700">Disable Public Access</p>
                                    <p className="text-xs text-slate-500">Only administrators can view the site while enabled.</p>
                                </div>
                                <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer opacity-50">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Search Engine Optimization</h3>
                   <p className="text-sm text-slate-500 mb-8">Manage how your site appears in search engine results.</p>
                   
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Default Meta Title</label>
                         <input type="text" placeholder="Softkingo | Web & App Development" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium text-slate-700" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
                         <textarea rows={4} placeholder="Premium digital solutions for global businesses..." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium text-slate-700 resize-none" />
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab !== 'general' && activeTab !== 'seo' && (
               <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                  <Database className="w-16 h-16 text-slate-300" />
                  <div>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-widest">Under Development</p>
                    <p className="text-sm font-medium text-slate-500">This configuration module is being prepared.</p>
                  </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
