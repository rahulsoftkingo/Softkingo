"use client";

import { useEffect, useState } from "react";

// Fallback data used when no `data` prop (or an empty one) is passed in
const defaultData = {
  // title: "Digital Marketing Services",
  // subtitle:
  //   "From strategy to execution, we help brands grow their reach, engagement, and revenue online.",
  // categories: [
  //   {
  //     shortTitle: "SEO",
  //     shortDesc: "Rank higher on search engines.",
  //     fullTitle: "Search Engine Optimization",
  //     fullDesc:
  //       "<p>We improve your site's visibility on search engines through on-page optimization, technical audits, content strategy, and link building — driving sustainable organic traffic.</p>",
  //     // image:
  //       // "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "Social Media\nMarketing",
  //     shortDesc: "Build your brand across platforms.",
  //     fullTitle: "Social Media Marketing",
  //     fullDesc:
  //       "<p>We craft platform-specific strategies for Instagram, LinkedIn, X, and more — creating content that builds community and turns followers into customers.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "PPC\nAdvertising",
  //     shortDesc: "Paid campaigns that convert.",
  //     fullTitle: "Pay-Per-Click Advertising",
  //     fullDesc:
  //       "<p>We run targeted ad campaigns across Google, Meta, and LinkedIn, optimizing bids and creatives continuously to maximize your return on ad spend.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "Content\nMarketing",
  //     shortDesc: "Tell your brand's story.",
  //     fullTitle: "Content Marketing",
  //     fullDesc:
  //       "<p>We produce blogs, videos, and guides that establish authority in your industry, nurture leads, and support every stage of the buyer's journey.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "Email\nMarketing",
  //     shortDesc: "Nurture leads into customers.",
  //     fullTitle: "Email Marketing",
  //     fullDesc:
  //       "<p>We design automated email flows and campaigns that keep your audience engaged, from welcome sequences to re-engagement and post-purchase nurturing.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "Web\nAnalytics",
  //     shortDesc: "Turn data into decisions.",
  //     fullTitle: "Web Analytics",
  //     fullDesc:
  //       "<p>We set up dashboards and tracking that reveal how visitors interact with your site, helping you make informed decisions about where to invest next.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "Branding &\nDesign",
  //     shortDesc: "Create a memorable identity.",
  //     fullTitle: "Branding & Design",
  //     fullDesc:
  //       "<p>We build cohesive visual identities — logos, color systems, and guidelines — so your brand looks consistent and professional everywhere it appears.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  //   },
  //   {
  //     shortTitle: "Conversion\nOptimization",
  //     shortDesc: "Turn visitors into customers.",
  //     fullTitle: "Conversion Rate Optimization",
  //     fullDesc:
  //       "<p>We test landing pages, forms, and checkout flows to identify friction points, running experiments that steadily improve your conversion rate.</p>",
  //     // image:
  //     //   "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  //   },
  // ],
};

export default function DigitalMarketingServices({ data }) {
  // Agar data missing hai ya categories empty hain, to defaultData fallback ho jayega
  const source =
    data && Array.isArray(data.categories) && data.categories.length > 0
      ? data
      : defaultData;

  const categories = source.categories || [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [categories]);

  const active = categories[activeIndex];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <h2 className="text-center text-4xl font-bold text-slate-900">
          {source?.title || "Digital Marketing Services"}
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-md leading-relaxed text-gray-500">
          {source?.subtitle}
        </p>

        {/* Content */}
        <div className="mt-12 flex flex-col gap-6 lg:flex-row">
          {/* Left Column */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            {categories.slice(0, 4).map((service, index) => (
              <ServiceButton
                key={index}
                service={service}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            {categories.slice(4, 8).map((service, index) => (
              <ServiceButton
                key={index + 4}
                service={service}
                isActive={activeIndex === index + 4}
                onClick={() => setActiveIndex(index + 4)}
              />
            ))}
          </div>

          {/* Right Panel */}
          <div className="flex-1 overflow-hidden rounded-2xl bg-sky-500 p-5 shadow-lg">
            {active ? (
              <>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={active.image}
                    alt={active.fullTitle}
                    className="h-64 w-full object-cover"
                  />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {active.fullTitle}
                </h3>

                <div
                  className="mt-4 text-white leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: active.fullDesc || "",
                  }}
                />
              </>
            ) : (
              <div className="flex h-64 items-center justify-center text-white">
                No Services Found
              </div>
            )}
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
        "rounded-xl border px-6 py-5 text-left transition-all duration-300",
        isActive
          ? "border-sky-500 bg-sky-500 text-white shadow-md"
          : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50",
      ].join(" ")}
    >
      <h4 className="text-lg font-semibold whitespace-pre-line">
        {service.shortTitle}
      </h4>

      <p
        className={`mt-2 text-sm ${
          isActive ? "text-white/90" : "text-slate-500"
        }`}
      >
        {service.shortDesc}
      </p>
    </button>
  );
}