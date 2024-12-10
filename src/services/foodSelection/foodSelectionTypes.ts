import {Foods} from '@domain';

export interface FoodSelectionState {
  selectedFoods: Map<number, Foods>;
  toggleFood: (food: Foods) => void;
  addSelectedFoods: () => Foods[];
  clearSelection: () => void;
}
