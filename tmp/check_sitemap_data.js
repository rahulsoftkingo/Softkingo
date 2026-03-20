const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const counts = await Promise.all([
      prisma.blogPost.count({ where: { status: "published" } }),
      prisma.blogCategory.count(),
      prisma.caseStudy.count(),
      prisma.ebook.count({ where: { status: "published" } }),
      prisma.page.count({ where: { status: "published" } })
    ]);

    console.log('--- Database Counts ---');
    console.log('Blog Posts (published):', counts[0]);
    console.log('Blog Categories:', counts[1]);
    console.log('Case Studies:', counts[2]);
    console.log('Ebooks (published):', counts[3]);
    console.log('Pages (published):', counts[4]);

    const pages = await prisma.page.findMany({
      where: { status: "published" },
      select: { type: true, slug: true }
    });

    console.log('\n--- Page Types & Slugs ---');
    pages.forEach(p => console.log(`Type: ${p.type}, Slug: ${p.slug}`));

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
