import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./button";

describe(Button.name, () => {
  it("renders children correctly", () => {
    render(<Button onClick={() => {}} title="Test Content" />);

    const subtitle = screen.getByText("Test Content");

    expect(subtitle).toBeInTheDocument();
  });
});
