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
    "/insights", "/portfolio",

    // Hire pages (from HireMenuItems)
    // "/hire/app-developers", "/hire/android-developers", "/hire/ios-developers",
    // "/hire/iphone-app-developers", "/hire/ipad-developers", "/hire/flutter-developers",
    // "/hire/react-native-developers", "/hire/frontend-developers", "/hire/angular-developers",
    // "/hire/reactjs-developers", "/hire/vuejs-developers", "/hire/web-app-developers",
    // "/hire/backend-developers", "/hire/java-developers", "/hire/nodejs-developers",
    // "/hire/python-developers", "/hire/php-developers", "/hire/laravel-developers",
    // "/hire/Django-developers", "/hire/full-stack-developers", "/hire/mern-developers",
    // "/hire/mean-developers", "/hire/laravel-vue-developers", "/hire/react-node-developers",
    // "/hire/ecommerce-developers", "/hire/magento-developers", "/hire/wordpress-developers",
    // "/hire/woocommerce-developers", "/hire/shopify-developers", "/hire/dedicated-developers",
    // "/hire/solution-architects", "/hire/devops-engineers", "/hire/qa-testers",
    // "/hire/ml-engineers", "/hire/software-developers", "/hire/ui-ux-designers",

    // Services pages (from servicesData)
    // "/services/mobile-app-development", "/services/android-app-development", "/services/ios-app-development",
    // "/services/hybrid-app-development", "/services/react-native-app-development",
    // "/services/flutter-native-app-development", "/services/app-ui-ux-design",
    // "/services/web-development", "/services/custom-website-development", "/services/cms-development",
    // "/services/web-application-development", "/services/enterprise-web-development",
    // "/services/website-redesign", "/services/website-maintenance", "/services/ecommerce-development",
    // "/services/shopify-development", "/services/woocommerce-development", "/services/magento-development",
    // "/services/custom-ecommerce-development", "/services/multivendor-ecommerce-development",
    // "/services/ecommerce-app-development", "/services/blockchain-development",
    // "/services/crypto-wallet-development", "/services/smart-contract-development",
    // "/services/nft-marketplace-development", "/services/dapp-development", "/services/defi-development",
    // "/services/token-development", "/services/ai-ml", "/services/ai-development",
    // "/services/machine-learning-development", "/services/chatbot-development", "/services/predictive-analytics",
    // "/services/computer-vision", "/services/recommendation-engine-development",
    // "/services/iot-embedded", "/services/iot-app-development", "/services/embedded-software-development",
    // "/services/iiot", "/services/device-integration", "/services/home-automation",
    // "/services/aiot-app-development", "/services/devops-cloud", "/services/cloud-migration",
    // "/services/devops-automation", "/services/ci-cd-pipeline", "/services/cloud-management",
    // "/services/containerization", "/services/server-security-optimization",
    // "/services/degital-marketing", "/services/seo-services", "/services/paid-marketing",
    // "/services/online-reputation-management", "/services/app-marketing", "/services/content-marketing",
    // "/services/social-media-marketing",

    // Industries (from industriestabs - corrected URLs)
    // '/industries', '/industries/healthcare', '/industries/education',
    // '/industries/real-estate', '/industries/travel', '/industries/restaurant',
    // '/industries/fitness', '/industries/retail', '/industries/logistics',
    // '/industries/entertainment', '/industries/social-media', '/industries/fintech',
    // '/industries/automotive', '/industries/construction', '/industries/manufacturing',
    // '/industries/sports',

    // Solutions (from solutionsArray - using staticRoutes URLs)
    // '/solutions', '/solutions/grocery-delivery-app-development',
    // '/solutions/pickup-and-delivery-service-app-development', '/solutions/taxi-app-development-services',
    // '/solutions/fitness-trainer-app-development', '/solutions/on-demand-home-service-app-development',
    // '/solutions/salon-app-development', '/solutions/ice-cream-delivery-app-development',
    // '/solutions/laundry-app-development', '/solutions/restaurant-app-development-company',
    // '/solutions/pet-care-app-development', '/solutions/ride-sharing-app-development',
    // '/solutions/tutor-app-development', '/solutions/mechanic-app-development',
    // '/solutions/car-wash-app-development', '/solutions/marketplace-app-development',
    // '/solutions/subscription-platform-development', '/solutions/b2b-ecommerce-development',
    // '/solutions/saas-product-development', '/solutions/crm-software-development',
    // '/solutions/erp-software-development', '/solutions/online-booking-system-development',
    // '/solutions/loyalty-membership-platform-development', '/solutions/hr-software-development',
    // '/solutions/inventory-management-software-development', '/solutions/ai-ml-development',
    // '/solutions/chatbot-development', '/solutions/iot-app-development', '/solutions/blockchain-development',
    // '/solutions/cloud-devops-services', '/solutions/ar-vr-app-development',
    // '/solutions/food-delivery-app-development', '/solutions/dating-app-development-company',
    // '/solutions/astrology-app-development', '/solutions/legal-app-development',

    // Clone apps (from solutionsArray)
    // '/solutions/amazon-clone-app-development', '/solutions/zomato-clone-app-development',
    // '/solutions/uber-clone-app-development', '/solutions/naukri-clone-app-development',
    // '/solutions/udemy-clone-app-development', '/solutions/oyo-clone-app-development',
    // '/solutions/bigbasket-clone-app-development', '/solutions/urban-company-clone-app-development',
    // '/solutions/tinder-clone-app-development', '/solutions/instagram-clone-app-development',
    // '/solutions/quora-clone-app-development', '/solutions/soundcloud-clone-app-development',
    // '/solutions/spotify-clone-app-development', '/solutions/ghost-lens-clone-app-development',
    // '/solutions/olx-clone-app-development',

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
