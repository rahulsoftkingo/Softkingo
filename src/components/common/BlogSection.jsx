"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaClock, FaEye } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CommonTitle from "@/components/ui/CommonTitle";

export default function BlogSection({
    category = "",
    type = "blog",
    title = "Latest Blogs",
    subtitle = "Browse through The tchnical knowledge about latest trends and technologies our experienced team would like to share with you",
    limit = 6,
    className = ""
}) {
    const [blogs, setBlogs] = useState([]);
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const params = new URLSearchParams({
                    category: category || '',
                    type: type || 'blog',
                    limit: limit.toString()
                });

                const res = await fetch(`/api/blogs?${params}`, { cache: 'no-store' });
                const data = await res.json();
                setBlogs(data || []);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                setBlogs([]);
            }
        }
        fetchBlogs();
    }, [category, type, limit]);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 350;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 500);
        }
    };

    if (!blogs || blogs.length === 0) return null;

    return (
        <section className={`py-20 bg-white overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Content - Header & CTA */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <CommonTitle
                                title={title}
                                subtitle={subtitle}
                                align="left"
                            />
                        </div>

                        <Link
                            href={`/blog?category=${category}`}
                            className="group inline-flex items-center gap-4 transition-all duration-300"
                        >
                            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-300 group-hover:border-sky-500 transition-colors duration-500">
                                <FaArrowRight className="text-xl text-slate-700 group-hover:text-sky-500 transition-colors duration-500 group-hover:translate-x-1" />
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-sky-500 opacity-0"
                                    whileHover={{ scale: 1.2, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <span className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-300">
                                Get all insights
                            </span>
                        </Link>
                    </div>

                    {/* Right Content - Blog Carousel */}
                    <div className="lg:col-span-8 relative group/carousel">
                        <div
                            ref={scrollRef}
                            onScroll={checkScroll}
                            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
                        >
                            {blogs.map((blog, idx) => (
                                <div key={blog.id} className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start">
                                    <BlogCard blog={blog} priority={idx < 2} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scroll('left')}
                                className="absolute -left-4 top-1/3 -translate-y-1/2 z-30 p-3 bg-white shadow-xl rounded-full text-sky-600 border border-sky-100 hover:bg-sky-50 transition-all opacity-0 group-hover/carousel:opacity-100"
                            >
                                <FaArrowLeft />
                            </button>
                        )}
                        {canScrollRight && (
                            <button
                                onClick={() => scroll('right')}
                                className="absolute -right-4 top-1/3 -translate-y-1/2 z-30 p-3 bg-white shadow-xl rounded-full text-sky-600 border border-sky-100 hover:bg-sky-50 transition-all opacity-0 group-hover/carousel:opacity-100"
                            >
                                <FaArrowRight />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
        </section>
    );
}

function BlogCard({ blog, priority }) {
    const categoryName = blog.category?.name || blog.category || "Uncategorized";
    const dateStr = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
        : "RECENT";

    return (
        <div className="group bg-white rounded-sm overflow-hidden h-full flex flex-col border border-transparent hover:border-slate-100 transition-all duration-500">
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-slate-100">
                <Image
                    src={blog.thumbnail || "/images/blog/default.jpg"}
                    alt={blog.title}
                    fill
                    priority={priority}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Softkingo Logo Placeholder in card */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm">
                    <span className="text-[10px] font-black tracking-tighter text-sky-600 leading-none">Softkingo</span>
                </div>
            </div>

            {/* Content */}
            <div className="pt-6 pb-4 flex flex-col flex-1 space-y-4">
                {/* Meta */}
                <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                    <span className="text-rose-600 uppercase">{categoryName}</span>
                    <span className="text-slate-400">{dateStr}</span>
                </div>

                {/* Title */}
                <div className="space-y-3">
                    <Link href={`/blog/${blog.slug}`}>
                        <h3 className="text-lg font-extrabold text-slate-900 leading-tight line-clamp-2 hover:text-sky-600 transition-colors h-[3.5rem]">
                            {blog.title}
                        </h3>
                    </Link>
                    <div className="w-12 h-[2px] bg-slate-900" />
                </div>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {blog.excerpt || blog.description || "No description available for this post."}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <FaClock className="text-sky-500/50" />
                        <span>{blog.readTimeMinutes || 5} MIN READ</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEye className="text-sky-500/50" />
                        <span>{blog.viewCount || 1000} VIEWS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
