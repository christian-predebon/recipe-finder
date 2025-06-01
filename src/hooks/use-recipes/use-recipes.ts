import { recipeServiceInstance } from "@/services/recipe/recipe.service.instance";
import useSWR from "swr";

async function fetcher(params: {
  ingredient: string;
  category: string | null;
}) {
  const { ingredient, category } = params;

  if (category) {
    const categoryRecipes = await recipeServiceInstance.getRecipesByCategory(
      category
    );

    if (ingredient) {
      const searchTerm = ingredient.toLowerCase();
      return categoryRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm)
      );
    }

    return categoryRecipes;
  }

  return recipeServiceInstance.getRecipesByIngredient(ingredient);
}

const USE_RECIPE_KEY = "use-recipe";

export function useRecipes(
  recipeIngredient: string,
  selectedCategory: string | null = null
) {
  const { data, isLoading, error } = useSWR(
    `${USE_RECIPE_KEY}/${recipeIngredient}/${selectedCategory}`,
    () => fetcher({ ingredient: recipeIngredient, category: selectedCategory })
  );

  return { recipes: data, isLoading, error };
}
