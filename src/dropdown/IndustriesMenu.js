import React, { useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaIndustry,
  FaHeartbeat,
  FaGraduationCap,
  FaDollarSign,
  FaStore,
  FaBuilding,
  FaPlane,
  FaUtensils,
  FaDumbbell,
  FaTruck,
  FaFilm,
  FaUsers,
  FaCar,
  FaHammer,
  FaIndustry as FaFactory,
  FaCalendarAlt,
  FaVrCardboard,
  FaShoppingBag,
  FaTaxi,
  FaHome,
  FaSpa,
  FaUserGraduate,
  FaWrench,
  FaCarSide,
  FaProjectDiagram,
  FaCoins,
  FaRobot,
  FaComments,
  FaMicrochip,
  FaCloud,
  FaCube,
} from "react-icons/fa";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";

const tabs = [
  // ✅ INDUSTRIES (main link: /industries)
 {
       id: "industry",
       title: "Industry",
       heading: "Industry‑Specific Solutions",
       icon: <FaIndustry className="inline-block text-sky-600" />,
 
       href: "/industries",
       description:
         "We build tailored digital products for high‑impact industries like education, healthcare, finance and retail, aligned with domain workflows.",
       items: [
         { title: "Healthcare", href: "/industries/healthcare", icon: <FaHeartbeat /> },
         { title: "Education / E-Learning", href: "/industries/education", icon: <FaGraduationCap /> },
         { title: "Real Estate", href: "/industries/real-estate", icon: <FaBuilding /> },
         { title: "Travel & Tourism", href: "/industries/travel", icon: <FaPlane /> },
         { title: "Food & Restaurant", href: "/industries/restaurant", icon: <FaUtensils /> },
         { title: "Fitness & Wellness", href: "/industries/fitness", icon: <FaDumbbell /> },
         { title: "Retail & E-Commerce", href: "/industries/retail", icon: <FaStore /> },
 
         { title: "Logistics/Transportation", href: "/industries/logistics", icon: <FaTruck /> },
 
         // URL missing in your list -> fallback
         { title: "Media & Entertainment", href: "/industries/entertainment", icon: <FaFilm /> },
 
         { title: "Social Networking", href: "/industries/social-media", icon: <FaUsers /> },
         { title: "Finance / FinTech", href: "/industries/fintech", icon: <FaDollarSign /> },
         { title: "Automotive", href: "/industries/automotive", icon: <FaCar /> },
         { title: "Construction", href: "/industries/construction", icon: <FaHammer /> },
         { title: "Manufacturing", href: "/industries/manufacturing", icon: <FaFactory /> },
         { title: "Sports", href: "/industries/sports", icon: <FaCalendarAlt /> },
        
       ],
     },

];

