import { IRecipeCategory } from "./entities/recipe-category.entity";
import { IRecipeGroups } from "./entities/recipe-group.entity";
import { IRecipeSearch } from "./entities/recipe-search.entity";
import { IRecipe } from "./entities/recipe.entity";
import { IRecipeService } from "./recipe.service.interface";
import { RecipeRepository } from "./repositories/recipe.repository";
import { IRecipeRepository } from "./repositories/recipe.repository.interface";

export class RecipeService implements IRecipeService {
  constructor(
    private readonly _repository: IRecipeRepository = new RecipeRepository()
  ) {}

  async getRecipesByIngredient(
    recipeIngredient: string
  ): Promise<IRecipeSearch[]> {
    return this._repository.getRecipesByIngredient(recipeIngredient);
  }

  async getRecipesByCategory(recipeCategory: string): Promise<IRecipeSearch[]> {
    return this._repository.getRecipesByCategory(recipeCategory);
  }

  async getAllCategories(): Promise<IRecipeCategory[]> {
    return this._repository.getAllCategories();
  }

  async getRecipeById(recipeId: string): Promise<IRecipe> {
    return this._repository.getRecipeById(recipeId);
  }

  async getRecipesGroupedByCategory(): Promise<IRecipeGroups> {
    return this._repository.getRecipesGroupedByCategory();
  }
}
