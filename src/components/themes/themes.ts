import _ from 'lodash';
import type { DeepPartial } from '../utils/types';
import darkTheme from './presets/dark';
import lightTheme from './presets/default';
import { UIThemes } from './presets/index';
import { generateAccents, generateColor, generateColors, generateSteppedColors } from './utils';

export type UIUserTheme = DeepPartial<UIThemes>;

export const isObject = (target: unknown) => target && typeof target === 'object';

const getPresets = (): Array<UIThemes> => {
  return [lightTheme, darkTheme];
};

const getPresetStaticTheme = (): UIThemes => {
  return darkTheme;
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
  return _.merge({ ...base }, custom) as UIThemes;
};

const createFromDark = (custom: UIUserTheme) => create(darkTheme, custom);
const createFromLight = (custom: UIUserTheme) => create(lightTheme, custom);

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
