// app/api/diagnose/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { symptoms } = await req.json();

    if (!symptoms || symptoms.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please enter your symptoms." }), {
        status: 400,
      });
    }

    // ✅ Use v1 endpoint (more stable, supports gemini-1.5-pro)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // ✅ Correct model name for v1
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro", 
      // Optional: specify version if needed (but usually not required)
    });

    const prompt = `
You are an experienced medical assistant. Based on these symptoms:
"${symptoms}"
provide a brief, informative possible diagnosis and general advice.
Do not provide medicine names. 
Always end with "Consult a doctor for proper diagnosis."
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

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