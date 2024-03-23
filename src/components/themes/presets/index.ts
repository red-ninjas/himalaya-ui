import { ColorVariable } from '../utils/color-variable';

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
export interface UIThemesAccents {
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
}
export interface UIThemesColors {
  background: ColorVariable;
  foreground: ColorVariable;
  secondary: ColorVariable;
  tertiary: ColorVariable;
  success: ColorVariable;
  error: ColorVariable;
  primary: ColorVariable;
  warning: ColorVariable;
  link: ColorVariable;
  code: ColorVariable;
  paragraph: ColorVariable;
  codeBg: ColorVariable;
  border: ColorVariable;
}

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

export interface UIStyling {
  radius: string;
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
  style: UIStyling;
  palette: UIThemesPalette;
  expressiveness: UIThemesExpressiveness;
}
