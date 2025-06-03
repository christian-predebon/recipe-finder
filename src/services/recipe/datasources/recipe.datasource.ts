import { axiosInstance } from "@/lib/axios/axios.instance";
import { AxiosInstance } from "axios";
import { RecipeCategoryDto } from "../dtos/recipe-category.dto";
import { RecipeSearchDto } from "../dtos/recipe-search.dto";
import { RecipeDto } from "../dtos/recipe.dto";
import { IRecipeCategory } from "../entities/recipe-category.entity";
import { IRecipeSearch } from "../entities/recipe-search.entity";
import { IRecipe } from "../entities/recipe.entity";
import { IRecipeDatasource } from "./recipe.datasource.interface";

interface IRecipeResponse {
  meals: RecipeSearchDto[] | null;
}

interface IRecipeCategoryResponse {
  categories: RecipeCategoryDto[];
}

interface IRecipeDetailResponse {
  meals: RecipeDto[] | null;
}

export class RecipeDatasource implements IRecipeDatasource {
  private readonly _RECIPE_INGREDIENTS_ENDPOINT = "/filter.php?i";
  private readonly _RECIPE_SEARCH_NAME_ENDPOINT = "/search.php?s";
  private readonly _RECIPE_CATEGORY_ENDPOINT = "/filter.php?c";
  private readonly _RECIPE_CATEGORIES_ENDPOINT = "/categories.php";
  private readonly _RECIPE_DETAIL_ENDPOINT = "/lookup.php?i";

  constructor(private readonly _client: AxiosInstance = axiosInstance) {}

  async getRecipesByIngredient(
    recipeIngredient: string
  ): Promise<IRecipeSearch[]> {
    const response = await this._client.get<IRecipeResponse>(
      `${this._RECIPE_INGREDIENTS_ENDPOINT}=${recipeIngredient}`
    );

    if (!response.data.meals) {
      return [];
    }

    const mappedRecipes = response.data.meals.map(this.mapRecipeSearch);

    return mappedRecipes;
  }

  async getRecipesByName(recipeName: string): Promise<IRecipeSearch[]> {
    const response = await this._client.get<IRecipeResponse>(
      `${this._RECIPE_SEARCH_NAME_ENDPOINT}=${recipeName}`
    );

    if (!response.data.meals) {
      return [];
    }

    const mappedRecipes = response.data.meals.map(this.mapRecipeSearch);

    return mappedRecipes;
  }

  async getRecipesByCategory(recipeCategory: string): Promise<IRecipeSearch[]> {
    const response = await this._client.get<IRecipeResponse>(
      `${this._RECIPE_CATEGORY_ENDPOINT}=${recipeCategory}`
    );

    if (!response.data.meals) {
      return [];
    }

    const mappedRecipes = response.data.meals.map(this.mapRecipeSearch);

    return mappedRecipes;
  }

  async getAllCategories(): Promise<IRecipeCategory[]> {
    const response = await this._client.get<IRecipeCategoryResponse>(
      `${this._RECIPE_CATEGORIES_ENDPOINT}`
    );

    const mappedCategories = response.data.categories.map(
      this.mapRecipeCategory
    );

    return mappedCategories;
  }

  async getRecipeById(recipeId: string): Promise<IRecipe> {
    const response = await this._client.get<IRecipeDetailResponse>(
      `${this._RECIPE_DETAIL_ENDPOINT}=${recipeId}`
    );

    if (!response.data.meals) {
      throw new Error("Recipe not found");
    }

    const mappedRecipe = this.mapRecipe(response.data.meals[0]);

    return mappedRecipe;
  }

  private mapRecipeCategory(category: Readonly<RecipeCategoryDto>): IRecipeCategory {
    return {
      id: category.idCategory,
      name: category.strCategory,
      thumb: category.strCategoryThumb,
      description: category.strCategoryDescription,
    };
  }

  private mapRecipeSearch(recipe: Readonly<RecipeSearchDto>): IRecipeSearch {
    return {
      id: recipe.idMeal,
      name: recipe.strMeal,
      thumb: recipe.strMealThumb,
    };
  }

  private mapRecipe(recipe: Readonly<RecipeDto>): IRecipe {
    return {
      id: recipe.idMeal,
      name: recipe.strMeal,
      alternateName: recipe.strMealAlternate,
      category: recipe.strCategory,
      area: recipe.strArea,
      instructions: recipe.strInstructions,
      thumb: recipe.strMealThumb,
      tags: recipe.strTags,
      youtube: recipe.strYoutube,
      ingredient1: recipe.strIngredient1,
      ingredient2: recipe.strIngredient2,
      ingredient3: recipe.strIngredient3,
      ingredient4: recipe.strIngredient4,
      ingredient5: recipe.strIngredient5,
      ingredient6: recipe.strIngredient6,
      ingredient7: recipe.strIngredient7,
      ingredient8: recipe.strIngredient8,
      ingredient9: recipe.strIngredient9,
      ingredient10: recipe.strIngredient10,
      ingredient11: recipe.strIngredient11,
      ingredient12: recipe.strIngredient12,
      ingredient13: recipe.strIngredient13,
      ingredient14: recipe.strIngredient14,
      ingredient15: recipe.strIngredient15,
      ingredient16: recipe.strIngredient16,
      ingredient17: recipe.strIngredient17,
      ingredient18: recipe.strIngredient18,
      ingredient19: recipe.strIngredient19,
      ingredient20: recipe.strIngredient20,
      measure1: recipe.strMeasure1,
      measure2: recipe.strMeasure2,
      measure3: recipe.strMeasure3,
      measure4: recipe.strMeasure4,
      measure5: recipe.strMeasure5,
      measure6: recipe.strMeasure6,
      measure7: recipe.strMeasure7,
      measure8: recipe.strMeasure8,
      measure9: recipe.strMeasure9,
      measure10: recipe.strMeasure10,
      measure11: recipe.strMeasure11,
      measure12: recipe.strMeasure12,
      measure13: recipe.strMeasure13,
      measure14: recipe.strMeasure14,
      measure15: recipe.strMeasure15,
      measure16: recipe.strMeasure16,
      measure17: recipe.strMeasure17,
      measure18: recipe.strMeasure18,
      measure19: recipe.strMeasure19,
      measure20: recipe.strMeasure20,
      source: recipe.strSource,
      imageSource: recipe.strImageSource,
      creativeCommonsConfirmed: recipe.strCreativeCommonsConfirmed,
      dateModified: recipe.dateModified,
    };
  }
}
