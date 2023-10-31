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
}

export const generateColors = (newConfig?: GenerateColorProps): UIThemesColors => {
  return {
    primary: generateColor(newConfig?.primary || '#0f8cc0'),
    secondary: generateColor(newConfig?.secondary || '#444'),
    tertiary: generateColor(newConfig?.tertiary || '#fb0065'),
    success: generateColor(newConfig?.success || '#61c3ab'),
    error: generateColor(newConfig?.error || '#eb5757'),
    warning: generateColor(newConfig?.warning || '#ffc107'),
    link: generateColor(newConfig?.link || '#0f9ed9'),
    code: newConfig?.code || '#0f8cc0',
    selection: newConfig?.selection || '#f81ce5',
  };
};

export const generateAccents = (background: string, foreground: string): UIThemesAccents => {
  const generateColor = generateSteppedColors(background, foreground);
  return {
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
