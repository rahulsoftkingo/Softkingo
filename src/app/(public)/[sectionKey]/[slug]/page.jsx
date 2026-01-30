// src/app/(public)/[sectionKey]/[slug]/page.jsx
import PostSlugPage from "@/app/(public)/[sectionKey]/[slug]/PostSlugPage";
import prisma from "@/lib/prisma";
import { BLOG_SECTIONS } from "@/app/(public)/[sectionKey]/sectionConfig";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { sectionKey, slug } = await params;
  const config = BLOG_SECTIONS[sectionKey];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softkingo.com';

  // placementNeedle logic wahi jo aapne content fetch mein use kiya hai
  const placementNeedle = `"${sectionKey}"`;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "published",
      placements: { contains: placementNeedle }
    },
    select: {
      title: true,
      seoTitle: true,
      seoDescription: true,
      excerpt: true,
      thumbnail: true,
      publishedAt: true,
      author: { select: { name: true } }
    }
  });

  if (!post) return { title: "Article Not Found | Softkingo" };

  const finalTitle = post.seoTitle || post.title;
  const finalDesc = post.seoDescription || post.excerpt || "";
  const finalImage = post.thumbnail?.startsWith('http') ? post.thumbnail : `${baseUrl}${post.thumbnail || '/og-default.jpg'}`;

  return {
    title: finalTitle,
    description: finalDesc,
    alternates: { canonical: `${sectionKey}/${slug}` },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: `${sectionKey}/${slug}`,
      siteName: 'Softkingo',
      images: [{ url: finalImage }],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDesc,
      images: [finalImage],
    },
  };
}
export default async function Page({ params }) {
  const { sectionKey, slug } = await params;
  return <PostSlugPage sectionKey={sectionKey} slug={slug} />;
}
