const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findFirst({
    where: { slug: 'solution-test-audit' }
  });

  if (!page) {
    console.error('Page not found');
    process.exit(1);
  }

  let parsed = {};
  try {
    parsed = JSON.parse(page.contentJson || '{}');
  } catch (e) {
    parsed = {};
  }

  const currentSections = Array.isArray(parsed.activeSections) ? parsed.activeSections : [];
  
  const updatedActiveSections = [
    ...currentSections,
    "cta",
    "inquiry"
  ].filter((v, i, a) => a.indexOf(v) === i); // Unique

  const updatedContent = {
    ...(parsed.content || {}),
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle: "Let's build something amazing together.",
      btnText: "Get Started Now"
    },
    inquiry: {
      tagline: "HAVE A PROJECT IN MIND?",
      title: "Let's Build Something",
      titlePrefix: "Great",
      subtitle: "Share your requirement and get a free proposal within 24 hours."
    }
  };

  const newContentJson = JSON.stringify({
    activeSections: updatedActiveSections,
    content: updatedContent
  });

  await prisma.page.update({
    where: { id: page.id },
    data: {
      contentJson: newContentJson
    }
  });

  console.log('Successfully updated solution-test-audit page contentJson');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
