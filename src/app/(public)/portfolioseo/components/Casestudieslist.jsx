"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    ArrowRight,
    ChevronDown,
    Search,
    MessageSquareHeart,
    MousePointerClick,
    ShieldCheck,
    Star,
} from "lucide-react";

// Dummy data — swap with real props/CMS data later
const filters = ["All", "SEO", "PPC", "Social Media", "ORM"];

const categoryStyles = {
    SEO: {
        icon: Search,
        badgeBg: "bg-sky-50",
        badgeText: "text-sky-600",
        resultsBg: "bg-sky-50/60",
        resultsBorder: "border-sky-100",
        statText: "text-sky-600",
        linkText: "text-sky-600",
    },
    "Social Media": {
        icon: MessageSquareHeart,
        badgeBg: "bg-rose-50",
        badgeText: "text-rose-500",
        resultsBg: "bg-rose-50/60",
        resultsBorder: "border-rose-100",
        statText: "text-rose-500",
        linkText: "text-rose-500",
    },
    PPC: {
        icon: MousePointerClick,
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-600",
        resultsBg: "bg-emerald-50/60",
        resultsBorder: "border-emerald-100",
        statText: "text-emerald-600",
        linkText: "text-emerald-600",
    },
    ORM: {
        icon: ShieldCheck,
        badgeBg: "bg-violet-50",
        badgeText: "text-violet-600",
        resultsBg: "bg-violet-50/60",
        resultsBorder: "border-violet-100",
        statText: "text-violet-600",
        linkText: "text-violet-600",
    },
};

const caseStudies = [
    {
        logoText: "UrbanStyle",
        logoSub: "FASHION",
        logoColor: "text-amber-500",
        tagline: "Leading online fashion store specializing in trendy apparel and accessories.",
        image: "/images/case-studies/urbanstyle.jpg",
        category: "SEO",
        title: "Increased Organic Traffic by 215% in 6 Months",
        industry: "E-commerce",
        duration: "6 Months",
        results: [
            { value: "215%", label: "Increase in Organic Traffic" },
            { value: "#1", label: "Ranking for 30+ Keywords" },
            { value: "68%", label: "Decrease in Bounce Rate" },
            { value: "150%", label: "Increase in Conversions" },
        ],
    },
    {
        logoText: "FitLife",
        logoSub: "NUTRITION",
        logoColor: "text-emerald-500",
        tagline: "Health & nutrition brand offering supplements and wellness products.",
        image: "/images/case-studies/fitlife.jpg",
        category: "Social Media",
        title: "Boosted Engagement by 300% on Social Platforms",
        industry: "Health & Wellness",
        duration: "4 Months",
        results: [
            { value: "300%", label: "Increase in Engagement" },
            { value: "9.5K+", label: "New Followers Gained" },
            { value: "250%", label: "Increase in Reach" },
            { value: "3X", label: "Increase in Website Traffic" },
        ],
    },
    {
        logoText: "HomeCraft",
        logoSub: "SOLUTIONS",
        logoColor: "text-indigo-500",
        tagline: "Home improvement brand offering premium quality furniture and decor.",
        image: "/images/case-studies/homecraft.jpg",
        category: "PPC",
        title: "Generated 4X More Leads with Lower CPC",
        industry: "Home Improvement",
        duration: "5 Months",
        results: [
            { value: "4X", label: "More Leads Generated" },
            { value: "40%", label: "Decrease in CPC" },
            { value: "220%", label: "Increase in Conversions" },
            { value: "180%", label: "Increase in ROI" },
        ],
    },
    {
        logoText: "TechSolutions",
        logoSub: "GLOBAL",
        logoColor: "text-sky-600",
        tagline: "IT services company providing enterprise solutions worldwide.",
        image: "/images/case-studies/techsolutions.jpg",
        category: "ORM",
        title: "Repaired Brand Reputation and Built Trust Online",
        industry: "IT Services",
        duration: "3 Months",
        results: [
            { value: "4.7/5", label: "Reputation Score" },
            { value: "85%", label: "Increase in Positive Mentions" },
            { value: "90%", label: "Negative Content Suppressed" },
            { value: "2X", label: "Increase in Inquiries" },
        ],
    },
];

function CaseStudyCard({ study }) {
    const style = categoryStyles[study.category];
    const CategoryIcon = style.icon;

    return (
        <div className="rounded-xl md:rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 md:gap-6 items-center">
                {/* Logo + image */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 md:w-40">
                    <div className="flex items-center gap-2 md:self-start">
                        <div
                            className={`w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-sm ${study.logoColor}`}
                        >
                            {study.logoText.charAt(0)}
                        </div>
                        <div className="leading-tight">
                            <p className="text-xs font-bold text-slate-800">
                                {study.logoText}
                            </p>
                            <p className="text-[9px] tracking-wider text-slate-400 font-semibold">
                                {study.logoSub}
                            </p>
                        </div>
                    </div>

                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-full md:h-28 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <Image
                            src={study.image}
                            alt={study.logoText}
                            fill
                            className="object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </div>
                </div>

                {/* Middle content */}
                <div className="min-w-0">
                    <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText}`}
                    >
                        <CategoryIcon size={12} />
                        {study.category}
                    </span>

                    <h3 className="mt-2.5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {study.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-3 text-[11px] sm:text-xs text-slate-400 font-medium">
                        <span>Industry: {study.industry}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>Duration: {study.duration}</span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed hidden sm:block">
                        {study.tagline}
                    </p>

                    <button
                        className={`mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${style.linkText} hover:gap-2.5 transition-all`}
                    >
                        View Case Study <ArrowRight size={14} />
                    </button>
                </div>

                {/* Results grid */}
                <div
                    className={`rounded-xl border ${style.resultsBorder} ${style.resultsBg} p-3 sm:p-4 w-full md:w-64`}
                >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                        Results Achieved
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                        {study.results.map((r, i) => (
                            <div key={i}>
                                <p className={`text-base sm:text-lg font-extrabold ${style.statText}`}>
                                    {r.value}
                                </p>
                                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">
                                    {r.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CaseStudiesList() {
    const [activeFilter, setActiveFilter] = useState("All");

    const visibleStudies =
        activeFilter === "All"
            ? caseStudies
            : caseStudies.filter((s) => s.category === activeFilter);

    return (
        <section className="bg-slate-50/60 py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                {/* Filter bar */}
                <div className="relative z-10 -mt-14 px-4 sm:px-6">
                    <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setActiveFilter(f)}
                                        className={`min-w-[90px] sm:min-w-[110px] px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${activeFilter === f
                                                ? "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 border-transparent text-white"
                                                : "bg-white border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600"
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            {/* Industry Dropdown */}
                            <button className="flex items-center justify-between gap-3 min-w-[220px] rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-sky-400 hover:shadow-md">
                                <span>All Industries</span>
                                <ChevronDown
                                    size={18}
                                    className="text-slate-500"
                                />
                            </button>

                        </div>
                    </div>
                </div>

                {/* Case study cards */}
                <div className="mt-8 space-y-4">
                    {visibleStudies.map((study, i) => (
                        <CaseStudyCard key={i} study={study} />
                    ))}
                </div>
            </div>
        </section>
    );
}