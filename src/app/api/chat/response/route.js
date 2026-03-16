import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getFallbackResponse } from '@/lib/chatMatcher';

// Note: In a real production app, you'd import OpenAI or Google Generative AI here.
// For now, we'll keep the AI call logic encapsulated in a try/catch.

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, conversationId } = body;

    if (!conversationId || !message) {
      return NextResponse.json({ error: 'Message and Conversation ID are required' }, { status: 400 });
    }

    // Tier 1: Manual Agent Check
    const conversation = await prisma.chatConversation.findUnique({
      where: { id: parseInt(conversationId) },
      select: { assignedToId: true, status: true }
    });

    if (conversation?.assignedToId) {
      // Chat is claimed by an admin, stop automated responses
      return NextResponse.json({ message: 'Claimed by admin' });
    }

    let response = '';

    try {
      // Tier 2: AI API Call (Simulated/Placeholder for now)
      // If OPENAI_API_KEY is missing or API fails, it will catch.
      if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
        throw new Error('No AI API Key configured');
      }

      // TODO: Actual AI implementation goes here
      // For testing fallback, this block should fail if keys are invalid.
      throw new Error('Simulating AI failure for fallback verification');
      
    } catch (aiError) {
      console.error("AI API failed or skipped, using static fallback:", aiError.message);
      
      // Tier 3: Static Fallback (Script/Pattern Matching)
      response = getFallbackResponse(message);
    }

    // Save bot response to database
    const savedMessage = await prisma.chatMessage.create({
      data: {
        conversationId: parseInt(conversationId),
        content: response,
        sender: 'bot',
        type: 'text',
        isRead: false,
      },
    });

    return NextResponse.json({ response, message: savedMessage });
  } catch (error) {
    console.error('Chat response error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
