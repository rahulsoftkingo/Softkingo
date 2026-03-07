const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const caseStudies = await prisma.caseStudy.findMany({
        select: { slug: true, title: true }
    });
    console.log('Case Studies:', JSON.stringify(caseStudies, null, 2));

    const projects = await prisma.portfolioProject.findMany({
        where: {
            OR: [
                { title: { contains: 'Preethvo' } },
                { title: { contains: 'Moglix' } },
                { title: { contains: 'Bumpy' } },
                { title: { contains: 'LogiNext' } },
                { title: { contains: 'Ezy' } }
            ]
        }
    });
    console.log('Projects:', JSON.stringify(projects, null, 2));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(() => prisma.$disconnect());
