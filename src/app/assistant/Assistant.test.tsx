import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, type Mock } from "vitest";
import AssistantPage from "./page";
import * as gemini from "@/lib/gemini";

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

vi.mock("@/lib/gemini", () => ({
  generateText: vi.fn(),
}));

describe("Assistant Page Component", () => {
  it("renders the initial greeting message", () => {
    render(<AssistantPage />);
    expect(screen.getByText(/Namaste! I am your Smart Bharat AI Civic Assistant/i)).toBeInTheDocument();
  });

  it("allows user to type in the input field", () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText(/Ask about schemes, certificates, or services.../i);
    fireEvent.change(input, { target: { value: "Hello AI" } });
    expect((input as HTMLInputElement).value).toBe("Hello AI");
  });

  it("submits the message and displays the AI response", async () => {
    // Mock the AI response
    (gemini.generateText as Mock).mockResolvedValueOnce("This is a test response from AI.");

    render(<AssistantPage />);
    const input = screen.getByPlaceholderText(/Ask about schemes, certificates, or services.../i);
    const sendButton = screen.getByLabelText("Send message");

    // Type a message and submit
    fireEvent.change(input, { target: { value: "Test prompt" } });
    fireEvent.click(sendButton);

    // Ensure the user message is displayed
    expect(screen.getByText("Test prompt")).toBeInTheDocument();

    // Ensure the AI response appears eventually
    await waitFor(() => {
      expect(screen.getByText("This is a test response from AI.")).toBeInTheDocument();
    });
  });

  it("disables the send button when input is empty", () => {
    render(<AssistantPage />);
    const sendButton = screen.getByLabelText("Send message");
    expect(sendButton).toBeDisabled();
  });
});
