import prisma from '@/lib/prisma';

import Image from 'next/image';
import { FaStar, FaBrain, FaEye, FaTasks, FaTools, FaLightbulb, FaFlag } from "react-icons/fa";
import { FiArrowRight, FiTarget } from "react-icons/fi";
import StoryTimeline from './CustomScrool';
import Link from 'next/link';
import CommonTitle from '@/components/ui/CommonTitle';
import InquirySection from '@/components/footer/InquirySection';
import FAQAccordion from '@/components/common/Faqaccordion';

export const metadata = {
  title: "About Us | Leading Software Experts in India",
  description: "Learn about Softkingo's journey, our mission to drive digital transformation, and the team behind our world-class software solutions.",
  alternates: { canonical: "/about" }
};

const FaqData = {
  title: "General",
  gradientText: "FAQs",
  subtitle: "Everything you need to know about Softkingo's expertise, locations, and delivery process.",
  items: [
    {
      id: 1,
      q: "What core services does Softkingo provide?",
      a: "Softkingo is a full-service digital agency specializing in custom software engineering, mobile app development (iOS, Android, and Hybrid), and complete web solutions. We also provide high-impact digital marketing services including SEO, SEM, and Social Media Optimization to ensure your digital products reach the right audience."
    },
    {
      id: 2,
      q: "Where is Softkingo located?",
      a: "Our global headquarters is based in New Delhi, India. To provide seamless support to our international clients, we also operate through regional offices and dedicated teams in the United States, Canada, and Australia. This allows us to offer 24/7 collaboration regardless of your time zone."
    },
    {
      id: 3,
      q: "How experienced is the Softkingo team?",
      a: "With over 6 years in the industry, our team has grown to 40+ enthusiastic professionals who have successfully delivered more than 400 projects. We are proud to be an ISO-certified company and have been recognized as a Top Mobile App Development Company by industry leaders like Clutch and Tech Behemoths."
    },
    {
      id: 4,
      q: "What is your approach to project development?",
      a: "We strictly follow the Agile methodology. This means we break your project into smaller, manageable 'sprints,' providing you with regular updates and the flexibility to make changes as we progress. This transparent approach ensures the final product aligns perfectly with your business goals."
    },
    {
      id: 5,
      q: "How do you handle data security and confidentiality?",
      a: "Data security is non-negotiable for us. We sign a Non-Disclosure Agreement (NDA) for every project to protect your intellectual property. We also follow global security standards (like GDPR or HIPAA where applicable) and use advanced encryption to keep your business data safe."
    },
    {
      id: 6,
      q: "Can we hire a dedicated team for long-term projects?",
      a: "Yes, we offer flexible engagement models. You can hire a dedicated development team for ongoing support, opt for hourly-based hiring for specific tasks, or choose a fixed-cost model for projects with a clearly defined scope. This flexibility helps you scale your team based on your current project needs."
    }
  ]
};

const stats = [
  { number: '6+', label: 'Years Of Experience' },
  { number: '400+', label: 'Apps Developed' },
  { number: '50+', label: 'Mobile App Developer' },
  { number: '350+', label: 'Clients Worldwide' },
];

const imageMap = [
  { src: '/images/about/r1.png', alt: 'Team meeting' },
  { src: '/images/about/r2.png', alt: 'Team meeting' },
  { src: '/images/about/r3.png', alt: 'Team meeting' },
  { src: '/images/about/r4.png', alt: 'Team meeting' },
];

