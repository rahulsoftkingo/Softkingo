// src/app/(public)/podcasts/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
export const dynamic = "force-dynamic";

export default async function PodcastPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="podcasts" searchParams={searchParams} />;
}
