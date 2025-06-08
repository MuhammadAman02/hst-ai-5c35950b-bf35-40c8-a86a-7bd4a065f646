import OpenAI from 'openai';
import { MealSuggestion, NutritionInfo } from '../types/nutrition';
import { ingredients } from '../data/ingredients';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

interface MealTargets {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export const generateAIMealWithOpenAI = async (
  userCraving: string,
  mealType: string,
  targets: MealTargets
): Promise<MealSuggestion> => {
  console.log('Generating AI meal with OpenAI:', { userCraving, mealType, targets });

  try {
    // Create a comprehensive prompt for OpenAI
    const prompt = `You are a professional nutritionist and chef. Create a detailed meal plan based on the following requirements:

USER REQUEST: "${userCraving}"
MEAL TYPE: ${mealType}
NUTRITION TARGETS:
- Protein: ${targets.protein}g
- Carbohydrates: ${targets.carbs}g
- Fats: ${targets.fats}g
- Calories: ${targets.calories}

AVAILABLE INGREDIENTS DATABASE:
${ingredients.map(ing => `${ing.name} (${ing.category}): ${ing.nutritionPer100g.protein}g protein, ${ing.nutritionPer100g.carbs}g carbs, ${ing.nutritionPer100g.fats}g fats, ${ing.nutritionPer100g.calories} calories per 100g`).join('\n')}

REQUIREMENTS:
1. Create a meal that satisfies the user's craving while meeting the nutrition targets as closely as possible
2. Use ONLY ingredients from the provided database
3. Calculate exact portions (in grams) to meet the targets
4. Provide a creative, appealing meal name
5. Include step-by-step cooking instructions
6. Explain why this meal is perfect for their request

RESPONSE FORMAT (JSON):
{
  "name": "Creative meal name",
  "cuisine": "cuisine type",
  "difficulty": "Easy/Medium/Hard",
  "prepTime": number_in_minutes,
  "reason": "Why this meal is perfect for their request and nutrition goals",
  "ingredients": [
    {
      "ingredientName": "exact name from database",
      "amount": calculated_grams_needed
    }
  ],
  "instructions": [
    "Step 1 instruction",
    "Step 2 instruction"
  ],
  "nutritionBreakdown": {
    "protein": calculated_total_protein,
    "carbs": calculated_total_carbs,
    "fats": calculated_total_fats,
    "calories": calculated_total_calories
  }
}

Make sure the nutrition breakdown matches the targets as closely as possible while creating a delicious, satisfying meal that fulfills their craving.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional nutritionist and chef who creates perfectly balanced meals that meet specific nutritional requirements while satisfying user cravings. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    console.log('OpenAI response:', response);

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let aiMealData;
    try {
      aiMealData = JSON.parse(response);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      throw new Error('Invalid response format from AI');
    }

    // Map the AI response to our MealSuggestion format
    const mealIngredients = aiMealData.ingredients.map((aiIngredient: any) => {
      const foundIngredient = ingredients.find(ing => 
        ing.name.toLowerCase() === aiIngredient.ingredientName.toLowerCase()
      );
      
      if (!foundIngredient) {
        console.warn(`Ingredient not found in database: ${aiIngredient.ingredientName}`);
        // Use the first ingredient as fallback
        return {
          ingredient: ingredients[0],
          amount: aiIngredient.amount || 100
        };
      }

      return {
        ingredient: foundIngredient,
        amount: aiIngredient.amount || 100
      };
    });

    // Calculate actual nutrition based on ingredients and amounts
    const actualNutrition: NutritionInfo = mealIngredients.reduce((total, item) => {
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

    const aiMeal: MealSuggestion = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: aiMealData.name || 'AI Generated Meal',
      category: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      cuisine: aiMealData.cuisine || 'International',
      difficulty: aiMealData.difficulty || 'Medium',
      prepTime: aiMealData.prepTime || 30,
      reason: aiMealData.reason || `Custom ${mealType} designed to meet your specific nutrition targets while satisfying your craving for "${userCraving}".`,
      ingredients: mealIngredients,
      totalNutrition: actualNutrition,
      instructions: aiMealData.instructions || [
        'Prepare all ingredients according to the specified amounts.',
        'Follow standard cooking methods for the cuisine type.',
        'Combine ingredients to create a balanced, nutritious meal.',
        'Serve and enjoy your perfectly calculated meal!'
      ]
    };

    console.log('Generated AI meal:', aiMeal);
    return aiMeal;

  } catch (error) {
    console.error('Error generating AI meal with OpenAI:', error);
    
    // Fallback to simulated generation if OpenAI fails
    console.log('Falling back to simulated AI generation');
    return generateFallbackMeal(userCraving, mealType, targets);
  }
};

// Fallback function if OpenAI is not available
const generateFallbackMeal = (
  userCraving: string,
  mealType: string,
  targets: MealTargets
): MealSuggestion => {
  console.log('Generating fallback AI meal');
  
  // Extract cuisine from user input
  const cuisine = extractCuisine(userCraving);
  
  // Select appropriate ingredients based on cuisine and targets
  const proteinIngredients = ingredients.filter(ing => ing.category === 'Protein');
  const carbIngredients = ingredients.filter(ing => ing.category === 'Carbs');
  const fatIngredients = ingredients.filter(ing => ing.category === 'Fats');
  
  const selectedProtein = proteinIngredients[Math.floor(Math.random() * proteinIngredients.length)];
  const selectedCarb = carbIngredients[Math.floor(Math.random() * carbIngredients.length)];
  const selectedFat = fatIngredients[Math.floor(Math.random() * fatIngredients.length)];
  
  // Calculate portions to meet targets
  const proteinAmount = Math.round((targets.protein / selectedProtein.nutritionPer100g.protein) * 100);
  const carbAmount = Math.round((targets.carbs / selectedCarb.nutritionPer100g.carbs) * 100);
  const fatAmount = Math.round((targets.fats / selectedFat.nutritionPer100g.fats) * 100);
  
  const mealIngredients = [
    { ingredient: selectedProtein, amount: proteinAmount },
    { ingredient: selectedCarb, amount: carbAmount },
    { ingredient: selectedFat, amount: fatAmount }
  ];
  
  // Calculate total nutrition
  const totalNutrition: NutritionInfo = mealIngredients.reduce((total, item) => {
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
  
  return {
    id: `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: `${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Style ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
    category: mealType.charAt(0).toUpperCase() + mealType.slice(1),
    cuisine: cuisine,
    difficulty: 'Medium',
    prepTime: 25,
    reason: `A delicious ${cuisine} ${mealType} crafted to satisfy your craving while meeting your nutrition targets.`,
    ingredients: mealIngredients,
    totalNutrition,
    instructions: [
      `Prepare ${selectedProtein.name} using traditional ${cuisine} cooking methods.`,
      `Cook ${selectedCarb.name} until tender and flavorful.`,
      `Add ${selectedFat.name} for richness and to complete the nutritional profile.`,
      `Combine all ingredients and season according to ${cuisine} cuisine traditions.`,
      'Serve hot and enjoy your perfectly balanced meal!'
    ]
  };
};

const extractCuisine = (input: string): string => {
  const cuisineKeywords: Record<string, string> = {
    'thai': 'thai',
    'thailand': 'thai',
    'italian': 'italian',
    'italy': 'italian',
    'pasta': 'italian',
    'pizza': 'italian',
    'mexican': 'mexican',
    'mexico': 'mexican',
    'taco': 'mexican',
    'burrito': 'mexican',
    'indian': 'indian',
    'india': 'indian',
    'curry': 'indian',
    'mediterranean': 'mediterranean',
    'greek': 'mediterranean',
    'asian': 'asian',
    'chinese': 'asian',
    'japanese': 'asian',
    'korean': 'asian',
    'american': 'american',
    'burger': 'american'
  };

  const lowerInput = input.toLowerCase();
  for (const [keyword, cuisine] of Object.entries(cuisineKeywords)) {
    if (lowerInput.includes(keyword)) {
      return cuisine;
    }
  }
  return 'international';
};