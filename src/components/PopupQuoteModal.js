// app/(public)/components/navbar/PopupQuoteModal.jsx
"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import InquiryForm from "@/components/public/InquiryForm";
import TechAheadSection from "./public/TechAheadSection";

const PopupQuoteModal = ({ open, onClose }) => {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      {/* Container with max height and scroll */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-red-50 transition-colors shadow-lg"
          aria-label="Close quote form"
        >
          <FaTimes className="text-slate-600 hover:text-red-500 text-xl" />
        </button>

        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Left column – Softkingo Info Section */}
          <div className="hidden lg:flex w-full lg:w-3/6 bg-gradient-to-br from-sky-50 via-white to-white p-8 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-50">
           {/* // Custom content */}
<TechAheadSection 
  
  email="custom@email.com"
  phone="+1234567890"
/>
          </div>

          {/* Right column – Inquiry Form */}
          <div className="w-full lg:w-3/6 bg-white p-6 sm:p-8 lg:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
            <InquiryForm
              title="Get a Quick Estimate"
              subtitle="Share a few details and we usually respond within 30 minutes"
              tagline="Get A Quote"
              submitLabel="Submit & Get A Quote"
              primaryColor="sky"
              formType="get In touch"
              formKey="popup-inquiry"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupQuoteModal;
