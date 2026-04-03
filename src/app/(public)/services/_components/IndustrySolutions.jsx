"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";
import Link from "next/link";

export default function IndustrySolutions({ data }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    const items = data?.items || [];
    const title = data?.title || "Industry Solutions";
    const subtitle = data?.subtitle;

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

            const perView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            const index = Math.round(scrollLeft / (clientWidth / perView));
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [items]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    if (!items.length) return null;

    return (
        <section className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
                {/* Header */}
                <CommonTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Slider */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12"
                        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                    >
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start h-[480px] relative rounded-3xl overflow-hidden group/card shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100"
                            >
                                {/* Background Image */}
                                <Image
                                    src={item.itemImage || "/images/placeholder.jpg"}
                                    alt={item.itemTitle}
                                    fill
                                    className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay - Darker at bottom for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <div className="space-y-4">
                                        <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-normal">
                                            {item.itemTitle}
                                        </h3>
                                        <div
                                            className="text-sm md:text-base font-medium text-white/80 leading-relaxed line-clamp-3 group-hover/card:line-clamp-none transition-all duration-300 rich-text"
                                            dangerouslySetInnerHTML={{ __html: item.itemDesc }}
                                        />

                                        {/* Dynamic Points */}
                                        {item.points && item.points.length > 0 && (
                                            <div className="pt-2 space-y-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                                                {item.points.map((point, pIdx) => (
                                                    <div key={pIdx} className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                                        {point}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Button */}
                                <div className="absolute bottom-8 right-8 z-10">
                                    <Link
                                        href={item.buttonLink || "#"}
                                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
                                    >
                                        <ArrowUpRight size={24} strokeWidth={2.5} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls - Bottom Right */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={() => scroll("left")}
                            className={`p-3 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-900`}
                            disabled={!canScrollLeft}
                        >
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className={`p-3 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-900`}
                            disabled={!canScrollRight}
                        >
                            <ChevronRight size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
}
