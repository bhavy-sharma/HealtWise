// app/api/diagnose/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { symptoms, pincode } = await req.json(); // 👈 pincode bhi lenge

    if (!symptoms || symptoms.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please enter your symptoms." }), {
        status: 400,
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    // ✅ Use FREE & WORKING model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert medical assistant. Based on these symptoms:
"${symptoms}"

Provide a JSON response with the following structure:
{
  "diagnosis": "Brief possible condition",
  "remedies": ["Remedy 1", "Remedy 2", ...],
  "precautions": ["Precaution 1", "Precaution 2", ...],
  "specialists": ["Specialist 1", "Specialist 2", ...],
  "note": "Consult a doctor for proper diagnosis."
}

- Do NOT include medicine names.
- Keep remedies and precautions practical and home-based.
- Specialists should be relevant (e.g., "Cardiologist", "Dermatologist").
- Always end note with "Consult a doctor for proper diagnosis."
- Respond ONLY with valid JSON. No extra text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean response (remove markdown if any)
    text = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return new Response(JSON.stringify({ error: "Failed to parse response. Please try again." }), {
        status: 500,
      });
    }

    // Add pincode for hospital lookup later
    data.pincode = pincode;

    return new Response(JSON.stringify(data), {
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