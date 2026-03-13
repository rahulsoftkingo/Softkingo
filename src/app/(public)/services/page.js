// src/app/(public)/services/page.jsx
import Link from 'next/link';
import { Star } from 'lucide-react';
import ServicesSection from './ServicesSection';
import Image from 'next/image';
import LeadForm from '@/components/public/LeadForm';
import InquirySection from '@/components/footer/InquirySection';
export const metadata = {
  title: "Custom Software Development Services",
  description: "End-to-end development services: Mobile Apps (iOS/Android), Web Applications, UI/UX Design, and AI/ML solutions.",
  alternates: { canonical: "/services" }
};
export default function ServicesHero() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px]">
        {/* <section className="relative min-h-screenbg-coverbg-center overflow-hidden"> */}
        {/* Background Image with Overlay */}

        <Image
          src="/images/services/s-bg.png"
          alt="Team collaborating in an office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Content */}
            <div className="text-white space-y-8 animate-fadeInLeft">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
                <span className="text-gray-400">›</span>
                <span className="text-cyan-400">Our services</span>
              </nav>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal animate-fadeInUp">
                  We Transform Brands Through{' '}
                  <span className="text-cyan-400">Elevated Digital Experiences</span>
                </h1>

                <p className="text-gray-300 text-md leading-relaxed animate-fadeInUp animation-delay-200">
                  Softkingo Technologies Pvt Ltd is an exclusive hub of top dedicated software
                  developers, UI/UX designers, mobile app developers, QA professionals,
                  and product managers with incredible rare and hidden talents. We provide access
                  to the top 1% of IT talent, ranging from independent software developers to fully
                  managed teams.
                </p>
              </div>

              {/* Recognition Badges */}
              <div className="space-y-3 animate-fadeInUp animation-delay-400">
                <>
                  <div>
                    <h4 className='text-white text-3xl'>Recognized By</h4>
                    <h5 className='text-white'>Reviewed on</h5>
                  </div>
                  <div className="flex gap-4 md:gap-8 items-center">
                    <div className="flex flex-col items-baseline ">
                      <Image src={"/images/about/clutch.png"} width={100} height={50} alt="Upwork" />

                    </div>

                    <div className="flex flex-col items-baseline  ">
                      <p className="text-yellow-400 text-base md:text-lg">★★★★★</p>
                      <Image src={"/images/about/goodfirm.png"} width={150} height={50} alt="GoodFirms" />
                    </div>

                    <div className="flex flex-col items-baseline">
                      <p className="text-yellow-400 text-base md:text-lg">★★★★★</p>
                      <Image src={"/images/about/upwork.png"} width={100} height={50} alt="Upwork" />
                    </div>
                  </div>
                </>
              </div>
            </div>

            {/* Right Form */}

            <div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
              <LeadForm
                formType="service"
                formKey='service'
                serviceName='our service'
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

        {/* CSS Animations */}
        <style >{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>


      </section>
      <ServicesSection />
      <InquirySection />

    </div>
  );
}
