"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardList,
  AlertTriangle,
  Lightbulb,
  LayoutGrid,
  Wrench,
  BarChart3,
  Award,
  ListChecks,
  Check,
  ChevronDown,
  TrendingUp,
  ArrowDown,
  MousePointer,
  Users,
  DollarSign,
  UserCheck, // Customer/Lead icon ke liye
} from "lucide-react";

// ---- Static data ---------------------------------------------------------

const challenges = [
  "High cost per lead (CPL)",
  "Low quality leads",
  "High competition in car rental industry",
  "Poor ad relevance and low CTR",
  "Limited conversions and low ROI",
];

const solutionPoints = [
  "In-depth keyword research",
  "Optimized ad copy & extensions",
  "High-converting landing pages",
  "Audience targeting & remarketing",
  "Conversion tracking & analytics setup",
  "A/B testing & bid optimization",
];

const adPlatforms = ["Google Ads", "Facebook Ads"];

const tools = [
  "Google Ads",
  "SEMrush",
  "Google Analytics",
  "Hotjar",
  "Google Tag Manager",
  "Optmyzr",
];

const chartData = [
  { month: "Apr '24", clicks: 1200, conversions: 800, cost: 500 },
  { month: "", clicks: 2500, conversions: 1600, cost: 800 },
  { month: "May '24", clicks: 4200, conversions: 2800, cost: 1200 },
  { month: "", clicks: 5800, conversions: 3600, cost: 1500 },
  { month: "Jun '24", clicks: 7800, conversions: 5200, cost: 1800 },
  { month: "", clicks: 8600, conversions: 6100, cost: 2000 },
];

const performanceStats = [
  { label: "Clicks", value: "28.6K", change: "68%", up: true },
  { label: "Impressions", value: "512K", change: "55%", up: true },
  { label: "CTR", value: "5.58%", change: "25%", up: true },
  { label: "Conversions", value: "1,248", change: "300%", up: true },
  { label: "CPL", value: "$12.45", change: "52%", up: false },
  { label: "Cost", value: "$15.5K", change: "18%", up: false },
];

const achievements = [
  { icon: TrendingUp, value: "4X", label: "Increase in Leads" },
  { icon: ArrowDown, value: "52%", label: "Decrease in CPL" },
  { icon: MousePointer, value: "68%", label: "Increase in Clicks" },
  { icon: Users, value: "1,248", label: "Total Conversions" },
  { icon: DollarSign, value: "620%", label: "ROAS Achieved" },
  { icon: BarChart3, value: "180%", label: "Increase in Revenue" },
];

const campaigns = [
  { name: "Brand Campaign", clicks: "6,254", conversions: "354", cpl: "$8.26", ctr: "6.91%", roas: "712%" },
  { name: "Search - Car Rental", clicks: "12,842", conversions: "652", cpl: "$11.87", ctr: "5.32%", roas: "645%" },
  { name: "Remarketing Campaign", clicks: "5,618", conversions: "184", cpl: "$9.21", ctr: "4.85%", roas: "589%" },
  { name: "Display Campaign", clicks: "3,876", conversions: "58", cpl: "$15.46", ctr: "1.25%", roas: "412%" },
];

// ---- Small building blocks ------------------------------------------------

