export interface BarCode {
  status: number;
  label: string;
  calories: number;
  protein: number;
  fat: number;
  sodium: number;
  fibre: number;
  carbs: number;
  servSize: number;
  servUnit: string;
  foodImg: string;
}

export interface BarCodeParams {
  id: number;
  createdAt: string;
  userId: string;
  label: string;
  calories: number;
  protein: number;
  fat: number;
  sodium: number;
  fibre: number;
  carbs: number;
  servSize: number;
  servUnit: string;
  foodImg: string;
  categoryId: number | null;
  isArchived: boolean;
}

export interface BarCodeApi {
  status: number;
  product: {
    product_name: string;
    nutriments: {
      'energy-kcal_100g': number;
      proteins_100g: number;
      fat_100g: number;
      carbohydrates_100g: number;
      sodium_100g: number;
      fiber_100g: number;
    };
    product_quantity: string;
    product_quantity_unit: string;
    image_front_url: string;
  };
}
