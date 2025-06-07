import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Target, Search, ChefHat } from 'lucide-react';
import NutritionTargetsComponent from '../components/NutritionTargets';
import NutritionCard from '../components/NutritionCard';
import IngredientSearch from '../components/IngredientSearch';
import MealSuggestions from '../components/MealSuggestions';
import MealPlanner from '../components/MealPlanner';
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

  // Reference to meal planner functions
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
    // This will be called by IngredientSearch, we need to pass it to MealPlanner
    if (mealPlannerRef && mealPlannerRef.addIngredient) {
      mealPlannerRef.addIngredient(ingredient, amount);
    }
  };

  const handleAddMeal = (meal: MealSuggestion) => {
    console.log('Handling add meal from Index:', meal.name);
    // This will be called by MealSuggestions, we need to pass it to MealPlanner
    if (mealPlannerRef && mealPlannerRef.addMeal) {
      mealPlannerRef.addMeal(meal);
    }
  };

  const handleNutritionChange = (nutrition: NutritionInfo) => {
    console.log('Nutrition updated:', nutrition);
    setCurrentNutrition(nutrition);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-green-light to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-health-green mb-2">
            Smart Meal Planner
          </h1>
          <p className="text-gray-600 text-lg">
            Plan your meals according to your nutritionist's recommendations
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Targets and Progress */}
          <div className="space-y-6">
            <NutritionTargetsComponent 
              targets={nutritionTargets}
              onTargetsChange={setNutritionTargets}
            />
            <NutritionCard progress={dailyProgress} />
          </div>

          {/* Middle Column - Meal Planner */}
          <div className="space-y-6">
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

          {/* Right Column - Search and Suggestions */}
          <div className="space-y-6">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  Suggestions
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

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Track your nutrition goals and discover meals that fit your dietary needs</p>
        </div>
      </div>
    </div>
  );
};

export default Index;