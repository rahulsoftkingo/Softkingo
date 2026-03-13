// app/hire/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import HireSection from './HireSection';
import LeadForm from '@/components/public/LeadForm';
import InquirySection from '@/components/footer/InquirySection';

export const metadata = {
  title: "Hire Dedicated Developers | Top 1% Tech Talent",
  description: "Hire expert React Native, Next.js, and Full-stack developers on an hourly or monthly basis. Scale your team with Softkingo.",
  alternates: { canonical: "/hire" }
};

export default function HirePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px]">
        <Image
          src="/images/hire/Hero-Section.webp"
          alt="Hiring talented developers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

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
                <span className="text-cyan-400">Hire Developers</span>
              </nav>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal animate-fadeInUp">
                  Hire World-Class{' '}
                  <span className="text-cyan-400">Developers & Tech Experts</span>
                </h1>

                <p className="text-gray-300 text-md leading-relaxed animate-fadeInUp animation-delay-200">
                  Build your dream team with top 1% tech talent. Access pre-vetted developers,
                  designers, QA engineers, and project managers who can seamlessly integrate
                  with your existing team and deliver exceptional results.
                </p>
              </div>

              {/* Recognition Badges */}
              <div className="space-y-3 animate-fadeInUp animation-delay-400">
                <div>
                  <h4 className='text-white text-3xl'>Trusted By</h4>
                  <h5 className='text-white'>500+ Companies Worldwide</h5>
                </div>
                <div className="flex gap-4 md:gap-8 items-center">
                  <div className="flex flex-col items-baseline">
                    <Image src="/images/about/clutch.png" width={100} height={50} alt="Clutch" />
                  </div>
                  <div className="flex flex-col items-baseline">
                    <p className="text-yellow-400 text-base md:text-lg">★★★★★</p>
                    <Image src="/images/about/goodfirm.png" width={150} height={50} alt="GoodFirms" />
                  </div>
                  <div className="flex flex-col items-baseline">
                    <p className="text-yellow-400 text-base md:text-lg">★★★★★</p>
                    <Image src="/images/about/upwork.png" width={100} height={50} alt="Upwork" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}

            <div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
              <LeadForm
                formType="hire"
                formKey='hire'
                serviceName='Hire Developers'
                title="Find Your Perfect Developer
"
                subtitle="Get matched with top talent in 24 Hours! "
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
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out; }
          .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
        `}</style>
      </section>

      <HireSection />
      <InquirySection />

    </div>
  );
}
