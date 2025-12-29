"use client";

import { useEffect, useState, useTransition } from "react";
import { FaRegThumbsUp, FaThumbsUp, FaShareAlt } from "react-icons/fa";

export default function PostSocialBar({
  slug,
  initialViewCount = 0,
  initialLikeCount = 0,
  initialShareCount = 0,
}) {
  const [views, setViews] = useState(initialViewCount);
  const [likes, setLikes] = useState(initialLikeCount);
  const [shares, setShares] = useState(initialShareCount);
  const [liked, setLiked] = useState(false); // local UI state
  const [pending, startTransition] = useTransition();

  // increment view once
  useEffect(() => {
    let cancelled = false;

    fetch(`/api/public/blog/${slug}/view`, { method: "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then(() => {
        if (!cancelled) setViews((v) => v + 1);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const doLike = () => {
    if (liked) return; // prevent multiple likes in same session
    startTransition(async () => {
      const res = await fetch(`/api/public/blog/${slug}/like`, { method: "POST" });
      if (res.ok) {
        setLikes((x) => x + 1);
        setLiked(true);
      }
    });
  };

  const doShare = async () => {
    try {
      if (navigator?.share) {
        await navigator.share({ url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {}

    const res = await fetch(`/api/public/blog/${slug}/share`, { method: "POST" });
    if (res.ok) setShares((x) => x + 1);
  };

  return (
    <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-200">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
          {views} views
        </span>
        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
          {likes} likes
        </span>
        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
          {shares} shares
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={doShare}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition-colors"
        >
          <FaShareAlt className="h-3 w-3" />
          Share
        </button>

        <button
          type="button"
          onClick={doLike}
          disabled={pending || liked}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold transition-colors
            ${
              liked
                ? "bg-amber-400 text-slate-900 border-amber-300"
                : "bg-white/10 text-slate-100 border-white/15 hover:bg-white/15"
            } disabled:opacity-70
          `}
        >
          {liked ? <FaThumbsUp className="h-3 w-3" /> : <FaRegThumbsUp className="h-3 w-3" />}
          {liked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
}
