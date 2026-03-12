"use client";

import React, { useState, useEffect, useRef } from "react";
import CommonTitle from "@/components/ui/CommonTitle";
import { motion, useScroll, useSpring } from "framer-motion";

const UserGuide = ({ data }) => {
    const isRich = data?.mode === 'rich';
    const richContent = data?.richContent;

    // 1. Helper to map TipTap to Sections (copied from shared logic)
    const mapTipTapToSections = (rawJson, fallbackTitle) => {
        let doc;
        try {
            doc = typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
        } catch { return []; }
        if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) return [];

        const mapped = [];
        let sectionIndex = 1;
        let currentSection = { 
            id: "section-1", 
            title: fallbackTitle || "Overview", 
            content: null, 
            blocks: [], 
            children: [] 
        };

        const pushCurrent = () => {
            if (currentSection.blocks.length > 0) {
                mapped.push({
                    id: currentSection.id,
                    title: currentSection.title,
                    children: currentSection.children, // Capture children (H3s)
                    content: (
                        <div className="space-y-4">
                            {currentSection.blocks.map((block, idx) => (
                                <BlockRenderer key={idx} block={block} />
                            ))}
                        </div>
                    )
                });
            }
        };

        for (const node of doc.content) {
            if (node.type === "heading") {
                const level = node.attrs?.level || 2;
                const text = node.content?.map((c) => c.text).join("").trim();
                const id = text?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `section-${sectionIndex}`;
                
                if (level === 2) {
                    pushCurrent();
                    sectionIndex++;
                    currentSection = {
                        id,
                        title: text || `Section ${sectionIndex}`,
                        blocks: [],
                        children: []
                    };
                    continue;
                }
                if (level === 3) {
                    currentSection.blocks.push({ type: "h3", text, id });
                    currentSection.children.push({ id, title: text }); // Add to children for ToC
                    continue;
                }
            }
            if (node.type === "paragraph") {
                const text = node.content?.map((c) => c.text).join("").trim();
                if (text) currentSection.blocks.push({ type: "p", text });
            }
            if (node.type === "bulletList") {
                const items = node.content?.map(li => li.content?.flatMap(p => p.content || []).map(c => c.text).join("").trim()).filter(Boolean);
                if (items?.length) currentSection.blocks.push({ type: "ul", items });
            }
            if (node.type === "orderedList") {
                const items = node.content?.map(li => li.content?.flatMap(p => p.content || []).map(c => c.text).join("").trim()).filter(Boolean);
                if (items?.length) currentSection.blocks.push({ type: "ol", items });
            }
        }
        pushCurrent();
        return mapped;
    };

    const [activeTab, setActiveTab] = useState("");
    const sectionRefs = useRef({});

    // Use dynamic data if available, otherwise fallback to static content
    const getSections = () => {
        if (isRich && richContent) {
            return mapTipTapToSections(richContent, data?.title);
        }

        const rawSections = data?.sections || [
            {
                id: "what-is",
                title: "What is Mobile App Development?",
                description: "Mobile application development is the process of making software for smartphones, tablets and digital assistants, most commonly for the Android and iOS operating systems.",
                subSections: [
                    {
                        title: "Idea Generation",
                        bullets: ["Identifying a specific need or problem.", "Clearly defining the app's purpose."]
                    },
                    {
                        title: "Development & Testing",
                        bullets: ["Writing code using modern languages.", "Rigorously ensuring functionality."]
                    }
                ]
            },
            {
                id: "key-components",
                title: "Core Components",
                description: "A successful mobile app relies on several critical architectural elements:",
                subSections: [
                    {
                        title: "UI & UX",
                        bullets: ["Intuitive buttons and menus.", "Seamless emotional impact and usability."]
                    },
                    {
                        title: "Backend & DB",
                        bullets: ["Secure data storage and retrieval.", "Scalable server-side processing."]
                    }
                ]
            },
            {
                id: "platforms",
                title: "Platforms & Approaches",
                description: "Modern apps are built for specific ecosystems or via cross-platform frameworks.",
                subSections: [
                    {
                        title: "iOS & Android",
                        bullets: ["Swift/Kotlin for native power.", "Flutter/React Native for cross-platform speed."]
                    }
                ]
            }
        ];

        return rawSections.map((section, index) => ({
            id: section.id || `section-${index}`,
            title: section.title,
            description: section.description,
            subSections: section.subSections,
            content: (
                <div className="space-y-6">
                    {section.description && (
                        <p className="text-slate-600 leading-relaxed text-lg font-medium">
                            {section.description}
                        </p>
                    )}
                    <div className="space-y-8">
                        {section.subSections?.map((sub, sIdx) => (
                            <div key={sIdx} className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
                                {sub.title && (
                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-base md:text-lg">
                                        <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></span>
                                        {sub.title}
                                    </h4>
                                )}
                                <ul className="grid md:grid-cols-2 gap-4">
                                    {sub.bullets?.map((bullet, bIdx) => (
                                        <li key={bIdx} className="flex items-start gap-3 text-slate-600 text-sm leading-snug">
                                            <div className="mt-1 w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                                                <span className="text-sky-600 text-[10px] font-black">✓</span>
                                            </div>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }));
    };

    const sections = getSections();

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (sections.length === 0) return null;

    return (
        <section className="bg-white py-16 px-4 md:px-6 lg:px-12 relative overflow-hidden" id="user-guide">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto">
                <CommonTitle
                    align="center"
                    pill={false}
                    title={data?.title || "Mobile App Development"}
                    gradientText={data?.subtitle || "User Guide"}
                    subtitle={data?.description || "Everything you need to know about the mobile app's core concepts and processes."}
                />

                <div className="mt-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Table of Contents (LEFT on Desktop, Bottom on Mobile) */}
                    <aside className="lg:w-1/3 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-32 space-y-6">
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_25px_60px_rgba(15,23,42,0.08)] relative overflow-hidden group/toc">
                                {/* Decorative Blur */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover/toc:opacity-80 transition-opacity" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8 px-2">
                                        <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em]">
                                            Guide Navigation
                                        </h4>
                                    </div>

                                    <div className="relative">
                                        {/* Vertical Timeline line */}
                                        <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-100 hidden sm:block" />
                                        
                                        <nav className="space-y-4 relative">
                                            {sections.map((section, idx) => (
                                                <div key={section.id} className="space-y-2">
                                                    <button
                                                        onClick={() => scrollToId(section.id)}
                                                        className={`group w-full text-left transition-all duration-300 flex items-center gap-5 relative group/item`}
                                                    >
                                                        {/* The indicator dot */}
                                                        <div className={`relative z-20 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${activeTab === section.id || section.children?.some(c => c.id === activeTab)
                                                            ? "bg-sky-500 shadow-lg shadow-sky-200"
                                                            : "bg-slate-50 text-slate-400 group-hover/item:bg-sky-50 group-hover/item:text-sky-500"
                                                            }`}>
                                                            <span className={`text-[10px] font-black tracking-tight transition-colors ${activeTab === section.id || section.children?.some(c => c.id === activeTab) ? "text-white" : "text-slate-400"
                                                                }`}>
                                                                {String(idx + 1).padStart(2, '0')}
                                                            </span>

                                                            {/* Subtle Ring for active */}
                                                            {(activeTab === section.id || section.children?.some(c => c.id === activeTab)) && (
                                                                <motion.div
                                                                    layoutId="toc-pulse"
                                                                    className="absolute -inset-1 rounded-[1.2rem] border-2 border-sky-100/50"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col gap-0.5">
                                                            <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === section.id || section.children?.some(c => c.id === activeTab) ? "text-sky-500" : "text-slate-400"
                                                                }`}>
                                                                Section {idx + 1}
                                                            </span>
                                                            <span className={`text-sm leading-tight transition-all duration-300 line-clamp-2 ${activeTab === section.id
                                                                ? "text-slate-900 font-extrabold translate-x-1"
                                                                : "text-slate-500 font-bold group-hover/item:text-sky-600"
                                                                }`}>
                                                                {section.title}
                                                            </span>
                                                        </div>
                                                    </button>

                                                    {/* Subsections (H3) */}
                                                    {section.children?.length > 0 && (
                                                        <div className="ml-16 pl-4 border-l border-slate-100 space-y-2 py-1">
                                                            {section.children.map((child) => (
                                                                <button
                                                                    key={child.id}
                                                                    onClick={() => scrollToId(child.id)}
                                                                    className={`block text-xs text-left transition-all duration-300 ${activeTab === child.id
                                                                        ? "text-sky-600 font-black"
                                                                        : "text-slate-400 hover:text-sky-500 font-bold"
                                                                        }`}
                                                                >
                                                                    {child.title}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content Area (RIGHT on Desktop, Top on Mobile) */}
                    <main className="lg:w-2/3 space-y-16 order-1 lg:order-2">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-24 group"
                            >
                                <div className="space-y-6">


                                    <div className="bg-gradient-to-br from-white to-sky-50/30 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl shadow-sky-100/20 group-hover:shadow-sky-100/40 transition-shadow duration-500">
                                        {isRich ? (
                                            <div className="prose prose-sky prose-lg max-w-none">
                                                {section.content}
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {section.description && (
                                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                                                        {section.description}
                                                    </p>
                                                )}
                                                <div className="space-y-8">
                                                    {section.subSections?.map((sub, sIdx) => (
                                                        <div key={sIdx} className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
                                                            {sub.title && (
                                                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                                                                    {sub.title}
                                                                </h4>
                                                            )}
                                                            <ul className="grid md:grid-cols-2 gap-4">
                                                                {sub.bullets?.map((bullet, bIdx) => (
                                                                    <li key={bIdx} className="flex items-start gap-3 text-slate-600 text-sm leading-snug">
                                                                        <span className="mt-1 text-sky-400">✔</span>
                                                                        {bullet}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>

            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
};

// Helper for TipTap Block rendering
const BlockRenderer = ({ block }) => {
    switch (block.type) {
        case 'p':
            return <p className="text-slate-600 leading-relaxed font-medium">{block.text}</p>;
        case 'h3':
            return <h4 id={block.id} className="text-xl font-black text-slate-900 mt-10 mb-4 flex items-center gap-3 scroll-mt-32">
                <span className="w-1.5 h-6 bg-sky-500 rounded-full"></span>
                {block.text}
            </h4>;
        case 'ul':
            return (
                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 pl-2 py-4">
                    {block.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            {it}
                        </li>
                    ))}
                </ul>
            );
        case 'ol':
            return (
                <ol className="space-y-3 pl-2 py-4">
                    {block.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-4 text-slate-600 text-sm italic font-medium">
                            <span className="text-sky-500 font-black shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                            {it}
                        </li>
                    ))}
                </ol>
            );
        default:
            return null;
    }
};

export default UserGuide;
