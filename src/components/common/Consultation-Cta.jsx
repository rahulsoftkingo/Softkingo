"use client";
import React, { useState } from "react";
import Image from "next/image";
import PopupQuoteModal from "../PopupQuoteModal";

// ConsultationCTA
// Props:
//  - title, subtitle, buttonLabel, href, imageSrc
// Example: <ConsultationCTA imageSrc="/images/consultant.png" href="/contact" />

export default function ConsultationCTA({
  title = "Book A FREE Consultation With Us",
  subtitle = "Share your project idea and we’ll provide a free consultation on how we will turn it into reality and an amazing digital product.",
  buttonLabel = "Book a Free Demo",
  href = "/contact",
  imageSrc = "/images/cta/cta-img.png",
  theme = "dark", // "dark" or "white"
}) {
  const [showModal, setShowModal] = useState(false);

  const isWhite = theme === "white";

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className={`relative rounded-[28px]  ${isWhite
          ? "bg-white border border-slate-100 shadow-xl shadow-slate-200/50"
          : "bg-gradient-to-br from-[#28AFDF] to-[#06465D]"
          }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 p-8 md:p-12">
            {/* Left image - overlaps a bit */}
            <div className={`md:col-span-1 flex items-center ${isWhite ? "justify-center" : "justify-start"} -ml-4 md:-ml-0`}>
              <div className="hidden md:block md:mr-4" />
              <div className=" h-full w-full max-h-18 md:max-h-2">
                <Image
                  src={imageSrc}
                  alt="consultant"
                  width={500}
                  height={500}
                  className={`relative object-contain ${isWhite
                    ? "-top-30 h-50 md:-top-62  md:h-98 scale-110"
                    : "relative -bottom-4 md:absolute md:-bottom-8 md:left-0 md:w-80 md:h-98  scale-110 md:scale-125"
                    }`}
                />
              </div>
            </div>

            {/* Content */}
            <div className={`md:col-span-2 ${isWhite ? "text-slate-900" : "text-white"}`}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight">{title}</h2>
              <div
                className={`mt-3 text-sm md:text-base max-w-2xl leading-relaxed rich-text ${isWhite ? "text-slate-500" : "text-white/90"}`}
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />

              <div className="mt-8">
                <button
                  onClick={() => setShowModal(true)}
                  className={`inline-flex items-center gap-4 px-8 py-4 rounded-full font-bold shadow-2xl transition-all hover:-translate-y-1 active:scale-95 cursor-pointer z-20 ${isWhite
                    ? "bg-sky-600 text-white shadow-sky-200 hover:bg-sky-700"
                    : "bg-gradient-to-r from-sky-600 via-sky-600 to-sky-400 text-white shadow-sky-800"
                    }`}
                >
                  <span className={`inline-block w-3 h-3 rounded-full animate-pulse ${isWhite ? "bg-white" : "bg-sky-900/80"}`} />
                  {buttonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
