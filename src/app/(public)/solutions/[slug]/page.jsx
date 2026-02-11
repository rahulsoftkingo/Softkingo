// import React from 'react';
// import { notFound } from 'next/navigation';
// import prisma from '@/lib/db'; // Database connection

// // --- COMPONENTS IMPORTS ---
// import SolutionsHero from '@/components/public/solutions/SolutionsHero';
// import SolutionsStats from '@/components/public/solutions/SolutionsStats';
// import SolutionsContentSplit from '@/components/public/solutions/SolutionsContentSplit';
// import SolutionsFeatureGrid from '@/components/public/solutions/SolutionsFeatureGrid';
// import AwardsSection from '@/components/public/solutions/AwardsSection';
// import SolutionsWhyNeed from '@/components/public/solutions/SolutionsWhyNeed';
// import SolutionsServicesList from '@/components/public/solutions/SolutionsServicesList';
// import SolutionsAppModule from '@/components/public/solutions/SolutionsAppModule';
// import SolutionsAICapabilities from '@/components/public/solutions/SolutionsAICapabilities';

// import SolutionsProcess from '@/components/public/solutions/SolutionsProcess';
// import SolutionsTechStack from '@/components/public/solutions/SolutionsTechStack';
// import SolutionsMonetization from '@/components/public/solutions/SolutionsMonetization';
// import SolutionsSecurity from '@/components/public/solutions/SolutionsSecurity';

// import FAQAccordion from '@/components/common/Faqaccordion';
// import DynamicPortfolioCard from '@/components/ui/DynamicPortfolioCard';
// import ConsultationCTA from '@/components/common/Consultation-Cta';

// // --- 1. HELPER: FETCH DATA FROM DB ---
// async function getSolutionPage(slug) {
//     try {
//         const page = await prisma.page.findUnique({
//             where: { slug: slug },
//         });

//         if (!page) return null;

//         // Parse the JSON content stored in DB
//         // Fallback to empty object if contentJson is null
//         const jsonContent = page.contentJson ? JSON.parse(page.contentJson) : {};
        
//         return {
//             ...page,
//             activeSections: jsonContent.activeSections || [],
//             sections: jsonContent.content || {} 
//         };
//     } catch (error) {
//         console.error("Error fetching solution page:", error);
//         return null;
//     }
// }

// // --- 2. GENERATE METADATA (SEO) ---
// export async function generateMetadata(props) {
//     const params = await props.params;
//     const page = await getSolutionPage(params.slug);

//     if (!page) return { title: 'Page Not Found' };

//     return {
//         title: page.seoTitle || `${page.title} | Softkingo`,
//         description: page.sections.hero?.description || page.title,
//     };
// }

// // --- 3. MAIN PAGE COMPONENT ---
// export default async function DynamicSolutionPage(props) {
//     const params = await props.params;
//     const data = await getSolutionPage(params.slug);

//     // If page not found in DB, show 404
//     if (!data) return notFound();

//     // Destructure all possible sections from data.sections
//     const { 
//         hero, stats, intro, features, awards, whyNeed, 
//         servicesList, userApp, vendorApp, adminPanel, 
//         aiCapabilities, portfolio, process, techStack, 
//         monetization, whyChoose, cta, faq, consultation 
//     } = data.sections;

//     const activeSections = data.activeSections || [];

//     // Helper: Check if a section is active
//     const show = (id) => activeSections.includes(id);

//     return (
//         <main className="min-h-screen bg-white">
            
//             {/* 1. Hero Section */}
//             {show('hero') && (
//                 <section className='bg-sky-50'>
//                     <SolutionsHero data={hero} />
//                 </section>
//             )}

//             {/* 2. Stats Banner */}
//             {show('stats') && <SolutionsStats data={stats} />}

//             {/* 3. Intro Section */}
//             {show('intro') && <SolutionsContentSplit data={intro} reverse={false} />}

//             {/* 4. Features Grid */}
//             {show('features') && <SolutionsFeatureGrid data={features} />}

//             {/* 5. Awards Section */}
//             {show('awards') && <AwardsSection />}

//             {/* 6. Why Businesses Need */}
//             {show('whyNeed') && <SolutionsWhyNeed data={whyNeed} />}

//             {/* 7. Services List */}
//             {show('servicesList') && <SolutionsServicesList data={servicesList} />}

//             {/* 8. App Modules (User, Vendor, Admin) */}
//             {show('appModules') && (
//                 <>
//                     {/* Only render if data exists for specific module */}
//                     {userApp && userApp.title && <SolutionsAppModule data={userApp} reverse={true} bg="white" />}
//                     {vendorApp && vendorApp.title && <SolutionsAppModule data={vendorApp} reverse={false} bg="slate-50" />}
//                     {adminPanel && adminPanel.title && <SolutionsAppModule data={adminPanel} reverse={true} bg="white" />}
//                 </>
//             )}

//             {/* 9. AI Capabilities */}
//             {show('aiCapabilities') && <SolutionsAICapabilities data={aiCapabilities} />}

//             {/* 10. Portfolio Card */}
//             {show('portfolio') && (
//                 <DynamicPortfolioCard 
//                     category="" // Can be dynamic if you add a field in admin
//                     portfolioType="app"
//                     title="Our App Development Portfolio"
//                     subtitle="Explore our recent success stories." 
//                 />
//             )}
            
//             {/* 11. Process */}
//             {show('process') && <SolutionsProcess data={process} />}

//             {/* 12. Tech Stack */}
//             {show('techStack') && <SolutionsTechStack data={techStack} />}

