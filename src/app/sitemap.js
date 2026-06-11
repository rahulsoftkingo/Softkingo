// src/app/sitemap.js - Complete Clean Code with Debug Logs
import prisma from "@/lib/prisma";

const baseUrl =
  process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://www.softkingo.com"
    : "http://localhost:3000");

// Blog type to slug mapping
const BLOG_TYPE_MAPPING = {
  blog: "/blog",
  featured: "/featured",
  "press-release": "/press-releases",
  guides: "/guides",
  "media-coverage": "/media-coverage",
  articles: "/articles",
  whitepapers: "/whitepapers",
  podcasts: "/podcasts",
};

export default async function sitemap() {
  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/blog",
    "/solutions",
    "/industries",
    "/careers",
    "/contact",
    "/ebooks",
    "/featured",
    "/gallery",
    "/hire",
    "/portfolio",
    "/our-team",
    "/testimonials",

    // Insights
    "/press-releases",
    "/guides",
    "/media-coverage",
    "/articles",
    "/whitepapers",
    "/podcasts",

    // Legal & Misc
    "/privacy-policy",
    "/terms-conditions",
    "/faq",
    "/site-map",
    "/ai",
    "/login",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    // changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  try {
    const [posts, categories, caseStudies, ebooks, pages] =
      await Promise.all([
        prisma.blogPost.findMany({
          where: { status: "published" },
          select: { slug: true, updatedAt: true, type: true },
        }),

        prisma.blogCategory.findMany({
          select: { slug: true, updatedAt: true },
        }),

        prisma.caseStudy.findMany({
          select: { slug: true, updatedAt: true },
        }),

        prisma.ebook.findMany({
          where: { status: "published" },
          select: { slug: true, updatedAt: true },
        }),

        prisma.page.findMany({
          where: { status: "published" },
          // select: { slug: true, updatedAt: true, type: true },
        }),
      ]);

    // ✅ DEBUG LOGS (IMPORTANT)
    console.log("TOTAL POSTS:", posts.length);
    console.log("TOTAL CATEGORIES:", categories.length);
    console.log("TOTAL CASE STUDIES:", caseStudies.length);
    console.log("TOTAL EBOOKS:", ebooks.length);

    console.log("TOTAL PAGES:", pages.length);
    console.log("PAGES DATA:");
    console.table(pages);

    const dynamicRoutes = [];

    // 1. Blog posts
    const blogRoutes = posts
      .filter(
        (post) => post.slug && post.type && BLOG_TYPE_MAPPING[post.type]
      )
      .map((post) => ({
        url: `${baseUrl}${BLOG_TYPE_MAPPING[post.type]}/${post.slug}`,
        lastModified: post.updatedAt ?? new Date(),
        priority: 0.8,
      }));

    dynamicRoutes.push(...blogRoutes);

    // 2. Categories
    const categoryRoutes = categories
      .filter((c) => c.slug)
      .map((c) => ({
        url: `${baseUrl}/blog/category/${c.slug}`,
        lastModified: c.updatedAt ?? new Date(),
        priority: 0.8,
      }));

    dynamicRoutes.push(...categoryRoutes);

    // 3. Case studies
    const caseStudyRoutes = caseStudies
      .filter((cs) => cs.slug)
      .map((cs) => ({
        url: `${baseUrl}/case-studies/${cs.slug}`,
        lastModified: cs.updatedAt ?? new Date(),
        priority: 0.8,
      }));

    dynamicRoutes.push(...caseStudyRoutes);

    // 4. Ebooks
    const ebookRoutes = ebooks
      .filter((e) => e.slug)
      .map((e) => ({
        url: `${baseUrl}/ebooks/${e.slug}`,
        lastModified: e.updatedAt ?? new Date(),
        priority: 0.8,
      }));

    dynamicRoutes.push(...ebookRoutes);

    // 5. Pages (services, hire, solutions, industries)
    const pageRoutes = pages
      .filter((p) => p.slug)
      .map((page) => {
        const basePath = {
          service: "/services",
          hire: "/hire",
          solution: "/solutions",
          industry: "/industries",
          clone: "/solutions",
        }[page.type] || `/${page.type}`;

        return {
          url: `${baseUrl}${basePath}/${page.slug}`,
          lastModified: page.updatedAt ?? new Date(),
          priority: 0.8,
        };
      });

    dynamicRoutes.push(...pageRoutes);

    return [...staticRoutes, ...dynamicRoutes].sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticRoutes;
  }
}