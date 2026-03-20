const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const allPages = await prisma.page.groupBy({
      by: ['type', 'status'],
      _count: { _all: true }
    });
    console.log('--- Page Type/Status Groups ---');
    console.log(allPages);

    const contentItems = await prisma.contentItem.groupBy({
      by: ['type', 'status'],
      _count: { _all: true }
    });
    console.log('\n--- ContentItem Type/Status Groups ---');
    console.log(contentItems);

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
