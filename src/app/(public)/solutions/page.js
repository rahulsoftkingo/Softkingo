// src/app/solutions/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import SolutionsSection from './SolutionsSection';
import InquirySection from '@/components/footer/InquirySection';

export const metadata = {
  title: "Industry-Specific Software Solutions",
  description: "Custom-built solutions for Food Delivery, Healthcare, E-commerce, and Fintech industries. Ready-to-deploy and scalable.",
  alternates: { canonical: "/solutions" }
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] md:min-h-[400px]">
        <Image
          src="/images/solutions/Solutions.webp"
          alt="Industry Solutions Background"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black to-black/50 opacity-70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8  py-24 md:py-32">
          <nav className="flex items-center space-x-3 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-sky-400 font-medium">Solutions</span>
          </nav>

          <h1 className="max-w-3xl text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">
            End-to-End Software <span className="text-sky-500">Solutions</span> for Global Growth
          </h1>
          <p className="max-w-2xl text-md md:text-lg text-sky-50 font-light leading-relaxed">
            From disruptive startups to enterprise leaders, we provide the tech foundation your business needs. Explore our ready-to-deploy clones, custom SaaS architectures, and specialized domain solutions designed for speed and scale.
          </p>
        </div>
      </section>

      <SolutionsSection />

      {/* Global Animations & Rounded Shadows */}
      <style >{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.85s ease-out forwards;
        }
        /* Refined shadows and balanced rounding */
        .case-study-card {
          border-radius: 1.25rem; /* 20px */
          box-shadow: 0 20px 30px -10px rgb(0 0 0 / 0.3);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .case-study-card:hover {
          box-shadow: 0 30px 45px -15px rgb(0 0 0 / 0.4);
          transform: translateY(-6px);
        }
        .hover-scale {
          transition: transform 0.3s ease;
          border-radius: 1rem;
          box-shadow: 0 15px 25px -5px rgb(0 0 0 / 0.2);
        }
        .hover-scale:hover {
          transform: scale(1.06);
          box-shadow: 0 25px 45px -10px rgb(0 0 0 / 0.35);
        }
      `}</style>
      <InquirySection />

    </div>
  );
}
