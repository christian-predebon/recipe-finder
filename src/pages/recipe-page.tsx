import ErrorComponent from "@/components/error/error";
import RecipeGroups from "@/components/recipe/recipe-groups";
import RecipePageSkeleton from "@/components/skeleton/recipe-page-skeleton";
import {
  RECIPE_PAGE_DESCRIPTION,
  RECIPE_PAGE_TITLE,
} from "@/consts/text.const";
import { useRecipeGrouped } from "@/hooks/use-recipe-grouped/use-recipe-grouped";

function RecipePage() {
  const { groupedRecipes, isLoading, error } = useRecipeGrouped();

  if (error) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <RecipePageSkeleton />;
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
