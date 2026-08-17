"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Search,
    MessageSquareHeart,
    MousePointerClick,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const filters = ["All", "SEO", "PPC", "Social Media", "ORM"];

const styleRotation = [
    {
        icon: Search,
        badgeBg: "bg-sky-50",
        badgeText: "text-sky-600",
        resultsBg: "bg-sky-50/70",
        resultsBorder: "border-sky-100",
        statText: "text-sky-600",
        linkText: "text-sky-600",
        logoText: "text-sky-600",
    },
    {
        icon: MessageSquareHeart,
        badgeBg: "bg-rose-50",
        badgeText: "text-rose-500",
        resultsBg: "bg-rose-50/70",
        resultsBorder: "border-rose-100",
        statText: "text-rose-500",
        linkText: "text-rose-500",
        logoText: "text-rose-500",
    },
    {
        icon: MousePointerClick,
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-600",
        resultsBg: "bg-emerald-50/70",
        resultsBorder: "border-emerald-100",
        statText: "text-emerald-600",
        linkText: "text-emerald-600",
        logoText: "text-emerald-600",
    },
    {
        icon: ShieldCheck,
        badgeBg: "bg-violet-50",
        badgeText: "text-violet-600",
        resultsBg: "bg-violet-50/70",
        resultsBorder: "border-violet-100",
        statText: "text-violet-600",
        linkText: "text-violet-600",
        logoText: "text-violet-600",
    },
];

const dummyMeta = [
    { logoSub: "FASHION", logoIcon: Sparkles },
    { logoSub: "NUTRITION", logoIcon: Sparkles },
    { logoSub: "SOLUTIONS", logoIcon: Sparkles },
    { logoSub: "GLOBAL", logoIcon: Sparkles },
];

function CaseStudyCard({ study, businessImpact, styleIndex }) {
    const style = styleRotation[styleIndex % styleRotation.length];
    const CategoryIcon = style.icon;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-2 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-300">
            {/* Grid items stretched */}
            <div className="grid grid-cols-1 md:grid-cols-[140px_140px_1fr_300px] gap-5 md:gap-6 md:items-stretch">

                {/* Brand column */}
                <div className="flex flex-col items-start gap-3">
                    {study.companyLogo && (
                        <div className="relative w-[100px] h-[80px] shrink-0 overflow-hidden">
                            <Image
                                src={study.companyLogo}
                                alt="company logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    )}

                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                        {study.description}
                    </p>
                </div>

                {/* Image column (Original full height back) */}
                <div className="relative w-full h-48 sm:h-50 md:h-56 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {study.image && (
                        <Image
                            src={study.image}
                            alt={study.logoText || study.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    )}
                </div>

                {/* Content column */}
                <div className="min-w-0 flex flex-col justify-between">
                    <div>
                        <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText}`}
                        >
                            <CategoryIcon size={12} />
                            {study.category || "General"}
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
                            {study.description}
                        </p>

                        <Link
                            href={`/digital-marketing-portfolio/${study.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${style.linkText} hover:gap-2.5 transition-all`}
                        >
                            View Case Study
                            <ArrowRight size={14} />
                        </Link>
                    </div>


                </div>

                {/* Results column (Card ki full height pe stretched) */}
                {/* Results column */}
                <div
                    className={`rounded-xl border ${style.resultsBorder} ${style.resultsBg} p-3 sm:p-4 w-full h-full flex flex-col`}
                >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-3">
                        Results Achieved
                    </p>

                    {!businessImpact || businessImpact.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-[11px] text-slate-400">
                                No data available
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                            {businessImpact.slice(0, 4).map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-white/80 bg-white/80 px-2.5 py-2.5 min-h-[75px] flex flex-col justify-center"
                                >
                                    <p
                                        className={`text-base sm:text-lg font-extrabold leading-none ${style.statText}`}
                                    >
                                        {stat.value}
                                    </p>

                                    <p className="mt-1 text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CaseStudiesList({ data }) {
    const records = Array.isArray(data) ? data : [];

    const caseStudies = records.map((record, i) => {
        const meta = dummyMeta[i % dummyMeta.length];

        return {
            title: record.title,
            tagline: record.subtitle,
            category: record.category,
            image: record.heroBgImage,
            logoText: record.title || record.slug,
            companyLogo: record.companyLogo,
            description: record.companyDescription || record.subtitle,
            slug: record.slug,
            industry: record?.clientOverview?.client?.industry || "-",
            duration: record?.clientOverview?.client?.duration || "-",
            logoSub: meta.logoSub,
            logoIcon: meta.logoIcon,
            businessImpact: record?.businessImpact?.stats ?? [],
        };
    });

    const [activeFilter, setActiveFilter] = useState("All");

    const visibleStudies =
        activeFilter === "All"
            ? caseStudies
            : caseStudies.filter((study) => study.category === activeFilter);

    return (
        <section className="bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

                <div className="relative z-10 -mt-14 px-4 sm:px-6">
                    <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
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
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {visibleStudies.length === 0 ? (
                        <p className="text-center text-sm text-slate-400">
                            No case studies found.
                        </p>
                    ) : (
                        visibleStudies.map((study, i) => (
                            <CaseStudyCard
                                key={study.slug || i}
                                study={study}
                                businessImpact={study.businessImpact}
                                styleIndex={i}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}