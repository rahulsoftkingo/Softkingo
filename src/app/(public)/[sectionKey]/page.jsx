// src/app/(public)/[sectionKey]/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
import { BLOG_SECTIONS } from "@/app/(public)/blog/sectionConfig";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return Object.keys(BLOG_SECTIONS).map((sectionKey) => ({ sectionKey }));
}

export default async function Page({ params, searchParams }) {
  const { sectionKey } = params;

  if (!BLOG_SECTIONS[sectionKey]) {
    notFound();
  }

  return <SectionPage sectionKey={sectionKey} searchParams={searchParams} />;
}
