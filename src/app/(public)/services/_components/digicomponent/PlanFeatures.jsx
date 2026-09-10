"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Waypoints,
  Shield,
  BarChart3,
  Users,
  Layers,
} from "lucide-react";
import CommonTitle from "@/components/ui/CommonTitle";

// Icons ko cycle karke feature groups ko assign kiya jata hai
// (kyunki backend data me icon field nahi aati)
const GROUP_ICONS = [Waypoints, Users, BarChart3, Shield, Layers];

const badgeStyles = {
  sky: "bg-sky-50 text-sky-700 border border-sky-200",
  skyDark: "bg-sky-100 text-sky-800 border border-sky-300",
};

// Fallback data used when no `data` prop (or an empty one) is passed in
const defaultData = {
  title: "Compare",
  highlight: "our plans",
  subtitle: "Pick the plan that fits your team's needs, upgrade anytime.",
  plans: [
    {
      name: "Starter",
      price: "$0",
      priceNote: "Free forever, for individuals getting started.",
      credits: "1,000 credits/mo",
      buttonLabel: "Get started",
      buttonLink: "#",
      dark: false,
    },
    {
      name: "Pro",
      price: "$29/mo",
      badge: "Popular",
      priceNote: "For growing teams that need more power.",
      credits: "10,000 credits/mo",
      creditsNote: "Rolls over up to 3 months",
      buttonLabel: "Start free trial",
      buttonLink: "#",
      dark: true,
    },
    {
      name: "Business",
      price: "$99/mo",
      priceNote: "Advanced controls for larger organizations.",
      credits: "50,000 credits/mo",
      buttonLabel: "Start free trial",
      buttonLink: "#",
      dark: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      priceNote: "Tailored limits, security, and support.",
      buttonLabel: "Contact sales",
      buttonLink: "#",
      dark: false,
    },
  ],
  featureGroups: [
    {
      id: "core",
      title: "Core features",
      description: "The essentials every plan includes.",
      features: [
        { name: "Projects", values: ["3", "Unlimited", "Unlimited", "Unlimited"] },
        { name: "Team members", values: ["1", "5", "20", "Unlimited"] },
        { name: "Storage", values: ["1 GB", "20 GB", "100 GB", "Custom"] },
        { name: "API access", values: [false, true, true, true] },
      ],
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description: "Work together across teams and projects.",
      features: [
        { name: "Shared workspaces", values: [false, true, true, true] },
        {
          name: "Roles & permissions",
          values: [false, "Basic", "Advanced", "Advanced"],
        },
        { name: "Guest access", values: [false, false, true, true] },
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Understand usage and track performance.",
      features: [
        { name: "Usage dashboard", values: [true, true, true, true] },
        { name: "Custom reports", values: [false, false, true, true] },
        {
          name: "Data export",
          badge: "New",
          tone: "sky",
          values: [false, "CSV", "CSV, JSON", "CSV, JSON, API"],
        },
      ],
    },
    {
      id: "security",
      title: "Security & compliance",
      description: "Keep your data safe and compliant.",
      features: [
        { name: "SSO", values: [false, false, true, true] },
        { name: "Audit logs", values: [false, false, true, true] },
        {
          name: "SLA",
          badge: "Enterprise",
          tone: "skyDark",
          values: [false, false, false, true],
        },
      ],
    },
    {
      id: "support",
      title: "Support",
      description: "Get help when you need it.",
      features: [
        { name: "Community support", values: [true, true, true, true] },
        { name: "Email support", values: [false, true, true, true] },
        {
          name: "Dedicated account manager",
          values: [false, false, false, true],
        },
      ],
    },
  ],
};

// "check" / "true" / true -> tick icon
// "" / null / undefined / false -> blank
// baaki kuch bhi -> text
function normalizeValue(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "boolean") return raw ? true : null;

  const str = String(raw).trim();
  if (str === "") return null;

  const lower = str.toLowerCase();
  if (lower === "check" || lower === "true" || lower === "yes") return true;
  if (lower === "false" || lower === "no") return null;

  return str; // custom text value
}

