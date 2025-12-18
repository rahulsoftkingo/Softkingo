// app/solutions/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import SolutionsSection from './SolutionsSection';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] md:min-h-[650px]">
        <Image
          src="/images/hire/h-bg.png"
          alt="Industry Solutions Background"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black to-black/50 opacity-70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
          <nav className="flex items-center space-x-3 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-sky-300 font-semibold">Industry Solutions</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight max-w-3xl text-white">
            Tailored Solutions for Every <span className="text-sky-500">Industry</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
            Delivering industry-specific software and technology solutions designed to meet your unique business challenges. 
            Explore our expert services crafted for manufacturing, retail, healthcare, finance, and more.
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
    </div>
  );
}
