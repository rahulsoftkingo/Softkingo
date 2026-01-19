// app/(public)/gallery/GalleryClient.jsx

'use client';

import Image from 'next/image';
import CommonTitle from '@/components/ui/CommonTitle';

export default function GalleryClient({ sections }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <nav className="flex items-center gap-2 text-sm text-sky-200/80 mb-8">
            <a
              href="/"
              className="hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </a>
            <span className="text-sky-400">›</span>
            <span className="text-cyan-300 font-medium">Gallery</span>
          </nav>

          <div className="text-left max-w-3xl ">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Softkingo Gallery
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Inside{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Softkingo
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-sky-100/90 leading-relaxed mb-8 ">
              A visual journey through our spaces, teams, client collaborations,
              and culture that powers innovation from discovery to launch.
            </p>

            <div className="flex flex-wrap justify-start gap-3 pt-4">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  {sec.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.1)_1px,transparent_0)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20 lg:space-y-28">
          {sections.map((section, sectionIndex) => {
            if (!section.images?.length) return null;

            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-20"
              >

                <CommonTitle
                  pill={section.pill}
                  title={section.label}
                  gradientText="Gallery"
                  subtitle={section.description}
                />
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
                  {section.images.map((img, index) => {
                    let colSpan = 'md:col-span-3 lg:col-span-4';
                    let aspect = 'aspect-[4/3]';

                    if (index === 0) {
                      colSpan = 'md:col-span-6 lg:col-span-8';
                      aspect = 'aspect-[16/9]';
                    } else if (index === 1) {
                      colSpan = 'md:col-span-6 lg:col-span-4';
                    } else if (index === 2) {
                      colSpan = 'md:col-span-3 lg:col-span-5';
                    } else if (index === 3) {
                      colSpan = 'md:col-span-3 lg:col-span-3';
                      aspect = 'aspect-[1/1]';
                    } else if (index === 4) {
                      colSpan = 'md:col-span-3 lg:col-span-4';
                      aspect = 'aspect-[3/4]';
                    } else if (index === 5) {
                      colSpan = 'md:col-span-3 lg:col-span-5';
                      aspect = 'aspect-[16/9]';
                    }

                    return (
                      <figure
                        key={`${img.src}-${index}`}
                        className={`
                          relative overflow-hidden rounded-2xl lg:rounded-3xl
                          bg-slate-200 group cursor-pointer
                          transform hover:scale-[1.02] transition-all duration-500
                          ${colSpan} ${aspect}
                        `}
                        style={{
                          animationDelay: `${sectionIndex * 200 + index * 100}ms`,
                          animationFillMode: 'both',
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <figcaption className="absolute inset-x-0 bottom-0 p-4 lg:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex justify-between items-end">
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm lg:text-base leading-tight line-clamp-2">
                                {img.alt}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                                <span className="text-cyan-200 text-xs font-medium">
                                  {section.pill}
                                </span>
                              </div>
                            </div>
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ml-4 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                              <svg
                                className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </figcaption>

                        <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-2xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-sky-500/20 to-transparent rounded-tl-2xl" />
                      </figure>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join the companies that trust Softkingo to bring their digital
            products to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Your Project
            </a>
            <a
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
