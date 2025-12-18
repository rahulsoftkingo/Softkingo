import { NextResponse } from 'next/server';

// In-memory store for typing indicators (use Redis in production)
const typingStatus = new Map();

export async function POST(req) {
  try {
    const body = await req.json();
    const { conversationId, isTyping } = body;

    if (isTyping) {
      typingStatus.set(conversationId, {
        isTyping: true,
        timestamp: Date.now(),
      });
    } else {
      typingStatus.delete(conversationId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Typing indicator error:', error);
    return NextResponse.json(
      { error: 'Failed to update typing status' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = parseInt(searchParams.get('conversationId'));

    const status = typingStatus.get(conversationId);
    
    // Clear old typing status (> 5 seconds)
    if (status && Date.now() - status.timestamp > 5000) {
      typingStatus.delete(conversationId);
      return NextResponse.json({ isTyping: false });
    }

    return NextResponse.json({ isTyping: status?.isTyping || false });
  } catch (error) {
    console.error('Get typing status error:', error);
    return NextResponse.json({ isTyping: false });
  }
}
