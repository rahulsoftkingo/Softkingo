// import ConsultationCTA from "@/components/common/Consultation-Cta";
// import FAQAccordion from "@/components/common/Faqaccordion";
// import PortfolioClient from "./PortfolioClient";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import HeroCarousel from "./HeroCarousel";

// export const metadata = {
//   title: "Our Portfolio | Mobile Apps, Websites & Digital Campaigns",
//   description:
//     "Explore our portfolio of successful apps, web platforms and digital marketing campaigns built for startups and enterprises.",
// };

// export default function PortfolioPage() {
//   const projects = [
//     {
//       id: "lovelocal-grocery-app",
//       type: "app",
//       title: "LoveLocal: Grocery App",
//       category: "E-Commerce",
//       description:
//         "Experience the convenience and freshness that LoveLocal brings to your everyday grocery shopping.",
//       techstack: "Flutter, Node.js, MongoDB",
//       platforms: "iOS · Android · Web",
//       country: "India",
//       bgImage: "/images/portfolio/bg-1.png",
//       bgColor:
//         "linear-gradient(90deg, rgba(244,143,177,0.94), rgba(239,83,80,0.96))",
//       icon: "/images/case-studies/logo.png",
//       phoneMockup: "/images/case-studies/screen1.png",
//       badges: {
//         play: {
//           id: "lovelocal-play",
//           src: "/images/badges/google-play.png",
//           href: "https://play.google.com/store/apps/details?id=lovelocal", // optional
//         },
//         app: {
//           id: "lovelocal-appstore",
//           src: "/images/badges/app-store.png",
//           href: "https://apps.apple.com/app/id1234567890",
//         },
//         web: {
//           id: "lovelocal-web",
//           src: "/images/badges/web-badge.png",
//           href: "https://lovelocal.in",
//         },
//       },
//     },
//     {
//       id: "hopin-taxi",
//       type: "app",
//       title: "HopIn",
//       category: "Automotive",
//       description:
//         "HopIn app got started in our even greater, real App. Get the HopIn app and order a ride without adding your bank details.",
//       techstack: "React Native, Node, MySQL",
//       platforms: "iOS · Android",
//       country: "India",
//       bgImage: "/images/portfolio/bg-1.png",
//       bgColor: "linear-gradient(135deg, #FFD54F 0%, #FFB300 100%)",
//       icon: "/images/portfolio/hopin-icon.png",
//       phoneMockup: "/images/portfolio/hopin-phone.png",
//       badges: {
//         play: {
//           id: "hopin-play",
//           src: "/images/badges/google-play.png",
//           href: "https://play.google.com/store/apps/details?id=hopin",
//         },
//         app: {
//           id: "hopin-appstore",
//           src: "/images/badges/app-store.png",
//           href: "https://apps.apple.com/app/id987654321",
//         },
//         web: {
//           id: "hopin-web",
//           src: "/images/badges/web-badge.png",
//           href: "https://hopin.com",
//         },
//       },
//     },
//     {
//       id: "moglix-b2b",
//       type: "app",
//       title: "Moglix - B2B e-Com Shopping",
//       category: "E-Commerce",
//       description:
//         "Moglix kicked us with a mission rich reliance since retail app that could handle the complexities of B2B commerce.",
//       techstack: "Kotlin, Laravel, MySQL",
//       platforms: "iOS · Android · Web",
//       country: "India",
//       bgImage: "/images/portfolio/bg-1.png",
//       bgColor: "linear-gradient(135deg, #EF9A9A 0%, #E53935 100%)",
//       icon: "/images/portfolio/moglix-icon.png",
//       phoneMockup: "/images/portfolio/moglix-phone.png",
//       badges: {
//         play: {
//           id: "moglix-play",
//           src: "/images/badges/google-play.png",
//           href: "https://play.google.com/store/apps/details?id=moglix",
//         },
//         app: {
//           id: "moglix-appstore",
//           src: "/images/badges/app-store.png",
//           href: "https://apps.apple.com/app/id1111111111",
//         },
//         web: {
//           id: "moglix-web",
//           src: "/images/badges/web-badge.png",
//           href: "https://moglix.com",
//         },
//       },
//     },
//     {
//       id: "potato-delivery",
//       type: "app",
//       title: "Potato Delivery App",
//       category: "Food",
//       description:
//         "A game-changing app that's redefining how businesses streamline supplies.",
//       techstack: "React Native, Node, MongoDB",
//       platforms: "iOS · Android",
//       country: "India",
//       bgImage: "/images/portfolio/bg-1.png",
//       bgColor: "linear-gradient(135deg, #FFD54F 0%, #FFAB40 100%)",
//       icon: "/images/portfolio/potato-icon.png",
//       phoneMockup: "/images/portfolio/potato-phone.png",
//       badges: {
//         play: {
//           id: "potato-play",
//           src: "/images/badges/google-play.png",
//           href: "https://play.google.com/store/apps/details?id=potato",
//         },
//         app: {
//           id: "potato-appstore",
//           src: "/images/badges/app-store.png",
//           href: "https://apps.apple.com/app/id2222222222",
//         },
//         web: {
//           id: "potato-web",
//           src: "/images/badges/web-badge.png",
//           href: "https://potatoapp.com",
//         },
//       },
//     },
//     {
//       id: "bumpy-dating",
//       type: "web",
//       title: "Bumpy Dating App",
//       category: "Dating",
//       description:
//         "Bumpy is a discreet international dating app designed for users around the world by offering a platform that values discretion.",
//       techstack: "Flutter, Firebase",
//       platforms: "iOS · Android",
//       country: "India",
//       bgImage: "/images/portfolio/bg-1.png",
//       bgColor: "linear-gradient(135deg, #81D4FA 0%, #4FC3F7 100%)",
//       icon: "/images/portfolio/bumpy-icon.png",
//       phoneMockup: "/images/portfolio/bumpy-phone.png",
//       badges: {
//         play: {
//           id: "bumpy-play",
//           src: "/images/badges/google-play.png",
//           href: "https://play.google.com/store/apps/details?id=bumpy",
//         },
//         app: {
//           id: "bumpy-appstore",
//           src: "/images/badges/app-store.png",
//           href: "https://apps.apple.com/app/id3333333333",
//         },
//         web: {
//           id: "bumpy-web",
//           src: "/images/badges/web-badge.png",
//           href: "https://bumpyapp.com",
//         },
//       },
//     },
//   ];

