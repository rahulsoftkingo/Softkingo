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

  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
  //     {/* Container with max height and scroll */}
  //     <div className=" overflow-hidden max-h[90vh] " >
  //       <div className=" w-full max-w-7xl bgwhite bg-gradient-to-b from-sky-100 to-white  rounded-2xl shadow-2xl  flex flex-col overflow-hidden h-full scroll-auto">
  //         {/* Close button */}
  //         <button
  //           onClick={onClose}
  //           className="absolute top-2 right-2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-red-50 transition-colors shadow-lg"
  //           aria-label="Close quote form"
  //         >
  //           <FaTimes className="text-slate-600 hover:text-red-500 text-xl" />
  //         </button>

  //         <div className="flex flex-col lg:flex-row h-full overflow-hidden">
  //           {/* Left column – Softkingo Info Section */}
  //           <div className="hidden lg:flex w-full lg:w-3/6 bg-gradient-to-br from-sky-50 via-white to-white p-8 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-50">
  //             {/* // Custom content */}
  //             <TechAheadSection

  //               email="custom@email.com"
  //               phone="+1234567890"
  //             />
  //           </div>

  //           {/* Right column – Inquiry Form */}
  //           <div className="w-full lg:w-3/6 bg-white p-6 sm:p-8 lg:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
  //             <InquiryForm
  //               title="Get a Quick Estimate"
  //               subtitle="Share a few details and we usually respond within 30 minutes"
  //               tagline="Get A Quote"
  //               submitLabel="Submit & Get A Quote"
  //               primaryColor="sky"
  //               formType="get In touch"
  //               formKey="popup-inquiry"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );


  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm h-screen   overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/80 scrollbar-track-gray-100/50">
    {/* Single scroll container - PURE CARD SCROLL */}
    <div className="relative w-full max-w-7xl max-h-full h-fit  ">
      <div className="min-h-fit rounded-2xl  bg-gradient-to-b from-sky-100 to-white shadow-2xl ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-20 p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-red-50 transition-all duration-200 shadow-xl "
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
          <div className="flex-1 lg:w-1/2 bgwhite p-6 sm:p-8 lg:p-10 ">
            <InquiryForm
              title="Get a Quick Estimate"
              subtitle="Share a few details and we usually respond within 30 minutes"
              tagline="Get A Quote"
              submitLabel="Submit & Get A Quote"
              primaryColor="sky"
              formType="get In touch"
              formKey="popup-inquiry"
            />
              {/* <div className=" h-8"></div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);


};

export default PopupQuoteModal;
