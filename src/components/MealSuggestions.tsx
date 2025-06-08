import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ChefHat, Plus, Sparkles, Target, Zap, Calculator, Sunrise, Sun, Sunset, Moon, Bot, Send, Loader2, Wand2, Globe, Star } from 'lucide-react';
import { MealSuggestion, DailyProgress, NutritionInfo } from '../types/nutrition';
import { presetMealPlans, generateAIMealPlan } from '../data/mealPlans';

interface MealSuggestionsProps {
  progress: DailyProgress;
  onAddMeal: (meal: MealSuggestion) => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ progress, onAddMeal }) => {
  console.log('MealSuggestions rendered with progress:', progress);
  const [activeTab, setActiveTab] = useState('breakfast');
  const [aiInput, setAiInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedMeal, setAiGeneratedMeal] = useState<MealSuggestion | null>(null);

  // Determine which preset to use based on current targets
  const getPresetType = (): 'weight-loss' | 'muscle-gain' | 'maintenance' => {
    const { protein, calories } = progress.targets;
    
    if (protein >= 140 && calories >= 2000) return 'muscle-gain';
    if (protein >= 110 && calories <= 1600) return 'weight-loss';
    return 'maintenance';
  };

  const presetType = getPresetType();
  const availablePresets = presetMealPlans[presetType] || [];

  // Filter meals by category
  const getMealsByCategory = (category: string) => {
    return availablePresets.filter(meal => 
      meal.category.toLowerCase() === category.toLowerCase()
    );
  };

  // Calculate remaining nutrition needs for AI generation
  const calculateMealTargets = (mealType: string) => {
    const remaining = progress.remaining;
    const mealMultipliers = {
      'breakfast': { protein: 0.25, carbs: 0.3, fats: 0.25, calories: 0.25 },
      'lunch': { protein: 0.35, carbs: 0.35, fats: 0.35, calories: 0.35 },
      'dinner': { protein: 0.3, carbs: 0.25, fats: 0.3, calories: 0.3 },
      'snack': { protein: 0.1, carbs: 0.1, fats: 0.1, calories: 0.1 }
    };

    const multiplier = mealMultipliers[mealType as keyof typeof mealMultipliers] || mealMultipliers.lunch;
    
    return {
      protein: Math.max(remaining.protein * multiplier.protein, 15),
      carbs: Math.max(remaining.carbs * multiplier.carbs, 20),
      fats: Math.max(remaining.fats * multiplier.fats, 10),
      calories: Math.max(remaining.calories * multiplier.calories, 200)
    };
  };

  const handleAIGeneration = async () => {
    if (!aiInput.trim() || isGenerating) return;

    setIsGenerating(true);
    console.log('Generating AI meal for:', aiInput, 'meal type:', activeTab);

    try {
      const targets = calculateMealTargets(activeTab);
      console.log('Calculated targets for AI meal:', targets);

      // Extract cuisine from user input
      const cuisine = extractCuisine(aiInput) || 'american';
      console.log('Detected cuisine:', cuisine);

      const aiMeal = await generateAIMealPlan(cuisine, activeTab, targets);
      console.log('Generated AI meal:', aiMeal);

      setAiGeneratedMeal(aiMeal);
    } catch (error) {
      console.error('Error generating AI meal:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const extractCuisine = (input: string): string => {
    const cuisineKeywords: Record<string, string> = {
      'thai': 'thai',
      'thailand': 'thai',
      'italian': 'italian',
      'italy': 'italian',
      'pasta': 'italian',
      'pizza': 'italian',
      'mexican': 'mexican',
      'mexico': 'mexican',
      'taco': 'mexican',
      'burrito': 'mexican',
      'indian': 'indian',
      'india': 'indian',
      'curry': 'indian',
      'mediterranean': 'mediterranean',
      'greek': 'mediterranean',
      'asian': 'asian',
      'chinese': 'asian',
      'japanese': 'asian',
      'korean': 'asian',
      'american': 'american',
      'burger': 'american'
    };

    const lowerInput = input.toLowerCase();
    for (const [keyword, cuisine] of Object.entries(cuisineKeywords)) {
      if (lowerInput.includes(keyword)) {
        return cuisine;
      }
    }
    return 'american';
  };

  const handleAddMeal = (meal: MealSuggestion) => {
    console.log('MealSuggestions: Adding meal:', meal.name);
    if (typeof onAddMeal === 'function') {
      onAddMeal(meal);
    } else {
      console.error('onAddMeal is not a function:', onAddMeal);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMealIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'breakfast': return Sunrise;
      case 'lunch': return Sun;
      case 'dinner': return Sunset;
      case 'snack': return Moon;
      default: return ChefHat;
    }
  };

  const quickPrompts = [
    "I'm craving Thai food today",
    "Something Italian and hearty",
    "Mexican flavors with lots of protein",
    "Light Mediterranean meal",
    "Comfort food American style",
    "Spicy Indian cuisine",
    "Fresh Asian fusion"
  ];

  const mealCategories = [
    { id: 'breakfast', name: 'Breakfast', icon: Sunrise, emoji: '🌅' },
    { id: 'lunch', name: 'Lunch', icon: Sun, emoji: '☀️' },
    { id: 'dinner', name: 'Dinner', icon: Sunset, emoji: '🌆' },
    { id: 'snack', name: 'Snacks', icon: Moon, emoji: '🌙' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-emerald-500" />
        <span className="text-sm font-medium text-gray-700">Smart Meal Planning</span>
        <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
          {presetType.replace('-', ' ')} plan
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          {mealCategories.map((category) => (
            <TabsTrigger 
              key={category.id}
              value={category.id} 
              className="text-xs flex items-center gap-1"
            >
              <span className="text-sm">{category.emoji}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Meal Category Tabs */}
        {mealCategories.map((category) => {
          const categoryMeals = getMealsByCategory(category.name);
          
          return (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{category.emoji}</span>
                  <h3 className="font-semibold text-gray-800">
                    {category.name} Options
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Pre-calculated {category.name.toLowerCase()} meals for your {presetType.replace('-', ' ')} plan
                </p>
              </div>

              {/* Preset Meals for this category */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {categoryMeals.map(meal => (
                  <Card key={meal.id} className="hover:shadow-md transition-all duration-200 hover:border-emerald-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <ChefHat className="h-4 w-4 text-gray-600" />
                            {meal.name}
                          </h4>
                          <div className="flex gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className={`text-xs ${getDifficultyColor(meal.difficulty)}`}>
                              {meal.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              <Globe className="h-3 w-3 mr-1" />
                              {meal.cuisine}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                              <Calculator className="h-3 w-3 mr-1" />
                              Complete Plan
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <Clock className="h-4 w-4" />
                            {meal.prepTime} minutes
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddMeal(meal);
                          }}
                          className="gradient-primary hover:shadow-lg text-white"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>

                      {meal.reason && (
                        <div className="mb-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-emerald-700 font-medium">{meal.reason}</p>
                          </div>
                        </div>
                      )}

                      <div className="text-sm space-y-3">
                        <div>
                          <div className="font-medium text-gray-700 mb-2">Includes:</div>
                          <div className="space-y-1">
                            {meal.ingredients.slice(0, 3).map((item, index) => (
                              <div key={index} className="flex justify-between items-center text-xs bg-gray-50 rounded px-2 py-1">
                                <span className="text-gray-700">{item.ingredient.name}</span>
                                <span className="font-medium text-gray-900">{item.amount}g</span>
                              </div>
                            ))}
                            {meal.ingredients.length > 3 && (
                              <div className="text-xs text-gray-500 text-center py-1">
                                +{meal.ingredients.length - 3} more ingredients
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                          <div className="bg-emerald-50 rounded px-2 py-1 text-center">
                            <div className="text-xs font-medium text-emerald-700">{meal.totalNutrition.protein.toFixed(1)}g</div>
                            <div className="text-xs text-emerald-600">Protein</div>
                          </div>
                          <div className="bg-blue-50 rounded px-2 py-1 text-center">
                            <div className="text-xs font-medium text-blue-700">{meal.totalNutrition.carbs.toFixed(1)}g</div>
                            <div className="text-xs text-blue-600">Carbs</div>
                          </div>
                          <div className="bg-purple-50 rounded px-2 py-1 text-center">
                            <div className="text-xs font-medium text-purple-700">{meal.totalNutrition.fats.toFixed(1)}g</div>
                            <div className="text-xs text-purple-600">Fats</div>
                          </div>
                          <div className="bg-gray-50 rounded px-2 py-1 text-center">
                            <div className="text-xs font-medium text-gray-700">{meal.totalNutrition.calories.toFixed(0)}</div>
                            <div className="text-xs text-gray-600">Cal</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {categoryMeals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ChefHat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No {category.name.toLowerCase()} options available</p>
                  <p className="text-sm">Try the AI Chef below to generate custom meals!</p>
                </div>
              )}

              {/* AI Chef Section for each category */}
              <Card className="border-2 border-dashed border-emerald-200 bg-emerald-50/50 mt-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI {category.name} Generator
                  </CardTitle>
                  <p className="text-sm text-emerald-700">
                    Tell me what you're craving for {category.name.toLowerCase()} and I'll create a recipe that meets your nutrition targets!
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* AI Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">What are you craving?</label>
                    <div className="flex gap-2">
                      <Input
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder={`e.g., I want Thai food for ${category.name.toLowerCase()}...`}
                        className="flex-1 focus-ring border-emerald-200"
                        onKeyPress={(e) => e.key === 'Enter' && handleAIGeneration()}
                        disabled={isGenerating}
                      />
                      <Button
                        onClick={handleAIGeneration}
                        disabled={!aiInput.trim() || isGenerating}
                        className="gradient-primary hover:shadow-lg text-white"
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Quick Prompts */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Quick Ideas</label>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.slice(0, 4).map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setAiInput(prompt)}
                          className="text-xs bg-white hover:bg-emerald-50 hover:border-emerald-200"
                          disabled={isGenerating}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Target Nutrition Display */}
                  <div className="bg-white rounded-lg p-3 border border-emerald-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Target Nutrition for {category.name}:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {(() => {
                        const targets = calculateMealTargets(category.id);
                        return [
                          { name: 'Protein', value: targets.protein, unit: 'g', color: 'emerald' },
                          { name: 'Carbs', value: targets.carbs, unit: 'g', color: 'blue' },
                          { name: 'Fats', value: targets.fats, unit: 'g', color: 'purple' },
                          { name: 'Calories', value: targets.calories, unit: '', color: 'gray' }
                        ].map(item => (
                          <div key={item.name} className={`bg-${item.color}-50 rounded px-2 py-1 text-center`}>
                            <div className={`font-medium text-${item.color}-700`}>{item.value.toFixed(0)}{item.unit}</div>
                            <div className={`text-${item.color}-600`}>{item.name}</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* AI Generated Meal Display */}
                  {isGenerating && activeTab === category.id && (
                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                          <span className="font-medium text-blue-800">AI Chef is creating your {category.name.toLowerCase()}...</span>
                        </div>
                        <div className="text-sm text-blue-600">
                          Analyzing your cravings and calculating perfect portions for your nutrition goals
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {aiGeneratedMeal && !isGenerating && activeTab === category.id && (
                    <Card className="border-2 border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                            <Star className="h-5 w-5" />
                            {aiGeneratedMeal.name}
                          </CardTitle>
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Generated
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-700">{aiGeneratedMeal.reason}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Badge variant="outline" className={`text-xs ${getDifficultyColor(aiGeneratedMeal.difficulty)}`}>
                              {aiGeneratedMeal.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                              <Globe className="h-3 w-3 mr-1" />
                              {aiGeneratedMeal.cuisine}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                              <Clock className="h-3 w-3 mr-1" />
                              {aiGeneratedMeal.prepTime} min
                            </Badge>
                          </div>
                          <Button
                            onClick={() => handleAddMeal(aiGeneratedMeal)}
                            className="gradient-primary hover:shadow-lg text-white"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add to Plan
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="font-medium text-gray-700 mb-2">AI-Calculated Ingredients:</div>
                            <div className="space-y-1">
                              {aiGeneratedMeal.ingredients.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm bg-white rounded px-3 py-2 border">
                                  <span className="text-gray-700">{item.ingredient.name}</span>
                                  <span className="font-medium text-gray-900">{item.amount}g</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                            <div className="bg-emerald-50 rounded px-3 py-2 text-center">
                              <div className="text-sm font-medium text-emerald-700">{aiGeneratedMeal.totalNutrition.protein.toFixed(1)}g</div>
                              <div className="text-xs text-emerald-600">Protein</div>
                            </div>
                            <div className="bg-blue-50 rounded px-3 py-2 text-center">
                              <div className="text-sm font-medium text-blue-700">{aiGeneratedMeal.totalNutrition.carbs.toFixed(1)}g</div>
                              <div className="text-xs text-blue-600">Carbs</div>
                            </div>
                            <div className="bg-purple-50 rounded px-3 py-2 text-center">
                              <div className="text-sm font-medium text-purple-700">{aiGeneratedMeal.totalNutrition.fats.toFixed(1)}g</div>
                              <div className="text-xs text-purple-600">Fats</div>
                            </div>
                            <div className="bg-gray-50 rounded px-3 py-2 text-center">
                              <div className="text-sm font-medium text-gray-700">{aiGeneratedMeal.totalNutrition.calories.toFixed(0)}</div>
                              <div className="text-xs text-gray-600">Calories</div>
                            </div>
                          </div>

                          {aiGeneratedMeal.instructions && (
                            <div className="pt-2 border-t border-gray-200">
                              <div className="font-medium text-gray-700 mb-2">Cooking Instructions:</div>
                              <ol className="text-sm text-gray-600 space-y-2">
                                {aiGeneratedMeal.instructions.map((instruction, index) => (
                                  <li key={index} className="flex gap-2">
                                    <span className="font-medium text-blue-600 flex-shrink-0">{index + 1}.</span>
                                    <span>{instruction}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default MealSuggestions;