// src/app/(public)/home/blogs/BlogSliderClient.jsx
"use client";

import { useRef, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

export default function BlogSliderClient({ blogs = [] }) {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: blogs.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: blogs.length > 1,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: (dots) => (
      <div className="pt-8 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={blogs.length <= 1}
            className="text-slate-600 hover:text-white transition-all duration-300 border border-sky-200 p-3 rounded-full hover:bg-sky-600 hover:border-sky-600 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous blog"
          >
            <FaArrowLeft />
          </button>

          <ul className="flex space-x-2">{dots}</ul>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            disabled={blogs.length <= 1}
            className="text-slate-600 hover:text-white transition-all duration-300 border border-sky-200 p-3 rounded-full hover:bg-sky-600 hover:border-sky-600 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next blog"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-sky-600 w-6 rounded-lg" : "bg-slate-300"
          }`}
      />
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, blogs.length) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  if (!blogs || blogs.length === 0) {
    return (
      <section className="w-full py-10 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
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
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Portfolio-style header */}
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

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {blogs.map((item) => (
              <div key={item.id} className="px-4 py-4 mb-8">
                <article className="group bg-white/85 backdrop-blur-md rounded-2xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      {item.category}
                    </div>

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          </Slider>
        </div>

        {/* Bottom CTA (theme aligned) */}
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 text-white font-medium hover:from-sky-700 hover:to-sky-600 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            View All Blogs <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Decorative elements (lighter) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[110px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/15 rounded-full blur-[110px] animate-pulse pointer-events-none" />
      <style >{`
      
/* Minimal react-slick fix (Hostinger compatible) */
.slick-slider {
  position: relative;
  display: block;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

.slick-list {
  position: relative;
  display: block;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.slick-list:focus {
  outline: none;
}
.slick-list.dragging {
  cursor: pointer;
}

.slick-slider .slick-track,
.slick-slider .slick-list {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slick-track {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.slick-track:before,
.slick-track:after {
  display: table;
  content: '';
}
.slick-track:after {
  clear: both;
}
.slick-loading .slick-track {
  visibility: hidden;
}

.slick-slide {
  display: none;
  float: left;
  height: 100%;
  min-height: 1px;
}
[dir='rtl'] .slick-slide {
  float: right;
}
.slick-slide img {
  display: block;
}
.slick-slide.slick-loading img {
  display: none;
}
.slick-slide.dragging img {
  pointer-events: none;
}
.slick-initialized .slick-slide {
  display: block;
}
.slick-loading .slick-slide {
  visibility: hidden;
}
.slick-vertical .slick-slide {
  display: block;
  height: auto;
  border: 1px solid transparent;
}
.slick-arrow.slick-hidden {
  display: none;
}

.slick-dots {
  position: absolute;
  bottom: -45px;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
}
.slick-dots li {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
}
.slick-dots li button {
  font-size: 0;
  line-height: 0;
  display: block;
  width: 10px;
  height: 10px;
  padding: 5px;
  cursor: pointer;
  color: transparent;
  border: 0;
  outline: none;
  background: transparent;
}
.slick-dots li button:hover,
.slick-dots li button:focus {
  outline: none;
}
.slick-dots li button:hover:before,
.slick-dots li button:focus:before {
  opacity: 1;
}
.slick-dots li button:before {
  font-size: 6px;
  line-height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  content: '•';
  text-align: center;
  opacity: .25;
  color: #000;
}
.slick-dots li.slick-active button:before {
  opacity: .75;
  color: #28AFDF;
}
      `}
      </style>
    </section>
  );
}
