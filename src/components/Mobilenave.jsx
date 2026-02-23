// components/MobileNav.js
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaEnvelope,
  FaBriefcase,
  FaMobileAlt,
  FaGlobe,
  FaBullhorn,
  FaIndustry,
  FaUserPlus,

  // FaHome,
  FaBook,
  // FaBriefcase,
  FaTools,
  FaBlog,
  FaUserTie,
  FaPuzzlePiece,
  FaInfoCircle,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBar from "./Sidebar";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false); // plus popup
  const [isMenuOpen, setIsMenuOpen] = useState(false); // sidebar
  const [isMobile, setIsMobile] = useState(false);

  const popupRef = useRef(null);
  const popupButtonRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarButtonRef = useRef(null);

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePopup = () => setIsOpen((o) => !o);
  const toggleSidebar = () => setIsMenuOpen((o) => !o);

  // backdrop + outside click close
  useEffect(() => {
    const handler = (e) => {
      // backdrop / outside click
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        popupButtonRef.current &&
        !popupButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }

      if (
        isMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        sidebarButtonRef.current &&
        !sidebarButtonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isOpen, isMenuOpen]);

  const popupItems = [
    {
      icon: <FaTools className="text-sky-300 text-lg" />,
      text: "Services",
      href: "/services",
    },
    {
      icon: <FaBlog className="text-sky-300 text-lg" />,
      text: "Blog",
      href: "/blog",
    },
    {
      icon: <FaUserTie className="text-sky-300 text-lg" />,
      text: "Hire",
      href: "/hire",
    },
    {
      icon: <FaIndustry className="text-sky-300 text-lg" />,
      text: "Solutions",
      href: "/solutions",
    },
    {
      icon: <FaInfoCircle className="text-sky-300 text-lg" />,
      text: "About",
      href: "/about",
    },
  ];

  if (!isMobile) return null;

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Backdrop only */}
        <div
          className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Semi-circle icon cloud (no bg/blur/border/shadow) */}
        <div
          ref={popupRef}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 w-64 h-32 flex items-center justify-center z-20 pointer-events-none`}
        >
          <div className="relative w-full h-full">
            {popupItems.map((item, index) => (
              <Link
                key={item.text}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${isOpen ? "opacity-100" : "opacity-0 scale-0"
                  }`}
                style={{
                  transform: isOpen
                    ? getPosition(index)
                    : "translate(-50%, -50%) scale(0)",
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:bg-sky-50">
                    {item.icon}
                  </div>
                  <span className="text-sky-50 text-[11px] font-medium mt-1">
                    {item.text}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative flex justify-between items-center px-4 py-3">
          <div className="absolute rounded-t-2xl inset-0 z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              className="fill-white stroke-sky-100 rounded-t-2xl"
              strokeWidth="1"
            >
              <path d="M0,0 L135,0 C165,0 175,50 200,50  C225,50 235,0 270,0 L400,0 L400,100 L0,100 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex justify-between items-center w-full rounded-t-2xl">
            {/* Home */}
            <Link
              href="/"
              className={`flex flex-col items-center text-xs ${isActive("/") ? "text-sky-600" : "text-gray-500 hover:text-sky-600"
                } transition`}
            >
              <FaHome className="text-lg" />
              <span className="mt-1">Home</span>
            </Link>

            {/* Portfolio */}
            <Link
              href="/portfolio"
              className={`flex flex-col items-center text-xs ${isActive("/portfolio")
                ? "text-sky-600"
                : "text-gray-500 hover:text-sky-600"
                } transition`}
            >
              <FaBriefcase className="text-lg" />
              <span className="mt-1">Portfolio</span>
            </Link>

            {/* Center logo button (no plus) */}
            <button
              ref={popupButtonRef}
              onClick={togglePopup}
              className={`relative z-30 -mt-10 w-16 h-16 rounded-full bg-sky-50 shadow-lg flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${isOpen ? "scale-95" : ""
                }`}
            >
              <img
                src="/images/logo.png"
                alt="Softkingo"
                className="w-10 h-10 object-contain"
              />
            </button>

            {/* Contact */}
            <Link
              href="/e-guides"
              className={`flex flex-col items-center text-xs ${isActive("/e-guides")
                ? "text-sky-600"
                : "text-gray-500 hover:text-sky-600"
                } transition`}
            >
              <FaBook className="text-lg" />
              <span className="mt-1">Eguides</span>
            </Link>

            {/* Sidebar menu */}
            <div className="flex flex-col items-center text-xs text-gray-500 hover:text-sky-600 transition">
              <ul className="flex items-center justify-center  z-10 px-2">
                <li className="group">
                  <button
                    ref={sidebarButtonRef}
                    onClick={toggleSidebar}
                    className={`relative w-5 mb-1 h-4 flex flex-col justify-between cursor-pointer transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""
                      }`}
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
                    <span
                      className={`block absolute left-0 w-full h-[2px] bg-gray-700 group-hover:bg-sky-500 transition-all duration-300 ${isMenuOpen ? "bottom-1/2 -rotate-45" : "bottom-0"
                        }`}
                    />
                  </button>
                </li>
              </ul>
              <span className="mt-1">Menu</span>
            </div>
          </div>
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div ref={sidebarRef}>
          <SideBar />
        </div>
      )}
    </>
  );
}

function getPosition(index) {
  const positions = [
    "translate(-10%, -90px)",
    "translate(calc(-50% - 50px), -65px)",
    "translate(calc(-50% + 90px), -65px)",
    "translate(calc(-50% - 100px), -20px)",
    "translate(calc(-50% + 140px), -20px)",
  ];
  return positions[index];
}
