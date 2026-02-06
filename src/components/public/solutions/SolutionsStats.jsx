"use client";
import React from 'react';

export default function SolutionsStats({ data }) {
  if (!data?.items) return null;

  return (
    <section className="bg-sky-400 relative -top-20 py-10 rounded-tr-[4rem] lg:w[90%] mr-[10%] z-20 shadow-xl shadow-sky-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-sky-100/40">
          {data.items.map((stat, index) => (
            <div key={index} className="px-4">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-1">{stat.value}</h3>
              <p className="text-sky-50 text-xs md:text-sm font-bold uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}