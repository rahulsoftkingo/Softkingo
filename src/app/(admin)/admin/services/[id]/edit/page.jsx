'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditServicePage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [serviceId, setServiceId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',

    heroBg: '/images/services/default-bg.png',
    heroTitle: '',
    heroSubtitle: '',

    // Portfolio section configuration
    portfolioTitle: 'Our Portfolio',
    portfolioSubtitle: '',
    portfolioCategory: '',

    stats: {
      years: '6+',
      yearsLabel: 'Years of Experience',
      projects: '400+',
      projectsLabel: 'Projects Completed',
      team: '50+',
      teamLabel: 'Expert Team Members',
      rating: '5.0',
      ratingLabel: 'Client Rating',
    },

    mainImage: '/images/about/r1.png',
    extraImages: ['/images/about/r3.png', '/images/about/r4.png'],
    statsSubtitle: '',

    // Services section data matching public side
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions for your business',
      items: []
    },

    // Tech section data matching public side  
    tech: {
      title: 'Technology Stack',
      subtitle: 'Cutting-edge technologies we use',
      items: []
    },

    // Process section data matching public side
    process: {
      title: 'Our Process',
      subtitle: 'Streamlined development methodology',
      items: []
    },

    // FAQ section data matching public side
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know',
      items: []
    }
  });

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    setLoading(true);
    try {
      const { id } = await params;
      setServiceId(id);

      const res = await fetch(`/api/admin/services/${id}`);
      const data = await res.json();

      if (data.service) {
        const content = JSON.parse(data.service.contentJson || '{}');

        setFormData({
          title: data.service.title,
          slug: data.service.slug,
          excerpt: data.service.excerpt || '',
          status: data.service.status,
          seoTitle: data.service.seoTitle || '',
          seoDescription: data.service.seoDescription || '',

          heroBg: content.heroBg || '/images/services/default-bg.png',
          heroTitle: content.heroTitle || data.service.title,
          heroSubtitle: content.heroSubtitle || '',

          // Loaded from contentJson
          portfolioTitle: content.portfolioTitle || 'Our Portfolio',
          portfolioSubtitle: content.portfolioSubtitle || '',
          portfolioCategory: content.portfolioCategory || '',

          stats: content.stats || {
            years: '6+',
            yearsLabel: 'Years of Experience',
            projects: '400+',
            projectsLabel: 'Projects Completed',
            team: '50+',
            teamLabel: 'Expert Team Members',
            rating: '5.0',
            ratingLabel: 'Client Rating',
          },
          mainImage: content.mainImage || '/images/about/r1.png',
          extraImages: content.extraImages || [],
          statsSubtitle: content.statsSubtitle || '',

          services: content.services || {
            title: 'Our Services',
            subtitle: 'Comprehensive solutions for your business',
            items: []
          },
          tech: content.tech || {
            title: 'Technology Stack',
            subtitle: 'Cutting-edge technologies we use',
            items: []
          },
          process: content.process || {
            title: 'Our Process',
            subtitle: 'Streamlined development methodology',
            items: []
          },
          faq: content.faq || {
            title: 'Frequently Asked Questions',
            subtitle: 'Everything you need to know',
            items: []
          },
        });
      }
    } catch (error) {
      console.error('Load service error:', error);
      alert('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Handle title change with auto slug generation
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      heroTitle: title,
    }));
  };

  const handleStatsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: value },
    }));
  };

  const handleCardChange = (index, field, value) => {
    const newServices = [...formData.services.items];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, items: newServices }
    }));
  };

  const removeCard = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter((_, i) => i !== index),
      },
    }));
  };

  const handleTechChange = (index, field, value) => {
    const newTech = [...formData.tech.items];
    newTech[index] = { ...newTech[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      tech: { ...prev.tech, items: newTech }
    }));
  };

  const handleProcessChange = (index, field, value) => {
    const newProcess = [...formData.process.items];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      process: { ...prev.process, items: newProcess }
    }));
  };

  const handleFAQChange = (index, field, value) => {
    const newFAQ = [...formData.faq.items];
    newFAQ[index] = { ...newFAQ[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      faq: { ...prev.faq, items: newFAQ }
    }));
  };

  const addTechItem = () => {
    setFormData((prev) => ({
      ...prev,
      tech: { ...prev.tech, items: [...prev.tech.items, { name: '', image: '' }] }
    }));
  };

  const addProcessStep = () => {
    setFormData((prev) => ({
      ...prev,
      process: { ...prev.process, items: [...prev.process.items, { title: '', description: '' }] }
    }));
  };

  const addFAQItem = () => {
    setFormData((prev) => ({
      ...prev,
      faq: { ...prev.faq, items: [...prev.faq.items, { q: '', a: '' }] }
    }));
  };

  const addCard = () => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [
          ...prev.services.items,
          {
            iconName: 'FaMobileAlt',
            title: '',
            description: '',
          },
        ],
      },
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

          // Saved to contentJson
          portfolioTitle: formData.portfolioTitle,
          portfolioSubtitle: formData.portfolioSubtitle,
          portfolioCategory: formData.portfolioCategory,

          services: formData.services,
          tech: formData.tech,
          process: formData.process,
          faq: formData.faq,
        }),
      };

      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/services');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save service');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Stats' },
    { id: 'services', label: 'Service Cards' },
    { id: 'tech', label: 'Technology Stack' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Process' },
    { id: 'faq', label: 'FAQ' },
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
                <h1 className="text-2xl font-bold text-slate-900">Edit Service</h1>
                <p className="text-sm text-slate-500 mt-1">{formData.title}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.open(`/services/${formData.slug}`, '_blank')}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Update Service'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id ? 'text-cyan-600' : 'text-slate-600 hover:text-slate-900'
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

          {/* Stats Tab - Same as new page */}
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
                    placeholder="6+"
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
                    placeholder="400+"
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

          {/* Service Cards Tab - Same as new page */}
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
                    value={formData.services.title}
                    onChange={(e) => handleServiceChange('title', e.target.value)}
                    placeholder="Our Services"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Subtitle</label>
                  <input
                    type="text"
                    value={formData.services.subtitle}
                    onChange={(e) => handleServiceChange('subtitle', e.target.value)}
                    placeholder="Description"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {formData.services.items.map((item, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Card {index + 1}</h3>
                      {formData.services.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newServices = [...formData.services.items];
                            newServices.splice(index, 1);
                            setFormData(prev => ({
                              ...prev,
                              services: { ...prev.services, items: newServices }
                            }));
                          }}
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
                          value={item.iconName}
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
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Card Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                        placeholder="Service Name"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Card Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleCardChange(index, 'description', e.target.value)}
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

          {/* Tech Stack Tab - New Section */}
          {activeTab === 'tech' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Technology Stack</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={formData.tech.title}
                    onChange={(e) => handleServiceChange('title', e.target.value)}
                    placeholder="Technology Stack"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Subtitle</label>
                  <textarea
                    value={formData.tech.subtitle}
                    onChange={(e) => handleServiceChange('subtitle', e.target.value)}
                    rows={3}
                    placeholder="Cutting-edge technologies we use"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Technologies</h3>
                <button
                  type="button"
                  onClick={addTechItem}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Technology
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.tech.items.map((tech, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-900">Technology {index + 1}</h4>
                      {formData.tech.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newTech = [...formData.tech.items];
                            newTech.splice(index, 1);
                            setFormData(prev => ({
                              ...prev,
                              tech: { ...prev.tech, items: newTech }
                            }));
                          }}
                          className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Technology Name</label>
                        <input
                          type="text"
                          value={tech.name}
                          onChange={(e) => handleTechChange(index, 'name', e.target.value)}
                          placeholder="e.g. React, Node.js"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
                        <input
                          type="text"
                          value={tech.image}
                          onChange={(e) => handleTechChange(index, 'image', e.target.value)}
                          placeholder="/images/tech/react.png"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Portfolio Configuration</h2>
              <p className="text-sm text-slate-500">Configure how the portfolio section appears on this service page.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Heading</label>
                  <input
                    type="text"
                    name="portfolioTitle"
                    value={formData.portfolioTitle}
                    onChange={handleChange}
                    placeholder="e.g. Our Success Stories"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Portfolio Category Tag</label>
                  <select
                    name="portfolioCategory"
                    value={formData.portfolioCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select Category...</option>
                    <option value="dating">Dating Apps</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="delivery">Delivery Apps</option>
                    <option value="taxi">Taxi / Ride Sharing</option>
                    <option value="education">E-Learning</option>
                    <option value="fitness">Health & Fitness</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-1">
                    If left blank, it will fall back to the service slug: "{formData.slug}"
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Section Subtitle</label>
                <textarea
                  name="portfolioSubtitle"
                  value={formData.portfolioSubtitle}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Supporting text for portfolio section"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Process Tab - New Section */}
          {activeTab === 'process' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Development Process</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={formData.process.title}
                    onChange={(e) => handleServiceChange('title', e.target.value)}
                    placeholder="Our Process"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Subtitle</label>
                  <textarea
                    value={formData.process.subtitle}
                    onChange={(e) => handleServiceChange('subtitle', e.target.value)}
                    rows={3}
                    placeholder="Streamlined development methodology"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Process Steps</h3>
                <button
                  type="button"
                  onClick={addProcessStep}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Step
                </button>
              </div>

              <div className="space-y-4">
                {formData.process.items.map((step, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-900">Step {index + 1}</h4>
                      {formData.process.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newProcess = [...formData.process.items];
                            newProcess.splice(index, 1);
                            setFormData(prev => ({
                              ...prev,
                              process: { ...prev.process, items: newProcess }
                            }));
                          }}
                          className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Step Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => handleProcessChange(index, 'title', e.target.value)}
                          placeholder="e.g. Discovery & Planning"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Step Description</label>
                        <textarea
                          value={step.description}
                          onChange={(e) => handleProcessChange(index, 'description', e.target.value)}
                          rows={3}
                          placeholder="Detailed description of step"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Tab - New Section */}
          {activeTab === 'faq' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={formData.faq.title}
                    onChange={(e) => handleServiceChange('title', e.target.value)}
                    placeholder="Frequently Asked Questions"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Subtitle</label>
                  <textarea
                    value={formData.faq.subtitle}
                    onChange={(e) => handleServiceChange('subtitle', e.target.value)}
                    rows={3}
                    placeholder="Everything you need to know"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">FAQ Items</h3>
                <button
                  type="button"
                  onClick={addFAQItem}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-4">
                {formData.faq.items.map((faq, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-900">FAQ {index + 1}</h4>
                      {formData.faq.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newFAQ = [...formData.faq.items];
                            newFAQ.splice(index, 1);
                            setFormData(prev => ({
                              ...prev,
                              faq: { ...prev.faq, items: newFAQ }
                            }));
                          }}
                          className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => handleFAQChange(index, 'q', e.target.value)}
                          placeholder="Enter your question"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Answer</label>
                        <textarea
                          value={faq.a}
                          onChange={(e) => handleFAQChange(index, 'a', e.target.value)}
                          rows={4}
                          placeholder="Enter answer"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
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
