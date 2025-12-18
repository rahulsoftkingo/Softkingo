import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/whatsapp/message-templates
// Returns all active WhatsApp templates
export async function GET() {
  try {
    const templates = await prisma.whatsappTemplate.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('WA templates GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load templates' },
      { status: 500 }
    );
  }
}

// POST /api/admin/whatsapp/message-templates
// Creates a new WhatsApp template
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, category, body: templateBody, language, status } = body;

    if (!name || !templateBody) {
      return NextResponse.json(
        { error: 'name and body are required' },
        { status: 400 }
      );
    }

    const template = await prisma.whatsappTemplate.create({
      data: {
        name,
        category,
        body: templateBody,
        language: language || 'en',
        status: status || 'active',
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('WA templates POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
