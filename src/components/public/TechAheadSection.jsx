// components/TechAheadSection.jsx
'use client';

import TestimonialCarousel from "./TestimonialCarousel";

export default function TechAheadSection({
  showTitle = true,
  showAddress = true,
  showContact = true, // New option to show/hide contact
  showEmail = true,   // Individual control
  showPhone = true,   // Individual control
  title = "Your Strategic Partner for Digital Innovation",
  subtitle = "Join 500+ companies who trust us to build secure, scalable digital experiences powered by cutting-edge technology.",
  email = "sales@softkingo.com",
  phone = "+91-7428750870",
  phoneLabel = "MON–FRI · 10 AM – 7 PM IST",
  address = "H61, Block H, Sector 63, Noida, Uttar Pradesh 201301",
  tagline = "End‑to‑End Delivery · From idea to launch",
  testimonialColumns = 1 // 1, 2, or 'auto'
}) {
  const clientLogos = [
    { src: "/images/logo/cl1.png", alt: "Client 1" },
    { src: "/images/logo/cl2.png", alt: "Client 2" },
    { src: "/images/logo/cl3.png", alt: "Client 3" },
    { src: "/images/logo/cl4.png", alt: "Client 4" },
    { src: "/images/logo/cl5.png", alt: "Client 5" },
    { src: "/images/logo/cl6.png", alt: "Client 6" },
    { src: "/images/logo/cl7.png", alt: "Client 7" },
    // { src: "/images/logo/cl8.png", alt: "Client 8" },
  ];

  return (
    <div className="h-fit flex flex-col items-start">
      {/* Hero Content */}
      <div className="mb-6">
        {showTitle && (
          <>

            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50/50 px-4 py-1 text-[11px] font-semibold tracking-wide text-[#0B3250] shadow-[0_8px_20px_rgba(0,0,0,0.05)] mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {tagline}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-sky-900  leading-tight bg-gradient-to-r from-sky-900 via-sky-800 to-sky-700 bg-clip-text">
              {title}
            </h2>

            {/* <p className="text-sm text-gray-600 mb-1 leading-relaxed">
              {subtitle}
            </p> */}
          </>
        )}
      </div>

      {/* Testimonial Carousel */}
      <div className="mb-8 flex-1">
        <TestimonialCarousel columns={testimonialColumns} />

        {/* Contact Buttons - Conditional Rendering */}
        {showContact && (showEmail || showPhone) && (
          <div className="space-y-2.5 mt-5 hidden">
            {showEmail && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-3 group w-full hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 p-3 rounded-xl transition-all border border-transparent hover:border-sky-200"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-900 font-semibold text-sm group-hover:text-sky-600 transition-colors">{email}</span>
              </a>
            )}

            {showPhone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-3 group w-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 p-3 rounded-xl transition-all border border-transparent hover:border-blue-200"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-900 font-semibold text-sm block group-hover:text-blue-600 transition-colors">{phone}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">{phoneLabel}</span>
                </div>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Trusted by Companies - Client Logos */}
      <div className="mt-auto pt-6 border-t border-sky-200">
        <div className="mb-3">
          <p className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-3 text-center">
            Trusted by Leading Companies
          </p>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap gap-3 mb-4 items-center justify-center">
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="aspect-[0]  transition-all flex items-center justify-center p-2 group overflow-hidden"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain opacity-100 group-hover:opacity-100 transition-opacity filter grayscale-0 group-hover:grayscale-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div className="w-full h-full flex items-center justify-center  text-xs font-bold">LOGO</div>';
                }}
              />
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 rounded-xl p-3 border border-sky-100 hidden">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-700 leading-relaxed font-semibold mb-0.5">
                <span className="text-sky-700">500+ Projects Delivered</span> • 98% Client Satisfaction
              </p>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Building custom products, mobile apps, and web platforms for startups to enterprises since 2019.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
