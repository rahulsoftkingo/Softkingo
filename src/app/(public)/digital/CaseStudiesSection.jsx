'use client';

import { ArrowUpRight, ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";
import Image from "next/image";
import Link from "next/link";

// Fixed card size + gap (cards are a fixed 415px wide)
const CARD_WIDTH = 415;
const GAP = 20; // matches gap-5
const STEP = CARD_WIDTH + GAP;

// --- Static data: case study details ---
const CASE_STUDIES = [
  {
    id: "keller-williams",
    gradientFrom: "#F2B30D",
    gradientTo: "#C2410C",
    logoText: "/uploads/admin/portfolio/potafo-logo.webp",
    logoSubText: "Potafo – Multi-Vendor Food Delivery Platform",
    logoType: "text",
    description:
      "Executed SEO, PPC, and social media marketing strategies for a multi-vendor food delivery platform, increasing brand visibility, user acquisition, and online orders.",
    stats: [
      { value: "70%", label: "Business Growth" },
      { value: "150%", label: "Organic Traffic Growth" },
      { value: "120%", label: "Increase in App Downloads" },
      { value: "45%", label: "Lower Cost per Acquisition (CPA)" },
    ],
    mockupImage: "/images/case-studies/Potafo.webp",
    link: "https://www.potafo.in/",
  },
  {
    id: "pikup",
    gradientFrom: "#DE1C24",
    gradientTo: "#b90035ef",
    logoText: "/uploads/general/snoonu-logo.webp",
    logoSubText: "Snoonu – Super App for Food & Services",
    logoType: "text",
    description:
      "Executed SEO, PPC, and social media marketing strategies for Qatar’s trusted super app, strengthening online visibility, increasing customer engagement, and driving app adoption across multiple service categories.",
    stats: [
      { value: "150%", label: "Organic Visibility Growth" },
      { value: "120%", label: "User Engagement Increase" },
      { value: "80%", label: "Campaign Reach Expansion" },
      { value: "40%", label: "Lower Customer Acquisition Cost (CAC)" },
    ],
    mockupImage: "/images/case-studies/Snoonu.webp",
    link: "https://snoonu.com/",
  },
  {
    id: "naaviqload",
    gradientFrom: "#DB2777",
    gradientTo: "#831843",
    logoText: "/uploads/general/innergy-logo.webp",
    logoSubText: "AnyTime Astro – Online Astrology App",
    logoType: "text",
    description:
      "AI-powered logistics platform simplifying truck bookings, load matching, and fleet coordination.",
    stats: [
      { value: "200%", label: "Organic Traffic Growth" },
      { value: "150%", label: "App Install Growth" },
      { value: "90%", label: "Social Media Reach Expansion" },
      { value: "45%", label: "Reduced Cost per Acquisition (CPA)" },
    ],
    mockupImage: "/images/case-studies/AnytimeAstro.webp",
    link: "https://www.anytimeastro.com/",
  },
  {
    id: "orbitfit",
    gradientFrom: "#7DA509",
    gradientTo: "#365314",
    logoText: "/images/case-studies/logo.png",
    logoSubText: "LoveLocal – Grocery Delivery App",
    logoType: "text",
    description:
      "SEO, PPC, and social media strategies to boost online visibility, customer engagement, and grocery order growth.",
    stats: [
      { value: "180%", label: "Organic Traffic Growth" },
      { value: "120%", label: "User Engagement Growth" },
      { value: "100%", label: "Campaign Reach Expansion" },
      { value: "40%", label: "Lower Acquisition Cost (CAC)" },
    ],
    mockupImage: "/images/case-studies/LoveLocal.webp",
    link: "https://www.lovelocal.in/",
  },
  {
    id: "moglix",
    gradientFrom: "#467CB1",
    gradientTo: "#1E3A8A",
    logoText: "/uploads/general/moglix-logo.webp",
    logoSubText: "Moglix – Digital Marketing Case Study",
    logoType: "text",
    description:
      "Developed data-driven SEO, PPC, and social media strategies to enhance online visibility, drive qualified business leads, and strengthen brand presence in the B2B e-commerce space..",
    stats: [
      { value: "180%", label: "Organic Traffic Growth" },
      { value: "150%", label: "User Engagement Growth" },
      { value: "120%", label: "Lead Generation Growth" },
      { value: "40%", label: "Marketing Efficiency Improvement" },
    ],
    mockupImage: "/images/case-studies/Moglix.webp",
    link: "https://www.moglix.com/",
  },
  {
    id: "medicare-connect",
    gradientFrom: "#289688",
    gradientTo: "#134E4A",
    logoText: "/uploads/general/guidely-logo.png",
    logoSubText: "Guidely – Digital Marketing Case Study",
    logoType: "text",
    description:
      "Developed data-driven SEO, PPC, and social media strategies to enhance online visibility, drive qualified business leads, and strengthen brand presence in the B2B e-commerce space..",
    stats: [
      { value: "180%", label: "Organic Traffic Growth" },
      { value: "150%", label: "User Engagement Growth" },
      { value: "120%", label: "Lead Generation Growth" },
      { value: "40%", label: "Marketing Efficiency Improvement" },
    ],
    mockupImage: "/images/case-studies/Guidely.webp",
    link: "https://guidely.in/",
  },
  {
    id: "fintrack",
    gradientFrom: "#A479EF",
    gradientTo: "#4C1D95",
    logoText: "/uploads/general/bumpy-logo.webp",
    logoSubText: "Bumpy – International Dating App",
    logoType: "text",
    description:
      "Implemented SEO, PPC, and social media strategies to enhance brand visibility, increase user engagement, and drive app growth across global markets",
    stats: [
      { value: "180%", label: "Organic Visibility Growth" },
      { value: "140%", label: "User Engagement Growth" },
      { value: "120%", label: "App Install Growth" },
      { value: "45%", label: "Improved Campaign Efficiency" },
    ],
    mockupImage: "/images/case-studies/Bumpy.webp",
    link: "https://bumpy.app/",
  },
  {
    id: "eduspark",
    gradientFrom: "#DB2777",
    gradientTo: "#831843",
    logoText: "/uploads/general/corevalent.webp",
    logoSubText: "CoreValent – Digital Transformation Consulting",
    logoType: "text",
    description:
      "Helped CoreValent grow online through website development, SEO, GMB optimization, and social media marketing to increase brand reach and visibility.",
    stats: [
      { value: "150%", label: "Online Visibility Growth" },
      { value: "120%", label: "Organic Traffic Growth" },
      { value: "90%", label: "Social Media Engagement" },
      { value: "100%", label: "Digital Setup Completed" },
    ],
    mockupImage: "/images/case-studies/corevalen.png",
    link: "https://www.corevalentllc.com/",
  },
];

function CardLogo({ study }) {
  if (study.logoType === "icon-truck") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
          <span className="text-lg">🚚</span>
        </div>
        <span className="text-lg font-bold text-white">{study.logoText}</span>
      </div>
    );
  }

  if (study.logoType === "icon-box") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
          <span className="text-lg">📦</span>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-wide text-white">
            {study.logoText}
          </p>
          {study.logoSubText && (
            <p className="text-[12px] font-bold tracking-widest text-white">
              {study.logoSubText}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="leading-tight">
      {study.logoText && (
        <Image
          src={study.logoText}
          alt="Logo"
          width={44}
          height={30}
          className="h-6 w-auto object-contain w-[43px] h-[45px]"
        />
      )}

      {study.logoSubText && (
        <p className="mt-3 text-sm font-bold tracking-wide text-white">
          {study.logoSubText}
        </p>
      )}
    </div>
  );
}

