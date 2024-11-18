import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAppTheme} from './useAppTheme.ts';

export function useAppSafeArea() {
  const {top, bottom} = useSafeAreaInsets();
  const {spacing} = useAppTheme();

  return {
    //When the top or bottom is less than s20, the value is going to be s20
    top: Math.max(top, spacing.s20),
    bottom: Math.max(bottom, spacing.s20),
  };
}
