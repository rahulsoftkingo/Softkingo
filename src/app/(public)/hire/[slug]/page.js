import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

// --- COMPONENTS ---
import LeadForm from '@/components/public/LeadForm';
import FooterForm from '@/components/footer/InquirySection';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import FAQAccordion from '@/components/common/Faqaccordion';
import InquirySection from '@/components/footer/InquirySection';
import CommonTitle from '@/components/ui/CommonTitle';
import BlogSection from '@/components/common/BlogSection';
import HireDevelopersPage from './SelectDeveloper';
import CloneTechStack from '@/components/public/clone/CloneTechStack';
import { commonSchemas } from "@/lib/commonSchema";

// --- ICONS ---
import { BsCheckCircle, BsTransparency, BsFileEarmarkBarGraph } from 'react-icons/bs';
import { GiBullseye } from 'react-icons/gi';
import { CiClock1, CiTimer } from 'react-icons/ci';
import { TbCalendarClock } from 'react-icons/tb';
import {
  FaComments, FaLightbulb, FaRocket, FaSearch, FaThumbsUp, FaUser, FaUsers, FaLaptopCode, FaCogs, FaBug, FaCheckCircle, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import { ThumbsUp } from 'lucide-react';

// --- HELPERS ---
function parseJsonSafe(str) {
  if (!str) return {};
  try { return JSON.parse(str); } catch { return {}; }
}

function getIcon(key, size = 24, className = "") {
  const map = {
    // Feature Icons
    FaUser: <FaUser size={size} className={className} />,
    FaUsers: <FaUsers size={size} className={className} />,
    FaRocket: <FaRocket size={size} className={className} />,
    FaLightbulb: <FaLightbulb size={size} className={className} />,
    FaComments: <FaComments size={size} className={className} />,
    FaSearch: <FaSearch size={size} className={className} />,
    // Service Icons
    BsTransparency: <BsTransparency size={size} className={className} />,
    BsFileEarmarkBarGraph: <BsFileEarmarkBarGraph size={size} className={className} />,
    GiBullseye: <GiBullseye size={size} className={className} />,
    // Model Icons
    CiClock1: <CiClock1 size={size} className={className} />,
    TbCalendarClock: <TbCalendarClock size={size} className={className} />,
    CiTimer: <CiTimer size={size} className={className} />,
    // Tech Icons
    FaLaptopCode: <FaLaptopCode size={size} className={className} />,
    FaCogs: <FaCogs size={size} className={className} />,
    FaBug: <FaBug size={size} className={className} />,
    // Status Icons
    FaCheckCircle: <FaCheckCircle size={size} className={className} />,
    FaTimesCircle: <FaTimesCircle size={size} className={className} />,
    FaExclamationTriangle: <FaExclamationTriangle size={size} className={className} />
  };
  return map[key] || <FaUser size={size} className={className} />;
}

// --- DATA NORMALIZER ---
function normalizeHireContent(page) {
  const c = parseJsonSafe(page?.contentJson);

  return {
    heroBg: c.heroBg || '',
    heroTitle: c.heroTitle || page?.title || '',
    heroSubtitle: c.heroSubtitle || '',
    badgeText: c.badgeText || '',
    metrics: {
      avgTime: c.metrics?.avgTime || '',
      network: c.metrics?.network || '',
      rating: c.metrics?.rating || '',
    },

    aboutTitle: c.aboutTitle || '',
    aboutSubtitle: c.aboutSubtitle || '',
    features: Array.isArray(c.features) ? c.features : [],
    benefits: Array.isArray(c.benefits) ? c.benefits : [],
    steps: Array.isArray(c.steps) ? c.steps : [],
    services: Array.isArray(c.services) ? c.services : [],
    moreServices: Array.isArray(c.moreServices) ? c.moreServices : [],
    portfolioCategory: c.portfolioCategory || "",
    portfolioTitle: c.portfolioTitle || "",
    portfolioSubtitle: c.portfolioSubtitle || "",

    profileSection: {
      enabled: c.profileSection?.enabled ?? false,
      title: c.profileSection?.title || '',
      subtitle: c.profileSection?.subtitle || '',
      profileFeatures: c.profileSection?.profileFeatures || [],
      images: c.profileSection?.images || {
        leftTop: '',
        rightTop: '',
        rightBottom: '',
      },
    },

    ctaBanner: {
      enabled: c.ctaBanner?.enabled ?? false,
      title: c.ctaBanner?.title || '',
      subtitle: c.ctaBanner?.subtitle || "",
      buttonText: c.ctaBanner?.buttonText || '',
      buttonHref: c.ctaBanner?.buttonHref || '',
      image: c.ctaBanner?.image || '',
    },
    comparisonSection: {
      enabled: c.comparisonSection?.enabled ?? false,
      title: c.comparisonSection?.title || '',
      columns: c.comparisonSection?.columns || [],
      rows: c.comparisonSection?.rows || []
    },
    modelsSection: {
      enabled: c.modelsSection?.enabled ?? false,
      title: c.modelsSection?.title || '',
      subtitle: c.modelsSection?.subtitle || '',
      models: c.modelsSection?.models || []
    },
    whyHireSection: {
      enabled: c.whyHireSection?.enabled ?? false,
      title: c.whyHireSection?.title || '',
      items: c.whyHireSection?.items || []
    },
    businessTypesSection: {
      enabled: c.businessTypesSection?.enabled ?? false,
      title: c.businessTypesSection?.title || '',
      subtitle: c.businessTypesSection?.subtitle || '',
      items: c.businessTypesSection?.items || []
    },
    pricingSection: {
      enabled: c.pricingSection?.enabled ?? false,
      title: c.pricingSection?.title || '',
      subtitle: c.pricingSection?.subtitle || '',
      plans: c.pricingSection?.plans || []
    },
    inquiry: {
      tagline: c.inquiry?.tagline || '',
      title: c.inquiry?.title || '',
      subtitle: c.inquiry?.subtitle || ''
    },
    faq: {
      title: c.faq?.title || '',
      subtitle: c.faq?.subtitle || '',
      items: (c.faq?.items || []).map(it => ({
        id: it.id,
        q: it.question || it.q || '',
        a: it.answer || it.a || ''
      }))
    },
    techStack: c.techStack || null,
    industryHire: c.industryHire || {},
    blogTitle: c.blogTitle || '',
    blogSubtitle: c.blogSubtitle || '',
    blogCategory: c.blogCategory || '',
    activeSections: c.activeSections || []
  };
}

// --- SEO ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await prisma.page.findFirst({ where: { slug, status: 'published', type: 'hire' } });
  if (!page) return { title: 'Hire Developers' };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt,
    openGraph: {
      images: page.seoImage ? [page.seoImage] : []
    }
  };
}

