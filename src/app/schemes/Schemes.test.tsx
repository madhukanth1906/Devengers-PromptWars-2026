import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SchemesPage from "./page";

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

describe("Schemes Page Component", () => {
  it("renders the schemes header", () => {
    render(<SchemesPage />);
    expect(screen.getByText("Discover Government Schemes")).toBeInTheDocument();
  });

  it("renders all schemes initially", () => {
    render(<SchemesPage />);
    expect(screen.getByText("PM Kisan Samman Nidhi")).toBeInTheDocument();
    expect(screen.getByText("Ayushman Bharat")).toBeInTheDocument();
    expect(screen.getByText("Sukanya Samriddhi Yojana")).toBeInTheDocument();
    expect(screen.getByText("Stand-Up India")).toBeInTheDocument();
  });

  it("filters schemes based on search input", () => {
    render(<SchemesPage />);
    const searchInput = screen.getByPlaceholderText(/Search for schemes/i);
    
    fireEvent.change(searchInput, { target: { value: "Health" } });
    
    expect(screen.getByText("Ayushman Bharat")).toBeInTheDocument();
    expect(screen.queryByText("PM Kisan Samman Nidhi")).not.toBeInTheDocument();
  });
});
