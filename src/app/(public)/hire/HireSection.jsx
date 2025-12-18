// app/hire/HireSection.jsx
import { ArrowRight, ArrowLeft, Code2, Smartphone, Database, Layers, Cloud, TestTube } from 'lucide-react';
import Image from 'next/image';

export default function HireSection() {
  const sections = [
    {
      id: 1,
      title: "Front-End Developers",
      subtitle: "Hire expert front-end developers proficient in React, Angular, Vue.js, and modern JavaScript frameworks to build stunning, responsive user interfaces that engage users and drive conversions.",
      imagePosition: "right",
      bgColor: "bg-gradient-to-br from-blue-50 to-sky-50",
      caseStudy: {
        title: "React Specialists",
        description: "Build Modern, Fast & Scalable Web Applications",
        buttonText: "View Profiles",
        image: "/images/services/s1.png",
        developerCount: "50+ Developers",
        experience: "5+ Years Avg Experience",
        badge: "Available Now"
      },
      technologies: [
        { name: "React.js", icon: Code2 },
        { name: "Vue.js", icon: Code2 },
        { name: "Angular", icon: Code2 },
        { name: "Next.js", icon: Code2 },
        { name: "TypeScript", icon: Code2 }
      ]
    },
    {
      id: 2,
      title: "Mobile App Developers",
      subtitle: "Build native and cross-platform mobile applications with our experienced iOS, Android, React Native, and Flutter developers who deliver pixel-perfect, high-performance mobile solutions.",
      imagePosition: "left",
      bgColor: "bg-gradient-to-br from-sky-50 to-pink-50",
      caseStudy: {
        title: "Mobile Experts",
        description: "iOS, Android & Cross-Platform Development",
        buttonText: "View Profiles",
        image: "/images/hire/mobile.jpg",
        developerCount: "40+ Developers",
        experience: "4+ Years Avg Experience",
        badge: "Top Rated"
      },
      technologies: [
        { name: "React Native", icon: Smartphone },
        { name: "Flutter", icon: Smartphone },
        { name: "Swift", icon: Smartphone },
        { name: "Kotlin", icon: Smartphone },
        { name: "Ionic", icon: Smartphone }
      ]
    },
    {
      id: 3,
      title: "Back-End Developers",
      subtitle: "Hire backend engineers skilled in Node.js, Python, Java, .NET, and PHP to build robust, scalable server-side applications, RESTful APIs, and microservices architecture.",
      imagePosition: "right",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      caseStudy: {
        title: "Backend Architects",
        description: "Scalable APIs, Microservices & Cloud Solutions",
        buttonText: "View Profiles",
        image: "/images/hire/backend.jpg",
        developerCount: "60+ Developers",
        experience: "6+ Years Avg Experience",
        badge: "Expert Level"
      },
      technologies: [
        { name: "Node.js", icon: Database },
        { name: "Python", icon: Database },
        { name: "Java", icon: Database },
        { name: ".NET", icon: Database },
        { name: "Go", icon: Database }
      ]
    },
    {
      id: 4,
      title: "Full-Stack Developers",
      subtitle: "Get versatile full-stack developers who can handle both frontend and backend development, delivering complete end-to-end solutions from database to UI with seamless integration.",
      imagePosition: "left",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      caseStudy: {
        title: "Full-Stack Masters",
        description: "MERN, MEAN, JAMstack & Enterprise Solutions",
        buttonText: "View Profiles",
        image: "/images/hire/fullstack.jpg",
        developerCount: "45+ Developers",
        experience: "5+ Years Avg Experience",
        badge: "Highly Skilled"
      },
      technologies: [
        { name: "MERN", icon: Layers },
        { name: "MEAN", icon: Layers },
        { name: "Django", icon: Layers },
        { name: "Laravel", icon: Layers },
        { name: "Ruby on Rails", icon: Layers }
      ]
    },
    {
      id: 5,
      title: "DevOps Engineers",
      subtitle: "Hire DevOps experts to streamline your CI/CD pipeline, automate deployments, manage cloud infrastructure, and ensure high availability with monitoring and optimization.",
      imagePosition: "right",
      bgColor: "bg-gradient-to-br from-cyan-50 to-teal-50",
      caseStudy: {
        title: "DevOps Specialists",
        description: "CI/CD, Cloud Infrastructure & Automation",
        buttonText: "View Profiles",
        image: "/images/hire/devops.jpg",
        developerCount: "30+ Engineers",
        experience: "7+ Years Avg Experience",
        badge: "Cloud Certified"
      },
      technologies: [
        { name: "AWS", icon: Cloud },
        { name: "Docker", icon: Cloud },
        { name: "Kubernetes", icon: Cloud },
        { name: "Jenkins", icon: Cloud },
        { name: "Terraform", icon: Cloud }
      ]
    },
    {
      id: 6,
      title: "QA & Test Engineers",
      subtitle: "Ensure product quality with our QA engineers specializing in manual testing, test automation, performance testing, security audits, and comprehensive quality assurance.",
      imagePosition: "left",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
      caseStudy: {
        title: "QA Professionals",
        description: "Automated Testing & Quality Assurance",
        buttonText: "View Profiles",
        image: "/images/hire/qa.jpg",
        developerCount: "25+ Engineers",
        experience: "4+ Years Avg Experience",
        badge: "Certified QA"
      },
      technologies: [
        { name: "Selenium", icon: TestTube },
        { name: "Cypress", icon: TestTube },
        { name: "Jest", icon: TestTube },
        { name: "Appium", icon: TestTube },
        { name: "JMeter", icon: TestTube }
      ]
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {sections.map((section, index) => (
        <section 
          key={section.id} 
          className={`${section.bgColor} py-16 md:py-24 px-4 md:px-8 lg:px-20 animate-section`}
          style={{animationDelay: `${index * 0.15}s`}}
        >
          <div className="max-w-7xl mx-auto">
            {section.imagePosition === "right" ? (
              // Layout: Content Left, Card Right
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-fade-left">
                  <div className="space-y-4">
                    <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                      <span className="text-sm font-semibold text-sky-600">
                        {section.caseStudy.badge}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 flex items-center gap-3">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                      {section.subtitle}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-lift">
                      <p className="text-xl font-bold text-sky-600">
                        {section.caseStudy.developerCount}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Ready to Hire</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-lift">
                      <p className="text-xl font-bold text-sky-600">
                        {section.caseStudy.experience}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Experience</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Core Technologies</h3>
                    <div className="flex overflow-x-auto hide-scrollbar gap-4">
                      {section.technologies.map((tech, idx) => {
                        const IconComponent = tech.icon;
                        return (
                          <div 
                            key={idx} 
                            className="flex items-center gap-3 bg-gradient-to-r from-sky-50 to-sky-50 px-5 py-3 rounded-xl hover-scale cursor-pointer border border-sky-100 "
                          >
                            <IconComponent className="w-5 h-5 text-sky-600" />
                            <span className="text-sm font-semibold text-gray-700">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Developer Card */}
                <DeveloperCard caseStudy={section.caseStudy} position="right" />
              </div>
            ) : (
              // Layout: Card Left, Content Right
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left Developer Card */}
                <DeveloperCard caseStudy={section.caseStudy} position="left" />
                
                {/* Right Content */}
                <div className="space-y-8 order-first lg:order-last animate-fade-right">
                  <div className="space-y-4">
                    <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                      <span className="text-sm font-semibold text-sky-600">
                        {section.caseStudy.badge}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                      {section.subtitle}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-lift">
                      <p className="text-xl font-bold text-sky-600">
                        {section.caseStudy.developerCount}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Ready to Hire</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-lift">
                      <p className="text-xl font-bold text-sky-600">
                        {section.caseStudy.experience}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Experience</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Core Technologies</h3>
                    <div className="flex overflow-x-auto hide-scrollbar gap-4">
                      {section.technologies.map((tech, idx) => {
                        const IconComponent = tech.icon;
                        return (
                          <div 
                            key={idx} 
                            className="flex items-center gap-3 bg-gradient-to-r from-sky-50 to-pink-50 px-5 py-3 rounded-xl hover-scale cursor-pointer border border-sky-100"
                          >
                            <IconComponent className="w-5 h-5 text-sky-600" />
                            <span className="text-sm font-semibold text-gray-700">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Animations */}
      <style >{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-section {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-fade-left {
          animation: fadeLeft 0.8s ease-out;
        }
        .animate-fade-right {
          animation: fadeRight 0.8s ease-out;
        }
        
        :global(.hover-lift) {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.hover-lift:hover) {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        :global(.hover-scale) {
          transition: all 0.3s ease;
        }
        :global(.hover-scale:hover) {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

// Developer Card Component - Different from Service CaseStudyCard
function DeveloperCard({ caseStudy, position }) {
  return (
    <div className="relative group animate-scale-in">
      {/* Main Card */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover-lift">
        {/* Image Section */}
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white">
                {caseStudy.title}
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {caseStudy.description}
              </p>
              
              <button className="mt-4 bg-gradient-to-r from-sky-600 to-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                {caseStudy.buttonText}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="p-6 bg-gradient-to-r from-sky-50 to-sky-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Available Now</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {'★'.repeat(5)}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-sky-600 to-sky-600 text-white px-6 py-3 rounded-2xl shadow-xl z-10">
        <p className="text-sm font-bold">Top Rated</p>
      </div>

      <style >{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }
        :global(.hover-lift) {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.hover-lift:hover) {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
