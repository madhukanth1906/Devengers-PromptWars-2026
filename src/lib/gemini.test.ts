import { describe, it, expect, vi } from "vitest";
import { generateText, sanitizeInput, validatePrompt } from "./gemini";

describe("Gemini API Wrapper", () => {
  describe("sanitizeInput", () => {
    it("should remove control characters from input", () => {
      const dirty = "Hello\x00World\x07!";
      expect(sanitizeInput(dirty)).toBe("HelloWorld!");
    });

    it("should trim whitespace from input", () => {
      expect(sanitizeInput("  hello  ")).toBe("hello");
    });

    it("should truncate input to maxLength", () => {
      const long = "a".repeat(3000);
      expect(sanitizeInput(long).length).toBe(2000);
    });

    it("should respect custom maxLength parameter", () => {
      const long = "a".repeat(500);
      expect(sanitizeInput(long, 100).length).toBe(100);
    });

    it("should return empty string for null/undefined input", () => {
      expect(sanitizeInput("")).toBe("");
      expect(sanitizeInput(null as unknown as string)).toBe("");
      expect(sanitizeInput(undefined as unknown as string)).toBe("");
    });
  });

  describe("validatePrompt", () => {
    it("should accept a valid prompt", () => {
      expect(validatePrompt("What is PM Kisan?")).toEqual({ valid: true });
    });

    it("should reject an empty prompt", () => {
      const result = validatePrompt("");
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should reject a whitespace-only prompt", () => {
      const result = validatePrompt("   ");
      expect(result.valid).toBe(false);
    });

    it("should reject prompts exceeding 5000 characters", () => {
      const long = "a".repeat(5001);
      const result = validatePrompt(long);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("too long");
    });
  });

  describe("generateText", () => {
    it("should be a defined function", () => {
      expect(generateText).toBeDefined();
      expect(typeof generateText).toBe("function");
    });

    it("should throw an error for empty prompts", async () => {
      await expect(generateText("")).rejects.toThrow("empty");
    });
  });
});