//             {/* 13. Revenue Models */}
//             {show('monetization') && <SolutionsMonetization data={monetization} />}

//             {/* 14. Security / Why Choose */}
//             {show('whyChoose') && <SolutionsSecurity data={whyChoose} />}

//             {/* 15. Consultation CTA */}
//             {show('consultation') && (
//                 <ConsultationCTA 
//                     title={consultation?.title || "Book A FREE Consultation With Us"}
//                     subtitle={consultation?.subtitle || "Share your project idea and we’ll provide a free consultation."}
//                     buttonLabel={consultation?.btnText || "Book a Free Demo"}
//                     href="/contact"
//                     imageSrc={consultation?.image || "/images/cta/cta-img.png"}
//                 />
//             )}

//             {/* 16. FAQ */}
//             {show('faq') && <FAQAccordion data={faq} />}

//             {/* 17. Bottom CTA (Simple Banner) */}
//             {/* {show('cta') && (
//                  <div className="py-24 bg-slate-900 text-center px-6">
//                     <div className="max-w-4xl mx-auto">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//                             {cta?.title || "Ready to get started?"}
//                         </h2>
//                         <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
//                             {cta?.subtitle || "Contact us today for a free quote."}
//                         </p>
//                         <a 
//                             href="/contact" 
//                             className="inline-block bg-sky-500 text-white px-10 py-4 rounded-full font-bold hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/30"
//                         >
//                             {cta?.btnText || "Contact Us"}
//                         </a>
//                     </div>
//                  </div>
//             )} */}

//         </main>
//     );
// }



import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db'; 

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

// --- CLONE COMPONENTS (Placeholders / New) ---
// You will create these one by one. For now, using generic ones or reusing Solution ones where possible.
import IndustriesHero from '@/components/public/industries/IndustriesHero'; // Can reuse or make CloneHero
import IndustryWhyChooseCarousel from '@/components/public/industries/IndustryWhyChooseCarousel'; // Can reuse for Clone Why Choose

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
        console.error("Error fetching page:", error);
        return null;
    }
}

// --- 2. SEO ---
export async function generateMetadata(props) {
    const params = await props.params;
    const page = await getSolutionPage(params.slug);
    if (!page) return { title: 'Page Not Found' };
    return { 
        title: page.seoTitle || `${page.title} | Softkingo`, 
        description: page.sections.hero?.description || page.title 
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
                    <IndustriesHero data={hero} /> // Reusing Industry Hero or create CloneHero
                )}

                {/* 2. About Our Clone app Development */}
                {show('about') && (
                    <section className="py-20 px-6 max-w-7xl mx-auto">
                        <SolutionsContentSplit data={about} reverse={false} />
                    </section>
                )}

                {/* 3. Why Build a clone app (Using Carousel Style) */}
                {show('whyBuild') && (
                    <section className="py-20 bg-slate-50 relative overflow-hidden">
                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            <CommonTitle 
                                title={whyBuild?.title || "Why Build This Clone?"} 
                                subtitle="Capitalize on the proven business model."
                                pill={true}
                                gradientText="Opportunity"
                            />
                            <div className="mt-12">
                                <IndustryWhyChooseCarousel items={whyBuild?.items} />
                            </div>
                        </div>
                    </section>
                )}

                {/* 4. Our Clone App Development Services */}
                {show('services') && (
                    <SolutionsServicesList data={services} /> // Reusing Services List
                )}

                {/* 5. Features (Job Seeker / Recruiter / Admin) */}
                {show('appFeatures') && (
                    <>
                        {/* We can create a dedicated CloneFeaturesTabs component later. 
                            For now, reusing App Module layout for distinct sections. */}
                        
                        {/* User Features */}
                        {appFeatures?.user && (
                            <SolutionsAppModule 
                                data={{ 
                                    title: "User Features", 
                                    description: "Features for your end-users.", 
                                    image: "/images/clone/user-app.png", 
                                    features: appFeatures.user.items // Ensure items match expected format
                                }} 
                                reverse={true} 
                                bg="white" 
                            />
                        )}

                        {/* Vendor/Partner Features */}
                        {appFeatures?.vendor && (
                            <SolutionsAppModule 
                                data={{ 
                                    title: "Vendor/Partner Features", 
                                    description: "Tools for service providers.", 
                                    image: "/images/clone/vendor-app.png", 
                                    features: appFeatures.vendor.items 
                                }} 
                                reverse={false} 
                                bg="slate-50" 
                            />
                        )}

                        {/* Admin Panel Features */}
                        {appFeatures?.admin && (
                            <SolutionsAppModule 
                                data={{ 
                                    title: "Admin Dashboard", 
                                    description: "Complete control over your platform.", 
                                    image: "/images/clone/admin-panel.png", 
                                    features: appFeatures.admin.items 
                                }} 
                                reverse={true} 
                                bg="white" 
                            />
                        )}
                    </>
                )}

                {/* 6. AI-Powered & Advanced Features */}
                {show('aiFeatures') && (
                    <SolutionsAICapabilities data={aiFeatures} />
                )}

                {/* 7. Technology Stack We Use */}
                {show('techStack') && (
                    <SolutionsTechStack data={techStack} />
                )}

                {/* 8. Revenue & Monetization Models */}
                {show('revenue') && (
                    <SolutionsMonetization data={revenue} />
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
                    <SolutionsProcess data={process} />
                )}

                {/* 11. FAQ */}
                {show('faq') && <FAQAccordion data={faq} />}

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