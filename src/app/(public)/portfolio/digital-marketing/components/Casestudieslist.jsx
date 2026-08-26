// "use client";

// import React, { useState, useMemo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//     ArrowRight,
//     Search,
//     MessageSquareHeart,
//     MousePointerClick,
//     ShieldCheck,
//     Sparkles,
// } from "lucide-react";

// const styleRotation = [
//     {
//         icon: Search,
//         badgeBg: "bg-sky-50",
//         badgeText: "text-sky-600",
//         resultsBg: "bg-sky-50/70",
//         resultsBorder: "border-sky-100",
//         statText: "text-sky-600",
//         linkText: "text-sky-600",
//         logoText: "text-sky-600",
//     },
//     {
//         icon: MessageSquareHeart,
//         badgeBg: "bg-rose-50",
//         badgeText: "text-rose-500",
//         resultsBg: "bg-rose-50/70",
//         resultsBorder: "border-rose-100",
//         statText: "text-rose-500",
//         linkText: "text-rose-500",
//         logoText: "text-rose-500",
//     },
//     {
//         icon: MousePointerClick,
//         badgeBg: "bg-emerald-50",
//         badgeText: "text-emerald-600",
//         resultsBg: "bg-emerald-50/70",
//         resultsBorder: "border-emerald-100",
//         statText: "text-emerald-600",
//         linkText: "text-emerald-600",
//         logoText: "text-emerald-600",
//     },
//     {
//         icon: ShieldCheck,
//         badgeBg: "bg-violet-50",
//         badgeText: "text-violet-600",
//         resultsBg: "bg-violet-50/70",
//         resultsBorder: "border-violet-100",
//         statText: "text-violet-600",
//         linkText: "text-violet-600",
//         logoText: "text-violet-600",
//     },
// ];

// const dummyMeta = [
//     { logoSub: "FASHION", logoIcon: Sparkles },
//     { logoSub: "NUTRITION", logoIcon: Sparkles },
//     { logoSub: "SOLUTIONS", logoIcon: Sparkles },
//     { logoSub: "GLOBAL", logoIcon: Sparkles },
// ];

// function CaseStudyCard({ study, businessImpact, styleIndex }) {
//     const style = styleRotation[styleIndex % styleRotation.length];
//     const CategoryIcon = style.icon;

//     // Helper to display category string in badge
//     const displayCategory = Array.isArray(study.category)
//         ? study.category.join(", ")
//         : study.category || "General";

//     return (
//         <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-3 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-300">
//             {/* Grid layout with 150px width for Image column on desktop */}
//             <div className="grid grid-cols-1 md:grid-cols-[120px_200px_1fr_320px] gap-5 md:gap-6 md:items-stretch">

//                 {/* Brand column */}
//                 <div className="flex flex-col items-start gap-3">
//                     {study.companyLogo && (
//                         <div className="relative self-start w-[100px] h-[80px] shrink-0 overflow-hidden">
//                             <Image
//                                 src={study.companyLogo}
//                                 alt="company logo"
//                                 fill
//                                 className="object-contain"
//                             />
//                         </div>
//                     )}

//                     <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
//                         {study.description}
//                     </p>
//                 </div>

//                 {/* Image column - 150px Width */}
//                 <div className="relative w-full h-48 sm:h-50 md:h-64 rounded-xl overflow-hidden bg-slate-100 shrink-0">
//                     {study.image && (
//                         <Image
//                             src={study.image}
//                             alt={study.logoText || study.title}
//                             fill
//                             className="object-cover"
//                             onError={(e) => {
//                                 e.currentTarget.style.display = "none";
//                             }}
//                         />
//                     )}
//                 </div>

//                 {/* Content column */}
//                 <div className="min-w-0 flex flex-col justify-between pt-1 md:mt-1">
//                     <div>
//                         <div className="flex flex-wrap gap-2">
//                             {displayCategory.split(",").map((category, index) => {
//                                 const categoryName = category.trim();

//                                 return (
//                                     <span
//                                         key={index}
//                                         className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText}`}
//                                     >
//                                         {categoryName}
//                                     </span>
//                                 );
//                             })}
//                         </div>

//                         <h3 className="mt-2.5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
//                             {study.title}
//                         </h3>

//                         <div className="mt-1.5 flex items-center gap-3 text-[11px] sm:text-xs text-slate-400 font-medium">
//                             <span>Industry: {study.industry}</span>
//                             <span className="w-1 h-1 rounded-full bg-slate-300" />
//                             <span>Duration: {study.duration}</span>
//                         </div>

