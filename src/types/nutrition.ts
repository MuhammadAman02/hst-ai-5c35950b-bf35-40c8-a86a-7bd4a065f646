export interface NutritionInfo {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  fiber: number;
  vitaminC: number;
  vitaminD: number;
  calcium: number;
  iron: number;
  potassium: number;
}

export interface NutritionTargets extends NutritionInfo {}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  nutritionPer100g: NutritionInfo;
  commonServingSize: number;
  unit: string;
}

export interface MealIngredient {
  ingredient: Ingredient;
  amount: number;
}

export interface MealSuggestion {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  difficulty: string;
  prepTime: number;
  reason: string;
  ingredients: MealIngredient[];
  totalNutrition: NutritionInfo;
  instructions?: string[];
}

export interface DailyProgress {
  current: NutritionInfo;
  targets: NutritionTargets;
  remaining: NutritionInfo;
}