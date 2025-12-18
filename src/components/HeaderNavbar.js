// app/(public)/components/navbar/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import AboutUsDropdown from "../dropdown/AboutDropdown";
import ServiceDropdown from "../dropdown/ServiceDropdown";
import HireResourcesDropdown from "../dropdown/HireResourcesDropdown";
import IndustriesMenu from "../dropdown/IndustriesMenu"; // yahi Solutions ke liye use kar rahe
import ResourcesMenu from "../dropdown/InsightsMenu";
import SideBar from "./Sidebar";
import Slogo from "../../public/images/softkingo-logo.png";
import { FaArrowRight } from "react-icons/fa";
import PopupQuoteModal from "./PopupQuoteModal";

const Navbar = () => {
  const pathname = usePathname();

  const [showAboutUsDropdown, setShowAboutUsDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showHireDropdown, setShowHireDropdown] = useState(false);
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
      "border-transparent text-slate-700 hover:border-sky-400 hover:text-sky-600";
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
        {/* top contact strip (desktop only, not when scrolled) */}
        {!isScrolled && (
          <div className="py-2 bg-white border-b border-slate-100 hidden lgblock">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center flex-wrap gap-4">
                  <TopNumber
                    flag="https://www.hyperlinkinfosystem.com/assets/img/ind-flag.svg"
                    label="+91-7428750870"
                    href="tel:+917428750870"
                  />
                  <TopNumber
                    flag="https://www.hyperlinkinfosystem.com/assets/img/us-flag.svg"
                    label="+1 (309)791-4105"
                    href="tel:+13097914105"
                  />
                  <TopNumber
                    flag="https://www.hyperlinkinfosystem.com/assets/img/uk-flag.svg"
                    label="+44 20 3287 9060"
                    href="tel:+442032879060"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/press-releases"
                    className="bg-white border border-sky-400 py-2 px-4 rounded-full text-xs md:text-sm font-medium text-sky-500 hover:text-white hover:bg-sky-600 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-800/30 transition-all duration-300 flex items-center"
                  >
                    Press Release
                  </Link>
                  <Link
                    href="/our-portfolio"
                    className="bg-white border border-sky-400 py-2 px-4 rounded-full text-xs md:text-sm font-medium text-sky-500 hover:text-white hover:bg-sky-600 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-800/30 transition-all duration-300 flex items-center"
                  >
                    Our Fresh Work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <nav className="hidden md:block">
                    <ul className="flex justify-between items-center space-x-5 mb-0">
                      {/* About */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowAboutUsDropdown(true)}
                        onMouseLeave={() => setShowAboutUsDropdown(false)}
                      >
                        <Link href="/about" className={linkClass("/about")}>
                          About Us
                        </Link>
                        <span className="absolute text-2xl mt-1">&#129171;</span>
                        <div
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
                        <span className="absolute text-2xl mt-1">&#129171;</span>
                        <div
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
                        <span className="absolute text-2xl mt-1">&#129171;</span>
                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showHireDropdown && <HireResourcesDropdown />}
                      </li>

                      {/* Solutions (IndustriesMenu reuse) */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowSolutionsDropdown(true)}
                        onMouseLeave={() => setShowSolutionsDropdown(false)}
                      >
                        <Link href='/solutions'
                          className={linkClass("/solutions")}>
                          Solutions
                        </Link>
                        <span className="absolute text-2xl mt-1">&#129171;</span>
                        <div
                          className="right-1"
                          style={{
                            position: "absolute",
                            height: "21px",
                            width: "110%",
                          }}
                        />
                        {showSolutionsDropdown && <IndustriesMenu />}
                      </li>

                      {/* Resources */}
                      <li
                        className="relative"
                        onMouseEnter={() => setShowResourceDropdown(true)}
                        onMouseLeave={() => setShowResourceDropdown(false)}
                      >
                        <span className="a-main-title cursor-pointer text-sm border-b-2 border-transparent hover:border-sky-400 hover:text-sky-600">
                          Insights
                        </span>
                        <span className="absolute text-2xl mt-1">&#129171;</span>
                        <div
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
                        <Link href="/contact" className={linkClass("/contact")}>
                          Contact Us
                        </Link>
                      </li>
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
                    {/* Top bar */}
                    <span
                      className={`block absolute left-0 w-full h-[2px] bg-gray-700 group-hover:bg-sky-500 transition-all duration-300 ${isMenuOpen ? "top-1/2 rotate-45" : "top-0"
                        }`}
                    />
                    {/* Middle bar */}
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
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 hidden lg:flex items-center"
                >
                  Get A Quote <FaArrowRight className="ml-2" />
                </button>

                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 md:px-6 py-2 rounded-full bg-white text-sky-600 text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 hover:text-white transform hover:-translate-y-1 border border-sky-500 transition-all duration-300 flex items-center lg:hidden"
                >
                  Get A Quote <FaArrowRight className="ml-2" />
                </button>

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
