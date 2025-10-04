// app/api/diagnose/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Mock hospital/doctor data (replace with real API calls later)
const getNearbyHospitals = (pincode) => {
  // In real app: call Google Places API or hospital database
  return [
    { name: "City General Hospital", distance: "1.2 km", rating: 4.5 },
    { name: "MediCare Super Speciality", distance: "2.5 km", rating: 4.3 },
    { name: "Apollo Clinic", distance: "3.0 km", rating: 4.7 }
  ];
};

const getSpecialists = (issue) => {
  // In real app: match issue to doctor specialties
  return [
    { name: "Dr. Ananya Patel", specialty: "General Physician", experience: "12 years" },
    { name: "Dr. Vikram Singh", specialty: "Internal Medicine", experience: "8 years" }
  ];
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, pincode, age, gender, issue, days } = body;

    // Validate input
    if (!name || !pincode || !age || !gender || !issue || !days) {
      return Response.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // Prepare prompt for Gemini
    const prompt = `
      You are an AI health assistant. Analyze the following patient details:
      - Name: ${name}
      - Age: ${age}
      - Gender: ${gender}
      - Symptoms: ${issue}
      - Duration: ${days} days
      - Location: PINCODE ${pincode}

      Provide:
      1. Top 3 possible conditions with probability percentages (as JSON array)
      2. General precautions
      3. Home remedies
      Respond ONLY in valid JSON format with this structure:
      {
        "conditions": [{"name": "Condition", "probability": 85}],
        "precautions": ["Precaution 1", "Precaution 2"],
        "remedies": ["Remedy 1", "Remedy 2"]
      }
    `;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse Gemini response
    let diagnosisData;
    try {
      // Clean potential markdown from response
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      diagnosisData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      diagnosisData = {
        conditions: [{ name: "Unable to determine", probability: 0 }],
        precautions: ["Consult a doctor immediately"],
        remedies: ["Rest and hydration"]
      };
    }

    // Add location-based data
    const hospitals = getNearbyHospitals(pincode);
    const doctors = getSpecialists(issue);

    // Return complete response
    return Response.json({
      user: { name, pincode, age, gender, issue, days },
      diagnosis: diagnosisData,
      hospitals,
      doctors
    });

  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Failed to process diagnosis. Please try again." },
      { status: 500 }
    );
  }
}