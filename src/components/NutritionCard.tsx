import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap } from 'lucide-react';
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
    if (percentage >= 90 && percentage <= 110) return 'from-emerald-500 to-emerald-600';
    if (percentage >= 80 && percentage < 90) return 'from-amber-500 to-orange-500';
    if (percentage < 80) return 'from-red-400 to-red-500';
    return 'from-blue-500 to-blue-600';
  };

  const getStatusIcon = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return <Target className="h-4 w-4 text-emerald-600" />;
    if (percentage >= 80) return <TrendingUp className="h-4 w-4 text-amber-600" />;
    return <Zap className="h-4 w-4 text-red-500" />;
  };

  const nutritionItems = [
    { 
      name: 'Protein', 
      current: progress.current.protein, 
      target: progress.targets.protein, 
      unit: 'g',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50'
    },
    { 
      name: 'Carbs', 
      current: progress.current.carbs, 
      target: progress.targets.carbs, 
      unit: 'g',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Fats', 
      current: progress.current.fats, 
      target: progress.targets.fats, 
      unit: 'g',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Calories', 
      current: progress.current.calories, 
      target: progress.targets.calories, 
      unit: 'kcal',
      color: 'text-gray-700',
      bgColor: 'bg-gray-50'
    },
    { 
      name: 'Fiber', 
      current: progress.current.fiber, 
      target: progress.targets.fiber, 
      unit: 'g',
      color: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Vitamin C', 
      current: progress.current.vitaminC, 
      target: progress.targets.vitaminC, 
      unit: 'mg',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50'
    }
  ];

  const overallProgress = nutritionItems.reduce((acc, item) => {
    return acc + getProgressPercentage(item.current, item.target);
  }, 0) / nutritionItems.length;

  return (
    <Card className="neo-card animate-fade-in overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="gradient-text flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Daily Progress
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${
              overallProgress >= 80 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {overallProgress.toFixed(0)}% Complete
          </Badge>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{overallProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${
                overallProgress >= 80 
                  ? 'from-emerald-500 to-emerald-600' 
                  : 'from-amber-500 to-orange-500'
              } transition-all duration-500 ease-out rounded-full relative`}
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 shimmer"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {nutritionItems.map((item, index) => (
          <div 
            key={item.name} 
            className="group hover:scale-[1.02] transition-transform duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`${item.bgColor} rounded-2xl p-4 border border-white/50 backdrop-blur-sm`}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.current, item.target)}
                  <span className={`font-semibold ${item.color}`}>{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {item.current.toFixed(1)} / {item.target} {item.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getProgressPercentage(item.current, item.target).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(item.current, item.target)} transition-all duration-700 ease-out rounded-full relative`}
                    style={{ width: `${getProgressPercentage(item.current, item.target)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 shimmer"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-gray-600">
                  Remaining: {Math.max(0, item.target - item.current).toFixed(1)} {item.unit}
                </span>
                <span className={`font-medium ${
                  getProgressPercentage(item.current, item.target) >= 90 
                    ? 'text-emerald-600' 
                    : 'text-gray-500'
                }`}>
                  {getProgressPercentage(item.current, item.target) >= 90 ? '✓ On Track' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NutritionCard;