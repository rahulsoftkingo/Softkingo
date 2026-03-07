
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    const slug = 'dating-app-development';
    const page = await prisma.page.findUnique({ where: { slug } });

    if (page) {
        let contentJson = JSON.parse(page.contentJson);

        // Expected structure for SolutionsTechStack: { tabs: [ { label, items: [] } ] }
        // Current structure in dating-app-development: { items: [] }

        contentJson.content.techStack = {
            title: "Technology Stack We Use",
            subtitle: "The modern tools and frameworks power our solutions.",
            tabs: [
                {
                    label: "Mobile",
                    items: [
                        { name: "React Native", image: "https://cdn.worldvectorlogo.com/logos/react-1.svg" },
                        { name: "Flutter", image: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" },
                        { name: "Swift", image: "https://www.vectorlogo.zone/logos/apple_swift/apple_swift-icon.svg" },
                        { name: "Kotlin", image: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg" }
                    ]
                },
                {
                    label: "Backend",
                    items: [
                        { name: "Node.js", image: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" },
                        { name: "Python", image: "https://www.vectorlogo.zone/logos/python/python-icon.svg" },
                        { name: "MongoDB", image: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
                        { name: "PostgreSQL", image: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" }
                    ]
                }
            ]
        };

        await prisma.page.update({
            where: { id: page.id },
            data: {
                contentJson: JSON.stringify(contentJson)
            }
        });
        console.log(`Updated techStack for ${slug}`);
    } else {
        console.log(`Page ${slug} not found`);
    }

    await prisma.$disconnect();
}

fix();
