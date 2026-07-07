import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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

  it("can progress to step 2 and submit", async () => {
    vi.useFakeTimers();
    render(<ComplaintsPage />);
    
    // Click continue on step 1
    const continueBtn = screen.getByText("Continue");
    fireEvent.click(continueBtn);
    
    // Should show step 2
    expect(screen.getByText(/Our AI can automatically generate/i)).toBeInTheDocument();
    
    // Submit on step 2
    const submitBtn = screen.getByText(/Submit Complaint/i);
    fireEvent.click(submitBtn);
    
    // Fast forward the setTimeout
    vi.advanceTimersByTime(3000);
    
    // Should show step 3
    await waitFor(() => {
      expect(screen.getByText("Complaint Registered Successfully!")).toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });
});
