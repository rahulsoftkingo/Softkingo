import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db'; // Database connection

// --- SOLUTIONS COMPONENTS (Existing) ---
import SolutionsHero from '@/components/public/solutions/SolutionsHero';
import SolutionsStats from '@/components/public/solutions/SolutionsStats';
import SolutionsContentSplit from '@/components/public/solutions/SolutionsContentSplit';
import SolutionsFeatureGrid from '@/components/public/solutions/SolutionsFeatureGrid';
import AwardsSection from '@/components/common/AwardsSection';
import SolutionsWhyNeed from '@/components/public/solutions/SolutionsWhyNeed';
import SolutionsServicesList from '@/components/public/solutions/SolutionsServicesList';
import SolutionsAppModule from '@/components/public/solutions/SolutionsAppModule';
import SolutionsAICapabilities from '@/components/public/solutions/SolutionsAICapabilities';
import SolutionsProcess from '@/components/public/solutions/SolutionsProcess';
import SolutionsTechStack from '@/components/public/solutions/SolutionsTechStack';
import SolutionsMonetization from '@/components/public/solutions/SolutionsMonetization';
import SolutionsSecurity from '@/components/public/solutions/SolutionsSecurity';
import SolutionsCTA from '@/components/public/solutions/SolutionsCTA';

// --- CLONE COMPONENTS (NEW) ---
import CloneHero from '@/components/public/clone/CloneHero';
import CloneStats from '@/components/public/clone/CloneStats';
import CloneVerticalSuite from '@/components/public/clone/CloneVerticalSuite';
import CloneComparison from '@/components/public/clone/CloneComparison';
import CloneAbout from '@/components/public/clone/CloneAbout';
import CloneWhyBuild from '@/components/public/clone/CloneWhyBuild';
import CloneFeatures from '@/components/public/clone/CloneFeatures';
import CloneAI from '@/components/public/clone/CloneAI';
import CloneAISolutions from '@/components/public/clone/CloneAISolutions';
import CloneInvestment from '@/components/public/clone/CloneInvestment';
import CloneRevenue from '@/components/public/clone/CloneRevenue';
import CloneTechStack from '@/components/public/clone/CloneTechStack';
import CloneProcess from '@/components/public/clone/CloneProcess';
import ClonePopularSolutions from '@/components/public/clone/ClonePopularSolutions';
import CloneFAQ from '@/components/public/clone/CloneFAQ';
import CloneIndustries from '@/components/public/clone/CloneIndustries';
import IndustriesSection from '@/components/common/IndustriesSection';
import FooterForm from "@/components/footer/InquirySection";

// --- SHARED COMPONENTS ---
import FAQAccordion from '@/components/common/Faqaccordion';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import ConsultationCTA from '@/components/common/Consultation-Cta';
import CommonTitle from '@/components/ui/CommonTitle';
import BlogSection from '@/components/common/BlogSection';

