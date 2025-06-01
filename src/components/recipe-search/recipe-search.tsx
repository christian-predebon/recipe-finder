import { Search } from "react-feather";

interface RecipeSearchProps {
  recipeIngredient: string;
  setRecipeIngredient: (value: string) => void;
}

function RecipeSearch({
  recipeIngredient,
  setRecipeIngredient,
}: Readonly<RecipeSearchProps>) {
  return (
    <div className="max-w">
      <div className="relative">
        <input
          type="text"
          value={recipeIngredient}
          onChange={(e) => setRecipeIngredient(e.target.value)}
          placeholder="Cerca una ricetta..."
          className="w-full px-4 py-3 pl-11 text-gray-700 bg-white rounded-lg
                border border-gray-200 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-gray-200
                transition-all duration-200"
        />
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
}

export default RecipeSearch;
