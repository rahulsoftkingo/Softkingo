// src/app/(public)/featured/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";

export const dynamic = "force-dynamic";

export default async function FeaturedPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="featured" searchParams={searchParams} />;
}
