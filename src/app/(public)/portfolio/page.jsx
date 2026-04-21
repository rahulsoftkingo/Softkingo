
// app/(public)/portfolio/page.jsx
import ConsultationCTA from '@/components/common/Consultation-Cta';
import FAQAccordion from '@/components/common/Faqaccordion';
import PortfolioClient from './PortfolioClient';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from './HeroCarousel';
import prisma from '@/lib/prisma';
import { FaArrowRight } from 'react-icons/fa6';
import InquirySection from '@/components/footer/InquirySection';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Our Portfolio - Successful Digital Projects by Softkingo',
  description: 'Explore our portfolio of successful mobile apps, websites, and digital marketing campaigns built for startups and enterprises worldwide.',
  alternates: { canonical: "/portfolio" }
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

  // const categories = [
  //   'All',
  //   'Astrology',
  //   'Automotive',
  //   'Dating',
  //   'E-Commerce',
  //   'Education',
  //   'Fitness',
  //   'Gaming',
  //   'Healthcare',
  // ];
  const categories = ['All', ...Array.from(
    new Set(records.map(p => p.category).filter(Boolean))
  ).sort()];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-900">
      {/* Hero with breadcrumb, CTA buttons and right-side carousel */}
      <section
        //  className="relative h-[20rem] md:h-[25rem] bg-cover bg-center"
        //   style={{ backgroundImage: "url('/images/portfolio/web.jpg')" }}
        // >
        //   <div className="absolute inset-0 bg-gradient-to-r from-[#001322]/80 via-[#001322]/75 to-[#001322]/30" />
        className="relative h-[20rem] md:h-[25rem] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #042c3eff 0%, #097db7ff 100%)" }}
      >
        {/* Subtle Background Texture */}
        <div
          className="absolute inset-0 opacity-80"
          style={{ backgroundImage: "url('/images/portfolio/bg-1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" /> */}
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
                  className="px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex"
                >
                  Get A Quote <ArrowRight className="h-4" />
                </Link>
                <Link
                  href="https://calendly.com/paramhans-softkingo/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 md:px-8 py-2.5 rounded-full bg-white text-[#28AFDF] border border-[#28AFDF] font-medium hover:bg-[#28AFDF]/10 transform hover:-translate-y-1 shadow-lg shadow-[#28AFDF]/30 transition-all duration-300 text-xs md:text-md inline-flex items-center justify-center"
                >
                  <span className="font-semibold text-bas text-xs md:text-md mr-3 group-hover:mr-4 transition-all">
                    Meeting
                  </span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
      <InquirySection />

    </main>
  );
}
