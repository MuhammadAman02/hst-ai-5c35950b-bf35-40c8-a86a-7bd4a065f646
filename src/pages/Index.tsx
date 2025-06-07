import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, Search, ChefHat, Bot, Sparkles, TrendingUp, Zap, ArrowRight, CheckCircle, Play, Star, Award, Flame } from 'lucide-react';
import NutritionTargetsComponent from '../components/NutritionTargets';
import NutritionCard from '../components/NutritionCard';
import IngredientSearch from '../components/IngredientSearch';
import MealSuggestions from '../components/MealSuggestions';
import MealPlanner, { MealPlannerRef } from '../components/MealPlanner';
import AIChat from '../components/AIChat';
import { NutritionTargets, NutritionInfo, DailyProgress, Ingredient, MealSuggestion } from '../types/nutrition';

const Index = () => {
  console.log('Index page rendered');

  const [currentStep, setCurrentStep] = useState<'setup' | 'planning' | 'tracking'>('setup');
  const [hasSetTargets, setHasSetTargets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // Add entrance animations
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, index * 100);
    });
  }, [currentStep]);

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
    if (mealPlannerRef.current) {
      mealPlannerRef.current.addIngredient(ingredient, amount);
    }
  };

  const handleAddMeal = (meal: MealSuggestion) => {
    console.log('Handling add meal from Index:', meal.name);
    if (mealPlannerRef.current) {
      mealPlannerRef.current.addMeal(meal);
    }
  };

  const handleNutritionChange = (nutrition: NutritionInfo) => {
    console.log('Nutrition updated:', nutrition);
    setCurrentNutrition(nutrition);
  };

  const handleTargetsSet = async (targets: NutritionTargets) => {
    console.log('Setting new targets:', targets);
    setIsLoading(true);
    
    // Simulate API call with smooth transition
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setNutritionTargets(targets);
    setHasSetTargets(true);
    setCurrentStep('planning');
    setIsLoading(false);
  };

  const handleStepChange = (step: 'setup' | 'planning' | 'tracking') => {
    console.log('Changing step to:', step);
    setCurrentStep(step);
  };

  const steps = [
    { 
      id: 'setup', 
      title: 'Goals', 
      icon: Target, 
      description: 'Set your targets',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'planning', 
      title: 'Plan', 
      icon: ChefHat, 
      description: 'Build your meals',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'tracking', 
      title: 'Track', 
      icon: TrendingUp, 
      description: 'Monitor progress',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Ultra Modern Header */}
      <header className="glass-header sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 animate-on-load">
              <div className="relative">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  NutriAI Pro
                </h1>
                <p className="text-sm text-gray-500 font-medium">Precision nutrition planning</p>
              </div>
            </div>
            
            {/* Modern Progress Steps */}
            <div className="hidden lg:flex items-center space-x-2">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);
                return (
                  <div key={step.id} className="flex items-center animate-on-load" style={{ animationDelay: `${index * 100}ms` }}>
                    <button
                      onClick={() => handleStepChange(step.id as 'setup' | 'planning' | 'tracking')}
                      disabled={!hasSetTargets && step.id !== 'setup'}
                      className={`group relative flex items-center space-x-3 px-4 py-2 rounded-2xl transition-all duration-300 ${
                        status === 'active' 
                          ? `bg-gradient-to-r ${step.color} text-white shadow-lg hover-glow` 
                          : status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : hasSetTargets || step.id === 'setup'
                              ? 'bg-white/60 text-gray-600 hover:bg-white/80 hover:text-gray-800 hover-lift'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      } button-press`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        status === 'active' 
                          ? 'bg-white/20' 
                          : status === 'completed'
                            ? 'bg-emerald-200'
                            : 'bg-gray-200'
                      }`}>
                        {status === 'completed' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold">{step.title}</div>
                        <div className="text-xs opacity-80">{step.description}</div>
                      </div>
                      
                      {/* Active Step Indicator */}
                      {status === 'active' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                    
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                        status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="animate-on-load" style={{ animationDelay: '300ms' }}>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <Flame className="w-3 h-3 mr-1" />
                Pro Version
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Modern Transitions */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Setup Phase - Redesigned */}
        {currentStep === 'setup' && (
          <div className="max-w-6xl mx-auto space-modern">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-on-load">
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-float">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h2 className="text-fluid-xl font-bold text-gray-900 mb-6 gradient-text">
                Welcome to the Future of Nutrition
              </h2>
              <p className="text-fluid-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Set your personalized nutrition goals and unlock AI-powered meal planning that adapts to your exact needs. 
                Experience precision nutrition like never before.
              </p>
              
              {/* Feature Highlights */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { icon: Zap, text: 'AI-Powered', color: 'from-yellow-400 to-orange-500' },
                  { icon: Target, text: 'Precision Planning', color: 'from-emerald-400 to-teal-500' },
                  { icon: TrendingUp, text: 'Real-time Tracking', color: 'from-blue-400 to-indigo-500' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover-lift animate-on-load" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                      <feature.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Nutrition Targets */}
              <div className="animate-on-load" style={{ animationDelay: '200ms' }}>
                <NutritionTargetsComponent 
                  targets={nutritionTargets}
                  onTargetsChange={setNutritionTargets}
                />
              </div>

              {/* Benefits & CTA */}
              <div className="space-y-8 animate-on-load" style={{ animationDelay: '400ms' }}>
                {/* How It Works */}
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 gradient-secondary rounded-xl flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        icon: Target,
                        title: 'Set Smart Targets',
                        description: 'Define your daily protein, carbs, fats, and micronutrient goals with our intelligent presets',
                        color: 'emerald'
                      },
                      {
                        icon: Bot,
                        title: 'AI Meal Planning',
                        description: 'Get personalized meal suggestions with calculated portions to meet your exact nutritional needs',
                        color: 'blue'
                      },
                      {
                        icon: TrendingUp,
                        title: 'Real-time Progress',
                        description: 'Track your intake with beautiful visualizations and get instant feedback on your nutrition',
                        color: 'purple'
                      }
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className={`w-12 h-12 bg-${step.color}-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className={`w-5 h-5 text-${step.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* CTA Button */}
                <Button 
                  onClick={() => handleTargetsSet(nutritionTargets)}
                  disabled={isLoading}
                  className="w-full gradient-primary hover:shadow-2xl text-white py-4 text-lg font-semibold rounded-2xl button-press hover-glow transition-all duration-300"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Setting up your plan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Start My Nutrition Journey</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Planning Phase - Enhanced */}
        {currentStep === 'planning' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-on-load">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Day</h2>
                <p className="text-gray-600">Get AI-powered suggestions based on your remaining nutritional needs</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => handleStepChange('setup')}
                  className="hover:bg-emerald-50 hover:text-emerald-700 button-press"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Adjust Goals
                </Button>
                <Button 
                  onClick={() => handleStepChange('tracking')}
                  className="gradient-primary hover:shadow-lg text-white button-press"
                  disabled={currentNutrition.calories === 0}
                >
                  View Progress
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Main Meal Planner */}
              <div className="xl:col-span-3 animate-on-load" style={{ animationDelay: '100ms' }}>
                <MealPlanner 
                  ref={mealPlannerRef}
                  onNutritionChange={handleNutritionChange}
                  currentNutrition={currentNutrition}
                />
              </div>

              {/* Enhanced Sidebar */}
              <div className="xl:col-span-1 space-y-6">
                <div className="animate-on-load" style={{ animationDelay: '200ms' }}>
                  <Card className="glass-card hover-lift">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        Smart Suggestions
                      </CardTitle>
                      <p className="text-sm text-gray-600">Precision-calculated for your needs</p>
                    </CardHeader>
                    <CardContent>
                      <MealSuggestions 
                        progress={dailyProgress}
                        onAddMeal={handleAddMeal}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="animate-on-load" style={{ animationDelay: '300ms' }}>
                  <Card className="glass-card hover-lift">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                          <Search className="h-4 w-4 text-white" />
                        </div>
                        Ingredient Search
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IngredientSearch onAddIngredient={handleAddIngredient} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Phase - Enhanced */}
        {currentStep === 'tracking' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-on-load">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Progress Today</h2>
                <p className="text-gray-600">Track how you're doing with your nutrition goals</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => handleStepChange('planning')}
                  className="hover:bg-gray-50 button-press"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Planning
                </Button>
                <Button 
                  onClick={() => handleStepChange('setup')}
                  variant="outline"
                  className="hover:bg-emerald-50 hover:text-emerald-700 button-press"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Adjust Goals
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Progress Overview */}
              <div className="xl:col-span-2 animate-on-load" style={{ animationDelay: '100ms' }}>
                <NutritionCard progress={dailyProgress} />
              </div>

              {/* AI Assistant */}
              <div className="xl:col-span-1 animate-on-load" style={{ animationDelay: '200ms' }}>
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