"use client";
import DigitalMarketingServices from "../../digital/DigitalMarketingServices";
import AppFeatures from "../../digital/AppFeatures";
import PlanFeatures from "../../digital/PlanFeatures";
import WhyChooseUs from "../../digital/WhyChooseUs";
import TaxiHero from "../../digital/TaxiHero";
import SeoIndustries from "../../digital/SeoIndustries";
import SeoServicesSlider from "../../digital/SeoServicesSlider";
import TrustedByCard from "../../digital/TrustedByCard";
import PricingPage from "../../digital/PricingPage";
import CuttingEdgeTech from "../../digital/CuttingEdgeTech";
import ServicesByCompany from "../../digital/ServicesByCompany"
import WorkflowAddOns from "../../digital/WorkFlowAddons";
import ConsultationCTA from '@/components/common/Consultation-Cta';
import FAQAccordion from '@/components/common/Faqaccordion';
import InquirySection from "@/components/footer/InquirySection";



export default function DigitalComponent({ content }) {

  console.log("Rahul content",content)
  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "softkingo",
                "item": "https://www.softkingo.com"
              },
               {
                "@type": "ListItem",
                "position": 2,
                "name": "digitalmarket",
                "item": `https://www.softkingo.com/${"digitalmarket"}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": content?.slug || "digital",
                "item": `https://www.softkingo.com/${content?.slug || "digital"}`
              }
            ]
          })
        }}
      />

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
            slug:content.slug        
          }}
        />
        <div className="bg-white">
        <TrustedByCard/>
        </div>
        <ServicesByCompany data={content.enterpriseMarketing} />

        <DigitalMarketingServices data={content.services} />

        <WhyChooseUs data={content.servicesList} />

        <SeoIndustries data={content.industries} />

        <SeoServicesSlider data={content.features} />

        <AppFeatures data={content.features} />

        <CuttingEdgeTech data={content.tech} />

        <PricingPage pricing={content.pricing} pricingCards={content.pricingCards} />
        
        <WorkflowAddOns data={content.workflowAddOns}  />

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