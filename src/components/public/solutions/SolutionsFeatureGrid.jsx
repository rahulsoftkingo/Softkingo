"use client";
import React from 'react';
import CommonTitle from '@/components/ui/CommonTitle';
import Image from 'next/image';

export default function SolutionsFeatureGrid({ data }) {
  if (!data) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 ">
        <CommonTitle
          align="center"
          title={data.title}
          gradientText={data.highlight}
          subtitle={data.subtitle}
        />

        {/* Updated Grid: 3 Cols max */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {data.items?.map((item, idx) => (
            // 1. Perspective Container
            <div key={idx} className="group perspective-1000 h-96 w-full cursor-pointer">

              {/* 2. Inner Card (Rotates) */}
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xl">

                {/* --- FRONT SIDE (Image + Title) --- */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] rounded-3xl overflow-hidden bg-slate-900">
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
                    <h4 className="text-white font-black text-2xl leading-normal border-l-4 border-sky-500 pl-4">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* --- BACK SIDE (Description) --- */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-sky-600 rounded-3xl p-8 flex flex-col justify-center items-center text-center border-4 border-white/10">
                  {/* Repeating Title on Back for Context */}
                  <h4 className="text-white font-bold text-xl mb-6">{item.title}</h4>

                  <div className="w-16 h-1 bg-white/30 rounded-full mb-6"></div>

                  <p 
                    className="text-sky-50 text-base leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: item.description || "We provide top-notch development services tailored to your business needs." }}
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