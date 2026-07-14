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
import CommonTitle from "@/components/ui/CommonTitle";
import InquirySection from "@/components/footer/InquirySection";


export default function DigitalComponent({ content }) {
  return (
    <div>
      {/* <div>
        <TaxiHero />
      </div>
      <div>
        <DigitalMarketingServices />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <SeoIndustries />
      </div>
      <div>
        <SeoServicesSlider />
      </div>
      <div>
        <AppFeatures />
      </div>
      <div>
        <CuttingEdgeTech />
      </div>
      <div>
        <PlanFeatures />
      </div>
      <div>
        <PricingPage />
      </div>
      <div>
        <ConsultationCTA
          title="Book A FREE Consultation With Us"
          subtitle="Share your project idea and we’ll provide a free consultation on how we will turn it into reality and an amazing digital product."
          buttonLabel="Book a Free Demo"
          href="/contact"
          imageSrc="/images/cta/cta-img.png"
        />
      </div>
      <div>
        <FAQAccordion/>
      </div>
      <div>
        <InquirySection />
      </div> */}
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

        <ServicesByCompany data={content.enterpriseMarketing} />

        <DigitalMarketingServices data={content.services} />

        <WhyChooseUs data={content.servicesList} />

        <SeoIndustries data={content.industries} />

        <SeoServicesSlider data={content.features} />

        <AppFeatures data={content.features} />

        <CuttingEdgeTech data={content.tech} />

        <PricingPage pricing={content.pricing} pricingCards={content.pricingCards} />
        <WorkflowAddOns/>

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