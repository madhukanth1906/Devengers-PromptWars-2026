import { describe, it, expect } from "vitest";
import { cn, truncate, formatIndianNumber, generateComplaintId, debounce } from "./utils";

describe("Utility Functions", () => {
  describe("cn (classname merge)", () => {
    it("should merge simple classnames", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should handle conditional classnames", () => {
      expect(cn("base", false && "hidden", "extra")).toBe("base extra");
    });

    it("should resolve Tailwind conflicts", () => {
      const result = cn("px-2", "px-4");
      expect(result).toBe("px-4");
    });

    it("should handle empty inputs gracefully", () => {
      expect(cn()).toBe("");
    });
  });

  describe("truncate", () => {
    it("should not truncate short strings", () => {
      expect(truncate("Hello", 10)).toBe("Hello");
    });

    it("should truncate long strings and add ellipsis", () => {
      const result = truncate("Hello World, this is a long string", 11);
      expect(result.length).toBeLessThanOrEqual(12);
      expect(result).toContain("…");
    });

    it("should handle empty strings", () => {
      expect(truncate("", 10)).toBe("");
    });

    it("should handle null/undefined safely", () => {
      expect(truncate(null as unknown as string, 10)).toBe("");
    });
  });

  describe("formatIndianNumber", () => {
    it("should format numbers with Indian locale", () => {
      const result = formatIndianNumber(1234567);
      expect(result).toContain("12");
      expect(result).toContain("567");
    });

    it("should handle small numbers", () => {
      expect(formatIndianNumber(42)).toBe("42");
    });

    it("should handle zero", () => {
      expect(formatIndianNumber(0)).toBe("0");
    });
  });

  describe("generateComplaintId", () => {
    it("should generate an ID matching the SB-YYYY-XXXX format", () => {
      const id = generateComplaintId();
      expect(id).toMatch(/^SB-\d{4}-[A-F0-9]{4}$/);
    });

    it("should generate unique IDs on each call", () => {
      const ids = new Set(Array.from({ length: 50 }, () => generateComplaintId()));
      expect(ids.size).toBeGreaterThan(45);
    });

    it("should contain the current year", () => {
      const id = generateComplaintId();
      expect(id).toContain(String(new Date().getFullYear()));
    });
  });

  describe("debounce", () => {
    it("should delay execution", async () => {
      let count = 0;
      const fn = debounce(() => count++, 50);
      fn();
      fn();
      fn();
      expect(count).toBe(0);
      await new Promise((r) => setTimeout(r, 100));
      expect(count).toBe(1);
    });
  });
});
