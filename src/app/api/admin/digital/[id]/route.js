import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const digital = await prisma.page.findFirst({
      where: {
        id: parseInt(id),
        type: 'digital',
      },
      include: {
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    });

    if (!digital) {
      return NextResponse.json(
        { error: 'Digital not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ digital });
  } catch (error) {
    console.error('Get digital error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch digital' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      status,
      featured,
      seoTitle,
      seoDescription,
      seoImage,
      activeSections,
      content,
    } = body;

    const key = body.key || slug;

    const existingDigital = await prisma.page.findFirst({
      where: {
        id: parseInt(id),
        type: 'digital',
      },
    });

    if (!existingDigital) {
      return NextResponse.json(
        { error: 'Digital not found' },
        { status: 404 }
      );
    }

    const contentDataString = JSON.stringify({
      activeSections: activeSections || [],
      content: content || {},
    });

    const digital = await prisma.page.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        slug,
        key,
        excerpt: excerpt || null,
        contentJson: contentDataString,
        status: status || 'draft',
        featured: featured || false,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || null,
        seoImage: seoImage || null,
      },
    });

    return NextResponse.json({ digital });
  } catch (error) {
    console.error('Update digital error:', error);

    return NextResponse.json(
      {
        error: 'Failed to update digital',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const existingDigital = await prisma.page.findFirst({
      where: {
        id: parseInt(id),
        type: 'digital',
      },
    });

    if (!existingDigital) {
      return NextResponse.json(
        { error: 'Digital not found' },
        { status: 404 }
      );
    }

    await prisma.page.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete digital error:', error);

    return NextResponse.json(
      {
        error: 'Failed to delete digital',
        details: error.message,
      },
      { status: 500 }
    );
  }
}