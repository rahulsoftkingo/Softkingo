import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const pageId = Number(id);

    const page = await prisma.page.findUnique({
      where: { id: pageId },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Admin page GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const pageId = Number(id);
    const body = await request.json();

    const {
      title,
      slug,
      key,
      excerpt,
      status,
      type,
      featured,
      seoTitle,
      seoDescription,
      seoImage,
      contentJson,
    } = body;

    const page = await prisma.page.update({
      where: { id: pageId },
      data: {
        title,
        slug,
        key,
        excerpt,
        status,
        type,
        featured,
        seoTitle,
        seoDescription,
        seoImage,
        contentJson,
      },
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Admin page PUT error:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const pageId = Number(id);

    await prisma.page.delete({
      where: { id: pageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin page DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
