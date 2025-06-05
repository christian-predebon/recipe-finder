import ErrorComponent from "@/components/error/error";
import Typography from "@/components/input/typography/typography";
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

  const hasSearchResults = !isLoading && !error && recipes.length > 0;
  const hasNoResults =
    !isLoading && !error && recipes.length === 0 && searchQuery !== "";

  return (
    <div className="max-w-7xl mx-auto py-24">
      <div className="mb-8">
        <Typography variant="subtitle">{SEARCH_BUTTON_TEXT}</Typography>
        <Typography variant="body">{RECIPE_SEARCH_PAGE_DESCRIPTION}</Typography>
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

      {hasSearchResults && <RecipeSearchList recipes={recipes} />}

      {hasNoResults && (
        <div className="text-center py-4">
          <p className="text-gray-500">{RECIPE_SEARCH_PAGE_NO_RESULTS}</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
