"use client";

import { useEffect, useState } from "react";

const DEFAULT_FORM = {
  siteName: "Website",
  defaultTitle: "Website",
  defaultDescription: "",
  defaultOgImage: "",
  robotsIndex: true,
};

export default function SeoSettingsPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/seo", { cache: "no-store" });
    const json = await res.json();
    if (json?.ok && json.data) setForm({ ...DEFAULT_FORM, ...json.data });
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "save failed");
      setToast("Saved");
    } catch (e) {
      setToast(e?.message || "Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setToast(""), 2500);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h2 className="text-xl font-bold">SEO Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          className="border rounded-xl p-3"
          placeholder="Site name"
          value={form.siteName}
          onChange={(e) => setForm((p) => ({ ...p, siteName: e.target.value }))}
        />
        <input
          className="border rounded-xl p-3"
          placeholder="Default title"
          value={form.defaultTitle}
          onChange={(e) => setForm((p) => ({ ...p, defaultTitle: e.target.value }))}
        />
        <input
          className="border rounded-xl p-3 md:col-span-2"
          placeholder="Default description"
          value={form.defaultDescription}
          onChange={(e) => setForm((p) => ({ ...p, defaultDescription: e.target.value }))}
        />
        <input
          className="border rounded-xl p-3 md:col-span-2"
          placeholder="Default OG image URL (optional)"
          value={form.defaultOgImage}
          onChange={(e) => setForm((p) => ({ ...p, defaultOgImage: e.target.value }))}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.robotsIndex}
            onChange={(e) => setForm((p) => ({ ...p, robotsIndex: e.target.checked }))}
          />
          Allow indexing (robots)
        </label>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
