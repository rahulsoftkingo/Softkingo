

// app/(public)/components/InquirySection.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBeta } from "react-icons/tb";
import ReactCountryFlag from "react-country-flag";
import { GoMail } from "react-icons/go";
import { TfiSkype } from "react-icons/tfi";
import { MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import { HiGlobeAlt } from "react-icons/hi";
import InquiryForm from "../public/InquiryForm";

const InquirySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // const contactNumbers = [
  //    {
  //     country: "India",
  //     phone: "+91-7428750870",
  //     code: "IN",
  //     timezone: "IST",
  //     city: "New Delhi",
  //     gradient: "from-sky-500 via-cyan-500 to-teal-600",
  //     description: "Development & Support Hub",
  //     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.33023705217!2d77.04417079179452!3d28.52758347176147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  //   },
  //   {
  //     country: "United States",
  //     phone: "+1 323-908-3492",
  //     code: "US",
  //     timezone: "PST",
  //     city: "Los Angeles",
  //     gradient: "from-sky-500 via-sky-500 to-cyan-600",
  //     description: "Silicon Valley Tech Hub",
  //     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27404844493!2d-118.69192993092529!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  //   },
  //   {
  //     country: "India",
  //     phone: "+34 93-802-3010",
  //     code: "IN",
  //     timezone: "CET",
  //     city: "Barcelona",
  //     gradient: "from-cyan-500 via-sky-500 to-sky-600",
  //     description: "Mediterranean Operations",
  //     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95777.8063840268!2d2.0701894395721577!3d41.39271493932802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49816718e30e5%3A0x44b0fb3d4f47660a!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  //   },
  //   {
  //     country: "United Kingdom",
  //     phone: "+44 (0)20-7993-2188",
  //     code: "GB",
  //     timezone: "GMT",
  //     city: "London",
  //     gradient: "from-sky-500 via-sky-500 to-indigo-600",
  //     description: "European Innovation Center",
  //     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317718.69319292053!2d-0.43123973723120426!3d51.52860701962855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  //   },
    
   
  //   {
  //     country: "Australia",
  //     phone: "+61 2 6145 2066",
  //     code: "UAE",
  //     timezone: "AEST",
  //     city: "Sydney",
  //     gradient: "from-sky-500 via-sky-500 to-cyan-600",
  //     description: "Asia-Pacific Headquarters",
  //     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424145.17678001765!2d150.65170278725923!3d-33.847927371800955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  //   },
  //   {
  //     country: "South Africa",
  //     phone: "+234 915-242-4242",
  //     code: "CA",
  //     timezone: "SAST",
  //     city: "Cape Town",
  //     gradient: "from-cyan-500 via-sky-500 to-sky-600",
  //     description: "African Operations Center",
  //     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211239.8656337433!2d18.290812899999998!3d-33.92487365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  //   },
  // ];


  const contactNumbers = [
  {
    country: "India",
    phone: "+91-7428750870",
    code: "IN",
    timezone: "IST",
    city: "New Delhi",
    gradient: "from-emerald-500 via-sky-500 to-cyan-600",
    description: "Development & Support Hub",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.33023705217!2d77.04417079179452!3d28.52758347176147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  },
  
  {
    country: "United States",
    phone: "+1 323-908-3492",
    code: "US",
    timezone: "PST",
    city: "Los Angeles",
    gradient: "from-sky-500 via-sky-500 to-cyan-600",
    description: "Silicon Valley Tech Hub",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27404844493!2d-118.69192993092529!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  },
  {
    country: "India", 
    phone: "+91 74280 78761",
    code: "IN",
    timezone: "IST",
    city: "Noida",
    gradient: "from-sky-500 via-cyan-500 to-teal-600",
    description: "Tech Operations Center",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14004.000000000001!2d77.39102615!3d28.5355161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefd5b347eb62d%3A0x37205b715389640!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  },
  // {
  //   country: "United Kingdom",
  //   phone: "+44 (0)20-7993-2188",
  //   code: "GB",
  //   timezone: "GMT",
  //   city: "London",
  //   gradient: "from-sky-500 via-sky-500 to-indigo-600",
  //   description: "European Innovation Center",
  //   map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317718.69319292053!2d-0.43123973723120426!3d51.52860701962855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  // },
  // {
  //   country: "United Arab Emirates",
  //   phone: "+971 4 321 8520",
  //   code: "AE",
  //   timezone: "GST",
  //   city: "Dubai",
  //   gradient: "from-yellow-500 via-orange-500 to-sky-600",
  //   description: "Middle East Business Hub",
  //   map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14452!2d55.2707828!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43364ba2b41b%3A0x400c795c3e3e1f1f!2sDubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  // },
  // {
  //   country: "Canada",
  //   phone: "+1 647-793-9201",
  //   code: "CA",
  //   timezone: "EST",
  //   city: "Toronto",
  //   gradient: "from-red-500 via-sky-500 to-blue-600",
  //   description: "North America Innovation Lab",
  //   map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2328178!2d-82.1253225!3d45.5016909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d1299e3f%3A0x3fc16dd8e473aa2e!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1735400000000!5m2!1sen!2sin"
  // }
];



  const socialIcons = [
    { Icon: FaFacebookF, url: "https://www.facebook.com/softkingo", color: "bg-sky-600" },
    { Icon: FaLinkedin, url: "https://www.linkedin.com/company/softkingo", color: "bg-sky-700" },
    { Icon: FaXTwitter, url: "https://twitter.com/softkingo", color: "bg-gray-800" },
    { Icon: FaYoutube, url: "https://www.youtube.com/@softkingo", color: "bg-red-600" },
    { Icon: IoLogoInstagram, url: "https://www.instagram.com/softkingo", color: "bg-pink-600" },
    { Icon: TbBeta, url: "https://softkingo.com", color: "bg-sky-600" },
  ];


  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contactNumbers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, contactNumbers.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % contactNumbers.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + contactNumbers.length) % contactNumbers.length);

  return (
    <section className="relative w-full bg-gradient-to-br from-white via-sky-50/30 to-sky-50/20 py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                GET IN TOUCH
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-gray-900">Let's </span>
                <span className="bg-gradient-to-r from-sky-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Reach out to us from anywhere in the world. We're here to turn your ideas into reality.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:info@softkingo.com"
                className="group flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                  <GoMail className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-sky-600 transition-colors">info@softkingo.com</p>
                </div>
              </a>

              <a
                href="skype:softkingo?chat"
                className="group flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                  <TfiSkype className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Skype</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-sky-600 transition-colors">softkingo</p>
                </div>
              </a>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                <div className="group relative rounded-2xl   overflow-hidden hover:shadow-3xl transition-shadow duration-300">

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative p-6 space-y-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${contactNumbers[currentIndex].gradient} opacity-5 transition-all duration-500`} />

                      <div className="relative z-10">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-14 h-12 rounded-sm bg-white  flex items-center justify-center  flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <ReactCountryFlag
                              countryCode={contactNumbers[currentIndex].code}
                              svg
                              style={{ fontSize: "3em" }}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-xl font-bold text-gray-900">
                                {contactNumbers[currentIndex].country}
                              </h4>
                              {/* <div className={`px-2.5 py-1 bg-gradient-to-r ${contactNumbers[currentIndex].gradient} text-white text-[10px] font-bold rounded-lg shadow-md`}>
                                {contactNumbers[currentIndex].timezone}
                              </div> */}
                            </div>

                            <div className="flex items-center gap-1.5 text-sm text-sky-600">
                              <MdLocationOn className="text-sm flex-shrink-0" />
                              <span className="font-semibold">{contactNumbers[currentIndex].city}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed mb-4">
                          {contactNumbers[currentIndex].description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 py-2 px-3 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg border border-sky-100 hover:border-sky-200 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <MdAccessTime className="text-white text-sm" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-gray-500 font-medium">Timezone</p>
                              <p className="text-xs text-gray-900 font-bold truncate">{contactNumbers[currentIndex].timezone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 py-2 px-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:border-green-200 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-gray-500 font-medium">Status</p>
                              <p className="text-xs text-gray-900 font-bold">Available</p>
                            </div>
                          </div>
                        </div>

                        <a
                          href={`tel:${contactNumbers[currentIndex].phone}`}
                          className={`group/btn flex items-center justify-center gap-3 w-full px-4 py-2 bg-gradient-to-r ${contactNumbers[currentIndex].gradient} text-white rounded-xl font-bold text-xs md:text-sm hover:shadow-2xl hover:shadow-sky-500/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform">
                            <MdPhone className="text-sm" />
                          </div>
                          <span className="flex-1 text-left">{contactNumbers[currentIndex].phone}</span>
                          <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="relative h-full min-h-[250px] bg-gradient-to-br from-sky-100 to-blue-100">
                      <iframe
                        key={currentIndex}
                        src={contactNumbers[currentIndex].map}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 transition-opacity duration-500"
                      />

                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-sky-200 z-10">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">Live Location</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fle hidden items-center justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  className="group w-11 h-11 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-all border-2 border-sky-200 hover:border-sky-400"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {contactNumbers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`transition-all rounded-full ${idx === currentIndex
                          ? "w-10 h-2.5 bg-gradient-to-r from-sky-500 to-sky-600 shadow-md"
                          : "w-2.5 h-2.5 bg-gray-300 hover:bg-sky-400 hover:w-6"
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="group w-11 h-11 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg hover:shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="group w-11 h-11 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-all border-2 border-sky-200 hover:border-sky-400"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Country Flags Carousel - Animated */}
                <div className="flex gap-2">
                  {contactNumbers.map((contact, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative transition-all duration-300 overflow-hidden rounded-full shadow-md border-1 hover:border-sky-400 hover:shadow-lg hover:scale-110 p-0 m-0 ${idx === currentIndex
                          ? "w-18 h-8 border-sky-500 bg-white/80"  // Active: Full width
                          : "w-8 h-8 border-sky-200 bg-white hover:border-sky-300" // Inactive: Small
                        }`}
                      title={`${contact.country} (${contact.timezone})`}
                    >
                      {/* Country Flag */}
                      <ReactCountryFlag
                        countryCode={contact.code}
                        svg
                        className="w-8 h-8 object-cover rounded-[inherit]"
                        aria-label={contact.country}
                      />

                      {/* Active indicator glow */}
                      {idx === currentIndex && (
                        <div className="absolute inset-0 bg-gradient-to-rfrom-sky-500/50to-cyan-500/50 animate-pulse blur-sm" />
                      )}

                      {/* Country code badge */}
                      {/* <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white shadow-md whitespace-nowrap ${
          idx === currentIndex 
            ? "text-sky-600 border border-sky-400" 
            : "text-gray-600 border border-gray-300"
        }`}>
          {contact.code}
        </span> */}
                    </button>
                  ))}
                </div>

                <button
                  onClick={next}
                  className="group w-11 h-11 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg hover:shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>

            {/* Social icons */}
            <div className="fle hidden gap-3 pt-2">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.color}`}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-colors cursor-pointer shadow-lg hover:shadow-xl   hover:scale-110 transition-all"
                >
                  <social.Icon size={14} />
                </a>
              ))}
            </div>

          </div>

          <div className="lg:sticky lg:top-6">
            <InquiryForm
              title="Hey! there"
              subtitle=""
              tagline="Quick Inquiry"
              submitLabel="Submit Request"
              primaryColor="sky"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
