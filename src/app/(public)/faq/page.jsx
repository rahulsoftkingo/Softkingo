// src/app/(public)/faq/page.jsx - COMPLETE FAQ WITH ALL SECTIONS
'use client'
import Link from 'next/link';
import { useState } from 'react';
import { commonSchemas } from "@/lib/commonSchema";

// export const metadata = {
//   title: "FAQ | Softkingo - Common Questions Answered",
//   description: "Find answers to frequently asked questions about Softkingo's services, pricing, development process, and technology stack.",
//   alternates: { canonical: "/faq" }
// };

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About Softkingo' },
    { id: 'work', label: 'About Our Work' },
    { id: 'client', label: 'Client Value' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing & Engagement' },
    { id: 'technology', label: 'Technology' }
  ];

  const faqData = {
    about: [
      {
        q: "Who is the CEO of Softkingo and what's the company's vision?",
        a: "Softkingo is led by Paramhans Singh, an accomplished technology professional with strong expertise in Android and iOS development. He is known for his practical leadership style and innovative mindset, which have played a key role in shaping Softkingo's growth and reputation. The company's vision is to drive meaningful digital transformation for businesses worldwide. Softkingo focuses on delivering custom technology solutions built with the latest tools, user-centric design, and a strong commitment to quality. By encouraging innovation, building long-term client partnerships, and consistently exceeding expectations, Softkingo aims to set new standards in the digital services industry."
      },
      {
        q: "How many developers and team members does Softkingo have?",
        a: "Softkingo has a strong in-house team of 50+ professionals, including skilled mobile and web developers, UI/UX designers, quality analysts, project managers, and technology consultants. This diverse and experienced team allows Softkingo to manage complex and large-scale projects efficiently while maintaining high quality across all services."
      },
      {
        q: "Where are Softkingo's global offices located? Can I visit the US office?",
        a: "Softkingo operates globally with offices located in: Noida, India; New Delhi, India; California, United States; London, United Kingdom; Canada; United Arab Emirates (UAE). Clients are welcome to visit any Softkingo office, including the US office, by scheduling a meeting in advance."
      },
      {
        q: "How long has Softkingo been in the app development industry?",
        a: "Softkingo has been actively working in the app development industry since 2020. During this period, the company has successfully delivered 400+ projects for 350+ clients worldwide, building a strong reputation for reliability, innovation, and quality-driven development."
      },
      {
        q: "Which top brands or startups has Softkingo worked with?",
        a: "Softkingo has collaborated with a wide range of clients, including innovative startups and established global brands across multiple industries. Due to non-disclosure agreements, many client names remain confidential. However, Softkingo shares selected case studies on its website that showcase successful projects in sectors such as fintech, healthcare, e-commerce, gaming, and logistics."
      },
      {
        q: "What industries does Softkingo specialise in — healthcare, fintech, etc.?",
        a: "Softkingo provides tailored digital solutions across 30+ industries, including: Healthcare, Fintech, E-commerce, Real Estate, Gaming, Logistics, Travel & Hospitality, Food Delivery, Education, and On-demand Services. This broad industry experience enables Softkingo to adapt quickly to evolving market needs and deliver innovative, scalable solutions."
      },
      {
        q: "What is the client satisfaction rate of Softkingo?",
        a: "Softkingo maintains a high client satisfaction rate, consistently receiving positive feedback for technical expertise, timely project delivery, transparent communication, and dependable post-launch support. The company focuses on long-term relationships and strong client retention, which is reflected in positive reviews across leading industry platforms."
      },
      {
        q: "Does Softkingo follow agile or traditional development methods?",
        a: "Softkingo primarily follows Agile development methodologies, allowing for flexibility, faster iterations, and continuous client involvement. This approach ensures projects remain aligned with client goals while adapting easily to changing requirements. Traditional development models can also be accommodated when clients prefer a structured approach."
      },
      {
        q: "What sets Softkingo apart from other app development companies?",
        a: "Softkingo stands out due to several key strengths: A strong client-first approach with customized solutions; Expertise across startups, SMEs, and enterprises; End-to-end services from strategy and design to deployment and support; A proven track record of 400+ successful projects; Continuous investment in R&D for AI, blockchain, and emerging technologies; Transparent communication and long-term post-launch support."
      }
    ],
    work: [
      {
        q: "Can you share real examples of apps built by Softkingo?",
        a: "Softkingo has developed a wide range of mobile and web applications, including food delivery platforms, healthcare management systems, ride-hailing apps, fintech solutions, social networking platforms, and e-commerce marketplaces. While many projects are protected by NDAs, Softkingo shares selected case studies and portfolio highlights upon request or through its website."
      },
      {
        q: "Do you build apps for iOS, Android, or both platforms?",
        a: "Yes, Softkingo provides complete app development services for both iOS and Android platforms. The team works with native technologies such as Swift and Kotlin, as well as cross-platform frameworks like Flutter and React Native, ensuring high performance and a seamless user experience."
      },
      {
        q: "How long does it take to develop a typical mobile app?",
        a: "The development timeline depends on the app's complexity and features: Basic MVPs usually take 2–3 months; Medium-complexity apps take 4–6 months; Advanced or enterprise-level apps may require more time. Each project follows a structured process including planning, design, development, testing, and deployment."
      },
      {
        q: "Can you help with redesigning or upgrading an existing app?",
        a: "Yes, Softkingo offers comprehensive app redesign and upgrade services. This includes improving UI/UX, updating outdated technologies, optimizing performance, refactoring code, and adding new features to enhance user engagement and scalability."
      },
      {
        q: "How do you ensure data security and compliance in app development?",
        a: "Softkingo follows industry-standard security practices, including secure authentication, data encryption, regular security audits, GDPR compliance, and adherence to industry-specific regulations such as HIPAA for healthcare applications. Data protection and compliance are treated as top priorities in every project."
      },
      {
        q: "Do you offer app development for startups and enterprises alike?",
        a: "Yes, Softkingo works with startups, growing businesses, and large enterprises. Startups benefit from MVP development and rapid prototyping, while enterprises receive robust, scalable, and secure solutions designed to support complex workflows."
      },
      {
        q: "Can I track the progress of my app during the development cycle?",
        a: "Yes, Softkingo ensures full transparency throughout the project. Clients receive regular updates, milestone-based demos, and access to project management tools like Jira or Trello, allowing them to stay informed and involved at every stage."
      },
      {
        q: "What kind of testing do you perform before launching an app?",
        a: "Softkingo conducts comprehensive testing, including: Functional and unit testing; User Acceptance Testing (UAT); Performance and stress testing; Security testing; Device and platform compatibility testing. This ensures the app is stable, secure, and ready for launch."
      },
      {
        q: "Do you offer custom app solutions or use clone scripts?",
        a: "Softkingo offers both fully custom app development and customized clone app solutions. Clone scripts are ideal for faster market entry and are always tailored to match the client's branding, features, and business goals."
      },
      {
        q: "Can I get a prototype or MVP before the full version is developed?",
        a: "Yes, Softkingo specializes in building prototypes and MVPs to help clients validate ideas, test core features, gather feedback, and reduce risk before full-scale development."
      }
    ],
    client: [
      {
        q: "How does Softkingo build long-term relationships with clients?",
        a: "Softkingo builds long-term client relationships by focusing on trust, transparency, and genuine collaboration. From the beginning, the team takes time to understand each client's business goals, challenges, and expectations. By consistently delivering high-quality solutions and maintaining clear, honest communication, Softkingo ensures clients feel confident and supported throughout the journey. Even after project completion, the team remains engaged through post-launch support and regular feedback, helping refine products and strengthen long-term partnerships built on reliability and mutual respect."
      },
      {
        q: "Will I have a dedicated project manager assigned to my project?",
        a: "Yes, Softkingo assigns a dedicated project manager to every project. Your project manager acts as your single point of contact, managing timelines, coordinating the development team, and handling day-to-day communication. This ensures smooth coordination, clear accountability, and consistent updates, giving clients peace of mind and full visibility throughout the project lifecycle."
      },
      {
        q: "How do you handle client feedback and change requests during development?",
        a: "Softkingo actively encourages client feedback at every stage of development. Change requests are carefully reviewed, discussed transparently, and incorporated into the agile workflow whenever feasible. Regular meetings, demos, and review cycles keep clients involved, allowing improvements to be made efficiently without affecting overall project momentum. This flexible and collaborative approach ensures the final product aligns closely with evolving business needs."
      },
      {
        q: "What's your communication process with clients across different time zones?",
        a: "Softkingo has extensive experience working with clients across the globe and understands the importance of seamless communication across time zones. The team schedules meetings that suit client availability and uses multiple communication channels such as email, video calls, and instant messaging. Regular updates and prompt responses ensure alignment, proactive problem-solving, and uninterrupted collaboration regardless of geographic location."
      },
      {
        q: "Do you sign NDAs and ensure project confidentiality?",
        a: "Yes, Softkingo fully understands the importance of protecting sensitive information and intellectual property. The company is always prepared to sign comprehensive Non-Disclosure Agreements (NDAs) before starting a project. In addition, strict internal security policies and access controls are followed to ensure all confidential data, project details, and proprietary information are handled with the highest level of discretion."
      },
      {
        q: "How do you handle disputes or project delays that may arise?",
        a: "Softkingo addresses disputes or delays with transparency and a solution-focused mindset. If any challenges arise, the project manager communicates openly with the client, explains the situation clearly, and proposes practical solutions. The team works collaboratively to resolve issues quickly and fairly, always prioritizing client satisfaction and maintaining project momentum."
      },
      {
        q: "Can clients be involved in every stage of the project lifecycle?",
        a: "Yes, Softkingo welcomes and encourages client involvement throughout the entire project lifecycle. Clients can participate in discovery sessions, design reviews, development milestones, testing phases, and post-launch support. Regular updates and collaborative tools ensure clients remain informed, engaged, and involved in key decisions, resulting in more personalized and effective outcomes."
      },
      {
        q: "How do you ensure quality and performance meet client expectations?",
        a: "Softkingo follows strict quality assurance practices throughout the development process. Dedicated QA teams perform extensive testing, including manual and automated checks, performance testing, security validation, and compatibility testing. Continuous code reviews, performance optimizations, and user acceptance testing (UAT) ensure that the final product is reliable, scalable, and aligned with client expectations."
      },
      {
        q: "What's your process for onboarding new clients?",
        a: "Softkingo's onboarding process is structured, transparent, and client-focused. It begins with detailed discussions to understand business objectives and technical requirements. The team then defines project scope, timelines, and success metrics. A dedicated project manager is assigned, and communication processes are established to ensure clarity and alignment from the very start."
      },
      {
        q: "How does Softkingo ensure transparency in pricing and timelines?",
        a: "Transparency is a core value at Softkingo. Clients receive detailed proposals that clearly outline costs, deliverables, and milestones. Timelines are defined upfront, and progress is shared regularly. Any changes to scope, pricing, or schedules are discussed openly and documented in advance, ensuring clients remain fully informed throughout the engagement."
      }
    ],
    services: [
      {
        q: "What types of mobile apps does Softkingo develop — eCommerce, fintech, dating, etc.?",
        a: "Softkingo develops a wide range of mobile applications across various industries, including e-commerce platforms, fintech and digital wallet apps, dating and social networking solutions, healthcare and telemedicine apps, food delivery and on-demand services, logistics and transportation platforms, real estate solutions, education and e-learning apps, and gaming and entertainment applications. This broad experience allows Softkingo to understand industry-specific challenges and deliver tailored, high-performing solutions."
      },
      {
        q: "Do you offer cross-platform app development using Flutter or React Native?",
        a: "Yes, Softkingo offers cross-platform app development using frameworks such as Flutter and React Native. This approach allows businesses to reach both iOS and Android users with a single codebase, reducing development time and costs while maintaining a native-like user experience."
      },
      {
        q: "Can I hire a dedicated developer or team for my project?",
        a: "Yes, Softkingo provides flexible engagement models that allow clients to hire dedicated developers or full teams. Whether you need one specialist or a complete project team, these professionals work exclusively on your project and integrate seamlessly with your internal processes."
      },
      {
        q: "What's your communication process with clients across different time zones?",
        a: "Softkingo manages global projects efficiently by adopting flexible communication schedules and reliable collaboration tools. Regular meetings, timely updates, and prompt responses ensure smooth coordination and uninterrupted progress, regardless of time zone differences."
      },
      {
        q: "Do you also offer web development and backend services?",
        a: "Yes, Softkingo offers complete web development and backend services alongside mobile app development. This includes building secure web applications, scalable APIs, custom admin panels, and robust backend infrastructures to ensure seamless integration across platforms."
      },
      {
        q: "Do you offer UI/UX design services as a standalone service?",
        a: "Yes, Softkingo offers UI/UX design as both a standalone service and as part of full development projects. The design team focuses on user research, wireframing, prototyping, and intuitive design to create visually appealing and user-friendly digital products."
      },
      {
        q: "Can Softkingo help me build an MVP (Minimum Viable Product)?",
        a: "Yes, Softkingo has strong expertise in building MVPs for startups and entrepreneurs. The team helps validate ideas through rapid prototyping, lean development, and core feature prioritization, enabling faster market entry with a scalable foundation."
      },
      {
        q: "Do you offer app store optimization (ASO) or app marketing services?",
        a: "Yes, Softkingo provides ASO and app marketing services to improve app visibility and downloads. Services include keyword optimization, metadata enhancements, visual improvements, and promotional strategies to maximize reach and engagement."
      },
      {
        q: "What is your pricing model — hourly, fixed, or milestone-based?",
        a: "Softkingo offers flexible pricing models, including hourly billing for evolving projects, fixed-price models for clearly defined scopes, and milestone-based payments aligned with project deliverables. This flexibility allows clients to choose the model that best fits their budget and requirements."
      },
      {
        q: "Do you offer post-launch maintenance and support plans?",
        a: "Yes, Softkingo provides customized post-launch maintenance and support plans that include bug fixes, performance improvements, security updates, feature enhancements, and ongoing technical support to keep applications stable and competitive."
      },
      {
        q: "Can Softkingo help with scaling the app after launch (cloud, DevOps, updates)?",
        a: "Yes, Softkingo supports post-launch scaling through cloud migration, infrastructure optimization, DevOps consulting, CI/CD implementation, and regular updates. This ensures applications remain reliable, secure, and scalable as business needs grow."
      }
    ],
    pricing: [
      {
        q: "How much does it cost to develop a mobile app with Softkingo?",
        a: "The cost of developing a mobile app with Softkingo depends on several factors, including app complexity, required features, chosen platforms, and any custom integrations. Typically, a simple mobile app with basic functionality starts in the range of $30,000 to $50,000. Applications with more advanced features, complex workflows, or enterprise-level requirements generally range from $80,000 to $90,000 or more. For projects that require only core functionality and a straightforward design, entry-level solutions may start between $10,000 and $40,000. Softkingo follows a transparent pricing approach and works closely with clients to recommend cost-effective solutions that align with business goals and budgets."
      },
      {
        q: "What are the different engagement models you offer?",
        a: "Softkingo offers flexible engagement models designed to suit a wide variety of project needs. The Fixed Price model is ideal for projects with clearly defined requirements and deliverables. The Time & Material (Hourly) model works best for projects with evolving scopes or changing requirements, allowing clients to pay based on actual development hours. The Dedicated Team model is suitable for mid- to large-scale or long-term projects, where clients receive a fully dedicated team that functions as an extension of their organization, billed monthly or hourly."
      },
      {
        q: "Do you provide a detailed cost breakdown before starting a project?",
        a: "Yes, Softkingo provides a comprehensive and transparent cost breakdown before any project begins. The estimate clearly outlines expenses related to design, development, quality assurance, integrations, and any additional services. This ensures clients have complete clarity about the investment required and can move forward with confidence before project kick-off."
      },
      {
        q: "Is there a minimum budget requirement for working with Softkingo?",
        a: "Softkingo's typical project minimums range between $5,000 and $25,000 for smaller solutions, although the exact minimum depends on project scope, complexity, and engagement model. For MVPs or on-demand app solutions, entry budgets can be lower, especially during promotional periods or startup-focused initiatives."
      },
      {
        q: "Do you offer discounts for startups or long-term projects?",
        a: "Yes, Softkingo occasionally offers promotional discounts, including reductions of up to 40% for startups and long-term partnerships. Additional discounts or bundled pricing may be available for multi-phase projects or extended engagements. These offers vary by season and eligibility, so clients are encouraged to contact Softkingo directly for current promotions."
      },
      {
        q: "How is the payment schedule structured — milestone-based or upfront?",
        a: "Softkingo typically follows a milestone-based payment structure, where payments are made as predefined project milestones are completed. This ensures alignment between progress and payments. Depending on the project type and engagement model, an upfront deposit or initial retainer may be required. Overall, the focus remains on flexibility, fairness, and transparency."
      },
      {
        q: "Can I scale my development team up or down during the project?",
        a: "Yes, Softkingo allows clients to scale their development team up or down during the project, especially under the dedicated team or time-and-materials models. This flexibility is ideal for projects with changing requirements or fluctuating workloads, allowing businesses to optimize costs and timelines efficiently."
      },
      {
        q: "Do you charge separately for UI/UX design and backend development?",
        a: "Yes, UI/UX design and backend development are typically listed as separate line items within the project estimate. Clients who require only UI/UX design or only backend services can engage these offerings independently. For full-cycle development projects, these components are clearly itemized to maintain pricing transparency."
      },
      {
        q: "Are there any hidden or additional costs I should be aware of?",
        a: "Softkingo follows a strict no-hidden-cost policy. All foreseeable expenses, including third-party services, cloud hosting, APIs, or compliance-related costs, are clearly communicated upfront. However, clients should account for external variables such as licensing fees, legal requirements, or third-party service changes, which are common across the software industry. Any such costs are discussed in advance to avoid surprises."
      },
      {
        q: "Can I request a free quote or project consultation?",
        a: "Absolutely. Softkingo offers free project consultations and personalized quotes. Clients can share their requirements, and the team will provide a tailored estimate along with expert insights—without any obligation."
      }
    ],
    technology: [
      {
        q: "What tech stack does Softkingo use for mobile app development?",
        a: "Softkingo uses a modern and versatile technology stack to build high-performance mobile applications. Native iOS apps are developed using Swift and Objective-C, while Android applications are built with Kotlin and Java. Backend development commonly involves Node.js, PHP, MongoDB, and Angular. For cross-platform solutions, Softkingo leverages Flutter and React Native, ensuring flexibility, scalability, and long-term maintainability."
      },
      {
        q: "Do you offer AI/ML integration for intelligent apps?",
        a: "Yes, Softkingo specializes in integrating artificial intelligence and machine learning features into mobile applications. These capabilities include personalized user experiences, predictive analytics, intelligent chatbots, automated workflows, and real-time data analysis. By using advanced tools such as TensorFlow, Core ML, Dialogflow, and leading cloud-based AI services, Softkingo ensures apps deliver smart, data-driven functionality."
      },
      {
        q: "Can you develop blockchain-based or crypto wallet apps?",
        a: "Yes, blockchain development is a key area of expertise at Softkingo. The team builds secure blockchain applications and custom crypto wallet solutions featuring advanced encryption, multi-signature authentication, and secure transaction handling. Softkingo also develops decentralized applications (dApps), smart contracts, and integrations with crypto exchanges, all aligned with modern blockchain standards."
      },
      {
        q: "Do you support integration with third-party APIs and services?",
        a: "Yes, Softkingo regularly integrates third-party APIs and services to enhance app functionality. This includes payment gateways, social media logins, mapping and geolocation services, analytics platforms, cloud services, and IoT devices. These integrations allow businesses to leverage best-in-class external tools while maintaining seamless performance."
      },
      {
        q: "Do you build scalable cloud-based mobile apps?",
        a: "Yes, Softkingo designs and develops scalable cloud-based mobile applications using platforms such as AWS, Google Cloud, and Microsoft Azure. These solutions support real-time data synchronization, secure storage, and high user traffic, ensuring applications remain reliable, flexible, and ready for future growth."
      },
      {
        q: "What frameworks do you use for hybrid/cross-platform apps?",
        a: "For hybrid and cross-platform development, Softkingo works with technologies such as Flutter, React Native, Xamarin, and Kotlin Multiplatform. These frameworks enable faster development, reduced costs, and consistent user experiences across devices while maintaining native-like performance."
      },
      {
        q: "How do you stay updated with the latest app development trends?",
        a: "Softkingo stays ahead of industry trends through continuous research, professional training, and participation in global tech events. The team actively explores advancements in AI, AR/VR, blockchain security, and cloud technologies to ensure clients benefit from cutting-edge, future-ready solutions."
      },
      {
        q: "Can you migrate my existing app to a newer technology?",
        a: "Yes, Softkingo offers app migration and modernization services. This includes upgrading legacy codebases, migrating to modern frameworks, improving UI/UX, and integrating the latest security and performance standards. The migration process is carefully planned to minimize disruption and ensure a smooth user experience."
      },
      {
        q: "Do you develop wearable or IoT apps?",
        a: "Yes, Softkingo develops applications for wearables and IoT devices, including Apple Watch, Wear OS, and smart healthcare or home automation devices. These apps are designed for real-time data processing, seamless device integration, and interactive user experiences."
      },
      {
        q: "What tools do you use for project management and communication?",
        a: "Softkingo uses industry-standard tools to ensure efficient project management and clear communication. Platforms such as Jira, Trello, and Asana are used for task tracking and agile workflows, while Slack, Microsoft Teams, Zoom, and Google Meet support real-time communication and collaboration with clients."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.softkingo.com/faq#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Softkingo",
                    "item": "https://www.softkingo.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "FAQ",
                    "item": "https://www.softkingo.com/faq"
                  }
                ]
              },
              ...commonSchemas
            ]
          })
        }}
      />
      {/* PERFECT HERO (same style) */}
      <section className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/faq-hero.png')" }}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-slate-900 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="w-full">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-cyan-400 font-medium">FAQ</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90 mb-6">
              If you have any doubt, then we can remove them through some of our questions, maybe it will help you a little to clear your doubts.
            </p>

            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span><a href="tel:+917428750870" className="hover:text-emerald-300 transition-colors">Sales: +91-7428750870</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span><a href="mailto:info@softkingo.com" className="hover:text-sky-300 transition-colors">Email: info@softkingo.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAB FAQ CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center -mb-1 bg-gradient-to-r from-slate-50/50 to-sky-50/50 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-slate-200/50 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[160px] py-4 px-2 sm:px-4 text-center font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 rounded-2xl ${activeTab === tab.id
                ? 'bg-gradient-to-r from-sky-600 to-sky-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                : 'text-slate-600 hover:text-sky-600 hover:bg-white/50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {faqData[activeTab].map((faq, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200/50 hover:border-sky-200/70 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 overflow-hidden"
            >
              {/* Animated background shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mt-1">
                  Q{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-sky-900 mb-3 md:mb-4 leading-normal">
                    {faq.q}
                  </h3>
                  <div className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 pt-16 border-t border-sky-200 text-center">
          <p className="text-xl text-gray-700 mb-8">
            Still have questions? Contact our experts directly:
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-lg mb-8">
            <a href="tel:+917428750870" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Call +91-7428750870 →
            </a>
            <a href="mailto:info@softkingo.com" className="inline-flex items-center gap-2 border-2 border-sky-200 hover:border-sky-500 text-sky-700 hover:text-sky-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-sky-50 hover:-translate-y-1">
              Email Us →
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Last Updated: <span className="font-semibold text-sky-900">January 19, 2026</span>
          </p>
        </div>
      </div>

      <style>{`
        h3 { scroll-margin-top: 120px; }
        .group:hover .group-hover\\:text-sky-900 { @apply text-sky-900; }
      `}</style>
    </>
  );
}