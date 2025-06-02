import { IRecipeCategory } from "@/services/recipe/entities/recipe-category.entity";

export const ALL_CATEGORIES_BUTTON_TEXT = "Tutte";

const baseClassName =
  "flex items-center gap-2 px-3 py-0.5 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer";
const selectedClassName = "bg-red-50 text-red-800 border border-red-200";
const unselectedClassName =
  "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200";

interface CategoryButtonProps {
  category?: IRecipeCategory;
  onCategoryClick: () => void;
  isSelected: boolean;
}

function CategoryButton({
  category,
  onCategoryClick,
  isSelected,
}: Readonly<CategoryButtonProps>) {
  if (!category) {
    return (
      <button
        onClick={onCategoryClick}
        className={`${baseClassName} ${
          isSelected ? selectedClassName : unselectedClassName
        }`}
      >
        {ALL_CATEGORIES_BUTTON_TEXT}
      </button>
    );
  }

  return (
    <button
      onClick={onCategoryClick}
      className={`${baseClassName} ${
        isSelected ? selectedClassName : unselectedClassName
      }`}
    >
      <img
        src={category.thumb}
        alt={category.name}
        className="w-6 h-6 rounded-full object-cover"
      />
      {category.name}
    </button>
  );
}

export default CategoryButton;
