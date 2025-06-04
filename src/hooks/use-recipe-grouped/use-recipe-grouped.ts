import { IRecipeGroups } from "@/services/recipe/entities/recipe-group.entity";
import { recipeServiceInstance } from "@/services/recipe/recipe.service.instance";
import useSWR from "swr";

const USE_RECIPES_GROUPED_KEY = "use-recipes-grouped";

async function fetcher(): Promise<IRecipeGroups> {
  return await recipeServiceInstance.getRecipesGroupedByCategory();
}

export function useRecipeGrouped() {
  const { data, isLoading, error } = useSWR<IRecipeGroups>(
    USE_RECIPES_GROUPED_KEY,
    fetcher
  );

  return { groupedRecipes: data?.groups ?? [], isLoading, error };
}
