"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function HeroCarousel({ projects }) {
  // sirf un projects ka use jinke paas phoneMockup hai
  const slides = useMemo(
    () =>
      projects
        .filter((p) => p.phoneMockup)
        .slice(0, 5), // top 5
    [projects]
  );

  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2500); // 2.5s per slide
    return () => clearInterval(id);
  }, [slides]);

  if (!slides.length) return null;

  const current = slides[index];

  return (
    <div className="w-full flex justify-end">
      <div className="w-full max-w-xs md:max-w-sm rounded-3xl bg-white/10backdrop-blur-xl border border-white/20 shadow-[0_18px_40px_rgba(15,23,42,0.55)] p-4 md:p-5 flex flex-col gap-3 text-white">
        {/* <p className="text-[10px] uppercase tracking-[0.18em] text-sky-200">
          Featured projects
        </p> */}

        {/* small dots + project type */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-100">
            {current.type === "app"
              ? "Mobile App"
              : current.type === "web"
              ? "Website"
              : "Digital"}
          </p>
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-sky-400" : "w-2 bg-slate-500/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* phone mockup + gradient circle */}
        <div className="relative mt-1 flex items-center justify-center">
          <div className="absolute inset-x-4 bottom-0 h-24 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="relative w-32 h-48 md:w-40 md:h-46">
            <Image
              src={current.phoneMockup}
              alt={current.title}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* title */}
        <div className="mt-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sky-200">
            {current.category}
          </p>
          <h3 className="text-sx md:text-sm font-semibold leading-snug">
            {current.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
