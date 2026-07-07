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
    div: ({ children, className }: Record<string, unknown>) => <div className={className as string}>{children as React.ReactNode}</div>,
    h1: ({ children, className }: Record<string, unknown>) => <h1 className={className as string}>{children as React.ReactNode}</h1>,
    p: ({ children, className }: Record<string, unknown>) => <p className={className as string}>{children as React.ReactNode}</p>,
  },
  AnimatePresence: ({ children }: Record<string, unknown>) => <>{children as React.ReactNode}</>,
}));

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
describe("Home Page Component", () => {
  it("renders the hero section correctly", () => {
    render(<HomePage />);
    expect(screen.getByText(/Your Intelligent/i)).toBeInTheDocument();
    expect(screen.getByText(/Government Companion/i)).toBeInTheDocument();
  });

  it("renders quick actions", () => {
    render(<HomePage />);
    expect(screen.getByText(/Chat with AI Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Find My Schemes/i)).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<HomePage />);
    expect(screen.getByText("1M+")).toBeInTheDocument();
    expect(screen.getByText(/Citizens Helped/i)).toBeInTheDocument();
    expect(screen.getByText("85K+")).toBeInTheDocument();
  });
});
