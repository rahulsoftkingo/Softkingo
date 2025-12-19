import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXTAUTH_URL || "https://www.softkingo.com";

// 1) BlogPost.type -> public URL base
const BLOG_TYPE_TO_BASE = {
  blog: "/blog",
  featured: "/featured",
  "press-release": "/press-releases",
  media: "/media-coverage",
  article: "/articles",
  whitepaper: "/whitepapers",
  podcast: "/podcasts",
  guide: "/guides",
};

// 2) Page.type -> public URL base
const PAGE_TYPE_TO_BASE = {
  service: "/services",
  hire: "/hire",
  featured: "/featured",
  solution: "/solutions",
  guide: "/guides",
  article: "/articles",
  whitepaper: "/whitepapers",
  podcast: "/podcasts",
  media: "/media-coverage",
  "press-release": "/press-releases",
};

export default async function sitemap() {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/blog",
    "/blog/category",
    "/careers",
    "/contact",
    "/e-guides",
    "/featured",
    "/gallery",
    "/hire",
    "/insights",
    "/portfolio",
    "/solutions",
    "/solutions/food-delivery",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  // Cloud Build / build-time: DB skip
  if (process.env.SKIP_SSG_DB === "true") {
    return staticRoutes;
  }

  // BlogPost: include all published posts (publishedAt != null)
  const posts = await prisma.blogPost.findMany({
    where: {
      publishedAt: { not: null },
      type: { in: Object.keys(BLOG_TYPE_TO_BASE) },
    },
    select: { slug: true, updatedAt: true, publishedAt: true, type: true },
  });

  // Blog categories
  const categories = await prisma.blogCategory.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Case studies
  const caseStudies = await prisma.caseStudy.findMany({
    select: { slug: true, updatedAt: true },
  });

  // EGuides
  const eGuides = await prisma.eGuide.findMany({
    where: { publishedAt: { not: null } },
    select: { slug: true, updatedAt: true, publishedAt: true },
  });

  // Pages (services/hire/solutions/etc)
  const pages = await prisma.page.findMany({
    where: {
      status: "published",
      type: { in: Object.keys(PAGE_TYPE_TO_BASE) },
    },
    select: { slug: true, updatedAt: true, type: true },
  });

  const blogRoutes = posts
    .filter((p) => !!p.slug && !!BLOG_TYPE_TO_BASE[p.type])
    .map((p) => ({
      url: `${baseUrl}${BLOG_TYPE_TO_BASE[p.type]}/${p.slug}`,
      lastModified: p.updatedAt ?? p.publishedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: p.type === "featured" ? 0.8 : 0.7,
    }));

  const blogCategoryRoutes = categories
    .filter((c) => !!c.slug)
    .map((c) => ({
      url: `${baseUrl}/blog/category/${c.slug}`,
      lastModified: c.updatedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  const caseStudyRoutes = caseStudies
    .filter((c) => !!c.slug)
    .map((c) => ({
      url: `${baseUrl}/case-studies/${c.slug}`,
      lastModified: c.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const eGuideRoutes = eGuides
    .filter((g) => !!g.slug)
    .map((g) => ({
      url: `${baseUrl}/e-guides/${g.slug}`,
      lastModified: g.updatedAt ?? g.publishedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const pageRoutes = pages
    .filter((p) => !!p.slug && !!PAGE_TYPE_TO_BASE[p.type])
    .map((p) => ({
      url: `${baseUrl}${PAGE_TYPE_TO_BASE[p.type]}/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
    ...caseStudyRoutes,
    ...eGuideRoutes,
    ...pageRoutes,
  ];
}
