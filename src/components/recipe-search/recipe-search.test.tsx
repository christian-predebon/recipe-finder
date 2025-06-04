import {
  RECIPE_SEARCH_INGREDIENT_BUTTON_TEXT,
  RECIPE_SEARCH_NAME_BUTTON_TEXT,
} from "@/consts/text.const";
import { SearchType } from "@/hooks/use-recipe-search/use-recipe-search";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecipeSearch from "./recipe-search";

vi.mock("react-feather", () => ({
  Search: () => <div>Search</div>,
  X: () => <div>Times</div>,
}));

describe(RecipeSearch.name, () => {
  const mockSetSearchQuery = vi.fn();
  const mockSetSearchType = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both search type buttons", () => {
    render(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const ingredientButton = screen.getByText(
      RECIPE_SEARCH_INGREDIENT_BUTTON_TEXT
    );
    const nameButton = screen.getByText(RECIPE_SEARCH_NAME_BUTTON_TEXT);

    expect(ingredientButton).toBeInTheDocument();
    expect(nameButton).toBeInTheDocument();
  });

  it("calls setSearchType when clicking search type buttons", () => {
    render(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const nameButton = screen.getByText(RECIPE_SEARCH_NAME_BUTTON_TEXT);
    fireEvent.click(nameButton);

    expect(mockSetSearchType).toHaveBeenCalledWith(SearchType.NAME);
  });

  it("updates search query when typing in input", () => {
    render(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const input = screen.getByPlaceholderText("Cerca per ingrediente...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("test");
  });

  it("renders clear button when search query is not empty", () => {
    render(
      <RecipeSearch
        searchQuery="test"
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Pulisci ricerca" });
    expect(clearButton).toBeVisible();
  });

  it("hides clear button when search query is empty", () => {
    render(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Pulisci ricerca" });
    expect(clearButton).toHaveClass("invisible");
  });

  it("clears search query when clicking clear button", () => {
    render(
      <RecipeSearch
        searchQuery="test"
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Pulisci ricerca" });
    fireEvent.click(clearButton);

    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });

  it("shows correct helper text based on search type", () => {
    const { rerender } = render(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    expect(
      screen.getByText("Inserisci il nome di un ingrediente")
    ).toBeInTheDocument();

    rerender(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.NAME}
        setSearchType={mockSetSearchType}
      />
    );

    expect(
      screen.getByText("Inserisci il nome di una ricetta")
    ).toBeInTheDocument();
  });

  it("renders search icon in input", () => {
    render(
      <RecipeSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        searchType={SearchType.INGREDIENT}
        setSearchType={mockSetSearchType}
      />
    );

    const searchIcon = screen.getByText("Search");
    expect(searchIcon).toBeInTheDocument();
  });
});
