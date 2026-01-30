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
}) {
   const [showModal, setShowModal] = useState(false);
  
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="relative rounded-[28px] bg-gradient-to-br from-[#28AFDF] to-[#06465D]">
          {/* <div className="absolute inset-0 " /> */}

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 p-8 md:p-12">
            {/* Left image - overlaps a bit */}
            <div className=" md:col-span-1 flex items-center justify-start -ml-4 md:-ml-0">
              <div className="hidden md:block md:mr-4" />
              <div className=" h-full w-full max-h-18 md:max-h-2">
                <Image src={imageSrc} alt="consultant" width={500} height={500} className=" relative -top-20 left-1/3  w-36 h-42   md:-top-54 md:left-0   md:w-72 md:h-88  -translate-x-6 md:translate-x-0"/>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-2 text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">{title}</h2>
              <p className="mt-3 text-sm md:text-base text-white/90 max-w-2xl">{subtitle}</p>

              <div className="mt-6">
                <buttom
 onClick={() => setShowModal(true)}
                  href={href}
                  className="inline-flex items-center gap-4 px-6 py-3 rounded-full font-semibold shadow-2xl shadow-sky-800 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-400 text-white transition-transform hover:-translate-y-0.5 cursor-pointer z-20"
                >
                  <span className="inline-block w-3 h-3 rounded-full bg-sky-900/80" />
                  {buttonLabel}
                </buttom>
              </div>
            </div>
          </div>

          {/* decorative bottom fade */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/6 to-transparent" /> */}
        </div>
      </div>
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
