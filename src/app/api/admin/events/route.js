import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const events = await prisma.siteEvent.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ events });
}

export async function POST(req) {
  const body = await req.json();

  if (!body.title || !body.message) {
    return NextResponse.json(
      { error: 'Title and message are required' },
      { status: 400 }
    );
  }

  const event = await prisma.siteEvent.create({
    data: {
      title: body.title,
      message: body.message,
      ctaLabel: body.ctaLabel || null,
      ctaHref: body.ctaHref || null,
      imageUrl: body.imageUrl || null,
      status: body.status || 'draft',
      startsAt: body.startsAt ? new Date(body.startsAt) : null,
      endsAt: body.endsAt ? new Date(body.endsAt) : null,
      theme: body.theme || null,
      showOnSlugs: body.showOnSlugs || null,
      triggerDelayMs: body.triggerDelayMs ?? 2000,
      triggerScrollPercent: body.triggerScrollPercent ?? 0,
      maxShowsPerUser: body.maxShowsPerUser ?? 1,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
