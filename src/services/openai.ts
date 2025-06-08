import { MealSuggestion } from '../types/nutrition';
import { ingredients } from '../data/ingredients';

// Check if OpenAI API key is available
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateAIMealWithOpenAI = async (
  userInput: string,
  mealType: string,
  targets: { protein: number; carbs: number; fats: number; calories: number }
): Promise<MealSuggestion> => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY environment variable.');
  }

  console.log('Generating meal with OpenAI:', { userInput, mealType, targets });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional nutritionist and chef. Create a detailed meal plan based on user preferences and specific nutritional targets. 

Available ingredients: ${ingredients.map(ing => `${ing.name} (${ing.category})`).join(', ')}

Respond with a JSON object containing:
- name: Creative meal name
- cuisine: Detected cuisine type
- difficulty: Easy/Medium/Hard
- prepTime: Minutes to prepare
- reason: Why this meal fits their request and nutrition goals
- selectedIngredients: Array of ingredient names from the available list
- portions: Array of amounts in grams for each ingredient
- instructions: Array of cooking steps

Focus on meeting these nutrition targets: ${targets.protein}g protein, ${targets.carbs}g carbs, ${targets.fats}g fats, ${targets.calories} calories.`
          },
          {
            role: 'user',
            content: `I want ${userInput} for ${mealType}. Please create a meal that meets my nutrition targets.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the AI response
    const mealData = JSON.parse(aiResponse);
    
    // Convert to our meal format
    const mealIngredients = mealData.selectedIngredients.map((ingredientName: string, index: number) => {
      const ingredient = ingredients.find(ing => 
        ing.name.toLowerCase().includes(ingredientName.toLowerCase()) ||
        ingredientName.toLowerCase().includes(ing.name.toLowerCase())
      );
      
      if (!ingredient) {
        // Fallback to first protein source if ingredient not found
        return { ingredient: ingredients.find(ing => ing.category === 'Protein')!, amount: 100 };
      }
      
      return {
        ingredient,
        amount: mealData.portions[index] || 100
      };
    });

    // Calculate total nutrition
    const totalNutrition = mealIngredients.reduce((total, item) => {
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
      id: `openai-${Date.now()}`,
      name: mealData.name,
      category: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      cuisine: mealData.cuisine,
      difficulty: mealData.difficulty,
      prepTime: mealData.prepTime,
      reason: mealData.reason,
      ingredients: mealIngredients,
      totalNutrition,
      instructions: mealData.instructions
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to local AI generation
    const { generateAIMealPlan } = await import('../data/mealPlans');
    const cuisine = extractCuisine(userInput);
    return generateAIMealPlan(cuisine, mealType, targets);
  }
};

const extractCuisine = (input: string): string => {
  const cuisineKeywords: Record<string, string> = {
    'thai': 'thai',
    'italian': 'italian',
    'mexican': 'mexican',
    'indian': 'indian',
    'mediterranean': 'mediterranean',
    'asian': 'asian',
    'american': 'american'
  };

  const lowerInput = input.toLowerCase();
  for (const [keyword, cuisine] of Object.entries(cuisineKeywords)) {
    if (lowerInput.includes(keyword)) {
      return cuisine;
    }
  }
  return 'american';
};