"use client";
import React, { useState } from "react";
import CommonTitle from '@/components/ui/CommonTitle';
import PopupQuoteModal from '@/components/PopupQuoteModal'; // Ensure path is correct
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';

export default function FAQAccordion({ data }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Fallback data if no props provided
  const defaultItems = [
 
  {
    id: 1,
    q: "How do you ensure the security and quality of the app or software you develop?",
    a: "At Softkingo, security and quality aren’t afterthoughts—they’re part of our foundation. From day one, we take deliberate steps to make sure your software is secure, stable, and built to last. We begin every project by signing a Non-Disclosure Agreement (NDA), ensuring that your ideas, data, and business details stay completely confidential. On the security front, our developers follow secure coding standards and implement strong data protection practices from the initial development phase. Depending on your industry, we align your solution with global compliance standards such as GDPR, HIPAA, and PCI DSS. We also use advanced security measures like data encryption, multi-factor authentication, role-based access control, and frequent code reviews to reduce risks and prevent vulnerabilities. To maintain high quality, we embed a comprehensive QA process into our Agile workflow. Every app or software solution goes through extensive testing, including manual and automated testing, functionality checks, usability testing, performance optimization, and security testing. Even after launch, we don’t step away. We conduct regular vulnerability assessments, third-party security audits, and continuous monitoring to keep your product safe and efficient. Our QA and development teams work closely together to quickly resolve bugs, performance issues, or user concerns—both during development and post-deployment. "
  },
  {
    id: 2,
    q: "How do you ensure a seamless user experience in your designs?",
    a: "Delivering a smooth and intuitive user experience is a top priority for us. Our design process starts with detailed user research and competitor analysis so we can truly understand your audience, their expectations, and their challenges. Our UI/UX designers focus on simplicity, consistency, and ease of use. We follow the latest design trends and strictly adhere to platform-specific guidelines to ensure your app feels familiar and intuitive to users from the first interaction. Before finalizing any design, we create wireframes and interactive prototypes. These allow us to test usability early and gather feedback from stakeholders, helping us refine the experience before development begins. At Softkingo, our goal is to create designs that are not only visually appealing but also practical and user-friendly—experiences that users enjoy and businesses can rely on. "
  },
  {
    id: 3,
    q: "What makes Softkingo the best software and mobile app development company?",
    a: "Softkingo stands out because of our proven experience, strong technical expertise, and passion for innovation. Our team of 50+ skilled professionals—including developers, designers, and industry experts—works collaboratively to deliver solutions that truly make an impact. We’ve successfully completed 400+ projects for over 350+ clients across the globe. Our expertise covers mobile app development (iOS, Android, and hybrid), IoT solutions, AI-powered platforms, marketplaces, and custom software development. Our portfolio includes high-profile projects like LocalLove’s, Guidly, Moglix, and Fitify all of which have achieved excellent user engagement and commercial success. We’ve also helped startups turn ideas into thriving products. Platforms such as Ezydash, Fitify, and Lovelocal were built with scalability in mind, helping founders secure funding and compete effectively in their markets. Our work has earned industry recognition as well. Softkingo has been listed among the Top 100 Mobile App Development Companies by Clutch, received the Best App Development Company award in 2022, and was recently awarded Top Mobile App Development Company in India in 2025 by Tech Behemoths. In addition, we provide staff augmentation services, allowing businesses to quickly scale their teams with vetted experts and round-the-clock support—ensuring smooth collaboration across time zones. "
  },
  {
    id: 4,
    q: "What software development services do you offer?",
    a: "With over 6+ years of experience, Softkingo delivers robust and scalable digital solutions to businesses worldwide. We’ve successfully completed 400+ projects across 25+ countries, offering end-to-end custom software development services, including: Software Consulting   Custom Software Development Enterprise Software Development   Software Product Development  Software Integration Custom CRM Development  API Development  ERP Software Development We follow Agile development methodologies to ensure faster delivery and better adaptability. By dividing projects into smaller sprints, we enable continuous feedback and greater transparency throughout the development lifecycle. To meet diverse business needs, we also offer flexible engagement models—dedicated development teams, hourly hiring, and fixed-cost projects—so you can scale resources as your project evolves. "
  },
  {
    id: 5,
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes, absolutely. Post-launch support and maintenance are an essential part of our services. We ensure your app continues to perform smoothly, stays secure, and evolves with changing technologies. Our app maintenance services include:  Technology-based software upgrades Automated backups Issue tracking and resolution Ongoing bug fixes and support Performance optimization Security updates Version upgrades User support Continuous performance monitoring Our experts proactively monitor your application, address technical challenges, and implement improvements to ensure a seamless user experience long after launch. "
  },
  {
    id: 6,
    q: "Do you offer a free consultation or project estimate?",
    a: "Yes, we do. We offer a completely free initial consultation and project estimate to help you move forward with confidence.  During the consultation, we take time to understand your business objectives, target audience, technical needs, and long-term goals. Based on this discussion, we provide a customized project roadmap along with a transparent cost and timeline estimate—at no cost to you. If you’re ready to bring your idea to life, get in touch with us today and let’s start building something great together. "
  },
  {
    id: 7,
    q: "Can you integrate AI or other emerging technologies into my app?",
    a: "Yes, we specialize in integrating AI and emerging technologies into mobile and web applications to help businesses stay competitive and future-ready. Our team can integrate AI-driven features such as chatbots, predictive analytics, natural language processing (NLP), facial recognition, and recommendation systems. We stay updated with the latest advancements and use reliable frameworks and APIs to ensure seamless integration with your existing infrastructure. Whether you have a clear idea or are exploring possibilities, our AI experts are here to help you build smarter, next-generation applications. "
  },
  {
    id: 8,
    q: "What is the average cost and timeline for developing a mobile app?",
    a: "The cost and timeline of mobile app development depend on multiple factors, including app complexity, features, platform selection, design requirements, and integrations. A simple app with basic functionality typically costs between $10,000 and $30,000. More complex apps with advanced features generally range from $30,000 to $50,000 or higher. In terms of timelines, simple apps can be completed within 2 to 3 months, while complex applications may take 6 to 9 months, depending on scope and requirements. Since every project is unique, we recommend connecting with our experts for a personalized consultation. We’ll provide a detailed cost and timeline estimate tailored specifically to your vision. "
  },
  {
    id: 9,
    q: "What mobile app development services do you offer?",
    a: "As a globally recognized development company, we offer complete mobile app development services, including: Custom App Development , iOS App Development , Android App Development , Flutter App Development , React Native App Development , Web App Development , Progressive Web App (PWA) Development , Healthcare App Development , AI/ML App Development , AR/VR App Development , dApp Development , IoT App Development , Wearable App Development , Dating App Development At Softkingo, we believe in building long-term partnerships. From ideation to launch and ongoing support, we stay involved at every stage. By combining strategic planning, agile execution, and continuous improvement, we deliver products that drive real business value. "
  },
  {
    id: 10,
    q: "How do you handle project management and communication?",
    a: "We follow a transparent and client-centric approach to ensure smooth project execution and clear communication at every stage. Our teams work using Agile project management methodologies, breaking projects into manageable sprints. This allows us to remain flexible and quickly adapt to changing requirements or priorities. For communication, we use dedicated channels such as Slack, Zoom, Microsoft Teams, and email. Each project is assigned a dedicated project manager who serves as your single point of contact. We also provide real-time project tracking through tools like Jira, Trello, and Asana, giving you full visibility into progress and keeping you involved throughout the development journey. "
  }
];

  // Use props data if available, otherwise default
  const items = data?.items || defaultItems;
  const title = data?.title;
  const subtitle = data?.subtitle;
  const gradientText = data?.gradientText || "";

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Common Title */}
        <CommonTitle 
            align="center"
            title={title}
            gradientText={gradientText}
            subtitle={subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-12">
          
          {/* Left: Accordion (span 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it, i) => {
              const isOpen = i === openIndex;
              return (
                <div
                  key={it.id || i}
                  className={`border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                    isOpen ? "bg-slate-50 border-sky-100 ring-1 ring-sky-100" : "bg-white"
                  }`}
                >
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${it.id || i}`}
                    onClick={() => toggle(i)}
                    className="w-full flex items-start gap-4 px-6 py-5 text-left bg-transparent hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Toggle Icon Box */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors mt-0.5 ${
                        isOpen ? "bg-sky-500 border-sky-500 text-white" : "bg-white border-slate-200 text-slate-500"
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>

                    <h3 className={`text-lg font-bold flex-1 ${isOpen ? "text-sky-900" : "text-slate-900"}`}>
                        {it.q}
                    </h3>
                  </button>

                  <div
                    id={`faq-panel-${it.id || i}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                        <div 
                            className="px-6 pb-6 pl-[4.5rem] text-sm md:text-base text-slate-600 leading-relaxed prose prose-sm max-w-none rich-text"
                            dangerouslySetInnerHTML={{ __html: it.a }}
                        />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Contact Card */}
          <aside className="w-full lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-gradient-to-br from-[#28AFDF] to-[#06465D] p-8 shadow-xl text-center">
              
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>

              <h4 className="text-white font-bold text-xl mt-6">Have Different Questions?</h4>
              <p className="mt-3 text-sm text-sky-100 leading-relaxed">
                Our team is ready to answer all your questions. We ensure a quick response within 24 hours.
              </p>

              <div className="mt-8 flex justify-center">
                <button 
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 bg-white text-sky-700 hover:bg-sky-50 hover:text-sky-800 px-6 py-3 rounded-full font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  Contact Us <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Popup Modal */}
      <PopupQuoteModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}