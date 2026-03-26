"use client";
import React from 'react';

export default function SolutionsStats({ data }) {
  if (!data?.items) return null;

  return (
    <section className="bg-sky-400 relative -top-20 py-10 rounded-tr-[4rem] lg:w-[90%] mr-[10%] z-20 shadow-xl shadow-sky-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex md:grid md:grid-cols-4 overflow-x-auto gap-4 md:gap-8 text-center divide-x divide-sky-100/40 pb-2 md:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {data.items.map((stat, index) => (
            <div
              key={index}
              className="px-4 flex-shrink-0 min-w-[140px] md:min-w-0 md:flex-shrink snap-center"
            >
              <h3 className="text-2xl md:text-5xl font-black text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sky-50 text-[10px] md:text-sm font-bold uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}