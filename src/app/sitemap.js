// src/app/sitemap.js - Complete Clean Code with All Types
import prisma from "@/lib/prisma";

const baseUrl = process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://www.softkingo.com' : 'http://localhost:3000');

// Blog type to slug mapping (from BLOG_SECTIONS)
const BLOG_TYPE_MAPPING = {
  'blog': '/blog',
  'featured': '/featured',
  'press-release': '/press-releases',
  'guides': '/guides',
  'media-coverage': '/media-coverage',
  'articles': '/articles',
  'whitepapers': '/whitepapers',
  'podcasts': '/podcasts'
};

export default async function sitemap() {
  // Static routes
  const staticRoutes = [
    // Main pages
    "", "/about", "/services", "/case-studies", "/blog", "/blog/category",
    "/careers", "/contact", "/ebooks", "/featured", "/gallery", "/hire",
    "/portfolio",

    // Hire pages (from HireMenuItems)
    // "/hire/app-developers", ...
    
    // Insights (from insightItems)
    // "/blog", "/featured", "/ebooks", "/press-releases", "/guides",
    // "/media-coverage", "/articles", "/whitepapers", "/podcasts",

    // Legal & Misc
    "/privacy-policy", "/terms-conditions", "/faq", "/site-map", "/ai", "/login"
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path.includes('/industries/') || path.includes('/solutions/') ? 0.8 : 0.8
  }));

  try {
    // Fetch all dynamic content
    const [
      posts,
      categories,
      caseStudies,
      ebooks,
      pages
    ] = await Promise.all([
      // All published blog posts with type
      prisma.blogPost.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true, type: true }
      }),

      // Blog categories
      prisma.blogCategory.findMany({
        select: { slug: true, updatedAt: true }
      }),

      // Case studies
      prisma.caseStudy.findMany({
        select: { slug: true, updatedAt: true }
      }),

      // Ebooks
      prisma.ebook.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true }
      }),

      // Pages
      prisma.page.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true, type: true }
      })
    ]);

    // Dynamic routes generation
    const dynamicRoutes = [];

    // 1. Blog posts - Type-based routing
    const blogRoutes = posts
      .filter(post => post.slug && post.type && BLOG_TYPE_MAPPING[post.type])
      .map(post => ({
        url: `${baseUrl}${BLOG_TYPE_MAPPING[post.type]}/${post.slug}`,
        lastModified: post.updatedAt ?? new Date(),
        // changeFrequency: "weekly",
        priority: 0.8
      }));
    dynamicRoutes.push(...blogRoutes);

    // 2. Blog categories
    const categoryRoutes = categories
      .filter(category => category.slug)
      .map(category => ({
        url: `${baseUrl}/blog/category/${category.slug}`,
        lastModified: category.updatedAt ?? new Date(),
        // changeFrequency: "monthly",
        priority: 0.8
      }));
    dynamicRoutes.push(...categoryRoutes);

    // 3. Case studies
    const caseStudyRoutes = caseStudies
      .filter(cs => cs.slug)
      .map(cs => ({
        url: `${baseUrl}/case-studies/${cs.slug}`,
        lastModified: cs.updatedAt ?? new Date(),
        // changeFrequency: "monthly",
        priority: 0.8
      }));
    dynamicRoutes.push(...caseStudyRoutes);

    // 4. Ebooks
    const ebookRoutes = ebooks
      .filter(guide => guide.slug)
      .map(guide => ({
        url: `${baseUrl}/ebooks/${guide.slug}`,
        lastModified: guide.updatedAt ?? new Date(),
        // changeFrequency: "monthly",
        priority: 0.8
      }));
    dynamicRoutes.push(...ebookRoutes);

    // 5. Pages (services, hire, solutions, industries)
    const pageRoutes = pages
      .filter(page => page.slug)
      .map(page => {
        const basePath = {
          'service': '/services',
          'hire': '/hire',
          'solution': '/solutions',
          'industry': '/industries',
          'clone': '/solutions'
        }[page.type] || `/${page.type}`;

        return {
          url: `${baseUrl}${basePath}/${page.slug}`,
          lastModified: page.updatedAt ?? new Date(),
          // changeFrequency: "monthly",
          priority: 0.8
        };
      });
    dynamicRoutes.push(...pageRoutes);

    // Combine all routes
    return [
      ...staticRoutes,
      ...dynamicRoutes
    ].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes; // Fallback to static routes only
  }
}
