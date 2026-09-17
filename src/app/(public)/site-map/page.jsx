// // src/app/(public)/site-map/page.jsx - FINAL COLORFUL VERSION
// import { prisma } from '@/lib/prisma';
// import Link from 'next/link';

// export const dynamic = 'force-dynamic';

// export const metadata = {
//   title: "Site Map | Softkingo - Complete Website Navigation",
//   description: "Complete site map of Softkingo website. Find all pages, services, portfolio, blog posts, and resources in one place.",
//   alternates: { canonical: "/site-map" }
// };

// export default async function SiteMapPage() {
//   const baseUrl = process.env.NEXTAUTH_URL || 'https://www.softkingo.com';

//   // Fetch ALL data
//   const posts = await prisma.blogPost.findMany({
//     where: { status: 'published' },
//     select: { slug: true, updatedAt: true, publishedAt: true, type: true }
//   });

//   const categories = await prisma.blogCategory.findMany({
//     select: { slug: true, updatedAt: true }
//   });

//   const caseStudies = await prisma.caseStudy.findMany({
//     select: { slug: true, updatedAt: true }
//   });

//   const ebooks = await prisma.ebook.findMany({
//     where: { status: 'published' },
//     select: { slug: true, updatedAt: true }
//   });

//   const pages = await prisma.page.findMany({
//     where: { status: 'published' },
//     select: { slug: true, updatedAt: true, type: true }
//   });

//   // Static pages

//   const staticPages = [
//     // Main pages
//     "", "/about", "/services", "/case-studies", "/blog", "/blog/category",
//     "/careers", "/contact", "/ebooks", "/featured", "/gallery", "/hire",
//     "/insights", "/portfolio",

//     // Hire pages (from HireMenuItems)
//     // "/hire/app-developers", "/hire/android-developers", "/hire/ios-developers",
//     // "/hire/iphone-app-developers", "/hire/ipad-developers", "/hire/flutter-developers",
//     // "/hire/react-native-developers", "/hire/frontend-developers", "/hire/angular-developers",
//     // "/hire/reactjs-developers", "/hire/vuejs-developers", "/hire/web-app-developers",
//     // "/hire/backend-developers", "/hire/java-developers", "/hire/nodejs-developers",
//     // "/hire/python-developers", "/hire/php-developers", "/hire/laravel-developers",
//     // "/hire/Django-developers", "/hire/full-stack-developers", "/hire/mern-developers",
//     // "/hire/mean-developers", "/hire/laravel-vue-developers", "/hire/react-node-developers",
//     // "/hire/ecommerce-developers", "/hire/magento-developers", "/hire/wordpress-developers",
//     // "/hire/woocommerce-developers", "/hire/shopify-developers", "/hire/dedicated-developers",
//     // "/hire/solution-architects", "/hire/devops-engineers", "/hire/qa-testers",
//     // "/hire/ml-engineers", "/hire/software-developers", "/hire/ui-ux-designers",

//     // Services pages (from servicesData)
//     // "/services/mobile-app-development", "/services/android-app-development", "/services/ios-app-development",
//     // "/services/hybrid-app-development", "/services/react-native-app-development",
//     // "/services/flutter-mobile-app-development", "/services/app-ui-ux-design",
//     // "/services/web-development", "/services/custom-website-development", "/services/cms-development",
//     // "/services/web-application-development", "/services/enterprise-web-development",
//     // "/services/website-redesign", "/services/website-maintenance", "/services/ecommerce-development",
//     // "/services/shopify-development", "/services/woocommerce-development", "/services/magento-development",
//     // "/services/custom-ecommerce-development", "/services/multivendor-ecommerce-development",
//     // "/services/ecommerce-app-development", "/services/blockchain-development",
//     // "/services/crypto-wallet-development", "/services/smart-contract-development",
//     // "/services/nft-marketplace-development", "/services/dapp-development", "/services/defi-development",
//     // "/services/token-development", "/services/ai-ml", "/services/ai-development",
//     // "/services/machine-learning-development", "/services/chatbot-development", "/services/predictive-analytics",
//     // "/services/computer-vision", "/services/recommendation-engine-development",
//     // "/services/iot-embedded", "/services/iot-app-development", "/services/embedded-software-development",
//     // "/services/iiot", "/services/device-integration", "/services/home-automation",
//     // "/services/aiot-app-development", "/services/devops-cloud", "/services/cloud-migration",
//     // "/services/devops-automation", "/services/ci-cd-pipeline", "/services/cloud-management",
//     // "/services/containerization", "/services/server-security-optimization",
//     // "/services/degital-marketing", "/services/seo-services", "/services/paid-marketing",
//     // "/services/online-reputation-management", "/services/app-marketing", "/services/content-marketing",
//     // "/services/social-media-marketing",

