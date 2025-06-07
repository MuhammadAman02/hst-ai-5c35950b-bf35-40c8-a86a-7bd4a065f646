import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Target, Zap, TrendingUp, Activity } from 'lucide-react';
import { NutritionTargets } from '../types/nutrition';

interface NutritionTargetsProps {
  targets: NutritionTargets;
  onTargetsChange: (targets: NutritionTargets) => void;
}

const NutritionTargetsComponent: React.FC<NutritionTargetsProps> = ({
  targets,
  onTargetsChange
}) => {
  console.log('NutritionTargets component rendered with targets:', targets);

  const handleInputChange = (field: keyof NutritionTargets, value: string) => {
    const numValue = parseFloat(value) || 0;
    console.log(`Updating ${field} to ${numValue}`);
    onTargetsChange({
      ...targets,
      [field]: numValue
    });
  };

  const setPreset = (preset: 'weight-loss' | 'muscle-gain' | 'maintenance') => {
    console.log(`Setting preset: ${preset}`);
    let newTargets: NutritionTargets;
    
    switch (preset) {
      case 'weight-loss':
        newTargets = {
          protein: 120,
          carbs: 150,
          fats: 60,
          calories: 1500,
          fiber: 25,
          vitaminC: 90,
          vitaminD: 20,
          calcium: 1000,
          iron: 18,
          potassium: 3500
        };
        break;
      case 'muscle-gain':
        newTargets = {
          protein: 150,
          carbs: 250,
          fats: 80,
          calories: 2200,
          fiber: 30,
          vitaminC: 90,
          vitaminD: 20,
          calcium: 1000,
          iron: 18,
          potassium: 3500
        };
        break;
      case 'maintenance':
        newTargets = {
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
        };
        break;
    }
    onTargetsChange(newTargets);
  };

  return (
    <Card className="glass-card hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Target className="h-4 w-4 text-white" />
          </div>
          Daily Targets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreset('weight-loss')}
            className="text-xs hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all duration-200"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Weight Loss
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreset('muscle-gain')}
            className="text-xs hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-200"
          >
            <Zap className="h-3 w-3 mr-1" />
            Muscle Gain
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreset('maintenance')}
            className="text-xs hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200"
          >
            <Activity className="h-3 w-3 mr-1" />
            Maintenance
          </Button>
        </div>

        <div className="space-y-4">
          {/* Macronutrients */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">Macronutrients</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="protein" className="text-sm font-medium text-emerald-600">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  type="number"
                  value={targets.protein}
                  onChange={(e) => handleInputChange('protein', e.target.value)}
                  className="focus-ring border-emerald-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carbs" className="text-sm font-medium text-blue-600">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  value={targets.carbs}
                  onChange={(e) => handleInputChange('carbs', e.target.value)}
                  className="focus-ring border-blue-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fats" className="text-sm font-medium text-purple-600">
                  Fats (g)
                </Label>
                <Input
                  id="fats"
                  type="number"
                  value={targets.fats}
                  onChange={(e) => handleInputChange('fats', e.target.value)}
                  className="focus-ring border-purple-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories" className="text-sm font-medium text-gray-600">
                  Calories
                </Label>
                <Input
                  id="calories"
                  type="number"
                  value={targets.calories}
                  onChange={(e) => handleInputChange('calories', e.target.value)}
                  className="focus-ring border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Micronutrients */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">Key Nutrients</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="fiber" className="text-sm font-medium text-green-600">
                  Fiber (g)
                </Label>
                <Input
                  id="fiber"
                  type="number"
                  value={targets.fiber}
                  onChange={(e) => handleInputChange('fiber', e.target.value)}
                  className="focus-ring border-green-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vitaminC" className="text-sm font-medium text-orange-600">
                  Vitamin C (mg)
                </Label>
                <Input
                  id="vitaminC"
                  type="number"
                  value={targets.vitaminC}
                  onChange={(e) => handleInputChange('vitaminC', e.target.value)}
                  className="focus-ring border-orange-200"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTargetsComponent;