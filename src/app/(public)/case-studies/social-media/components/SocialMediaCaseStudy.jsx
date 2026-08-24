"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardList,
  AlertTriangle,
  UserCheck,
  LayoutGrid,
  Wrench,
  BarChart3,
  Award,
  Check,
  ChevronDown,
  Heart,
  Eye,
  UserPlus,
  MousePointer,
  Filter,
  DollarSign,
  Quote,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  TrendingUp,
} from "lucide-react";

// ---- Static Data ---------------------------------------------------------

const challenges = [
  "Low engagement and community interaction",
  "Limited brand awareness",
  "Inconsistent posting and content strategy",
  "Low website traffic from social platforms",
  "Minimal leads and conversions",
];

const solutionPoints = [
  "In-depth audience research",
  "Platform-specific content strategy",
  "High-quality visual content & videos",
  "Engaging captions & hashtag strategy",
  "Influencer collaborations",
  "Paid social campaigns for lead generation",
  "Community management & engagement",
];

const tools = [
  { name: "Meta Business Suite", icon: "♾️" },
  { name: "Hootsuite", icon: "🦉" },
  { name: "Canva", icon: "🎨" },
  { name: "Later", icon: "📅" },
  { name: "Google Analytics", icon: "📊" },
  { name: "SEMrush", icon: "🔍" },
];

const chartData = [
  { month: "Jan '24", engagement: 5000, reach: 2000, followers: 800 },
  { month: "", engagement: 6500, reach: 3500, followers: 1800 },
  { month: "Feb '24", engagement: 8500, reach: 5000, followers: 2800 },
  { month: "", engagement: 10500, reach: 6500, followers: 3800 },
  { month: "Mar '24", engagement: 11000, reach: 7200, followers: 4500 },
  { month: "", engagement: 13000, reach: 8500, followers: 5000 },
  { month: "Apr '24", engagement: 15500, reach: 10000, followers: 6000 },
  { month: "", engagement: 15800, reach: 11200, followers: 6300 },
  { month: "May '24", engagement: 18200, reach: 13500, followers: 7200 },
  { month: "", engagement: 20500, reach: 15800, followers: 8800 },
  { month: "Jun '24", engagement: 22800, reach: 17200, followers: 10200 },
  { month: "", engagement: 25000, reach: 19500, followers: 12500 },
];

const performanceMetrics = [
  { label: "Engagement", value: "18.2K", change: "300%" },
  { label: "Reach", value: "72.4K", change: "250%" },
  { label: "Followers", value: "15.6K", change: "220%" },
  { label: "Website Visits", value: "3.8K", change: "3X" },
  { label: "Leads Generated", value: "620", change: "180%" },
  { label: "Revenue", value: "$22.5K", change: "280%" },
];

const keyAchievements = [
  { icon: Heart, value: "300%", label: "Increase in Engagement" },
  { icon: Eye, value: "250%", label: "Increase in Reach" },
  { icon: UserPlus, value: "9.5K+", label: "New Followers Gained" },
  { icon: MousePointer, value: "3X", label: "Increase in Website Traffic" },
  { icon: Filter, value: "180%", label: "Increase in Leads" },
  { icon: DollarSign, value: "280%", label: "Increase in Conversions" },
];

const topPosts = [
  {
    type: "POST",
    label: "Engagement",
    value: "2.3K",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&q=80",
  },
  {
    type: "REEL",
    label: "Engagement",
    value: "3.8K",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
  },
  {
    type: "STORY",
    label: "Engagement",
    value: "1.9K",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
  },
];

// ---- UI Helper Components ------------------------------------------------


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

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white border border-slate-100 shadow-lg px-3 py-2 text-xs space-y-1">
        <p className="font-bold text-[11px] text-slate-700 mb-1">May '24</p>
        <div className="flex items-center justify-between gap-4 text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            Engagement:
          </span>
          <span className="font-bold text-slate-900">18.2K</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            Reach:
          </span>
          <span className="font-bold text-slate-900">72.4K</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Followers:
          </span>
          <span className="font-bold text-slate-900">15.6K</span>
        </div>
      </div>
    );
  }
  return null;
}

// ---- Main Component -----------------------------------------------------

export default function SocialMediaCaseStudy({ projectOverviewJson, challengeJson, solutionJson, performanceJson, achievementsJson, platformsJson, toolsJson, adPlatformsJson }) {

  const platforms = platformsJson?.items ?? [];
  const tools = toolsJson?.items ?? [];

  const chartData = (performanceJson?.chartData || "")
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      const [month, engagement, reach, followers] = row.split(",");

      return {
        month,
        engagement: Number(engagement),
        reach: Number(reach),
        followers: Number(followers),
      };
    });

  return (
    <section className="py-8 md:py-20 bg-[#F8F9FD] min-h-screen">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4 space-y-5">

            {/* Project Overview */}
            <SectionCard icon={ClipboardList} title="Project Overview" color="text-sky-500">
              <p className="text-xs text-slate-500 leading-relaxed">
                {projectOverviewJson?.description || "No project overview available."}
              </p>
            </SectionCard>

            {/* The Challenge */}
            <SectionCard
              icon={AlertTriangle}
              title={challengeJson?.title || "The Challenge"}
              color="text-red-500"
              bgColor="bg-red-50"
            >
              <ul className="space-y-2">
                {challengeJson?.items?.map((challenge, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-600"
                  >
                    <Check
                      size={14}
                      className="text-sky-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            {/* Our Solution */}
            <SectionCard
              icon={UserCheck}
              title={solutionJson?.title || "Our Solution"}
              color="text-green-500"
              bgColor="bg-green-50"
            >
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {solutionJson?.description || "No solution description available."}
              </p>

              <ul className="space-y-2">
                {solutionJson?.items?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-600"
                  >
                    <Check
                      size={14}
                      className="text-sky-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            {/* Platforms Managed */}
            <SectionCard icon={LayoutGrid} title="Platforms Managed">
              <div className="flex items-center gap-3">
                {platforms.map((platform, index) => (
                  <span
                    key={`${platform.name}-${index}`}
                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden"
                    title={platform.name}
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="w-full h-full object-cover"
                    />
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* Tools & Technologies */}
            <SectionCard icon={Wrench} title="Tools & Technologies">
              <div className="grid grid-cols-2 gap-3 min-h-[120px]">
                {tools.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={t.icon}
                        alt={t.name}
                        className="w-5 h-5 object-contain"
                      />
                    </span>

                    <span className="text-xs text-slate-600 font-medium">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* RIGHT MAIN COLUMN */}
          <div className="lg:col-span-8 space-y-5">

            {/* Results Overview Graph */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-sky-50 text-sky-600">
                    <BarChart3 size={14} />
                  </span>

                  <h3 className="text-base font-semibold text-slate-800">
                    {performanceJson?.title || "Results Overview"}
                  </h3>
                </div>
                {/* 
                <button className="flex items-center gap-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                  📅 {performanceJson?.dateRangeLabel || "Last 6 Months"}
                  <ChevronDown size={14} />
                </button> */}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-5 mb-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Engagement
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  Reach
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Followers
                </span>
              </div>

              {/* Line/Area Chart */}
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="skyGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0ea5e9"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#f1f5f9"
                    />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      tickFormatter={(v) =>
                        v >= 1000 ? `${v / 1000}K` : v
                      }
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      fill="url(#skyGrad)"
                      dot={{ r: 3, fill: "#0ea5e9" }}
                    />

                    <Area
                      type="monotone"
                      dataKey="reach"
                      stroke="#ec4899"
                      strokeWidth={2}
                      fill="none"
                      dot={{ r: 3, fill: "#ec4899" }}
                    />

                    <Area
                      type="monotone"
                      dataKey="followers"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="none"
                      dot={{ r: 3, fill: "#10b981" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stat Counters Card */}
              <div className="mt-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/40">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/50">
                  {performanceJson?.metrics?.map((metric, index) => {
                    const isUp = metric.direction !== "down";

                    return (
                      <div
                        key={`${metric.label}-${index}`}
                        className={`flex flex-col items-center justify-center text-center ${index !== 0 ? "pt-3 sm:pt-0 sm:pl-2" : ""
                          }`}
                      >
                        {/* 1. Label Top */}
                        <p className="text-xs font-semibold text-slate-800 tracking-tight mb-1">
                          {metric.label}
                        </p>

                        {/* 2. Value Middle */}
                        <p className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                          {metric.value}
                        </p>

                        {/* 3. Percentage / Direction Bottom */}
                        <div className="inline-flex items-center gap-1">
                          {metric.change && (
                            <span
                              className={`text-[11px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded ${isUp
                                  ? "text-emerald-600 bg-emerald-50"
                                  : "text-rose-600 bg-rose-50"
                                }`}
                            >
                              <span className="text-[8px]">{isUp ? "▲" : "▼"}</span>
                              {metric.change}
                              {!String(metric.change).includes("%") ? "%" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-sky-50 text-sky-600">
                  <Award size={14} />
                </span>
                <h3 className="text-sm font-bold text-slate-800">
                  Key Achievements
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {achievementsJson?.items?.map((item, i) => {
                  const IconComp = keyAchievements?.[i]?.icon || TrendingUp;

                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-100 flex flex-col items-center text-center gap-1.5 py-4 px-2"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 text-sky-600">
                        <IconComp size={16} />
                      </span>

                      <p className="text-base font-extrabold text-slate-900 mt-1">
                        {item?.value || "-"}
                      </p>

                      <p className="text-[10px] text-slate-400 font-medium leading-tight">
                        {item?.label || "-"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Split Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Top Performing Content */}
              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-4">
                  Top Performing Content
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {topPosts.map((post, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                        <img
                          src={post.image}
                          alt={post.type}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {post.type}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {post.label}
                      </p>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        {post.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Client Feedback & Next Steps) */}
              <div className="space-y-5">

                {/* What Our Client Says */}
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 relative">
                  <div className="flex items-center justify-between mb-2">
                    <Quote className="text-sky-600 fill-sky-600" size={20} />
                    <span className="text-xs font-bold text-slate-800">
                      What Our Client Says
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Softkingo completely transformed our social media presence.
                    Their creative content, timely communication and strategic
                    approach helped us build a strong community and achieve
                    amazing results.
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                        alt="Rahul Mehta"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Rahul Mehta
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Marketing Manager, FitLife Nutrition
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                      <span>🍃</span> FitLife
                    </div>
                  </div>
                </div>

                {/* Next Steps CTA */}
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-sky-50 text-sky-600">
                      <ClipboardList size={14} />
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">
                      Next Steps
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Ready to achieve similar results for your brand?
                    Let's create a winning social media strategy for your business.
                  </p>
                  <button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    Get Free Consultation
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}