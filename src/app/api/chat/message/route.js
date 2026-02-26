import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { conversationId, content, sender, type, fileUrl, fileName, senderName } = body;

    const message = await prisma.chatMessage.create({
      data: {
        conversationId,
        content,
        sender,
        senderName: senderName || null,
        type: type || 'text',
        fileUrl: fileUrl || null,
        fileName: fileName || null,
        isRead: sender === 'user',
      },
    });

    // Update conversation timestamp
    await prisma.chatConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Create message error:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}

// Mark messages as read
export async function PUT(req) {
  try {
    const body = await req.json();
    const { messageIds, conversationId } = body;

    if (messageIds && messageIds.length > 0) {
      await prisma.chatMessage.updateMany({
        where: {
          id: { in: messageIds },
        },
        data: { isRead: true },
      });
    } else if (conversationId) {
      await prisma.chatMessage.updateMany({
        where: {
          conversationId,
          sender: 'bot',
          isRead: false,
        },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark read error:', error);
    return NextResponse.json(
      { error: 'Failed to mark messages as read' },
      { status: 500 }
    );
  }
}

// Get messages for a conversation
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
    }

    const messages = await prisma.chatMessage.findMany({
      where: {
        conversationId: parseInt(conversationId),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Fetch messages error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
