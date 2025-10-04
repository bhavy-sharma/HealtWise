// app/api/diagnose/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { symptoms, pincode } = await req.json();

    if (!symptoms || symptoms.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please enter your symptoms." }), {
        status: 400,
      });
    }

    // 🧠 Step 1: Generate diagnosis via Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert medical assistant. Based on these symptoms:
"${symptoms}"

Provide a JSON response with this structure:
{
  "diagnosis": "Brief possible condition",
  "remedies": ["Remedy 1", "Remedy 2"],
  "precautions": ["Precaution 1", "Precaution 2"],
  "specialists": ["Specialist 1", "Specialist 2"],
  "note": "Consult a doctor for proper diagnosis."
}
Only return valid JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 🧹 Clean markdown
    text = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return new Response(JSON.stringify({ error: "Failed to parse AI response." }), {
        status: 500,
      });
    }

    // 🏥 Step 2: Find nearby hospitals using OpenStreetMap Nominatim API (FREE)
    let hospitals = [];
    try {
      const locRes = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`);
      const locData = await locRes.json();

      if (locData.length > 0) {
        const { lat, lon } = locData[0];

        // Find hospitals within 5km radius
        const hospitalRes = await fetch(
          `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](around:5000,${lat},${lon});out;`
        );
        const hospitalData = await hospitalRes.json();

        hospitals = hospitalData.elements.map(h => ({
          name: h.tags?.name || "Unnamed Hospital",
          lat: h.lat,
          lon: h.lon,
          address: h.tags?.["addr:full"] || h.tags?.["addr:street"] || "Address not available"
        }));
      }
    } catch (err) {
      console.error("Hospital Fetch Error:", err);
    }

    // ✅ Merge all results
    const resultData = {
      ...data,
      pincode,
      hospitals: hospitals.slice(0, 5) // only top 5 nearby
    };

    return new Response(JSON.stringify(resultData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process diagnosis." }), {
      status: 500,
    });
  }
}
