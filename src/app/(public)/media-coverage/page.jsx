// src/app/(public)/media-coverage/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
export const dynamic = "force-dynamic";

export default async function MediaPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="media-coverage" searchParams={searchParams} />;
}
