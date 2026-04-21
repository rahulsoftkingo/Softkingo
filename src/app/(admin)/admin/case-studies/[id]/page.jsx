// src/app/(admin)/admin/case-studies/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft, Save, Upload, Image as ImageIcon, Code, Users,
  Palette, FileText, Layout, TrendingUp, Search as SearchIcon,
  CheckCircle2, AlertCircle, Loader2, X, Plus, Trash2, Eye,
  Link2, Folder, FolderOpen, ZoomIn, ChevronRight, Home, ChevronDown,
} from 'lucide-react';
import BlogCategorySelector from '@/components/admin/BlogCategorySelector';
import MiniRichTextEditor from '@/components/admin/MiniRichTextEditor';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FileText, mobileLabel: 'Basic' },
  { id: 'hero', label: 'Hero & Brand', icon: Palette, mobileLabel: 'Hero' },
  { id: 'team', label: 'Team & Client', icon: Users, mobileLabel: 'Team' },
  { id: 'tech', label: 'Tech Stack', icon: Code, mobileLabel: 'Tech' },
  { id: 'content', label: 'Content', icon: Layout, mobileLabel: 'Content' },
  { id: 'screens', label: 'Screens', icon: ImageIcon, mobileLabel: 'Screens' },
  { id: 'results', label: 'Results', icon: TrendingUp, mobileLabel: 'Results' },
  { id: 'testimonial', label: 'Testimonial', icon: CheckCircle2, mobileLabel: 'Review' },
  { id: 'blogs', label: 'Blog Section', icon: FileText, mobileLabel: 'Blogs' },
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

