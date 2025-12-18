import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/media?type=image|video|all&tag=gallery-office|...
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const tag = searchParams.get('tag');

  const where = {};
  if (type && type !== 'all') {
    where.type = type;
  }
  if (tag && tag !== 'all') {
    where.tags = { contains: tag };
  }

  const items = await prisma.mediaItem.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ items });
}

// POST /api/admin/media
export async function POST(req) {
  const body = await req.json();

  if (!body.filePath) {
    return NextResponse.json(
      { error: 'filePath is required' },
      { status: 400 }
    );
  }

  const item = await prisma.mediaItem.create({
    data: {
      title: body.title || null,
      filePath: body.filePath,
      thumbnail: body.thumbnail || null,
      type: body.type || 'image',
      category: body.category || null,
      tags: body.tags || null,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
