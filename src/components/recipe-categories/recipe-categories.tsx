import { useRecipeCategories } from "../../hooks/use-recipes-categories/use-recipe-categories";
import Subtitle from "../input/typography/subtitle";

export const CATEGORIES_TITLE = "Categorie";
export const ALL_CATEGORIES_BUTTON_TEXT = "Tutte";

interface RecipeCategoriesProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

function RecipeCategories({
  onCategorySelect,
  selectedCategory,
}: RecipeCategoriesProps) {
  const { categories } = useRecipeCategories();

  return (
    <div className="flex flex-col gap-6">
      <Subtitle>{CATEGORIES_TITLE}</Subtitle>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategorySelect(null)}
          className={`flex items-center gap-3 px-4 justify-center cursor-pointer rounded-full transition-all duration-200
                   shadow-sm border border-gray-200 text-sm font-semibold
                   hover:bg-gray-50 focus:bg-gray-50
                   focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                     selectedCategory === null
                       ? "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"
                       : "bg-white"
                   }`}
        >
          {ALL_CATEGORIES_BUTTON_TEXT}
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className={`flex items-center gap-3 px-4 justify-center cursor-pointer rounded-full transition-all duration-200
                     shadow-sm border border-gray-200 text-sm font-semibold
                     hover:bg-gray-50 focus:bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                       selectedCategory === category.name
                         ? "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"
                         : "bg-white"
                     }`}
          >
            {/* <img
              src={category.thumb}
              alt={category.name}
              className="w-6 h-6 rounded-full object-cover"
            /> */}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecipeCategories;
