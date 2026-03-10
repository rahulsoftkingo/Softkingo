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

import InquirySection from "@/components/footer/InquirySection";
import { FaArrowRight } from "react-icons/fa6";
import CommonTitle from "@/components/ui/CommonTitle";
import DynamicPortfolioCard from "@/components/ui/DynamicPortfolioCard";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import FAQAccordion from "@/components/common/Faqaccordion";
import IndustriesSection from "@/components/common/IndustriesSection";
import Industries from "../../home/h6-industries-section/page";
import ServicesCategoryLayout from "../_components/ServicesCategoryLayout";
import CloneTechStack from "@/components/public/clone/CloneTechStack";
import ServiceProcess from "../_components/ServiceProcess";
import AwardsSection from "@/components/common/AwardsSection";
import SolutionHighlight from "../_components/SolutionHighlight";
import IndustrySolutions from "../_components/IndustrySolutions";
import UserGuide from "../_components/UserGuide";
import BlogSection from "@/components/common/BlogSection";
import CoreServicesSection from "@/components/common/CoreServicesSection";

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

  const jsonContent = service.contentJson ? JSON.parse(service.contentJson) : {};

  // If activeSections is missing OR empty, default to showing everything
  const defaultSections = ['hero', 'stats', 'services', 'consultation', 'tech', 'process', 'highlight', 'portfolio', 'solutions', 'industries', 'user-guide', 'faq', 'seo'];
  const activeSections = (jsonContent.activeSections && jsonContent.activeSections.length > 0)
    ? jsonContent.activeSections
    : defaultSections;

  // Fallback to jsonContent itself if 'content' object is missing (old structure)
  const content = (jsonContent.content && Object.keys(jsonContent.content).length > 0)
    ? jsonContent.content
    : jsonContent;

  const show = (section) => activeSections.includes(section);

  return (
    <main className="text-gray-800">
      {/* Hero Section with Lead Form */}
      {show('hero') && (
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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-24 w-full">


            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight animate-fadeInUp animation-delay-200">
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
              <div className="md:ml-auto w-full max-w-md mx-auto md:mx-0 animate-fadeInRight">
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
      )}

      {/* Stats Section */}
      {show('stats') && (
        <section className="bg-gradient-to-br from-white  to-white py-12 md:py-16 px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">

            <CommonTitle
              align="left"
              pill={false}
              title='Empowering'
              gradientText="Digital Success with Softkingo"
              subtitle={content.statsSubtitle || content.heroSubtitle}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <StatBox
                value={content.stats.years}
                label={content.stats.yearsLabel}
                color="from-sky-300 to-sky-600"
              />
              <StatBox
                value={content.stats.projects}
                label={content.stats.projectsLabel}
                color="from-sky-300 to-sky-600"
              />
              <StatBox
                value={content.stats.team}
                label={content.stats.teamLabel}
                color="from-sky-300 to-sky-600"
              />
              <StatBox
                value={content.stats.rating}
                label={content.stats.ratingLabel}
                color="from-sky-300 to-sky-600"
              />
            </div>
          </div>
        </section>
      )}
      <AwardsSection />
      {/* Services Section - CoreServicesSection Component */}
      {show('services') && (() => {
        // Map admin categories to the component's 'services' shape
        const adminCategories = content.services?.categories || [];
        const mappedServices = adminCategories.length > 0
          ? adminCategories.map((cat, idx) => ({
            id: cat.id || idx + 1,
            title: cat.title || cat.name || `Service ${idx + 1}`,
            description: cat.description || cat.desc || '',
            capabilities: cat.capabilities || cat.features || [],
            technologies: cat.technologies || cat.tech || [],
          }))
          : undefined; // undefined = component will use AI_SERVICES_DEFAULT

        return (
          <CoreServicesSection
            title={content.services?.title || "Our Core Services"}
            subtitle={content.services?.subtitle || "End-to-end solutions designed to solve real business problems and create measurable growth."}
            services={mappedServices}
            bgClass="bg-[#f8faff]"
            sectionId="core-services"
          />
        );
      })()}

      {/* Consultation CTA Section */}
      {show('consultation') && (
        <ConsultationCTA
          title={content.consultation?.title}
          subtitle={content.consultation?.subtitle}
          buttonLabel={content.consultation?.buttonLabel}
          imageSrc={content.consultation?.imageSrc}
          theme="white"
        />
      )}

      {/* Tech Stack Section */}
      {show('tech') && (
        <CloneTechStack data={content.techStack || content.tech} />
      )}

      {/* Process Section */}
      {show('process') && (
        <ServiceProcess data={content.process} />
      )}

      {/* Solution Highlight Section */}
      {show('highlight') && (
        <SolutionHighlight data={content.highlight} />
      )}

      {show('portfolio') && (
        <DynamicPortfolioCard
          category={content.portfolioCategory || service.slug}
          portfolioType="app"
          title={content.portfolioTitle || "Our Portfolio"}
          subtitle={content.portfolioSubtitle}
        />
      )}

      {/* Industry Solutions Section */}
      {show('solutions') && (
        <IndustrySolutions data={content.solutions} />
      )}

      {/* Industries Section */}
      {show('industries') && (
        <IndustriesSection data={content.industrySection} />
      )}

      {/* User Guide Section */}
      {show('user-guide') && (
        <UserGuide data={content.userGuide} />
      )}

      {/* FAQ Section */}
      {show('faq') && (
        <FAQAccordion data={content.faq} />
      )}
      {/* <section className="bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <Industries />
      </section> */}

      <BlogSection
        category={content.blogCategory || ""}
        title={content.blogTitle || "Our Latest Blogs"}
        subtitle={content.blogSubtitle || "Explore our latest insights, product lessons, and engineering best practices."}
      />
      <InquirySection />
    </main>
  );
}

// Stat Box Component
function StatBox({ value, label, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} p-4 md:p-6 text-center rounded-sm shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group`}
    >
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">
        {value}
      </h3>
      <p className="text-white/90 font-medium text-[10px] md:text-xs uppercase tracking-wider">{label}</p>
    </div>
  );
}

