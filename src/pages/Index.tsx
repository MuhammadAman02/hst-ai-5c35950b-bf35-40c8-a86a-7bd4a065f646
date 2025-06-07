import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Target, Search, ChefHat, Bot, Sparkles, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 opacity-40"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/25 animate-glow">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-emerald-600 to-violet-600 bg-clip-text text-transparent leading-tight">
              NutriAI
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Your AI-powered nutrition companion for personalized meal planning and dietary optimization
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                AI-Powered Suggestions
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Real-time Tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                Smart Recommendations
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="animate-slide-in">
                <NutritionTargetsComponent 
                  targets={nutritionTargets}
                  onTargetsChange={setNutritionTargets}
                />
              </div>
              <div className="animate-slide-in">
                <NutritionCard progress={dailyProgress} />
              </div>
            </div>

            <div className="xl:col-span-4 space-y-6">
              <div className="animate-scale-in">
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
            </div>

            <div className="xl:col-span-5 space-y-6">
              <div className="animate-slide-in">
                <AIChat progress={dailyProgress} />
              </div>
              
              <div className="animate-slide-in">
                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-1">
                    <TabsTrigger 
                      value="search" 
                      className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                    >
                      <Search className="h-4 w-4" />
                      <span className="hidden sm:inline">Search</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="suggestions" 
                      className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                    >
                      <ChefHat className="h-4 w-4" />
                      <span className="hidden sm:inline">Suggestions</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="search" className="mt-6">
                    <IngredientSearch onAddIngredient={handleAddIngredient} />
                  </TabsContent>
                  
                  <TabsContent value="suggestions" className="mt-6">
                    <MealSuggestions 
                      progress={dailyProgress}
                      onAddMeal={handleAddMeal}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-gray-600 font-medium">
                Powered by advanced AI for optimal nutrition planning
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;