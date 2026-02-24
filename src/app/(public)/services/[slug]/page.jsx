// // src/app/(public)/services/[slug]/page.jsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/public/LeadForm";
import TechView from "@/components/common/TechView";
import MethodologySection from "@/components/common/MethodologySection";
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
} from "react-icons/fa";
import {
  Rocket,
  Code,
  Settings,
  Palette,
  Smartphone,
  CreditCard,
  ShoppingCart,
  HeartPulse,
  BarChart3,
  Truck,
  BookOpen,
  Zap,
  Star,
  Users,
  Search,
  Ruler,
  Shield
} from "lucide-react";

import Blogs from "../../home/blogs/BlogSliderClient";
import InquirySection from "@/components/footer/InquirySection";
import { FaArrowRight } from "react-icons/fa6";
import CommonTitle from "@/components/ui/CommonTitle";
import DynamicPortfolioCard from "@/components/ui/DynamicPortfolioCard";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import FAQAccordion from "@/components/common/Faqaccordion";
import Industries from "../../home/h6-industries-section/page";

// Force SSR (no build-time DB access)
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

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

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // DB call now happens at request-time (SSR), not at build-time
  const service = await prisma.page.findUnique({
    where: { slug, type: "service" },
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
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;

  const service = await prisma.page.findUnique({
    where: { slug, type: "service" },
    include: {
      author: {
        select: {
          name: true,
          profileImage: true,
        },
      },
    },
  });

  if (!service || service.status !== "published") {
    return notFound();
  }

  const content = service.contentJson ? JSON.parse(service.contentJson) : {};
  const show = (section) => !!content[section] || section === 'portfolio'; // Always show portfolio if not explicitly disabled or if it's the default

  return (
    <main className="text-gray-800">
      {/* Hero Section with Lead Form */}
      <section className="relative overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.heroBg || "/images/services/default-bg.png"}
            alt={service.title}
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-800/70 to-slate-500/60 opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">


          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="text-white space-y-6 md:space-y-8">
              {/* Breadcrumb */}
              <nav className="mb-6 md:mb-8 animate-fadeInUp">
                <div className="flex flex-wrap items-center text-xs md:text-sm text-sky-100/80 gap-1 md:gap-2">
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                  <span>›</span>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                  <span>›</span>
                  <span className="font-semibold text-cyan-400">{service.title}</span>
                </div>

              </nav>
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fadeInUp animation-delay-200">
                  {content.heroTitle || service.title}
                </h1>
                <p className="text-sky-100 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed animate-fadeInUp animation-delay-400">
                  {content.heroSubtitle || service.excerpt}
                </p>
              </div>

              <div className="flex gap-4 animate-fadeInUp animation-delay-600">
                <Link
                  href="/contact"
                  className="px-4 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-lg shadow-sky-900/30 transition-all duration-300 items-center cursor-pointer inline-flex"
                // className="px-4 md:px-6 py-2 rounded-full bg-white  text-sky-400 border border-sky-400 bg-gradient-to-rfrom-sky-600via-sky-500to-sky-400 hover:text-white text-xs md:text-sm font-medium hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 hover:shadow-lg shadow-sky-900/30 transition-all duration-300  items-center cursor-pointer inline-flex"
                >
                  Let’s Work Together <FaArrowRight className="ml-2" />
                </Link>
              </div>

              {/* Trusted By Section */}
              <div className="pt-6 md:pt-8 animate-fadeInUp animation-delay-800  ">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent md:hidden"></div>
                  <h3 className="text-sky-200 text-sm md:text-base font-semibold">
                    Trusted By Leading Brands
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
                </div>
                <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center lg:justify-start">
                  <div className="flex flex-col items-center">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <Image
                      src="/images/about/clutch.png"
                      alt="Clutch"
                      width={100}
                      height={50}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
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

            {/* Right - Lead Form Component */}
            <div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
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

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
          .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-800 { animation-delay: 0.8s; opacity: 0; animation-fill-mode: forwards; }
        `}</style>
      </section>

      {/* Stats Section */}
      {content.stats && (
        <section className="bg-gradient-to-br from-white  to-white py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">

            <CommonTitle
              align="left"
              pill={false}
              title='Empowering'
              gradientText="Digital Success with Softkingo"
              subtitle={content.statsSubtitle || content.heroSubtitle}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <StatBox
                value={content.stats.years}
                label={content.stats.yearsLabel}
                color="from-sky-300 to-sky-600"
                icon=""
              />
              <StatBox
                value={content.stats.projects}
                label={content.stats.projectsLabel}
                color="from-sky-300 to-sky-600"
                icon=""
              />

              {content.mainImage && (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-sm row-span-1 sm:row-span-3 h-64 sm:h-96 lg:h-auto shadow">
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
                color="from-sky-300 to-sky-600"
                icon=""
              />
              <StatBox
                value={content.stats.rating}
                label={content.stats.ratingLabel}
                color="from-sky-300 to-sky-600"
                icon=""
              />

              {content.extraImages?.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-sm hidden lg:block shadow"
                >
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

      {/* Services Section */}
      {content.services && (
        <section className="bg-gradient-to-br from-white via-sky-50 to-sky-100 py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              align="center"
              pill={false}
              title={content.services.title}
              gradientText=""
              subtitle={content.services.subtitle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {content.services.items.map((item, idx) => {
                const Icon = iconMap[item.iconName] || FaMobileAlt;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-sm p-6 md:p-8 shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="mb-6 relative">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10
                         
                          flex items-center justify-center group-hover:scale-110 transition-transform duration-300 `}
                      >
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-sky-500" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Section */}
      {content.tech && (
        <section className="bg-white py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              align="center"
              pill={false}
              title={content.tech.title}
              gradientText=""
              subtitle={content.tech.subtitle}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              {content.tech.items.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {content.process && (
        <section className="bg-gradient-to-br from-slate-50 to-white py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              align="center"
              pill={false}
              title={content.process.title}
              gradientText=""
              subtitle={content.process.subtitle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {content.process.items.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {idx + 1}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {content.faq && (
        <section className="bg-white py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <CommonTitle
              align="center"
              pill={false}
              title={content.faq.title}
              gradientText=""
              subtitle={content.faq.subtitle}
            />

            <div className="space-y-4">
              {content.faq.items.map((faq, idx) => (
                <FAQAccordion
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {show('portfolio') && (
        <DynamicPortfolioCard
          category={content.portfolioCategory || service.slug}
          portfolioType="app"
          title={content.portfolioTitle || "Our Portfolio"}
        />
      )}
      <ConsultationCTA imageSrc="/images/cta/cta-img.png" href="/contact" />
      <TechView />
      <MethodologySection />
      <ConsultationCTA imageSrc="/images/cta/cta.png" href="/contact" title="Let’s Build Your Next Big Mobile App" subtitle="Collaborate with a leading mobile app development agency to turn your innovative idea into a feature-rich mobile application." />
      <section className="bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <Industries />
      </section>

      <Blogs
        category=""
        featured={false}    // Latest uploaded
        title="Our Latest Blogs"
        subtitle="Explore our latest insights, product lessons, and engineering best practices."
      />
      <FAQAccordion />
      <InquirySection />
    </main>
  );
}

// Stat Box Component
function StatBox({ value, label, color, icon }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} p-6 md:p-8 text-center rounded-sm shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group`}
    >
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
        {value}
      </h3>
      <p className="text-white/90 font-medium text-xs md:text-sm">{label}</p>
    </div>
  );
}
