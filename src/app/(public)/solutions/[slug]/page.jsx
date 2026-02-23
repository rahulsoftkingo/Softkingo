import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db'; // Database connection

// --- SOLUTIONS COMPONENTS (Existing) ---
import SolutionsHero from '@/components/public/solutions/SolutionsHero';
import SolutionsStats from '@/components/public/solutions/SolutionsStats';
import SolutionsContentSplit from '@/components/public/solutions/SolutionsContentSplit';
import SolutionsFeatureGrid from '@/components/public/solutions/SolutionsFeatureGrid';
import AwardsSection from '@/components/public/solutions/AwardsSection';
import SolutionsWhyNeed from '@/components/public/solutions/SolutionsWhyNeed';
import SolutionsServicesList from '@/components/public/solutions/SolutionsServicesList';
import SolutionsAppModule from '@/components/public/solutions/SolutionsAppModule';
import SolutionsAICapabilities from '@/components/public/solutions/SolutionsAICapabilities';
import SolutionsProcess from '@/components/public/solutions/SolutionsProcess';
import SolutionsTechStack from '@/components/public/solutions/SolutionsTechStack';
import SolutionsMonetization from '@/components/public/solutions/SolutionsMonetization';
import SolutionsSecurity from '@/components/public/solutions/SolutionsSecurity';

// --- CLONE COMPONENTS (NEW) ---
import CloneHero from '@/components/public/clone/CloneHero';
import CloneAbout from '@/components/public/clone/CloneAbout';
import CloneWhyBuild from '@/components/public/clone/CloneWhyBuild';
import CloneFeatures from '@/components/public/clone/CloneFeatures';
import CloneAI from '@/components/public/clone/CloneAI';
import CloneTechStack from '@/components/public/clone/CloneTechStack';
import CloneRevenue from '@/components/public/clone/CloneRevenue';
import CloneProcess from '@/components/public/clone/CloneProcess';
import CloneFAQ from '@/components/public/clone/CloneFAQ';

// --- SHARED COMPONENTS ---
import FAQAccordion from '@/components/common/Faqaccordion';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import CommonTitle from '@/components/ui/CommonTitle';

// --- 1. HELPER: FETCH DATA FROM DB ---
async function getSolutionPage(slug) {
    try {
        const page = await prisma.page.findUnique({ where: { slug: slug } });
        if (!page) return null;
        const jsonContent = page.contentJson ? JSON.parse(page.contentJson) : {};
        return {
            ...page,
            activeSections: jsonContent.activeSections || [],
            sections: jsonContent.content || {}
        };
    } catch (error) {
        console.error("Error fetching solution page:", error);
        return null;
    }
}

// --- 2. GENERATE METADATA (SEO) ---
export async function generateMetadata(props) {
    const params = await props.params;
    const page = await getSolutionPage(params.slug);
    if (!page) return { title: 'Page Not Found' };

    const title = page.seoTitle || `${page.title} | Softkingo`;
    const description = page.seoDescription || page.sections.hero?.description || `Explore our ${page.title} solution. Custom development services by Softkingo.`;
    const image = page.seoImage || "/og-image.png";

    return {
        title,
        description,
        alternates: { canonical: `/solutions/${params.slug}` },
        openGraph: {
            title,
            description,
            url: `https://www.softkingo.com/solutions/${params.slug}`,
            images: [{ url: image }],
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        }
    };
}

