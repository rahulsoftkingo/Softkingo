// src/data/chatPatterns.js

/**
 * Hyper-specific Softkingo Chat Patterns.
 * Grounded in real data from public pages: About, Services, Portfolio, and Contact.
 * Includes a strict domain boundary to pivot out-of-scope queries back to Softkingo.
 */

export const responsePatterns = [
  {
    category: 'Greetings',
    keywords: [
      'hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'good afternoon', 
      'start', 'begin', 'help', 'assistance', 'anybody', 'someone', 'hi there', 'hello there', 
      'hey softkingo', 'hola', 'hii', 'heyy'
    ],
    responses: [
      "Hello! Welcome to Softkingo. I'm your digital guide to our ISO-certified software development services. How can I help you transform your business today?",
      "Namaste! It's great to have you here. At Softkingo, we've delivered 400+ apps over 6+ years of excellence. What's on your project roadmap today?",
      "Hi there! You've reached Softkingo, where we turn complex challenges into simple digital experiences. Are you looking for web development, a mobile app, or perhaps AI integration?",
      "Hey! Thanks for stopping by. We're a team of 40+ enthusiastic professionals ready to build something great. What can I assist you with right now?",
      "Welcome! Whether it's SEO, UI/UX, or full-scale App development, Softkingo has the experts to deliver. How can I guide you today?"
    ],
  },
  {
    category: 'About Softkingo & Stats',
    keywords: [
      'about', 'who are you', 'softkingo', 'experience', 'years', 'team', 'size', 'location', 
      'office', 'history', 'background', 'company', 'iso', 'certified', 'experts', 'professionals'
    ],
    responses: [
      "Softkingo is an ISO-certified IT solutions company with 6+ years of experience. We've successfully developed 400+ apps and served 350+ clients worldwide. We're headquartered in Noida, India, with a presence in the US, Canada, and Australia.",
      "We are a powerhouse of 40+ highly skilled professionals, including developers, designers, and product managers. Our mission is to catalyze the tech revolution across industries through innovative and scalable solutions. Want to meet our team?",
      "Founded on the values of originality and diligence, Softkingo has grown into a leading digital engineering partner. We've delivered 500+ projects across diverse sectors like Healthcare, E-commerce, and Logistics. How can our 10+ years of collective leadership experience help you?",
      "Our headquarters is located at B-148, Block B, Sector 63, Noida - 201301. We operate as an exclusive hub for the top 1% of IT talent. Would you like to know more about our core values or our visionary CEO, Paramhans Singh?",
      "Softkingo isn't just a development agency; we're a transformation partner. With a 98% client satisfaction rate and a focus on high ROI, we're here to ensure your business thrives in the digital age."
    ],
  },
  {
    category: 'Services (Softkingo Specific)',
    keywords: [
      'service', 'services', 'what do you do', 'provide', 'capabilities', 'expertise', 
      'web', 'app', 'mobile', 'ios', 'android', 'seo', 'sem', 'smo', 'ui', 'ux', 'design', 
      'figma', 'framer', 'digital marketing', 'blockchain', 'web3', 'ai', 'ml', 'development'
    ],
    responses: [
      "Softkingo offers end-to-end digital services: Mobile App Development (iOS/Android), Web Applications (Next.js/React), UI/UX Design (Figma/Framer), and Digital Marketing (SEO, SEM, SMO). Which of these are you interested in?",
      "We specialize in 'Elevated Digital Experiences'. Our expertise spans from high-performance e-commerce engines and custom ERPs to cutting-edge AI/ML integrations. Are you looking to build a new product or scale an existing one?",
      "Beyond standard development, we offer specialized tech teams for hire, Cloud migration (AWS/Vercel), and Blockchain/Web3 solutions using Solidity. Our designers focus on pixel-perfect interfaces that convert users into customers.",
      "As an ISO-certified company, we ensure top-tier quality in every line of code. Our services also include Quality Assurance, DevOps, and Product Management. Basically, we handle the entire product lifecycle from idea to launch!",
      "Our dedicated developers are experts in the MERN stack, Flutter, React Native, and Python. We also provide strategic SEO and social media optimization to make sure your brand gets the visibility it deserves. What's your primary goal?"
    ],
  },
  {
    category: 'Portfolio & Case Studies',
    keywords: [
      'portfolio', 'work', 'projects', 'examples', 'previous', 'clients', 'practivoo', 
      'moglix', 'bumpy', 'ezy dash', 'logistics', 'edu-tech', 'case study', 'industries'
    ],
    responses: [
      "We've worked on some incredible projects! For instance, we built 'Practivoo' (a smart Edu-Tech learning app), 'Moglix' (Asia's largest B2B commerce platform), and 'Ezy Dash' (a next-gen Logistics app). You can see more at /portfolio.",
      "Our portfolio spans many industries: Healthcare, Travel, Real Estate, and Startups. We recently delivered 'Bumpy', a global social networking app. Would you like to see a case study relevant to your specific industry?",
      "With 400+ apps developed, we have examples for almost every sector. From B2B procurement systems like Moglix to education platforms like Practivoo, our work speaks for itself. Check out /case-studies for deep dives into our technical approach.",
      "Softkingo has a strong track record in India and globally. We've delivered solutions in Flutter, React Native, and Next.js. For example, our work on Ezy Dash involved a robust logistics engine. What kind of project are you planning?",
      "You can explore our gallery of work at /gallery or our detailed portfolio at /portfolio. We've built everything from simple landing pages to complex enterprise platforms with millions of users. Which project of ours caught your eye?"
    ],
  },
  {
    category: 'Contact & Communication',
    keywords: [
      'contact', 'email', 'phone', 'call', 'reach', 'number', 'address', 'whatsapp', 
      'noida', 'india', 'sales@softkingo.com', 'info@softkingo.com', 'location'
    ],
    responses: [
      "You can reach us at info@softkingo.com or sales@softkingo.com. For direct calls or WhatsApp, we're available at +91 74287 50870. We're based in Sector 63, Noida!",
      "Our office is at B-148, Block B, Sector 63, Noida - 201301. We're usually responding within 2 hours! Would you like to schedule a free consultation?",
      "Feel free to drop us a line at sales@softkingo.com. If you're nearby, you're always welcome to visit our Noida headquarters. Should I have a representative contact you directly?",
      "We thrive on conversation! Call us at +91 74287 50870 or email info@softkingo.com. You can also fill out our inquiry form at /contact, and we'll get back to you within one business day.",
      "Whether you're in the US, Canada, Australia, or India, we're just an email away. Reach us at sales@softkingo.com. How would you prefer to connect—email, phone, or a video call?"
    ],
  },
  {
    category: 'Out of Domain Boundary',
    keywords: [
      'cooking', 'recipe', 'flight', 'weather', 'news', 'politics', 'sport', 'movie', 
      'joke', 'general knowledge', 'who is the president', 'hotel', 'ticket', 'booking', 
      'travel advice', 'health advice', 'medical', 'legal', 'finance'
    ],
    responses: [
      "That's an interesting topic, but I'm an expert on Softkingo's software development and IT services! While I can't help with that, I'd love to tell you how we can build your next web or mobile app. What kind of project are you planning?",
      "I wish I could help with that, but my focus is strictly on digital transformation and software engineering here at Softkingo. If you have any questions about App development or SEO, I'm your person!",
      "I'm afraid that's outside my domain of expertise. I specialize in guiding users through Softkingo's world-class tech solutions. How about we get back to talking about how we can scale your business with technology?",
      "While I'm not equipped to answer that, I can definitely tell you how Softkingo delivered 400+ successful apps! Would you like to hear about our services in AI or Mobile development instead?",
      "I'll have to pass on that one—I'm a Softkingo specialist! My goal is to help you navigate our software expertise. Do you have any questions about our Noida office or our technical capabilities?"
    ],
  },
  {
    category: 'Lead Capture & Process',
    keywords: [
      'start', 'process', 'onboarding', 'hire', 'work', 'how to', 'step', 'quote', 'next'
    ],
    responses: [
      "Starting with Softkingo is a 3-step process: 1. Tell us your vision, 2. Get a free consultation, 3. Receive a detailed proposal. Ready for step one? Drop your email here!",
      "We usually begin with a discovery call to understand your goals and obstacles. From there, we map out a roadmap and investment estimate. Would you like to book a free consultation now?",
      "Our delivery process is end-to-end, from idea to launch and ongoing support. If you share your project details, our team will get back to you within 2 hours. What's the best email to reach you at?",
      "We sign NDAs upfront and provide a clear, no-obligation proposal. To get started, just tell me a bit about your idea or your technical challenge. Or, leave your number for a quick callback!",
      "Onboarding is seamless! Once we align on the scope, you get a dedicated team of experts. Ready to elevate your digital presence? Tell me your name and email to begin."
    ],
  }
];

export const genericFallbackResponse = "I want to make sure I give you the best answer for that, as it sounds like a very specific requirement! While I'm a specialist in Softkingo's software services, I might need a bit more detail. Could you tell me more about your project? Or better yet, drop your email/phone and our senior technical consultant from our Noida office will reach out within the next hour!";
