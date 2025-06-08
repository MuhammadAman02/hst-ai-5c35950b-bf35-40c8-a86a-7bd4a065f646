import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, ChefHat, Plus, Sparkles, Target, Zap, Calculator, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { MealSuggestion, DailyProgress, NutritionInfo, Ingredient } from '../types/nutrition';
import { ingredients } from '../data/ingredients';

interface MealSuggestionsProps {
  progress: DailyProgress;
  onAddMeal: (meal: MealSuggestion) => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ progress, onAddMeal }) => {
  console.log('MealSuggestions rendered with progress:', progress);
  const [activeTab, setActiveTab] = useState('breakfast');

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

  // Generate categorized meal suggestions
  const generateCategorizedMealSuggestions = () => {
    const remaining = progress.remaining;
    const suggestions = {
      breakfast: [] as MealSuggestion[],
      lunch: [] as MealSuggestion[],
      dinner: [] as MealSuggestion[],
      snacks: [] as MealSuggestion[]
    };

    console.log('Generating categorized suggestions for remaining nutrients:', remaining);

    // BREAKFAST SUGGESTIONS
    if (remaining.carbs > 20 || remaining.protein > 15) {
      const oats = ingredients.find(ing => ing.name === 'Oats');
      const banana = ingredients.find(ing => ing.name === 'Banana');
      const greekYogurt = ingredients.find(ing => ing.name === 'Greek Yogurt');
      const berries = ingredients.find(ing => ing.name === 'Blueberries');

      if (oats && banana && greekYogurt) {
        const oatsAmount = Math.round((remaining.carbs * 0.4 / oats.nutritionPer100g.carbs) * 100);
        const finalOatsAmount = Math.min(Math.max(oatsAmount, 50), 100);

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

        suggestions.breakfast.push({
          id: 'breakfast-power-bowl',
          name: `Power Breakfast Bowl`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 10,
          difficulty: 'Easy',
          category: 'Breakfast',
          targetNutrient: 'carbs',
          reason: `Perfect morning fuel with ${totalNutrition.carbs.toFixed(1)}g complex carbs and ${totalNutrition.protein.toFixed(1)}g protein to start your day strong.`
        });
      }

      // Protein-focused breakfast
      const eggs = ingredients.find(ing => ing.name === 'Eggs');
      const spinach = ingredients.find(ing => ing.name === 'Spinach');
      const avocado = ingredients.find(ing => ing.name === 'Avocado');

      if (eggs && spinach && avocado && remaining.protein > 20) {
        const mealIngredients = [
          { ingredient: eggs, amount: 150 }, // ~3 eggs
          { ingredient: spinach, amount: 100 },
          { ingredient: avocado, amount: 80 }
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

        suggestions.breakfast.push({
          id: 'breakfast-protein-scramble',
          name: `Protein Power Scramble`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 15,
          difficulty: 'Easy',
          category: 'Breakfast',
          targetNutrient: 'protein',
          reason: `High-protein breakfast with ${totalNutrition.protein.toFixed(1)}g protein to fuel your morning and keep you satisfied.`
        });
      }
    }

    // LUNCH SUGGESTIONS
    if (remaining.protein > 15 || remaining.carbs > 25) {
      const chickenBreast = ingredients.find(ing => ing.name === 'Chicken Breast');
      const brownRice = ingredients.find(ing => ing.name === 'Brown Rice');
      const broccoli = ingredients.find(ing => ing.name === 'Broccoli');

      if (chickenBreast && brownRice && broccoli) {
        const chickenAmount = Math.round((remaining.protein * 0.6 / chickenBreast.nutritionPer100g.protein) * 100);
        const finalChickenAmount = Math.min(Math.max(chickenAmount, 120), 250);

        const mealIngredients = [
          { ingredient: chickenBreast, amount: finalChickenAmount },
          { ingredient: brownRice, amount: 100 },
          { ingredient: broccoli, amount: 150 }
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

        suggestions.lunch.push({
          id: 'lunch-power-bowl',
          name: `Balanced Power Lunch`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 25,
          difficulty: 'Easy',
          category: 'Lunch',
          targetNutrient: 'protein',
          reason: `Complete lunch with ${totalNutrition.protein.toFixed(1)}g protein and ${totalNutrition.carbs.toFixed(1)}g complex carbs for sustained energy.`
        });
      }

      // Quinoa salad option
      const quinoa = ingredients.find(ing => ing.name === 'Quinoa');
      const salmon = ingredients.find(ing => ing.name === 'Salmon');
      const spinach = ingredients.find(ing => ing.name === 'Spinach');

      if (quinoa && salmon && spinach) {
        const mealIngredients = [
          { ingredient: salmon, amount: 150 },
          { ingredient: quinoa, amount: 80 },
          { ingredient: spinach, amount: 100 }
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

        suggestions.lunch.push({
          id: 'lunch-quinoa-salmon',
          name: `Omega-Rich Quinoa Bowl`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 20,
          difficulty: 'Medium',
          category: 'Lunch',
          targetNutrient: 'fats',
          reason: `Nutrient-dense lunch with ${totalNutrition.protein.toFixed(1)}g protein and healthy omega-3 fats from salmon.`
        });
      }
    }

    // DINNER SUGGESTIONS
    if (remaining.protein > 20 || remaining.fats > 15) {
      const salmon = ingredients.find(ing => ing.name === 'Salmon');
      const sweetPotato = ingredients.find(ing => ing.name === 'Sweet Potato');
      const avocado = ingredients.find(ing => ing.name === 'Avocado');

      if (salmon && sweetPotato && avocado) {
        const salmonAmount = Math.round((remaining.protein * 0.5 / salmon.nutritionPer100g.protein) * 100);
        const finalSalmonAmount = Math.min(Math.max(salmonAmount, 150), 250);

        const mealIngredients = [
          { ingredient: salmon, amount: finalSalmonAmount },
          { ingredient: sweetPotato, amount: 200 },
          { ingredient: avocado, amount: 100 }
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

        suggestions.dinner.push({
          id: 'dinner-salmon-plate',
          name: `Premium Salmon Dinner`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 30,
          difficulty: 'Medium',
          category: 'Dinner',
          targetNutrient: 'balanced',
          reason: `Complete dinner with ${totalNutrition.protein.toFixed(1)}g protein and ${totalNutrition.fats.toFixed(1)}g healthy fats for optimal recovery.`
        });
      }
    }

    // SNACK SUGGESTIONS
    if (remaining.protein > 5 && remaining.protein <= 20) {
      const greekYogurt = ingredients.find(ing => ing.name === 'Greek Yogurt');
      const almonds = ingredients.find(ing => ing.name === 'Almonds');
      const berries = ingredients.find(ing => ing.name === 'Blueberries');

      if (greekYogurt && almonds) {
        const mealIngredients = [
          { ingredient: greekYogurt, amount: 150 },
          { ingredient: almonds, amount: 30 }
        ];

        if (berries) {
          mealIngredients.push({ ingredient: berries, amount: 80 });
        }

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

        suggestions.snacks.push({
          id: 'snack-protein-parfait',
          name: `Protein Parfait`,
          ingredients: mealIngredients,
          totalNutrition,
          prepTime: 5,
          difficulty: 'Easy',
          category: 'Snack',
          targetNutrient: 'protein',
          reason: `Perfect snack with ${totalNutrition.protein.toFixed(1)}g protein to bridge your meals and maintain energy.`
        });
      }
    }

    return suggestions;
  };

  const categorizedSuggestions = generateCategorizedMealSuggestions();

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

  const getMealIcon = (category: string) => {
    switch (category) {
      case 'breakfast': return Sunrise;
      case 'lunch': return Sun;
      case 'dinner': return Sunset;
      case 'snacks': return Moon;
      default: return ChefHat;
    }
  };

  const totalSuggestions = Object.values(categorizedSuggestions).flat().length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-4 w-4 text-emerald-500" />
        <span className="text-sm font-medium text-gray-700">Smart Meal Planning</span>
        <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
          {totalSuggestions} suggestions
        </Badge>
      </div>

      {totalSuggestions === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ChefHat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">Excellent progress!</p>
          <p className="text-sm">Your nutrition targets are well balanced.</p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="breakfast" className="text-xs flex items-center gap-1">
              <Sunrise className="h-3 w-3" />
              Breakfast
            </TabsTrigger>
            <TabsTrigger value="lunch" className="text-xs flex items-center gap-1">
              <Sun className="h-3 w-3" />
              Lunch
            </TabsTrigger>
            <TabsTrigger value="dinner" className="text-xs flex items-center gap-1">
              <Sunset className="h-3 w-3" />
              Dinner
            </TabsTrigger>
            <TabsTrigger value="snacks" className="text-xs flex items-center gap-1">
              <Moon className="h-3 w-3" />
              Snacks
            </TabsTrigger>
          </TabsList>

          {Object.entries(categorizedSuggestions).map(([category, meals]) => (
            <TabsContent key={category} value={category} className="space-y-3">
              {meals.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    {React.createElement(getMealIcon(category), { className: "h-6 w-6 text-gray-400" })}
                  </div>
                  <p className="text-sm">No {category} suggestions needed</p>
                  <p className="text-xs text-gray-400">Your {category} targets are on track!</p>
                </div>
              ) : (
                meals.map(meal => (
                  <div key={meal.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:border-emerald-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          {React.createElement(getMealIcon(category), { className: "h-4 w-4 text-gray-600" })}
                          {meal.name}
                        </h4>
                        <div className="flex gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className={`text-xs ${getDifficultyColor(meal.difficulty)}`}>
                            {meal.difficulty}
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
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default MealSuggestions;