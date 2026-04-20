
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CommonTitle from '@/components/ui/CommonTitle';

const defaultTechStackData = {
    title: "Our Cutting-Edge Technology Stack",
    highlight: "Modern. Scalable. Future-Ready.",
    subtitle: "We leverage the latest frameworks and tools to build robust, high-performance digital solutions that scale with your business.",
    tabs: [
        {
            label: "Frontend",
            items: [
                { name: "React.js", image: "/images/tech/React.png" },
                { name: "Next.js", image: "/images/tech/Next.js.png" },
                { name: "TypeScript", image: "/images/tech/TypeScript.png" },
                { name: "Tailwind CSS", image: "/images/tech/Tailwind-CSS.png" },
                { name: "Redux", image: "/images/tech/Redux.png" },
                { name: "Three.js", image: "/images/tech/Three.js.png" }
            ]
        },
        {
            label: "Backend",
            items: [
                { name: "Node.js", image: "/images/tech/node.png" },
                { name: "Python", image: "/images/tech/Python.png" },
                { name: "Go Lang", image: "/images/tech/Go.png" },
                { name: "PHP/Laravel", image: "/images/tech/Laravel.png" },
                { name: "Nest.js", image: "/images/tech/Nest.js.png" }
            ]
        },
        {
            label: "Mobile",
            items: [
                { name: "React Native", image: "/images/tech/react-native.png" },
                { name: "Flutter", image: "/images/tech/Flutter.png" },
                { name: "Swift", image: "/images/tech/Swift.png" },
                { name: "Kotlin", image: "/images/tech/Kotlin.png" }
            ]
        },
        {
            label: "Database",
            items: [
                { name: "PostgreSQL", image: "/images/tech/PostgresSQL.png" },
                { name: "MongoDB", image: "/images/tech/MongoDB.png" },
                { name: "Redis", image: "/images/tech/Redis.png" },
                { name: "Firebase", image: "/images/tech/Firebase.png" }
            ]
        },
        {
            label: "Cloud/DevOps",
            items: [
                { name: "AWS", image: "/images/tech/AWS.png" },
                { name: "Google Cloud", image: "/images/tech/Google-Cloud.png" },
                { name: "Docker", image: "/images/tech/Docker.png" },
                { name: "Kubernetes", image: "/images/tech/Kubernetes.png" }
            ]
        }
    ]
};

export default function SolutionsTechStack({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    const techData = data?.tabs?.length > 0 ? data : defaultTechStackData;

    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* 1. Common Title via Props */}
                <CommonTitle
                    align="center"
                    title={techData?.title}
                    gradientText={techData?.highlight}
                    subtitle={techData?.subtitle}
                />

                {/* 2. Category Tabs */}
                {techData?.tabs?.length > 0 && (
                    <div className="flex overflow-x-auto justify-start md:justify-center gap-3 md:gap-4 mt-10 mb-16 pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {techData.tabs.map((tab, idx) => (
                            <button
                                key={idx}
                                onMouseEnter={() => setActiveTab(idx)}
                                className={`px-8 py-3 rounded-full text-sm font-extrabold transition-all duration-300 border whitespace-nowrap snap-center ${activeTab === idx
                                        ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-200 transform scale-105"
                                        : "bg-slate-50 text-slate-500 border-slate-200 hover:border-sky-200 hover:text-sky-600 hover:bg-sky-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* 3. Tech Grid Display */}
                <div className="min-h-[300px] flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-6xl"
                        >
                            {techData?.tabs?.[activeTab]?.items?.map((tech, idx) => (
                                <div
                                    key={`${activeTab}-${idx}`}
                                    className="group flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 hover:border-sky-300 hover:bg-white transition-all duration-500 hover:-translate-y-2 cursor-default w-[140px] sm:w-[160px]"
                                >
                                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-500">
                                        {tech.image && (
                                            <Image
                                                src={tech.image}
                                                alt={tech.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 48px, 64px"
                                            />
                                        )}
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-slate-800 text-center">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}