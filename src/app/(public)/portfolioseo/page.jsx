import SolutionsClientOverview from './components/SolutionsClientOverview';
import SolutionsSeoStrategy from './components/SolutionsSeoStrategy'
import BeforeAfterResults from './components/BeforeAfterResults';
import KeywordAndTrafficGrowth from './components/Keywordandtrafficgrowth';
import SeoPerformanceDashboard from './components/Seoperformancedashboard';
import TechnicalSeoAndContentGrowth from './components/Technicalseoandcontentgrowth';
import BusinessImpactAndTestimonial from './components/Businessimpactandtestimonial';
import SeoCtaBanner from './components/Seoctabanner';
import Seocasestudyhero from './components/Seocasestudyhero';
// adjust the path to wherever you save the file, e.g. '@/components/sections/SolutionsClientOverview'

export default function Page() {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* ...other sections like Hero, SolutionsWhyNeed, etc. */}

            <Seocasestudyhero />
            <SolutionsClientOverview />
            <SolutionsSeoStrategy />
            <BeforeAfterResults />
            <SeoPerformanceDashboard />
            <KeywordAndTrafficGrowth />
            <TechnicalSeoAndContentGrowth />
            <BusinessImpactAndTestimonial />
            <SeoCtaBanner />
            {/* ...more sections */}
        </div>
    );
}