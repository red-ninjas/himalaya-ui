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
  accents_darker: string;
  accents_0: string;
  accents_1: string;
  accents_2: string;
  accents_3: string;
  accents_4: string;
  accents_5: string;
  accents_6: string;
  accents_7: string;
  accents_8: string;
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
