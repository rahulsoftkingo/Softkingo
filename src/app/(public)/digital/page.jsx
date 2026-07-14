"use client";


import DigitalMarketingServices from "./DigitalMarketingServices";
import AppFeatures from "./AppFeatures";
import PlanFeatures from "./PlanFeatures";
import WhyChooseUs from "./WhyChooseUs";
import TaxiHero from "./TaxiHero";
import SeoIndustries from "./SeoIndustries";
import SeoServicesSlider from "./SeoServicesSlider";
import ServicesByCompany from "./ServicesByCompany"
import PricingPage from "./PricingPage";
import CuttingEdgeTech from "./CuttingEdgeTech";
import ConsultationCTA from '@/components/common/Consultation-Cta';
import FAQAccordion from '@/components/common/Faqaccordion';
import CommonTitle from "@/components/ui/CommonTitle";
import InquirySection from "@/components/footer/InquirySection";
import OurProcessRadial from "./OurProcessRadial";
import WorkflowAddOns from "./WorkFlowAddons";


export default function Page() {
    return (
        <div>
            <div>
                <TaxiHero />
            </div>

            <div>
                <ServicesByCompany />
            </div>
            <div>
                <OurProcessRadial />
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
                <FAQAccordion />
            </div>
            <div>
                <InquirySection />
            </div>

        </div>

    );
}