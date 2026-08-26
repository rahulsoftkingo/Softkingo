// src/app/(admin)/admin/portfolio-ppc/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft, Save, Upload, Image as ImageIcon, Target, Users,
  FileText, Layout, TrendingUp, Search as SearchIcon,
  CheckCircle2, AlertCircle, Loader2, X, Plus, Trash2, Eye,
  Folder, FolderOpen, ZoomIn, ChevronRight, Home, BarChart3,
  Award, Megaphone, Wrench,
} from 'lucide-react';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FileText, mobileLabel: 'Basic' },
  { id: 'hero', label: 'Hero & Stats', icon: Target, mobileLabel: 'Hero' },
  { id: 'content', label: 'Overview & Solution', icon: Layout, mobileLabel: 'Content' },
  { id: 'platforms', label: 'Platforms & Tools', icon: Wrench, mobileLabel: 'Tools' },
  { id: 'performance', label: 'Performance', icon: BarChart3, mobileLabel: 'Perf' },
  { id: 'achievements', label: 'Achievements', icon: Award, mobileLabel: 'Wins' },
  { id: 'campaigns', label: 'Campaigns', icon: TrendingUp, mobileLabel: 'Camps' },
  { id: 'testimonial', label: 'Testimonial & Client', icon: Users, mobileLabel: 'Client' },
  { id: 'cta', label: 'CTA & Card', icon: Megaphone, mobileLabel: 'CTA' },
  { id: 'seo', label: 'SEO', icon: SearchIcon, mobileLabel: 'SEO' },
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

const DEFAULT_STAT = { icon: 'TrendingUp', value: '', label: '' };
const DEFAULT_METRIC = { label: '', value: '', change: '', direction: 'up' };
const DEFAULT_CAMPAIGN = { name: '', link: '', clicks: '', conversions: '', cpl: '', ctr: '', roas: '' };
const DEFAULT_PLATFORM = { name: '', icon: '' };
const DEFAULT_FEATURE = { icon: 'BarChart3', title: '', description: '' };


// Small reusable "labeled input" for compact array rows
const MiniInput = ({ label, value, onChange, placeholder, className = '' }) => (
  <div className={className}>
    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
      {label}
    </label>
    <input
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  </div>
);

