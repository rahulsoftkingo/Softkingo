"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getParsedSections(sectionsJson) {
  if (!sectionsJson?.trim()) return [];
  try {
    const arr = JSON.parse(sectionsJson);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default function EbookForm({ mode, ebook }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const initialSections = getParsedSections(ebook?.sectionsJson || "");

  const [form, setForm] = useState({
    title: ebook?.title || "",
    slug: ebook?.slug || "",
    authorName: ebook?.authorName || "",
    authorRole: ebook?.authorRole || "",
    coverImage: ebook?.coverImage || "",
    category: ebook?.category || "",
    description: ebook?.description || "",
    readTimeText: ebook?.readTimeText || "",
    summary: ebook?.summary || "",
    sectionsJson: ebook?.sectionsJson || "",
    pdfUrl: ebook?.pdfUrl || "",
    status: ebook?.status || "draft",
    publishedAt: ebook?.publishedAt
      ? new Date(ebook.publishedAt).toISOString().slice(0, 16)
      : "",
  });

  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const syncSectionsJson = (nextSections) => {
    setSections(nextSections);
    try {
      const json = JSON.stringify(nextSections, null, 2);
      setForm((prev) => ({
        ...prev,
        sectionsJson: json,
      }));
      setJsonError("");
    } catch {
      setJsonError("Failed to serialise sections.");
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

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setForm((prev) => ({
        ...prev,
        pdfUrl: url,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(
        isEdit
          ? `/api/admin/ebooks/${ebook.id}`
          : "/api/admin/ebooks",
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

      router.push("/admin/ebooks");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    const next = [
      ...sections,
      { heading: "New section", body: "" },
    ];
    syncSectionsJson(next);
  };

  const updateSection = (index, field, value) => {
    const next = sections.map((sec, i) =>
      i === index ? { ...sec, [field]: value } : sec
    );
    syncSectionsJson(next);
  };

  const removeSection = (index) => {
    const next = sections.filter((_, i) => i !== index);
    syncSectionsJson(next);
  };

  const moveSection = (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const next = [...sections];
    const temp = next[index];
    next[index] = next[newIndex];
    next[newIndex] = temp;
    syncSectionsJson(next);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {isEdit ? "Edit E‑book" : "New E‑book"}
            </h1>
            <p className="text-xs text-slate-500">
              Manage title, metadata, content sections and download PDF.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin/ebooks")}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Back to list
          </button>
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
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="mobile-app-guide-2025"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={() => setAutoSlug((v) => !v)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  Auto-generate slug from title
                </label>
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
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Summary (What you will learn)
                </label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Sections editor */}
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Sections
                </h2>
                {jsonError && (
                  <span className="text-[11px] text-rose-600">
                    {jsonError}
                  </span>
                )}
              </div>

              <div className="space-y-3 max-h-72 overflow-auto pr-1">
                {sections.map((sec, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        value={sec.heading || ""}
                        onChange={(e) =>
                          updateSection(index, "heading", e.target.value)
                        }
                        placeholder={`Section ${index + 1} heading`}
                        className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveSection(index, -1)}
                          className="px-2 py-1 text-[10px] rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(index, 1)}
                          className="px-2 py-1 text-[10px] rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="px-2 py-1 text-[10px] rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={sec.body || ""}
                      onChange={(e) =>
                        updateSection(index, "body", e.target.value)
                      }
                      rows={3}
                      placeholder="Section body (plain text or markdown-style)"
                      className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                ))}
                {!sections.length && (
                  <p className="text-[11px] text-slate-500">
                    No sections yet. Add your first section below.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                + Add section
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
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Author name
                </label>
                <input
                  name="authorName"
                  value={form.authorName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Author role
                </label>
                <input
                  name="authorRole"
                  value={form.authorRole}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Mobile Apps, Healthcare..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Read time text
                </label>
                <input
                  name="readTimeText"
                  value={form.readTimeText}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="28 min read"
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
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="/images/ebooks/monetization.png"
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
                Download PDF
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  PDF URL
                </label>
                <input
                  name="pdfUrl"
                  value={form.pdfUrl}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="/pdf/ebooks/app-monetization.pdf"
                />
              </div>

              <div className="space-y-1.5">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  disabled={uploadingPdf}
                  className="block w-full text-[11px] text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-800 hover:file:bg-slate-200"
                />
                {uploadingPdf && (
                  <p className="text-[11px] text-slate-500">
                    Uploading PDF...
                  </p>
                )}
                {form.pdfUrl && (
                  <p className="text-[11px] text-slate-500 truncate">
                    Current: {form.pdfUrl}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => router.push("/admin/ebooks")}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : isEdit
                  ? "Save changes"
                  : "Create E‑book"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}