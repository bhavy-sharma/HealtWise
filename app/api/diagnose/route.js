// app/api/diagnose/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_KEY;

export async function POST(req) {
  try {
    const { symptoms, latitude, longitude } = await req.json();

    // ✅ Validate symptoms
    if (!symptoms?.trim()) {
      return new Response(JSON.stringify({ error: "Please enter your symptoms." }), { status: 400 });
    }

    // ✅ Validate live location
    if (!latitude || !longitude) {
      return new Response(JSON.stringify({ error: "Location is required." }), { status: 400 });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return new Response(JSON.stringify({ error: "Invalid coordinates." }), { status: 400 });
    }

    // 🧠 Step 1: Get diagnosis + specialists from Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ Fixed model name

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

- Do NOT include medicine names.
- Keep remedies and precautions practical.
- Specialists should be relevant (e.g., "Cardiologist" for heart issues).
- Always end note with "Consult a doctor for proper diagnosis."
- Respond ONLY with valid JSON. No extra text.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().replace(/```json\n?/g, '').replace(/```/g, '').trim();

    let diagnosisData;
    try {
      diagnosisData = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return new Response(JSON.stringify({ error: "AI response format error." }), { status: 500 });
    }

    // 🏥 Step 2: Fetch BEST hospitals near live location using Google Places
    let hospitals = [];
    try {
      // Get top-rated hospitals within 10km radius
      const placesResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=hospital&key=${GOOGLE_MAPS_API_KEY}&rankby=prominence`
      );
      const placesData = await placesResponse.json();

      if (placesData.status === "OK") {
        // Sort by rating (highest first) and pick top 5
        const sortedHospitals = placesData.results
          .filter(place => place.rating && place.user_ratings_total > 10) // Only rated hospitals
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 5);

        hospitals = sortedHospitals.map(place => ({
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          place_id: place.place_id,
          map_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
        }));
      }
    } catch (err) {
      console.error("Hospital API Error:", err);
      // Don't fail the whole request
    }

    // ✅ Final response
    const resultData = {
      ...diagnosisData,
      location: { lat, lng },
      hospitals // Top-rated hospitals near user's live location
    };

    return new Response(JSON.stringify(resultData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process your request." }), { status: 500 });
  }
}