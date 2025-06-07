import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Utensils } from 'lucide-react';
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

  // Group items by meal if they're from the same meal
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

  return (
    <div className="space-y-4">
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-health-green">
              <Utensils className="h-5 w-5" />
              Today's Meal Plan
            </CardTitle>
            {mealItems.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAll}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {mealItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Utensils className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Your meal plan is empty</p>
              <p className="text-sm">Add ingredients or meals to start planning your nutrition</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedItems).map(([groupName, items]) => (
                <div key={groupName} className="space-y-2">
                  {groupName !== 'Individual Items' && (
                    <h4 className="font-semibold text-health-green border-b pb-1">
                      {groupName}
                    </h4>
                  )}
                  {groupName === 'Individual Items' && items.length > 0 && (
                    <h4 className="font-semibold text-gray-700 border-b pb-1">
                      Individual Items
                    </h4>
                  )}
                  
                  {items.map(item => {
                    const nutrition = calculateNutrition(item.ingredient, item.amount);
                    return (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{item.ingredient.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.amount}g
                            </Badge>
                            {item.type === 'meal' && (
                              <Badge className="text-xs bg-health-green text-white">
                                Meal
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-2">
                            <span>P: {nutrition.protein.toFixed(1)}g</span>
                            <span>C: {nutrition.carbs.toFixed(1)}g</span>
                            <span>F: {nutrition.fats.toFixed(1)}g</span>
                            <span>Cal: {nutrition.calories.toFixed(0)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pass the functions to child components via props */}
      <div className="hidden">
        {/* This is a hack to pass functions to parent component */}
        {React.createElement('div', {
          ref: (el: any) => {
            if (el) {
              el.addIngredient = addIngredient;
              el.addMeal = addMeal;
            }
          }
        })}
      </div>
    </div>
  );
};

export default MealPlanner;