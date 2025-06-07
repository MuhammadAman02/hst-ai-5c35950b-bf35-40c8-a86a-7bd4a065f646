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
  ingredients: MealIngredient[];
  totalNutrition: NutritionInfo;
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  targetNutrient?: 'protein' | 'carbs' | 'fats' | 'fiber' | 'vitaminC' | 'vitaminD' | 'calcium' | 'iron' | 'potassium' | 'balanced';
  reason?: string;
}

export interface DailyProgress {
  current: NutritionInfo;
  targets: NutritionTargets;
  remaining: NutritionInfo;
}