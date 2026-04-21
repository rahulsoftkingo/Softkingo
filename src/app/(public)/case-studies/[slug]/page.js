// app/(public)/case-studies/[slug]/page.jsx
import prisma from '@/lib/prisma';
import BlogSection from '@/components/common/BlogSection';
import InquirySection from '@/components/footer/InquirySection';

// Modular Components
import Hero from './_components/Hero';
import Stats from './_components/Stats';
import Branding from './_components/Branding';
import TechStack from './_components/TechStack';
import FeatureSection from './_components/FeatureSection';
import Results from './_components/Results';
import FindYourApp from './_components/FindYourApp';
import AppScreensShowcase from './_components/AppScreensShowcase';
import ChallengesSolutions from './_components/ChallengesSolutions';
import TestimonialSection from './_components/TestimonialSection';

// ---------- helpers ----------
function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch {
    return fallback;
  }
}

// ========== DATA FETCH (Prisma) ==========
async function getCaseStudy(slug) {
  const row = await prisma.caseStudy.findUnique({
    where: { slug },
    include: { portfolioProjects: true },
  });

  if (!row) return null;

  const branding = parseJson(
    row.brandingJson,
    {
      primaryColor: '#0EA5E9',
      secondaryColor: '#0B3250',
      accentColor: '#22C55E',
      primaryFont: 'DM Sans',
      colors: [
        { name: 'Sky Blue', hex: '#0EA5E9' },
        { name: 'Midnight', hex: '#0B3250' },
        { name: 'Emerald', hex: '#22C55E' },
      ],
    }
  );

  const team = parseJson(
    row.teamJson,
    {
      size: '06 People',
      roles: 'PM / TL / Devs / Designers / QA',
      timeline: '60 Days',
      duration: 'Design + Development',
    }
  );

  const client = parseJson(
    row.clientJson,
    {
      name: 'Client Name',
      subtitle: 'Entrepreneur',
      location: 'City, Country',
      industry: 'Industry',
      avatar: '/images/client-avatar.png',
      review: 'Working with Softkingo was an incredible experience. They transformed our vision into a high-performing reality with exceptional attention to detail.',
      rating: 5,
      designation: 'CEO & Founder'
    }
  );

  const technologies = parseJson(
    row.technologiesJson,
    {
      backgroundImage: '/images/tech-bg.jpg',
      items: [],
    }
  );

  const overview = parseJson(
    row.overviewJson,
    {
      description: '',
      mockup: '/images/case-studies/overview-phone.png',
    }
  );

  const requirements = parseJson(
    row.requirementsJson,
    {
      items: [],
      mockup: '/images/case-studies/requirements-phone.png',
    }
  );

  const goals = parseJson(
    row.goalsJson,
    {
      backgroundImage: '/images/case-studies/goals-bg.jpg',
      items: [],
    }
  );

  const challenges = parseJson(
    row.challengesJson,
    {
      challenge: '',
      solution: '',
    }
  );

  const appScreens = parseJson(
    row.appScreensJson,
    {
      title: 'App screens',
      categories: [],
    }
  );

  const results = parseJson(row.resultsJson, []);

  const findYourApp = parseJson(
    row.findYourAppJson,
    {
      title: 'Want to build an app like this?',
      description: '',
      mockup: null,
      ctaText: 'Get Started Now',
      ctaUrl: '/contact',
      clientCountText: 'Join 100+ Happy Clients',
      showClientStats: true,
      blogTitle: 'Our Latest Blogs',
      blogSubtitle: 'Explore our latest insights, product lessons, and engineering best practices.',
      blogCategory: '',
    }
  );

  return {
    id: row.id,
    slug: row.slug,
    logo: row.logo || '/images/case-studies/logo.png',
    title: row.title,
    subtitle: row.subtitle || '',
    hero: {
      backgroundImage:
        row.heroBgImage || '/images/case-studies/hero-bg.png',
      circleImage: row.heroCircle || '/images/case-studies/hero-circle.png',
      mockups: [
        row.heroMockups || '/images/case-studies/screen1.png',
      ],
    },
    downloads: parseJson(row.portfolioProjects?.[0]?.badgesJson, {
      googlePlay: {
        url: '#',
        image: '/images/badges/google-play.png',
      },
      appStore: {
        url: '#',
        image: '/images/badges/app-store.png',
      },
      web: {
        url: '#',
        image: '/images/badges/web-badge.png',
      },
    }),
    branding,
    team,
    client,
    technologies,
    overview,
    requirements,
    goals,
    challenges,
    appScreens,
    results,
    findYourApp,
  };
}

// =================== PAGE ===================
export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Invalid case study URL.</p>
      </main>
    );
  }

  const data = await getCaseStudy(slug);
  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Case study not found.</p>
      </main>
    );
  }

  const { branding } = data;

  return (
    <>
      <style global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: '${branding.primaryFont}', system-ui, sans-serif; }
      `}</style>

      <main className="w-full bg-white overflow-hidden">
        <Hero data={data} />

        <Stats data={data} />

        <Branding data={data} />

        <TechStack data={data} />

        <FeatureSection
          title="Project Overview"
          description={data.overview.description}
          mockup={data.overview.mockup}
          branding={branding}
          imagePosition="right"
        />

        <FeatureSection
          title="Project Requirements"
          description="The client approached Softkingo with the following key goals:"
          listItems={data.requirements.items}
          mockup={data.requirements.mockup}
          branding={branding}
          imagePosition="left"
          isDark={false}
        />

        <FeatureSection
          title="Goals & Objectives"
          listItems={data.goals.items}
          bgImage={data.goals.backgroundImage}
          branding={branding}
          imagePosition="right"
          isDark={false}
        />

        <ChallengesSolutions
          data={data}
          branding={branding}
        />

        <AppScreensShowcase data={data.appScreens} branding={branding} />

        <Results results={data.results} branding={branding} />

        <FindYourApp data={data} branding={branding} />

        <TestimonialSection
          data={data.client}
          branding={branding}
        />

        <BlogSection
          category={data.findYourApp.blogCategory || ""}
          title={data.findYourApp.blogTitle || "Our Latest Blogs"}
          subtitle={data.findYourApp.blogSubtitle || "Explore our latest insights, product lessons, and engineering best practices."}
        />
        <InquirySection />
      </main>
    </>
  );
}

// =================== SEO ===================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return {
      title: 'Case Study',
      description: 'Case study',
    };
  }

  const data = await getCaseStudy(slug);
  if (!data) {
    return {
      title: 'Case study not found',
      description: 'This case study does not exist.',
    };
  }
  return {
    title: `${data.title} - Case Study`,
    description: data.subtitle,
    openGraph: {
      title: data.title,
      description: data.subtitle,
      images: [data.hero.backgroundImage],
    },
  };
}
