// src/app/(public)/site-map/page.jsx - FINAL COLORFUL VERSION
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SiteMapPage() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://www.softkingo.com';

  // Fetch ALL data
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true, publishedAt: true, type: true }
  });

  const categories = await prisma.blogCategory.findMany({
    select: { slug: true, updatedAt: true }
  });

  const caseStudies = await prisma.caseStudy.findMany({
    select: { slug: true, updatedAt: true }
  });

  const eGuides = await prisma.eGuide.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true }
  });

  const pages = await prisma.page.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true, type: true }
  });

  // Static pages
  const staticPages = [
    '', '/about', '/services', '/portfolio', '/case-studies', '/blog', '/blog/category',
    '/careers', '/contact', '/hire', '/insights', '/gallery', '/e-guides', '/featured',
    '/industries',
    '/industries/healthcare-app-development', '/industries/elearning-app-development',
    '/industries/real-estate-app-development', '/industries/travel-app-development',
    '/industries/food-delivery-app-development', '/industries/fitness-app-development',
    '/industries/logistics-app-development', '/industries/social-media-app-development',
    '/industries/fintech-software-development', '/industries/automotive-app-development',
    '/industries/construction-management-software-development', '/industries/manufacturing-app-development',
    '/industries/event-management-software-development',
    '/solutions/grocery-delivery-app-development', '/solutions/pickup-and-delivery-service-app-development',
    '/solutions/taxi-app-development-services', '/solutions/fitness-trainer-app-development',
    '/solutions/on-demand-home-service-app-development', '/solutions/salon-app-development',
    '/solutions/ice-cream-delivery-app-development', '/solutions/laundry-app-development',
    '/solutions/restaurant-app-development-company', '/solutions/dating-app-development-company',
    '/solutions/ride-sharing-app-development', '/solutions/tutor-app-development',
    '/solutions/mechanic-app-development', '/solutions/car-wash-app-development',
    '/solutions/marketplace-app-development', '/solutions/subscription-platform-development',
    '/solutions/multivendor-ecommerce-development', '/solutions/saas-product-development',
    '/solutions/crm-software-development', '/solutions/erp-software-development',
    '/solutions/online-booking-system-development', '/solutions/loyalty-membership-platform',
    '/solutions/hr-software-development', '/solutions/inventory-management-software',
    '/solutions/ai-ml-development', '/solutions/chatbot-development',
    '/solutions/iot-app-development', '/solutions/blockchain-development',
    '/solutions/cloud-devops-services', '/solutions/ar-vr-app-development',
    '/privacy-policy', '/terms-conditions', '/faq', '/site-map',
    '/articles', '/guides', '/media-coverage', '/podcasts', '/press-releases', '/whitepapers'
  ];

  const BLOG_TYPE_TO_BASE = {
    blog: '/blog', featured: '/featured', 'press-release': '/press-releases',
    media: '/media-coverage', article: '/articles', whitepaper: '/whitepapers',
    podcast: '/podcasts', guide: '/guides'
  };

  const PAGE_TYPE_TO_BASE = {
    service: '/services', hire: '/hire', featured: '/featured',
    solution: '/solutions', guide: '/guides', article: '/articles',
    whitepaper: '/whitepapers', podcast: '/podcasts',
    'press-release': '/press-releases', media: '/media-coverage'
  };

  // Generate ALL routes
  const staticRoutes = staticPages.map(path => ({
    url: `${baseUrl}${path}`, lastModified: new Date(),
    changeFrequency: 'weekly', priority: path === '' ? 1 : 0.8
  }));

  // ✅ ALL BLOG POSTS - NO SLICING
  const blogRoutes = posts.filter(p => p.slug && BLOG_TYPE_TO_BASE[p.type]).map(p => ({
    url: `${baseUrl}${BLOG_TYPE_TO_BASE[p.type]}/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt ?? new Date(),
    changeFrequency: 'weekly', priority: p.type === 'featured' ? 0.8 : 0.7, type: p.type
  }));

  // Group blog posts by type
  const groupedBlogs = blogRoutes.reduce((acc, post) => {
    const type = post.type || 'blog';
    acc[type] = acc[type] || [];
    acc[type].push(post);
    return acc;
  }, {});

  const categoryRoutes = categories.filter(c => c.slug).map(c => ({
    url: `${baseUrl}/blog/category/${c.slug}`,
    lastModified: c.updatedAt ?? new Date(),
    changeFrequency: 'weekly', priority: 0.5
  }));

  const caseStudyRoutes = caseStudies.filter(c => c.slug).map(c => ({
    url: `${baseUrl}/case-studies/${c.slug}`,
    lastModified: c.updatedAt ?? new Date(),
    changeFrequency: 'monthly', priority: 0.7
  }));

  const eGuideRoutes = eGuides.filter(g => g.slug).map(g => ({
    url: `${baseUrl}/e-guides/${g.slug}`,
    lastModified: g.updatedAt ?? new Date(),
    changeFrequency: 'monthly', priority: 0.6
  }));

  const pageRoutes = pages.filter(p => p.slug && PAGE_TYPE_TO_BASE[p.type]).map(p => ({
    url: `${baseUrl}${PAGE_TYPE_TO_BASE[p.type]}/${p.slug}`,
    lastModified: p.updatedAt ?? new Date(),
    changeFrequency: 'monthly', priority: 0.65
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...caseStudyRoutes, ...eGuideRoutes, ...pageRoutes];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
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
              Auto-generated from live database. {allRoutes.length} total pages indexed.
            </p>
            <a href="/sitemap.xml" className="flex items-center gap-2 bg-sky-600/90 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover-lift w-fit">
              Download XML Sitemap →
            </a>
          </div>
        </div>
      </section>

      {/* COLORFUL CARDS - NO HIDDEN PAGES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          
          {/* STATIC PAGES - SKY BLUE - ALL 68 PAGES */}
          <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-2xl p-6 border border-sky-200 hover:border-sky-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-sky-900 mb-4 border-b-2 border-sky-200 pb-3">
              Static Pages ({staticRoutes.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {staticRoutes.map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-sky-900 transition-all truncate border-l-3 border-transparent hover:border-sky-400 pl-3 hover:shadow-sm"
                >
                  {route.url.replace(baseUrl, '') || 'Home'}
                </Link>
              ))}
            </div>
          </div>

          {/* CASE STUDIES - PURPLE */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200 hover:border-purple-300 transition-all shadow-sm hover:shadow-md lg:col-span-2">
            <h2 className="text-xl font-bold text-purple-900 mb-4 border-b-2 border-purple-200 pb-3">
              Case Studies ({caseStudyRoutes.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {caseStudyRoutes.map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-purple-900 transition-all truncate border-l-3 border-transparent hover:border-purple-400 pl-3 hover:shadow-sm"
                >
                  case-studies/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2 - ALL BLOG TYPES - ALL PAGES SHOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* REGULAR BLOGS - EMERALD - ALL PAGES */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md col-span-2">
            <h2 className="text-xl font-bold text-emerald-900 mb-4 border-b-2 border-emerald-200 pb-3">
              Blog Posts ({groupedBlogs.blog?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs.blog || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-emerald-900 transition-all truncate border-l-3 border-transparent hover:border-emerald-400 pl-3 hover:shadow-sm"
                >
                  blog/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>

         

          {/* CATEGORIES - TEAL - ALL PAGES */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-6 border border-teal-200 hover:border-teal-300 transition-all shadow-sm hover:shadow-md lg:col-span-2  hidden">
            <h2 className="text-xl font-bold text-teal-900 mb-4 border-b-2 border-teal-200 pb-3">
              Blog Categories ({categoryRoutes.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {categoryRoutes.map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-teal-900 transition-all truncate border-l-3 border-transparent hover:border-teal-400 pl-3 hover:shadow-sm"
                >
                  blog/category/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>

           {/* E-GUIDES - AMBER - ALL PAGES */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border border-amber-200 hover:border-amber-300 transition-all shadow-sm hover:shadow-md ">
            <h2 className="text-xl font-bold text-amber-900 mb-4 border-b-2 border-amber-200 pb-3">
              E-Guides ({eGuideRoutes.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {eGuideRoutes.map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-amber-900 transition-all truncate border-l-3 border-transparent hover:border-amber-400 pl-3 hover:shadow-sm"
                >
                  e-guides/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>


        </div>

        {/* ROW 3 - ALL PAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 hidden">
         {/* ARTICLES - BLUE - ALL PAGES */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-3">
              Articles ({groupedBlogs.article?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs.article || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-blue-900 transition-all truncate border-l-3 border-transparent hover:border-blue-400 pl-3 hover:shadow-sm"
                >
                  articles/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>
           {/* GUIDES - ORANGE - ALL PAGES */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200 hover:border-orange-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-orange-900 mb-4 border-b-2 border-orange-200 pb-3">
              Guides ({groupedBlogs.guide?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs.guide || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-orange-900 transition-all truncate border-l-3 border-transparent hover:border-orange-400 pl-3 hover:shadow-sm"
                >
                  guides/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>

          {/* PRESS RELEASES - ROSE - ALL PAGES */}
          <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl p-6 border border-rose-200 hover:border-rose-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-rose-900 mb-4 border-b-2 border-rose-200 pb-3">
              Press Releases ({groupedBlogs['press-release']?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs['press-release'] || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-rose-900 transition-all truncate border-l-3 border-transparent hover:border-rose-400 pl-3 hover:shadow-sm"
                >
                  press-releases/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>

          {/* MEDIA COVERAGE - CYAN - ALL PAGES */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl p-6 border border-cyan-200 hover:border-cyan-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-cyan-900 mb-4 border-b-2 border-cyan-200 pb-3">
              Media Coverage ({groupedBlogs.media?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs.media || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-cyan-900 transition-all truncate border-l-3 border-transparent hover:border-cyan-400 pl-3 hover:shadow-sm"
                >
                  media-coverage/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>

          {/* PODCASTS - INDIGO - ALL PAGES */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md lg:col-span-1">
            <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-200 pb-3">
              Podcasts ({groupedBlogs.podcast?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs.podcast || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-indigo-900 transition-all truncate border-l-3 border-transparent hover:border-indigo-400 pl-3 hover:shadow-sm"
                >
                  podcasts/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>
            
          {/* WHITEPAPERS - VIOLET - ALL PAGES */}
          <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl p-6 border border-violet-200 hover:border-violet-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-violet-900 mb-4 border-b-2 border-violet-200 pb-3">
              Whitepapers ({groupedBlogs.whitepaper?.length || 0})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {(groupedBlogs.whitepaper || []).map((route, idx) => (
                <Link key={idx} href={route.url.replace(baseUrl, '')}
                  className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-violet-900 transition-all truncate border-l-3 border-transparent hover:border-violet-400 pl-3 hover:shadow-sm"
                >
                  whitepapers/{route.url.split('/').pop()}
                </Link>
              ))}
            </div>
          </div>
        </div>


        {/* ROW 5 - INDUSTRIES + SOLUTIONS - ALL PAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* INDUSTRIES - LIME */}
          <div className="bg-gradient-to-br from-lime-50 to-lime-100/50 rounded-2xl p-6 border border-lime-200 hover:border-lime-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-lime-900 mb-4 border-b-2 border-lime-200 pb-3">
              Industries ({staticPages.filter(p => p.startsWith('/industries')).length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {staticPages.filter(p => p.startsWith('/industries')).map((path, idx) => (
                <Link key={idx} href={path} className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-lime-900 transition-all truncate border-l-3 border-transparent hover:border-lime-400 pl-3 hover:shadow-sm">
                  {path.replace('/industries/', '') || 'industries'}
                </Link>
              ))}
            </div>
          </div>

          {/* SOLUTIONS - FUCHSIA */}
          <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 rounded-2xl p-6 border border-fuchsia-200 hover:border-fuchsia-300 transition-all shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold text-fuchsia-900 mb-4 border-b-2 border-fuchsia-200 pb-3">
              Solutions ({staticPages.filter(p => p.startsWith('/solutions')).length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-sm">
              {staticPages.filter(p => p.startsWith('/solutions')).map((path, idx) => (
                <Link key={idx} href={path} className="block p-2.5 rounded-lg hover:bg-white/70 hover:text-fuchsia-900 transition-all truncate border-l-3 border-transparent hover:border-fuchsia-400 pl-3 hover:shadow-sm">
                  {path.replace('/solutions/', '')}
                </Link>
              ))}
            </div>
          </div>

          {/* TOTAL STATS - GRADIENT */}
          <div className="lg:col-span-1 bg-gradient-to-br from-sky-600 via-emerald-600 to-sky-700 rounded-2xl p-8 border-2 border-white/20 text-white text-center transition-all hover:shadow-xl shadow-lg">
            <h2 className="text-2xl font-black mb-6 border-b-2 border-white/30 pb-4">
              Total Pages
            </h2>
            <div className="text-6xl font-black mb-6 bg-white/20 backdrop-blur-sm rounded-xl py-4">
              {allRoutes.length}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{staticRoutes.length}</div>
                <div className="text-xs opacity-90">Static</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{blogRoutes.length}</div>
                <div className="text-xs opacity-90">Blogs</div>
              </div>
            </div>
            <a href="/sitemap.xml" className="w-full bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl transition-all border-2 border-white/30 hover:border-white/50 hover-lift block">
               Download XML
            </a>
          </div>
        </div>

        {/* FOOTER */}
        {/* <div className="text-center pt-16 border-t-2 border-sky-100 bg-gradient-to-r from-sky-50/50 to-emerald-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
          <p className="text-lg font-semibold text-gray-800 mb-2">
             Auto-generated from Live Database
          </p>
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div> */}
      </div>

      <style>{`
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-2px); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: rgba(56, 189, 248, 0.4); 
          border-radius: 3px; 
        }
      `}</style>
    </>
  );
}
