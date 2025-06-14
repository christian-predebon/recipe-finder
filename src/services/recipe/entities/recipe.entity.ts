export interface IRecipeIngredient {
  ingredient: string | null;
  measure: string | null;
}

export interface IRecipe {
  id: string;
  name: string;
  alternateName: string | null;
  category: string;
  area: string;
  instructions: string;
  thumb: string;
  tags: string;
  youtube: string;
  ingredient1: string;
  ingredient2: string;
  ingredient3: string;
  ingredient4: string;
  ingredient5: string;
  ingredient6: string;
  ingredient7: string;
  ingredient8: string;
  ingredient9: string;
  ingredient10: string;
  ingredient11: string;
  ingredient12: string;
  ingredient13: string;
  ingredient14: string;
  ingredient15: string;
  ingredient16: string | null;
  ingredient17: string | null;
  ingredient18: string | null;
  ingredient19: string | null;
  ingredient20: string | null;
  measure1: string;
  measure2: string;
  measure3: string;
  measure4: string;
  measure5: string;
  measure6: string;
  measure7: string;
  measure8: string;
  measure9: string;
  measure10: string;
  measure11: string;
  measure12: string;
  measure13: string;
  measure14: string;
  measure15: string;
  measure16: string | null;
  measure17: string | null;
  measure18: string | null;
  measure19: string | null;
  measure20: string | null;
  source: string | null;
  imageSource: string | null;
  creativeCommonsConfirmed: string | null;
  dateModified: string | null;

  ingredients?: IRecipeIngredient[];
}
