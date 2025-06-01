import { useRecipeById } from "@/hooks/use-recipe-by-id/use-recipe-by-id";
import { IRecipe } from "@/services/recipe/entities/recipe.entity";
import { useParams } from "react-router";

function RecipeDetailPage() {
  const { id } = useParams();

  const { recipe, isLoading, error } = useRecipeById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Error loading recipe details</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Recipe not found</p>
      </div>
    );
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`ingredient${i}` as keyof IRecipe];
    const measure = recipe[`measure${i}` as keyof IRecipe];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={recipe.thumb}
          alt={recipe.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.name}
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {ingredients.map((item, index) => (
                <li key={index} className="text-gray-600">
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Instructions
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>

          {recipe.youtube && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Video Tutorial
              </h2>
              <a
                href={recipe.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
