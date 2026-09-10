"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Inbox,
  Sparkles,
  Target,
  Waypoints,
  Users,
  Shield,
  Globe,
  Layers,
  X
} from "lucide-react";
import CommonTitle from '@/components/ui/CommonTitle';
import WorkflowAddOns from "./WorkFlowAddons";
import WhyChooseUs from "./WhyChooseUs";
import SeoIndustries from "./SeoIndustries"
import SeoServicesSlider from "./SeoServicesSlider"
import CuttingEdgeTech from "./CuttingEdgeTech";
import AppFeatures from "./AppFeatures"





/* -------------------------------------------------------------------------
 * Icons
 * ---------------------------------------------------------------------- */
const ICON_MAP = {
  outbound: Megaphone,
  megaphone: Megaphone,
  megaphor: Megaphone,
  inbound: Inbox,
  inbox: Inbox,
  enrichment: Sparkles,
  sparkles: Sparkles,
  execution: Target,
  target: Target,
  waypoints: Waypoints,
  users: Users,
  shield: Shield,
  globe: Globe,
};

function getIcon(iconName) {
  if (!iconName) return Sparkles;
  const key = String(iconName).toLowerCase().trim();
  return ICON_MAP[key] || Sparkles;
}

const GROUP_ICONS = [Waypoints, Users, Sparkles, Shield, Layers];

const badgeStyles = {
  sky: "bg-sky-50 text-sky-700 border border-sky-200",
  skyDark: "bg-sky-100 text-sky-800 border border-sky-300",
  pink: "bg-pink-50 text-pink-600 border border-pink-200",
};

/* -------------------------------------------------------------------------
 * Currency helpers
 * ---------------------------------------------------------------------- */
const USD_TO_INR_RATE = 83;

function formatPrice(rawPrice, currency, billing = "annual", discountPercent = 0) {
  if (!rawPrice) return rawPrice;
  const str = String(rawPrice).trim();

  const match = str.match(/[\d,]+(\.\d+)?/);
  if (!match) return str;

  let numeric = parseFloat(match[0].replace(/,/g, ""));
  if (isNaN(numeric)) return str;

  if (billing === "monthly" && discountPercent > 0) {
    numeric = numeric / (1 - discountPercent / 100);
  }
  numeric = Math.round(numeric);

  const suffix = str.slice(match.index + match[0].length).trim();

  if (currency === "inr") {
    const converted = Math.round(numeric * USD_TO_INR_RATE);
    return `₹${converted.toLocaleString("en-IN")}${suffix ? ` ${suffix}` : ""}`;
  }

  return `$${numeric.toLocaleString("en-US")}${suffix ? ` ${suffix}` : ""}`;
}

/* -------------------------------------------------------------------------
 * Default fallback data
 * ---------------------------------------------------------------------- */
const DEFAULT_PRICING = {
  title: "Pricing ",
  highlight: "Plans",
  subtitle: "sectino subutile ",
  featureGroups: [
    {
      id: "1",
      title: "Outbound",
      description: "descrption ",
      features: [
        { name: "feature 1", badge: "Badge", tone: "", values: ["check ", "check "], children: [] },
        { name: "feature 2", badge: "Badge ", tone: "", values: ["check", "check"], children: [] },
      ],
    },
  ],
};

