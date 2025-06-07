import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Utensils, Plus, Sparkles, Clock, Users } from 'lucide-react';
import { Ingredient, NutritionInfo, MealSuggestion } from '../types/nutrition';

interface MealPlannerProps {
  onNutritionChange: (nutrition: NutritionInfo) => void;
  currentNutrition: NutritionInfo;
}

interface MealItem {
  id: string;
  ingredient: Ingredient;
  amount: number;
  type: 'ingredient' | 'meal';
  mealData?: MealSuggestion;
}

const MealPlanner: React.FC<MealPlannerProps> = ({ onNutritionChange, currentNutrition }) => {
  const [mealItems, setMealItems] = useState<MealItem[]>([]);

  console.log('MealPlanner rendered with items:', mealItems.length);

  const calculateNutrition = (ingredient: Ingredient, amount: number): NutritionInfo => {
    const factor = amount / 100;
    return {
      protein: ingredient.nutritionPer100g.protein * factor,
      carbs: ingredient.nutritionPer100g.carbs * factor,
      fats: ingredient.nutritionPer100g.fats * factor,
      calories: ingredient.nutritionPer100g.calories * factor,
      fiber: ingredient.nutritionPer100g.fiber * factor,
      vitaminC: ingredient.nutritionPer100g.vitaminC * factor,
      vitaminD: ingredient.nutritionPer100g.vitaminD * factor,
      calcium: ingredient.nutritionPer100g.calcium * factor,
      iron: ingredient.nutritionPer100g.iron * factor,
      potassium: ingredient.nutritionPer100g.potassium * factor
    };
  };

  const updateTotalNutrition = (items: MealItem[]) => {
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

    items.forEach(item => {
      if (item.type === 'ingredient') {
        const nutrition = calculateNutrition(item.ingredient, item.amount);
        Object.keys(total).forEach(key => {
          total[key as keyof NutritionInfo] += nutrition[key as keyof NutritionInfo];
        });
      } else if (item.type === 'meal' && item.mealData) {
        Object.keys(total).forEach(key => {
          total[key as keyof NutritionInfo] += item.mealData!.totalNutrition[key as keyof NutritionInfo];
        });
      }
    });

    console.log('Updated total nutrition:', total);
    onNutritionChange(total);
  };

  const addIngredient = (ingredient: Ingredient, amount: number) => {
    console.log('Adding ingredient to meal plan:', ingredient.name, amount);
    const newItem: MealItem = {
      id: `ingredient-${Date.now()}-${Math.random()}`,
      ingredient,
      amount,
      type: 'ingredient'
    };

    const newItems = [...mealItems, newItem];
    setMealItems(newItems);
    updateTotalNutrition(newItems);
  };

  const addMeal = (meal: MealSuggestion) => {
    console.log('Adding meal to meal plan:', meal.name);
    const newItems: MealItem[] = [];

    meal.ingredients.forEach(mealIngredient => {
      const newItem: MealItem = {
        id: `meal-${meal.id}-${Date.now()}-${Math.random()}`,
        ingredient: mealIngredient.ingredient,
        amount: mealIngredient.amount,
        type: 'meal',
        mealData: meal
      };
      newItems.push(newItem);
    });

    const updatedItems = [...mealItems, ...newItems];
    setMealItems(updatedItems);
    updateTotalNutrition(updatedItems);
  };

  const removeItem = (itemId: string) => {
    console.log('Removing item from meal plan:', itemId);
    const newItems = mealItems.filter(item => item.id !== itemId);
    setMealItems(newItems);
    updateTotalNutrition(newItems);
  };

  const clearAll = () => {
    console.log('Clearing all meal plan items');
    setMealItems([]);
    onNutritionChange({
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
    });
  };

  const groupedItems = mealItems.reduce((groups, item) => {
    if (item.type === 'meal' && item.mealData) {
      const mealName = item.mealData.name;
      if (!groups[mealName]) {
        groups[mealName] = [];
      }
      groups[mealName].push(item);
    } else {
      if (!groups['Individual Items']) {
        groups['Individual Items'] = [];
      }
      groups['Individual Items'].push(item);
    }
    return groups;
  }, {} as Record<string, MealItem[]>);

  const totalCalories = mealItems.reduce((total, item) => {
    const nutrition = calculateNutrition(item.ingredient, item.amount);
    return total + nutrition.calories;
  }, 0);

  return (
    <Card className="glass-card h-[600px] flex flex-col">
      <CardHeader className="pb-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            Today's Meal Plan
          </CardTitle>
          <div className="flex items-center gap-3">
            {mealItems.length > 0 && (
              <>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                  {totalCalories.toFixed(0)} cal
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAll}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-6">
        {mealItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <Utensils className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building Your Meal Plan</h3>
            <p className="text-gray-600 mb-6 max-w-sm">Add ingredients or complete meals to track your nutrition and reach your daily goals</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>AI suggestions will appear as you add items</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([groupName, items], groupIndex) => (
              <div 
                key={groupName} 
                className="animate-slide-up"
                style={{ animationDelay: `${groupIndex * 0.1}s` }}
              >
                {groupName !== 'Individual Items' && (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                      <Utensils className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{groupName}</h4>
                      <p className="text-xs text-gray-500">Complete meal</p>
                    </div>
                  </div>
                )}
                {groupName === 'Individual Items' && items.length > 0 && (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Individual Items</h4>
                      <p className="text-xs text-gray-500">Custom additions</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  {items.map((item, itemIndex) => {
                    const nutrition = calculateNutrition(item.ingredient, item.amount);
                    return (
                      <div 
                        key={item.id} 
                        className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-emerald-200 transition-all duration-200"
                        style={{ animationDelay: `${(groupIndex * items.length + itemIndex) * 0.05}s` }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="font-semibold text-gray-900">{item.ingredient.name}</span>
                              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                                {item.amount}g
                              </Badge>
                              {item.type === 'meal' && (
                                <Badge className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Meal
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <div className="bg-emerald-50 rounded-lg px-3 py-2 text-center">
                                <div className="text-xs text-emerald-600 font-medium">Protein</div>
                                <div className="text-sm font-bold text-emerald-700">{nutrition.protein.toFixed(1)}g</div>
                              </div>
                              <div className="bg-blue-50 rounded-lg px-3 py-2 text-center">
                                <div className="text-xs text-blue-600 font-medium">Carbs</div>
                                <div className="text-sm font-bold text-blue-700">{nutrition.carbs.toFixed(1)}g</div>
                              </div>
                              <div className="bg-purple-50 rounded-lg px-3 py-2 text-center">
                                <div className="text-xs text-purple-600 font-medium">Fats</div>
                                <div className="text-sm font-bold text-purple-700">{nutrition.fats.toFixed(1)}g</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg px-3 py-2 text-center">
                                <div className="text-xs text-gray-600 font-medium">Calories</div>
                                <div className="text-sm font-bold text-gray-700">{nutrition.calories.toFixed(0)}</div>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-3"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Hidden ref element for parent communication */}
      <div className="hidden">
        {React.createElement('div', {
          ref: (el: any) => {
            if (el) {
              el.addIngredient = addIngredient;
              el.addMeal = addMeal;
            }
          }
        })}
      </div>
    </Card>
  );
};

export default MealPlanner;