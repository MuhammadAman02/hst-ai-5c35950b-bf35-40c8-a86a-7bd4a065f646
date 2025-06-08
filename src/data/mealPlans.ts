import { MealSuggestion, NutritionInfo } from '../types/nutrition';
import { ingredients } from './ingredients';

// Helper function to find ingredient by ID
const findIngredient = (id: string) => {
  const ingredient = ingredients.find(ing => ing.id === id);
  if (!ingredient) {
    throw new Error(`Ingredient with id ${id} not found`);
  }
  return ingredient;
};

// Helper function to calculate total nutrition for a meal
const calculateMealNutrition = (mealIngredients: Array<{ ingredientId: string; amount: number }>): NutritionInfo => {
  const total: NutritionInfo = {
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
    fiber: 0,
    vitaminC: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0
  };

  mealIngredients.forEach(({ ingredientId, amount }) => {
    const ingredient = findIngredient(ingredientId);
    const factor = amount / 100;
    
    Object.keys(total).forEach(key => {
      total[key as keyof NutritionInfo] += ingredient.nutritionPer100g[key as keyof NutritionInfo] * factor;
    });
  });

  return total;
};

// Preset meal plans for different goals
export const presetMealPlans: Record<string, MealSuggestion[]> = {
  'weight-loss': [
    {
      id: 'wl-protein-power-breakfast',
      name: 'Protein Power Breakfast',
      category: 'Breakfast',
      cuisine: 'American',
      difficulty: 'Easy',
      prepTime: 10,
      reason: 'High protein breakfast to kickstart your metabolism and keep you full',
      ingredients: [
        { ingredient: findIngredient('greek-yogurt'), amount: 200 },
        { ingredient: findIngredient('almonds'), amount: 20 },
        { ingredient: findIngredient('spinach'), amount: 50 }
      ],
      totalNutrition: calculateMealNutrition([
        { ingredientId: 'greek-yogurt', amount: 200 },
        { ingredientId: 'almonds', amount: 20 },
        { ingredientId: 'spinach', amount: 50 }
      ]),
      instructions: [
        'Mix Greek yogurt in a bowl',
        'Add chopped almonds on top',
        'Add fresh spinach leaves',
        'Mix gently and enjoy'
      ]
    },
    {
      id: 'wl-lean-lunch',
      name: 'Lean Chicken Power Bowl',
      category: 'Lunch',
      cuisine: 'Mediterranean',
      difficulty: 'Medium',
      prepTime: 25,
      reason: 'Perfect balance of lean protein and complex carbs for sustained energy',
      ingredients: [
        { ingredient: findIngredient('chicken-breast'), amount: 150 },
        { ingredient: findIngredient('quinoa'), amount: 60 },
        { ingredient: findIngredient('broccoli'), amount: 100 },
        { ingredient: findIngredient('avocado'), amount: 50 }
      ],
      totalNutrition: calculateMealNutrition([
        { ingredientId: 'chicken-breast', amount: 150 },
        { ingredientId: 'quinoa', amount: 60 },
        { ingredientId: 'broccoli', amount: 100 },
        { ingredientId: 'avocado', amount: 50 }
      ]),
      instructions: [
        'Cook quinoa according to package instructions',
        'Season and grill chicken breast until cooked through',
        'Steam broccoli until tender',
        'Slice avocado',
        'Combine all ingredients in a bowl and serve'
      ]
    },
    {
      id: 'wl-omega-dinner',
      name: 'Omega-Rich Salmon Dinner',
      category: 'Dinner',
      cuisine: 'Nordic',
      difficulty: 'Medium',
      prepTime: 20,
      reason: 'Rich in omega-3 fatty acids and high-quality protein for recovery',
      ingredients: [
        { ingredient: findIngredient('salmon'), amount: 120 },
        { ingredient: findIngredient('sweet-potato'), amount: 150 },
        { ingredient: findIngredient('spinach'), amount: 100 }
      ],
      totalNutrition: calculateMealNutrition([
        { ingredientId: 'salmon', amount: 120 },
        { ingredientId: 'sweet-potato', amount: 150 },
        { ingredientId: 'spinach', amount: 100 }
      ]),
      instructions: [
        'Preheat oven to 400°F (200°C)',
        'Roast sweet potato for 25 minutes',
        'Pan-sear salmon for 4-5 minutes each side',
        'Sauté spinach with garlic',
        'Plate and serve hot'
      ]
    }
  ],
  'muscle-gain': [
    {
      id: 'mg-power-breakfast',
      name: 'Muscle Building Breakfast',
      category: 'Breakfast',
      cuisine: 'American',
      difficulty: 'Easy',
      prepTime: 15,
      reason: 'High protein and carbs to fuel your workouts and muscle growth',
      ingredients: [
        { ingredient: findIngredient('greek-yogurt'), amount: 250 },
        { ingredient: findIngredient('almonds'), amount: 40 },
        { ingredient: findIngredient('quinoa'), amount: 50 }
      ],
      totalNutrition: calculateMealNutrition([
        { ingredientId: 'greek-yogurt', amount: 250 },
        { ingredientId: 'almonds', amount: 40 },
        { ingredientId: 'quinoa', amount: 50 }
      ]),
      instructions: [
        'Cook quinoa and let it cool',
        'Mix Greek yogurt with cooked quinoa',
        'Top with chopped almonds',
        'Add a drizzle of honey if desired'
      ]
    },
    {
      id: 'mg-power-lunch',
      name: 'Muscle Gain Power Lunch',
      category: 'Lunch',
      cuisine: 'American',
      difficulty: 'Medium',
      prepTime: 30,
      reason: 'Maximum protein and complex carbs for serious muscle building',
      ingredients: [
        { ingredient: findIngredient('chicken-breast'), amount: 200 },
        { ingredient: findIngredient('brown-rice'), amount: 80 },
        { ingredient: findIngredient('avocado'), amount: 80 },
        { ingredient: findIngredient('broccoli'), amount: 150 }
      ],
      totalNutrition: calculateMealNutrition([
        { ingredientId: 'chicken-breast', amount: 200 },
        { ingredientId: 'brown-rice', amount: 80 },
        { ingredientId: 'avocado', amount: 80 },
        { ingredientId: 'broccoli', amount: 150 }
      ]),
      instructions: [
        'Cook brown rice according to package instructions',
        'Season and grill chicken breast',
        'Steam broccoli until tender',
        'Slice avocado',
        'Combine all ingredients and serve'
      ]
    }
  ],
  'maintenance': [
    {
      id: 'mt-balanced-breakfast',
      name: 'Balanced Morning Bowl',
      category: 'Breakfast',
      cuisine: 'Mediterranean',
      difficulty: 'Easy',
      prepTime: 10,
      reason: 'Perfect balance of macronutrients to maintain your current weight',
      ingredients: [
        { ingredient: findIngredient('greek-yogurt'), amount: 150 },
        { ingredient: findIngredient('almonds'), amount: 25 },
        { ingredient: findIngredient('spinach'), amount: 75 }
      ],
      totalNutrition: calculateMealNutrition([
        { ingredientId: 'greek-yogurt', amount: 150 },
        { ingredientId: 'almonds', amount: 25 },
        { ingredientId: 'spinach', amount: 75 }
      ]),
      instructions: [
        'Mix Greek yogurt in a bowl',
        'Add fresh spinach',
        'Top with sliced almonds',
        'Enjoy fresh'
      ]
    }
  ]
};

