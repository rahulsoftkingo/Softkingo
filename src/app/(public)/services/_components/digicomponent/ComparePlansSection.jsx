"use client";

import Link from "next/link";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Waypoints,
  Sparkles,
  Users,
  Shield,
  Layers,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Group icons (used for feature-group headers)
 * ---------------------------------------------------------------------- */
const GROUP_ICONS = [Waypoints, Users, Sparkles, Shield, Layers];

const badgeStyles = {
  sky: "bg-sky-50 text-sky-700 border border-sky-200",
  skyDark: "bg-sky-100 text-sky-800 border border-sky-300",
  pink: "bg-pink-50 text-pink-600 border border-pink-200",
};

/* -------------------------------------------------------------------------
 * Currency helper
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
 * Compare-table cell
 * ---------------------------------------------------------------------- */
function normalizeValue(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "boolean") return raw ? true : null;
  const str = String(raw).trim();
  if (str === "") return null;
  const lower = str.toLowerCase();
  if (lower === "check" || lower === "true" || lower === "yes") return true;
  if (lower === "false" || lower === "no") return null;
  return str;
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
 * ComparePlansSection
 * ---------------------------------------------------------------------- */
export default function ComparePlansSection({
  compareRef,
  sectionRefs,
  safePricing,
  activePlans,
  currency,
  billing,
  discountPercent,
  openSections,
  toggleSection,
  justJumped,
  openFeatures,
  toggleFeature,
}) {
  return (
    <section ref={compareRef} className="scroll-mt-6 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Compare <span className="text-sky-600">our plans</span>
          </h2>
        </div>

        {/* Compare table columns use the ACTIVE tab's plans, so it always matches
            whichever solution the person is currently looking at. */}
        <div className="sticky top-[73px] z-0 mt-6 bg-white pb-4 pt-2">
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
            const IconComponent = GROUP_ICONS[gi % GROUP_ICONS.length];
            const isOpen = openSections[group.id];
            const isFlashing = justJumped === group.id;

            return (
              <div
                key={group.id}
                ref={(el) => (sectionRefs.current[group.id] = el)}
                className={`scroll-mt-24 rounded-lg border overflow-hidden transition-shadow ${isFlashing ? "border-yellow-300 ring-2 ring-yellow-200" : "border-slate-100"}`}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(group.id)}
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
  );
}