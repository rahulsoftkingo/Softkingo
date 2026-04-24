"use client";
import { useEffect, useState } from "react";
import { Globe, Save, RefreshCw, CheckCircle2, Search, Share2, Info } from "lucide-react";

const DEFAULT_FORM = {
  siteName: "Website",
  defaultTitle: "Website",
  defaultDescription: "",
  defaultOgImage: "",
  robotsIndex: true,
};

export default function SeoSettingsPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/seo", { cache: "no-store" });
    const json = await res.json();
    if (json?.ok && json.data) setForm({ ...DEFAULT_FORM, ...json.data });
  }

  async function save() {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "save failed");
      setSuccess(true);
      setToast("Settings saved successfully");
    } catch (e) {
      setToast(e?.message || "Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => {
        setToast("");
        setSuccess(false);
      }, 3000);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-sky-900 tracking-tight">SEO & Global Metadata</h2>
          <p className="text-slate-500 text-sm mt-1">Configure how your website appears on search engines and social media.</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-all disabled:opacity-50 shadow-sm"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : success ? 'Saved' : 'Save Settings'}
        </button>
      </div>

      <div className="max-w-4xl space-y-12">
        {/* Section: Search Appearance */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" /> Search Appearance
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Default titles and descriptions for pages without specific SEO overrides.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Meta Site Name</label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => setForm(p => ({ ...p, siteName: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium"
                placeholder="e.g. Softkingo"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Default Meta Title</label>
              <input
                type="text"
                value={form.defaultTitle}
                onChange={(e) => setForm(p => ({ ...p, defaultTitle: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium"
                placeholder="e.g. Softkingo | Web & App Development"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Default Meta Description</label>
              <textarea
                rows={4}
                value={form.defaultDescription}
                onChange={(e) => setForm(p => ({ ...p, defaultDescription: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-medium resize-none"
                placeholder="Briefly describe your website content..."
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: Social Sharing */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-slate-400" /> Social Metadata
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Default image and data used when sharing your site link on social platforms.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Default OG Image URL</label>
              <input
                type="text"
                value={form.defaultOgImage}
                onChange={(e) => setForm(p => ({ ...p, defaultOgImage: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm text-slate-700 font-mono"
                placeholder="https://example.com/og-image.jpg"
              />
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <Info className="w-3 h-3" /> Recommended size: 1200x630px
              </p>
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: Indexing */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" /> Search Indexing
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Control whether search engines are allowed to crawl and index your site.</p>
          </div>
          <div className="md:col-span-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between group hover:bg-slate-100/50 transition-colors">
              <div>
                <p className="text-sm font-bold text-sky-900">Robots Indexing</p>
                <p className="text-xs text-slate-500 mt-0.5">Global toggle for search engine visibility.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.robotsIndex}
                  onChange={(e) => setForm(p => ({ ...p, robotsIndex: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
          </div>
        </section>
      </div>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl transition-all duration-500 flex items-center gap-3 border ${success ? 'bg-sky-900 border-sky-800 text-white' : 'bg-red-50 border-red-100 text-red-600'
          }`}>
          {success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4" />}
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
