


// src/app/(public)/blog/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/blog/[slug]/PostSlugPage";

export const dynamic = "force-dynamic";

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;   
  return <PostSlugPage sectionKey="blog" slug={slug} />;
}

