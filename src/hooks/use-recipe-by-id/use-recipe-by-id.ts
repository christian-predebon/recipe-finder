import { recipeServiceInstance } from "@/services/recipe/recipe.service.instance";
import useSWR from "swr";

async function fetcher(recipeId: string) {
  return recipeServiceInstance.getRecipeById(recipeId);
}

const USE_RECIPE_BY_ID_KEY = "use-recipe-by-id";

export function useRecipeById(recipeId?: string) {
  if (!recipeId) {
    return { recipe: null, isLoading: false, error: null };
  }

  const { data, isLoading, error } = useSWR(
    `${USE_RECIPE_BY_ID_KEY}/${recipeId}`,
    () => fetcher(recipeId)
  );

  return { recipe: data, isLoading, error };
}
