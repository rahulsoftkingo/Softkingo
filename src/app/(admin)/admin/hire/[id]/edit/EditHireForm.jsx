'use client';

import { useEffect, useMemo, useState } from 'react';
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

function safeJson(v) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return '{}';
  }
}

export default function EditHireForm({ initialData }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [slugLocked, setSlugLocked] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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

  const contentJsonObject = useMemo(
    () => ({
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
    }),
    [formData],
  );

  const contentJsonString = useMemo(
    () => safeJson(contentJsonObject),
    [contentJsonObject],
  );

  const setField = (name, value) =>
    setFormData((p) => ({ ...p, [name]: value }));

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

  const toggleNested = (path, enabled) => {
    setFormData((prev) => {
      const copy = structuredClone(prev);
      const [root, key] = path.split('.');
      copy[root] = copy[root] || {};
      copy[root][key] = enabled;
      return copy;
    });
  };

  // -------------- CRUD helpers (same as new page) --------------

  // Features
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
    setFormData((p) => ({
      ...p,
      features: (p.features || []).filter((_, i) => i !== idx),
    }));
  };

  // Benefits
  const addBenefit = () => {
    setFormData((p) => ({ ...p, benefits: [...(p.benefits || []), ''] }));
  };
  const updateBenefit = (idx, value) => {
    setFormData((p) => ({
      ...p,
      benefits: (p.benefits || []).map((x, i) => (i === idx ? value : x)),
    }));
  };
  const removeBenefit = (idx) => {
    setFormData((p) => ({
      ...p,
      benefits: (p.benefits || []).filter((_, i) => i !== idx),
    }));
  };

  // Steps
  const addStep = () => {
    setFormData((p) => ({
      ...p,
      steps: [
        ...(p.steps || []),
        {
          number: (p.steps?.length || 0) + 1,
          icon: '/images/hire/h1.png',
          title: '',
          description: '',
        },
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

  // Service cards
  const addServiceCard = () => {
    setFormData((p) => ({
      ...p,
      services: [
        ...(p.services || []),
        {
          title: '',
          iconKey: 'BsTransparency',
          description: '',
          bg: 'from-sky-500 to-sky-600',
          textDark: false,
        },
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
    setFormData((p) => ({
      ...p,
      services: (p.services || []).filter((_, i) => i !== idx),
    }));
  };

  // Services provided
  const addMoreService = () => {
    setFormData((p) => ({
      ...p,
      moreServices: [
        ...(p.moreServices || []),
        { title: '', iconKey: 'FaCogs', description: '' },
      ],
    }));
  };
  const updateMoreService = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      moreServices: (p.moreServices || []).map((x, i) =>
        i === idx ? { ...x, ...patch } : x,
      ),
    }));
  };
  const removeMoreService = (idx) => {
    setFormData((p) => ({
      ...p,
      moreServices: (p.moreServices || []).filter((_, i) => i !== idx),
    }));
  };

  // Profile features
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
        profileFeatures: (p.profileSection?.profileFeatures || []).map(
          (x, i) => (i === idx ? value : x),
        ),
      },
    }));
  };
  const removeProfileFeature = (idx) => {
    setFormData((p) => ({
      ...p,
      profileSection: {
        ...p.profileSection,
        profileFeatures: (p.profileSection?.profileFeatures || []).filter(
          (_, i) => i !== idx,
        ),
      },
    }));
  };

  // Comparison rows
  const addComparisonRow = () => {
    setFormData((p) => ({
      ...p,
      comparisonSection: {
        ...p.comparisonSection,
        rows: [
          ...(p.comparisonSection?.rows || []),
          {
            category: '',
            softkingo: {
              iconKey: 'FaCheckCircle',
              text: '',
              highlight: true,
            },
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
        rows: (p.comparisonSection?.rows || []).map((x, i) =>
          i === idx ? { ...x, ...patch } : x,
        ),
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

  // Models
  const addModel = () => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: [
          ...(p.modelsSection?.models || []),
          {
            title: '',
            iconKey: 'CiClock1',
            description: '',
            features: [],
            buttonText: 'Hire Now',
          },
        ],
      },
    }));
  };
  const updateModel = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      modelsSection: {
        ...p.modelsSection,
        models: (p.modelsSection?.models || []).map((x, i) =>
          i === idx ? { ...x, ...patch } : x,
        ),
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
          i === modelIdx
            ? { ...m, features: [...(m.features || []), ''] }
            : m,
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
          return {
            ...m,
            features: (m.features || []).map((f, j) =>
              j === featIdx ? value : f,
            ),
          };
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
          return {
            ...m,
            features: (m.features || []).filter((_, j) => j !== featIdx),
          };
        }),
      },
    }));
  };

  // Why hire
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
        items: (p.whyHireSection?.items || []).map((x, i) =>
          i === idx ? { ...x, ...patch } : x,
        ),
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

  // Business types
  const addBusinessType = () => {
    setFormData((p) => ({
      ...p,
      businessTypesSection: {
        ...p.businessTypesSection,
        items: [
          ...(p.businessTypesSection?.items || []),
          { title: '', description: '', image: '' },
        ],
      },
    }));
  };
  const updateBusinessType = (idx, patch) => {
    setFormData((p) => ({
      ...p,
      businessTypesSection: {
        ...p.businessTypesSection,
        items: (p.businessTypesSection?.items || []).map((x, i) =>
          i === idx ? { ...x, ...patch } : x,
        ),
      },
    }));
  };
  const removeBusinessType = (idx) => {
    setFormData((p) => ({
      ...p,
      businessTypesSection: {
        ...p.businessTypesSection,
        items: (p.businessTypesSection?.items || []).filter(
          (_, i) => i !== idx,
        ),
      },
    }));
  };

  // Pricing
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
        plans: (p.pricingSection?.plans || []).map((x, i) =>
          i === idx ? { ...x, ...patch } : x,
        ),
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
          i === planIdx
            ? { ...pl, features: [...(pl.features || []), ''] }
            : pl,
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
          return {
            ...pl,
            features: (pl.features || []).map((f, j) =>
              j === featIdx ? value : f,
            ),
          };
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
          return {
            ...pl,
            features: (pl.features || []).filter((_, j) => j !== featIdx),
          };
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

      const res = await fetch(`/api/admin/pages/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/hire');
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data?.error || 'Failed to update hire page.');
    } catch (err) {
      console.error('Update error:', err);
      setError('Error updating hire page.');
    } finally {
      setSaving(false);
    }
  };

  // --- small component: image input + preview ---
  const ImageField = ({ label, value, onChange, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-3 items-start">
        <div className="w-20 h-20 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
        />
      </div>
    </div>
  );

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
                  Edit Hire Page
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Update layout, images and JSON content.
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
                View Live
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving || !formData.title}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Updating...' : 'Update Hire Page'}
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
                  activeTab === tab.id
                    ? 'text-cyan-600'
                    : 'text-slate-600 hover:text-slate-900'
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
              <p className="text-sm font-semibold text-rose-900">
                Could not update
              </p>
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
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setField('title', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Slug
                  </label>
                  <div className="mt-1 flex items-stretch gap-2">
                    <div className="flex flex-1 rounded-lg shadow-sm overflow-hidden">
                      <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 bg-slate-50 text-sm text-slate-500">
                        /hire/
                      </span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setField('slug', e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 border border-slate-300 rounded-r-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                      title={slugLocked ? 'Slug locked' : 'Slug editable'}
                    >
                      {slugLocked ? (
                        <>
                          <Lock className="w-4 h-4" /> Locked
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" /> Free
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
                <label className="block text-sm font-medium text-slate-700">
                  Key (identifier)
                </label>
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                          footerFormSection: {
                            ...(p.footerFormSection || {}),
                            enabled: e.target.checked,
                          },
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
                    <label className="block text-sm font-medium text-slate-700">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      name="heroTitle"
                      value={formData.heroTitle}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Avg Hiring Time
                      </label>
                      <input
                        type="text"
                        value={formData.metrics.avgTime}
                        onChange={(e) =>
                          handleMetricsChange('avgTime', e.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Developers Network
                      </label>
                      <input
                        type="text"
                        value={formData.metrics.network}
                        onChange={(e) =>
                          handleMetricsChange('network', e.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Rating
                      </label>
                      <input
                        type="text"
                        value={formData.metrics.rating}
                        onChange={(e) =>
                          handleMetricsChange('rating', e.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <ImageField
                  label="Hero Background Image"
                  value={formData.heroBg}
                  onChange={(val) => setField('heroBg', val)}
                  placeholder="/images/hire/hire1.png"
                />
              </div>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === 'content' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  About Section Title
                </label>
                <input
                  type="text"
                  name="aboutTitle"
                  value={formData.aboutTitle}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  About Subtitle
                </label>
                <textarea
                  name="aboutSubtitle"
                  value={formData.aboutSubtitle}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* BLOCKS (features/benefits/steps) */}
          {activeTab === 'blocks' && (
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Features (Top Cards)
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Shown in the card grid under hero.
                    </p>
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
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          Feature #{idx + 1}
                        </p>

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
                          <label className="block text-xs font-medium text-slate-600">
                            Title
                          </label>
                          <input
                            value={f.title}
                            onChange={(e) =>
                              updateFeature(idx, { title: e.target.value })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">
                            Description
                          </label>
                          <input
                            value={f.description}
                            onChange={(e) =>
                              updateFeature(idx, {
                                description: e.target.value,
                              })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">
                            Icon
                          </label>
                          <select
                            value={f.iconKey || 'FaUser'}
                            onChange={(e) =>
                              updateFeature(idx, { iconKey: e.target.value })
                            }
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
                    <p className="text-sm text-slate-500 mt-1">
                      Shown as bullet list in about section.
                    </p>
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
                    <h3 className="text-lg font-bold text-slate-900">
                      Steps (How to hire)
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      4-step process section.
                    </p>
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
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          Step #{s.number}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeStep(idx)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <ImageField
                          label="Icon path"
                          value={s.icon}
                          onChange={(val) =>
                            updateStep(idx, { icon: val })
                          }
                          placeholder="/images/hire/h1.png"
                        />

                        <div>
                          <label className="block text-xs font-medium text-slate-600">
                            Title
                          </label>
                          <input
                            value={s.title}
                            onChange={(e) =>
                              updateStep(idx, { title: e.target.value })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">
                            Description
                          </label>
                          <textarea
                            value={s.description}
                            onChange={(e) =>
                              updateStep(idx, {
                                description: e.target.value,
                              })
                            }
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

          {/* SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Service cards */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Service Cards
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Developers as a service section.
                    </p>
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
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          Card #{idx + 1}
                        </p>
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
                          <label className="block text-xs font-medium text-slate-600">
                            Title
                          </label>
                          <input
                            value={s.title}
                            onChange={(e) =>
                              updateServiceCard(idx, { title: e.target.value })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600">
                            Icon
                          </label>
                          <select
                            value={s.iconKey || 'BsTransparency'}
                            onChange={(e) =>
                              updateServiceCard(idx, {
                                iconKey: e.target.value,
                              })
                            }
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
                          <label className="block text-xs font-medium text-slate-600">
                            Gradient classes
                          </label>
                          <input
                            value={s.bg}
                            onChange={(e) =>
                              updateServiceCard(idx, { bg: e.target.value })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            placeholder="from-sky-500 to-sky-600"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">
                            Description
                          </label>
                          <input
                            value={s.description}
                            onChange={(e) =>
                              updateServiceCard(idx, {
                                description: e.target.value,
                              })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-1">
                          <input
                            type="checkbox"
                            checked={!!s.textDark}
                            onChange={(e) =>
                              updateServiceCard(idx, {
                                textDark: e.target.checked,
                              })
                            }
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
                    <h3 className="text-lg font-bold text-slate-900">
                      Services Provided
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      List + detail cards.
                    </p>
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
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          Item #{idx + 1}
                        </p>
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
                          <label className="block text-xs font-medium text-slate-600">
                            Title
                          </label>
                          <input
                            value={s.title}
                            onChange={(e) =>
                              updateMoreService(idx, { title: e.target.value })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600">
                            Icon key (react-icons)
                          </label>
                          <input
                            value={s.iconKey || ''}
                            onChange={(e) =>
                              updateMoreService(idx, {
                                iconKey: e.target.value,
                              })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            placeholder="e.g. FaCogs"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-600">
                            Description
                          </label>
                          <textarea
                            value={s.description}
                            onChange={(e) =>
                              updateMoreService(idx, {
                                description: e.target.value,
                              })
                            }
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
                  onChange={(e) =>
                    toggleNested('profileSection.enabled', e.target.checked)
                  }
                />
                Enable profile section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    value={formData.profileSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: {
                          ...p.profileSection,
                          title: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Subtitle
                  </label>
                  <input
                    value={formData.profileSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        profileSection: {
                          ...p.profileSection,
                          subtitle: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ImageField
                  label="Left image"
                  value={formData.profileSection?.images?.leftTop}
                  onChange={(val) =>
                    setFormData((p) => ({
                      ...p,
                      profileSection: {
                        ...p.profileSection,
                        images: {
                          ...(p.profileSection?.images || {}),
                          leftTop: val,
                        },
                      },
                    }))
                  }
                  placeholder="/images/hire/h7.png"
                />
                <ImageField
                  label="Right top"
                  value={formData.profileSection?.images?.rightTop}
                  onChange={(val) =>
                    setFormData((p) => ({
                      ...p,
                      profileSection: {
                        ...p.profileSection,
                        images: {
                          ...(p.profileSection?.images || {}),
                          rightTop: val,
                        },
                      },
                    }))
                  }
                  placeholder="/images/hire/h6.png"
                />
                <ImageField
                  label="Right bottom"
                  value={formData.profileSection?.images?.rightBottom}
                  onChange={(val) =>
                    setFormData((p) => ({
                      ...p,
                      profileSection: {
                        ...p.profileSection,
                        images: {
                          ...(p.profileSection?.images || {}),
                          rightBottom: val,
                        },
                      },
                    }))
                  }
                  placeholder="/images/hire/h5.png"
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    Profile Features
                  </p>
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
                  {(formData.profileSection?.profileFeatures || []).map(
                    (f, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          value={f}
                          onChange={(e) =>
                            updateProfileFeature(idx, e.target.value)
                          }
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
                    ),
                  )}
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
                  onChange={(e) =>
                    toggleNested('ctaBanner.enabled', e.target.checked)
                  }
                />
                Enable CTA banner
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    value={formData.ctaBanner?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        ctaBanner: { ...p.ctaBanner, title: e.target.value },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Button Text
                  </label>
                  <input
                    value={formData.ctaBanner?.buttonText || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        ctaBanner: {
                          ...p.ctaBanner,
                          buttonText: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Button Href
                  </label>
                  <input
                    value={formData.ctaBanner?.buttonHref || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        ctaBanner: {
                          ...p.ctaBanner,
                          buttonHref: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <ImageField
                  label="CTA Image"
                  value={formData.ctaBanner?.image}
                  onChange={(val) =>
                    setFormData((p) => ({
                      ...p,
                      ctaBanner: { ...p.ctaBanner, image: val },
                    }))
                  }
                  placeholder="/images/consultant.png"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Subtitle
                  </label>
                  <textarea
                    value={formData.ctaBanner?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        ctaBanner: {
                          ...p.ctaBanner,
                          subtitle: e.target.value,
                        },
                      }))
                    }
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
                  onChange={(e) =>
                    toggleNested(
                      'comparisonSection.enabled',
                      e.target.checked,
                    )
                  }
                />
                Enable comparison section
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  value={formData.comparisonSection?.title || ''}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      comparisonSection: {
                        ...p.comparisonSection,
                        title: e.target.value,
                      },
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
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        Row #{idx + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeComparisonRow(idx)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium text-slate-600">
                        Category
                      </label>
                      <input
                        value={row.category || ''}
                        onChange={(e) =>
                          updateComparisonRow(idx, {
                            category: e.target.value,
                          })
                        }
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {['softkingo', 'recruiting', 'outsourcing'].map(
                        (col) => (
                          <div
                            key={col}
                            className="border border-slate-200 rounded-lg p-3"
                          >
                            <p className="text-xs font-semibold text-slate-800 capitalize">
                              {col}
                            </p>

                            <label className="block text-xs font-medium text-slate-600 mt-2">
                              Icon
                            </label>
                            <select
                              value={row[col]?.iconKey || 'FaCheckCircle'}
                              onChange={(e) =>
                                updateComparisonCell(idx, col, {
                                  iconKey: e.target.value,
                                })
                              }
                              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan-500"
                            >
                              {STATUS_ICON_OPTIONS.map((o) => (
                                <option key={o.key} value={o.key}>
                                  {o.label} ({o.key})
                                </option>
                              ))}
                            </select>

                            <label className="block text-xs font-medium text-slate-600 mt-2">
                              Text
                            </label>
                            <input
                              value={row[col]?.text || ''}
                              onChange={(e) =>
                                updateComparisonCell(idx, col, {
                                  text: e.target.value,
                                })
                              }
                              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                            />

                            {col === 'softkingo' && (
                              <label className="flex items-center gap-2 text-sm text-slate-700 mt-2">
                                <input
                                  type="checkbox"
                                  checked={!!row.softkingo?.highlight}
                                  onChange={(e) =>
                                    updateComparisonCell(idx, 'softkingo', {
                                      highlight: e.target.checked,
                                    })
                                  }
                                />
                                Highlight cell
                              </label>
                            )}
                          </div>
                        ),
                      )}
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
                  onChange={(e) =>
                    toggleNested('modelsSection.enabled', e.target.checked)
                  }
                />
                Enable models section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    value={formData.modelsSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        modelsSection: {
                          ...p.modelsSection,
                          title: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Subtitle
                  </label>
                  <input
                    value={formData.modelsSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        modelsSection: {
                          ...p.modelsSection,
                          subtitle: e.target.value,
                        },
                      }))
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
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        Model #{idx + 1}
                      </p>
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
                        <label className="block text-xs font-medium text-slate-600">
                          Title
                        </label>
                        <input
                          value={m.title || ''}
                          onChange={(e) =>
                            updateModel(idx, { title: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">
                          Icon
                        </label>
                        <select
                          value={m.iconKey || 'CiClock1'}
                          onChange={(e) =>
                            updateModel(idx, { iconKey: e.target.value })
                          }
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
                        <label className="block text-xs font-medium text-slate-600">
                          Button Text
                        </label>
                        <input
                          value={m.buttonText || ''}
                          onChange={(e) =>
                            updateModel(idx, { buttonText: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600">
                          Description
                        </label>
                        <textarea
                          value={m.description || ''}
                          onChange={(e) =>
                            updateModel(idx, { description: e.target.value })
                          }
                          rows={3}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          Features
                        </p>
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
                              onChange={(e) =>
                                updateModelFeature(idx, fi, e.target.value)
                              }
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
                  onChange={(e) =>
                    toggleNested('whyHireSection.enabled', e.target.checked)
                  }
                />
                Enable why hire section
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  value={formData.whyHireSection?.title || ''}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      whyHireSection: {
                        ...p.whyHireSection,
                        title: e.target.value,
                      },
                    }))
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
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        Item #{idx + 1}
                      </p>
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
                        <label className="block text-xs font-medium text-slate-600">
                          Title
                        </label>
                        <input
                          value={it.title || ''}
                          onChange={(e) =>
                            updateWhyHireItem(idx, { title: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">
                          Description
                        </label>
                        <input
                          value={it.desc || ''}
                          onChange={(e) =>
                            updateWhyHireItem(idx, { desc: e.target.value })
                          }
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
                  onChange={(e) =>
                    toggleNested(
                      'businessTypesSection.enabled',
                      e.target.checked,
                    )
                  }
                />
                Enable business types section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    value={formData.businessTypesSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        businessTypesSection: {
                          ...p.businessTypesSection,
                          title: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Subtitle
                  </label>
                  <input
                    value={formData.businessTypesSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        businessTypesSection: {
                          ...p.businessTypesSection,
                          subtitle: e.target.value,
                        },
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
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        Card #{idx + 1}
                      </p>
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
                        <label className="block text-xs font-medium text-slate-600">
                          Title
                        </label>
                        <input
                          value={it.title || ''}
                          onChange={(e) =>
                            updateBusinessType(idx, { title: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <ImageField
                        label="Image"
                        value={it.image}
                        onChange={(val) =>
                          updateBusinessType(idx, { image: val })
                        }
                        placeholder="/images/hire/h8.png"
                      />
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600">
                          Description
                        </label>
                        <textarea
                          value={it.description || ''}
                          onChange={(e) =>
                            updateBusinessType(idx, {
                              description: e.target.value,
                            })
                          }
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
                  onChange={(e) =>
                    toggleNested('pricingSection.enabled', e.target.checked)
                  }
                />
                Enable pricing section
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    value={formData.pricingSection?.title || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        pricingSection: {
                          ...p.pricingSection,
                          title: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Subtitle
                  </label>
                  <input
                    value={formData.pricingSection?.subtitle || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        pricingSection: {
                          ...p.pricingSection,
                          subtitle: e.target.value,
                        },
                      }))
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
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        Plan #{idx + 1}
                      </p>
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
                        <label className="block text-xs font-medium text-slate-600">
                          Title
                        </label>
                        <input
                          value={pl.title || ''}
                          onChange={(e) =>
                            updatePricingPlan(idx, { title: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">
                          Price
                        </label>
                        <input
                          value={pl.price || ''}
                          onChange={(e) =>
                            updatePricingPlan(idx, { price: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">
                          Price Note
                        </label>
                        <input
                          value={pl.priceNote || ''}
                          onChange={(e) =>
                            updatePricingPlan(idx, { priceNote: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          placeholder="month"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600">
                          Subtitle
                        </label>
                        <textarea
                          value={pl.subtitle || ''}
                          onChange={(e) =>
                            updatePricingPlan(idx, {
                              subtitle: e.target.value,
                            })
                          }
                          rows={3}
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">
                          Card Class
                        </label>
                        <input
                          value={pl.cardClass || ''}
                          onChange={(e) =>
                            updatePricingPlan(idx, { cardClass: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                          placeholder="bg-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600">
                          Button
                        </label>
                        <input
                          value={pl.buttonText || ''}
                          onChange={(e) =>
                            updatePricingPlan(idx, {
                              buttonText: e.target.value,
                            })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-1">
                        <input
                          type="checkbox"
                          checked={!!pl.featured}
                          onChange={(e) =>
                            updatePricingPlan(idx, { featured: e.target.checked })
                          }
                        />
                        Featured
                      </label>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          Plan Features
                        </p>
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
                              onChange={(e) =>
                                updatePricingFeature(idx, fi, e.target.value)
                              }
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
                <label className="block text-sm font-medium text-slate-700">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
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
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <ImageField
                label="SEO Image"
                value={formData.seoImage}
                onChange={(val) => setField('seoImage', val)}
                placeholder="https://..."
              />
            </div>
          )}

          {/* JSON */}
          {activeTab === 'json' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-slate-600" />
                  <p className="text-sm font-semibold text-slate-900">
                    contentJson preview
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(contentJsonString)
                  }
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
              View Live
            </button>

            <button
              type="submit"
              disabled={saving || !formData.title}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Updating...' : 'Update Hire Page'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
