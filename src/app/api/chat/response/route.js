import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Smart pattern-based responses
const responsePatterns = [
  {
    keywords: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening'],
    responses: [
      'Hello! 👋 Welcome to our support. How can I assist you today?',
      'Hi there! 😊 I\'m here to help. What can I do for you?',
      'Hey! Great to hear from you! How may I help?',
    ],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'rate', 'how much', 'charges', 'budget'],
    responses: [
      'Our pricing varies based on your specific requirements. Would you like to schedule a consultation to discuss your project in detail? 💰',
      'We offer competitive pricing tailored to each project. Can you tell me more about what you\'re looking for?',
    ],
  },
  {
    keywords: ['service', 'services', 'what do you do', 'offerings', 'provide'],
    responses: [
      'We offer:\n🌐 Web Development\n📱 Mobile App Development\n🎨 UI/UX Design\n📊 Digital Marketing\n☁️ Cloud Solutions\n\nWhich one interests you?',
      'Our main services include web development, mobile apps, UI/UX design, and digital marketing. What are you looking for?',
    ],
  },
  {
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'get in touch'],
    responses: [
      'You can reach us at:\n📧 Email: info@example.com\n📞 Phone: +91 1234567890\n💬 WhatsApp: +91 1234567890\n\nOr continue chatting here!',
    ],
  },
  {
    keywords: ['hours', 'timing', 'available', 'open', 'when', 'schedule'],
    responses: [
      'We\'re available Monday to Friday, 9 AM to 6 PM IST. For urgent matters, feel free to leave a message and we\'ll get back to you ASAP! ⏰',
    ],
  },
  {
    keywords: ['portfolio', 'work', 'projects', 'case study', 'examples', 'previous'],
    responses: [
      'Check out our portfolio at /portfolio to see our latest projects and success stories! We\'ve worked on 100+ projects across various industries. 💼',
    ],
  },
  {
    keywords: ['quote', 'estimate', 'proposal', 'requirement'],
    responses: [
      'I\'d love to help you get a quote! Could you share:\n1. Project type (web/app/design)\n2. Key features needed\n3. Timeline\n4. Budget range',
      'Great! Let\'s get you a custom quote. Please visit /contact or tell me more about your project requirements.',
    ],
  },
  {
    keywords: ['mobile app', 'android', 'ios', 'react native', 'flutter'],
    responses: [
      'We specialize in mobile app development! We build native Android, iOS apps, and cross-platform solutions using React Native and Flutter. What kind of app are you planning? 📱',
    ],
  },
  {
    keywords: ['website', 'web development', 'web app', 'next.js', 'react'],
    responses: [
      'We create modern, responsive websites and web applications using cutting-edge technologies like Next.js, React, and Node.js. What\'s your vision? 🌐',
    ],
  },
  {
    keywords: ['design', 'ui', 'ux', 'figma', 'prototype'],
    responses: [
      'Our design team creates stunning UI/UX designs in Figma with interactive prototypes. We focus on user-centric design that converts! 🎨',
    ],
  },
  {
    keywords: ['deadline', 'timeline', 'how long', 'duration', 'time'],
    responses: [
      'Project timelines vary based on complexity:\n📱 Simple apps: 4-6 weeks\n🌐 Websites: 2-4 weeks\n🏢 Complex platforms: 8-12 weeks\n\nWhat are you working on?',
    ],
  },
  {
    keywords: ['payment', 'pay', 'invoice', 'transaction'],
    responses: [
      'We accept multiple payment methods including bank transfer, UPI, credit cards, and international payments via PayPal/Stripe. Payment terms are typically 30-70 or milestone-based. 💳',
    ],
  },
  {
    keywords: ['support', 'maintenance', 'help', 'issue', 'problem', 'bug'],
    responses: [
      'We provide comprehensive post-launch support and maintenance. Our team is here to help with any issues or updates you need! 🛠️',
    ],
  },
  {
    keywords: ['team', 'who are you', 'about', 'company'],
    responses: [
      'We\'re a team of passionate developers, designers, and digital marketers dedicated to building amazing digital products. Check out /about to meet our team! 👥',
    ],
  },
  {
    keywords: ['technology', 'tech stack', 'tools', 'framework'],
    responses: [
      'We work with modern technologies:\n⚛️ React, Next.js, Vue\n📱 React Native, Flutter\n⚙️ Node.js, Python, PHP\n💾 MongoDB, PostgreSQL, MySQL\n☁️ AWS, Azure, Vercel\n\nWhat tech are you interested in?',
    ],
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    responses: [
      'You\'re welcome! 😊 Is there anything else I can help you with?',
      'Happy to help! Let me know if you have any other questions.',
    ],
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    responses: [
      'Goodbye! Feel free to come back anytime. Have a great day! 👋',
      'See you later! Don\'t hesitate to reach out if you need anything. Bye! 😊',
    ],
  },
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
