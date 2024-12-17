import {Foods, Recipe} from '@domain';
import {create} from 'zustand';

import {MealItemsState, MealItemType} from './mealItemsTypes';

export const useMealItemsStore = create<MealItemsState>((set, get) => ({
  mealItems: new Map(),

  toggleMealItem: (
    type: MealItemType,
    item: Foods | Recipe,
    quantity: number,
    mode: 'checkbox' | 'quantity' = 'checkbox',
  ) => {
    set(state => {
      const newMealItems = new Map(state.mealItems);
      const itemKey = `${type}-${item.id}`;

      if (newMealItems.has(itemKey)) {
        if (mode === 'checkbox') {
          // In checkbox mode, always remove item when toggling an existing item
          newMealItems.delete(itemKey);
        } else {
          // In quantity mode, update quantity if different
          const existingItem = newMealItems.get(itemKey)!;
          if (existingItem.quantity !== quantity) {
            newMealItems.set(itemKey, {
              ...existingItem,
              quantity,
            });
          } else {
            // If quantities are the same, remove the item
            newMealItems.delete(itemKey);
          }
        }
      } else {
        // Add new item
        newMealItems.set(itemKey, {
          id: item.id,
          type,
          item,
          quantity,
        });
      }

      return {mealItems: newMealItems};
    });
  },

  removeMealItem: (itemKey: string) => {
    set(state => {
      const newMealItems = new Map(state.mealItems);
      newMealItems.delete(itemKey);
      return {mealItems: newMealItems};
    });
  },

  getMealItems: () => {
    return Array.from(get().mealItems.values());
  },

  clearMealItems: () => {
    set({mealItems: new Map()});
  },
}));

// Hook for accessing meal items state and actions
export function useMealItems() {
  const mealItems = useMealItemsStore(state => state.mealItems);
  const toggleMealItem = useMealItemsStore(state => state.toggleMealItem);
  const removeMealItem = useMealItemsStore(state => state.removeMealItem);
  const getMealItems = useMealItemsStore(state => state.getMealItems);
  const clearMealItems = useMealItemsStore(state => state.clearMealItems);

  // Utility function to check if an item is selected
  const isItemSelected = (type: MealItemType, id: number) => {
    return mealItems.has(`${type}-${id}`);
  };

  return {
    mealItems,
    toggleMealItem,
    removeMealItem,
    getMealItems,
    clearMealItems,
    isItemSelected,
  };
}