// NEW STRUCTURE: plans now live INSIDE each solutionTab, not in a global array.
// Each tab can be hidden from the frontend with `visible: false`.
// Each plan has its own `features` array directly (no more per-tab keying).
const DEFAULT_PRICING_CARDS = {
  heading: "Pricing Cards",
  subtitle: "choose the plan with doubt you",
  topText: "Build pipeline ",
  annualLabel: "Annual Billing",
  annualBadge: "20%",
  monthlyLabel: "label",
  tabsTitle: "Tabs Bar Subtitle ",
  tabsSubtitle: "Tabs Bar Subtitle",

  solutionTabs: [
    {
      id: "1",
      label: "Outbound",
      iconName: "Megaphone",
      visible: true,
      plans: [
        {
          name: "Rahul",
          badge: "Badge",
          description: "Description",
          price: "$79",
          priceNote: "Price Note",
          credits: "48,000",
          creditsNote: "Credits Note",
          learnMoreLink: "",
          trialText: "Trial",
          highlighted: true,
          primaryButton: { label: "Label", link: "#" },
          secondaryButton: { label: "Label", link: "" },
          features: [
            { text: "list 1", badge: "" },
            { text: "list 2", badge: "" },
          ],
          compareAllText: "Compare all plans",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
 * FeatureItem
 * ---------------------------------------------------------------------- */
function FeatureItem({ feature }) {
  return (
    <li className="flex items-start gap-2 py-1.5 text-sm text-slate-700">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-900" strokeWidth={2.5} />
      <span className="flex flex-wrap items-center gap-1.5">
        {feature.text}
        {feature.badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${feature.badge === "BETA"
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

/* -------------------------------------------------------------------------
 * Compare-table cell
 * ---------------------------------------------------------------------- */
function normalizeValue(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "boolean") return raw ? true : null;
  const str = String(raw).trim();
  if (str === "") return null;
  const lower = str.toLowerCase();
  if (lower === "check" || lower === "true" || lower === "yes") return true;
  if (lower === "blank" || lower === "cross" || lower === "false" || lower === "no") return "blank"; // <-- ADD THIS
  return str;
}

function Cell({ value }) {
  const normalized = normalizeValue(value);

  // Checkmark Icon
  if (normalized === true) {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>
      </div>
    );
  }

  // Cross/X Icon for "blank"
  if (normalized === "blank") {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
          <X className="h-3.5 w-3.5 text-rose-600" strokeWidth={3} />
        </span>
      </div>
    );
  }

  if (normalized === null) return <div />;
  return <p className="text-center text-sm text-amber-700">{normalized}</p>;
}

/* -------------------------------------------------------------------------
 * FeatureRow (with nested sub-rows support)
 * ---------------------------------------------------------------------- */
function FeatureRow({ feature, groupId, index, plans, openFeatures, toggleFeature, depth = 0, parentKey = "" }) {
  const rowKey = parentKey ? `${parentKey}.${index}` : `${groupId}:${index}`;
  const hasChildren = Array.isArray(feature.children) && feature.children.length > 0;
  const isOpen = !!openFeatures[rowKey];
  const gridStyle = { gridTemplateColumns: `1.6fr repeat(${plans.length}, 1fr)` };
  const labelClass = `text-sm ${depth > 0 ? "text-amber-700" : "text-slate-800"}`;

  return (
    <>
      <div className="grid items-center gap-4 border-b border-slate-100 px-4 py-3.5" style={gridStyle}>
        <div className="flex items-center gap-2" style={{ paddingLeft: depth * 20 }}>
          {hasChildren ? (
            <button type="button" onClick={() => toggleFeature(rowKey)} className="flex items-center gap-1.5 text-left">
              <p className={labelClass}>{feature.name}</p>
              {feature.badge && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeStyles[feature.tone] || badgeStyles.sky}`}>
                  {feature.badge}
                </span>
              )}
              {isOpen ? <ChevronUp className="h-3.5 w-3.5 shrink-0 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
            </button>
          ) : (
            <>
              <p className={labelClass}>{feature.name}</p>
              {feature.badge && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeStyles[feature.tone] || badgeStyles.sky}`}>
                  {feature.badge}
                </span>
              )}
            </>
          )}
        </div>

        {plans.map((_, idx) => (
          <Cell key={idx} value={feature.values?.[idx]} />
        ))}
      </div>

      {hasChildren &&
        isOpen &&
        feature.children.map((child, ci) => (
          <FeatureRow
            key={ci}
            feature={child}
            groupId={groupId}
            index={ci}
            plans={plans}
            openFeatures={openFeatures}
            toggleFeature={toggleFeature}
            depth={depth + 1}
            parentKey={rowKey}
          />
        ))}
    </>
  );
}

/* -------------------------------------------------------------------------
 * Main component
 * ---------------------------------------------------------------------- */
export default function PricingPage({
  pricing = DEFAULT_PRICING,
  pricingCards = DEFAULT_PRICING_CARDS,
  data,
  whychooseData,
  industries,
  features,
  tech,
  activeSections,
  mobileFeatures,
  appfeaturebasixtext,
  appfeaturebasixgradient
}) {

  function getDiscountPercent(annualBadge) {
    if (!annualBadge) return 0;
    const match = String(annualBadge).match(/(\d+(\.\d+)?)\s*%/);
    return match ? parseFloat(match[1]) : 0;
  }

  const safePricing = {
    ...DEFAULT_PRICING,
    ...pricing,
    featureGroups: Array.isArray(pricing?.featureGroups) ? pricing.featureGroups : DEFAULT_PRICING.featureGroups,
  };

  // ALL tabs from the backend, regardless of their `visible` flag.
  // This is now the single source of truth used for cards/compare data,
  // so data never disappears even if every tab is marked invisible.
  const rawSolutionTabs = Array.isArray(pricingCards?.solutionTabs) && pricingCards.solutionTabs.length > 0
    ? pricingCards.solutionTabs
    : DEFAULT_PRICING_CARDS.solutionTabs;

  // Only used to decide which tabs appear as buttons in the switcher.
  // Tabs with visible === false are excluded from the switcher only,
  // NOT from the data used for cards/compare.
  const visibleSolutionTabs = rawSolutionTabs.filter((t) => t.visible !== false);

  const safePricingCards = {
    ...DEFAULT_PRICING_CARDS,
    ...pricingCards,
    // solutionTabs here intentionally stays as the FULL list (raw), so that
    // activeTab / activePlans always have data to fall back on.
    solutionTabs: rawSolutionTabs,
  };

  const [billing, setBilling] = useState("annual");
  const [currency, setCurrency] = useState("usd");
  const [activeTabId, setActiveTabId] = useState(rawSolutionTabs[0]?.id);

  // Plans come from the currently active tab (searched across ALL tabs, visible or not).
  // If nothing matches activeTabId, fall back to the first tab so a plan/price
  // card always renders — data never disappears.
  const activeTab = safePricingCards.solutionTabs.find((t) => t.id === activeTabId) || safePricingCards.solutionTabs[0];
  const activePlans = Array.isArray(activeTab?.plans) ? activeTab.plans : [];

  // Switcher (tab buttons) only shows when there's at least one VISIBLE tab.
  // If every tab is marked invisible, the switcher hides completely,
  // but cards/compare table above keep rendering from the fallback tab.
  const showTabSwitcher = visibleSolutionTabs.length > 0;

  // FIX: key by `${group.id}-${index}` instead of just `group.id`.
  // If featureGroups data ever contains duplicate or missing `id` values,
  // plain `group.id` keys collide and opening one accordion opens every
  // other group sharing that id. The composite key guarantees uniqueness
  // regardless of what the backend sends.
  const [openSections, setOpenSections] = useState(() => {
    const initial = {};
    safePricing.featureGroups.forEach((g, i) => (initial[`${g.id}-${i}`] = i === 0));
    return initial;
  });

  const [justJumped, setJustJumped] = useState(null);
  const [openFeatures, setOpenFeatures] = useState({});

  const compareRef = useRef(null);
  const sectionRefs = useRef({});

  function toggleSection(key) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleFeature(key) {
    setOpenFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function goToCompare(targetGroupId) {
    setOpenSections((prev) => {
      const next = {};
      safePricing.featureGroups.forEach((g, i) => (next[`${g.id}-${i}`] = g.id === targetGroupId));
      return next;
    });
    setJustJumped(targetGroupId);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => setJustJumped(null), 1400);
      });
    });
  }

  const discountPercent = getDiscountPercent(safePricingCards.annualBadge);

  // Only bail out if there are literally NO tabs at all in the data
  // (not just "no visible ones") — this keeps the whole pricing section
  // rendering even when every tab is set to invisible.
  if (rawSolutionTabs.length === 0) {
    return null;
  }

  const referenceTab = rawSolutionTabs.find((t) => t.id === pricing?.referenceTabId) || rawSolutionTabs[0];
  const comparePlans = Array.isArray(referenceTab?.plans) ? referenceTab.plans : [];

  return (
    <div className="bg-white">
      {/* ============================= PRICING ============================= */}
      <section className="bg-gradient-to-br from-white via-sky-50 to-sky-200 py-20 px-4 sm:px-6 lg:px-8">

        <CommonTitle
          align="center"
          pill={false}
          gradientText={pricingCards.heading}
          subtitle={pricingCards.subtitle}
        />
        <div className="mx-auto max-w-7xl">
          <p className="ml-auto max-w-md text-right text-sm leading-relaxed text-slate-600">
            {safePricingCards.topText}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center rounded-full border border-slate-200 p-1">
              <button
                type="button"
                onClick={() => setCurrency("usd")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${currency === "usd" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                $ USD
              </button>
              <button
                type="button"
                onClick={() => setCurrency("inr")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${currency === "inr" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                ₹ INR
              </button>
            </div>

            <div className="inline-flex items-center rounded-full border border-slate-200 p-1">
              {/* Annual Button */}
              <div className="relative">
                {safePricingCards.annualBadge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-sm whitespace-nowrap">
                    {safePricingCards.annualBadge}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${billing === "annual"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
                    }`}
                >
                  {safePricingCards.annualLabel}
                </button>
              </div>

              {/* Monthly Button */}
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${billing === "monthly"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600"
                  }`}
              >
                {safePricingCards.monthlyLabel}
              </button>
            </div>
          </div>

          {/* Solution Tabs — sirf tab switcher dikhao jab kam se kam ek
              tab "visible" ho. Agar SAARE tabs invisible/inactive hain,
              switcher poora hide, lekin neeche plan cards / compare table
              fallback tab ke data se bilkul normal render hote rahte hain. */}
          {showTabSwitcher && (
            <div className="mt-10 rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">
                {safePricingCards.tabsTitle}
                <span className="block text-[11px] text-slate-400">{safePricingCards.tabsSubtitle}</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {visibleSolutionTabs.map((tab) => {
                  const Icon = getIcon(tab.iconName);
                  const active = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTabId(tab.id)}
                      className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${active
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
          )}

          {/* Plan Cards — completely swap based on the active tab's own plans array */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
            {activePlans.map((plan, i) => (
              <div
                key={`${activeTabId}-${i}`}
                className={`relative flex flex-col rounded-2xl border p-5 ${plan.highlighted
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

                <p className="mt-4 text-3xl font-medium text-slate-900">
                  {formatPrice(plan.price, currency, billing, discountPercent)}
                </p>
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
                      <Link href={plan.learnMoreLink} className="underline underline-offset-2 hover:text-slate-700">
                        Learn more
                      </Link>
                    )}
                  </span>
                </div>

                {plan.primaryButton && (
                  <Link
                    href={plan.primaryButton.link || "#"}
                    className={`mt-4 block rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${plan.highlighted
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                      }`}
                  >
                    {plan.primaryButton.label}
                  </Link>
                )}

                {plan.trialText && (
                  <p className="mt-2 text-center text-xs text-slate-500">{plan.trialText}</p>
                )}

                {/* Features now come directly from plan.features — no per-tab lookup needed */}
                <ul className="mt-5 min-h-[40px] divide-y divide-slate-100 border-t border-slate-100">
                  {plan.features?.length > 0 ? (
                    plan.features.map((feature, j) => <FeatureItem key={j} feature={feature} />)
                  ) : (
                    <li className="py-2 text-xs italic text-slate-400">
                      No features listed for this solution.
                    </li>
                  )}
                </ul>

                {plan.compareAllText && (
                  <button
                    type="button"
                    onClick={() => goToCompare(safePricing.featureGroups[0]?.id)}
                    className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    {plan.compareAllText}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Prices exclude any applicable taxes.
          </p>
        </div>
      </section>


      <WorkflowAddOns data={data} />


      {activeSections?.includes("servicesList") && (
        <WhyChooseUs data={whychooseData} />
      )}

      {activeSections?.includes("industries") && (
        <SeoIndustries data={industries} />
      )}

      {activeSections?.includes("features") && (
        <SeoServicesSlider data={features} />
      )}

      {activeSections?.includes("tech") && (
        <CuttingEdgeTech data={tech} />
      )}

      <AppFeatures data={mobileFeatures} appfeaturebasixtext={appfeaturebasixtext} appfeaturebasixgradient={appfeaturebasixgradient} />

      {/* ============================= COMPARE ============================= */}
      <section ref={compareRef} className="scroll-mt-6 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              Compare <span className="text-sky-600">our plans</span>
            </h2>
          </div>

          {/* Compare table columns now use the ACTIVE tab's plans, so it always matches
              whichever solution the person is currently looking at. */}
          <div className="sticky top-[73px] z-0 mt-6 bg-white pb-4 pt-2 overflow-x-auto scrollbar-hide">
            <div className="grid gap-4" style={{ gridTemplateColumns: `1.6fr repeat(${activePlans.length}, 1fr)` }}>
              <div />
              {activePlans.map((plan, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-md font-medium text-slate-900">{plan.name}</p>
                    {plan.badge && (
                      <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-sky-800">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-2xl font-medium text-slate-900">
                    {formatPrice(plan.price, currency, billing, discountPercent)}
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
                        <span className="font-medium text-slate-700">{plan.credits}</span>
                        {plan.creditsNote && (
                          <>
                            <br />
                            {plan.creditsNote}
                          </>
                        )}
                      </span>
                    </div>
                  )}

                  {plan.primaryButton && (
                    <Link
                      href={plan.primaryButton.link || "#"}
                      className={`mt-4 inline-block rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${plan.highlighted
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-sky-300 text-slate-900 hover:bg-sky-400"
                        }`}
                    >
                      {plan.primaryButton.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {safePricing.featureGroups.map((group, gi) => {
              const groupKey = `${group.id}-${gi}`;
              const IconComponent = GROUP_ICONS[gi % GROUP_ICONS.length];
              const isOpen = openSections[groupKey];
              const isFlashing = justJumped === group.id;

              return (
                <div
                  key={groupKey}
                  ref={(el) => (sectionRefs.current[groupKey] = el)}
                  className={`scroll-mt-24 rounded-lg border overflow-hidden transition-shadow ${isFlashing ? "ring-2 ring-yellow-200" : "border-slate-100"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(groupKey)}
                    className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-4 transition-colors hover:bg-slate-100/70"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-300 shrink-0">
                        <IconComponent className="h-4 w-4 text-slate-900" />
                      </span>
                      <div className="text-left">
                        <p className="text-md font-medium text-slate-900">{group.title}</p>
                        {group.description && (
                          <p className="text-xs leading-relaxed text-slate-500 max-w-2xl">
                            {group.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />}
                  </button>

                  {isOpen && (
                    <div className="bg-white">
                      {(group.features || []).map((feature, fi) => (
                        <FeatureRow
                          key={fi}
                          feature={feature}
                          groupId={group.id}
                          index={fi}
                          plans={activePlans}
                          openFeatures={openFeatures}
                          toggleFeature={toggleFeature}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}