


// src/app/(public)/hire/[slug]/page.js

import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

import LeadForm from '@/components/public/LeadForm';
import FooterForm from '@/components/footer/InquirySection';

import HireDevelopersPage from './SelectDeveloper';
import TechStack from './TechStack';

import { BsCheckCircle, BsTransparency, BsFileEarmarkBarGraph } from 'react-icons/bs';
import { GiBullseye } from 'react-icons/gi';
import { CiClock1, CiTimer } from 'react-icons/ci';
import { TbCalendarClock } from 'react-icons/tb';
import {
  FaComments,
  FaLightbulb,
  FaRocket,
  FaSearch,
  FaThumbsUp,
  FaUser,
  FaUsers,
} from 'react-icons/fa';

function parseJsonSafe(str) {
  if (!str) return {};
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}

function getFeatureIcon(iconKey) {
  const map = {
    FaUser: <FaUser />,
    FaUsers: <FaUsers />,
    FaRocket: <FaRocket />,
    FaLightbulb: <FaLightbulb />,
    FaComments: <FaComments />,
    FaSearch: <FaSearch />,
  };
  return map[iconKey] || <FaUser />;
}

function getServiceIcon(iconKey, size = 64) {
  const map = {
    BsTransparency: <BsTransparency size={size} />,
    BsFileEarmarkBarGraph: <BsFileEarmarkBarGraph size={size} />,
    GiBullseye: <GiBullseye size={size} />,
  };
  return map[iconKey] || <BsTransparency size={size} />;
}

function getModelIcon(iconKey) {
  const map = {
    CiClock1: <CiClock1 className="w-10 h-10 text-sky-300" />,
    TbCalendarClock: <TbCalendarClock className="w-10 h-10 text-sky-200" />,
    CiTimer: <CiTimer className="w-10 h-10 text-slate-200" />,
  };
  return map[iconKey] || <CiClock1 className="w-10 h-10 text-sky-300" />;
}

