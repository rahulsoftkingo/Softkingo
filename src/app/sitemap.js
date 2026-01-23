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
    "/careers", "/contact", "/e-guides", "/featured", "/gallery", "/hire",
    "/insights", "/portfolio",
    
    // Industries
    '/industries',
    '/industries/healthcare-app-development',
    '/industries/elearning-app-development', 
    '/industries/real-estate-app-development',
    '/industries/travel-app-development',
    '/industries/food-delivery-app-development',
    '/industries/fitness-app-development',
    '/industries/logistics-app-development',
    '/industries/social-media-app-development',
    '/industries/fintech-software-development',
    '/industries/automotive-app-development',
    '/industries/construction-management-software-development',
    '/industries/manufacturing-app-development',
    '/industries/event-management-software-development',

    // Solutions
    '/solutions/grocery-delivery-app-development',
    '/solutions/pickup-and-delivery-service-app-development',
    '/solutions/taxi-app-development-services',
    '/solutions/fitness-trainer-app-development',
    '/solutions/on-demand-home-service-app-development',
    '/solutions/salon-app-development',
    '/solutions/ice-cream-delivery-app-development',
    '/solutions/laundry-app-development',
    '/solutions/restaurant-app-development-company',
    '/solutions/dating-app-development-company',
    '/solutions/ride-sharing-app-development',
    '/solutions/tutor-app-development',
    '/solutions/mechanic-app-development',
    '/solutions/car-wash-app-development',
    '/solutions/marketplace-app-development',
    '/solutions/subscription-platform-development',
    '/solutions/multivendor-ecommerce-development',
    '/solutions/saas-product-development',
    '/solutions/crm-software-development',
    '/solutions/erp-software-development',
    '/solutions/online-booking-system-development',
    '/solutions/loyalty-membership-platform',
    '/solutions/hr-software-development',
    '/solutions/inventory-management-software',
    '/solutions/ai-ml-development',
    '/solutions/chatbot-development',
    '/solutions/iot-app-development',
    '/solutions/blockchain-development',
    '/solutions/cloud-devops-services',
    '/solutions/ar-vr-app-development',

    // Legal & Misc
    "/privacy-policy", "/terms-conditions", "/faq", "/site-map",
    "/articles", "/guides", "/media-coverage", "/podcasts", "/press-releases", 
    "/whitepapers", "/ai", "/login"
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path.includes('/industries/') || path.includes('/solutions/') ? 0.8 : 0.7
  }));

  try {
    // Fetch all dynamic content
    const [
      posts,
      categories,
      caseStudies,
      eGuides,
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

      // E-Guides
      prisma.eGuide.findMany({
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
        changeFrequency: "weekly",
        priority: 0.8
      }));
    dynamicRoutes.push(...blogRoutes);

    // 2. Blog categories
    const categoryRoutes = categories
      .filter(category => category.slug)
      .map(category => ({
        url: `${baseUrl}/blog/category/${category.slug}`,
        lastModified: category.updatedAt ?? new Date(),
        changeFrequency: "monthly",
        priority: 0.6
      }));
    dynamicRoutes.push(...categoryRoutes);

    // 3. Case studies
    const caseStudyRoutes = caseStudies
      .filter(cs => cs.slug)
      .map(cs => ({
        url: `${baseUrl}/case-studies/${cs.slug}`,
        lastModified: cs.updatedAt ?? new Date(),
        changeFrequency: "monthly",
        priority: 0.75
      }));
    dynamicRoutes.push(...caseStudyRoutes);

    // 4. E-Guides
    const eGuideRoutes = eGuides
      .filter(guide => guide.slug)
      .map(guide => ({
        url: `${baseUrl}/e-guides/${guide.slug}`,
        lastModified: guide.updatedAt ?? new Date(),
        changeFrequency: "monthly",
        priority: 0.7
      }));
    dynamicRoutes.push(...eGuideRoutes);

    // 5. Pages (services, hire, solutions)
    const pageRoutes = pages
      .filter(page => page.slug)
      .map(page => {
        const basePath = {
          'service': '/services',
          'hire': '/hire', 
          'solution': '/solutions'
        }[page.type] || `/${page.type}`;
        
        return {
          url: `${baseUrl}${basePath}/${page.slug}`,
          lastModified: page.updatedAt ?? new Date(),
          changeFrequency: "monthly",
          priority: 0.65
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
