import { UIThemesColorKeys } from '../presets';
import { Color } from './color';
import { ColorVariable } from './color-variable';

export const generateSteppedColors = (background = '#ffffff', text = '#000000') => {
  const color = new Color(background);
  const colors = new Array(19).fill(null);

  return colors.map((_, i) => color.mix(text, ((i + 1) * 5) / 100).hex);
};

export const generateColor = (value: string, reversed: boolean = false): ColorVariable => {
  const color = new Color(value);
  const contrast = color.contrast();

  let light = color;
  let lighter = color;
  let lighter1 = color;
  let lighter2 = color;
  let lighter3 = color;
  let lighter4 = color;
  let lighter5 = color;
  let lighter6 = color;
  let lighter7 = color;
  let dark = color;
  let darker = color;
  if (reversed) {
    light = color.shade(0.1);
    lighter = color.shade(0.2);
    lighter1 = color.shade(0.3);
    lighter2 = color.shade(0.4);
    lighter3 = color.shade(0.5);
    lighter4 = color.shade(0.6);
    lighter5 = color.shade(0.7);
    lighter6 = color.shade(0.8);
    lighter7 = color.shade(0.9);

    dark = color.tint(0.1);
    darker = color.tint(0.2);
  } else {
    light = color.tint(0.1);
    lighter = color.tint(0.2);
    lighter1 = color.tint(0.3);
    lighter2 = color.tint(0.4);
    lighter3 = color.tint(0.5);
    lighter4 = color.tint(0.6);
    lighter5 = color.tint(0.7);
    lighter6 = color.tint(0.8);
    lighter7 = color.tint(0.9);

    dark = color.shade(0.1);
    darker = color.shade(0.2);
  }
  const colorTable = {
    contrast: contrast.hex,
    hex_100: lighter7.hex,
    hex_200: lighter6.hex,
    hex_300: lighter5.hex,
    hex_400: lighter4.hex,
    hex_500: lighter3.hex,
    hex_600: lighter2.hex,
    hex_700: lighter1.hex,
    hex_800: lighter.hex,
    hex_900: light.hex,
    hex_1000: value,
    hex_1100: dark.hex,
    hex_1200: darker.hex,
  };

  return colorTable;
};

export type ConvertableColor =
  | {
      color: string;
      reversed: boolean;
    }
  | string;

export type GenerateColorProps = {
  [key in UIThemesColorKeys]: ConvertableColor;
};

export type GenerateColorPropsGenerated = {
  [key in UIThemesColorKeys]: ColorVariable;
};

export const generateColors = (newConfig: GenerateColorProps): GenerateColorPropsGenerated => {
  const result: GenerateColorPropsGenerated = {
    background: generateColor('#000000'),
    foreground: generateColor('#ffffff'),
    primary: generateColor('#6e56cf'),
    secondary: generateColor('#232225'),
    tertiary: generateColor('#89DDFF'),
    success: generateColor('#32CD32'),
    error: generateColor('#F07178'),
    warning: generateColor('#FFCB6B'),
    link: generateColor('#baa7ff'),
    code: generateColor('#6e56cf'),
    codeBg: generateColor('#ffffff'),
    paragraph: generateColor('#B5B2BC'),
    border: generateColor('#333333'),
  };
  Object.keys(newConfig).map(oldKey => {
    result[oldKey] = generateColor(
      typeof newConfig[oldKey] === 'string' ? newConfig[oldKey] : newConfig[oldKey].color,
      typeof newConfig[oldKey] === 'string' ? false : newConfig[oldKey].reversed,
    );
  });

  return result;
  /*
  return {
    background: generateColor(newConfig?.background || '#000000'),
    foreground: generateColor(newConfig?.foreground || '#ffffff'),
    primary: generateColor(newConfig?.primary || '#6e56cf'),
    secondary: generateColor(newConfig?.secondary || '#232225'),
    tertiary: generateColor(newConfig?.tertiary || '#89DDFF'),
    success: generateColor(newConfig?.success || '#32CD32'),
    error: generateColor(newConfig?.error || '#F07178'),
    warning: generateColor(newConfig?.warning || '#FFCB6B'),
    link: generateColor(newConfig?.link || '#baa7ff'),
    code: generateColor(newConfig?.code || '#6e56cf'),
    codeBg: generateColor(newConfig?.codeBg || '#ffffff'),
    paragraph: generateColor(newConfig?.paragraph || '#B5B2BC'),
    border: generateColor(newConfig?.border || '#333333'),
  };
  */
};
