import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "./page";

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

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
    p: ({ children, className }: any) => <p className={className}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;
describe("Home Page Component", () => {
  it("renders the hero section correctly", () => {
    render(<HomePage />);
    expect(screen.getByText(/Your Smart AI Civic Companion/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering citizens with an intelligent assistant/i)).toBeInTheDocument();
  });

  it("renders quick actions", () => {
    render(<HomePage />);
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Find Schemes")).toBeInTheDocument();
    expect(screen.getByText("Report Issue")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<HomePage />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText(/Digital Inclusion/i)).toBeInTheDocument();
  });
});
