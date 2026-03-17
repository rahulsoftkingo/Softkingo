const { GoogleGenerativeAI } = require('@google/generative-ai');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Professional Socket Logic for Softkingo AI Assistance
 * Features:
 * - Multi-model Gemini fallback
 * - Real-time Admin Notifications
 * - Enriched Portfolio Knowledge Base
 * - Multimodal (Image) support
 */

function initSocket(io) {
    io.on('connection', (socket) => {
        console.log('[Socket] New connection:', socket.id);

        // Global Event Logger
        socket.onAny((eventName, ...args) => {
            console.log(`[Socket] Received Event: "${eventName}" from ${socket.id}`, args);
        });

        /**
         * ADMIN ROOM LOGIC
         * Admins should join the 'admin-room' to receive real-time visitor alerts
         */
        socket.on('join-admin', () => {
            socket.join('admin-room');
            console.log(`[Socket] Admin joined: ${socket.id}`);
        });

        /**
         * VISITOR MESSAGE HANDLER
         */
        socket.on('send-message', async (data) => {
            const { message, conversationId, image, visitorName } = data;
            const apiKey = process.env.GEMINI_API_KEY;

            console.log(`[Socket] Msg from ${socket.id} | Conv: ${conversationId}`);

            // Notify Admins instantly
            io.to('admin-room').emit('new-message-alert', {
                conversationId,
                content: message,
                sender: 'user',
                senderName: visitorName || 'Visitor',
                timestamp: new Date()
            });

            try {
                if (!apiKey) {
                    console.error('[Socket] GEMINI_API_KEY is missing!');
                    throw new Error('GEMINI_API_KEY is missing from environment.');
                }
                console.log('[Socket] Using GEMINI_API_KEY (last 4):', apiKey.slice(-4));

                // 1. Fetch Bot Policy & Knowledge
                const policy = await prisma.botPolicy.findFirst({
                    orderBy: { updatedAt: 'desc' }
                });
                const policyText = policy ? policy.content : "";
                console.log('[Socket] Policy fetched:', policy ? 'Yes' : 'No');

                // 2. Enriched System Instruction (Portfolio Knowledge)
                const systemInstruction = `
          You are "Softkingo AI Assistant". You represent Softkingo, a premium software development firm in Noida (Sector 63).
          
          COMPANY INFO:
          - Services: Web/Mobile App Development, UI/UX, AI/ML, Blockchain.
          - Contact: sales@softkingo.com | +91 74287 50870.
          
          PORTFOLIO KNOWLEDGE (Prioritize These Examples):
          - ASTROLOGY: We built "Anytime Astro" (top-rated), "MyNaksh", and "Bodhi". We are experts in Astrology tech (celestial APIs, horoscopes).
          - E-LEARNING: "Oda Class" (IIT teachers), "Guidely" (exam prep), "Practivoo".
          - E-COMMERCE/MARKETPLACE: "Moglix" (B2B), "Snoonu" (Super App), "LoveLocal".
          - DATING: "Boo" (Personality matching), "Bumpy" (International).
          - WELLNESS/FITNESS: "Innergy", "Fitify".

          POLICY & RULES:
          ${policyText}
          
          STYLE:
          - Use MARKDOWN for formatting (lists, bold, etc.).
          - If a user asks for an app like "Astrology", mention "Anytime Astro" specifically.
          - Be professional, concise, and helpful.
        `;

                let promptParts = [systemInstruction, `User: ${message}`];

                if (image && image.base64) {
                    console.log('[Socket] Image attached, adding to prompt...');
                    promptParts.push({
                        inlineData: {
                            data: image.base64.split(',')[1] || image.base64,
                            mimeType: image.mimeType || "image/jpeg"
                        }
                    });
                }

                // 3. Gemini Processing with Multi-Model Fallback
                const genAI = new GoogleGenerativeAI(apiKey);
                const modelNames = ["gemini-2.5-flash-lite", "gemini-pro-latest", "gemini-3-flash-preview"];

                let responseText = "";
                let failureCount = 0;

                for (const modelName of modelNames) {
                    try {
                        console.log(`[Socket] Attempting model: ${modelName}`);
                        const model = genAI.getGenerativeModel({ model: modelName });
                        const result = await model.generateContent(promptParts);
                        responseText = result.response.text();
                        if (responseText) {
                            console.log(`[Socket] Success with ${modelName}`);
                            break;
                        }
                    } catch (err) {
                        failureCount++;
                        console.error(`[Socket] Model ${modelName} failed: ${err.message}`);
                    }
                }

                if (!responseText) {
                    console.error("[Socket] All Gemini models failed! Using script fallback.");
                    const { getFallbackResponse } = require('./chatMatcher');
                    responseText = getFallbackResponse(message);
                }

                // 4. Persistence
                if (conversationId && !isNaN(parseInt(conversationId))) {
                    await prisma.chatMessage.create({
                        data: {
                            conversationId: parseInt(conversationId),
                            content: responseText,
                            sender: 'bot',
                            type: 'text',
                            isRead: false,
                        },
                    });
                }

                // 5. Response to Client & Admin
                const responseData = {
                    content: responseText,
                    sender: 'bot',
                    timestamp: new Date()
                };

                socket.emit('receive-message', responseData);
                io.to('admin-room').emit('new-message-alert', { ...responseData, conversationId });

            } catch (error) {
                console.error('[Socket] AI Error:', error.message);
                const errorMsg = "I'm having trouble connecting to my brain. Please try again or email support@softkingo.com.";
                socket.emit('receive-message', { content: errorMsg, sender: 'bot', timestamp: new Date() });
            }
        });

        /**
         * AGENT REPLY HANDLER (From Admin Panel)
         */
        socket.on('agent-reply', async (data) => {
            const { conversationId, content, agentName } = data;

            // Broadcast to the user if they are online (we rely on rooms named by convId)
            io.to(`room-${conversationId}`).emit('receive-message', {
                content,
                sender: 'agent',
                senderName: agentName,
                timestamp: new Date()
            });

            // Sync other admins
            io.to('admin-room').emit('new-message-alert', {
                conversationId,
                content,
                sender: 'agent',
                senderName: agentName,
                timestamp: new Date()
            });
        });

        socket.on('join-conversation', (id) => {
            socket.join(`room-${id}`);
            console.log(`[Socket] Client joined room: room-${id}`);
        });

        socket.on('disconnect', () => {
            console.log('[Socket] Disconnected:', socket.id);
        });
    });
}

module.exports = { initSocket };
