import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/whatsapp/contacts?search=...
// Returns list of contacts (from Lead table) with phone numbers
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const where = {
      phone: { not: null },
    };

    if (search) {
      // Basic OR search on name, email, phone
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Normalize to contact object
    const contacts = leads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.phone,
      status: l.status,
      tags: l.tags,
      createdAt: l.createdAt,
    }));

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('WA contacts GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load contacts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/whatsapp/contacts
// Creates a new Lead as WhatsApp contact
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, whatsapp, source, tags } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'phone is required' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name || 'WhatsApp Contact',
        email: email || '',
        phone,
        whatsapp: whatsapp || phone,
        source: source || 'whatsapp-admin',
        status: 'new',
        tags,
      },
    });

    return NextResponse.json({ contact: lead }, { status: 201 });
  } catch (error) {
    console.error('WA contacts POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
