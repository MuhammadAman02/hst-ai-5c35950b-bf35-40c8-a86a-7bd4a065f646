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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">NutriAI</h1>
                <p className="text-sm text-gray-500">Smart nutrition planning</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Targets & Progress */}
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-fade-in">
              <NutritionTargetsComponent 
                targets={nutritionTargets}
                onTargetsChange={setNutritionTargets}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <NutritionCard progress={dailyProgress} />
            </div>
          </div>

          {/* Center - Meal Planner */}
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
          <div className="lg:col-span-4 space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <AIChat progress={dailyProgress} />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1 shadow-sm">
                  <TabsTrigger 
                    value="search" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="suggestions" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <ChefHat className="h-4 w-4" />
                    <span className="hidden sm:inline">Suggestions</span>
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
        </div>
      </div>
    </div>
  );
};

export default Index;