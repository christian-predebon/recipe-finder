import { IRecipeCategory } from "./entities/recipe-category.entity";
import { IRecipeGroups } from "./entities/recipe-group.entity";
import { IRecipeSearch } from "./entities/recipe-search.entity";
import { IRecipe } from "./entities/recipe.entity";

export interface IRecipeService {
  getRecipesByIngredient(recipeIngredient: string): Promise<IRecipeSearch[]>;
  getRecipesByName(recipeName: string): Promise<IRecipeSearch[]>;
  getAllCategories(): Promise<IRecipeCategory[]>;
  getRecipeById(recipeId: string): Promise<IRecipe>;
  getRecipesGroupedByCategory(): Promise<IRecipeGroups>;
}
