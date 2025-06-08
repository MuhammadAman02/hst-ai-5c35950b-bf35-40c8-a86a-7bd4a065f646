import { MealSuggestion, NutritionInfo } from '../types/nutrition';
import { ingredients } from './ingredients';

// Helper function to find ingredient by id
const findIngredient = (id: string) => {
  const ingredient = ingredients.find(ing => ing.id === id);
  if (!ingredient) {
    throw new Error(`Ingredient with id ${id} not found`);
  }
  return ingredient;
};

// Helper function to calculate total nutrition for a meal
const calculateTotalNutrition = (mealIngredients: Array<{ ingredient: any; amount: number }>): NutritionInfo => {
  return mealIngredients.reduce((total, item) => {
    const factor = item.amount / 100;
    return {
      protein: total.protein + (item.ingredient.nutritionPer100g.protein * factor),
      carbs: total.carbs + (item.ingredient.nutritionPer100g.carbs * factor),
      fats: total.fats + (item.ingredient.nutritionPer100g.fats * factor),
      calories: total.calories + (item.ingredient.nutritionPer100g.calories * factor),
      fiber: total.fiber + (item.ingredient.nutritionPer100g.fiber * factor),
      vitaminC: total.vitaminC + (item.ingredient.nutritionPer100g.vitaminC * factor),
      vitaminD: total.vitaminD + (item.ingredient.nutritionPer100g.vitaminD * factor),
      calcium: total.calcium + (item.ingredient.nutritionPer100g.calcium * factor),
      iron: total.iron + (item.ingredient.nutritionPer100g.iron * factor),
      potassium: total.potassium + (item.ingredient.nutritionPer100g.potassium * factor)
    };
  }, {
    protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0,
    vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0
  });
};

// Weight Loss Meal Plans (120g protein, 1500 calories)
const weightLossPlans: MealSuggestion[] = [
  {
    id: 'wl-protein-breakfast',
    name: 'High-Protein Breakfast Bowl',
    category: 'Breakfast',
    cuisine: 'American',
    difficulty: 'Easy',
    prepTime: 10,
    reason: 'Perfect breakfast with 30g protein to kickstart your weight loss day',
    ingredients: [
      { ingredient: findIngredient('greek-yogurt'), amount: 200 },
      { ingredient: findIngredient('oats'), amount: 30 },
      { ingredient: findIngredient('almonds'), amount: 15 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('greek-yogurt'), amount: 200 },
      { ingredient: findIngredient('oats'), amount: 30 },
      { ingredient: findIngredient('almonds'), amount: 15 }
    ]),
    instructions: [
      'Mix Greek yogurt with oats in a bowl',
      'Top with chopped almonds',
      'Let sit for 5 minutes to soften oats',
      'Enjoy your protein-packed breakfast!'
    ]
  },
  {
    id: 'wl-chicken-lunch',
    name: 'Grilled Chicken Power Bowl',
    category: 'Lunch',
    cuisine: 'American',
    difficulty: 'Medium',
    prepTime: 25,
    reason: 'High-protein lunch with 45g protein to keep you satisfied and support weight loss',
    ingredients: [
      { ingredient: findIngredient('chicken-breast'), amount: 150 },
      { ingredient: findIngredient('quinoa'), amount: 60 },
      { ingredient: findIngredient('broccoli'), amount: 100 },
      { ingredient: findIngredient('avocado'), amount: 50 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('chicken-breast'), amount: 150 },
      { ingredient: findIngredient('quinoa'), amount: 60 },
      { ingredient: findIngredient('broccoli'), amount: 100 },
      { ingredient: findIngredient('avocado'), amount: 50 }
    ]),
    instructions: [
      'Season and grill chicken breast for 6-8 minutes per side',
      'Cook quinoa according to package instructions',
      'Steam broccoli until tender',
      'Slice avocado and arrange in bowl with other ingredients'
    ]
  },
  {
    id: 'wl-salmon-dinner',
    name: 'Omega-Rich Salmon Plate',
    category: 'Dinner',
    cuisine: 'Mediterranean',
    difficulty: 'Medium',
    prepTime: 20,
    reason: 'Light dinner with 30g protein and healthy fats for evening satisfaction',
    ingredients: [
      { ingredient: findIngredient('salmon'), amount: 120 },
      { ingredient: findIngredient('sweet-potato'), amount: 100 },
      { ingredient: findIngredient('spinach'), amount: 100 },
      { ingredient: findIngredient('olive-oil'), amount: 10 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('salmon'), amount: 120 },
      { ingredient: findIngredient('sweet-potato'), amount: 100 },
      { ingredient: findIngredient('spinach'), amount: 100 },
      { ingredient: findIngredient('olive-oil'), amount: 10 }
    ]),
    instructions: [
      'Bake salmon at 400°F for 12-15 minutes',
      'Roast sweet potato cubes with olive oil',
      'Sauté spinach until wilted',
      'Serve together for a balanced meal'
    ]
  }
];

