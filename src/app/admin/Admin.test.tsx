import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminDashboardPage from "./page";

describe("Admin Dashboard Page Component", () => {
  it("renders the admin header", () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText("Government Admin Portal")).toBeInTheDocument();
  });

  it("renders the KPI cards", () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Pending Issues")).toBeInTheDocument();
    expect(screen.getByText("Resolved Today")).toBeInTheDocument();
    expect(screen.getByText("AI Queries Handled")).toBeInTheDocument();
  });

  it("renders the complaints table with mock data", () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText("Recent Public Issues")).toBeInTheDocument();
    expect(screen.getByText("Road Potholes")).toBeInTheDocument();
    expect(screen.getByText("Water Logging")).toBeInTheDocument();
  });
});
