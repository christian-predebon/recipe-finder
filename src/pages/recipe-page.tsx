import RecipeCategories from "@/components/recipe-categories/recipe-categories";
import RecipeSearch from "@/components/recipe-search/recipe-search";
import RecipeList from "@/components/recipe/recipe-list";
import { useRecipes } from "@/hooks/use-recipes/use-recipes";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_TIME = 500;

function RecipePage() {
  const [recipeIngredient, setRecipeIngredient] = useState("");
  const [debouncedRecipeIngredient] = useDebounce(
    recipeIngredient,
    DEBOUNCE_TIME
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { recipes, isLoading, error } = useRecipes(
    debouncedRecipeIngredient,
    selectedCategory
  );

  return (
    <div className="flex flex-col gap-8">
      <RecipeSearch
        recipeIngredient={recipeIngredient}
        setRecipeIngredient={setRecipeIngredient}
      />

      <RecipeCategories
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">Error loading recipes</p>
        </div>
      )}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}

export default RecipePage;
