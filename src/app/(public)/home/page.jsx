// src/app/(public)/home/page.jsx
import HeroSection from "./h1-hero-section/page";
import Feature from "./h2-feature-section/page";
import Crafting from "./h3-crafting/page";
import Service from "./h4-service/page";
import Portfolio from "./h5-portfolio-section/page";
import Industries from "./h6-industries-section/page";
import Process from "./h7-process/page";
import Strengths_Scroll from "./h8-strengths-scroll/page";
import ReviewSection from "./h9-clients-review/page";
import Tech from "@/app/(public)/home/h10-technology/page";
import FooterForm from "@/components/footer/InquirySection";
import Blogs from "@/app/(public)/home/blogs/BlogSliderClient"
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <Feature />
      <Crafting />
      <Service />
      <Portfolio />
      <Industries />
      <Tech />
      <Process />
      <Strengths_Scroll />

      <Blogs
        category=""
        featured={false}    // Latest uploaded
        title="Our Latest Blogs"
        subtitle="Explore our latest insights, product lessons, and engineering best practices."
      />
      <ReviewSection />

      <FooterForm />
    </div>
  );
}
