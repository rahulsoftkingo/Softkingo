import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db'; // Database connection

// --- COMPONENTS IMPORTS ---
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

import FAQAccordion from '@/components/common/Faqaccordion';
import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
import ConsultationCTA from '@/components/common/Consultation-Cta';

// --- 1. HELPER: FETCH DATA FROM DB ---
async function getSolutionPage(slug) {
    try {
        const page = await prisma.page.findUnique({
            where: { slug: slug },
        });

        if (!page) return null;

        // Parse the JSON content stored in DB
        // Fallback to empty object if contentJson is null
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

    return {
        title: page.seoTitle || `${page.title} | Softkingo`,
        description: page.sections.hero?.description || page.title,
    };
}

// --- 3. MAIN PAGE COMPONENT ---
export default async function DynamicSolutionPage(props) {
    const params = await props.params;
    const data = await getSolutionPage(params.slug);

    // If page not found in DB, show 404
    if (!data) return notFound();

    // Destructure all possible sections from data.sections
    const { 
        hero, stats, intro, features, awards, whyNeed, 
        servicesList, userApp, vendorApp, adminPanel, 
        aiCapabilities, portfolio, process, techStack, 
        monetization, whyChoose, cta, faq, consultation 
    } = data.sections;

    const activeSections = data.activeSections || [];

    // Helper: Check if a section is active
    const show = (id) => activeSections.includes(id);

    return (
        <main className="min-h-screen bg-white">
            
            {/* 1. Hero Section */}
            {show('hero') && (
                <section className='bg-sky-50'>
                    <SolutionsHero data={hero} />
                </section>
            )}

            {/* 2. Stats Banner */}
            {show('stats') && <SolutionsStats data={stats} />}

            {/* 3. Intro Section */}
            {show('intro') && <SolutionsContentSplit data={intro} reverse={false} />}

            {/* 4. Features Grid */}
            {show('features') && <SolutionsFeatureGrid data={features} />}

            {/* 5. Awards Section */}
            {show('awards') && <AwardsSection />}

            {/* 6. Why Businesses Need */}
            {show('whyNeed') && <SolutionsWhyNeed data={whyNeed} />}

            {/* 7. Services List */}
            {show('servicesList') && <SolutionsServicesList data={servicesList} />}

            {/* 8. App Modules (User, Vendor, Admin) */}
            {show('appModules') && (
                <>
                    {/* Only render if data exists for specific module */}
                    {userApp && userApp.title && <SolutionsAppModule data={userApp} reverse={true} bg="white" />}
                    {vendorApp && vendorApp.title && <SolutionsAppModule data={vendorApp} reverse={false} bg="slate-50" />}
                    {adminPanel && adminPanel.title && <SolutionsAppModule data={adminPanel} reverse={true} bg="white" />}
                </>
            )}

            {/* 9. AI Capabilities */}
            {show('aiCapabilities') && <SolutionsAICapabilities data={aiCapabilities} />}

            {/* 10. Portfolio Card */}
            {show('portfolio') && (
                <DynamicPortfolioCard 
                    category="" // Can be dynamic if you add a field in admin
                    portfolioType="app"
                    title="Our App Development Portfolio"
                    subtitle="Explore our recent success stories." 
                />
            )}
            
            {/* 11. Process */}
            {show('process') && <SolutionsProcess data={process} />}

            {/* 12. Tech Stack */}
            {show('techStack') && <SolutionsTechStack data={techStack} />}

            {/* 13. Revenue Models */}
            {show('monetization') && <SolutionsMonetization data={monetization} />}

            {/* 14. Security / Why Choose */}
            {show('whyChoose') && <SolutionsSecurity data={whyChoose} />}

            {/* 15. Consultation CTA */}
            {show('consultation') && (
                <ConsultationCTA 
                    title={consultation?.title || "Book A FREE Consultation With Us"}
                    subtitle={consultation?.subtitle || "Share your project idea and we’ll provide a free consultation."}
                    buttonLabel={consultation?.btnText || "Book a Free Demo"}
                    href="/contact"
                    imageSrc={consultation?.image || "/images/cta/cta-img.png"}
                />
            )}

            {/* 16. FAQ */}
            {show('faq') && <FAQAccordion data={faq} />}

            {/* 17. Bottom CTA (Simple Banner) */}
            {/* {show('cta') && (
                 <div className="py-24 bg-slate-900 text-center px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {cta?.title || "Ready to get started?"}
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                            {cta?.subtitle || "Contact us today for a free quote."}
                        </p>
                        <a 
                            href="/contact" 
                            className="inline-block bg-sky-500 text-white px-10 py-4 rounded-full font-bold hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/30"
                        >
                            {cta?.btnText || "Contact Us"}
                        </a>
                    </div>
                 </div>
            )} */}

        </main>
    );
}