const industries = [
  {
    name: 'Healthcare',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    name: 'Travel',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'E-Commerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    name: 'Start-ups',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Government',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Real Estate',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Insur-tech',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Games',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Logistics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
  },
  {
    name: 'Automotive',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    name: 'Education',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const coreValues = [
  { icon: FaStar, title: 'Originality', description: 'To be authentic and valuable' },
  { icon: FaBrain, title: 'Self Development', description: 'To drive personal growth' },
  { icon: FaEye, title: 'Lucidity', description: 'To be explicit and intelligible' },
  { icon: FaTasks, title: 'Diligence', description: 'To be attentive and persistent' },
  { icon: FaTools, title: 'Workmanship', description: 'To be artistic in whatever we do' },
  { icon: FaLightbulb, title: 'Innovative', description: 'To be creative and forward-looking' },
];

const featuredLogos = [
  { name: 'Clutch', logo: '/images/about/f6.png' },
  { name: 'Business Insider', logo: '/images/about/f5.png' },
  { name: 'GlobeNewswire', logo: '/images/about/f4.png' },
  { name: 'HuffPost', logo: '/images/about/f1.png' },
  { name: 'Bloomberg', logo: '/images/about/f2.png' },
  { name: 'TechCrunch', logo: '/images/about/f3.png' },
];

export default async function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px] ">
        <Image
          src="/images/about/about-us-banner.png"
          alt="Team collaborating in an office"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black/50 opacity-70"></div>

        <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2  max-w-7xl mx-auto ">
          <div className="flex flex-col justify-center px-6  py-12 md:py-16">
            {/* Left Content */}
            <div className="text-white space-y-8 animate-fadeInLeft">
              {/* Breadcrumb */}

              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/" className="hover:text-cyan-400 transition-colors text-white">
                  Home
                </Link>
                <span className="text-gray-400">›</span>
                <span className="text-cyan-400">About us</span>
              </nav>


              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal animate-fadeInUp text-white">
                  We Transform Brands Through{' '}
                  <span className="text-cyan-400">Elevated Digital Experiences</span>
                </h1>

                <p className="text-gray-300 text-md leading-relaxed animate-fadeInUp animation-delay-200">
                  {/* Softkingo is an IT service and solutions company that collaborates with companies worldwide to shape the next generation of businesses. We focus our efforts on a comprehensive intelligence system that spans multiple industries and domains. */}
                  Softkingo is an ISO-certified web, mobile app, and digital marketing (SEO, SEM, SMO) development company with offices in the United States, Canada, and Australia, along with a headquarters in New Delhi, India. Our team consists of over 40+ highly skilled, experienced, and enthusiastic professionals.
                </p>
              </div>
              {/* Trusted By Section */}
              <div className="pt-6 md:pt-8 animate-fadeInUp animation-delay-800  ">
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
          </div>
          <div className="hidden lg:flex flex-col justify-center px-8 md:px-16 py-16">
            <div className="border-t border-white/30"></div>

            <div className='flex justify-between text-white items-center'>
              <a href="our-team" className="text-white text-xl lg:text-2xl font-semibold hover:text-cyan-400 transition py-6 border-b border-white/30 flex-1">
                Meet The Team
              </a>
              <FiArrowRight size={20} className="ml-4" />
            </div>

            <div className='flex justify-between text-white items-center'>
              <a href="gallery" className="text-white text-xl lg:text-2xl font-semibold hover:text-cyan-400 transition py-6 border-b border-white/30 flex-1">
                Inside  Gallery
              </a>
              <FiArrowRight size={20} className="ml-4" />
            </div>

            <div className='flex justify-between text-white items-center'>
              <a href="careers" className="text-white text-xl lg:text-2xl font-semibold hover:text-cyan-400 transition py-6 border-b border-white/30 flex-1">
                Careers
              </a>
              <FiArrowRight size={20} className="ml-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full bg-white px-6 md:px-12lg:px-20 py-12 md:py-16 lg:py-20 max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative">
          <div className=" grid grid-cols-6 gap-3 md:gap-4 ">
            <div style={{ boxShadow: '#18ceff -20px -15px 0px' }} className="rounded-tl-[5rem] md:rounded-tl-[10rem] rounded-2xl h-48 max-h-76 overflow-hidden col-span-4">
              <Image
                src="/images/about/r6.png"
                alt="Team meeting"
                width={500}
                height={600}
                className="w-full  h-full object-cover"
              />
            </div>
            <div className="col-span-2 rounded-tr-[3rem] md:rounded-tr-[5rem] rounded-2xl overflow-hidden h-48 max-h-76">
              <Image
                src="/images/about/r7.png"
                alt="Team member"
                width={250}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-4 rounded-bl-[3rem] md:rounded-bl-[5rem] rounded-2xl overflow-hidden h-48">
              <Image
                src="/images/about/r5.png"
                alt="Team discussion"
                width={500}
                height={400}
                className="w-full  h-48  object-cover"
              />
            </div>
            <div className="col-span-2 h-48 bg-sky-400 rounded-2xl rounded-br-[3rem] md:rounded-br-[5rem] p-4 md:p-6 flex flex-col justify-center items-center text-white"></div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 mb-4 md:mb-6">
              Who
              {' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
                we are
              </span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Softkingo is an IT service and solutions company that collaborates with companies worldwide to shape the next generation of businesses. We focus our efforts on a comprehensive intelligence system that spans multiple industries and domains. Softkingo is an ISO-certified web, mobile app, and digital marketing (SEO, SEM, SMO) development company with offices in the United States, Canada, and Australia, along with a headquarters in New Delhi, India. Our team consists of over 40+ highly skilled, experienced, and enthusiastic professionals.
            </p>
          </div>

          <div className=" bg-white drop-shadow-2xl shadow-lg justify-center lg:absolute bottom-10 right-10 flex  md:gap-4 w-full lg:w-auto mt-8 lg:mt-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 border-r last:border-r-0"
              >
                <p className="text-lg md:text-3xl font-bold">{stat.number}</p>
                <p className="text-[8px] md:text-sm font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Bring Ideas to Life Section */}
      <section className="w-full ">
        <div className="grid grid-cols-4 gap-2 md:gap-4 overflow-hidden">
          {imageMap.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-48 md:h-64 lg:h-78 w-full object-cover"
            />
          ))}
        </div>

        <div className='bg-black px-4 md:px-8 lg:px-12 pt-8 md:pt-10  '>
          <div className='gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2  max-w-7xl mx-auto'>


            <p className='text-white text-xl md:text-2xl lg:text-3xl mb-4 md:mb-0'>
              At Softkingo, we value our team, respecting their roles beyond coding, understanding their needs, and standing by them throughout our journey.
            </p>
            <div className="bg-cyan-500 text-white p-6 md:p-8 relative bottom-5 md:bottom-20 lg:bottom-30 max-w-4xl">
              <h4 className="text-xl md:text-2xl font-bold mb-3">How We Bring Your Ideas to Life</h4>
              <p className="text-sm text-cyan-50 leading-relaxed">
                We follow a specific strategy focused more on conversation, comprehension, and ideation. Our Journey begins by listening closely to our clients' goals, understanding the results they aim to achieve, and identifying the obstacles they encounter. We then deep dive into the latest trends and analyze the strategies, collecting actionable insights that when combined with our technical expertise, empower us to craft innovative, high-quality solutions- with the cost optimization for maximum value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="w-full  bg- px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20 bg-white">

        <CommonTitle
          align="center"
          pill={false}
          title='Our'
          gradientText='Core Values At SoftKingo'
          subtitle='Our focus is not just on delivering innovative solutions to our clients. We emphasize quality and our core values help in its propulsion.'
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto ">
          {coreValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className=" flex flex-col items-center text-center p-6 md:p-8 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition">
                <div className="p-2 md:p-4 bg-cyan-100 rounded-full mb-3 md:mb-4">
                  <IconComponent className="text-xl md:text-3xl text-cyan-500" />
                </div>
                <h3 className="text-md md:text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{value.description}</p>
              </div>
            );
          })}
        </div>

        <section className="w-full  py-6 md:px-12lg:px-20 md:py-16 lg:py-20 max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white border-l-sky-500 border-t-sky-500 border-2 rounded-2xl p-6 md:p-8 shadow-xl  border-white">
              <div className="flex items-center gap-3 mb-4">
                <FiTarget className="text-2xl md:text-3xl text-cyan-500 flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We are committed to charting the path of technological innovation in every dimension. From driving business growth to pioneering transformative solutions, we catalyze the tech revolution across industries.
              </p>
            </div>

            <div className="bg-white border-l-sky-500 border-t-sky-500 border-2 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FaFlag className="text-2xl md:text-3xl text-cyan-500 flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                At Softkingo, we empower businesses through complete digital transformation, engineering innovative and scalable solutions. Our mission is to tackle every tech challenge, paving the way for new opportunities and delivering positive ROI.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Vision and Mission Section */}


      {/* Your Success Section */}
      <section className="relative bg-gradient-to-br from-white via-sky-50 to-sky-200 overflow-hidden">
        <div className="relative z-10 container max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16 lg:py-20">
          {/* Changed to flex flex-col on small screens, grid on large */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-4 md:space-y-6 w-full">

              <CommonTitle
                align="left"
                pill={false}
                title='Your'
                gradientText='Success Our Mission'
                subtitle={false}
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-950 leading-normal">
                We Are Committed to Your Business Success Through Our Expert IT Services
              </h3>

              <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                At <span className="font-semibold">Softkingo</span>, we deliver tailored IT solutions curated to empower your business, drive efficiency, and ensure long-term success. Our team of experts leverages innovative technology and industry insight to provide seamless, flexible, and impactful IT services that align with your business objectives.
              </p>
            </div>

            {/* Circle Images - Centered with overlapping layout on all screens */}
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[600px] flex justify-center items-center">
              {/* Main large image - bottom left on mobile, similar on desktop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] lg:w-[450px] lg:h-[450px] lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-0">
                <img
                  src="/images/about/r8.png"
                  alt="Business meeting"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top right image */}
              <div className="absolute top-4 right-8 md:top-8 md:right-12 lg:top-4 lg:-right-10 w-24 h-24 md:w-36 md:h-36 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-10">
                <img
                  src="/images/about/r1.png"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom left image */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 lg:bottom-8 lg:left-5 w-24 h-24 md:w-32 md:h-32 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-10">
                <img
                  src="/images/about/r3.png"
                  alt="Professional handshake"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom right image */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-20 lg:right-10 w-20 h-20 md:w-28 md:h-28 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-10">
                <img
                  src="/images/about/about-us-banner.png"
                  alt="Team discussion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Industries Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto px-6 lg:px-12">

          <CommonTitle
            align='center'
            pill={false}
            title='Industries'
            gradientText={false}
            subtitle='Explore how our web, app, and software solutions cater to the unique needs of various industries.'
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-cyan-500 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-cyan-50 rounded-lg group-hover:bg-cyan-100 transition-colors">
                    {industry.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs md:text-sm">{industry.name}</h3>
                  <div className="w-6 md:w-8 border-t-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline Section */}
      <section>
        <StoryTimeline />
      </section>

      {/* Featured In Section */}
      <section className="bg-white py-12 md:py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto px-6 lg:px-12">

          <CommonTitle
            align='center'
            pill={false}
            title='Featured'
            gradientText='In'
            subtitle="From industry publications to renowned platforms, explore where we've been featured in the media."
          />


          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-12 lg:p-10">
            {featuredLogos.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-md transition-shadow duration-300 border border-gray-100 bg-white"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-w-full h-6 md:h-8 lg:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Visionary Leader Section */}
      <section className="bg-gradient-to-br from-white via-sky-50 to-sky-200 py-12 md:py-16 lg:py-20">
        <div className="container  max-w-7xl mx-auto px-6 lg:px-12">
          {/* <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Meet Our Visionary Leader
            </h2>
          </div> */}

          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <CommonTitle
                align="left"
                pill={false}
                title='Meet'
                gradientText='Our Visionary Leader'
                subtitle={false}
              />
              <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                At Softkingo, we empower businesses through complete digital transformation,
                engineering innovative and scalable solutions. Our mission is to tackle every
                tech challenge, paving the way for new opportunities and delivering positive ROI.
              </p>



              <div className="inline-flex items-center gap-2 md:gap-3 bg-white rounded-full px-4 md:px-6 py-2 md:py-3 borderborder-sky-200 shadow-lg">
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                <span className="font-bold text-base md:text-lg text-sky-950">Paramhans Singh, CEO</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1),0_12px_35px_rgba(0,0,0,0.15)]">
                <div className="bg-white  flex justify-center rounded-3xl overflow-hidden">
                  <img
                    src="/images/about/ceo.png"
                    alt="Paramhans Singh, CEO"
                    className="w-full h-auto max-w-sm md:max-w-md object-contain object-top"
                  />
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>


      <GallerySectionSafe />
      <FAQAccordion data={FaqData} />
      <InquirySection />
    </div>
  );
}

