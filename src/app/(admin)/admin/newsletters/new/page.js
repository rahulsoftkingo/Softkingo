"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewNewsletterListPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSlug = (value) => {
    const base = (value || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(base);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Name is required.");
      return;
    }
    try {
      setSaving(true);
      const res = await fetch("/api/admin/newsletters/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slug || null,
          description: description || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create list");
      }
      const data = await res.json();
      router.push(`/admin/newsletters/${data.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-slate-900">
          New newsletter list
        </h1>
        <p className="text-xs text-slate-500">
          Create a list to group subscribers and campaigns.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      >
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) handleGenerateSlug(e.target.value);
            }}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="e.g. Blog Newsletter"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Slug (optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="blog-newsletter"
            />
            <button
              type="button"
              onClick={() => handleGenerateSlug(name)}
              className="px-3 py-2 text-xs rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Auto
            </button>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Used in URLs and API. Leave empty to auto-generate.
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Description (optional)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="Describe what kind of content this list receives."
          />
        </div>

        {error && (
          <p className="text-[11px] text-rose-600">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-3 py-2 text-xs rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-3 py-2 text-xs rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-500 disabled:opacity-70"
          >
            {saving ? "Creating..." : "Create list"}
          </button>
        </div>
      </form>
    </div>
  );
}
