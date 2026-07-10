"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Megaphone,
  Inbox,
  Sparkles,
  Target,
  Waypoints,
  Zap,
  Users,
  Shield,
  Globe,
} from "lucide-react";

// Map string icon names (as they'd arrive in JSON) to actual lucide components.
// Add more entries here as new iconName values show up in your data source.
const ICON_MAP = {
  outbound: Megaphone,
  megaphone: Megaphone,
  inbound: Inbox,
  inbox: Inbox,
  enrichment: Sparkles,
  sparkles: Sparkles,
  execution: Target,
  target: Target,
  waypoints: Waypoints,
  zap: Zap,
  users: Users,
  shield: Shield,
  globe: Globe,
};

function getIcon(iconName) {
  if (!iconName) return Sparkles;
  const key = String(iconName).toLowerCase().trim();
  return ICON_MAP[key] || Sparkles;
}

// ---------------------------------------------------------------------------
// Dummy/fallback data — used whenever a field (or the whole data prop) is
// missing or empty, so the page never renders blank.
// ---------------------------------------------------------------------------
const DUMMY_DATA = {
  topText:
    "Build pipeline smarter, close deals faster, and unify your tech stack with an AI-powered platform.",
  annualLabel: "Annual billing",
  annualBadge: "SAVE 20%",
  monthlyLabel: "Monthly billing",
  tabsTitle: "Explore features by solution",
  tabsSubtitle: "All tiers include every solution",
  solutionTabs: [
    { label: "Outbound", iconName: "megaphone" },
    { label: "Inbound", iconName: "inbox" },
    { label: "Data Enrichment", iconName: "sparkles" },
    { label: "Deal Execution", iconName: "target" },
  ],
  plans: [
    {
      name: "Free",
      badge: null,
      description:
        "Explore the outreach platform to find leads, manage pipeline & close deals.",
      price: "$0",
      priceNote: "Free forever",
      credits: "900 credits",
      creditsNote: "per seat per year, granted monthly",
      learnMoreLink: "#",
      trialText: null,
      highlighted: false,
      primaryButton: { label: "Get started", link: "#" },
      secondaryButton: null,
      features: [
        { text: "AI Assistant (5 chats limit)", badge: null },
        { text: "AI Research", badge: null },
        { text: "2 Sequences", badge: null },
        { text: "Prospecting, Gmail & Salesforce Extensions", badge: null },
        { text: "Basic Filters", badge: null },
      ],
      compareAllText: "Compare all plans",
    },
    {
      name: "Basic",
      badge: null,
      description: "Take prospecting, outreach & data management to the next level.",
      price: "$49",
      priceNote: "Per seat per month, billed annually",
      credits: "30,000 credits",
      creditsNote: "per seat per year, granted upfront",
      learnMoreLink: "#",
      trialText: "Start 14-day trial",
      highlighted: false,
      primaryButton: { label: "Buy now", link: "#" },
      secondaryButton: null,
      features: [
        { text: "AI Assistant", badge: "INTRODUCTORY FREE" },
        { text: "AI Research & Lead Scoring", badge: null },
        { text: "Unlimited Sequences", badge: null },
        { text: "Deliverability Suite & Email Warmup", badge: null },
        { text: "CRM Integrations", badge: null },
        { text: "Waterfall Enrichment", badge: null },
      ],
      compareAllText: "Compare all plans",
    },
    {
      name: "Professional",
      badge: "MOST POPULAR",
      description: "Optimize your sales process with multi-touch outreach, AI automation.",
      price: "$79",
      priceNote: "Per seat per month, billed annually",
      credits: "48,000 credits",
      creditsNote: "per seat per year, granted upfront",
      learnMoreLink: "#",
      trialText: "Start 14-day trial",
      highlighted: true,
      primaryButton: { label: "Buy now", link: "#" },
      secondaryButton: null,
      features: [
        { text: "AI Assistant", badge: "INTRODUCTORY FREE" },
        { text: "Unlimited Sequences & A/Z Testing", badge: null },
        { text: "Automated Workflows", badge: null },
        { text: "Projects", badge: "BETA" },
        { text: "Call Recordings & AI Insights (4,000 mins)", badge: null },
        { text: "Analytics & Pre-built Reports", badge: null },
      ],
      compareAllText: "Compare all plans",
    },
    {
      name: "Organization",
      badge: null,
      description:
        "Transform go-to-market with advanced tools, custom solutions & expert help.",
      price: "$119",
      priceNote: "Per seat per month, (min 3 seats) billed annually",
      credits: "72,000 credits",
      creditsNote: "per seat per year, granted upfront",
      learnMoreLink: "#",
      trialText: null,
      highlighted: false,
      primaryButton: { label: "Buy now", link: "#" },
      secondaryButton: { label: "Talk to Sales", link: "#" },
      features: [
        { text: "Unlimited Meeting Events", badge: null },
        { text: "Advanced Security Configurations", badge: null },
        { text: "Single Sign-on (SSO)", badge: null },
        { text: "Use your own ULP API key", badge: null },
        { text: "Customizable Reports & Dashboards", badge: null },
      ],
      compareAllText: "Compare all plans",
    },
  ],
};