function Cell({ value }) {
  const normalized = normalizeValue(value);

  if (normalized === true) {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>
      </div>
    );
  }
  if (normalized === null) {
    return <div />;
  }
  return <p className="text-center text-sm text-slate-500">{normalized}</p>;
}

export default function ComparePlans({ data }) {
  // Agar data missing hai, ya plans/featureGroups dono empty hain,
  // to defaultData fallback ke roop me use hoga
  const hasRealData =
    data &&
    ((Array.isArray(data.plans) && data.plans.length > 0) ||
      (Array.isArray(data.featureGroups) && data.featureGroups.length > 0));

  const source = hasRealData ? data : defaultData;

  const {
    title = "",
    highlight = "",
    subtitle = "",
    plans = [],
    featureGroups = [],
  } = source || {};

  // Default: pehla group open, baaki closed
  const [openSections, setOpenSections] = useState(() => {
    const initial = {};
    featureGroups.forEach((group, i) => {
      initial[group.id || i] = i === 0;
    });
    return initial;
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const planCount = plans.length || 1;
  const gridColsStyle = {
    gridTemplateColumns: `1.6fr repeat(${planCount}, 1fr)`,
  };

  if (!plans.length && !featureGroups.length) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <CommonTitle
          align="center"
          pill={false}
          title={title}
          gradientText={highlight}
          subtitle={subtitle}
        />

        {/* Sticky plan header */}
        {plans.length > 0 && (
          <div className="sticky top-[73px] z-30 mt-6 bg-white pb-4 pt-2">
            <div className="grid gap-4" style={gridColsStyle}>
              <div />
              {plans.map((plan, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-md font-medium text-slate-900">
                      {plan.name}
                    </p>
                    {plan.badge && (
                      <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-sky-800">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-2xl font-medium text-slate-900">
                    {plan.price}
                  </p>

                  {plan.priceNote && (
                    <p className="mt-2 min-h-[32px] text-xs leading-relaxed text-slate-500">
                      {plan.priceNote}
                    </p>
                  )}

                  {plan.credits && (
                    <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
                      <Waypoints className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        <span className="font-medium text-slate-700">
                          {plan.credits}
                        </span>
                        {plan.creditsNote && (
                          <>
                            <br />
                            {plan.creditsNote}
                          </>
                        )}
                      </span>
                    </div>
                  )}

                  {plan.buttonLabel && (
                    <a
                      href={plan.buttonLink || "#"}
                      className={`mt-4 inline-block rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
                        plan.dark
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-sky-300 text-slate-900 hover:bg-sky-400"
                      }`}
                    >
                      {plan.buttonLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accordion Sections Wrapper */}
        {featureGroups.length > 0 && (
          <div className="mt-6 space-y-4">
            {featureGroups.map((group, gi) => {
              const IconComponent = GROUP_ICONS[gi % GROUP_ICONS.length];
              const sectionId = group.id || gi;
              const isOpen = openSections[sectionId];

              return (
                <div
                  key={sectionId}
                  className="rounded-lg border border-slate-100 overflow-hidden"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(sectionId)}
                    className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-4 transition-colors hover:bg-slate-100/70"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-300 shrink-0">
                        <IconComponent className="h-4 w-4 text-slate-900" />
                      </span>
                      <div className="text-left">
                        <p className="text-md font-medium text-slate-900">
                          {group.title}
                        </p>
                        {group.description && (
                          <p className="text-xs leading-relaxed text-slate-500 max-w-2xl">
                            {group.description}
                          </p>
                        )}
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
                      {(group.features || []).map((feature, fi) => (
                        <div
                          key={fi}
                          className={`grid items-center gap-4 px-4 py-3.5 ${
                            fi !== (group.features || []).length - 1
                              ? "border-b border-slate-100"
                              : ""
                          }`}
                          style={gridColsStyle}
                        >
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-800">
                              {feature.name}
                            </p>
                            {feature.badge && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                  badgeStyles[feature.tone] ||
                                  badgeStyles.sky
                                }`}
                              >
                                {feature.badge}
                              </span>
                            )}
                          </div>

                          {plans.map((_, idx) => (
                            <Cell key={idx} value={feature.values?.[idx]} />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}