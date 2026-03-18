const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    console.log("--- Top 10 by id DESC ---");
    const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        orderBy: { id: 'desc' },
        take: 10,
        select: { id: true, title: true, createdAt: true, publishedAt: true, updatedAt: true }
    });
    console.log(JSON.stringify(posts, null, 2));
}

check().finally(() => prisma.$disconnect());
