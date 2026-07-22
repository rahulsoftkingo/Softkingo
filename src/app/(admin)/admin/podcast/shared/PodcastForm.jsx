"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getParsedSegments(segmentsJson) {
  if (!segmentsJson?.trim()) return [];
  try {
    const arr = JSON.parse(segmentsJson);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default function PodcastForm({ mode, podcast }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const initialSegments = getParsedSegments(podcast?.segmentsJson || "");

  const [form, setForm] = useState({
    title: podcast?.title || "",
    slug: podcast?.slug || "",
    episodeNumber: podcast?.episodeNumber || "",
    hostName: podcast?.hostName || "",
    hostRole: podcast?.hostRole || "",
    guestName: podcast?.guestName || "",
    coverImage: podcast?.coverImage || "",
    category: podcast?.category || "",
    description: podcast?.description || "",
    durationText: podcast?.durationText || "",
    summary: podcast?.summary || "",
    segmentsJson: podcast?.segmentsJson || "",
    audioUrl: podcast?.audioUrl || "",
    status: podcast?.status || "draft",
    publishedAt: podcast?.publishedAt
      ? new Date(podcast.publishedAt).toISOString().slice(0, 16)
      : "",
  });

  const [segments, setSegments] = useState(initialSegments);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  const syncSegmentsJson = (nextSegments) => {
    setSegments(nextSegments);
    try {
      const json = JSON.stringify(nextSegments, null, 2);
      setForm((prev) => ({
        ...prev,
        segmentsJson: json,
      }));
      setJsonError("");
    } catch {
      setJsonError("Failed to serialise segments.");
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
      } catch {}
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
      setForm((prev) => ({
        ...prev,
        coverImage: url,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAudio(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({
        ...prev,
        audioUrl: url,
      }));
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
      const res = await fetch(
        isEdit
          ? `/api/admin/podcasts/${podcast.id}`
          : "/api/admin/podcasts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/podcasts");
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
      `Delete "${form.title || "this episode"}"? This cannot be undone.`
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
        throw new Error(data.error || "Failed to delete episode");
      }

      router.push("/admin/podcasts");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  const addSegment = () => {
    const next = [
      ...segments,
      { timestamp: "00:00", heading: "New segment", body: "" },
    ];
    syncSegmentsJson(next);
  };

  const updateSegment = (index, field, value) => {
    const next = segments.map((seg, i) =>
      i === index ? { ...seg, [field]: value } : seg
    );
    syncSegmentsJson(next);
  };

  const removeSegment = (index) => {
    const next = segments.filter((_, i) => i !== index);
    syncSegmentsJson(next);
  };

  const moveSegment = (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= segments.length) return;
    const next = [...segments];
    const temp = next[index];
    next[index] = next[newIndex];
    next[newIndex] = temp;
    syncSegmentsJson(next);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {isEdit ? "Edit Episode" : "New Episode"}
            </h1>
            <p className="text-xs text-slate-500">
              Manage title, metadata, show notes and audio file.
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
                {deleting ? "Deleting..." : "Delete episode"}
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push("/admin/podcasts")}
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
                <label className="text-xs font-medium text-slate-700">
                  Title *
                </label>
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
                  <label className="text-xs font-medium text-slate-700">
                    Slug *
                  </label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={onChange}
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="scaling-your-startup-ep-12"
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
                  Episode number
                </label>
                <input
                  name="episodeNumber"
                  value={form.episodeNumber}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="12"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Short description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Summary (What listeners will learn)
                </label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Segments editor */}
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Show Notes / Segments
                </h2>
                {jsonError && (
                  <span className="text-[11px] text-rose-600">
                    {jsonError}
                  </span>
                )}
              </div>

              <div className="space-y-3 max-h-72 overflow-auto pr-1">
                {segments.map((seg, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        value={seg.timestamp || ""}
                        onChange={(e) =>
                          updateSegment(index, "timestamp", e.target.value)
                        }
                        placeholder="00:00"
                        className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                      <input
                        value={seg.heading || ""}
                        onChange={(e) =>
                          updateSegment(index, "heading", e.target.value)
                        }
                        placeholder={`Segment ${index + 1} heading`}
                        className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveSegment(index, -1)}
                          className="px-2 py-1 text-[10px] rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSegment(index, 1)}
                          className="px-2 py-1 text-[10px] rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSegment(index)}
                          className="px-2 py-1 text-[10px] rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={seg.body || ""}
                      onChange={(e) =>
                        updateSegment(index, "body", e.target.value)
                      }
                      rows={3}
                      placeholder="Segment notes (plain text or markdown-style)"
                      className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                ))}
                {!segments.length && (
                  <p className="text-[11px] text-slate-500">
                    No segments yet. Add your first show-notes segment below.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={addSegment}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                + Add segment
              </button>
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
                  <label className="text-xs font-medium text-slate-700">
                    Status
                  </label>
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
                  <label className="text-xs font-medium text-slate-700">
                    Published at
                  </label>
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    value={form.publishedAt}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Host name
                </label>
                <input
                  name="hostName"
                  value={form.hostName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Host role
                </label>
                <input
                  name="hostRole"
                  value={form.hostRole}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Guest name
                </label>
                <input
                  name="guestName"
                  value={form.guestName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Business, Technology..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Duration text
                </label>
                <input
                  name="durationText"
                  value={form.durationText}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="42 min"
                />
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Cover image
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Cover URL
                </label>
                <input
                  name="coverImage"
                  value={form.coverImage}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="/images/podcasts/ep-12.png"
                />
                <p className="text-[11px] text-slate-500">
                  Paste a URL or upload a file below.
                </p>
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
                  <p className="text-[11px] text-slate-500">
                    Uploading cover...
                  </p>
                )}
                {form.coverImage && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">
                      Preview:
                    </span>
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
                Episode audio
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Audio URL
                </label>
                <input
                  name="audioUrl"
                  value={form.audioUrl}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="/audio/podcasts/ep-12.mp3"
                />
              </div>

              <div className="space-y-1.5">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  disabled={uploadingAudio}
                  className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
                />
                {uploadingAudio && (
                  <p className="text-[11px] text-slate-500">
                    Uploading audio...
                  </p>
                )}
                {form.audioUrl && (
                  <div className="space-y-1">
                    <p className="text-[11px] text-slate-500 truncate">
                      Current: {form.audioUrl}
                    </p>
                    <audio
                      src={form.audioUrl}
                      controls
                      className="w-full h-8"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => router.push("/admin/podcasts")}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || deleting}
                className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : isEdit
                  ? "Save changes"
                  : "Create Episode"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}