import { UIThemesAccents } from '../presets';

export type ColorVariable = {
  value: string;
  contrast: string;
  dark: string;
  darker: string;
  light: string;
  lighter: string;
} & UIThemesAccents;
