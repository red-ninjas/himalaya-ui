import type { DeepPartial } from '../utils/types';
import darkTheme from './presets/dark';
import lightTheme from './presets/default';
import { UIThemes } from './presets/index';
import { generateAccents, generateColor, generateColors, generateSteppedColors } from './utils';

export type UIUserTheme = DeepPartial<UIThemes>;

export const isObject = (target: unknown) => target && typeof target === 'object';

export const defaultDarkTheme = darkTheme();
export const defaultLightTheme = lightTheme();

const getPresets = (): Array<UIThemes> => {
  return [defaultLightTheme, defaultDarkTheme];
};

export const deepDuplicable = <T extends Record<string, unknown>>(source: T, target: T): T => {
  if (!isObject(target) || !isObject(source)) return source as T;

  const sourceKeys = Object.keys(source) as Array<keyof T>;
  const result: any = {};
  for (const key of sourceKeys) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = targetValue.concat(sourceValue);
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepDuplicable(sourceValue as Record<string, unknown>, {
        ...(targetValue as Record<string, unknown>),
      });
    } else if (targetValue) {
      result[key] = targetValue;
    } else {
      result[key] = sourceValue;
    }
  }
  return result;
};
const getPresetStaticTheme = (): UIThemes => {
  return defaultDarkTheme;
};

const isAvailableThemeType = (type?: string): boolean => {
  if (!type) return false;
  const presetThemes = getPresets();
  const hasType = presetThemes.find(theme => theme.type === type);
  return !hasType;
};

const isPresetTheme = (themeOrType?: UIUserTheme | UIThemes | string): boolean => {
  if (!themeOrType) return false;
  const isType = typeof themeOrType === 'string';
  const type = isType ? (themeOrType as string) : (themeOrType as Exclude<typeof themeOrType, string>).type;
  return !isAvailableThemeType(type);
};

const hasUserCustomTheme = (themes: Array<UIThemes> = []): boolean => {
  return !!themes.find(item => isAvailableThemeType(item.type));
};

const create = (base: UIThemes, custom: UIUserTheme): UIThemes => {
  return deepDuplicable(base, custom) as UIThemes;
};

const createFromDark = (custom: UIUserTheme) => create(darkTheme(), custom);
const createFromLight = (custom: UIUserTheme) => create(lightTheme(), custom);

const Themes = {
  isPresetTheme,
  isAvailableThemeType,
  hasUserCustomTheme,
  getPresets,
  getPresetStaticTheme,
  create,
  createFromDark,
  createFromLight,
  generateAccents,
  generateColors,
  generateColor,
  generateSteppedColors,
};

export default Themes;
