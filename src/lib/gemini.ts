import { GoogleGenAI } from "@google/genai";

// Lazy-initialize the Gemini API client.
// This prevents crashes on pages that import this module
// but don't actually call the AI (e.g., during static site generation).
let _ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!_ai) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
}

/**
 * Sanitizes user input to prevent prompt injection attacks.
 * Strips control characters and limits input length.
 */
export function sanitizeInput(input: string, maxLength = 2000): string {
  if (!input || typeof input !== "string") return "";
  // Remove control characters and excessive whitespace
  const cleaned = input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
  return cleaned.slice(0, maxLength);
}

/**
 * Validates that a prompt is safe and non-empty before sending to AI.
 */
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: "Prompt cannot be empty." };
  }
  if (prompt.length > 5000) {
    return { valid: false, error: "Prompt is too long. Maximum 5000 characters." };
  }
  return { valid: true };
}

/**
 * Generate text using the Gemini model.
 * Defaulting to 'gemini-2.5-flash' for fast, multi-modal responses.
 */
export async function generateText(prompt: string, systemInstruction?: string) {
  const sanitized = sanitizeInput(prompt);
  const validation = validatePrompt(sanitized);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    const ai = getAI();
    if (!ai.apiKey || ai.apiKey === "") {
      throw new Error("API key is missing, falling back to static replies.");
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: sanitized,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text ?? "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error or missing key. Using static fallback.", error);
    
    // Static fallback for GitHub Pages without API key
    const lowerPrompt = sanitized.toLowerCase();
    
    if (lowerPrompt.includes("hi") || lowerPrompt.includes("hai") || lowerPrompt.includes("hello")) {
      return "Namaste! How can I help you with government services today?";
    } else if (lowerPrompt.includes("scheme") || lowerPrompt.includes("kisan") || lowerPrompt.includes("yojana")) {
      return "The PM Kisan Samman Nidhi provides income support of ₹6,000 per year to all landholding farmer families. You can apply through the 'Schemes' section on this portal.";
    } else if (lowerPrompt.includes("complaint") || lowerPrompt.includes("pothole") || lowerPrompt.includes("issue")) {
      return "I can help you report an issue! Please navigate to the 'Complaints' tab to file a new complaint with location details and photos.";
    } else if (lowerPrompt.includes("document") || lowerPrompt.includes("aadhaar") || lowerPrompt.includes("pan")) {
      return "To update your Aadhaar or PAN card, you can use the Government Services directory in the dashboard. Most updates can be done completely online now.";
    }
    
    return "Thank you for reaching out to Smart Bharat. I am currently operating in offline mode. I can answer basic questions about PM Kisan, Aadhaar, and how to file complaints.";
  }
}

/**
 * Start a chat session with Gemini to maintain conversation history.
 */
export function startChatSession(systemInstruction?: string) {
  return getAI().chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: systemInstruction,
    },
  });
}
