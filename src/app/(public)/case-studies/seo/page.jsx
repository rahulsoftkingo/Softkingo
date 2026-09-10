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
    // ---- Prisma se saare PortfolioSeo records nikaalna ----
    const records = await prisma.portfolioSeo.findMany({
        orderBy: { createdAt: "desc" },
    });


    // ---- JSON string fields ko parse karke clean data banana ----
    const caseStudies = records.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        category: r.category,
        companyLogo: r.companyLogo,               // 👈 naya
        companyDescription: r.companyDescription,  // 👈 naya
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

    return (
        <>
            <CaseStudiesHero />
            <CaseStudiesList data={caseStudies} />
        </>
    );
}