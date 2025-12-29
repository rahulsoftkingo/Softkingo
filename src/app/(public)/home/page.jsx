import HeroSection from "./h1-hero-section/page";
import Feature from "./h2-feature-section/page";
import Crafting from "./h3-crafting/page";
import Service from "./h4-service/page";
import Portfolio from "./h5-portfolio-section/page";
import Industries from "./h6-industries-section/page";
import Process from "./h7-process/page";
import Strengths_Scroll from "./h8-strengths-scroll/page";
import ReviewSection from "./h9-clients-review/page";
import Blogs from "./blogs/page";
 import Tech from "@/app/(public)/home/h10-technology/page"
import { Container } from "postcss";

import FooterForm from "@/components/footer/footer-form";
export default function Home() {

  return (

    <div className="bg-white ">
      {/* <Container/> */}
      {/* Example button to trigger scroll */}
      {/* <button onClick={handleScroll} className="fixed top-4 right-4 z-50 bg-[#28AFDF] text-white px-4 py-2 rounded">
        Go to Strengths
      </button> */}
      <HeroSection />

      <Feature />

      <Crafting />
      <Service />
       <Portfolio/>
      <Industries />
<Tech/>
      <Process />
      {/* Pass the ref to Scroll */}
      <Strengths_Scroll />
      <ReviewSection />
      {/* <Hero /> */}

      {/* <Client scrollRef={scrollRef} /> */}
     
      <Blogs />
      <FooterForm/>
      {/* <Landing /> */}
      {/* <Services /> */}


    </div>

  );
}