const IndustriesMenu = () => {
  const [activeTab, setActiveTab] = useState("industry");
  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[40rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="grid grid-cols-1 xl:grid-cols-[72%_28%] h-full">
            {/* Left tabs */}
            {/* <div className="w-full bg-[#fcfcfc] space-y-2 p-6 flex-grow border-r border-sky-200 shadow-sm">
              {tabs.map((tab) => (
                <div key={tab.id} className="cursor-pointer">
                  <h3
                    onMouseEnter={() => setActiveTab(tab.id)}
                    className={`m-1 px-3 py-2 rounded flex items-center justify-between text-sm transition 
                      ${activeTab === tab.id
                        ? "text-sky-600 bg-sky-50 font-semibold"
                        : "text-slate-800 hover:bg-sky-50"
                      }`}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <span className="header_menu_tab_ic">{tab.icon}</span>
                      <span>{tab.title}</span>
                    </div>
                    <span className={`text-[0.85rem] ${activeTab === tab.id ? "text-sky-500" : "hidden"}`}>
                      <FaArrowRight />
                    </span>
                  </h3>
                </div>
              ))}

            
              <div className="mt-4 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 shadow-sm">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-sky-500 uppercase">
                  Solution Insights
                </p>
                <h4 className="mt-1 text-sm font-semibold text-slate-900">
                  120+ digital products shipped across industries
                </h4>

                <div className="mt-3 flex items-end gap-1 h-16">
                  <div className="w-3 rounded-full bg-sky-200 h-6" />
                  <div className="w-3 rounded-full bg-sky-300 h-9" />
                  <div className="w-3 rounded-full bg-sky-400 h-12" />
                  <div className="w-3 rounded-full bg-sky-500 h-10" />
                  <div className="w-3 rounded-full bg-sky-300 h-8" />
                </div>

                <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                  Explore how industry‑specific, on‑demand and technology solutions
                  helped clients grow retention, revenue and efficiency.
                </p>

                <Link
                  href="/case-studies"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-800"
                >
                  View case studies
                  <FaArrowRight className="text-[0.7rem]" />
                </Link>
              </div>
            </div> */}

            {/* Middle content */}
            <div className="flex flex-col justify-between h-full w-full">
              <div className="h-full w-full max_height">
                <div className="px-9 pt-9 pb-4">
                  <div className="flex items-center gap-2 mb-2 group">
                    <Link
                      href={current.href}
                      className="font-semibold text-xl md:text-2xl text-sky-900 group-hover:text-sky-700 transition-colors"
                    >
                      {current.heading}
                    </Link>
                    <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-sm" />
                  </div>
                </div>

                {/* Cards: ONLY icon + title */}
                <div className="bg-white overflow-auto px-9 pb-4">
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                    {current.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="group flex gap-3 p- rounded-2xlbg-white hover:bg-sky-50hover:border-sky-200 shadow-lghover:shadow-md transition   borderborder-sky-100"
                      >
                        <div className="flex h-8 w-10 items-center justify-center rounded-full bg-sky-600/90 text-white text-sm shadow-sm">
                          {item.icon}
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <h4 className="font-semibold text-[15px] text-sky-900 group-hover:text-sky-700">
                            {item.title}
                          </h4>
                          <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA (unchanged UI) */}
              <div className="h-[7rem] w-full shadow-sm bg-gradient-to-r from-sky-900 via-sky-700 to-sky-500 text-gray-100">
                <div className="flex flex-row justify-between items-center px-6 md:px-12 h-full">
                  <div className="flex flex-col space-y-1 md:space-y-1.5">
                    <h5 className="text-white text-base md:text-2xl font-semibold">
                      Ship the right solution for your business
                    </h5>
                    <p className="text-white text-[11px] md:text-sm max-w-xl">
                      Share your use case, industry and goals. Get a tailored blueprint with timelines, tech stack and estimates.
                    </p>

                    <div className="hidden mdflex flex-wrap gap-4 text-[11px] text-sky-100/90">
                      <Link href="/case-studies" className="inline-flex items-center gap-1 hover:text-white">
                        View case studies <FaArrowRight className="text-[0.6rem]" />
                      </Link>
                      <span className="h-3 w-px bg-sky-300/60" />
                      <Link href="/contact" className="inline-flex items-center gap-1 hover:text-white">
                        Talk to a solutions expert <FaArrowRight className="text-[0.6rem]" />
                      </Link>
                      <span className="h-3 w-px bg-sky-300/60" />
                      <Link href="/e-guides" className="inline-flex items-center gap-1 hover:text-white">
                        Download solution guides <FaArrowRight className="text-[0.6rem]" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Link
                      href="/our-portfolio"
                      className="border border-white/90 py-2 px-4 rounded-full text-xs md:text-sm font-medium text-white
                        hover:text-sky-900 hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                      Explore Portfolio
                      <FaArrowRight className="text-[0.75rem]" />
                    </Link>
                    <p className="hidden md:block text-[10px] text-sky-100/80">
                      Avg. go‑live: 10‑14 weeks for v1
                    </p>
                  </div>
                </div>
              </div>
              {/* Bottom CTA */}
            </div>
{/* Right  card */}
            <div className="hidden xl:block w-full h-full bg-white">
              <div className="h-full w-full border-l border-sky-100 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 px-6 py-8 flex items-start">
               {/* < /> */}
               <TestimonialCarousel/>
              </div>
            </div>
            {/* Right end */}

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

export default IndustriesMenu;
