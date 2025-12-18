// src/app/(public)/whitepapers/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/PostSlugPage";
export const dynamic = "force-dynamic";

export default async function WhitepaperSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="whitepapers" slug={slug} />;
}