//     // Industries (from industriestabs - corrected URLs)
//     '/industries', '/industries/healthcare', '/industries/education',
//     '/industries/real-estate', '/industries/travel', '/industries/restaurant',
//     '/industries/fitness', '/industries/retail', '/industries/logistics',
//     '/industries/entertainment', '/industries/social-media', '/industries/fintech',
//     '/industries/automotive', '/industries/construction', '/industries/manufacturing',
//     '/industries/sports',

//     // Solutions (from solutionsArray - using staticRoutes URLs)
//     '/solutions', '/solutions/grocery-delivery-app-development',
//     '/solutions/pickup-and-delivery-service-app-development', '/solutions/taxi-app-development-services',
//     '/solutions/fitness-trainer-app-development', '/solutions/on-demand-home-service-app-development',
//     '/solutions/salon-app-development', '/solutions/ice-cream-delivery-app-development',
//     '/solutions/laundry-app-development', '/solutions/restaurant-app-development-company',
//     '/solutions/pet-care-app-development', '/solutions/ride-sharing-app-development',
//     '/solutions/tutor-app-development', '/solutions/mechanic-app-development',
//     '/solutions/car-wash-app-development', '/solutions/marketplace-app-development',
//     '/solutions/subscription-platform-development', '/solutions/b2b-ecommerce-development',
//     '/solutions/saas-product-development', '/solutions/crm-software-development',
//     '/solutions/erp-software-development', '/solutions/online-booking-system-development',
//     '/solutions/loyalty-membership-platform-development', '/solutions/hr-software-development',
//     '/solutions/inventory-management-software-development', '/solutions/ai-ml-development',
//     '/solutions/chatbot-development', '/solutions/iot-app-development', '/solutions/blockchain-development',
//     '/solutions/cloud-devops-services', '/solutions/ar-vr-app-development',
//     '/solutions/food-delivery-app-development', '/solutions/dating-app-development-company',
//     '/solutions/astrology-app-development', '/solutions/legal-app-development',

//     // Clone apps (from solutionsArray)
//     '/solutions/amazon-clone-app-development', '/solutions/zomato-clone-app-development',
//     '/solutions/uber-clone-app-development', '/solutions/naukri-clone-app-development',
//     '/solutions/udemy-clone-app-development', '/solutions/oyo-clone-app-development',
//     '/solutions/bigbasket-clone-app-development', '/solutions/urban-company-clone-app-development',
//     '/solutions/tinder-clone-app-development', '/solutions/instagram-clone-app-development',
//     '/solutions/quora-clone-app-development', '/solutions/soundcloud-clone-app-development',
//     '/solutions/spotify-clone-app-development', '/solutions/ghost-lens-clone-app-development',
//     '/solutions/olx-clone-app-development',

//     // Insights (from insightItems)
//     // "/blog", "/featured", "/ebooks", "/press-releases", "/guides",
//     // "/media-coverage", "/articles", "/whitepapers", "/podcasts",

//     // Legal & Misc
//     "/privacy-policy", "/terms-conditions", "/faq", "/site-map", "/ai", "/login"
//   ];

//   const BLOG_TYPE_TO_BASE = {
//     blog: '/blog', featured: '/featured', 'press-release': '/press-releases',
//     media: '/media-coverage', article: '/articles', whitepaper: '/whitepapers',
//     podcast: '/podcasts', guide: '/guides'
//   };

//   const PAGE_TYPE_TO_BASE = {
//     service: '/services', hire: '/hire', featured: '/featured',
//     solution: '/solutions', guide: '/guides', article: '/articles',
//     whitepaper: '/whitepapers', podcast: '/podcasts',
//     'press-release': '/press-releases', media: '/media-coverage'
//   };

