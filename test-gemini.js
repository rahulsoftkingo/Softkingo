const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const names = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
    const genAI = new GoogleGenerativeAI('AIzaSyC1fhpgcHz3EQEz1nADqogeNapf9uLKL3M');

    for (const name of names) {
        try {
            console.log(`Checking ${name}...`);
            const model = genAI.getGenerativeModel({ model: name });
            const result = await model.generateContent("Hello");
            console.log(`Success with ${name}:`, result.response.text());
            return;
        } catch (e) {
            console.error(`Error with ${name}:`, e.message);
        }
    }
}

listModels();
