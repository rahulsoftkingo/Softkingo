import prisma from "@/lib/prisma";

const baseUrl = process.env.NEXTAUTH_URL || "https://www.softkingo.com";

// 1) BlogPost.type -> public URL base
// CHANGE these bases to match your actual folders:
const BLOG_TYPE_TO_BASE = {
  blog: "/blog",
  featured: "/featured",
  "press-release": "/press-releases", 
  media: "/media-coverage",           
  article: "/articles",
  whitepaper: "/whitepapers",
  podcast: "/podcasts",
  guide: "/guides",                   // add only if you actually use BlogPost.type="guide"
};

// 2) Page.type -> public URL base
// Based on your Prisma schema: Page.type is used for service/hire/solution etc.
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
    // add more static public pages here if you have
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  // BlogPost: include all published posts (publishedAt != null)
  const posts = await prisma.blogPost.findMany({
    where: {
      publishedAt: { not: null },
      type: { in: Object.keys(BLOG_TYPE_TO_BASE) }, // only types we actually expose publicly
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

  // EGuides (separate model)
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

  // Page routes (services/hire/solutions/etc)
  const pageRoutes = pages
    .filter((p) => !!p.slug && !!PAGE_TYPE_TO_BASE[p.type])
    .map((p) => ({
      url: `${baseUrl}${PAGE_TYPE_TO_BASE[p.type]}/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  const all = [
    ...staticRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
    ...caseStudyRoutes,
    ...eGuideRoutes,
    ...pageRoutes,
  ];

  console.log("SITEMAP URL COUNT =", all.length);

  return all;
}
