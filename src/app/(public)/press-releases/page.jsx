// src/app/(public)/press-release/page.jsx
import SectionPage from "@/app/(public)/blog/SectionPage";
export const dynamic = "force-dynamic";

export default async function PressReleasePage(props) {
  const searchParams = await props.searchParams;
  return <SectionPage sectionKey="press-releases" searchParams={searchParams} />;
}