async function GallerySectionSafe() {
  let galleryImages = [];

  try {
    // Fast query + timeout
    galleryImages = await prisma.mediaItem.findMany({
      where: {
        type: 'image',
      },
      orderBy: { createdAt: 'desc' },
      take: 6, // Smaller = faster
      select: {  // Only needed fields
        id: true,
        filePath: true,
        title: true,
      }
    }).then(images =>
      images.filter(img => img.filePath).map(img => ({
        id: img.id,
        src: img.filePath?.startsWith('/') || img.filePath?.startsWith('http')
          ? img.filePath
          : `/uploads/${img.filePath}`,
        alt: img.title || 'Softkingo Gallery'
      }))
    );
  } catch (error) {
    console.log('Gallery DB timeout, using fallback');
    galleryImages = []; // Empty graceful fallback
  }

  return (
    <section className="relative bg-white py-12 md:py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        <CommonTitle
          align="center"
          pill={false}
          title="Softkingo"
          gradientText="Gallery"
          subtitle="We believe in cultivating a work culture that goes beyond projects. Where creativity flourishes, and ideas thrive with a shared commitment to excellence."
        />

        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center">
          {galleryImages.length > 0 ? (
            galleryImages.map((image) => (
              <div key={image.id} className="group relative w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.33px)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📸</div>
              <p className="text-gray-500 text-lg">Gallery coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
