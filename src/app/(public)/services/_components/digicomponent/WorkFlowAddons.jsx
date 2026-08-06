"use client";

import { Check } from "lucide-react";
import CommonTitle from "@/components/ui/CommonTitle";

// Fallback data used when a field is missing from `data`
const defaultData = {
  titleLead: "Add more power",
  titleAccent: "to your workflow",
  footnote:
    "Select your paid plan first, then add any add-on in-app. Introductory pricing — features and pricing may change.",
  cards: [
    {
      eyebrow: "Add-on",
      name: "Inbound",
      price: "$119",
      priceUnit: "Per team, per month",
      priceNote: "billed annually",
      features: [
        {
          title: "Website visitor - company (global)",
          description: "Identify up to 50,000 companies per month.",
        },
        {
          title: "Domain tracking",
          description:
            "Add up to 100 domains to capture visitor insights across all your websites.",
        },
        {
          title: "Form enrichment",
          description: "5,000 form contacts enriched per month (credit usage applies).",
        },
        {
          title: "Form builder",
          badge: "Coming soon",
          description: "Capture leads with custom forms.",
        },
        {
          title: "Website visitor - contact (US only)",
          description: "Identify up to 10,000 contacts per month.",
        },
      ],
    },
    {
      eyebrow: "Add-on",
      name: "Advanced Dialer",
      price: "$119",
      priceUnit: "Per team, per month",
      priceNote: "billed annually",
      features: [
        {
          title: "International dialer",
          description: "Connect with global buyers using built-in international calling.",
        },
        {
          title: "Parallel dialer",
          description: "Multiply outbound volume by dialing multiple numbers at once.",
        },
        {
          title: "Power dialer",
          description:
            "Single-line dialing with auto-advance, voicemail drop, and instant call logging.",
        },
        {
          title: "Local presence",
          description: "Use local area codes to increase pickup rates.",
        },
      ],
    },
  ],
};

export default function WorkflowAddOns({ data }) {
  // Each field falls back independently, so partial/dynamic CMS data works correctly
  const titleLead = data?.titleLead || defaultData.titleLead;
  const titleAccent = data?.titleAccent || defaultData.titleAccent;
  const footnote = data?.footnote || defaultData.footnote;
  const cards =
    Array.isArray(data?.cards) && data.cards.length > 0 ? data.cards : defaultData.cards;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-4xl font-extrabold text-slate-800">
          {titleLead}{" "}
          <span className="text-sky-500">{titleAccent}</span>
        </h2>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {cards.map((card, i) => (
            <AddOnCard key={i} card={card} />
          ))}
        </div>

        {footnote && (
          <p className="mt-6 text-xs sm:text-sm text-slate-500">{footnote}</p>
        )}
      </div>
    </section>
  );
}

function AddOnCard({ card }) {
  const features = Array.isArray(card?.features) ? card.features : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/60 p-6 sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-500">
            {card?.eyebrow}
          </p>
          <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
            {card?.name}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{card?.price}</p>
          <p className="text-[11px] text-slate-500 leading-snug">{card?.priceUnit}</p>
          <p className="text-[11px] text-slate-500 leading-snug">{card?.priceNote}</p>
        </div>
      </div>

      <hr className="my-4 border-slate-200" />

      {/* Feature list */}
      {features.length > 0 && (
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-700" strokeWidth={2.5} />
              <div>
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
                  {feature.title}
                  {feature.badge && (
                    <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-500">
                      {feature.badge}
                    </span>
                  )}
                </p>
                {feature.description && (
                  <p className="mt-0.5 text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}