'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    
    // Hero
    heroBg: '/images/services/default-bg.png',
    heroTitle: '',
    heroSubtitle: '',
    
    // Stats
    stats: {
      years: '5+',
      yearsLabel: 'Years of Experience',
      projects: '450+',
      projectsLabel: 'Projects Completed',
      team: '50+',
      teamLabel: 'Expert Team Members',
      rating: '5.0',
      ratingLabel: 'Client Rating',
    },
    
    mainImage: '/images/about/r1.png',
    extraImages: ['/images/about/r3.png', '/images/about/r4.png'],
    statsSubtitle: '',
    
    // Services Section
    servicesTitle: 'Our Services',
    servicesSub: 'Comprehensive solutions for your business',
    
    cards: [
      {
        iconName: 'FaMobileAlt',
        iconGradient: 'from-cyan-400 to-sky-600',
        title: '',
        text: '',
      },
      {
        iconName: 'FaHandSparkles',
        iconGradient: 'from-purple-400 to-purple-600',
        title: '',
        text: '',
      },
      {
        iconName: 'FaHeadphones',
        iconGradient: 'from-emerald-400 to-emerald-600',
        title: '',
        text: '',
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: value },
    }));
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...formData.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setFormData((prev) => ({ ...prev, cards: newCards }));
  };

  const addCard = () => {
    setFormData((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          iconName: 'FaMobileAlt',
          iconGradient: 'from-cyan-400 to-sky-600',
          title: '',
          text: '',
        },
      ],
    }));
  };

  const removeCard = (index) => {
    setFormData((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      heroTitle: title,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        status: formData.status,
        type: 'service',
        featured: false,
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt,
        contentJson: JSON.stringify({
          heroBg: formData.heroBg,
          heroTitle: formData.heroTitle,
          heroSubtitle: formData.heroSubtitle,
          stats: formData.stats,
          mainImage: formData.mainImage,
          extraImages: formData.extraImages,
          statsSubtitle: formData.statsSubtitle,
          servicesTitle: formData.servicesTitle,
          servicesSub: formData.servicesSub,
          cards: formData.cards,
        }),
      };

      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/services');
      } else {
        alert('Failed to save service');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving service');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Stats' },
    { id: 'services', label: 'Service Cards' },
    { id: 'seo', label: 'SEO' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/services"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Create New Service</h1>
                <p className="text-sm text-slate-500 mt-1">Add a new service page</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.open(`/services/${formData.slug}`, '_blank')}
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
                {saving ? 'Saving...' : 'Save Service'}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Service Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    placeholder="e.g., Mobile App Development"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug (URL) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    placeholder="mobile-app-development"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">/services/{formData.slug}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of the service"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          )}

          {/* Hero Section Tab */}
          {activeTab === 'hero' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Hero Section</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background Image URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="heroBg"
                    value={formData.heroBg}
                    onChange={handleChange}
                    placeholder="/images/services/bg.png"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
                  >
                    <ImageIcon className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  placeholder="Service main heading"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  name="heroSubtitle"
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Supporting text for hero section"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Statistics Section</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Years Value</label>
                  <input
                    type="text"
                    value={formData.stats.years}
                    onChange={(e) => handleStatsChange('years', e.target.value)}
                    placeholder="5+"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Years Label</label>
                  <input
                    type="text"
                    value={formData.stats.yearsLabel}
                    onChange={(e) => handleStatsChange('yearsLabel', e.target.value)}
                    placeholder="Years of Experience"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Projects Value</label>
                  <input
                    type="text"
                    value={formData.stats.projects}
                    onChange={(e) => handleStatsChange('projects', e.target.value)}
                    placeholder="450+"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Projects Label</label>
                  <input
                    type="text"
                    value={formData.stats.projectsLabel}
                    onChange={(e) => handleStatsChange('projectsLabel', e.target.value)}
                    placeholder="Projects Completed"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Team Value</label>
                  <input
                    type="text"
                    value={formData.stats.team}
                    onChange={(e) => handleStatsChange('team', e.target.value)}
                    placeholder="50+"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Team Label</label>
                  <input
                    type="text"
                    value={formData.stats.teamLabel}
                    onChange={(e) => handleStatsChange('teamLabel', e.target.value)}
                    placeholder="Expert Team Members"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating Value</label>
                  <input
                    type="text"
                    value={formData.stats.rating}
                    onChange={(e) => handleStatsChange('rating', e.target.value)}
                    placeholder="5.0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating Label</label>
                  <input
                    type="text"
                    value={formData.stats.ratingLabel}
                    onChange={(e) => handleStatsChange('ratingLabel', e.target.value)}
                    placeholder="Client Rating"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Main Image URL</label>
                <input
                  type="text"
                  name="mainImage"
                  value={formData.mainImage}
                  onChange={handleChange}
                  placeholder="/images/about/team.png"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Service Cards Tab */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Service Cards</h2>
                <button
                  type="button"
                  onClick={addCard}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    name="servicesTitle"
                    value={formData.servicesTitle}
                    onChange={handleChange}
                    placeholder="Our Services"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Subtitle</label>
                  <input
                    type="text"
                    name="servicesSub"
                    value={formData.servicesSub}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {formData.cards.map((card, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Card {index + 1}</h3>
                      {formData.cards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCard(index)}
                          className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Icon Name</label>
                        <select
                          value={card.iconName}
                          onChange={(e) => handleCardChange(index, 'iconName', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        >
                          <option value="FaMobileAlt">Mobile</option>
                          <option value="FaHandSparkles">Sparkles</option>
                          <option value="FaHeadphones">Headphones</option>
                          <option value="FaDesktop">Desktop</option>
                          <option value="FaShoppingCart">Shopping</option>
                          <option value="FaRobot">Robot</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Icon Gradient</label>
                        <select
                          value={card.iconGradient}
                          onChange={(e) => handleCardChange(index, 'iconGradient', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        >
                          <option value="from-cyan-400 to-sky-600">Cyan to Sky</option>
                          <option value="from-purple-400 to-purple-600">Purple</option>
                          <option value="from-emerald-400 to-emerald-600">Emerald</option>
                          <option value="from-rose-400 to-rose-600">Rose</option>
                          <option value="from-amber-400 to-amber-600">Amber</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Card Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                        placeholder="Service Name"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Card Description</label>
                      <textarea
                        value={card.text}
                        onChange={(e) => handleCardChange(index, 'text', e.target.value)}
                        placeholder="Service description"
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">SEO Settings</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  placeholder="Leave blank to use service title"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {(formData.seoTitle || formData.title).length}/60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Leave blank to use excerpt"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {(formData.seoDescription || formData.excerpt).length}/160 characters
                </p>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
