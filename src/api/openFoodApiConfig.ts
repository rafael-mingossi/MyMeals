import axios from 'axios';

export const OPEN_FOOD_BASE_URL =
  'https://au.openfoodfacts.org/api/v0/product/';
export const openFoodApi = axios.create({
  baseURL: OPEN_FOOD_BASE_URL,
});
