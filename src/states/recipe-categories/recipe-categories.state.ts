import { recipeServiceInstance } from "@/services/recipe/recipe.service.instance";
import { atom } from "jotai";

export const RecipeCategoriesAtom = atom(async function initialize() {
  const categories = await recipeServiceInstance.getAllCategories();

  return categories;
});
