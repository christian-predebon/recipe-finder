import Typography from "@/components/input/typography/typography";
import { RECIPE_DETAIL_PAGE_INGREDIENTS_TITLE } from "@/consts/text.const";
import { IRecipe } from "@/services/recipe/entities/recipe.entity";

interface RecipeDetailIngredientsProps {
  recipe: IRecipe;
}

function RecipeDetailIngredients({
  recipe,
}: Readonly<RecipeDetailIngredientsProps>) {
  return (
    <div className="space-y-4">
      <Typography variant="subtitle">{RECIPE_DETAIL_PAGE_INGREDIENTS_TITLE}</Typography>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recipe.ingredients?.map(function mapIngredients(ingredient) {
          return (
            <li
              key={ingredient.ingredient}
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <b>{ingredient.measure}</b> {ingredient.ingredient}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipeDetailIngredients;
