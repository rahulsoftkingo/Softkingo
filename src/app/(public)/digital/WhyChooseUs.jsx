"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Rocket,
  Tag,
  Sparkles,
  Radar,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import CommonTitle from "@/components/ui/CommonTitle";

const icons = [
  Rocket,
  Tag,
  Sparkles,
  Radar,
  Globe2,
  ShieldCheck,
];

const DEFAULT_DATA = {
  title: "Why Choose Us",
  subtitle:
    "We combine strategy, design, and technology to deliver solutions that drive real business growth and measurable results.",
  items: [
    { title: "Rapid Delivery", description: "We move fast without cutting corners, getting your product to market quickly and reliably." },
    { title: "Transparent Pricing", description: "No hidden costs. You know exactly what you're paying for at every stage of the project." },
    { title: "Innovative Approach", description: "We stay ahead of trends and use the latest tools and techniques to keep you competitive." },
    { title: "Market Insights", description: "Our strategies are backed by real data and deep understanding of your target audience." },
    { title: "Global Reach", description: "We've helped clients across industries and geographies scale their digital presence." },
    { title: "Reliable Support", description: "Our team stays with you post-launch, ensuring everything runs smoothly long-term." },
  ],
};

const CARD_HEIGHT = 150;
const CARD_GAP = 20;
const VIEWPORT_HEIGHT = 420;
const TRACK_HEIGHT = 320;

// NEW: har card ke scroll-through ke liye extra "scroll room".
// Jitna zyada, utna slow/halka feel aayega per card.
const SCROLL_ROOM_PER_CARD = 260;

// Simple hook: sirf lg breakpoint (1024px) check karta hai
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true); // default true = SSR-safe fallback to desktop markup

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function FeatureCard({ item, i, style }) {
  const Icon = icons[i % icons.length];
  return (
    <div
      className="flex items-start gap-3 rounded-2xl bg-[#123247] p-5 text-white shadow-lg"
      style={style}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Icon className="h-5 w-5 text-sky-300" strokeWidth={2} />
      </span>

      <div>
        <h3 className="text-md font-bold leading-normal">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs({ data }) {
  const containerRef = useRef(null);
  const isDesktop = useIsDesktop();

  const title = data?.title || DEFAULT_DATA.title;
  const subtitle = data?.subtitle || DEFAULT_DATA.subtitle;
  const features =
    data?.items && data.items.length > 0 ? data.items : DEFAULT_DATA.items;

  // NEW: section ki total height ab content ke hisaab se lambi hai,
  // taaki scroll progress (0 -> 1) dheere-dheere cover ho, jaldi nahi.
  const sectionHeight = VIEWPORT_HEIGHT + features.length * SCROLL_ROOM_PER_CARD;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Softer spring: kam stiffness + zyada damping = halka, lag-y, smooth feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    mass: 0.8,
  });

  const totalStackHeight =
    features.length * (CARD_HEIGHT + CARD_GAP) - CARD_GAP;

  const scrollDistance = Math.max(0, totalStackHeight - VIEWPORT_HEIGHT);

  const y = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  const thumbHeight = Math.max(
    48,
    (VIEWPORT_HEIGHT / (totalStackHeight || 1)) * TRACK_HEIGHT
  );

  const thumbTop = useTransform(smoothProgress, [0, 1], [0, TRACK_HEIGHT - thumbHeight]);

  // ---------- MOBILE / TABLET: clean static version, no scroll-jacking ----------
  if (!isDesktop) {
    return (
      <section className="relative bg-gradient-to-br from-white via-sky-50 to-sky-200 px-4 py-12 sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <CommonTitle title={title} subtitle={subtitle} align="left" />
          </motion.div>

          <div className="flex flex-col gap-4">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <FeatureCard item={item} i={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ---------- DESKTOP: original scroll-jacking version, unchanged ----------
  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-white via-sky-50 to-sky-200"
      style={{ height: sectionHeight }} // NEW: lambi scroll-height
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-1 flex-col justify-center"
          >
            <CommonTitle
              title={title}
              subtitle={subtitle}
              align="left"
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="hidden items-center justify-center lg:flex lg:shrink-0">
            <div
              className="relative rounded-full bg-slate-200"
              style={{ height: TRACK_HEIGHT, width: 2 }}
            >
              <motion.div
                className="absolute left-0 rounded-full bg-slate-900"
                style={{
                  height: thumbHeight,
                  top: thumbTop,
                  width: 2,
                }}
              />
            </div>
          </div>

          {/* Cards */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{ height: VIEWPORT_HEIGHT }}
          >
            <motion.div style={{ y }} className="flex flex-col">
              {features.map((item, i) => (
                <FeatureCard
                  key={i}
                  item={item}
                  i={i}
                  style={{
                    height: CARD_HEIGHT,
                    marginBottom: i === features.length - 1 ? 0 : CARD_GAP,
                  }}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}