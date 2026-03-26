const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const solutions = await prisma.solution.findMany();
    console.log(JSON.stringify(solutions, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
