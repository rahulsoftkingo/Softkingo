import SolutionsClientOverview from '../components/SolutionsClientOverview';
import SolutionsSeoStrategy from '../components/SolutionsSeoStrategy'
import BeforeAfterResults from '../components/BeforeAfterResults';
import KeywordAndTrafficGrowth from '../components/Keywordandtrafficgrowth';
import SeoPerformanceDashboard from '../components/Seoperformancedashboard';
import TechnicalSeoAndContentGrowth from '../components/Technicalseoandcontentgrowth';
import BusinessImpactAndTestimonial from '../components/Businessimpactandtestimonial';
import SeoCtaBanner from '../components/Seoctabanner';
import Seocasestudyhero from '../components/Seocasestudyhero';
import prisma from '@/lib/prisma'; 
import { notFound } from 'next/navigation'; 

export default async function Page({ params }) {
  const { slug } = await params; 
  const caseStudy = await prisma.portfolioSeo.findUnique({
    where: { slug },
  });

  if (!caseStudy) {
    notFound(); 
  }

  console.log('PortfolioSeo data for slug', slug, ':', caseStudy); 

  // JSON text columns ko parse karke bhi dekhna ho to:
  const heroStatsJson = JSON.parse(caseStudy.heroStatsJson || '{}');
  const clientOverviewJson=JSON.parse(caseStudy.clientOverviewJson || '{}');
  const strategyJson=JSON.parse(caseStudy.strategyJson || '{}');
  const resultsJson =JSON.parse(caseStudy.resultsJson || '{}');
  const performanceDashboardJson =JSON.parse(caseStudy.performanceDashboardJson || '{}');
  const technicalSeoJson =JSON.parse(caseStudy.technicalSeoJson || '{}');
  const businessImpactJson=JSON.parse(caseStudy.businessImpactJson || '{}');
  const toolsJson= JSON.parse(caseStudy.toolsJson || '{}')
  // console.log('portfolioCardContent:', JSON.parse(caseStudy.portfolioCardContent || '{}'));

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ...other sections like Hero, SolutionsWhyNeed, etc. */}

      <Seocasestudyhero title={caseStudy.title} subtitle={caseStudy.subtitle} endpoint={caseStudy.slug} data={heroStatsJson}/>
      <SolutionsClientOverview data={clientOverviewJson}/>
      <SolutionsSeoStrategy data={strategyJson} />
      <BeforeAfterResults data={resultsJson}/>
      <SeoPerformanceDashboard heading={performanceDashboardJson.heading} data={performanceDashboardJson.stats}/>
      <KeywordAndTrafficGrowth data={performanceDashboardJson.keywordRanking} data2={performanceDashboardJson.trafficChart} data3={heroStatsJson.chart} />
      <TechnicalSeoAndContentGrowth data={technicalSeoJson}/>
      <BusinessImpactAndTestimonial data={businessImpactJson} data1={toolsJson}/>
      <SeoCtaBanner />
      {/* ...more sections */}
    </div>
  );
}