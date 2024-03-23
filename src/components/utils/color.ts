import { Gradient } from '../themes/presets';

export const hexToRgb = (color: string): [number, number, number] => {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = color.replace(fullReg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  if (!values) {
    throw new Error(`HimalayaUI: Unsupported ${color} color.`);
  }
  return [Number.parseInt(values[1], 16), Number.parseInt(values[2], 16), Number.parseInt(values[3], 16)];
};
export const isGradient = (obj: any): obj is Gradient => {
  if (typeof obj === 'string') {
    return false;
  }
  return obj && 'from' in obj && 'to' in obj;
};

export const isColorVariable = obj => {
  if (typeof obj === 'string') {
    return false;
  }
  return obj && 'hex_1000' in obj && 'contrast' in obj;
};

export const isSingleColor = obj => {
  return typeof obj === 'string';
};

export const hexToRgbFallBack = (color: string): string => {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = color.replace(fullReg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  if (!values) {
    return color;
  }

  return `${Number.parseInt(values[1], 16)}, ${Number.parseInt(values[2], 16)}, ${Number.parseInt(values[3], 16)}`;
};

export const colorToRgbValues = (color: string) => {
  if (color.charAt(0) === '#') return hexToRgb(color);

  const safeColor = color.replace(/ /g, '');
  const colorType = color.substr(0, 4);

  const regArray = safeColor.match(/\((.+)\)/);
  if (!colorType.startsWith('rgb') || !regArray) {
    throw new Error(`HimalayaUI: Only support ["RGB", "RGBA", "HEX"] color.`);
  }

  return regArray[1].split(',').map(str => Number.parseFloat(str));
};

export const addColorAlpha = (color: string, alpha: number) => {
  if (!/^#|rgb|RGB/.test(color)) return color;
  const [r, g, b] = colorToRgbValues(color);
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
};
