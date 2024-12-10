import React from 'react';
import {TextStyle} from 'react-native';

import {createText} from '@shopify/restyle';

import {Theme} from '@theme';

const SRText = createText<Theme>();
type SRTextProps = React.ComponentProps<typeof SRText>;

type TextVariants =
  | 'headingAuthTitle'
  | 'headingExtraLarge'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

type FontIndex = keyof typeof $fontFamily;

export interface TextProps extends SRTextProps {
  preset?: TextVariants;
  font?: FontIndex;
}

export function Text({
  children,
  preset = 'paragraphMedium',
  font = 'regular',
  style,
  ...sRTextProps
}: TextProps) {
  return (
    <SRText
      color="paragraph"
      style={[$fontSizes[preset], {fontFamily: $fontFamily[font]}, style]}
      {...sRTextProps}>
      {children}
    </SRText>
  );
}

export const $fontSizes: Record<TextVariants, TextStyle> = {
  headingAuthTitle: {fontSize: 42, lineHeight: 40},

  headingExtraLarge: {fontSize: 52, lineHeight: 48.4},
  headingLarge: {fontSize: 32, lineHeight: 38.4},
  headingMedium: {fontSize: 22, lineHeight: 26.4},
  headingSmall: {fontSize: 18, lineHeight: 23.4},

  paragraphLarge: {fontSize: 18, lineHeight: 25.2},
  paragraphMedium: {fontSize: 16, lineHeight: 22.4},
  paragraphSmall: {fontSize: 14, lineHeight: 16},

  paragraphCaption: {fontSize: 12, lineHeight: 16.8},
  paragraphCaptionSmall: {fontSize: 10, lineHeight: 14},
};

export const $fontFamily = {
  black: 'Switzer-Black',
  blackItalic: 'Switzer-BlackItalic',
  bold: 'Switzer-Bold',
  boldItalic: 'Switzer-BoldItalic',
  extraBold: 'Switzer-Extrabold',
  extraBoldItalic: 'Switzer-ExtraboldItalic',
  italic: 'Switzer-Italic',
  light: 'Switzer-Light',
  extraLight: 'Switzer-Extralight',
  extraLightItalic: 'Switzer-ExtralightItalic',
  lightItalic: 'Switzer-LightItalic',
  medium: 'Switzer-Medium',
  thin: 'Switzer-Thin',
  thinItalic: 'Switzer-ThinItalic',
  mediumItalic: 'Switzer-MediumItalic',
  regular: 'Switzer-Regular',
  semiBold: 'Switzer-Semibold',
  semiBoldItalic: 'Switzer-SemiboldItalic',
};
