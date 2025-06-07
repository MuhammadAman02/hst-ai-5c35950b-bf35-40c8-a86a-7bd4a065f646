import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Target, Search, ChefHat, Bot, Sparkles, TrendingUp, Zap } from 'lucide-react';
import NutritionTargetsComponent from '../components/NutritionTargets';
import NutritionCard from '../components/NutritionCard';
import IngredientSearch from '../components/IngredientSearch';
import MealSuggestions from '../components/MealSuggestions';
import MealPlanner from '../components/MealPlanner';
import AIChat from '../components/AIChat';
import { NutritionTargets, NutritionInfo, DailyProgress, Ingredient, MealSuggestion } from '../types/nutrition';

const Index = () => {
  console.log('Index page rendered');

  const [nutritionTargets, setNutritionTargets] = useState<NutritionTargets>({
    protein: 100,
    carbs: 200,
    fats: 70,
    calories: 1800,
    fiber: 25,
    vitaminC: 90,
    vitaminD: 20,
    calcium: 1000,
    iron: 18,
    potassium: 3500
  });

  const [currentNutrition, setCurrentNutrition] = useState<NutritionInfo>({
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

  const [mealPlannerRef, setMealPlannerRef] = useState<any>(null);

  const calculateRemaining = (): NutritionInfo => {
    return {
      protein: Math.max(0, nutritionTargets.protein - currentNutrition.protein),
      carbs: Math.max(0, nutritionTargets.carbs - currentNutrition.carbs),
      fats: Math.max(0, nutritionTargets.fats - currentNutrition.fats),
      calories: Math.max(0, nutritionTargets.calories - currentNutrition.calories),
      fiber: Math.max(0, nutritionTargets.fiber - currentNutrition.fiber),
      vitaminC: Math.max(0, nutritionTargets.vitaminC - currentNutrition.vitaminC),
      vitaminD: Math.max(0, nutritionTargets.vitaminD - currentNutrition.vitaminD),
      calcium: Math.max(0, nutritionTargets.calcium - currentNutrition.calcium),
      iron: Math.max(0, nutritionTargets.iron - currentNutrition.iron),
      potassium: Math.max(0, nutritionTargets.potassium - currentNutrition.potassium)
    };
  };

  const dailyProgress: DailyProgress = {
    current: currentNutrition,
    targets: nutritionTargets,
    remaining: calculateRemaining()
  };

  const handleAddIngredient = (ingredient: Ingredient, amount: number) => {
    console.log('Handling add ingredient from Index:', ingredient.name);
    if (mealPlannerRef && mealPlannerRef.addIngredient) {
      mealPlannerRef.addIngredient(ingredient, amount);
    }
  };

  const handleAddMeal = (meal: MealSuggestion) => {
    console.log('Handling add meal from Index:', meal.name);
    if (mealPlannerRef && mealPlannerRef.addMeal) {
      mealPlannerRef.addMeal(meal);
    }
  };

  const handleNutritionChange = (nutrition: NutritionInfo) => {
    console.log('Nutrition updated:', nutrition);
    setCurrentNutrition(nutrition);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  NutriAI
                </h1>
                <p className="text-sm text-gray-500">Smart nutrition planning</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Targets & Progress */}
          <div className="lg:col-span-1 space-y-6">
            <NutritionTargetsComponent 
              targets={nutritionTargets}
              onTargetsChange={setNutritionTargets}
            />
            <NutritionCard progress={dailyProgress} />
          </div>

          {/* Center - Meal Planner */}
          <div className="lg:col-span-2">
            <div ref={(el) => {
              if (el && el.children[0]) {
                setMealPlannerRef(el.children[0]);
              }
            }}>
              <MealPlanner 
                onNutritionChange={handleNutritionChange}
                currentNutrition={currentNutrition}
              />
            </div>
          </div>

          {/* Right Sidebar - AI Chat & Tools */}
          <div className="lg:col-span-1 space-y-6">
            <AIChat progress={dailyProgress} />
            
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200 rounded-lg p-1">
                <TabsTrigger 
                  value="search" 
                  className="flex items-center space-x-2 rounded-md data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="suggestions" 
                  className="flex items-center space-x-2 rounded-md data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
                >
                  <ChefHat className="h-4 w-4" />
                  <span className="hidden sm:inline">Meals</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="search" className="mt-4">
                <IngredientSearch onAddIngredient={handleAddIngredient} />
              </TabsContent>
              
              <TabsContent value="suggestions" className="mt-4">
                <MealSuggestions 
                  progress={dailyProgress}
                  onAddMeal={handleAddMeal}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;