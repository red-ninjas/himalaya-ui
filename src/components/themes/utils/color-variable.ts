import { UIThemesAccents } from '../presets';

export type ColorVariable = {
  value: string;
  contrast: string;
  dark: string;
  darker: string;
} & UIThemesAccents;
