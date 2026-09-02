"use client";
import React from 'react';

const defaultData = {
  heading: "Trusted by Businesses Worldwide",
  items: [
    { label: "LoveLocal" },
    { label: "Traveloka" },
    { label: "ODA CLASS" },
    { label: "Eventbrite" },
    { label: "Moglix" },
    { label: "Potafo" },
  ],
};

export default function TrustedBySection({ data = defaultData }) {
  data= defaultData;
  const sectionData = data ;


  if (!sectionData?.items) return null;

  return (
    <section className="bg-sky-400 relative -top-20 py-4 rounded-[2rem] w-[85%] max-w-6xl mx-auto z-20 shadow-xl shadow-sky-100">
      <div className="max-w-7xl mx-auto px-6">
        {sectionData.heading && (
          <h2 className="text-center text-white text-xl md:text-2xl font-bold mb-6">
            {sectionData.heading}
          </h2>
        )}

        <div className="flex md:justify-center md:flex-wrap overflow-x-auto gap-8 md:gap-12 items-center pb-2 md:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {sectionData.items.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
            >
              <span className="text-white text-lg md:text-2xl font-bold tracking-tight whitespace-nowrap">
                {brand.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}