// Muscle Gain Meal Plans (150g protein, 2200 calories)
const muscleGainPlans: MealSuggestion[] = [
  {
    id: 'mg-power-breakfast',
    name: 'Muscle Building Breakfast',
    category: 'Breakfast',
    cuisine: 'American',
    difficulty: 'Easy',
    prepTime: 15,
    reason: 'High-calorie breakfast with 35g protein to fuel muscle growth',
    ingredients: [
      { ingredient: findIngredient('eggs'), amount: 120 }, // 2 eggs
      { ingredient: findIngredient('oats'), amount: 50 },
      { ingredient: findIngredient('greek-yogurt'), amount: 150 },
      { ingredient: findIngredient('almonds'), amount: 25 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('eggs'), amount: 120 },
      { ingredient: findIngredient('oats'), amount: 50 },
      { ingredient: findIngredient('greek-yogurt'), amount: 150 },
      { ingredient: findIngredient('almonds'), amount: 25 }
    ]),
    instructions: [
      'Scramble eggs with a little olive oil',
      'Prepare oatmeal with water or milk',
      'Serve with Greek yogurt and almonds on the side',
      'Eat together for maximum protein absorption'
    ]
  },
  {
    id: 'mg-chicken-lunch',
    name: 'Muscle Gain Power Lunch',
    category: 'Lunch',
    cuisine: 'American',
    difficulty: 'Medium',
    prepTime: 30,
    reason: 'Massive 50g protein lunch to support serious muscle building goals',
    ingredients: [
      { ingredient: findIngredient('chicken-breast'), amount: 200 },
      { ingredient: findIngredient('brown-rice'), amount: 100 },
      { ingredient: findIngredient('broccoli'), amount: 150 },
      { ingredient: findIngredient('avocado'), amount: 75 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('chicken-breast'), amount: 200 },
      { ingredient: findIngredient('brown-rice'), amount: 100 },
      { ingredient: findIngredient('broccoli'), amount: 150 },
      { ingredient: findIngredient('avocado'), amount: 75 }
    ]),
    instructions: [
      'Grill chicken breast with your favorite seasonings',
      'Cook brown rice according to package directions',
      'Steam broccoli until bright green and tender',
      'Add sliced avocado for healthy fats and calories'
    ]
  }
];