//   // Generate ALL routes
//   const staticRoutes = staticPages.map(path => ({
//     url: `${baseUrl}${path}`, lastModified: new Date(),
//     changeFrequency: 'weekly', priority: path === '' ? 1 : 0.8
//   }));

//   // ✅ ALL BLOG POSTS - NO SLICING
//   const blogRoutes = posts.filter(p => p.slug && BLOG_TYPE_TO_BASE[p.type]).map(p => ({
//     url: `${baseUrl}${BLOG_TYPE_TO_BASE[p.type]}/${p.slug}`,
//     lastModified: p.updatedAt ?? p.publishedAt ?? new Date(),
//     changeFrequency: 'weekly', priority: p.type === 'featured' ? 0.8 : 0.7, type: p.type
//   }));

//   // Group blog posts by type
//   const groupedBlogs = blogRoutes.reduce((acc, post) => {
//     const type = post.type || 'blog';
//     acc[type] = acc[type] || [];
//     acc[type].push(post);
//     return acc;
//   }, {});

//   const categoryRoutes = categories.filter(c => c.slug).map(c => ({
//     url: `${baseUrl}/blog/category/${c.slug}`,
//     lastModified: c.updatedAt ?? new Date(),
//     changeFrequency: 'weekly', priority: 0.5
//   }));

//   const caseStudyRoutes = caseStudies.filter(c => c.slug).map(c => ({
//     url: `${baseUrl}/case-studies/${c.slug}`,
//     lastModified: c.updatedAt ?? new Date(),
//     changeFrequency: 'monthly', priority: 0.7
//   }));

//   const ebookRoutes = ebooks.filter(g => g.slug).map(g => ({
//     url: `${baseUrl}/ebooks/${g.slug}`,
//     lastModified: g.updatedAt ?? new Date(),
//     changeFrequency: 'monthly', priority: 0.6
//   }));

//   const pageRoutes = pages.filter(p => p.slug && PAGE_TYPE_TO_BASE[p.type]).map(p => ({
//     url: `${baseUrl}${PAGE_TYPE_TO_BASE[p.type]}/${p.slug}`,
//     lastModified: p.updatedAt ?? new Date(),
//     changeFrequency: 'monthly', priority: 0.65
//   }));

//   const allRoutes = [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...caseStudyRoutes, ...ebookRoutes, ...pageRoutes];

//   return (
//     <>
//       {/* HERO */}
//       <section className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
//         style={{ backgroundImage: "url('/images/sitemap-hero.jpg')" }}
//       >

//         {/* Enhanced background effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-slate-950/90" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
//         <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />


//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
//         <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />

//         <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
//           <div className="w-full">
//             <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
//               <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
//               <span>›</span>
//               <span className="text-cyan-400 font-medium">Site Map</span>
//             </nav>
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
//               Complete Site Map
//             </h1>
//             <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90 mb-6">
//               Auto-generated from live database. {allRoutes.length} total pages indexed.
//             </p>
//             <a href="/sitemap.xml" className="flex items-center gap-2 bg-sky-600/90 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover-lift w-fit">
//               Download XML Sitemap →
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* COLORFUL CARDS - NO HIDDEN PAGES */}
//       <div className="max-w-7xl mx-auto px-6 py-20">

//         {/* ROW 1 */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">

//           {/* STATIC PAGES - SKY BLUE - ALL 68 PAGES */}
//           <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-2xl p-6 border border-sky-200 hover:border-sky-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-sky-900 mb-4 border-b-2 border-sky-200 pb-3">
//               Static Pages ({staticRoutes.length})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {staticRoutes.map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-sky-900 transition-all truncate border-l-3 border-transparent hover:border-sky-400 pl-3 hover:shadow-sm"
//                 >
//                   {route.url.replace(baseUrl, '') || 'Home'}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* CASE STUDIES - PURPLE */}
//           <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200 hover:border-purple-300 transition-all shadow-sm hover:shadow-md lg:col-span-2">
//             <h2 className="text-xl font-bold text-purple-900 mb-4 border-b-2 border-purple-200 pb-3">
//               Case Studies ({caseStudyRoutes.length})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {caseStudyRoutes.map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-purple-900 transition-all truncate border-l-3 border-transparent hover:border-purple-400 pl-3 hover:shadow-sm"
//                 >
//                   case-studies/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ROW 2 - ALL BLOG TYPES - ALL PAGES SHOWN */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

//           {/* REGULAR BLOGS - EMERALD - ALL PAGES */}
//           <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md col-span-2">
//             <h2 className="text-xl font-bold text-emerald-900 mb-4 border-b-2 border-emerald-200 pb-3">
//               Blog Posts ({groupedBlogs.blog?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs.blog || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-emerald-900 transition-all truncate border-l-3 border-transparent hover:border-emerald-400 pl-3 hover:shadow-sm"
//                 >
//                   blog/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>



//           {/* CATEGORIES - TEAL - ALL PAGES */}
//           <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-6 border border-teal-200 hover:border-teal-300 transition-all shadow-sm hover:shadow-md lg:col-span-2  hidden">
//             <h2 className="text-xl font-bold text-teal-900 mb-4 border-b-2 border-teal-200 pb-3">
//               Blog Categories ({categoryRoutes.length})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {categoryRoutes.map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-teal-900 transition-all truncate border-l-3 border-transparent hover:border-teal-400 pl-3 hover:shadow-sm"
//                 >
//                   blog/category/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* E-BOOKS - AMBER - ALL PAGES */}
//           <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border border-amber-200 hover:border-amber-300 transition-all shadow-sm hover:shadow-md ">
//             <h2 className="text-xl font-bold text-amber-900 mb-4 border-b-2 border-amber-200 pb-3">
//               E-books ({ebookRoutes.length})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {ebookRoutes.map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-amber-900 transition-all truncate border-l-3 border-transparent hover:border-amber-400 pl-3 hover:shadow-sm"
//                 >
//                   ebooks/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>


//         </div>

//         {/* ROW 3 - ALL PAGES */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 hidden">
//           {/* ARTICLES - BLUE - ALL PAGES */}
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-3">
//               Articles ({groupedBlogs.article?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs.article || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-blue-900 transition-all truncate border-l-3 border-transparent hover:border-blue-400 pl-3 hover:shadow-sm"
//                 >
//                   articles/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           {/* GUIDES - ORANGE - ALL PAGES */}
//           <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200 hover:border-orange-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-orange-900 mb-4 border-b-2 border-orange-200 pb-3">
//               Guides ({groupedBlogs.guide?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs.guide || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-orange-900 transition-all truncate border-l-3 border-transparent hover:border-orange-400 pl-3 hover:shadow-sm"
//                 >
//                   guides/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* PRESS RELEASES - ROSE - ALL PAGES */}
//           <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl p-6 border border-rose-200 hover:border-rose-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-rose-900 mb-4 border-b-2 border-rose-200 pb-3">
//               Press Releases ({groupedBlogs['press-release']?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs['press-release'] || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-rose-900 transition-all truncate border-l-3 border-transparent hover:border-rose-400 pl-3 hover:shadow-sm"
//                 >
//                   press-releases/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* MEDIA COVERAGE - CYAN - ALL PAGES */}
//           <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl p-6 border border-cyan-200 hover:border-cyan-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-cyan-900 mb-4 border-b-2 border-cyan-200 pb-3">
//               Media Coverage ({groupedBlogs.media?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs.media || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-cyan-900 transition-all truncate border-l-3 border-transparent hover:border-cyan-400 pl-3 hover:shadow-sm"
//                 >
//                   media-coverage/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* PODCASTS - INDIGO - ALL PAGES */}
//           <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md lg:col-span-1">
//             <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-200 pb-3">
//               Podcasts ({groupedBlogs.podcast?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs.podcast || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-indigo-900 transition-all truncate border-l-3 border-transparent hover:border-indigo-400 pl-3 hover:shadow-sm"
//                 >
//                   podcasts/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* WHITEPAPERS - VIOLET - ALL PAGES */}
//           <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl p-6 border border-violet-200 hover:border-violet-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-violet-900 mb-4 border-b-2 border-violet-200 pb-3">
//               Whitepapers ({groupedBlogs.whitepaper?.length || 0})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {(groupedBlogs.whitepaper || []).map((route, idx) => (
//                 <Link key={idx} href={route.url.replace(baseUrl, '')}
//                   className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-violet-900 transition-all truncate border-l-3 border-transparent hover:border-violet-400 pl-3 hover:shadow-sm"
//                 >
//                   whitepapers/{route.url.split('/').pop()}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>


