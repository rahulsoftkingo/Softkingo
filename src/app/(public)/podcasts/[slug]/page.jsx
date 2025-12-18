// src/app/(public)/podcasts/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/PostSlugPage";
export const dynamic = "force-dynamic";

export default async function PodcastSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="podcasts" slug={slug} />;
}
