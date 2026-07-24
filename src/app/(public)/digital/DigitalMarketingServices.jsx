"use client";

import { useEffect, useRef, useState } from "react";
import CommonTitle from "@/components/ui/CommonTitle";

// Fallback data used when no `data` prop (or an empty one) is passed in
const defaultData = {
  title: "Digital Marketing Services",
  subtitle:
    "From strategy to execution, we help brands grow their reach, engagement, and revenue online.",
  categories: [
    {
      shortTitle: "SEO",
      shortDesc: "Rank higher on search engines.",
      fullTitle: "Search Engine Optimization",
      fullDesc:
        "<p>We improve your site's visibility on search engines through on-page optimization, technical audits, content strategy, and link building — driving sustainable organic traffic.</p><ul><li>On-page &amp; technical audits</li><li>Content &amp; keyword strategy</li><li>Authority link building</li></ul>",
      image: "",
    },
    {
      shortTitle: "Social Media\nMarketing",
      shortDesc: "Build your brand across platforms.",
      fullTitle: "Social Media Marketing",
      fullDesc:
        "<p>We craft platform-specific strategies for Instagram, LinkedIn, X, and more — creating content that builds community and turns followers into customers.</p><ul><li>Platform-specific content</li><li>Community management</li><li>Influencer collaborations</li></ul>",
      image: "",
    },
    {
      shortTitle: "PPC\nAdvertising",
      shortDesc: "Paid campaigns that convert.",
      fullTitle: "Pay-Per-Click Advertising",
      fullDesc:
        "<p>We run targeted ad campaigns across Google, Meta, and LinkedIn, optimizing bids and creatives continuously to maximize your return on ad spend.</p><ul><li>Google &amp; Meta ad management</li><li>Continuous bid optimization</li><li>Creative testing &amp; iteration</li></ul>",
      image: "",
    },
    {
      shortTitle: "Content\nMarketing",
      shortDesc: "Tell your brand's story.",
      fullTitle: "Content Marketing",
      fullDesc:
        "<p>We produce blogs, videos, and guides that establish authority in your industry, nurture leads, and support every stage of the buyer's journey.</p><ul><li>Blogs, guides &amp; video</li><li>Thought-leadership content</li><li>Full-funnel lead nurturing</li></ul>",
      image: "",
    },
    {
      shortTitle: "Email\nMarketing",
      shortDesc: "Nurture leads into customers.",
      fullTitle: "Email Marketing",
      fullDesc:
        "<p>We design automated email flows and campaigns that keep your audience engaged, from welcome sequences to re-engagement and post-purchase nurturing.</p><ul><li>Automated email flows</li><li>Segmentation &amp; personalization</li><li>Re-engagement campaigns</li></ul>",
      image: "",
    },
    {
      shortTitle: "Web\nAnalytics",
      shortDesc: "Turn data into decisions.",
      fullTitle: "Web Analytics",
      fullDesc:
        "<p>We set up dashboards and tracking that reveal how visitors interact with your site, helping you make informed decisions about where to invest next.</p><ul><li>Custom dashboards</li><li>Conversion &amp; funnel tracking</li><li>Data-backed recommendations</li></ul>",
      image: "",
    },
    {
      shortTitle: "Branding &\nDesign",
      shortDesc: "Create a memorable identity.",
      fullTitle: "Branding & Design",
      fullDesc:
        "<p>We build cohesive visual identities — logos, color systems, and guidelines — so your brand looks consistent and professional everywhere it appears.</p><ul><li>Logo &amp; visual identity</li><li>Brand guidelines</li><li>Consistent cross-channel design</li></ul>",
      image: "",
    },
  ],
};

const DESCRIPTION_CLASS =
  "mt-3 sm:mt-4 text-sm sm:text-base text-white/90 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-white";

export default function DigitalMarketingServices({ data }) {
  const source =
    data && Array.isArray(data.categories) && data.categories.length > 0
      ? data
      : defaultData;

  const categories = source.categories || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [categories]);

  const active = categories[activeIndex];

  function handleSelect(index) {
    setActiveIndex(index);
    const container = tabsRef.current;
    const btn = container?.children?.[index];
    if (container && btn) {
      const containerWidth = container.offsetWidth;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      container.scrollTo({
        left: btnLeft - containerWidth / 2 + btnWidth / 2,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <CommonTitle
          title={source?.title || "Digital Marketing Services"}
          subtitle={source?.subtitle}
        />

        {/* Content */}
        <div className="mt-10 sm:mt-12 flex flex-col gap-6 lg:flex-row">
          {/* MOBILE: horizontal scrollable tab strip | SM+: original grid */}
          <div
            ref={tabsRef}
            className="dms-tab-scroll flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 lg:w-[36rem] shrink-0"
            style={{
              // NEW: inline fallback — ye hamesha apply hoga, styled-jsx
              // scoping/specificity issue se independent
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // old Edge/IE
            }}
          >
            {categories.map((service, index) => (
              <ServiceButton
                key={index}
                service={service}
                isActive={activeIndex === index}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>

          {/* Right Panel */}
          <div className="flex-1 overflow-hidden rounded-2xl bg-sky-500 p-4 sm:p-5 shadow-lg min-w-0">
            {active ? (
              <>
                {active.image && (
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={active.image}
                      alt={active.fullTitle}
                      className="h-44 sm:h-56 lg:h-64 w-full object-cover"
                    />
                  </div>
                )}

                <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold text-white">
                  {active.fullTitle}
                </h3>

                <div
                  className={DESCRIPTION_CLASS}
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

      {/* Scoped CSS to hide the mobile tab-strip's webkit scrollbar (Chrome/Safari) */}
      <style jsx>{`
        .dms-tab-scroll::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        .dms-tab-scroll {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </section>
  );
}

function ServiceButton({ service, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 w-40 sm:w-full snap-start",
        "rounded-2xl border px-5 py-4 sm:py-5 text-center transition-all duration-300",
        isActive
          ? "border-sky-500 bg-sky-500 text-white shadow-md"
          : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50",
      ].join(" ")}
    >
      <h4 className="text-sm sm:text-base font-sans font-semibold whitespace-pre-line leading-snug">
        {service.shortTitle}
      </h4>
    </button>
  );
}