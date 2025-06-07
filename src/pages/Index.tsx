import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, Search, ChefHat, Bot, Sparkles, TrendingUp, Zap, ArrowRight, CheckCircle, Play } from 'lucide-react';
import NutritionTargetsComponent from '../components/NutritionTargets';
import NutritionCard from '../components/NutritionCard';
import IngredientSearch from '../components/IngredientSearch';
import MealSuggestions from '../components/MealSuggestions';
import MealPlanner from '../components/MealPlanner';
import AIChat from '../components/AIChat';
import { NutritionTargets, NutritionInfo, DailyProgress, Ingredient, MealSuggestion } from '../types/nutrition';

const Index = () => {
  console.log('Index page rendered');

  const [currentStep, setCurrentStep] = useState<'setup' | 'planning' | 'tracking'>('setup');
  const [hasSetTargets, setHasSetTargets] = useState(false);
  
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

  const handleTargetsSet = (targets: NutritionTargets) => {
    setNutritionTargets(targets);
    setHasSetTargets(true);
    setCurrentStep('planning');
  };

  const steps = [
    { id: 'setup', title: 'Set Goals', icon: Target, description: 'Define your nutrition targets' },
    { id: 'planning', title: 'Plan Meals', icon: ChefHat, description: 'Build your daily meal plan' },
    { id: 'tracking', title: 'Track Progress', icon: TrendingUp, description: 'Monitor your nutrition' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  NutriAI
                </h1>
                <p className="text-sm text-gray-500 font-medium">Smart nutrition planning</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    currentStep === step.id 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : hasSetTargets && index <= steps.findIndex(s => s.id === currentStep)
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-50 text-gray-500'
                  }`}>
                    <step.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                    {hasSetTargets && index <= steps.findIndex(s => s.id === currentStep) && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-300 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentStep === 'setup' && (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NutriAI</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's start by setting your daily nutrition goals. Choose a preset or customize your targets.
              </p>
            </div>

            {/* Setup Flow */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <NutritionTargetsComponent 
                  targets={nutritionTargets}
                  onTargetsChange={setNutritionTargets}
                />
              </div>
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                      Why Set Targets?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Personalized Recommendations</h4>
                        <p className="text-sm text-gray-600">Get AI-powered meal suggestions based on your specific needs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Track Progress</h4>
                        <p className="text-sm text-gray-600">Monitor your daily intake and see how close you are to your goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Smart Assistance</h4>
                        <p className="text-sm text-gray-600">Chat with our AI nutritionist for instant advice and tips</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => handleTargetsSet(nutritionTargets)}
                  className="w-full gradient-primary hover:shadow-lg text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Planning My Meals
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'planning' && (
          <div className="space-y-8">
            {/* Step Navigation */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Plan Your Meals</h2>
                <p className="text-gray-600 mt-2">Add ingredients or complete meals to build your daily nutrition plan</p>
              </div>
              <Button 
                onClick={() => setCurrentStep('tracking')}
                className="gradient-primary hover:shadow-lg text-white"
                disabled={currentNutrition.calories === 0}
              >
                View Progress
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Main Meal Planner */}
              <div className="col-span-12 lg:col-span-8">
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

              {/* Sidebar Tools */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Search className="h-5 w-5 text-emerald-600" />
                      Add to Your Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="search" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1 rounded-xl">
                        <TabsTrigger 
                          value="search" 
                          className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <Search className="h-4 w-4" />
                          <span>Ingredients</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="suggestions" 
                          className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <ChefHat className="h-4 w-4" />
                          <span>Meals</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <div className="mt-4">
                        <TabsContent value="search" className="mt-0">
                          <IngredientSearch onAddIngredient={handleAddIngredient} />
                        </TabsContent>
                        
                        <TabsContent value="suggestions" className="mt-0">
                          <MealSuggestions 
                            progress={dailyProgress}
                            onAddMeal={handleAddMeal}
                          />
                        </TabsContent>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>

                <AIChat progress={dailyProgress} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 'tracking' && (
          <div className="space-y-8">
            {/* Step Navigation */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your Progress Today</h2>
                <p className="text-gray-600 mt-2">Track how you're doing with your nutrition goals</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep('planning')}
                  className="hover:bg-gray-50"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Planning
                </Button>
                <Button 
                  onClick={() => setCurrentStep('setup')}
                  variant="outline"
                  className="hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Adjust Goals
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Progress Overview */}
              <div className="col-span-12 lg:col-span-8">
                <NutritionCard progress={dailyProgress} />
              </div>

              {/* AI Assistant */}
              <div className="col-span-12 lg:col-span-4">
                <AIChat progress={dailyProgress} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;