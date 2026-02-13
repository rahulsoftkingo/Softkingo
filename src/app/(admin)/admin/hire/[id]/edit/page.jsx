
// app/(admin)/admin/hire/[id]/edit/page.jsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditHireForm from './EditHireForm';

function parseJsonSafe(str) {
  if (!str) return {};
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}

export default async function EditHirePage({ params }) {
  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id: Number(id) || 0 },
  });

  if (!page || page.type !== 'hire') notFound();

  const content = parseJsonSafe(page.contentJson);

  const initialData = {
    id: page.id,
    title: page.title || '',
    slug: page.slug || '',
    key: page.key || '',
    excerpt: page.excerpt || '',
    status: page.status || 'draft',
    seoTitle: page.seoTitle || '',
    seoDescription: page.seoDescription || '',
    seoImage: page.seoImage || '',

    heroBg: content.heroBg || '/images/hire/hire1.png',
    heroTitle: content.heroTitle || page.title || '',
    heroSubtitle: content.heroSubtitle || '',
    badgeText: content.badgeText || 'Hire Page',
    metrics: {
      avgTime: content.metrics?.avgTime || '48 Hours',
      network: content.metrics?.network || '100+ Experts',
      rating: content.metrics?.rating || '4.9/5',
    },

    aboutTitle: content.aboutTitle || page.title || '',
    aboutSubtitle:
      content.aboutSubtitle ||
      page.excerpt ||
      'Softkingo provides experienced developers to build modern UI/UX driven apps.',

    features: Array.isArray(content.features) ? content.features : [],
    benefits: Array.isArray(content.benefits) ? content.benefits : [],
    steps: Array.isArray(content.steps) ? content.steps : [],

    services: Array.isArray(content.services) ? content.services : [],
    moreServices: Array.isArray(content.moreServices) ? content.moreServices : [],

    profileSection: {
      enabled: content.profileSection?.enabled ?? true,
      title:
        content.profileSection?.title ||
        'Detailed profile for Confident Hiring Decisions',
      subtitle:
        content.profileSection?.subtitle ||
        'Each candidate profile includes comprehensive details to ensure you make the right choice.',
      profileFeatures:
        Array.isArray(content.profileSection?.profileFeatures)
          ? content.profileSection.profileFeatures
          : ['Professional Summary', 'Major Projects', 'Work History', 'Intro Video', 'Verified Profile'],
      images: {
        leftTop:
          content.profileSection?.images?.leftTop || '/images/hire/h7.png',
        rightTop:
          content.profileSection?.images?.rightTop || '/images/hire/h6.png',
        rightBottom:
          content.profileSection?.images?.rightBottom || '/images/hire/h5.png',
      },
    },

    ctaBanner: {
      enabled: content.ctaBanner?.enabled ?? true,
      title:
        content.ctaBanner?.title ||
        'Book A FREE Consultation With Us',
      subtitle:
        content.ctaBanner?.subtitle ||
        "Share your project idea and we'll provide a free consultation on how we can turn it into a reality.",
      buttonText: content.ctaBanner?.buttonText || 'Book a Free Demo',
      buttonHref: content.ctaBanner?.buttonHref || '#lead-form',
      image: content.ctaBanner?.image || '/images/consultant.png',
    },

    comparisonSection: {
      enabled: content.comparisonSection?.enabled ?? true,
      title:
        content.comparisonSection?.title ||
        'Why Softkingo is the better choice for Tech companies',
      columns:
        Array.isArray(content.comparisonSection?.columns) &&
        content.comparisonSection.columns.length
          ? content.comparisonSection.columns
          : [
              { key: 'softkingo', label: 'Softkingo' },
              { key: 'recruiting', label: 'Recruiting Agencies' },
              { key: 'outsourcing', label: 'Outsourcing' },
            ],
      rows: Array.isArray(content.comparisonSection?.rows)
        ? content.comparisonSection.rows
        : [],
    },

    modelsSection: {
      enabled: content.modelsSection?.enabled ?? true,
      title:
        content.modelsSection?.title || 'Our Flexible Working Model',
      subtitle:
        content.modelsSection?.subtitle ||
        'We make hiring dedicated developers easy with flexible models tailored to your needs.',
      models: Array.isArray(content.modelsSection?.models)
        ? content.modelsSection.models
        : [],
    },

    whyHireSection: {
      enabled: content.whyHireSection?.enabled ?? true,
      title:
        content.whyHireSection?.title ||
        'Why You Should Hire Dedicated Developers From Softkingo',
      items: Array.isArray(content.whyHireSection?.items)
        ? content.whyHireSection.items
        : [],
    },

    businessTypesSection: {
      enabled: content.businessTypesSection?.enabled ?? true,
      title:
        content.businessTypesSection?.title ||
        'Hire Front-end Developers Who Are Passionate to Turn Business Idea into A Reality',
      subtitle:
        content.businessTypesSection?.subtitle ||
        'Hire Futuristic Front-end Developers to Access Our Technical Proficiency.',
      items: Array.isArray(content.businessTypesSection?.items)
        ? content.businessTypesSection.items
        : [],
    },

    pricingSection: {
      enabled: content.pricingSection?.enabled ?? true,
      title:
        content.pricingSection?.title || 'Pricing Plans',
      subtitle:
        content.pricingSection?.subtitle ||
        'Our pricing plans, along with a free trial of 2 weeks',
      plans: Array.isArray(content.pricingSection?.plans)
        ? content.pricingSection.plans
        : [],
    },

    footerFormSection: {
      enabled: content.footerFormSection?.enabled ?? true,
    },
  };

  return <EditHireForm initialData={initialData} />;
}
