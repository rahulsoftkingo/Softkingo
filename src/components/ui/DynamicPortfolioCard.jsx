// components/ui/DynamicPortfolioCard.jsx - SINGLE CARD ONLY
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CommonTitle from "./CommonTitle";

export default function DynamicPortfolioCard({
  category = "",
  portfolioType = "app",
  title = "Featured Project",
  subtitle = "",
  className = ""
}) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        // 1. Try fetching with category
        let params = new URLSearchParams({
          type: portfolioType,
          ...(category && { category }),
          limit: 1,
          sort: 'createdAt:desc'
        });
        let res = await fetch(`/api/public/portfolio?${params}`);
        let data = await res.json();
        let found = Array.isArray(data.projects) && data.projects[0] ? data.projects[0] : null;

        // 2. FALLBACK: If no project found and category was provided, fetch latest without category
        if (!found && category) {
          params = new URLSearchParams({
            type: portfolioType,
            limit: 1,
            sort: 'createdAt:desc'
          });
          res = await fetch(`/api/public/portfolio?${params}`);
          data = await res.json();
          found = Array.isArray(data.projects) && data.projects[0] ? data.projects[0] : null;
        }

        setProject(found);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [portfolioType, category]);

  if (loading) {
    return (
      <div className={`max-w-4xl mx-auto px-4 py-12 ${className}`}>
        <div className="animate-pulse rounded-3xl h-80 bg-gradient-to-r from-slate-200 to-slate-300"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`max-w-4xl mx-auto px-4 py-12 ${className}`}>
        <div className="p-12 bg-white rounded-3xl border text-center text-slate-600">
          No projects found.
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 ${className}`}>
      {/* Title */}
      {title && (
        <div className="mb-8 text-center">

          <CommonTitle
            align="center"
            pill={false}
            title={title}
            gradientText=''
            subtitle={subtitle}
          />
        </div>

      )}


      <ProjectCard p={project} />
    </div>
  );
}

// ✅ PERFECT SINGLE CARD (FIXED CSS)
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
      className="rounded-3xl overflow-hidden relative shadow-[0_18px_40px_rgba(15,23,42,0.16)] hover:shadow-[0_26px_60px_rgba(15,23,42,0.26)] transition-all duration-500 group"
      style={{ minHeight: 320, ...bgStyle }}
    >
      {/* Color overlay */}
      <div
        className="absolute inset-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: p.bgColor ? `linear-gradient(135deg, ${p.bgColor}, transparent)` : "linear-gradient(135deg, #0284c7, transparent)",
          opacity: 0.8
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] h-full">
        {/* Left content */}
        <div className="p-6 lg:p-8 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center flex-shrink-0 mt-1">
              {p.icon ? (
                <Image
                  src={p.icon}
                  alt={p.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <span className="text-2xl font-black text-slate-800">
                  {p.title?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl lg:text-3xl font-black text-white leading-tight group-hover:scale-[1.02] transition-transform duration-300">
                {p.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-white/95 leading-relaxed mb-6 max-w-lg">
            {p.description}
          </p>

          {/* Stats Grid */}
          <div className="mb-6 rounded-2xl bg-white/20 backdrop-blur-sm p-4 grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="uppercase tracking-wider text-slate-300 font-medium">Country</p>
              <p className="mt-1 font-bold text-white">{p.country || "Global"}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-slate-300 font-medium">Platforms</p>
              <p className="mt-1 font-bold text-white">{p.platforms}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-slate-300 font-medium">Tech Stack</p>
              <p className="mt-1 font-bold text-white truncate">{p.techstack}</p>
            </div>
          </div>
          {/* Case Study Button */}
          {/* <Link
              href={`/case-studies/${p.id}`}
              className="group/btn inline-flex items-center justify-center  rounded-full bg-white/95 text-sky-900 shadow hover:bg-sky-50 transition px-6 py-2 w-fit"
            >
              View Case Study
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link> */}
          {/* case study icon button */}
          <div className="absolute bottom-4 left4 md:top-4 md:right-4 cursor-pointer z-10 mt- ">
            <Link
              href={`/case-studies/${p.id}`}
              className="inline-flex items-center justify-center w-9h-9 rounded-full bg-white/95 text-sky-900 shadow hover:bg-sky-50 transition px-4 py-2 text-xs"

            >Case Study
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* App Store Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {p.badges?.play && (
                <Link href={p.badges.play.href || "#"} target="_blank" rel="noreferrer">
                  <Image
                    src={p.badges.play.src}
                    alt="Google Play"
                    width={120}
                    height={36}
                    className="h-9 w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </Link>
              )}
              {p.badges?.app && (
                <Link href={p.badges.app.href || "#"} target="_blank" rel="noreferrer">
                  <Image
                    src={p.badges.app.src}
                    alt="App Store"
                    width={120}
                    height={36}
                    className="h-9 w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </Link>
              )}
              {p.badges?.web && (
                <Link href={p.badges.web.href || "#"} target="_blank" rel="noreferrer">
                  <Image
                    src={p.badges.web.src}
                    alt="Website"
                    width={110}
                    height={32}
                    className="h-9 w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Mockup */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-40 sm:w-44 md:w-52 h-[18rem] sm:h-[20rem]">
            {p.phoneMockup ? (
              <Image
                src={p.phoneMockup}
                alt={`${p.title} mockup`}
                fill
                className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 rounded-3xl shadow-2xl" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
