import ErrorComponent from "@/components/error/error";
import Subtitle from "@/components/input/typography/subtitle";
import RecipeSearch from "@/components/recipe-search/recipe-search";
import RecipeSearchList from "@/components/recipe/recipe-search-list/recipe-search-list";
import RecipeSearchSkeleton from "@/components/skeleton/recipe-search-skeleton";
import {
  RECIPE_SEARCH_PAGE_DESCRIPTION,
  RECIPE_SEARCH_PAGE_NO_RESULTS,
  SEARCH_BUTTON_TEXT,
} from "@/consts/text.const";
import { useRecipeSearch } from "@/hooks/use-recipe-search/use-recipe-search";
import { useSearchState } from "@/hooks/use-search-state/use-search-state";
import { useDebounce } from "use-debounce";

const DEBOUNCE_TIME = 500;

function SearchPage() {
  const {
    searchQuery,
    searchType,
    handleSearchQueryChange,
    handleSearchTypeChange,
  } = useSearchState();
  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_TIME);

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
          setSearchQuery={handleSearchQueryChange}
          searchType={searchType}
          setSearchType={handleSearchTypeChange}
        />
      </div>

      {isLoading && <RecipeSearchSkeleton />}

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
