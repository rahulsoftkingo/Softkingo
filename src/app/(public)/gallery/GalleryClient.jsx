'use client';

import { useState } from 'react';
import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';
import { motion, AnimatePresence } from 'framer-motion';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import FAQAccordion from '@/components/common/Faqaccordion';

export default function GalleryClient({ sections }) {
  const [activeTab, setActiveTab] = useState(sections[0]?.id || 'office');

  const activeSection = sections.find(s => s.id === activeTab) || sections[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-20">
      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <nav className="flex items-center gap-2 text-sm text-sky-200/80 mb-8">
            <a href="/" className="hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </a>
            <span className="text-sky-400">›</span>
            <span className="text-cyan-300 font-medium">Gallery</span>
          </nav>

          <div className="text-left max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Softkingo Visuals
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-normal mb-6"
            >
              Inside{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Softkingo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-sky-100/90 leading-relaxed"
            >
              Explore our world through a lens—capturing the passion, the process,
              and the people behind our digital excellence.
            </motion.p>
          </div>
        </div>
      </header>

      {/* TABS SELECTOR */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-8 items-center h-16 md:h-20 scroll-mt-20">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`relative h-full flex items-center gap-2 whitespace-nowrap text-sm md:text-base font-semibold transition-all duration-300 ${activeTab === sec.id ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {sec.label}
                {activeTab === sec.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-sky-600 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Active Section Header */}
              <div className="mb-12 md:mb-16">
                <CommonTitle
                  pill={activeSection?.pill}
                  title={activeSection?.label}
                  gradientText="Gallery"
                  subtitle={activeSection?.description}
                />
              </div>

              {activeSection?.images?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
                  {activeSection.images.map((img, index) => {
                    let colSpan = 'md:col-span-3 lg:col-span-4';
                    let aspect = 'aspect-[4/3]';

                    // Complex masonry-like logic for premium feel
                    if (index % 10 === 0) {
                      colSpan = 'md:col-span-6 lg:col-span-8';
                      aspect = 'aspect-[16/9]';
                    } else if (index % 10 === 3) {
                      colSpan = 'md:col-span-3 lg:col-span-5';
                    } else if (index % 10 === 4) {
                      colSpan = 'md:col-span-3 lg:col-span-3';
                      aspect = 'aspect-[1/1]';
                    } else if (index % 10 === 7) {
                      colSpan = 'md:col-span-3 lg:col-span-4';
                      aspect = 'aspect-[3/4]';
                    }

                    return (
                      <motion.figure
                        key={`${img.src}-${index}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={`
                          relative overflow-hidden rounded-2xl lg:rounded-3xl
                          bg-slate-200 group cursor-pointer
                          transform hover:scale-[1.02] transition-all duration-500
                          ${colSpan} ${aspect}
                        `}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <figcaption className="absolute inset-x-0 bottom-0 p-4 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="flex justify-between items-end">
                            <div className="flex-1">
                              <p className="text-white font-bold text-sm lg:text-base leading-normal">
                                {img.alt}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                  {activeSection.pill}
                                </span>
                              </div>
                            </div>
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                          </div>
                        </figcaption>
                      </motion.figure>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 font-medium">No images found in this category yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* FAQ SECTION */}
      <div className="mt-20">
        <FAQAccordion />
      </div>

      {/* CTA SECTION */}
      <div className="mt-20">
        <ConsultationCTA
          imageSrc="/images/cta/cta.png"
          href="/contact"
          title="Ready to Build Your Vision?"
          subtitle="Join the global brands and startups that trust Softkingo to build their digital future."
        />
      </div>
    </div>
  );
}
