import SocialMediaCaseStudy from "../components/SocialMediaCaseStudy";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SocialMediaCaseStudyHero from "../components/SocialMediaCaseStudyHero";
import PPCCTABanner from "../../ppc/components/Ppcctabanner";

export default async function Page({ params }) {
  const { slug } = await params;

  const caseStudy = await prisma.portfolioSocialMedia.findUnique({
    where: { slug },
  });

  if (!caseStudy) {
    notFound();
  }

  // console.log("social media case study", caseStudy);

  const projectOverviewJson = JSON.parse(caseStudy.projectOverviewJson || '{}');
  const challengeJson = JSON.parse(caseStudy.challengeJson || '{}');
  const solutionJson = JSON.parse(caseStudy.solutionJson || '{}');
  const performanceJson = JSON.parse(caseStudy.performanceJson || '{}');
  const achievementsJson = JSON.parse(caseStudy.achievementsJson || '{}');
  const platformsJson = JSON.parse(caseStudy.platformsJson || '{}');
  const toolsJson = JSON.parse(caseStudy.toolsJson || '{}');
  const heroJson = JSON.parse(caseStudy.heroJson || '{}');
  const adPlatformsJson = JSON.parse(caseStudy.heroJson || '{}')


  return (
    <main>

      <SocialMediaCaseStudyHero
        heroJson={heroJson}
      />
      <SocialMediaCaseStudy
        projectOverviewJson={projectOverviewJson}
        challengeJson={challengeJson}
        solutionJson={solutionJson}
        performanceJson={performanceJson}
        achievementsJson={achievementsJson}
        platformsJson={platformsJson}
        toolsJson={toolsJson}
        adPlatformsJson={adPlatformsJson}
      />
      <PPCCTABanner />
    </main>
  );
}