//         {/* ROW 5 - INDUSTRIES + SOLUTIONS - ALL PAGES */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

//           {/* INDUSTRIES - LIME */}
//           <div className="bg-gradient-to-br from-lime-50 to-lime-100/50 rounded-2xl p-6 border border-lime-200 hover:border-lime-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-lime-900 mb-4 border-b-2 border-lime-200 pb-3">
//               Industries ({staticPages.filter(p => p.startsWith('/industries')).length})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {staticPages.filter(p => p.startsWith('/industries')).map((path, idx) => (
//                 <Link key={idx} href={path} className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-lime-900 transition-all truncate border-l-3 border-transparent hover:border-lime-400 pl-3 hover:shadow-sm">
//                   {path.replace('/industries/', '') || 'industries'}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* SOLUTIONS - FUCHSIA */}
//           <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 rounded-2xl p-6 border border-fuchsia-200 hover:border-fuchsia-300 transition-all shadow-sm hover:shadow-md">
//             <h2 className="text-xl font-bold text-fuchsia-900 mb-4 border-b-2 border-fuchsia-200 pb-3">
//               Solutions ({staticPages.filter(p => p.startsWith('/solutions')).length})
//             </h2>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
//               {staticPages.filter(p => p.startsWith('/solutions')).map((path, idx) => (
//                 <Link key={idx} href={path} className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-fuchsia-900 transition-all truncate border-l-3 border-transparent hover:border-fuchsia-400 pl-3 hover:shadow-sm">
//                   {path.replace('/solutions/', '')}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* TOTAL STATS - GRADIENT */}
//           <div className="lg:col-span-1 bg-gradient-to-br from-sky-600 via-emerald-600 to-sky-700 rounded-2xl p-8 border-2 border-white/20 text-white text-center transition-all hover:shadow-xl shadow-lg">
//             <h2 className="text-2xl font-black mb-6 border-b-2 border-white/30 pb-4">
//               Total Pages
//             </h2>
//             <div className="text-6xl font-black mb-6 bg-white/20 backdrop-blur-sm rounded-xl py-4">
//               {allRoutes.length}
//             </div>
//             <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
//               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
//                 <div className="text-2xl font-bold">{staticRoutes.length}</div>
//                 <div className="text-xs opacity-90">Static</div>
//               </div>
//               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
//                 <div className="text-2xl font-bold">{blogRoutes.length}</div>
//                 <div className="text-xs opacity-90">Blogs</div>
//               </div>
//             </div>
//             <a href="/sitemap.xml" className="w-full bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl transition-all border-2 border-white/30 hover:border-white/50 hover-lift block">
//               Download XML
//             </a>
//           </div>
//         </div>

//         {/* FOOTER */}
//         {/* <div className="text-center pt-16 border-t-2 border-sky-100 bg-gradient-to-r from-sky-50/50 to-emerald-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
//           <p className="text-lg font-semibold text-gray-800 mb-2">
//              Auto-generated from Live Database
//           </p>
//           <p className="text-sm text-gray-600">
//             Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
//           </p>
//         </div> */}
//       </div>

//       <style>{`
//         .hover-lift { transition: all 0.3s ease; }
//         .hover-lift:hover { transform: translateY(-2px); }
//         ::-webkit-scrollbar { width: 5px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { 
//           background: rgba(56, 189, 248, 0.4); 
//           border-radius: 3px; 
//         }
//       `}</style>
//     </>
//   );
// }

















































// src/app/(public)/site-map/page.jsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  FileText, Briefcase, Layers, Users, Globe, BookOpen,
  LayoutGrid, Code, Monitor, Smartphone, Database, Zap
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SiteMapPage() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://www.softkingo.com';

  // 1. FETCH DYNAMIC DATA
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { title: true, slug: true, type: true }
  });

  const caseStudies = await prisma.caseStudy.findMany({
    select: { title: true, slug: true }
  });

  const ebooks = await prisma.ebook.findMany({
    where: { status: 'published' },
    select: { title: true, slug: true }
  });

