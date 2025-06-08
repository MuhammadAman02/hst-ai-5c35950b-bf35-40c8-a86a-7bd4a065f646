import { MealSuggestion, NutritionInfo } from '../types/nutrition';
import { ingredients } from './ingredients';

// Complete preset meal plans that automatically meet specific nutritional targets
export const presetMealPlans: Record<string, MealSuggestion[]> = {
  'weight-loss': [
    // Breakfast Plans
    {
      id: 'wl-breakfast-1',
      name: 'High-Protein Breakfast Power Bowl',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Eggs')!, amount: 150 }, // 3 eggs
        { ingredient: ingredients.find(i => i.name === 'Spinach')!, amount: 100 },
        { ingredient: ingredients.find(i => i.name === 'Avocado')!, amount: 60 },
        { ingredient: ingredients.find(i => i.name === 'Greek Yogurt')!, amount: 100 }
      ],
      totalNutrition: {
        protein: 35.2,
        carbs: 12.8,
        fats: 28.4,
        calories: 425,
        fiber: 8.2,
        vitaminC: 45,
        vitaminD: 12,
        calcium: 280,
        iron: 4.5,
        potassium: 850
      },
      prepTime: 15,
      difficulty: 'Easy',
      category: 'Breakfast',
      targetNutrient: 'protein',
      reason: 'Perfect weight loss breakfast with 35g protein to keep you full and energized all morning.',
      cuisine: 'American',
      instructions: [
        'Scramble eggs with spinach in a non-stick pan',
        'Serve with sliced avocado and Greek yogurt on the side',
        'Season with herbs and spices to taste'
      ]
    },
    {
      id: 'wl-breakfast-2',
      name: 'Metabolism Boost Smoothie Bowl',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Greek Yogurt')!, amount: 200 },
        { ingredient: ingredients.find(i => i.name === 'Blueberries')!, amount: 100 },
        { ingredient: ingredients.find(i => i.name === 'Almonds')!, amount: 25 },
        { ingredient: ingredients.find(i => i.name === 'Oats')!, amount: 30 }
      ],
      totalNutrition: {
        protein: 28.5,
        carbs: 35.2,
        fats: 18.7,
        calories: 385,
        fiber: 9.1,
        vitaminC: 65,
        vitaminD: 8,
        calcium: 320,
        iron: 3.2,
        potassium: 680
      },
      prepTime: 10,
      difficulty: 'Easy',
      category: 'Breakfast',
      targetNutrient: 'balanced',
      reason: 'Antioxidant-rich breakfast that boosts metabolism and provides sustained energy.',
      cuisine: 'Health',
      instructions: [
        'Blend Greek yogurt with half the blueberries',
        'Pour into bowl and top with remaining blueberries, almonds, and oats',
        'Drizzle with honey if desired'
      ]
    },

    // Lunch Plans
    {
      id: 'wl-lunch-1',
      name: 'Lean Protein Power Salad',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Chicken Breast')!, amount: 150 },
        { ingredient: ingredients.find(i => i.name === 'Spinach')!, amount: 150 },
        { ingredient: ingredients.find(i => i.name === 'Quinoa')!, amount: 60 },
        { ingredient: ingredients.find(i => i.name === 'Avocado')!, amount: 50 }
      ],
      totalNutrition: {
        protein: 42.8,
        carbs: 28.5,
        fats: 15.2,
        calories: 395,
        fiber: 8.8,
        vitaminC: 55,
        vitaminD: 2,
        calcium: 180,
        iron: 5.2,
        potassium: 920
      },
      prepTime: 20,
      difficulty: 'Easy',
      category: 'Lunch',
      targetNutrient: 'protein',
      reason: 'Complete protein-packed lunch with 43g protein to maintain muscle during weight loss.',
      cuisine: 'Mediterranean',
      instructions: [
        'Grill chicken breast with herbs and spices',
        'Cook quinoa according to package instructions',
        'Assemble salad with spinach, quinoa, sliced chicken, and avocado',
        'Dress with lemon and olive oil'
      ]
    },

    // Dinner Plans
    {
      id: 'wl-dinner-1',
      name: 'Omega-Rich Salmon Plate',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Salmon')!, amount: 150 },
        { ingredient: ingredients.find(i => i.name === 'Broccoli')!, amount: 200 },
        { ingredient: ingredients.find(i => i.name === 'Sweet Potato')!, amount: 100 }
      ],
      totalNutrition: {
        protein: 38.5,
        carbs: 25.8,
        fats: 18.9,
        calories: 395,
        fiber: 7.2,
        vitaminC: 180,
        vitaminD: 15,
        calcium: 150,
        iron: 3.8,
        potassium: 1250
      },
      prepTime: 25,
      difficulty: 'Medium',
      category: 'Dinner',
      targetNutrient: 'balanced',
      reason: 'Perfect weight loss dinner with omega-3s and complete nutrition profile.',
      cuisine: 'American',
      instructions: [
        'Bake salmon with lemon and herbs at 400°F for 15 minutes',
        'Steam broccoli until tender-crisp',
        'Roast sweet potato cubes until golden',
        'Serve together with fresh herbs'
      ]
    }
  ],

  'muscle-gain': [
    // Breakfast Plans
    {
      id: 'mg-breakfast-1',
      name: 'Muscle Builder Breakfast Stack',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Oats')!, amount: 80 },
        { ingredient: ingredients.find(i => i.name === 'Greek Yogurt')!, amount: 200 },
        { ingredient: ingredients.find(i => i.name === 'Banana')!, amount: 150 },
        { ingredient: ingredients.find(i => i.name === 'Almonds')!, amount: 30 },
        { ingredient: ingredients.find(i => i.name === 'Eggs')!, amount: 100 }
      ],
      totalNutrition: {
        protein: 45.2,
        carbs: 68.5,
        fats: 25.8,
        calories: 650,
        fiber: 12.5,
        vitaminC: 25,
        vitaminD: 15,
        calcium: 420,
        iron: 6.8,
        potassium: 1150
      },
      prepTime: 20,
      difficulty: 'Easy',
      category: 'Breakfast',
      targetNutrient: 'protein',
      reason: 'High-calorie, high-protein breakfast with 45g protein for serious muscle building.',
      cuisine: 'American',
      instructions: [
        'Cook oats with milk or water',
        'Scramble eggs separately',
        'Layer oats, Greek yogurt, sliced banana, and almonds',
        'Serve with scrambled eggs on the side'
      ]
    },

    // Lunch Plans
    {
      id: 'mg-lunch-1',
      name: 'Mass Gainer Chicken Bowl',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Chicken Breast')!, amount: 200 },
        { ingredient: ingredients.find(i => i.name === 'Brown Rice')!, amount: 120 },
        { ingredient: ingredients.find(i => i.name === 'Avocado')!, amount: 80 },
        { ingredient: ingredients.find(i => i.name === 'Black Beans')!, amount: 100 }
      ],
      totalNutrition: {
        protein: 52.8,
        carbs: 58.2,
        fats: 22.5,
        calories: 615,
        fiber: 15.2,
        vitaminC: 35,
        vitaminD: 3,
        calcium: 180,
        iron: 8.5,
        potassium: 1350
      },
      prepTime: 25,
      difficulty: 'Easy',
      category: 'Lunch',
      targetNutrient: 'protein',
      reason: 'Calorie-dense lunch with 53g protein and complex carbs for muscle growth.',
      cuisine: 'Mexican',
      instructions: [
        'Grill seasoned chicken breast',
        'Cook brown rice with spices',
        'Heat black beans with cumin and garlic',
        'Assemble bowl with rice, chicken, beans, and avocado'
      ]
    }
  ],

  'maintenance': [
    // Balanced meal plans for maintenance
    {
      id: 'mt-breakfast-1',
      name: 'Balanced Morning Fuel',
      ingredients: [
        { ingredient: ingredients.find(i => i.name === 'Oats')!, amount: 60 },
        { ingredient: ingredients.find(i => i.name === 'Greek Yogurt')!, amount: 150 },
        { ingredient: ingredients.find(i => i.name === 'Blueberries')!, amount: 80 },
        { ingredient: ingredients.find(i => i.name === 'Almonds')!, amount: 20 }
      ],
      totalNutrition: {
        protein: 25.8,
        carbs: 42.5,
        fats: 15.2,
        calories: 385,
        fiber: 8.5,
        vitaminC: 45,
        vitaminD: 8,
        calcium: 280,
        iron: 3.8,
        potassium: 650
      },
      prepTime: 10,
      difficulty: 'Easy',
      category: 'Breakfast',
      targetNutrient: 'balanced',
      reason: 'Perfectly balanced breakfast for maintaining current weight and energy levels.',
      cuisine: 'Health',
      instructions: [
        'Cook oats with milk',
        'Top with Greek yogurt and blueberries',
        'Sprinkle with chopped almonds',
        'Add cinnamon for extra flavor'
      ]
    }
  ]
};

