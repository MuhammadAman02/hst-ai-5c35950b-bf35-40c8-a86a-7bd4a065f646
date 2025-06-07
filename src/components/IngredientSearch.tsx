import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { Ingredient } from '../types/nutrition';
import { ingredients } from '../data/ingredients';

interface IngredientSearchProps {
  onAddIngredient: (ingredient: Ingredient, amount: number) => void;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({ onAddIngredient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  console.log('IngredientSearch rendered with searchTerm:', searchTerm);

  const categories = ['All', 'Protein', 'Carbs', 'Vegetables', 'Fats'];

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddIngredient = (ingredient: Ingredient) => {
    console.log('Adding ingredient:', ingredient.name);
    onAddIngredient(ingredient, ingredient.commonServingSize);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-green">
          <Search className="h-5 w-5" />
          Find Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === category 
                  ? 'bg-health-green text-white' 
                  : 'hover:bg-health-green-light'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {filteredIngredients.map(ingredient => (
            <div 
              key={ingredient.id} 
              className="border rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {ingredient.category}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddIngredient(ingredient)}
                  className="bg-health-green hover:bg-health-green-dark"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1">
                <div>Per {ingredient.commonServingSize}{ingredient.unit}:</div>
                <div className="grid grid-cols-2 gap-1">
                  <span>Protein: {(ingredient.nutritionPer100g.protein * ingredient.commonServingSize / 100).toFixed(1)}g</span>
                  <span>Carbs: {(ingredient.nutritionPer100g.carbs * ingredient.commonServingSize / 100).toFixed(1)}g</span>
                  <span>Fats: {(ingredient.nutritionPer100g.fats * ingredient.commonServingSize / 100).toFixed(1)}g</span>
                  <span>Calories: {(ingredient.nutritionPer100g.calories * ingredient.commonServingSize / 100).toFixed(0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No ingredients found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IngredientSearch;