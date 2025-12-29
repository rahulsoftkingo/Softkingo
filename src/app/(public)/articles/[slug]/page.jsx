// src/app/(public)/articles/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/[slug]/PostSlugPage";
export const dynamic = "force-dynamic";

export default async function ArticleSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="articles" slug={slug} />;
}