//   const categories = [
//     "All",
//     "Astrology",
//     "Automotive",
//     "Dating",
//     "E-Commerce",
//     "Education",
//     "Fitness",
//     // "Food",
//     "Gaming",
//     "Healthcare",
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-900">
//       {/* HERO - Contact page style with breadcrumb + bg image */}
    
//            {/* HERO with right glass card + carousel */}
//       <section
//         className="relative h-[20rem] md:h-[25rem] bg-cover bg-center"
//         style={{ backgroundImage: "url('/images/portfolio/bg.png')" }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-[#001322]/80 via-[#001322]/75 to-[#001322]/30" />
//         <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 w-full items-center">
//             {/* Left: text */}
//             <div>
//               <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
//                 <Link
//                   href="/"
//                   className="hover:text-cyan-400 transition-colors"
//                 >
//                   Home
//                 </Link>
//                 <span>›</span>
//                 <span className="text-cyan-400 font-medium">Portfolio</span>
//               </nav>

//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
//                 Our Portfolio
//               </h1>
//               <p className="mt-4 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90">
//                 Our success stories define our expertise in developing
//                 tech‑driven business solutions for startups and global brands.
//               </p>
//               <div className="flex flex-wrap gap-3 pt-4">
//                 <Link
//                   href="/contact"
//                   className="px-4 py-2 rounded-full bg-[#00B7FF] text-xs sm:text-sm font-semibold shadow-[0_10px_24px_rgba(0,183,255,0.45)] hover:bg-[#0096d4] transition text-white flex gap-2 items-center cursor-pointer"
//                 >
//                   Get A Quote <ArrowRight className="h-4" />
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="px-4 py-2 rounded-full border border-white/30 text-xs sm:text-sm font-semibold hover:bg-white/10 transition text-white flex gap-2 items-center cursor-pointer"
//                 >
//                   Schedule A Meeting <ArrowRight className="h-4" />
//                 </Link>
//               </div>
//             </div>

