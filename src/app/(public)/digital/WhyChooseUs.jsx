"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

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
  const isDesktop = useIsDesktop();

  const title = data?.title || DEFAULT_DATA.title;
  const subtitle = data?.subtitle || DEFAULT_DATA.subtitle;
  const features =
    data?.items && data.items.length > 0 ? data.items : DEFAULT_DATA.items;

  const totalStackHeight =
    features.length * (CARD_HEIGHT + CARD_GAP) - CARD_GAP;

  const [cardsBoxRef, setCardsBoxRef] = useState(null);
  const { scrollYProgress } = useScroll({
    container: cardsBoxRef ? { current: cardsBoxRef } : undefined,
  });

  const thumbHeight = Math.max(
    48,
    (VIEWPORT_HEIGHT / (totalStackHeight || 1)) * TRACK_HEIGHT
  );

  const thumbTop = useTransform(scrollYProgress, [0, 1], [0, TRACK_HEIGHT - thumbHeight]);

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

  return (
    <section className="relative bg-gradient-to-br from-white via-sky-50 to-sky-200 py-16">
      <div className="flex items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-1 flex-col justify-center"
          >
            <CommonTitle
              title={title}
              subtitle={subtitle}
              align="left"
            />
          </motion.div>

          <div
            ref={setCardsBoxRef}
            className="whychoose-scroll relative flex-1 overflow-y-auto"
            style={{ height: VIEWPORT_HEIGHT }}
          >
            <div className="flex flex-col mr-2">
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
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .whychoose-scroll {
          scrollbar-width: thin;
          scrollbar-color: #28afdf #f1f5f9;
        }
        .whychoose-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .whychoose-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .whychoose-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #28afdf, #06465d);
          border-radius: 8px;
        }
        .whychoose-scroll::-webkit-scrollbar-thumb:hover {
          background: #06465d;
        }
      `}</style>
    </section>
  );
}