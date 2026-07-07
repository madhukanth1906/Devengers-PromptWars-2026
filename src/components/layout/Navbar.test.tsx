import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "./Navbar";

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

describe("Navbar Component", () => {
  it("renders the Smart Bharat logo and title", () => {
    render(<Navbar />);
    expect(screen.getByText("Smart Bharat")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Schemes")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Complaints")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<Navbar />);
    const mobileButton = screen.getByLabelText("Toggle mobile menu");
    expect(mobileButton).toBeInTheDocument();
  });
});