//                         <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed hidden sm:block">
//                             {study.tagline || study.description || "No description available."}
//                         </p>

//                         <Link
//                             href={`/case-studies/seo/${study.slug}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${style.linkText} hover:gap-2.5 transition-all`}
//                         >
//                             View Case Study
//                             <ArrowRight size={14} />
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Results column */}
//                 <div
//                     className={`rounded-xl border ${style.resultsBorder} ${style.resultsBg} p-3 sm:p-4 w-full h-full flex flex-col justify-center`}
//                 >
//                     <p className={`text-[12px] font-extrabold uppercase tracking-wide mb-3 ${style.statText}`}>
//                         Results Achieved
//                     </p>

//                     {!businessImpact || businessImpact.length === 0 ? (
//                         <div className="flex-1 flex items-center justify-center">
//                             <p className={`text-[11px] ${style.statText}`}>
//                                 No data available
//                             </p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-2 gap-x-2 gap-y-2">
//                             {businessImpact.slice(0, 4).map((stat, i) => (
//                                 <div
//                                     key={i}
//                                     className="rounded-lg border border-slate-100 bg-white/80 px-2 py-2 min-h-[70px] flex flex-col items-center justify-center text-center"
//                                 >
//                                     <p
//                                         className={`text-medium sm:text-base font-extrabold leading-none ${style.statText}`}
//                                     >
//                                         {stat.value}
//                                     </p>

//                                     <p className="mt-2 text-[10px] sm:text-[10px] text-slate-900 font-medium font-extrabold leading-tight">
//                                         {stat.label}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function CaseStudiesList({ data }) {
//     const records = Array.isArray(data) ? data : [];

//     const caseStudies = records.map((record, i) => {
//         const meta = dummyMeta[i % dummyMeta.length];

//         return {
//             title: record.title,
//             tagline: record.subtitle,
//             category: record.category,
//             image: record.heroBgImage,
//             logoText: record.title || record.slug,
//             companyLogo: record.companyLogo,
//             description: record.companyDescription || record.subtitle,
//             slug: record.slug,
//             industry: record?.clientOverview?.client?.industry || "-",
//             duration: record?.clientOverview?.client?.duration || "-",
//             logoSub: meta.logoSub,
//             logoIcon: meta.logoIcon,
//             businessImpact: record?.businessImpact?.stats ?? [],
//         };
//     });

//     const [activeFilter, setActiveFilter] = useState("All");

//     const [activeIndustry, setActiveIndustry] = useState("All Industries");

//     const industries = ["All Industries", "SEO", "PPC", "Digital Media"];


//     // Extract unique categories dynamically from the data
//     const filters = useMemo(() => {
//         const extractedCategories = new Set();

//         caseStudies.forEach((study) => {
//             if (!study.category) return;

//             if (Array.isArray(study.category)) {
//                 study.category.forEach((cat) => extractedCategories.add(cat.trim()));
//             } else if (typeof study.category === "string") {
//                 // Split string if categories are comma-separated
//                 study.category.split(",").forEach((cat) => extractedCategories.add(cat.trim()));
//             }
//         });

//         return ["All", ...Array.from(extractedCategories)];
//     }, [caseStudies]);

//     // Filter logic supporting single strings, arrays, or comma-separated category values
//     // const visibleStudies = useMemo(() => {
//     //     if (activeFilter === "All") return caseStudies;

//     //     return caseStudies.filter((study) => {
//     //         if (!study.category) return false;

//     //         if (Array.isArray(study.category)) {
//     //             return study.category.includes(activeFilter);
//     //         }

//     //         if (typeof study.category === "string") {
//     //             const categories = study.category.split(",").map((c) => c.trim());
//     //             return categories.includes(activeFilter);
//     //         }

//     //         return false;
//     //     });
//     // }, [caseStudies, activeFilter]);

//     const visibleStudies = useMemo(() => {
//         return caseStudies.filter((study) => {
//             // Category filter
//             const categoryMatch =
//                 activeFilter === "All" ||
//                 (Array.isArray(study.category)
//                     ? study.category.includes(activeFilter)
//                     : typeof study.category === "string"
//                         ? study.category
//                             .split(",")
//                             .map((c) => c.trim())
//                             .includes(activeFilter)
//                         : false);

//             // Industry filter
//             const industryMatch =
//                 activeIndustry === "All Industries" ||
//                 study.industry?.toLowerCase() === activeIndustry.toLowerCase();

//             return categoryMatch && industryMatch;
//         });
//     }, [caseStudies, activeFilter, activeIndustry]);


//     return (
//         <section className="bg-white py-8 md:py-12">
//             <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

