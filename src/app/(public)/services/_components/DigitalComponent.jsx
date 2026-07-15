"use client";
import DigitalMarketingServices from "../../digital/DigitalMarketingServices";
import AppFeatures from "../../digital/AppFeatures";
import PlanFeatures from "../../digital/PlanFeatures";
import WhyChooseUs from "../../digital/WhyChooseUs";
import TaxiHero from "../../digital/TaxiHero";
import SeoIndustries from "../../digital/SeoIndustries";
import SeoServicesSlider from "../../digital/SeoServicesSlider";
import PricingPage from "../../digital/PricingPage";
import CuttingEdgeTech from "../../digital/CuttingEdgeTech";
import OurProcessRadial from "../../digital/OurProcessRadial";
import ServicesByCompany from "../../digital/ServicesByCompany"
import WorkflowAddOns from "../../digital/WorkFlowAddons";
import ConsultationCTA from '@/components/common/Consultation-Cta';
import FAQAccordion from '@/components/common/Faqaccordion';
import InquirySection from "@/components/footer/InquirySection";
import CommonTitle from '@/components/ui/CommonTitle';


export default function DigitalComponent({ content }) {
  return (
    <div>
      <div>
        <TaxiHero
          data={{
            heroTitle: content.heroTitle,
            heroSubtitle: content.heroSubtitle,
            heroButtonText: content.heroButtonText,
            heroButtonLink: content.heroButtonLink,
            heroButtonText2: content.heroButtonText2,
            heroButtonLink2: content.heroButtonLink2,
            heroBg: content.heroBg,
            heroBullets: content.heroBullets,         
          }}
        />

        <ServicesByCompany data={content.enterpriseMarketing} />

        <DigitalMarketingServices data={content.services} />

        <WhyChooseUs data={content.servicesList} />

        <SeoIndustries data={content.industries} />

        <SeoServicesSlider data={content.features} />

        <AppFeatures data={content.features} />

        <CuttingEdgeTech data={content.tech} />

        <PricingPage pricing={content.pricing} pricingCards={content.pricingCards} />
        <WorkflowAddOns />

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
    </div>

  );
}