function normalizeHireContent(page) {
  const c = parseJsonSafe(page?.contentJson);

  // ---------- basics ----------
  const heroBg = c.heroBg || '/images/hire/hire1.png';
  const heroTitle = c.heroTitle || page?.title || 'Hire Developers';
  const heroSubtitle =
    c.heroSubtitle ||
    page?.excerpt ||
    'Build your dream team with top 1% tech talent perfectly aligned to your business needs.';
  const badgeText = c.badgeText || 'Hire Page';
  const metrics = {
    avgTime: c.metrics?.avgTime || '48 Hours',
    network: c.metrics?.network || '100+ Experts',
    rating: c.metrics?.rating || '4.9/5',
  };

  // ---------- sections: about/features/benefits/steps ----------
  const aboutTitle = c.aboutTitle || page?.title || heroTitle;
  const aboutSubtitle =
    c.aboutSubtitle ||
    page?.excerpt ||
    'Softkingo provides experienced developers to build highly interactive web and mobile apps with modern UI/UX.';
  const features = Array.isArray(c.features) ? c.features : [];
  const benefits = Array.isArray(c.benefits) ? c.benefits : [];
  const steps = Array.isArray(c.steps) ? c.steps : [];

  // ---------- services cards ----------
  const services = Array.isArray(c.services)
    ? c.services
    : [
        {
          title: 'Transparent',
          iconKey: 'BsTransparency',
          description:
            'Set the rules for your journey by negotiating with us directly. Transparency with clients is our motto.',
          bg: 'from-sky-500 to-sky-600',
          textDark: false,
        },
        {
          title: 'Productive',
          iconKey: 'BsFileEarmarkBarGraph',
          description:
            'Enhance your team with distractions-spared developers and bring strong waves of productivity.',
          bg: 'from-emerald-500 to-emerald-600',
          textDark: false,
        },
        {
          title: 'To the point',
          iconKey: 'GiBullseye',
          description:
            'Find the perfect remote developers for the busy market. Just tailored services to your needs.',
          bg: 'from-slate-100 to-slate-200',
          textDark: true,
        },
      ];

  // ---------- services provided ----------
  const moreServices = Array.isArray(c.moreServices)
    ? c.moreServices
    : [
        {
          title: 'Front-end web development',
          icon: '💻',
          description:
            'Our front-end developers can swear by user-friendly and seamless navigation throughout the website. A complete understanding of the web technologies like HTML, CSS and Javascript can craft such websites.',
        },
      ];

  // ---------- detailed profile section ----------
  const profileSection = c.profileSection || {};
  const profileFeatures = Array.isArray(profileSection.profileFeatures)
    ? profileSection.profileFeatures
    : ['Professional Summary', 'Major Projects', 'Work History', 'Intro Video', 'Verified Profile'];

  const profileImages = {
    leftTop: profileSection.images?.leftTop || '/images/hire/h7.png',
    rightTop: profileSection.images?.rightTop || '/images/hire/h6.png',
    rightBottom: profileSection.images?.rightBottom || '/images/hire/h5.png',
  };

  // ---------- CTA banner ----------
  const ctaBanner = c.ctaBanner || {
    enabled: true,
    title: 'Book A FREE Consultation With Us',
    subtitle:
      "Share your project idea and we'll provide a free consultation on how we can turn it into a reality and build an amazing digital product.",
    buttonText: 'Book a Free Demo',
    buttonHref: '#lead-form',
    image: '/images/consultant.png',
  };

  // ---------- comparison table ----------
  const comparisonSection = c.comparisonSection || {};
  const comparisonTitle =
    comparisonSection.title || 'Why Softkingo is the better choice for Tech companies';
  const comparisonColumns = comparisonSection.columns || [
    { key: 'softkingo', label: 'Softkingo', headerClass: 'text-blue-600 font-bold' },
    { key: 'recruiting', label: 'Recruiting Agencies', headerClass: 'text-gray-600 font-semibold' },
    { key: 'outsourcing', label: 'Outsourcing', headerClass: 'text-gray-600 font-semibold' },
  ];

  const comparisonRows = Array.isArray(comparisonSection.rows)
    ? comparisonSection.rows
    : [
        {
          category: 'Top Talents',
          softkingo: { icon: '✅', text: 'Startup-experienced, vetted', highlight: true },
          recruiting: { icon: '❌', text: 'No vetting' },
          outsourcing: { icon: '⚠️', text: 'Generalist, mixed expertise' },
        },
      ];

  // ---------- working models ----------
  const modelsSection = c.modelsSection || {};
  const modelsTitle = modelsSection.title || 'Our Flexible Working Model';
  const modelsSubtitle =
    modelsSection.subtitle ||
    'We make hiring dedicated developers easy with flexible models tailored to your needs.';
  const models = Array.isArray(modelsSection.models)
    ? modelsSection.models
    : [
        {
          title: 'Full-time',
          iconKey: 'CiClock1',
          description:
            'Hire dedicated developers to work exclusively on your project. Ideal for long-term and large-scale development needs.',
          features: ['8 hrs/day', 'Monthly billing', 'Team integration'],
          buttonText: 'Hire Now',
        },
      ];

  // ---------- why hire (benefits grid) ----------
  const whyHireSection = c.whyHireSection || {};
  const whyHireTitle =
    whyHireSection.title || 'Why You Should Hire Dedicated Developers From Softkingo';
  const whyHireItems = Array.isArray(whyHireSection.items)
    ? whyHireSection.items
    : [
        {
          title: 'Experienced & Skilled Resources',
          desc: 'You can hire a team of experienced professionals who have great domain expertise.',
        },
      ];

  // ---------- business types section ----------
  const businessTypesSection = c.businessTypesSection || {};
  const businessTypesTitle =
    businessTypesSection.title ||
    'Hire Front-end Developers Who Are Passionate to Turn Business Idea into A Reality';
  const businessTypesSubtitle =
    businessTypesSection.subtitle ||
    'Hire Futuristic Front-end Developers to Access Our Technical Proficiency.';
  const businessTypes = Array.isArray(businessTypesSection.items)
    ? businessTypesSection.items
    : [];

  // ---------- pricing plans ----------
  const pricingSection = c.pricingSection || {};
  const pricingTitle = pricingSection.title || 'Pricing Plans';
  const pricingSubtitle =
    pricingSection.subtitle || 'Our pricing plans, along with a free trial of 2 weeks';
  const pricingPlans = Array.isArray(pricingSection.plans) ? pricingSection.plans : [];

  // ---------- footer form ----------
  const footerFormSection = c.footerFormSection || { enabled: true };

  return {
    heroBg,
    heroTitle,
    heroSubtitle,
    badgeText,
    metrics,

    aboutTitle,
    aboutSubtitle,
    features,
    benefits,
    steps,

    services,
    moreServices,

    profileSection: {
      enabled: profileSection.enabled ?? true,
      title:
        profileSection.title ||
        'Detailed profile for Confident Hiring Decisions',
      subtitle:
        profileSection.subtitle ||
        'Each candidate profile includes comprehensive details to ensure you make the right choice.',
      profileFeatures,
      images: profileImages,
    },

    ctaBanner,
    comparisonSection: {
      enabled: comparisonSection.enabled ?? true,
      title: comparisonTitle,
      columns: comparisonColumns,
      rows: comparisonRows,
    },

    modelsSection: {
      enabled: modelsSection.enabled ?? true,
      title: modelsTitle,
      subtitle: modelsSubtitle,
      models,
    },

    whyHireSection: {
      enabled: whyHireSection.enabled ?? true,
      title: whyHireTitle,
      items: whyHireItems,
    },

    businessTypesSection: {
      enabled: businessTypesSection.enabled ?? true,
      title: businessTypesTitle,
      subtitle: businessTypesSubtitle,
      items: businessTypes,
    },

    pricingSection: {
      enabled: pricingSection.enabled ?? true,
      title: pricingTitle,
      subtitle: pricingSubtitle,
      plans: pricingPlans,
    },

    footerFormSection,
  };
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // Next 15+ safe [file:171]

  const page = await prisma.page.findFirst({
    where: { slug, status: 'published', type: 'hire' },
  });

  if (!page) return { title: 'Hire Developers' };

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt || undefined,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || page.excerpt || undefined,
      images: page.seoImage ? [page.seoImage] : [],
    },
  };
}

