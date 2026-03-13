"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function PortfolioClient({ projects: initialProjects = [], categories = [] }) {
  const [activeTab, setActiveTab] = useState("app");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [allProjects, setAllProjects] = useState(initialProjects);

  const perPage = 6;

  const tabs = [
    // { id: "app", label: "App Portfolio" },
    // { id: "web", label: "Website Portfolio" },
    // { id: "digital", label: "Digital Marketing" },
  ];
  useEffect(() => {
    async function fetchProjects() {
      try {
        const params = new URLSearchParams({ type: activeTab });
        const res = await fetch(`/api/public/portfolio?${params}`);
        if (!res.ok) return;
        const data = await res.json();
        setAllProjects(Array.isArray(data.projects) ? data.projects : []);
      } catch {
        setAllProjects([]);
      }
    }

    if (!initialProjects.length || activeTab !== "app") {
      fetchProjects();
    } else {
      setAllProjects(initialProjects);
    }
  }, [activeTab]);

  const filtered = useMemo(() => {
    return allProjects.filter((p) =>
      p.type === activeTab &&
      (activeCategory === "All" || p.category === activeCategory)
    );
  }, [allProjects, activeTab, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  return (
    <>
      {/* Tabs strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 ">
        <div className="pointer-events-none absolute inset-0">
          {/* <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-white/40 blur-3xl opacity-40" /> */}
          {/* <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-[#00B7FF]/25 blur-3xl opacity-40" /> */}
        </div>

        <div className="px-1 sm:px-4 py-4 rounded-2xl ">
          <div className="flex md:justify-center gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hide-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.id}

                onClick={() => {
                  setActiveTab(t.id);
                  setActiveCategory("All");
                  setPage(1);
                }}

                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition ${activeTab === t.id
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-white text-sky-700 border border-slate-300 hover:border-sky-400"
                  }`}
                aria-pressed={activeTab === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Left sidebar – desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="rounded-3xl bg-white shadow-xl border border-sky-200 overflow-hidden sticky top-24">
              <div className="bg-sky-800 text-white text-sm font-semibold px-4 py-3">
                All Category
              </div>
              <ul className="p-3 space-y-1 text-sm">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => {
                        setActiveCategory(c);
                        setPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition ${activeCategory === c
                        ? "bg-sky-100 text-sky-700 font-semibold"
                        : "hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mobile category select */}
          <div className="col-span-12 lg:hidden">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Filter by category
            </label>
            <select
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Cards */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-sky-900">
                All Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Showing <strong>{filtered.length}</strong> result
                {filtered.length !== 1 ? "s" : ""}
              </p>
            </div> */}

            <div className="space-y-6">
              {currentItems.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
              {filtered.length === 0 && (
                <div className="p-8 bg-white rounded-2xl border text-center text-slate-600">
                  No projects match your filters.
                </div>
              )}
            </div>

            {filtered.length > 0 && totalPages > 1 && (
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* Pagination */

function Pagination({ page, setPage, totalPages }) {
  const range = getPageRange(totalPages, page, 5);

  return (
    <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
      <button
        onClick={() => setPage((s) => Math.max(1, s - 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-medium disabled:opacity-40 hover:bg-slate-50 transition"
      >
        Previous
      </button>

      <div className="flex items-center gap-1 flex-wrap">
        {range[0] > 1 && (
          <>
            <PageButton num={1} active={page === 1} onClick={() => setPage(1)} />
            {range[0] > 2 && <Ellipsis />}
          </>
        )}
        {range.map((n) => (
          <PageButton
            key={n}
            num={n}
            active={n === page}
            onClick={() => setPage(n)}
          />
        ))}
        {range[range.length - 1] < totalPages && (
          <>
            {range[range.length - 1] < totalPages - 1 && <Ellipsis />}
            <PageButton
              num={totalPages}
              active={page === totalPages}
              onClick={() => setPage(totalPages)}
            />
          </>
        )}
      </div>

      <button
        onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-medium disabled:opacity-40 hover:bg-slate-50 transition"
      >
        Next
      </button>
    </div>
  );
}

function PageButton({ num, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`w-9 h-9 rounded-full border text-xs sm:text-sm font-medium transition ${active
        ? "bg-sky-700 text-white border-sky-700"
        : "bg-white border-slate-200 hover:border-sky-400"
        }`}
    >
      {num}
    </button>
  );
}

function Ellipsis() {
  return <span className="px-2 text-slate-400">…</span>;
}

/* Project Card */

function ProjectCard({ p }) {
  const bgStyle = p.bgImage
    ? {
      backgroundImage: `url(${p.bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {
      backgroundImage:
        "radial-gradient(circle at top left, rgba(255,255,255,0.3), transparent 45%), radial-gradient(circle at bottom right, rgba(0,0,0,0.25), transparent 55%)",
    };

  return (
    <article
      className="rounded-3xl overflow-hidden relative shadow-[0_18px_40px_rgba(15,23,42,0.16)] hover:shadow-[0_26px_60px_rgba(15,23,42,0.26)] transition-shadow"
      style={{ minHeight: 260, ...bgStyle }}
    >
      {/* Color overlay */}
      <div
        className="absolute inset-0"
        style={{ background: p.bgColor, mixBlendMode: "multiply", opacity: 0.96 }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr]">
        {/* Left content */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center gap-4 mr-8">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
              {p.icon ? (
                <Image
                  src={p.icon}
                  alt={p.title}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-slate-800">
                  {p.title?.[0]}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl md:text-3xl font-extrabold text-white leading-normal">
                {p.title}
              </h3>
            </div>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-white/90 leading-relaxed">
            {p.description}
          </p>

          <div className="mt-5 rounded-xl bg-white/30 backdrop-blur-xs p-4 grid grid-cols-3 gap-3 text-[11px] sm:text-xs">
            <div>
              <p className="uppercase tracking-wide text-slate-200">Country</p>
              <p className="mt-1 font-semibold text-slate-100">{p.country}</p>
            </div>
            <div>
              <p className="uppercase tracking-wide text-slate-200">
                Platforms
              </p>
              <p className="mt-1 font-semibold text-slate-100">
                {p.platforms}
              </p>
            </div>
            <div>
              <p className="uppercase tracking-wide text-slate-200">
                Techstack
              </p>
              <p className="mt-1 font-semibold text-slate-100">
                {p.techstack}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">

            {p.badges?.play && (
              <Link
                href={p.badges.play.href || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={p.badges.play.src}
                  alt="Google Play"
                  width={130}
                  height={40}
                  className="h-6 md:h-8 w-auto"
                />
              </Link>
            )}
            {p.badges?.app && (
              <Link
                href={p.badges.app.href || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={p.badges.app.src}
                  alt="App Store"
                  width={130}
                  height={40}
                  className="h-6 md:h-8 w-auto"
                />
              </Link>
            )}
            {p.badges?.web && (
              <Link
                href={p.badges.web.href || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={p.badges.web.src}
                  alt="Web"
                  width={120}
                  height={36}
                  className="h-6 md:h-8 w-auto"
                />
              </Link>
            )}

            {/* case study icon button */}
            <div className="absolute bottom-4 left4 md:top-4 md:right-4 cursor-pointer z-10 mt- ">
              <Link
                href={`/case-studies/${p.id}`}
                className="inline-flex items-center justify-center w-9h-9 rounded-full bg-white/95 text-sky-900 shadow hover:bg-sky-50 transition px-4 py-2 text-xs"

              >Case Study
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>


        </div>

        {/* Right mockup */}
        <div className="relative p-6md:p-8 flex items-center justify-center">
          <div className="relative w-40 sm:w-44 md:w-52 h-[18rem] sm:h-[20rem]">
            {p.phoneMockup ? (
              <Image
                src={p.phoneMockup}
                alt={`${p.title} mockup`}
                fill
                className="object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="w-full h-full bg-white/20 rounded-3xl" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* page range */

function getPageRange(total, current, maxButtons = 5) {
  const range = [];
  if (total <= maxButtons) {
    for (let i = 1; i <= total; i++) range.push(i);
    return range;
  }
  let left = Math.max(1, current - 2);
  let right = Math.min(total, current + 2);
  if (current <= 3) {
    left = 1;
    right = maxButtons;
  } else if (current >= total - 2) {
    left = total - (maxButtons - 1);
    right = total;
  }
  for (let i = left; i <= right; i++) range.push(i);
  return range;
}
