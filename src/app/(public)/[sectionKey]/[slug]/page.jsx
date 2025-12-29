// src/app/(public)/[sectionKey]/[slug]/page.jsx


import PostSlugPage from "@/app/(public)/blog/[slug]/PostSlugPage";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { sectionKey, slug } = await params;
  return <PostSlugPage sectionKey={sectionKey} slug={slug} />;
}
