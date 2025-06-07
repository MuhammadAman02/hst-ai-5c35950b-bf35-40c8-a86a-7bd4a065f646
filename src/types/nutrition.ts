export interface NutritionTargets {
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

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  nutritionPer100g: NutritionInfo;
  commonServingSize: number;
  unit: string;
}

export interface MealSuggestion {
  id: string;
  name: string;
  ingredients: Array<{
    ingredient: Ingredient;
    amount: number;
  }>;
  totalNutrition: NutritionInfo;
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

export interface DailyProgress {
  current: NutritionInfo;
  targets: NutritionTargets;
  remaining: NutritionInfo;
}