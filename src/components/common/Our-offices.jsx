"use client";
import React from "react";
import Image from "next/image";

// OfficesMap component (polished UI)
// Usage: <OfficesMap offices={offices} />
// Assets expected:
//  - /public/images/world-dots.png (decorative dotted world map)
//  - /public/images/flags/{india.png,usa.png,uk.png,uae.png,canada.png}

export default function OfficesMap({ offices }) {
  const sample = offices || [
    {
      id: 1,
      country: "INDIA",
      flag: "/images/flags/india.png",
      hours: "MON–FRI 10 AM – 7 PM",
      address: "B148, Block B, Sector 63, Noida, Uttar Pradesh 201301",
      email: "sales@softkingo.com",
      marker: { left: "66%", top: "52%" },
    },
    {
      id: 2,
      country: "INDIA",
      flag: "/images/flags/india.png",
      hours: "MON–FRI 10 AM – 7 PM",
      address: "New Delhi, India - 110096",
      email: "sales@softkingo.com",
      marker: { left: "62%", top: "48%" },
    },
    {
      id: 3,
      country: "USA",
      flag: "/images/flags/usa.png",
      hours: "MON–FRI 10 AM – 7 PM",
      address: "Bell Road, Scottsdale, Arizona 85260",
      email: "sales@softkingo.com",
      marker: { left: "20%", top: "36%" },
    },
    {
      id: 4,
      country: "UK",
      flag: "/images/flags/uk.png",
      hours: "MON–FRI 10 AM – 7 PM",
      address: "816A, Stockport Road, Manchester, M18 8BS",
      email: "sales@softkingo.com",
      marker: { left: "26%", top: "28%" },
    },
    {
      id: 5,
      country: "UAE",
      flag: "/images/flags/uae.png",
      hours: "MON–FRI 10 AM – 7 PM",
      address: "Office 2504, WIS Bay Tower, Business Bay, Dubai",
      email: "sales@softkingo.com",
      marker: { left: "74%", top: "46%" },
    },
    {
      id: 6,
      country: "CANADA",
      flag: "/images/flags/cnd.png",
      hours: "MON–FRI 10 AM – 7 PM",
      address: "7070 Farrell Rd SE Calgary, AB T2H 0P2 Canada",
      email: "sales@softkingo.com",
      marker: { left: "28%", top: "62%" },
    },
  ];

  const items = offices || sample;

  return (
    <section className="relative bg-gradient-to-b from-[#000]  to-[#28AFDF] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">Our Offices</h2>
        <p className="text-center max-w-2xl mx-auto mt-3 text-sm text-slate-300">
          With international offices, we deliver outstanding IT services and customized digital solutions worldwide.
        </p>

        {/* Map */}
        <div className="relative mt-10 rounded-lg overflow-hidden">
          <div className="relative h-[360px] md:h-[440px] lg:h-[740px] w-full bg-transparent">
            <Image src="/images/flags/world.png" alt="dotted world" fill style={{ objectFit: '' }} priority className="bg-transperent" />

            {/* subtle gradient overlay to get the teal look */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20to-black/40" />

            {/* markers */}
            {items.map((o) => (
              <div
                key={o.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: o.marker.left, top: o.marker.top }}
              >
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-sky-500/90 flex items-center justify-center shadow-2xl ring-4 ring-white/10 transition-transform duration-200 group-hover:scale-110">
                    <span className="w-3 h-3 rounded-full bg-white/90" />
                  </div>

                  {/* tooltip on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-16 hidden group-hover:block">
                    <div className="bg-white/8 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg text-xs text-white shadow-lg w-40 text-center">
                      <div className="font-semibold text-sm">{o.country}</div>
                      <div className="mt-1 text-[11px] text-slate-200">{o.address.split(',')[0]}</div>
                    </div>
                    <div className="w-3 h-3 bg-transparent mx-auto -mt-1 rotate-45 border-l border-t border-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((o) => (
            <article
              key={o.id}
              className="relative overflow-hidden rounded-3xl p-6 shadow-3xl  bg-gradient-to-br from-[#28AFDF] to-[#06465D] hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 ring-2 ring-white/6">
                  {o.flag ? (
                    <Image src={o.flag} alt={`${o.country} flag`} width={28} height={20} />
                  ) : (
                    <div className="text-sm">🏳️</div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg tracking-wide">{o.country}</h3>
                  <p className="mt-2 text-xs text-slate-200">{o.hours}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-100 leading-relaxed">{o.address}</p>

              <a href={`mailto:${o.email}`} className="inline-block mt-4 text-sm font-medium text-white/90 underline">
                {o.email}
              </a>

              {/* subtle decorative circle */}
              <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/4 blur-3xl pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
