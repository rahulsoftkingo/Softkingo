"use client";

import React from "react";
import { Quote, ClipboardList, ArrowRight } from "lucide-react";

export default function PPCTestimonialRow() {
  return (
    <section className="bg-white py-6 md:py-8 md:pb-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* LEFT: What Our Client Says */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Quote size={20} className="text-sky-600 fill-sky-600" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  What Our Client Says
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Softkingo's PPC strategy delivered outstanding results. We
                received 4X more leads and our cost per lead dropped
                significantly. Their team is proactive, data-driven and
                results-focused.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm flex-shrink-0">
                  RM
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    Rohit Malhotra
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">
                    Marketing Head, UrbanDrive
                  </p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold tracking-wide text-slate-900 leading-none">
                  URBAN<span className="font-light">DRIVE</span>
                </p>
                <p className="text-[9px] text-slate-400 font-medium tracking-widest mt-0.5">
                  SELF DRIVE CARS
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Next Steps */}
          <div className="rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500">
                  <ClipboardList size={16} className="text-white" />
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Next Steps
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Want similar results for your business? Let's create a
                high-performing PPC strategy that maximizes your ROI.
              </p>
            </div>

            <button className="mt-6 w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 text-white text-xs sm:text-sm font-semibold hover:bg-sky-500 transition-colors">
              Get Free Consultation <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}