const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slug = 'industry-test';
  
  const content = {
    activeSections: [
      "hero", "challenges", "covers", "technologies", "portfolio", 
      "otherIndustries", "whyChoose", "process", "faq", "testimonials", 
      "blogs", "inquiry", "consultation"
    ],
    content: {
      hero: {
        title: "Test Industry Hero",
        gradientText: "Dynamic",
        description: "This is a <b>rich text</b> description for the industry hero section.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
      },
      challenges: {
        title: "Industry Challenges",
        gradientText: "Solutions",
        subtitle: "Solving the most complex <i>test hurdles</i> in this sector.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        stats: [
          { value: "99%", label: "Test Success" },
          { value: "24/7", label: "Test Support" },
          { value: "500+", label: "Test Clients" }
        ],
        items: [
          { title: "Challenge Point 1" },
          { title: "Challenge Point 2" }
        ]
      },
      covers: {
        title: "Test Service Areas",
        gradientText: "Coverage",
        subtitle: "Comprehensive list of dynamic <b>service areas</b>.",
        items: [
          { 
            title: "Test Service 1", 
            description: "Detailed description for service 1.", 
            icon: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png" 
          },
          { 
            title: "Test Service 2", 
            description: "Detailed description for service 2.", 
            icon: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png" 
          }
        ]
      },
      technologies: {
        title: "Test Tech Stack",
        gradientText: "Tools",
        subtitle: "Using the latest <i>dynamic technologies</i>.",
        items: [
          { name: "React", image: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png" },
          { name: "Next.js", image: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png" }
        ]
      },
      portfolio: {
        title: "Test Portfolio",
        gradientText: "Showcase",
        subtitle: "Explore our latest test projects.",
        category: "App Development"
      },
      otherIndustries: {
        title: "Other Sectors",
        gradientText: "Markets",
        subtitle: "Serving diverse <b>global markets</b>.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        items: [
          { title: "Fintech", icon: "💰" },
          { title: "Healthcare", icon: "🏥" },
          { title: "E-commerce", icon: "🛒" },
          { title: "Logistics", icon: "🚚" },
          { title: "Education", icon: "🎓" },
          { title: "Real Estate", icon: "🏠" }
        ]
      },
      whyChoose: {
        title: "Why Choose Test",
        gradientText: "Value",
        subtitle: "Delivering value through <i>technical excellence</i>.",
        items: [
          { title: "Expert Team", description: "Our team is expert." },
          { title: "Fast Delivery", description: "We deliver fast." }
        ]
      },
      process: {
        title: "Test Process",
        gradientText: "Workflow",
        subtitle: "Our systematic <b>test workflow</b>.",
        steps: [
          { title: "Planning", description: "First we plan." },
          { title: "Coding", description: "Then we code." }
        ]
      },
      faq: {
        title: "Test FAQs",
        gradientText: "Answers",
        subtitle: "Frequently asked <i>test questions</i>.",
        items: [
          { q: "Is this dynamic?", a: "Yes, <b>totally dynamic</b>." }
        ]
      },
      testimonials: {
        title: "Test Reviews",
        gradientText: "Client Voice",
        subtitle: "What our <b>test users</b> say.",
        items: [
          { name: "John Doe", role: "CEO, TestCorp", feedback: "Amazing work!", image: "https://randomuser.me/api/portraits/men/1.jpg" }
        ]
      },
      blogTitle: "Test Insights",
      blogGradientText: "Blog",
      blogSubtitle: "Latest dynamic <i>insights</i>.",
      blogCategory: "",
      inquiry: {
        tagline: "GET IN TOUCH",
        titlePrefix: "Let's ",
        title: "Connect",
        subtitle: "Reach out to us from anywhere in the world. We're here to turn your ideas into reality."
      },
      consultation: {
        title: "Test CTA",
        gradientText: "Contact",
        subtitle: "Ready for a <b>test consult</b>?",
        buttonLabel: "Free Call",
        href: "/contact"
      }
    }
  };

  const page = await prisma.page.upsert({
    where: { slug },
    update: {
      contentJson: JSON.stringify(content),
      title: "Industry Test Page",
      key: slug,
      type: "industry"
    },
    create: {
      slug,
      title: "Industry Test Page",
      contentJson: JSON.stringify(content),
      key: slug,
      type: "industry"
    },
  });

  console.log(`Page ${page.slug} seeded successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
