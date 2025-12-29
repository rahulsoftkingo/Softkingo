"use client";

import React, { useMemo } from "react";
import {
  FaUserCheck,
  FaProjectDiagram,
  FaUsersCog,
  FaHeadset,
  FaDatabase,
  FaShieldAlt,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

function StrengthCard({ icon, title, points }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/80 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700">
          <span className="text-xl">{icon}</span>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-sky-900">{title}</h3>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">{points}</p>
        </div>
      </div>
    </div>
  );
}

export default function Strengths_Scroll({ scrollRef }) {
  const strengths = useMemo(
    () => [
      {
        icon: <FaUserCheck />,
        title: "Client‑Centric Development",
        points:
          "Requirements ko clearly understand karke solution build karte hain—better UX, better performance, aur long‑term maintainability ke saath.",
      },
      {
        icon: <FaProjectDiagram />,
        title: "Agile Delivery Process",
        points:
          "Sprint planning, regular demos, and clear milestones—so progress visible rahe aur changes handle ho jayein without delays.",
      },
      {
        icon: <FaUsersCog />,
        title: "Dedicated Expert Team",
        points:
          "Project ke size ke hisaab se focused team allocate hoti hai (frontend, backend, QA, DevOps) so ownership clear aur output consistent rahe.",
      },
      {
        icon: <FaHeadset />,
        title: "Smart Support & Communication",
        points:
          "Fast response, clear updates, and structured handover—project ke har stage pe smooth collaboration ensure hota hai.",
      },
      {
        icon: <FaDatabase />,
        title: "Reliable Backups & Recovery",
        points:
          "Regular backups + rollback strategy—data loss risk minimize hota hai aur urgent situations me recovery quick hoti hai.",
      },
      {
        icon: <FaShieldAlt />,
        title: "Security & Data Protection",
        points:
          "Access control, secure deployments, and NDA-ready workflows—client data aur IP ko safe rakhna top priority hota hai.",
      },
      {
        icon: <FaCheckCircle />,
        title: "Quality Control",
        points:
          "Code reviews, testing practices, aur checklist-based delivery—so output stable, scalable, aur production-ready rahe.",
      },
      {
        icon: <FaChartLine />,
        title: "Continuous Improvement",
        points:
          "Performance monitoring + iteration mindset—features ship karne ke baad bhi improvements, optimization, aur upgrades planned rehte hain.",
      },
    ],
    []
  );

  return (
    <section
      ref={scrollRef}
      className="w-full bg-gradient-to-b from-white to-sky-50 py-10 sm:py-12 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {/* Sidebar */}
          <div className="md:sticky md:top-24 h-fit">
            {/* Portfolio-like heading */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900">
                Our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
                  Strengths
                </span>
              </h2>

             <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto md:mx-0">
  Strong process, reliable engineering, and clear communication—so delivery fast bhi ho aur quality bhi compromise na ho.
</p>

{/* Desktop-only extended content */}
<div className="hidden lg:block mt-5 max-w-xl">
  <p className="text-sm text-slate-600 leading-relaxed">
    Har project me clarity + accountability maintain karte hain—requirements discovery se leke final
    deployment tak. Isse scope creep kam hota hai, timelines predictable rehti hain, aur output production-ready
    quality ke saath ship hota hai.
  </p>



  {/* Quick highlights chips */}
  <div className="mt-5 flex flex-wrap gap-2">
    {["Agile Delivery", "Dedicated Team", "Quality Control", "Secure by Design", "Smart Support"].map(
      (t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100"
        >
          {t}
        </span>
      )
    )}
  </div>
</div>

            </div>

            {/* image */}
            <div className="mt-8 hidden md:block">
              <img
                src="/images/blog1.png"
                alt="Strengths"
                className="rounded-2xl border border-sky-100 shadow-sm w-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            {strengths.map((str, index) => (
              <StrengthCard
                key={index}
                icon={str.icon}
                title={str.title}
                points={str.points}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
