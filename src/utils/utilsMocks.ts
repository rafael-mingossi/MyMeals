import {Foods, MealsTypes, Recipe} from '@domain';
import {MealItemType} from '@services';

const food = {
  id: 1,
  createdAt: 'string',
  userId: 'string',
  label: 'string',
  protein: 10,
  carbs: 10,
  fat: 10,
  calories: 10,
  fibre: 10,
  sodium: 10,
  servSize: 10,
  servUnit: 'string',
  foodImg: 'string',
  categoryId: 10,
  isArchived: false,
};

const recipeItem = [
  {
    id: 2,
    createdAt: '02/02/02',
    recipeId: 22,
    foodId: 222,
    quantity: 1,
  },
];

const recipe = {
  id: 1,
  createdAt: '01/01/01',
  userId: 'userid1',
  label: 'recipe name',
  totalCalories: 5,
  totalCarbs: 5,
  totalFat: 5,
  totalProtein: 5,
  totalFibre: 5,
  totalSodium: 5,
  servSize: 5,
  servUnit: 'spoon',
  image: '',
  recipeItems: recipeItem,
  isArchived: false,
};

const mealItem = [
  {
    createdAt: '2025-01-17T13:02:26.797366+00:00',
    foodId: 9,
    foodQuantity: 2,
    id: 92,
    mealId: 52,
    recipeId: undefined,
    recipeQuantity: undefined,
  },
];

const mealType: MealsTypes = 'breakfast';

const meal = [
  {
    createdAt: '2025-01-17T13:02:26.714983+00:00',
    dateAdded: '2025-01-18',
    id: 52,
    mealItems: mealItem,
    mealType: mealType,
    totalCalories: 300,
    totalCarbs: 10,
    totalFat: 200,
    totalFibre: 0,
    totalProtein: 20,
    totalSodium: 0,
    userId: '14484a59-9304-43f4-8e5b-d81d2891f13b',
  },
  {
    createdAt: '2025-01-17T13:02:26.714983+00:00',
    dateAdded: '2025-01-18',
    id: 52,
    mealItems: mealItem,
    mealType: mealType,
    totalCalories: 30,
    totalCarbs: 20,
    totalFat: 20,
    totalFibre: 10,
    totalProtein: 10,
    totalSodium: 0,
    userId: '14484a59-9304-43f4-8e5b-d81d2891f13b',
  },
];

const mealType1: MealItemType = 'food';
const mealType2: MealItemType = 'recipe';

const mealItemSelected1: Foods | Recipe = food;
const mealItemSelected2: Foods | Recipe = recipe;

const selectedMealItems = [
  {id: 9, item: mealItemSelected1, quantity: 1, type: mealType1},
  {
    id: 2,
    item: mealItemSelected2,
    quantity: 1,
    type: mealType2,
  },
];

export const utilsMocks = {
  food,
  recipe,
  meal,
  mealItem,
  selectedMealItems,
};
