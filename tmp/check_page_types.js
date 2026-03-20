const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const types = ['solution', 'industry', 'clone', 'service', 'hire'];
    for (const type of types) {
      const count = await prisma.page.count({ where: { type: type, status: "published" } });
      console.log(`Type: ${type}, Published Count: ${count}`);
    }

    const unmapped = await prisma.page.findMany({
      where: { 
        NOT: { type: { in: types } },
        status: "published"
      },
      select: { type: true, slug: true }
    });
    console.log('\n--- Unmapped Types ---');
    unmapped.forEach(p => console.log(`Type: ${p.type}, Slug: ${p.slug}`));

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
