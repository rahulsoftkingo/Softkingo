// app/(public)/components/InquirySection.jsx
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
import ReactCountryFlag from "react-country-flag";
import { GoMail } from "react-icons/go";
import { TfiSkype } from "react-icons/tfi";
import InquiryForm from "../public/InquiryForm";

const InquirySection = () => {
  const contactNumbers = [
    { country: "UNITED STATES", phone: "+1 323-908-3492", code: "US" },
    // { country: "UNITED KINGDOM", phone: "+44 (0)20-7993-2188", code: "GB" },
    { country: "EUROPE", phone: "+34 93-802-3010", code: "EU" },
    { country: "INDIA", phone: "+91-989-802-1433", code: "IN" },
    { country: "AUSTRALIA", phone: "+61 2 6145 2066", code: "AU" },
    // { country: "AFRICA", phone: "+234 915-242-4242", code: "ZA" },
  ];

  const otherContacts = [
    {
      icon: <GoMail />,
      label: "EMAIL",
      value: "info@softkingo.com",
      type: "email",
    },
    {
      icon: <TfiSkype />,
      label: "SKYPE",
      value: "softkingo",
      type: "skype",
    },
  ];

  const socialIcons = [
    FaFacebookF,
    FaLinkedin,
    FaXTwitter,
    FaYoutube,
    IoLogoInstagram,
    TbBeta,
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#E5F9FF] via-[#F4FBFF] to-white  py-18 lg:py-6 lg:mt-90">
      {/* soft bg blob */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-[-200px] right-[-80px] w-[420px] h-[420px] rounded-full bg-cyan-100 blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* form top offset / centered on small screens */}
      

        {/* lower grid: left contact + maybe re-use form or something else */}
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: CONTACT CHANNELS */}
          <div className="space-y-8">
            {/* Title & description */}
            <div className="mt-2 lg:-mt-50">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1 text-[11px] font-semibold tracking-wide text-sky-700 border border-sky-100">
                Inquiry
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-sky-600">
                Let&apos;s get in touch
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-600 max-w-lg">
                Want to discuss a new idea, modernize an existing product, or
                hire a dedicated team? Pick any of these channels or fill the
                form above — we&apos;ll get back quickly.
              </p>
            </div>

       
            {/* Numbers – horizontal scroll on mobile */}
            <div className="lg:flex-wrap flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
              {contactNumbers.map((c) => (
                <div
                  key={c.phone}
                  className="min-w-[210px] rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-500">
                    <ReactCountryFlag
                      style={{ fontSize: "1em", lineHeight: "1em" }}
                      countryCode={c.code}
                      svg
                    />
                    <span>{c.country}</span>
                  </div>
                  <a
                    href={`tel:${c.phone}`}
                    className="mt-1 block text-sm font-medium text-[#0B3250]"
                  >
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* Other contact methods */}
            <div className="flex  gap-4 pt-2 overflow-auto hide-scrollbar">
              {otherContacts.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/90 px-4 py-3  min-w-[190px]"
                >
                  <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 text-lg ">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-slate-500 ">
                      {c.label}
                    </p>
                    <a
                      href={
                        c.type === "skype"
                          ? `skype:${c.value}?chat`
                          : `mailto:${c.value}`
                      }
                      className="text-sm text-[#0B3250] hover:text-sky-600"
                    >
                      {c.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {socialIcons.map((Icon, index) => (
                <button
                  key={index}
                  aria-label="social"
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN khali chhor sakte ho ya koi image / stats add kar sakte ho */}
          {/* <div className="hidden lg:block" /> */}
            <div className="-mt-1 lg:-mt-70 flex justify-center z-10">
         <InquiryForm
  title="Hey! there 🙂"
  subtitle=""
  tagline="Quick inquiryt"
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
