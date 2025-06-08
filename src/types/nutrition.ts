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
  ingredients: MealIngredient[];
  totalNutrition: NutritionInfo;
  prepTime: number;
  difficulty: string;
  cuisine: string;
  reason?: string;
  instructions?: string[];
}

export interface DailyProgress {
  current: NutritionInfo;
  targets: NutritionTargets;
  remaining: NutritionInfo;
}