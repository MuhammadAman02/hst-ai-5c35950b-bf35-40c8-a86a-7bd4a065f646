import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Plus } from 'lucide-react';
import { MealSuggestion, DailyProgress } from '../types/nutrition';

interface MealSuggestionsProps {
  progress: DailyProgress;
  onAddMeal: (meal: MealSuggestion) => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ progress, onAddMeal }) => {
  console.log('MealSuggestions rendered with progress:', progress);

  // Generate meal suggestions based on remaining nutrition needs
  const generateSuggestions = (): MealSuggestion[] => {
    const remaining = progress.remaining;
    const suggestions: MealSuggestion[] = [];

    // High protein meal suggestion
    if (remaining.protein > 20) {
      suggestions.push({
        id: 'high-protein-1',
        name: 'Grilled Chicken & Broccoli',
        ingredients: [
          { ingredient: { id: '1', name: 'Chicken Breast', category: 'Protein', nutritionPer100g: { protein: 31, carbs: 0, fats: 3.6, calories: 165, fiber: 0, vitaminC: 0, vitaminD: 0.1, calcium: 15, iron: 0.7, potassium: 256 }, commonServingSize: 150, unit: 'g' }, amount: 150 },
          { ingredient: { id: '4', name: 'Broccoli', category: 'Vegetables', nutritionPer100g: { protein: 2.8, carbs: 7, fats: 0.4, calories: 34, fiber: 2.6, vitaminC: 89, vitaminD: 0, calcium: 47, iron: 0.7, potassium: 316 }, commonServingSize: 100, unit: 'g' }, amount: 200 }
        ],
        totalNutrition: {
          protein: 52.1,
          carbs: 14,
          fats: 6.2,
          calories: 315,
          fiber: 5.2,
          vitaminC: 178,
          vitaminD: 0.15,
          calcium: 116.5,
          iron: 2.45,
          potassium: 1016
        },
        prepTime: 20,
        difficulty: 'Easy',
        category: 'Lunch'
      });
    }

    // Balanced meal suggestion
    if (remaining.carbs > 30) {
      suggestions.push({
        id: 'balanced-1',
        name: 'Salmon with Sweet Potato',
        ingredients: [
          { ingredient: { id: '3', name: 'Salmon', category: 'Protein', nutritionPer100g: { protein: 25, carbs: 0, fats: 13, calories: 208, fiber: 0, vitaminC: 0, vitaminD: 11, calcium: 12, iron: 0.8, potassium: 363 }, commonServingSize: 120, unit: 'g' }, amount: 120 },
          { ingredient: { id: '7', name: 'Sweet Potato', category: 'Carbs', nutritionPer100g: { protein: 2, carbs: 20, fats: 0.1, calories: 86, fiber: 3, vitaminC: 2.4, vitaminD: 0, calcium: 30, iron: 0.6, potassium: 337 }, commonServingSize: 150, unit: 'g' }, amount: 200 }
        ],
        totalNutrition: {
          protein: 34,
          carbs: 40,
          fats: 15.8,
          calories: 421.6,
          fiber: 6,
          vitaminC: 4.8,
          vitaminD: 13.2,
          calcium: 74.4,
          iron: 2.16,
          potassium: 1109.6
        },
        prepTime: 25,
        difficulty: 'Medium',
        category: 'Dinner'
      });
    }

    // High fiber snack
    if (remaining.fiber > 5) {
      suggestions.push({
        id: 'fiber-snack-1',
        name: 'Greek Yogurt with Almonds',
        ingredients: [
          { ingredient: { id: '6', name: 'Greek Yogurt', category: 'Protein', nutritionPer100g: { protein: 10, carbs: 4, fats: 0.4, calories: 59, fiber: 0, vitaminC: 0, vitaminD: 0, calcium: 110, iron: 0.1, potassium: 141 }, commonServingSize: 170, unit: 'g' }, amount: 150 },
          { ingredient: { id: '8', name: 'Almonds', category: 'Fats', nutritionPer100g: { protein: 21, carbs: 22, fats: 50, calories: 579, fiber: 12, vitaminC: 0, vitaminD: 0, calcium: 269, iron: 3.7, potassium: 733 }, commonServingSize: 30, unit: 'g' }, amount: 25 }
        ],
        totalNutrition: {
          protein: 20.25,
          carbs: 11.5,
          fats: 13.1,
          calories: 233.25,
          fiber: 3,
          vitaminC: 0,
          vitaminD: 0,
          calcium: 232.25,
          iron: 1.075,
          potassium: 394.75
        },
        prepTime: 5,
        difficulty: 'Easy',
        category: 'Snack'
      });
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
  };

  const suggestions = generateSuggestions();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-green">
          <ChefHat className="h-5 w-5" />
          Meal Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ChefHat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>You're doing great! Your nutrition targets are nearly met.</p>
            <p className="text-sm">Add more ingredients to see personalized meal suggestions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map(meal => (
              <div key={meal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{meal.name}</h4>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className={getDifficultyColor(meal.difficulty)}>
                        {meal.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-health-green border-health-green">
                        {meal.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {meal.prepTime} minutes
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onAddMeal(meal)}
                    className="bg-health-green hover:bg-health-green-dark"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="text-sm space-y-2">
                  <div className="font-medium text-gray-700">Ingredients:</div>
                  <div className="text-gray-600">
                    {meal.ingredients.map((item, index) => (
                      <span key={index}>
                        {item.ingredient.name} ({item.amount}g)
                        {index < meal.ingredients.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 pt-3 border-t">
                    <div className="text-xs">
                      <span className="font-medium text-health-protein">Protein:</span> {meal.totalNutrition.protein.toFixed(1)}g
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-health-carbs">Carbs:</span> {meal.totalNutrition.carbs.toFixed(1)}g
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-health-fats">Fats:</span> {meal.totalNutrition.fats.toFixed(1)}g
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">Calories:</span> {meal.totalNutrition.calories.toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealSuggestions;