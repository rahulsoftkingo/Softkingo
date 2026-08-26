// src/app/(admin)/admin/portfolio-social-media/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft, Save, Upload, Image as ImageIcon, Target, Users,
  FileText, Layout, TrendingUp, Search as SearchIcon,
  CheckCircle2, AlertCircle, Loader2, X, Plus, Trash2, Eye,
  Folder, FolderOpen, ZoomIn, ChevronRight, Home, BarChart3,
  Award, Megaphone, Wrench, Share2, Heart,
} from 'lucide-react';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FileText, mobileLabel: 'Basic' },
  { id: 'hero', label: 'Hero & Social Preview', icon: Target, mobileLabel: 'Hero' },
  { id: 'content', label: 'Overview & Solution', icon: Layout, mobileLabel: 'Content' },
  { id: 'platforms', label: 'Platforms & Tools', icon: Wrench, mobileLabel: 'Tools' },
  { id: 'performance', label: 'Results Overview', icon: BarChart3, mobileLabel: 'Results' },
  { id: 'achievements', label: 'Achievements', icon: Award, mobileLabel: 'Wins' },
  { id: 'topcontent', label: 'Top Content', icon: Share2, mobileLabel: 'Content' },
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
const DEFAULT_PLATFORM = { name: '', icon: '' };
const DEFAULT_FEATURE = { icon: 'BarChart3', title: '', description: '' };
const DEFAULT_CONTENT_ITEM = { type: 'post', image: '', label: '', metricLabel: 'Engagement', metricValue: '' };

const CONTENT_TYPES = [
  { value: 'post', label: 'Post' },
  { value: 'reel', label: 'Reel' },
  { value: 'story', label: 'Story' },
];

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
      className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
    />
  </div>
);

