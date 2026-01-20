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
  
  // 🔥 NEW Clone App Icons
  FaCopy,
  FaShoppingCart,
  FaBriefcase,
  FaBed,
  FaHeart,
  FaCamera,
  FaQuestionCircle,
  FaMusic,
  FaSpotify,
  FaCameraRetro,
} from "react-icons/fa";

const tabs = [

  // ✅ ON DEMAND (main link: /solutions)
  {
    id: "ondemand",
    title: "On‑Demand Solutions",
    icon: <FaTruck className="inline-block text-sky-600" />,
    heading: "On‑Demand & Real‑Time Solutions",
    href: "/solutions",
    description:
      "Design on‑demand platforms for delivery, mobility and home services with real‑time tracking and optimized dispatch.",  
    items: [
      { title: "Food Delivery", href: "/solutions/food-delivery-app-development", icon: <FaUtensils /> },
      { title: "Grocery Delivery", href: "/solutions/grocery-delivery-app-development", icon: <FaShoppingBag /> },
      { title: "Pickup & Delivery", href: "/solutions/pickup-and-delivery-service-app-development", icon: <FaTruck /> },
      { title: "Taxi Booking", href: "/solutions/taxi-app-development-services", icon: <FaTaxi /> },
      { title: "Fitness Trainer App", href: "/solutions/fitness-trainer-app-development", icon: <FaDumbbell /> },
      { title: "Home Services", href: "/solutions/on-demand-home-service-app-development", icon: <FaHome /> },
      { title: "Beauty & Salon Booking", href: "/solutions/salon-app-development", icon: <FaSpa /> },
      { title: "Doctor & Medical App", href: "/solutions/ice-cream-delivery-app-development", icon: <FaHeartbeat /> },
      { title: "Laundry Service", href: "/solutions/laundry-app-development", icon: <FaShoppingBag /> },
      { title: "Restaurant management", href: "/solutions/restaurant-app-development-company", icon: <FaUtensils /> },
      { title: "Dating App", href: "/solutions/dating-app-development-company", icon: <FaUsers /> },
      { title: "Carpooling Apps", href: "/solutions/ride-sharing-app-development", icon: <FaCarSide /> },
      { title: "Tutor App", href: "/solutions/tutor-app-development", icon: <FaUserGraduate /> },
      { title: "Mechanics & Repair App", href: "/solutions/mechanic-app-development", icon: <FaWrench /> },
      { title: "Car Wash App", href: "/solutions/car-wash-app-development", icon: <FaCarSide /> },
    ],
  },

  // ✅ BUSINESS MODEL (main link: /solutions)
  {
    id: "businessmodel",
    title: "Business‑Model Solutions",
    icon: <FaProjectDiagram className="inline-block text-sky-600" />,
    heading: "Business‑Model Based Solutions",
    href: "/solutions",
        description:
      "Launch subscription, freemium, on‑demand or marketplace products with billing, entitlements and reporting built‑in.",
    items: [
      { title: "Marketplace App", href: "/solutions/marketplace-app-development", icon: <FaStore /> },
      { title: "Subscription Software", href: "/solutions/subscription-platform-development", icon: <FaCoins /> },
      { title: "Multi-Vendor E-commerce", href: "/solutions/multivendor-ecommerce-development", icon: <FaStore /> },
      { title: "SaaS Product Development", href: "/solutions/saas-product-development", icon: <FaCloud /> },
      { title: "CRM Software", href: "/solutions/crm-software-development", icon: <FaProjectDiagram /> },
      { title: "ERP Software", href: "/solutions/erp-software-development", icon: <FaProjectDiagram /> },
      { title: "Booking System", href: "/solutions/online-booking-system-development", icon: <FaCalendarAlt /> },
      { title: "Membership / Loyalty", href: "/solutions/loyalty-membership-platform", icon: <FaCoins /> },
      { title: "HR Management", href: "/solutions/hr-software-development", icon: <FaUsers /> },
      { title: "Inventory Management", href: "/solutions/inventory-management-software", icon: <FaStore /> },
    ],
  },

  // ✅ TECHNOLOGY (main link: /solutions)
  {
    id: "technology",
    title: "Technology‑Based Solutions",
    icon: <FaMicrochip className="inline-block text-sky-600" />,
    heading: "Technology‑Based Solutions",
    href: "/solutions",
    description: "Cutting-edge technology solutions including AI/ML, blockchain, IoT and AR/VR for innovative products.",  
    items: [
      { title: "AI/ML Solutions", href: "/solutions/ai-ml-development", icon: <FaRobot /> },
      { title: "Chatbot Development", href: "/solutions/chatbot-development", icon: <FaComments /> },
      { title: "IoT App Development", href: "/solutions/iot-app-development", icon: <FaMicrochip /> },
      { title: "Blockchain Solutions", href: "/solutions/blockchain-development", icon: <FaCube /> },
      { title: "Cloud & DevOps", href: "/solutions/cloud-devops-services", icon: <FaCloud /> },
      { title: "AR/VR", href: "/solutions/ar-vr-app-development", icon: <FaVrCardboard /> },
    ],
  },
  // CLONE APPS (NEW)
  {
    id: "cloneapps",
    title: "Clone App Solutions",
    icon: <FaCopy className="inline-block text-sky-600" />,
    heading: "Ready-made Clone App Solutions",
    href: "/solutions",
    description: "Proven clone app solutions for rapid market entry - Zomato, Uber, Airbnb clones with full source code, admin panels and multi-platform deployment.",
    items: [
      { title: "Amazon Clone", href: "/solutions/amazon-clone-app-development", icon: <FaShoppingCart /> },
      { title: "Zomato Clone", href: "/solutions/zomato-clone-app-development", icon: <FaUtensils /> },
      { title: "Uber Clone", href: "/solutions/uber-clone-app-development", icon: <FaCar /> },
      { title: "Naukri Clone", href: "/solutions/naukri-clone-app-development", icon: <FaBriefcase /> },
      { title: "Udemy Clone", href: "/solutions/udemy-clone-app-development", icon: <FaGraduationCap /> },
      { title: "Oyo Clone", href: "/solutions/oyo-clone-app-development", icon: <FaBed /> },
      { title: "Bigbasket Clone", href: "/solutions/bigbasket-clone-app-development", icon: <FaShoppingBag /> },
      { title: "Urban Company", href: "/solutions/urban-company-clone-app-development", icon: <FaHome /> },
      { title: "Tinder Clone", href: "/solutions/tinder-clone-app-development", icon: <FaHeart /> },
      { title: "Instagram Clone", href: "/solutions/instagram-clone-app-development", icon: <FaCamera /> },
      { title: "Quora Clone", href: "/solutions/quora-clone-app-development", icon: <FaQuestionCircle /> },
      { title: "Soundcloud Clone", href: "/solutions/soundcloud-clone-app-development", icon: <FaMusic /> },
      { title: "Spotify Clone", href: "/solutions/spotify-clone-app-development", icon: <FaSpotify /> },
      { title: "Ghost Lens Clone", href: "/solutions/ghost-lens-clone-app-development", icon: <FaCameraRetro /> },
      { title: "Olx/Airbnb Clone", href: "/solutions/olx-clone-app-development", icon: <FaHome /> },
    ],
  },


    // ✅ INDUSTRIES (main link: /industries)
//   {
//     id: "industry",
//     title: "Industry‑Specific Solutions",
// heading: "Industry‑Specific Solutions",
//     icon: <FaIndustry className="inline-block text-sky-600" />,
    
//     href: "/industries",
//      description:
//       "We build tailored digital products for high‑impact industries like education, healthcare, finance and retail, aligned with domain workflows.",
//     items: [
//       { title: "Healthcare", href: "/industries/healthcare-app-development", icon: <FaHeartbeat /> },
//       { title: "Education / E-Learning", href: "/industries/elearning-app-development", icon: <FaGraduationCap /> },
//       { title: "Real Estate", href: "/industries/real-estate-app-development", icon: <FaBuilding /> },
//       { title: "Travel & Tourism", href: "/industries/travel-app-development", icon: <FaPlane /> },
//       { title: "Food & Restaurant", href: "/industries/food-delivery-app-development", icon: <FaUtensils /> },
//       { title: "Fitness & Wellness", href: "/industries/fitness-app-development", icon: <FaDumbbell /> },
//       { title: "Retail & E-Commerce", href: "/industries/ecommerce-app-development", icon: <FaStore /> },
      
//       { title: "Logistics/Transportation", href: "/industries/logistics-app-development", icon: <FaTruck /> },

//       // URL missing in your list -> fallback
//       { title: "Media & Entertainment", href: "/industries", icon: <FaFilm /> },

//       { title: "Social Networking", href: "/industries/social-media-app-development", icon: <FaUsers /> },
//       { title: "Finance / FinTech", href: "/industries/fintech-software-development", icon: <FaDollarSign /> },
//       { title: "Automotive", href: "/industries/automotive-app-development", icon: <FaCar /> },
//       { title: "Construction", href: "/industries/construction-management-software-development", icon: <FaHammer /> },
//       { title: "Manufacturing", href: "/industries/manufacturing-app-development", icon: <FaFactory /> },
//       { title: "Event Management", href: "/industries/event-management-software-development", icon: <FaCalendarAlt /> },
//       // { title: "AR/VR", href: "/industries/ar-vr-app-development", icon: <FaVrCardboard /> },
//     ],
//   },

];

const SolutionsMenu = () => {
  const [activeTab, setActiveTab] = useState("industry");
  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[40rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="grid grid-cols-1 xl:grid-cols-[28%_72%] h-full">
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
                    <span className={`text-[0.85rem] ${activeTab === tab.id ? "text-sky-500" : "hidden"}`}>
                      <FaArrowRight />
                    </span>
                  </h3>
                </div>
              ))}

              {/* mini stats / graph style card (unchanged UI) */}
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
            </div>

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
                        className="group flex gap-3 p-1 rounded-2xlborderborder-sky-100 bg-whitehover:bg-sky-50 hover:border-sky-200shadow-lghover:shadow-md transition"
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

export default SolutionsMenu;
