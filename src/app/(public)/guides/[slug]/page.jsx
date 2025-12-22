// src/app/(public)/guides/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/PostSlugPage";
export const dynamic = "force-dynamic";

export default async function GuidesSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="guides" slug={slug} />;
}
