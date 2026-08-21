import PPCCaseStudyHero from '../components/Ppccasestudyherostatic';
import PPCCaseStudyDetails from '../components/PPCCaseStudyDetails';
import PPCCTABanner from '../components/Ppcctabanner';
import PPCTestimonialRow from '../components/Ppctestimonialrow';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const { slug } = await params;

  const caseStudy = await prisma.portfolioPpc.findUnique({
    where: { slug },
  });

  if (!caseStudy) {
    notFound();
  }

  console.log("casestudy",caseStudy)

  const projectOverviewJson = JSON.parse(caseStudy.projectOverviewJson || '{}');
  const challengeJson = JSON.parse(caseStudy.challengeJson || '{}');
  const solutionJson = JSON.parse(caseStudy.solutionJson || '{}');
  const performanceJson = JSON.parse(caseStudy.performanceJson || '{}');  
  const achievementsJson = JSON.parse(caseStudy.achievementsJson || '{}'); 
  const heroStatsJson = JSON.parse(caseStudy.heroStatsJson || '{}');
  const detailsJson = JSON.parse(caseStudy.detailsJson || '{}');
  const testimonialJson = JSON.parse(caseStudy.testimonialJson || '{}');
  const campaignsJson =  JSON.parse(caseStudy.campaignsJson || '{}');
  const heroJson= JSON.parse(caseStudy.heroJson|| '{}');
  const toolsJson = JSON.parse(caseStudy.toolsJson|| '{}');
  const adPlatformsJson = JSON.parse(caseStudy.adPlatformsJson|| '{}');

  return (
    <div>
      <PPCCaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        data={heroStatsJson}
        heroJson={heroJson}
      />
      <PPCCaseStudyDetails data={detailsJson}
        projectOverviewJson={projectOverviewJson}
         challengeJson={ challengeJson }
         solutionJson={solutionJson}
         performanceJson={performanceJson}
         achievementsJson={achievementsJson}
         campaignsJson={campaignsJson}
         toolsJson={toolsJson}
         adPlatformsJson={adPlatformsJson}
         />      
         
      <PPCTestimonialRow data={testimonialJson} />
      <PPCCTABanner />
    </div>
  );
}