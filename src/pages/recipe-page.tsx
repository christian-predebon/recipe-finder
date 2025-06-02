import RecipeGroups from "@/components/recipe/recipe-groups";
import {
  RECIPE_PAGE_DESCRIPTION,
  RECIPE_PAGE_TITLE,
} from "@/consts/text.const";
import { useRecipesGrouped } from "@/hooks/use-recipes-grouped/use-recipes-grouped";

function RecipePage() {
  const { groupedRecipes, isLoading, error } = useRecipesGrouped();

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Error loading recipes</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3].map((groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4].map((recipeIndex) => (
                <div
                  key={recipeIndex}
                  className="flex-none w-72 bg-white rounded-xl overflow-hidden border border-gray-200"
                >
                  <div className="relative aspect-[4/3] bg-gray-200 animate-pulse" />
                  <div className="p-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-3xl">{RECIPE_PAGE_TITLE}</p>
        <p className="text-md text-gray-600">{RECIPE_PAGE_DESCRIPTION}</p>
      </div>

      {groupedRecipes && <RecipeGroups groupedRecipes={groupedRecipes} />}
    </div>
  );
}

export default RecipePage;
