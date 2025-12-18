import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req, ctx) {
  const { params } = ctx;
  const { id: idStr } = await params;
  const id = Number(idStr);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const event = await prisma.siteEvent.findUnique({ where: { id } });
  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(req, ctx) {
  const { params } = ctx;
  const { id: idStr } = await params;
  const id = Number(idStr);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json();

  const event = await prisma.siteEvent.update({
    where: { id },
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

  return NextResponse.json(event);
}
