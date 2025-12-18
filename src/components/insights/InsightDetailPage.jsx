// src/components/insights/InsightDetailPage.jsx
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

export default function InsightDetailPage({ type, slug }) {
  const item = dummyInsights.find(
    (i) => i.type === type && i.slug === slug && i.status === "published"
  );

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Post not found.</p>
      </main>
    );
  }

  const cover = normalizeImageSrc(item.coverUrl);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Heading */}
      <section className="py-8 md:py-10 px-4 md:px-8 lg:px-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3 text-xs md:text-sm text-slate-500">
            <Link href="/" className="hover:text-sky-600">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <Link
              href={`/${type}`}
              className="hover:text-sky-600 capitalize"
            >
              {type.replace("-", " ")}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700 line-clamp-1">{item.title}</span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">
            {item.type}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            {item.title}
          </h1>
          {item.excerpt && (
            <p className="text-slate-600 text-sm md:text-base">
              {item.excerpt}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
            {item.publishedAt &&
              new Date(item.publishedAt).toLocaleDateString()}
            {item.readingTime && ` · ${item.readingTime} min read`}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {cover && (
        <section className="bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-20 py-6">
            <div className="relative h-56 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={cover}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="py-10 md:py-14 px-4 md:px-8 lg:px-20">
        <div className="max-w-3xl mx-auto prose prose-sky prose-sm md:prose-base">
          <ArticleBodyRenderer body={item.body} />
        </div>
      </section>
    </main>
  );
}

// Simple dummy renderer – baad me Tiptap/CKEditor renderer laga sakte ho
function ArticleBodyRenderer({ body }) {
  if (!body) return null;
  if (Array.isArray(body.blocks)) {
    return (
      <>
        {body.blocks.map((block, idx) => {
          if (block.type === "heading") {
            return <h2 key={idx}>{block.text}</h2>;
          }
          return <p key={idx}>{block.text}</p>;
        })}
      </>
    );
  }
  if (typeof body === "string") return <p>{body}</p>;
  return null;
}
