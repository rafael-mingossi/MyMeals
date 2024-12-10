import {Foods} from '@domain';
import {create} from 'zustand';

import {FoodSelectionState} from './foodSelectionTypes.ts';

const useFoodSelectionStore = create<FoodSelectionState>((set, get) => ({
  selectedFoods: new Map(),

  toggleFood: (food: Foods) => {
    set(state => {
      const newSelection = new Map(state.selectedFoods);
      if (newSelection.has(food.id)) {
        newSelection.delete(food.id);
      } else {
        newSelection.set(food.id, food);
      }
      return {selectedFoods: newSelection};
    });
  },

  addSelectedFoods: () => {
    return Array.from(get().selectedFoods.values());
  },

  clearSelection: () => {
    set({selectedFoods: new Map()});
  },
}));

export function useFoodSelection(): FoodSelectionState['selectedFoods'] {
  return useFoodSelectionStore(state => state.selectedFoods);
}

export function useFoodSelectionService(): Omit<
  FoodSelectionState,
  'selectedFoods'
> {
  const toggleFood = useFoodSelectionStore(state => state.toggleFood);
  const addSelectedFoods = useFoodSelectionStore(
    state => state.addSelectedFoods,
  );
  const clearSelection = useFoodSelectionStore(state => state.clearSelection);

  return {
    toggleFood,
    addSelectedFoods,
    clearSelection,
  };
}
