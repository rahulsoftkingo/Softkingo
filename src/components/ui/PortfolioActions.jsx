// components/ui/PortfolioActions.jsx
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PopupQuoteModal from "@/components/PopupQuoteModal";

export default function PortfolioActions() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center ml-6 gap-2 px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-200 hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        Build your mobile App
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}