import { UIThemesPalette } from 'components/themes/presets';

export type ColorEnum = {
  [key in keyof UIThemesPalette]?: string;
};

const normal: ColorEnum = {
  background: 'Background',
  accents_0: 'Accent 0',
  accents_1: 'Accent 1',
  accents_2: 'Accent 2',
  accents_3: 'Accent 3',
  accents_4: 'Accent 4',
  accents_5: 'Accent 5',
  accents_6: 'Accent 6',
  accents_7: 'Accent 7',
  accents_8: 'Accent 8',
  foreground: 'Foreground',
};

const error: ColorEnum = {
  errorLighter: 'Lighter',
  errorLight: 'Light',
  error: 'Default',
  errorDark: 'Dark',
};

const success: ColorEnum = {
  successLighter: 'Lighter',
  successLight: 'Light',
  success: 'Default',
  successDark: 'Dark',
};

const warning: ColorEnum = {
  warningLighter: 'Lighter',
  warningLight: 'Light',
  warning: 'Default',
  warningDark: 'Dark',
};

const violet: ColorEnum = {
  violetLighter: 'Lighter',
  violetLight: 'Light',
  violet: 'Default',
  violetDark: 'Dark',
};

const cyan: ColorEnum = {
  cyanLighter: 'Lighter',
  cyanLight: 'Light',
  cyan: 'Default',
  cyanDark: 'Dark',
};

const highlight: ColorEnum = {
  alert: 'Alert',
  purple: 'Purple',
  magenta: 'Magenta',
};

const gradient: ColorEnum = {
  gradient_1: 'Gradient 1',
  gradient_2: 'Gradient 2',
  gradient_3: 'Gradient 3',
};

const colorsData: { [key: string]: ColorEnum } = {
  normal,
  success,
  warning,
  error,
  violet,
  cyan,
  highlight,
  gradient,
};

export const getColorData = (type: string): ColorEnum => {
  const data = colorsData[type];
  return data || (colorsData.normal as ColorEnum);
};

export const getCurrentColor = (palette: UIThemesPalette, type: string, index: number): string => {
  if (type === 'normal') {
    if (index >= 5) return palette.background;
    return palette.foreground;
  }

  if (type === 'highlight') {
    if (index < 3) return 'white';
    return 'black';
  }

  if (type === 'gradient') {
    return 'white';
  }

  if (type === 'warning' || type === 'cyan') {
    if (index < 3) return 'black';
    return 'white';
  }

  if (Object.keys(colorsData[type]).find(key => key.endsWith('Lighter'))) {
    if (index === 0) return 'black';
    return 'white';
  }

  return palette.background;
};
