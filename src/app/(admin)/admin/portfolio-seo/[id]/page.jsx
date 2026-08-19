// src/app/(admin)/admin/portfolio-seo/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft, Save, Upload, Image as ImageIcon, Users, TrendingUp,
  Search as SearchIcon, CheckCircle2, AlertCircle, Loader2, X, Plus,
  Trash2, Eye, Folder, FolderOpen, ZoomIn, ChevronRight, Home,
  FileText, LineChart, Shield, Target, BarChart3, Wrench, DollarSign
} from 'lucide-react';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FileText, mobileLabel: 'Basic' },
  { id: 'hero', label: 'Hero & Stats', icon: LineChart, mobileLabel: 'Hero' },
  { id: 'client', label: 'Client & Challenge', icon: Users, mobileLabel: 'Client' },
  { id: 'strategy', label: 'Strategy', icon: Shield, mobileLabel: 'Strategy' },
  { id: 'results', label: 'Results', icon: TrendingUp, mobileLabel: 'Results' },
  { id: 'dashboard', label: 'Performance Dashboard', icon: BarChart3, mobileLabel: 'Dashboard' },
  { id: 'technical', label: 'Technical SEO', icon: Wrench, mobileLabel: 'Technical' },
  { id: 'impact', label: 'Business Impact', icon: DollarSign, mobileLabel: 'Impact' },
  { id: 'tools', label: 'Tools & Tech', icon: Target, mobileLabel: 'Tools' },
  { id: 'seo', label: 'SEO', icon: SearchIcon, mobileLabel: 'SEO' },
  { id: 'card', label: 'Card Preview', icon: Eye, mobileLabel: 'Card' },
];

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

// technicalChecklist / contentChecklist / highlights may be saved as plain
// string arrays; normalize to {text} objects for the form.
// Moved to module scope so it can be reused by every loader function
// (previously it was defined inline inside fetchPortfolioSeo, which made it
// undefined everywhere else and crashed the page on load).
function normalizeChecklist(arr, fallback) {
  return arr?.length
    ? arr.map((item) => (typeof item === 'string' ? { text: item } : item))
    : fallback;
}

// Highlights need two independent fields: a stat "value" (e.g. "+250%")
// and the descriptive "text" (e.g. "Organic Traffic growth"). Older saved
// data may just be plain strings or {text} objects, so normalize those
// into { value, text } shape as well.
function normalizeHighlights(arr, fallback) {
  if (!arr?.length) return fallback;
  return arr.map((item) => {
    if (typeof item === 'string') return { value: '', text: item };
    return { value: item.value || '', text: item.text || '' };
  });
}

