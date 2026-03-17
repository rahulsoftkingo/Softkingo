require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is missing');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelNames = ["gemini-2.5-flash-lite", "gemini-pro-latest", "gemini-3-flash-preview"];
  
  for (const modelName of modelNames) {
    try {
      console.log(`Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hello!");
      const text = result.response.text();
      console.log(`Success with ${modelName}: ${text}`);
      break; 
    } catch (error) {
      console.error(`Failed with ${modelName}: ${error.message}`);
    }
  }
}

testGemini();
