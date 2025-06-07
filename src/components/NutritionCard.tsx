import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap, CheckCircle } from 'lucide-react';
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
    if (percentage >= 90 && percentage <= 110) return 'bg-emerald-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-red-400';
  };

  const getStatusIcon = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    if (percentage >= 70) return <TrendingUp className="h-4 w-4 text-amber-600" />;
    return <Zap className="h-4 w-4 text-red-500" />;
  };

  const nutritionItems = [
    { 
      name: 'Protein', 
      current: progress.current.protein, 
      target: progress.targets.protein, 
      unit: 'g',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    { 
      name: 'Carbs', 
      current: progress.current.carbs, 
      target: progress.targets.carbs, 
      unit: 'g',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Fats', 
      current: progress.current.fats, 
      target: progress.targets.fats, 
      unit: 'g',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Calories', 
      current: progress.current.calories, 
      target: progress.targets.calories, 
      unit: 'kcal',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const overallProgress = nutritionItems.reduce((acc, item) => {
    return acc + getProgressPercentage(item.current, item.target);
  }, 0) / nutritionItems.length;

  return (
    <Card className="glass-card hover-lift">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Daily Progress
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${
              overallProgress >= 80 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            } font-medium`}
          >
            {overallProgress.toFixed(0)}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {nutritionItems.map((item, index) => (
          <div 
            key={item.name} 
            className="group p-4 rounded-xl bg-white/60 border border-gray-100 hover:shadow-md transition-all duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(item.current, item.target)}
                <span className={`font-semibold ${item.color}`}>{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {item.current.toFixed(1)} / {item.target}
                </div>
                <div className="text-xs text-gray-500">
                  {item.unit}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(item.current, item.target)} transition-all duration-700 ease-out rounded-full`}
                  style={{ width: `${getProgressPercentage(item.current, item.target)}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="text-gray-500">
                Remaining: {Math.max(0, item.target - item.current).toFixed(1)} {item.unit}
              </span>
              <span className={`font-medium ${
                getProgressPercentage(item.current, item.target) >= 90 
                  ? 'text-emerald-600' 
                  : 'text-gray-500'
              }`}>
                {getProgressPercentage(item.current, item.target).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NutritionCard;