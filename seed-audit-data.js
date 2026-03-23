
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting ULTIMATE COMPREHENSIVE FIELD AUDIT SEEDING ---');

  const richTextSample = '<b>BOLD</b>, <i>ITALIC</i>, <ul><li>List Item 1</li><li>List Item 2</li></ul> <a href="https://softkingo.com">Link</a>';
  const plainText = "Standard dummy text for display verification.";

  // 1. SOLUTION AUDIT PAGE
  const solutionAudit = {
    title: 'Solution Test Audit',
    slug: 'solution-test-audit',
    key: 'solution-test-audit',
    type: 'solution',
    status: 'published',
    contentJson: JSON.stringify({
      activeSections: [
        'hero', 'stats', 'intro', 'features', 'awards', 'whyNeed', 
        'servicesList', 'appModules', 'aiCapabilities', 'portfolio', 
        'process', 'techStack', 'monetization', 'whyChoose', 
        'consultation', 'blogs', 'faq'
      ],
      content: {
        hero: { 
            title: 'Solution Hero Title', 
            description: 'Hero Description with ' + richTextSample, 
            subtitle: 'Hero Subtitle with ' + richTextSample 
        },
        stats: { 
            title: 'Stats Title',
            items: [
                { value: '99%', label: 'Success Rate' },
                { value: '500+', label: 'Projects' },
                { value: '24/7', label: 'Support' },
                { value: '10M', label: 'Users' }
            ]
        },
        intro: { 
            title: 'Intro Title', 
            description: 'Intro Description ' + richTextSample, 
            listItems: ['Robust Feature 1', 'Robust Feature 2', 'Robust Feature 3'],
            pill: 'ULTRA AUDIT'
        },
        features: { 
            title: 'Features Title',
            items: [
                { title: 'Core Feature 1', description: 'Detailed desc 1' },
                { title: 'Core Feature 2', description: 'Detailed desc 2' },
                { title: 'Core Feature 3', description: 'Detailed desc 3' }
            ]
        },
        awards: { title: 'Industry Recognized Awards' },
        whyNeed: { 
            title: 'Why You Need This', 
            subtitle: 'Critical advantages for your business.',
            items: [
                { icon: 'Zap', title: 'Speed', description: 'Fast delivery ' + richTextSample, bullets: ['Bullet A', 'Bullet B'] },
                { icon: 'Shield', title: 'Security', description: 'Safe & Secure ' + richTextSample, bullets: ['Bullet C', 'Bullet D'] }
            ] 
        },
        servicesList: { 
            title: 'Comprehensive Services', 
            subtitle: 'End-to-end support for your journey.',
            tabs: [
                { 
                    label: 'Service Tab 1', 
                    heading: 'Tab 1 Heading', 
                    description: 'Tab 1 Desc ' + richTextSample, 
                    image: '/images/placeholder.png',
                    isWeb: true,
                    items: [
                        { title: 'Service Item 1', description: 'Item Desc 1', icon: 'Code' },
                        { title: 'Service Item 2', description: 'Item Desc 2', icon: 'Layout' }
                    ] 
                }
            ] 
        },
        userApp: { tag: 'USER APP', title: 'User Application', description: 'User UI/UX ' + richTextSample, features: ['Login', 'Chat', 'Store'], image: '/images/test-app.png' },
        vendorApp: { tag: 'VENDOR APP', title: 'Vendor Management', description: 'Vendor Tools ' + richTextSample, features: ['Inventory', 'Orders'], image: '/images/test-app.png' },
        adminPanel: { tag: 'ADMIN PANEL', title: 'Super Admin', description: 'Control Panel ' + richTextSample, features: ['Analytics', 'Users'], image: '/images/test-app.png' },
        aiCapabilities: { 
            title: 'AI Integration', highlight: 'INTELLIGENT', subtitle: 'Next-gen AI features.',
            items: [
                { title: 'AI Module 1', description: 'AI Logic 1 ' + richTextSample, points: ['Smart Point 1', 'Smart Point 2'] },
                { title: 'AI Module 2', description: 'AI Logic 2 ' + richTextSample, points: ['Smart Point 3', 'Smart Point 4'] }
            ]
        },
        portfolio: { title: 'Featured Portfolio', subtitle: 'Proven Track Record', category: 'marketing' },
        process: {
            title: 'Development Process',
            steps: [
                { title: 'Analysis', description: 'Requirement gathering ' + richTextSample },
                { title: 'Design', description: 'UI/UX prototyping ' + richTextSample },
                { title: 'Launch', description: 'Production deployment ' + richTextSample }
            ]
        },
        techStack: { 
            title: 'Tech Stack', 
            items: [
                { name: 'React', image: '/images/tech/react.png' },
                { name: 'Node.js', image: '/images/tech/node.png' },
                { name: 'MongoDB', image: '/images/tech/mongodb.png' }
            ] 
        },
        monetization: { 
            title: 'Revenue Models', highlight: 'PROFIT', subtitle: 'How you make money.',
            models: [
                { title: 'Subscription', description: 'Recurring revenue ' + richTextSample, points: ['Monthly', 'Yearly'] },
                { title: 'Marketplace', description: 'Commission based ' + richTextSample, points: ['Fees', 'Ads'] }
            ] 
        },
        whyChoose: { 
            title: 'Safety & Security', highlight: 'SECURE', subtitle: 'Built on trust.',
            items: [
                { title: 'Data Privacy', icon: 'ShieldCheck', description: 'Encryption at rest ' + richTextSample, points: ['SSL', 'AES'] },
                { title: 'Uptime', icon: 'Cpu', description: '99.9% availability ' + richTextSample, points: ['AWS', 'Scale'] }
            ] 
        },
        consultation: { title: 'Ready to Start?', subtitle: 'Talk to an expert today.', buttonLabel: 'Contact Now' },
        faq: {
           title: 'Questions?',
           items: [
               { q: 'Is it scalable?', a: 'Yes, it is highly scalable ' + richTextSample },
               { q: 'Is it secure?', a: 'Yes, we use the latest security standards ' + richTextSample }
           ]
        }
      }
    })
  };

  // 2. INDUSTRY AUDIT PAGE
  const industryAudit = {
    title: 'Industry Test Audit',
    slug: 'industry-test-audit',
    key: 'industry-test-audit',
    type: 'industry',
    status: 'published',
    contentJson: JSON.stringify({
      activeSections: ['hero', 'challenges', 'covers', 'technologies', 'portfolio', 'otherIndustries', 'whyChoose', 'process', 'faq'],
      content: {
        hero: { title: 'Industry Hero Title', description: 'Comprehensive industry overview ' + richTextSample },
        challenges: { 
            title: 'Solving Industry Hurdles', 
            subtitle: 'We address critical pain points ' + richTextSample,
            image: '/images/industry-challenge.jpg',
            items: [{ title: 'Efficiency Lag' }, { title: 'Data Silos' }, { title: 'Complex Regs' }],
            stats: [
                { value: '80%', label: 'Process Speed' }, 
                { value: '2X', label: 'ROI' }, 
                { value: '50%', label: 'Cost Cut' }
            ]
        },
        covers: { 
            title: 'Verticals We Cover', 
            items: [
                { title: 'Retail', description: 'POS & Inventory ' + richTextSample, icon: '🛒' },
                { title: 'Logistics', description: 'Fleet Management ' + richTextSample, icon: '🚚' }
            ] 
        },
        technologies: { title: 'Modern Tech Stack', items: [{ name: 'Next.js', image: '/images/tech/next.png' }] },
        portfolio: { title: 'Case Studies', subtitle: 'Success Stories', category: 'ecommerce' },
        otherIndustries: { 
            title: 'Global Expertise', 
            subtitle: 'Serving sectors worldwide.', 
            image: '/images/industry-center.jpg',
            items: [
                { title: 'Healthcare', icon: '🏥' },
                { title: 'Finance', icon: '💰' },
                { title: 'Real Estate', icon: '🏢' },
                { title: 'Travel', icon: '✈️' },
                { title: 'Education', icon: '🎓' },
                { title: 'Entertainment', icon: '🎮' }
            ] 
        },
        whyChoose: { 
            title: 'The Softkingo Advantage', 
            items: [
                { title: 'Excellence', description: 'High quality ' + richTextSample, icon: 'Award' },
                { title: 'Speed', description: 'Fast GTM ' + richTextSample, icon: 'Rocket' }
            ] 
        },
        process: { steps: [{ title: 'Concept', description: 'Ideation phase ' + richTextSample }] },
        faq: { items: [{ q: 'Why us?', a: 'Proven results ' + richTextSample }] }
      }
    })
  };

  // 3. SERVICE AUDIT PAGE
  const serviceAudit = {
    title: 'Service Test Audit',
    slug: 'service-test-audit',
    key: 'service-test-audit',
    type: 'service',
    status: 'published',
    contentJson: JSON.stringify({
      activeSections: ['hero', 'stats', 'services', 'consultation', 'tech', 'process', 'highlight', 'portfolio', 'solutions', 'industries', 'user-guide', 'faq'],
      content: {
        heroTitle: 'Premium Services Audit',
        heroSubtitle: 'Next-gen custom development ' + richTextSample,
        heroBg: '/images/services/default-bg.png',
        stats: { 
            years: '10+', yearsLabel: 'Exp Years',
            projects: '25+', projectsLabel: 'Countries',
            team: '100+', teamLabel: 'Experts',
            rating: '4.9/5', ratingLabel: 'Rating'
        },
        services: {
            title: 'Core Expertise',
            subtitle: 'Powerful solutions ' + richTextSample,
            categories: [
                { id: 1, title: 'Web App', description: 'Next.js experts ' + richTextSample, capabilities: ['Scalable', 'SSR'], technologies: ['React', 'Next'] },
                { id: 2, title: 'Mobile App', description: 'Native performance ' + richTextSample, capabilities: ['iOS', 'Android'], technologies: ['ReactNative', 'Swift'] }
            ]
        },
        consultation: { title: 'Consult Now', subtitle: 'Free quote ' + richTextSample, buttonLabel: 'Book Now' },
        tech: { 
            title: 'Advanced Stack', 
            industries: [
                { title: 'Frontend', items: ['FaReact', 'FaHtml5'] },
                { title: 'Backend', items: ['FaNodeJs', 'FaDatabase'] }
            ] 
        },
        process: { 
            title: 'Our Method', 
            steps: [{ title: 'Step 1', description: 'Detailed step 1 ' + richTextSample }] 
        },
        highlight: {
            title: 'Why Choose This Service',
            subtitle: 'Competitive edge ' + richTextSample,
            tabs: [
                { 
                    label: 'Security', 
                    iconName: 'FaShieldAlt', 
                    fullTitle: 'Enterprise Security ' + richTextSample,
                    features: ['Bullet 1', 'Bullet 2'], 
                    icons: [{ label: 'AES', iconName: 'FaLock' }] 
                }
            ]
        },
        portfolioTitle: 'Recent Successes',
        portfolioSubtitle: 'Helping brands grow.',
        portfolioCategory: 'web',
        solutions: {
            title: 'Industry Solutions',
            subtitle: 'Proven patterns ' + richTextSample,
            items: [
                { itemTitle: 'Retail Flow', itemDesc: 'Ecomm optimized ' + richTextSample, itemImage: '/images/placeholder.jpg' }
            ]
        },
        industrySection: {
            items: [
                { title: 'Healthcare', slug: 'healthcare' },
                { title: 'Finance', slug: 'finance' }
            ]
        },
        userGuide: {
            title: 'Service Guide',
            description: 'Tutorials ' + richTextSample,
            sections: [
                { title: 'Setup', description: 'Initial config ' + richTextSample, icon: 'Settings' }
            ]
        },
        faq: { items: [{ q: 'Support?', a: '24/7 dedicated ' + richTextSample }] }
      }
    })
  };

  // 4. HIRE AUDIT PAGE
  const hireAudit = {
    title: 'Hire Test Audit',
    slug: 'hire-test-audit',
    key: 'hire-test-audit',
    type: 'hire',
    status: 'published',
    contentJson: JSON.stringify({
      heroTitle: 'Hire Top 1% Developers',
      heroSubtitle: 'Elite tech talent ' + richTextSample,
      badgeText: 'ELITE HIRE',
      metrics: { avgTime: '24 Hours', network: '500+ Devs', rating: '5.0/5' },
      aboutTitle: 'Hire Frontend Experts',
      aboutSubtitle: 'Specialized in modern frameworks ' + richTextSample,
      benefits: ['Fast Onboarding', 'Risk Free', 'Source Code Ownership'],
      features: [
          { iconKey: 'FaUsers', title: 'Agile Teams', description: 'Scrum ready ' + richTextSample },
          { iconKey: 'FaRocket', title: 'Fast GTM', description: 'Rapid delivery ' + richTextSample }
      ],
      steps: [
          { number: 1, title: 'Inquiry', description: 'Submit needs ' + richTextSample, icon: '/images/hire/h1.png' },
          { number: 2, title: 'Matching', description: '24h match ' + richTextSample, icon: '/images/hire/h1.png' }
      ],
      services: [
          { iconKey: 'FaLaptopCode', title: 'Dedicated', description: 'Full-time devs ' + richTextSample, bg: 'from-sky-600 to-blue-700' }
      ],
      modelsSection: {
          enabled: true,
          title: 'Engagement Models',
          models: [{ iconKey: 'CiClock1', title: 'Hourly', description: 'Pay as you go ' + richTextSample, features: ['Fexibility', 'Transparency'] }]
      },
      pricingSection: {
          enabled: true,
          plans: [{ title: 'Full Stack', price: '$20', priceNote: 'hour', features: ['All Stack', 'NDA'], featured: true }]
      },
      comparisonSection: {
          enabled: true,
          title: 'Why Softkingo?',
          rows: [
              { category: 'Source Code', softkingo: { iconKey: 'FaCheckCircle', text: 'Owned' }, recruiting: { iconKey: 'FaTimesCircle', text: 'N/A' }, outsourcing: { iconKey: 'FaCheckCircle', text: 'Partial' } }
          ]
      },
      profileSection: {
          enabled: true,
          title: 'Expert Profiles',
          profileFeatures: ['Verified CV', 'Live Test', 'Soft Skills'],
          images: { leftTop: '/images/hire/h7.png', rightTop: '/images/hire/h6.png', rightBottom: '/images/hire/h5.png' }
      }
    })
  };

  // 5. CLONE AUDIT PAGE (Briefly for coverage)
  const cloneAudit = {
    title: 'Clone Test Audit',
    slug: 'clone-test-audit',
    key: 'clone-test-audit',
    type: 'clone',
    status: 'published',
    contentJson: JSON.stringify({
      activeSections: ['hero', 'about', 'faq', 'process', 'techStack'],
      content: {
        hero: { title: 'Uber Clone Audit', subtitle: 'On-demand solution ' + richTextSample },
        about: { title: 'About Clone', description: 'Built to scale ' + richTextSample },
        faq: { items: [{ q: 'Is it whitelist?', a: 'Yes ' + richTextSample }] },
        process: { steps: [{ title: 'Setup', description: 'Server config ' + richTextSample }] },
        techStack: { items: [{ name: 'Flutter', image: '/images/tech/flutter.png' }] }
      }
    })
  };

  try {
    const pages = [solutionAudit, industryAudit, serviceAudit, hireAudit, cloneAudit];

    for (const page of pages) {
      await prisma.page.upsert({
        where: { slug: page.slug },
        update: page,
        create: page
      });
      console.log(`✅ Seeded ${page.title} (${page.type})`);
    }

    console.log('--- ULTIMATE SEEDING COMPLETED SUCCESSFULLY ---');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
