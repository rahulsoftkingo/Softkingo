// // src/app/(public)/services/[slug]/page.jsx






















import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import LeadForm from '@/components/public/LeadForm';
import TechView from '@/components/common/TechView';
import MethodologySection from '@/components/common/MethodologySection';
import {
  FaMobileAlt,
  FaHandSparkles,
  FaHeadphones,
  FaDesktop,
  FaShoppingCart,
  FaBitcoin,
  FaSalesforce,
  FaRobot,
  FaCogs,
  FaRegFileCode,
} from 'react-icons/fa';

// Icon mapping
const iconMap = {
  FaMobileAlt,
  FaHandSparkles,
  FaHeadphones,
  FaDesktop,
  FaShoppingCart,
  FaBitcoin,
  FaSalesforce,
  FaRobot,
  FaCogs,
  FaRegFileCode,
};

export async function generateStaticParams() {
  
    if (process.env.SKIP_SSG_DB === "true") return [];
  if (!process.env.DATABASE_URL) return [];

  const services = await prisma.page.findMany({
    where: { type: 'service', status: 'published' },
    select: { slug: true },
  });

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const service = await prisma.page.findUnique({
    where: { slug, type: 'service' },
    select: {
      title: true,
      seoTitle: true,
      seoDescription: true,
      seoImage: true,
    },
  });

  if (!service) return {};

  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle || service.title,
      description: service.seoDescription,
      images: service.seoImage ? [service.seoImage] : [],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;

  const service = await prisma.page.findUnique({
    where: { slug, type: 'service' },
    include: {
      author: {
        select: {
          name: true,
          profileImage: true,
        },
      },
    },
  });

  if (!service || service.status !== 'published') {
    return notFound();
  }

  const content = service.contentJson ? JSON.parse(service.contentJson) : {};

  return (
    <main className="text-gray-800">
      {/* Hero Section with Lead Form */}
      <section className="relative overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.heroBg || '/images/services/default-bg.png'}
            alt={service.title}
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-800/70 to-slate-500/60 opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">
          {/* Breadcrumb */}
          <nav className="mb-6 md:mb-8 animate-fadeInUp">
            <div className="flex flex-wrap items-center text-xs md:text-sm text-sky-100/80 gap-1 md:gap-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="font-semibold text-cyan-400">{service.title}</span>
            </div>
            <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.22em] text-sky-200/80">
              Softkingo • {service.title}
            </p>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fadeInUp animation-delay-200">
                  {content.heroTitle || service.title}
                </h1>
                <p className="text-sky-100 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed animate-fadeInUp animation-delay-400">
                  {content.heroSubtitle || service.excerpt}
                </p>
              </div>

              <div className="flex gap-4 animate-fadeInUp animation-delay-600">
                <button className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white font-semibold px-6 md:px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 hover:-translate-y-0.5">
                  Get Started
                </button>
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 md:px-8 py-3 rounded-xl transition-all duration-300 border border-white/20">
                  View Portfolio
                </button>
              </div>

              {/* Trusted By Section */}
              <div className="pt-6 md:pt-8 animate-fadeInUp animation-delay-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
                  <h3 className="text-sky-200 text-sm md:text-base font-semibold">
                    Trusted By Leading Brands
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
                </div>
                <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center lg:justify-start">
                  <Image
                    src="/images/about/clutch.png"
                    alt="Clutch"
                    width={100}
                    height={50}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <Image
                      src="/images/about/goodfirm.png"
                      alt="GoodFirms"
                      width={120}
                      height={40}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <Image
                      src="/images/about/upwork.png"
                      alt="Upwork"
                      width={90}
                      height={40}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>

           
            {/* <div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
              <LeadForm
                formType="service"
                formKey={service.slug}
                serviceName={service.title}
                title="Book a Free Consultation"
                subtitle="Response within 1 Business Day!"
                variant="hero"
              />
              
            </div>
           */}

{/* Right - Lead Form Component */}
<div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
  {/* <LeadForm
    formType="service"
    formKey={service.slug}
    serviceName={service.title}
    title="Book a Free Consultation"
    subtitle="Response within 1 Business Day!"
    variant="hero"
    showWhatsApp={true}
    showCompany={true}
    showBudget={true}
  /> */}
<LeadForm
  formType="service"
  formKey={service.slug}
  serviceName={service.title}
  title="Book a Free Consultation"
  subtitle="Response within 1 Business Day!"
  variant="hero"
  showLogo={true}
  showCompany={false}
  showBudget={false}
  showAttachment={false}
  showNDA={false}
/>

  
</div>

          </div>
        </div>

        <style >{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }

          .animate-fadeInRight {
            animation: fadeInRight 0.8s ease-out;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .animation-delay-800 {
            animation-delay: 0.8s;
            opacity: 0;
            animation-fill-mode: forwards;
          }
        `}</style>
      </section>

      {/* Stats Section */}
      {content.stats && (
        <section className="bg-gradient-to-br from-sky-50 via-white to-sky-50 py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Empowering Digital Success
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600">
                  with Softkingo
                </span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                {content.statsSubtitle || content.heroSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Stat Boxes */}
              <StatBox 
                value={content.stats.years} 
                label={content.stats.yearsLabel} 
                color="from-emerald-400 to-emerald-600"
                icon="⚡"
              />
              <StatBox 
                value={content.stats.projects} 
                label={content.stats.projectsLabel} 
                color="from-cyan-400 to-cyan-600"
                icon="🚀"
              />
              
              {/* Main Image */}
              {content.mainImage && (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl row-span-1 sm:row-span-3 h-64 sm:h-96 lg:h-auto shadow-xl">
                  <Image
                    src={content.mainImage}
                    alt="Team"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <StatBox 
                value={content.stats.team} 
                label={content.stats.teamLabel} 
                color="from-purple-400 to-purple-600"
                icon="👥"
              />
              <StatBox 
                value={content.stats.rating} 
                label={content.stats.ratingLabel} 
                color="from-amber-400 to-amber-600"
                icon="⭐"
              />

              {/* Extra Images */}
              {content.extraImages?.map((img, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl hidden lg:block shadow-lg">
                  <Image
                    src={img}
                    alt={`Extra ${idx + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Cards Section */}
      {content.cards && (
        <section className="bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500 py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12 max-w-3xl">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {content.servicesTitle}
              </h2>
              <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed">
                {content.servicesSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {content.cards.map((card, idx) => {
                const Icon = iconMap[card.iconName] || FaMobileAlt;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="mb-6 relative">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${card.iconGradient || 'from-cyan-400 to-sky-600'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <TechView />

      {/* Methodology */}
      <MethodologySection />
    </main>
  );
}

// Stat Box Component
function StatBox({ value, label, color, icon }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 md:p-8 text-center rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group`}>
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
        {value}
      </h3>
      <p className="text-white/90 font-medium text-sm md:text-base">
        {label}
      </p>
    </div>
  );
}
