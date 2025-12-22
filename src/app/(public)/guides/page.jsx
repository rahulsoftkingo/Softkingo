// src/app/(public)/guides/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
export const dynamic = "force-dynamic";

export default async function GuidesPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="guides" searchParams={searchParams} />;
}
