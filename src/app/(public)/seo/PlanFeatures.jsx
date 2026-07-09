"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Waypoints, Shield, BarChart3, Users } from "lucide-react";
import CommonTitle from "@/components/ui/CommonTitle";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    priceNote: null,
    credits: "900 credits",
    creditsNote: "per seat per year, granted monthly",
    cta: "Get started",
    ctaStyle: "bg-sky-300 text-slate-900 hover:bg-sky-400",
  },
  {
    id: "basic",
    name: "Basic",
    price: "$49",
    priceNote: "Per seat per month, billed annually",
    credits: "30,000 credits",
    creditsNote: "per seat per year, granted upfront",
    cta: "Buy now",
    ctaStyle: "bg-sky-300 text-slate-900 hover:bg-sky-400",
  },
  {
    id: "pro",
    name: "Professional",
    badge: "MOST POPULAR",
    price: "$79",
    priceNote: "Per seat per month, billed annually",
    credits: "48,000 credits",
    creditsNote: "per seat per year, granted upfront",
    cta: "Buy now",
    ctaStyle: "bg-slate-900 text-white hover:bg-slate-800",
  },
  {
    id: "org",
    name: "Organization",
    price: "$119",
    priceNote: "Per seat per month, (min 3 seats) billed annually",
    credits: "72,000 credits",
    creditsNote: "per seat per year, granted upfront",
    cta: "Buy now",
    ctaStyle: "bg-sky-300 text-slate-900 hover:bg-sky-400",
  },
];

// Naya structural data sections ke sath
const featureSections = [
  {
    id: "outbound",
    title: "Outbound",
    description: "Find and research leads, personalize messaging, and launch campaigns in minutes powered by AI.",
    icon: Waypoints,
    rows: [
      {
        label: "AI Assistant",
        badge: { text: "INTRODUCTORY FREE", tone: "sky" },
        values: ["5 chats (10 messages per chat)", true, true, true],
      },
      { label: "Contact & Account Data", values: [true, true, true, true] },
      { label: "Basic Filters", expandable: true, values: [true, true, true, true] },
      { label: "Advanced Filters & Signals", expandable: true, values: [false, true, true, true] },
      { label: "Google Maps Business Search", values: [false, true, true, true] },
    ],
  },
  {
    id: "intent",
    title: "Intent & Enrichment",
    description: "Track companies searching for what you sell and enrich data with waterfall workflows.",
    icon: Users,
    rows: [
      {
        label: "Buying Intent",
        underline: true,
        values: [
          "1 Intent Topic & Intent Filters",
          "6 Intent Topics + Intent Filters",
          "6 Intent Topics + Intent Filters",
          "12 Intent Topics + Intent Filters",
        ],
      },
      {
        label: "People & Company Lookalikes",
        badge: { text: "BETA", tone: "skyDark" },
        values: [false, true, true, true],
      },
      { label: "CRM Custom Field Filter", underline: true, values: [false, true, true, true] },
      { label: "Waterfall Enrichment", underline: true, values: [false, true, true, true] },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Export",
    description: "Track performance metrics, generate reports, and export clean CSV data anytime.",
    icon: BarChart3,
    rows: [
      { label: "Record Selection Limit", values: ["25", "1,000", "2,500", "10,000"] },
      { label: "CSV Import & Export", values: [true, true, true, true] },
      { label: "AI Research Insights", values: [true, true, true, true] },
    ],
  },
  {
    id: "security",
    title: "Security & Management",
    description: "Enterprise-grade controls, workspace governance, and custom data retention setups.",
    icon: Shield,
    rows: [
      { label: "SSO & SAML Authentication", values: [false, false, false, true] },
      { label: "Role-Based Access Control", values: [false, true, true, true] },
      { label: "Custom Workspace Analytics", values: [false, false, true, true] },
    ],
  },
];

const badgeStyles = {
  sky: "bg-sky-50 text-sky-700 border border-sky-200",
  skyDark: "bg-sky-100 text-sky-800 border border-sky-300",
};

const GRID_COLS_STYLE = { gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr" };

function Cell({ value }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>
      </div>
    );
  }
  if (value === false || value === undefined) {
    return <div />;
  }
  return <p className="text-center text-sm text-slate-500">{value}</p>;
}

export default function ComparePlans() {
  // Is state me har section ka open/closed status save hoga (by default outbound open hai)
  const [openSections, setOpenSections] = useState({
    outbound: true,
    intent: false,
    analytics: false,
    security: false,
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
         <CommonTitle
          align="center"
          pill={false}
          title='Compare'
          gradientText='Plans'
          subtitle='Our focus is not just on delivering innovative solutions to our clients. We emphasize quality and our core values help in its propulsion.'
        />

        {/* Sticky plan header */}
        <div className="sticky top-[73px] z-30 mt-6 bg-white pb-4 pt-2">
          <div className="grid gap-4" style={GRID_COLS_STYLE}>
            <div />
            {plans.map((plan) => (
              <div key={plan.id} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-md font-medium text-slate-900">{plan.name}</p>
                  {plan.badge && (
                    <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-sky-800">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-2xl font-medium text-slate-900">{plan.price}</p>

                <p className="mt-2 min-h-[32px] text-xs leading-relaxed text-slate-500">
                  {plan.priceNote}
                </p>

                <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
                  <Waypoints className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <span className="font-medium text-slate-700">{plan.credits}</span>
                    <br />
                    {plan.creditsNote}
                  </span>
                </div>

                <button
                  type="button"
                  className={`mt-4 rounded-md px-4 py-2 text-sm font-medium transition-colors ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Sections Wrapper */}
        <div className="mt-6 space-y-4">
          {featureSections.map((section) => {
            const IconComponent = section.icon;
            const isOpen = openSections[section.id];

            return (
              <div key={section.id} className="rounded-lg border border-slate-100 overflow-hidden">
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-4 transition-colors hover:bg-slate-100/70"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-300 shrink-0">
                      <IconComponent className="h-4 w-4 text-slate-900" />
                    </span>
                    <div className="text-left">
                      <p className="text-md font-medium text-slate-900">{section.title}</p>
                      <p className="text-xs leading-relaxed text-slate-500 max-w-2xl">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                  )}
                </button>

                {/* Section Content */}
                {isOpen && (
                  <div className="bg-white">
                    {section.rows.map((row, i) => (
                      <div
                        key={row.label}
                        className={`grid items-center gap-4 px-4 py-3.5 ${
                          i !== section.rows.length - 1 ? "border-b border-slate-100" : ""
                        }`}
                        style={GRID_COLS_STYLE}
                      >
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-sm text-slate-800 ${
                              row.underline ? "underline decoration-dotted underline-offset-4" : ""
                            }`}
                          >
                            {row.label}
                          </p>
                          {row.badge && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                badgeStyles[row.badge.tone]
                              }`}
                            >
                              {row.badge.text}
                            </span>
                          )}
                          {row.expandable && (
                            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                          )}
                        </div>

                        {row.values.map((value, idx) => (
                          <Cell key={idx} value={value} />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}