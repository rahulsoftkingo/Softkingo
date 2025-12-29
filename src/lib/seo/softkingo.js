import prisma from "@/lib/prisma";

export const SOFTKINGO = {
  siteName: "Softkingo",
  defaultTitle: "Softkingo - Custom Software Development",
  defaultDescription: "Softkingo builds custom software solutions for businesses worldwide. React Native, Next.js, Node.js, Full-stack development.",
  defaultImage: "/og-image.jpg",
  baseUrl: process.env.NODE_ENV === "production" ? "https://softkingo.com" : "http://localhost:3000",
};

// Blog SEO
export async function getBlogSeo(slug) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      seoTitle: true,
      title: true,
      seoDescription: true,
      excerpt: true,
      seoImage: true,
      thumbnail: true,
      heroImage: true,
      status: true,
    },
  });

  if (!post || post.status !== "published") return null;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || SOFTKINGO.defaultDescription,
    image: post.seoImage || post.heroImage || post.thumbnail || SOFTKINGO.defaultImage,
    url: `/blog/${slug}`,
  };
}

// Page SEO (/about, /contact)
export async function getPageSeo(slug) {
  const page = await prisma.page.findUnique({
    where: { slug },
    select: {
      seoTitle: true,
      title: true,
      seoDescription: true,
      excerpt: true,
      seoImage: true,
      status: true,
    },
  });

  if (!page || page.status !== "published") return null;

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt || SOFTKINGO.defaultDescription,
    image: page.seoImage || SOFTKINGO.defaultImage,
    url: `/${slug}`,
  };
}

// ContentItem SEO (services, solutions)
export async function getContentSeo(slug) {
  const item = await prisma.contentItem.findUnique({
    where: { slug },
    select: {
      seoTitle: true,
      title: true,
      seoDescription: true,
      thumbnail: true,
      heroImage: true,
      status: true,
    },
  });

  if (!item || item.status !== "published") return null;

  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || SOFTKINGO.defaultDescription,
    image: item.heroImage || item.thumbnail || SOFTKINGO.defaultImage,
    url: `/services/${slug}`,
  };
}

// CaseStudy SEO
export async function getCaseStudySeo(slug) {
  const cs = await prisma.caseStudy.findUnique({
    where: { slug },
    select: {
      seoTitle: true,
      title: true,
      seoDescription: true,
    },
  });

  if (!cs) return null;

  return {
    title: cs.seoTitle || cs.title,
    description: cs.seoDescription || SOFTKINGO.defaultDescription,
    image: SOFTKINGO.defaultImage,
    url: `/case-studies/${slug}`,
  };
}

// EGuide SEO
export async function getEguideSeo(slug) {
  const eg = await prisma.eGuide.findUnique({
    where: { slug },
    select: {
      seoTitle: true,
      title: true,
      seoDescription: true,
      coverImage: true,
      status: true,
    },
  });

  if (!eg || eg.status !== "published") return null;

  return {
    title: eg.seoTitle || eg.title,
    description: eg.seoDescription || SOFTKINGO.defaultDescription,
    image: eg.coverImage || SOFTKINGO.defaultImage,
    url: `/e-guides/${slug}`,
  };
}
