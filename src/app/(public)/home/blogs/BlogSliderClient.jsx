"use client";

import { useRef } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function BlogSliderClient({ blogs = [] }) {
  const trackRef = useRef(null);

  const scrollByCard = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-card='1']");
    const cardWidth = firstCard?.getBoundingClientRect().width || 320;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" }); // 16 = gap-4
  };

  if (!blogs || blogs.length === 0) {
    return (
      <section className="w-full py-10 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Top Blogs
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-8">
            Coming soon! Check back later for fresh insights and updates.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 text-white font-medium hover:from-sky-700 hover:to-sky-600 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Explore All Content <FaArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Top Blogs
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our latest insights, product lessons, and engineering best practices.
          </p>
        </div>

  

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {blogs.map((item, idx) => (
            <div
              key={item.id}
              data-card={idx === 0 ? "1" : "0"}
              className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[calc(33.333%-1rem)]"
            >
              <article className="group bg-white/85 backdrop-blur-md rounded-2xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {item.category}
                  </div>

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-xs sm:text-sm mb-3 flex-wrap gap-3">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-sky-600" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1 text-sky-600" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 mb-5 flex-grow text-sm line-clamp-3">
                    {item.description}
                  </p>

                  <Link
                    href={`/blog/${item.slug}`}
                    className="mt-auto inline-flex items-center text-sky-700 font-semibold hover:text-sky-800 transition-colors duration-300"
                  >
                    <span>Read Full Article</span>
                    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <button
            onClick={() => scrollByCard(-1)}
            className="text-slate-600 hover:text-white transition-all duration-300 border border-sky-200 p-3 rounded-full hover:bg-sky-600 hover:border-sky-600"
            aria-label="Previous blog"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={() => scrollByCard(1)}
            className="text-slate-600 hover:text-white transition-all duration-300 border border-sky-200 p-3 rounded-full hover:bg-sky-600 hover:border-sky-600"
            aria-label="Next blog"
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 text-white font-medium hover:from-sky-700 hover:to-sky-600 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            View All Blogs <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