// --- MAIN PAGE ---
export default async function HireSlugPage({ params }) {
  const { slug } = await params;
  const page = await prisma.page.findFirst({ where: { slug, status: 'published', type: 'hire' } });

  if (!page) notFound();

  const content = normalizeHireContent(page);

  return (
    <main className="relative bg-white ">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...commonSchemas,
            {
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              "@id": "https://www.softkingo.com/#breadcrumb",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "softkingo",
                  "item": "https://www.softkingo.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": slug,
                  "item": `https://www.softkingo.com/${slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",   
              "@type": "Service",
              "@id": `https://www.softkingo.com/hire/${slug}/#hire`,
              "name": page?.seoTitle || page?.title,
              "description": page?.seoDescription || page?.excerpt || "",
              "image": page?.seoImage
                ? `https://www.softkingo.com${page.seoImage}`
                : `https://www.softkingo.com${content.heroBg || ""}`,
              "url": `https://www.softkingo.com/hire/${slug}`,
              "provider": {
                "@type": "Organization",
                "@id": "https://softkingo.com/#organization",
                "name": "Softkingo"
              } 
            }   
          ])
        }}
      />

      {/* 1. HERO SECTION */}
      {content.activeSections?.includes('hero') && (
        <section className="relative h-[450px] lg:h-[550px] flex items-center bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={content.heroBg}
              alt="Hero Background"
              fill
              className="object-cover opacity-70"
              priority
            />
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40 opacity-20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl animate-in slide-in-from-left-10 duration-700 fade-in">
              <nav className="flex items-center gap-2 text-xs md:text-sm text-sky-200/80 mb-6 font-medium tracking-wide ">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/hire" className="hover:text-white transition-colors">Hire</Link>
                <span>/</span>
                <span className="text-white border-b border-sky-500 pb-0.5">{content.heroTitle}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-normal mb-6 drop-shadow-lg">
                {content.heroTitle}
              </h1>
              <div
                className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-light rich-text"
                dangerouslySetInnerHTML={{ __html: content.heroSubtitle }}
              />

              <div className="flex flex-wrap gap-4 items-center ">
                <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">{content.badgeText}</span>
                </div>

                <div className="hidden md:flex gap-6 text-sm text-slate-300 border-l border-white/20 pl-6 ml-2 ">
                  <div>
                    <span className="block font-bold text-white text-lg">{content.metrics.avgTime}</span>
                    <span className="text-xs uppercase tracking-wider">Avg Hiring</span>
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg">{content.metrics.network}</span>
                    <span className="text-xs uppercase tracking-wider">Talent Pool</span>
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg flex flex-row items-center ">{content.metrics.rating} <ThumbsUp className='text-[9px] ml-2' /></span>
                    <span className="text-xs uppercase tracking-wider">Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. FEATURES GRID (Floating) */}
      {/* {content.features.length > 0 && (
        <section className="relative z-20 -mt-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.features.map((f, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                            {getIcon(f.iconKey, 28)}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                    </div>
                ))}
            </div>
        </section>
      )} */}
      {/* 2. FEATURES */}
      {content.activeSections?.includes('features') && !!content.features?.length && (
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
              {content.features.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-5 border-t md:border-t-0 md:border-r last:border-r-0 border-slate-100/70 hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-xl text-sky-600">
                    {/* {getFeatureIcon(f.iconKey)} */}
                    {getIcon(f.iconKey, 28)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                    <div
                      className="text-xs text-slate-600 mt-1 leading-relaxed rich-text"
                      dangerouslySetInnerHTML={{ __html: f.description }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* 3. ABOUT + FORM */}
      {content.activeSections?.includes('about') && (
        <section className="py-24 px-6 max-w-7xl mx-auto" id="lead-form">
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-16 items-start">
            <div className="space-y-8 col-span-3">
              <CommonTitle
                align="left"
                title={content.aboutTitle}
              />
              <div
                className="rich-text -mt-6 mb-6"
                dangerouslySetInnerHTML={{ __html: content.aboutSubtitle }}
              />

              <div className="space-y-4">
                {content.benefits.map((b, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <BsCheckCircle className="text-emerald-600 w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden sticky top-24 mt-4 lg:mt-0 lg:col-span-2">
              <LeadForm
                formType="hire"
                formKey="hire"
                serviceName="Hire Developers"
                title={content.heroTitle}
                subtitle="Get matched with top talent in 24 Hours!"
                variant="solid"
                showLogo={true}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. HIRING STEPS */}
      {content.activeSections?.includes('steps') && !!content.steps?.length && (
        <section className="py-24 bg-gradient-to-br from-white via-sky-50 to-sky-200 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <CommonTitle
              title="How To Hire From Softkingo"
              subtitle="Simple 4-step process to onboard your dream team."
              gradientText="Hire Process"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {content.steps.map((step, index) => (
                <div
                  key={index}
                  className={`px-4 py-6 text-center ${index < content.steps.length - 1 ? 'md:border-r text-sky-900/30' : ''}`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-5xl font-bold text-slate-900/90 mr-2">
                      {step.number ?? index + 1}
                    </span>
                    <Image
                      alt={step.title || `Step ${index + 1}`}
                      src={step.icon || '/images/hire/h1.png'}
                      width={50}
                      height={50}
                      className="drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-slate-900 text-base md:text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <div
                    className="text-slate-900/90 text-xs md:text-sm leading-relaxed rich-text"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. OUR SERVICES */}
      {content.activeSections?.includes('services') && content.services.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
          <CommonTitle
            title={content.servicesTitle || "Developers As A Service"}
            subtitle={content.servicesSubtitle || "Flexible engagement models for every need."}
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {content.services.map((s, i) => (
              <div key={i} className={`p-8 rounded-3xl text-white shadow-xl relative overflow-hidden bg-gradient-to-br ${s.bg || 'from-sky-500 to-blue-600'} hover:scale-105 transition-transform duration-300`}>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="mb-6 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  {getIcon(s.iconKey, 32, "text-white")}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${s.textDark ? 'text-slate-800' : 'text-white'}`}>{s.title}</h3>
                <div
                  className={`text-sm leading-relaxed opacity-90 ${s.textDark ? 'text-slate-800' : 'text-white'} rich-text`}
                  dangerouslySetInnerHTML={{ __html: s.description }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. INDUSTRY SPECIFIC SOLUTIONS */}
      {content.activeSections?.includes('industryHire') && (
        <HireDevelopersPage data={content.industryHire} />
      )}

      {/* 7. MORE SERVICES (Stacking Cards - Swapped Orientation) */}
      {content.activeSections?.includes('moreServices') && content.moreServices.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-white via-sky-50 to-sky-200 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

              {/* LEFT SIDE: STATIC CONTENT (Sticky) */}
              <div className="w-full lg:w-1/2 sticky top-40 h-fit">
                <div className="bg-gradient-to-br from-white to-sky-100 rounded-xl p-10 text-white relative overflow-hidden  shadow-2xl">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-inner">
                      <BsFileEarmarkBarGraph className="w-8 h-8 text-sky-800" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-sky-900">
                      {content.moreServicesTitle || "Services Provided"}
                    </h3>

                    <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
                      {content.moreServicesSubtitle || "We deliver future-proof solutions with quality, security, and performance."}
                    </p>

                    <div className="space-y-4">
                      {["100% Source Code Ownership", "Agile Methodology", "Dedicated Support Team"].map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                          <span className="font-medium text-slate-500">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/10">
                      <p className="text-sm text-slate-400 mb-4 italic">Ready to transform your vision into reality?</p>
                      <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-sky-500 hover:text-white transition-all shadow-lg group">
                        Talk to an Expert <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: SCROLLABLE STACKING CARDS */}
              <div className="w-full lg:w-1/2 flex flex-col gap-8 pb-24">
                {content.moreServices.map((s, i) => (
                  <div
                    key={i}
                    className="sticky bg-white rounded-[1.5rem] p-8 border border-slate-200 shadow-xl transition-all duration-500 hover:scale-[1.02] transform-gpu"
                    style={{
                      top: `${120 + (i * 20)}px`,
                      zIndex: i + 1
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-inner">
                        {getIcon(s.iconKey, 32)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3 text-xl text-sky-900">{s.title}</h4>
                        <div
                          className="text-slate-600 leading-relaxed text-sm md:text-base font-medium rich-text"
                          dangerouslySetInnerHTML={{ __html: s.description }}
                        />

                        <div className="mt-6 flex flex-wrap gap-2">
                          {["Scalable", "Enterprise-Ready", "Secure"].map((tag, ti) => (
                            <span key={ti} className="text-[10px] uppercase font-bold text-sky-600 bg-sky-50/50 px-3 py-1 rounded-full border border-sky-100/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}
      {/* 8. PROFILE SECTION */}
      {content.activeSections?.includes('profile') && content.profileSection.enabled && (
        <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <CommonTitle
                  align="left"
                  title={content.profileSection.title}
                  subtitle={content.profileSection.subtitle}
                />

                <div className="space-y-4 mt-8">
                  {content.profileSection.profileFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all">
                      <BsCheckCircle className="text-sky-500 w-6 h-6 flex-shrink-0" />
                      <span className="font-bold text-lg text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                {/* Image Collage Logic */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <Image src={content.profileSection.images.leftTop || "/images/placeholder.jpg"} width={300} height={400} className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-64" alt="Profile 1" />
                  </div>
                  <div className="space-y-4">
                    <Image src={content.profileSection.images.rightTop || "/images/placeholder.jpg"} width={300} height={250} className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-48" alt="Profile 2" />
                    <Image src={content.profileSection.images.rightBottom || "/images/placeholder.jpg"} width={300} height={300} className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-56" alt="Profile 3" />
                  </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-sky-100 to-transparent rounded-full opacity-50 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9 PORTFOLIO SECTION */}
      {content.activeSections?.includes('portfolio') && (
        <DynamicPortfolioCard
          category={content.portfolioCategory || ""}
          portfolioType="app"
          title={content.portfolioTitle}
          subtitle={content.portfolioSubtitle}
        />
      )}

      {/* 10 TECH STACK */}
      {content.activeSections?.includes('techStack') && (
        <CloneTechStack data={content.techStack} />
      )}

      {/* 11. WORKING MODELS */}
      {content.activeSections?.includes('models') && content.modelsSection.enabled && (
        <section className="py-24 px-6 bg-gradient-to-br from-white via-sky-50 to-sky-200">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              title={content.modelsSection.title}
              subtitle={content.modelsSection.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {content.modelsSection.models.map((m, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden ">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>

                  <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors relative z-10">
                    {getIcon(m.iconKey, 32)}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{m.title}</h3>
                  <div
                    className="text-sm text-slate-600 mb-8 min-h-[60px] relative z-10 leading-relaxed rich-text"
                    dangerouslySetInnerHTML={{ __html: m.description }}
                  />

                  <ul className="space-y-4 mb-8 relative z-10">
                    {(m.features || []).map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="block w-full py-4 text-center bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors relative z-10">
                    {m.buttonText || "Select Model"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12 PRICING PLANS */}
      {content.activeSections?.includes('pricing') && content.pricingSection.enabled && (
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <CommonTitle
              title={content.pricingSection.title}
              subtitle={content.pricingSection.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {content.pricingSection.plans.map((plan, i) => (
                <div key={i} className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${plan.featured ? 'bg-slate-900 text-white shadow-2xl scale-105 border-slate-900' : 'bg-white text-slate-900 border-slate-200 hover:border-sky-300 hover:shadow-xl'}`}>
                  {plan.featured && (
                    <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl">MOST POPULAR</div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className={`text-xs mb-8 ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>{plan.subtitle}</p>

                  <div className="mb-8 pb-8 border-b border-white/10">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`text-sm ml-2 ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>/{plan.priceNote}</span>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features?.map((f, fi) => (
                      <div key={fi} className="flex gap-3 text-sm items-start">
                        <BsCheckCircle className={`flex-shrink-0 w-5 h-5 mt-0.5 ${plan.featured ? 'text-sky-400' : 'text-sky-600'}`} />
                        <span className={plan.featured ? 'text-slate-300' : 'text-slate-700'}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className={`block w-full py-4 rounded-xl text-center font-bold transition-all shadow-lg ${plan.featured ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    {plan.buttonText || "Get Started"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13 COMPARISON TABLE */}
      {content.activeSections?.includes('comparison') && content.comparisonSection.enabled && (
        <section className="py-24 px-6 bg-gradient-to-br from-white via-sky-50 to-sky-200">
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <CommonTitle title={content.comparisonSection.title} />

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mt-12">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="p-6 text-left text-slate-500 font-medium border-b border-slate-100 bg-slate-50/50">Features</th>
                    <th className="p-6 text-center text-sky-700 font-black border-b border-sky-100 bg-sky-50 text-xl w-1/4">Softkingo</th>
                    <th className="p-6 text-center text-slate-600 font-bold border-b border-slate-100 w-1/4">Freelancers</th>
                    <th className="p-6 text-center text-slate-600 font-bold border-b border-slate-100 w-1/4">Agencies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {content.comparisonSection.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-slate-800 pl-8">{row.category}</td>
                      <td className="p-5 text-center bg-sky-50/30 border-x border-sky-100">
                        <div className="flex items-center justify-center gap-2 font-bold text-slate-900">
                          {getIcon(row.softkingo?.iconKey, 20, "text-emerald-500")}
                          {row.softkingo?.text}
                        </div>
                      </td>
                      <td className="p-5 text-center text-slate-500">
                        <div className="flex items-center justify-center gap-2">
                          {getIcon(row.recruiting?.iconKey, 18, "text-rose-400")}
                          {row.recruiting?.text}
                        </div>
                      </td>
                      <td className="p-5 text-center text-slate-500">
                        <div className="flex items-center justify-center gap-2">
                          {getIcon(row.outsourcing?.iconKey, 18, "text-amber-400")}
                          {row.outsourcing?.text}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {/* 14 FOOTER CTA */}
      {content.activeSections?.includes('ctaBanner') && (
        <ConsultationCTA
          title={content.ctaBanner?.title}
          subtitle={content.ctaBanner?.subtitle}
          buttonLabel={content.ctaBanner?.buttonText}
          imageSrc={content.ctaBanner?.image}
          href={content.ctaBanner?.buttonHref}
        />
      )}
      {/* 15 BLOG SECTION */}
      {content.activeSections?.includes('blogs') && (
        <BlogSection
          category={content.blogCategory || ""}
          title={content.blogTitle || "Our Latest Blogs"}
          subtitle={content.blogSubtitle || "Explore our latest insights, product lessons, and engineering best practices."}
        />
      )}

      {/* 16 FAQ SECTION */}
      {content.activeSections?.includes('faq') && (
        <FAQAccordion data={content.faq} />
      )}

      {/* 17 INQUIRY SECTION */}
      {content.activeSections?.includes('inquiry') && (
        <InquirySection
          tagline={content.inquiry?.tagline}
          title={content.inquiry?.title}
          subtitle={content.inquiry?.subtitle}
        />
      )}

    </main>
  );
}