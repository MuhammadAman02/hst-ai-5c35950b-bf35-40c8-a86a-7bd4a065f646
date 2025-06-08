import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, ChefHat, TrendingUp, Play, Zap, Activity } from 'lucide-react';
import NutritionTargetsComponent from '../components/NutritionTargets';
import NutritionCard from '../components/NutritionCard';
import IngredientSearch from '../components/IngredientSearch';
import MealSuggestions from '../components/MealSuggestions';
import MealPlanner, { MealPlannerRef } from '../components/MealPlanner';
import AIChat from '../components/AIChat';
import { NutritionTargets, NutritionInfo, DailyProgress, Ingredient, MealSuggestion } from '../types/nutrition';

const Index = () => {
  console.log('Index page rendered');

  // Simple state management
  const [currentView, setCurrentView] = useState<'setup' | 'planning' | 'tracking'>('setup');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const mealPlannerRef = useRef<MealPlannerRef>(null);
  
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
    console.log('Adding ingredient:', ingredient.name);
    if (mealPlannerRef.current) {
      mealPlannerRef.current.addIngredient(ingredient, amount);
    }
  };

  const handleAddMeal = (meal: MealSuggestion) => {
    console.log('Adding meal:', meal.name);
    if (mealPlannerRef.current) {
      mealPlannerRef.current.addMeal(meal);
    }
  };

  const handleNutritionChange = (nutrition: NutritionInfo) => {
    console.log('Nutrition updated:', nutrition);
    setCurrentNutrition(nutrition);
  };

  const handleTargetsSet = (targets: NutritionTargets, preset?: string) => {
    console.log('Setting targets:', targets, 'preset:', preset);
    setNutritionTargets(targets);
    if (preset) {
      setSelectedPreset(preset);
    }
    setCurrentView('planning');
  };

  const getPresetDisplayName = (preset: string) => {
    switch (preset) {
      case 'weight-loss': return 'Weight Loss';
      case 'muscle-gain': return 'Muscle Gain';
      case 'maintenance': return 'Maintenance';
      default: return 'Custom';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NutriAI Pro</h1>
                <p className="text-sm text-gray-500">Smart nutrition planning</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant={currentView === 'setup' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('setup')}
                className="flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                Setup
              </Button>
              <Button
                variant={currentView === 'planning' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('planning')}
                className="flex items-center gap-2"
                disabled={!nutritionTargets}
              >
                <ChefHat className="w-4 h-4" />
                Plan
              </Button>
              <Button
                variant={currentView === 'tracking' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('tracking')}
                className="flex items-center gap-2"
                disabled={currentNutrition.calories === 0}
              >
                <TrendingUp className="w-4 h-4" />
                Track
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Setup View */}
        {currentView === 'setup' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Set Your Nutrition Goals</h2>
              <p className="text-lg text-gray-600">Choose a preset or customize your daily targets</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <NutritionTargetsComponent 
                targets={nutritionTargets}
                onTargetsChange={setNutritionTargets}
                onTargetsSet={handleTargetsSet}
              />
              
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Why Set Targets?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Play className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Precision Planning</h4>
                        <p className="text-sm text-gray-600">Get meal suggestions calculated to meet your exact nutritional needs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Real-time Tracking</h4>
                        <p className="text-sm text-gray-600">Monitor your progress throughout the day with visual feedback</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Activity className="w-3 h-3 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">AI Assistance</h4>
                        <p className="text-sm text-gray-600">Get personalized meal recommendations based on your goals</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Planning View */}
        {currentView === 'planning' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Day</h2>
              <p className="text-gray-600">
                {selectedPreset && `Following your ${getPresetDisplayName(selectedPreset)} plan - `}
                Add meals and track your progress toward your goals
              </p>
            </div>

            {/* Progress Summary */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Today's Progress
                  {selectedPreset && (
                    <Badge variant="outline" className="ml-2">
                      {getPresetDisplayName(selectedPreset)} Plan
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Protein', current: currentNutrition.protein, target: nutritionTargets.protein, unit: 'g', color: 'emerald' },
                    { name: 'Carbs', current: currentNutrition.carbs, target: nutritionTargets.carbs, unit: 'g', color: 'blue' },
                    { name: 'Fats', current: currentNutrition.fats, target: nutritionTargets.fats, unit: 'g', color: 'purple' },
                    { name: 'Calories', current: currentNutrition.calories, target: nutritionTargets.calories, unit: 'kcal', color: 'gray' }
                  ].map((item) => {
                    const percentage = Math.min((item.current / item.target) * 100, 100);
                    return (
                      <div key={item.name} className={`bg-${item.color}-50 rounded-lg p-3 border border-${item.color}-200`}>
                        <div className="text-sm font-medium text-gray-700 mb-1">{item.name}</div>
                        <div className="text-lg font-bold text-gray-900">
                          {item.current.toFixed(1)}/{item.target} {item.unit}
                        </div>
                        <div className="w-full bg-white rounded-full h-2 mt-2">
                          <div 
                            className={`h-full bg-${item.color}-500 rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{percentage.toFixed(0)}% complete</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              {/* Meal Planner */}
              <div className="xl:col-span-3">
                <MealPlanner 
                  ref={mealPlannerRef}
                  onNutritionChange={handleNutritionChange}
                  currentNutrition={currentNutrition}
                />
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-2 space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Smart Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MealSuggestions 
                      progress={dailyProgress}
                      onAddMeal={handleAddMeal}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Ingredient Search</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IngredientSearch onAddIngredient={handleAddIngredient} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Tracking View */}
        {currentView === 'tracking' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Progress Today</h2>
              <p className="text-gray-600">Track how you're doing with your nutrition goals</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <NutritionCard progress={dailyProgress} />
              </div>
              <div className="xl:col-span-1">
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