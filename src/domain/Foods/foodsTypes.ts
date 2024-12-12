export interface FoodsAPI {
  id: number;
  created_at: string;
  user_id: string;
  label: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fibre: number;
  sodium: number;
  serv_size: number;
  serv_unit: string;
  food_img: string;
  category_id: number;
}

export interface Foods {
  id: number;
  createdAt: Date;
  userId: string;
  label: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fibre: number;
  sodium: number;
  servSize: number;
  servUnit: string;
  foodImg: string;
  categoryId: number | null;
}

export type AddFoodParams = Omit<FoodsAPI, 'id' | 'created_at'>;

//TO FIX WARNING: Non-serializable values were found in the navigation state.
export interface OnItemPressFoodNavigation extends Omit<Foods, 'createdAt'> {
  createdAt: string;
}
