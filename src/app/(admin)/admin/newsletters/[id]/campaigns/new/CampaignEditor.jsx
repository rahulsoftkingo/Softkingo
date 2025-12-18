"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CampaignEditor({ list, posts }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  const handlePrefillFromPost = (post) => {
    setName(`Blog: ${post.title}`);
    setSubject(`New on the blog: ${post.title}`);
    setPreheader(post.excerpt || "");
    const url = `${window.location.origin}/blog/${post.slug}`;
    setContentHtml(
      `<h1>${post.title}</h1><p>${post.excerpt || ""}</p><p><a href="${url}">Read the full article →</a></p>`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !subject) return;

    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/newsletters/${list.id}/campaigns`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            subject,
            preheader,
            contentHtml,
            status,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed");
      router.push(`/admin/newsletters/${list.id}`);
    } catch (error) {
      console.error("Create campaign failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          New campaign · {list.name}
        </h1>
        <p className="text-xs text-slate-500">
          Create an email campaign for this newsletter list.
        </p>
      </div>

      {/* Prefill from blog posts */}
      <section className="space-y-2">
        <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
          Prefill from a blog post
        </p>
        <div className="flex gap-2 overflow-x-auto text-xs">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => handlePrefillFromPost(post)}
              className="min-w-[220px] text-left px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50"
            >
              <p className="text-[12px] font-medium text-slate-900 line-clamp-2">
                {post.title}
              </p>
              <p className="text-[10px] text-slate-500">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </button>
          ))}
          {!posts.length && (
            <p className="text-[11px] text-slate-500">
              No published blog posts yet.
            </p>
          )}
        </div>
      </section>

      {/* Campaign form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Internal name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Preheader (optional)
          </label>
          <input
            type="text"
            value={preheader}
            onChange={(e) => setPreheader(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            HTML content
          </label>
          <textarea
            rows={10}
            value={contentHtml}
            onChange={(e) => setContentHtml(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

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
            disabled={loading}
            className="px-3 py-2 text-xs rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-500 disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}
