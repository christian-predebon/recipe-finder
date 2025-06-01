import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Subtitle from "./subtitle";

describe(Subtitle.name, () => {
  it("renders children correctly", () => {
    render(<Subtitle>Test Content</Subtitle>);

    const subtitle = screen.getByText("Test Content");

    expect(subtitle).toBeInTheDocument();
  });

  it("renders with correct CSS class", () => {
    render(<Subtitle>Test Content</Subtitle>);

    const subtitle = screen.getByText("Test Content");

    expect(subtitle).toHaveClass("text-2xl");
  });
});
