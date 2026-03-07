"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";

export default function IndustriesServe({ data }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    const items = data?.items || [];
    const title = data?.title || "Industries We Serve";
    const subtitle = data?.subtitle || "From healthcare and finance to e-commerce, manufacturing and education, we build custom software that drives efficiency and growth";

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

            const perView = typeof window !== 'undefined' ? (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1) : 1;
            setItemsPerView(perView);
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <CommonTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Controls */}
                    <div className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => scroll("left")}
                            className={`p-3 rounded-full bg-white shadow-xl border border-slate-100 text-slate-900 hover:bg-sky-600 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900`}
                            disabled={!canScrollLeft}
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                    <div className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => scroll("right")}
                            className={`p-3 rounded-full bg-white shadow-xl border border-slate-100 text-slate-900 hover:bg-sky-600 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900`}
                            disabled={!canScrollRight}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Slider */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
                        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                    >
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start h-[500px] relative rounded-3xl overflow-hidden group/card shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <Image
                                    src={item.itemImage || "/images/placeholder.jpg"}
                                    alt={item.itemTitle}
                                    fill
                                    className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-sky-400/90 via-sky-500/85 to-sky-600/90 mix-blend-multiply opacity-90" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col items-start text-white">
                                    <div className="mb-6">
                                        <h3 className="text-2xl md:text-3xl font-bold relative inline-block">
                                            {item.itemTitle}
                                            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/50" />
                                            <span className="absolute -bottom-3 left-0 w-3/4 h-[2px] bg-white/30" />
                                        </h3>
                                    </div>

                                    <div className="flex-1 space-y-4 w-full">
                                        {item.itemDesc?.split('\n').filter(Boolean).map((point, pIdx) => (
                                            <div key={pIdx} className="flex items-start gap-3">
                                                <div className="mt-1 bg-white/20 rounded-full p-0.5">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                                <p className="text-sm md:text-base font-medium text-white/95 leading-snug">
                                                    {point.trim()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-sky-50 transition-colors shadow-lg">
                                            View More <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Decorative Arrow in Circle (Mockup detail) */}
                                <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full border border-white/30 flex items-center justify-center opacity-70 group-hover/card:opacity-100 transition-opacity">
                                    <ChevronRight size={24} className="text-white transform -rotate-45" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                    {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const { clientWidth } = scrollRef.current;
                                scrollRef.current.scrollTo({ left: i * clientWidth, behavior: "smooth" });
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === i ? "w-10 bg-sky-600" : "w-2.5 bg-slate-200"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}
