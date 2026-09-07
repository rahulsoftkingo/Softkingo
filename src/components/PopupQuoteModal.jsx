// app/(public)/components/navbar/PopupQuoteModal.jsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import InquiryForm from "@/components/public/InquiryForm";
import TechAheadSection from "./public/TechAheadSection";

const PopupQuoteModal = ({ open, onClose, isAutoTrigger, type }) => {
  // Only render the portal target after mount (avoids SSR "document is not defined")
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  if (!open || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/80 scrollbar-track-gray-100/50">
      {/* Single scroll container - PURE CARD SCROLL */}
      <div className="relative w-full max-w-7xl max-h-full h-fit">
        <div className="min-h-fit rounded-2xl bg-gradient-to-b from-sky-100 to-white shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-20 p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-red-50 transition-all duration-200 shadow-xl"
            aria-label="Close quote form"
          >
            <FaTimes className="text-slate-700 hover:text-red-500 text-xl" />
          </button>

          <div className="flex flex-col lg:flex-row h-fit">
            {/* Left column - NO SCROLL */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-brfrom-sky-50 via-white to-white p-8">
              <TechAheadSection
                title="Partner for Digital Innovation"
                email="custom@email.com"
                phone="+1234567890"
              />
            </div>

            {/* Right column - NO SCROLL */}
            <div className="flex-1 lg:w-1/2 bgwhite p-6 sm:p-8 lg:p-10">
              <InquiryForm
                title={isAutoTrigger ? "Need a Free AI Consultation?" : "Get a Quick Estimate"}
                subtitle={
                  isAutoTrigger
                    ? "Our experts are ready to help you scale. Share your details below."
                    : "Share a few details and we usually respond within 30 minutes"
                }
                tagline={isAutoTrigger ? "Exclusive Offer" : "Get A Quote"}
                submitLabel="Submit & Get A Quote"
                primaryColor="sky"
                type={type}
                formType={isAutoTrigger ? "Auto Inquiry" : "get In touch"}
                formKey={isAutoTrigger ? "auto-popup-modal" : "popup-inquiry"}
              />
              <div className="h-16 lg:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render outside the React tree entirely, directly under <body>,
  // so no ancestor's transform / overflow / z-index can trap or clip it.
  return createPortal(modalContent, document.body);
};

export default PopupQuoteModal;