import { UIColor, UIColorAccent, UIThemesColorKeys, UIThemesColors } from '../presets';
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

export const makeColor = (value: string, background: string, foreground: string): UIColor => {
  const color = new Color(value);
  const stepped = makeStepColors(color.hex, foreground);
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

export const makeColorAccent = (value: string, foreground: string): UIColorAccent => {
  const color = new Color(value);
  const stepped = makeStepColors(color.hex, foreground);
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
  [key in UIThemesColorKeys]?: string;
};

export const makeColors = (newConfig: makeColorProps): UIThemesColors => {
  const foreground = newConfig.foreground ?? '#ffffff';
  const background = newConfig.background ?? '#000000';
  const result: UIThemesColors = {
    background: makeColorAccent(newConfig['background'] ?? '#7d7d7d', foreground),
    gray: makeColor(newConfig['gray'] ?? '#7d7d7d', foreground, background),
    foreground: makeColorAccent(newConfig['foreground'] ?? '#ffffff', background),
    primary: makeColor(newConfig['primary'] ?? '#6e56cf', foreground, background),
    secondary: makeColor(newConfig['secondary'] ?? '#232225', foreground, background),
    tertiary: makeColor(newConfig['tertiary'] ?? '#89DDFF', foreground, background),
    success: makeColor(newConfig['success'] ?? '#32CD32', foreground, background),
    error: makeColor(newConfig['error'] ?? '#F07178', foreground, background),
    warning: makeColor(newConfig['warning'] ?? '#FFCB6B', foreground, background),
    link: makeColor(newConfig['link'] ?? '#baa7ff', foreground, background),
    code: makeColor(newConfig['code'] ?? '#6e56cf', foreground, background),
    border: makeColor(newConfig['border'] ?? '#333333', foreground, background),
  };
  return result;
};
