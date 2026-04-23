"use client";
import React from "react";
import {
  FaFacebookF,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBeta } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Form from "./InquirySection";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  const offerings = [
    { label: "Software Development", href: "/services/software-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "Web & CMS Development", href: "/services/web-development" },
    { label: "E-Commerce Development", href: "/services/ecommerce-development" },
    { label: "Blockchain Development", href: "/services/blockchain-development" },
    { label: "AI & ML Services", href: "/services/ai-ml" },
    { label: "IoT & Embedded", href: "/services/iot-embedded" },
    { label: "DevOps & Cloud", href: "/services/devops-cloud" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/our-team" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact Us", href: "/contact" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Career", href: "/careers" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
  ];


  const insigightsLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Featured", href: "/featured" },
    { label: "Articals", href: "/articals" },
    { label: "Whitepapers", href: "/whitepapers" },
    { label: "Guides", href: "/guides" },
    { label: "Press Releases", href: "/press-releases" },
    { label: "Media Coverage", href: "/media-coverage" },
    { label: "Podcasts", href: "/podcasts" },
  ];


  const partnerLogos = [
    "/images/logo/AnyTime Astro-logo.webp",
    "/images/logo/CoreValentLogo.png",
    "/images/logo/Bumpy_logo.webp",
    "/images/logo/potafologo.png",
    "/images/logo/LoveLocal-logo.webp",
    "/images/logo/practivoo.png",
    "/images/logo/Moglix_logo.webp",
    "/images/logo/Snoonu-logo.webp",
    "/images/logo/guidely-logo.webp",
  ];

  const socialIcons = [
    { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/softkingo" },
    { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/softkingo" },
    { Icon: FaXTwitter, label: "X", href: "https://x.com/softkingo" },
    { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@softkingo" },
    { Icon: IoLogoInstagram, label: "Instagram", href: "https://www.instagram.com/softkingo" },
    { Icon: TbBeta, label: "Clutch", href: "https://clutch.co/profile/softkingo" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="mt10 mb-12 md:mb-0">
      {/* <Form /> */}

      <footer className="w-full bg-gradient-to-b from-sky-50 via-white to-white bgwhite text-slate-900 border-t border-slate-100 relative overflow-hidden">
        {/* subtle background shapes in white theme */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-sky-50 blur-3xl opacity-70" />
          {/* <div className="absolute bottom-[-220px] right-[-80px] w-[520px] h-[520px] rounded-full bg-cyan-50 blur-3xl opacity-70" /> */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:pt-24">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <Image
                  src="/images/softkingo-logo.png"
                  alt="Softkingo"
                  width={229}
                  height={49}
                  className="w-40 md:w-44"
                />
                <div className="bg-sky-50 border border-sky-100 rounded-xl px-3 py-2 flex flex-col items-center justify-center text-[10px] font-semibold tracking-wide text-sky-700 uppercase leading-normal shadow-[0_10px_25px_rgba(15,23,42,0.06)] hidden">
                  <span>Great</span>
                  <span>Place</span>
                  <span>To</span>
                  <span>Work</span>
                </div>
              </div>
              <Link
                href="/ebooks"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-00  border border-sky-400 text-sky-400 text-xs font-semibold hover:shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:text-white  hover:bg-sky-500 transition-colors w-fit"
              >
                Download Ebooks
                <FaArrowRight className="text-[0.75rem]" />
              </Link>

              <p className="text-sm text-slate-600 leading-relaxed">
                Softkingo is an ISO-certified digital solutions provider offering web, mobile app, and digital marketing services with a focus on scalable, high-quality results.
                Serving clients in 107 countries, we deliver end-to-end IT solutions across 39+ industries, driving growth and measurable success.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-sky-700 tracking-[0.14em] uppercase">
                Contact
              </h3>
              <div className="space-y-4 text-sm">
                <FooterContactRow
                  title="Email"
                  value="sales@softkingo.com"
                  href="mailto:sales@softkingo.com"
                  type="mail"
                />
                <FooterContactRow
                  title="Phone"
                  value="+91 74287 50870"
                  href="tel:+917428750870"
                  type="phone"
                />
                <FooterContactRow
                  title="Address"
                  value="B-148, Block B, Sector 63, Noida, UP - 201301, India"
                  type="location"
                />
                <FooterContactRow
                  title="Address"
                  value="A179, Block ED,  New Delhi, Delhi, 110096, India"
                  type="location"
                />
              </div>
            </div>

            {/* Offerings */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-sky-700 tracking-[0.14em] uppercase">
                Services
              </h3>
              <ul className="space-y-2 text-sm">
                {offerings.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-600 hover:text-sky-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
            <div className="flex justify-between max-w-xs">
              {/* Company Links */}
              <div className="space-y-5">
                <h3 className="text-xs font-semibold text-sky-700 tracking-[0.14em] uppercase">
                  Company
                </h3>
                <ul className="space-y-2 text-sm">
                  {companyLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-slate-600 hover:text-sky-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
              <div className="space-y-5">
                <h3 className="text-xs font-semibold text-sky-700 tracking-[0.14em] uppercase">
                  Insights
                </h3>
                <ul className="space-y-2 text-sm">
                  {insigightsLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-slate-600 hover:text-sky-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </div>

          {/* Partner Logos - Auto Carousel */}
          <div className="relative my-10 overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-sky-100 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
            <p className="text-center text-xs md:text-sm font-medium text-slate-500 mb-5 tracking-wide">
              Trusted by industry leaders and fast‑growing startups worldwide
            </p>

            <div className="overflow-hidden ">
              <div className="flex gap-6 md:gap-10 animate-logo-scroll">
                {/* 2x map for seamless infinite loop */}
                {[...partnerLogos, ...partnerLogos].map((src, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
                  >
                    <div className="bg-white rounded-xl  border border-slate-100 flex items-center justify-center h-14 w-full px-4">
                      <Image
                        src={src}
                        alt={`Partner ${index + 1}`}
                        width={80}
                        height={40}
                        className="object-contain h-8 w-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* optional gradient fade on sides */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
          </div>

          <style >{`
  @keyframes logo-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-logo-scroll {
    animation: logo-scroll 30s linear infinite;
  }

  @media (max-width: 768px) {
    .animate-logo-scroll {
      animation-duration: 22s;
    }
  }
`}</style>

          {/* Bottom Footer */}
          <div className="border-t border-slate-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
              {/* Copyright */}
              <p className="text-slate-500 text-xs md:text-sm">
                © {currentYear} Softkingo Technologies Pvt. Ltd. All rights reserved.
              </p>


              {/* Social Icons */}
              <div className="flex flex-wrap justify-center gap-3">
                {socialIcons.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>


              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
                {["Privacy Policy", "Terms Conditions", "faq", "Site-map"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-slate-500 hover:text-sky-600 transition-colors"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

/* Helpers */

function FooterContactRow({ title, value, href, type }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="mt-1 text-sky-500">
        {type === "mail" && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        )}
        {type === "phone" && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.1 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.33 1.6.63 2.36a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.71-1.19a2 2 0 0 1 2.11-.15 11.36 11.36 0 0 0 2.38.65A2 2 0 0 1 22 16.92z" />
          </svg>
        )}
        {type === "location" && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21s-6-4.35-6-10a6 6 0 0 1 12 0c0 5.65-6 10-6 10z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
        )}
      </span>
      <div>
        <p className="font-medium text-slate-700">{title}</p>
        {href ? (
          <a
            href={href}
            className="text-slate-600 hover:text-sky-600 transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-slate-600">{value}</p>
        )}
      </div>
    </div>
  );
}
