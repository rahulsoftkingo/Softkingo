// src/app/(public)/media-coverage/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/PostSlugPage";
export const dynamic = "force-dynamic";

export default async function MediaSlugPage({ params }) {
  const { slug } = await params;
  return <PostSlugPage sectionKey="media-coverage" slug={slug} />;
}
