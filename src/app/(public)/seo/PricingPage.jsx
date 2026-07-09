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
} from "lucide-react";

const solutionTabs = [
  { id: "outbound", label: "Outbound", icon: Megaphone, available: true },
  { id: "inbound", label: "Inbound", icon: Inbox, available: false },
  { id: "enrichment", label: "Data Enrichment", icon: Sparkles, available: false },
  { id: "execution", label: "Deal Execution", icon: Target, available: false },
];

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Explore the outreach platform to find leads, manage pipeline & close deals.",
    priceAnnual: 0,
    priceMonthly: 0,
    priceNote: null,
    credits: "900 credits",
    creditsNote: "per seat per year, granted monthly",
    cta: { label: "Get started", style: "bg-sky-100 text-slate-900 hover:bg-sky-200" },
    features: [
      "AI Assistant (5 chats limit)",
      "AI Research",
      "2 Sequences",
      "Prospecting, Gmail & Salesforce Extensions",
      "Basic Filters",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description: "Take prospecting, outreach & data management to the next level.",
    priceAnnual: 49,
    priceMonthly: 59,
    priceNote: "Per seat per month, billed annually",
    credits: "30,000 credits",
    creditsNote: "per seat per year, granted upfront",
    cta: { label: "Buy now", style: "bg-sky-500 text-white hover:bg-sky-600" },
    trial: "Start 14-day trial",
    features: [
      { text: "AI Assistant", badge: "INTRODUCTORY FREE" },
      "AI Research & Lead Scoring",
      "Unlimited Sequences",
      "Prospecting, Gmail & Salesforce Extensions",
      "Deliverability Suite & Email Warmup",
      "Advanced Filters",
      "CRM Integrations",
      "Waterfall Enrichment",
      "3 Meetings Events",
      "6 Intent Topics & Intent Filters",
      "CSV, CRM & API Data Enrichment",
      "Domain & Mailbox Purchasing",
      "US Dialer (credits apply)",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    badge: "MOST POPULAR",
    highlighted: true,
    description:
      "Optimize your sales process with multi-touch outreach, AI automation.",
    priceAnnual: 79,
    priceMonthly: 95,
    priceNote: "Per seat per month, billed annually",
    credits: "48,000 credits",
    creditsNote: "per seat per year, granted upfront",
    cta: { label: "Buy now", style: "bg-slate-900 text-white hover:bg-slate-800" },
    trial: "Start 14-day trial",
    features: [
      { text: "AI Assistant", badge: "INTRODUCTORY FREE" },
      "AI Research & Lead Scoring",
      "Unlimited Sequences & A/Z Testing",
      "Prospecting, Gmail & Salesforce Extensions",
      "Deliverability Suite & Email Warmup",
      "Advanced Filters",
      "CRM Integrations",
      "Waterfall Enrichment",
      "6 Meetings Events",
      "6 Intent Topics & Intent Filters",
      "CSV, CRM & API Data Enrichment",
      "Domain & Mailbox Purchasing",
      { text: "Projects", badge: "BETA" },
      "Unlimited Gmail & Microsoft Mailboxes",
      "Automated Workflows",
      "Call Recordings & AI Insights (4,000 mins)",
      "Analytics & Pre-built Reports",
      "US Dialer (credits apply)",
    ],
  },
  {
    id: "org",
    name: "Organization",
    description:
      "Transform go-to-market with advanced tools, custom solutions & expert help.",
    priceAnnual: 119,
    priceMonthly: 143,
    priceNote: "Per seat per month, (min 3 seats) billed annually",
    credits: "72,000 credits",
    creditsNote: "per seat per year, granted upfront",
    cta: { label: "Buy now", style: "bg-sky-500 text-white hover:bg-sky-600" },
    secondaryCta: { label: "Talk to Sales", style: "border border-slate-300 text-slate-900 hover:bg-slate-50" },
    features: [
      { text: "AI Assistant", badge: "INTRODUCTORY FREE" },
      "AI Research & Lead Scoring",
      "Unlimited Sequences & A/Z Testing",
      "Prospecting, Gmail & Salesforce Extensions",
      "Deliverability Suite & Email Warmup",
      "Advanced Filters",
      "CRM Integrations",
      "Waterfall Enrichment",
      "Unlimited Meeting Events",
      "12 Intent Topics & Intent Filters",
      "CSV, CRM & API Data Enrichment",
      "Domain & Mailbox Purchasing",
      { text: "Projects", badge: "BETA" },
      "Unlimited Gmail & Microsoft Mailboxes",
      "Automated Workflows",
      "Call Recordings & AI Insights (8,000 mins)",
      "Analytics & Pre-built Reports",
      "Customizable Reports & Dashboards",
      "Advanced Security Configurations",
      "Single Sign-on (SSO)",
      "Use your own ULP API key",
      "US Dialer (credits apply)",
    ],
  },
];

function FeatureItem({ feature }) {
  const isObject = typeof feature === "object";
  const text = isObject ? feature.text : feature;
  const badge = isObject ? feature.badge : null;

  return (
    <li className="flex items-start gap-2 py-1.5 text-sm text-slate-700">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-900" strokeWidth={2.5} />
      <span className="flex flex-wrap items-center gap-1.5">
        {text}
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              badge === "BETA"
                ? "bg-sky-100 text-sky-800"
                : "bg-sky-50 text-sky-700 border border-sky-200"
            }`}
          >
            {badge}
          </span>
        )}
      </span>
    </li>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState("annual");
  const [activeTab, setActiveTab] = useState("outbound");

  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top intro line */}
        <p className="ml-auto max-w-md text-right text-sm leading-relaxed text-slate-600">
          Build pipeline smarter, close deals faster, and unify your tech stack with an
          AI-powered platform.
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
              Annual billing
              <span className="rounded bg-yellow-300 px-1.5 py-0.5 text-[10px] font-bold text-slate-900">
                SAVE 20%
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                billing === "monthly" ? "bg-slate-900 text-white" : "text-slate-600"
              }`}
            >
              Monthly billing
            </button>
          </div>
        </div>

        {/* Solutions tabs */}
        <div className="mt-10 rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">
            Explore features by solutions:
            <span className="block text-[11px] text-slate-400">
              All tiers include every solution
            </span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {solutionTabs.map(({ id, label, icon: Icon, available }) => (
              <button
                key={id}
                type="button"
                disabled={!available}
                onClick={() => available && setActiveTab(id)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === id && available
                    ? "border-yellow-300 bg-yellow-50 text-slate-900"
                    : "border-slate-100 text-slate-300"
                } ${available ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {plans.map((plan) => {
            const price = billing === "annual" ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
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

                <p className="mt-4 text-3xl font-medium text-slate-900">${price}</p>
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
                    <span className="underline underline-offset-2">Learn more</span>
                  </span>
                </div>

                <button
                  type="button"
                  className={`mt-4 rounded-md px-4 py-2 text-sm font-medium transition-colors ${plan.cta.style}`}
                >
                  {plan.cta.label}
                </button>

                {plan.trial && (
                  <p className="mt-2 text-center text-xs text-slate-500">{plan.trial}</p>
                )}

                {plan.secondaryCta && (
                  <button
                    type="button"
                    className={`mt-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${plan.secondaryCta.style}`}
                  >
                    {plan.secondaryCta.label}
                  </button>
                )}

                <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
                  {plan.features.map((feature, i) => (
                    <FeatureItem key={i} feature={feature} />
                  ))}
                </ul>

                <button
                  type="button"
                  className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Compare all plans
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Prices exclude any applicable taxes.
        </p>
      </div>
    </section>
  );
}