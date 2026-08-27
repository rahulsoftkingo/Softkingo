"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Briefcase,
  Cpu,
  HeartPulse,
  GraduationCap,
  TrendingUp,
  Smile,
  Users,
  Star,
  Clock,
  Mail,
  Phone,
  User,
  ChevronRight,
  Download,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
} from "lucide-react";

/* ----------------------------- Dummy data ------------------------------ */

const defaultCategories = [
  { name: "Business", icon: Briefcase, slug: "business" },
  { name: "Technology", icon: Cpu, slug: "technology" },
  { name: "Health & Wellness", icon: HeartPulse, slug: "health-wellness" },
  { name: "Education", icon: GraduationCap, slug: "education" },
  { name: "Marketing", icon: TrendingUp, slug: "marketing" },
  { name: "Comedy", icon: Smile, slug: "comedy" },
  { name: "Society & Culture", icon: Users, slug: "society-culture" },
];

const covers = [
  "from-violet-600 via-fuchsia-500 to-sky-700",
  "from-sky-500 via-cyan-400 to-blue-600",
  "from-rose-500 via-orange-400 to-amber-500",
  "from-slate-700 via-slate-600 to-slate-900",
  "from-emerald-500 via-teal-400 to-green-600",
  "from-red-600 via-rose-500 to-red-800",
];

const defaultEpisodes = [
  {
    slug: "the-daily-insight",
    show: "The Daily Insight",
    host: "Amelia Sophie",
    category: "Business",
    rating: "4.9",
    episodesCount: 128,
    title: "The Future of Work",
    date: "May 20, 2026",
    duration: "38 min",
    cover: covers[0],
  },
  {
    slug: "building-forward",
    show: "Building Forward",
    host: "Jason Harris",
    category: "Technology",
    rating: "4.7",
    episodesCount: 96,
    title: "Scaling with Ripcut",
    date: "May 18, 2026",
    duration: "44 min",
    cover: covers[1],
  },
  {
    slug: "the-creative-current",
    show: "The Creative Current",
    host: "Jordan Ellis",
    category: "Society & Culture",
    rating: "4.8",
    episodesCount: 210,
    title: "Designing Meaning",
    date: "May 15, 2026",
    duration: "31 min",
    cover: covers[2],
  },
  {
    slug: "mind-over-matter",
    show: "Mind Over Matter",
    host: "Dr. Priya Patel",
    category: "Health & Wellness",
    rating: "4.9",
    episodesCount: 87,
    title: "The Power of Sleep",
    date: "May 13, 2026",
    duration: "29 min",
    cover: covers[3],
  },
  {
    slug: "marketing-mastery",
    show: "Marketing Mastery",
    host: "Taylor Grant",
    category: "Marketing",
    rating: "4.6",
    episodesCount: 150,
    title: "Content That Converts",
    date: "May 12, 2026",
    duration: "36 min",
    cover: covers[4],
  },
  {
    slug: "crime-files",
    show: "Crime Files",
    host: "Detective Morgan",
    category: "True Crime",
    rating: "4.9",
    episodesCount: 302,
    title: "Case 47: The Landing",
    date: "May 10, 2026",
    duration: "52 min",
    cover: covers[5],
  },
];

const defaultMostRead = [
  { slug: "the-daily-insight", show: "The Daily Insight", title: "The Future of Work", cover: covers[0] },
  { slug: "building-forward", show: "Building Forward", title: "Scaling with Ripcut", cover: covers[1] },
  { slug: "mind-over-matter", show: "Mind Over Matter", title: "The Power of Sleep", cover: covers[3] },
];

const popularTopics = ["Entrepreneurship", "Leadership", "Wellbeing", "AI", "Storytelling", "Finance"];

/* ------------------------------ Subcomponents --------------------------- */

