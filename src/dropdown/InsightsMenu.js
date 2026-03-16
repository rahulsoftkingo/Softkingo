import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import LatestEbookPromoCardClient from "@/components/public/LatestEbookPromoCardClient";

export const ResourceItem = ({
  href,
  title,
  description,
  meta,
  activeTab,
  handleTabChange,
}) => (
  <Link
    href={href}
    onMouseEnter={() => handleTabChange(title)}
    className="group block p-4 rounded-2xl border border-sky-100 bg-white hover:bg-sky-50 hover:border-sky-200 shadow-lg hover:shadow-md transition"
  >
    <div className="flex items-center justify-between">
      <span
        className={`font-semibold text-[15px] ${
          activeTab === title ? "text-sky-700" : "text-sky-900"
        }`}
      >
        {title}
      </span>
      <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs" />
    </div>
    <p className="text-slate-600 text-[13px] mt-1 leading-relaxed">
      {description}
    </p>
    {/* {meta && (
      <p className="text-slate-500 text-[11px] mt-2">
        {meta}
      </p>
    )} */}
  </Link>
);

const insightItems = [
  {
    key: "blogs",
    href: "/blog",
    title: "Latest Blogs",
    description:
      "Unpack the latest tech trends, opinions best practices from our experts.",
    meta: "Weekly updates · Product, design & engineering",
  },
  {
    key: "featured",
    href: "/featured",
    title: "Featured Blog",
    description:
      "Handpicked stories that go deep into product strategy, UX and complex builds.",
    meta: "Curated picks · Long reads",
  },
  {
    key: "ebooks",
    href: "/ebooks",
    title: "E‑books",
    description:
      "Step‑by‑step playbooks to plan, build and scale web and mobile products.",
    meta: "Downloadable PDFs · Frameworks & checklists",
  },
  {
    key: "pressrelease",
    href: "/press-releases",
    title: "Press Releases",
    description:
      "Stay updated with our latest launches, partnerships and milestones.",
    meta: "Company news · Launches",
  },
  {
    key: "guides",
    href: "/guides",
    title: "Product Guides",
    description:
      "Feature breakdowns and how‑to guides for stakeholders across product and tech.",
    meta: "Visual walkthroughs · 5–8 min reads",
  },
  {
    key: "media",
    href: "/media-coverage",
    title: "Media Coverage",
    description:
      "Read what global media and industry platforms are saying about our work.",
    meta: "Interviews · Feature stories",
  },
  {
    key: "articles",
    href: "/articles",
    title: "Articles",
    description:
      "In‑depth articles on cloud, AI, app architecture, performance and more.",
    meta: "Technical & business · 6–10 min reads",
  },
  {
    key: "whitepapers",
    href: "/whitepapers",
    title: "Whitepapers",
    description:
      "Research‑backed documents on emerging tech and enterprise adoption.",
    meta: "Downloadable · Data‑driven insights",
  },
  {
    key: "podcast",
    href: "/podcasts",
    title: "Podcasts",
    description:
      "Conversations with founders, CTOs and leaders on building and scaling products.",
    meta: "Audio · On‑the‑go learning",
  },
];

