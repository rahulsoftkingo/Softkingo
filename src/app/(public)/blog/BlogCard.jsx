// src/components/public/blog/BlogCard.jsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { FaEye, FaHeart } from "react-icons/fa";

export default function BlogCard({ post, variant = "grid" }) {
  const {
    slug,
    title,
    excerpt,
    category,
    tags = [],
    thumbnail,
    publishedAt,
    readingTime,
    viewCount,
    likeCount,
  } = post;

  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: variant === "grid" ? undefined : "numeric",
      })
    : "";

  if (variant === "compact") {
    return (
      <Link href={`/blog/${slug}`} className="block group">
        <p className="text-[11px] text-slate-500">{category}</p>
        <p className="text-[13px] font-medium text-slate-900 group-hover:text-sky-700 line-clamp-2">
          {title}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${slug}`}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col"
    >
      <div className="relative h-40 bg-slate-100">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {category}
          </span>
          <span>{dateLabel}</span>
        </div>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-[12px] text-slate-600 line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-slate-50 text-[10px] text-slate-700 border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {readingTime ? <span>{readingTime} min</span> : null}
            {typeof viewCount === "number" && (
              <span className="inline-flex items-center gap-1">
                <FaEye className="h-3 w-3 text-slate-400" />
                <span>{viewCount}</span>
              </span>
            )}
            {typeof likeCount === "number" && (
              <span className="inline-flex items-center gap-1">
                <FaHeart className="h-3 w-3 text-rose-400" />
                <span>{likeCount}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
