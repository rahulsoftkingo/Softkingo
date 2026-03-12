"use client";
import React, { useState } from "react";
import { Plus, Minus } from 'lucide-react';

export default function BlogFaq({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="py-10 border-t border-slate-100 mt-10 faq-section">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-900">
            F<span className="text-sky-500">AQ</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((it, i) => {
            const isOpen = i === openIndex;
            return (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white border-sky-100 shadow-sm" : "bg-slate-50/50 border-slate-100 hover:border-sky-100"
                  }`}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-transparent transition-colors"
                >
                  <h3 className={`text-base  font-semibold flex-1 ${isOpen ? "text-sky-700" : "text-slate-800"}`}>
                    {it.q}
                  </h3>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-sky-500 text-white rotate-180" : "bg-slate-200 text-slate-500"
                    }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm  text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                      {it.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
