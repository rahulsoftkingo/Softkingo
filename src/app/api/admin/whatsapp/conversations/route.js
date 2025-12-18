import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


// GET /api/admin/whatsapp/conversations?status=active|closed|all
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'active';

    const where = {};
    if (status !== 'all') {
      where.status = status; // uses ChatConversation.status
    }

    const conversations = await prisma.chatConversation.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // last message preview
        },
      },
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('WA conversations GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load WhatsApp conversations' },
      { status: 500 }
    );
  }
}


// POST /api/admin/whatsapp/conversations
// Creates a new WhatsApp conversation (e.g. when sending first message to a new client)
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      visitorId,
      visitorName,
      visitorEmail,
      visitorPhone,
      tags,
      notes,
      priority,
    } = body;

    // Either visitorId or phone number must be present
    if (!visitorId && !visitorPhone) {
      return NextResponse.json(
        { error: 'visitorId or visitorPhone is required' },
        { status: 400 }
      );
    }

    const conv = await prisma.chatConversation.create({
      data: {
        visitorId: visitorId || visitorPhone,
        visitorName,
        visitorEmail,
        visitorPhone,
        status: 'active', // default active chat
        priority: priority || 'normal',
        tags,
        notes,
      },
    });

    return NextResponse.json({ conversation: conv }, { status: 201 });
  } catch (error) {
    console.error('WA conversations POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create WhatsApp conversation' },
      { status: 500 }
    );
  }
}
