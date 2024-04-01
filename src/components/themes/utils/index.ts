import { UIAllColors, UIColor, UIColorAccent, UIColorAndAccentKeys } from '../presets';
import { Color } from './color';

export const makeStepColors = (background = '#ffffff', text = '#000000') => {
  const color = new Color(background);
  const colors = new Array(9).fill(null);

  return colors.map((_, i) => color.mix(text, ((i + 1) * 10) / 100).hex);
};

export const getContrast = (value: string) => {
  const color = new Color(value);
  return color.contrast().hex;
};

export const makeColor = (value: string, background: string): UIColor => {
  const color = new Color(value);

  const stepped = makeStepColors(color.hex, new Color(background).contrast().hex);
  const reveresed = makeStepColors(color.hex, background);
  const colorTable = {
    contrast: color.contrast().hex,
    hex_100: stepped[8],
    hex_200: stepped[7],
    hex_300: stepped[6],
    hex_400: stepped[5],
    hex_500: stepped[4],
    hex_600: stepped[3],
    hex_700: stepped[2],
    hex_800: stepped[1],
    hex_900: stepped[0],
    hex_1000: value,
    hex_1100: reveresed[0],
    hex_1200: reveresed[1],
    hex_1300: reveresed[2],
    hex_1400: reveresed[3],
    hex_1500: reveresed[4],
    hex_1600: reveresed[5],
    hex_1700: reveresed[6],
    hex_1800: reveresed[7],
    hex_1900: reveresed[8],
  };

  return colorTable;
};

export const makeColorAccent = (value: string, background: string): UIColorAccent => {
  const color = new Color(value);
  const stepped = makeStepColors(color.hex, background);
  const colorTable = {
    hex_100: stepped[8],
    hex_200: stepped[7],
    hex_300: stepped[6],
    hex_400: stepped[5],
    hex_500: stepped[4],
    hex_600: stepped[3],
    hex_700: stepped[2],
    hex_800: stepped[1],
    hex_900: stepped[0],
    hex_1000: value,
  };

  return colorTable;
};

export type makeColorProps = {
  [key in UIColorAndAccentKeys]?: string;
};

export const makeColors = (newConfig: makeColorProps): UIAllColors => {
  const backgroundReversed = new Color(newConfig.background ?? '#000000').contrast().hex;

  const result: UIAllColors = {
    background: makeColorAccent(newConfig['background'] ?? '#7d7d7d', backgroundReversed),
    border: makeColorAccent(newConfig['border'] ?? '#333333', backgroundReversed),
    gray: makeColor(newConfig['gray'] ?? '#7d7d7d', backgroundReversed),
    foreground: makeColorAccent(newConfig['foreground'] ?? '#ffffff', newConfig.background ?? '#000000'),
    primary: makeColor(newConfig['primary'] ?? '#6e56cf', backgroundReversed),
    secondary: makeColor(newConfig['secondary'] ?? '#232225', backgroundReversed),
    tertiary: makeColor(newConfig['tertiary'] ?? '#89DDFF', backgroundReversed),
    success: makeColor(newConfig['success'] ?? '#32CD32', backgroundReversed),
    error: makeColor(newConfig['error'] ?? '#F07178', backgroundReversed),
    warning: makeColor(newConfig['warning'] ?? '#FFCB6B', backgroundReversed),
    link: makeColor(newConfig['link'] ?? '#baa7ff', backgroundReversed),
    code: makeColor(newConfig['code'] ?? '#6e56cf', backgroundReversed),
  };
  return result;
};
