export type MealsTypes = 'breakfast' | 'snack' | 'lunch' | 'dinner';

export interface MealsAPI {
  id: number;
  created_at: string;
  user_id: string;
  meal_type: string;
  date_added: string;
  t_calories: number;
  t_carbs: number;
  t_fat: number;
  t_protein: number;
  t_fibre: number;
  t_sodium: number;
}

export interface MealItemsAPI {
  id: number;
  created_at: string;
  meal_id: number;
  food_id: number | null;
  food_quantity: number | null;
  recipe_id: number | null;
  recipe_quantity: number | null;
}

export interface Meal {
  id: number;
  createdAt: Date;
  userId: string;
  mealType: string;
  dateAdded: Date;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
  totalFibre: number;
  totalSodium: number;
  mealItems?: MealItem[];
}

export interface MealItem {
  id: number;
  createdAt: Date;
  mealId: number;
  foodId?: number;
  foodQuantity?: number;
  recipeId?: number;
  recipeQuantity?: number;
}

export type AddMealParams = Omit<MealsAPI, 'id' | 'created_at'>;
export type AddMealItemParams = Omit<MealItemsAPI, 'id' | 'created_at'>;

export interface CreateMealParams extends Omit<AddMealParams, 'id'> {
  items: {
    foodId?: number;
    foodQuantity?: number;
    recipeId?: number;
    recipeQuantity?: number;
  }[];
}
