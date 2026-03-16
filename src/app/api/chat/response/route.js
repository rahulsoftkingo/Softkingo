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
      // Tier 2: AI API Call
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is missing');
      }

      // We'll primarily use the Socket logic for real-time, 
      // but this API route should also be functional.
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const result = await model.generateContent(message);
      response = result.response.text();
      
    } catch (aiError) {
      console.error("AI API failed, using static fallback:", aiError.message);
      
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
