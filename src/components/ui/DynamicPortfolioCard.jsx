// components/ui/DynamicPortfolioCard.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import CommonTitle from "./CommonTitle";
import PopupQuoteModal from "@/components/PopupQuoteModal";

const DEFAULT_TITLE = "Our Portfolio";
const DEFAULT_SUBTITLE =
  "At Softkingo, we consistently stay ahead of the competition by using the latest tools and technologies in mobile app development.";

export default function DynamicPortfolioCard({
  category = "",
  portfolioType = "app",
  title,
  subtitle,
  className = "",
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const displayTitle = title || DEFAULT_TITLE;
  const displaySubtitle = subtitle || DEFAULT_SUBTITLE;

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const take = category ? 10 : 7;
        const params = new URLSearchParams({ type: portfolioType || "app", take });
        if (category) params.set("category", category);

        let res = await fetch(`/api/public/portfolio?${params}`);
        let data = await res.json();
        let found = Array.isArray(data.projects) ? data.projects : [];

        // FALLBACK: no results with category → show top 7 without filter
        if (found.length === 0 && category) {
          const fallback = new URLSearchParams({ type: portfolioType || "app", take: 7 });
          res = await fetch(`/api/public/portfolio?${fallback}`);
          data = await res.json();
          found = Array.isArray(data.projects) ? data.projects : [];
        }

        setProjects(found);
      } catch (error) {
        console.error("Portfolio fetch error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [portfolioType, category]);

  if (loading) {
    return (
      <div className={`max-w-7xl mx-auto px-6 py-24 ${className}`}>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          <div className="space-y-6 animate-pulse">
            <div className="h-10 bg-slate-200 rounded-lg w-2/3" />
            <div className="h-20 bg-slate-100 rounded-lg w-full" />
            <div className="h-12 bg-sky-100 rounded-full w-48" />
          </div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-slate-50 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <>
      <section className={`py-20 bg-white ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* ── LEFT: sticky ── */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-28 space-y-6">
              <CommonTitle align="left" title={displayTitle} subtitle={displaySubtitle} />
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-200 hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                Build your mobile App
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* ── RIGHT: sticky stacking cards (like h4-service) ── */}
            <div className="w-full lg:w-[70%] space-y-4">
              {projects.map((project, index) => (
                <StickyProjectCard
                  key={project.id || index}
                  p={project}
                  index={index}
                  total={projects.length}
                  onContact={() => setShowModal(true)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

/* ─── Sticky Project Card with scroll-based scale/opacity — like h4-service ─── */
function StickyProjectCard({ p, index, total, onContact }) {
  const ref = useRef(null);

  // Track scroll progress of THIS card relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 1]);

  const bgStyle = p.bgImage
    ? { backgroundImage: `url(${p.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundImage: "radial-gradient(circle at top left, rgba(255,255,255,0.3), transparent 45%), radial-gradient(circle at bottom right, rgba(0,0,0,0.25), transparent 55%)" };

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, top: `${88 + index * 20}px` }}
      className="sticky rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.16)] hover:shadow-[0_26px_60px_rgba(15,23,42,0.26)] transition-shadow"
    >
      {/* Card inner */}
      <div
        className="relative"
        style={{ minHeight: 260, ...bgStyle }}
      >
        {/* Color overlay */}
        <div
          className="absolute inset-0"
          style={{ background: p.bgColor || "rgba(2,132,199,0.92)", mixBlendMode: "multiply", opacity: 0.96 }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr]">
          {/* Left content */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-4">

            {/* Title row */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                {p.icon ? (
                  <Image src={p.icon} alt={p.title} width={56} height={56} className="object-contain" />
                ) : (
                  <span className="text-2xl font-bold text-slate-800">{p.title?.[0]}</span>
                )}
              </div>
              <h3 className="text-xl md:text-3xl font-extrabold text-white leading-tight">{p.title}</h3>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">{p.description}</p>

            {/* Specs */}
            <div className="rounded-xl bg-white/30 backdrop-blur-sm p-4 grid grid-cols-3 gap-3 text-[11px] sm:text-xs">
              <div>
                <p className="uppercase tracking-wide text-slate-200">Country</p>
                <p className="mt-1 font-semibold text-slate-100">{p.country}</p>
              </div>
              <div>
                <p className="uppercase tracking-wide text-slate-200">Platforms</p>
                <p className="mt-1 font-semibold text-slate-100">{p.platforms}</p>
              </div>
              <div>
                <p className="uppercase tracking-wide text-slate-200">Techstack</p>
                <p className="mt-1 font-semibold text-slate-100 truncate">{p.techstack}</p>
              </div>
            </div>

            {/* Badges + Case Study inline */}
            <div className="flex items-center gap-3 flex-wrap">
              {p.badges?.play && (
                <Link href={p.badges.play.href || "#"} target="_blank" rel="noreferrer">
                  <Image src={p.badges.play.src || "/images/google-play.png"} alt="Google Play" width={130} height={45} className="h-7 w-auto" />
                </Link>
              )}
              {p.badges?.app && (
                <Link href={p.badges.app.href || "#"} target="_blank" rel="noreferrer">
                  <Image src={p.badges.app.src || "/images/app-store.png"} alt="App Store" width={130} height={45} className="h-7 w-auto" />
                </Link>
              )}
              {p.badges?.web && (
                <Link href={p.badges.web.href || "#"} target="_blank" rel="noreferrer">
                  <Image src={p.badges.web.src || "/images/view-web.png"} alt="Web" width={130} height={45} className="h-7 w-auto" />
                </Link>
              )}
              <Link
                href={`/case-studies/${p.id}`}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-black/95 text-sky-50 shadow hover:bg-white hover:text-black transition px-5 py-2 text-xs font-semibold whitespace-nowrap"
              >
                Case Study <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right mockup */}
          <div className="relative p-6 md:p-8 flex items-center justify-center">
            <div className="relative w-40 sm:w-44 md:w-52 h-[18rem] sm:h-[20rem]">
              {p.phoneMockup ? (
                <Image src={p.phoneMockup} alt={`${p.title} mockup`} fill className="object-contain drop-shadow-2xl" />
              ) : (
                <div className="w-full h-full bg-white/20 rounded-3xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
