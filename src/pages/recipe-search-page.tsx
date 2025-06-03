import Subtitle from "@/components/input/typography/subtitle";
import RecipeSearch from "@/components/recipe-search/recipe-search";
import RecipeSearchList from "@/components/recipe/recipe-search-list/recipe-search-list";
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
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="mb-8">
        <Subtitle>Cerca ricette</Subtitle>
        <p className="text-gray-600 mt-2">
          Trova le ricette che preferisci in base agli ingredienti o al nome
        </p>
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

      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">
            Errore durante la ricerca delle ricette
          </p>
        </div>
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <RecipeSearchList recipes={recipes} />
      )}

      {!isLoading && !error && recipes.length === 0 && searchQuery && (
        <div className="text-center py-4">
          <p className="text-gray-500">Nessuna ricetta trovata</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
