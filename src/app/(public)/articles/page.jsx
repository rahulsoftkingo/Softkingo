// src/app/(public)/articles/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
export const dynamic = "force-dynamic";

export default async function ArticlePage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="articles" searchParams={searchParams} />;
}
