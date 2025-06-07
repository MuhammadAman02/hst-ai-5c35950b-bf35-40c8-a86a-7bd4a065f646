import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Plus, Sparkles, Target, Zap, Calculator } from 'lucide-react';
import { MealSuggestion, DailyProgress, NutritionInfo, Ingredient } from '../types/nutrition';
import { ingredients } from '../data/ingredients';

interface MealSuggestionsProps {
  progress: DailyProgress;
  onAddMeal: (meal: MealSuggestion) => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ progress, onAddMeal }) => {
  console.log('MealSuggestions rendered with progress:', progress);

  // Calculate optimal portion sizes to meet specific nutritional targets
  const calculateOptimalPortions = (targetNutrient: keyof NutritionInfo, targetAmount: number, primaryIngredients: Ingredient[]): { ingredient: Ingredient; amount: number }[] => {
    const result: { ingredient: Ingredient; amount: number }[] = [];
    let remainingTarget = targetAmount;

    // Sort ingredients by nutrient density for the target nutrient
    const sortedIngredients = [...primaryIngredients].sort((a, b) => 
      b.nutritionPer100g[targetNutrient] - a.nutritionPer100g[targetNutrient]
    );

    for (const ingredient of sortedIngredients) {
      if (remainingTarget <= 0) break;

      const nutrientPer100g = ingredient.nutritionPer100g[targetNutrient];
      if (nutrientPer100g <= 0) continue;

      // Calculate amount needed to get remaining target from this ingredient
      let neededAmount = (remainingTarget / nutrientPer100g) * 100;
      
      // Cap at reasonable serving sizes
      const maxServing = ingredient.commonServingSize * 2.5; // Allow up to 2.5x normal serving
      neededAmount = Math.min(neededAmount, maxServing);
      
      // Round to reasonable portions
      neededAmount = Math.round(neededAmount / 10) * 10; // Round to nearest 10g
      
      if (neededAmount >= 20) { // Only include if meaningful amount
        result.push({ ingredient, amount: neededAmount });
        remainingTarget -= (nutrientPer100g * neededAmount / 100);
      }
    }

    return result;
  };

  // Generate targeted meal suggestions based on remaining nutritional needs
  const generateTargetedMealSuggestions = (): MealSuggestion[] => {
    const remaining = progress.remaining;
    const suggestions: MealSuggestion[] = [];

    console.log('Generating targeted suggestions for remaining nutrients:', remaining);

    // HIGH PROTEIN MEAL - When user needs significant protein (>20g)
    if (remaining.protein > 20) {
      const proteinIngredients = ingredients.filter(ing => 
        ing.category === 'Protein' && ing.nutritionPer100g.protein > 15
      );
      
      const proteinPortions = calculateOptimalPortions('protein', remaining.protein * 0.8, proteinIngredients);
      
      // Add complementary ingredients for a complete meal
      const chickenBreast = ingredients.find(ing => ing.name === 'Chicken Breast');
      const broccoli = ingredients.find(ing => ing.name === 'Broccoli');
      const brownRice = ingredients.find(ing => ing.name === 'Brown Rice');

      if (chickenBreast && broccoli && brownRice) {
        // Calculate chicken amount to provide most of the needed protein
        const chickenAmount = Math.round((remaining.protein * 0.7 / chickenBreast.nutritionPer100g.protein) * 100);
        const finalChickenAmount = Math.min(Math.max(chickenAmount, 100), 300); // Between 100-300g

        const mealIngredients = [
          { ingredient: chickenBreast, amount: finalChickenAmount },
          { ingredient: broccoli, amount: 150 },
          { ingredient: brownRice, amount: 80 }
        ];

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
        }, { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0 });

        suggestions.push({
          id: 'targeted-protein-meal',
          name: `High-Protein Power Meal (${totalNutrition.protein.toFixed(0)}g protein)`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 25,
          difficulty: 'Easy',
          category: 'Lunch',
          targetNutrient: 'protein',
          reason: `Precisely calculated to provide ${totalNutrition.protein.toFixed(1)}g protein - covering ${((totalNutrition.protein / remaining.protein) * 100).toFixed(0)}% of your remaining ${remaining.protein.toFixed(1)}g protein target.`
        });
      }
    }

    // HIGH CARB MEAL - When user needs significant carbs (>30g)
    if (remaining.carbs > 30) {
      const oats = ingredients.find(ing => ing.name === 'Oats');
      const banana = ingredients.find(ing => ing.name === 'Banana');
      const greekYogurt = ingredients.find(ing => ing.name === 'Greek Yogurt');

      if (oats && banana && greekYogurt) {
        // Calculate oats amount to provide most of the needed carbs
        const oatsAmount = Math.round((remaining.carbs * 0.6 / oats.nutritionPer100g.carbs) * 100);
        const finalOatsAmount = Math.min(Math.max(oatsAmount, 50), 120); // Between 50-120g

        const mealIngredients = [
          { ingredient: oats, amount: finalOatsAmount },
          { ingredient: banana, amount: 120 },
          { ingredient: greekYogurt, amount: 150 }
        ];

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
        }, { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0 });

        suggestions.push({
          id: 'targeted-carb-meal',
          name: `Energy Boost Bowl (${totalNutrition.carbs.toFixed(0)}g carbs)`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 10,
          difficulty: 'Easy',
          category: 'Breakfast',
          targetNutrient: 'carbs',
          reason: `Calculated to provide ${totalNutrition.carbs.toFixed(1)}g complex carbs - covering ${((totalNutrition.carbs / remaining.carbs) * 100).toFixed(0)}% of your remaining ${remaining.carbs.toFixed(1)}g carb target.`
        });
      }
    }

    // BALANCED COMPLETION MEAL - When user needs multiple nutrients
    if (remaining.protein > 10 && remaining.carbs > 15 && remaining.fats > 8) {
      const salmon = ingredients.find(ing => ing.name === 'Salmon');
      const sweetPotato = ingredients.find(ing => ing.name === 'Sweet Potato');
      const avocado = ingredients.find(ing => ing.name === 'Avocado');

      if (salmon && sweetPotato && avocado) {
        // Calculate portions to balance all three macros
        const salmonAmount = Math.round((remaining.protein * 0.5 / salmon.nutritionPer100g.protein) * 100);
        const sweetPotatoAmount = Math.round((remaining.carbs * 0.4 / sweetPotato.nutritionPer100g.carbs) * 100);
        const avocadoAmount = Math.round((remaining.fats * 0.4 / avocado.nutritionPer100g.fats) * 100);

        const mealIngredients = [
          { ingredient: salmon, amount: Math.min(Math.max(salmonAmount, 100), 200) },
          { ingredient: sweetPotato, amount: Math.min(Math.max(sweetPotatoAmount, 100), 250) },
          { ingredient: avocado, amount: Math.min(Math.max(avocadoAmount, 50), 150) }
        ];

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
        }, { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0 });

        suggestions.push({
          id: 'targeted-balanced-meal',
          name: `Complete Nutrition Plate`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 30,
          difficulty: 'Medium',
          category: 'Dinner',
          targetNutrient: 'balanced',
          reason: `Balanced meal providing ${totalNutrition.protein.toFixed(1)}g protein, ${totalNutrition.carbs.toFixed(1)}g carbs, and ${totalNutrition.fats.toFixed(1)}g healthy fats to help complete your daily targets.`
        });
      }
    }

    // QUICK PROTEIN SNACK - For smaller protein gaps (10-25g)
    if (remaining.protein > 10 && remaining.protein <= 25) {
      const greekYogurt = ingredients.find(ing => ing.name === 'Greek Yogurt');
      const almonds = ingredients.find(ing => ing.name === 'Almonds');

      if (greekYogurt && almonds) {
        const yogurtAmount = Math.round((remaining.protein * 0.7 / greekYogurt.nutritionPer100g.protein) * 100);
        const finalYogurtAmount = Math.min(Math.max(yogurtAmount, 150), 300);

        const mealIngredients = [
          { ingredient: greekYogurt, amount: finalYogurtAmount },
          { ingredient: almonds, amount: 25 }
        ];

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
        }, { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0 });

        suggestions.push({
          id: 'targeted-protein-snack',
          name: `Protein Power Snack (${totalNutrition.protein.toFixed(0)}g protein)`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 2,
          difficulty: 'Easy',
          category: 'Snack',
          targetNutrient: 'protein',
          reason: `Quick snack providing ${totalNutrition.protein.toFixed(1)}g protein to help reach your remaining ${remaining.protein.toFixed(1)}g protein target.`
        });
      }
    }

    return suggestions.slice(0, 3); // Return max 3 targeted suggestions
  };

  const suggestions = generateTargetedMealSuggestions();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTargetNutrientColor = (nutrient: string) => {
    switch (nutrient) {
      case 'protein': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'carbs': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fats': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vitaminC': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'fiber': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddMeal = (meal: MealSuggestion) => {
    console.log('MealSuggestions: Adding meal:', meal.name);
    console.log('MealSuggestions: onAddMeal function:', typeof onAddMeal);
    
    if (typeof onAddMeal === 'function') {
      onAddMeal(meal);
    } else {
      console.error('onAddMeal is not a function:', onAddMeal);
    }
  };

  return (
    <div className="space-y-4">
      {suggestions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ChefHat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">Excellent progress!</p>
          <p className="text-sm">Your nutrition targets are well balanced.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700">Precision Meal Planning</span>
            <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
              Calculated portions
            </Badge>
          </div>
          
          {suggestions.map(meal => (
            <div key={meal.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:border-emerald-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{meal.name}</h4>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(meal.difficulty)}`}>
                      {meal.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {meal.category}
                    </Badge>
                    {meal.targetNutrient && meal.targetNutrient !== 'balanced' && (
                      <Badge variant="outline" className={`text-xs ${getTargetNutrientColor(meal.targetNutrient)}`}>
                        <Target className="h-3 w-3 mr-1" />
                        {meal.targetNutrient}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                      <Calculator className="h-3 w-3 mr-1" />
                      Calculated
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Clock className="h-4 w-4" />
                    {meal.prepTime} minutes
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Button clicked for meal:', meal.name);
                    handleAddMeal(meal);
                  }}
                  className="gradient-primary hover:shadow-lg text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              {meal.reason && (
                <div className="mb-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-emerald-700 font-medium">{meal.reason}</p>
                  </div>
                </div>
              )}

              <div className="text-sm space-y-3">
                <div>
                  <div className="font-medium text-gray-700 mb-2">Precise Portions:</div>
                  <div className="space-y-1">
                    {meal.ingredients.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-xs bg-gray-50 rounded px-2 py-1">
                        <span className="text-gray-700">{item.ingredient.name}</span>
                        <span className="font-medium text-gray-900">{item.amount}g</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <div className="bg-emerald-50 rounded px-2 py-1 text-center">
                    <div className="text-xs font-medium text-emerald-700">{meal.totalNutrition.protein.toFixed(1)}g</div>
                    <div className="text-xs text-emerald-600">Protein</div>
                  </div>
                  <div className="bg-blue-50 rounded px-2 py-1 text-center">
                    <div className="text-xs font-medium text-blue-700">{meal.totalNutrition.carbs.toFixed(1)}g</div>
                    <div className="text-xs text-blue-600">Carbs</div>
                  </div>
                  <div className="bg-purple-50 rounded px-2 py-1 text-center">
                    <div className="text-xs font-medium text-purple-700">{meal.totalNutrition.fats.toFixed(1)}g</div>
                    <div className="text-xs text-purple-600">Fats</div>
                  </div>
                  <div className="bg-gray-50 rounded px-2 py-1 text-center">
                    <div className="text-xs font-medium text-gray-700">{meal.totalNutrition.calories.toFixed(0)}</div>
                    <div className="text-xs text-gray-600">Cal</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealSuggestions;