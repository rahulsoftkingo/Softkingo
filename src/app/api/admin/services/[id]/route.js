import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const service = await prisma.page.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Get service error:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Generate key from slug if not provided
    const key = body.key || body.slug;

    const service = await prisma.page.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        slug: body.slug,
        key: key,
        excerpt: body.excerpt || null,
        // Remove content field
        contentJson: body.contentJson,
        status: body.status,
        featured: body.featured || false,
        seoTitle: body.seoTitle || body.title,
        seoDescription: body.seoDescription || null,
        seoImage: body.seoImage || null,
      },
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json({ 
      error: 'Failed to update service',
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.page.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete service',
      details: error.message 
    }, { status: 500 });
  }
}
