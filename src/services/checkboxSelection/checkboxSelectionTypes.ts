export interface Selectable {
  id: number;
}

export interface SelectionState<T extends Selectable> {
  selectedItems: Map<number, T>;
  toggleItem: (item: T) => void;
  addSelectedItems: () => T[];
  clearSelection: () => void;
}
