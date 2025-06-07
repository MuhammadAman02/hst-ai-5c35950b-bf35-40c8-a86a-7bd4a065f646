import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
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
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-green">
          <Target className="h-5 w-5" />
          Daily Nutrition Targets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreset('weight-loss')}
            className="text-xs"
          >
            Weight Loss
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreset('muscle-gain')}
            className="text-xs"
          >
            Muscle Gain
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreset('maintenance')}
            className="text-xs"
          >
            Maintenance
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="protein" className="text-health-protein font-medium">
              Protein (g)
            </Label>
            <Input
              id="protein"
              type="number"
              value={targets.protein}
              onChange={(e) => handleInputChange('protein', e.target.value)}
              className="border-health-protein/20 focus:border-health-protein"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbs" className="text-health-carbs font-medium">
              Carbohydrates (g)
            </Label>
            <Input
              id="carbs"
              type="number"
              value={targets.carbs}
              onChange={(e) => handleInputChange('carbs', e.target.value)}
              className="border-health-carbs/20 focus:border-health-carbs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fats" className="text-health-fats font-medium">
              Fats (g)
            </Label>
            <Input
              id="fats"
              type="number"
              value={targets.fats}
              onChange={(e) => handleInputChange('fats', e.target.value)}
              className="border-health-fats/20 focus:border-health-fats"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calories" className="text-gray-700 font-medium">
              Calories
            </Label>
            <Input
              id="calories"
              type="number"
              value={targets.calories}
              onChange={(e) => handleInputChange('calories', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fiber" className="text-health-vitamins font-medium">
              Fiber (g)
            </Label>
            <Input
              id="fiber"
              type="number"
              value={targets.fiber}
              onChange={(e) => handleInputChange('fiber', e.target.value)}
              className="border-health-vitamins/20 focus:border-health-vitamins"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vitaminC" className="text-health-vitamins font-medium">
              Vitamin C (mg)
            </Label>
            <Input
              id="vitaminC"
              type="number"
              value={targets.vitaminC}
              onChange={(e) => handleInputChange('vitaminC', e.target.value)}
              className="border-health-vitamins/20 focus:border-health-vitamins"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vitaminD" className="text-health-vitamins font-medium">
              Vitamin D (μg)
            </Label>
            <Input
              id="vitaminD"
              type="number"
              value={targets.vitaminD}
              onChange={(e) => handleInputChange('vitaminD', e.target.value)}
              className="border-health-vitamins/20 focus:border-health-vitamins"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calcium" className="text-health-vitamins font-medium">
              Calcium (mg)
            </Label>
            <Input
              id="calcium"
              type="number"
              value={targets.calcium}
              onChange={(e) => handleInputChange('calcium', e.target.value)}
              className="border-health-vitamins/20 focus:border-health-vitamins"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iron" className="text-health-vitamins font-medium">
              Iron (mg)
            </Label>
            <Input
              id="iron"
              type="number"
              value={targets.iron}
              onChange={(e) => handleInputChange('iron', e.target.value)}
              className="border-health-vitamins/20 focus:border-health-vitamins"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTargetsComponent;