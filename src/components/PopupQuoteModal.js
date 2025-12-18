// app/(public)/components/navbar/PopupQuoteModal.jsx
"use client";

import { useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import InquiryForm from "@/components/public/InquiryForm";

const PopupQuoteModal = ({ open, onClose }) => {
  // lock body scroll when modal open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      {/* container: max height, internal scroll only */}
      <div className="relative w-full max-w-5xl bg-gradient-to-tr from-sky-100 via-sky-50 to-white rounded-2xl shadow-2xl overflow-hidden max-h-[75vh] md:max-h-[90vh] hide-scrollbar flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close quote form"
        >
          <FaTimes className="text-slate-600 hover:text-red-500 text-lg" />
        </button>

        <div className="flex flex-col lg:flex-row h-full overflow-hidden hide-scrollbar">
          {/* Left column – info / trust */}
          <div className="hidden lg:flex w-full lg:w-2/5 text-slate-100 p-7 flex-col border-r border-slate-100 overflow-y-auto hide-scrollbar">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-sky-600">
                Get a quick estimate
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-sky-800">
                Before you close this, get clarity.
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                In one short conversation, we can help you understand effort,
                cost, and timelines for your next digital initiative.
              </p>
            </div>

            <div className="mb-7">
              <h3 className="text-sm font-semibold text-sky-700 mb-3">
                What you get for free:
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li className="flex items-start">
                  <FaCheck className="mt-1 mr-2 text-emerald-500" />
                  <span>High‑level project roadmap with key milestones.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="mt-1 mr-2 text-emerald-500" />
                  <span>
                    Ballpark budget and team sizing based on your scope.
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="mt-1 mr-2 text-emerald-500" />
                  <span>
                    Tech‑stack and architecture suggestions tailored to your
                    business.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-7 space-y-2 text-sm">
              <h4 className="text-sm font-semibold text-sky-700">
                Prefer to talk directly?
              </h4>
              <p className="text-slate-500">Our consultants are just a call away.</p>
              <p className="text-sm font-semibold text-sky-700">
                +91‑7428750870
              </p>
              <p className="text-[13px] text-slate-500">
                MON–FRI · 10:00 AM – 7:00 PM IST
              </p>
              <p className="text-[13px] text-slate-500">
                H61, Block H, Sector 63, Noida, Uttar Pradesh 201301
              </p>
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <p className="text-sm font-semibold text-sky-700">
                  sales@softkingo.com
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 text-[11px] text-slate-500 border-t border-slate-100 ">
              <p>Trusted by startups and enterprises across 30+ countries.</p>
              <p>5+ years of building custom products and engineering teams.</p>
            </div>
          </div>

          {/* Right column – form (scrollable) */}
          <div className="w-full lg:w-3/5 p-5 sm:p-6 lg:p-7 overflow-y-auto hide-scrollbar">
            {/* <h3 className="text-sm sm:text-base font-semibold text-[#0B3250] mb-4 text-center">
              Share a few details and we usually respond within{" "}
              <span className="text-sky-600 font-semibold">30 minutes</span>.
            </h3> */}

            <InquiryForm
              //   showHeader={false}
              title="Get a quick estimate"
              subtitle="Share a few details and we usually respond within 30 minutes"
              tagline="Get A Quot"
              submitLabel="Submit & Get A Quote"
              primaryColor="sky"
              formType = "get In touch"
              formKey = "popup-inquiry"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupQuoteModal;
