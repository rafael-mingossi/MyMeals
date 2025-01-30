import {openFoodApi} from '@api';

import {BarCodeApi} from './barCodeTypes.ts';

async function getFoodByBarCode(barcode: string | null): Promise<BarCodeApi> {
  const response = await openFoodApi.get<BarCodeApi>(`${barcode}.json`);
  return response.data;
}

export const barCodeApi = {
  getFoodByBarCode,
};
