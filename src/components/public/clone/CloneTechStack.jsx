"use client";

import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';


const defaultTechStackData = {
    title: "Technology Stack We Use",
    highlight: "Advanced Tools for Advanced Solutions",
    subtitle: "We leverage a world-class technology stack to ensure your product is fast, secure, and ready for millions of users.",
    tabs: [
        {
            label: "Frontend",
            items: [
                { name: "React.js", image: "/images/tech/React.png" },
                { name: "Next.js", image: "/images/tech/Next.js.png" },
                { name: "TypeScript", image: "/images/tech/TypeScript.png" },
                { name: "Tailwind CSS", image: "/images/tech/Tailwind-CSS.png" }
            ]
        },
        {
            label: "Backend",
            items: [
                { name: "Node.js", image: "/images/tech/node.png" },
                { name: "Python", image: "/images/tech/Python.png" },
                { name: "Go Lang", image: "/images/tech/Go.png" },
                { name: "PHP/Laravel", image: "/images/tech/Laravel.png" }
            ]
        },
        {
            label: "Database",
            items: [
                { name: "PostgreSQL", image: "/images/tech/PostgresSQL.png" },
                { name: "MongoDB", image: "/images/tech/MongoDB.png" },
                { name: "Redis", image: "/images/tech/Redis.png" }
            ]
        },
        {
            label: "Cloud/DevOps",
            items: [
                { name: "AWS", image: "/images/tech/AWS.png" },
                { name: "Docker", image: "/images/tech/Docker.png" },
                { name: "Google Cloud", image: "/images/tech/Google-Cloud.png" }
            ]
        }
    ]
};

export default function CloneTechStack({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    const techData = data?.tabs?.length > 0 ? data : defaultTechStackData;
    const tabs = techData.tabs;

    return (
        <section className="py-8 md:py-16 bg-white relative overflow-clip">
            <div className="max-w-7xl mx-auto px-6">

                <CommonTitle
                    align="center"
                    title={techData.title || "Technology Stack We Use"}
                    gradientText={techData.highlight}
                    subtitle={techData.subtitle || "The modern tools and frameworks power our solutions."}
                />

                {/* Scrollable Tab Navigation (Limit Radius) */}
                <div className="mt-10 mb-16 relative">
                    <div className="flex overflow-x-auto scrollbar-hide pb-2 gap-3 md:gap-4 snap-x snap-mandatory">
                        <div className="flex gap-3 md:gap-4 mx-auto">
                            {tabs.map((tab, idx) => (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setActiveTab(idx)}
                                    className={`px-8 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 border whitespace-nowrap snap-center ${activeTab === idx
                                        ? "bg-[#2FB3E0] text-white border-[#2FB3E0] transform scale-105"
                                        : "bg-slate-50 text-slate-500 border-slate-200 hover:border-[#2FB3E0]/30 hover:text-[#2FB3E0] hover:bg-[#2FB3E0]/5"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Grid Display (Limit Radius) */}
                <div className="min-h-[200px]">
                    <div className="flex justify-center">
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-6xl animate-fadeIn">
                            {tabs?.[activeTab]?.items?.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="group flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-200 transition-all duration-500 hover:-translate-y-2 cursor-default w-[140px] sm:w-[160px]"
                                >
                                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                                        <Image
                                            src={tech.image}
                                            alt={tech.name}
                                            fill
                                            className="object-contain transition-all duration-500"
                                        />
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-slate-800 tracking-tight text-center">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
