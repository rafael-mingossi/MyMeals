import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {barCodeService} from '../barCodeService.ts';
import {BarCode} from '../barCodeTypes.ts';

export function useGetFoodByBarCode(barcode: string | null) {
  const {
    data: barcodeFood,
    isLoading,
    error,
  } = useQuery<BarCode, Error>({
    queryKey: [QueryKeys.BarCode, barcode],
    queryFn: () => barCodeService.getFoodByBarCode(barcode),
    enabled: !!barcode, // Only run the query when barcode is truthy
  });

  return {
    barcodeFood,
    isLoading,
    error,
  };
}
