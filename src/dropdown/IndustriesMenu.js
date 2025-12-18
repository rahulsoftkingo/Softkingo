import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaIndustry, FaChartPie, FaStore, FaBus, FaHome, FaHeartbeat } from "react-icons/fa";
import "./DropdownIcon.css";

const tabs = [
  {
    id: "industry",
    title: "Industry‑Specific Solutions",
    icon: <FaIndustry className="inline-block text-sky-600" />,
    heading: "Industry‑Specific Solutions",
    href: "/solutions",
    description:
      "We build tailored digital products for high‑impact industries like education, healthcare, finance and retail, aligned with domain workflows.",
    items: [
      {
        href: "/solutions/education",
        title: "Education",
        sub: "Student, parent and faculty portals, LMS, assessments and fee management in one place.",
        icon: <FaIndustry />,
      },
      {
        href: "/solutions/healthcare",
        title: "Healthcare",
        sub: "Patient apps, EHR integrations, teleconsultation and hospital workflow automation.",
        icon: <FaHeartbeat />,
      },
      {
        href: "/solutions/finance",
        title: "Finance",
        sub: "Secure onboarding, KYC, lending, payments and analytics for modern fintech products.",
        icon: <FaChartPie />,
      },
      {
        href: "/solutions/retail",
        title: "Retail & eCommerce",
        sub: "Omnichannel catalog, inventory, checkout and loyalty programs for growing brands.",
        icon: <FaStore />,
      },
    ],
  },
  {
    id: "ondemand",
    title: "On‑Demand Solutions",
    icon: <FaChartPie className="inline-block text-sky-600" />,
    heading: "On‑Demand & Real‑Time Solutions",
    href: "/solutions",
    description:
      "Design on‑demand platforms for delivery, mobility and home services with real‑time tracking and optimized dispatch.",
    items: [
      {
        href: "/solutions/food-delivery",
        title: "Food Delivery Platforms",
        sub: "Customer, restaurant and delivery apps with live order tracking and ratings.",
        icon: <FaStore />,
      },
      {
        href: "/solutions/taxi-booking",
        title: "Taxi & Ride‑Hailing",
        sub: "Driver and rider apps, live maps, fare calculation and trip history.",
        icon: <FaBus />,
      },
      {
        href: "/solutions/home-services",
        title: "Home Services",
        sub: "Booking, scheduling, payouts and review flows for service marketplaces.",
        icon: <FaHome />,
      },
      {
        href: "/solutions/healthcare",
        title: "On‑Demand Healthcare",
        sub: "Telemedicine, remote monitoring and digital prescriptions in compliant stacks.",
        icon: <FaHeartbeat />,
      },
    ],
  },
  {
    id: "businessmodel",
    title: "Business‑Model Solutions",
    icon: <FaChartPie className="inline-block text-sky-600" />,
    heading: "Business‑Model Based Solutions",
    href: "/solutions",
    description:
      "Launch subscription, freemium, on‑demand or marketplace products with billing, entitlements and reporting built‑in.",
    items: [
      {
        href: "/solutions/subscription",
        title: "Subscription Platforms",
        sub: "Plans, trials, renewals, invoicing and dunning workflows that reduce churn.",
        icon: <FaChartPie />,
      },
      {
        href: "/solutions/freemium",
        title: "Freemium Products",
        sub: "Usage‑based paywalls and feature unlocks that turn free users into customers.",
        icon: <FaStore />,
      },
      {
        href: "/solutions/on-demand",
        title: "On‑Demand Apps",
        sub: "Request, match, fulfill and rate cyclic flows adapted to your niche.",
        icon: <FaBus />,
      },
      {
        href: "/solutions/marketplace",
        title: "Marketplaces",
        sub: "Two‑sided listings, search, escrow payments and dispute management.",
        icon: <FaIndustry />,
      },
    ],
  },
];

const IndustriesMenu = () => {
  const [activeTab, setActiveTab] = useState("industry");

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[50rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="grid grid-cols-1 xl:grid-cols-[28%_72%] h-full">
            {/* Left tabs */}
            {/* Left tabs */}
            <div className="w-full bg-[#fcfcfc] space-y-2 p-6 flex-grow border-r border-sky-200 shadow-sm">
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
                    <span
                      className={`text-[0.85rem] ${activeTab === tab.id ? "text-sky-500" : "hidden"
                        }`}
                    >
                      <FaArrowRight />
                    </span>
                  </h3>
                </div>
              ))}

              {/* mini stats / graph style card */}
              <div className="mt-4 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 shadow-sm">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-sky-500 uppercase">
                  Solution Insights
                </p>
                <h4 className="mt-1 text-sm font-semibold text-slate-900">
                  120+ digital products shipped across industries
                </h4>

                {/* pseudo graph bars */}
                <div className="mt-3 flex items-end gap-1 h-16">
                  <div className="w-3 rounded-full bg-sky-200 h-6" />
                  <div className="w-3 rounded-full bg-sky-300 h-9" />
                  <div className="w-3 rounded-full bg-sky-400 h-12" />
                  <div className="w-3 rounded-full bg-sky-500 h-10" />
                  <div className="w-3 rounded-full bg-sky-300 h-8" />
                </div>

                <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                  Explore how industry‑specific, on‑demand and business‑model solutions
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
            </div>


            {/* Middle content + bottom CTA */}
            <div className="flex flex-col justify-between h-full w-full">
              <div className="h-full w-full max_height">
                {/* Title as link + hover arrow */}
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
                  <p className="text-[15px] leading-[26px] text-sky-900">
                    {current.description}
                  </p>
                </div>

                {/* 2‑column grid with icons + more content */}
                <div className="bg-white overflow-auto px-9 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {current.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="group flex gap-3 p-4 rounded-2xl border border-sky-100 bg-white hover:bg-sky-50 hover:border-sky-200 shadow-lg hover:shadow-md transition"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600/90 text-white text-sm shadow-sm">
                          {item.icon}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-[15px] text-sky-900 group-hover:text-sky-700">
                              {item.title}
                            </h4>
                            <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs" />
                          </div>
                          <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                            {item.sub}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Explore case studies, feature breakdowns and tech stack options for {item.title.toLowerCase()} products.
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="h-[7rem] w-full shadow-sm bg-gradient-to-r from-sky-900 via-sky-700 to-sky-500 text-gray-100">
                <div className="flex flex-row justify-between items-center px-6 md:px-12 h-full">
                  <div className="flex flex-col space-y-1 md:space-y-1.5">
                    <h5 className="text-white text-base md:text-2xl font-semibold">
                      Ship the right solution for your industry
                    </h5>
                    <p className="text-white text-[11px] md:text-sm max-w-xl">
                      Share your use case, industry and business model. Get a tailored
                      solution blueprint with timelines, tech stack and ball‑park estimates.
                    </p>

                    {/* small related links row */}
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


          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesMenu;
