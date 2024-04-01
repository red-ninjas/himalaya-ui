import { tuple } from 'components/utils/prop-types';

export const UiOverrideColors = tuple('gray', 'secondary', 'tertiary', 'success', 'error', 'primary', 'warning', 'link', 'code');
export const UiNotOverrideableColors = tuple('default', 'dark');

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

/**
 * Overrideable color types
 */
export type UIOverrideColorKeys = (typeof UiOverrideColors)[number];

/**
 * Extra color types (not-overrideable)
 */

export type UINotOverrideColorKeys = (typeof UiNotOverrideableColors)[number];

/**
 * Possible color types
 */
export type UIColorTypes = UIOverrideColorKeys | UINotOverrideColorKeys | string;
export type UIColorAcentKeys = 'background' | 'foreground' | 'border';
export type UIColorAndAccentKeys = UIOverrideColorKeys | UIColorAcentKeys;
export type UIColorAccents = Record<UIColorAcentKeys, UIColorAccent>;
export type UIColors = Record<UIOverrideColorKeys, UIColor>;
export type UIAllColors = UIColors & UIColorAccents;

export interface UIThemesCore {
  gradient_1: Gradient;
  gradient_2: Gradient;
  gradient_3: Gradient;
}
export type UIThemesPalette = UIThemesCore & UIAllColors;

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
