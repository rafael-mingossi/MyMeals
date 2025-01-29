import {BarCode, BarCodeApi} from './barCodeTypes.ts';

function toBarCode(barCodeAPI: BarCodeApi): BarCode {
  return {
    status: barCodeAPI.status,
    label: barCodeAPI.product.product_name,
    calories: barCodeAPI.product.nutriments['energy-kcal_100g'],
    protein: barCodeAPI.product.nutriments.proteins_100g,
    fat: barCodeAPI.product.nutriments.fat_100g,
    sodium: barCodeAPI.product.nutriments.sodium_100g,
    fibre: barCodeAPI.product.nutriments.sodium_100g,
    carbs: barCodeAPI.product.nutriments.carbohydrates_100g,
    servSize: 100,
    servUnit: 'g',
    foodImg: '',
  };
}

export const barCodeAdapter = {
  toBarCode,
};
