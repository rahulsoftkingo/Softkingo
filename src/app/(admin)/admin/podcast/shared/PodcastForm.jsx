"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getParsedArray(json) {
  if (!json?.trim()) return [];
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function getParsedObject(json, defaults) {
  if (!json?.trim()) return { ...defaults };
  try {
    const obj = JSON.parse(json);
    return typeof obj === "object" && obj !== null ? { ...defaults, ...obj } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

const SOCIAL_DEFAULTS = { website: "", instagram: "", X: "", linkedin: "" };
const PLATFORM_DEFAULTS = { spotify: "", applePodcasts: "", youtubeMusic: "", soundcloud: "" };

export default function PodcastForm({ mode, podcast }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const initialTopics = getParsedArray(podcast?.topicsJson || "");
  const initialSocialLinks = getParsedObject(podcast?.socialLinksJson || "", SOCIAL_DEFAULTS);
  const initialPlatformLinks = getParsedObject(podcast?.platformLinksJson || "", PLATFORM_DEFAULTS);

  const [form, setForm] = useState({
    title: podcast?.title || "",
    slug: podcast?.slug || "",
    coverImage: podcast?.coverImage || "",
    category: podcast?.category || "",
    language: podcast?.language || "English",
    frequency: podcast?.frequency || "",

    hostName: podcast?.hostName || "",
    hostRole: podcast?.hostRole || "",
    hostAvatar: podcast?.hostAvatar || "",

    rating: podcast?.rating ?? "",
    followersCount: podcast?.followersCount ?? 0,
    episodeCount: podcast?.episodeCount ?? 0,

    latestEpisodeTitle: podcast?.latestEpisodeTitle || "",
    latestEpisodeAudioUrl: podcast?.latestEpisodeAudioUrl || "",
    latestEpisodeDuration: podcast?.latestEpisodeDuration || "",

    description: podcast?.description || "",
    summary: podcast?.summary || "",
    aboutText: podcast?.aboutText || "",
    quoteText: podcast?.quoteText || "",
    quoteAuthor: podcast?.quoteAuthor || "",
    whatItsAbout: podcast?.whatItsAbout || "",
    whoShouldListen: podcast?.whoShouldListen || "",

    topicsJson: podcast?.topicsJson || "",
    socialLinksJson: podcast?.socialLinksJson || "",
    platformLinksJson: podcast?.platformLinksJson || "",

    status: podcast?.status || "draft",
    publishedAt: podcast?.publishedAt
      ? new Date(podcast.publishedAt).toISOString().slice(0, 16)
      : "",
  });

  const [topics, setTopics] = useState(initialTopics);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [platformLinks, setPlatformLinks] = useState(initialPlatformLinks);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingHostAvatar, setUploadingHostAvatar] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  const syncTopicsJson = (nextTopics) => {
    setTopics(nextTopics);
    try {
      setForm((prev) => ({ ...prev, topicsJson: JSON.stringify(nextTopics) }));
      setJsonError("");
    } catch {
      setJsonError("Failed to serialise topics.");
    }
  };

  const syncSocialLinksJson = (nextObj) => {
    setSocialLinks(nextObj);
    try {
      setForm((prev) => ({ ...prev, socialLinksJson: JSON.stringify(nextObj) }));
      setJsonError("");
    } catch {
      setJsonError("Failed to serialise social links.");
    }
  };

  const syncPlatformLinksJson = (nextObj) => {
    setPlatformLinks(nextObj);
    try {
      setForm((prev) => ({ ...prev, platformLinksJson: JSON.stringify(nextObj) }));
      setJsonError("");
    } catch {
      setJsonError("Failed to serialise platform links.");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && autoSlug && !isEdit) {
        next.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return next;
    });
  };

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/media/upload", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      let msg = "Upload failed";
      try {
        const data = await res.json();
        msg = data.message || msg;
      } catch { }
      throw new Error(msg);
    }

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Upload response invalid");
    }

    if (!data?.url) {
      throw new Error("Upload succeeded but URL missing");
    }

    return data.url;
  }

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleHostAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHostAvatar(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({ ...prev, hostAvatar: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingHostAvatar(false);
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAudio(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({ ...prev, latestEpisodeAudioUrl: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        rating: form.rating === "" ? null : Number(form.rating),
        followersCount: Number(form.followersCount) || 0,
        episodeCount: Number(form.episodeCount) || 0,
      };

      const res = await fetch(
        isEdit ? `/api/admin/podcasts/${podcast.id}` : "/api/admin/podcasts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/podcast");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit || !podcast?.id) return;

    const confirmed = window.confirm(
      `Delete "${form.title || "this podcast"}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/podcasts/${podcast.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete podcast");
      }

      router.push("/admin/podcast");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  // ----- Topics editor -----
  const addTopic = () => {
    syncTopicsJson([...topics, ""]);
  };

  const updateTopic = (index, value) => {
    const next = topics.map((t, i) => (i === index ? value : t));
    syncTopicsJson(next);
  };

  const removeTopic = (index) => {
    syncTopicsJson(topics.filter((_, i) => i !== index));
  };

  // ----- Social / platform link editors -----
  const updateSocialLink = (key, value) => {
    syncSocialLinksJson({ ...socialLinks, [key]: value });
  };

  const updatePlatformLink = (key, value) => {
    syncPlatformLinksJson({ ...platformLinks, [key]: value });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {isEdit ? "Edit Podcast" : "New Podcast"}
            </h1>
            <p className="text-xs text-slate-500">
              Manage show info, overview content, links and stats.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || saving}
                className="text-xs font-medium text-rose-600 hover:text-rose-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete podcast"}
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push("/admin/podcast")}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Back to list
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]"
        >
          {/* LEFT */}
          <div className="space-y-5">
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-3 py-2 mb-2">
                  {error}
                </p>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-end">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Slug *</label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={onChange}
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="the-creative-current"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={() => setAutoSlug((v) => !v)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  Auto-generate slug from title
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Short description (used on list cards)
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={2}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Summary (sidebar "About This Podcast")
                </label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  About text (main "About [Podcast]" section)
                </label>
                <textarea
                  name="aboutText"
                  value={form.aboutText}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Pull quote</label>
                  <textarea
                    name="quoteText"
                    value={form.quoteText}
                    onChange={onChange}
                    rows={2}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Quote author</label>
                  <input
                    name="quoteAuthor"
                    value={form.quoteAuthor}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  What This Podcast Is About
                </label>
                <textarea
                  name="whatItsAbout"
                  value={form.whatItsAbout}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Who Should Listen</label>
                <textarea
                  name="whoShouldListen"
                  value={form.whoShouldListen}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Topics editor */}
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Topics We Explore
                </h2>
                {jsonError && <span className="text-[11px] text-rose-600">{jsonError}</span>}
              </div>

              <div className="space-y-2 max-h-56 overflow-auto pr-1">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      value={topic}
                      onChange={(e) => updateTopic(index, e.target.value)}
                      placeholder={`Topic ${index + 1}`}
                      className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="px-2 py-1 text-[10px] rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {!topics.length && (
                  <p className="text-[11px] text-slate-500">
                    No topics yet. Add the ones this podcast covers.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={addTopic}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                + Add topic
              </button>
            </div>

            {/* Social links editor */}
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Follow &amp; Connect (Social Links)
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.keys(SOCIAL_DEFAULTS).map((key) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 capitalize">{key}</label>
                    <input
                      value={socialLinks[key] || ""}
                      onChange={(e) => updateSocialLink(key, e.target.value)}
                      placeholder={`https://...`}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform links editor */}
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Listen On (Platform Links)
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: "spotify", label: "Spotify" },
                  { key: "applePodcasts", label: "Apple Podcasts" },
                  { key: "youtubeMusic", label: "YouTube Music" },
                  { key: "soundcloud", label: "SoundCloud" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">{label}</label>
                    <input
                      value={platformLinks[key] || ""}
                      onChange={(e) => updatePlatformLink(key, e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Meta
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Published at</label>
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    value={form.publishedAt}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Language</label>
                  <input
                    name="language"
                    value={form.language}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Frequency</label>
                <input
                  name="frequency"
                  value={form.frequency}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Weekly"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={form.rating}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Followers</label>
                  <input
                    type="number"
                    min="0"
                    name="followersCount"
                    value={form.followersCount}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Episode count</label>
                  <input
                    type="number"
                    min="0"
                    name="episodeCount"
                    value={form.episodeCount}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Host
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Host name</label>
                <input
                  name="hostName"
                  value={form.hostName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Host role</label>
                <input
                  name="hostRole"
                  value={form.hostRole}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Host"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Host avatar URL</label>
                <input
                  name="hostAvatar"
                  value={form.hostAvatar}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHostAvatarUpload}
                  disabled={uploadingHostAvatar}
                  className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
                />
                {uploadingHostAvatar && (
                  <p className="text-[11px] text-slate-500">Uploading avatar...</p>
                )}
                {form.hostAvatar && (
                  <img
                    src={form.hostAvatar}
                    alt="Host avatar preview"
                    className="mt-1 h-10 w-10 rounded-full border border-slate-200 object-cover"
                  />
                )}
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Cover image
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Cover URL</label>
                <input
                  name="coverImage"
                  value={form.coverImage}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="/images/podcasts/creative-current.png"
                />
                <p className="text-[11px] text-slate-500">Paste a URL or upload a file below.</p>
              </div>

              <div className="space-y-1.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  disabled={uploadingCover}
                  className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
                />
                {uploadingCover && (
                  <p className="text-[11px] text-slate-500">Uploading cover...</p>
                )}
                {form.coverImage && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Preview:</span>
                    <img
                      src={form.coverImage}
                      alt="Cover preview"
                      className="h-10 w-8 rounded border border-slate-200 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Latest episode
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Latest episode title</label>
                <input
                  name="latestEpisodeTitle"
                  value={form.latestEpisodeTitle}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Duration</label>
                <input
                  name="latestEpisodeDuration"
                  value={form.latestEpisodeDuration}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="48m"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Audio URL</label>
                <input
                  name="latestEpisodeAudioUrl"
                  value={form.latestEpisodeAudioUrl}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="/audio/podcasts/latest.mp3"
                />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  disabled={uploadingAudio}
                  className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
                />
                {uploadingAudio && (
                  <p className="text-[11px] text-slate-500">Uploading audio...</p>
                )}
                {form.latestEpisodeAudioUrl && (
                  <audio src={form.latestEpisodeAudioUrl} controls className="w-full h-8" />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => router.push("/admin/podcast")}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || deleting}
                className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-60"
              >
                {saving ? "Saving..." : isEdit ? "Save changes" : "Create Podcast"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}