// --- 1. HELPER: FETCH DATA FROM DB ---
async function getSolutionPage(slug) {
    try {
        const page = await prisma.page.findUnique({ where: { slug: slug } });
        if (!page) return null;
        const jsonContent = page.contentJson ? JSON.parse(page.contentJson) : {};

        // Fetch selected industries data if present
        let industryPages = [];
        const industryConfig = jsonContent.content?.industries;

        if (industryConfig?.items?.length > 0) {
            const selectedSlugs = industryConfig.items.map(i => i.slug);
            const rawIndustries = await prisma.page.findMany({
                where: {
                    slug: { in: selectedSlugs },
                    type: 'industry'
                }
            });

            // Map and parse content for each industry
            industryPages = rawIndustries.map(ind => ({
                ...ind,
                content: ind.contentJson ? JSON.parse(ind.contentJson).content : {}
            }));

            // Maintain selection order
            industryPages.sort((a, b) =>
                selectedSlugs.indexOf(a.slug) - selectedSlugs.indexOf(b.slug)
            );
        }

        return {
            ...page,
            activeSections: jsonContent.activeSections || [],
            sections: jsonContent.content || {},
            industryPages
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

    const title = page.seoTitle || page.title;
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
            hero, about, verticalSuite, aiFeatures, aiSolutions,
            investment, revenue, techStack, portfolio, process, faq
        } = data.sections;

        // --- FAQ SCHEMA ---
        const faqSchema = show('faq') && faq?.items?.length > 0 ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq.items.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": (item.a || '').replace(/<[^>]*>?/gm, '') // Strip HTML for schema text
                }
            }))
        } : null;

        return (
            <main className="min-h-screen bg-white overflow-x-clip">
                {faqSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                )}

                {/* 1. Hero – Build Your Own clone app */}
                {show('hero') && (
                    <CloneHero data={hero} />
                )}

                {/* 2. About Our Clone app Development */}
                {show('about') && (
                    <CloneAbout data={about} />
                )}

                {/* 3. Features (Tabbed Vertical Suite / Why वाला ) */}
                {show('verticalSuite') && (
                    <CloneVerticalSuite data={verticalSuite} />
                )}

                {/* 4. AI-Powered & Advanced Features (New 设计) */}
                {show('aiFeatures') && (
                    <CloneAI data={aiFeatures} />
                )}

                {/* 5. Ai Feature Solutions (Indigo Hover Menu) */}
                {show('aiSolutions') && (
                    <CloneAISolutions data={aiSolutions} />
                )}

                {/* 6. Why to Invest (New) */}
                {show('investment') && (
                    <CloneInvestment data={investment} />
                )}

                {/* 7. Revenue Model (New tabbed design) */}
                {show('revenue') && (
                    <CloneRevenue data={revenue} />
                )}

                {/* 8. Technology Stack We Use (Scrollable tabs) */}
                {show('techStack') && (
                    <CloneTechStack data={techStack} />
                )}

                {/* 9. Our Portfolio & Experience */}
                {show('portfolio') && (
                    <DynamicPortfolioCard
                        category={portfolio?.category || data.slug}
                        portfolioType="app"
                        title={portfolio?.title}
                        subtitle={portfolio?.subtitle}
                    />
                )}

                {/* 10. How We Build (Process) */}
                {show('process') && (
                    <CloneProcess data={process} />
                )}

                {/* 11. Industries We Serve (Tabbed UI) */}
                {show('industries') && (
                    <CloneIndustries data={data.sections.industries} industries={data.industryPages} />
                )}

                {/* 12. Popular App Solutions (Grid) */}
                {show('popularSolutions') && (
                    <ClonePopularSolutions data={data.sections.popularSolutions} />
                )}

                {/* 13. Comparison Table */}
                {show('comparison') && (
                    <CloneComparison data={data.sections.comparison} />
                )}

                {/* 14. Consultation CTA */}
                {show('consultation') && (
                    <ConsultationCTA
                        title={data.sections.consultation?.title}
                        subtitle={data.sections.consultation?.subtitle}
                        buttonLabel={data.sections.consultation?.buttonLabel}
                        imageSrc={data.sections.consultation?.imageSrc}
                    />
                )}

                {/* 15. FAQ */}
                {show('faq') && <FAQAccordion data={data.sections.faq} />}

                {show('blogs') && (
                    <BlogSection
                        category={data.sections.blogCategory || ""}
                        title={data.sections.blogTitle || "Our Latest Blogs"}
                        subtitle={data.sections.blogSubtitle || "Explore our latest insights, product lessons, and engineering best practices."}
                    />
                )}

                <FooterForm />

            </main>
        );
    }

    // =========================================================
    // ✅ CASE B: STANDARD SOLUTION PAGE (Existing Logic)
    // =========================================================
    const {
        hero, stats, intro, features, awards, whyNeed,
        servicesList, appModules,
        aiCapabilities, portfolio, process, techStack,
        monetization, whyChoose, consultation, faq,
        blogTitle, blogSubtitle, blogCategory,
        cta, inquiry,
        userApp, vendorApp, adminPanel // Legacy fields as siblings
    } = data.sections;

    // --- LEGACY SUPPORT: appModules ---
    let finalModules = appModules?.tabs || [];
    if (finalModules.length === 0) {
        if (userApp) finalModules.push({ ...userApp, tag: userApp.tag || "User App" });
        if (vendorApp) finalModules.push({ ...vendorApp, tag: vendorApp.tag || "Vendor App" });
        if (adminPanel) finalModules.push({ ...adminPanel, tag: adminPanel.tag || "Admin Panel" });
    }

    // --- LEGACY SUPPORT: techStack ---
    let finalTechStack = techStack;
    if (techStack && !techStack.tabs) {
        if (techStack.items) {
            finalTechStack = {
                title: techStack.title || "Technology Stack",
                subtitle: techStack.subtitle,
                tabs: [{ label: "Technologies", items: techStack.items }]
            };
        } else if (techStack.Frontend || techStack.Backend || techStack.Mobile) {
            finalTechStack = {
                title: techStack.title || "Technology Stack",
                subtitle: techStack.subtitle,
                tabs: Object.keys(techStack)
                    .filter(k => k !== 'title' && k !== 'subtitle' && typeof techStack[k] === 'object')
                    .map(k => ({ label: k, ...techStack[k] }))
            };
        }
    }

    // --- FAQ SCHEMA ---
    const faqSchema = show('faq') && faq?.items?.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": (item.a || '').replace(/<[^>]*>?/gm, '') // Strip HTML for schema text
            }
        }))
    } : null;

    return (
        <main className="min-h-screen bg-white overflow-x-clip">
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {show('hero') && <section className='bg-sky-50'><SolutionsHero data={hero} /></section>}
            {show('stats') && <SolutionsStats data={stats} />}
            {show('intro') && <SolutionsContentSplit data={intro} reverse={false} />}
            {show('features') && <SolutionsFeatureGrid data={features} />}
            {show('awards') && <AwardsSection awards={awards?.items} />}
            {show('whyNeed') && <SolutionsWhyNeed data={whyNeed} />}
            {show('servicesList') && <SolutionsServicesList data={servicesList} />}
            {show('appModules') && finalModules.map((tab, idx) => (
                <SolutionsAppModule
                    key={idx}
                    data={tab}
                    reverse={idx % 2 === 0}
                    bg={idx % 2 === 0 ? "white" : "slate-50"}
                />
            ))}
            {show('aiCapabilities') && <SolutionsAICapabilities data={aiCapabilities} />}
            {show('portfolio') && <DynamicPortfolioCard category={portfolio?.category || data.slug} portfolioType="app" title={portfolio?.title} subtitle={portfolio?.subtitle} />}
            {show('process') && <SolutionsProcess data={process} />}
            {show('techStack') && <SolutionsTechStack data={finalTechStack} />}
            {show('monetization') && <SolutionsMonetization data={monetization} />}
            {show('whyChoose') && <SolutionsSecurity data={whyChoose} />}
            {show('consultation') && (
                <ConsultationCTA
                    title={consultation?.title || "Book A FREE Consultation"}
                    subtitle={consultation?.subtitle || "Share your project idea."}
                    buttonLabel={consultation?.buttonLabel}
                    imageSrc={consultation?.imageSrc}
                    href={consultation?.href || "/contact"}
                    theme={consultation?.theme || "dark"}
                />
            )}
            {show('faq') && <FAQAccordion data={faq} />}

            {show('blogs') && (
                <BlogSection
                    category={blogCategory || ""}
                    title={blogTitle || "Our Latest Blogs"}
                    subtitle={blogSubtitle || "Explore our latest insights, product lessons, and engineering best practices."}
                />
            )}

            {show('cta') && (
                <SolutionsCTA
                    title={cta?.title}
                    subtitle={cta?.subtitle}
                    btnText={cta?.btnText}
                />
            )}

            {show('inquiry') && (
                <FooterForm
                    tagline={inquiry?.tagline}
                    title={inquiry?.title}
                    subtitle={inquiry?.subtitle}
                    titlePrefix={inquiry?.titlePrefix}
                />
            )}
        </main>
    );
}