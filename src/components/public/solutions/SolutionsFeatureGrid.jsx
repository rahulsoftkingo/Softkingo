"use client";
import React, { useState } from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';

export default function SolutionsFeatureGrid({ data }) {
  const [flippedIdx, setFlippedIdx] = useState(null);

  if (!data) return null;

  return (
    <section className="py-8 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <CommonTitle
          align="center"
          title={data.title}
          gradientText={data.highlight}
          subtitle={data.subtitle}
        />

        {/* 
          Mobile: horizontal scroll row with snap (scrollbar hidden)
          sm+: normal grid, no scroll
        */}
        <div
          className="
            mt-16
            flex sm:grid
            gap-8
            overflow-x-auto sm:overflow-visible
            snap-x snap-mandatory sm:snap-none
            pb-4 sm:pb-0
            -mx-6 px-6 sm:mx-0 sm:px-0
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            sm:grid-cols-2 lg:grid-cols-3
          "
        >
          {data.items?.map((item, idx) => (
            // 1. Perspective Container
            <div
              key={idx}
              onClick={() =>
                setFlippedIdx((prev) => (prev === idx ? null : idx))
              }
              className="
                group [perspective:1000px] h-96 cursor-pointer
                overflow-hidden rounded-3xl
                shrink-0 snap-center
                w-[85%] xs:w-[75%] sm:w-full
              "
            >
              {/* 2. Inner Card (Rotates) */}
              <div
                className={`
                  relative h-full w-full transition-all duration-700
                  [transform-style:preserve-3d]
                  sm:group-hover:[transform:rotateY(180deg)]
                  rounded-3xl shadow-xl
                  ${flippedIdx === idx ? "[transform:rotateY(180deg)]" : ""}
                `}
              >

                {/* --- FRONT SIDE (Image + Title) --- */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-3xl overflow-hidden bg-slate-900">
                  {/* Background Image */}
                  <Image
                    src={item.image || "/images/placeholder.png"}
                    alt={item.title || "Feature"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay (Darker at bottom for Title visibility) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-white font-black text-2xl leading-normal border-l-4 border-sky-500 pl-4 break-words">
                      {item.title || item.name || "Enterprise Feature"}
                    </h4>
                  </div>
                </div>

                {/* --- BACK SIDE (Description) --- */}
                <div
                  className="
                    absolute inset-0 h-full w-full
                    [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                    bg-sky-600 rounded-3xl
                    p-6 sm:p-8
                    flex flex-col
                    justify-start sm:justify-center
                    items-center text-center
                    border-4 border-white/10
                    overflow-y-auto sm:overflow-hidden
                  "
                >
                  {/* Repeating Title on Back for Context */}
                  {/* <h4 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6 break-words shrink-0">
                    {item.title || item.name || "Enterprise Feature"}
                  </h4> */}

                  {/* <div className="w-16 h-1 bg-white/30 rounded-full mb-4 sm:mb-6 shrink-0"></div> */}

                  <div
                    className="text-sky-50 text-sm sm:text-base leading-relaxed font-medium rich-text break-words w-full"
                    dangerouslySetInnerHTML={{
                      __html:
                        item.description ||
                        item.content ||
                        "Empowering your business with scalable, high-performance technology solutions designed for growth.",
                    }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}