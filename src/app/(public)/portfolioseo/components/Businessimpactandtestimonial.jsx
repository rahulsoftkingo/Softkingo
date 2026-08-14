"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

// Dummy data — swap with real props/CMS data later
const businessImpact = [
  { value: "+214%", label: "Organic Leads" },
  { value: "+68%", label: "Conversion Rate" },
  { value: "+143%", label: "Revenue from Organic" },
  { value: "-37%", label: "Cost Per Lead" },
];

const testimonial = {
  quote:
    "Softkingo's SEO strategy completely transformed our online presence. Their team is professional, responsive and results-driven. We saw a significant increase in traffic and leads within just 6 months.",
  name: "John Smith",
  role: "CEO, Healthcare Brand",
  avatar: "https://i.pravatar.cc/100?img=13",
};

const tools = [
  {
    name: "Google Search Console",
    image: "/images/tech/googlesearchconsole.png",
  },
  {
    name: "Google Analytics",
    image: "/images/tech/googleanalytics.png",
  },
  {
    name: "Google Business Profile",
    image: "/images/tech/googlebusinessprofile.png",
  },
  {
    name: "Ahrefs",
    image: "/images/tech/ahrefs.png",
  },
  {
    name: "Semrush",
    image: "/images/tech/semrush.png",
  },
  {
    name: "Screaming Frog",
    image: "/images/tech/screamingfrog.png",
  },
  {
    name: "PageSpeed Insights",
    image: "/images/tech/pagespeedinsights.png",
  },
  {
    name: "Google Tag Manager",
    image: "/images/tech/googletagmanager.png",
  },
];

export default function BusinessImpactAndTestimonial() {
  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch">
          {/* LEFT: Business Impact */}
          <div className="w-full lg:w-[calc(30%-1rem)] rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Business Impact
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                SEO that drives real business results.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 sm:mt-6">
              {businessImpact.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white border border-slate-100 px-3 py-4 text-center flex flex-col justify-center"
                >
                  <p className="text-lg sm:text-2xl font-extrabold text-emerald-500">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-slate-500 font-semibold leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE: Testimonial */}
          <div className="w-full lg:w-[calc(30%-1rem)] rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7 flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center">
              What Our Client Says
            </h3>

            <Quote
              className="text-slate-200 mt-4"
              size={30}
              strokeWidth={2.5}
              fill="currentColor"
            />

            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed flex-1">
              {testimonial.quote}
            </p>

            <div className="flex items-center gap-3 mt-6">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Tools & Technologies */}
          <div className="w-full lg:w-[calc(40%-1rem)] rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-7 flex flex-col justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center mb-5 sm:mb-6">
              Tools &amp; Technologies
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tools.map((tool, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center text-center px-3 py-4 h-24 sm:h-28 transition-all hover:shadow-md"
                >
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={70}
                    height={35}
                    className="h-8 sm:h-9 w-auto object-contain"
                  />

                  <span className="mt-3 text-[10px] sm:text-[11px] font-semibold text-slate-600 leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}