const ResourcesMenu = () => {
  const [activeTab, setActiveTab] = useState(null);
  const handleTabChange = (title) => setActiveTab(title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-16">
      <div className="absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="relative bg-white max-w-[90rem] w-full h-[80vh] max-h-[40rem] rounded-b-2xl shadow-md overflow-hidden z-10">
          <div className="grid grid-cols-1 xl:grid-cols-[76%_24%] h-full">
            {/* Center content */}
            <div className="flex flex-col justify-between h-full w-full">
              <div className="h-full w-full max_height">
                {/* Title */}
                <div className="px-9 pt-9 pb-4">
                  <div className="flex items-center gap-2 mb-2 group">
                    <Link
                      href="/insights"
                      className="font-semibold text-xl md:text-2xl text-sky-900 group-hover:text-sky-700 transition-colors"
                    >
                      Explore Insights
                    </Link>
                    <FaArrowRight className="text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-sm" />
                  </div>
                {/* <p className="text-[15px] leading-[26px] text-sky-900">
                    Discover blogs, featured stories, e‑books, whitepapers and
                    more to plan your next digital initiative with confidence.
                  </p> */}
                </div>

                {/* 3x3 grid */}
                <div className="bg-white overflow-auto px-9 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {insightItems.map((item) => (
                      <ResourceItem
                        key={item.key}
                        href={item.href}
                        title={item.title}
                        description={item.description}
                        meta={item.meta}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="h-[7rem] w-full shadow-sm bg-gradient-to-r from-sky-900 via-sky-700 to-sky-500 text-gray-100">
                <div className="flex flex-row justify-between items-center px-6 md:px-12 h-full">
                  <div className="flex flex-col space-y-1 md:space-y-1.5">
                    <h5 className="text-white text-base md:text-2xl font-semibold">
                      Turn insights into impact
                    </h5>
                    <p className="text-white text-[11px] md:text-sm max-w-xl">
                      Share your idea or use case and we will map it with the
                      right articles, guides and case studies plus a tailored
                      execution plan.
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Link
                      href="/contact"
                      className="border border-white/90 py-2 px-4 rounded-full text-xs md:text-sm font-medium text-white
                        hover:text-sky-900 hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                      Talk to an expert
                      <FaArrowRight className="text-[0.75rem]" />
                    </Link>
                    <p className="hidden md:block text-[10px] text-sky-100/80">
                      Get a free 30‑min discovery call
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Ebook card */}
            <div className="hidden xl:block w-full h-full bg-white">
              <div className="h-full w-full border-l border-sky-100 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 px-6 py-8 flex items-center">
               <LatestEbookPromoCardClient />
                {/* <div className="bg-white/90 border border-sky-100 rounded-3xl p-5 flex flex-col justify-between h-full max-h-[500px] w-full shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  <div>
                    <p className="text-[11px] tracking-[0.24em] uppercase text-sky-500">
                      E‑book
                    </p>

                    <div className="bg-gradient-to-tl from-sky-600 via-sky-700 to-sky-900 rounded-2xl my-5 mr-10 flex items-center justify-center">
                      <img
                        src="/images/black book.png"
                        className="p-6"
                        alt="Insights Guide"
                      />
                    </div>

                    <h2 className="text-xs text-sky-600 font-semibold">
                      Resource Guide
                    </h2>
                    <h1 className="text-sm text-slate-900 font-semibold mt-1">
                      The Ultimate Guide: What is PSA Software?
                    </h1>
                    <p className="mt-1 text-[9px] text-slate-500">
                      July 22, 2025 · 18 min read
                    </p>
                    <p className="mt-3 text-[10px] text-slate-700 leading-relaxed">
                      Learn how Professional Services Automation (PSA) software
                      helps you manage projects, resources, billing and
                      profitability in one place.
                    </p>
                  </div>

                  <Link
                    href="/ebooks/psa-software-guide"
                    className="mt-4 px-4 md:px-6 py-2 rounded-full bg-sky-600 text-white text-xs md:text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-sky-500 transition-colors flex items-center gap-2 w-fit"
                  >
                    Download Now
                    <FaArrowRight className="text-[0.75rem]" />
                  </Link>
                </div> */}
              </div>
            </div>
            {/* Right end */}
          </div>
        </div>
      </div>
            <style>{`.header_menu_tab_ic {
    border-radius: 8px;
    background: linear-gradient(180deg, #cedbdf 0%, #f0f4f4 100%), #d9d9d9;
    flex: 0 0 45px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* color: rgb(95, 162, 188); */
}
.max_height{
    height: calc(100% - 7rem);
    max-height: calc(100% - 7rem);
}

.bg_gradent_l
{
    background: linear-gradient(305deg, #c6e7f3ed, transparent);
}`}</style>
    </div>
  );
};

export default ResourcesMenu;
