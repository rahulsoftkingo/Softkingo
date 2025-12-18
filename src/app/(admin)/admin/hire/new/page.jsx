'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function NewHirePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    key: 'hire-front-end',
    excerpt: '',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    seoImage: '',

    // Hero
    heroBg: '/images/hire/h-bg.png',
    heroTitle: '',
    heroSubtitle: '',

    // Optional custom fields for hire layout
    badgeText: 'Hire Page',
    metrics: {
      avgTime: '48 Hours',
      network: '100+ Experts',
      rating: '4.9/5',
    },

    // Extra section titles
    aboutTitle: 'Front-End Developers by Softkingo',
    aboutSubtitle:
      'Softkingo has a pool of top Front-end developers who can deliver an extraordinary user experience.',
  });

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'content', label: 'Layout Text' },
    { id: 'seo', label: 'SEO' },
  ];

  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      heroTitle: title,
      seoTitle: prev.seoTitle || title,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetricsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        contentJson: JSON.stringify({
          heroBg: formData.heroBg,
          heroTitle: formData.heroTitle,
          heroSubtitle: formData.heroSubtitle,
          badgeText: formData.badgeText,
          metrics: formData.metrics,
          aboutTitle: formData.aboutTitle,
          aboutSubtitle: formData.aboutSubtitle,
        }),
      };

      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/hire');
      } else {
        alert('Failed to save hire page');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving hire page');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/hire"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Create New Hire Page</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Add a new hire landing page (uses Page model)
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
          <div className="flex gap-1 mt-4 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id ? 'text-cyan-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
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
                  <label className="block text-sm font-medium text-slate-700">
                    Slug
                  </label>
                  <div className="mt-1 flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-sm text-slate-500">
                      /hire/
                    </span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className="flex-1 min-w-0 block w-full px-3 py-2 border border-slate-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Key (identifier)
                </label>
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. hire-front-end"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Short Description / Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Short summary for this hire page..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Status
                  </label>
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
              </div>
            </div>
          )}

          {/* Hero */}
          {activeTab === 'hero' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      name="heroTitle"
                      value={formData.heroTitle}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Hero Subtitle
                    </label>
                    <textarea
                      name="heroSubtitle"
                      value={formData.heroSubtitle}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      name="badgeText"
                      value={formData.badgeText}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. Trusted by 500+ companies"
                    />
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
                          Put static path for now (e.g. /images/hire/h-bg.png)
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="heroBg"
                      value={formData.heroBg}
                      onChange={handleChange}
                      className="mt-3 w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="/images/hire/h-bg.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content text */}
          {activeTab === 'content' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    About Section Title
                  </label>
                  <input
                    type="text"
                    name="aboutTitle"
                    value={formData.aboutTitle}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Avg Hiring Time
                  </label>
                  <input
                    type="text"
                    value={formData.metrics.avgTime}
                    onChange={(e) => handleMetricsChange('avgTime', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="48 Hours"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  About Subtitle
                </label>
                <textarea
                  name="aboutSubtitle"
                  value={formData.aboutSubtitle}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Developers Network
                  </label>
                  <input
                    type="text"
                    value={formData.metrics.network}
                    onChange={(e) => handleMetricsChange('network', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="100+ Experts"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Rating
                  </label>
                  <input
                    type="text"
                    value={formData.metrics.rating}
                    onChange={(e) => handleMetricsChange('rating', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="4.9/5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Meta title for this page"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Meta description for this page"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  SEO Image URL
                </label>
                <input
                  type="text"
                  name="seoImage"
                  value={formData.seoImage}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
