import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendWhatsAppText, renderTemplateBody } from '@/lib/whatsapp';

/**
 * POST /api/admin/whatsapp/message-templates/send
 *
 * Body JSON:
 * {
 *   "templateId": 1,        // required (WhatsappTemplate id)
 *   "leadId": 10,           // optional (Lead id) OR
 *   "phone": "+9198...",    // optional direct phone, EITHER leadId or phone required
 *   "variables": {          // optional variables to replace in template body
 *     "name": "Ravi",
 *     "orderId": "ORD-123"
 *   }
 * }
 *
 * Behavior:
 * - Load template from WhatsappTemplate
 * - Resolve recipient phone via leadId or phone
 * - Render template body with {vars}
 * - Send WhatsApp text (mock if env missing)
 * - Ensure ChatConversation exists
 * - Store ChatMessage as agent message
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { templateId, leadId, phone, variables } = body;

    // 1) Validate templateId
    if (!templateId) {
      return NextResponse.json(
        { error: 'templateId is required' },
        { status: 400 }
      );
    }

    // 2) Load template
    const template = await prisma.whatsappTemplate.findUnique({
      where: { id: Number(templateId) },
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // 3) Resolve recipient: either from Lead or direct phone
    let targetPhone = phone || null;
    let targetName = '';

    if (leadId) {
      const lead = await prisma.lead.findUnique({
        where: { id: Number(leadId) },
      });

      if (!lead || !lead.phone) {
        return NextResponse.json(
          { error: 'Lead or phone not found' },
          { status: 400 }
        );
      }

      targetPhone = lead.phone;
      targetName = lead.name || '';
    }

    if (!targetPhone) {
      return NextResponse.json(
        { error: 'phone or leadId is required' },
        { status: 400 }
      );
    }

    // 4) Render final text using variables
    const mergedVars = {
      name: targetName,
      ...(variables || {}),
    };

    const finalBody = renderTemplateBody(template.body, mergedVars);

    // 5) Send via WhatsApp provider (mock when env missing)
    try {
      await sendWhatsAppText({
        to: targetPhone,
        text: finalBody,
      });
    } catch (e) {
      // Log and still proceed to store message (optional behavior)
      console.error('WhatsApp provider send error:', e);
    }

    // 6) Ensure there is a ChatConversation for this phone
    let conversation = await prisma.chatConversation.findFirst({
      where: { visitorPhone: targetPhone },
    });

    if (!conversation) {
      conversation = await prisma.chatConversation.create({
        data: {
          visitorId: targetPhone,
          visitorName: targetName,
          visitorPhone: targetPhone,
          status: 'active',
          priority: 'normal',
        },
      });
    }

    // 7) Store the outgoing template message in ChatMessage
    const message = await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        content: finalBody,
        sender: 'agent',          // because admin triggered this
        senderName: 'Template',   // you can change this to current user name
        type: 'text',
      },
    });

    // 8) Update conversation timestamp
    await prisma.chatConversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(
      { success: true, message },
      { status: 201 }
    );
  } catch (error) {
    console.error('WA message-template send error:', error);
    return NextResponse.json(
      { error: 'Failed to send template message' },
      { status: 500 }
    );
  }
}