function ImageUploadField({
  label,
  name,
  value,
  placeholder,
  uploadingField,
  onChange,
  onFileUpload,
  onBrowse,
  onPreview,
}) {
  const handleUpload = (e) => {
    if (typeof onFileUpload === "function") {
      onFileUpload(e, name);
    }
  };

  const handleBrowse = () => {
    if (typeof onBrowse === "function") {
      onBrowse(name);
    }
  };

  const handlePreview = () => {
    if (typeof onPreview === "function") {
      onPreview(value);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-slate-700">
        {label}
      </label>

      {/* Image URL */}
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">

        {/* 1. Upload from Device */}
        <label
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 cursor-pointer transition-colors"
        >
          {uploadingField === name ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="hidden xs:inline">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <Upload className="h-3 w-3" />
              <span className="hidden sm:inline">
                Upload
              </span>
              <span className="sm:hidden">
                📤
              </span>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploadingField === name}
          />
        </label>

        {/* 2. Browse from Public Folder */}
        <button
          type="button"
          onClick={handleBrowse}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 transition-colors"
        >
          <Folder className="h-3 w-3" />

          <span className="hidden sm:inline">
            Browse
          </span>

          <span className="sm:hidden">
            📁
          </span>
        </button>

        {/* 3. Preview */}
        {value && uploadingField !== name && (
          <>
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-[10px] sm:text-xs font-medium text-sky-700 transition-colors"
            >
              <ZoomIn className="h-3 w-3" />

              <span className="hidden sm:inline">
                Preview
              </span>

              <span className="sm:hidden">
                🔍
              </span>
            </button>

            {/* Thumbnail */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                <img
                  src={value}
                  alt={`${label || "Image"} preview`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function PortfolioPpcEditPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';

  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingField, setUploadingField] = useState(null);

  // Image browser modal state
  const [showImageBrowser, setShowImageBrowser] = useState(false);
  const [currentImageField, setCurrentImageField] = useState('');
  const [currentFolder, setCurrentFolder] = useState('');
  const [folderFiles, setFolderFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    // Basic
    slug: '',
    title: '',
    subtitle: '',
    category: '',
    status: 'draft',
    publishedAt: '',

    // Flat images / company
    heroBgImage: '',
    seoImage: '',
    companyLogo: '',
    companyDescription: '',

    // Hero
    heroBadge: 'PPC CASE STUDY',
    heroHeadline: 'How We Generated 4X More Leads with Lower Cost Using PPC',
    heroHighlight: 'Lower Cost',
    heroDescription: '',
    heroIndustry: '',
    heroDuration: '',
    heroServices: '',
    adPlatformName: 'Google Ads',
    adLabel: 'Ad',
    adHeadline: '',
    adUrl: '',
    adDescription: '',
    adCtaText: 'Book Now',
    adPreviewIcons: [
      { name: 'Search Ads', icon: 'Search' },
      { name: 'Display Ads', icon: 'Layout' },
      { name: 'Remarketing', icon: 'Repeat' },
      { name: 'Conversion Tracking', icon: 'Target' },
    ],
    heroStatCards: [
      { label: 'ROAS', value: '620%', icon: 'TrendingUp' },
      { label: 'Conversions', value: '1,248', icon: 'BarChart3' },
    ],
    statsBar: [
      { icon: 'TrendingUp', value: '4X', label: 'Increase in Leads' },
      { icon: 'ArrowDown', value: '52%', label: 'Decrease in CPL' },
      { icon: 'MousePointer', value: '68%', label: 'Increase in Clicks' },
      { icon: 'Users', value: '1,248', label: 'Total Conversions' },
      { icon: 'DollarSign', value: '620%', label: 'ROAS Achieved' },
      { icon: 'BarChart3', value: '180%', label: 'Increase in Revenue' },
    ],

    // Overview / Challenge / Solution
    overviewDescription: '',
    challengeTitle: 'The Challenge',
    challengeItems: [''],
    solutionTitle: 'Our Solution',
    solutionDescription: '',
    solutionItems: [''],

    // Platforms & Tools
    adPlatforms: [{ ...DEFAULT_PLATFORM }],
    tools: [{ ...DEFAULT_PLATFORM }],

    // Performance
    performanceTitle: 'Performance Overview',
    performanceDateRangeLabel: 'Last 3 Months',
    performanceChartData: 'Apr \'24,3200,1800,900\nMay \'24,6100,3600,1600\nJun \'24,9400,6200,2200',
    performanceMetrics: [
      { label: 'Clicks', value: '', change: '', direction: 'up' },
      { label: 'Impressions', value: '', change: '', direction: 'up' },
      { label: 'CTR', value: '', change: '', direction: 'up' },
      { label: 'Conversions', value: '', change: '', direction: 'up' },
      { label: 'CPL', value: '', change: '', direction: 'down' },
      { label: 'Cost', value: '', change: '', direction: 'down' },
    ],

    // Achievements
    achievementsTitle: 'Key Achievements',
    achievements: [
      { icon: 'TrendingUp', value: '', label: '' },
    ],

    // Campaigns
    campaignsTitle: 'Top Campaign Performance',
    campaigns: [{ ...DEFAULT_CAMPAIGN }],

    // Testimonial
    testimonialQuote: '',
    testimonialAvatar: '',
    testimonialName: '',
    testimonialDesignation: '',
    testimonialCompanyTag: '',

    // CTA
    nextStepsTitle: 'Next Steps',
    nextStepsDescription: '',
    nextStepsButtonText: 'Get Free Consultation',
    nextStepsButtonLink: '',
    bannerTitle: 'Ready to Get More Leads & Higher ROI?',
    bannerDescription: '',
    bannerButtonText: "Let's Talk",
    bannerButtonLink: '',
    ctaFeatures: [
      { icon: 'BarChart3', title: 'Data-Driven Strategy', description: 'Campaigns backed by data & insights' },
      { icon: 'FileText', title: 'Transparent Reporting', description: 'Real-time reports & clear insights' },
      { icon: 'Target', title: 'Measurable Results', description: 'Focus on ROI & business growth' },
      { icon: 'Users', title: 'Dedicated Support', description: 'Always here to support your growth' },
    ],

    // Portfolio card (listing preview)
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
    cardTag: '',

    // SEO
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    if (!isNew) fetchPortfolioPpc();
  }, [params.id]);

  useEffect(() => {
    if (showImageBrowser && currentFolder === '' && folderFiles.length === 0) {
      fetchFolderFiles('');
    }
  }, [showImageBrowser]);

  async function fetchPortfolioPpc() {
    setLoading(true);
    const res = await fetch(`/api/admin/portfolio-ppc/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      const hero = safeParse(data.heroJson, {});
      const overview = safeParse(data.projectOverviewJson, {});
      const challenge = safeParse(data.challengeJson, {});
      const solution = safeParse(data.solutionJson, {});
      const adPlatforms = safeParse(data.adPlatformsJson, {});
      const tools = safeParse(data.toolsJson, {});
      const performance = safeParse(data.performanceJson, {});
      const achievements = safeParse(data.achievementsJson, {});
      const campaigns = safeParse(data.campaignsJson, {});
      const testimonial = safeParse(data.testimonialJson, {});
      const ctaBanner = safeParse(data.ctaBannerJson, {});
      const card = safeParse(data.portfolioCardContent, {});

      setForm((prev) => ({
        ...prev,
        slug: data.slug || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        category: data.category || '',
        status: data.status || 'draft',
        publishedAt: data.publishedAt ? data.publishedAt.slice(0, 10) : '',

        heroBgImage: data.heroBgImage || '',
        seoImage: data.seoImage || '',
        companyLogo: data.companyLogo || '',
        companyDescription: data.companyDescription || '',

        heroBadge: hero.badge || prev.heroBadge,
        heroHeadline: hero.headline || prev.heroHeadline,
        heroHighlight: hero.highlight || prev.heroHighlight,
        heroDescription: hero.description || '',
        heroIndustry: hero.industry || '',
        heroDuration: hero.duration || '',
        heroServices: hero.services || '',
        adPlatformName: hero.adPreview?.platformName || prev.adPlatformName,
        adLabel: hero.adPreview?.label || prev.adLabel,
        adHeadline: hero.adPreview?.headline || '',
        adUrl: hero.adPreview?.url || '',
        adDescription: hero.adPreview?.description || '',
        adCtaText: hero.adPreview?.ctaText || prev.adCtaText,
        adPreviewIcons: hero.adPreview?.icons?.length ? hero.adPreview.icons : prev.adPreviewIcons,
        heroStatCards: hero.statCards?.length ? hero.statCards : prev.heroStatCards,
        statsBar: hero.statsBar?.length ? hero.statsBar : prev.statsBar,

        overviewDescription: overview.description || '',

        challengeTitle: challenge.title || prev.challengeTitle,
        challengeItems: challenge.items?.length ? challenge.items : [''],

        solutionTitle: solution.title || prev.solutionTitle,
        solutionDescription: solution.description || '',
        solutionItems: solution.items?.length ? solution.items : [''],

        adPlatforms: adPlatforms.items?.length ? adPlatforms.items : [{ ...DEFAULT_PLATFORM }],
        tools: tools.items?.length ? tools.items : [{ ...DEFAULT_PLATFORM }],

        performanceTitle: performance.title || prev.performanceTitle,
        performanceDateRangeLabel: performance.dateRangeLabel || prev.performanceDateRangeLabel,
        performanceChartData: performance.chartData || prev.performanceChartData,
        performanceMetrics: performance.metrics?.length ? performance.metrics : prev.performanceMetrics,

        achievementsTitle: achievements.title || prev.achievementsTitle,
        achievements: achievements.items?.length ? achievements.items : [{ ...DEFAULT_STAT }],

        campaignsTitle: campaigns.title || prev.campaignsTitle,
        campaigns: campaigns.items?.length ? campaigns.items : [{ ...DEFAULT_CAMPAIGN }],

        testimonialQuote: testimonial.quote || '',
        testimonialAvatar: testimonial.avatar || '',
        testimonialName: testimonial.name || '',
        testimonialDesignation: testimonial.designation || '',
        testimonialCompanyTag: testimonial.companyTag || '',

        nextStepsTitle: ctaBanner.nextStepsTitle || prev.nextStepsTitle,
        nextStepsDescription: ctaBanner.nextStepsDescription || '',
        nextStepsButtonText: ctaBanner.nextStepsButtonText || prev.nextStepsButtonText,
        nextStepsButtonLink: ctaBanner.nextStepsButtonLink || '',
        bannerTitle: ctaBanner.bannerTitle || prev.bannerTitle,
        bannerDescription: ctaBanner.bannerDescription || '',
        bannerButtonText: ctaBanner.bannerButtonText || prev.bannerButtonText,
        bannerButtonLink: ctaBanner.bannerButtonLink || '',
        ctaFeatures: ctaBanner.features?.length ? ctaBanner.features : prev.ctaFeatures,

        cardTitle: card.title || '',
        cardDescription: card.description || '',
        cardImage: card.image || '',
        cardTag: card.tag || '',

        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
      }));
    }
    setLoading(false);
  }

  // Generic nested updater e.g. "campaigns.0.clicks" or "statsBar.2.value"
  const updateFormValue = (path, value) => {
    setForm((prev) => {
      const parts = path.split('.');
      if (parts.length === 1) return { ...prev, [path]: value };
      if (parts.length === 3) {
        const [arrayField, indexStr, subField] = parts;
        const index = parseInt(indexStr);
        if (!isNaN(index) && Array.isArray(prev[arrayField])) {
          const copy = [...prev[arrayField]];
          copy[index] = { ...copy[index], [subField]: value };
          return { ...prev, [arrayField]: copy };
        }
      }
      return prev;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setSuccess('');
    updateFormValue(name, value);
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    setError('');

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'portfolio-ppc');
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      updateFormValue(fieldName, data.url);
      setSuccess('Image uploaded!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      e.target.value = '';
      setUploadingField(null);
    }
  };

  async function fetchFolderFiles(folder = '') {
    setLoadingFiles(true);
    try {
      const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
      if (res.ok) {
        const data = await res.json();
        setFolderFiles(data.files || []);
      }
    } catch (err) {
      console.error('Failed to fetch files:', err);
      setFolderFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  }

  const openImageBrowser = (fieldName) => {
    setCurrentImageField(fieldName);
    setCurrentFolder('');
    setSearchQuery('');
    setShowImageBrowser(true);
    fetchFolderFiles('');
  };

  const navigateToFolder = (folderPath) => {
    setCurrentFolder(folderPath);
    setSearchQuery('');
    fetchFolderFiles(folderPath);
  };

  const goToParentFolder = () => {
    const parts = currentFolder.split('/').filter(Boolean);
    parts.pop();
    navigateToFolder(parts.join('/'));
  };

  const selectImageFromBrowser = (imagePath) => {
    updateFormValue(currentImageField, imagePath);
    setShowImageBrowser(false);
    setSuccess('Image selected!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const filteredFiles = folderFiles.filter((file) => {
    if (!searchQuery) return true;
    return file.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const folders = filteredFiles.filter((f) => f.isDir);
  const images = filteredFiles.filter((f) => !f.isDir && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f.name));

  // ---- Generic array helpers (used across many tabs) ----
  const addArrayItem = (field, template) =>
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] || []), { ...template }] }));

  const removeArrayItem = (field, index) =>
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const updateArrayItem = (field, index, subField, value) =>
    setForm((prev) => {
      const copy = [...prev[field]];
      copy[index] = { ...copy[index], [subField]: value };
      return { ...prev, [field]: copy };
    });

  // Plain string list helpers (challengeItems / solutionItems)
  const addStringItem = (field) =>
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] || []), ''] }));

  const updateStringItem = (field, index, value) =>
    setForm((prev) => {
      const copy = [...prev[field]];
      copy[index] = value;
      return { ...prev, [field]: copy };
    });

  const removeStringItem = (field, index) =>
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  // ---- JSON builders ----
  function buildHeroJson() {
    return JSON.stringify({
      badge: form.heroBadge,
      headline: form.heroHeadline,
      highlight: form.heroHighlight,
      description: form.heroDescription,
      industry: form.heroIndustry,
      duration: form.heroDuration,
      services: form.heroServices,
      adPreview: {
        platformName: form.adPlatformName,
        label: form.adLabel,
        headline: form.adHeadline,
        url: form.adUrl,
        description: form.adDescription,
        ctaText: form.adCtaText,
        icons: form.adPreviewIcons,
      },
      statCards: form.heroStatCards,
      statsBar: form.statsBar,
    });
  }

  function buildProjectOverviewJson() {
    return JSON.stringify({ description: form.overviewDescription });
  }

  function buildChallengeJson() {
    return JSON.stringify({
      title: form.challengeTitle,
      items: (form.challengeItems || []).filter(Boolean),
    });
  }

  function buildSolutionJson() {
    return JSON.stringify({
      title: form.solutionTitle,
      description: form.solutionDescription,
      items: (form.solutionItems || []).filter(Boolean),
    });
  }

  function buildAdPlatformsJson() {
    return JSON.stringify({ items: (form.adPlatforms || []).filter((p) => p.name) });
  }

  function buildToolsJson() {
    return JSON.stringify({ items: (form.tools || []).filter((t) => t.name) });
  }

  function buildPerformanceJson() {
    return JSON.stringify({
      title: form.performanceTitle,
      dateRangeLabel: form.performanceDateRangeLabel,
      chartData: form.performanceChartData,
      metrics: form.performanceMetrics,
    });
  }

  function buildAchievementsJson() {
    return JSON.stringify({
      title: form.achievementsTitle,
      items: form.achievements,
    });
  }

  function buildCampaignsJson() {
    return JSON.stringify({
      title: form.campaignsTitle,
      items: (form.campaigns || []).filter((c) => c.name),
    });
  }

  function buildTestimonialJson() {
    return JSON.stringify({
      quote: form.testimonialQuote,
      avatar: form.testimonialAvatar,
      name: form.testimonialName,
      designation: form.testimonialDesignation,
      companyTag: form.testimonialCompanyTag,
    });
  }

  function buildCtaBannerJson() {
    return JSON.stringify({
      nextStepsTitle: form.nextStepsTitle,
      nextStepsDescription: form.nextStepsDescription,
      nextStepsButtonText: form.nextStepsButtonText,
      nextStepsButtonLink: form.nextStepsButtonLink,
      bannerTitle: form.bannerTitle,
      bannerDescription: form.bannerDescription,
      bannerButtonText: form.bannerButtonText,
      bannerButtonLink: form.bannerButtonLink,
      features: form.ctaFeatures,
    });
  }

  function buildPortfolioCardJson() {
    return JSON.stringify({
      title: form.cardTitle,
      description: form.cardDescription,
      image: form.cardImage,
      tag: form.cardTag,
    });
  }

  async function handleSave() {
    if (!form.slug || !form.title) {
      setError('Slug and title are required');
      setActiveTab('basic');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    const url = isNew
      ? '/api/admin/portfolio-ppc'
      : `/api/admin/portfolio-ppc/${params.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      category: form.category || null,
      status: form.status,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
      heroBgImage: form.heroBgImage || null,
      seoImage: form.seoImage || null,
      companyLogo: form.companyLogo || null,
      companyDescription: form.companyDescription || null,
      heroJson: buildHeroJson(),
      projectOverviewJson: buildProjectOverviewJson(),
      challengeJson: buildChallengeJson(),
      solutionJson: buildSolutionJson(),
      adPlatformsJson: buildAdPlatformsJson(),
      toolsJson: buildToolsJson(),
      performanceJson: buildPerformanceJson(),
      achievementsJson: buildAchievementsJson(),
      campaignsJson: buildCampaignsJson(),
      testimonialJson: buildTestimonialJson(),
      ctaBannerJson: buildCtaBannerJson(),
      portfolioCardContent: buildPortfolioCardJson(),
      seoTitle: form.seoTitle || null,
      seoDescription: form.seoDescription || null,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save');
      setSaving(false);
      return;
    }

    setSaving(false);
    setSuccess('Saved successfully!');
    // setTimeout(() => {
    //   router.push('/admin/portfolio-ppc');
    // }, 1000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 animate-spin" />
          <p className="text-xs sm:text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }




  const ImageBrowserModal = () => {
    if (!showImageBrowser) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-slate-50 flex-shrink-0">
            <div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-900">
                Browse Images
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500 mt-0.5">
                Select an image from public folder
              </p>
            </div>
            <button
              onClick={() => setShowImageBrowser(false)}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            </button>
          </div>

          <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-slate-200 bg-slate-50 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
              <button
                onClick={() => navigateToFolder('')}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white transition-colors flex-shrink-0"
              >
                <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">Root</span>
              </button>
              {currentFolder.split('/').filter(Boolean).map((part, idx, arr) => (
                <div key={idx} className="flex items-center gap-1 flex-shrink-0">
                  <ChevronRight className="h-3 w-3 text-slate-400" />
                  <button
                    onClick={() => navigateToFolder(arr.slice(0, idx + 1).join('/'))}
                    className="px-2 py-1 rounded hover:bg-white transition-colors text-slate-700 hover:text-slate-900"
                  >
                    {part}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-slate-200 flex-shrink-0">
            <div className="relative">
              <SearchIcon className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images..."
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-5 overflow-y-auto flex-1">
            {loadingFiles ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {folders.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      <span>Folders ({folders.length})</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                      {folders.map((folder, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigateToFolder(folder.path)}
                          className="group flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                        >
                          <Folder className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500 group-hover:text-emerald-600" />
                          <span className="text-[10px] sm:text-xs text-slate-700 group-hover:text-slate-900 font-medium truncate w-full text-center">
                            {folder.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {images.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>Images ({images.length})</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectImageFromBrowser(img.path)}
                          className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-all bg-slate-50"
                        >
                          <img
                            src={img.path}
                            alt={img.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-2">
                            <p className="text-[9px] sm:text-[10px] text-white font-medium truncate w-full text-center">
                              {img.name}
                            </p>
                            <p className="text-[8px] sm:text-[9px] text-white/80">
                              {formatBytes(img.size)}
                            </p>
                          </div>
                          <div className="absolute top-1 right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!loadingFiles && folders.length === 0 && images.length === 0 && (
                  <div className="text-center py-12">
                    <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-xs sm:text-sm text-slate-500">No files found</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-xs text-emerald-600 hover:text-emerald-700"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 md:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              {currentFolder && (
                <button
                  onClick={goToParentFolder}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}
              <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                {folders.length + images.length} item{folders.length + images.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => setShowImageBrowser(false)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs sm:text-sm font-medium text-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ImagePreviewModal = () => {
    if (!imagePreview) return null;
    return (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
        onClick={() => setImagePreview(null)}
      >
        <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setImagePreview(null)}
            className="absolute -top-8 right-0 sm:-top-10 sm:-right-10 md:-top-12 md:-right-12 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </button>
          <div className="relative bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
            <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-[85vh] object-contain" />
            <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-t from-slate-900/90 to-transparent absolute bottom-0 left-0 right-0">
              <p className="text-[10px] xs:text-xs sm:text-sm text-white font-medium truncate">
                {imagePreview}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8 space-y-3 sm:space-y-4 lg:space-y-6">

        {/* Header */}
        <section className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={() => router.back()}
              className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 truncate">
                {isNew ? 'Create' : 'Edit'} PPC Case Study
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                {form.title || 'Untitled'}
                {form.status && (
                  <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${form.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    {form.status}
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all whitespace-nowrap"
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                <span className="hidden xs:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Save</span>
              </>
            )}
          </button>
        </section>

        {/* Alerts */}
        {error && (
          <div className="rounded-lg sm:rounded-xl bg-rose-50 border border-rose-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 shadow-sm">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-rose-900">Error</p>
              <p className="text-xs sm:text-sm text-rose-700 mt-0.5">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-rose-400 hover:text-rose-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 shadow-sm">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-emerald-900">Success</p>
              <p className="text-xs sm:text-sm text-emerald-700 mt-0.5">{success}</p>
            </div>
            <button onClick={() => setSuccess('')} className="text-emerald-400 hover:text-emerald-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Main Content */}
        <section className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">

          {/* Tabs */}
          <div className="border-b border-slate-200 bg-slate-50 overflow-hidden">
            <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeTab === tab.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 max-h-[calc(100vh-220px)] xs:max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-280px)] overflow-y-auto">

            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Basic Information
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Essential details about this PPC case study
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Slug <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      required
                      placeholder="urbandrive-car-rental-ppc"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1">
                      URL-friendly identifier
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Automotive / Lead Generation"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="UrbanDrive – Car Rental"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1">
                      Used in the breadcrumb: Home &gt; Our Work &gt; Case Studies &gt; {form.title || '...'}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Subtitle
                    </label>
                    <textarea
                      name="subtitle"
                      value={form.subtitle}
                      onChange={handleChange}
                      rows={2}
                      placeholder="A brief tagline..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Published Date
                    </label>
                    <input
                      type="date"
                      name="publishedAt"
                      value={form.publishedAt}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Hero & Stats Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Hero Section
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Headline, background, ad preview card, and the stat bar under the hero
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                  <ImageUploadField
                    label="Hero Background Image"
                    name="heroBgImage"
                    value={form.heroBgImage}
                    placeholder="/images/portfolio-ppc/urbandrive-hero-bg.jpg"
                  />
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Badge / Eyebrow
                    </label>
                    <input
                      name="heroBadge"
                      value={form.heroBadge}
                      onChange={handleChange}
                      placeholder="PPC CASE STUDY"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Headline
                    </label>
                    <textarea
                      name="heroHeadline"
                      value={form.heroHeadline}
                      onChange={handleChange}
                      rows={2}
                      placeholder="How We Generated 4X More Leads with Lower Cost Using PPC"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Highlighted Phrase
                    </label>
                    <input
                      name="heroHighlight"
                      value={form.heroHighlight}
                      onChange={handleChange}
                      placeholder="Lower Cost"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[9px] xs:text-[10px] text-slate-500 mt-1">
                      Must match a substring of the headline exactly — it will render in the accent color.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      name="heroDescription"
                      value={form.heroDescription}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Explore how our data-driven PPC campaigns helped UrbanDrive, a car rental service, increase leads..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  <MiniInput label="Industry" value={form.heroIndustry} onChange={(v) => updateFormValue('heroIndustry', v)} placeholder="Automotive" />
                  <MiniInput label="Duration" value={form.heroDuration} onChange={(v) => updateFormValue('heroDuration', v)} placeholder="3 Months" />
                  <MiniInput label="Services" value={form.heroServices} onChange={(v) => updateFormValue('heroServices', v)} placeholder="PPC Advertising" />
                </div>

                {/* Ad Preview Card */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Ad Preview Card</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MiniInput label="Platform Name" value={form.adPlatformName} onChange={(v) => updateFormValue('adPlatformName', v)} placeholder="Google Ads" />
                    <MiniInput label="'Ad' Label" value={form.adLabel} onChange={(v) => updateFormValue('adLabel', v)} placeholder="Ad" />
                    <MiniInput label="Ad Headline" value={form.adHeadline} onChange={(v) => updateFormValue('adHeadline', v)} placeholder="Book Self Drive Cars Online | UrbanDrive" />
                    <MiniInput label="Ad URL" value={form.adUrl} onChange={(v) => updateFormValue('adUrl', v)} placeholder="urbandrive.com" />
                    <div className="sm:col-span-2">
                      <MiniInput label="Ad Description" value={form.adDescription} onChange={(v) => updateFormValue('adDescription', v)} placeholder="Wide Range of Cars. Best Prices. Easy Booking. 24/7 Support." />
                    </div>
                    <MiniInput label="CTA Button Text" value={form.adCtaText} onChange={(v) => updateFormValue('adCtaText', v)} placeholder="Book Now" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700">
                        Ad Preview Icon Row (Search Ads / Display Ads / Remarketing / Conversion Tracking)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('adPreviewIcons', { name: '', icon: '' })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-medium"
                      >
                        <Plus className="h-3 w-3" /> Add
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {form.adPreviewIcons.map((icon, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <input
                            value={icon.name}
                            onChange={(e) => updateArrayItem('adPreviewIcons', idx, 'name', e.target.value)}
                            placeholder="Search Ads"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <input
                            value={icon.icon}
                            onChange={(e) => updateArrayItem('adPreviewIcons', idx, 'icon', e.target.value)}
                            placeholder="lucide icon name"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <button onClick={() => removeArrayItem('adPreviewIcons', idx)} className="text-rose-600 hover:text-rose-700 flex-shrink-0">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-2">
                      Mini Stat Cards Beside Ad Preview (ROAS / Conversions)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {form.heroStatCards.map((card, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <input
                            value={card.label}
                            onChange={(e) => updateArrayItem('heroStatCards', idx, 'label', e.target.value)}
                            placeholder="ROAS"
                            className="w-24 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <input
                            value={card.value}
                            onChange={(e) => updateArrayItem('heroStatCards', idx, 'value', e.target.value)}
                            placeholder="620%"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-emerald-900">
                      Stats Bar (the 6 highlight numbers directly under the hero)
                    </h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('statsBar', { ...DEFAULT_STAT })}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-medium"
                    >
                      <Plus className="h-3 w-3" /> Add Stat
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {form.statsBar.map((stat, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 relative group">
                        <button
                          onClick={() => removeArrayItem('statsBar', idx)}
                          className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                        <input
                          value={stat.icon}
                          onChange={(e) => updateArrayItem('statsBar', idx, 'icon', e.target.value)}
                          placeholder="Icon name (e.g. TrendingUp)"
                          className="w-full rounded border border-slate-200 px-2 py-1 text-[10px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <input
                          value={stat.value}
                          onChange={(e) => updateArrayItem('statsBar', idx, 'value', e.target.value)}
                          placeholder="4X"
                          className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <input
                          value={stat.label}
                          onChange={(e) => updateArrayItem('statsBar', idx, 'label', e.target.value)}
                          placeholder="Increase in Leads"
                          className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Overview & Solution Tab */}
            {activeTab === 'content' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Overview, Challenge & Solution
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    The left-column narrative content of the page
                  </p>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Project Overview</h4>
                  <textarea
                    value={form.overviewDescription}
                    onChange={(e) => updateFormValue('overviewDescription', e.target.value)}
                    rows={4}
                    placeholder="UrbanDrive wanted to increase quality leads and online bookings for their self-drive car rental service..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      value={form.challengeTitle}
                      onChange={(e) => updateFormValue('challengeTitle', e.target.value)}
                      className="text-xs sm:text-sm font-semibold text-rose-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                    />
                    <button
                      type="button"
                      onClick={() => addStringItem('challengeItems')}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white text-rose-700 hover:bg-rose-100 border border-rose-200 text-[10px] font-medium"
                    >
                      <Plus className="h-3 w-3" /> Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.challengeItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateStringItem('challengeItems', idx, e.target.value)}
                          placeholder="High cost per lead (CPL)"
                          className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <button onClick={() => removeStringItem('challengeItems', idx)} className="text-rose-600 hover:text-rose-700 flex-shrink-0">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3">
                  <input
                    value={form.solutionTitle}
                    onChange={(e) => updateFormValue('solutionTitle', e.target.value)}
                    className="text-xs sm:text-sm font-semibold text-emerald-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 block"
                  />
                  <textarea
                    value={form.solutionDescription}
                    onChange={(e) => updateFormValue('solutionDescription', e.target.value)}
                    rows={3}
                    placeholder="We built a data-driven PPC strategy focused on high-intent keywords, compelling ad copy..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] xs:text-xs font-medium text-slate-700">Solution Checklist</label>
                    <button
                      type="button"
                      onClick={() => addStringItem('solutionItems')}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-medium"
                    >
                      <Plus className="h-3 w-3" /> Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.solutionItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateStringItem('solutionItems', idx, e.target.value)}
                          placeholder="In-depth keyword research"
                          className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button onClick={() => removeStringItem('solutionItems', idx)} className="text-rose-600 hover:text-rose-700 flex-shrink-0">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Platforms & Tools Tab */}
            {activeTab === 'platforms' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Ad Platforms & Tools
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    "Ad Platforms Managed" and "Tools & Technologies" lists
                  </p>
                </div>

                {[
                  { field: 'adPlatforms', title: 'Ad Platforms Managed', hint: 'e.g. Google Ads, Facebook Ads' },
                  { field: 'tools', title: 'Tools & Technologies', hint: 'e.g. Google Analytics, SEMrush, Hotjar' },
                ].map(({ field, title, hint }) => (
                  <div key={field} className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{title}</h4>
                      <button
                        type="button"
                        onClick={() => addArrayItem(field, { ...DEFAULT_PLATFORM })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] font-medium"
                      >
                        <Plus className="h-3 w-3" /> Add
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">{hint}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {form[field].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <input
                            value={item.name}
                            onChange={(e) => updateArrayItem(field, idx, 'name', e.target.value)}
                            placeholder="Name"
                            className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                          <input
                            value={item.icon}
                            onChange={(e) => updateArrayItem(field, idx, 'icon', e.target.value)}
                            placeholder="/images/tech/icon.png"
                            className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                          {item.icon && (
                            <div className="h-6 w-6 rounded border border-slate-200 overflow-hidden bg-white flex-shrink-0">
                              <img src={item.icon} alt="" className="h-full w-full object-contain p-0.5" />
                            </div>
                          )}
                          <button onClick={() => removeArrayItem(field, idx)} className="text-rose-600 hover:text-rose-700 flex-shrink-0">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Performance Overview
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Chart data (Clicks / Conversions / Cost) and the six metric cards below it
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MiniInput label="Section Title" value={form.performanceTitle} onChange={(v) => updateFormValue('performanceTitle', v)} placeholder="Performance Overview" />
                  <MiniInput label="Date Range Label" value={form.performanceDateRangeLabel} onChange={(v) => updateFormValue('performanceDateRangeLabel', v)} placeholder="Last 3 Months" />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    Chart Data
                  </label>
                  <p className="text-[10px] text-slate-500 mb-2">
                    One row per point: <code className="bg-slate-100 px-1 rounded">month label, clicks, conversions, cost</code>
                  </p>
                  <textarea
                    value={form.performanceChartData}
                    onChange={(e) => updateFormValue('performanceChartData', e.target.value)}
                    rows={5}
                    placeholder={"Apr '24,3200,1800,900\nMay '24,6100,3600,1600\nJun '24,9400,6200,2200"}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Metric Cards</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {form.performanceMetrics.map((metric, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                        <input
                          value={metric.label}
                          onChange={(e) => updateArrayItem('performanceMetrics', idx, 'label', e.target.value)}
                          placeholder="Clicks"
                          className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <input
                          value={metric.value}
                          onChange={(e) => updateArrayItem('performanceMetrics', idx, 'value', e.target.value)}
                          placeholder="28.6K"
                          className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <div className="flex items-center gap-1.5">
                          <input
                            value={metric.change}
                            onChange={(e) => updateArrayItem('performanceMetrics', idx, 'change', e.target.value)}
                            placeholder="68%"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <select
                            value={metric.direction}
                            onChange={(e) => updateArrayItem('performanceMetrics', idx, 'direction', e.target.value)}
                            className="rounded border border-slate-200 px-1.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="up">▲ up (good)</option>
                            <option value="down">▼ down (good)</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                      Key Achievements
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                      A second highlight strip, shown further down the page
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('achievements', { ...DEFAULT_STAT })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Achievement
                  </button>
                </div>

                <MiniInput label="Section Title" value={form.achievementsTitle} onChange={(v) => updateFormValue('achievementsTitle', v)} placeholder="Key Achievements" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {form.achievements.map((item, idx) => (
                    <div key={idx} className="p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 relative group">
                      <button
                        onClick={() => removeArrayItem('achievements', idx)}
                        className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                      <input
                        value={item.icon}
                        onChange={(e) => updateArrayItem('achievements', idx, 'icon', e.target.value)}
                        placeholder="Icon name"
                        className="w-full rounded border border-slate-200 px-2 py-1 text-[10px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <input
                        value={item.value}
                        onChange={(e) => updateArrayItem('achievements', idx, 'value', e.target.value)}
                        placeholder="4X"
                        className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <input
                        value={item.label}
                        onChange={(e) => updateArrayItem('achievements', idx, 'label', e.target.value)}
                        placeholder="Increase in Leads"
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                      Top Campaign Performance
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                      The campaign breakdown table
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('campaigns', { ...DEFAULT_CAMPAIGN })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Campaign
                  </button>
                </div>

                <MiniInput label="Table Title" value={form.campaignsTitle} onChange={(v) => updateFormValue('campaignsTitle', v)} placeholder="Top Campaign Performance" />

                <div className="space-y-3">
                  {form.campaigns.map((c, idx) => (
                    <div key={idx} className="p-3 xs:p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 relative group">
                      <button
                        onClick={() => removeArrayItem('campaigns', idx)}
                        className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="col-span-2">
                          <MiniInput label="Campaign Name" value={c.name} onChange={(v) => updateArrayItem('campaigns', idx, 'name', v)} placeholder="Brand Campaign" />
                        </div>
                        <div className="col-span-2">
                          <MiniInput label="Link (optional)" value={c.link} onChange={(v) => updateArrayItem('campaigns', idx, 'link', v)} placeholder="https://ads.google.com/..." />
                        </div>
                        <MiniInput label="Clicks" value={c.clicks} onChange={(v) => updateArrayItem('campaigns', idx, 'clicks', v)} placeholder="6,254" />
                        <MiniInput label="Conversions" value={c.conversions} onChange={(v) => updateArrayItem('campaigns', idx, 'conversions', v)} placeholder="354" />
                        <MiniInput label="CPL" value={c.cpl} onChange={(v) => updateArrayItem('campaigns', idx, 'cpl', v)} placeholder="$8.26" />
                        <MiniInput label="CTR" value={c.ctr} onChange={(v) => updateArrayItem('campaigns', idx, 'ctr', v)} placeholder="6.91%" />
                        <MiniInput label="ROAS" value={c.roas} onChange={(v) => updateArrayItem('campaigns', idx, 'roas', v)} placeholder="712%" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial & Client Tab */}
            {activeTab === 'testimonial' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Testimonial & Client
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    "What Our Client Says" and the client's logo/branding
                  </p>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-purple-50 border border-purple-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-purple-900">Client Branding</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <ImageUploadField label="Company Logo" name="companyLogo" value={form.companyLogo} placeholder="/images/clients/urbandrive-logo.png" />
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                        Company Description / Tagline
                      </label>
                      <input
                        name="companyDescription"
                        value={form.companyDescription}
                        onChange={handleChange}
                        placeholder="SELF DRIVE CARS"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Testimonial</h4>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">
                      Quote
                    </label>
                    <textarea
                      value={form.testimonialQuote}
                      onChange={(e) => updateFormValue('testimonialQuote', e.target.value)}
                      rows={4}
                      placeholder="Softkingo's PPC strategy delivered outstanding results. We received 4X more leads..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs italic resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <ImageUploadField label="Reviewer Avatar" name="testimonialAvatar" value={form.testimonialAvatar} placeholder="/images/clients/rohit.jpg" />
                    <div className="space-y-3">
                      <MiniInput label="Name" value={form.testimonialName} onChange={(v) => updateFormValue('testimonialName', v)} placeholder="Rohit Malhotra" />
                      <MiniInput label="Designation" value={form.testimonialDesignation} onChange={(v) => updateFormValue('testimonialDesignation', v)} placeholder="Marketing Head, UrbanDrive" />
                      <MiniInput label="Company Tag (small label under name)" value={form.testimonialCompanyTag} onChange={(v) => updateFormValue('testimonialCompanyTag', v)} placeholder="UrbanDrive" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA & Card Tab */}
            {activeTab === 'cta' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    CTA Sections & Portfolio Card
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    "Next Steps" box, the bottom banner, and how this appears in listing grids
                  </p>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-sky-900">Next Steps Box</h4>
                  <MiniInput label="Title" value={form.nextStepsTitle} onChange={(v) => updateFormValue('nextStepsTitle', v)} placeholder="Next Steps" />
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Description</label>
                    <textarea
                      value={form.nextStepsDescription}
                      onChange={(e) => updateFormValue('nextStepsDescription', e.target.value)}
                      rows={2}
                      placeholder="Want similar results for your business? Let's create a high-performing PPC strategy..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MiniInput label="Button Text" value={form.nextStepsButtonText} onChange={(v) => updateFormValue('nextStepsButtonText', v)} placeholder="Get Free Consultation" />
                    <MiniInput label="Button Link" value={form.nextStepsButtonLink} onChange={(v) => updateFormValue('nextStepsButtonLink', v)} placeholder="/contact-us" />
                  </div>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-900/5 border border-slate-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Bottom Banner</h4>
                  <MiniInput label="Title" value={form.bannerTitle} onChange={(v) => updateFormValue('bannerTitle', v)} placeholder="Ready to Get More Leads & Higher ROI?" />
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Description</label>
                    <textarea
                      value={form.bannerDescription}
                      onChange={(e) => updateFormValue('bannerDescription', e.target.value)}
                      rows={2}
                      placeholder="Our PPC experts are ready to help you grow your business with result-driven advertising."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MiniInput label="Button Text" value={form.bannerButtonText} onChange={(v) => updateFormValue('bannerButtonText', v)} placeholder="Let's Talk" />
                    <MiniInput label="Button Link" value={form.bannerButtonLink} onChange={(v) => updateFormValue('bannerButtonLink', v)} placeholder="/contact-us" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 mt-2">
                      <label className="text-[10px] xs:text-xs font-medium text-slate-700">
                        Feature Row (Data-Driven Strategy / Transparent Reporting / etc.)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('ctaFeatures', { ...DEFAULT_FEATURE })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-[10px] font-medium"
                      >
                        <Plus className="h-3 w-3" /> Add Feature
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {form.ctaFeatures.map((f, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1.5 relative group">
                          <button
                            onClick={() => removeArrayItem('ctaFeatures', idx)}
                            className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                          <input
                            value={f.icon}
                            onChange={(e) => updateArrayItem('ctaFeatures', idx, 'icon', e.target.value)}
                            placeholder="Icon name"
                            className="w-full rounded border border-slate-200 px-2 py-1 text-[10px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                          <input
                            value={f.title}
                            onChange={(e) => updateArrayItem('ctaFeatures', idx, 'title', e.target.value)}
                            placeholder="Data-Driven Strategy"
                            className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                          <input
                            value={f.description}
                            onChange={(e) => updateArrayItem('ctaFeatures', idx, 'description', e.target.value)}
                            placeholder="Campaigns backed by data & insights"
                            className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-emerald-900">Portfolio Listing Card</h4>
                  <p className="text-[10px] text-slate-500">
                    How this case study appears as a card in the /our-work portfolio grid
                  </p>
                  <MiniInput label="Card Title" value={form.cardTitle} onChange={(v) => updateFormValue('cardTitle', v)} placeholder="4X More Leads for UrbanDrive" />
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Card Description</label>
                    <textarea
                      value={form.cardDescription}
                      onChange={(e) => updateFormValue('cardDescription', e.target.value)}
                      rows={2}
                      placeholder="How a data-driven PPC strategy cut cost-per-lead by 52%..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <ImageUploadField label="Card Thumbnail" name="cardImage" value={form.cardImage} placeholder="/images/portfolio-ppc/urbandrive-card.jpg" />
                  <MiniInput label="Card Tag" value={form.cardTag} onChange={(v) => updateFormValue('cardTag', v)} placeholder="PPC · Automotive" />
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    SEO & Meta Tags
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Optimize for search engines and social sharing
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      SEO Title
                    </label>
                    <input
                      name="seoTitle"
                      value={form.seoTitle}
                      onChange={handleChange}
                      placeholder="UrbanDrive PPC Case Study - 4X More Leads | Softkingo"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5">
                      {form.seoTitle.length}/60 characters (optimal: 50-60)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      SEO Description
                    </label>
                    <textarea
                      name="seoDescription"
                      value={form.seoDescription}
                      onChange={handleChange}
                      rows={3}
                      placeholder="See how we helped UrbanDrive generate 4X more leads and cut cost-per-lead by 52% with a data-driven PPC strategy..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5">
                      {form.seoDescription.length}/160 characters (optimal: 150-160)
                    </p>
                  </div>

                  <ImageUploadField
                    label="Social Share Image (OG Image)"
                    name="seoImage"
                    value={form.seoImage}
                    placeholder="/images/portfolio-ppc/urbandrive-og.jpg"
                    uploadingField={uploadingField}
                    onChange={handleChange}
                    onFileUpload={handleFileUpload}
                    onBrowse={openImageBrowser}
                    onPreview={setImagePreview}
                  />

                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200">
                    <h4 className="text-[10px] xs:text-xs font-semibold text-sky-900 mb-2 sm:mb-3">Google Search Preview</h4>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-blue-600 line-clamp-1">
                        {form.seoTitle || 'SEO Title Preview'}
                      </p>
                      <p className="text-[10px] xs:text-xs text-emerald-700 line-clamp-1">
                        yourwebsite.com/our-work/{form.slug || 'slug'}
                      </p>
                      <p className="text-[10px] xs:text-xs text-slate-600 line-clamp-2">
                        {form.seoDescription || 'SEO description preview...'}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2 sm:pt-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border-2 border-slate-200 bg-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>Preview PPC Case Study</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>

      {/* Modals */}
      <ImageBrowserModal />
      <ImagePreviewModal />

      {/* Global CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}