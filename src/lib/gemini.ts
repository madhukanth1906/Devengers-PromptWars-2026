import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// Note: Ensure GEMINI_API_KEY is set in your environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generate text using the Gemini model.
 * Defaulting to 'gemini-2.5-flash' for fast, multi-modal responses.
 */
export async function generateText(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

/**
 * Start a chat session with Gemini to maintain conversation history.
 */
export function startChatSession(systemInstruction?: string) {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: systemInstruction,
    },
  });
}
