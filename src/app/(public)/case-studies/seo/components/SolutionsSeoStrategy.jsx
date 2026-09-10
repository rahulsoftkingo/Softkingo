import React from "react";
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

export default function SolutionsSeoStrategy({ data }) {
  console.log("show me the data of the solution seo", data);

  const heading = data?.heading || "Our SEO Strategy";
  const description = data?.description || "";

  const cards = Array.isArray(data?.cards) ? data.cards : [];

  return (
    <section className="md:pb-12 pt-5 bg-[#F1F9FF]">
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

        {/* Cards */}
        {cards.length > 0 && (
          <div className="flex flex-wrap items-stretch justify-center gap-5">
            {cards.map((card, i) => {
              // Icon always comes from the dummy icon list
              const Icon = strategyIcons[i % strategyIcons.length];

              return (
                <div
                  key={i}
                  className="w-[250px] min-h-[250px] bg-white border border-slate-100/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 group shrink-0"
                >
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-full bg-sky-50/80 flex items-center justify-center mt-2 mb-6 group-hover:bg-sky-600 transition-colors duration-300 shrink-0">
                    <Icon
                      size={22}
                      className="text-sky-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                    {card?.title || ""}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
                    {card?.description || ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}