function CategoryStrip({ categories = defaultCategories }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
      <h1 className="text-base font-semibold text-slate-800">Browse by category</h1>
      <Link
        href="/categories"
        className="text-xs font-medium text-sky-600 hover:text-sky-700 inline-flex items-center gap-0.5"
      >
        View all categories <ChevronRight className="w-3.5 h-3.5" />
      </Link>
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {categories.map(({ name, icon: Icon, slug }) => (
          <Link
            key={slug}
            href={`/categories/${slug}`}
            className="flex flex-col items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl px-3 py-4 text-center hover:border-sky-300 hover:shadow-sm transition"
          >
            <span className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-medium text-slate-600 leading-tight">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PodcastRowCard({ episode }) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group flex gap-4 sm:gap-5 bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 hover:shadow-md hover:border-slate-300 transition"
    >
      <div
        className={`relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br ${episode.cover} flex items-center justify-center overflow-hidden`}
      >
        <span className="text-white/90 text-[10px] font-semibold tracking-wide uppercase text-center px-2 leading-tight">
          {episode.show}
        </span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            {episode.category}
          </span>
          <span className="text-[11px] text-slate-400">{episode.host}</span>
        </div>

        <h3 className="text-sm sm:text-[15px] font-semibold text-slate-800 truncate group-hover:text-sky-600 transition">
          {episode.show}
        </h3>

        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-700">{episode.rating}</span>
          <span>&middot; {episode.episodesCount} episodes</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="min-w-0">
            <p className="text-xs sm:text-[13px] text-slate-600 truncate">{episode.title}</p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              {episode.date} <span>&middot;</span> <Clock className="w-3 h-3" /> {episode.duration}
            </p>
          </div>

          <span className="shrink-0 w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center group-hover:bg-sky-700 transition ml-3">
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PodcastCompactCard({ episode }) {
  return (
    <Link href={`/episodes/${episode.slug}`} className="group flex items-center gap-3">
      <div
        className={`shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${episode.cover} flex items-center justify-center`}
      >
        <Play className="w-3 h-3 fill-white text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-slate-800 truncate group-hover:text-sky-600 transition">
          {episode.show}
        </p>
        <p className="text-[11px] text-slate-400 truncate">{episode.title}</p>
      </div>
    </Link>
  );
}

function getPageItems(page, totalPages, span = 5) {
  const items = [];
  const half = Math.floor(span / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + span - 1);
  start = Math.max(1, end - span + 1);

  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("…");
  }
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages) {
    if (end < totalPages - 1) items.push("…");
    items.push(totalPages);
  }
  return items;
}

/**
 * Builds a query-string URL for a given page, preserving search/category.
 * Wire this up to your real search params (e.g. useSearchParams) as needed.
 */
function buildUrl(q, category, targetPage) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (targetPage > 1) params.set("page", String(targetPage));
  const qs = params.toString();
  return qs ? `/podcasts?${qs}` : "/podcasts";
}

function Pagination({ page, totalPages, q, category, buildUrl: buildUrlFn = buildUrl }) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        aria-disabled={!hasPrev}
        href={hasPrev ? buildUrlFn(q, category, page - 1) : "#"}
        className={`px-3 py-2 rounded-lg border text-sm ${
          hasPrev
            ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
            : "bg-slate-100 border-slate-200 text-slate-400 pointer-events-none"
        }`}
      >
        Prev
      </Link>

      <div className="flex items-center gap-1">
        {getPageItems(page, totalPages, 5).map((it, idx) => {
          if (it === "…") {
            return (
              <span key={`dots-${idx}`} className="px-3 py-2 text-sm text-slate-400 select-none">
                …
              </span>
            );
          }

          const p = it;
          const active = p === page;

          return (
            <Link
              key={p}
              href={buildUrlFn(q, category, p)}
              aria-current={active ? "page" : undefined}
              className={`min-w-9 text-center px-3 py-2 rounded-lg border text-sm ${
                active
                  ? "bg-sky-600 border-sky-600 text-white font-medium"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {p}
            </Link>
          );
        })}
      </div>

      <Link
        aria-disabled={!hasNext}
        href={hasNext ? buildUrlFn(q, category, page + 1) : "#"}
        className={`px-3 py-2 rounded-lg border text-sm ${
          hasNext
            ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
            : "bg-slate-100 border-slate-200 text-slate-400 pointer-events-none"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}

function StartPodcastForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your lead-capture API route, e.g.:
    // await fetch("/api/consultation", { method: "POST", body: JSON.stringify(form) });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-800 mb-1">Start your podcast app</p>
      <p className="text-[12px] text-slate-500 mb-4 leading-relaxed">
        Turn your podcast into a powerful mobile and web platform.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <label className="relative block">
          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={form.name}
            onChange={update("name")}
            type="text"
            name="name"
            placeholder="Full name"
            className="w-full text-[13px] pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
          />
        </label>
        <label className="relative block">
          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={form.email}
            onChange={update("email")}
            type="email"
            name="email"
            placeholder="Work email"
            className="w-full text-[13px] pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
          />
        </label>
        <label className="relative block">
          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={form.phone}
            onChange={update("phone")}
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full text-[13px] pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
          />
        </label>
        <select
          value={form.type}
          onChange={update("type")}
          name="type"
          className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
        >
          <option value="">Project type</option>
          <option>Independent creator</option>
          <option>Media company</option>
          <option>Enterprise</option>
        </select>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white text-[13px] font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1.5"
        >
          Get a free consultation <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

function GrowthPlaybookPromo() {
  return (
    <div className="bg-gradient-to-br from-sky-600 to-violet-700 rounded-2xl p-4 text-white relative overflow-hidden">
      <span className="inline-block text-[10px] font-semibold uppercase tracking-wide bg-white/15 rounded-full px-2 py-0.5 mb-3">
        New ebook
      </span>
      <p className="text-[15px] font-semibold leading-snug mb-1">The Podcast Growth Playbook</p>
      <p className="text-[12px] text-white/75 mb-4 leading-relaxed">
        Proven strategies to grow your audience and boost engagement.
      </p>
      <a
        href="/downloads/podcast-growth-playbook.pdf"
        className="bg-white text-sky-700 text-[12px] font-medium px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 hover:bg-sky-50 transition"
      >
        <Download className="w-3.5 h-3.5" /> Download free
      </a>
    </div>
  );
}

function BuildAppCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-4 text-white">
      <p className="text-[15px] font-semibold leading-snug mb-1">Build your own podcast app</p>
      <p className="text-[12px] text-slate-300 mb-4 leading-relaxed">
        Custom iOS, Android and web experiences for creators and brands.
      </p>
      <Link
        href="/app-services"
        className="w-full border border-white/25 text-[12px] font-medium py-2 rounded-lg hover:bg-white/10 transition flex items-center justify-center"
      >
        View app services
      </Link>
    </div>
  );
}

function PopularTopics() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-3">Popular topics</p>
      <div className="flex flex-wrap gap-1.5">
        {popularTopics.map((t) => (
          <Link
            key={t}
            href={`/topics/${t.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-[11px] text-slate-600 bg-slate-100 hover:bg-sky-50 hover:text-sky-600 px-2.5 py-1 rounded-full transition"
          >
            {t}
          </Link>
        ))}
      </div>
    </div>
  );
}

function InquirySection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Wire this up to your newsletter API route, e.g.:
    // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <p className="text-white text-base font-semibold mb-2">Podeddy</p>
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-xs">
              Your destination for the world&apos;s best podcasts, curated across business, culture, science and more.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-semibold text-white uppercase tracking-wide mb-3">Explore</p>
            <ul className="space-y-2 text-[13px] text-slate-400">
              <li><Link href="/podcasts" className="hover:text-white transition">Podcasts</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link href="/top-charts" className="hover:text-white transition">Top charts</Link></li>
              <li><Link href="/new-releases" className="hover:text-white transition">New releases</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold text-white uppercase tracking-wide mb-3">Company</p>
            <ul className="space-y-2 text-[13px] text-slate-400">
              <li><Link href="/about" className="hover:text-white transition">About us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition">Press kit</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold text-white uppercase tracking-wide mb-3">For creators</p>
            <ul className="space-y-2 text-[13px] text-slate-400 mb-4">
              <li><Link href="/submit" className="hover:text-white transition">Submit your podcast</Link></li>
              <li><Link href="/app-services" className="hover:text-white transition">Build your app</Link></li>
              <li><Link href="/resources" className="hover:text-white transition">Creator resources</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-slate-500">© 2026 Podeddy. All rights reserved.</p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="text-[13px] bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-56"
            />
            <button
              type="submit"
              className="text-[13px] font-medium bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-lg transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex gap-4 mt-4 text-[11px] text-slate-500">
          <Link href="/privacy" className="hover:text-slate-300">Privacy policy</Link>
          <Link href="/terms" className="hover:text-slate-300">Terms of use</Link>
          <Link href="/cookies" className="hover:text-slate-300">Cookie policy</Link>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function PodcastBrowseSection({
  episodes: episodesProp,
  categories: categoriesProp,
  totalCount: totalCountProp,
  q = "",
  category = "",
  page = 1,
  totalPages: totalPagesProp,
  buildUrl: buildUrlProp,
  className = "",
}) {
  // Falls back to the built-in dummy data when no props are passed, so the
  // UI looks exactly the same until you wire up real data from the parent.
  const episodesData = episodesProp ?? defaultEpisodes;
  const categoriesData = categoriesProp ?? defaultCategories;

  const perPage = 6;
  const totalCount = totalCountProp ?? defaultEpisodes.length * 5;
  const totalPages = totalPagesProp ?? Math.max(1, Math.ceil(totalCount / perPage));
  const resolvedBuildUrl = buildUrlProp ?? buildUrl;

  return (
    <section className={`relative bg-slate-50 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,260px)] gap-6 lg:gap-8 items-start">
          {/* Left column: category strip + one-row-per-episode listing */}
          <div>
            <CategoryStrip categories={categoriesData} />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-slate-800">All Podcast Episodes</h2>

              <p className="text-[11px] text-slate-500">
                {totalCount} episodes
                {q && <> matching &ldquo;{q}&rdquo;</>}
                {category && <> in {category}</>}
                {totalPages > 1 && <> &middot; page {page} of {totalPages}</>}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {episodesData.map((episode) => (
                <PodcastRowCard key={episode.slug} episode={episode} />
              ))}

              {!episodesData.length && (
                <p className="text-sm text-slate-500 py-8 text-center bg-white rounded-2xl border border-slate-200">
                  No podcast episodes found.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                q={q}
                category={category}
                buildUrl={resolvedBuildUrl}
              />
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden md:flex flex-col gap-4 sticky top-8">
            <StartPodcastForm />
            <GrowthPlaybookPromo />
            <BuildAppCard />
            <PopularTopics />
          </aside>
        </section>
      </div>

      <InquirySection />
    </section>
  );
}