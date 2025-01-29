import {barCodeAdapter} from './barCodeAdapter.ts';
import {barCodeApi} from './barCodeApi.ts';
import {BarCode} from './barCodeTypes.ts';

async function getFoodByBarCode(barcode: string): Promise<BarCode> {
  const barCodeFood = await barCodeApi.getFoodByBarCode(barcode);
  return barCodeAdapter.toBarCode(barCodeFood);
}

export const barCodeService = {
  getFoodByBarCode,
};
