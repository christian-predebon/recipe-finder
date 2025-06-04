import {
  RECIPE_SEARCH_INGREDIENT_BUTTON_TEXT,
  RECIPE_SEARCH_NAME_BUTTON_TEXT,
} from "@/consts/text.const";
import { SearchType } from "@/hooks/use-recipe-search/use-recipe-search";
import Button from "../input/button/button";
import SearchInput from "../input/search-input/search-input";

interface RecipeSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

function RecipeSearch({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
}: Readonly<RecipeSearchProps>) {
  return (
    <div className="w-full">
      <div className="flex gap-4 mb-2">
        <Button
          title={RECIPE_SEARCH_INGREDIENT_BUTTON_TEXT}
          onClick={() => setSearchType(SearchType.INGREDIENT)}
          variant={
            searchType === SearchType.INGREDIENT ? "contained" : "outlined"
          }
        />
        <Button
          title={RECIPE_SEARCH_NAME_BUTTON_TEXT}
          onClick={() => setSearchType(SearchType.NAME)}
          variant={searchType === SearchType.NAME ? "contained" : "outlined"}
        />
      </div>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={
          searchType === SearchType.INGREDIENT
            ? "Cerca per ingrediente..."
            : "Cerca per nome..."
        }
        onClear={() => setSearchQuery("")}
      />

      <p className="text-xs text-gray-500 mt-1 font-semibold">
        {searchType === SearchType.INGREDIENT
          ? "Inserisci il nome di un ingrediente"
          : "Inserisci il nome di una ricetta"}
      </p>
    </div>
  );
}

export default RecipeSearch;