// AI-generated meal suggestions based on cuisine preferences
export const generateAIMealPlan = async (
  cuisine: string, 
  mealType: string, 
  targetNutrition: { protein: number; carbs: number; fats: number; calories: number },
  preferences?: string[]
): Promise<MealSuggestion> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const cuisineIngredients = getCuisineIngredients(cuisine);
  const mealIngredients = optimizeIngredientsForTargets(cuisineIngredients, targetNutrition, mealType);
  
  const totalNutrition = calculateTotalNutrition(mealIngredients);
  
  return {
    id: `ai-${cuisine}-${mealType}-${Date.now()}`,
    name: generateMealName(cuisine, mealType),
    ingredients: mealIngredients,
    totalNutrition,
    prepTime: estimatePrepTime(mealIngredients.length),
    difficulty: estimateDifficulty(cuisine),
    category: mealType,
    targetNutrient: 'balanced',
    reason: `AI-generated ${cuisine} ${mealType} perfectly calibrated to your nutritional targets with ${totalNutrition.protein.toFixed(1)}g protein.`,
    cuisine,
    instructions: generateInstructions(cuisine, mealIngredients),
    isAIGenerated: true
  };
};

const getCuisineIngredients = (cuisine: string) => {
  const cuisineMap: Record<string, string[]> = {
    'thai': ['Chicken Breast', 'Brown Rice', 'Broccoli', 'Spinach', 'Coconut Oil'],
    'italian': ['Chicken Breast', 'Quinoa', 'Spinach', 'Olive Oil', 'Sweet Potato'],
    'mexican': ['Chicken Breast', 'Black Beans', 'Avocado', 'Sweet Potato', 'Spinach'],
    'indian': ['Chicken Breast', 'Quinoa', 'Spinach', 'Greek Yogurt', 'Sweet Potato'],
    'mediterranean': ['Salmon', 'Quinoa', 'Spinach', 'Olive Oil', 'Sweet Potato'],
    'asian': ['Salmon', 'Brown Rice', 'Broccoli', 'Spinach', 'Sesame Oil'],
    'american': ['Chicken Breast', 'Sweet Potato', 'Broccoli', 'Avocado', 'Eggs']
  };

  const ingredientNames = cuisineMap[cuisine.toLowerCase()] || cuisineMap['american'];
  return ingredientNames.map(name => ingredients.find(ing => ing.name === name)!).filter(Boolean);
};

