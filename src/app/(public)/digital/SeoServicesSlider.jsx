"use client";

import Image from "next/image";
import Link from "next/link";

// 👇 Dummy/default data — jab tak backend se real data na aaye
const DEFAULT_DATA = {
  title: "Work that speaks, before we do",
  subtitle:
    "Every campaign we deliver is built to capture attention, drive engagement, and leave a lasting impression. Through bold visual design and strategic storytelling, our work balances creativity and purpose. Explore the projects that exemplify our results-driven approach and measurable impact.",
  items: [
    {
      title: "Star Cinemas",
      description: "<p>Digital and Social Marketing</p>",
      // image:
      //   "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "SHRM",
      description: "<p>Digital and Social Marketing</p>",
      // image:
      //   "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Leela Hotels",
      description: "<p>Public Relations</p>",
      // image:
      //   "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "AMP Motors",
      description: "<p>Public Relations</p>",
      // image:
      //   "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Nestasia",
      description: "<p>Public Relations</p>",
      // image:
        // "https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "LCR Capital Partners",
      description: "<p>Public Relations</p>",
      // image:
      //   "https://images.unsplash.com/photo-1501466044931-62695578f174?q=80&w=1200&auto=format&fit=crop",
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
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-slate-900">
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className="mx-auto mt-4 max-w-3xl text-center text-md leading-relaxed text-gray-500"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title ? `${item.title}-${i}` : i}
              className="group relative block h-[260px] overflow-hidden rounded-2xl bg-slate-100 shadow-xl"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title || "Feature"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {item.description && (
                <span
                  className="absolute left-4 top-4 text-xs font-medium text-white/80 [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}

              <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/portfolio"
            className="text-md font-medium text-slate-900 underline underline-offset-4 hover:text-sky-500"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}