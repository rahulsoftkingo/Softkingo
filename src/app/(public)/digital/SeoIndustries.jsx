"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const VISIBLE_COUNT = 3;

// Fallback data used when no `data` prop is passed in
const defaultData = {
  title: "Industries",
  subtitle: "We Work With",
  items: [
    {
      // icon: "https://api.iconify.design/lucide/hospital.svg?color=white",
      title: "Healthcare",
      description:
        "Secure, compliant platforms that help providers manage patients, records, and care delivery.",
    },
    {
      // icon: "https://api.iconify.design/lucide/landmark.svg?color=white",
      title: "Banking & Finance",
      description:
        "Robust systems for payments, lending, and risk management built with security at the core.",
    },
    {
      // icon: "https://api.iconify.design/lucide/shopping-cart.svg?color=white",
      title: "Retail & E-commerce",
      description:
        "Scalable storefronts and inventory tools that turn browsers into loyal customers.",
    },
    {
      // icon: "https://api.iconify.design/lucide/graduation-cap.svg?color=white",
      title: "Education",
      description:
        "Engaging learning platforms that connect students, teachers, and content seamlessly.",
    },
    {
      // icon: "https://api.iconify.design/lucide/truck.svg?color=white",
      title: "Logistics",
      description:
        "Real-time tracking and route optimization to keep goods moving efficiently.",
    },
    {
      // icon: "https://api.iconify.design/lucide/factory.svg?color=white",
      title: "Manufacturing",
      description:
        "Smart automation and monitoring tools that streamline production at every stage.",
    },
  ],
};

export default function IndustriesWeWorkWith({ data }) {
  const [startIndex, setStartIndex] = useState(0);

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
            onClick={() => canGoPrev && setStartIndex((i) => i - 1)}
            disabled={!canGoPrev}
            aria-label="Previous industries"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Dotted Divider */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 border-l-2 border-dotted border-sky-300 md:block" />

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                <button
                  type="button"
                  aria-label={`Learn more about ${item.title}`}
                  className="mt-auto flex h-10 w-10 items-center justify-center self-end rounded-full bg-white text-sky-500 shadow-sm transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => canGoNext && setStartIndex((i) => i + 1)}
            disabled={!canGoNext}
            aria-label="Next industries"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}