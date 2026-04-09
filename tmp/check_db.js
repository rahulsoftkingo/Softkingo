const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latestConv = await prisma.chatConversation.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  console.log('Latest Conversation:', JSON.stringify(latestConv, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
