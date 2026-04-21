"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Code,
  Plus,
  Trash2,
  FileText,
  Link as LinkIcon,
  Search as SearchIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ExternalLink,
  Folder,
  FolderOpen,
  ZoomIn,
  ChevronRight,
  Home,
  ChevronDown,
} from "lucide-react";
import MiniRichTextEditor from "@/components/admin/MiniRichTextEditor";

const TABS = [
  { id: "basic", label: "Basic Info", icon: FileText, mobileLabel: "Basic" },
  { id: "media", label: "Media", icon: ImageIcon, mobileLabel: "Media" },
  { id: "links", label: "Links & Badges", icon: LinkIcon, mobileLabel: "Links" },
  { id: "seo", label: "SEO", icon: SearchIcon, mobileLabel: "SEO" },
];

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

function safeStringify(obj) {
  try {
    return obj ? JSON.stringify(obj, null, 2) : "";
  } catch {
    return "";
  }
}

export default function PortfolioProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";

  const [activeTab, setActiveTab] = useState("basic");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingField, setUploadingField] = useState(null);

  // Image browser modal state
  const [showImageBrowser, setShowImageBrowser] = useState(false);
  const [currentImageField, setCurrentImageField] = useState('');
  const [currentFolder, setCurrentFolder] = useState('');
  const [folderFiles, setFolderFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const DEFAULT_BADGES = [
    { platform: "googlePlay", url: "#", image: "/images/badges/google-play.png" },
    { platform: "appStore", url: "#", image: "/images/badges/app-store.png" },
    { platform: "web", url: "#", image: "/images/badges/web-badge.png" }
  ];

  const [form, setForm] = useState({
    key: "",
    type: "app",
    title: "",
    category: "",
    description: "",
    techStack: "",
    platforms: "",
    country: "",
    bgImage: "/images/portfolio/bg-1.png",
    bgColor: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 50%, #0369a1 100%)",
    icon: "/images/case-studies/logo.png",
    phoneMockup: "/images/case-studies/screen1.png",
    caseStudyId: null,
    badges: DEFAULT_BADGES,
  });

  useEffect(() => {
    if (isNew) return;

    (async () => {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/admin/portfolio-projects/${params.id}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Failed to load project");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { message: "Network error - please try again" };
        }

        // Show exact error from API
        console.error('API Error:', errorData);
        setError(errorData.message || errorData.error || "Failed to save project");
        setSaving(false);
        return;
      }

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        key: data.key || "",
        type: data.type || "app",
        title: data.title || "",
        category: data.category || "",
        description: data.description || "",
        techStack: data.techStack || "",
        platforms: data.platforms || "",
        country: data.country || "",
        bgImage: data.bgImage || prev.bgImage,
        bgColor: data.bgColor || prev.bgColor,
        icon: data.icon || prev.icon,
        phoneMockup: data.phoneMockup || prev.phoneMockup,
        caseStudyId: data.caseStudyId ?? null,
        badges: data.badgesJson ? Object.entries(safeParse(data.badgesJson, {})).map(([platform, badge]) => {
          const b = typeof badge === 'object' && badge !== null ? badge : {};
          return {
            platform: String(platform || ""),
            url: String(b.url || b.href || ""),
            image: String(b.image || b.src || "")
          };
        }) : DEFAULT_BADGES,
        challenges: (() => {
          const cData = safeParse(data.caseStudy?.challengesJson, null);
          if (Array.isArray(cData)) return cData;
          if (cData && typeof cData === 'object') {
            return [
              { tabLabel: "Challenge", title: "The Project Challenge", description: cData.challenge || "", image: "" },
              { tabLabel: "Solution", title: "The Solution", description: cData.solution || "", image: "" }
            ];
          }
          return [{ tabLabel: "Analysis", title: "Project Analysis", description: "", image: "" }];
        })(),
      }));

      setLoading(false);
    })();
  }, [isNew, params.id]);

  const updateFormValue = (path, value) => {
    setForm((prev) => {
      const parts = path.split('.');
      if (parts.length === 1) return { ...prev, [path]: value };

      // Handle array updates like "badges.0.image"
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
    setError("");
    setSuccess("");
    updateFormValue(name, value);
  };

  async function handleFileUpload(e, fieldName) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    setError("");
    setSuccess("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "portfolio");

      const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      updateFormValue(fieldName, data.url);
      setSuccess("Image uploaded successfully!");
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      e.target.value = "";
      setUploadingField(null);
    }
  }

  // Media Library Helpers
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
    const parentFolder = parts.join('/');
    navigateToFolder(parentFolder);
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

  // Badge list helpers
  const addBadge = () => {
    setForm((p) => ({
      ...p,
      badges: [...p.badges, { platform: "", url: "", image: "" }],
    }));
  };

  const updateBadge = (index, field, value) => {
    setForm((p) => {
      const copy = [...p.badges];
      copy[index] = { ...copy[index], [field]: value };
      return { ...p, badges: copy };
    });
  };

  const removeBadge = (index) => {
    setForm((p) => ({
      ...p,
      badges: p.badges.filter((_, i) => i !== index),
    }));
  };

  async function handleSave() {
    setError("");
    setSuccess("");

    if (!form.key || !form.title || !form.type) {
      setError("Key, title and type are required");
      setActiveTab("basic");
      return;
    }
    // CLIENT-SIDE TRUNCATE 
    const truncatedForm = {
      ...form,
      title: form.title.slice(0, 190),
      description: form.description.slice(0, 190),  // Safe limit
      techStack: form.techStack.slice(0, 1000),
      platforms: form.platforms.slice(0, 190),
      country: form.country.slice(0, 255),
      bgColor: form.bgColor.slice(0, 500),
    };

    setSaving(true);

    const url = isNew
      ? "/api/admin/portfolio-projects"
      : `/api/admin/portfolio-projects/${params.id}`;

    const method = isNew ? "POST" : "PATCH";

    // API expects `badges` object (it serializes to badgesJson) [file:618]

    // Use truncated data
    const payload = {
      key: truncatedForm.key,
      type: truncatedForm.type,
      title: truncatedForm.title,
      category: truncatedForm.category || null,
      description: truncatedForm.description || null,  // ← Truncated!
      techStack: truncatedForm.techStack || null,
      platforms: truncatedForm.platforms || null,
      country: truncatedForm.country || null,
      bgImage: truncatedForm.bgImage || null,
      bgColor: truncatedForm.bgColor || null,
      icon: truncatedForm.icon || null,
      phoneMockup: truncatedForm.phoneMockup || null,
      badges: (form.badges || []).reduce((acc, curr) => {
        const platform = String(curr?.platform || "").trim();
        if (platform) {
          acc[platform] = {
            url: String(curr?.url || ""),
            image: String(curr?.image || "")
          };
        }
        return acc;
      }, {}),
      challenges: form.challenges || [],
      caseStudyId: truncatedForm.caseStudyId ? Number(truncatedForm.caseStudyId) : null,
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || "Failed to save");
      setSaving(false);
      return;
    }

    const saved = await res.json();
    setSaving(false);
    setSuccess("Project saved successfully!");
    setTimeout(() => setSuccess(""), 2000);

    if (isNew) router.push(`/admin/admin/portfolio/${saved.id}`);
  }

  const ImageUploadField = ({ label, name, value, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-mono sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
      />
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 cursor-pointer transition-colors">
          {uploadingField === name ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-3.5 w-3.5" />
              <span>Upload</span>
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
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-700 transition-colors"
        >
          <Folder className="h-3.5 w-3.5" />
          <span>Browse</span>
        </button>

        {value && (
          <button
            type="button"
            onClick={() => setImagePreview(value)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-[10px] sm:text-xs font-medium text-sky-700 transition-colors"
          >
            <ZoomIn className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
        )}

        {value && (
          <div className="flex items-center gap-2 ml-auto">
            <div className="h-8 w-8 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
              <img src={value} alt="preview" className="h-full w-full object-cover" />
            </div>
            <a
              href={value}
              target="_blank"
              className="text-[10px] text-sky-700 hover:text-sky-800"
              rel="noreferrer"
            >
              Link
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const ImageBrowserModal = () => {
    if (!showImageBrowser) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Browse Images</h3>
              <p className="text-[10px] sm:text-xs text-slate-500">Select from public folder</p>
            </div>
            <button onClick={() => setShowImageBrowser(false)} className="p-2 hover:bg-slate-200 rounded-lg">
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>
          <div className="px-4 py-2 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto text-[10px] sm:text-xs">
            <button onClick={() => navigateToFolder("")} className="flex items-center gap-1 font-medium text-sky-600">
              <Home className="h-3 w-3" /> Root
            </button>
            {currentFolder.split('/').filter(Boolean).map((part, idx, arr) => (
              <span key={idx} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-slate-400" />
                <button onClick={() => navigateToFolder(arr.slice(0, idx + 1).join('/'))} className="text-slate-600">
                  {part}
                </button>
              </span>
            ))}
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            {loadingFiles ? <div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-sky-600" /></div> : (
              <div className="space-y-6">
                {folders.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {folders.map((f, i) => (
                      <button key={i} onClick={() => navigateToFolder(f.path)} className="flex flex-col items-center p-2 rounded-lg border border-slate-200 hover:bg-sky-50">
                        <Folder className="h-8 w-8 text-sky-500 mb-1" />
                        <span className="text-[9px] text-center truncate w-full">{f.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {images.map((img, i) => (
                      <button key={i} onClick={() => selectImageFromBrowser(img.path)} className="group relative aspect-square rounded-lg border-2 border-transparent hover:border-sky-500 overflow-hidden bg-slate-100">
                        <img src={img.path} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                          <CheckCircle2 className="text-white h-6 w-6" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between">
            <button onClick={goToParentFolder} disabled={!currentFolder} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white disabled:opacity-50">Back</button>
            <button onClick={() => setShowImageBrowser(false)} className="px-3 py-1.5 text-xs bg-slate-200 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const ImagePreviewModal = () => {
    if (!imagePreview) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setImagePreview(null)}>
        <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setImagePreview(null)} className="absolute -top-10 right-0 text-white p-2 hover:bg-white/10 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <img src={imagePreview} alt="" className="w-full h-auto rounded-lg shadow-2xl" />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-sky-600 animate-spin" />
          <p className="text-sm text-slate-600">Loading portfolio project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8 space-y-3 sm:space-y-4 lg:space-y-6">
        <section className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={() => router.back()}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            </button>

            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">
                {isNew ? "Create Portfolio Project" : "Edit Portfolio Project"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                {form.title || "Untitled project"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all whitespace-nowrap"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden xs:inline">{saving ? "Saving..." : "Save"}</span>
            <span className="xs:hidden">{saving ? "..." : "Save"}</span>
          </button>
        </section>

        {!!error && (
          <section className="rounded-lg sm:rounded-xl bg-rose-50 border border-rose-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 shadow-sm">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-rose-900">Error</p>
              <p className="text-xs sm:text-sm text-rose-700 mt-0.5">{error}</p>
            </div>
            <button onClick={() => setError("")} className="text-rose-400 hover:text-rose-600">
              <X className="h-4 w-4" />
            </button>
          </section>
        )}

        {!!success && (
          <section className="rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 shadow-sm">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-emerald-900">Success</p>
              <p className="text-xs sm:text-sm text-emerald-700 mt-0.5">{success}</p>
            </div>
            <button onClick={() => setSuccess("")} className="text-emerald-400 hover:text-emerald-600">
              <X className="h-4 w-4" />
            </button>
          </section>
        )}

        <section className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 overflow-hidden">
            <div className="flex overflow-y-auto overflow-x-hidden scrollbar-hide scroll-smooth hover:scroll-auto">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                      isActive
                        ? "text-sky-600 border-b-2 border-sky-600 bg-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-300px)] overflow-y-auto">
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    Basic Information
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Core details used for listing and filtering.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Key <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="key"
                      value={form.key}
                      onChange={handleChange}
                      placeholder="lovelocal-grocery-app"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="LoveLocal: Grocery App"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    >
                      <option value="app">app</option>
                      <option value="web">web</option>
                      <option value="design">design</option>
                      <option value="digital">digital</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="E-Commerce"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Tip: Use service/industry slug (e.g. "healthcare") to link automatically.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    {/* <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Experience the convenience and freshness..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all resize-none"
                    /> */}
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={(e) => {
                        const newValue = e.target.value.slice(0, 190); // Hard limit 500 chars
                        handleChange({ target: { name: 'description', value: newValue } });

                        // Show warning if approaching limit
                        if (newValue.length > 185) {
                          setError(`Description limit: ${newValue.length}/190 chars`);
                          setTimeout(() => setError(''), 2000);
                        }
                      }}
                      maxLength={190}
                      rows={3}
                      placeholder="Experience the convenience and freshness... (190 chars max)"
                      className={`w-full rounded-lg border px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all resize-none ${form.description.length > 185
                          ? 'border-rose-300 ring-2 ring-rose-200 bg-rose-50/50'
                          : 'border-slate-200'
                        }`}
                    />
                    <div className="flex justify-between text-xs mt-1.5">
                      <span className={`font-mono ${form.description.length > 185
                          ? 'text-rose-600 font-semibold'
                          : form.description.length > 400
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}>
                        {form.description.length}/190
                      </span>
                      {form.description.length > 185 && (
                        <span className="text-rose-600 font-medium px-2 py-0.5 bg-rose-100 rounded-md">
                          Near limit
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Tech Stack
                    </label>
                    <input
                      name="techStack"
                      value={form.techStack}
                      onChange={handleChange}
                      placeholder="Flutter, Node.js, MongoDB"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Platforms
                    </label>
                    <input
                      name="platforms"
                      value={form.platforms}
                      onChange={handleChange}
                      placeholder="iOS · Android · Web"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Country
                    </label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="India, USA"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Case Study Id (optional)
                    </label>
                    <input
                      name="caseStudyId"
                      value={form.caseStudyId ?? ""}
                      onChange={handleChange}
                      placeholder="1"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">Media</h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Images used on portfolio card and case study hero.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <ImageUploadField
                    label="Background Image"
                    name="bgImage"
                    value={form.bgImage}
                    placeholder="/images/portfolio/bg-1.png"
                  />
                  <ImageUploadField
                    label="Icon"
                    name="icon"
                    value={form.icon}
                    placeholder="/images/case-studies/logo.png"
                  />
                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Phone Mockup"
                      name="phoneMockup"
                      value={form.phoneMockup}
                      placeholder="/images/case-studies/screen1.png"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Background Gradient (CSS)
                    </label>
                    <input
                      name="bgColor"
                      value={form.bgColor}
                      onChange={handleChange}
                      placeholder="linear-gradient(135deg, #0ea5e9 0%, #0369a1 50%, #0369a1 100%)"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    />
                    <div
                      className="mt-3 h-12 rounded-xl border border-slate-200"
                      style={{ background: form.bgColor }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "links" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                      Links & Badges
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Manage app store links and web badges.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addBadge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Badge</span>
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {form.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="p-3 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => removeBadge(index)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                            Platform/Key
                          </label>
                          <input
                            value={badge.platform}
                            onChange={(e) => updateBadge(index, "platform", e.target.value)}
                            placeholder="e.g. googlePlay"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] sm:text-xs lg:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                            Redirect URL
                          </label>
                          <input
                            value={badge.url}
                            onChange={(e) => updateBadge(index, "url", e.target.value)}
                            placeholder="https://..."
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] sm:text-xs lg:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <ImageUploadField
                            label="Badge Image"
                            name={`badges.${index}.image`}
                            value={badge.image}
                            placeholder="/images/badges/..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {form.badges.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <LinkIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">No badges added yet. Click "Add Badge" to start.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">SEO</h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    PortfolioProject model me SEO fields nahi hain, so yaha optional placeholders only.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                  Agar SEO portfolio level pe chahiye to model me `seoTitle/seoDescription` add karna
                  padega, warna is tab ko remove kar do.
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <ImageBrowserModal />
      <ImagePreviewModal />
    </div>
  );
}
