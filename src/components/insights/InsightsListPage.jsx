// src/components/insights/InsightsListPage.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { dummyInsights } from "@/data/dummyInsights";

const normalizeImageSrc = (src) => {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("//")) return `https:${src}`;
  if (src.startsWith("/")) return src;
  return `/${src}`;
};

export default function InsightsListPage({ type, title, description }) {
  const items = dummyInsights
    .filter((i) => i.type === type && i.status === "published")
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero / Heading */}
      <section className="py-10 md:py-14 px-4 md:px-8 lg:px-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 text-xs md:text-sm text-slate-500">
            <Link href="/" className="hover:text-sky-600">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="capitalize">{type.replace("-", " ")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-slate-600 text-sm md:text-base max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 md:py-14 px-4 md:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            <p className="text-slate-500 text-sm">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const thumb = normalizeImageSrc(item.thumbnailUrl);
                return (
                  <Link
                    key={item.slug}
                    href={`/${type}/${item.slug}`}
                    className="group bg-white rounded-2xl p-0 border border-slate-200 hover:border-sky-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                  >
                    {thumb && (
                      <div className="relative h-40 bg-slate-100">
                        <Image
                          src={thumb}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        {item.type}
                      </p>
                      <h2 className="text-[15px] md:text-[16px] font-semibold text-slate-900 group-hover:text-sky-700 line-clamp-2">
                        {item.title}
                      </h2>
                      {item.excerpt && (
                        <p className="mt-1 text-xs md:text-sm text-slate-600 line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="mt-2 text-[11px] text-slate-400">
                        {item.publishedAt &&
                          new Date(item.publishedAt).toLocaleDateString()}
                        {item.readingTime && ` · ${item.readingTime} min read`}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
