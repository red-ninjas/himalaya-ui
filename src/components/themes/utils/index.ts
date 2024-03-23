import _ from 'lodash';
import { UIThemesAccents, UIThemesColors } from '../presets';
import { Color } from './color';
import { ColorVariable } from './color-variable';

export const generateSteppedColors = (background = '#ffffff', text = '#000000') => {
  const color = new Color(background);
  const colors = new Array(19).fill(null);

  return colors.map((_, i) => color.mix(text, ((i + 1) * 5) / 100).hex);
};

export const generateColor = (value: string): ColorVariable => {
  const color = new Color(value); // 8
  const contrast = color.contrast();
  const light = color.tint(0.1);
  const lighter = color.tint(0.2);
  const lighter1 = color.tint(0.3);
  const lighter2 = color.tint(0.4);
  const lighter3 = color.tint(0.5);
  const lighter4 = color.tint(0.6);
  const lighter5 = color.tint(0.7);
  const lighter6 = color.tint(0.8);
  const lighter7 = color.tint(0.9);
  const lighter8 = color.tint(1);

  const dark = color.shade(0.1);
  const darker = color.shade(0.2);

  const colorTable = {
    value,
    contrast: contrast.hex,
    dark: dark.hex,
    darker: darker.hex,
    accents_0: lighter8.hex,
    accents_1: lighter7.hex,
    accents_2: lighter6.hex,
    accents_3: lighter5.hex,
    accents_4: lighter4.hex,
    accents_5: lighter3.hex,
    accents_6: lighter2.hex,
    accents_7: lighter1.hex,
    accents_8: lighter.hex,
    accents_9: light.hex,
    accents_10: value,
    accents_11: dark.hex,
    accents_12: darker.hex,
  };

  return colorTable;
};

export interface GenerateColorProps {
  background?: string;
  foreground?: string;
  secondary?: string;
  error?: string;
  success?: string;
  warning?: string;
  primary?: string;
  tertiary?: string;
  link?: string;
  code?: string;
  paragraph?: string;
  codeBg?: string;
  border?: string;
}

export const generateColors = (newConfig?: GenerateColorProps): UIThemesColors => {
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
};