export default function CaseStudyEditPage() {
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
    slug: '',
    title: '',
    subtitle: '',
    logo: '',
    heroBgImage: '',
    heroMockups: '',
    primaryColor: '#0EA5E9',
    secondaryColor: '#0B3250',
    accentColor: '#22C55E',
    primaryFont: 'DM Sans',
    clientHeadingFont: 'DM Sans',
    clientBodyFont: 'DM Sans',
    teamSize: '06 People',
    teamRoles: 'PM / TL / Devs / Designers / QA',
    teamTimeline: '60 Days',
    teamDuration: 'Design + Development',
    clientName: '',
    clientSubtitle: '',
    clientLocation: '',
    clientIndustry: '',
    clientAvatar: '',
    clientReview: '',
    testimonials: [],
    techBackgroundImage: '/images/tech-bg.jpg',
    techItems: [{ name: 'React JS', icon: '/images/tech/react-js.png' }],
    overviewDescription: '',
    overviewMockup: '/images/case-studies/overview-phone.png',
    requirementsItems: [{ title: '', description: '' }],
    requirementsMockup: '/images/case-studies/requirements-phone.png',
    goalsBackgroundImage: '/images/case-studies/goals-bg.jpg',
    goalsItems: [{ title: '', description: '' }],
    mainChallenge: '',
    challenges: [
      { tabLabel: "Analysis", title: "Project Analysis", description: "", image: "" }
    ],
    appScreensTitle: 'How Your App Looks When It Is Ready',
    appScreensCategories: [
      {
        id: 'customer',
        name: 'Customer App',
        layout: 'mobile',
        categoryImage: '',
        screens: [{ name: 'Home', image: '/images/case-studies/screen1.png' }],
      },
    ],
    resultsBlocks: [
      {
        position: 'left',
        mockup: '/images/case-studies/screen1.png',
        items: ['Example result'],
      },
    ],
    findTitle: '',
    findDescription: '',
    findMockup: '/images/case-studies/find-app-phone.png',
    blogTitle: 'Our Latest Blogs',
    blogSubtitle: 'Explore our latest insights, product lessons, and engineering best practices.',
    blogCategory: '',
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    if (!isNew) {
      fetchCaseStudy();
    }
  }, [params.id]);
  // ✅ FIXED: Auto-load files when browser opens
  useEffect(() => {
    if (showImageBrowser && currentFolder === '' && folderFiles.length === 0) {
      fetchFolderFiles('');
    }
  }, [showImageBrowser]);

  async function fetchCaseStudy() {
    setLoading(true);
    const res = await fetch(`/api/admin/case-studies/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      const branding = safeParse(data.brandingJson, {});
      const team = safeParse(data.teamJson, {});
      const client = safeParse(data.clientJson, {});
      const technologies = safeParse(data.technologiesJson, {});
      const overview = safeParse(data.overviewJson, {});
      const requirements = safeParse(data.requirementsJson, {});
      const goals = safeParse(data.goalsJson, {});
      const challenges = safeParse(data.challengesJson, {});
      const appScreens = safeParse(data.appScreensJson, {});
      const resultsBlocks = safeParse(data.resultsJson, []);
      const findYourApp = safeParse(data.findYourAppJson, {});

      setForm((prev) => ({
        ...prev,
        slug: data.slug || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        logo: data.logo || '',
        heroBgImage: data.heroBgImage || '',
        heroMockups: data.heroMockups || '',
        primaryColor: branding.primaryColor || prev.primaryColor,
        secondaryColor: branding.secondaryColor || prev.secondaryColor,
        accentColor: branding.accentColor || prev.accentColor,
        primaryFont: branding.primaryFont || prev.primaryFont,
        clientHeadingFont: branding.clientHeadingFont || prev.clientHeadingFont,
        clientBodyFont: branding.clientBodyFont || prev.clientBodyFont,
        teamSize: team.size || prev.teamSize,
        teamRoles: team.roles || prev.teamRoles,
        teamTimeline: team.timeline || prev.teamTimeline,
        teamDuration: team.duration || prev.teamDuration,
        clientName: client.name || '',
        clientSubtitle: client.subtitle || '',
        clientLocation: client.location || '',
        clientIndustry: client.industry || '',
        clientAvatar: client.avatar || '',
        clientReview: client.review || '',
        testimonials: client.testimonials || (client.review ? [{
          name: client.name || '',
          designation: client.subtitle || '',
          avatar: client.avatar || '',
          review: client.review || ''
        }] : []),
        techBackgroundImage: technologies.backgroundImage || prev.techBackgroundImage,
        techItems: technologies.items?.length ? technologies.items : prev.techItems,
        overviewDescription: overview.description || '',
        overviewMockup: overview.mockup || prev.overviewMockup,
        requirementsItems: requirements.items?.length
          ? requirements.items.map(it => ({ title: it.title || '', description: it.description || '' }))
          : (requirements.items || []).length === 0 && requirements.text
            ? requirements.text.split('\n').map(line => {
              const [title, ...rest] = line.split(':');
              return { title: title?.trim() || 'Point', description: rest.join(':')?.trim() || '' };
            })
            : [{ title: '', description: '' }],
        requirementsMockup: requirements.mockup || prev.requirementsMockup,
        goalsBackgroundImage: goals.backgroundImage || prev.goalsBackgroundImage,
        goalsItems: goals.items?.length
          ? (typeof goals.items[0] === 'string'
            ? goals.items.map(it => ({ title: it, description: '' }))
            : goals.items.map(it => ({ title: it.title || '', description: it.description || '' }))
          )
          : [{ title: '', description: '' }],
        challenges: (() => {
          const cData = safeParse(data.challengesJson, {});
          if (Array.isArray(cData)) return cData;
          return Array.isArray(cData.solutions) ? cData.solutions : [
            { tabLabel: "Analysis", title: "The Solution", description: cData.solution || "", image: "" }
          ];
        })(),
        mainChallenge: (() => {
          const cData = safeParse(data.challengesJson, {});
          return cData.mainChallenge || cData.challenge || '';
        })(),
        appScreensTitle: appScreens.title || prev.appScreensTitle,
        appScreensCategories: appScreens.categories?.length
          ? appScreens.categories
          : prev.appScreensCategories,
        resultsBlocks: resultsBlocks?.length ? resultsBlocks : prev.resultsBlocks,
        findTitle: findYourApp.title || '',
        findDescription: findYourApp.description || '',
        findMockup: findYourApp.mockup || prev.findMockup,
        blogTitle: findYourApp.blogTitle || 'Our Latest Blogs',
        blogSubtitle: findYourApp.blogSubtitle || 'Explore our latest insights, product lessons, and engineering best practices.',
        blogCategory: findYourApp.blogCategory || '',
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
      }));
    }
    setLoading(false);
  }

  // ✅ Helper to update nested form values (e.g., "appScreensCategories.0.categoryImage")
  const updateFormValue = (path, value) => {
    setForm((prev) => {
      const parts = path.split('.');
      if (parts.length === 1) return { ...prev, [path]: value };

      // Generic array update e.g. "testimonials.0.avatar" or "appScreensCategories.1.name"
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
      fd.append('folder', 'case-studies');
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      updateFormValue(fieldName, data.url);
      setSuccess(`Image uploaded!`);
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(`Failed to upload image`);
    } finally {
      e.target.value = '';
      setUploadingField(null);
    }
  };

  // Fetch files from folder using your existing API
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

  // ✅ FIXED: Open image browser with immediate load
  const openImageBrowser = (fieldName) => {
    setCurrentImageField(fieldName);
    setCurrentFolder('');
    setSearchQuery('');
    setShowImageBrowser(true);
    fetchFolderFiles(''); // Immediate fetch
  };

  // Navigate to folder
  const navigateToFolder = (folderPath) => {
    setCurrentFolder(folderPath);
    setSearchQuery('');
    fetchFolderFiles(folderPath);
  };

  // Go back to parent folder
  const goToParentFolder = () => {
    const parts = currentFolder.split('/').filter(Boolean);
    parts.pop();
    const parentFolder = parts.join('/');
    navigateToFolder(parentFolder);
  };

  // Select image from browser
  const selectImageFromBrowser = (imagePath) => {
    updateFormValue(currentImageField, imagePath);
    setShowImageBrowser(false);
    setSuccess('Image selected!');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Filter files by search
  const filteredFiles = folderFiles.filter((file) => {
    if (!searchQuery) return true;
    return file.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Separate folders and images
  const folders = filteredFiles.filter((f) => f.isDir);
  const images = filteredFiles.filter((f) => !f.isDir && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f.name));

  // Tech items
  const addTechItem = () =>
    setForm((prev) => ({
      ...prev,
      techItems: [...prev.techItems, { name: '', icon: '' }],
    }));

  const updateTechItem = (index, field, value) =>
    setForm((prev) => {
      const copy = [...prev.techItems];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, techItems: copy };
    });

  const removeTechItem = (index) =>
    setForm((prev) => ({
      ...prev,
      techItems: prev.techItems.filter((_, i) => i !== index),
    }));

  // App screens
  const addAppCategory = () =>
    setForm((prev) => ({
      ...prev,
      appScreensCategories: [
        ...prev.appScreensCategories,
        { id: `cat-${Date.now()}`, name: '', layout: 'mobile', categoryImage: '', screens: [] },
      ],
    }));

  const updateAppCategory = (index, field, value) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, appScreensCategories: copy };
    });

  const removeAppCategory = (index) =>
    setForm((prev) => ({
      ...prev,
      appScreensCategories: prev.appScreensCategories.filter((_, i) => i !== index),
    }));

  const addAppScreen = (catIndex) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      const screens = copy[catIndex].screens || [];
      screens.push({ name: '', image: '' });
      copy[catIndex] = { ...copy[catIndex], screens };
      return { ...prev, appScreensCategories: copy };
    });

  const updateAppScreen = (catIndex, screenIndex, field, value) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      const screens = [...(copy[catIndex].screens || [])];
      screens[screenIndex] = { ...screens[screenIndex], [field]: value };
      copy[catIndex] = { ...copy[catIndex], screens };
      return { ...prev, appScreensCategories: copy };
    });

  const removeAppScreen = (catIndex, screenIndex) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      const screens = (copy[catIndex].screens || []).filter((_, i) => i !== screenIndex);
      copy[catIndex] = { ...copy[catIndex], screens };
      return { ...prev, appScreensCategories: copy };
    });

  // Results blocks
  const addResultBlock = () =>
    setForm((prev) => ({
      ...prev,
      resultsBlocks: [
        ...prev.resultsBlocks,
        { position: 'left', mockup: '', items: [''] },
      ],
    }));

  const updateResultBlockField = (index, field, value) =>
    setForm((prev) => {
      const copy = [...prev.resultsBlocks];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, resultsBlocks: copy };
    });

  const updateResultBlockItems = (index, value) =>
    setForm((prev) => {
      const copy = [...prev.resultsBlocks];
      copy[index] = {
        ...copy[index],
        items: value.split('\n').filter(Boolean),
      };
      return { ...prev, resultsBlocks: copy };
    });

  const removeResultBlock = (index) =>
    setForm((prev) => ({
      ...prev,
      resultsBlocks: prev.resultsBlocks.filter((_, i) => i !== index),
    }));

  // Testimonials
  const addTestimonial = () =>
    setForm((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), { name: '', designation: '', avatar: '', review: '' }],
    }));

  const updateTestimonial = (index, field, value) =>
    setForm((prev) => {
      const copy = [...(prev.testimonials || [])];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, testimonials: copy };
    });

  const removeTestimonial = (index) =>
    setForm((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index),
    }));

  // Build JSON helpers
  function buildBrandingJson() {
    return JSON.stringify({
      primaryColor: form.primaryColor,
      secondaryColor: form.secondaryColor,
      accentColor: form.accentColor,
      primaryFont: form.primaryFont,
      clientHeadingFont: form.clientHeadingFont,
      clientBodyFont: form.clientBodyFont,
      colors: [
        { name: 'Primary', hex: form.primaryColor },
        { name: 'Secondary', hex: form.secondaryColor },
        { name: 'Accent', hex: form.accentColor },
      ],
    });
  }

  function buildTeamJson() {
    return JSON.stringify({
      size: form.teamSize,
      roles: form.teamRoles,
      timeline: form.teamTimeline,
      duration: form.teamDuration,
    });
  }

  function buildClientJson() {
    return JSON.stringify({
      name: form.clientName,
      subtitle: form.clientSubtitle,
      location: form.clientLocation,
      industry: form.clientIndustry,
      avatar: form.clientAvatar,
      review: form.clientReview, // Owner's review for Branding popup
      testimonials: form.testimonials || [], // End user reviews for Voices of Trust
    });
  }

  function buildTechnologiesJson() {
    return JSON.stringify({
      backgroundImage: form.techBackgroundImage,
      items: form.techItems.filter((t) => t.name),
    });
  }

  function buildOverviewJson() {
    return JSON.stringify({
      description: form.overviewDescription,
      mockup: form.overviewMockup,
    });
  }

  function buildRequirementsJson() {
    return JSON.stringify({
      items: (form.requirementsItems || []).filter(i => i.title),
      mockup: form.requirementsMockup,
    });
  }

  function buildGoalsJson() {
    return JSON.stringify({
      backgroundImage: form.goalsBackgroundImage,
      items: (form.goalsItems || []).filter(i => i.title),
    });
  }

  function buildChallengesJson() {
    return JSON.stringify({
      mainChallenge: form.mainChallenge,
      solutions: form.challenges || []
    });
  }

  function buildAppScreensJson() {
    return JSON.stringify({
      title: form.appScreensTitle,
      categories: form.appScreensCategories.map((c) => ({
        id: c.id || slugify(c.name || 'category'),
        name: c.name,
        layout: c.layout || 'mobile',
        categoryImage: c.categoryImage || '',
        screens: (c.screens || []).filter((s) => s.name),
      })),
    });
  }

  function buildResultsJson() {
    const blocks = form.resultsBlocks
      .map((b) => ({
        position: b.position || 'left',
        mockup: b.mockup,
        items: (b.items || []).filter(Boolean),
      }))
      .filter((b) => b.items && b.items.length);
    return JSON.stringify(blocks);
  }

  function buildFindYourAppJson() {
    return JSON.stringify({
      title: form.findTitle,
      description: form.findDescription,
      mockup: form.findMockup,
      blogTitle: form.blogTitle,
      blogSubtitle: form.blogSubtitle,
      blogCategory: form.blogCategory,
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
      ? '/api/admin/case-studies'
      : `/api/admin/case-studies/${params.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      logo: form.logo || null,
      heroBgImage: form.heroBgImage || null,
      heroMockups: form.heroMockups || null,
      brandingJson: buildBrandingJson(),
      teamJson: buildTeamJson(),
      clientJson: buildClientJson(),
      technologiesJson: buildTechnologiesJson(),
      overviewJson: buildOverviewJson(),
      requirementsJson: buildRequirementsJson(),
      goalsJson: buildGoalsJson(),
      challengesJson: buildChallengesJson(),
      appScreensJson: buildAppScreensJson(),
      resultsJson: buildResultsJson(),
      findYourAppJson: buildFindYourAppJson(),
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

  // Advanced Image Upload Field Component with 3 Options
  // ✅ FIXED: Advanced Image Upload Field with proper name handling
  const ImageUploadField = ({ label, name, value, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-slate-700">{label}</label>

      {/* ✅ FIXED: Added proper name and value props */}
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 1. Upload from Device */}
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
            onChange={(e) => handleFileUpload(e, name)}
            disabled={uploadingField === name}
          />
        </label>

        {/* 2. Browse from Public Folder */}
        <button
          type="button"
          onClick={() => openImageBrowser(name)}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 transition-colors"
        >
          <Folder className="h-3 w-3" />
          <span className="hidden sm:inline">Browse</span>
          <span className="sm:hidden">📁</span>
        </button>

        {/* 3. Preview/Zoom */}
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


  // Image Browser Modal Component (Using your existing API)
  const ImageBrowserModal = () => {
    if (!showImageBrowser) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-slate-50 flex-shrink-0">
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

          {/* Breadcrumb Navigation */}
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
                    onClick={() => {
                      const path = arr.slice(0, idx + 1).join('/');
                      navigateToFolder(path);
                    }}
                    className="px-2 py-1 rounded hover:bg-white transition-colors text-slate-700 hover:text-slate-900"
                  >
                    {part}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
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

          {/* Files Grid */}
          <div className="p-3 sm:p-4 md:p-5 overflow-y-auto flex-1">
            {loadingFiles ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Folders */}
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

                {/* Images */}
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
                            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!loadingFiles && folders.length === 0 && images.length === 0 && (
                  <div className="text-center py-12">
                    <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-xs sm:text-sm text-slate-500">No files found</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-xs text-sky-600 hover:text-sky-700"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
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

  // Image Preview Modal
  const ImagePreviewModal = () => {
    if (!imagePreview) return null;

    return (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
        onClick={() => setImagePreview(null)}
      >
        <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button
            onClick={() => setImagePreview(null)}
            className="absolute -top-8 right-0 sm:-top-10 sm:-right-10 md:-top-12 md:-right-12 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </button>

          {/* Image */}
          <div className="relative bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto max-h-[85vh] object-contain"
            />

            {/* Image Info */}
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
                {isNew ? 'Create' : 'Edit'} Case Study
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                {form.title || 'Untitled'}
              </p>
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

            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Basic Information
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Essential details about your case study
                  </p>
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
                      placeholder="lovelocal-grocery-app"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1">
                      URL-friendly identifier
                    </p>
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
                      placeholder="Love Local - Grocery Delivery App"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Subtitle
                    </label>
                    <textarea
                      name="subtitle"
                      value={form.subtitle}
                      onChange={handleChange}
                      rows={2}
                      placeholder="A brief tagline..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Hero & Branding Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Hero Section & Branding
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Configure hero banner and brand colors
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                  <ImageUploadField
                    label="Logo"
                    name="logo"
                    value={form.logo}
                    placeholder="/images/logos/lovelocal.png"
                  />

                  <ImageUploadField
                    label="Hero Background Image"
                    name="heroBgImage"
                    value={form.heroBgImage}
                    placeholder="/images/hero-bg.jpg"
                  />

                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Hero Mockups"
                      name="heroMockups"
                      value={form.heroMockups}
                      placeholder="/images/screen-showcase.png"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="color"
                        name="primaryColor"
                        value={form.primaryColor}
                        onChange={handleChange}
                        className="h-9 w-14 sm:h-10 sm:w-16 md:h-12 md:w-20 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.primaryColor}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, primaryColor: e.target.value }))
                        }
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="color"
                        name="secondaryColor"
                        value={form.secondaryColor}
                        onChange={handleChange}
                        className="h-9 w-14 sm:h-10 sm:w-16 md:h-12 md:w-20 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.secondaryColor}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, secondaryColor: e.target.value }))
                        }
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="color"
                        name="accentColor"
                        value={form.accentColor}
                        onChange={handleChange}
                        className="h-9 w-14 sm:h-10 sm:w-16 md:h-12 md:w-20 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.accentColor}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, accentColor: e.target.value }))
                        }
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Primary Font
                    </label>
                    <input
                      name="primaryFont"
                      value={form.primaryFont}
                      onChange={handleChange}
                      placeholder="DM Sans"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Team & Client Tab */}
            {activeTab === 'team' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Team & Client Information
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Details about the project team and client
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Team Section */}
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200">
                    <h4 className="text-xs sm:text-sm font-semibold text-sky-900 mb-3 sm:mb-4">Team Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Team Size
                        </label>
                        <input
                          name="teamSize"
                          value={form.teamSize}
                          onChange={handleChange}
                          placeholder="06 People"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Roles
                        </label>
                        <input
                          name="teamRoles"
                          value={form.teamRoles}
                          onChange={handleChange}
                          placeholder="PM / TL / Devs / Designers"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Timeline
                        </label>
                        <input
                          name="teamTimeline"
                          value={form.teamTimeline}
                          onChange={handleChange}
                          placeholder="60 Days"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Duration
                        </label>
                        <input
                          name="teamDuration"
                          value={form.teamDuration}
                          onChange={handleChange}
                          placeholder="Design + Development"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Client Section */}
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-purple-50 border border-purple-200">
                    <h4 className="text-xs sm:text-sm font-semibold text-purple-900 mb-3 sm:mb-4">Client Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Client Name
                        </label>
                        <input
                          name="clientName"
                          value={form.clientName}
                          onChange={handleChange}
                          placeholder="Love Local Inc."
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Subtitle
                        </label>
                        <input
                          name="clientSubtitle"
                          value={form.clientSubtitle}
                          onChange={handleChange}
                          placeholder="E-Commerce Platform"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Location
                        </label>
                        <input
                          name="clientLocation"
                          value={form.clientLocation}
                          onChange={handleChange}
                          placeholder="San Francisco, CA"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Industry
                        </label>
                        <input
                          name="clientIndustry"
                          value={form.clientIndustry}
                          onChange={handleChange}
                          placeholder="Retail & E-Commerce"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-4">
                        <ImageUploadField
                          label="Client Avatar"
                          name="clientAvatar"
                          value={form.clientAvatar}
                          placeholder="/images/clients/avatar.jpg"
                        />

                        <div className="space-y-2 pt-2">
                          <label className="block text-[10px] xs:text-xs font-bold text-slate-700 uppercase tracking-widest">
                            Client Review (About Softkingo) - Pop-up Content
                          </label>
                          <textarea
                            name="clientReview"
                            value={form.clientReview}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Working with Softkingo was an incredible experience..."
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 outline-none italic"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial Tab */}
            {activeTab === 'testimonial' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                      End User Testimonials (Voices Of Trust)
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                      Manage reviews from the users of this product
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addTestimonial}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {(form.testimonials || []).map((t, idx) => (
                    <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 relative group">
                      <button
                        type="button"
                        onClick={() => removeTestimonial(idx)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                              Client Name
                            </label>
                            <input
                              name={`testimonials.${idx}.name`}
                              value={t.name}
                              onChange={handleChange}
                              placeholder="e.g. John Doe"
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                              Designation
                            </label>
                            <input
                              name={`testimonials.${idx}.designation`}
                              value={t.designation}
                              onChange={handleChange}
                              placeholder="e.g. CEO at TechCorp"
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                          <ImageUploadField
                            label="Client Avatar"
                            name={`testimonials.${idx}.avatar`}
                            value={t.avatar}
                            placeholder="/images/client.jpg"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500">
                            The Review
                          </label>
                          <textarea
                            name={`testimonials.${idx}.review`}
                            value={t.review}
                            onChange={handleChange}
                            rows={6}
                            placeholder="A wonderful review of your partnership..."
                            className="w-full h-full min-h-[120px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none italic"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {form.testimonials?.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">No testimonials added yet. Click "Add Testimonial" to start.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technologies Tab */}
            {activeTab === 'tech' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Technologies Used
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Tech stack and background image
                  </p>
                </div>

                <ImageUploadField
                  label="Background Image"
                  name="techBackgroundImage"
                  value={form.techBackgroundImage}
                  placeholder="/images/tech-bg.jpg"
                />

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700">
                      Technology Items
                    </label>
                    <button
                      type="button"
                      onClick={addTechItem}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Tech</span>
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {form.techItems.map((tech, index) => (
                      <div
                        key={index}
                        className="p-2.5 sm:p-3 md:p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] xs:text-xs font-medium text-slate-600">
                            Tech #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeTechItem(index)}
                            className="text-rose-600 hover:text-rose-700 transition-colors"
                          >
                            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                              Name
                            </label>
                            <input
                              value={tech.name}
                              onChange={(e) =>
                                updateTechItem(index, 'name', e.target.value)
                              }
                              placeholder="React JS"
                              className="w-full rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                              Icon URL
                            </label>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <input
                                value={tech.icon}
                                onChange={(e) =>
                                  updateTechItem(index, 'icon', e.target.value)
                                }
                                placeholder="/images/tech/react.png"
                                className="flex-1 rounded-lg border border-slate-200 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                              />
                              {tech.icon && (
                                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded border border-slate-200 overflow-hidden bg-white flex-shrink-0">
                                  <img src={tech.icon} alt="" className="h-full w-full object-contain p-0.5" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Content Sections
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Overview, requirements, goals, and challenges
                  </p>
                </div>

                {/* Overview */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">Overview</h4>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      name="overviewDescription"
                      value={form.overviewDescription}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Project overview..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>
                  <ImageUploadField
                    label="Mockup Image"
                    name="overviewMockup"
                    value={form.overviewMockup}
                    placeholder="/images/overview-phone.png"
                  />
                </div>

                {/* Requirements */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider">Project Requirements</h4>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, requirementsItems: [...(prev.requirementsItems || []), { title: '', description: '' }] }))}
                      className="text-[10px] font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm"
                    >
                      <Plus size={12} /> Add Requirement
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(form.requirementsItems || []).map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, requirementsItems: prev.requirementsItems.filter((_, i) => i !== idx) }))}
                          className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X size={12} />
                        </button>
                        <div className="grid gap-3">
                          <input
                            placeholder="Requirement Title"
                            value={item.title}
                            onChange={(e) => setForm(prev => {
                              const copy = [...prev.requirementsItems];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              return { ...prev, requirementsItems: copy };
                            })}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-sky-500 outline-none"
                          />
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Requirement Description (Rich Text)</label>
                            <MiniRichTextEditor
                              value={item.description}
                              onChange={(val) => setForm(prev => {
                                const copy = [...prev.requirementsItems];
                                copy[idx] = { ...copy[idx], description: val };
                                return { ...prev, requirementsItems: copy };
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ImageUploadField
                    label="Mockup Image"
                    name="requirementsMockup"
                    value={form.requirementsMockup}
                    placeholder="/images/requirements-phone.png"
                  />
                </div>

                {/* Goals */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider">Goals & Objectives</h4>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, goalsItems: [...(prev.goalsItems || []), { title: '', description: '' }] }))}
                      className="text-[10px] font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm"
                    >
                      <Plus size={12} /> Add Goal
                    </button>
                  </div>

                  <ImageUploadField
                    label="Background Image"
                    name="goalsBackgroundImage"
                    value={form.goalsBackgroundImage}
                    placeholder="/images/goals-bg.jpg"
                  />

                  <div className="space-y-4">
                    {(form.goalsItems || []).map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, goalsItems: prev.goalsItems.filter((_, i) => i !== idx) }))}
                          className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X size={12} />
                        </button>
                        <div className="grid gap-3">
                          <input
                            placeholder="Goal Title"
                            value={item.title}
                            onChange={(e) => setForm(prev => {
                              const copy = [...prev.goalsItems];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              return { ...prev, goalsItems: copy };
                            })}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-sky-500 outline-none"
                          />
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Goal Description (Rich Text)</label>
                            <MiniRichTextEditor
                              value={item.description}
                              onChange={(val) => setForm(prev => {
                                const copy = [...prev.goalsItems];
                                copy[idx] = { ...copy[idx], description: val };
                                return { ...prev, goalsItems: copy };
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider">The Main Challenge (Static Left Side)</h4>
                      <p className="text-[10px] text-slate-500">This text appears fixed on the left side of the public section.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <MiniRichTextEditor
                      value={form.mainChallenge}
                      onChange={(val) => setForm(prev => ({ ...prev, mainChallenge: val }))}
                    />
                  </div>

                  <div className="h-px bg-slate-200 my-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider">Interactive Solution Steps (Right Side Tabs)</h4>
                      <p className="text-[10px] text-slate-500">Add multiple steps that users can hover through.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, challenges: [...(prev.challenges || []), { tabLabel: 'Solution', title: '', description: '', image: '' }] }))}
                      className="text-[10px] font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm"
                    >
                      <Plus size={12} /> Add Step
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(form.challenges || []).map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, challenges: prev.challenges.filter((_, i) => i !== idx) }))}
                          className="absolute -top-2 -right-2 bg-white shadow-md border border-slate-100 text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X size={12} />
                        </button>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Tab Label</label>
                            <input
                              value={item.tabLabel}
                              onChange={(e) => updateFormValue(`challenges.${idx}.tabLabel`, e.target.value)}
                              placeholder="e.g. Analysis"
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Heading / Title</label>
                            <input
                              value={item.title}
                              onChange={(e) => updateFormValue(`challenges.${idx}.title`, e.target.value)}
                              placeholder="e.g. Project Analysis"
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Description / Solution (Rich Text)</label>
                            <MiniRichTextEditor
                              value={item.description}
                              onChange={(val) => updateFormValue(`challenges.${idx}.description`, val)}
                            />
                          </div>
                          <div className="sm:col-span-2">
                             <ImageUploadField
                                label="Solution Image (Optional)"
                                name={`challenges.${idx}.image`}
                                value={item.image}
                                placeholder="/images/case-studies/..."
                              />
                          </div>
                        </div>
                      </div>
                    ))}

                    {(!form.challenges || form.challenges.length === 0) && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                        <Code className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500 text-xs font-medium">No steps added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* App Screens Tab */}
            {activeTab === 'screens' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    App Screens Gallery
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Organize screens by categories
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                    Section Title
                  </label>
                  <input
                    name="appScreensTitle"
                    value={form.appScreensTitle}
                    onChange={handleChange}
                    placeholder="How Your App Looks"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700">
                      Screen Categories
                    </label>
                    <button
                      type="button"
                      onClick={addAppCategory}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Category</span>
                    </button>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {form.appScreensCategories.map((cat, catIndex) => (
                      <div
                        key={catIndex}
                        className="p-3 xs:p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] xs:text-xs font-medium text-slate-600">
                            Category #{catIndex + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeAppCategory(catIndex)}
                            className="text-rose-600 hover:text-rose-700"
                          >
                            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                            Category Name
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              value={cat.name}
                              onChange={(e) =>
                                updateAppCategory(catIndex, 'name', e.target.value)
                              }
                              placeholder="Customer App"
                              className="flex-1 rounded-lg border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                            <div className="flex items-center gap-2">
                              <label className="text-[10px] xs:text-xs font-medium text-slate-600">Layout:</label>
                              <select
                                value={cat.layout || 'mobile'}
                                onChange={(e) =>
                                  updateAppCategory(catIndex, 'layout', e.target.value)
                                }
                                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                              >
                                <option value="mobile">Mobile (Multiple Screens)</option>
                                <option value="web">Web/Admin (Single + Points)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {cat.layout === 'web' && (
                          <div className="bg-white p-3 rounded-lg border border-sky-100 mb-3">
                            <ImageUploadField
                              label="Main Category Image (Window View)"
                              name={`appScreensCategories.${catIndex}.categoryImage`}
                              value={cat.categoryImage}
                              placeholder="/images/admin-screens.png"
                            />
                            {/* NOTE: We handle the change manually for nested fields since handleChange is flat */}
                            <div className="mt-1 text-[10px] text-sky-600">
                              This image will be the primary visual for the "Window" view.
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                            <label className="block text-[10px] xs:text-xs font-medium text-slate-700">
                              {cat.layout === 'web' ? 'Feature Points' : 'Screens'}
                            </label>
                            <button
                              type="button"
                              onClick={() => addAppScreen(catIndex)}
                              className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-sky-100 text-sky-700 hover:bg-sky-200 text-[9px] xs:text-[10px] font-medium transition-colors"
                            >
                              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span>Add</span>
                            </button>
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            {(cat.screens || []).map((screen, screenIndex) => (
                              <div
                                key={screenIndex}
                                className="p-2 rounded bg-white border border-slate-200 space-y-1.5 sm:space-y-2"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] xs:text-[10px] text-slate-500">
                                    Screen #{screenIndex + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeAppScreen(catIndex, screenIndex)}
                                    className="text-rose-600 hover:text-rose-700"
                                  >
                                    <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                  </button>
                                </div>
                                <div className={`grid grid-cols-1 ${cat.layout === 'mobile' ? 'xs:grid-cols-2' : ''} gap-1.5 sm:gap-2`}>
                                  <input
                                    value={screen.name}
                                    onChange={(e) =>
                                      updateAppScreen(
                                        catIndex,
                                        screenIndex,
                                        'name',
                                        e.target.value
                                      )
                                    }
                                    placeholder={cat.layout === 'web' ? "Feature/Point Title" : "Screen Name (e.g. Home)"}
                                    className="w-full rounded border border-slate-200 px-2 py-1 sm:py-1.5 text-[10px] xs:text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                                  />
                                  {cat.layout === 'mobile' && (
                                    <div className="flex gap-1 group">
                                      <input
                                        value={screen.image}
                                        onChange={(e) =>
                                          updateAppScreen(
                                            catIndex,
                                            screenIndex,
                                            'image',
                                            e.target.value
                                          )
                                        }
                                        placeholder="/images/screen.png"
                                        className="flex-1 rounded border border-slate-200 px-2 py-1 sm:py-1.5 text-[10px] xs:text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCurrentImageField(`appScreensCategories.${catIndex}.screens.${screenIndex}.image`);
                                          setShowImageBrowser(true);
                                        }}
                                        className="px-1.5 bg-slate-100 rounded border border-slate-200 hover:bg-slate-200 text-[10px]"
                                      >
                                        ...
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-slate-400">Description (Rich Text)</label>
                                  <MiniRichTextEditor
                                    value={screen.description || ''}
                                    onChange={(val) =>
                                      updateAppScreen(
                                        catIndex,
                                        screenIndex,
                                        'description',
                                        val
                                      )
                                    }
                                  />
                                </div>
                                {screen.image && (
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded border border-slate-200 overflow-hidden bg-slate-50">
                                      <img src={screen.image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setImagePreview(screen.image)}
                                      className="text-[9px] xs:text-[10px] text-sky-600 hover:text-sky-700"
                                    >
                                      Preview
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Results & Outcomes
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Showcase the impact and success metrics
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700">
                      Result Blocks
                    </label>
                    <button
                      type="button"
                      onClick={addResultBlock}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] xs:text-xs font-medium transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Add Block</span>
                    </button>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {form.resultsBlocks.map((block, index) => (
                      <div
                        key={index}
                        className="p-3 xs:p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] xs:text-xs font-medium text-slate-600">
                            Block #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeResultBlock(index)}
                            className="text-rose-600 hover:text-rose-700"
                          >
                            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                              Position
                            </label>
                            <select
                              value={block.position}
                              onChange={(e) =>
                                updateResultBlockField(index, 'position', e.target.value)
                              }
                              className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                              Mockup Image URL
                            </label>
                            <input
                              value={block.mockup}
                              onChange={(e) =>
                                updateResultBlockField(index, 'mockup', e.target.value)
                              }
                              placeholder="/images/result.png"
                              className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                            Result Items (one per line)
                          </label>
                          <textarea
                            value={(block.items || []).join('\n')}
                            onChange={(e) => updateResultBlockItems(index, e.target.value)}
                            rows={3}
                            placeholder="50% increase in conversions&#10;30% faster checkout"
                            className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        {block.mockup && (
                          <div className="flex items-center gap-2">
                            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded border border-slate-200 overflow-hidden bg-white">
                              <img src={block.mockup} alt="" className="h-full w-full object-cover" />
                            </div>
                            <button
                              type="button"
                              onClick={() => setImagePreview(block.mockup)}
                              className="text-[10px] xs:text-xs text-sky-600 hover:text-sky-700"
                            >
                              Preview
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Find Your App CTA */}
                <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3 sm:space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-emerald-900">
                    Find Your App CTA Section
                  </h4>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Title
                    </label>
                    <input
                      name="findTitle"
                      value={form.findTitle}
                      onChange={handleChange}
                      placeholder="Want Similar Results?"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      name="findDescription"
                      value={form.findDescription}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Let's build something amazing together..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <ImageUploadField
                    label="Mockup Image"
                    name="findMockup"
                    value={form.findMockup}
                    placeholder="/images/find-app-phone.png"
                  />
                </div>
              </div>
            )}

            {/* Blog Section Tab */}
            {activeTab === 'blogs' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Blog Section
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Configure how blogs appear on this case study page
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Blog Section Title
                        </label>
                        <input
                          name="blogTitle"
                          value={form.blogTitle}
                          onChange={handleChange}
                          placeholder="Our Latest Blogs"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Blog Section Subtitle
                        </label>
                        <textarea
                          name="blogSubtitle"
                          value={form.blogSubtitle}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Explore our latest insights..."
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Blog Category
                        </label>
                        <BlogCategorySelector
                          value={form.blogCategory || ''}
                          onChange={val => setForm(prev => ({ ...prev, blogCategory: val }))}
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <p className="text-[10px] text-slate-400 italic mt-1">Select specific category or leave for latest blogs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    SEO & Meta Tags
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500">
                    Optimize for search engines
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
                      placeholder="Love Local App - E-Commerce Case Study | Your Company"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                      placeholder="Discover how we built Love Local, a grocery delivery app that increased conversions by 50%..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5">
                      {form.seoDescription.length}/160 characters (optimal: 150-160)
                    </p>
                  </div>

                  <div className="p-3 xs:p-4 sm:p-5 rounded-lg bg-sky-50 border border-sky-200">
                    <h4 className="text-[10px] xs:text-xs font-semibold text-sky-900 mb-2 sm:mb-3">Google Search Preview</h4>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-blue-600 line-clamp-1">
                        {form.seoTitle || 'SEO Title Preview'}
                      </p>
                      <p className="text-[10px] xs:text-xs text-emerald-700 line-clamp-1">
                        yourwebsite.com/case-studies/{form.slug || 'slug'}
                      </p>
                      <p className="text-[10px] xs:text-xs text-slate-600 line-clamp-2">
                        {form.seoDescription || 'SEO description preview...'}
                      </p>
                    </div>
                  </div>

                  {/* Preview Button */}
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
