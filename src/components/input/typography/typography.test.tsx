import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Typography from "./typography";

describe(Typography.name, () => {
  it("renders children correctly", () => {
    render(<Typography variant="subtitle">Test Content</Typography>);

    const subtitle = screen.getByText("Test Content");

    expect(subtitle).toBeInTheDocument();
  });

  it("renders with correct CSS class", () => {
    render(<Typography variant="subtitle">Test Content</Typography>);

    const subtitle = screen.getByText("Test Content");

    expect(subtitle).toHaveClass("text-2xl");
  });

  it("renders with correct CSS class", () => {
    render(<Typography variant="body">Test Content</Typography>);

    const body = screen.getByText("Test Content");

    expect(body).toHaveClass("text-gray-600 mt-2");
  });
});
