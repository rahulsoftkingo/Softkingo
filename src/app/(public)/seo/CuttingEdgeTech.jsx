"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Brain, Satellite, Link2, BarChart3, Glasses } from "lucide-react";

const technologies = [
  {
    tag: "AI / ML",
    icon: Brain,
    title: "AI / ML",
    description:
      "Our taxi app development services integrate AI and ML to power dynamic pricing, predictive demand, and smart route suggestions. AI-driven dispatch/ML-powered matching enable faster pickups, improving rider satisfaction and driver utilisation.",
  },
  {
    tag: "IoT Fleet Tracking",
    icon: Satellite,
    title: "IoT Fleet Tracking",
    description:
      "Connected in-vehicle sensors and GPS units stream live location, speed, and diagnostics to your dispatch engine. Real-time IoT data keeps fleets visible, improves ETAs, and flags maintenance issues before they cause downtime.",
  },
  {
    tag: "Blockchain",
    icon: Link2,
    title: "Blockchain",
    description:
      "Blockchain-backed ledgers secure fare records, driver payouts, and ride history against tampering. Smart contracts automate settlements between riders, drivers, and partners, adding a transparent layer of trust to every transaction.",
  },
  {
    tag: "Big Data",
    icon: BarChart3,
    title: "Big Data Analytics",
    description:
      "Every ride, cancellation, and surge event feeds a data pipeline that surfaces demand patterns by hour, zone, and season. Big data analytics turns raw trip logs into pricing strategy, fleet planning, and marketing decisions.",
  },
  {
    tag: "AR / VR",
    icon: Glasses,
    title: "AR / VR Navigation",
    description:
      "AR-assisted navigation overlays turn-by-turn cues directly on the driver's view, cutting wrong turns in unfamiliar areas. VR walkthroughs also let you preview app flows and onboarding screens before they ship.",
  },
];

const SEGMENT_VH = 70;

export default function CuttingEdgeTech() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      technologies.length - 1,
      Math.max(0, Math.floor(latest * technologies.length))
    );
    setActiveIndex(idx);
  });

  const handleTabClick = (i) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = el.offsetHeight;
    const scrollable = containerHeight - window.innerHeight;
    const targetProgress = (i + 0.5) / technologies.length;
    window.scrollTo({
      top: containerTop + scrollable * targetProgress,
      behavior: "smooth",
    });
  };

  const ActiveIcon = technologies[activeIndex].icon;

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${technologies.length * SEGMENT_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
              Cutting-Edge Technologies Powering Our{" "}
              <span className="text-sky-500">Taxi App Development</span>
            </h2>
            <p className="mt-4 text-md leading-relaxed text-slate-600">
              We integrate the latest technology to boost your taxi app with
              enhanced functionality, security, and seamless user experience,
              keeping your solution future-ready and ahead of the curve.
            </p>
          </motion.div>

          {/* Tabs + content */}
          <div
            className="mt-12 grid gap-10"
            style={{ gridTemplateColumns: "300px 1px 1fr" }}
          >
            {/* Left: tab list */}
            <div className="flex flex-col gap-3">
              {technologies.map((tech, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={tech.tag}
                    onClick={() => handleTabClick(i)}
                    className={`w-full rounded-xl px-5 py-4 text-left text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tech.tag}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="bg-slate-200" />

            {/* Right: active content */}
            <div className="relative min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                    <ActiveIcon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {technologies[activeIndex].title}
                  </h3>
                  <p className="max-w-xl text-md leading-relaxed text-slate-600">
                    {technologies[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}