
// src/app/(public)/blog/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";

export const dynamic = "force-dynamic";

export default async function BlogPage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="blog" searchParams={searchParams} />;
}

