import React from 'react';
import {
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';

import {
  createBox,
  createRestyleComponent,
  layout,
  LayoutProps,
  border,
  BorderProps,
  spacing,
  SpacingProps,
  backgroundColor,
  BackgroundColorProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';

import {Theme} from '@theme';

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

type RestyleTypes = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme>;

export type TouchableOpacityBoxProps = RNTouchableOpacityProps & RestyleTypes;
export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [layout, border, spacing, spacingShorthand, backgroundColor],
  TouchableOpacity,
);

export type PressableBoxProps = PressableProps & RestyleTypes;

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
  [layout, border, spacing, spacingShorthand, backgroundColor],
  TouchableOpacity,
);
