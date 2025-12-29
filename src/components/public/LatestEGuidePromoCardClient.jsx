// src/components/public/LatestEGuidePromoCardClient.jsx
"use client";

import { useEffect, useState } from "react";
import EGuidePromoCard from "@/components/public/EGuidePromoCard";

export default function LatestEGuidePromoCardClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/public/e-guides/latest")
      .then((r) => r.json())
      .then((j) => setData(j.latest))
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <EGuidePromoCard
      title={data.title}
      meta={data.readTimeText || ""}
      coverImage={data.coverImage || "/images/black book.png"}
      slug={data.slug}
    />
  );
}
