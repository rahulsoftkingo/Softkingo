// app/solutions/SolutionsSection.jsx
import { ArrowRight, Briefcase, ShoppingCart, HeartPulse, Banknote, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SolutionsSection() {
  const solutions = [
    {
      id: 1,
      title: "Manufacturing Sector",
      subtitle: "Optimize your production lines and minimize downtime with IoT, AI-powered analytics, and ERP integrations tailored for manufacturing industries.",
      imagePosition: "right",
      bgColor: "bg-white",
      caseStudy: {
        title: "Factory Automation",
        description: "Implemented IoT monitoring and predictive maintenance to improve factory efficiency by 30%.",
        buttonText: "View Case Study",
        image: "/images/services/s1.png",
        clientNote: "Transformed a leading manufacturer’s operational workflows with smart automation and data-driven insights."
      },
      technologies: [
        { name: "IoT", icon: Briefcase },
        { name: "Cloud Computing", icon: ShieldCheck },
        { name: "Artificial Intelligence", icon: HeartPulse }
      ]
    },
    {
      id: 2,
      title: "Retail & E-Commerce",
      subtitle: "Boost sales & customer engagement with personalized shopping experiences, omnichannel integration, and secure payment gateways.",
      imagePosition: "left",
      bgColor: "bg-sky-50",
      caseStudy: {
        title: "Omnichannel Commerce",
        description: "Built a seamless shopping platform that integrates online & offline sales, improving customer retention by 40%.",
        buttonText: "View Case Study",
       image: "/images/services/s3.png",
        clientNote: "Empowered a national retailer to unify their customer experience with cutting-edge technology."
      },
      technologies: [
        { name: "React", icon: ShoppingCart },
        { name: "Node.js", icon: Briefcase },
        { name: "Payment Gateways", icon: Banknote }
      ]
    },
    {
      id: 3,
      title: "Healthcare & Pharma",
      subtitle: "Secure patient records, telemedicine apps, and AI diagnostics to improve patient outcomes and regulatory compliance.",
      imagePosition: "right",
      bgColor: "bg-white",
      caseStudy: {
        title: "Telehealth Solutions",
        description: "Developed HIPAA-compliant telemedicine platform serving 10,000+ patients with real-time consultations.",
        buttonText: "View Case Study",
        image: "/images/solutions/healthcare.jpg",
        clientNote: "Enabled a top healthcare provider to expand their telehealth capabilities safely and efficiently."
      },
      technologies: [
        { name: "HIPAA Compliant", icon: ShieldCheck },
        { name: "AI Diagnostics", icon: HeartPulse },
        { name: "Cloud Platform", icon: ShieldCheck }
      ]
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {solutions.map((section, index) => (
        <section 
          key={section.id} 
          className={`${section.bgColor} py-14 md:py-20 px-6 md:px-12 lg:px-16 animate-fadeInUp`} 
          style={{animationDelay: `${index * 0.12}s`}}
        >
          <div className="max-w-7xl mx-auto">
            {section.imagePosition === "right" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="space-y-8 pr-4 md:pr-8 animate-fadeInUp">
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 flex items-center gap-3">
                      {section.title}
                      <ArrowRight className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
                    </h2>
                    <p className="mt-3 text-lg text-gray-600 leading-relaxed">{section.subtitle}</p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-5 mt-6">
                    {section.technologies.map((tech, i) => {
                      const Icon = tech.icon;
                      return (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 hover:bg-gray-200 cursor-pointer transition-transform hover:scale-105"
                        >
                          <Icon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                          <span className="text-indigo-700 font-semibold">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                        <h3 className="text-3xl font-extrabold text-gray-900">{section.caseStudy.title}</h3>
      <p className="max-w-lg text-gray-700 leading-relaxed">{section.caseStudy.description}</p>
                </div>

                <CaseStudyCard caseStudy={section.caseStudy} position="right" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <CaseStudyCard caseStudy={section.caseStudy} position="left" />

                <div className="space-y-8 pl-4 md:pl-8 animate-fadeInUp">
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900">{section.title}</h2>
                    <p className="mt-3 text-lg text-gray-600 leading-relaxed">{section.subtitle}</p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-5 mt-6">
                    {section.technologies.map((tech, i) => {
                      const Icon = tech.icon;
                      return (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 hover:bg-gray-200 cursor-pointer transition-transform hover:scale-105"
                        >
                          <Icon className="w-6 h-6 text-purple-600 flex-shrink-0" />
                          <span className="text-purple-700 font-semibold">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900">{section.caseStudy.title}</h3>
      <p className="max-w-lg text-gray-700 leading-relaxed">{section.caseStudy.description}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      <style >{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function CaseStudyCard({ caseStudy, position }) {
  return (
    <div className={`relative h-full space-y-6 ${position === 'left' ? 'lg:pr-12' : 'lg:pl-12'}`}>
      <div className="overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Image 
          src={caseStudy.image}
          alt={caseStudy.title}
          width={600}
          height={400}
          className="object-cover"
          priority
        />
      </div>

      <Link href="#solutions" className="inline-block text-indigo-600 font-semibold hover:underline">
        {caseStudy.buttonText}
      </Link>
      <p className="text-gray-500 text-sm mt-4 max-w-lg">{caseStudy.clientNote}</p>
    </div>
  );
}
