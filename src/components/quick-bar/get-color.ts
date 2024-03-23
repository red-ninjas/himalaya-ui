import { UIThemesPalette } from '../themes/presets';
import { QuickActionTypes, SnippetTypes } from '../utils/prop-types';

export type QuickBarColors = {
  bgColor: string;
  color: string;
  colorHover: string;
  bgColorHover: string;
};

export const getColors = (type: SnippetTypes, palette: UIThemesPalette): QuickBarColors => {
  const colors: Record<QuickActionTypes, string> = {
    default: palette.background.accents_2,
    secondary: palette.secondary.value,
    tertiary: palette.tertiary.value,
    primary: palette.primary.value,
    success: palette.success.value,
    warning: palette.warning.value,
    error: palette.error.value,
    dark: palette.foreground.value,
    lite: 'transparent',
  };

  const hoverColors: Record<QuickActionTypes, string> = {
    default: palette.background.accents_3,
    tertiary: palette.tertiary.light,
    primary: palette.primary.light,
    secondary: palette.secondary.light,
    success: palette.success.light,
    warning: palette.warning.light,
    error: palette.error.light,
    dark: palette.background.accents_7,
    lite: palette.foreground.value,
  };

  const textColors: Record<QuickActionTypes, string> = {
    default: palette.background.accents_6,
    tertiary: palette.tertiary.lighter,
    primary: palette.primary.lighter,
    secondary: palette.secondary.lighter,
    success: palette.success.lighter,
    warning: palette.warning.lighter,
    error: palette.error.lighter,
    dark: palette.background.value,
    lite: palette.secondary.lighter,
  };

  const textColorsHover: Record<QuickActionTypes, string> = {
    default: palette.background.accents_7,
    primary: palette.primary.contrast,
    tertiary: palette.tertiary.contrast,
    secondary: palette.secondary.contrast,
    success: palette.success.contrast,
    warning: palette.warning.contrast,
    error: palette.error.contrast,
    dark: palette.foreground.value,
    lite: palette.background.value,
  };

  return {
    color: textColors[type],
    colorHover: textColorsHover[type],
    bgColor: colors[type],
    bgColorHover: hoverColors[type],
  };
};
