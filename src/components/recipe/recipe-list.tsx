import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Subtitle from "../input/typography/subtitle";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const RECIPE_LIST_TITLE = "Ricette";

interface RecipeListProps {
  recipes: IRecipeSearch[];
}

function RecipeList({ recipes }: RecipeListProps) {
  const navigate = useNavigate();

  const handleRecipeClick = (mealId: string) => {
    navigate(`/recipe/${mealId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <Subtitle>{RECIPE_LIST_TITLE}</Subtitle>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {recipes.map((recipe: IRecipeSearch) => (
          <motion.div
            key={recipe.id}
            variants={item}
            onClick={() => handleRecipeClick(recipe.id)}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden
                shadow-sm hover:bg-gray-50 focus:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-gray-200
                transition-all duration-200 cursor-pointer"
          >
            <motion.img
              src={recipe.thumb}
              alt={recipe.name}
              className="w-full h-48 object-cover"
              transition={{ duration: 0.1 }}
            />
            <div className="p-4">
              <h2 className="font-medium text-gray-800">{recipe.name}</h2>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default RecipeList;
