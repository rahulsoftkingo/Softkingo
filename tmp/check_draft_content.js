const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const solution = await prisma.page.findFirst({
      where: { type: 'solution' },
      select: { title: true, slug: true, contentJson: true, status: true }
    });
    
    if (solution) {
      console.log('--- Sample Solution ---');
      console.log('Title:', solution.title);
      console.log('Slug:', solution.slug);
      console.log('Status:', solution.status);
      try {
        const content = JSON.parse(solution.contentJson);
        console.log('Active Sections:', content.activeSections);
      } catch (e) {
        console.log('Content is not valid JSON');
      }
    }

    const industry = await prisma.page.findFirst({
      where: { type: 'industry' },
      select: { title: true, slug: true, contentJson: true, status: true }
    });

    if (industry) {
      console.log('\n--- Sample Industry ---');
      console.log('Title:', industry.title);
      console.log('Slug:', industry.slug);
      console.log('Status:', industry.status);
      try {
        const content = JSON.parse(industry.contentJson);
        console.log('Active Sections:', content.activeSections);
      } catch (e) {
        console.log('Content is not valid JSON');
      }
    }

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
