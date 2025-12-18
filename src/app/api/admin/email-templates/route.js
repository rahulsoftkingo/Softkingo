import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/email-templates
export async function GET() {
  try {
    const templates = await prisma.emailTemplate.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('EmailTemplates GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load email templates' },
      { status: 500 }
    );
  }
}

// POST /api/admin/email-templates
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, subject, preview, bodyHtml, bodyText, category, status } = body;

    if (!name || !subject) {
      return NextResponse.json(
        { error: 'name and subject are required' },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const template = await prisma.emailTemplate.create({
      data: {
        name,
        slug,
        subject,
        preview: preview || '',
        bodyHtml: bodyHtml || null,
        bodyText: bodyText || '',
        category: category || null,
        status: status || 'active',
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('EmailTemplates POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create email template' },
      { status: 500 }
    );
  }
}