// --- 3. MAIN PAGE ---
export default async function DynamicSolutionPage(props) {
    const params = await props.params;
    const data = await getSolutionPage(params.slug);

    if (!data) return notFound();

    // Helper to check active sections
    const show = (id) => data.activeSections.includes(id);

    // =========================================================
    // ✅ CASE A: CLONE SCRIPT PAGE (Custom UI)
    // =========================================================
    if (data.type === 'clone') {
        const {
            hero, about, whyBuild, services, appFeatures,
            aiFeatures, techStack, revenue, portfolio, process, faq
        } = data.sections;

        return (
            <main className="min-h-screen bg-white">

                {/* 1. Hero – Build Your Own clone app */}
                {show('hero') && (
                    <CloneHero data={hero} />
                )}

                {/* 2. About Our Clone app Development */}
                {show('about') && (
                    <CloneAbout data={about} />
                )}

                {/* 3. Why Build a clone app */}
                {show('whyBuild') && (
                    <CloneWhyBuild items={whyBuild?.items} />
                )}

                {/* 4. Our Clone App Development Services */}
                {show('services') && (
                    <SolutionsServicesList data={services} />
                )}

                {/* 5. Features (User, Vendor, Admin) */}
                {show('appFeatures') && (
                    <CloneFeatures data={appFeatures} />
                )}

                {/* 6. AI-Powered & Advanced Features */}
                {show('aiFeatures') && (
                    <CloneAI data={aiFeatures} />
                )}

                {/* 7. Technology Stack We Use */}
                {show('techStack') && (
                    <CloneTechStack data={techStack} />
                )}

                {/* 8. Revenue & Monetization Models */}
                {show('revenue') && (
                    <CloneRevenue data={revenue} />
                )}

                {/* 9. Our Portfolio & Experience */}
                {show('portfolio') && (
                    <DynamicPortfolioCard
                        category={portfolio?.category || data.slug}
                        portfolioType="app"
                        title="Similar Clone Solutions"
                        subtitle="See what we've built for others."
                    />
                )}

                {/* 10. How We Build (Process) */}
                {show('process') && (
                    <CloneProcess data={process} />
                )}

                {/* 11. FAQ */}
                {show('faq') && <CloneFAQ data={faq} />}

                {/* 12. Contact & Free Consultation */}
                <ConsultationCTA
                    title="Launch Your Clone App Today"
                    subtitle="Get a free quote and technical roadmap for your idea."
                    href="/contact"
                />

            </main>
        );
    }

    // =========================================================
    // ✅ CASE B: STANDARD SOLUTION PAGE (Existing Logic)
    // =========================================================
    const {
        hero, stats, intro, features, awards, whyNeed,
        servicesList, userApp, vendorApp, adminPanel,
        aiCapabilities, portfolio, process, techStack,
        monetization, whyChoose, consultation, faq
    } = data.sections;

    return (
        <main className="min-h-screen bg-white">
            {show('hero') && <section className='bg-sky-50'><SolutionsHero data={hero} /></section>}
            {show('stats') && <SolutionsStats data={stats} />}
            {show('intro') && <SolutionsContentSplit data={intro} reverse={false} />}
            {show('features') && <SolutionsFeatureGrid data={features} />}
            {show('awards') && <AwardsSection />}
            {show('whyNeed') && <SolutionsWhyNeed data={whyNeed} />}
            {show('servicesList') && <SolutionsServicesList data={servicesList} />}
            {show('appModules') && (
                <>
                    {userApp?.title && <SolutionsAppModule data={userApp} reverse={true} bg="white" />}
                    {vendorApp?.title && <SolutionsAppModule data={vendorApp} reverse={false} bg="slate-50" />}
                    {adminPanel?.title && <SolutionsAppModule data={adminPanel} reverse={true} bg="white" />}
                </>
            )}
            {show('aiCapabilities') && <SolutionsAICapabilities data={aiCapabilities} />}
            {show('portfolio') && <DynamicPortfolioCard category="" portfolioType="app" title="Our Portfolio" />}
            {show('process') && <SolutionsProcess data={process} />}
            {show('techStack') && <SolutionsTechStack data={techStack} />}
            {show('monetization') && <SolutionsMonetization data={monetization} />}
            {show('whyChoose') && <SolutionsSecurity data={whyChoose} />}
            {show('consultation') && (
                <ConsultationCTA
                    title={consultation?.title || "Book A FREE Consultation"}
                    subtitle={consultation?.subtitle || "Share your project idea."}
                    href="/contact"
                />
            )}
            {show('faq') && <FAQAccordion data={faq} />}
        </main>
    );
}