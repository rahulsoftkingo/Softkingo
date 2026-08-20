import PPCCaseStudyHero from './components/Ppccasestudyherostatic';
import PPCCaseStudyDetails from './components/PPCCaseStudyDetails';
import PPCCTABanner from './components/Ppcctabanner';
import PPCTestimonialRow from './components/Ppctestimonialrow';

export default function Page({ params }) {
  return (
    <div>
      <PPCCaseStudyHero />
      <PPCCaseStudyDetails />
      <PPCTestimonialRow />
      <PPCCTABanner />
    </div>
  );
}