
'use client';

import PopupQuoteModal from '@/components/PopupQuoteModal';
import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa";

const craftings = [
  {
    name: "350+",
    featurs: "Clients Worldwide",
    description: "Trusted by businesses across global markets."
  },

  {
    name: "400+",
    featurs: "Projects Delivered",
    description: "Successful digital solutions delivered across industries."
  },
  {
    name: "6+",
    featurs: "Years of Innovation	",
    description: "Proven experience in technology and digital growth."
  },
  {
    name: "100+",
    featurs: "Custom Solutions",
    description: "Built around specific business requirements."
  },
  {
    name: "220+",
    featurs: "Ideas Validated",
    description: "Ideas researched and refined for development."
  },
  {
    name: "96%",
    featurs: "Client Retention",
    description: "Clients continue working with us for reliable results."
  },
];

function Crafting() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white via-sky-50 to-sky-200 text-black py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HERO ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-10 items-center">

          {/* Left: Heading, Text & Button */}
          <div className="text-center lg:text-start">
            <h2 className="font-bold leading-normal mb-4 text-sky-900">
              <span className="block text-lg sm:text-xl md:text-2xl mb-2">
                We Are Your Technology Partners in
              </span>

              <span className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500 font-bold">
                DIGITAL INNOVATION
              </span>
            </h2>

            <p className="text-gray-600 md:text-sky-800 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Softkingo is a software development and digital marketing company helping businesses build reliable digital products and strengthen their online presence. Our certified experts combine innovation, precision and industry experience to deliver scalable mobile apps, websites, custom software, UI/UX design and digital marketing solutions that create measurable business impact.

              <span className="block mt-4">
                Rated 5.0 on Clutch, GoodFirms, DesignRush and Trustpilot, Softkingo was also recognized as a <b> Top Mobile App Development Company in India 2025 </b> by TechBehemoths.
              </span>
            </p>


            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 cursor-pointer inline-flex items-center"
            >
              Get Estimation <FaArrowRight className="ml-2" />
            </button>
          </div>

          {/* Right: Showcase Image */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-sky-200 via-sky-100 to-transparent rounded-3xl blur-2xl opacity-70 -z-10" />

              <img
                src="/images/crafting/softkingo-office.webp"
                alt="Softkingo project showcase"
                className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover rounded-2xl shadow-2xl shadow-sky-900/20 border border-sky-100"
              />
            </div>
          </div>

        </div>

        {/* STATS STRIP */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-10 md:mt-14">
          {craftings.map((item, i) => (
            <div
              key={i}
              className="rounded-b-xl min-h-[170px] p-4 bg-white border border-sky-100 shadow-[0_7px_0_0_rgba(14,165,233,0.18)] hover:shadow-[0_10px_0_0_rgba(14,165,233,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-3xl 2xl:text-3xl text-sky-800 mb-1">
                {item.name}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2">
                {item.featurs}
              </p>

              <p className="text-gray-400 text-[11px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>




      </div>

      <PopupQuoteModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Crafting;
