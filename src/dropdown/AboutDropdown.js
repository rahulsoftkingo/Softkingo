import Link from "next/link";
import React, { useState } from "react";
import RecoAward from "@/components/public/RecognitionSection";
import ReactCountryFlag from "react-country-flag";

import {
  FaUserFriends,
  FaConciergeBell,
  FaIndustry,
  FaBriefcase,
  FaCalendarAlt
} from "react-icons/fa";
import { FaEnvelope, FaSkype } from "react-icons/fa";

const NAV_ITEMS = [
  { title: "About Who We Are", href: "/about", icon: <FaUserFriends className="text-lg inline-block text-sky-600" /> },
  { title: "Services We Offer", href: "/services", icon: <FaConciergeBell className="text-lg inline-block text-sky-600" /> },
  { title: "Solutions We Serve", href: "/solutions", icon: <FaIndustry className="text-lg inline-block text-sky-600" /> },
  { title: "Career", href: "/careers", icon: <FaBriefcase className="text-lg inline-block text-sky-600" /> },
  { title: "Insights", href: "/insights", icon: <FaCalendarAlt className="text-lg inline-block text-sky-600" /> },
  { title: "Portfolio", href: "/portfolio", icon: <FaCalendarAlt className="text-lg inline-block text-sky-600" /> },
  { title: "Gallery", href: "/gallery", icon: <FaCalendarAlt className="text-lg inline-block text-sky-600" /> },
];

const AboutUsDropdown = () => {
  const [activeTab, setActiveTab] = useState("About Who We Are");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[40rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="w-full h-full flex">
            {/* Left Section */}
            <div className="w-full bg-[#fcfcfc] md:w1/4 flex-[1.5] flexgrow text-left p-8 border-r border-sky-200">
              {NAV_ITEMS.map((item) => (
                <div className="mb-3" key={item.title}>
                  <Link href={item.href}>
                    <h2
                      onMouseEnter={() => handleTabClick(item.title)}
                      className={`cursor-pointer m-2 flex justify-between items-center rounded px-3 py-2 transition
                        text-sm
                        ${activeTab === item.title
                          ? "text-sky-600 bg-sky-50 font-semibold"
                          : "text-slate-800 hover:bg-[#eff6ff]"
                        }`}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <span className="header_menu_tab_ic">{item.icon}</span>
                        <span>{item.title}</span>
                        <span
                          className={`text-sm ml-[0.7rem] ${activeTab === item.title ? "text-sky-500" : "hidden"
                            }`}
                        >
                          🡪
                        </span>
                      </div>
                    </h2>
                  </Link>
                </div>
              ))}
            </div>

            {/* Middle Section */}
            <div className="w-full md:w-2/4 flex-[3] flexgrow text-left mt-8 md:mt-0 m-5 p-8">
              <h2 className="mb-3 text-2xl md:text-4xl font-semibold leading-snug text-slate-900">
                We&apos;re the Top{" "}
                <span className="text-sky-600">#1 IT Company</span> Contributing
                towards a Smart World!
              </h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-700">
                From websites to applications, along with the latest software
                technologies, we can make up all kinds of successful solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-sky-600 mt-1">
                    <FaEnvelope />
                  </span>
                  <div>
                    <span className="text-sky-600 font-semibold text-[13px] block">
                      E-mail
                    </span>
                    <p className="text-sky-900 font-semibold text-sm">
                      sales@softkingo.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl text-sky-600 mt-1">
                    <FaSkype />
                  </span>
                  <div>
                    <span className="text-sky-600 font-semibold text-[13px] block">
                      Skype
                    </span>
                    <p className="text-sky-900 font-semibold text-sm">
                      softkingo
                    </p>
                  </div>
                </div>
              </div>
              {/* {
    img: "/images/flags/india.png",
    title: "India Office (New Delhi)",
    phone: "+91-7428750870",
    code: "IN",
  },
 
  {
    img: "/images/flags/usa.png",
    title: "USA Office (Los Angeles)",
    phone: "+1 323-908-3492",
    code: "US",
  },
   {
    img: "/images/flags/india.png", 
    title: "India Office (Noida)",
    phone: "+91-120-636-7890",
    code: "IN",
  },
  {
    img: "/images/flags/uk.png",
    title: "UK Office (London)",
    phone: "+44 (0)20-7993-2188",
    code: "GB",
  },
  {
    img: "/images/flags/uae.png",
    title: "UAE Office (Dubai)",
    phone: "+971 4 321 8520",
    code: "AE",
  },
  {
    img: "/images/flags/canada.png",
    title: "Canada Office (Toronto)",
    phone: "+1 647-793-9201",
    code: "CA",
  }, */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[


                  {
                    img: "/images/flags/india.png",
                    title: "India Office ",
                    phone: "+91-7428750870",
                    code: "IN",
                  },

                  {
                    img: "/images/flags/usa.png",
                    title: "USA Office",
                    phone: "+1 323-908-3492",
                    code: "US",
                  },
                  {
                    img: "/images/flags/india.png",
                    title: "India Office",
                    phone: "+91-120-636-7890",
                    code: "IN",
                  },
                  {
                    img: "/images/flags/uk.png",
                    title: "UK Office ",
                    phone: "+44 (0)20-7993-2188",
                    code: "GB",
                  },
                  {
                    img: "/images/flags/uae.png",
                    title: "UAE Office",
                    phone: "+971 4 321 8520",
                    code: "AE",
                  },
                  {
                    img: "/images/flags/canada.png",
                    title: "Canada Office",
                    phone: "+1 647-793-9201",
                    code: "CA",
                  },


                ].map((office, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {/* <img
                      src={office.img}
                      alt={office.title}
                      className="w-6 h-6"
                    /> */}
                    <ReactCountryFlag
                      countryCode={office.code}
                      svg
                      className="w-10 h-10 rounded-full"
                    />
                    <Link
                      href={`tel:${office.phone}`}
                    >
                      <span className="text-sky-700 font-semibold text-xs block">
                        {office.title}
                      </span>
                      <p className="text-sky-900 font-semibold text-sm">
                        {office.phone}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar with Image */}
            <div className="hidden md:block w-1/4 h-full text-black bg_gradent_l">
              <Link href="/contact">
                <div className="h-full w-full">
                  <RecoAward />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`.header_menu_tab_ic {
    border-radius: 8px;
    background: linear-gradient(180deg, #cedbdf 0%, #f0f4f4 100%), #d9d9d9;
    flex: 0 0 45px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* color: rgb(95, 162, 188); */
}
.max_height{
    height: calc(100% - 7rem);
    max-height: calc(100% - 7rem);
}

.bg_gradent_l
{
    background: linear-gradient(305deg, #c6e7f3ed, transparent);
}`}</style>
    </div>
  );
};

export default AboutUsDropdown;
