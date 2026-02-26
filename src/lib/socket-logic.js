const { GoogleGenerativeAI } = require('@google/generative-ai');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function initSocket(io) {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('send-message', async (data) => {
            const { message, conversationId, image } = data;
            const apiKey = process.env.GEMINI_API_KEY;

            console.log(`[Socket] Msg from ${socket.id} | Conv: ${conversationId} | Key: ${apiKey ? 'Found' : 'Missing'}`);

            try {
                if (!apiKey) {
                    throw new Error('GEMINI_API_KEY is not defined in environment variables.');
                }

                const genAI = new GoogleGenerativeAI(apiKey);

                // 1. Fetch Bot Policy from DB
                const policy = await prisma.botPolicy.findFirst({
                    orderBy: { updatedAt: 'desc' }
                });
                const policyText = policy ? policy.content : "No specific policy provided.";

                // 2. Prepare Gemini Prompt
                const systemInstruction = `
          You are the official "Softkingo AI Assistance" agent. 
          
          GENERAL COMPANY INFO:
          - Name: Softkingo (Premium Software Development Company)
          - Services: Web Development, Mobile Apps, UI/UX Design, AI/ML, Blockchain, DevOps, Cloud Solutions.
          - Location: Noida, India (Sector 63).
          - Contact: sales@softkingo.com | +91 74287 50870.
          - Vibe: Professional, tech-forward, friendly.

          SPECIFIC POLICY CONTEXT:
          ---
          ${policyText}
          ---
          
          RULES:
          1. GREETINGS: Answer "Hi", "Hello", "kese ho?" naturally.
          2. CORE INFO: Answer about Softkingo using the info above.
          3. POLICY: Use SPECIFIC POLICY CONTEXT for rules/pricing.
          4. NO Hallucination. Be professional and concise.
        `;

                let promptParts = [systemInstruction, `User says: ${message}`];

                if (image && image.base64) {
                    promptParts.push({
                        inlineData: {
                            data: image.base64.split(',')[1] || image.base64,
                            mimeType: image.mimeType || "image/jpeg"
                        }
                    });
                }

                // 3. Try to generate content with fallback model names
                const modelNames = ["gemini-1.5-flash", "gemini-pro"];
                let responseText = "";
                let geminiError = null;

                for (const modelName of modelNames) {
                    try {
                        const model = genAI.getGenerativeModel({ model: modelName });
                        const result = await model.generateContent(promptParts);
                        responseText = result.response.text();
                        if (responseText) break;
                    } catch (err) {
                        console.error(`[Socket] Model ${modelName} failed:`, err.message);
                        geminiError = err;
                    }
                }

                if (!responseText) {
                    throw geminiError || new Error("All Gemini models failed to respond.");
                }

                // 4. Save Bot Response to DB
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

                // 5. Emit Response back to client
                socket.emit('receive-message', {
                    content: responseText,
                    sender: 'bot',
                    timestamp: new Date()
                });

            } catch (error) {
                console.error('[Socket] AI Processing Error:', error.message);

                let userFriendlyError = "I apologize, but I'm having trouble connecting to my brain right now. Please try again or contact support@softkingo.com.";

                if (error.message.includes('404')) {
                    userFriendlyError = "I am ready to help, but my AI engine is not yet activated in the Google Cloud console. Please enable the 'Generative Language API' in your project.";
                } else if (error.message.includes('API key not valid')) {
                    userFriendlyError = "My API key seems invalid. Please check the .env configuration.";
                }

                socket.emit('receive-message', {
                    content: userFriendlyError,
                    sender: 'bot',
                    timestamp: new Date()
                });

                socket.emit('error', { message: error.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

module.exports = { initSocket };
