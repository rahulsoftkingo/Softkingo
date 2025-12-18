// src/app/(public)/whitepapers/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
export const dynamic = "force-dynamic";

export default async function WhitepaperPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="whitepapers" searchParams={searchParams} />;
}
