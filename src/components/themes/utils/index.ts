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
  const color = new Color(value);
  const contrast = color.contrast();
  const light = color.tint(0.15);
  const dark = color.shade(0.15);
  const lighter = color.tint(0.3);
  const darker = color.shade(0.3);

  return {
    value,
    contrast: contrast.hex,
    light: light.hex,
    lighter: lighter.hex,
    dark: dark.hex,
    darker: darker.hex,
  };
};

export interface GenerateColorProps {
  secondary?: string;
  error?: string;
  success?: string;
  warning?: string;
  primary?: string;
  tertiary?: string;
  link?: string;
  code?: string;
  selection?: string;
  paragraph?: string;
  codeBg?: string;
}

export const generateColors = (newConfig?: GenerateColorProps): UIThemesColors => {
  return {
    primary: generateColor(newConfig?.primary || '#6e56cf'),
    secondary: generateColor(newConfig?.secondary || '#232225'),
    tertiary: generateColor(newConfig?.tertiary || '#89DDFF'),
    success: generateColor(newConfig?.success || '#32CD32'),
    error: generateColor(newConfig?.error || '#F07178'),
    warning: generateColor(newConfig?.warning || '#FFCB6B'),
    link: generateColor(newConfig?.link || '#baa7ff'),
    code: newConfig?.code || '#EEFFFF',
    codeBg: newConfig?.code || '#232225',
    selection: newConfig?.selection || '#0437A2',
    paragraph: newConfig?.paragraph || '#B5B2BC',
  };
};

export const generateAccents = (background: string, foreground: string): UIThemesAccents => {
  const generateColor = generateSteppedColors(background, foreground);

  const color = new Color(background);
  return {
    accents_darker: color.shade(0.075).hex,
    accents_0: generateColor[1],
    accents_1: generateColor[3],
    accents_2: generateColor[5],
    accents_3: generateColor[7],
    accents_4: generateColor[9],
    accents_5: generateColor[11],
    accents_6: generateColor[13],
    accents_7: generateColor[14],
    accents_8: generateColor[16],
    border: generateColor[1],
    highlite: generateColor[1],
    background: background,
    foreground: foreground,
  };
};
