import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchInput from "./search-input";

vi.mock("react-feather", () => ({
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="clear-icon" />,
}));

describe(SearchInput.name, () => {
  const mockOnChange = vi.fn();
  const mockOnClear = vi.fn();
  const placeholder = "Test placeholder";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input with correct props", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("renders search icon", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnChange).toHaveBeenCalledWith("test");
  });

  it("shows clear button when input has value", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Pulisci ricerca" });
    expect(clearButton).toBeVisible();
    expect(clearButton).not.toHaveClass("invisible");
  });

  it("hides clear button when input is empty", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Pulisci ricerca" });
    expect(clearButton).toHaveClass("invisible");
  });

  it("calls onClear when clear button is clicked", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Pulisci ricerca" });
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("renders clear icon in clear button", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        placeholder={placeholder}
        onClear={mockOnClear}
      />
    );

    const clearIcon = screen.getByTestId("clear-icon");
    expect(clearIcon).toBeInTheDocument();
  });
});
