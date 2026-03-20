const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const blogPosts = await prisma.blogPost.groupBy({
      by: ['status'],
      _count: { _all: true }
    });
    console.log('--- BlogPost Status Groups ---');
    console.log(blogPosts);

    const ebooks = await prisma.ebook.groupBy({
      by: ['status'],
      _count: { _all: true }
    });
    console.log('\n--- Ebook Status Groups ---');
    console.log(ebooks);

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