//                 <div className="relative z-10 -mt-14 px-4 sm:px-6">
//                     <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
//                         {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
//                             <div className="flex flex-wrap gap-3">
//                                 {filters.map((f) => (
//                                     <button
//                                         key={f}
//                                         onClick={() => setActiveFilter(f)}
//                                         className={`min-w-[90px] sm:min-w-[110px] px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${activeFilter === f
//                                             ? "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 border-transparent text-white"
//                                             : "bg-white border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600"
//                                             }`}
//                                     >
//                                         {f}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div> */}
//                         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

//                             {/* LEFT SIDE - Existing Category Filters */}
//                             <div className="flex flex-wrap gap-3">
//                                 {filters.map((f) => (
//                                     <button
//                                         key={f}
//                                         onClick={() => setActiveFilter(f)}
//                                         className={`min-w-[90px] sm:min-w-[110px] px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${activeFilter === f
//                                                 ? "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 border-transparent text-white"
//                                                 : "bg-white border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600"
//                                             }`}
//                                     >
//                                         {f}
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* RIGHT SIDE - Industry Dropdown */}
//                             <div className="relative">
//                                 <select
//                                     value={activeIndustry}
//                                     onChange={(e) => setActiveIndustry(e.target.value)}
//                                     className="appearance-none w-full lg:w-[180px] px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none focus:border-sky-400"
//                                 >
//                                     {industries.map((industry) => (
//                                         <option key={industry} value={industry}>
//                                             {industry}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
//                                     ▼
//                                 </span>
//                             </div>

//                         </div>

//                     </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                     {visibleStudies.length === 0 ? (
//                         <p className="text-center text-sm text-slate-400">
//                             No case studies found.
//                         </p>
//                     ) : (
//                         visibleStudies.map((study, i) => (
//                             <CaseStudyCard
//                                 key={study.slug || i}
//                                 study={study}
//                                 businessImpact={study.businessImpact}
//                                 styleIndex={i}
//                             />
//                         ))
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }


"use client";

import React, { useState, useMemo } from "react";
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

// ---- type -> detail page route prefix ----
const routeByType = {
    seo: "seo",
    ppc: "ppc",
    "social-media": "social-media",
};

