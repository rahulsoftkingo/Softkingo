
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const slugs = ['automotive-app-development', 'dating-app-development'];
    for (const slug of slugs) {
        const page = await prisma.page.findUnique({ where: { slug } });
        console.log(`--- Slug: ${slug} ---`);
        if (page) {
            const content = JSON.parse(page.contentJson);
            console.log('Type:', page.type);
            console.log('TechStack:', JSON.stringify(content.content?.techStack, null, 2));
            console.log('Active Sections:', content.activeSections);
        } else {
            console.log('Page not found');
        }
    }
    await prisma.$disconnect();
}

check();
