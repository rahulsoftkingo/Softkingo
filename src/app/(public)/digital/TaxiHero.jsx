import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import LeadForm from "@/components/public/LeadForm";

const FEATURES = [
  "Real-time GPS Tracking & Live Fare Estimates",
  "Rider, Driver & Admin Panel Integrations",
  "In-app Chat, Payments & Ride Scheduling",
  "Multi-language & Multi-currency Support",
];

// 👇 Dummy/default data — agar backend se data na aaye to yahi dikhega
const DEFAULT_DATA = {
  heroTitle: "Taxi Booking App Development Company That Delivers Results",
  heroSubtitle:
    "<p>Boost your ride-hailing business with our trusted full-service taxi app development team in India, delivering client-first solutions focused on measurable growth, not just features.</p>",
  heroButtonText: "Speak to Our Experts",
  heroButtonLink: "/contact",
  heroButtonText2: "",
  heroButtonLink2: "",
  heroBullets: [], // ✅ FIX: default empty array so .map() never crashes
  heroBg: "",
};

export default function TaxiHero({ data }) {
  const heroTitle = data?.heroTitle || DEFAULT_DATA.heroTitle;
  const heroSubtitle = data?.heroSubtitle || DEFAULT_DATA.heroSubtitle;
  const heroButtonText = data?.heroButtonText || DEFAULT_DATA.heroButtonText;
  const heroButtonLink = data?.heroButtonLink || DEFAULT_DATA.heroButtonLink;
  const heroButtonText2 = data?.heroButtonText2 || DEFAULT_DATA.heroButtonText2;
  const heroButtonLink2 = data?.heroButtonLink2 || DEFAULT_DATA.heroButtonLink2;
  const heroBullets = Array.isArray(data?.heroBullets) ? data.heroBullets : DEFAULT_DATA.heroBullets;
  const heroBg = data?.heroBg || DEFAULT_DATA.heroBg;


  return (
    <div>
      <section
        className="relative bg-[#0B1F2A]"
        style={
          heroBg
            ? {
                backgroundImage: `linear-gradient(rgba(11,31,42,0.85), rgba(11,31,42,0.85)), url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-18 w-full">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="md:col-span-2 text-white space-y-4 animate-fadeInLeft">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-xs md:text-sm animate-fadeInUp">
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
                <span className="text-gray-400">&gt;</span>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Our Services
                </Link>
                 <span className="text-gray-400">&gt;</span>
                  <Link href="/services" className="hover:text-cyan-400 transition-colors">
                 {data.slug}
                </Link>
              </nav>

              {/* Heading & Description */}
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal animate-fadeInUp">
                  {heroTitle}
                </h1>

                <div
                  className="text-gray-300 text-sm md:text-base leading-relaxed animate-fadeInUp animation-delay-200 max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: heroSubtitle }}
                />
              </div>

              {/* Feature List */}
              {heroBullets.length > 0 && (
                <ul className="space-y-2 pt-1 animate-fadeInUp animation-delay-200">
                  {heroBullets.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-200">
                      <FaCheckCircle className="text-sky-400 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2 animate-fadeInUp animation-delay-400">
                <Link
                  href={heroButtonLink}
                  className="px-6 md:px-8 py-3 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 text-white text-xs md:text-sm font-bold hover:bg-gradient-to-l hover:from-sky-500 hover:to-sky-400 transform hover:-translate-y-1 shadow-xl shadow-sky-900/40 transition-all duration-300 items-center cursor-pointer inline-flex uppercase tracking-wider"
                >
                  {heroButtonText} <FaArrowRight className="ml-2" />
                </Link>

                {heroButtonText2 ? (
                  <Link
                    href={heroButtonLink2 || "#"}
                    className="px-6 md:px-8 py-3 rounded-full border border-sky-400/60 text-white text-xs md:text-sm font-bold hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 items-center cursor-pointer inline-flex uppercase tracking-wider"
                  >
                    {heroButtonText2}
                  </Link>
                ) : (
                  <Link
                    href="/audit"
                    className="px-6 md:px-8 py-3 rounded-full border border-sky-400/60 text-white text-xs md:text-sm font-bold hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 items-center cursor-pointer inline-flex uppercase tracking-wider"
                  >
                    Audit Your App Idea
                  </Link>
                )}
              </div>

              {/* Trusted By Section */}
              <div className="pt-4 md:pt-6 animate-fadeInUp animation-delay-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent md:hidden"></div>

                  <h3 className="text-sky-200 text-sm md:text-base font-semibold">
                    Trusted By Leading Brands
                  </h3>

                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
                </div>

                <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center lg:justify-start">
                  <div className="flex flex-col items-center">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <Image
                      src="/images/about/clutch.png"
                      alt="Clutch"
                      width={100}
                      height={50}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <Image
                      src="/images/about/goodfirm.png"
                      alt="GoodFirms"
                      width={120}
                      height={40}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                    <Image
                      src="/images/about/upwork.png"
                      alt="Upwork"
                      width={90}
                      height={40}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
              <LeadForm
                formType="service"
                formKey="service"
                serviceName="our service"
                title="Book a Free Consultation"
                subtitle="Response within 1 Business Day!"
                variant="hero"
                showLogo={true}
                showCompany={false}
                showBudget={false}
                showAttachment={false}
                showNDA={false}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
          .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-800 { animation-delay: 0.8s; opacity: 0; animation-fill-mode: forwards; }
        `}</style>
      </section>
    </div>
  );
}