export default function PortfolioSeoEditPage() {
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
    companyLogo: '',
    companyDescription: '',
    heroBgImage: '',
    seoImage: '',

    // Hero & Stats (heroStatsJson)
    heroBadges: [{ value: '+185%', label: 'Organic Traffic' }],
    chartTitle: 'Organic Traffic Growth',
    beforeLabel: 'Before',
    beforeValue: '',
    beforeUnit: 'Visits/Month',
    afterLabel: 'After',
    afterValue: '',
    afterUnit: 'Visits/Month',
    afterGrowth: '',
    chartSeries: [{ month: 'Jan', value: '' }],

    // Client & Challenge (clientOverviewJson)
    clientName: '',
    clientIndustry: '',
    clientWebsite: '',
    clientLocation: '',
    clientDuration: '',
    clientServices: '',
    challengeHeading: 'The Challenge',
    challengeDescription: '',
    challengePoints: [{ icon: 'users', text: '' }],

    // Strategy (strategyJson)
    strategyHeading: 'Our SEO Strategy',
    strategyDescription: '',
    strategyCards: [{ icon: 'shield-check', title: '', description: '' }],

    // Results (resultsJson)
    resultsHeading: 'Before vs After Results',
    resultsDescription: 'Real improvement. Real results.',
    beforeSeoLabel: 'Before SEO',
    afterSeoLabel: 'After SEO (6 Months)',
    beforeMetrics: [{ icon: 'users', value: '', label: 'Monthly Organic Traffic' }],
    afterMetrics: [{ icon: 'users', value: '', label: 'Monthly Organic Traffic', growth: '' }],

    // Performance Dashboard (performanceDashboardJson)
    dashboardHeading: 'SEO Performance Dashboard',
    dashboardStats: [
      { icon: 'trending-up', label: 'Organic Traffic', value: '+185%', sub: '8,420 → 24,680' },
      { icon: 'search', label: 'Total Keywords', value: '+127%', sub: '216 → 489' },
      { icon: 'shield-check', label: 'Domain Authority', value: '42 → 58', sub: 'DA Increased by 16' },
      { icon: 'link', label: 'Backlinks', value: '+312%', sub: '245 → 1,009' },
      { icon: 'users', label: 'Organic Leads', value: '+311%', sub: '18 → 74' },
    ],
    keywordRankingHeading: 'Keyword Ranking Growth',
    keywordRankings: [{ keyword: '', before: '', after: '' }],
    trafficChartHeading: 'Organic Traffic Growth (6 Months)',
    trafficChartValue: '24,680',
    trafficChartUnit: 'Visits/Month',
    trafficChartSeries: [{ month: 'Jan', value: '' }],

    // Technical SEO (technicalSeoJson)
    technicalHeading: 'Technical SEO Improvements',
    issuesFound: '68',
    issuesFoundLabel: 'Critical & Major Issues',
    issuesFixed: '68',
    issuesFixedLabel: '100% Resolved',
    technicalChecklist: [
      { text: 'Crawlability & Indexing' },
      { text: 'Core Web Vitals' },
      { text: 'Mobile Usability' },
      { text: 'Page Speed Optimization' },
      { text: 'Broken Links' },
      { text: 'Sitemap & Robots.txt' },
      { text: 'Schema Markup' },
      { text: 'Canonical Issues' },
    ],
    contentGrowthHeading: 'Content Growth',
    contentBeforeValue: '32',
    contentBeforeLabel: 'Indexed Pages',
    contentAfterValue: '118',
    contentAfterLabel: 'Indexed Pages',
    contentChecklist: [
      { label: 'Blog Articles Published', value: '42' },
      { label: 'New Landing Pages', value: '16' },
      { label: 'Existing Pages Optimized', value: '68' },
      { label: 'Search Intent Mapping', value: '100%' },
    ],

    // Business Impact (businessImpactJson)
    impactHeading: 'Business Impact',
    impactSubheading: 'SEO that drives real business results',
    impactStats: [
      { value: '+214%', label: 'Organic Leads' },
      { value: '+68%', label: 'Conversion Rate' },
      { value: '+143%', label: 'Revenue from Organic' },
      { value: '-37%', label: 'Cost Per Lead' },
    ],

    // Tools & Technologies (toolsJson)
    toolsHeading: 'Tools & Technologies',
    tools: [
      { name: 'Google Search Console', logo: '/uploads/admin/portfolio-seo/google-search-console.webp' },
      { name: 'Google Analytics', logo: '/uploads/admin/portfolio-seo/google-analytics.webp' },
      { name: 'Keyword Planner', logo: '/uploads/admin/portfolio-seo/keyword-planner.webp' },
      { name: 'Google Tag Manager', logo: '/uploads/admin/portfolio-seo/google-tag-manager.webp' },
      { name: 'SEMrush', logo: '/uploads/admin/portfolio-seo/semrush-logo.webp' },
      { name: 'Screaming Frog', logo: '/uploads/admin/portfolio-seo/screaming-frog-logo.webp' },
      { name: 'PageSpeed Insights', logo: '/uploads/admin/portfolio-seo/google-pagespeed.webp' },
      { name: 'ahrefs', logo: '/uploads/admin/portfolio-seo/ahrefs-logo.webp' },
    ],
    // Client testimonial shown alongside Tools & Tech
    testimonial: {
      image: '',
      name: '',
      occupation: '',
      description: '',
    },

    // SEO
    seoTitle: '',
    seoDescription: '',

    // Portfolio listing card preview (portfolioCardContent)
    portfolioCardContent: {
      cardImage: '',
      logo: '',
      url: '',
      shortDescription: '',
      featuredTag: 'Case Study',
      // Each highlight now stores its stat value (e.g. "+250%") and its
      // content text (e.g. "Organic Traffic") as two separate fields.
      highlights: [
        { value: '', text: '' },
        { value: '', text: '' },
      ],
    },
  });

  // Extract id from params
  const id = params?.id;

  // Single source of truth for loading an existing case study.
  // (Previously there were TWO competing useEffects/fetch functions here —
  // fetchPortfolioSeo() and fetchCaseStudy() — both hitting the same
  // endpoint, racing each other, and fetchCaseStudy() called an
  // out-of-scope normalizeChecklist() which would throw a ReferenceError.
  // That whole duplicate effect has been removed; everything now loads
  // through fetchPortfolioSeo() below.)
  useEffect(() => {
    if (!isNew && id) {
      fetchPortfolioSeo();
    }
  }, [id]);

  useEffect(() => {
    if (showImageBrowser && currentFolder === '' && folderFiles.length === 0) {
      fetchFolderFiles('');
    }
  }, [showImageBrowser]);

  async function fetchPortfolioSeo() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/portfolio-seo/${id}`);
      if (res.ok) {
        const data = await res.json();
        const hero = safeParse(data.heroStatsJson, {});
        const clientOverview = safeParse(data.clientOverviewJson, {});
        const strategy = safeParse(data.strategyJson, {});
        const results = safeParse(data.resultsJson, {});
        const dashboard = safeParse(data.performanceDashboardJson, {});
        const technical = safeParse(data.technicalSeoJson, {});
        const impact = safeParse(data.businessImpactJson, {});
        const toolsData = safeParse(data.toolsJson, {});
        const card = safeParse(data.portfolioCardContent, {});

        const client = clientOverview.client || {};
        const challenge = clientOverview.challenge || {};
        const chart = hero.chart || {};

        setForm((prev) => ({
          ...prev,
          slug: data.slug || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          category: data.category || '',
          companyLogo: data.companyLogo || '',
          companyDescription: data.companyDescription || '',
          heroBgImage: data.heroBgImage || '',
          seoImage: data.seoImage || '',

          heroBadges: hero.badges?.length ? hero.badges : prev.heroBadges,
          chartTitle: chart.title || prev.chartTitle,
          beforeLabel: chart.before?.label || prev.beforeLabel,
          beforeValue: chart.before?.value ?? '',
          beforeUnit: chart.before?.unit || prev.beforeUnit,
          afterLabel: chart.after?.label || prev.afterLabel,
          afterValue: chart.after?.value ?? '',
          afterUnit: chart.after?.unit || prev.afterUnit,
          afterGrowth: chart.after?.growth || '',
          chartSeries: chart.series?.length ? chart.series : prev.chartSeries,

          clientName: client.client || '',
          clientIndustry: client.industry || '',
          clientWebsite: client.website || '',
          clientLocation: client.location || '',
          clientDuration: client.duration || '',
          clientServices: client.services || '',
          challengeHeading: challenge.heading || prev.challengeHeading,
          challengeDescription: challenge.description || '',
          challengePoints: challenge.points?.length ? challenge.points : prev.challengePoints,

          strategyHeading: strategy.heading || prev.strategyHeading,
          strategyDescription: strategy.description || '',
          strategyCards: strategy.cards?.length ? strategy.cards : prev.strategyCards,

          resultsHeading: results.heading || prev.resultsHeading,
          resultsDescription: results.description || prev.resultsDescription,
          beforeSeoLabel: results.before?.label || prev.beforeSeoLabel,
          afterSeoLabel: results.after?.label || prev.afterSeoLabel,
          beforeMetrics: results.before?.metrics?.length ? results.before.metrics : prev.beforeMetrics,
          afterMetrics: results.after?.metrics?.length ? results.after.metrics : prev.afterMetrics,

          dashboardHeading: dashboard.heading || prev.dashboardHeading,
          dashboardStats: dashboard.stats?.length ? dashboard.stats : prev.dashboardStats,
          keywordRankingHeading: dashboard.keywordRanking?.heading || prev.keywordRankingHeading,
          keywordRankings: dashboard.keywordRanking?.rows?.length ? dashboard.keywordRanking.rows : prev.keywordRankings,
          trafficChartHeading: dashboard.trafficChart?.heading || prev.trafficChartHeading,
          trafficChartValue: dashboard.trafficChart?.value ?? prev.trafficChartValue,
          trafficChartUnit: dashboard.trafficChart?.unit || prev.trafficChartUnit,
          trafficChartSeries: dashboard.trafficChart?.series?.length ? dashboard.trafficChart.series : prev.trafficChartSeries,

          technicalHeading: technical.heading || prev.technicalHeading,
          issuesFound: technical.issues?.found ?? prev.issuesFound,
          issuesFoundLabel: technical.issues?.foundLabel || prev.issuesFoundLabel,
          issuesFixed: technical.issues?.fixed ?? prev.issuesFixed,
          issuesFixedLabel: technical.issues?.fixedLabel || prev.issuesFixedLabel,
          technicalChecklist: normalizeChecklist(technical.checklist, prev.technicalChecklist),
          contentGrowthHeading: technical.contentGrowth?.heading || prev.contentGrowthHeading,
          contentBeforeValue: technical.contentGrowth?.before?.value ?? prev.contentBeforeValue,
          contentBeforeLabel: technical.contentGrowth?.before?.label || prev.contentBeforeLabel,
          contentAfterValue: technical.contentGrowth?.after?.value ?? prev.contentAfterValue,
          contentAfterLabel: technical.contentGrowth?.after?.label || prev.contentAfterLabel,
          contentChecklist: technical.contentGrowth?.checklist?.length ? technical.contentGrowth.checklist : prev.contentChecklist,

          impactHeading: impact.heading || prev.impactHeading,
          impactSubheading: impact.subheading || prev.impactSubheading,
          impactStats: impact.stats?.length ? impact.stats : prev.impactStats,

          toolsHeading: toolsData.heading || prev.toolsHeading,
          tools: toolsData.tools?.length ? toolsData.tools : prev.tools,
          testimonial: {
            image: toolsData.testimonial?.image || '',
            name: toolsData.testimonial?.name || '',
            occupation: toolsData.testimonial?.occupation || '',
            description: toolsData.testimonial?.description || '',
          },

          seoTitle: data.seoTitle || '',
          seoDescription: data.seoDescription || '',

          portfolioCardContent: {
            cardImage: card.cardImage || '',
            logo: card.logo || '',
            url: card.url || '',
            shortDescription: card.shortDescription || '',
            featuredTag: card.featuredTag || 'Case Study',
            highlights: normalizeHighlights(card.highlights, prev.portfolioCardContent.highlights),
          },
        }));
      }
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Generic nested updater e.g. "heroBadges.0.value" or
  // "portfolioCardContent.featuredTag" or "portfolioCardContent.highlights.0.text"
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

      // Handles nested object fields e.g. "portfolioCardContent.featuredTag"
      if (parts.length === 2) {
        const [objField, subField] = parts;
        if (prev[objField] && typeof prev[objField] === 'object' && !Array.isArray(prev[objField])) {
          return { ...prev, [objField]: { ...prev[objField], [subField]: value } };
        }
      }

      // Handles nested array-of-objects e.g. "portfolioCardContent.highlights.0.text"
      if (parts.length === 4) {
        const [objField, arrayField, indexStr, subField] = parts;
        const index = parseInt(indexStr);
        if (
          prev[objField] &&
          Array.isArray(prev[objField][arrayField]) &&
          !isNaN(index)
        ) {
          const copy = [...prev[objField][arrayField]];
          copy[index] = { ...copy[index], [subField]: value };
          return {
            ...prev,
            [objField]: { ...prev[objField], [arrayField]: copy },
          };
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
      fd.append('folder', 'portfolio-seo');
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

  // ---------- Array helpers (generic) ----------
  const addArrayItem = (field, template) =>
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] || []), template] }));

  const removeArrayItem = (field, index) =>
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const updateArrayItem = (field, index, key, value) =>
    setForm((prev) => {
      const copy = [...prev[field]];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, [field]: copy };
    });

  // ---------- Portfolio card highlight helpers (nested array) ----------
  const addHighlight = () =>
    setForm((prev) => ({
      ...prev,
      portfolioCardContent: {
        ...prev.portfolioCardContent,
        highlights: [...(prev.portfolioCardContent.highlights || []), { value: '', text: '' }],
      },
    }));

  const removeHighlight = (index) =>
    setForm((prev) => ({
      ...prev,
      portfolioCardContent: {
        ...prev.portfolioCardContent,
        highlights: (prev.portfolioCardContent.highlights || []).filter((_, i) => i !== index),
      },
    }));


  // ---------- Category multi-select (derived from form.category) ----------
  const options = ['SEO', 'PPC', 'Social Media', 'ORM'];

  // form.category is stored as a single comma-separated string
  const selectedCategories = form.category
    ? form.category.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const handleSelect = (e) => {
    const value = e.target.value;
    if (!value || selectedCategories.includes(value)) return;
    const updated = [...selectedCategories, value];
    updateFormValue('category', updated.join(', '));
    e.target.value = ''; // reset dropdown back to placeholder
  };

  const handleRemove = (cat) => {
    const updated = selectedCategories.filter((c) => c !== cat);
    updateFormValue('category', updated.join(', '));
  };

  // ---------- Build JSON payloads ----------
  function buildHeroStatsJson() {
    return JSON.stringify({
      badges: (form.heroBadges || []).filter((b) => b.value || b.label),
      chart: {
        title: form.chartTitle,
        before: { label: form.beforeLabel, value: Number(form.beforeValue) || form.beforeValue, unit: form.beforeUnit },
        after: {
          label: form.afterLabel,
          value: Number(form.afterValue) || form.afterValue,
          unit: form.afterUnit,
          growth: form.afterGrowth,
        },
        series: (form.chartSeries || []).filter((s) => s.month),
      },
    });
  }

  function buildClientOverviewJson() {
    return JSON.stringify({
      client: {
        client: form.clientName,
        industry: form.clientIndustry,
        website: form.clientWebsite,
        location: form.clientLocation,
        duration: form.clientDuration,
        services: form.clientServices,
      },
      challenge: {
        heading: form.challengeHeading,
        description: form.challengeDescription,
        points: (form.challengePoints || []).filter((p) => p.text),
      },
    });
  }

  function buildStrategyJson() {
    return JSON.stringify({
      heading: form.strategyHeading,
      description: form.strategyDescription,
      cards: (form.strategyCards || []).filter((c) => c.title),
    });
  }

  function buildResultsJson() {
    return JSON.stringify({
      heading: form.resultsHeading,
      description: form.resultsDescription,
      before: {
        label: form.beforeSeoLabel,
        metrics: (form.beforeMetrics || []).filter((m) => m.label),
      },
      after: {
        label: form.afterSeoLabel,
        metrics: (form.afterMetrics || []).filter((m) => m.label),
      },
    });
  }

  function buildPerformanceDashboardJson() {
    return JSON.stringify({
      heading: form.dashboardHeading,
      stats: (form.dashboardStats || []).filter((s) => s.label),
      keywordRanking: {
        heading: form.keywordRankingHeading,
        rows: (form.keywordRankings || []).filter((r) => r.keyword),
      },
      trafficChart: {
        heading: form.trafficChartHeading,
        value: form.trafficChartValue,
        unit: form.trafficChartUnit,
        series: (form.trafficChartSeries || []).filter((s) => s.month),
      },
    });
  }

  function buildTechnicalSeoJson() {
    return JSON.stringify({
      heading: form.technicalHeading,
      issues: {
        found: form.issuesFound,
        foundLabel: form.issuesFoundLabel,
        fixed: form.issuesFixed,
        fixedLabel: form.issuesFixedLabel,
      },
      checklist: (form.technicalChecklist || []).filter((c) => c.text).map((c) => c.text),
      contentGrowth: {
        heading: form.contentGrowthHeading,
        before: { value: form.contentBeforeValue, label: form.contentBeforeLabel },
        after: { value: form.contentAfterValue, label: form.contentAfterLabel },
        checklist: (form.contentChecklist || []).filter((c) => c.label),
      },
    });
  }

  function buildBusinessImpactJson() {
    return JSON.stringify({
      heading: form.impactHeading,
      subheading: form.impactSubheading,
      stats: (form.impactStats || []).filter((s) => s.label),
    });
  }

  function buildToolsJson() {
    return JSON.stringify({
      heading: form.toolsHeading,
      tools: (form.tools || []).filter((t) => t.name),
      testimonial: {
        image: form.testimonial?.image || '',
        name: form.testimonial?.name || '',
        occupation: form.testimonial?.occupation || '',
        description: form.testimonial?.description || '',
      },
    });
  }
  // Helper to build and clean portfolioCardContent JSON.
  // Highlights are now saved as { value, text } pairs (e.g. value: "+250%",
  // text: "Organic Traffic") instead of a single combined string.
  function buildPortfolioCardContentJson() {
    const card = form.portfolioCardContent || {};

    const cleanHighlights = (card.highlights || [])
      .map((item) =>
        typeof item === 'object'
          ? { value: (item.value || '').trim(), text: (item.text || '').trim() }
          : { value: '', text: String(item || '').trim() }
      )
      .filter((h) => h.value !== '' || h.text !== '');

    return JSON.stringify({
      cardImage: card.cardImage || '',
      logo: card.logo || '',
      url: card.url || '',
      shortDescription: card.shortDescription || '',
      featuredTag: card.featuredTag || 'Case Study',
      highlights: cleanHighlights,
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
      ? '/api/admin/portfolio-seo'
      : `/api/admin/portfolio-seo/${params.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      category: form.category || null,
      companyLogo: form.companyLogo || null,
      companyDescription: form.companyDescription || null,
      heroBgImage: form.heroBgImage || null,
      seoImage: form.seoImage || null,
      heroStatsJson: buildHeroStatsJson(),
      clientOverviewJson: buildClientOverviewJson(),
      strategyJson: buildStrategyJson(),
      resultsJson: buildResultsJson(),
      performanceDashboardJson: buildPerformanceDashboardJson(),
      technicalSeoJson: buildTechnicalSeoJson(),
      businessImpactJson: buildBusinessImpactJson(),
      toolsJson: buildToolsJson(),
      portfolioCardContent: buildPortfolioCardContentJson(),
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
    setTimeout(() => {
      router.push('/admin/case-studies');
    }, 1000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600 animate-spin" />
          <p className="text-xs sm:text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const ImageUploadField = ({ label, name, value, placeholder, dark }) => (
    <div className="space-y-2">
      <label className={`block text-xs sm:text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={
          dark
            ? 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all'
            : 'w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all'
        }
      />
      <div className="flex flex-wrap items-center gap-2">
        <label className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs font-medium cursor-pointer transition-colors ${dark
          ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
          : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
          }`}>
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
            onChange={(e) => handleFileUpload(e, name)}
            disabled={uploadingField === name}
          />
        </label>

        <button
          type="button"
          onClick={() => openImageBrowser(name)}
          className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs font-medium transition-colors ${dark
            ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
            : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
            }`}
        >
          <Folder className="h-3 w-3" />
          <span className="hidden sm:inline">Browse</span>
          <span className="sm:hidden">📁</span>
        </button>

        {value && uploadingField !== name && (
          <>
            <button
              type="button"
              onClick={() => setImagePreview(value)}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-[10px] sm:text-xs font-medium text-sky-700 transition-colors"
            >
              <ZoomIn className="h-3 w-3" />
              <span className="hidden sm:inline">Preview</span>
              <span className="sm:hidden">🔍</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                <img src={value} alt="preview" className="h-full w-full object-cover" />
              </div>
              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const ImageBrowserModal = () => {
    if (!showImageBrowser) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-slate-50 flex-shrink-0">
            <div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-900">Browse Images</h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500 mt-0.5">Select an image from public folder</p>
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
              <button onClick={() => navigateToFolder('')} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white transition-colors flex-shrink-0">
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
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-5 overflow-y-auto flex-1">
            {loadingFiles ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600 animate-spin" />
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
                          className="group flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all"
                        >
                          <Folder className="h-8 w-8 sm:h-10 sm:w-10 text-sky-500 group-hover:text-sky-600" />
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
                          className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-500 transition-all bg-slate-50"
                        >
                          <img src={img.path} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-2">
                            <p className="text-[9px] sm:text-[10px] text-white font-medium truncate w-full text-center">{img.name}</p>
                            <p className="text-[8px] sm:text-[9px] text-white/80">{formatBytes(img.size)}</p>
                          </div>
                          <div className="absolute top-1 right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
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
                      <button onClick={() => setSearchQuery('')} className="mt-2 text-xs text-sky-600 hover:text-sky-700">
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
                <button onClick={goToParentFolder} className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 transition-colors">
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6" onClick={() => setImagePreview(null)}>
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
              <p className="text-[10px] xs:text-xs sm:text-sm text-white font-medium truncate">{imagePreview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
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
                {isNew ? 'Create' : 'Edit'} Portfolio SEO Case Study
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">{form.title || 'Untitled'}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all whitespace-nowrap"
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
                      ? 'text-sky-600 border-b-2 border-sky-600 bg-white'
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

            {/* Basic Info */}
            {activeTab === 'basic' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Basic Information</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Essential details about this case study</p>
                </div>

                <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Slug <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      required
                      placeholder="healthcare-brand-seo-growth"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1">URL-friendly identifier</p>
                  </div>


                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Category / Services Tag
                    </label>

                    {/* Outer wrapper mimicking the input border/padding styling */}
                    <div className="w-full min-h-[38px] rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 flex flex-wrap items-center gap-1.5 focus-within:ring-2 focus-within:ring-sky-500">

                      {/* Selected Tags Display */}
                      {selectedCategories.map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-medium px-2 py-0.5 rounded-md"
                        >
                          {cat}
                          <button
                            type="button"
                            onClick={() => handleRemove(cat)}
                            className="text-sky-600 hover:text-sky-900 focus:outline-none"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}

                      {/* Dropdown Select inside the box */}
                      <select
                        name="category"
                        onChange={handleSelect}
                        defaultValue=""
                        className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-none cursor-pointer py-0.5 min-w-[120px]"
                      >
                        <option value="" disabled>
                          {selectedCategories.length === 0 ? "Select options..." : "Add more..."}
                        </option>
                        {options
                          .filter((option) => !selectedCategories.includes(option))
                          .map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="Growing Organic Traffic for Healthcare Brand"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Description</label>
                    <textarea
                      name="subtitle"
                      value={form.subtitle}
                      onChange={handleChange}
                      rows={2}
                      placeholder="A brief tagline..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>
                  <ImageUploadField
                    label="Company Logo"
                    name="companyLogo"
                    value={form.companyLogo}
                    placeholder="/images/logos/healthcarebrand.png"
                  />


                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Company Description</label>
                    <textarea
                      name="companyDescription"
                      value={form.companyDescription}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Leading healthcare provider specializing in..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1">
                      Short description shown on the case-studies card list
                    </p>
                  </div>



                  <ImageUploadField
                    label="Hero Background Image"
                    name="heroBgImage"
                    value={form.heroBgImage}
                    placeholder="/images/portfolio-seo/hero-bg.jpg"
                  />

                  <ImageUploadField
                    label="SEO / Share Image"
                    name="seoImage"
                    value={form.seoImage}
                    placeholder="/images/portfolio-seo/og-image.jpg"
                  />
                </div>
              </div>
            )}

            {/* Hero & Stats */}
            {activeTab === 'hero' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Hero Stat Badges & Growth Chart</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">The top stat badges and the Organic Traffic Growth chart</p>
                </div>

                {/* Stat badges */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-sky-900">Stat Badges (e.g. +185% Organic Traffic)</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('heroBadges', { value: '', label: '' })}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-sky-200 text-sky-700 hover:bg-sky-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Badge</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {form.heroBadges.map((badge, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('heroBadges', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <input
                          value={badge.value}
                          onChange={(e) => updateArrayItem('heroBadges', idx, 'value', e.target.value)}
                          placeholder="+185%"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={badge.label}
                          onChange={(e) => updateArrayItem('heroBadges', idx, 'label', e.target.value)}
                          placeholder="Organic Traffic"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Organic Traffic Growth Chart</h4>

                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Chart Title</label>
                    <input
                      name="chartTitle"
                      value={form.chartTitle}
                      onChange={handleChange}
                      placeholder="Organic Traffic Growth"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-2">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Before</p>
                      <input
                        name="beforeLabel"
                        value={form.beforeLabel}
                        onChange={handleChange}
                        placeholder="Before"
                        className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        name="beforeValue"
                        value={form.beforeValue}
                        onChange={handleChange}
                        placeholder="8420"
                        className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        name="beforeUnit"
                        value={form.beforeUnit}
                        onChange={handleChange}
                        placeholder="Visits/Month"
                        className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-2">
                      <p className="text-[10px] font-bold uppercase text-slate-400">After</p>
                      <input
                        name="afterLabel"
                        value={form.afterLabel}
                        onChange={handleChange}
                        placeholder="After"
                        className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        name="afterValue"
                        value={form.afterValue}
                        onChange={handleChange}
                        placeholder="24680"
                        className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        name="afterUnit"
                        value={form.afterUnit}
                        onChange={handleChange}
                        placeholder="Visits/Month"
                        className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        name="afterGrowth"
                        value={form.afterGrowth}
                        onChange={handleChange}
                        placeholder="+185%"
                        className="w-full rounded-lg border border-emerald-200 px-2 sm:px-2.5 py-1.5 text-xs text-emerald-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Series */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700">
                        Monthly Data Points (line chart)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('chartSeries', { month: '', value: '' })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-sky-100 text-sky-700 hover:bg-sky-200 text-[10px] font-medium transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Point</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {form.chartSeries.map((pt, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 space-y-1.5 relative">
                          <button
                            type="button"
                            onClick={() => removeArrayItem('chartSeries', idx)}
                            className="absolute top-1 right-1 text-rose-500 hover:text-rose-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <input
                            value={pt.month}
                            onChange={(e) => updateArrayItem('chartSeries', idx, 'month', e.target.value)}
                            placeholder="Jan"
                            className="w-full rounded border border-slate-200 px-1.5 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                          <input
                            value={pt.value}
                            onChange={(e) => updateArrayItem('chartSeries', idx, 'value', e.target.value)}
                            placeholder="8420"
                            className="w-full rounded border border-slate-200 px-1.5 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Client & Challenge */}
            {activeTab === 'client' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Client Overview & The Challenge</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Client details table and the challenge points list</p>
                </div>

                {/* Client */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-sky-900 mb-3 sm:mb-4">Client Overview</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Client</label>
                      <input
                        name="clientName"
                        value={form.clientName}
                        onChange={handleChange}
                        placeholder="Healthcare Brand"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Industry</label>
                      <input
                        name="clientIndustry"
                        value={form.clientIndustry}
                        onChange={handleChange}
                        placeholder="Healthcare / Medical Services"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Website</label>
                      <input
                        name="clientWebsite"
                        value={form.clientWebsite}
                        onChange={handleChange}
                        placeholder="www.healthcarebrand.com"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Location</label>
                      <input
                        name="clientLocation"
                        value={form.clientLocation}
                        onChange={handleChange}
                        placeholder="USA"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Project Duration</label>
                      <input
                        name="clientDuration"
                        value={form.clientDuration}
                        onChange={handleChange}
                        placeholder="6 Months"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Services</label>
                      <input
                        name="clientServices"
                        value={form.clientServices}
                        onChange={handleChange}
                        placeholder="SEO (Technical, On-Page, Content, Link Building, Local SEO)"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Challenge */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-rose-900">The Challenge</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('challengePoints', { icon: 'alert', text: '' })}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Point</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Heading</label>
                    <input
                      name="challengeHeading"
                      value={form.challengeHeading}
                      onChange={handleChange}
                      placeholder="The Challenge"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Description</label>
                    <textarea
                      name="challengeDescription"
                      value={form.challengeDescription}
                      onChange={handleChange}
                      rows={2}
                      placeholder="The client was facing several key challenges that impacted their online growth."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {form.challengePoints.map((point, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('challengePoints', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <input
                          value={point.icon}
                          onChange={(e) => updateArrayItem('challengePoints', idx, 'icon', e.target.value)}
                          placeholder="icon name e.g. users"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-[10px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <textarea
                          value={point.text}
                          onChange={(e) => updateArrayItem('challengePoints', idx, 'text', e.target.value)}
                          rows={2}
                          placeholder="Low organic traffic and poor visibility in search results"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Strategy */}
            {activeTab === 'strategy' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Our SEO Strategy</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">The strategy cards grid (Technical SEO, On-Page SEO, etc.)</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Heading</label>
                    <input
                      name="strategyHeading"
                      value={form.strategyHeading}
                      onChange={handleChange}
                      placeholder="Our SEO Strategy"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Description</label>
                    <input
                      name="strategyDescription"
                      value={form.strategyDescription}
                      onChange={handleChange}
                      placeholder="A comprehensive approach tailored to the client's goals and challenges."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700">Strategy Cards</label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('strategyCards', { icon: 'shield-check', title: '', description: '' })}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {form.strategyCards.map((card, idx) => (
                      <div key={idx} className="p-3 xs:p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 sm:space-y-3 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('strategyCards', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <span className="text-[10px] xs:text-xs font-medium text-slate-500">Card #{idx + 1}</span>
                        <input
                          value={card.icon}
                          onChange={(e) => updateArrayItem('strategyCards', idx, 'icon', e.target.value)}
                          placeholder="icon name e.g. shield-check"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-[10px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={card.title}
                          onChange={(e) => updateArrayItem('strategyCards', idx, 'title', e.target.value)}
                          placeholder="Technical SEO"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <textarea
                          value={card.description}
                          onChange={(e) => updateArrayItem('strategyCards', idx, 'description', e.target.value)}
                          rows={2}
                          placeholder="Fixed crawl errors, improved site speed, mobile usability and core web vitals."
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {activeTab === 'results' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Before vs After Results</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Two-column comparison metrics</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Heading</label>
                    <input
                      name="resultsHeading"
                      value={form.resultsHeading}
                      onChange={handleChange}
                      placeholder="Before vs After Results"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Description</label>
                    <input
                      name="resultsDescription"
                      value={form.resultsDescription}
                      onChange={handleChange}
                      placeholder="Real improvement. Real results."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Before column */}
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <input
                        name="beforeSeoLabel"
                        value={form.beforeSeoLabel}
                        onChange={handleChange}
                        placeholder="Before SEO"
                        className="flex-1 rounded-lg border border-rose-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <button
                        type="button"
                        onClick={() => addArrayItem('beforeMetrics', { icon: 'users', value: '', label: '' })}
                        className="ml-2 inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 text-[10px] font-medium transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </div>

                    {form.beforeMetrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('beforeMetrics', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={m.icon}
                            onChange={(e) => updateArrayItem('beforeMetrics', idx, 'icon', e.target.value)}
                            placeholder="icon"
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                          <input
                            value={m.value}
                            onChange={(e) => updateArrayItem('beforeMetrics', idx, 'value', e.target.value)}
                            placeholder="8,420"
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                        </div>
                        <input
                          value={m.label}
                          onChange={(e) => updateArrayItem('beforeMetrics', idx, 'label', e.target.value)}
                          placeholder="Monthly Organic Traffic"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* After column */}
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <input
                        name="afterSeoLabel"
                        value={form.afterSeoLabel}
                        onChange={handleChange}
                        placeholder="After SEO (6 Months)"
                        className="flex-1 rounded-lg border border-emerald-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => addArrayItem('afterMetrics', { icon: 'users', value: '', label: '', growth: '' })}
                        className="ml-2 inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[10px] font-medium transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </div>

                    {form.afterMetrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('afterMetrics', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            value={m.icon}
                            onChange={(e) => updateArrayItem('afterMetrics', idx, 'icon', e.target.value)}
                            placeholder="icon"
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <input
                            value={m.value}
                            onChange={(e) => updateArrayItem('afterMetrics', idx, 'value', e.target.value)}
                            placeholder="24,680"
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <input
                            value={m.growth}
                            onChange={(e) => updateArrayItem('afterMetrics', idx, 'growth', e.target.value)}
                            placeholder="+185%"
                            className="rounded-lg border border-emerald-200 px-2 py-1.5 text-xs text-emerald-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <input
                          value={m.label}
                          onChange={(e) => updateArrayItem('afterMetrics', idx, 'label', e.target.value)}
                          placeholder="Monthly Organic Traffic"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Performance Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">SEO Performance Dashboard</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Top stat cards, keyword ranking table, and the traffic growth chart</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Heading</label>
                  <input
                    name="dashboardHeading"
                    value={form.dashboardHeading}
                    onChange={handleChange}
                    placeholder="SEO Performance Dashboard"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 5 stat cards */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-sky-900">Top Stat Cards (Organic Traffic, Total Keywords, Domain Authority, Backlinks, Organic Leads)</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('dashboardStats', { icon: '', label: '', value: '', sub: '' })}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-sky-200 text-sky-700 hover:bg-sky-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Stat</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {form.dashboardStats.map((stat, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('dashboardStats', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <input
                          value={stat.icon}
                          onChange={(e) => updateArrayItem('dashboardStats', idx, 'icon', e.target.value)}
                          placeholder="icon e.g. trending-up"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-[10px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={stat.label}
                          onChange={(e) => updateArrayItem('dashboardStats', idx, 'label', e.target.value)}
                          placeholder="Organic Traffic"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={stat.value}
                          onChange={(e) => updateArrayItem('dashboardStats', idx, 'value', e.target.value)}
                          placeholder="+185%"
                          className="w-full rounded-lg border border-emerald-200 px-2 sm:px-2.5 py-1.5 text-xs text-emerald-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          value={stat.sub}
                          onChange={(e) => updateArrayItem('dashboardStats', idx, 'sub', e.target.value)}
                          placeholder="8,420 → 24,680"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-[10px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyword ranking table */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      name="keywordRankingHeading"
                      value={form.keywordRankingHeading}
                      onChange={handleChange}
                      placeholder="Keyword Ranking Growth"
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem('keywordRankings', { keyword: '', before: '', after: '' })}
                      className="ml-2 inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add Row</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {form.keywordRankings.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center p-2 rounded-lg border border-slate-200 bg-white">
                        <input
                          value={row.keyword}
                          onChange={(e) => updateArrayItem('keywordRankings', idx, 'keyword', e.target.value)}
                          placeholder="Medical Billing Services"
                          className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={row.before}
                          onChange={(e) => updateArrayItem('keywordRankings', idx, 'before', e.target.value)}
                          placeholder="#48"
                          className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={row.after}
                          onChange={(e) => updateArrayItem('keywordRankings', idx, 'after', e.target.value)}
                          placeholder="#4"
                          className="w-16 rounded-lg border border-emerald-200 px-2 py-1.5 text-xs text-center text-emerald-700 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('keywordRankings', idx)}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic growth chart */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-sky-900">Organic Traffic Growth Chart (6 Months)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <input
                      name="trafficChartHeading"
                      value={form.trafficChartHeading}
                      onChange={handleChange}
                      placeholder="Organic Traffic Growth (6 Months)"
                      className="rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      name="trafficChartValue"
                      value={form.trafficChartValue}
                      onChange={handleChange}
                      placeholder="24,680"
                      className="rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      name="trafficChartUnit"
                      value={form.trafficChartUnit}
                      onChange={handleChange}
                      placeholder="Visits/Month"
                      className="rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700">Monthly Data Points</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('trafficChartSeries', { month: '', value: '' })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-sky-200 text-sky-700 hover:bg-sky-100 text-[10px] font-medium transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Point</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {form.trafficChartSeries.map((pt, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 space-y-1.5 relative">
                          <button
                            type="button"
                            onClick={() => removeArrayItem('trafficChartSeries', idx)}
                            className="absolute top-1 right-1 text-rose-500 hover:text-rose-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <input
                            value={pt.month}
                            onChange={(e) => updateArrayItem('trafficChartSeries', idx, 'month', e.target.value)}
                            placeholder="Jan"
                            className="w-full rounded border border-slate-200 px-1.5 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                          <input
                            value={pt.value}
                            onChange={(e) => updateArrayItem('trafficChartSeries', idx, 'value', e.target.value)}
                            placeholder="8420"
                            className="w-full rounded border border-slate-200 px-1.5 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Technical SEO */}
            {activeTab === 'technical' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Technical SEO Improvements & Content Growth</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Issues found/fixed, checklist items, and indexed page growth</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Heading</label>
                  <input
                    name="technicalHeading"
                    value={form.technicalHeading}
                    onChange={handleChange}
                    placeholder="Technical SEO Improvements"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Issues found/fixed */}
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200 space-y-3 sm:space-y-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-sky-900">Issues Found → Fixed</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white border border-rose-200 space-y-2">
                        <p className="text-[10px] font-bold uppercase text-rose-400">Found</p>
                        <input
                          name="issuesFound"
                          value={form.issuesFound}
                          onChange={handleChange}
                          placeholder="68"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-bold text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <input
                          name="issuesFoundLabel"
                          value={form.issuesFoundLabel}
                          onChange={handleChange}
                          placeholder="Critical & Major Issues"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-emerald-200 space-y-2">
                        <p className="text-[10px] font-bold uppercase text-emerald-400">Fixed</p>
                        <input
                          name="issuesFixed"
                          value={form.issuesFixed}
                          onChange={handleChange}
                          placeholder="68"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-bold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          name="issuesFixedLabel"
                          value={form.issuesFixedLabel}
                          onChange={handleChange}
                          placeholder="100% Resolved"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700">Checklist Items</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('technicalChecklist', { text: '' })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-sky-200 text-sky-700 hover:bg-sky-100 text-[10px] font-medium transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {form.technicalChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <input
                            value={item.text}
                            onChange={(e) => updateArrayItem('technicalChecklist', idx, 'text', e.target.value)}
                            placeholder="Crawlability & Indexing"
                            className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('technicalChecklist', idx)}
                            className="text-rose-500 hover:text-rose-700"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content growth */}
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                    <input
                      name="contentGrowthHeading"
                      value={form.contentGrowthHeading}
                      onChange={handleChange}
                      placeholder="Content Growth"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white border border-rose-200 space-y-2">
                        <p className="text-[10px] font-bold uppercase text-rose-400">Before</p>
                        <input
                          name="contentBeforeValue"
                          value={form.contentBeforeValue}
                          onChange={handleChange}
                          placeholder="32"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-bold text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <input
                          name="contentBeforeLabel"
                          value={form.contentBeforeLabel}
                          onChange={handleChange}
                          placeholder="Indexed Pages"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-emerald-200 space-y-2">
                        <p className="text-[10px] font-bold uppercase text-emerald-400">After</p>
                        <input
                          name="contentAfterValue"
                          value={form.contentAfterValue}
                          onChange={handleChange}
                          placeholder="118"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-bold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          name="contentAfterLabel"
                          value={form.contentAfterLabel}
                          onChange={handleChange}
                          placeholder="Indexed Pages"
                          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700">Checklist Items (label + value)</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('contentChecklist', { label: '', value: '' })}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] font-medium transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {form.contentChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <input
                            value={item.label}
                            onChange={(e) => updateArrayItem('contentChecklist', idx, 'label', e.target.value)}
                            placeholder="Blog Articles Published"
                            className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <input
                            value={item.value}
                            onChange={(e) => updateArrayItem('contentChecklist', idx, 'value', e.target.value)}
                            placeholder="42"
                            className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-center font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('contentChecklist', idx)}
                            className="text-rose-500 hover:text-rose-700"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Impact */}
            {activeTab === 'impact' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Business Impact</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">The bottom stat cards showing real business results</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Heading</label>
                    <input
                      name="impactHeading"
                      value={form.impactHeading}
                      onChange={handleChange}
                      placeholder="Business Impact"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Subheading</label>
                    <input
                      name="impactSubheading"
                      value={form.impactSubheading}
                      onChange={handleChange}
                      placeholder="SEO that drives real business results"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-emerald-900">Stat Cards (e.g. +214% Organic Leads)</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('impactStats', { value: '', label: '' })}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Stat</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {form.impactStats.map((stat, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('impactStats', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <input
                          value={stat.value}
                          onChange={(e) => updateArrayItem('impactStats', idx, 'value', e.target.value)}
                          placeholder="+214%"
                          className="w-full rounded-lg border border-emerald-200 px-2 sm:px-2.5 py-1.5 text-sm font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          value={stat.label}
                          onChange={(e) => updateArrayItem('impactStats', idx, 'label', e.target.value)}
                          placeholder="Organic Leads"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tools & Technologies */}
            {activeTab === 'tools' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Tools & Technologies</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Grid of tool logos/names used in this project</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Heading</label>
                  <input
                    name="toolsHeading"
                    value={form.toolsHeading}
                    onChange={handleChange}
                    placeholder="Tools & Technologies"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Tools (e.g. Google Search Console, ahrefs, SEMrush)</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('tools', { name: '', logo: '' })}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Tool</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {form.tools.map((tool, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => removeArrayItem('tools', idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <input
                          value={tool.name}
                          onChange={(e) => updateArrayItem('tools', idx, 'name', e.target.value)}
                          placeholder="Google Search Console"
                          className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            value={tool.logo}
                            onChange={(e) => updateArrayItem('tools', idx, 'logo', e.target.value)}
                            placeholder={tool.logo}
                            className="flex-1 rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          {tool.logo && (
                            <div className="h-8 w-8 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                              <img src={tool.logo} alt={tool.name} className="h-full w-full object-contain" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Client Testimonial */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-emerald-900">Client Testimonial</h4>
                    <p className="text-[10px] xs:text-xs text-emerald-700/80 mt-0.5">
                      Optional quote from the client shown alongside the tools used
                    </p>
                  </div>

                  <ImageUploadField
                    label="Testimonial Photo"
                    name="testimonial.image"
                    value={form.testimonial?.image}
                    placeholder="/images/testimonials/client-photo.jpg"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        value={form.testimonial?.name || ''}
                        onChange={(e) => updateFormValue('testimonial.name', e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Occupation</label>
                      <input
                        type="text"
                        value={form.testimonial?.occupation || ''}
                        onChange={(e) => updateFormValue('testimonial.occupation', e.target.value)}
                        placeholder="Marketing Director, Healthcare Brand"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5">Testimonial Description</label>
                    <textarea
                      rows={3}
                      value={form.testimonial?.description || ''}
                      onChange={(e) => updateFormValue('testimonial.description', e.target.value)}
                      placeholder="Working with this team completely transformed our organic visibility..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">SEO & Meta Tags</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">Optimize for search engines</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">SEO Title</label>
                    <input
                      name="seoTitle"
                      value={form.seoTitle}
                      onChange={handleChange}
                      placeholder="Healthcare Brand SEO Case Study | Your Company"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5">
                      {form.seoTitle.length}/60 characters (optimal: 50-60)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">SEO Description</label>
                    <textarea
                      name="seoDescription"
                      value={form.seoDescription}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Discover how we grew organic traffic 185% for a healthcare brand..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5">
                      {form.seoDescription.length}/160 characters (optimal: 150-160)
                    </p>
                  </div>

                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200">
                    <h4 className="text-[10px] xs:text-xs font-semibold text-sky-900 mb-2 sm:mb-3">Google Search Preview</h4>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-blue-600 line-clamp-1">{form.seoTitle || 'SEO Title Preview'}</p>
                      <p className="text-[10px] xs:text-xs text-emerald-700 line-clamp-1">
                        yourwebsite.com/portfolio-seo/{form.slug || 'slug'}
                      </p>
                      <p className="text-[10px] xs:text-xs text-slate-600 line-clamp-2">{form.seoDescription || 'SEO description preview...'}</p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2 sm:pt-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border-2 border-slate-200 bg-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>Preview Case Study</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card Preview */}
            {activeTab === 'card' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">Portfolio Card Content</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Configures the image, short description, and badges shown on main portfolio listing cards.
                  </p>
                </div>

                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200 space-y-3 sm:space-y-4">
                  {/* Card Image (new) */}
                  <ImageUploadField
                    label="Card Image"
                    name="portfolioCardContent.cardImage"
                    value={form.portfolioCardContent?.cardImage}
                    placeholder="/images/portfolio-seo/card-thumbnail.jpg"
                  />

                  {/* Card Logo (new) */}
                  <ImageUploadField
                    label="Card Logo"
                    name="portfolioCardContent.logo"
                    value={form.portfolioCardContent?.logo}
                    placeholder="/images/portfolio-seo/client-logo.png"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Featured Tag */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                        Featured Tag / Badge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Case Study, Featured"
                        value={form.portfolioCardContent?.featuredTag || ''}
                        onChange={(e) =>
                          updateFormValue('portfolioCardContent.featuredTag', e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    {/* Project / Client URL (new) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                        Project / Client URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://clientwebsite.com"
                        value={form.portfolioCardContent?.url || ''}
                        onChange={(e) =>
                          updateFormValue('portfolioCardContent.url', e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Short Description */}

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Card Short Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Summary text for portfolio page card..."
                      value={form.portfolioCardContent?.shortDescription || ''}
                      onChange={(e) =>
                        updateFormValue('portfolioCardContent.shortDescription', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Highlights List — value (e.g. "+250%") and text/content are now
                    separate fields instead of one combined input */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Card Highlight Bullet Points</h4>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-slate-200 text-sky-700 hover:bg-sky-50 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Highlight</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(form.portfolioCardContent?.highlights || []).map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white">
                        <input
                          type="text"
                          placeholder="Value e.g. +250%"
                          value={highlight.value || ''}
                          onChange={(e) =>
                            updateFormValue(`portfolioCardContent.highlights.${index}.value`, e.target.value)
                          }
                          className="w-28 sm:w-32 shrink-0 rounded-lg border border-emerald-200 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder={`Content #${index + 1} (e.g. Organic Traffic)`}
                          value={highlight.text || ''}
                          onChange={(e) =>
                            updateFormValue(`portfolioCardContent.highlights.${index}.text`, e.target.value)
                          }
                          className="flex-1 rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
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