import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

import DigitalMarketingServices from "../DigitalMarketingServices";
import AppFeatures from "../AppFeatures";
import PlanFeatures from "../PlanFeatures";
import WhyChooseUs from "../WhyChooseUs";
import TaxiHero from "../TaxiHero";
import SeoIndustries from "../SeoIndustries";
import SeoServicesSlider from "../SeoServicesSlider";
import PricingPage from "../PricingPage";
import CuttingEdgeTech from "../CuttingEdgeTech";
import ConsultationCTA from "@/components/common/Consultation-Cta";
import FAQAccordion from "@/components/common/Faqaccordion";
import InquirySection from "@/components/footer/InquirySection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const digital = await prisma.page.findFirst({
    where: {
      slug,
      type: "digital",
      status: "published",
    },
    select: {
      title: true,
      seoTitle: true,
      seoDescription: true,
      seoImage: true,
    },
  });

  if (!digital) {
    return {};
  }

  return {
    title: digital.seoTitle || digital.title,
    description: digital.seoDescription,
    openGraph: {
      title: digital.seoTitle || digital.title,
      description: digital.seoDescription,
      images: digital.seoImage ? [digital.seoImage] : [],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const digital = await prisma.page.findFirst({
    where: {
      slug,
      type: "digital",
      status: "published",
    },
  });

  if (!digital) {
    return notFound();
  }

  const jsonContent = digital.contentJson
    ? JSON.parse(digital.contentJson)
    : {};

  const content =
    jsonContent.content && Object.keys(jsonContent.content).length > 0
      ? jsonContent.content
      : jsonContent;

  console.log("Digital Page Content:", content);

  return (
    <div>
      <TaxiHero
        data={{
          heroTitle: content.heroTitle,
          heroSubtitle: content.heroSubtitle,
          heroButtonText: content.heroButtonText,
          heroButtonLink: content.heroButtonLink,
          heroBg: content.heroBg,
        }}
      />

      <DigitalMarketingServices data={content.services} />

      <WhyChooseUs data={content.servicesList} />

      <SeoIndustries data={content.industries} />

      <SeoServicesSlider data={content.features} />

      <AppFeatures data={content.features} />

      <CuttingEdgeTech data={content.tech} />

      <PricingPage pricing={content.pricing} pricingCards={content.pricingCards} />

      {/* <PlanFeatures data={content.pricing} /> */}

      <ConsultationCTA
        title={content.consultation?.title}
        subtitle={content.consultation?.subtitle}
        buttonLabel={content.consultation?.buttonLabel}
        href={content.consultation?.href}
        imageSrc={content.consultation?.imageSrc}
      />

      <FAQAccordion data={content.faq} />

      <InquirySection data={content.inquiry} />
       </div>
 ); 
}