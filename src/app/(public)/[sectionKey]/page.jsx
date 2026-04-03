// src/app/(public)/[sectionKey]/page.jsx
import SectionPage from "@/app/(public)/[sectionKey]/SectionPage";
import { BLOG_SECTIONS } from "@/app/(public)/[sectionKey]/sectionConfig";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { sectionKey } = await params;
  const config = BLOG_SECTIONS[sectionKey];
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.softkingo.com";
  if (!config) return {};

  return {
    title: `${config.title}`,
    description: config.heroSub || `Explore our latest ${config.title.toLowerCase()} and industry updates.`,
    alternates: {
      canonical: `${baseUrl}/${sectionKey}`,
    },
    openGraph: {
      title: config.heroHeading,
      description: config.heroSub,
      images: [{ url: config.heroBg }],
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(BLOG_SECTIONS).map((sectionKey) => ({ sectionKey }));
}

export default async function Page({ params: paramsPromise, searchParams }) {
  const params = await paramsPromise;
  const { sectionKey } = params;

  if (!BLOG_SECTIONS[sectionKey]) {
    notFound();
  }

  return <SectionPage sectionKey={sectionKey} searchParams={searchParams} />;
}
