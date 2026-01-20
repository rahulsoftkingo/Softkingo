"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const items =
    faqs ||
    [
      {
        id: 1,
        q: "Where is Softkingo Technologies located?",
        a:
          "New Ashok Nagar, New Delhi - 110096 & H61, Block H, Sector 63, Noida - 201301, India.",
      },
      { id: 2, q: "What services does Softkingo Technologies provide?", a: "Full-stack web & mobile app development, UI/UX design, cloud infrastructure (AWS/GCP), DevOps, and dedicated development teams." },
      { id: 3,  q: "How strong is the company team?",
        a: "200+ developers with 4-10+ years experience across React, Node.js, Flutter, Next.js, AWS, and full-stack expertise." },
      { id: 4,  q: "What is the best way to communicate with your expert advisor or sales team?",
        a: "Email: info@softkingo.com or call +91-7428750870. Average response: under 2 hours."},
      { id: 5,q: "Who owns the legal rights to the technology developed by Softkingo?",
        a: "You own 100% IP rights. Full source code ownership transfers upon final payment."},
      { id: 6,  q: "How do you make sure your IP address is secure?",
        a: "Enterprise-grade encryption (AES-256), GDPR compliant, SOC2 certified servers, NDAs signed with all developers."},
      { id: 7,  q: "Why choose Softkingo Technologies for other mobile application development companies?",
        a: "98% client retention, 4.9/5 Clutch rating, 2-week risk-free trial, dedicated account manager, post-launch support included."},
    ];

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center mb-8">Questions? Look Here</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Accordion (span 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it, i) => {
              const isOpen = i === openIndex;
              return (
                <div
                  key={it.id}
                  className={`border rounded-xl overflow-hidden shadow-sm transition-transform duration-150 ${
                    isOpen ? "scale-[1.0]" : ""
                  }`}
                >
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${it.id}`}
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                        {/* icon: + or - */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-slate-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          {isOpen ? (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v3a1 1 0 11-2 0V9z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 012 0v3a1 1 0 11-2 0V11z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900">{it.q}</h3>
                    </div>

                    <div className="text-slate-400">{isOpen ? null : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"/></svg>}</div>
                  </button>

                  <div
                    id={`faq-panel-${it.id}`}
                    className={`px-6 pb-6 text-sm text-slate-700 bg-white transition-all duration-300 ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    <p>{it.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Contact card */}
          <aside className="w-full">
            <div className="rounded-2xl bg-gradient-to-br from-[#28AFDF] to-[#06465D] p-8 shadow-lg">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-white/30">
                  {/* chat bubble icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.865 9.865 0 01-4-.9L3 20l1.1-3.9A9.865 9.865 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>

              <h4 className="text-white font-semibold text-center mt-6">You’ve Different Question?</h4>
              <p className="mt-3 text-sm text-white/90 text-center">Our team will answer all your questions — we ensure a quick response.</p>

              <div className="mt-6 flex justify-center">
                <a href="/contact" className="inline-flex items-center gap-3 bg-white text-slate-900 px-5 py-2 rounded-full font-medium shadow-sm">
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
