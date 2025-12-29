"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCcw, Plus, Trash2, ExternalLink, X } from "lucide-react";

function slugify(input = "") {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function SolutionsManagerPage() {
  const [activeTab, setActiveTab] = useState("solutions"); // solutions | industries
  const [data, setData] = useState(null);

  const [newSlug, setNewSlug] = useState("");
  const [createPage, setCreatePage] = useState(true);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(null); // {section, slug}

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/solutions?section=all", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Load failed");
      setData(json.data);
    } catch (e) {
      setToast(e?.message || "Load failed");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2500);
    }
  }

  async function create() {
    const slug = slugify(newSlug);
    if (!slug) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/solutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: activeTab, slug, createPage }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Create failed");

      setToast(`Created: ${json.created.url}`);
      setNewSlug("");
      await load();
    } catch (e) {
      setToast(e?.message || "Create failed");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2500);
    }
  }

  async function doDelete() {
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/solutions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confirmDelete),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Delete failed");
      setToast("Deleted");
      setConfirmDelete(null);
      await load();
    } catch (e) {
      setToast(e?.message || "Delete failed");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2500);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const items = useMemo(() => data?.[activeTab]?.items || [], [data, activeTab]);
  const basePath = useMemo(() => data?.[activeTab]?.basePath || "", [data, activeTab]);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Solutions / Industries Manager</h1>
          <p className="text-sm text-slate-600">
            Manage folders under <code className="font-mono">{basePath || "..."}</code>
          </p>
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
          type="button"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Rescan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("solutions")}
          className={`px-4 py-2 rounded-xl border ${
            activeTab === "solutions"
              ? "bg-sky-600 text-white border-sky-600"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          Solutions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("industries")}
          className={`px-4 py-2 rounded-xl border ${
            activeTab === "industries"
              ? "bg-sky-600 text-white border-sky-600"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          Industries
        </button>
      </div>

      {/* Create */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200"
            placeholder={`New slug e.g. food-delivery (for /${activeTab}/food-delivery)`}
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
          />

          <button
            onClick={create}
            disabled={loading || !newSlug.trim()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
            type="button"
          >
            <Plus className="h-4 w-4" />
            Create
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={createPage}
            onChange={(e) => setCreatePage(e.target.checked)}
          />
          Also create placeholder <code className="font-mono">page.jsx</code>
        </label>

        <p className="text-xs text-slate-600">
          This creates a folder so the URL won’t break. You can later edit the generated page file and deploy.
        </p>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-semibold text-slate-900">
          Total: {items.length}
        </div>

        <div className="mt-3 space-y-2">
          {items.length === 0 ? (
            <div className="text-sm text-slate-500">No folders found.</div>
          ) : (
            items.map((it) => (
              <div
                key={it.slug}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 break-all">
                    {it.slug}
                  </div>
                  <div className="text-xs text-slate-600 font-mono break-all mt-1">
                    {it.url}{" "}
                    {it.hasPage ? (
                      <span className="text-emerald-700">(has {it.pageFile})</span>
                    ) : (
                      <span className="text-amber-700">(missing page.jsx)</span>
                    )}
                  </div>
                  {it.updatedAt && (
                    <div className="text-xs text-slate-500 mt-1">
                      Updated: {new Date(it.updatedAt).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </a>

                  <button
                    type="button"
                    onClick={() => setConfirmDelete({ section: activeTab, slug: it.slug })}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setConfirmDelete(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Confirm delete</div>
                <div className="text-xs text-slate-600 font-mono mt-1 break-all">
                  {confirmDelete.section}/{confirmDelete.slug}
                </div>
              </div>
              <button
                className="p-2 rounded-xl hover:bg-slate-50"
                onClick={() => setConfirmDelete(null)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 text-sm text-slate-700">
              This will delete the folder and all files inside it (recursive). This cannot be undone.
            </div>

            <div className="p-4 pt-0 flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
                onClick={() => setConfirmDelete(null)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                onClick={doDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
