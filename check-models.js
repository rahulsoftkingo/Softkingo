const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModels() {
    const key = 'AIzaSyC1fhpgcHz3EQEz1nADqogeNapf9uLKL3M';
    console.log("Testing with Key:", key.substring(0, 8) + "...");

    try {
        const genAI = new GoogleGenerativeAI(key);

        // Try a very basic request with different model aliases
        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

        for (const modelName of modelsToTry) {
            console.log(`Checking model: ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("ping");
                console.log(`✅ Success with ${modelName}! Response:`, result.response.text());
                return;
            } catch (e) {
                console.log(`❌ Failed with ${modelName}:`, e.message);
            }
        }

        console.log("\n--- SUGGESTION ---");
        console.log("If all 404, please ensure 'Generative Language API' is ENABLED in Google Cloud Console.");
        console.log("Link: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");

    } catch (err) {
        console.error("Critical Error:", err);
    }
}

testModels();