// Fill in any missing/empty field on `value` using the corresponding field on `fallback`.
function withFallback(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

function normalizeFeature(feature, fallbackFeature) {
  const f = feature || {};
  return {
    text: withFallback(f.text, fallbackFeature?.text ?? "Feature"),
    badge: withFallback(f.badge, null),
  };
}

function normalizePlan(plan, fallbackPlan) {
  const p = plan || {};
  const features =
    Array.isArray(p.features) && p.features.length > 0
      ? p.features.map((f, i) => normalizeFeature(f, fallbackPlan.features[i]))
      : fallbackPlan.features;

  return {
    name: withFallback(p.name, fallbackPlan.name),
    badge: withFallback(p.badge, fallbackPlan.badge),
    description: withFallback(p.description, fallbackPlan.description),
    price: withFallback(p.price, fallbackPlan.price),
    priceNote: withFallback(p.priceNote, fallbackPlan.priceNote),
    credits: withFallback(p.credits, fallbackPlan.credits),
    creditsNote: withFallback(p.creditsNote, fallbackPlan.creditsNote),
    learnMoreLink: withFallback(p.learnMoreLink, fallbackPlan.learnMoreLink),
    trialText: withFallback(p.trialText, fallbackPlan.trialText),
    highlighted: p.highlighted ?? fallbackPlan.highlighted,
    primaryButton: withFallback(p.primaryButton, fallbackPlan.primaryButton),
    secondaryButton: withFallback(p.secondaryButton, fallbackPlan.secondaryButton),
    features,
    compareAllText: withFallback(p.compareAllText, fallbackPlan.compareAllText),
  };
}

function normalizeData(data) {
  const d = data || {};

  const solutionTabs =
    Array.isArray(d.solutionTabs) && d.solutionTabs.length > 0
      ? d.solutionTabs.map((tab, i) => ({
          label: withFallback(tab?.label, DUMMY_DATA.solutionTabs[i % DUMMY_DATA.solutionTabs.length].label),
          iconName: withFallback(tab?.iconName, DUMMY_DATA.solutionTabs[i % DUMMY_DATA.solutionTabs.length].iconName),
        }))
      : DUMMY_DATA.solutionTabs;

  const plans =
    Array.isArray(d.plans) && d.plans.length > 0
      ? d.plans.map((plan, i) => normalizePlan(plan, DUMMY_DATA.plans[i % DUMMY_DATA.plans.length]))
      : DUMMY_DATA.plans;

  return {
    topText: withFallback(d.topText, DUMMY_DATA.topText),
    annualLabel: withFallback(d.annualLabel, DUMMY_DATA.annualLabel),
    annualBadge: withFallback(d.annualBadge, DUMMY_DATA.annualBadge),
    monthlyLabel: withFallback(d.monthlyLabel, DUMMY_DATA.monthlyLabel),
    tabsTitle: withFallback(d.tabsTitle, DUMMY_DATA.tabsTitle),
    tabsSubtitle: withFallback(d.tabsSubtitle, DUMMY_DATA.tabsSubtitle),
    solutionTabs,
    plans,
  };
}

function FeatureItem({ feature }) {
  return (
    <li className="flex items-start gap-2 py-1.5 text-sm text-slate-700">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-900" strokeWidth={2.5} />
      <span className="flex flex-wrap items-center gap-1.5">
        {feature.text}
        {feature.badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              feature.badge === "BETA"
                ? "bg-sky-100 text-sky-800"
                : "bg-sky-50 text-sky-700 border border-sky-200"
            }`}
          >
            {feature.badge}
          </span>
        )}
      </span>
    </li>
  );
}

/**
 * PricingPage
 *
 * Fully data-driven pricing page. Pass a `data` prop shaped like:
 * {
 *   topText, annualLabel, annualBadge, monthlyLabel,
 *   tabsTitle, tabsSubtitle,
 *   solutionTabs: [{ label, iconName }],
 *   plans: [{
 *     name, badge, description, price, priceNote,
 *     credits, creditsNote, learnMoreLink, trialText, highlighted,
 *     primaryButton: { label, link },
 *     secondaryButton: { label, link } | null,
 *     features: [{ text, badge }],
 *     compareAllText,
 *   }],
 * }
 *
 * Any field that's missing, null, or an empty string/array falls back to
 * built-in dummy content so the page never renders blank/broken.
 */
export default function PricingPage({ data }) {
  const content = normalizeData(data);
  const [billing, setBilling] = useState("annual");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top intro line */}
        <p className="ml-auto max-w-md text-right text-sm leading-relaxed text-slate-600">
          {content.topText}
        </p>

        {/* Billing toggle */}
        <div className="mt-4 flex justify-end">
          <div className="inline-flex items-center rounded-full border border-slate-200 p-1">
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                billing === "annual" ? "bg-slate-900 text-white" : "text-slate-600"
              }`}
            >
              {content.annualLabel}
              {content.annualBadge && (
                <span className="rounded bg-yellow-300 px-1.5 py-0.5 text-[10px] font-bold text-slate-900">
                  {content.annualBadge}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                billing === "monthly" ? "bg-slate-900 text-white" : "text-slate-600"
              }`}
            >
              {content.monthlyLabel}
            </button>
          </div>
        </div>

        {/* Solutions tabs */}
        <div className="mt-10 rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">
            {content.tabsTitle}
            <span className="block text-[11px] text-slate-400">{content.tabsSubtitle}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {content.solutionTabs.map((tab, i) => {
              const Icon = getIcon(tab.iconName);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === i
                      ? "border-yellow-300 bg-yellow-50 text-slate-900"
                      : "border-slate-100 text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plans */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {content.plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border p-5 ${
                plan.highlighted
                  ? "border-sky-400 bg-sky-100 shadow-md"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}

              <p className="text-md font-medium text-slate-900">{plan.name}</p>
              <p className="mt-1.5 min-h-[36px] text-xs leading-relaxed text-slate-500">
                {plan.description}
              </p>

              <p className="mt-4 text-3xl font-medium text-slate-900">{plan.price}</p>
              <p className="mt-1 min-h-[32px] text-xs leading-relaxed text-slate-500">
                {plan.priceNote}
              </p>

              <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
                <Waypoints className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  <span className="font-medium text-slate-700">{plan.credits}</span>
                  <br />
                  {plan.creditsNote}
                  <br />
                  {plan.learnMoreLink && (
                    <a
                      href={plan.learnMoreLink}
                      className="underline underline-offset-2 hover:text-slate-700"
                    >
                      Learn more
                    </a>
                  )}
                </span>
              </div>

              {plan.primaryButton && (
                <a
                  href={plan.primaryButton.link || "#"}
                  className={`mt-4 block rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  {plan.primaryButton.label}
                </a>
              )}

              {plan.trialText && (
                <p className="mt-2 text-center text-xs text-slate-500">{plan.trialText}</p>
              )}

              {plan.secondaryButton && (
                <a
                  href={plan.secondaryButton.link || "#"}
                  className="mt-2 block rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                >
                  {plan.secondaryButton.label}
                </a>
              )}

              <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
                {plan.features.map((feature, j) => (
                  <FeatureItem key={j} feature={feature} />
                ))}
              </ul>

              <button
                type="button"
                className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                {plan.compareAllText}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Prices exclude any applicable taxes.
        </p>
      </div>
    </section>
  );
}