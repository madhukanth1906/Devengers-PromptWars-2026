import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react";
import ComplaintsPage from "./page";

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

describe("Complaints Page Component", () => {
  it("renders step 1 initially", () => {
    render(<ComplaintsPage />);
    expect(screen.getByText("Report a Public Issue")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
});