//             {/* Right: glass card with auto slider */}
//             <div className="hidden sm:block">
//               <HeroCarousel projects={projects} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <PortfolioClient projects={projects} categories={categories} />

//       <ConsultationCTA />
//       <FAQAccordion />
//     </main>
//   );
// }





// app/(public)/portfolio/page.jsx
import ConsultationCTA from '@/components/common/Consultation-Cta';
import FAQAccordion from '@/components/common/Faqaccordion';
import PortfolioClient from './PortfolioClient';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from './HeroCarousel';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Our Portfolio | Mobile Apps, Websites & Digital Campaigns',
  description:
    'Explore our portfolio of successful apps, web platforms and digital marketing campaigns built for startups and enterprises.',
};

// Convert badgesJson (stored as JSON string) into the badges object
function mapBadges(badgesJson) {
  if (!badgesJson) return {};
  try {
    const obj = JSON.parse(badgesJson);
    return obj || {};
  } catch {
    return {};
  }
}

export default async function PortfolioPage() {
  // Fetch projects from database
  const records = await prisma.portfolioProject.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Map DB fields to the shape used by PortfolioClient and HeroCarousel
  const projects = records.map((p) => ({
    id: p.key || String(p.id),
    type: p.type,
    title: p.title,
    category: p.category || '',
    description: p.description || '',
    techstack: p.techStack || '',
    platforms: p.platforms || '',
    country: p.country || '',
    bgImage: p.bgImage || '/images/portfolio/bg-1.png',
    bgColor:
      p.bgColor ||
      'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    icon: p.icon || '',
    phoneMockup: p.phoneMockup || '',
    badges: mapBadges(p.badgesJson),
  }));

  const categories = [
    'All',
    'Astrology',
    'Automotive',
    'Dating',
    'E-Commerce',
    'Education',
    'Fitness',
    'Gaming',
    'Healthcare',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-900">
      {/* Hero with breadcrumb, CTA buttons and right-side carousel */}
      <section
        className="relative h-[20rem] md:h-[25rem] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/portfolio/bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#001322]/80 via-[#001322]/75 to-[#001322]/30" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 w-full items-center">
            {/* Left: text */}
            <div>
              <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </Link>
                <span>›</span>
                <span className="text-cyan-400 font-medium">Portfolio</span>
              </nav>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Our Portfolio
              </h1>
              <p className="mt-4 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90">
                Our success stories define our expertise in developing
                tech‑driven business solutions for startups and global brands.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full bg-[#00B7FF] text-xs sm:text-sm font-semibold shadow-[0_10px_24px_rgba(0,183,255,0.45)] hover:bg-[#0096d4] transition text-white flex gap-2 items-center cursor-pointer"
                >
                  Get A Quote <ArrowRight className="h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full border border-white/30 text-xs sm:text-sm font-semibold hover:bg-white/10 transition text-white flex gap-2 items-center cursor-pointer"
                >
                  Schedule A Meeting <ArrowRight className="h-4" />
                </Link>
              </div>
            </div>

            {/* Right: glass card with auto slider */}
            <div className="hidden sm:block">
              <HeroCarousel projects={projects} />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio grid and filters handled by client component */}
      <PortfolioClient projects={projects} categories={categories} />

      <ConsultationCTA />
      <FAQAccordion />
    </main>
  );
}
