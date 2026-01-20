// app/(public)/components/navbar/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import AboutUsDropdown from "../dropdown/AboutDropdown";
import ServiceDropdown from "../dropdown/ServiceDropdown";
import HireResourcesDropdown from "../dropdown/HireResourcesDropdown";
import IndustriesMenu from "../dropdown/IndustriesMenu";
import SolutionsMenu from "@/dropdown/SolutionsMenu";
import ResourcesMenu from "../dropdown/InsightsMenu";
import SideBar from "./Sidebar";
import Slogo from "../../public/images/softkingo-logo.png";
import { FaArrowRight } from "react-icons/fa";
import PopupQuoteModal from "./PopupQuoteModal";
import { HiSparkles } from "react-icons/hi";
import { FaChevronDown } from 'react-icons/fa';


const Navbar = () => {
  const pathname = usePathname();

  const [showAboutUsDropdown, setShowAboutUsDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showHireDropdown, setShowHireDropdown] = useState(false);
  const [showIndustriesDropdown, setIndustriesDropdown] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showResourceDropdown, setShowResourceDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sidebarButtonRef = useRef(null);

  // detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // scroll top style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const linkClass = (path) => {
    const base = "a-main-title cursor-pointer text-sm border-b-2";
    const active = "border-sky-600 text-sky-600";
    const inactive =
      "border-transparent text-sky-900 hover:border-sky-400 hover:text-sky-600";
    return `${base} ${isActive(path) ? active : inactive}`;
  };

  const toggleSidebar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`p-0 sticky z-30 top-0 header slider-active-bg main-navbar ${isScrolled ? "shadow-md bg-white/90 backdrop-blur-md" : ""
          }`}
      >


        {/* main navbar */}
        <div className="bg-transparent">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 md:py-2">
              {/* logo */}
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Image
                    alt="Softkingo"
                    src={Slogo.src}
                    height={58}
                    width={161}
                    className="w-[8rem] md:w-[9rem] lg:w-[14rem]"
                  />
                </Link>
              </div>

              <div className="flex h-full items-center space-x-4 md:space-x-6">
                {/* desktop nav */}
                {!isMobile ? (
                  <nav className="hidden sm:block">
                    <ul className="flex justify-between items-center space-x-5 mb-0 gap-3 text-sky-900">
                      <li className="relative group">
                        <Link
                          href="/ai"
                          className="relative flex items-center gap-2 px-4 py-2 rounded-full 
    bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
    bg-[length:200%_200%] 
    animate-gradient-x 
    text-white text-sm font-medium 
    shadow-[0_4px_20px_rgba(168,85,247,0.4)]
    hover:shadow-[0_6px_30px_rgba(168,85,247,0.6)] 
    hover:scale-105 
    transition-all duration-300 ease-out
    overflow-hidden border border-purple-500/50
    group-hover:bg-gradient-to-l
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer before:pointer-events-none"
                        >
                          {/* Sparkle icon with pulse */}
                          <div className="relative">
                            <HiSparkles className="text-lg animatepulse group-hover: animate-[spin_2s_linear_infinite]" />
                          </div>

                          {/* AI Text */}
                          <span className="relative z-10 tracking-wide font-semibold">AI</span>

                          {/* Arrow on hover */}
                          <FaArrowRight className="ml-1 text-xs opacity-100 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>

                        {/* Floating particles */}
                        <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute top-2 left-2 w-1 h-1 bg-white/50 rounded-full animate-ping" />
                          <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/50 rounded-full animate-ping delay-150" />
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping delay-300" />
                        </div>
                      </li>
                      {/* About */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowAboutUsDropdown(true)}
                        onMouseLeave={() => setShowAboutUsDropdown(false)}
                      >
                        <Link href="/about" className={linkClass("/about")}>
                          About Us
                        </Link>
                        <FaChevronDown className="absolute -right-5 top-1/2 -translate-y-1/2 text-sm text-sky-900 group-hover:text-sky-600 transition-all" />                        <div
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "100%",
                          }}
                        />
                        {showAboutUsDropdown && <AboutUsDropdown />}
                      </li>

                      {/* Services */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowServiceDropdown(true)}
                        onMouseLeave={() => setShowServiceDropdown(false)}
                      >
                        <Link
                          href="/services"
                          className={linkClass("/services")}
                        >
                          Services
                        </Link>
                        <FaChevronDown className="absolute -right-5 top-1/2 -translate-y-1/2 text-sm text-sky-900 group-hover:text-sky-600 transition-all" />                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showServiceDropdown && <ServiceDropdown />}
                      </li>

                      {/* Hire Resources */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowHireDropdown(true)}
                        onMouseLeave={() => setShowHireDropdown(false)}
                      >
                        <Link
                          href="/hire"
                          className={linkClass("/hire")}
                        >
                          Hire Resources
                        </Link>
                        <FaChevronDown className="absolute -right-5 top-1/2 -translate-y-1/2 text-sm text-sky-900 group-hover:text-sky-600 transition-all" />                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showHireDropdown && <HireResourcesDropdown />}
                      </li>
                      {/* Solutions  */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowSolutionsDropdown(true)}
                        onMouseLeave={() => setShowSolutionsDropdown(false)}
                      >
                        <Link href='/solutions'
                          className={linkClass("/solutions")}>
                          Solutions
                        </Link>
                        <FaChevronDown className="absolute -right-5 top-1/2 -translate-y-1/2 text-sm text-sky-900 group-hover:text-sky-600 transition-all" />                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showSolutionsDropdown && <SolutionsMenu />}
                      </li>

                      {/*  (IndustriesMenu reuse) */}
                      <li
                        className="relative"
                        onMouseEnter={() => setIndustriesDropdown(true)}
                        onMouseLeave={() => setIndustriesDropdown(false)}
                      >
                        <Link href='/industries'
                          className={linkClass("/industries")}>
                          Industries
                        </Link>
                        <FaChevronDown className="absolute -right-5 top-1/2 -translate-y-1/2 text-sm text-sky-900 group-hover:text-sky-600 transition-all" />                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showIndustriesDropdown && <IndustriesMenu />}
                      </li>

                      {/* Resources */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowResourceDropdown(true)}
                        onMouseLeave={() => setShowResourceDropdown(false)}
                      >

                        <Link href='/insights'
                          className={linkClass("/insights")}>
                          Insights

                        </Link>
                        <FaChevronDown className="absolute -right-5 top-1/2 -translate-y-1/2 text-sm text-sky-900 group-hover:text-sky-600 transition-all" />                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showResourceDropdown && <ResourcesMenu />}
                      </li>

                      {/* Portfolio (Our Work → Portfolio) */}
                      <li className="relative">
                        <Link
                          href="/portfolio"
                          className={linkClass("/portfolio")}
                        >
                          Portfolio
                        </Link>
                      </li>

                      {/* Contact */}
                      <li>
                        <Link href="/contact" className=' px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 hidden lg:flex items-center'
                        // {linkClass("/contact")}
                        >
                          Contact Us
                        </Link>
                      </li>

                      {/* Complete Animated AI Button - Self-contained */}



                    </ul>
                  </nav>
                ) : (
                  // mobile hamburger (md–only bar you had ko replace kar diya)
                  <button
                    ref={sidebarButtonRef}
                    onClick={toggleSidebar}
                    className={`absolute w-6 h-5 right-0 flex-col justify-between items-center hidden md:flex lg:hidden group ${isMenuOpen ? "rotate-90" : ""
                      } transition-transform duration-300`}
                    aria-label="Toggle navigation menu"
                  >

                    <span
                      className={`block absolute left-0 w-full h-[2px] bg-gray-700 group-hover:bg-sky-500 transition-all duration-300 ${isMenuOpen ? "top-1/2 rotate-45" : "top-0"
                        }`}
                    />

                    <span
                      className={`block absolute left-0 w-full h-[2px] bg-gray-700 group-hover:bg-sky-500 transition-all duration-300 ${isMenuOpen
                        ? "opacity-0"
                        : "top-1/2 -translate-y-1/2"
                        }`}
                    />
                    {/* Bottom bar */}
                    <span
                      className={`block absolute left-0 w-full h-[2px] bg-gray-700 group-hover:bg-sky-500 transition-all duration-300 ${isMenuOpen ? "bottom-1/2 -rotate-45" : "bottom-0"
                        }`}
                    />
                  </button>
                )}

                {/* CTA buttons */}
                {/* <button
                  onClick={() => setShowModal(true)}
                  // className="px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 hidden lg:flex items-center"
                  className="px-4 md:px-6 py-2 rounded-full bg-white  text-sky-400 border border-sky-400 bg-gradient-to-rfrom-sky-600via-sky-500to-sky-400 hover:text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 hover:shadow-lg shadow-sky-900/30 transition-all duration-300 hidden lg:flex items-center"
                >
                  Get A Quote <FaArrowRight className="ml-2" />
                </button> */}

                {/* <button
                  onClick={() => setShowModal(true)}
                  className="px-4 md:px-6 py-2 rounded-full bg-white text-sky-600 text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 hover:text-white transform hover:-translate-y-1 border border-sky-500 transition-all duration-300 flex items-center lg:hidden"
                >
                  Get A Quote <FaArrowRight className="ml-2" />
                </button> */}
                {/* Contact */}

                {/* Complete Animated AI Button - Self-contained */}
                <span className="relative group lg:hidden">
                  <Link
                    href="/ai"
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full 
    bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
    bg-[length:200%_200%] 
    animate-gradient-x 
    text-white text-sm font-medium 
    shadow-[0_4px_20px_rgba(168,85,247,0.4)]
    hover:shadow-[0_6px_30px_rgba(168,85,247,0.6)] 
    hover:scale-105 
    transition-all duration-300 ease-out
    overflow-hidden border border-purple-500/50
    group-hover:bg-gradient-to-l
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer before:pointer-events-none"
                  >
                    {/* Sparkle icon with pulse */}
                    <div className="relative">
                      <HiSparkles className="text-lg animatepulse group-hover: animate-[spin_2s_linear_infinite]" />
                    </div>

                    {/* AI Text */}
                    <span className="relative z-10 tracking-wide font-semibold">AI</span>

                    {/* Arrow on hover */}
                    <FaArrowRight className="ml-1 text-xs opacity-100 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>

                  {/* Floating particles */}
                  <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-white/50 rounded-full animate-ping" />
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/50 rounded-full animate-ping delay-150" />
                    <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping delay-300" />
                  </div>
                </span>

                <style>
                  {
                    `
  @keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

/* Particles ping delay */
.delay-150 {
  animation-delay: 0.15s;
}
.delay-300 {
  animation-delay: 0.3s;
}

  `
                  }
                </style>

                <div className="hidden md:flex lg:hidden w-12 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile && isMenuOpen && <SideBar setShowModal={setShowModal} />}

      {/* Popup with InquiryForm inside */}
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;

/* small helper for top strip */

function TopNumber({ flag, label, href }) {
  return (
    <div className="flex items-center space-x-2 w-40">
      <Image alt="flag" width={18} height={18} src={flag} />
      <Link
        href={href}
        className="text-[13px] font-normal leading-none text-slate-700 hover:text-sky-600"
      >
        {label}
      </Link>
    </div>
  );
}