export default async function HireSlugPage({ params }) {
  const { slug } = await params; // Next 15+ safe [file:171]

  const page = await prisma.page.findFirst({
    where: { slug, status: 'published', type: 'hire' },
  });

  if (!page) notFound();

  const content = normalizeHireContent(page);

  return (
    <main className="relative bg-white overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center"
        style={{ backgroundImage: `url('${content.heroBg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div>
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/hire" className="hover:text-cyan-400 transition-colors">
                Hire
              </Link>
              <span>›</span>
              <span className="text-cyan-400 font-medium">{content.heroTitle}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {content.heroTitle}
            </h1>

            <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90">
              {content.heroSubtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80">
              <p className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 px-4 py-1.5 rounded-full border border-sky-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {content.badgeText}
              </p>

              <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
                Avg Hiring: <span className="text-white font-semibold">{content.metrics.avgTime}</span>
              </p>

              <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
                Network: <span className="text-white font-semibold">{content.metrics.network}</span>
              </p>

              <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
                Rating:{' '}
                <span className="text-white font-semibold flex items-center gap-1">
                  {content.metrics.rating} <FaThumbsUp className="text-emerald-400" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {!!content.features?.length && (
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-16 relative z-10">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
              {content.features.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-5 border-t md:border-t-0 md:border-r last:border-r-0 border-slate-100/70 hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-xl text-sky-600">
                    {getFeatureIcon(f.iconKey)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT + BENEFITS + FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="lead-form">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_minmax(320px,380px)] gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {content.aboutTitle}
            </h2>
            <p className="text-slate-600 mb-4 text-sm md:text-base leading-relaxed">
              {content.aboutSubtitle}
            </p>

            {!!content.benefits?.length && (
              <div className="space-y-3">
                {content.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">
                      <BsCheckCircle className="w-4 h-4 text-sky-600" />
                    </span>
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <LeadForm
              formType="hire"
              formKey="hire"
              serviceName="Hire Developers"
              title={content.heroTitle}
              subtitle="Get matched with top talent in 24 Hours! "
              variant="solid"
              showLogo={true}
              showCompany={false}
              showBudget={false}
              showAttachment={false}
              showNDA={false}
            />
          </div>
        </div>
      </section>

      {/* STEPS */}
      {!!content.steps?.length && (
        <section className="bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-10">
              How To Hire From Softkingo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {content.steps.map((step, index) => (
                <div
                  key={index}
                  className={`px-4 py-6 text-center ${
                    index < content.steps.length - 1 ? 'md:border-r border-white/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-5xl font-bold text-white/90 mr-2">
                      {step.number ?? index + 1}
                    </span>
                    <Image
                      alt={step.title || `Step ${index + 1}`}
                      src={step.icon || '/images/hire/h1.png'}
                      width={50}
                      height={50}
                      className="drop-shadow-md"
                    />
                  </div>
                  <h3 className="text-white text-base md:text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES CARDS */}
      {!!content.services?.length && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-2 border-dashed border-sky-300 rounded-2xl p-6 md:p-10 bg-sky-50/40">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
              Developers As A Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.services.map((s, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-7 flex flex-col items-center text-center shadow-lg bg-gradient-to-br ${s.bg} ${
                    s.textDark ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                  <div className="mb-5 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white/15">
                      {getServiceIcon(s.iconKey, 64)}
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${s.textDark ? 'text-slate-700' : 'text-white/90'}`}>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industry component (keep as is) */}
      <HireDevelopersPage />

      {/* SERVICES PROVIDED */}
      {!!content.moreServices?.length && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 md:p-10 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Services Provided
                </h2>
                <p className="text-slate-600 mb-6 text-sm">
                  Services that our resource will provide to your business
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.moreServices.map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sky-500 mt-0.5">▶</span>
                      <span className="text-slate-700 text-sm">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 h-[420px] overflow-y-auto pr-1">
                {content.moreServices.map((s, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-xl">
                        {s.icon || '✨'}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-1">
                          {s.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* DETAILED PROFILE SECTION */}
      {content.profileSection.enabled && (
        <section className="bg-gradient-to-r from-sky-400 to-sky-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {content.profileSection.title}
              </h2>
              <p className="text-white/90 text-base md:text-lg mb-8 max-w-3xl">
                {content.profileSection.subtitle}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={content.profileSection.images.leftTop}
                        width={1000}
                        height={1000}
                        alt="Profile Preview"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col gap-4">
                    <div className="overflow-hidden rounded-lg flex-1">
                      <Image
                        src={content.profileSection.images.rightTop}
                        width={1000}
                        height={1000}
                        alt="Chart Preview"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 rounded-lg overflow-hidden">
                      <Image
                        src={content.profileSection.images.rightBottom}
                        width={1000}
                        height={1000}
                        alt="Professional Summary"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
                  <div className="space-y-4">
                    {(content.profileSection.profileFeatures || []).map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-lg p-4 cursor-pointer"
                      >
                        <h3 className="text-white text-base md:text-lg font-semibold">
                          {feature}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      {content.ctaBanner?.enabled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="text-white z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {content.ctaBanner.title}
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl">
                  {content.ctaBanner.subtitle}
                </p>

                <Link
                  href={content.ctaBanner.buttonHref || '#lead-form'}
                  className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
                >
                  {content.ctaBanner.buttonText || 'Book a Free Demo'}
                </Link>
              </div>

              {!!content.ctaBanner.image && (
                <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 hidden md:block">
                  <Image
                    src={content.ctaBanner.image}
                    alt="Consultant"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {content.comparisonSection.enabled && (
        <section className="bg-gradient-to-r from-sky-200 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              {content.comparisonSection.title}
            </h2>

            <div className="bg-white overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-4 gap-4 bg-gray-50 p-6 border-b-2 border-gray-200">
                  <div className="font-semibold text-gray-700">Category</div>
                  <div className="text-center font-bold text-blue-600">
                    {content.comparisonSection.columns?.[0]?.label || 'Softkingo'}
                  </div>
                  <div className="text-center font-semibold text-gray-600">
                    {content.comparisonSection.columns?.[1]?.label || 'Recruiting Agencies'}
                  </div>
                  <div className="text-center font-semibold text-gray-600">
                    {content.comparisonSection.columns?.[2]?.label || 'Outsourcing'}
                  </div>
                </div>

                {content.comparisonSection.rows.map((row, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-4 gap-4 p-4 items-center ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <div className="font-medium text-gray-700 text-sm md:text-base">
                      {row.category}
                    </div>

                    <div className={`text-center p-2 rounded-lg ${
                      row.softkingo?.highlight ? 'bg-blue-50 border-2 border-blue-200' : ''
                    }`}>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                        {row.softkingo?.icon && (
                          <span className="text-xl text-green-500">{row.softkingo.icon}</span>
                        )}
                        <span className="text-sm md:text-base text-gray-800 font-medium">
                          {row.softkingo?.text}
                        </span>
                      </div>
                    </div>

                    <div className="text-center p-4">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                        {row.recruiting?.icon && (
                          <span className="text-xl text-red-500">{row.recruiting.icon}</span>
                        )}
                        <span className="text-sm md:text-base text-gray-600">
                          {row.recruiting?.text}
                        </span>
                      </div>
                    </div>

                    <div className="text-center p-4">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                        {row.outsourcing?.icon && (
                          <span className="text-xl">{row.outsourcing.icon}</span>
                        )}
                        <span className="text-sm md:text-base text-gray-600">
                          {row.outsourcing?.text}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>
      )}

      {/* TECH STACK (component) */}
      <TechStack />

      {/* WORKING MODELS */}
      {content.modelsSection.enabled && (
        <section className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {content.modelsSection.title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                {content.modelsSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.modelsSection.models || []).map((m, i) => (
                <div
                  key={i}
                  className="bg-slate-900 rounded-3xl p-7 flex flex-col text-white shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-white/10 p-3 rounded-full">
                      {getModelIcon(m.iconKey)}
                    </div>
                    <h3 className="text-xl font-bold">{m.title}</h3>
                  </div>

                  <p className="text-slate-300 text-xs mb-6 border-b border-slate-700 pb-4 leading-relaxed">
                    {m.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {(m.features || []).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs">
                        <div className="bg-white rounded-full p-0.5">
                          <BsCheckCircle className="w-3 h-3 text-slate-900" />
                        </div>
                        <span className="text-slate-100">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-auto w-full py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold">
                    {m.buttonText || 'Hire Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY HIRE */}
      {content.whyHireSection.enabled && (
        <section className="relative bg-sky-500 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center md:text-left">
                {content.whyHireSection.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {(content.whyHireSection.items || []).map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <BsCheckCircle className="w-5 h-5 text-sky-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* BUSINESS TYPES */}
      {content.businessTypesSection.enabled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <div className="mb-12 max-w-5xl mx-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {content.businessTypesSection.title}
            </h2>
            <p className="text-slate-600 text-lg md:text-xl">
              {content.businessTypesSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.businessTypesSection.items || []).map((type, idx) => (
              <div
                key={idx}
                className="group flex flex-col relative bg-slate-50 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-96">
                  <div className="absolute top-0 left-0 w-full p-8 z-20 text-white">
                    <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRICING PLANS */}
      {content.pricingSection.enabled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {content.pricingSection.title}
            </h2>
            <p className="text-slate-600 text-lg">
              {content.pricingSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {(content.pricingSection.plans || []).map((plan, idx) => (
              <div
                key={idx}
                className={`${plan.cardClass || 'bg-slate-900'} rounded-3xl p-4 md:p-8 text-white text-center flex flex-col h-full shadow-xl hover:scale-105 transition-transform duration-300 ${
                  plan.featured ? 'md:scale-105 z-10 border-4 border-white/20 relative overflow-hidden' : ''
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-6 left-12 -translate-x-12 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 text-sm font-medium">
                    Recommended <FaThumbsUp size={16} />
                  </div>
                )}

                <div className={plan.featured ? 'mt-12' : ''}>
                  <h3 className="text-3xl font-bold mb-2 leading-tight">
                    {plan.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-8 leading-relaxed px-2">
                    {plan.subtitle}
                  </p>

                  <div className="mb-8">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="block text-white/80 mt-1 text-sm">{plan.priceNote}</span>
                  </div>

                  <div className="bg-black/10 rounded-2xl p-4 md:p-6 text-left space-y-3 mb-8 flex-grow text-sm">
                    {(plan.features || []).map((f, i) => (
                      <p key={i}>{f}</p>
                    ))}
                  </div>

                  <button className="w-full py-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white font-semibold transition-colors">
                    {plan.buttonText || 'Hire Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER FORM */}
      {content.footerFormSection?.enabled !== false && <FooterForm />}
    </main>
  );
}
