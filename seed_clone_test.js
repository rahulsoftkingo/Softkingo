const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testData = {
    activeSections: [
        "hero", "about", "verticalSuite", "aiFeatures", "aiSolutions", 
        "investment", "revenue", "techStack", "portfolio", "process", 
        "industries", "popularSolutions", "comparison", "consultation", 
        "faq", "blogs"
    ],
    content: {
        hero: {
            title: "Test Hero: Premium Clone App Script",
            subtitle: "<p>Test Hero Subtitle showing <strong>dynamic rich text</strong> content for the solution page.</p>",
            buttonLabel: "Test Request Quote",
            buttonHref: "/contact",
            image: "/images/solutions/tablet-mockup.png",
            sliderImages: [
                "/images/solutions/food-delivery-mockup.png",
                "/images/solutions/tablet-mockup.png"
            ],
            brands: [
                "/images/logo.png",
                "/images/logo.png"
            ]
        },
        about: {
            title: "Test About: Why Choose Our Test Clone?",
            description: "Test About Description providing detailed insights into our comprehensive clone script development services.",
            stats: [
                { number: "100+ Test", label: "Projects Done" },
                { number: "50+ Test", label: "Expert Developers" },
                { number: "24/7 Test", label: "Support" },
                { number: "5+ Test", label: "Years Exp" }
            ],
            reasons: [
                { title: "Test Reason 1", description: "Detailed test description for reason 1 regarding our clone excellence." },
                { title: "Test Reason 2", description: "Detailed test description for reason 2 regarding our clone excellence." },
                { title: "Test Reason 3", description: "Detailed test description for reason 3 regarding our clone excellence." }
            ],
            buttonLabel: "Test Discuss Project",
            buttonHref: "/contact"
        },
        verticalSuite: {
            title: "Test Tech Suite for Your Idea",
            subtitle: "Test Subtitle for the tech suite section showing multi-panel capabilities.",
            tabs: [
                {
                    label: "Test User Panel",
                    description: "Test User Panel Description for the clone app.",
                    image: "/images/solutions/tablet-mockup.png",
                    items: [
                        { title: "Test Login", description: "Test description for login feature." },
                        { title: "Test Search", description: "Test description for search feature." }
                    ]
                },
                {
                    label: "Test Admin Panel",
                    description: "Test Admin Panel Description for the clone app.",
                    image: "/images/solutions/tablet-mockup.png",
                    items: [
                        { title: "Test Dashboard", description: "Test description for dashboard." },
                        { title: "Test Analytics", description: "Test description for analytics." }
                    ]
                }
            ]
        },
        aiFeatures: {
            title: "Test AI-Powered Advanced Features",
            subtitle: "Test Subtitle for AI features integration.",
            items: [
                { title: "Test AI Analytics", description: "Test description for AI-driven business intelligence." },
                { title: "Test AI Matching", description: "Test description for smart matching algorithms." }
            ]
        },
        aiSolutions: {
            title: "Test AI Multi-Platform Solutions",
            subtitle: "Test Subtitle for across-the-board AI solutions.",
            items: [
                { title: "Test Mobile AI", description: "Test description for AI in mobile apps." },
                { title: "Test Web AI", description: "Test description for AI in web platforms." }
            ]
        },
        investment: {
            subtitle: "Test Subtitle for why investment in our clone script pays off.",
            items: [
                { number: "150% Test", label: "ROI Potential", sublabel: "Test sublabel for ROI." },
                { number: "2x Test", label: "Market Growth", sublabel: "Test sublabel for growth." },
                { number: "50k+ Test", label: "Users Ready", sublabel: "Test sublabel for users." }
            ]
        },
        revenue: {
            title: "Test Revenue Model",
            highlight: "Maximize Test Profits",
            rightDesc: "Test Right Side Description explaining how to monetize your cloned application effectively.",
            tabs: [
                {
                    label: "Test Commission",
                    title: "Test Commission System",
                    description: "Test description for commission-based revenue.",
                    bullets: ["Test Point 1", "Test Point 2", "Test Point 3"],
                    image: "/images/solutions/tablet-mockup.png"
                }
            ]
        },
        techStack: {
            title: "Test Robust Technology Stack",
            highlight: "Scalable Test Backend",
            subtitle: "Test Subtitle for the modern tech stack used in our clone scripts.",
            tabs: [
                {
                    label: "Test Frontend",
                    items: [
                        { name: "Test React", image: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
                        { name: "Test Next.js", image: "https://cdn.worldvectorlogo.com/logos/next-js.svg" }
                    ]
                }
            ]
        },
        portfolio: {
            title: "Test Portfolio Showcase",
            subtitle: "Test Subtitle for our successful clone app deployments.",
            category: "dating"
        },
        process: {
            title: "Test Development Roadmap",
            subtitle: "Test Subtitle for our systematic development process.",
            items: [
                { title: "Test Discovery", description: "Test description for discovery phase.", icon: "/images/icons/check.png" },
                { title: "Test Deployment", description: "Test description for deployment phase.", icon: "/images/icons/check.png" }
            ]
        },
        industries: {
            title: "Test Industries We Serve",
            subtitle: "Test Subtitle for our vertical-specific clone adaptations.",
            items: [
                { 
                    slug: "healthcare", 
                    title: "Test Healthcare Adaptation", 
                    description: "Test description for healthcare clone solution.",
                    buttonLabel: "Test View Case Study",
                    points: ["Test Point A", "Test Point B"]
                }
            ]
        },
        popularSolutions: {
            title: "Test Similar Popular Clone Apps",
            subtitle: "Test Subtitle for other trending app solutions.",
            items: [
                { title: "Test App 1", image: "/images/solutions/food-delivery-mockup.png" },
                { title: "Test App 2", image: "/images/solutions/food-delivery-mockup.png" }
            ]
        },
        comparison: {
            title: "Test Feature Comparison",
            subtitle: "Test Subtitle comparing our script with alternatives.",
            rows: [
                { feature: "Test Features", iconKey: "CheckCircle2", sk: "Test 100%", comp1: "Test 20%", comp2: "Test 30%" }
            ]
        },
        consultation: {
            title: "Test Book Your Free Consultation",
            subtitle: "<p>Test Subtitle for booking a <strong>free demo</strong> call today.</p>",
            buttonLabel: "Test Book Demo Now",
            imageSrc: "/images/cta/cta-img.png"
        },
        faq: {
            title: "Test FAQ Section",
            subtitle: "Test Subtitle for frequently asked questions about the clone script.",
            ctaTitle: "Test Still Have Questions?",
            ctaSubtitle: "Test Subtitle for FAQ bottom CTA.",
            ctaBtn1: "Test Contact Us",
            ctaBtn2: "Test Schedule Call",
            items: [
                { q: "Test Question 1?", a: "<p>Test <strong>Answer 1</strong> with rich text inclusion.</p>" },
                { q: "Test Question 2?", a: "<p>Test <strong>Answer 2</strong> with rich text inclusion.</p>" }
            ]
        },
        blogTitle: "Test Latest Insights from Our Blog",
        blogSubtitle: "Test Subtitle for our expert blog section.",
        blogCategory: "app-development"
    }
};

async function main() {
    const updated = await prisma.page.update({
        where: { slug: 'clone-test' },
        data: {
            contentJson: JSON.stringify(testData),
            seoTitle: "Test SEO Title for Clone",
            seoDescription: "Test SEO Description for Clone Page verification."
        }
    });
    console.log("SUCCESS: Test data seeded for 'clone-test' page.");
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
