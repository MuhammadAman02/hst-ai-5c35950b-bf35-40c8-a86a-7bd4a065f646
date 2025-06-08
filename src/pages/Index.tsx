import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, Search, ChefHat, Bot, Sparkles, TrendingUp, Zap, ArrowRight, CheckCircle, Play, Star, Award, Flame, ArrowLeft } from 'lucide-react';
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

  // Add entrance animations
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, index * 100);
    });
  }, [currentStep]);

  // Debug logging for state changes
  useEffect(() => {
    console.log('State changed:', {
      currentStep,
      hasSetTargets,
      selectedPreset,
      nutritionTargets
    });
  }, [currentStep, hasSetTargets, selectedPreset, nutritionTargets]);

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

  const handleTargetsSet = async (targets: NutritionTargets, preset?: string) => {
    console.log('Setting new targets:', targets, 'with preset:', preset);
    setIsLoading(true);
    
    try {
      // Simulate API call with smooth transition
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update all states synchronously
      setNutritionTargets(targets);
      if (preset) {
        setSelectedPreset(preset);
      }
      setHasSetTargets(true);
      
      console.log('Targets set successfully, navigating to planning...');
      setCurrentStep('planning');
    } catch (error) {
      console.error('Error setting targets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepChange = (step: 'setup' | 'planning' | 'tracking') => {
    console.log('Attempting to change step to:', step, 'hasSetTargets:', hasSetTargets);
    
    // Allow navigation to setup always
    if (step === 'setup') {
      setCurrentStep(step);
      return;
    }
    
    // Only allow navigation to planning/tracking if targets have been set
    if ((step === 'planning' || step === 'tracking') && !hasSetTargets) {
      console.log('Cannot navigate to', step, 'without setting targets first');
      return;
    }
    
    console.log('Navigating to step:', step);
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

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPresetDisplayName = (preset: string) => {
    switch (preset) {
      case 'weight-loss': return 'Weight Loss';
      case 'muscle-gain': return 'Muscle Gain';
      case 'maintenance': return 'Maintenance';
      default: return 'Custom';
    }
  };

  // Nutrition Summary Component for Planning Screen
  const NutritionSummary = () => (
    <Card className="glass-card mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            <div>
              <div>Your Daily Targets</div>
              {selectedPreset && (
                <div className="text-sm font-normal text-gray-500 mt-1">
                  {getPresetDisplayName(selectedPreset)} Plan
                </div>
              )}
            </div>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleStepChange('setup')}
            className="hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Edit Targets
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              name: 'Protein', 
              current: currentNutrition.protein, 
              target: nutritionTargets.protein, 
              unit: 'g',
              color: 'emerald',
              icon: '💪'
            },
            { 
              name: 'Carbs', 
              current: currentNutrition.carbs, 
              target: nutritionTargets.carbs, 
              unit: 'g',
              color: 'blue',
              icon: '⚡'
            },
            { 
              name: 'Fats', 
              current: currentNutrition.fats, 
              target: nutritionTargets.fats, 
              unit: 'g',
              color: 'purple',
              icon: '🥑'
            },
            { 
              name: 'Calories', 
              current: currentNutrition.calories, 
              target: nutritionTargets.calories, 
              unit: 'kcal',
              color: 'gray',
              icon: '🔥'
            }
          ].map((item) => {
            const percentage = getProgressPercentage(item.current, item.target);
            const remaining = Math.max(0, item.target - item.current);
            
            return (
              <div key={item.name} className={`bg-${item.color}-50 rounded-xl p-4 border border-${item.color}-200`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`text-sm font-medium text-${item.color}-700`}>{item.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs bg-${item.color}-100 text-${item.color}-700 border-${item.color}-300`}>
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className={`text-lg font-bold text-${item.color}-800`}>
                    {item.current.toFixed(1)}
                    <span className={`text-sm text-${item.color}-600 font-normal`}>
                      /{item.target} {item.unit}
                    </span>
                  </div>
                  
                  <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <div className={`text-xs text-${item.color}-600`}>
                    {remaining > 0 ? `${remaining.toFixed(1)} ${item.unit} remaining` : 'Target achieved! 🎉'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Overall Progress */}
        <div className="mt-4 p-3 bg-white/60 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">
              {((currentNutrition.protein + currentNutrition.carbs + currentNutrition.fats + currentNutrition.calories/10) / 
                (nutritionTargets.protein + nutritionTargets.carbs + nutritionTargets.fats + nutritionTargets.calories/10) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(((currentNutrition.protein + currentNutrition.carbs + currentNutrition.fats + currentNutrition.calories/10) / 
                  (nutritionTargets.protein + nutritionTargets.carbs + nutritionTargets.fats + nutritionTargets.calories/10) * 100), 100)}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Debug render function
  const renderDebugInfo = () => {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>Step: {currentStep}</div>
          <div>HasTargets: {hasSetTargets.toString()}</div>
          <div>Preset: {selectedPreset || 'none'}</div>
          <div>Loading: {isLoading.toString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Debug Info */}
      {renderDebugInfo()}

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
                const canNavigate = step.id === 'setup' || hasSetTargets;
                
                return (
                  <div key={step.id} className="flex items-center animate-on-load" style={{ animationDelay: `${index * 100}ms` }}>
                    <button
                      onClick={() => canNavigate && handleStepChange(step.id as 'setup' | 'planning' | 'tracking')}
                      disabled={!canNavigate}
                      className={`group relative flex items-center space-x-3 px-4 py-2 rounded-2xl transition-all duration-300 ${
                        status === 'active' 
                          ? `bg-gradient-to-r ${step.color} text-white shadow-lg hover-glow` 
                          : status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : canNavigate
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
        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-medium text-gray-700">Setting up your nutrition plan...</span>
              </div>
            </div>
          </div>
        )}

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
                  onTargetsSet={handleTargetsSet}
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
              </div>
            </div>
          </div>
        )}

        {/* Planning Phase - Enhanced with Nutrition Summary */}
        {currentStep === 'planning' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Day</h2>
              <p className="text-gray-600">Get AI-powered suggestions based on your remaining nutritional needs</p>
            </div>

            {/* Nutrition Summary - Shows selected targets and real-time progress */}
            <div className="animate-on-load">
              <NutritionSummary />
            </div>

            {/* ENHANCED LAYOUT: Larger sidebar for better navigation */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
              {/* Main Meal Planner - Takes 3 columns */}
              <div className="xl:col-span-3 animate-on-load" style={{ animationDelay: '100ms' }}>
                <MealPlanner 
                  ref={mealPlannerRef}
                  onNutritionChange={handleNutritionChange}
                  currentNutrition={currentNutrition}
                />
              </div>

              {/* MUCH LARGER Sidebar - Takes 2 columns for better usability */}
              <div className="xl:col-span-2 space-y-6">
                <div className="animate-on-load" style={{ animationDelay: '200ms' }}>
                  <Card className="glass-card hover-lift">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        Smart Meal Suggestions
                      </CardTitle>
                      <p className="text-sm text-gray-600">Categorized by meal time with precision portions</p>
                    </CardHeader>
                    <CardContent className="max-h-[500px] overflow-y-auto custom-scrollbar">
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
                        Ingredient Database
                      </CardTitle>
                      <p className="text-sm text-gray-600">Search and add individual ingredients</p>
                    </CardHeader>
                    <CardContent className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      <IngredientSearch onAddIngredient={handleAddIngredient} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6">
              <Button 
                variant="outline"
                onClick={() => handleStepChange('setup')}
                className="hover:bg-gray-50 button-press"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Setup
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