const pages = await prisma.page.findMany({
  where: {
    status: "published",
    type: "service",
  },
  select: {
    title: true,
    slug: true,
  },
});

console.log("Pages:", pages);

const servicePages = pages.map((page) => ({
  url: `/services/${page.slug}`,
  title: page.title,
}));


const industry_pages = await prisma.page.findMany({
  where: {
    status: "published",
    type: "industry",
  },
  select: {
    title: true,
    slug: true,
  },
});

console.log("Industry Pages:", industry_pages);

const industryPages = industry_pages.map((page) => ({
  url: `/industries/${page.slug}`,
  title: page.title,
}));

console.log("Industry Pages 2:", industry_pages);


const solution_pages = await prisma.page.findMany({
  where: {
    status: "published",
    type: "solution",
  },
  select: {
    title: true,
    slug: true,
  },
});

const solutionPages = solution_pages.map((page) => ({
  url: `/solutions/${page.slug}`,
  title: page.title,
}));


// sirf "services" match karne ke liye keyword-based filter (DB driven)
const matchedPages = pages
  .filter((p) => p.slug?.includes("service") || p.title)
  .map((p) => ({
    title: p.title,
    slug: p.slug,
    url: `/services/${p.slug}`,
  }));

  // 2. STATIC & CONFIG DATA
  const staticPages = [
    { url: "", title: "Home" },
    { url: "/about", title: "About Us" },
    { url: "/contact", title: "Contact Us" },
    { url: "/careers", title: "Careers" },
    { url: "/gallery", title: "Gallery" },
    { url: "/privacy-policy", title: "Privacy Policy" },
    { url: "/terms-conditions", title: "Terms & Conditions" },
    { url: "/faq", title: "FAQ" },
  ];

  const hirePages = [
    { url: '/hire/iphone-app-developers', title: "Hire iPhone Developers" },
    { url: '/hire/android-developers', title: "Hire Android Developers" },
    { url: '/hire/swift-developers', title: "Hire Swift Developers" },
    { url: '/hire/ai-developers', title: "Hire AI Developers" },
    { url: '/hire/ui-ux-developers', title: "Hire UI/UX Designers" },
    { url: '/hire/on-demand-developers', title: "Hire On-Demand Team" },
    { url: '/hire/php-developers', title: "Hire PHP Developers" },
    { url: '/hire/nodejs-developers', title: "Hire Node.js Developers" },
    { url: '/hire/react-native-developers', title: "Hire React Native Devs" },
  ];

  // const servicePages = [
  //   { url: "/services/software-development", title: "Software Development" },
  //   { url: "/services/mobile-app-development", title: "Mobile App Development" },
  //   { url: "/services/web-application-development", title: "Web App Development" },
  //   { url: "/services/ios-app-development", title: "iOS App Development" },
  //   { url: "/services/android-app-development", title: "Android App Development" },
  //   { url: "/services/mobile-app-design", title: "UI/UX Design" },
  //   { url: "/services/digital-marketing", title: "Digital Marketing" },
  //   { url: "/services/seo", title: "SEO Services" },
  //   { url: "/services/custom-database-development", title: "Database Development" },
  //   { url: "/services/iot-app-development", title: "IoT Solutions" },
  //   { url: "/services/machine-learning-development", title: "AI/ML Development" },
  //   { url: "/services/amazon-cloud", title: "Cloud Services (AWS)" },
  // ];

  // const industryPages = [
  //   { url: "/industries/healthcare", title: "Healthcare" },
  //   { url: "/industries/education", title: "Education & E-Learning" },
  //   { url: "/industries/real-estate", title: "Real Estate" },
  //   { url: "/industries/travel", title: "Travel & Hospitality" },
  //   { url: "/industries/food-delivery", title: "Food & Restaurant" },
  //   { url: "/industries/fitness", title: "Fitness & Wellness" },
  //   { url: "/industries/ecommerce", title: "Retail & E-Commerce" },
  //   { url: "/industries/logistics", title: "Logistics" },
  //   { url: "/industries/fintech", title: "Banking & FinTech" },
  //   { url: "/industries/automotive", title: "Automotive" },
  //   { url: "/industries/construction", title: "Construction" },
  //   { url: "/industries/manufacturing", title: "Manufacturing" },
  //   { url: "/industries/event-management", title: "Event Management" },
  //   { url: "/industries/social-media", title: "Social Networking" },
  //   { url: "/industries/media-entertainment", title: "Media & Entertainment" },
  // ];

  // const solutionPages = [
  //   { url: '/solutions/grocery-delivery-app-development', title: "Grocery Delivery Solution" },
  //   { url: '/solutions/food-delivery-app-development', title: "Food Delivery Solution" },
  //   { url: '/solutions/taxi-booking-app-development', title: "Taxi Booking Solution" },
  //   { url: '/solutions/dating-app-development', title: "Dating App Solution" },
  //   { url: '/solutions/learning-management-system-development', title: "LMS Solution" },
  //   { url: '/solutions/hrms-software-development', title: "HRMS Solution" },
  //   { url: '/solutions/ecommerce-app-development', title: "E-Commerce App" },
  //   { url: '/solutions/realestate-app-development', title: "Real Estate App" },
  //   { url: '/solutions/uber-clone-app-development', title: "Uber Clone" },
  //   { url: '/solutions/zomato-clone-app-development', title: "Zomato Clone" },
  //   { url: '/solutions/amazon-clone-app-development', title: "Amazon Clone" },
  //   { url: '/solutions/tinder-clone-app-development', title: "Tinder Clone" },
  //   { url: '/solutions/instagram-clone-app-development', title: "Instagram Clone" },
  //   { url: '/solutions/naukri-clone-app-development', title: "Naukri Clone" },
  //   { url: '/solutions/olx-clone-app-development', title: "OLX Clone" },
  // ];

  // 3. PROCESS DYNAMIC DATA
  const blogList = posts.map(p => ({ url: `/blog/${p.slug}`, title: p.title, type: p.type }));
  const caseStudyList = caseStudies.map(c => ({ url: `/case-studies/${c.slug}`, title: c.title }));
  const ebookList = ebooks.map(g => ({ url: `/ebooks/${g.slug}`, title: g.title }));

  // Group Insights (Blog + Guides + Articles etc)
  // Mapping your section keys to readable titles
  const insightTypes = {
    'blog': 'Blog Posts',
    'featured': 'Featured Stories',
    'press-release': 'Press Releases',
    'media-coverage': 'Media Coverage',
    'articles': 'Articles',
    'whitepapers': 'Whitepapers',
    'podcasts': 'Podcasts',
    'guides': 'Product Guides'
  };

  const insightsGrouped = blogList.reduce((acc, item) => {
    const typeKey = item.type || 'blog';
    if (!acc[typeKey]) acc[typeKey] = [];
    acc[typeKey].push(item);
    return acc;
  }, {});

  const totalCount = staticPages.length + servicePages.length + industryPages.length +
    solutionPages.length + hirePages.length + blogList.length +
    caseStudyList.length + ebookList.length;

  return (
    <>
      {/* HERO */}
      <section className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
        style={{ backgroundImage: "url('/images/sitemap-hero.jpg')" }}
      >

        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />


        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="w-full">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <span>›</span>
              <span className="text-cyan-400 font-medium">Site Map</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Complete Site Map
            </h1>
            <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90 mb-6">
              Auto-generated from live database. {totalCount} total pages indexed.
            </p>
            <a href="/sitemap.xml" className="flex items-center gap-2 bg-sky-600/90 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover-lift w-fit">
              Download XML Sitemap →
            </a>
          </div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* 1. STATIC PAGES */}
          <div className='col-span-2'>
            <SitemapSection
              title="Company & Core Pages"
              count={staticPages.length}
              items={staticPages}
              icon={<Globe size={24} />}
              color="sky"
              fullWidth
            />
          </div>
          {/* 2. CASE STUDIES */}
          <SitemapSection
            title="Case Studies"
            count={caseStudyList.length}
            items={caseStudyList}
            icon={<Briefcase size={24} />}
            color="purple"
            
          />
        </div>

        {/* 3. INSIGHTS & RESOURCES (Blog, Guides, etc) */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <BookOpen className="text-emerald-500" size={28} /> Insights & Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* E-books */}
            {ebookList.length > 0 && (
              <MiniSection title="E-books" items={ebookList} color="emerald" />
            )}
            {/* Dynamic Blog Categories */}
            {Object.entries(insightsGrouped).map(([type, items]) => (
              <MiniSection
                key={type}
                title={insightTypes[type] || type}
                items={items}
                color="emerald"
              />
            ))}
          </div>
        </div>

        {/* 4. HIRE & SERVICES ROW */}
        <div className="grid md:grid-cols-2 gap-10">
          <SitemapSection
            title="Hire Developers"
            count={hirePages.length}
            items={hirePages}
            icon={<Users size={24} />}
            color="amber"
          />
          <SitemapSection
            title="Our Services"
            count={servicePages.length}
            items={servicePages}
            icon={<Layers size={24} />}
            color="blue"
          />
        </div>

        {/* 5. SOLUTIONS & INDUSTRIES ROW */}
        <div className="grid md:grid-cols-2 gap-10">
          <SitemapSection
            title="Solutions & Clones"
            count={solutionPages.length}
            items={solutionPages}
            icon={<Smartphone size={24} />}
            color="violet"
          />
          <SitemapSection
            title="Industries We Serve"
            count={industryPages.length}
            items={industryPages}
            icon={<LayoutGrid size={24} />}
            color="rose"
          />
        </div>

        {/* 6. TOTAL STATS CARD (Premium) */}

      </div>
    </>
  );
}