function CaseStudyCard({ study, businessImpact, styleIndex }) {
    const style = styleRotation[styleIndex % styleRotation.length];
    const CategoryIcon = style.icon;

    const displayCategory = Array.isArray(study.category)
        ? study.category.join(", ")
        : study.category || "General";

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-3 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-[120px_200px_1fr_320px] gap-5 md:gap-6 md:items-stretch">

                <div className="flex flex-col items-start gap-3">
                    {study.companyLogo && (
                        <div className="relative self-start w-[100px] h-[80px] shrink-0 overflow-hidden">
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

                <div className="relative w-full h-48 sm:h-50 md:h-64 rounded-xl overflow-hidden bg-slate-100 shrink-0">
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

                <div className="min-w-0 flex flex-col justify-between pt-1 md:mt-1">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {displayCategory.split(",").map((category, index) => {
                                const categoryName = category.trim();

                                return (
                                    <span
                                        key={index}
                                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText}`}
                                    >
                                        {categoryName}
                                    </span>
                                );
                            })}
                        </div>

                        <h3 className="mt-2.5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {study.title}
                        </h3>

                        <div className="mt-1.5 flex items-center gap-3 text-[11px] sm:text-xs text-slate-400 font-medium">
                            <span>Industry: {study.industry}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>Duration: {study.duration}</span>
                        </div>

                        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed hidden sm:block">
                            {study.tagline || study.description || "No description available."}
                        </p>

                        <Link
                            href={`/case-studies/${routeByType[study.type] || "seo"}/${study.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${style.linkText} hover:gap-2.5 transition-all`}
                        >
                            View Case Study
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                <div
                    className={`rounded-xl border ${style.resultsBorder} ${style.resultsBg} p-3 sm:p-4 w-full h-full flex flex-col justify-center`}
                >
                    <p className={`text-[12px] font-extrabold uppercase tracking-wide mb-3 ${style.statText}`}>
                        Results Achieved
                    </p>

                    {!businessImpact || businessImpact.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <p className={`text-[11px] ${style.statText}`}>
                                No data available
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {businessImpact.slice(0, 4).map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-slate-100 bg-white/80 px-2 py-2 min-h-[70px] flex flex-col items-center justify-center text-center"
                                >
                                    <p
                                        className={`text-medium sm:text-base font-extrabold leading-none ${style.statText}`}
                                    >
                                        {stat.value}
                                    </p>

                                    <p className="mt-2 text-[10px] sm:text-[10px] text-slate-900 font-medium font-extrabold leading-tight">
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

function normalizeSeo(record) {
    return {
        type: "seo",
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
        businessImpact: record?.businessImpact?.stats ?? [],
    };
}

function normalizePpc(record) {
    return {
        type: "ppc",
        title: record.title,
        tagline: record.subtitle,
        category: record.category,
        image: record.heroBgImage,
        logoText: record.title || record.slug,
        companyLogo: record.companyLogo,
        description: record.companyDescription || record.subtitle,
        slug: record.slug,
        industry: record?.hero?.industry || record?.projectOverview?.industry || "-",
        duration: record?.hero?.duration || record?.projectOverview?.duration || "-",
        businessImpact:
            record?.achievements?.items ??
            record?.performance?.metrics ??
            [],
    };
}

function normalizeSocial(record) {
    return {
        type: "social-media",
        title: record.title,
        tagline: record.subtitle,
        category: record.category,
        image: record.heroBgImage,
        logoText: record.title || record.slug,
        companyLogo: record.companyLogo,
        description: record.companyDescription || record.subtitle,
        slug: record.slug,
        industry: record?.hero?.industry || "-",
        duration: record?.hero?.duration || "-",
        businessImpact:
            record?.achievements?.items ??
            record?.performance?.metrics ??
            [],
    };
}

export default function CaseStudiesList({ seoData, ppcData, socialData, data }) {

    console.log("show me the ppcData of the caseStudiesList of the Rahul Thapliyal",ppcData);

    const seoRecords = Array.isArray(seoData) ? seoData : Array.isArray(data) ? data : [];
    const ppcRecords = Array.isArray(ppcData) ? ppcData : [];
    const socialRecords = Array.isArray(socialData) ? socialData : [];

    const caseStudies = useMemo(() => {
        return [
            ...seoRecords.map(normalizeSeo),
            ...ppcRecords.map(normalizePpc),
            ...socialRecords.map(normalizeSocial),
        ].map((study, i) => {
            const meta = dummyMeta[i % dummyMeta.length];
            return {
                ...study,
                logoSub: meta.logoSub,
                logoIcon: meta.logoIcon,
            };
        });
    }, [seoRecords, ppcRecords, socialRecords]);

    const [activeFilter, setActiveFilter] = useState("All");

    const [activeIndustry, setActiveIndustry] = useState("All Industries");

    const industries = ["All Industries", "SEO", "PPC", "Digital Media"];

    const industryToType = {
        SEO: "seo",
        PPC: "ppc",
        "Digital Media": "social-media",
    };

    const filters = useMemo(() => {
        const extractedCategories = new Set();

        caseStudies.forEach((study) => {
            if (!study.category) return;

            if (Array.isArray(study.category)) {
                study.category.forEach((cat) => extractedCategories.add(cat.trim()));
            } else if (typeof study.category === "string") {
                study.category.split(",").forEach((cat) => extractedCategories.add(cat.trim()));
            }
        });

        return ["All", ...Array.from(extractedCategories)];
    }, [caseStudies]);

    const visibleStudies = useMemo(() => {
        return caseStudies.filter((study) => {
            const categoryMatch =
                activeFilter === "All" ||
                (Array.isArray(study.category)
                    ? study.category.includes(activeFilter)
                    : typeof study.category === "string"
                        ? study.category
                            .split(",")
                            .map((c) => c.trim())
                            .includes(activeFilter)
                        : false);

            const industryMatch =
                activeIndustry === "All Industries" ||
                study.type === industryToType[activeIndustry];

            return categoryMatch && industryMatch;
        });
    }, [caseStudies, activeFilter, activeIndustry]);


    return (
        <section className="bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

                <div className="relative z-10 -mt-14 px-4 sm:px-6">
                    <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* LEFT SIDE - sirf pehle 5 category filters dikhayenge */}
                            <div className="flex flex-wrap gap-3">
                                {filters.slice(0,4).map((f) => (
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

                            {/* RIGHT SIDE - Industry Dropdown */}
                            <div className="relative">
                                <select
                                    value={activeIndustry}
                                    onChange={(e) => setActiveIndustry(e.target.value)}
                                    className="appearance-none w-full lg:w-[180px] px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none focus:border-sky-400"
                                >
                                    {industries.map((industry) => (
                                        <option key={industry} value={industry}>
                                            {industry}
                                        </option>
                                    ))}
                                </select>

                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    ▼
                                </span>
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
                                key={`${study.type}-${study.slug || i}`}
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