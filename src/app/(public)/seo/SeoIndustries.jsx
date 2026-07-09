"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Timer, Landmark, HeartPulse, ShoppingBag, Building2, GraduationCap } from "lucide-react";

const industries = [
  {
    icon: Timer,
    title: "B2B",
    description:
      "Our B2B digital marketing strategies are designed to help businesses generate high-quality leads, engage prospects and achieve measurable results.",
  },
  {
    icon: Landmark,
    title: "Financial & Professional",
    description:
      "We provide banks and other financial institutions with tailored digital marketing strategies to help them connect with their audience and drive engagement.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "We provide specialized digital marketing solutions to hospitals, clinics and other health institutions to help them build trust and grow their brand.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description:
      "We help retail and e-commerce brands attract shoppers, boost conversions, and build lasting customer loyalty through data-driven campaigns.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "We craft targeted marketing strategies that help real estate businesses generate qualified leads and showcase properties effectively.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "We help schools and educational institutions reach prospective students and build a strong, trusted online presence.",
  },
];

const VISIBLE_COUNT = 3;

export default function IndustriesWeWorkWith() {
  const [startIndex, setStartIndex] = useState(0);

  const maxStart = industries.length - VISIBLE_COUNT;
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStart;

  const visible = industries.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      {/* Top accent line */}
      <div className="mx-auto mb-6 h-[3px] max-w-7xl bg-sky-500" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
          Industries <span className="text-sky-500">We Work With</span>
        </h2>

        {/* Carousel */}
        <div className="relative mt-10">
          {/* Prev button */}
          <button
            type="button"
            onClick={() => canGoPrev && setStartIndex((i) => i - 1)}
            disabled={!canGoPrev}
            aria-label="Previous industries"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Center dotted divider (through the middle card) */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 border-l-2 border-dotted border-sky-300 md:block" />

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visible.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="relative flex min-h-[350px] flex-col rounded-3xl bg-sky-500 p-6 text-white shadow-md transition-all duration-300"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </span>

                <h3 className="mt-5 text-md font-bold leading-normal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-50">{description}</p>

                <button
                  type="button"
                  aria-label={`Learn more about ${title}`}
                  className="mt-auto flex h-9 w-9 items-center justify-center self-end rounded-full bg-white text-sky-500 shadow-sm transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={() => canGoNext && setStartIndex((i) => i + 1)}
            disabled={!canGoNext}
            aria-label="Next industries"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}