import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Cache for storing conversation data to reduce database hits
const conversationCache = new Map();
const CACHE_TTL = 30000; // 30 seconds

// Create new conversation
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Check if an active conversation already exists for this email
    const existingActive = await prisma.chatConversation.findFirst({
      where: {
        visitorEmail: email,
        status: 'active'
      },
      orderBy: { createdAt: 'desc' }
    });

    if (existingActive) {
      return NextResponse.json({
        conversationId: existingActive.id,
        visitorId: existingActive.visitorId,
        resumed: true
      });
    }

    // Generate unique visitor ID
    const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const conversation = await prisma.chatConversation.create({
      data: {
        visitorId,
        visitorName: name || 'Guest',
        visitorEmail: email || 'guest@example.com',
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
    const { conversationId, status, assignedToId, rating, feedback, notes, name, email, phone } = body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedToId !== undefined) updateData.assignedToId = assignedToId;
    if (rating) updateData.rating = rating;
    if (feedback) updateData.feedback = feedback;
    if (notes) updateData.notes = notes;
    if (name) updateData.visitorName = name;
    if (email) updateData.visitorEmail = email;
    if (phone) updateData.visitorPhone = phone;
    if (status === 'closed') updateData.closedAt = new Date();

    const conversation = await prisma.chatConversation.update({
      where: { id: conversationId },
      data: updateData,
    });

    // Clear cache
    const cacheKey = `conversation_${conversationId}`;
    conversationCache.delete(cacheKey);

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

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `conversation_${conversationId}`;
    const cached = conversationCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

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

    const response = { conversation };

    // Cache the response
    conversationCache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}
