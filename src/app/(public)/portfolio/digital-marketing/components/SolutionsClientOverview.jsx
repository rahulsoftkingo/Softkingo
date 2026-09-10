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

// Default icons for challenge cards
const defaultChallengeIcons = [
  TrendingDown,
  KeyRound,
  AlertTriangle,
  Link2,
  Users,
];

export default function SolutionsClientOverview({ data }) {
  console.log("show me the data of this component", data);

  // --------------------------------------------------
  // Client / Overview Data
  // --------------------------------------------------
  const clientData = data?.client || {};

  const overviewRows = [
    {
      icon: User,
      label: "Client",
      value: clientData.client,
    },
    {
      icon: Layers,
      label: "Industry",
      value: clientData.industry,
    },
    {
      icon: Globe,
      label: "Website",
      value: clientData.website,
      link: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: clientData.location,
    },
    {
      icon: Clock,
      label: "Project Duration",
      value: clientData.duration,
    },
    {
      icon: Wrench,
      label: "Services",
      value: clientData.services,
    },
  ].filter((row) => row.value);

  // --------------------------------------------------
  // Challenge Data
  // --------------------------------------------------
  const challengeData = data?.challenge || {};

  // Only use valid object points.
  // This automatically removes strings such as:
  // "This object has been omitted by React..."
  const challengePoints = Array.isArray(challengeData.points)
    ? challengeData.points.filter(
        (point) => point && typeof point === "object" && point.text
      )
    : [];

  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-5 items-stretch">

          {/* =========================================
              LEFT: CLIENT OVERVIEW
          ========================================= */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6 flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Client Overview
              </h3>

              <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center shadow-sm shadow-sky-500/30">
                <Building2 size={18} className="text-white" />
              </div>
            </div>

            {/* Overview Rows */}
            <div className="divide-y divide-slate-100">
              {overviewRows.map((row, i) => {
                const Icon = row.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    {/* Icon */}
                    <div className="w-7 h-7 min-w-[28px] rounded-md bg-sky-50 text-sky-500 flex items-center justify-center">
                      <Icon size={15} />
                    </div>

                    {/* Label */}
                    <span className="w-28 sm:w-32 shrink-0 text-xs sm:text-sm text-slate-400 font-medium">
                      {row.label}
                    </span>

                    {/* Value */}
                    {row.link ? (
                      <a
                        href={
                          row.value?.startsWith("http")
                            ? row.value
                            : `https://${row.value}`
                        }
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

          {/* =========================================
              RIGHT: THE CHALLENGE
          ========================================= */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6 flex flex-col justify-between">

            {/* Header */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {challengeData.heading || "The Challenge"}
              </h3>

              {challengeData.description && (
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {challengeData.description}
                </p>
              )}
            </div>

            {/* Challenge Cards */}
            {challengePoints.length > 0 && (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {challengePoints.map((item, i) => {
                  // Use icon from data only if you eventually provide one.
                  // Otherwise use the default icon based on index.
                  const Icon =
                    item.icon && typeof item.icon !== "string"
                      ? item.icon
                      : defaultChallengeIcons[
                          i % defaultChallengeIcons.length
                        ];

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
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}