function CaseStudyCard({ study }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative flex h-full min-h-[550px] w-[415px] flex-shrink-0 flex-col overflow-hidden rounded-4xl p-6 pb-0 shadow-lg"
      style={{
        background: `linear-gradient(160deg, ${study.gradientFrom} 0%, ${study.gradientTo} 100%)`,
      }}
    >
      {/* Header: logo + arrow button */}
      <div className="flex items-start justify-between">
        <CardLogo study={study} />

        <Link
          target="_blank"
          href={study.link}
          aria-label={`Visit ${study.id}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Description */}
      <p className="mt-2 text-[11px] logoSubText text-white/90">
        {study.description}
      </p>

      {/* Stats grid */}
      <div className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-5 pb-6">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[35%] h-px -translate-y-1/2 bg-white"
          aria-hidden="true"
        />
        {study.stats.map((stat, i) => (
          <div key={i}>
            <p className="text-xs font-bold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs font-semibold leading-snug text-white/85">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mockup image */}
      <div className="relative mt-auto flex flex-1 items-end justify-center pt-6">
        <div className="relative h-[220px] w-full">
          {!imageError ? (
            <Image
              src={study.mockupImage}
              alt={`${study.id} app mockup`}
              fill
              className="pointer-events-none object-contain object-bottom select-none"
              sizes="415px"
              draggable={false}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-white/10 text-white/70">
              <ImageOff className="h-8 w-8" />
              <span className="text-xs font-medium">Preview unavailable</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesSection({ title, data }) {
  const heading = title || "Our Portfolio";
  const studies = data && data.length > 0 ? data : CASE_STUDIES;
  const count = studies.length;

  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const containerWidth = useCallback(() => containerRef.current?.offsetWidth ?? 0, []);
  const trackWidth = useCallback(() => count * STEP - GAP, [count]);

  const minX = useCallback(() => {
    return Math.min(0, containerWidth() - trackWidth());
  }, [containerWidth, trackWidth]);

  // Handle smooth alignment on index change when not dragging
  useEffect(() => {
    if (!isDragging) {
      const targetX = Math.max(minX(), -index * STEP);
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging, minX]);

  const goRight = () => {
    setIndex((prev) => (prev + 1) % count);
  };

  const goLeft = () => {
    setIndex((prev) => (prev - 1 + count) % count);
  };

  return (
    <section className="overflow-hidden bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-0">
        <div className="flex items-start justify-between gap-6">
          <CommonTitle align="left" pill={false} title={heading} />

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={goLeft}
              aria-label="Scroll left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-all duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goRight}
              aria-label="Scroll right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-all duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="mr-[calc(50%-50vw)] [clip-path:inset(0_-100vw_0_0)]"
        >
          <motion.div
            className="flex cursor-grab gap-5 pb-4 select-none active:cursor-grabbing"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const offset = info.offset.x;
              const velocity = info.velocity.x;
              let newIndex = index;

              // Fast flick/swipe check
              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              } else if (Math.abs(offset) > CARD_WIDTH * 0.3) {
                // Dragged past 30% threshold of card width
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              newIndex = Math.max(0, Math.min(count - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x, touchAction: "pan-y" }}
          >
            {studies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}