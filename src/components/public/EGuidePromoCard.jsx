// src/components/public/EGuidePromoCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function EGuidePromoCard({
  eyebrow = "EGuide",
  badge = "Resource Guide",
  title,
  meta,
  coverImage,
  slug,                 // <-- new
  ctaLabel = "Download Now",
}) {
  const href = slug ? `/e-guides/${slug}` : "/e-guides";

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 border border-sky-100 rounded-2xl p-4 sm:p-5 shadow-sm">
      <p className="text-[11px] tracking-[0.24em] uppercase text-sky-500 mb-1">{eyebrow}</p>

      <div className="bg-gradient-to-tr from-sky-400 via-sky-600 to-slate-700 rounded-2xl my-3 overflow-hidden">
        <div className="relative h-68">
          <Image src={coverImage} alt={title || "EGuide"} fill className="object-contain p-4" />
        </div>
      </div>

      <p className="text-xs text-sky-600 font-semibold">{badge}</p>
      <h3 className="text-sm text-slate-900 font-semibold mt-1">{title}</h3>
      {meta ? <p className="mt-1 text-[10px] text-slate-500">{meta}</p> : null}

      {/* slug-based button bottom */}
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 text-white text-xs font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-sky-500 transition-colors w-fit"
      >
        {ctaLabel}
        <FaArrowRight className="text-[0.75rem]" />
      </Link>
    </div>
  );
}
