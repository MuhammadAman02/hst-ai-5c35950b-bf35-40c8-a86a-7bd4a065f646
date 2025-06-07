import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap, CheckCircle, Award, Flame, Star } from 'lucide-react';
import { DailyProgress } from '../types/nutrition';

interface NutritionCardProps {
  progress: DailyProgress;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ progress }) => {
  console.log('NutritionCard rendered with progress:', progress);
  
  const [animatedProgress, setAnimatedProgress] = useState<Record<string, number>>({});

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'from-emerald-400 to-emerald-600';
    if (percentage >= 70) return 'from-amber-400 to-orange-500';
    if (percentage >= 40) return 'from-blue-400 to-blue-600';
    return 'from-red-400 to-red-600';
  };

  const getStatusIcon = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (percentage >= 70) return { icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' };
    if (percentage >= 40) return { icon: Zap, color: 'text-blue-600', bg: 'bg-blue-100' };
    return { icon: Target, color: 'text-red-500', bg: 'bg-red-100' };
  };

  const getStatusMessage = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'Target achieved! 🎉';
    if (percentage >= 90) return 'Almost there! 💪';
    if (percentage >= 70) return 'Good progress 👍';
    if (percentage >= 40) return 'Keep going! 🚀';
    return 'Just getting started 🌱';
  };

  const nutritionItems = [
    { 
      name: 'Protein', 
      current: progress.current.protein, 
      target: progress.targets.protein, 
      unit: 'g',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      icon: '💪'
    },
    { 
      name: 'Carbs', 
      current: progress.current.carbs, 
      target: progress.targets.carbs, 
      unit: 'g',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: '⚡'
    },
    { 
      name: 'Fats', 
      current: progress.current.fats, 
      target: progress.targets.fats, 
      unit: 'g',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🥑'
    },
    { 
      name: 'Calories', 
      current: progress.current.calories, 
      target: progress.targets.calories, 
      unit: 'kcal',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: '🔥'
    }
  ];

  // Animate progress bars on mount and updates
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedProgress: Record<string, number> = {};
      nutritionItems.forEach(item => {
        newAnimatedProgress[item.name] = getProgressPercentage(item.current, item.target);
      });
      setAnimatedProgress(newAnimatedProgress);
    }, 300);

    return () => clearTimeout(timer);
  }, [progress]);

  const overallProgress = nutritionItems.reduce((acc, item) => {
    return acc + getProgressPercentage(item.current, item.target);
  }, 0) / nutritionItems.length;

  const getOverallStatus = () => {
    if (overallProgress >= 90) return { text: 'Excellent Progress!', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (overallProgress >= 70) return { text: 'Great Work!', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' };
    if (overallProgress >= 40) return { text: 'Good Start!', icon: Flame, color: 'text-blue-600', bg: 'bg-blue-50' };
    return { text: 'Keep Going!', icon: Target, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const overallStatus = getOverallStatus();

  return (
    <Card className="glass-card hover-lift overflow-hidden">
      <CardHeader className="pb-6 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-500"></div>
        </div>
        
        <div className="relative flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <div>Daily Progress</div>
              <div className="text-sm font-normal text-gray-500 mt-1">Track your nutrition goals</div>
            </div>
          </CardTitle>
          
          <div className="text-right">
            <Badge 
              variant="outline" 
              className={`${overallStatus.bg} ${overallStatus.color} border-current font-semibold px-3 py-1 text-sm`}
            >
              <overallStatus.icon className="w-4 h-4 mr-1" />
              {overallProgress.toFixed(0)}%
            </Badge>
            <div className="text-xs text-gray-500 mt-1">{overallStatus.text}</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4 relative">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 transition-all duration-1000 ease-out rounded-full progress-bar"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Overall Progress</span>
            <span className="font-medium">{overallProgress.toFixed(0)}% Complete</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pb-6">
        {nutritionItems.map((item, index) => {
          const status = getStatusIcon(item.current, item.target);
          const progressPercentage = animatedProgress[item.name] || 0;
          
          return (
            <div 
              key={item.name} 
              className="group relative p-5 rounded-2xl bg-white/60 border border-gray-100 hover:shadow-lg transition-all duration-300 card-hover"
              style={{ 
                animationDelay: `${index * 150}ms`,
                transform: 'translateY(20px)',
                opacity: 0,
                animation: `slideUp 0.6s ease-out ${index * 150}ms forwards`
              }}
            >
              {/* Status Indicator */}
              <div className="absolute top-3 right-3">
                <div className={`w-8 h-8 ${status.bg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <status.icon className={`h-4 w-4 ${status.color}`} />
                </div>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <span className={`font-bold text-lg ${item.color}`}>{item.name}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {getStatusMessage(item.current, item.target)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {item.current.toFixed(1)}
                    <span className="text-sm text-gray-500 font-normal">/{item.target}</span>
                  </div>
                  <div className="text-xs text-gray-500">{item.unit}</div>
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(item.current, item.target)} transition-all duration-1000 ease-out rounded-full progress-bar relative`}
                    style={{ width: `${progressPercentage}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Progress indicator dot */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-current transition-all duration-1000 ease-out"
                  style={{ 
                    left: `${Math.min(progressPercentage, 95)}%`,
                    color: progressPercentage >= 90 ? '#10b981' : progressPercentage >= 70 ? '#f59e0b' : '#3b82f6'
                  }}
                />
              </div>
              
              {/* Stats Row */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">
                    Remaining: <span className="font-medium text-gray-700">{Math.max(0, item.target - item.current).toFixed(1)} {item.unit}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    progressPercentage >= 90 ? 'bg-emerald-500' : 
                    progressPercentage >= 70 ? 'bg-amber-500' : 
                    progressPercentage >= 40 ? 'bg-blue-500' : 'bg-red-500'
                  } animate-pulse`}></div>
                  <span className={`font-semibold ${
                    progressPercentage >= 90 ? 'text-emerald-600' : 
                    progressPercentage >= 70 ? 'text-amber-600' : 
                    progressPercentage >= 40 ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Achievement Section */}
        {overallProgress >= 80 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-emerald-700">Outstanding Progress!</div>
                <div className="text-sm text-emerald-600">You're crushing your nutrition goals today! 🎉</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionCard;