import ErrorComponent from "@/components/error/error";
import Subtitle from "@/components/input/typography/subtitle";
import RecipeSearch from "@/components/recipe-search/recipe-search";
import RecipeSearchList from "@/components/recipe/recipe-search-list/recipe-search-list";
import {
  RECIPE_SEARCH_PAGE_DESCRIPTION,
  RECIPE_SEARCH_PAGE_NO_RESULTS,
  SEARCH_BUTTON_TEXT,
} from "@/consts/text.const";
import {
  SearchType,
  useRecipeSearch,
} from "@/hooks/use-recipe-search/use-recipe-search";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_TIME = 500;

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_TIME);
  const [searchType, setSearchType] = useState<SearchType>(
    SearchType.INGREDIENT
  );

  const { recipes, isLoading, error } = useRecipeSearch(
    debouncedSearchQuery,
    searchType
  );

  return (
    <div className="max-w-7xl mx-auto py-24">
      <div className="mb-8">
        <Subtitle>{SEARCH_BUTTON_TEXT}</Subtitle>
        <p className="text-gray-600 mt-2">{RECIPE_SEARCH_PAGE_DESCRIPTION}</p>
      </div>

      <div className="mb-8">
        <RecipeSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <ErrorComponent />}

      {!isLoading && !error && recipes.length > 0 && (
        <RecipeSearchList recipes={recipes} />
      )}

      {!isLoading && !error && recipes.length === 0 && searchQuery && (
        <div className="text-center py-4">
          <p className="text-gray-500">{RECIPE_SEARCH_PAGE_NO_RESULTS}</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
