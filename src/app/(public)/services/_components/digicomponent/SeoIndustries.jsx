"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const VISIBLE_COUNT = 3;

// Fallback data used when no `data` prop is passed in
const defaultData = {
  title: "Industries",
  subtitle: "We Work With",
  items: [
    {
      title: "Healthcare",
      description:
        "Secure, compliant platforms that help providers manage patients, records, and care delivery.",
      icon: "/icons/healthcare.svg",
      link: "/industries/healthcare",
    },
    {
      title: "Banking & Finance",
      description:
        "Robust systems for payments, lending, and risk management built with security at the core.",
      icon: "/icons/banking.svg",
      link: "/industries/banking-finance",
    },
    {
      title: "Retail & E-commerce",
      description:
        "Scalable storefronts and inventory tools that turn browsers into loyal customers.",
      icon: "/icons/retail.svg",
      link: "/industries/retail-ecommerce",
    },
    {
      title: "Education",
      description:
        "Engaging learning platforms that connect students, teachers, and content seamlessly.",
      icon: "/icons/education.svg",
      link: "/industries/education",
    },
    {
      title: "Logistics",
      description:
        "Real-time tracking and route optimization to keep goods moving efficiently.",
      icon: "/icons/logistics.svg",
      link: "/industries/logistics",
    },
    {
      title: "Manufacturing",
      description:
        "Smart automation and monitoring tools that streamline production at every stage.",
      icon: "/icons/manufacturing.svg",
      link: "/industries/manufacturing",
    },
  ],
};

// NEW: chhoti screen detect karne ke liye (Tailwind ka `md` breakpoint = 768px)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

export default function IndustriesWeWorkWith({ data }) {
  const [startIndex, setStartIndex] = useState(0);
  const isDesktop = useIsDesktop(); // NEW
  const mobileScrollRef = useRef(null); // NEW: mobile horizontal scroll container ref

  // If no data (or no items) is passed in, fall back to defaultData
  const source =
    data && Array.isArray(data.items) && data.items.length > 0
      ? data
      : defaultData;

  const industries = source.items || [];

  const maxStart = Math.max(0, industries.length - VISIBLE_COUNT);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStart;

  const visible = industries.slice(startIndex, startIndex + VISIBLE_COUNT);

  // NEW: mobile par ek card jitna scroll karna hai (container ki width ka ~85%)
  function scrollMobile(direction) {
    const container = mobileScrollRef.current;
    if (!container) return;
    const cardWidth = container.firstChild
      ? container.firstChild.offsetWidth + 24 // card width + gap (gap-6 = 24px)
      : container.offsetWidth * 0.85;
    container.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  // NEW: prev/next button click — desktop pe purana slice-based behavior,
  // mobile pe horizontal scroll
  function handlePrev() {
    if (isDesktop) {
      if (canGoPrev) setStartIndex((i) => i - 1);
    } else {
      scrollMobile(-1);
    }
  }

  function handleNext() {
    if (isDesktop) {
      if (canGoNext) setStartIndex((i) => i + 1);
    } else {
      scrollMobile(1);
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Top accent line */}
      <div className="absolute left-0 top-0 h-1 w-full" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
          {source?.title}{" "}
          <span className="text-sky-500">{source?.subtitle}</span>
        </h2>

        {/* Carousel */}
        <div className="relative mt-10">
          {/* Previous */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isDesktop && !canGoPrev}
            aria-label="Previous industries"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Dotted Divider */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 border-l-2 border-dotted border-sky-300 md:block" />

          {/* -----------------------------------------------------------
              MOBILE (below md): full list, horizontal left-to-right scroll
              MD AND UP: original slice-based grid (unchanged)
             ----------------------------------------------------------- */}
          <div
            ref={mobileScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {industries.map((item, index) => (
              <div
                key={index}
                className="relative flex min-h-[350px] w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-sky-500 p-6 text-white shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-6 w-6 object-contain"
                  />
                </span>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold leading-normal">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-sky-50">
                  {item.description}
                </p>

                <Link
                  href={item.link || "#"}
                  aria-label={`Learn more about ${item.title}`}
                  className="mt-auto flex h-10 w-10 items-center justify-center self-end rounded-full bg-white text-sky-500 shadow-sm transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Cards — original desktop/tablet grid, bilkul unchanged */}
          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {visible.map((item, index) => (
              <div
                key={index}
                className="relative flex min-h-[350px] flex-col rounded-3xl bg-sky-500 p-6 text-white shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-6 w-6 object-contain"
                  />
                </span>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold leading-normal">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-sky-50">
                  {item.description}
                </p>

                {/* Arrow */}
                <Link
                  href={item.link || "#"}
                  aria-label={`Learn more about ${item.title}`}
                  className="mt-auto flex h-10 w-10 items-center justify-center self-end rounded-full bg-white text-sky-500 shadow-sm transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isDesktop && !canGoNext}
            aria-label="Next industries"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scoped CSS: mobile scroll strip ki scrollbar chhupao (webkit browsers) */}
      <style jsx>{`
        div[class*="snap-x"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}