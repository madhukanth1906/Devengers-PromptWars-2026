"use server";

import { generateText } from "@/lib/gemini";

export async function generateAssistantResponse(prompt: string, systemInstruction?: string): Promise<string> {
  try {
    const response = await generateText(prompt, systemInstruction);
    return response || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Server Action Error:", error);
    throw new Error("Failed to generate response");
  }
}
