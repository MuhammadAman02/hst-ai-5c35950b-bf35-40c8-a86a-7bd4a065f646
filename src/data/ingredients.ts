import { Ingredient } from '../types/nutrition';

export const ingredients: Ingredient[] = [
  // Proteins
  {
    id: '1',
    name: 'Chicken Breast',
    category: 'Protein',
    nutritionPer100g: {
      protein: 31,
      carbs: 0,
      fats: 3.6,
      calories: 165,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 0.1,
      calcium: 15,
      iron: 0.7,
      potassium: 256
    },
    commonServingSize: 150,
    unit: 'g'
  },
  {
    id: '3',
    name: 'Salmon',
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
    id: '6',
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
    commonServingSize: 170,
    unit: 'g'
  },
  {
    id: '14',
    name: 'Black Beans',
    category: 'Protein',
    nutritionPer100g: {
      protein: 21,
      carbs: 63,
      fats: 1,
      calories: 341,
      fiber: 15,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 160,
      iron: 5.0,
      potassium: 1483
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: '15',
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
      iron: 1.75,
      potassium: 138
    },
    commonServingSize: 60,
    unit: 'g'
  },
  {
    id: '16',
    name: 'Tuna',
    category: 'Protein',
    nutritionPer100g: {
      protein: 30,
      carbs: 0,
      fats: 1,
      calories: 132,
      fiber: 0,
      vitaminC: 0,
      vitaminD: 5.7,
      calcium: 8,
      iron: 1.3,
      potassium: 252
    },
    commonServingSize: 100,
    unit: 'g'
  },

  // Carbs
  {
    id: '2',
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
    id: '5',
    name: 'Oats',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 17,
      carbs: 66,
      fats: 7,
      calories: 389,
      fiber: 11,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 54,
      iron: 5,
      potassium: 429
    },
    commonServingSize: 50,
    unit: 'g'
  },
  {
    id: '7',
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
    id: '9',
    name: 'Banana',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 1.1,
      carbs: 23,
      fats: 0.3,
      calories: 89,
      fiber: 2.6,
      vitaminC: 8.7,
      vitaminD: 0,
      calcium: 5,
      iron: 0.3,
      potassium: 358
    },
    commonServingSize: 120,
    unit: 'g'
  },
  {
    id: '11',
    name: 'Orange',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 0.9,
      carbs: 12,
      fats: 0.1,
      calories: 47,
      fiber: 2.4,
      vitaminC: 53,
      vitaminD: 0,
      calcium: 40,
      iron: 0.1,
      potassium: 181
    },
    commonServingSize: 150,
    unit: 'g'
  },
  {
    id: '12',
    name: 'Strawberries',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 0.7,
      carbs: 8,
      fats: 0.3,
      calories: 32,
      fiber: 2,
      vitaminC: 59,
      vitaminD: 0,
      calcium: 16,
      iron: 0.4,
      potassium: 153
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: '13',
    name: 'Quinoa',
    category: 'Carbs',
    nutritionPer100g: {
      protein: 14,
      carbs: 64,
      fats: 6,
      calories: 368,
      fiber: 7,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 47,
      iron: 4.6,
      potassium: 563
    },
    commonServingSize: 100,
    unit: 'g'
  },

  // Vegetables
  {
    id: '4',
    name: 'Broccoli',
    category: 'Vegetables',
    nutritionPer100g: {
      protein: 2.8,
      carbs: 7,
      fats: 0.4,
      calories: 34,
      fiber: 2.6,
      vitaminC: 89,
      vitaminD: 0,
      calcium: 47,
      iron: 0.7,
      potassium: 316
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: '17',
    name: 'Spinach',
    category: 'Vegetables',
    nutritionPer100g: {
      protein: 2.9,
      carbs: 3.6,
      fats: 0.4,
      calories: 23,
      fiber: 2.2,
      vitaminC: 28,
      vitaminD: 0,
      calcium: 99,
      iron: 2.7,
      potassium: 558
    },
    commonServingSize: 100,
    unit: 'g'
  },
  {
    id: '18',
    name: 'Bell Peppers',
    category: 'Vegetables',
    nutritionPer100g: {
      protein: 1,
      carbs: 7,
      fats: 0.3,
      calories: 31,
      fiber: 2.5,
      vitaminC: 128,
      vitaminD: 0,
      calcium: 7,
      iron: 0.4,
      potassium: 211
    },
    commonServingSize: 100,
    unit: 'g'
  },

  // Healthy Fats
  {
    id: '8',
    name: 'Almonds',
    category: 'Fats',
    nutritionPer100g: {
      protein: 21,
      carbs: 22,
      fats: 50,
      calories: 579,
      fiber: 12,
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
    id: '10',
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
    id: '19',
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
  },
  {
    id: '20',
    name: 'Walnuts',
    category: 'Fats',
    nutritionPer100g: {
      protein: 15,
      carbs: 14,
      fats: 65,
      calories: 654,
      fiber: 7,
      vitaminC: 1.3,
      vitaminD: 0,
      calcium: 98,
      iron: 2.9,
      potassium: 441
    },
    commonServingSize: 30,
    unit: 'g'
  }
];