import Link from 'next/link';
import Image from 'next/image';
import { 
  FaHeartbeat, FaGraduationCap, FaBuilding, FaPlane, FaUtensils, 
  FaDumbbell, FaStore, FaTruck, FaFilm, FaUsers, FaDollarSign, 
  FaCar, FaHammer, FaIndustry as FaFactory, FaCalendarAlt, FaChevronRight 
} from 'react-icons/fa';
import InquirySection from '@/components/footer/InquirySection';

export const metadata = {
  title: "Industries We Serve | Industry-Specific Tech Solutions",
  description: "Transforming sectors like Healthcare, FinTech, and Logistics with domain-specific software. Explore Softkingo's industry expertise.",
  alternates: { canonical: "/industries" }
};

const industries = [
  { title: "Healthcare", href: "/industries/healthcare", icon: <FaHeartbeat />, color: "from-rose-500/10 to-rose-500/5", iconColor: "text-rose-600", image: "/images/industries/i-1.png" },
  { title: "Education / E-Learning", href: "/industries/education", icon: <FaGraduationCap />, color: "from-sky-500/10 to-sky-500/5", iconColor: "text-sky-600", image: "/images/industries/education-preview.jpg" },
  { title: "Real Estate", href: "/industries/real-estate", icon: <FaBuilding />, color: "from-emerald-500/10 to-emerald-500/5", iconColor: "text-emerald-600", image: "/images/industries/realestate-preview.jpg" },
  { title: "Travel & Tourism", href: "/industries/travel", icon: <FaPlane />, color: "from-orange-500/10 to-orange-500/5", iconColor: "text-orange-600", image: "/images/industries/travel-preview.jpg" },
  { title: "Food & Restaurant", href: "/industries/restaurant", icon: <FaUtensils />, color: "from-amber-500/10 to-amber-500/5", iconColor: "text-amber-600", image: "/images/industries/food-preview.jpg" },
  { title: "Fitness & Wellness", href: "/industries/fitness", icon: <FaDumbbell />, color: "from-purple-500/10 to-purple-500/5", iconColor: "text-purple-600", image: "/images/industries/fitness-preview.jpg" },
  { title: "Retail & E-Commerce", href: "/industries/retail", icon: <FaStore />, color: "from-indigo-500/10 to-indigo-500/5", iconColor: "text-indigo-600", image: "/images/industries/ecommerce-preview.jpg" },
  { title: "Logistics", href: "/industries/logistics", icon: <FaTruck />, color: "from-slate-500/10 to-slate-500/5", iconColor: "text-slate-600", image: "/images/industries/logistics-preview.jpg" },
  { title: "Media & Entertainment", href: "/industries/entertainment", icon: <FaFilm />, color: "from-lime-500/10 to-lime-500/5", iconColor: "text-lime-600", image: "/images/industries/media-preview.jpg" },
  { title: "Social Networking", href: "/industries/social-media", icon: <FaUsers />, color: "from-fuchsia-500/10 to-fuchsia-500/5", iconColor: "text-fuchsia-600", image: "/images/industries/social-preview.jpg" },
  { title: "Finance / FinTech", href: "/industries/fintech", icon: <FaDollarSign />, color: "from-green-500/10 to-green-500/5", iconColor: "text-green-600", image: "/images/industries/fintech-preview.jpg" },
  { title: "Automotive", href: "/industries/automotive", icon: <FaCar />, color: "from-blue-500/10 to-blue-500/5", iconColor: "text-blue-600", image: "/images/industries/automotive-preview.jpg" },
  { title: "Construction", href: "/industries/construction", icon: <FaHammer />, color: "from-yellow-500/10 to-yellow-500/5", iconColor: "text-yellow-600", image: "/images/industries/construction-preview.jpg" },
  { title: "Manufacturing", href: "/industries/manufacturing", icon: <FaFactory />, color: "from-gray-500/10 to-gray-500/5", iconColor: "text-gray-600", image: "/images/industries/manufacturing-preview.jpg" },
  { title: "Sports & Events", href: "/industries/sports", icon: <FaCalendarAlt />, color: "from-violet-500/10 to-violet-500/5", iconColor: "text-violet-600", image: "/images/industries/events-preview.jpg" },
];

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[500px] flex items-center">
        <Image
          src="/images/industries/industries-bg.png"
          alt="Industries Expertise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 px-4 py-2 rounded-full mb-6">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">Global Expertise</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Industries We <span className="text-sky-500">Transform</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            We build tailored digital products for high‑impact industries, aligning technology with complex domain workflows to drive real business value.
          </p>
        </div>
      </section>

      {/* Industry Listing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {industries.map((industry, index) => (
            <div 
              key={industry.title}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-24 last:mb-0 ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br ${industry.color}`}>
                   <span className={`text-2xl ${industry.iconColor}`}>{industry.icon}</span>
                   <span className="font-bold text-slate-900">{industry.title}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  Driving Digital Innovation in {industry.title}
                </h2>
                
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Specialized software solutions designed to streamline {industry.title.toLowerCase()} operations. 
                  From compliance-ready architectures to real-time analytics, we cover it all.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2"><FaChevronRight className="text-sky-500 text-[10px]" /> Industry-compliant Tech</li>
                  <li className="flex items-center gap-2"><FaChevronRight className="text-sky-500 text-[10px]" /> Scalable Infrastructure</li>
                  <li className="flex items-center gap-2"><FaChevronRight className="text-sky-500 text-[10px]" /> Advanced Security</li>
                  <li className="flex items-center gap-2"><FaChevronRight className="text-sky-500 text-[10px]" /> Real-time Analytics</li>
                </ul>

                <Link
                  href={industry.href}
                  className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-200"
                >
                  Explore Solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image Side */}
              <div className="flex-1 w-full">
                <div className="relative h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <InquirySection />
    </div>
  );
}

function ArrowRight({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}