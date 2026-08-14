import React from "react";
import {
  Building2,
  User,
  Layers,
  Globe,
  MapPin,
  Clock,
  Wrench,
  TrendingDown,
  KeyRound,
  AlertTriangle,
  Link2,
  Users,
} from "lucide-react";

// Dummy data
const overview = {
  client: "Healthcare Brand",
  industry: "Healthcare / Medical Services",
  website: "www.healthcarebrand.com",
  location: "USA",
  duration: "6 Months",
  services: "SEO (Technical, On-Page, Content, Link Building, Local SEO)",
};

const challenges = [
  {
    icon: TrendingDown,
    title: "Low organic traffic and poor visibility in search results",
  },
  {
    icon: KeyRound,
    title: "Very few keywords ranking on the first page",
  },
  {
    icon: AlertTriangle,
    title: "Technical issues affecting site performance",
  },
  {
    icon: Link2,
    title: "Low-quality backlinks and weak domain authority",
  },
  {
    icon: Users,
    title: "Low leads and poor conversion from organic traffic",
  },
];

const overviewRows = [
  { icon: User, label: "Client", value: overview.client },
  { icon: Layers, label: "Industry", value: overview.industry },
  { icon: Globe, label: "Website", value: overview.website, link: true },
  { icon: MapPin, label: "Location", value: overview.location },
  { icon: Clock, label: "Project Duration", value: overview.duration },
  { icon: Wrench, label: "Services", value: overview.services },
];

export default function SolutionsClientOverview() {
  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-5 items-stretch">

          {/* LEFT: Client Overview */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Client Overview
              </h3>
              <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center shadow-sm shadow-sky-500/30">
                <Building2 size={18} className="text-white" />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {overviewRows.map((row, i) => {
                const Icon = row.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="w-7 h-7 min-w-[28px] rounded-md bg-sky-50 text-sky-500 flex items-center justify-center">
                      <Icon size={15} />
                    </div>

                    <span className="w-28 sm:w-32 shrink-0 text-xs sm:text-sm text-slate-400 font-medium">
                      {row.label}
                    </span>

                    {row.link ? (
                      <a
                        href={`https://${row.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline break-all"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm font-semibold text-slate-600 leading-snug">
                        {row.value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: The Challenge */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6 flex flex-col justify-between">
            {/* Header */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The Challenge
              </h3>

              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                The client was facing several key challenges that impacted their online
                growth.
              </p>
            </div>

            {/* Cards */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {challenges.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 group min-h-[170px]"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center transition-all duration-300 group-hover:bg-red-500">
                      <Icon
                        size={30}
                        className="text-red-500 transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    {/* Title */}
                    <span className="mt-4 text-sm font-semibold text-slate-700 leading-snug">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}