function ImageUploadField({ label, name, value, placeholder, uploadingField, onChange, onFileUpload, onBrowse, onPreview }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-slate-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
      />

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 cursor-pointer transition-colors">
          {uploadingField === name ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="hidden xs:inline">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-3 w-3" />
              <span className="hidden sm:inline">Upload</span>
              <span className="sm:hidden">📤</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFileUpload(e, name)}
            disabled={uploadingField === name}
          />
        </label>

        <button
          type="button"
          onClick={() => onBrowse(name)}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 transition-colors"
        >
          <Folder className="h-3 w-3" />
          <span className="hidden sm:inline">Browse</span>
          <span className="sm:hidden">📁</span>
        </button>

        {value && uploadingField !== name && (
          <>
            <button
              type="button"
              onClick={() => onPreview(value)}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-fuchsia-300 bg-fuchsia-50 hover:bg-fuchsia-100 text-[10px] sm:text-xs font-medium text-fuchsia-700 transition-colors"
            >
              <ZoomIn className="h-3 w-3" />
              <span className="hidden sm:inline">Preview</span>
              <span className="sm:hidden">🔍</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                <img src={value} alt="preview" className="h-full w-full object-cover" />
              </div>
              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-fuchsia-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PortfolioSocialMediaEditPage() {
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
    heroBadge: 'SOCIAL MEDIA CASE STUDY',
    heroHeadline: 'How We Boosted Engagement by 300% on Social Platforms',
    heroHighlight: '300%',
    heroDescription: '',
    heroIndustry: '',
    heroDuration: '',
    heroServices: '',

    // Social preview card
    socialPlatformHandle: 'fitlife.nutrition',
    socialPlatformIcon: 'Instagram',
    socialPostImage: '',
    socialCaption: 'STRONGER EVERY DAY',
    socialLikes: '3,275',
    socialCtaText: 'View Post',

    // Platform icon row (Instagram / Facebook / TikTok circles beside hero image)
    platformIcons: [
      { name: 'Instagram', icon: 'Instagram' },
      { name: 'Facebook', icon: 'Facebook' },
      { name: 'TikTok', icon: 'Music2' },
    ],

    // "Brand Growth 300%" side card
    brandGrowthLabel: 'Brand Growth',
    brandGrowthValue: '300%',
    brandGrowthSubLabel: 'Engagement Increase',

    // 6-stat strip under hero
    statsBar: [
      { icon: 'Heart', value: '300%', label: 'Increase in Engagement' },
      { icon: 'Eye', value: '250%', label: 'Increase in Reach' },
      { icon: 'UserPlus', value: '9.5K+', label: 'New Followers Gained' },
      { icon: 'Send', value: '3X', label: 'Increase in Website Traffic' },
      { icon: 'BarChart3', value: '180%', label: 'Increase in Leads' },
      { icon: 'DollarSign', value: '280%', label: 'Increase in Conversions' },
    ],

    // Overview / Challenge / Solution
    overviewDescription: '',
    challengeTitle: 'The Challenge',
    challengeItems: [''],
    solutionTitle: 'Our Solution',
    solutionDescription: '',
    solutionItems: [''],

    // Platforms & Tools
    platforms: [{ ...DEFAULT_PLATFORM }],
    tools: [{ ...DEFAULT_PLATFORM }],

    // Results Overview (performance)
    performanceTitle: 'Results Overview',
    performanceDateRangeLabel: 'Last 6 Months',
    performanceChartData: "Jan '24,4200,8100,3200\nFeb '24,6800,15200,5100\nMar '24,9600,24800,7400\nApr '24,13200,38900,10200\nMay '24,18200,72400,15600\nJun '24,21400,84600,18300",
    performanceMetrics: [
      { label: 'Engagement', value: '', change: '', direction: 'up' },
      { label: 'Reach', value: '', change: '', direction: 'up' },
      { label: 'Followers', value: '', change: '', direction: 'up' },
      { label: 'Website Visits', value: '', change: '', direction: 'up' },
      { label: 'Leads Generated', value: '', change: '', direction: 'up' },
      { label: 'Revenue', value: '', change: '', direction: 'up' },
    ],

    // Achievements
    achievementsTitle: 'Key Achievements',
    achievements: [
      { icon: 'Heart', value: '', label: '' },
    ],

    // Top Performing Content
    topContentTitle: 'Top Performing Content',
    topContent: [{ ...DEFAULT_CONTENT_ITEM }],

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
    bannerTitle: 'Ready to Grow Your Brand on Social Media?',
    bannerDescription: '',
    bannerButtonText: "Let's Talk",
    bannerButtonLink: '',
    ctaFeatures: [
      { icon: 'TrendingUp', title: 'Strategic Approach', description: 'Data-driven social strategies' },
      { icon: 'CheckCircle2', title: 'Creative & Engaging Content', description: 'High-quality content that converts' },
      { icon: 'FileText', title: 'Transparent Reporting', description: 'Regular updates & clear insights' },
      { icon: 'Users', title: 'Dedicated Support', description: 'Always here when you need us' },
    ],

    // Portfolio card (listing grid preview)
    cardTitle: '',
    cardDescription: '',
    cardImage: '',
    cardTag: '',

    // SEO
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    if (!isNew) fetchPortfolioSocialMedia();
  }, [params.id]);

  useEffect(() => {
    if (showImageBrowser && currentFolder === '' && folderFiles.length === 0) {
      fetchFolderFiles('');
    }
  }, [showImageBrowser]);

  async function fetchPortfolioSocialMedia() {
    setLoading(true);
    const res = await fetch(`/api/admin/portfolio-social-media/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      const hero = safeParse(data.heroJson, {});
      const overview = safeParse(data.projectOverviewJson, {});
      const challenge = safeParse(data.challengeJson, {});
      const solution = safeParse(data.solutionJson, {});
      const platforms = safeParse(data.platformsJson, {});
      const tools = safeParse(data.toolsJson, {});
      const performance = safeParse(data.performanceJson, {});
      const achievements = safeParse(data.achievementsJson, {});
      const topContent = safeParse(data.topContentJson, {});
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

        socialPlatformHandle: hero.socialPreview?.platformHandle || prev.socialPlatformHandle,
        socialPlatformIcon: hero.socialPreview?.platformIcon || prev.socialPlatformIcon,
        socialPostImage: hero.socialPreview?.postImage || '',
        socialCaption: hero.socialPreview?.caption || prev.socialCaption,
        socialLikes: hero.socialPreview?.likes || prev.socialLikes,
        socialCtaText: hero.socialPreview?.ctaText || prev.socialCtaText,

        platformIcons: hero.platformIcons?.length ? hero.platformIcons : prev.platformIcons,

        brandGrowthLabel: hero.brandGrowthStat?.label || prev.brandGrowthLabel,
        brandGrowthValue: hero.brandGrowthStat?.value || prev.brandGrowthValue,
        brandGrowthSubLabel: hero.brandGrowthStat?.subLabel || prev.brandGrowthSubLabel,

        statsBar: hero.statsBar?.length ? hero.statsBar : prev.statsBar,

        overviewDescription: overview.description || '',

        challengeTitle: challenge.title || prev.challengeTitle,
        challengeItems: challenge.items?.length ? challenge.items : [''],

        solutionTitle: solution.title || prev.solutionTitle,
        solutionDescription: solution.description || '',
        solutionItems: solution.items?.length ? solution.items : [''],

        platforms: platforms.items?.length ? platforms.items : [{ ...DEFAULT_PLATFORM }],
        tools: tools.items?.length ? tools.items : [{ ...DEFAULT_PLATFORM }],

        performanceTitle: performance.title || prev.performanceTitle,
        performanceDateRangeLabel: performance.dateRangeLabel || prev.performanceDateRangeLabel,
        performanceChartData: performance.chartData || prev.performanceChartData,
        performanceMetrics: performance.metrics?.length ? performance.metrics : prev.performanceMetrics,

        achievementsTitle: achievements.title || prev.achievementsTitle,
        achievements: achievements.items?.length ? achievements.items : [{ ...DEFAULT_STAT }],

        topContentTitle: topContent.title || prev.topContentTitle,
        topContent: topContent.items?.length ? topContent.items : [{ ...DEFAULT_CONTENT_ITEM }],

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

  // Generic nested updater e.g. "topContent.0.label" or "statsBar.2.value"
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
      fd.append('folder', 'portfolio-social-media');
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
      socialPreview: {
        platformHandle: form.socialPlatformHandle,
        platformIcon: form.socialPlatformIcon,
        postImage: form.socialPostImage,
        caption: form.socialCaption,
        likes: form.socialLikes,
        ctaText: form.socialCtaText,
      },
      platformIcons: form.platformIcons,
      brandGrowthStat: {
        label: form.brandGrowthLabel,
        value: form.brandGrowthValue,
        subLabel: form.brandGrowthSubLabel,
      },
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

  function buildPlatformsJson() {
    return JSON.stringify({ items: (form.platforms || []).filter((p) => p.name) });
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

  function buildTopContentJson() {
    return JSON.stringify({
      title: form.topContentTitle,
      items: (form.topContent || []).filter((c) => c.image || c.label),
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
      ? '/api/admin/portfolio-social-media'
      : `/api/admin/portfolio-social-media/${params.id}`;
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
      platformsJson: buildPlatformsJson(),
      toolsJson: buildToolsJson(),
      performanceJson: buildPerformanceJson(),
      achievementsJson: buildAchievementsJson(),
      topContentJson: buildTopContentJson(),
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
    //   router.push('/admin/portfolio-social-media');
    // }, 1000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-fuchsia-600 animate-spin" />
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
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-slate-200 bg-gradient-to-r from-fuchsia-50 to-slate-50 flex-shrink-0">
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
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-5 overflow-y-auto flex-1">
            {loadingFiles ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-fuchsia-600 animate-spin" />
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
                          className="group flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-fuchsia-300 hover:bg-fuchsia-50 transition-all"
                        >
                          <Folder className="h-8 w-8 sm:h-10 sm:w-10 text-fuchsia-500 group-hover:text-fuchsia-600" />
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
                          className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-fuchsia-500 transition-all bg-slate-50"
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
                            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-fuchsia-600" />
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
                        className="mt-2 text-xs text-fuchsia-600 hover:text-fuchsia-700"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
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
                {isNew ? 'Create' : 'Edit'} Social Media Case Study
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                {form.title || 'Untitled'}
                {form.status && (
                  <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${form.status === 'published' ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-amber-100 text-amber-700'
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
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all whitespace-nowrap"
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
          <div className="rounded-lg sm:rounded-xl bg-fuchsia-50 border border-fuchsia-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 shadow-sm">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-fuchsia-900">Success</p>
              <p className="text-xs sm:text-sm text-fuchsia-700 mt-0.5">{success}</p>
            </div>
            <button onClick={() => setSuccess('')} className="text-fuchsia-400 hover:text-fuchsia-600">
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
                      ? 'text-fuchsia-600 border-b-2 border-fuchsia-600 bg-white'
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
                    Essential details about this social media case study
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
                      placeholder="fitlife-nutrition-social-media"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1">
                      URL-friendly identifier
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Industries
                    </label>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education / E-Learning">Education / E-Learning</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Travel & Tourism">Travel & Tourism</option>
                      <option value="Food & Restaurant">Food & Restaurant</option>
                      <option value="Fitness & Wellness">Fitness & Wellness</option>
                      <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                      <option value="Logistics/Transportation">Logistics/Transportation</option>
                      <option value="Media & Entertainment">Media & Entertainment</option>
                      <option value="Social Networking">Social Networking</option>
                      <option value="Finance / FinTech">Finance / FinTech</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Construction">Construction</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Sports">Sports</option>
                    </select>
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
                      placeholder="FitLife Nutrition"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
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
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Hero & Social Preview Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Hero Section
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Headline, background, the social post preview card, and the stat bar under the hero
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                  <ImageUploadField
                    label="Hero Background Image"
                    name="heroBgImage"
                    value={form.heroBgImage}
                    placeholder="/images/portfolio-social-media/fitlife-hero-bg.jpg"
                    uploadingField={uploadingField}
                    onChange={handleChange}
                    onFileUpload={handleFileUpload}
                    onBrowse={openImageBrowser}
                    onPreview={setImagePreview}
                  />
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Badge / Eyebrow
                    </label>
                    <input
                      name="heroBadge"
                      value={form.heroBadge}
                      onChange={handleChange}
                      placeholder="SOCIAL MEDIA CASE STUDY"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                      placeholder="How We Boosted Engagement by 300% on Social Platforms"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
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
                      placeholder="300%"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                      placeholder="See how our strategic social media marketing approach helped FitLife Nutrition increase brand awareness..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
                    />
                  </div>

                  <MiniInput label="Industry" value={form.heroIndustry} onChange={(v) => updateFormValue('heroIndustry', v)} placeholder="Health & Wellness" />
                  <MiniInput label="Duration" value={form.heroDuration} onChange={(v) => updateFormValue('heroDuration', v)} placeholder="4 Months" />
                  <MiniInput label="Services" value={form.heroServices} onChange={(v) => updateFormValue('heroServices', v)} placeholder="Social Media Marketing" />
                </div>

                {/* Social Preview Card */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Social Post Preview Card</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MiniInput label="Platform Handle" value={form.socialPlatformHandle} onChange={(v) => updateFormValue('socialPlatformHandle', v)} placeholder="fitlife.nutrition" />
                    <MiniInput label="Platform Icon" value={form.socialPlatformIcon} onChange={(v) => updateFormValue('socialPlatformIcon', v)} placeholder="Instagram (lucide icon name)" />
                    <MiniInput label="Caption Overlay Text" value={form.socialCaption} onChange={(v) => updateFormValue('socialCaption', v)} placeholder="STRONGER EVERY DAY" />
                    <MiniInput label="Likes" value={form.socialLikes} onChange={(v) => updateFormValue('socialLikes', v)} placeholder="3,275" />
                    <MiniInput label="CTA Text (optional)" value={form.socialCtaText} onChange={(v) => updateFormValue('socialCtaText', v)} placeholder="View Post" />
                  </div>
                  <ImageUploadField
                    label="Post Image"
                    name="socialPostImage"
                    value={form.socialPostImage}
                    placeholder="/images/portfolio-social-media/fitlife-post.jpg"
                    uploadingField={uploadingField}
                    onChange={handleChange}
                    onFileUpload={handleFileUpload}
                    onBrowse={openImageBrowser}
                    onPreview={setImagePreview}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700">
                        Platform Icon Row (Instagram / Facebook / TikTok circles beside hero image)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('platformIcons', { name: '', icon: '' })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100 text-[10px] font-medium"
                      >
                        <Plus className="h-3 w-3" /> Add
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {form.platformIcons.map((icon, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <input
                            value={icon.name}
                            onChange={(e) => updateArrayItem('platformIcons', idx, 'name', e.target.value)}
                            placeholder="Instagram"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                          />
                          <input
                            value={icon.icon}
                            onChange={(e) => updateArrayItem('platformIcons', idx, 'icon', e.target.value)}
                            placeholder="lucide icon name"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                          />
                          <button onClick={() => removeArrayItem('platformIcons', idx)} className="text-rose-600 hover:text-rose-700 flex-shrink-0">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-2">
                      "Brand Growth" Side Card
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <MiniInput label="Label" value={form.brandGrowthLabel} onChange={(v) => updateFormValue('brandGrowthLabel', v)} placeholder="Brand Growth" />
                      <MiniInput label="Value" value={form.brandGrowthValue} onChange={(v) => updateFormValue('brandGrowthValue', v)} placeholder="300%" />
                      <MiniInput label="Sub Label" value={form.brandGrowthSubLabel} onChange={(v) => updateFormValue('brandGrowthSubLabel', v)} placeholder="Engagement Increase" />
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-fuchsia-50 border border-fuchsia-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-fuchsia-900">
                      Stats Bar (the 6 highlight numbers directly under the hero)
                    </h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('statsBar', { ...DEFAULT_STAT })}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white text-fuchsia-700 hover:bg-fuchsia-100 border border-fuchsia-200 text-[10px] font-medium"
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
                          placeholder="Icon name (e.g. Heart)"
                          className="w-full rounded border border-slate-200 px-2 py-1 text-[10px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                        />
                        <input
                          value={stat.value}
                          onChange={(e) => updateArrayItem('statsBar', idx, 'value', e.target.value)}
                          placeholder="300%"
                          className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                        />
                        <input
                          value={stat.label}
                          onChange={(e) => updateArrayItem('statsBar', idx, 'label', e.target.value)}
                          placeholder="Increase in Engagement"
                          className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
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
                    placeholder="FitLife Nutrition is a health & nutrition brand offering supplements and wellness products..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                          placeholder="Low engagement and community interaction"
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
                    placeholder="We created a result-driven social media strategy focused on content, community and conversions..."
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
                          placeholder="In-depth audience research"
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
                    Platforms Managed & Tools
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    "Platforms Managed" (Instagram, Facebook, TikTok...) and "Tools & Technologies" lists
                  </p>
                </div>

                {[
                  { field: 'platforms', title: 'Platforms Managed', hint: 'e.g. Instagram, Facebook, TikTok, YouTube, LinkedIn' },
                  { field: 'tools', title: 'Tools & Technologies', hint: 'e.g. Meta Business Suite, Hootsuite, Canva, Later, Google Analytics, SEMrush' },
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
                            placeholder="icon name or /images/tech/icon.png"
                            className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                          {item.icon && item.icon.startsWith('/') && (
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

            {/* Results Overview (Performance) Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Results Overview
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Chart data (Engagement / Reach / Followers) and the metric cards below it
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MiniInput label="Section Title" value={form.performanceTitle} onChange={(v) => updateFormValue('performanceTitle', v)} placeholder="Results Overview" />
                  <MiniInput label="Date Range Label" value={form.performanceDateRangeLabel} onChange={(v) => updateFormValue('performanceDateRangeLabel', v)} placeholder="Last 6 Months" />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    Chart Data
                  </label>
                  <p className="text-[10px] text-slate-500 mb-2">
                    One row per point: <code className="bg-slate-100 px-1 rounded">month label, engagement, reach, followers</code>
                  </p>
                  <textarea
                    value={form.performanceChartData}
                    onChange={(e) => updateFormValue('performanceChartData', e.target.value)}
                    rows={6}
                    placeholder={"Jan '24,4200,8100,3200\nFeb '24,6800,15200,5100"}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                          placeholder="Engagement"
                          className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                        />
                        <input
                          value={metric.value}
                          onChange={(e) => updateArrayItem('performanceMetrics', idx, 'value', e.target.value)}
                          placeholder="18.2K"
                          className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                        />
                        <div className="flex items-center gap-1.5">
                          <input
                            value={metric.change}
                            onChange={(e) => updateArrayItem('performanceMetrics', idx, 'change', e.target.value)}
                            placeholder="300%"
                            className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                          />
                          <select
                            value={metric.direction}
                            onChange={(e) => updateArrayItem('performanceMetrics', idx, 'direction', e.target.value)}
                            className="rounded border border-slate-200 px-1.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-xs font-medium transition-colors"
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
                        className="w-full rounded border border-slate-200 px-2 py-1 text-[10px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                      />
                      <input
                        value={item.value}
                        onChange={(e) => updateArrayItem('achievements', idx, 'value', e.target.value)}
                        placeholder="300%"
                        className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                      />
                      <input
                        value={item.label}
                        onChange={(e) => updateArrayItem('achievements', idx, 'label', e.target.value)}
                        placeholder="Increase in Engagement"
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Performing Content Tab */}
            {activeTab === 'topcontent' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                      Top Performing Content
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                      Posts / reels / stories shown as thumbnails with an engagement metric
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('topContent', { ...DEFAULT_CONTENT_ITEM })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-xs font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Content Item
                  </button>
                </div>

                <MiniInput label="Section Title" value={form.topContentTitle} onChange={(v) => updateFormValue('topContentTitle', v)} placeholder="Top Performing Content" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {form.topContent.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2.5 relative group">
                      <button
                        onClick={() => removeArrayItem('topContent', idx)}
                        className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <X size={12} />
                      </button>

                      {item.image && (
                        <div className="aspect-[4/5] rounded-lg overflow-hidden border border-slate-200 bg-white">
                          <img src={item.image} alt="" className="h-full w-full object-cover" />
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-medium text-slate-700 mb-1">Type</label>
                        <select
                          value={item.type}
                          onChange={(e) => updateArrayItem('topContent', idx, 'type', e.target.value)}
                          className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                        >
                          {CONTENT_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>

                      <ImageUploadField
                        label="Thumbnail Image"
                        name={`topContent.${idx}.image`}
                        value={item.image}
                        placeholder="/images/portfolio-social-media/post-1.jpg"
                        uploadingField={uploadingField}
                        onChange={(e) => updateArrayItem('topContent', idx, 'image', e.target.value)}
                        onFileUpload={handleFileUpload}
                        onBrowse={openImageBrowser}
                        onPreview={setImagePreview}
                      />

                      <MiniInput label="Label (optional)" value={item.label} onChange={(v) => updateArrayItem('topContent', idx, 'label', v)} placeholder="Custom caption / title" />

                      <div className="grid grid-cols-2 gap-2">
                        <MiniInput label="Metric Label" value={item.metricLabel} onChange={(v) => updateArrayItem('topContent', idx, 'metricLabel', v)} placeholder="Engagement" />
                        <MiniInput label="Metric Value" value={item.metricValue} onChange={(v) => updateArrayItem('topContent', idx, 'metricValue', v)} placeholder="2.3K" />
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
                    <ImageUploadField
                      label="Company Logo"
                      name="companyLogo"
                      value={form.companyLogo}
                      placeholder="/images/clients/fitlife-logo.png"
                      uploadingField={uploadingField}
                      onChange={handleChange}
                      onFileUpload={handleFileUpload}
                      onBrowse={openImageBrowser}
                      onPreview={setImagePreview}
                    />
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                        Company Description / Tagline
                      </label>
                      <input
                        name="companyDescription"
                        value={form.companyDescription}
                        onChange={handleChange}
                        placeholder="NUTRITION"
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
                      placeholder="Softkingo completely transformed our social media presence. Their creative content, timely communication..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs italic resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <ImageUploadField
                      label="Reviewer Avatar"
                      name="testimonialAvatar"
                      value={form.testimonialAvatar}
                      placeholder="/images/clients/rahul.jpg"
                      uploadingField={uploadingField}
                      onChange={handleChange}
                      onFileUpload={handleFileUpload}
                      onBrowse={openImageBrowser}
                      onPreview={setImagePreview}
                    />
                    <div className="space-y-3">
                      <MiniInput label="Name" value={form.testimonialName} onChange={(v) => updateFormValue('testimonialName', v)} placeholder="Rahul Mehta" />
                      <MiniInput label="Designation" value={form.testimonialDesignation} onChange={(v) => updateFormValue('testimonialDesignation', v)} placeholder="Marketing Manager, FitLife Nutrition" />
                      <MiniInput label="Company Tag (small label under name)" value={form.testimonialCompanyTag} onChange={(v) => updateFormValue('testimonialCompanyTag', v)} placeholder="FitLife" />
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
                      placeholder="Ready to achieve similar results for your brand? Let's create a winning social media strategy..."
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
                  <MiniInput label="Title" value={form.bannerTitle} onChange={(v) => updateFormValue('bannerTitle', v)} placeholder="Ready to Grow Your Brand on Social Media?" />
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Description</label>
                    <textarea
                      value={form.bannerDescription}
                      onChange={(e) => updateFormValue('bannerDescription', e.target.value)}
                      rows={2}
                      placeholder="We create data-driven social media strategies that build brand awareness, engage audiences and drive real business results."
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
                        Feature Row (Strategic Approach / Creative Content / Transparent Reporting / Dedicated Support)
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
                            placeholder="Strategic Approach"
                            className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                          <input
                            value={f.description}
                            onChange={(e) => updateArrayItem('ctaFeatures', idx, 'description', e.target.value)}
                            placeholder="Data-driven social strategies"
                            className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-fuchsia-50 border border-fuchsia-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-fuchsia-900">Portfolio Listing Card</h4>
                  <p className="text-[10px] text-slate-500">
                    How this case study appears as a card in the /our-work portfolio grid
                  </p>
                  <MiniInput label="Card Title" value={form.cardTitle} onChange={(v) => updateFormValue('cardTitle', v)} placeholder="300% Engagement Boost for FitLife Nutrition" />
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Card Description</label>
                    <textarea
                      value={form.cardDescription}
                      onChange={(e) => updateFormValue('cardDescription', e.target.value)}
                      rows={2}
                      placeholder="How a strategic social media approach grew engagement, reach and followers..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <ImageUploadField
                    label="Card Thumbnail"
                    name="cardImage"
                    value={form.cardImage}
                    placeholder="/images/portfolio-social-media/fitlife-card.jpg"
                    uploadingField={uploadingField}
                    onChange={handleChange}
                    onFileUpload={handleFileUpload}
                    onBrowse={openImageBrowser}
                    onPreview={setImagePreview}
                  />
                  <MiniInput label="Card Tag" value={form.cardTag} onChange={(v) => updateFormValue('cardTag', v)} placeholder="Social Media · Health & Wellness" />
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
                      placeholder="FitLife Nutrition Social Media Case Study - 300% Engagement | Softkingo"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
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
                      placeholder="See how we helped FitLife Nutrition boost engagement by 300% and grow followers with a data-driven social media strategy..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5">
                      {form.seoDescription.length}/160 characters (optimal: 150-160)
                    </p>
                  </div>

                  <ImageUploadField
                    label="Social Share Image (OG Image)"
                    name="seoImage"
                    value={form.seoImage}
                    placeholder="/images/portfolio-social-media/fitlife-og.jpg"
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
                      <p className="text-[10px] xs:text-xs text-fuchsia-700 line-clamp-1">
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
                      <span>Preview Social Media Case Study</span>
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