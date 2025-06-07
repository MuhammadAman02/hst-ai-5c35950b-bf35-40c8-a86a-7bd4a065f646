import React, { useState } from 'react';
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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 focus-ring"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer text-xs ${
              selectedCategory === category 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredIngredients.map(ingredient => (
          <div 
            key={ingredient.id} 
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:border-emerald-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{ingredient.name}</h4>
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {ingredient.category}
                </Badge>
              </div>
              <Button
                size="sm"
                onClick={() => handleAddIngredient(ingredient)}
                className="gradient-primary hover:shadow-lg text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-xs text-gray-600 space-y-2">
              <div className="font-medium">Per {ingredient.commonServingSize}{ingredient.unit}:</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-50 rounded px-2 py-1 text-center">
                  <div className="font-medium text-emerald-700">
                    {(ingredient.nutritionPer100g.protein * ingredient.commonServingSize / 100).toFixed(1)}g
                  </div>
                  <div className="text-emerald-600">Protein</div>
                </div>
                <div className="bg-blue-50 rounded px-2 py-1 text-center">
                  <div className="font-medium text-blue-700">
                    {(ingredient.nutritionPer100g.carbs * ingredient.commonServingSize / 100).toFixed(1)}g
                  </div>
                  <div className="text-blue-600">Carbs</div>
                </div>
                <div className="bg-purple-50 rounded px-2 py-1 text-center">
                  <div className="font-medium text-purple-700">
                    {(ingredient.nutritionPer100g.fats * ingredient.commonServingSize / 100).toFixed(1)}g
                  </div>
                  <div className="text-purple-600">Fats</div>
                </div>
                <div className="bg-gray-50 rounded px-2 py-1 text-center">
                  <div className="font-medium text-gray-700">
                    {(ingredient.nutritionPer100g.calories * ingredient.commonServingSize / 100).toFixed(0)}
                  </div>
                  <div className="text-gray-600">Cal</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">No ingredients found</p>
          <p className="text-sm">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default IngredientSearch;