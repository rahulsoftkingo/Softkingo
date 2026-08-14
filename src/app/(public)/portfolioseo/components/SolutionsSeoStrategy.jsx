import React from "react";
import {
  ClipboardCheck,
  FileEdit,
  Search,
  Share2,
  Link2,
  MapPin,
} from "lucide-react";

const strategySteps = [
  {
    icon: ClipboardCheck,
    title: "Technical SEO",
    desc: "Fixed crawl errors, improved site speed, mobile usability and core web vitals.",
  },
  {
    icon: FileEdit,
    title: "On-Page SEO",
    desc: "Optimized meta tags, headings, content and internal linking.",
  },
  {
    icon: Search,
    title: "Keyword Research",
    desc: "In-depth keyword research based on search intent and business goals.",
  },
  {
    icon: Share2,
    title: "Content Strategy",
    desc: "Created and optimized high-quality content that ranks and converts.",
  },
  {
    icon: Link2,
    title: "Link Building",
    desc: "Built high-authority backlinks to improve domain authority.",
  },
];

export default function SolutionsSeoStrategy() {
  return (
    <section className="md:pb-12 pt-3 bg-[#F1F9FF]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our SEO Strategy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal">
            A comprehensive approach tailored to the client's goals and challenges.
          </p>
        </div>

        {/* Flex layout with fixed 250px width cards */}
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          {strategySteps.map((step, i) => {
            const Icon = step.icon;

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
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}