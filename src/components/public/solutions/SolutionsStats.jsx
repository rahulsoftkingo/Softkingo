"use client";

import React from "react";
import Image from "next/image";

const defaultData = {
  heading: "Trusted by Businesses Worldwide",
  items: [
    "/images/logo/careclinictransparent.png",
    "/images/logo/transparentpotafo.png",
    "/images/logo/LoveLocal-logo.webp",
    "/images/logo/Snoonu-logo.webp",
     "/images/logo/Moglix_logo.webp",
     "/images/logo/ezydash.webp"
    //  "/images/logo/odatrans.png"
  ],
};

export default function TrustedBySection({ data = defaultData }) {
  const sectionData = defaultData;

  if (!sectionData?.items?.length) return null;

  return (
    <section className="bg-sky-400 relative -top-20 py-6 rounded-[2rem] w-[85%] max-w-6xl mx-auto z-20 shadow-xl shadow-sky-100">
      <div className="max-w-7xl mx-auto px-6">
        {sectionData.heading && (
          <h2 className="text-center text-white text-xl md:text-2xl font-bold mb-6">
            {sectionData.heading}
          </h2>
        )}

        <div className="flex md:justify-center md:flex-wrap overflow-x-auto gap-8 md:gap-12 items-center pb-2 md:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {sectionData.items.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center flex items-center justify-center h-12 w-36 relative"
            >
              <Image
                src={logo}
                alt={`Partner logo ${index + 1}`}
                width={150}
                height={50}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
