import {Foods, Recipe} from '@domain';
import {create} from 'zustand';

import {Selectable, SelectionState} from './checkboxSelectionTypes.ts';

export function createSelectionStore<T extends Selectable>() {
  return create<SelectionState<T>>((set, get) => ({
    selectedItems: new Map(),

    toggleItem: (item: T) => {
      set(state => {
        const newSelection = new Map(state.selectedItems);
        if (newSelection.has(item.id)) {
          newSelection.delete(item.id);
        } else {
          newSelection.set(item.id, item);
        }
        return {selectedItems: newSelection};
      });
    },

    addSelectedItems: () => {
      return Array.from(get().selectedItems.values());
    },

    clearSelection: () => {
      set({selectedItems: new Map()});
    },
  }));
}

// Specific store instances
export const useFoodSelectionStore = createSelectionStore<Foods>();
export const useRecipeSelectionStore = createSelectionStore<Recipe>();

// Foods state and services
export function useFoodSelection(): SelectionState<Foods>['selectedItems'] {
  return useFoodSelectionStore(state => state.selectedItems);
}

export function useFoodSelectionService(): Omit<
  SelectionState<Foods>,
  'selectedItems'
> {
  const toggleItem = useFoodSelectionStore(state => state.toggleItem);
  const addSelectedItems = useFoodSelectionStore(
    state => state.addSelectedItems,
  );
  const clearSelection = useFoodSelectionStore(state => state.clearSelection);

  return {
    toggleItem,
    addSelectedItems,
    clearSelection,
  };
}

// Recipes state and services
export function useRecipeSelection(): SelectionState<Recipe>['selectedItems'] {
  return useRecipeSelectionStore(state => state.selectedItems);
}

export function useRecipeSelectionService(): Omit<
  SelectionState<Recipe>,
  'selectedItems'
> {
  const toggleItem = useRecipeSelectionStore(state => state.toggleItem);
  const addSelectedItems = useRecipeSelectionStore(
    state => state.addSelectedItems,
  );
  const clearSelection = useRecipeSelectionStore(state => state.clearSelection);

  return {
    toggleItem,
    addSelectedItems,
    clearSelection,
  };
}
