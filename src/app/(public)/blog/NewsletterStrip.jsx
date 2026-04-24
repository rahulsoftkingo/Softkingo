"use client";

import { useState } from "react";

export default function NewsletterStrip({
  source = "blog-newsletter",
  listSlug = "blog-newsletter",
  listName = "Blog Newsletter",
  listDescription = "Main blog newsletter list",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("loading");
      const res = await fetch("/api/public/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          listSlug,
          listName,
          listDescription,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 shadow-[0_20px_60px_rgba(8,47,73,0.5)] flex flex-col items-center justify-between text-center gap-4">
      <div className="space-y-1.5">
        <p className="text-[11px] tracking-[0.24em] uppercase text-sky-100/90">
          {listName}
        </p>
        <h2 className="text-base sm:text-lg font-semibold text-white">
          Get one practical app growth idea every two weeks.
        </h2>
        <p className="text-[12px] sm:text-[13px] text-sky-50/90 max-w-xl">
          No spam, no generic “inspiration”. Just crisp product, UX and
          engineering ideas from apps we've actually shipped.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          className="w-full sm:w-72 rounded-full bg-white/95 px-4 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white text-[13px] font-semibold px-4 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.8)] transition-colors disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "success" && (
        <p className="text-[11px] text-emerald-100">
          Thanks! Please check your inbox.
        </p>
      )}
      {status === "error" && (
        <p className="text-[11px] text-rose-100">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
