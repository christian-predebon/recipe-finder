
import { IRecipeCategory } from "../entities/recipe-category.entity";
import { IRecipeSearch } from "../entities/recipe-search.entity";
import { IRecipe } from "../entities/recipe.entity";

export interface IRecipeDatasource {
  getRecipesByIngredient(recipeIngredient: string): Promise<IRecipeSearch[]>;
  getRecipesByCategory(recipeCategory: string): Promise<IRecipeSearch[]>;
  getAllCategories(): Promise<IRecipeCategory[]>;
  getRecipeById(recipeId: string): Promise<IRecipe>;
}