// AI meal generation function
export const generateAIMealPlan = async (
  cuisine: string,
  mealType: string,
  targets: { protein: number; carbs: number; fats: number; calories: number }
): Promise<MealSuggestion> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Select ingredients based on cuisine and targets
  const cuisineIngredients = {
    'thai': ['chicken-breast', 'brown-rice', 'broccoli'],
    'italian': ['salmon', 'quinoa', 'spinach'],
    'mexican': ['chicken-breast', 'sweet-potato', 'avocado'],
    'mediterranean': ['salmon', 'quinoa', 'spinach', 'avocado'],
    'american': ['chicken-breast', 'brown-rice', 'broccoli'],
    'asian': ['salmon', 'brown-rice', 'spinach'],
    'indian': ['chicken-breast', 'quinoa', 'spinach']
  };

  const selectedIngredients = cuisineIngredients[cuisine as keyof typeof cuisineIngredients] || cuisineIngredients.american;
  
  // Calculate portions to meet targets (simplified algorithm)
  const mealIngredients = selectedIngredients.map(id => {
    const ingredient = findIngredient(id);
    let amount = 100; // Base amount
    
    // Adjust based on targets and ingredient type
    if (ingredient.category === 'Protein') {
      amount = Math.round((targets.protein / ingredient.nutritionPer100g.protein) * 100 * 0.6);
    } else if (ingredient.category === 'Carbs') {
      amount = Math.round((targets.carbs / ingredient.nutritionPer100g.carbs) * 100 * 0.5);
    } else if (ingredient.category === 'Fats') {
      amount = Math.round((targets.fats / ingredient.nutritionPer100g.fats) * 100 * 0.4);
    }
    
    // Keep amounts reasonable
    amount = Math.max(50, Math.min(amount, 250));
    
    return { ingredientId: id, amount };
  });

  const cuisineNames = {
    'thai': 'Thai',
    'italian': 'Italian',
    'mexican': 'Mexican',
    'mediterranean': 'Mediterranean',
    'american': 'American',
    'asian': 'Asian',
    'indian': 'Indian'
  };

  const mealName = `AI ${cuisineNames[cuisine as keyof typeof cuisineNames] || 'Fusion'} ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`;

  return {
    id: `ai-${cuisine}-${mealType}-${Date.now()}`,
    name: mealName,
    category: mealType.charAt(0).toUpperCase() + mealType.slice(1),
    cuisine: cuisineNames[cuisine as keyof typeof cuisineNames] || 'Fusion',
    difficulty: 'Medium',
    prepTime: 25,
    reason: `Custom ${cuisine} recipe designed to provide ${targets.protein.toFixed(0)}g protein, ${targets.carbs.toFixed(0)}g carbs, and ${targets.fats.toFixed(0)}g fats`,
    ingredients: mealIngredients.map(({ ingredientId, amount }) => ({
      ingredient: findIngredient(ingredientId),
      amount
    })),
    totalNutrition: calculateMealNutrition(mealIngredients),
    instructions: [
      'Prepare all ingredients according to your preference',
      `Cook using traditional ${cuisine} techniques`,
      'Season with appropriate spices and herbs',
      'Combine all ingredients and serve hot',
      'Enjoy your custom AI-generated meal!'
    ]
  };
};