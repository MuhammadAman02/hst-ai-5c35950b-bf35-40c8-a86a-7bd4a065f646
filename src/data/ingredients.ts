import { Ingredient } from '../types/nutrition';

export const ingredients: Ingredient[] = [
  // Protein Sources
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'Protein',
    nutritionPer100g: {
      protein: 31,
      carbs: 0,
      fats: 3.6,
      calories: 165,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 15,
      iron: 1,
      potassium: 256
    },
    commonServingSize: 150,
    unit: 'g'
  },
  {
    id: 'salmon',
    name: 'Salmon Fillet',
    category: 'Protein',
    nutritionPer100g: {
      protein: 25,
      carbs: 0,
      fats: 13,
      calories: 208,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 11,
      calcium: 12,
      iron: 0.8,
      potassium: 363
    },
    commonServingSize: 120,
    unit: 'g'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    category: 'Protein',
    nutritionPer100g: {
      protein: 10,
      carbs: 4,
      fats: 0.4,
      calories: 59,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 110,
      iron: 0.1,
      potassium: 141
    },
    commonServingSize: 200,
    unit: 'g'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'Protein',
    nutritionPer100g: {
      protein: 13,
      carbs: 1.1,
      fats: 11,
      calories: 155,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 2,
      calcium: 56,
      iron: 1.8,
      potassium: 138
    },
    commonServingSize: 60,
    unit: 'g'
  },

  // Carb Sources
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 4.4,
      carbs: 22,
      fats: 1.9,
      calories: 120,
      fiber: 2.8,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 17,
      iron: 1.5,
      potassium: 172
    },
    commonServingSize: 80,
    unit: 'g'
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 2.6,
      carbs: 23,
      fats: 0.9,
      calories: 111,
      fiber: 1.8,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 10,
      iron: 0.4,
      potassium: 43
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 2,
      carbs: 20,
      fats: 0.1,
      calories: 86,
      fiber: 3,
      vitaminC: 2.4,
      vitaminD: 0,
      calcium: 30,
      iron: 0.6,
      potassium: 337
    },
    commonServingSize: 150,
    unit: 'g'
  },
  {
    id: 'oats',
    name: 'Oats',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 17,
      carbs: 66,
      fats: 7,
      calories: 389,
      fiber: 10.6,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 54,
      iron: 4.7,
      potassium: 429
    },
    commonServingSize: 50,
    unit: 'g'
  },

  // Vegetables
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'Vegetables',
    nutritionPer100g: {
      protein: 2.8,
      carbs: 7,
      fats: 0.4,
      calories: 34,
      fiber: 2.6,
      vitaminC: 89.2,
      vitaminD: 0,
      calcium: 47,
      iron: 0.7,
      potassium: 316
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'Vegetables',
    nutritionPer100g: {
      protein: 2.9,
      carbs: 3.6,
      fats: 0.4,
      calories: 23,
      fiber: 2.2,
      vitaminC: 28.1,
      vitaminD: 0,
      calcium: 99,
      iron: 2.7,
      potassium: 558
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    category: 'Vegetables',
    nutritionPer100g: {
      protein: 1,
      carbs: 7,
      fats: 0.3,
      calories: 31,
      fiber: 2.5,
      vitaminC: 127.7,
      vitaminD: 0,
      calcium: 10,
      iron: 0.4,
      potassium: 211
    },
    commonServingSize: 120,
    unit: 'g'
  },

  // Healthy Fats
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fats',
    nutritionPer100g: {
      protein: 2,
      carbs: 9,
      fats: 15,
      calories: 160,
      fiber: 7,
      vitaminC: 10,
      vitaminD: 0,
      calcium: 12,
      iron: 0.6,
      potassium: 485
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Fats',
    nutritionPer100g: {
      protein: 21,
      carbs: 22,
      fats: 50,
      calories: 579,
      fiber: 12.5,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 269,
      iron: 3.7,
      potassium: 733
    },
    commonServingSize: 30,
    unit: 'g'
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    category: 'Fats',
    nutritionPer100g: {
      protein: 0,
      carbs: 0,
      fats: 100,
      calories: 884,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 1,
      iron: 0.6,
      potassium: 1
    },
    commonServingSize: 15,
    unit: 'ml'
  }
];