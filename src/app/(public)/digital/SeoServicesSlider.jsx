"use client";

import Image from "next/image";
import Link from "next/link";
import CommonTitle from "@/components/ui/CommonTitle";

// 👇 Dummy/default data — jab tak backend se real data na aaye
const DEFAULT_DATA = {
  title: "Work that speaks, before we do",
  subtitle:
    "Every campaign we deliver is built to capture attention, drive engagement, and leave a lasting impression. Through bold visual design and strategic storytelling, our work balances creativity and purpose. Explore the projects that exemplify our results-driven approach and measurable impact.",
  items: [
    {
      title: "Star Cinemas",
      description: "<p>Digital and Social Marketing</p>",
      image:
        "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "SHRM",
      description: "<p>Digital and Social Marketing</p>",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Leela Hotels",
      description: "<p>Public Relations</p>",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "AMP Motors",
      description: "<p>Public Relations</p>",
      image:
        "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Nestasia",
      description: "<p>Public Relations</p>",
      image:
        "https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "LCR Capital Partners",
      description: "<p>Public Relations</p>",
      image:
        "https://images.unsplash.com/photo-1501466044931-62695578f174?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

export default function WorkShowcase({ data }) {
  // ✅ data na ho, ya khaali ho, to dummy data use hoga
  const title = data?.title || DEFAULT_DATA.title;
  const subtitle = data?.subtitle || DEFAULT_DATA.subtitle;
  const items =
    data?.items && data.items.length > 0 ? data.items : DEFAULT_DATA.items;

  return (
    <section className="bg-white py-8 lg:py-18 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <CommonTitle
          title={title}
          subtitle={subtitle}
          className="text-center"
        />

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title ? `${item.title}-${i}` : i}
              className="group relative block aspect-[3/4] h-[460px] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-lg"
            >
              {/* Background Image */}
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title || "Feature"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Bottom Gradient for Title Readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top Bar Background for Tag/Description */}
              {item.description && (
                <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-[2px] px-6 py-4 z-10">
                  <span
                    className="text-xs font-semibold tracking-wide text-white/90 [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              )}

              {/* Card Title */}
              <h3 className="absolute bottom-6 left-6 right-6 text-2xl font-bold text-white z-10">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/portfolio"
            className="text-base font-medium text-slate-900 underline underline-offset-4 hover:text-sky-500"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}