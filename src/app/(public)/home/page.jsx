// src/app/(public)/home/page.jsx
import Script from "next/script";
import HeroSection from "./_components/HeroSection";
import Feature from "./_components/FeatureSection";
import Crafting from "./_components/CraftingSection";
import Service from "./_components/ServiceSection";
import HomePortfolio from "./_components/HomePortfolio";
import IndustryTabsSection from "./_components/IndustryTabsSection";
import Tech from "./_components/TechnologySection";
import Process from "./_components/ProcessSection";
import Strengths_Scroll from "./_components/StrengthsScroll";
import ReviewSection from "./_components/ClientsReview";
import FooterForm from "@/components/footer/InquirySection";
import BlogSection from "@/components/common/BlogSection";
import { commonSchemas } from "@/lib/commonSchema";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <div className="bg-white">
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.softkingo.com/#website",
                "url": "https://www.softkingo.com",
                "name": "Softkingo",
                "description": "Softkingo is a software development company."
              },

              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.softkingo.com/"
                  }
                ]
              },

              ...commonSchemas
            ]
          })
        }}
      />
      <HeroSection />
      <Feature />
      <Crafting />
      <Service />
      <HomePortfolio />
      <IndustryTabsSection />
      <Tech />
      <Process />
      <Strengths_Scroll />

      <BlogSection
        category=""
        title="Our Latest Blogs"
        subtitle="Explore our latest insights, product lessons, and engineering best practices."
      />
      <ReviewSection />

      <FooterForm />
    </div>
  );
}

