import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DashboardPage from "./page";

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

describe("Dashboard Page Component", () => {
  it("renders the user profile section", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Ramesh Kumar")).toBeInTheDocument();
    expect(screen.getByText("Citizen ID: 4590-XXXX-XXXX")).toBeInTheDocument();
  });

  it("renders quick stats", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Active Complaints")).toBeInTheDocument();
    expect(screen.getByText("Saved Schemes")).toBeInTheDocument();
    expect(screen.getByText("Verified Documents")).toBeInTheDocument();
  });

  it("renders recent activity items", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Pothole on Main Street")).toBeInTheDocument();
    expect(screen.getByText("PM Kisan Samman Nidhi")).toBeInTheDocument();
    expect(screen.getByText("Aadhaar Card Updated")).toBeInTheDocument();
  });
});
