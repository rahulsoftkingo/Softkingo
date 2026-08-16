"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ChevronDown,
    Search,
    MessageSquareHeart,
    MousePointerClick,
    ShieldCheck,
} from "lucide-react";

const filters = ["All", "SEO", "PPC", "Social Media", "ORM"];

// Rotating color palette — assigned by card position, not by matching category text
const styleRotation = [
    {
        icon: Search,
        badgeBg: "bg-sky-50",
        badgeText: "text-sky-600",
        resultsBg: "bg-sky-50/60",
        resultsBorder: "border-sky-100",
        statText: "text-sky-600",
        linkText: "text-sky-600",
        cardBorder: "border-sky-200",
        cardAccent: "before:bg-sky-500",
        cardBg: "bg-sky-50/30",
    },
    {
        icon: MessageSquareHeart,
        badgeBg: "bg-rose-50",
        badgeText: "text-rose-500",
        resultsBg: "bg-rose-50/60",
        resultsBorder: "border-rose-100",
        statText: "text-rose-500",
        linkText: "text-rose-500",
        cardBorder: "border-rose-200",
        cardAccent: "before:bg-rose-500",
        cardBg: "bg-rose-50/30",
    },
    {
        icon: MousePointerClick,
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-600",
        resultsBg: "bg-emerald-50/60",
        resultsBorder: "border-emerald-100",
        statText: "text-emerald-600",
        linkText: "text-emerald-600",
        cardBorder: "border-emerald-200",
        cardAccent: "before:bg-emerald-500",
        cardBg: "bg-emerald-50/30",
    },
    {
        icon: ShieldCheck,
        badgeBg: "bg-violet-50",
        badgeText: "text-violet-600",
        resultsBg: "bg-violet-50/60",
        resultsBorder: "border-violet-100",
        statText: "text-violet-600",
        linkText: "text-violet-600",
        cardBorder: "border-violet-200",
        cardAccent: "before:bg-violet-500",
        cardBg: "bg-violet-50/30",
    },
];

const dummyMeta = [
    { logoColor: "text-amber-500", logoSub: "FASHION" },
    { logoColor: "text-emerald-500", logoSub: "NUTRITION" },
    { logoColor: "text-indigo-500", logoSub: "SOLUTIONS" },
    { logoColor: "text-sky-600", logoSub: "GLOBAL" },
];

function CaseStudyCard({ study, businessImpact, styleIndex }) {
    const style = styleRotation[styleIndex % styleRotation.length];
    const CategoryIcon = style.icon;

    return (
        <div
            className={`relative overflow-hidden rounded-xl md:rounded-2xl border ${style.cardBorder} ${style.cardBg} p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-300 before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 ${style.cardAccent}`}
        >
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 md:gap-6 items-center">

                <div className="flex md:flex-col items-center gap-4 md:gap-3 md:w-40">
                    <div className="flex items-center gap-2 md:self-start">
                        <div
                            className={`w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center font-black text-sm ${study.logoColor}`}
                        >
                            {(study.logoText || "?").charAt(0)}
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
                </div>

                <div className="min-w-0">
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
                        {study.tagline}
                    </p>

                    <Link
                        href={`/portfolioseo/${study.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${style.linkText} hover:gap-2.5 transition-all`}
                    >
                        View Case Study
                        <ArrowRight size={14} />
                    </Link>
                </div>

                <div
                    className={`rounded-xl border ${style.resultsBorder} ${style.resultsBg} p-3 sm:p-4 w-full md:w-64`}
                >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                        Results Achieved
                    </p>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                        {!businessImpact || businessImpact.length === 0 ? (
                            <p className="col-span-2 text-[11px] text-slate-400">
                                No data available
                            </p>
                        ) : (
                            businessImpact.map((stat, i) => (
                                <div key={i}>
                                    <p
                                        className={`text-base sm:text-lg font-extrabold ${style.statText}`}
                                    >
                                        {stat.value}
                                    </p>

                                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CaseStudiesList({ data }) {
    console.log("Raw data from Prisma:", data);

    const records = Array.isArray(data) ? data : [];

    const caseStudies = records.map((record, i) => {
        const meta = dummyMeta[i % dummyMeta.length];

        return {
            title: record.title,
            tagline: record.subtitle,
            category: record.category,
            image: record.heroBgImage,
            logoText: record.slug,
            slug: record.slug,
            industry: record?.clientOverview?.client?.industry || "-",
            duration: record?.clientOverview?.client?.duration || "-",
            logoColor: meta.logoColor,
            logoSub: meta.logoSub,
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
                                        className={`min-w-[90px] sm:min-w-[110px] px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                                            activeFilter === f
                                                ? "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 border-transparent text-white"
                                                : "bg-white border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600"
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            <button className="flex items-center justify-between gap-3 min-w-[220px] rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-sky-400 hover:shadow-md">
                                <span>All Industries</span>
                                <ChevronDown size={18} className="text-slate-500" />
                            </button>
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