import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendWhatsAppText } from '@/lib/whatsapp';

// GET /api/admin/whatsapp/messages?conversationId=1
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = Number(searchParams.get('conversationId'));

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' },
        { status: 400 }
      );
    }

    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('WA messages GET error:', error);
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    );
  }
}

// POST /api/admin/whatsapp/messages
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      conversationId,
      content,
      sender = 'agent',
      senderName,
      type = 'text',
      fileUrl,
      fileName,
    } = body;

    if (!conversationId || !content) {
      return NextResponse.json(
        { error: 'conversationId and content are required' },
        { status: 400 }
      );
    }

    const conv = await prisma.chatConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conv || !conv.visitorPhone) {
      return NextResponse.json(
        { error: 'Conversation or visitor phone not found' },
        { status: 400 }
      );
    }

    // This is mocked if env is not configured
    await sendWhatsAppText({
      to: conv.visitorPhone,
      text: content,
    });

    const msg = await prisma.chatMessage.create({
      data: {
        conversationId,
        content,
        sender,
        senderName,
        type,
        fileUrl,
        fileName,
      },
    });

    await prisma.chatConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ message: msg }, { status: 201 });
  } catch (error) {
    console.error('WA messages POST error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
