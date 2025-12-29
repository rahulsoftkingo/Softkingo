// src/app/(public)/featured/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/[slug]/PostSlugPage";

export const dynamic = "force-dynamic";

export default async function FeaturedSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="featured" slug={slug} />;
}
