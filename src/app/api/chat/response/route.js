import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Smart pattern-based responses
const responsePatterns = [
  {
    keywords: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'start', 'begin', 'help', 'assistance'],
    responses: [
      'Hello! Welcome to Softkingo. How can I assist you with your software development needs today?',
      'Namaste! I am here to help you with web, mobile apps, or any custom software project. What is on your mind?',
      'Hi there! Great to connect with you. Looking for development services, design, or digital solutions?',
      'Hey! Ready to transform your business idea into reality? Tell me about your project.',
      'Welcome! How may I help you with your digital transformation journey today?'
    ],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'rate', 'how much', 'charges', 'budget', 'quotation', 'estimate', 'quote', 'expensive', 'cheap'],
    responses: [
      'Our pricing is fully customized based on your project scope and requirements. Could you share more details so I can provide an accurate estimate?',
      'We offer competitive rates with flexible payment terms. Typical ranges: Websites starting Rs 2-5 lakhs, Mobile Apps Rs 5-15 lakhs, Enterprise solutions custom quoted.',
      "Happy to provide a custom quote! Please tell me: 1. Project type 2. Key features 3. Target timeline 4. Budget range (optional)",
      "Pricing depends on complexity: MVP 4-8 weeks, Simple websites 2-4 weeks, Enterprise platforms 3-6 months. Let's discuss your specific needs.",
      "We structure payments as 30% advance, 40% development complete, 30% go-live. Want a detailed proposal?"
    ],
  },
  {
    keywords: ['service', 'services', 'what do you do', 'offerings', 'provide', 'solutions', 'capabilities', 'expertise'],
    responses: [
      "We specialize in complete digital transformation:\nSoftware Development\nMobile App Development\nWeb & CMS Development\nE-Commerce Development\nBlockchain Development\nAI & ML Services\nIoT & Embedded Systems\nDevOps & Cloud Solutions\n\nWhich solution interests you most?",
      "Our core services include:\nSoftware Development\nMobile Apps (React Native/Flutter)\nModern Web Applications (Next.js)\nEnterprise Solutions\nBlockchain & Web3\nAI/ML Integration\nCloud Architecture\n\nTell me about your business goals.",
      "Complete technology services for modern businesses across all industries and scales."
    ],
  },
  {
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'get in touch', 'talk', 'connect', 'number', 'address', 'office', 'location'],
    responses: [
      "Contact our team:\nEmail: sales@softkingo.com\nPhone: +91 74287 50870\nAddress: B-148, Block B, Sector 63, Noida, UP - 201301, India\nHours: MON-FRI 10 AM-7 PM\n\nWhatsApp also available on same number.",
      "Reach us directly:\nPrimary Email: sales@softkingo.com\nPhone/WhatsApp: +91 74287 50870\nOffice: B-148, Sector 63, Noida\nWorking Hours: 10 AM - 7 PM IST (Mon-Fri)",
      "You can email sales@softkingo.com or call/WhatsApp +91 74287 50870. Our Noida office is open Mon-Fri 10 AM-7 PM."
    ],
  },
  {
    keywords: ['hours', 'timing', 'available', 'open', 'when', 'schedule', 'time', 'working hours', 'office time'],
    responses: [
      "Our working hours: Monday to Friday 10 AM - 7 PM IST. For urgent requirements, WhatsApp +91 74287 50870 or email sales@softkingo.com anytime.",
      "Available Mon-Fri 10 AM-7 PM IST. Weekend support available for critical projects via WhatsApp +91 74287 50870.",
      "Office timing: 10 AM to 7 PM IST, Monday to Friday. Location: B-148, Sector 63, Noida."
    ],
  },
  {
    keywords: ['portfolio', 'work', 'projects', 'case study', 'examples', 'previous', 'clients', 'gallery'],
    responses: [
      "Explore our portfolio at /portfolio to see 100+ successful projects across Fintech, Healthcare, E-commerce, EdTech, and Logistics industries.",
      "Check our live projects:\n/portfolio - Complete showcase\n/gallery - Design portfolios\n/case-studies - Business results\nWe have delivered 100+ projects successfully.",
      "Our work portfolio includes enterprise dashboards, customer portals, mobile applications, and complex platforms. Visit /portfolio."
    ],
  },
  {
    keywords: ['mobile app', 'android', 'ios', 'react native', 'flutter', 'app development', 'application'],
    responses: [
      "Mobile app development experts:\nNative iOS (Swift) & Android (Kotlin)\nCross-platform React Native & Flutter\nApp Store optimization\nProgressive Web Apps\n\nWhat type of app are you planning?",
      "We build high-performance mobile applications:\niOS & Android Native development\nReact Native (80% code reuse)\nFlutter (single codebase)\nEnterprise mobile solutions\nShare your app concept.",
      "Complete mobile app solutions from concept to app store deployment."
    ],
  },
  {
    keywords: ['website', 'web development', 'web app', 'next.js', 'react', 'frontend', 'cms', 'ecommerce'],
    responses: [
      "Modern web development services:\nNext.js 15 App Router\nReact 19 + TypeScript\nHeadless CMS integration\nProgressive Web Apps\nE-commerce platforms\nEnterprise dashboards\n\nWhat is your web project vision?",
      "We create:\nStatic JAMstack sites\nDynamic Next.js applications\nHeadless CMS (Sanity/Strapi)\nCustom e-commerce solutions\nCustomer portals & admin panels",
      "Performance-first websites and web applications built with modern JavaScript frameworks."
    ],
  },
  {
    keywords: ['design', 'ui', 'ux', 'figma', 'prototype', 'designer', 'interface'],
    responses: [
      "UI/UX Design services:\nFigma prototypes & design systems\nUser research & testing\nMobile & web design\nAccessibility (WCAG compliant)\nMotion design & micro-interactions\n\nWant to see our design process?",
      "Complete design services:\nWireframes & interactive prototypes\nUI Design systems\nUser Experience research\nBrand identity design\nDesign for web & mobile",
      "User-centric UI/UX design that converts visitors into customers."
    ],
  },
  {
    keywords: ['blockchain', 'web3', 'crypto', 'smart contract', 'nft', 'defi'],
    responses: [
      "Blockchain development expertise:\nSmart contract development (Solidity)\nWeb3 dApps\nNFT marketplaces\nDeFi platforms\nTokenization solutions\nEnterprise blockchain\nVisit /services/blockchain-development",
      "Complete blockchain solutions:\nEthereum, Polygon, Solana\nSmart contracts & dApps\nDeFi protocols\nNFT platforms\nWeb3 integrations"
    ],
  },
  {
    keywords: ['ai', 'ml', 'artificial intelligence', 'machine learning', 'chatbot', 'automation'],
    responses: [
      "AI/ML Services:\nCustom machine learning models\nChatbot development\nPredictive analytics\nComputer vision\nNatural language processing\nAI integration in existing systems\n/services/ai-ml",
      "Artificial Intelligence solutions:\nCustom ML models\nChatGPT integrations\nAI-powered automation\nData analytics & insights\nIntelligent business applications"
    ],
  },
  {
    keywords: ['devops', 'cloud', 'aws', 'docker', 'deployment', 'hosting', 'infrastructure'],
    responses: [
      "DevOps & Cloud services:\nAWS, Azure, Google Cloud\nDocker & Kubernetes\nCI/CD pipelines\nInfrastructure as Code\nCloud migration\n24/7 monitoring & scaling\n/services/devops-cloud",
      "Complete DevOps solutions:\nCloud architecture design\nAutomated deployments\nContainer orchestration\nPerformance monitoring\nZero-downtime deployments"
    ],
  },
  {
    keywords: ['quote', 'estimate', 'proposal', 'requirement', 'project details', 'scope'],
    responses: [
      "Let's create your custom proposal! Please share:\n1. Project type & scope\n2. Key features required\n3. Target timeline\n4. Budget expectations\n\nI'll connect you with our solutions architect.",
      "Ready to prepare your project proposal. What should I include:\nTechnical requirements\nDesign preferences\nIntegration needs\nSuccess metrics & KPIs",
      "Need a detailed proposal? Visit /contact or share your project brief for personalized quote."
    ],
  },
  {
    keywords: ['timeline', 'deadline', 'how long', 'duration', 'time', 'fast', 'delivery'],
    responses: [
      "Typical project timelines:\nMVP: 4-8 weeks\nSimple websites: 2-4 weeks\nMobile apps: 8-12 weeks\nEnterprise platforms: 3-6 months\n\nWhat is your target launch date?",
      "Delivery timeline by project type:\nDiscovery phase: 1 week\nDesign: 2-3 weeks\nDevelopment: 4-12 weeks\nTesting: 1-2 weeks\nLaunch: 1 week\n\nWe offer accelerated delivery options.",
      "Project timelines customized to your needs with clear milestones and delivery dates."
    ],
  },
  {
    keywords: ['payment', 'pay', 'invoice', 'transaction', 'milestone', 'billing'],
    responses: [
      "Flexible payment terms:\n30% Advance\n40% On development complete\n30% On successful go-live\n\nMethods: Bank transfer, UPI, Cards, PayPal, Stripe, International wire transfer.",
      "Payment structure:\nMilestone-based payments\n30-70 terms available for enterprises\nWeekly/monthly invoicing options\nAll major payment methods accepted.",
      "Secure payment processing with milestone-based billing and flexible terms."
    ],
  },
  {
    keywords: ['support', 'maintenance', 'help', 'issue', 'problem', 'bug', 'after launch', 'post deployment'],
    responses: [
      "Comprehensive post-launch support:\n30 days free bug fixes\n3/6/12 month maintenance packages\n24/7 monitoring available\nPriority support SLA\nSecurity & performance updates.",
      "Support packages:\nFree bug fixes: 30 days post-launch\nMonthly maintenance retainers\nEmergency support available\nProactive monitoring & optimization.",
      "Complete post-deployment support and maintenance services."
    ],
  },
  {
    keywords: ['team', 'who are you', 'about', 'company', 'who', 'developer', 'size', 'experience'],
    responses: [
      "About Softkingo:\n50+ expert developers & designers\nNoida, India headquarters\n5+ years industry experience\n100+ projects delivered\n4.9/5 client satisfaction rating\nGlobal client base\n\n/about & /our-team",
      "We are a full-stack development company with:\nCertified developers (50+)\nModern technology expertise\nEnterprise & startup experience\nProven delivery track record\nVisit /about to meet our leadership team.",
      "Professional software development team based in Noida, India serving global clients."
    ],
  },
  {
    keywords: ['technology', 'tech stack', 'tools', 'framework', 'stack', 'language'],
    responses: [
      "Our technology expertise:\nFrontend: Next.js 15, React 19, Vue 3, Tailwind CSS\nBackend: Node.js, Python, Laravel, Express\nMobile: React Native, Flutter, Swift, Kotlin\nDatabase: PostgreSQL, MongoDB, Redis\nCloud: AWS, Azure, Google Cloud, Vercel\nDevOps: Docker, Kubernetes, GitHub Actions",
      "Modern full-stack capabilities:\nNext.js 15 App Router + React 19\nTypeScript end-to-end\ntRPC + Prisma ORM\nTailwind CSS + shadcn/ui\nDocker containerization\nCloud-native architecture",
      "Cutting-edge technology stack for scalable, high-performance applications."
    ],
  },
  {
    keywords: ['about', 'company', 'softkingo', 'overview', 'background'],
    responses: [
      "Softkingo is a premium software development company:\nHeadquarters: Noida, India\nTeam: 50+ certified professionals\nSpecialization: Custom software solutions\nClients: Startups to Fortune 500\nMission: Digital transformation excellence\n\n/about for complete company overview.",
      "Leading software development firm delivering:\nEnterprise-grade applications\nMobile & web solutions\nDigital transformation projects\nComplex technical challenges\nProven business results",
      "Technology partner helping businesses transform through custom software solutions."
    ],
  },
  {
    keywords: ['career', 'job', 'hiring', 'join', 'work', 'employment', 'vacancy'],
    responses: [
      "Explore career opportunities at /careers\n\nCurrent openings for:\nFrontend Developers (React/Next.js)\nBackend Developers (Node/Python)\nMobile Developers (React Native/Flutter)\nUI/UX Designers\nDevOps Engineers\n\nJoin our Noida team!",
      "We are hiring talented developers and designers. Check /careers for latest positions or email your resume to careers@softkingo.com",
      "Growing team with multiple technical positions open. Visit /careers."
    ],
  },
  {
    keywords: ['blog', 'article', 'insights', 'guide', 'whitepaper', 'resource'],
    responses: [
      "Technical resources & insights:\n/blog - Latest articles\n/guides - Development guides\n/whitepapers - Industry research\n/featured - Popular content\n/press-releases - Company news\n\nLatest: Next.js 15 migration strategies",
      "Knowledge base available at:\nBlog articles & tutorials\nTechnical guides & whitepapers\nCase studies & industry insights\nDevelopment best practices\n\nVisit /blog for latest content.",
      "Comprehensive technical blog and resources section."
    ],
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'good', 'nice', 'perfect', 'excellent'],
    responses: [
      "You are welcome! Happy to help. Is there anything else I can assist you with today?",
      "My pleasure assisting you! Anything more I can help with regarding your project requirements?",
      "Glad I could help! Ready for your next question or project discussion?",
      "Thank you! Let me know how else we can support your development needs."
    ],
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'end', 'close', 'done', 'finish'],
    responses: [
      "Thank you for chatting! Visit softkingo.com anytime or email sales@softkingo.com. Have a great day!",
      "Goodbye! Feel free to return anytime for your software development needs. Happy building!",
      "Thanks for connecting! We look forward to working with you on your next project.",
      "See you soon! Don't hesitate to reach out for consultations or project discussions."
    ],
  },
  {
    keywords: ['demo', 'live', 'show', 'example', 'prototype', 'test'],
    responses: [
      "Live demos available:\n/portfolio - Working projects\n/gallery - Design showcases\nBook 30-min personalized demo\nReal customer portals & dashboards available\n\nWhat type of demo interests you?",
      "Want to see our work live?\nAdmin dashboards\nE-commerce platforms\nCustomer management systems\nMobile app prototypes\nEnterprise solutions\n\nRequest demo at /contact",
      "Interactive demos available upon request for serious prospects."
    ],
  },
  {
    keywords: ['industries', 'sector', 'vertical', 'business', 'enterprise'],
    responses: [
      "We serve multiple industries:\nFintech & Banking\nHealthcare & MedTech\nE-commerce & Retail\nEdTech & Learning\nLogistics & Supply Chain\nSaaS Platforms\nEnterprise Software\n\n/industries for case studies",
      "Industry expertise across:\nFinancial services\nHealthcare systems\nRetail & e-commerce\nEducation technology\nLogistics platforms\nManufacturing ERP\nCustom SaaS solutions",
      "Technology solutions tailored for specific industry verticals."
    ],
  }
];

function getSmartResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const pattern of responsePatterns) {
    if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
      const responses = pattern.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Default responses
  const defaultResponses = [
    'Thanks for your message! Our team will review this and get back to you shortly. In the meantime, feel free to ask me anything! 😊',
    'I appreciate you reaching out! While I process that, is there anything specific I can help you with right now?',
    'Got it! Let me connect you with the right person from our team. Meanwhile, explore our services at /services',
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, conversationId, history } = body;

    // TODO: Replace with OpenAI API call
    /*
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful customer support assistant for a web development company. Be friendly, professional, and concise. Always try to guide users to relevant services or contact information.',
        },
        ...(history || []),
        { role: 'user', content: message },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    */

    const response = getSmartResponse(message);

    // Save bot response to database
    await prisma.chatMessage.create({
      data: {
        conversationId,
        content: response,
        sender: 'bot',
        type: 'text',
        isRead: false,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat response error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