const optimizeIngredientsForTargets = (
  availableIngredients: any[], 
  targets: { protein: number; carbs: number; fats: number; calories: number },
  mealType: string
) => {
  const mealIngredients: { ingredient: any; amount: number }[] = [];
  
  // Get primary protein source
  const proteinSource = availableIngredients.find(ing => ing.category === 'Protein');
  if (proteinSource) {
    const proteinAmount = Math.round((targets.protein / proteinSource.nutritionPer100g.protein) * 100);
    mealIngredients.push({ ingredient: proteinSource, amount: Math.min(proteinAmount, 250) });
  }

  // Get carb source
  const carbSource = availableIngredients.find(ing => ing.category === 'Carbs');
  if (carbSource) {
    const carbAmount = Math.round((targets.carbs * 0.6 / carbSource.nutritionPer100g.carbs) * 100);
    mealIngredients.push({ ingredient: carbSource, amount: Math.min(carbAmount, 150) });
  }

  // Get vegetable
  const vegetable = availableIngredients.find(ing => ing.category === 'Vegetables');
  if (vegetable) {
    mealIngredients.push({ ingredient: vegetable, amount: 150 });
  }

  // Get fat source
  const fatSource = availableIngredients.find(ing => ing.category === 'Fats');
  if (fatSource) {
    const fatAmount = Math.round((targets.fats * 0.5 / fatSource.nutritionPer100g.fats) * 100);
    mealIngredients.push({ ingredient: fatSource, amount: Math.min(fatAmount, 100) });
  }

  return mealIngredients;
};