// REUSABLE COMPONENTS

function SitemapSection({ title, count, items, icon, color, fullWidth }) {
  const theme = {
    sky: "bg-sky-50/50 border-sky-100 text-sky-900 hover:border-sky-300",
    purple: "bg-purple-50/50 border-purple-100 text-purple-900 hover:border-purple-300",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:border-emerald-300",
    blue: "bg-blue-50/50 border-blue-100 text-blue-900 hover:border-blue-300",
    violet: "bg-violet-50/50 border-violet-100 text-violet-900 hover:border-violet-300",
    amber: "bg-amber-50/50 border-amber-100 text-amber-900 hover:border-amber-300",
    rose: "bg-rose-50/50 border-rose-100 text-rose-900 hover:border-rose-300",
  }[color];

  const linkTheme = {
    sky: "hover:text-sky-600",
    purple: "hover:text-purple-600",
    emerald: "hover:text-emerald-600",
    blue: "hover:text-blue-600",
    violet: "hover:text-violet-600",
    amber: "hover:text-amber-600",
    rose: "hover:text-rose-600",
  }[color];

  return (
    <div className={`rounded-3xl p-8  ${theme} transition-all duration-300 shadow-md hover:shadow-lg h-full`}>
      <div className="flex items-center gap-4 mb-6 border-b border-black/5 pb-4">
        <div className="p-3 bg-white rounded-xl shadow-sm text-current">{icon}</div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-xs font-semibold opacity-60 uppercase tracking-wider">{count} Pages</span>
        </div>
      </div>

      <div className={`grid gap-x-6 gap-y-2 ${fullWidth ? 'sm:grid-cols-2 md:grid-cols-2' : 'sm:grid-cols-1 max-h-60 overflow-y-scroll over'}`}>
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.url}
            className={`text-sm font-medium text-slate-600 ${linkTheme} py-1.5 truncate block transition-colors flex items-center gap-2       rounded-lg hover:bg-white/70 hover:text-blue-900 border-l-3 border-transparent hover:border-${theme} pl-3 hover:shadow-sm`}
            title={item.title}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" /> {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MiniSection({ title, items, color }) {
  const linkTheme = "hover:text-emerald-600";

  return (
    <div className="bg-white borderborder-slate-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all   overflow-hidden">
      <h3 className="font-bold text-emerald-800 mb-4 flex justify-between items-center">
        {title}
        <span className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-500">{items.length}</span>
      </h3>
      <div className="space-y-2 max-h-60 overflow-scroll  pr-2 custom-scrollbar  break-word    ">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.url}
            className={`block text-sm text-slate-600 ${linkTheme} truncate        rounded-lg hover:bg-white/70 hover:text-blue-900 border-l-3 border-transparent hover:border-emerald-500 pl-3 hover:shadow-sm py-2`}
            title={item.title}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}