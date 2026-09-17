// components/ui/PortfolioCards.jsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PortfolioCards({ projects }) {
  return (
    <>
      {projects.map((project, index) => (
        <StickyProjectCard key={project.id || index} p={project} index={index} />
      ))}
    </>
  );
}

/* ─── Sticky Project Card with scroll-based scale/opacity ─── */
function StickyProjectCard({ p, index }) {
  const ref = useRef(null);

  // Track scroll progress of THIS card relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.96, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const bgStyle = p.bgImage
    ? { backgroundImage: `url(${p.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : {
        backgroundImage:
          "radial-gradient(circle at top left, rgba(255,255,255,0.3), transparent 45%), radial-gradient(circle at bottom right, rgba(0,0,0,0.25), transparent 55%)",
      };

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, top: `${88 + index * 20}px` }}
      className="sticky rounded-2xl overflow-hidden transition-shadow"
    >
      {/* Card inner */}
      <div className="relative" style={{ minHeight: 260, ...bgStyle }}>
        {/* Color overlay */}
        <div
          className="absolute inset-0"
          style={{ background: p.bgColor || "rgba(2,132,199,1)", mixBlendMode: "multiply", opacity: 1 }}
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
              <h3 className="text-xl md:text-3xl font-bold text-white leading-normal">{p.title}</h3>
            </div>

            {/* Description */}
            <p
              className="text-xs sm:text-sm text-white/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p.description }}
            />

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

            {/* Badges + Case Study */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 mt-4">
              {p.badges?.play && (
                <Link href={p.badges.play.url || "#"} target="_blank" rel="noreferrer" className="flex justify-start">
                  <Image
                    src={p.badges.play.image || "/images/google-play.png"}
                    alt="Google Play"
                    width={130}
                    height={45}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              )}
              {p.badges?.app && (
                <Link href={p.badges.app.url || "#"} target="_blank" rel="noreferrer" className="flex justify-start">
                  <Image
                    src={p.badges.app.image || "/images/app-store.png"}
                    alt="App Store"
                    width={130}
                    height={45}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              )}
              {p.badges?.web && (
                <Link href={p.badges.web.url || "#"} target="_blank" rel="noreferrer" className="flex justify-start">
                  <Image
                    src={p.badges.web.image || "/images/view-web.png"}
                    alt="Web"
                    width={130}
                    height={45}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              )}
              <Link
                href={`/case-studies/${p.key}`}
                className="w-fit inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-black text-white hover:bg-white hover:text-black transition px-3 text-sm whitespace-nowrap border border-transparent hover:border-gray-400"
              >
                Case Study <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right mockup */}
          <div className="relative p-6 md:p-8 flex items-center justify-center">
            <div className="relative w-40 sm:w-44 md:w-52 h-[18rem] sm:h-[20rem]">
              {p.phoneMockup ? (
                <Image
                  src={p.phoneMockup}
                  alt={`${p.title} mockup`}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="w-full h-full bg-white/20 rounded-2xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}