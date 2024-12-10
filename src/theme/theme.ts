import {createTheme} from '@shopify/restyle';
import {ViewStyle} from 'react-native/types';

import {colours} from './colours.ts';

export const theme = createTheme({
  colors: colours.lightTheme,
  spacing: {
    s2: 2,
    s4: 4,
    s8: 8,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s16n: -16,
    s20: 20,
    s24: 24,
    s32: 32,
    s40: 40,
    s48: 48,
    s56: 56,
    s60: 60,
    s70: 70,
  },
  borderRadii: {
    s2: 2,
    s8: 8,
    s12: 12,
    s16: 16,
    s100: 100,
  },
  textVariants: {
    defaults: {},
  },
});

export const darkTheme = {
  ...theme,
  colors: colours.darkTheme,
};

export const $shadowProps: ViewStyle = {
  elevation: 10,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: -3,
  },
};

export type Theme = typeof theme;
export type ThemeColours = keyof Theme['colors'];
