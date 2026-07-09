"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Tag, Sparkles, Radar, Globe2, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Rapid Launch In 7 Days",
    description:
      "Get your taxi booking app live in just one week with a ready-to-go, fully tested solution.",
  },
  {
    icon: Tag,
    title: "100% White-Label Solution",
    description:
      "Brand the app entirely as your own with a fully customizable white-label taxi platform.",
  },
  {
    icon: Sparkles,
    title: "AI Powered Smart Features",
    description:
      "Enhance rides with intelligent features like dynamic pricing, route optimization, and predictive demand.",
  },
  {
    icon: Radar,
    title: "Intelligent Taxi Dispatch System",
    description:
      "Efficiently match riders and drivers in real time using smart, location-aware dispatch algorithms.",
  },
  {
    icon: Globe2,
    title: "Multi-Language & Multi-Currency",
    description:
      "Serve riders anywhere with built-in support for multiple languages and local currencies.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments Integration",
    description:
      "Accept payments safely with PCI-compliant gateways, wallets, and card options built in.",
  },
];

const CARD_HEIGHT = 220;
const CARD_GAP = 20;
const VIEWPORT_HEIGHT = 420;
const TRACK_HEIGHT = 320;

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalStackHeight = features.length * (CARD_HEIGHT + CARD_GAP) - CARD_GAP;
  const scrollDistance = Math.max(0, totalStackHeight - VIEWPORT_HEIGHT);

  const y = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const thumbHeight = Math.max(48, (VIEWPORT_HEIGHT / totalStackHeight) * TRACK_HEIGHT);
  const thumbTop = useTransform(scrollYProgress, [0, 1], [0, TRACK_HEIGHT - thumbHeight]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* flex instead of arbitrary-value grid so 3-column layout actually
            renders on lg+ screens (mobile stays stacked via flex-col) */}
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-1 flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
              Why <span className="text-sky-500">Choose Us?</span>
            </h2>
            <p className="mt-4 max-w-md text-md leading-relaxed text-slate-600">
              As a leading on-demand taxi booking app development company, we deliver
              feature-ready solutions designed to position your business as a leading disruptor
              in the taxi service industry.
            </p>
          </motion.div>

          {/* Vertical progress track */}
          <div className="hidden items-center justify-center lg:flex lg:shrink-0">
            <div
              className="relative rounded-full bg-slate-200"
              style={{ height: TRACK_HEIGHT, width: 2 }}
            >
              <motion.div
                className="absolute left-0 rounded-full bg-slate-900"
                style={{ height: thumbHeight, top: thumbTop, width: 2 }}
              />
            </div>
          </div>

          {/* Right: card viewport */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{ height: VIEWPORT_HEIGHT }}
          >
            <motion.div
              style={{ y }}
              className="flex flex-col"
              transition={{ ease: "easeOut" }}
            >
              {features.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-2xl bg-[#123247] p-5 text-white shadow-lg"
                  style={{
                    height: CARD_HEIGHT,
                    marginBottom: i === features.length - 1 ? 0 : CARD_GAP,
                  }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-5 w-5 text-sky-300" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-md font-bold leading-normal">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}