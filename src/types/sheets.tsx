import {MealsTypes} from '@domain';
import {
  registerSheet,
  SheetDefinition,
  SheetProps,
} from 'react-native-actions-sheet';

import {BottomSheetCart, BottomSheetMenu} from '@components';

registerSheet('bs-menu', BottomSheetMenu);
registerSheet('bs-cart', BottomSheetCart);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'bs-menu': SheetDefinition<SheetProps>;
    'bs-cart': SheetDefinition<{
      payload: {
        mealType: MealsTypes;
      };
    }>;
  }
}

export {};
