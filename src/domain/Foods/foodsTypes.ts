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
  is_archived: boolean;
}

export interface Foods {
  id: number;
  createdAt: string;
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
  isArchived: boolean;
}

export type FoodMode = 'create' | 'update' | 'barcode';

export type AddFoodParams = Omit<FoodsAPI, 'id' | 'created_at'> & {
  is_archived?: boolean;
};

export type UpdateFoodParams = Omit<
  FoodsAPI,
  'created_at' | 'user_id' | 'is_archived'
>;
