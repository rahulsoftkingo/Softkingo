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
  {
    title: "Healthcare",
    headline: "Healthcare Software Development",
    desc: "Digital solutions are helping healthcare providers improve patient care and manage operations more efficiently. We build secure healthcare applications that support better communication and service delivery.",
    subServices: ["Telemedicine App Development", "Hospital Management Systems", "Patient Monitoring Applications", "Appointment Scheduling Platforms"],
    href: "/industries/healthcare",
    icon: <FaHeartbeat />,
    color: "from-rose-500/10 to-rose-500/5",
    iconColor: "text-rose-600",
    image: "/images/industries/i-1.png"
  },
  {
    title: "Education / E-Learning",
    headline: "Education Technology Solutions",
    desc: "Modern learning platforms make education more accessible and interactive. We develop digital education solutions that support online learning and efficient course management.",
    subServices: ["E-Learning Platform Development", "Learning Management Systems (LMS)", "Virtual Classroom Applications", "Online Course Marketplace"],
    href: "/industries/education",
    icon: <FaGraduationCap />,
    color: "from-sky-500/10 to-sky-500/5",
    iconColor: "text-sky-600",
    image: "/images/industries/Industrieslists/Education.webp"
  },
  {
    title: "Real Estate",
    headline: "Real Estate Software Development",
    desc: "Real estate businesses are using digital platforms to simplify property discovery and customer engagement. We build solutions that help manage listings and connect buyers with agents.",
    subServices: ["Property Listing Platforms", "Real Estate CRM Systems", "Virtual Property Tour Apps", "Property Booking Platforms"],
    href: "/industries/real-estate",
    icon: <FaBuilding />,
    color: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-600",
    image: "/images/industries/Industrieslists/Real Estate.webp"
  },
  {
    title: "Travel & Tourism",
    headline: "Travel Technology Solutions",
    desc: "Travel businesses rely on technology to simplify bookings and enhance customer experiences. We develop digital solutions for efficient travel and hospitality management.",
    subServices: ["Travel Booking Applications", "Hotel Management Systems", "Tour Package Management Platforms", "Travel Marketplace Apps"],
    href: "/industries/travel",
    icon: <FaPlane />,
    color: "from-orange-500/10 to-orange-500/5",
    iconColor: "text-orange-600",
    image: "/images/industries/Industrieslists/Travel.webp"
  },
  {
    title: "Food & Restaurant",
    headline: "Food Delivery App Development",
    desc: "Online food ordering platforms help restaurants serve customers faster and more efficiently. We build reliable systems for food delivery and restaurant management.",
    subServices: ["Food Delivery App Development", "Restaurant Management Software", "Online Food Ordering Platforms", "Cloud Kitchen Solutions"],
    href: "/industries/restaurant",
    icon: <FaUtensils />,
    color: "from-amber-500/10 to-amber-500/5",
    iconColor: "text-amber-600",
    image: "/images/industries/Industrieslists/Resturant.webp"
  },
  {
    title: "Fitness & Wellness",
    headline: "Fitness App Development",
    desc: "Digital fitness platforms help people stay active and track their health goals. We create fitness apps that connect trainers and users through engaging experiences.",
    subServices: ["Workout & Training Applications", "Fitness Tracking Apps", "Online Personal Training Platforms", "Nutrition & Wellness Apps"],
    href: "/industries/fitness",
    icon: <FaDumbbell />,
    color: "from-purple-500/10 to-purple-500/5",
    iconColor: "text-purple-600",
    image: "/images/industries/Industrieslists/Fitness.webp"
  },
  {
    title: "Retail & E-Commerce",
    headline: "Retail & E-Commerce Solutions",
    desc: "Retail businesses are expanding online to reach customers more effectively. We build scalable e-commerce platforms that deliver smooth and secure shopping experiences.",
    subServices: ["E-Commerce Website Development", "Multi-Vendor Marketplace Platforms", "Mobile Shopping Applications", "Payment Integration Systems"],
    href: "/industries/retail",
    icon: <FaStore />,
    color: "from-indigo-500/10 to-indigo-500/5",
    iconColor: "text-indigo-600",
    image: "/images/industries/Industrieslists/Ecommerce.webp"
  },
  {
    title: "Logistics / Transportation",
    headline: "Logistics Software Development",
    desc: "Logistics companies use technology to manage deliveries and optimize operations. We develop platforms that improve shipment tracking and fleet management.",
    subServices: ["Fleet Management Software", "Delivery Tracking Applications", "Route Optimization Systems", "Logistics Management Platforms"],
    href: "/industries/logistics",
    icon: <FaTruck />,
    color: "from-slate-500/10 to-slate-500/5",
    iconColor: "text-slate-600",
    image: "/images/industries/Industrieslists/Logistic.webp"
  },
  {
    title: "Media & Entertainment",
    headline: "Media & Entertainment Solutions",
    desc: "Digital platforms are transforming how media content is created and consumed. We build solutions that help businesses manage and distribute content effectively.",
    subServices: ["Video Streaming Applications", "Content Management Platforms", "OTT Platform Development", "Media Sharing Applications"],
    href: "/industries/entertainment",
    icon: <FaFilm />,
    color: "from-lime-500/10 to-lime-500/5",
    iconColor: "text-lime-600",
    image: "/images/industries/Industrieslists/Entertainment.webp"
  },
  {
    title: "Social Networking",
    headline: "Social Networking Platform Development",
    desc: "Social platforms help people connect and share information instantly. We develop scalable social networking apps with modern engagement features.",
    subServices: ["Community Networking Platforms", "Messaging & Chat Applications", "Content Sharing Platforms", "Social Media App Development"],
    href: "/industries/social-media",
    icon: <FaUsers />,
    color: "from-fuchsia-500/10 to-fuchsia-500/5",
    iconColor: "text-fuchsia-600",
    image: "/images/industries/Industrieslists/SocialNetworking.webp"
  },
  {
    title: "Finance / FinTech",
    headline: "FinTech Software Development",
    desc: "Financial technology is reshaping banking and digital payments. We build secure fintech platforms that support modern financial services.",
    subServices: ["Digital Wallet Applications", "Online Payment Systems", "Mobile Banking Solutions", "Financial Management Platforms"],
    href: "/industries/fintech",
    icon: <FaDollarSign />,
    color: "from-green-500/10 to-green-500/5",
    iconColor: "text-green-600",
    image: "/images/industries/Industrieslists/Banking.webp"
  },
  {
    title: "Automotive",
    headline: "Automotive Software Development",
    desc: "Technology is driving innovation in the automotive industry. We develop digital solutions that support connected vehicles and mobility platforms.",
    subServices: ["Connected Vehicle Applications", "Fleet Management Platforms", "Vehicle Marketplace Systems", "Taxi Booking App Development"],
    href: "/industries/automotive",
    icon: <FaCar />,
    color: "from-blue-500/10 to-blue-500/5",
    iconColor: "text-blue-600",
    image: "/images/industries/Industrieslists/Automotive.webp"
  },
  {
    title: "Construction",
    headline: "Construction Technology Solutions",
    desc: "Construction companies use digital tools to manage projects and resources more efficiently. We build software that improves project planning and monitoring.",
    subServices: ["Construction Project Management Software", "Resource Management Systems", "Site Monitoring Applications", "Construction ERP Solutions"],
    href: "/industries/construction",
    icon: <FaHammer />,
    color: "from-yellow-500/10 to-yellow-500/5",
    iconColor: "text-yellow-600",
    image: "/images/industries/Industrieslists/Construction.webp"
  },
  {
    title: "Manufacturing",
    headline: "Manufacturing IT Solutions",
    desc: "Manufacturing businesses rely on technology to improve production and supply chain efficiency. We develop systems that support smarter industrial operations.",
    subServices: ["Production Management Systems", "Inventory Management Platforms", "Manufacturing ERP Solutions", "Industrial Automation Software"],
    href: "/industries/manufacturing",
    icon: <FaFactory />,
    color: "from-gray-500/10 to-gray-500/5",
    iconColor: "text-gray-600",
    image: "/images/industries/Industrieslists/Manufacturing.webp"
  },
  {
    title: "Sports",
    headline: "Sports Technology Solutions",
    desc: "Technology helps sports organizations improve training and fan engagement. We build digital platforms that support athletes, teams, and sports communities.",
    subServices: ["Sports Training Applications", "Athlete Performance Tracking", "Sports Event Management Platforms", "Fan Engagement Applications"],
    href: "/industries/sports",
    icon: <FaCalendarAlt />,
    color: "from-violet-500/10 to-violet-500/5",
    iconColor: "text-violet-600",
    image: "/images/industries/Industrieslists/Sports.webp"
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/industries/Technology Solutions for Every Industry.webp"
          alt="Industries Expertise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          {/* <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 px-4 py-2 rounded-full mb-6">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">Global Expertise</span>
          </div> */}
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-300 mb-4">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/industries" className="text-sky-400 font-medium">
              Industries
            </Link>
            {/* <span>›</span>
            <span className="text-sky-400 font-medium">{title}</span> */}
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">
            Technology Solutions for Every Industry
          </h1>
          <p className="max-w-2xl mx-auto text-md md:text-lg text-sky-50 font-light leading-relaxed">
            We build custom software, mobile apps, and digital platforms for a wide range of industries, helping businesses transform ideas into scalable digital solutions.
          </p>
        </div>
      </section>

      {/* Industry Listing */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-24 last:mb-0 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br ${industry.color}`}>
                  <span className={`text-2xl ${industry.iconColor}`}>{industry.icon}</span>
                  <span className="font-bold text-slate-900">{industry.title}</span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-normal">
                  {industry.headline}
                </h2>

                <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                  {industry.desc}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 text-sm font-semibold text-slate-700">
                  {industry.subServices.map((service, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <FaChevronRight className="text-sky-500 text-[10px]" /> {service}
                    </li>
                  ))}
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
