import {Foods, Recipe} from '@domain';

export type MealItemType = 'food' | 'recipe';

export interface MealItem {
  id: number;
  type: MealItemType;
  item: Foods | Recipe;
  quantity: number;
}

export interface MealItemsState {
  mealItems: Map<string, MealItem>;
  toggleMealItem: (
    type: MealItemType,
    item: Foods | Recipe,
    quantity: number,
    mode?: 'checkbox' | 'quantity',
  ) => void;
  removeMealItem: (itemKey: string) => void;
  getMealItems: () => MealItem[];
  clearMealItems: () => void;
}
