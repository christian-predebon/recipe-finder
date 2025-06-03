import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";

interface RecipeCarouselItemProps {
  recipe: IRecipeSearch;
  handleRecipeClick: (recipeId: string) => void;
}

function RecipeCarouselItem({
  recipe,
  handleRecipeClick,
}: Readonly<RecipeCarouselItemProps>) {
  return (
    <div
      onClick={() => handleRecipeClick(recipe.id)}
      className="flex-none w-72 snap-start cursor-pointer"
    >
      <div className="rounded-xl overflow-hidden">
        <div className="relative aspect-[4/3] rounded-xl">
          <img
            src={recipe.thumb}
            alt={recipe.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="py-3">
          <h3 className="text-gray-800 text-sm">{recipe.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default RecipeCarouselItem;
