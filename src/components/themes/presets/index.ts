export interface Gradient {
  from: string;
  to: string;
}

export enum GradientPositionsEnum {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type GradientPositions = GradientPositionsEnum | number;
export interface UIColorAccent {
  hex_100: string;
  hex_200: string;
  hex_300: string;
  hex_400: string;
  hex_500: string;
  hex_600: string;
  hex_700: string;
  hex_800: string;
  hex_900: string;
  hex_1000: string;
}
export interface UIColor {
  contrast: string;
  hex_100: string;
  hex_200: string;
  hex_300: string;
  hex_400: string;
  hex_500: string;
  hex_600: string;
  hex_700: string;
  hex_800: string;
  hex_900: string;
  hex_1000: string;
  hex_1100: string;
  hex_1200: string;
  hex_1300: string;
  hex_1400: string;
  hex_1500: string;
  hex_1600: string;
  hex_1700: string;
  hex_1800: string;
  hex_1900: string;
}

export type UIThemesColors = {
  background: UIColorAccent;
  foreground: UIColorAccent;
  gray: UIColor;
  secondary: UIColor;
  tertiary: UIColor;
  success: UIColor;
  error: UIColor;
  primary: UIColor;
  warning: UIColor;
  link: UIColor;
  code: UIColor;
  border: UIColor;
};

export type UIThemesColorKeys = keyof UIThemesColors;

export interface UIThemesCore {
  gradient_1: Gradient;
  gradient_2: Gradient;
  gradient_3: Gradient;
}
export type UIThemesPalette = UIThemesCore & UIThemesColors;

export interface UIThemesExpressiveness {
  linkStyle: string;
  linkHoverStyle: string;
  dropdownBoxShadow: string;
  scrollerStart: string;
  scrollerEnd: string;
  shadowSmall: string;
  shadowMedium: string;
  shadowLarge: string;
  portalOpacity: number;
}

export interface UIThemesFont {
  sans: string;
  mono: string;
  prism: string;
  baseSize: number;
  headingFactor: number;
  baseLineHeight: number;
}

export interface UIThemes {
  type: string;
  font: UIThemesFont;
  palette: UIThemesPalette;
  expressiveness: UIThemesExpressiveness;
}
