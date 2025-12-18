import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || '/';
  const now = new Date();

  const event = await prisma.siteEvent.findFirst({
    where: {
      status: 'active',
      OR: [{ startsAt: null }, { startsAt: { lte: now } }],
      AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
      OR: [
        { showOnSlugs: null },
        { showOnSlugs: '' },
        { showOnSlugs: { contains: slug } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ event });
}
