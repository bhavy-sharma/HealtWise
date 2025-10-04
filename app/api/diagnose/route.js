// app/api/diagnose/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const MAPMYINDIA_API_KEY = process.env.MAPMYINDIA_API_KEY;

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

    // === AI Diagnosis ===
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ Use stable model

    const prompt = `
You are an expert medical assistant. Based on these symptoms:
"${symptoms}"

Provide a JSON response with this structure:
{
  "diagnosis": "Brief possible condition",
  "remedies": ["Remedy 1", "Remedy 2", ...],
  "precautions": ["Precaution 1", "Precaution 2", ...],
  "specialists": ["Specialist 1", "Specialist 2", ...],
  "note": "Consult a doctor for proper diagnosis."
}

RULES:
- Respond ONLY with valid JSON. NO MARKDOWN, NO TEXT BEFORE/AFTER.
- Use ONLY English. No other languages.
- Do NOT include medicine names.
- Keep remedies and precautions practical.
- Always end note with "Consult a doctor for proper diagnosis."
`;

    const result = await model.generateContent(prompt);
    let rawText = result.response.text().trim();

    // 🔥 CRITICAL: Clean response to ensure valid JSON
    // Remove any markdown, extra text, or non-JSON content
    let jsonStr = rawText;
    if (rawText.startsWith("```json")) {
      jsonStr = rawText.split("```json")[1]?.split("```")[0]?.trim() || rawText;
    } else if (rawText.includes("{") && rawText.includes("}")) {
      // Extract JSON object if wrapped in text
      const start = rawText.indexOf("{");
      const end = rawText.lastIndexOf("}") + 1;
      jsonStr = rawText.slice(start, end);
    }

    // Validate JSON
    let diagnosisData;
    try {
      diagnosisData = JSON.parse(jsonStr);
      // Ensure all required fields exist
      if (!diagnosisData.diagnosis || !Array.isArray(diagnosisData.remedies)) {
        throw new Error("Missing required fields");
      }
    } catch (e) {
      console.error("AI JSON Parse Error:", { rawText, jsonStr, error: e.message });
      return new Response(
        JSON.stringify({ error: "AI returned invalid response. Please try again." }),
        { status: 500 }
      );
    }

    // === MapmyIndia Nearby Hospitals ===
    let hospitals = [];
    try {
      const url = `https://apis.mapmyindia.com/advancedmaps/v1/${MAPMYINDIA_API_KEY}/nearby?` +
        `refLocation=${lat},${lng}&category=HOS&radius=10000&sort=distance&itemCount=8`;

      const nearbyResponse = await fetch(url, { timeout: 10000 });

      // 🔥 Check if response is OK and has valid JSON
      if (!nearbyResponse.ok) {
        console.warn("MapmyIndia HTTP Error:", nearbyResponse.status, await nearbyResponse.text());
        throw new Error("HTTP error");
      }

      const contentType = nearbyResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await nearbyResponse.text();
        console.warn("MapmyIndia non-JSON response:", text);
        throw new Error("Response is not JSON");
      }

      const nearbyData = await nearbyResponse.json();

      if (nearbyData?.copiedPois?.length > 0) {
        hospitals = nearbyData.copiedPois.map(place => ({
          name: place.pname || "Medical Facility",
          address: place.address || place.locality || "Address not available",
          place_id: place.eLoc,
          map_url: `https://www.mapmyindia.com/maps?eLoc=${place.eLoc}`
        }));
      }
    } catch (err) {
      console.error("MapmyIndia API Error:", err.message);
      // Don't fail the whole request — just return empty hospitals
    }

    return new Response(
      JSON.stringify({
        ...diagnosisData,
        location: { lat, lng },
        hospitals
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your request." }),
      { status: 500 }
    );
  }
}