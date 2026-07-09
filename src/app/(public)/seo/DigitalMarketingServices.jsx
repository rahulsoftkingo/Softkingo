"use client";

import { useState } from "react";

const services = [
  {
    id: "seo",
    title: "Search Engine\nOptimization",
    panelTitle: "Search Engine Optimization",
    description:
      "We craft data-backed SEO strategies that improve rankings, drive organic traffic, and turn search visibility into real business growth.",
    bullets: ["Keyword Research & Strategy", "On-Page & Technical SEO", "Link Building Campaigns"],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "smm",
    title: "Social Media\nMarketing",
    panelTitle: "Social Media Marketing",
    description:
      "We craft platform-specific strategies that grow your audience and turn followers into loyal customers across every major social channel.",
    bullets: ["Content Calendars", "Community Management", "Paid Social Campaigns"],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ppc",
    title: "PPC & Performance\nMarketing",
    panelTitle: "PPC & Performance Marketing",
    description:
      "We run data-driven ad campaigns across search and display networks to maximize your return on every rupee spent.",
    bullets: ["Keyword Bidding Strategy", "A/B Tested Creatives", "Real-Time ROI Tracking"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "web",
    title: "Website Design &\nDevelopment",
    panelTitle: "Website Design & Development",
    description:
      "We design and build fast, responsive websites that look great and convert visitors into customers.",
    bullets: ["Responsive UI/UX", "SEO-Ready Structure", "Fast Load Speeds"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "content",
    title: "Content\nMarketing",
    panelTitle: "Content Marketing",
    description:
      "We create valuable, relevant content that attracts, engages, and retains your target audience over time.",
    bullets: ["Blog & Article Writing", "SEO Content Strategy", "Content Distribution"],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "orm",
    title: "Online Reputation\nManagement",
    panelTitle: "Online Reputation Management",
    description:
      "We monitor, manage, and improve how your brand is perceived across search results, reviews, and social media.",
    bullets: ["Review Monitoring", "Crisis Response", "Brand Sentiment Reports"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "listening",
    title: "Social Media\nListening",
    panelTitle: "Social Media Listening",
    description:
      "We track conversations about your brand and industry so you can respond quickly and spot trends early.",
    bullets: ["Brand Mention Tracking", "Competitor Analysis", "Trend Alerts"],
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cro",
    title: "Conversion Rate\nOptimization",
    panelTitle: "Conversion Rate Optimization",
    description:
      "We analyze user behavior and test changes to your site to turn more visitors into paying customers.",
    bullets: ["Funnel Analysis", "A/B & Multivariate Testing", "Landing Page Optimization"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function DigitalMarketingServices() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((s) => s.id === activeId);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
          Digital Marketing Services <span className="text-sky-500">In India</span>
          <br />
          <span className="text-sky-500">for Faster Business Growth</span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-md leading-relaxed text-gray-500">
          We offer customized digital marketing solutions to help our clients
          engage their audience and build a strong brand presence across all
          platforms.
        </p>

        {/* Content layout: flex instead of arbitrary-value grid so it works
            reliably at every breakpoint (mobile stacked, lg+ three columns) */}
        <div className="mt-12 mx-auto max-w-7xl flex flex-col lg:flex-row gap-6">
          {/* Column 1 of buttons */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            {services.slice(0, 4).map((service) => (
              <ServiceButton
                key={service.id}
                service={service}
                isActive={service.id === activeId}
                onClick={() => setActiveId(service.id)}
              />
            ))}
          </div>

          {/* Column 2 of buttons */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            {services.slice(4, 8).map((service) => (
              <ServiceButton
                key={service.id}
                service={service}
                isActive={service.id === activeId}
                onClick={() => setActiveId(service.id)}
              />
            ))}
          </div>

          {/* Right panel, takes remaining space */}
          <div className="flex-1 min-w-0 flex flex-col overflow-hidden rounded-2xl bg-sky-500 p-5 shadow-lg">
            <div className="overflow-hidden rounded-xl">
              <img
                src={active.image}
                alt={active.panelTitle}
                className="w-full h-60 object-cover"
              />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-white">
              {active.panelTitle}
            </h3>

            <p className="mt-3 text-white/90 leading-relaxed">
              {active.description}
            </p>

            <ul className="mt-5 space-y-3">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-white">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white shrink-0"></span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceButton({ service, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-6 py-5 text-center text-md font-medium leading-relaxed transition-all duration-300",
        isActive
          ? "border-sky-500 bg-sky-500 text-white shadow-md"
          : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50",
      ].join(" ")}
    >
      {service.title.split("\n").map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </button>
  );
}