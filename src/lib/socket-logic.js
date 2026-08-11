const { GoogleGenerativeAI } = require('@google/generative-ai');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const prisma = new PrismaClient();

function generateContentViaREST(apiKey, modelName, parts) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ contents: [{ parts: parts }] });
        const options = {
            hostname: 'generativelanguage.googleapis.com',
            port: 443,
            path: `/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', chunk => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const parsed = JSON.parse(responseBody);
                        if (parsed.candidates && parsed.candidates.length > 0) {
                            resolve(parsed.candidates[0].content.parts[0].text);
                        } else {
                            resolve(""); // Empty response handled downstream
                        }
                    } catch (e) {
                        reject(new Error("Failed to parse Gemini JSON"));
                    }
                } else {
                    reject(new Error(`API Error ${res.statusCode}: ${responseBody.substring(0, 200)}`));
                }
            });
        });
        req.on('error', e => reject(e));
        req.write(data);
        req.end();
    });
}

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
                  You are "Softkingo AI Assistant". You represent Softkingo, a premium software development firm located in Noida (Sector 63), India.

                  COMPANY OVERVIEW:
                  - Primary Services: Custom Web & Mobile App Development, UI/UX Design, Artificial Intelligence / Machine Learning solutions, and Blockchain development.
                  - Contact Details: Email: sales@softkingo.com | Phone: +91 74287 50870
                  - CEO: Mr. Parahmans (Tech visionary and AI enthusiast)

                  PORTFOLIO & DOMAIN EXPERTISE (Prioritize these examples when relevant):
                  - ASTROLOGY: Experts in celestial APIs, horoscope integrations, and live chart processing. Built "Anytime Astro" (top-rated market leader), "MyNaksh", and "Bodhi".
                  - E-LEARNING: Built "Oda Class" (IIT faculty-led platform), "Guidely" (competitive exam prep), and "Practivoo".
                  - E-COMMERCE & MARKETPLACE: Built "Moglix" (B2B unicorn marketplace), "Snoonu" (Super App platform), and "LoveLocal".
                  - DATING & SOCIAL: Built "Boo" (Personality-based matching platform) and "Bumpy" (International dating app).
                  - WELLNESS & FITNESS: Built "Innergy" and "Fitify".

                  POLICY & RULES:
                  1. CORE IDENTITY: Always act as the Softkingo AI Assistant. Never break character or state that you are a generic AI model developed by Google.
                  2. SCOPE LIMITATION: Focus exclusively on software development, IT consulting, digital transformation, and Softkingo's portfolio. For unrelated topics (e.g., general news, politics, personal advice), politely steer the user back to Softkingo's services.
                  3. PRICING & TIMELINES: Never provide exact dollar figures, fixed quotes, or strict project delivery deadlines. Always direct users to sales@softkingo.com or +91 74287 50870 for detailed scope evaluation and official proposals.
                  4. COMPETITORS: Never speak poorly of competitors. Frame answers around Softkingo's expertise, client-centric delivery model, and industry track record.
                  5. NO PROMISES: Do not guarantee business revenue, app store ranking placement, or external outcomes.
                  6. SECURITY & COMPLIANCE: Refuse any request to write exploit scripts, malicious code, or assist in unauthorized software access.

                  FORMATTING & COMMUNICATION STYLE:
                  - Use clean Markdown formatting (bold text, bullet points, structured sections).
                  - Always explicitly mention "Anytime Astro" whenever users ask about astrology, horoscope, or celestial apps.
                  - Keep tone professional, authoritative, warm, and sales-supportive                  .
                  `.trim();

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
                console.log('[Socket] Initializing Native REST Request...');
                if (!apiKey) throw new Error("GEMINI_API_KEY is missing in worker");

                const modelNames = ["gemini-2.5-flash-lite", "gemini-pro-latest", "gemini-1.5-pro"];

                let responseText = "";
                let failureCount = 0;

                for (const modelName of modelNames) {
                    try {
                        console.log(`[Socket] Probing model (REST): ${modelName}`);

                        // Ultra-defensive generateContent
                        if (!promptParts || promptParts.length === 0) throw new Error("Empty promptParts");

                        const structuredParts = [];
                        for (const p of promptParts) {
                            if (typeof p === 'string') {
                                structuredParts.push({ text: p });
                            } else {
                                structuredParts.push(p);
                            }
                        }

                        console.log(`[Socket] Requesting AI Content from ${modelName} via HTTPS...`);
                        responseText = await generateContentViaREST(apiKey, modelName, structuredParts);

                        if (responseText) {
                            console.log(`[Socket] AI Response fetched successfully (${modelName})`);
                            break;
                        }
                    } catch (err) {
                        failureCount++;
                        console.error(`[Socket] ${modelName} attempt failed: ${err.message}`);
                    }
                }

                if (!responseText) {
                    console.error("[Socket] All Gemini models failed! Using script fallback.");
                    try {
                        const { getFallbackResponse } = require('./chatMatcher');
                        responseText = getFallbackResponse(message);
                    } catch (fallbackErr) {
                        console.error("[Socket] Script fallback failed:", fallbackErr.message);
                        responseText = "I'm sorry, I'm currently having technical difficulties. Please contact our support.";
                    }
                }

                // 4. Persistence
                console.log('[Socket] Persisting message to DB...');
                if (conversationId && !isNaN(parseInt(conversationId))) {
                    try {
                        const safeContent = (responseText || "No response received.").substring(0, 60000); // Prevent MySQL Text column overflow
                        await prisma.chatMessage.create({
                            data: {
                                conversationId: parseInt(conversationId),
                                content: safeContent,
                                sender: 'bot',
                                type: 'text',
                                isRead: false,
                            },
                        });
                        console.log('[Socket] DB Persistence successful');
                    } catch (dbErr) {
                        console.error("[Socket] DB Persistence failed (Non-fatal):", dbErr.message);
                        // Do not throw here, we still want to send the message to the client
                    }
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
                const errorMsg = "I'm sorry, I'm currently having technical difficulties. Please contact our support support@softkingo.com.";
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
