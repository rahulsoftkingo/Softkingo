// src/app/(public)/home/blogs/BlogSliderClient.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import CommonTitle from "@/components/ui/CommonTitle";

export default function Blogs({
  category = null,
  type = "blog",
  title = "Our Top Blogs",
  subtitle = "Explore our latest insights, product lessons, and engineering best practices.",
  featured = false,
  limit = 6,
  className = ""
}) {
  const [blogs, setBlogs] = useState([]);
  const scrollRef = useRef(null);

  // ✅ Fetch blogs (same logic)
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const params = new URLSearchParams({
          category: category || '',
          type: type || 'blog',
          featured: featured ? 'true' : 'false',
          limit: limit.toString()
        });

        const res = await fetch(`/api/blogs?${params}`, { cache: 'no-store' });
        let data = await res.json();

        data = data.map(blog => ({
          ...blog,
          category: blog.category?.name || blog.category || 'General',
          image: blog.thumbnail || '/images/insights/hero-default.png',
          date: blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : 'Recently Published',
          readTime: blog.readTimeMinutes ? `${blog.readTimeMinutes} min read` : '5 min read',
          description: blog.excerpt || blog.description || 'Discover amazing insights...'
        }));

        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setBlogs([]);
      }
    }
    fetchBlogs();
  }, [category, type, featured, limit]);

  // ✅ Scroll functions
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const getSafeImage = (image) => {
    if (!image) return '/images/insights/hero-default.png';
    if (image.startsWith('http') || image.startsWith('/')) return image;
    return '/images/insights/hero-default.png';
  };

  // ✅ Responsive slide width calculation
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 400;
    if (window.innerWidth >= 1024) return 380; // 3 slides
    if (window.innerWidth >= 768) return 500;  // 2 slides
    return '100%'; // 1 slide
  };

  if (!blogs?.length) {
    return (
      <section className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sky-50/50 ${className}`}>
        <div className="max-w-7xl mx-auto text-center py-20">
          <CommonTitle
            align="center"
            title={false}
            gradientText={title}
            subtitle={subtitle}
          />
          <Link href="/blog" className="group px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex">
            <span>Explore All Content</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sky-50/50 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
         
          <CommonTitle
            align="center"
            title={false}
            gradientText={title}
            subtitle={subtitle}
          />
        </div>

        {/* Custom Scrollable Carousel */}
        <div className="relative mb-20">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border-2 border-sky-200 text-slate-600 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300 shadow-sm hover:shadow-md lg:opacity-100 opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border-2 border-sky-200 text-slate-600 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300 shadow-sm hover:shadow-md lg:opacity-100 opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <FaArrowRight className="text-xl" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto pb-12 scroll-smooth snap-x snap-mandatory"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {blogs.map((item, index) => (
              <div
                key={item.id || index}
                className="flex-shrink-0 w-[90%] sm:w-[80%] md:w-[48%] lg:w-[32%] xl:w-[30%] snap-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <article className="group bg-white/95 backdrop-blur-xl rounded-xl shadow-lg  overflow-hidden hover:shadow-xl hover:border-sky-200/80 transition-all duration-500 hover:-translate-y-3 h-full flex flex-col cursor-grab active:cursor-grabbing">

                  {/* Image + Category */}
                  <div className="relative h-42 sm:h-52 overflow-hidden bg-gradient-to-br from-slate-50 to-sky-50/30">
                    <Image
                      src={getSafeImage(item.image)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={index < 3}
                    />
                    <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-sky-600/95 to-blue-600/95 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                      {item.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-8 sm:p-10 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-6 text-xs sm:text-base text-slate-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-sky-500 text-sm" />
                        <span>{item.date}</span>


                      </div>
                      {/* <div className="flex items-center gap-2">
                        <FaClock className="text-sky-500 text-lg" />
                        <span>{item.readTime}</span>
                      </div> */}
                    </div>

                    <h3 className="text-md sm:text-lg lg:text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-sky-800 transition-all duration-300 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* <p className="text-slate-600 mb-10 flex-1 text-base sm:text-lg leading-relaxed line-clamp-4">
                      {item.description}
                    </p> */}

                    <Link
                      href={`/blog/${item.slug}`}
                      className="inline-flex items-center gap-3 text-sky-600 font-semibold text-sm hover:text-sky-700 hover:gap-4 transition-all duration-300 group/link border-b-2 border-transparent hover:border-sky-300 pb-1"
                    >
                      <span>Read Full Article</span>
                      <FaArrowRight className=" group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollRef.current?.scrollTo({ left: index * 320, behavior: 'smooth' })}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index * 320 <= scrollRef.current?.scrollLeft + 100
                    ? 'bg-sky-600 w-8 scale-110 shadow-md'
                    : 'bg-slate-300 hover:bg-slate-400 hover:scale-105'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/blog?category=${category || ''}&type=${type}`}
            className="group px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex"
          >
            <span>View All {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}s</span>
            <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (hover: hover) {
          article:hover .group-hover\\:opacity-100 {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
