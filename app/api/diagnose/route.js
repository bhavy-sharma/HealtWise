// app/api/diagnose/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { symptoms, latitude, longitude } = await req.json();

    if (!symptoms?.trim()) {
      return new Response(JSON.stringify({ error: "Please enter your symptoms." }), { status: 400 });
    }
    if (!latitude || !longitude) {
      return new Response(JSON.stringify({ error: "Location is required." }), { status: 400 });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lng)) {
      return new Response(JSON.stringify({ error: "Invalid coordinates." }), { status: 400 });
    }

    // === Step 1: Get diagnosis + hospital suggestions from GEMINI in ONE call ===
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert Indian medical assistant. User is at latitude ${lat}, longitude ${lng} and has these symptoms:
"${symptoms}"

Based on this, provide a JSON response with:
{
  "diagnosis": "Brief possible condition",
  "remedies": ["Remedy 1", "Remedy 2"],
  "precautions": ["Precaution 1", "Precaution 2"],
  "specialists": ["Specialist 1", "Specialist 2"],
  "hospitals": [
    {
      "name": "Hospital Name",
      "city": "City",
      "reason": "Why it's good for this condition"
    }
  ],
  "note": "Consult a doctor for proper diagnosis."
}

RULES:
- Use ONLY English.
- Hospitals must be REAL and REPUTABLE in India (e.g., AIIMS Delhi, Fortis, Apollo).
- If location is near a major city (Delhi, Mumbai, etc.), suggest hospitals in that city.
- If location is rural, suggest the NEAREST major city's top hospitals.
- Return MAX 3 hospitals.
- Respond ONLY with valid JSON. No extra text.
`;

    const result = await model.generateContent(prompt);
    let rawText = result.response.text().trim();

    // Clean JSON
    let jsonStr = rawText;
    if (rawText.startsWith("```json")) {
      jsonStr = rawText.split("```json")[1]?.split("```")[0]?.trim() || rawText;
    } else if (rawText.includes("{") && rawText.includes("}")) {
      const start = rawText.indexOf("{");
      const end = rawText.lastIndexOf("}") + 1;
      jsonStr = rawText.slice(start, end);
    }

    let data;
    try {
      data = JSON.parse(jsonStr);
      if (!data.diagnosis || !Array.isArray(data.hospitals)) {
        throw new Error("Invalid structure");
      }
    } catch (e) {
      console.error("Gemini JSON error:", rawText);
      return new Response(JSON.stringify({ error: "AI response invalid. Try again." }), { status: 500 });
    }

    // Format hospitals for frontend
    const hospitals = data.hospitals.map(h => ({
      name: h.name || "Recommended Hospital",
      address: h.city ? `${h.city}, India` : "India",
      map_url: `https://www.google.com/maps?q=${encodeURIComponent(h.name || "hospital")}`,
      rating: null
    }));

    return new Response(
      JSON.stringify({
        diagnosis: data.diagnosis,
        remedies: data.remedies,
        precautions: data.precautions,
        specialists: data.specialists,
        note: data.note,
        location: { lat, lng },
        hospitals
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your request." }),
      { status: 500 }
    );
  }
}