function SectionCard({ icon: Icon, title, children, color = "text-sky-500", bgColor = "bg-sky-50" }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2.5 mb-3">
        {Icon && (
          <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${bgColor}`}>
            <Icon size={18} className={color} />
          </span>
        )}
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-slate-900 border border-slate-700 shadow-xl px-3 py-2 text-white text-xs space-y-1">
        {label && <p className="font-bold text-[11px] text-slate-300">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ---- Main component ---------------------------------------------------

export default function PPCCaseStudyDetails({ projectOverviewJson, challengeJson, solutionJson, performanceJson, achievementsJson, campaignsJson, toolsJson, adPlatformsJson }) {

  console.log("Tools of the performanceJson", adPlatformsJson)


  const performanceData = performanceJson
    ? {
      ...performanceJson,
      parsedChartData: performanceJson.chartData
        .split("\n")
        .map((row) => {
          const [month, clicks, conversions, cost] = row.split(",");

          return {
            month,
            clicks: Number(clicks),
            conversions: Number(conversions),
            cost: Number(cost),
          };
        }),
    }
    : null;

  return (
    <section className="my-8 md:pt-[123px] bg-white overflow-hidden">
      <div className="container mx-auto sm:px-6 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4 space-y-5">
            <SectionCard icon={ClipboardList} title="Project Overview" color="text-sky-500">
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {projectOverviewJson.description}
              </p>
            </SectionCard>

            <SectionCard
              icon={AlertTriangle}
              title={challengeJson?.title || "The Challenge"}
              color="text-red-500"
              bgColor="bg-red-50"
            >
              <ul className="space-y-2">
                {challengeJson?.items?.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-600"
                  >
                    <Check
                      size={14}
                      className="text-sky-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard
              icon={Lightbulb}
              title={solutionJson?.title || "Our Solution"}
              color="text-green-500"
              bgColor="bg-green-50"
            >
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-3">
                {solutionJson?.description}
              </p>

              <ul className="space-y-2">
                {solutionJson?.items?.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-600"
                  >
                    <Check
                      size={14}
                      className="text-sky-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard icon={LayoutGrid} title="Ad Platforms Managed">
              <div className="flex flex-wrap gap-4">
                {adPlatformsJson?.items?.map((platform, i) => (
                  <div
                    key={`${platform.name}-${i}`}
                    className="flex items-center gap-2"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-50">
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-4 h-4 object-contain"
                      />
                    </span>

                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard icon={Wrench} title="Tools & Technologies">
              <div className="grid grid-cols-2 gap-3">
                {toolsJson?.items?.map((tool, i) => (
                  <div key={`${tool.name}-${i}`} className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-sky-50">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-4 h-4 object-contain"
                      />
                    </span>

                    <span className="text-xs text-slate-600 font-medium">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>


          </div>

          {/* RIGHT MAIN COLUMN */}
          <div className="lg:col-span-8 space-y-5">
            {/* Performance Overview */}
            {performanceData && (
              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50">
                      <BarChart3 size={18} className="text-sky-500" />
                    </span>

                    <h3 className="text-base font-semibold text-slate-800">
                      {performanceData.title}
                    </h3>
                  </div>

                  {/* <button className="flex items-center gap-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
        {performanceData.dateRangeLabel}
        <ChevronDown size={14} />
      </button> */}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 mb-4 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    Clicks
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                    Conversions
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    Cost
                  </span>
                </div>

                {/* Chart */}
                <div className="w-full h-[260px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData.parsedChartData}
                      margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="#f1f5f9"
                      />

                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#94a3b8",
                        }}
                      />

                      <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#94a3b8",
                        }}
                        tickFormatter={(v) =>
                          v >= 1000 ? `${v / 1000}K` : v
                        }
                      />

                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#38bdf8",
                        }}
                        tickFormatter={(v) =>
                          `$${v >= 1000 ? `${v / 1000}K` : v}`
                        }
                      />

                      <Tooltip content={<CustomTooltip />} />

                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="clicks"
                        name="Clicks"
                        stroke="#0ea5e9"
                        strokeWidth={2.5}
                        dot={{
                          r: 3,
                          fill: "#0ea5e9",
                          strokeWidth: 0,
                        }}
                      />

                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="conversions"
                        name="Conversions"
                        stroke="#16a34a"
                        strokeWidth={2.5}
                        dot={{
                          r: 3,
                          fill: "#16a34a",
                          strokeWidth: 0,
                        }}
                      />

                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cost"
                        name="Cost"
                        stroke="#f97316"
                        strokeWidth={2.5}
                        dot={{
                          r: 3,
                          fill: "#f97316",
                          strokeWidth: 0,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Dynamic Stats (Updated as per Image 2 UI) */}
                <div className="mt-5 border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
                    {performanceData.metrics?.map((metric, index) => {
                      const isUp = metric.direction === "up";

                      return (
                        <div
                          key={`${metric.label}-${index}`}
                          className={`flex flex-col items-center justify-center text-center ${index !== 0 ? "pt-3 sm:pt-0 sm:pl-2" : ""
                            }`}
                        >
                          <p className="text-xs text-slate-800 font-semibold mb-1">
                            {metric.label}
                          </p>

                          <p className="text-xl font-bold text-slate-900 tracking-tight">
                            {metric.value}
                          </p>

                          <div className="mt-2 inline-flex items-center gap-1">
                            <span
                              className={`text-[11px] font-bold flex items-center gap-0.5 ${isUp
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-rose-600 bg-rose-50"
                                }`}
                            >
                              <span className="text-[9px]">{isUp ? "▲" : "▼"}</span>
                              {metric.change}
                              {metric.change && !String(metric.change).includes("%") ? "%" : ""}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}


            {/* Key Achievements */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 text-sky-600">
                  <Award size={18} />
                </span>
                <h3 className="text-base font-bold text-slate-800">Key Achievements</h3>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {achievementsJson?.items?.map((a, i) => {
                  {/* Icon and Color Mapping according to image */ }
                  const config = [
                    { icon: Users, color: "text-emerald-500 bg-emerald-50" },       // Increase in Leads
                    { icon: ArrowDown, color: "text-rose-500 bg-rose-50" },          // Decrease in CPL
                    { icon: MousePointer, color: "text-blue-500 bg-blue-50" },       // Increase in Clicks
                    { icon: Users, color: "text-amber-500 bg-amber-50" },           // Total Conversions
                    { icon: DollarSign, color: "text-purple-600 bg-purple-50" },     // ROAS Achieved
                    { icon: BarChart3, color: "text-blue-600 bg-blue-50" },          // Increase in Revenue
                  ][i % 6];

                  const IconComponent = config.icon;

                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-100 bg-white flex flex-col items-center text-center p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:shadow-md"
                    >
                      {/* Circular Icon Wrapper */}
                      <span className={`flex items-center justify-center w-9 h-9 rounded-full mb-3 ${config.color}`}>
                        <IconComponent size={18} />
                      </span>

                      {/* Metric Value */}
                      <p className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                        {a.value}
                      </p>

                      {/* Metric Label */}
                      <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                        {a.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Campaign Performance */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 text-sky-600">
                    <ListChecks size={18} />
                  </span>

                  <h3 className="text-base font-bold text-slate-800">
                    {campaignsJson?.title || "Top Campaign Performance"}
                  </h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-left text-slate-800 border-b border-slate-100">
                      <th className="font-medium pb-2 pr-4">Campaign</th>
                      <th className="font-medium pb-2 px-4">Clicks</th>
                      <th className="font-medium pb-2 px-4">Conversions</th>
                      <th className="font-medium pb-2 px-4">CPL</th>
                      <th className="font-medium pb-2 px-4">CTR</th>
                      <th className="font-medium pb-2 pl-4">ROAS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {campaignsJson?.items?.map((campaign, index) => (
                      <tr
                        key={campaign.link || index}
                        className="border-b border-slate-50 last:border-0"
                      >
                        <td className="py-3 pr-4">
                          <a
                            href={campaign.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-sky-600 hover:text-sky-700"
                          >
                            {campaign.name}
                          </a>
                        </td>

                        <td className="py-3 px-4 text-slate-700">
                          {campaign.clicks}
                        </td>

                        <td className="py-3 px-4 text-slate-700">
                          {campaign.conversions}
                        </td>

                        <td className="py-3 px-4 text-slate-700">
                          {campaign.cpl}
                        </td>

                        <td className="py-3 px-4 text-slate-700">
                          {campaign.ctr}
                        </td>

                        <td className="py-3 pl-4">
                          <span className="inline-block text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                            {campaign.roas}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {(!campaignsJson?.items || campaignsJson.items.length === 0) && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-slate-400"
                        >
                          No campaign data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}