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
  Shield,
  Clock,
  Gem,
  Globe
} from "lucide-react";

import { commonSchemas } from "@/lib/commonSchema";
import InquirySection from "@/components/footer/InquirySection";
import { FaArrowRight } from "react-icons/fa6";
import CommonTitle from "@/components/ui/CommonTitle";
import DynamicPortfolioCard from "@/components/ui/DynamicPortfolioCard";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import FAQAccordion from "@/components/common/Faqaccordion";
import IndustriesSection from "@/components/common/IndustriesSection";
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
  console.log("Generating metadata for slug:", slug);

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...commonSchemas,
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": "https://www.softkingo.com/#breadcrumb",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.softkingo.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": `https://www.softkingo.com/services/${slug}`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": slug,
                  "item": `https://www.softkingo.com/services/services/${slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `https://www.softkingo.com/services/${slug}/#service`,
              "name": service.title,
              "url": `https://www.softkingo.com/services/${slug}`,
              "description": service.seoDescription ?? "",
              "image": service.seoImage
                ? `https://www.softkingo.com${service.seoImage}`
                : `https://www.softkingo.com${""}`,
            }
          ])
        }}
      />
      {/* Hero Section with Lead Form */}
      {show('hero') && (
        <section className="relative overflow-hidden flex items-center bg-[#0B1121]">
          <div className="absolute inset-0 z-0">
            <Image
              src={content.heroBg || "/images/services/default-bg.png"}
              alt={service.title}
              fill
              className="object-cover opacity-90 "
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-18 w-full">
            <div className="grid md:grid-cols-3 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="md:col-span-2 text-white space-y-4 animate-fadeInLeft">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-xs md:text-sm animate-fadeInUp">
                  <Link href="/" className="hover:text-cyan-400 transition-colors">
                    Home
                  </Link>
                  <span className="text-gray-400">›</span>
                  <Link href="/services" className="hover:text-cyan-400 transition-colors">
                    Our services
                  </Link>
                  <span className="text-gray-400">›</span>
                  <span className="text-cyan-400 ">{service.title}</span>
                </nav>

                {/* Heading & Description */}
                <div className="space-y-6">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal animate-fadeInUp">
                    {content.heroTitle}
                  </h1>

                  <div
                    className="text-gray-300 text-sm md:text-base leading-relaxed animate-fadeInUp animation-delay-200 max-w-4xl rich-text"
                    dangerouslySetInnerHTML={{ __html: content.heroSubtitle }}
                  />
                </div>

                <div className="flex gap-4 animate-fadeInUp animation-delay-400">
                  <Link
                    href={content.heroButtonLink || "/contact"}
                    className="px-6 md:px-8 py-3 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-bold hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-xl shadow-sky-900/40 transition-all duration-300 items-center cursor-pointer inline-flex uppercase tracking-wider"
                  >
                    {content.heroButtonText || "Let’s Work Together"} <FaArrowRight className="ml-2" />
                  </Link>
                </div>

                {/* Trusted By Section */}
                <div className="pt-4 md:pt-6 animate-fadeInUp animation-delay-800  ">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent md:hidden"></div>
                    <h3 className="text-sky-200 text-sm md:text-base font-semibold">
                      {content.trustedByText || "Trusted By Leading Brands"}
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
              <div className="md:col-span-1 md:ml-auto w-full max-w-md mx-auto md:mx-0 animate-fadeInRight">
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
        <section className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400">
          {/* Decorative mesh-like blurs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-32 opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -mb-48 opacity-20"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6 relative z-10">
            <div className="flex flex-wrap items-center justify-around gap-4 md:gap-12 text-white">
              <StatItem
                icon={<Clock className="w-8 h-8 md:w-10 md:h-10" />}
                value={content.stats?.years}
                label={content.stats?.yearsLabel}
              />
              <StatItem
                icon={<Globe className="w-8 h-8 md:w-10 md:h-10" />}
                value={content.stats?.projects}
                label={content.stats?.projectsLabel}
              />
              <StatItem
                icon={<Users className="w-8 h-8 md:w-10 md:h-10" />}
                value={content.stats?.team}
                label={content.stats?.teamLabel}
              />
              <StatItem
                icon={<Gem className="w-8 h-8 md:w-10 md:h-10" />}
                value={content.stats?.rating}
                label={content.stats?.ratingLabel}
              />
            </div>
          </div>
        </section>
      )}
      {show("awards") && (
        <AwardsSection
          variant="service"
          title={content.awards?.title}
          gradientText={content.awards?.gradientText}
          subtitle={content.awards?.subtitle}
          awards={content.awards?.items}
        />
      )}
      {/* Services Section - CoreServicesSection Component */}
      {show('services') && (() => {
        // Map admin categories to the component's 'services' shape
        // Admin uses 'expertise' for capabilities and 'products' for technologies
        const adminCategories = content.services?.categories || [];
        const mappedServices = adminCategories.length > 0
          ? adminCategories.map((cat, idx) => ({
            id: cat.id || idx + 1,
            title: cat.fullTitle || cat.title || cat.name || `Service ${idx + 1}`,
            description: cat.fullDesc || cat.description || cat.desc || '',
            capabilities: (cat.expertise || []).map(exp => exp.label),
            technologies: (cat.products || []).map(prod => ({
              name: prod.name,
              img: prod.image || "/images/placeholder.jpg"
            })),
          }))
          : undefined; // undefined = component will use AI_SERVICES_DEFAULT

        return (
          <CoreServicesSection
            title={content.services?.title}
            subtitle={content.services?.subtitle}
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
          theme="dark"
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
          title={content.portfolioTitle}
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

      <BlogSection
        category={content.blogCategory || ""}
        title={content.blogTitle}
        subtitle={content.blogSubtitle}
      />
      {show("inquiry") && (
        <InquirySection
          tagline={content.inquiry?.tagline}
          titlePrefix={content.inquiry?.titlePrefix}
          title={content.inquiry?.title}
          subtitle={content.inquiry?.subtitle}
        />
      )}
    </main>
  );
}

// Stat Item Component for the new bar design
function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center text-center group cursor-default">
      <div className="flex items-center gap-4 mb-2">
        {/* <span className="text-white/80 scale-90 group-hover:scale-110 group-hover:text-white transition-all duration-500 transform-gpu">
          {icon}
        </span> */}
        <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white drop-shadow-md">
          {value}
        </span>
      </div>
      <p className="text-[10px] md:text-[12px] font-bold   text-sky-100/80 group-hover:text-white transition-colors">
        {label}
      </p>
    </div>
  );
}

