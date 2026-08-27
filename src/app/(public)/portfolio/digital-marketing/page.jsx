// import { prisma } from "@/lib/prisma"; // apne project ke hisaab se path adjust karein
// import CaseStudiesHero from './components/Casestudieshero';
// import CaseStudiesList from './components/Casestudieslist';

// function safeParse(field) {
//     if (!field) return null;
//     try {
//         return JSON.parse(field);
//     } catch (err) {
//         console.error("JSON parse error:", err.message);
//         return null;
//     }
// }

// export default async function CaseStudiesPage() {
//     // ---- Prisma se saare PortfolioSeo records nikaalna ----
//     const records = await prisma.portfolioSeo.findMany({
//         orderBy: { createdAt: "desc" },
//     });


//     // ---- JSON string fields ko parse karke clean data banana ----
//     const caseStudies = records.map((r) => ({
//         id: r.id,
//         slug: r.slug,
//         title: r.title,
//         subtitle: r.subtitle,
//         category: r.category,
//         companyLogo: r.companyLogo,               // 👈 naya
//         companyDescription: r.companyDescription,  // 👈 naya
//         heroBgImage: r.heroBgImage,
//         seoImage: r.seoImage,
//         heroStats: safeParse(r.heroStatsJson),
//         clientOverview: safeParse(r.clientOverviewJson),
//         strategy: safeParse(r.strategyJson),
//         results: safeParse(r.resultsJson),
//         performanceDashboard: safeParse(r.performanceDashboardJson),
//         technicalSeo: safeParse(r.technicalSeoJson),
//         businessImpact: safeParse(r.businessImpactJson),
//         tools: safeParse(r.toolsJson),
//         portfolioCardContent: safeParse(r.portfolioCardContent),
//         seoTitle: r.seoTitle,
//         seoDescription: r.seoDescription,
//         createdAt: r.createdAt,
//         updatedAt: r.updatedAt,
//     }));

//     return (
//         <>
//             <CaseStudiesHero />
//             <CaseStudiesList data={caseStudies} />
//         </>
//     );
// }


import { prisma } from "@/lib/prisma"; // apne project ke hisaab se path adjust karein
import CaseStudiesHero from './components/Casestudieshero';
import CaseStudiesList from './components/Casestudieslist';

function safeParse(field) {
    if (!field) return null;
    try {
        return JSON.parse(field);
    } catch (err) {
        console.error("JSON parse error:", err.message);
        return null;
    }
}

export default async function CaseStudiesPage() {
    // ---- Teeno tables se parallel fetch ----
    const [seoRecords, ppcRecords, socialRecords] = await Promise.all([
        prisma.portfolioSeo.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.portfolioPpc.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.portfolioSocialMedia.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    // ---- SEO case studies ----
    // const seoCaseStudies = seoRecords.map((r) => ({
    //     id: r.id,
    //     slug: r.slug,
    //     title: r.title,
    //     subtitle: r.subtitle,
    //     category: r.category,
    //     industries: safeParse(r.clientOverviewJson),
    //     // industries: r.clientOverview.clientindustry,
    //     companyLogo: r.companyLogo,
    //     companyDescription: r.companyDescription,
    //     heroBgImage: r.heroBgImage,
    //     seoImage: r.seoImage,
    //     heroStats: safeParse(r.heroStatsJson),
    //     clientOverview: safeParse(r.clientOverviewJson),
    //     strategy: safeParse(r.strategyJson),
    //     results: safeParse(r.resultsJson),
    //     performanceDashboard: safeParse(r.performanceDashboardJson),
    //     technicalSeo: safeParse(r.technicalSeoJson),
    //     businessImpact: safeParse(r.businessImpactJson),
    //     tools: safeParse(r.toolsJson),
    //     portfolioCardContent: safeParse(r.portfolioCardContent),
    //     seoTitle: r.seoTitle,
    //     seoDescription: r.seoDescription,
    //     createdAt: r.createdAt,
    //     updatedAt: r.updatedAt,
    // }));

    const seoCaseStudies = seoRecords.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        category: r.category,
        industries: safeParse(r.clientOverviewJson)?.client?.industry ?? "",
        companyLogo: r.companyLogo,
        companyDescription: r.companyDescription,
        heroBgImage: r.heroBgImage,
        seoImage: r.seoImage,
        heroStats: safeParse(r.heroStatsJson),
        clientOverview: safeParse(r.clientOverviewJson),
        strategy: safeParse(r.strategyJson),
        results: safeParse(r.resultsJson),
        performanceDashboard: safeParse(r.performanceDashboardJson),
        technicalSeo: safeParse(r.technicalSeoJson),
        businessImpact: safeParse(r.businessImpactJson),
        tools: safeParse(r.toolsJson),
        portfolioCardContent: safeParse(r.portfolioCardContent),

        seoTitle: r.seoTitle,
        seoDescription: r.seoDescription,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
    }));


    // ---- PPC case studies ----
    const ppcCaseStudies = ppcRecords.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        category: r.category,
        heroBgImage: r.heroBgImage,
        seoImage: r.seoImage,
        hero: safeParse(r.heroJson),
        projectOverview: safeParse(r.projectOverviewJson),
        challenge: safeParse(r.challengeJson),
        solution: safeParse(r.solutionJson),
        adPlatforms: safeParse(r.adPlatformsJson),
        tools: safeParse(r.toolsJson),
        performance: safeParse(r.performanceJson),
        achievements: safeParse(r.achievementsJson),
        campaigns: safeParse(r.campaignsJson),
        testimonial: safeParse(r.testimonialJson),
        ctaBanner: safeParse(r.ctaBannerJson),
        companyLogo: r.companyLogo,
        companyDescription: r.companyDescription,
        portfolioCardContent: safeParse(r.portfolioCardContent),
        status: r.status,
        publishedAt: r.publishedAt,
        seoTitle: r.seoTitle,
        seoDescription: r.seoDescription,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
    }));

    // ---- Social Media case studies ----
    const socialCaseStudies = socialRecords.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        category: r.category,
        heroBgImage: r.heroBgImage,
        seoImage: r.seoImage,
        hero: safeParse(r.heroJson),
        projectOverview: safeParse(r.projectOverviewJson),
        challenge: safeParse(r.challengeJson),
        solution: safeParse(r.solutionJson),
        platforms: safeParse(r.platformsJson),
        tools: safeParse(r.toolsJson),
        performance: safeParse(r.performanceJson),
        achievements: safeParse(r.achievementsJson),
        topContent: safeParse(r.topContentJson),
        testimonial: safeParse(r.testimonialJson),
        ctaBanner: safeParse(r.ctaBannerJson),
        companyLogo: r.companyLogo,
        companyDescription: r.companyDescription,
        portfolioCardContent: safeParse(r.portfolioCardContent),
        status: r.status,
        publishedAt: r.publishedAt,
        seoTitle: r.seoTitle,
        seoDescription: r.seoDescription,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
    }));

    console.log("Seo case studies", seoCaseStudies);

    return (
        <>
            <CaseStudiesHero />
            <CaseStudiesList
                data={seoCaseStudies}
                ppcData={ppcCaseStudies}
                socialData={socialCaseStudies}
            />
        </>
    );

}