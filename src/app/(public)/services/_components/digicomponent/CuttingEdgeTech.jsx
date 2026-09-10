"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Satellite,
  Link2,
  BarChart3,
  Glasses,
  Cpu,
} from "lucide-react";

// Fallback icons
const FALLBACK_ICONS = [
  Brain,
  Satellite,
  Link2,
  BarChart3,
  Glasses,
  Cpu,
];

// Dummy Data
const DUMMY_TECHNOLOGIES = [
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

const DUMMY_TITLE_PARTS = {
  before: "Cutting-Edge Technologies Powering Our",
  highlight: "Taxi App Development",
};

const DUMMY_SUBTITLE =
  "We integrate the latest technology to boost your taxi app with enhanced functionality, security, and seamless user experience, keeping your solution future-ready and ahead of the curve.";

export default function CuttingEdgeTech({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasDynamicItems =
    Array.isArray(data?.items) && data.items.length > 0;

  const technologies = hasDynamicItems
    ? data.items.map((item, i) => ({
        tag: item.category || item.name || `Tech ${i + 1}`,
        title: item.name || item.category || `Technology ${i + 1}`,
        description: item.description || "",
        icon: item.icon || "",
        fallbackIcon: FALLBACK_ICONS[i % FALLBACK_ICONS.length],
      }))
    : DUMMY_TECHNOLOGIES.map((t) => ({
        tag: t.tag,
        title: t.title,
        description: t.description,
        icon: "",
        fallbackIcon: t.icon,
      }));

  const sectionTitle =
    hasDynamicItems && data?.title ? data.title : null;

  const sectionSubtitle =
    hasDynamicItems && data?.subtitle ? data.subtitle : null;

  const activeTech = technologies[activeIndex];
  const ActiveFallbackIcon = activeTech.fallbackIcon;

  return (
    <section className="relative bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            {sectionTitle ? (
              sectionTitle
            ) : (
              <>
                {DUMMY_TITLE_PARTS.before}{" "}
                <span className="text-sky-500">
                  {DUMMY_TITLE_PARTS.highlight}
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 md:mt-5 text-base md:text-lg text-slate-600">
            {sectionSubtitle || DUMMY_SUBTITLE}
          </p>
        </motion.div>

        {/* Tabs + Content */}
        <div
          className="mt-10 md:mt-16 grid grid-cols-1 gap-6 md:gap-10 md:[grid-template-columns:300px_1px_1fr]"
        >
          {/* Left: horizontal scroll tabs on mobile, vertical stack on desktop */}
          <div className="-mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-3 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {technologies.map((tech, i) => {
                const isActive = i === activeIndex;

                return (
                  <button
                    key={`${tech.tag}-${i}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-3 md:w-full md:whitespace-normal md:px-5 md:py-4 text-left text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tech.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider - desktop only */}
          <div className="hidden md:block bg-slate-200" />

          {/* Right */}
          <div className="relative min-h-[200px] md:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3 md:gap-4"
              >
                <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center overflow-hidden rounded-xl bg-sky-500/10 text-sky-500">
                  {activeTech.icon ? (
                    <img
                      src={activeTech.icon}
                      alt={activeTech.title}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                    <ActiveFallbackIcon
                      className="h-5 w-5 md:h-6 md:w-6"
                      strokeWidth={2}
                    />
                  )}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  {activeTech.tag}
                </h3>

                <p className="max-w-2xl leading-7 md:leading-8 text-sm md:text-base text-slate-600">
                  {activeTech.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}