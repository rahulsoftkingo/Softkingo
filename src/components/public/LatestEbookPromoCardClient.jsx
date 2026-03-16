// src/components/public/LatestEbookPromoCardClient.jsx
"use client";

import { useEffect, useState } from "react";
import EbookPromoCard from "@/components/public/EbookPromoCard";

export default function LatestEbookPromoCardClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/public/ebooks/latest")
      .then((r) => r.json())
      .then((j) => setData(j.latest))
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <EbookPromoCard
      title={data.title}
      meta={data.readTimeText || ""}
      coverImage={data.coverImage || "/images/black book.png"}
      slug={data.slug}
    />
  );
}
