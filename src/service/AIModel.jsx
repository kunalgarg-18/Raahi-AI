import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

// 🚨 Fail fast if key missing
if (!apiKey) {
  throw new Error("Gemini API key is missing. Check your .env file.");
}

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ Use stable alias (avoid version break issues)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// ✅ Controlled generation config
const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  maxOutputTokens: 40000,
};

// ✅ Main function (single responsibility)
export const generateTrip = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig,
    });

    const response = await result.response;
    let text = response.text();

    // 🔥 Clean markdown if model returns ```json
    text = text.replace(/```json|```/g, "").trim();

    // ✅ Optional: validate JSON early (prevents crash later)
    try {
      JSON.parse(text);
    } catch (e) {
      console.warn("Response is not valid JSON:", text);
      throw new Error("Invalid JSON from Gemini");
    }

    let parsed = JSON.parse(text);

    // 🔥 normalize structure HERE
    const travelPlan = parsed.travel_plan || {};

    return {
      hotelOptions: travelPlan.hotel_options || [],
      itinerary: travelPlan.itinerary || []
    };

  } catch (error) {
    console.error("Gemini API Error:", error);

    // 🚨 Surface meaningful error
    if (error.message.includes("404")) {
      throw new Error("Model not found or API not enabled.");
    }

    if (error.message.includes("API key")) {
      throw new Error("Invalid or missing API key.");
    }

    throw error;
  }
};