const calculateTotalNutrition = (mealIngredients: { ingredient: any; amount: number }[]): NutritionInfo => {
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
  }, { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0 });
};

const generateMealName = (cuisine: string, mealType: string): string => {
  const cuisineNames: Record<string, string[]> = {
    'thai': ['Thai Basil Power Bowl', 'Coconut Curry Protein Plate', 'Thai-Spiced Nutrition Bowl'],
    'italian': ['Mediterranean Protein Plate', 'Italian Herb Bowl', 'Tuscan Power Meal'],
    'mexican': ['Mexican Fiesta Bowl', 'Southwestern Power Plate', 'Aztec Nutrition Bowl'],
    'indian': ['Spiced Protein Curry Bowl', 'Indian Fusion Plate', 'Masala Power Bowl'],
    'mediterranean': ['Greek Power Bowl', 'Mediterranean Feast Plate', 'Aegean Nutrition Bowl'],
    'asian': ['Asian Fusion Bowl', 'Oriental Power Plate', 'Zen Nutrition Bowl'],
    'american': ['All-American Power Plate', 'Classic Nutrition Bowl', 'Hometown Hero Meal']
  };

  const names = cuisineNames[cuisine.toLowerCase()] || cuisineNames['american'];
  return names[Math.floor(Math.random() * names.length)];
};

const generateInstructions = (cuisine: string, ingredients: any[]): string[] => {
  const baseInstructions = [
    'Prepare all ingredients by washing and chopping as needed',
    'Cook protein source with appropriate seasonings',
    'Prepare carbohydrate base according to package instructions',
    'Sauté or steam vegetables until tender-crisp',
    'Combine all components and serve hot'
  ];

  const cuisineSpecific: Record<string, string[]> = {
    'thai': [
      'Marinate protein in Thai spices and fish sauce',
      'Cook with coconut oil and Thai basil',
      'Add lime juice and chili for authentic flavor',
      'Garnish with fresh herbs and crushed peanuts'
    ],
    'mexican': [
      'Season with cumin, chili powder, and lime',
      'Cook with onions and garlic',
      'Add fresh cilantro and jalapeños',
      'Serve with lime wedges'
    ],
    'italian': [
      'Season with Italian herbs and garlic',
      'Use olive oil for cooking',
      'Add fresh basil and oregano',
      'Finish with a drizzle of balsamic vinegar'
    ]
  };

  return cuisineSpecific[cuisine.toLowerCase()] || baseInstructions;
};

const estimatePrepTime = (ingredientCount: number): number => {
  return Math.max(15, ingredientCount * 5);
};

const estimateDifficulty = (cuisine: string): 'Easy' | 'Medium' | 'Hard' => {
  const complexCuisines = ['thai', 'indian', 'italian'];
  return complexCuisines.includes(cuisine.toLowerCase()) ? 'Medium' : 'Easy';
};