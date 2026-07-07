/**
 * General-purpose utility functions used across the application.
 * Centralizing shared logic for maintainability and testability.
 */

/**
 * Classname merge utility. Combines clsx with tailwind-merge
 * to intelligently merge Tailwind CSS classes without conflicts.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to a maximum length, adding an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str ?? "";
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Formats a number for display with Indian locale formatting.
 * e.g., 1234567 → "12,34,567"
 */
export function formatIndianNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

/**
 * Generates a unique complaint ID in the format SB-YYYY-XXXX.
 */
export function generateComplaintId(): string {
  const year = new Date().getFullYear();
  const hex = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `SB-${year}-${hex}`;
}

/**
 * Debounce function to rate-limit rapid user input.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
