import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesPage from "./page";

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

describe("Services Page Component", () => {
  it("renders the services header", () => {
    render(<ServicesPage />);
    expect(screen.getByText("Government Services Directory")).toBeInTheDocument();
  });

  it("renders service categories", () => {
    render(<ServicesPage />);
    expect(screen.getByText("Health & Wellness")).toBeInTheDocument();
    expect(screen.getByText("Education & Skills")).toBeInTheDocument();
    expect(screen.getByText("Transport & Driving")).toBeInTheDocument();
    expect(screen.getByText("Taxes & Finance")).toBeInTheDocument();
  });

  it("renders popular services", () => {
    render(<ServicesPage />);
    expect(screen.getByText("Most Requested Services")).toBeInTheDocument();
    expect(screen.getByText("Apply for PAN Card")).toBeInTheDocument();
    expect(screen.getByText("Driving License Renewal")).toBeInTheDocument();
  });
});