// Maintenance Meal Plans (100g protein, 1800 calories)
const maintenancePlans: MealSuggestion[] = [
  {
    id: 'mt-balanced-breakfast',
    name: 'Balanced Morning Start',
    category: 'Breakfast',
    cuisine: 'American',
    difficulty: 'Easy',
    prepTime: 10,
    reason: 'Perfectly balanced breakfast with 25g protein for maintenance goals',
    ingredients: [
      { ingredient: findIngredient('greek-yogurt'), amount: 150 },
      { ingredient: findIngredient('oats'), amount: 40 },
      { ingredient: findIngredient('almonds'), amount: 20 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('greek-yogurt'), amount: 150 },
      { ingredient: findIngredient('oats'), amount: 40 },
      { ingredient: findIngredient('almonds'), amount: 20 }
    ]),
    instructions: [
      'Combine Greek yogurt with oats',
      'Top with chopped almonds',
      'Mix well and enjoy immediately',
      'Perfect balance of protein, carbs, and healthy fats'
    ]
  },
  {
    id: 'mt-salmon-lunch',
    name: 'Mediterranean Salmon Bowl',
    category: 'Lunch',
    cuisine: 'Mediterranean',
    difficulty: 'Medium',
    prepTime: 25,
    reason: 'Balanced lunch with 35g protein and healthy Mediterranean flavors',
    ingredients: [
      { ingredient: findIngredient('salmon'), amount: 120 },
      { ingredient: findIngredient('quinoa'), amount: 70 },
      { ingredient: findIngredient('bell-pepper'), amount: 100 },
      { ingredient: findIngredient('olive-oil'), amount: 12 }
    ],
    totalNutrition: calculateTotalNutrition([
      { ingredient: findIngredient('salmon'), amount: 120 },
      { ingredient: findIngredient('quinoa'), amount: 70 },
      { ingredient: findIngredient('bell-pepper'), amount: 100 },
      { ingredient: findIngredient('olive-oil'), amount: 12 }
    ]),
    instructions: [
      'Pan-sear salmon with herbs and lemon',
      'Cook quinoa until fluffy',
      'Roast bell peppers with olive oil',
      'Combine in a bowl for a Mediterranean feast'
    ]
  }
];

export const presetMealPlans = {
  'weight-loss': weightLossPlans,
  'muscle-gain': muscleGainPlans,
  'maintenance': maintenancePlans
};

// AI Meal Generation Function
export const generateAIMealPlan = async (
  cuisine: string,
  mealType: string,
  targets: { protein: number; carbs: number; fats: number; calories: number }
): Promise<MealSuggestion> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  const cuisineIngredients = {
    thai: ['chicken-breast', 'brown-rice', 'bell-pepper', 'spinach'],
    italian: ['chicken-breast', 'quinoa', 'broccoli', 'olive-oil'],
    mexican: ['chicken-breast', 'sweet-potato', 'bell-pepper', 'avocado'],
    mediterranean: ['salmon', 'quinoa', 'spinach', 'olive-oil'],
    american: ['chicken-breast', 'brown-rice', 'broccoli', 'almonds'],
    indian: ['chicken-breast', 'brown-rice', 'spinach', 'olive-oil'],
    asian: ['salmon', 'brown-rice', 'broccoli', 'bell-pepper']
  };

  const selectedIngredients = cuisineIngredients[cuisine as keyof typeof cuisineIngredients] || cuisineIngredients.american;
  
  // Calculate portions to meet targets
  const mealIngredients = selectedIngredients.map((id, index) => {
    const ingredient = findIngredient(id);
    let amount = 100; // Base amount
    
    // Adjust amounts based on targets and ingredient type
    if (ingredient.category === 'Protein') {
      amount = Math.round((targets.protein * 0.6) / (ingredient.nutritionPer100g.protein / 100));
    } else if (ingredient.category === 'Carbs') {
      amount = Math.round((targets.carbs * 0.5) / (ingredient.nutritionPer100g.carbs / 100));
    } else if (ingredient.category === 'Fats') {
      amount = Math.round((targets.fats * 0.4) / (ingredient.nutritionPer100g.fats / 100));
    }
    
    return { ingredient, amount: Math.min(Math.max(amount, 50), 200) };
  });

  const totalNutrition = calculateTotalNutrition(mealIngredients);

  return {
    id: `ai-${cuisine}-${mealType}-${Date.now()}`,
    name: `AI ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
    category: mealType.charAt(0).toUpperCase() + mealType.slice(1),
    cuisine: cuisine.charAt(0).toUpperCase() + cuisine.slice(1),
    difficulty: 'Medium',
    prepTime: 25,
    reason: `Custom ${cuisine} ${mealType} designed to provide ${targets.protein.toFixed(0)}g protein and ${targets.calories.toFixed(0)} calories`,
    ingredients: mealIngredients,
    totalNutrition,
    instructions: [
      `Prepare your ${cuisine} ${mealType} with authentic flavors`,
      'Cook protein source with traditional seasonings',
      'Prepare carbohydrates according to cuisine style',
      'Combine ingredients with appropriate spices and herbs',
      'Serve hot and enjoy your custom meal!'
    ]
  };
};