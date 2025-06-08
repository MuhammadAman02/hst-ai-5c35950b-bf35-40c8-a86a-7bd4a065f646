import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Utensils, Plus, Sparkles, Clock, ChefHat, Target, Zap, ArrowRight, CheckCircle, Play, Star, Award, Flame } from 'lucide-react';
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
  addedAt: Date;
  mealTime?: string;
}

export interface MealPlannerRef {
  addIngredient: (ingredient: Ingredient, amount: number) => void;
  addMeal: (meal: MealSuggestion) => void;
}

const MealPlanner = forwardRef<MealPlannerRef, MealPlannerProps>(({ onNutritionChange, currentNutrition }, ref) => {
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

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

  const determineMealTime = (currentItemCount: number): string => {
    if (currentItemCount < 3) return 'Breakfast';
    if (currentItemCount < 6) return 'Lunch';
    if (currentItemCount < 9) return 'Dinner';
    return 'Snacks';
  };

  const addIngredient = (ingredient: Ingredient, amount: number) => {
    console.log('Adding ingredient to meal plan:', ingredient.name, amount);
    const newItem: MealItem = {
      id: `ingredient-${Date.now()}-${Math.random()}`,
      ingredient,
      amount,
      type: 'ingredient',
      addedAt: new Date(),
      mealTime: determineMealTime(mealItems.length)
    };

    // CRITICAL FIX: Use functional update to prevent race conditions
    setMealItems(prevItems => {
      const newItems = [...prevItems, newItem];
      // Update nutrition after state is set
      setTimeout(() => updateTotalNutrition(newItems), 0);
      return newItems;
    });
    
    // Highlight recently added item
    setRecentlyAdded(newItem.id);
    setTimeout(() => setRecentlyAdded(null), 2000);
  };

  const addMeal = (meal: MealSuggestion) => {
    console.log('Adding meal to meal plan:', meal.name);
    
    // CRITICAL FIX: Create all meal items at once to prevent disappearing
    const newItems: MealItem[] = meal.ingredients.map((mealIngredient, index) => ({
      id: `meal-${meal.id}-${Date.now()}-${index}-${Math.random()}`,
      ingredient: mealIngredient.ingredient,
      amount: mealIngredient.amount,
      type: 'meal' as const,
      mealData: meal,
      addedAt: new Date(),
      mealTime: meal.category || determineMealTime(mealItems.length)
    }));

    // CRITICAL FIX: Use functional update and add all items at once
    setMealItems(prevItems => {
      const updatedItems = [...prevItems, ...newItems];
      // Update nutrition after state is set
      setTimeout(() => updateTotalNutrition(updatedItems), 0);
      return updatedItems;
    });
    
    // Highlight recently added items
    newItems.forEach((item, index) => {
      setTimeout(() => {
        setRecentlyAdded(item.id);
        setTimeout(() => setRecentlyAdded(null), 2000);
      }, index * 100);
    });
  };

  const removeItem = (itemId: string) => {
    console.log('Removing item from meal plan:', itemId);
    setMealItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      setTimeout(() => updateTotalNutrition(newItems), 0);
      return newItems;
    });
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

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    addIngredient,
    addMeal
  }));

  const totalCalories = mealItems.reduce((total, item) => {
    if (item.type === 'ingredient') {
      const nutrition = calculateNutrition(item.ingredient, item.amount);
      return total + nutrition.calories;
    } else if (item.type === 'meal' && item.mealData) {
      return total + item.mealData.totalNutrition.calories;
    }
    return total;
  }, 0);

  const getMealTimeIcon = (mealTime: string) => {
    switch (mealTime) {
      case 'Breakfast': return '🌅';
      case 'Lunch': return '☀️';
      case 'Dinner': return '🌆';
      case 'Snacks': return '🌙';
      default: return '🍽️';
    }
  };

  // Group meals by meal time
  const groupedMeals = mealItems.reduce((groups, item) => {
    const mealTime = item.mealTime || 'Other';
    if (!groups[mealTime]) groups[mealTime] = [];
    groups[mealTime].push(item);
    return groups;
  }, {} as Record<string, MealItem[]>);

  return (
    <Card className="glass-card hover-lift overflow-hidden">
      <CardHeader className="pb-6 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"></div>
        </div>
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="w-10 h-10 gradient-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <div>
              <div>Today's Meal Plan</div>
              <div className="text-sm font-normal text-gray-500 mt-1">Build your perfect nutrition day</div>
            </div>
          </CardTitle>
          
          <div className="flex items-center space-x-3">
            {mealItems.length > 0 && (
              <>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    {totalCalories.toFixed(0)} cal
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                    <Target className="w-3 h-3 mr-1" />
                    {mealItems.length} items
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAll}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 button-press"
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        {mealItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-3xl flex items-center justify-center animate-float">
                <Utensils className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Plus className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Start Building Your Perfect Day</h3>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Add ingredients or complete meals to track your nutrition and reach your daily goals with precision
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: Sparkles, text: 'AI Suggestions', color: 'from-emerald-400 to-teal-500' },
                { icon: Target, text: 'Precision Tracking', color: 'from-blue-400 to-indigo-500' },
                { icon: ChefHat, text: 'Smart Planning', color: 'from-purple-400 to-pink-500' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
                  <div className={`w-5 h-5 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                    <feature.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 custom-scrollbar max-h-96 overflow-y-auto pr-2">
            {Object.entries(groupedMeals).map(([mealTime, items]) => (
              <div key={mealTime} className="space-y-3">
                {/* Meal Time Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <div className="text-2xl">{getMealTimeIcon(mealTime)}</div>
                  <h4 className="font-semibold text-gray-800">{mealTime}</h4>
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    {items.length} item{items.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {/* Meal Items */}
                <div className="space-y-3">
                  {items.map((item, index) => {
                    const nutrition = item.type === 'ingredient' 
                      ? calculateNutrition(item.ingredient, item.amount)
                      : item.mealData?.totalNutrition || { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0 };
                    const isRecent = recentlyAdded === item.id;
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`group relative bg-white rounded-2xl border p-4 transition-all duration-300 card-hover ${
                          isRecent 
                            ? 'border-emerald-300 bg-emerald-50 shadow-lg animate-pulse-glow' 
                            : 'border-gray-200 hover:border-emerald-200 hover:shadow-md'
                        }`}
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          transform: 'translateY(10px)',
                          opacity: 0,
                          animation: `slideUp 0.4s ease-out ${index * 100}ms forwards`
                        }}
                      >
                        {/* Recently Added Indicator */}
                        {isRecent && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}

                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="font-semibold text-gray-900 truncate">{item.ingredient.name}</span>
                              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 flex-shrink-0">
                                {item.amount}g
                              </Badge>
                              {item.type === 'meal' && (
                                <Badge className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-shrink-0">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  AI Meal
                                </Badge>
                              )}
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(item.addedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                              <div className="bg-emerald-50 rounded-xl px-3 py-2 text-center hover:bg-emerald-100 transition-colors">
                                <div className="text-xs text-emerald-600 font-medium">Protein</div>
                                <div className="text-sm font-bold text-emerald-700">{nutrition.protein.toFixed(1)}g</div>
                              </div>
                              <div className="bg-blue-50 rounded-xl px-3 py-2 text-center hover:bg-blue-100 transition-colors">
                                <div className="text-xs text-blue-600 font-medium">Carbs</div>
                                <div className="text-sm font-bold text-blue-700">{nutrition.carbs.toFixed(1)}g</div>
                              </div>
                              <div className="bg-purple-50 rounded-xl px-3 py-2 text-center hover:bg-purple-100 transition-colors">
                                <div className="text-xs text-purple-600 font-medium">Fats</div>
                                <div className="text-sm font-bold text-purple-700">{nutrition.fats.toFixed(1)}g</div>
                              </div>
                              <div className="bg-gray-50 rounded-xl px-3 py-2 text-center hover:bg-gray-100 transition-colors">
                                <div className="text-xs text-gray-600 font-medium">Calories</div>
                                <div className="text-sm font-bold text-gray-700">{nutrition.calories.toFixed(0)}</div>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-3 flex-shrink-0 button-press"
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
    </Card>
  );
});

MealPlanner.displayName = 'MealPlanner';

export default MealPlanner;