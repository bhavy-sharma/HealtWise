import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    // Parse user input from the request body
    const { symptoms } = await req.json();

    if (!symptoms || symptoms.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please enter your symptoms." }), {
        status: 400,
      });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // ✅ Correct model name (do NOT use gemini-1.5-pro-latest)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Prompt to send to Gemini
    const prompt = `
    You are an experienced medical assistant. Based on these symptoms:
    "${symptoms}"
    provide a brief, informative possible diagnosis and general advice.
    Do not provide medicine names. 
    Always end with "Consult a doctor for proper diagnosis."
    `;  

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send success response
    return new Response(JSON.stringify({ diagnosis: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process diagnosis" }), {
      status: 500,
    });
  }
}
