import { UIThemesPalette } from 'components/themes/presets';

export type ColorEnum = {
  [key in keyof UIThemesPalette]?: string;
};

const background: ColorEnum = {
  background: 'Value',
};

const foreground: ColorEnum = {
  foreground: 'value',
};

const border: ColorEnum = {
  border: 'value',
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

const code: ColorEnum = {
  code: 'Value',
};

const gradient: ColorEnum = {
  gradient_1: 'Gradient 1',
  gradient_2: 'Gradient 2',
  gradient_3: 'Gradient 3',
};

const colorsData: { [key: string]: ColorEnum } = {
  background,
  foreground,
  border,
  success,
  warning,
  error,
  primary,
  secondary,
  tertiary,
  gradient,
  link,
  code,
};

export const getColorData = (type: string): ColorEnum => {
  const data = colorsData[type];
  return data || (colorsData.normal as ColorEnum);
};
