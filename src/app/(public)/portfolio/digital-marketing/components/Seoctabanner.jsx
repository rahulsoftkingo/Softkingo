"use client";

import React, { useState } from "react";
import { Rocket, ArrowRight } from "lucide-react";
import PopupQuoteModal from "@/components/PopupQuoteModal";


export default function SeoCtaBanner() {

  const [showModal, setShowModal] = useState(false);
  return (
    <section className="py-8 md:pb-10 md:pt-0 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative rounded-xl md:rounded-2xl bg-gradient-to-r from-[#050b24] to-[#0b1440] overflow-hidden px-5 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          {/* Decorative glow */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-5 flex-1 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 min-w-12 sm:min-w-14 rounded-full bg-sky-500/10 flex items-center justify-center">
              <Rocket size={24} className="text-sky-400" />
            </div>

            <div>
              <h3 className="text-white text-base sm:text-xl font-bold">
                Want Similar SEO Results for Your Business?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
                Let&apos;s build a powerful SEO strategy that drives traffic, leads and growth.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 transition-colors text-white text-sm font-bold px-5 sm:px-6 py-3 rounded-full">
            Start Your SEO Project
            <ArrowRight size={16} />
          </button>
        </div>
        <PopupQuoteModal
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </section>
  );
}