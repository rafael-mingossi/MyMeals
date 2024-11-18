import React from 'react';
import {TextStyle} from 'react-native';

import {createText} from '@shopify/restyle';

import {Theme} from '@theme';

const SRText = createText<Theme>();
type SRTextProps = React.ComponentProps<typeof SRText>;

type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

export interface TextProps extends SRTextProps {
  preset?: TextVariants;
  bold?: boolean;
  extraBold?: boolean;
  italic?: boolean;
  semiBold?: boolean;
}

export function Text({
  children,
  preset = 'paragraphMedium',
  bold,
  extraBold,
  italic,
  semiBold,
  style,
  ...sRTextProps
}: TextProps) {
  const fontFamily = getFontFamily(preset, bold, italic, extraBold, semiBold);

  return (
    <SRText
      color="paragraph"
      style={[$fontSizes[preset], {fontFamily}, style]}
      {...sRTextProps}>
      {children}
    </SRText>
  );
}

function getFontFamily(
  preset: TextVariants,
  bold?: boolean,
  extraBold?: boolean,
  italic?: boolean,
  semiBold?: boolean,
) {
  //This if below address the need of every heading being bold, this will avoid the need of passing bold everytime we use a heading
  if (
    preset === 'headingLarge' ||
    preset === 'headingMedium' ||
    preset === 'headingSmall'
  ) {
    return italic
      ? $fontFamily.boldItalic
      : extraBold
        ? $fontFamily.extraBold
        : $fontFamily.bold;
  }
  switch (true) {
    case bold && italic:
      return $fontFamily.boldItalic;
    case bold:
      return $fontFamily.bold;
    case extraBold && italic:
      return $fontFamily.extraBoldItalic;
    case extraBold:
      return $fontFamily.extraBold;
    case italic:
      return $fontFamily.italic;
    case semiBold && italic:
      return $fontFamily.mediumItalic;
    case semiBold:
      return $fontFamily.medium;
    default:
      return $fontFamily.regular;
  }
}

export const $fontSizes: Record<TextVariants, TextStyle> = {
  headingLarge: {fontSize: 32, lineHeight: 38.4},
  headingMedium: {fontSize: 22, lineHeight: 26.4},
  headingSmall: {fontSize: 18, lineHeight: 23.4},

  paragraphLarge: {fontSize: 18, lineHeight: 25.2},
  paragraphMedium: {fontSize: 16, lineHeight: 22.4},
  paragraphSmall: {fontSize: 14, lineHeight: 19.6},

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
