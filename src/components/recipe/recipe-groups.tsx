import { IRecipeGroup } from "@/services/recipe/entities/recipe-group.entity";
import RecipeCarousel from "./recipe-carousel/recipe-carousel";

interface RecipeGroupsProps {
  groupedRecipes: IRecipeGroup[];
}

function RecipeGroups({ groupedRecipes }: Readonly<RecipeGroupsProps>) {
  return (
    <div>
      {groupedRecipes.map(function renderGroup(group) {
        return (
          <div key={group.category}>
            <RecipeCarousel
              categoryName={group.category}
              recipes={group.recipes}
            />
          </div>
        );
      })}
    </div>
  );
}

export default RecipeGroups;
