import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/whatsapp/conversations/:id
// Returns a single conversation with all messages
export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const conversation = await prisma.chatConversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error('WA conversation GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load conversation' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/whatsapp/conversations/:id
// Update conversation meta (status, priority, tags, notes)
export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { status, priority, notes, tags } = body;

    const conversation = await prisma.chatConversation.update({
      where: { id },
      data: {
        status: status || undefined,
        priority: priority || undefined,
        notes,
        tags,
        closedAt: status === 'closed' ? new Date() : undefined,
      },
    });

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error('WA conversation PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
}
