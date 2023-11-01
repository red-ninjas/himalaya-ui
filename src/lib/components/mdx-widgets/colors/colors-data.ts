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
  error: 'Value',
};

const success: ColorEnum = {
  success: 'Value',
};

const warning: ColorEnum = {
  warning: 'Value',
};

const primary: ColorEnum = {
  primary: 'Value',
};

const secondary: ColorEnum = {
  secondary: 'Value',
};

const tertiary: ColorEnum = {
  tertiary: 'Value',
};

const link: ColorEnum = {
  link: 'Value',
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
  primary,
  secondary,
  tertiary,
  gradient,
  link,
};

export const getColorData = (type: string): ColorEnum => {
  const data = colorsData[type];
  return data || (colorsData.normal as ColorEnum);
};
