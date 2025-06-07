import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DailyProgress } from '../types/nutrition';

interface NutritionCardProps {
  progress: DailyProgress;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ progress }) => {
  console.log('NutritionCard rendered with progress:', progress);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'bg-health-green';
    if (percentage >= 80 && percentage < 90) return 'bg-health-carbs';
    if (percentage < 80) return 'bg-health-protein';
    return 'bg-health-fats';
  };

  const nutritionItems = [
    { 
      name: 'Protein', 
      current: progress.current.protein, 
      target: progress.targets.protein, 
      unit: 'g',
      color: 'text-health-protein'
    },
    { 
      name: 'Carbs', 
      current: progress.current.carbs, 
      target: progress.targets.carbs, 
      unit: 'g',
      color: 'text-health-carbs'
    },
    { 
      name: 'Fats', 
      current: progress.current.fats, 
      target: progress.targets.fats, 
      unit: 'g',
      color: 'text-health-fats'
    },
    { 
      name: 'Calories', 
      current: progress.current.calories, 
      target: progress.targets.calories, 
      unit: 'kcal',
      color: 'text-gray-700'
    },
    { 
      name: 'Fiber', 
      current: progress.current.fiber, 
      target: progress.targets.fiber, 
      unit: 'g',
      color: 'text-health-vitamins'
    },
    { 
      name: 'Vitamin C', 
      current: progress.current.vitaminC, 
      target: progress.targets.vitaminC, 
      unit: 'mg',
      color: 'text-health-vitamins'
    }
  ];

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-health-green">Daily Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nutritionItems.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${item.color}`}>{item.name}</span>
                <span className="text-sm text-gray-600">
                  {item.current.toFixed(1)} / {item.target} {item.unit}
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(item.current, item.target)} 
                className="h-2"
              />
              <div className="text-xs text-gray-500">
                Remaining: {Math.max(0, item.target - item.current).toFixed(1)} {item.unit}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionCard;