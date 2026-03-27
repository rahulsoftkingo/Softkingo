const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const page = await prisma.page.findUnique({
        where: { slug: 'clone-test' }
    });
    console.log(JSON.stringify(page, null, 2));
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
