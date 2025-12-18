// src/app/(public)/press-releases/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/PostSlugPage";
export const dynamic = "force-dynamic";

export default async function PressReleaseSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="press-releases" slug={slug} />;
}
