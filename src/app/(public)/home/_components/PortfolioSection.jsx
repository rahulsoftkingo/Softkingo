// src/app/(public)/home/_components/PortfolioSection.jsx

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCode, FaMobileAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const TYPE_BY_INDEX = ['app', 'web', 'digital'];

function typeFromIndex(i) {
  return TYPE_BY_INDEX[i] || 'app';
}

function tabLabel(type) {
  if (type === 'app') return 'Mobile App';
  if (type === 'web') return 'Website';
  return 'Digital';
}

// RIGHT SIDE CAROUSEL
function RightVisualCarousel({ items = [], type = 'app' }) {
  const slides = useMemo(() => {
    return (items || [])
      .filter((p) => (p?.type || '').toLowerCase() === type)
      .filter((p) => p?.phoneMockup || p?.bgImage)
      .slice(0, 10);
  }, [items, type]);

  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => setIndex(0), [type, slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [slides.length]);

  const goPrev = () => slides.length && setIndex((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => slides.length && setIndex((p) => (p + 1) % slides.length);

  const onTouchStart = (e) => (touchStartX.current = e.touches?.[0]?.clientX ?? null);
  const onTouchEnd = (e) => {
    const start = touchStartX.current;
    const end = e.changedTouches?.[0]?.clientX ?? null;
    touchStartX.current = null;
    if (start == null || end == null) return;
    const dx = end - start;
    if (Math.abs(dx) < 40) return;
    dx > 0 ? goPrev() : goNext();
  };

  if (!slides.length) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-2xl"></div>
        <div className="absolute -top-4 -right-4 w-full h-full bg-white border border-sky-200 rounded-2xl transform rotate-3"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-sky-800 text-xl font-bold text-center">No Projects</h3>
          <p className="text-sky-500 text-center mt-2">Coming Soon</p>
        </div>
      </div>
    );
  }

  const href = slides[index]?.caseStudy?.slug ? `/case-studies/${slides[index].caseStudy.slug}` : '/case-studies';

  return (
    <div className="relative w-full h-full" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <AnimatePresence>
        {slides.map((slide, i) => {
          const offset = i - index;
          if (Math.abs(offset) > 1) return null;

          const imgSrc = slide.phoneMockup || slide.bgImage;
          const isActive = i === index;

          return (
            <motion.div
              key={slide.id ?? `${slide.title}-${i}`}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1 : 0.95,
                rotateY: isActive ? 0 : offset * 8,
                zIndex: isActive ? 10 : 5,
                x: offset * 30,
              }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute inset-0"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              <Link href={isActive ? href : '#'} onClick={(e) => !isActive && e.preventDefault()}>
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-2xl"></div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-white border border-sky-200 rounded-2xl transform rotate-3"></div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 transform transition-all duration-300 hover:rotate-1 hover:scale-105">
                  <div className="relative w-full h-48 sm:h-56 md:h-64 mb-4">
                    <Image
                      src={imgSrc}
                      alt={slide.title || 'Project'}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 90vw, 400px"
                      priority={i === index}
                    />
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center"
                    >
                      <h3 className="text-sky-800 text-lg sm:text-xl font-bold">{slide.title}</h3>
                      <p className="text-sky-600 text-xs sm:text-sm mt-2 line-clamp-2">
                        {slide.category || tabLabel(type)}
                      </p>
                    </motion.div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all duration-300 ${i === index ? 'w-5 h-1.5 bg-sky-800' : 'w-1.5 h-1.5 bg-sky-300 hover:bg-sky-500'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// MAIN PORTFOLIO SLIDER
export default function PortfolioSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeType = typeFromIndex(activeSlide);

  const [projectsByType, setProjectsByType] = useState({ app: [], web: [], digital: [] });
  const [statsByType, setStatsByType] = useState({ app: null, web: null, digital: null });
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      id: 1,
      type: 'app',
      title: 'Mobile App Development',
      description:
        'We transform your vision into powerful mobile experiences. From concept to deployment, our expert team builds native iOS, Android, and cross-platform apps using React Native, Flutter, and Swift that users love.',
      color: 'from-sky-600 to-sky-400',
      project: '400+',
      clients: '350+',
      countries: '50+',
    },
  ];




  useEffect(() => {
    let alive = true;

    async function load(type) {
      try {
        const res = await fetch(`/api/public/portfolio?type=${type}&take=50`);
        const data = await res.json();
        const arr = Array.isArray(data?.projects) ? data.projects : [];

        return {
          projects: arr.map((p) => ({ ...p, type: (p?.type || type).toLowerCase() })),
          stats: data?.stats || null,
        };
      } catch {
        return { projects: [], stats: null };
      }
    }

    Promise.all([load('app'), load('web'), load('digital')])
      .then(([appData, webData, digitalData]) => {
        if (!alive) return;

        setProjectsByType({
          app: appData.projects,
          web: webData.projects,
          digital: digitalData.projects,
        });

        setStatsByType({
          app: appData.stats,
          web: webData.stats,
          digital: digitalData.stats,
        });

        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  const allActiveItems = projectsByType[activeType] || [];
  const currentStats = statsByType?.[activeType] || null;
  const portfolioHref = `/portfolio?tab=${activeType}`;

  const currentSlide = slides[activeSlide];

  // ✅ STATIC (from slides)
  const staticStats = [
    { label: 'Projects', value: currentSlide.project || '0' },
    { label: 'Clients', value: currentSlide.clients || '0' },
    { label: 'Countries', value: currentSlide.countries || '0' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-white via-sky-50 to-sky-100 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900"
          >
            Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
              Portfolio
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our work across different domains. Click the categories below to explore.
          </motion.p>
        </div>

        {/* MAIN CARD */}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* LEFT CONTENT */}
              <div className="p-6 sm:p-8 lg:p-10 order-2 md:order-1">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 mb-2 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-sky-600"></span>
                    Portfolio Category
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-sky-800">{currentSlide.title}</h2>

                  <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{currentSlide.description}</p>

                  {/* STATIC STATS */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
                    {loading ? (
                      [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-100 p-3 sm:p-4 rounded-xl text-center animate-pulse">
                          <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded"></div>
                        </div>
                      ))
                    ) : (
                      staticStats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          className="bg-gradient-to-br from-sky-50 to-blue-50 p-3 sm:p-4 rounded-xl text-center shadow-sm border border-sky-100 hover:shadow-md transition-shadow"
                        >
                          <div className="text-lg sm:text-2xl font-bold text-sky-700">{stat.value}</div>
                          <div className="text-[11px] sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* ✅ EXTRA INFO BELOW STATS - FROM API */}
                  {!loading && currentStats && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-2 mb-6 border border-sky-100"
                    >
                      {/* Top Platforms */}
                      {currentStats?.topPlatforms?.length > 0 && (
                        <div className="mb-3 hidden">
                          <div className="flex items-center gap-2 mb-2">
                            <FaMobileAlt className="text-sky-600 text-sm" />
                            <p className="text-xs font-semibold text-gray-700">Top Platforms:</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {currentStats.topPlatforms.map((platform, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 bg-white rounded-full text-[10px] font-medium text-sky-700 border border-sky-200"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Top Technologies */}
                      {currentStats?.topTech?.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2 hidden">
                            <FaCode className="text-sky-600 text-sm" />
                            <p className="text-xs font-semibold text-gray-700">Technologies:</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {currentStats.topTech.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 bg-white rounded-full text-[10px] font-medium text-gray-700 border border-gray-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Action Button */}
                  <Link
                    href={portfolioHref}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 text-white text-sm font-semibold hover:from-sky-700 hover:to-sky-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Explore All Projects
                    <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* RIGHT VISUAL CAROUSEL */}
              <div className="p-6 sm:p-8 flex items-center justify-center order-1 md:order-2 bg-white">
                <div className="w-full max-w-md h-[320px] sm:h-[380px] md:h-[420px]">
                  <RightVisualCarousel items={allActiveItems} type={activeType} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'bg-sky-600 w-8' : 'bg-gray-300 w-2.5'
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
