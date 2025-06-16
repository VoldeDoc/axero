import { ChatMessage, RoomContext } from "@/types";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const google = createGoogleGenerativeAI({
  apiKey: API_KEY,
});

export async function AIVirtualAssistant(
  question: string,
  roomContext: RoomContext,
  chatHistory: ChatMessage[] = []
): Promise<string> {
  console.log("AIVirtualAssistant called with question:", roomContext);
  if (!API_KEY) {
    return "I'm sorry, but the AI service is not available right now. Please make sure the API key is configured correctly.";
  }

  try {
    const contextPrompt = `
You are a helpful hotel assistant AI. Help customers with questions about this specific room/hotel:

Hotel Information:
- Hotel Name: ${roomContext.hotelName || "Not specified"}
- Room Type: ${roomContext.roomType || "Not specified"}
- Price: ${roomContext.price ? `₦${roomContext.price} per night` : "Not specified"}
- Location: ${roomContext.location || "Not specified"}
- Rating: ${roomContext.rating ? `${roomContext.rating}/5 stars` : "Not specified"}
- Description: ${roomContext.description || "Not available"}
- Amenities: ${roomContext.amenities?.length ? roomContext.amenities.join(", ") : "Not specified"}

Previous conversation:
${chatHistory.slice(-5).map((msg) => `${msg.role}: ${msg.content}`).join("\n")}

Please provide a helpful, accurate response about this room/hotel. Be concise but informative.
`;

    const { text } = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt: question, 
      system: contextPrompt,
    });
    
    return text;
  } catch (error) {
    console.error("Error with Gemini AI:", error);
    return "Sorry, I encountered an error. Please try again or contact support.";
  }
}