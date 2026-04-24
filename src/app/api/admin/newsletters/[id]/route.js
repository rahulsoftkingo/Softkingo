import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/newsletters/[id]
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const list = await prisma.newsletterList.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { subscribers: true, campaigns: true }
        }
      }
    });

    if (!list) return NextResponse.json({ error: 'List not found' }, { status: 404 });

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch list' }, { status: 500 });
  }
}

// PUT /api/admin/newsletters/[id]
export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { name, slug, description } = body;

    const list = await prisma.newsletterList.update({
      where: { id: parseInt(id) },
      data: { name, slug, description }
    });

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update list' }, { status: 500 });
  }
}

// DELETE /api/admin/newsletters/[id]
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await prisma.newsletterList.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete list' }, { status: 500 });
  }
}
