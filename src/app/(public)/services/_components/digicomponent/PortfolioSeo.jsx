"use client";

import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";
import Image from "next/image";

const CARD_WIDTH = 415;
const GAP = 20;
const STEP = CARD_WIDTH + GAP;

// First 5 colors from the old static case studies
const CARD_GRADIENTS = [
  {
    gradientFrom: "#F2B30D",
    gradientTo: "#C2410C",
  },
  {
    gradientFrom: "#DE1C24",
    gradientTo: "#b90035ef",
  },
  {
    gradientFrom: "#DB2777",
    gradientTo: "#831843",
  },
  {
    gradientFrom: "#7DA509",
    gradientTo: "#365314",
  },
  {
    gradientFrom: "#467CB1",
    gradientTo: "#1E3A8A",
  },
];

function normalizePortfolioData(data = []) {
  return data.map((item, index) => {
    const color =
      CARD_GRADIENTS[index % CARD_GRADIENTS.length];

    return {
      id: `portfolio-seo-${index}`,

      gradientFrom: color.gradientFrom,
      gradientTo: color.gradientTo,

      // Logo abhi nahi hai
      logoText: "",
      logoSubText: "",

      // Link abhi nahi hai
      link: "",

      featuredTag: item.featuredTag || "",
      description: item.shortDescription || "",

      stats: Array.isArray(item.highlights)
        ? item.highlights.map((highlight) => ({
            value: highlight?.value || "",
            label: highlight?.text || "",
          }))
        : [],

      mockupImage: item.cardImage || "",
    };
  });
}

function PortfolioImage({ src, alt }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-white/10 text-white/70">
        <ImageOff className="h-8 w-8" />
        <span className="text-xs font-medium">
          Preview unavailable
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      loading="lazy"
      sizes="415px"
      draggable={false}
      className="pointer-events-none select-none object-contain object-bottom"
      onError={() => setError(true)}
    />
  );
}

function PortfolioSeoCard({ study }) {
  return (
    <div
      className="relative flex h-full min-h-[550px] w-[415px] shrink-0 flex-col overflow-hidden rounded-4xl p-6 pb-0 shadow-lg"
      style={{
        background: `linear-gradient(
          160deg,
          ${study.gradientFrom} 0%,
          ${study.gradientTo} 100%
        )`,
      }}
    >
      {/* Featured Tag */}
      <div className="min-h-[45px]">
        {study.featuredTag && (
          <p className="text-sm font-bold tracking-wide text-white">
            {study.featuredTag}
          </p>
        )}
      </div>

      {/* Description */}
      {study.description && (
        <p className="mt-2 text-[11px] text-white/90">
          {study.description}
        </p>
      )}

      {/* Highlights */}
      {study.stats.length > 0 && (
        <div className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-5 pb-6">
          {/* Vertical line */}
          {study.stats.length > 1 && (
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white"
              aria-hidden="true"
            />
          )}

          {/* Horizontal line */}
          {study.stats.length > 2 && (
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white"
              aria-hidden="true"
            />
          )}

          {study.stats.map((stat, index) => (
            <div key={index}>
              {stat.value && (
                <p className="text-xs font-bold text-white">
                  {stat.value}
                </p>
              )}

              {stat.label && (
                <p className="mt-0.5 text-xs font-semibold leading-snug text-white/85">
                  {stat.label}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Card Image */}
      <div className="relative mt-auto flex flex-1 items-end justify-center pt-6">
        <div className="relative h-[220px] min-h-[220px] w-full overflow-hidden">
          <PortfolioImage
            src={study.mockupImage}
            alt={study.featuredTag || "Portfolio case study"}
          />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSeo({
  title,
  data = [],
}) {
  const heading = title || "Our Portfolio";

  const studies = normalizePortfolioData(data);
  const realCount = studies.length;

  const [virtualIndex, setVirtualIndex] = useState(
    realCount
  );

  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(-realCount * STEP);

  const extendedData = [
    ...studies,
    ...studies,
    ...studies,
  ];

  // Reset carousel if data changes
  useEffect(() => {
    if (realCount > 0) {
      setVirtualIndex(realCount);
      x.set(-realCount * STEP);
    }
  }, [realCount, x]);

  // Animation
  useEffect(() => {
    if (!isDragging && realCount > 0) {
      const targetX = -virtualIndex * STEP;

      const controls = animate(x, targetX, {
        type: "spring",
        stiffness: 260,
        damping: 28,

        onComplete: () => {
          if (virtualIndex >= realCount * 2) {
            const resetIndex =
              virtualIndex - realCount;

            setVirtualIndex(resetIndex);
            x.set(-resetIndex * STEP);
          } else if (virtualIndex < realCount) {
            const resetIndex =
              virtualIndex + realCount;

            setVirtualIndex(resetIndex);
            x.set(-resetIndex * STEP);
          }
        },
      });

      return () => controls.stop();
    }
  }, [
    virtualIndex,
    isDragging,
    realCount,
    x,
  ]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement?.tagName
        )
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setVirtualIndex((prev) => prev - 1);
      }

      if (event.key === "ArrowRight") {
        setVirtualIndex((prev) => prev + 1);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const goLeft = () => {
    setVirtualIndex((prev) => prev - 1);
  };

  const goRight = () => {
    setVirtualIndex((prev) => prev + 1);
  };

  // No data
  if (!realCount) {
    return null;
  }

  return (
    <section className="relative overflow-x-hidden bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <CommonTitle
            align="left"
            pill={false}
            title={heading}
          />

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

        {/* Carousel */}
        <div className="mr-[calc(50%-50vw)] overflow-hidden">
          <motion.div
            className="flex cursor-grab gap-5 pb-4 select-none active:cursor-grabbing"
            drag="x"
            dragElastic={0.15}
            dragMomentum={false}
            onDragStart={() => {
              setIsDragging(true);
            }}
            onDragEnd={(event, info) => {
              setIsDragging(false);

              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = virtualIndex;

              if (Math.abs(velocity) > 400) {
                newIndex =
                  velocity < 0
                    ? virtualIndex + 1
                    : virtualIndex - 1;
              } else if (
                Math.abs(offset) >
                CARD_WIDTH * 0.25
              ) {
                newIndex =
                  offset < 0
                    ? virtualIndex + 1
                    : virtualIndex - 1;
              }

              setVirtualIndex(newIndex);
            }}
            style={{
              x,
              touchAction: "pan-y",
            }}
          >
            {extendedData.map((study, index) => (
              <PortfolioSeoCard
                key={`${study.id}-${index}`}
                study={study}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}