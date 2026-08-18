import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  FileEdit,
  Search,
  Share2,
  Link2,
} from "lucide-react";

// Dummy icons — kept fixed, NOT coming from API
const strategyIcons = [
  ClipboardCheck,
  FileEdit,
  Search,
  Share2,
  Link2,
];

function Card({ card, Icon }) {
  return (
    <div className="w-[250px] min-h-[250px] bg-white border border-slate-100/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 group shrink-0">
      <div className="w-14 h-14 rounded-full bg-sky-50/80 flex items-center justify-center mt-2 mb-6 group-hover:bg-sky-600 transition-colors duration-300 shrink-0">
        <Icon
          size={22}
          className="text-sky-600 group-hover:text-white transition-colors duration-300"
        />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
        {card?.title || ""}
      </h3>
      <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
        {card?.description || ""}
      </p>
    </div>
  );
}

export default function SolutionsSeoStrategy({ data }) {
  const heading = data?.heading || "Our SEO Strategy";
  const description = data?.description || "";
  const cards = Array.isArray(data?.cards) ? data.cards : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeIndex < cards.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="md:pb-12 pt-3 bg-[#F1F9FF]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal">
              {description}
            </p>
          )}
        </div>

        {cards.length > 0 && (
          <>
            {/* Mobile: draggable slider */}
            <div className="sm:hidden flex flex-col items-center overflow-hidden">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                animate={{ x: `calc(-${activeIndex * 100}% - ${activeIndex * 20}px)` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {cards.map((card, i) => {
                  const Icon = strategyIcons[i % strategyIcons.length];
                  return (
                    <div key={i} className="w-full flex justify-center px-2 shrink-0">
                      <Card card={card} Icon={Icon} />
                    </div>
                  );
                })}
              </motion.div>

              {/* Dot indicators */}
              <div className="flex gap-2 mt-6">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i ? "w-6 bg-sky-600" : "w-2 bg-sky-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop / tablet: normal wrap grid */}
            <div className="hidden sm:flex flex-wrap items-stretch justify-center gap-5">
              {cards.map((card, i) => {
                const Icon = strategyIcons[i % strategyIcons.length];
                return <Card key={i} card={card} Icon={Icon} />;
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}