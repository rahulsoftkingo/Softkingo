import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/media/:id
export async function GET(req, ctx) {
  const { params } = ctx;
  const unwrapped = await params; // Next 15: params is a Promise
  const id = Number(unwrapped.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const item = await prisma.mediaItem.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}

// PUT /api/admin/media/:id
export async function PUT(req, ctx) {
  const { params } = ctx;
  const unwrapped = await params;
  const id = Number(unwrapped.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json();

  const item = await prisma.mediaItem.update({
    where: { id },
    data: {
      title: body.title || null,
      filePath: body.filePath,
      thumbnail: body.thumbnail || null,
      type: body.type || 'image',
      category: body.category || null,
      tags: body.tags || null,
    },
  });

  return NextResponse.json(item);
}

// DELETE /api/admin/media/:id
export async function DELETE(req, ctx) {
  const { params } = ctx;
  const unwrapped = await params;
  const id = Number(unwrapped.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  await prisma.mediaItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
