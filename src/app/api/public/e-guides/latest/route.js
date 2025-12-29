// src/app/api/public/e-guides/latest/route.js
import prisma from "@/lib/prisma";

export async function GET() {
  const latest = await prisma.eGuide.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { slug: true, title: true, coverImage: true, readTimeText: true, status: true, publishedAt: true },
  });

  return Response.json({ latest: latest || null });
}
