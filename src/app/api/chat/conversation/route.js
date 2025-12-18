import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Create new conversation
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Generate unique visitor ID
    const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const conversation = await prisma.chatConversation.create({
      data: {
        visitorId,
        visitorName: name,
        visitorEmail: email,
        visitorPhone: phone || null,
        status: 'active',
        priority: 'normal',
      },
    });

    return NextResponse.json({
      conversationId: conversation.id,
      visitorId: conversation.visitorId,
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

// Update conversation (close, transfer, etc.)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { conversationId, status, assignedToId, rating, feedback, notes } = body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedToId !== undefined) updateData.assignedToId = assignedToId;
    if (rating) updateData.rating = rating;
    if (feedback) updateData.feedback = feedback;
    if (notes) updateData.notes = notes;
    if (status === 'closed') updateData.closedAt = new Date();

    const conversation = await prisma.chatConversation.update({
      where: { id: conversationId },
      data: updateData,
    });

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error('Update conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
}

// Get conversation details
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = parseInt(searchParams.get('id'));

    const conversation = await prisma.chatConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
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
    console.error('Get conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}
