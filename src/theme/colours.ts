export const palette = {
  /// ERROR
  red: '#d54040',

  /// BACKGROUND
  backgroundLight: '#f0eff4',
  backgroundInnerLight: '#ffffff',
  backgroundDark: '#000000',
  backgroundInnerDark: '#1c1c1e',

  /// NEUTRAL
  black: '#000000',
  white: '#ffffff',
  gray: '#9e9e9e',
  gray2: '#8E8E8E',
  gray4: '#E1E1E1',

  /// BORDER
  borderGrayLight: '#c5c5c5',
  borderGrayDark: '#555555',

  /// PRIMARY
  greenPrimary: '#3fae4d',
  bluePrimary: '#66a4d6',
  grayPrimary: '#6d6d6d',
  orangePrimary: '#ff9a00',
};

const lightTheme = {
  ...palette,
  primary: palette.greenPrimary,
  primaryContrast: palette.white,

  buttonRoundPrimary: palette.greenPrimary,

  buttonTextPrimary: palette.bluePrimary,

  buttonSquarePrimary: palette.bluePrimary,

  background: palette.backgroundLight,
  backgroundContrast: palette.black,

  backgroundInner: palette.backgroundInnerLight,

  success: palette.grayPrimary,

  borderGray: palette.borderGrayLight,

  error: palette.red,

  paragraph: palette.black,
  paragraphBlue: palette.bluePrimary,
  paragraphOrange: palette.orangePrimary,
  paragraphGray: palette.gray,
  paragraphGreen: palette.greenPrimary,
};

const darkTheme: typeof lightTheme = {
  ...palette,
  primary: palette.greenPrimary,
  primaryContrast: palette.white,

  buttonRoundPrimary: palette.greenPrimary,

  buttonTextPrimary: palette.bluePrimary,

  buttonSquarePrimary: palette.bluePrimary,

  background: palette.backgroundDark,
  backgroundContrast: palette.white,

  backgroundInner: palette.backgroundInnerDark,

  success: palette.grayPrimary,

  borderGray: palette.borderGrayDark,

  error: palette.red,

  paragraph: palette.white,
  paragraphBlue: palette.bluePrimary,
  paragraphOrange: palette.orangePrimary,
  paragraphGray: palette.gray,
  paragraphGreen: palette.greenPrimary,
};

export const colours = {
  palette,
  lightTheme,
  darkTheme,
};
