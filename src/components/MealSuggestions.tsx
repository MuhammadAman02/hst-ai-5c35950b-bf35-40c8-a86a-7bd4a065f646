import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Plus, Sparkles, Target, Zap } from 'lucide-react';
import { MealSuggestion, DailyProgress, NutritionInfo } from '../types/nutrition';

interface MealSuggestionsProps {
  progress: DailyProgress;
  onAddMeal: (meal: MealSuggestion) => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ progress, onAddMeal }) => {
  console.log('MealSuggestions rendered with progress:', progress);

  // Analyze nutritional gaps and generate targeted suggestions
  const generateIntelligentSuggestions = (): MealSuggestion[] => {
    const remaining = progress.remaining;
    const suggestions: MealSuggestion[] = [];

    console.log('Analyzing nutritional gaps:', remaining);

    // High Protein Needs (>25g remaining)
    if (remaining.protein > 25) {
      suggestions.push({
        id: 'high-protein-chicken',
        name: 'Grilled Chicken Power Bowl',
        ingredients: [
          { ingredient: { id: '1', name: 'Chicken Breast', category: 'Protein', nutritionPer100g: { protein: 31, carbs: 0, fats: 3.6, calories: 165, fiber: 0, vitaminC: 0, vitaminD: 0.1, calcium: 15, iron: 0.7, potassium: 256 }, commonServingSize: 150, unit: 'g' }, amount: 200 },
          { ingredient: { id: '4', name: 'Broccoli', category: 'Vegetables', nutritionPer100g: { protein: 2.8, carbs: 7, fats: 0.4, calories: 34, fiber: 2.6, vitaminC: 89, vitaminD: 0, calcium: 47, iron: 0.7, potassium: 316 }, commonServingSize: 100, unit: 'g' }, amount: 150 },
          { ingredient: { id: '2', name: 'Brown Rice', category: 'Carbs', nutritionPer100g: { protein: 2.6, carbs: 23, fats: 0.9, calories: 111, fiber: 1.8, vitaminC: 0, vitaminD: 0, calcium: 10, iron: 0.4, potassium: 43 }, commonServingSize: 100, unit: 'g' }, amount: 100 }
        ],
        totalNutrition: {
          protein: 66.4,
          carbs: 33.5,
          fats: 8.55,
          calories: 475,
          fiber: 6.6,
          vitaminC: 133.5,
          vitaminD: 0.2,
          calcium: 100.5,
          iron: 2.45,
          potassium: 1001
        },
        prepTime: 25,
        difficulty: 'Easy',
        category: 'Lunch',
        targetNutrient: 'protein',
        reason: `Perfect for your high protein needs! Provides ${66.4}g protein to help reach your ${progress.targets.protein}g target.`
      });
    }

    // High Carb Needs (>40g remaining)
    if (remaining.carbs > 40) {
      suggestions.push({
        id: 'high-carb-oats',
        name: 'Power Breakfast Oats',
        ingredients: [
          { ingredient: { id: '5', name: 'Oats', category: 'Carbs', nutritionPer100g: { protein: 17, carbs: 66, fats: 7, calories: 389, fiber: 11, vitaminC: 0, vitaminD: 0, calcium: 54, iron: 5, potassium: 429 }, commonServingSize: 50, unit: 'g' }, amount: 80 },
          { ingredient: { id: '9', name: 'Banana', category: 'Carbs', nutritionPer100g: { protein: 1.1, carbs: 23, fats: 0.3, calories: 89, fiber: 2.6, vitaminC: 8.7, vitaminD: 0, calcium: 5, iron: 0.3, potassium: 358 }, commonServingSize: 120, unit: 'g' }, amount: 120 },
          { ingredient: { id: '8', name: 'Almonds', category: 'Fats', nutritionPer100g: { protein: 21, carbs: 22, fats: 50, calories: 579, fiber: 12, vitaminC: 0, vitaminD: 0, calcium: 269, iron: 3.7, potassium: 733 }, commonServingSize: 30, unit: 'g' }, amount: 20 }
        ],
        totalNutrition: {
          protein: 19.12,
          carbs: 82.2,
          fats: 15.66,
          calories: 525,
          fiber: 14.42,
          vitaminC: 10.44,
          vitaminD: 0,
          calcium: 102.18,
          iron: 4.74,
          potassium: 833.86
        },
        prepTime: 10,
        difficulty: 'Easy',
        category: 'Breakfast',
        targetNutrient: 'carbs',
        reason: `Great for your carb needs! Provides ${82.2}g complex carbs plus fiber and healthy fats.`
      });
    }

    // High Fat Needs (>20g remaining)
    if (remaining.fats > 20) {
      suggestions.push({
        id: 'high-fat-salmon',
        name: 'Omega-Rich Salmon Salad',
        ingredients: [
          { ingredient: { id: '3', name: 'Salmon', category: 'Protein', nutritionPer100g: { protein: 25, carbs: 0, fats: 13, calories: 208, fiber: 0, vitaminC: 0, vitaminD: 11, calcium: 12, iron: 0.8, potassium: 363 }, commonServingSize: 120, unit: 'g' }, amount: 150 },
          { ingredient: { id: '10', name: 'Avocado', category: 'Fats', nutritionPer100g: { protein: 2, carbs: 9, fats: 15, calories: 160, fiber: 7, vitaminC: 10, vitaminD: 0, calcium: 12, iron: 0.6, potassium: 485 }, commonServingSize: 100, unit: 'g' }, amount: 100 },
          { ingredient: { id: '8', name: 'Almonds', category: 'Fats', nutritionPer100g: { protein: 21, carbs: 22, fats: 50, calories: 579, fiber: 12, vitaminC: 0, vitaminD: 0, calcium: 269, iron: 3.7, potassium: 733 }, commonServingSize: 30, unit: 'g' }, amount: 25 }
        ],
        totalNutrition: {
          protein: 42.75,
          carbs: 14.5,
          fats: 44.5,
          calories: 623,
          fiber: 10,
          vitaminC: 10,
          vitaminD: 16.5,
          calcium: 98.25,
          iron: 2.125,
          potassium: 1211.75
        },
        prepTime: 15,
        difficulty: 'Easy',
        category: 'Lunch',
        targetNutrient: 'fats',
        reason: `Perfect for healthy fats! Provides ${44.5}g of omega-3 rich fats plus quality protein.`
      });
    }

    // Vitamin C Needs (>30mg remaining)
    if (remaining.vitaminC > 30) {
      suggestions.push({
        id: 'vitamin-c-smoothie',
        name: 'Vitamin C Power Smoothie',
        ingredients: [
          { ingredient: { id: '11', name: 'Orange', category: 'Carbs', nutritionPer100g: { protein: 0.9, carbs: 12, fats: 0.1, calories: 47, fiber: 2.4, vitaminC: 53, vitaminD: 0, calcium: 40, iron: 0.1, potassium: 181 }, commonServingSize: 150, unit: 'g' }, amount: 200 },
          { ingredient: { id: '12', name: 'Strawberries', category: 'Carbs', nutritionPer100g: { protein: 0.7, carbs: 8, fats: 0.3, calories: 32, fiber: 2, vitaminC: 59, vitaminD: 0, calcium: 16, iron: 0.4, potassium: 153 }, commonServingSize: 100, unit: 'g' }, amount: 150 },
          { ingredient: { id: '6', name: 'Greek Yogurt', category: 'Protein', nutritionPer100g: { protein: 10, carbs: 4, fats: 0.4, calories: 59, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 110, iron: 0.1, potassium: 141 }, commonServingSize: 170, unit: 'g' }, amount: 150 }
        ],
        totalNutrition: {
          protein: 16.85,
          carbs: 42,
          fats: 0.85,
          calories: 248,
          fiber: 7.8,
          vitaminC: 194.5,
          vitaminD: 0,
          calcium: 189,
          iron: 0.75,
          potassium: 754
        },
        prepTime: 5,
        difficulty: 'Easy',
        category: 'Snack',
        targetNutrient: 'vitaminC',
        reason: `Vitamin C powerhouse! Provides ${194.5}mg vitamin C to boost your immune system.`
      });
    }

    // Fiber Needs (>10g remaining)
    if (remaining.fiber > 10) {
      suggestions.push({
        id: 'high-fiber-bowl',
        name: 'Fiber-Rich Buddha Bowl',
        ingredients: [
          { ingredient: { id: '13', name: 'Quinoa', category: 'Carbs', nutritionPer100g: { protein: 14, carbs: 64, fats: 6, calories: 368, fiber: 7, vitaminC: 0, vitaminD: 0, calcium: 47, iron: 4.6, potassium: 563 }, commonServingSize: 100, unit: 'g' }, amount: 100 },
          { ingredient: { id: '14', name: 'Black Beans', category: 'Protein', nutritionPer100g: { protein: 21, carbs: 63, fats: 1, calories: 341, fiber: 15, vitaminC: 0, vitaminD: 0, calcium: 160, iron: 5.0, potassium: 1483 }, commonServingSize: 100, unit: 'g' }, amount: 80 },
          { ingredient: { id: '4', name: 'Broccoli', category: 'Vegetables', nutritionPer100g: { protein: 2.8, carbs: 7, fats: 0.4, calories: 34, fiber: 2.6, vitaminC: 89, vitaminD: 0, calcium: 47, iron: 0.7, potassium: 316 }, commonServingSize: 100, unit: 'g' }, amount: 150 }
        ],
        totalNutrition: {
          protein: 35,
          carbs: 124.5,
          fats: 7.2,
          calories: 691,
          fiber: 21.9,
          vitaminC: 133.5,
          vitaminD: 0,
          calcium: 198.5,
          iron: 9.65,
          potassium: 1800
        },
        prepTime: 20,
        difficulty: 'Medium',
        category: 'Lunch',
        targetNutrient: 'fiber',
        reason: `Fiber champion! Provides ${21.9}g fiber for digestive health and satiety.`
      });
    }

    // If no specific high needs, suggest balanced meals
    if (suggestions.length === 0) {
      suggestions.push({
        id: 'balanced-meal',
        name: 'Balanced Nutrition Plate',
        ingredients: [
          { ingredient: { id: '1', name: 'Chicken Breast', category: 'Protein', nutritionPer100g: { protein: 31, carbs: 0, fats: 3.6, calories: 165, fiber: 0, vitaminC: 0, vitaminD: 0.1, calcium: 15, iron: 0.7, potassium: 256 }, commonServingSize: 150, unit: 'g' }, amount: 120 },
          { ingredient: { id: '7', name: 'Sweet Potato', category: 'Carbs', nutritionPer100g: { protein: 2, carbs: 20, fats: 0.1, calories: 86, fiber: 3, vitaminC: 2.4, vitaminD: 0, calcium: 30, iron: 0.6, potassium: 337 }, commonServingSize: 150, unit: 'g' }, amount: 150 },
          { ingredient: { id: '4', name: 'Broccoli', category: 'Vegetables', nutritionPer100g: { protein: 2.8, carbs: 7, fats: 0.4, calories: 34, fiber: 2.6, vitaminC: 89, vitaminD: 0, calcium: 47, iron: 0.7, potassium: 316 }, commonServingSize: 100, unit: 'g' }, amount: 100 }
        ],
        totalNutrition: {
          protein: 42,
          carbs: 37,
          fats: 4.76,
          calories: 361,
          fiber: 7.1,
          vitaminC: 92.6,
          vitaminD: 0.12,
          calcium: 95,
          iron: 1.84,
          potassium: 871
        },
        prepTime: 25,
        difficulty: 'Easy',
        category: 'Dinner',
        targetNutrient: 'balanced',
        reason: 'Well-balanced meal with quality protein, complex carbs, and essential vitamins.'
      });
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
  };

  const suggestions = generateIntelligentSuggestions();

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
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700">AI Recommendations</span>
            <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
              Based on your needs
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
                <div className="mb-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-emerald-700 font-medium">{meal.reason}</p>
                  </div>
                </div>
              )}

              <div className="text-sm space-y-3">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Ingredients:</div>
                  <div className="text-gray-600 text-xs">
                    {meal.ingredients.map((item, index) => (
                      <span key={index}>
                        {item.ingredient.name} ({item.amount}g)
                        {index < meal.ingredients.length - 1 ? ', ' : ''}
                      </span>
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