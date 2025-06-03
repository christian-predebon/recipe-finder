import { recipeServiceInstance } from "@/services/recipe/recipe.service.instance";
import useSWR from "swr";

export enum SearchType {
  INGREDIENT = "ingredient",
  NAME = "name",
}

async function fetcher(searchQuery: string, searchType: SearchType) {
  if (!searchQuery.trim()) {
    return [];
  }

  if (searchType === SearchType.INGREDIENT) {
    return recipeServiceInstance.getRecipesByIngredient(searchQuery);
  } else {
    return recipeServiceInstance.getRecipesByName(searchQuery);
  }
}

const USE_RECIPE_SEARCH_KEY = "use-recipe-search";

export function useRecipeSearch(
  searchQuery: string,
  searchType: SearchType = SearchType.INGREDIENT
) {
  const { data, isLoading, error } = useSWR(
    searchQuery
      ? `${USE_RECIPE_SEARCH_KEY}/${searchType}/${searchQuery}`
      : null,
    () => fetcher(searchQuery, searchType)
  );

  return { recipes: data ?? [], isLoading, error };
}
