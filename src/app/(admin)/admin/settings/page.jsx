'use client';
import React, { useState } from 'react';
import {
  Settings, Globe, Shield, Bell, Save, RefreshCw, CheckCircle2,
  Mail, Globe2, Monitor, Lock, Image as ImageIcon, MapPin,
  Phone, Facebook, Twitter, Instagram, Linkedin, Copyright,
  BarChart3, Languages, Coins
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 ">General Configuration</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your website's core identification and system preferences.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-all disabled:opacity-50 text-sm shadow-sm"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : success ? 'Settings Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-16">
        {/* Section: Site Identity */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Site Identity</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Basic information that identifies your business across the platform.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Site Name</label>
                <div className="relative group">
                  <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="Softkingo Technologies" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Support Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="email" defaultValue="support@softkingo.com" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Site Logo URL</label>
                <div className="relative group">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="/images/softkingo-logo.png" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Favicon URL</label>
                <div className="relative group">
                  <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="/favicon.ico" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: Contact & Social */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact & Social</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Publicly visible contact details and social media integration.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Business Address</label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                <textarea rows={2} defaultValue="123 Tech Park, Silicon Valley, CA" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium resize-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="+1 (555) 000-1234" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Facebook URL</label>
                <div className="relative group">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="https://facebook.com/softkingo" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Twitter URL</label>
                <div className="relative group">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="https://twitter.com/softkingo" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">LinkedIn URL</label>
                <div className="relative group">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="https://linkedin.com/company/softkingo" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: Analytics & Footer */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analytics & SEO</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Integration IDs for tracking and site-wide footer content.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Google Analytics ID</label>
                <div className="relative group">
                  <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="G-XXXXXXXXXX" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Copyright Text</label>
                <div className="relative group">
                  <Copyright className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                  <input type="text" defaultValue="© 2024 Softkingo Technologies. All rights reserved." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: Regional */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regional Settings</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Default language and currency for localized content.</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Default Language</label>
              <div className="relative group">
                <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                <select className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium appearance-none">
                  <option>English (US)</option>
                  <option>Hindi (India)</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Default Currency</label>
              <div className="relative group">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                <select className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium appearance-none">
                  <option>USD ($)</option>
                  <option>INR (₹)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: System Control */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Control</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Manage maintenance modes and administrative access overrides.</p>
          </div>
          <div className="md:col-span-2">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between group hover:bg-slate-100/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <Lock className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                  <p className="text-xs text-slate-500 mt-0.5">Restrict public access to the front-end during updates.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
