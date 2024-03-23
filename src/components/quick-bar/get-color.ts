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
    default: palette.background.hex_700,
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
    default: palette.background.hex_600,
    tertiary: palette.tertiary.hex_900,
    primary: palette.primary.hex_900,
    secondary: palette.secondary.hex_900,
    success: palette.success.hex_900,
    warning: palette.warning.hex_900,
    error: palette.error.hex_900,
    dark: palette.background.hex_200,
    lite: palette.foreground.value,
  };

  const textColors: Record<QuickActionTypes, string> = {
    default: palette.background.hex_300,
    tertiary: palette.tertiary.hex_800,
    primary: palette.primary.hex_800,
    secondary: palette.secondary.hex_800,
    success: palette.success.hex_800,
    warning: palette.warning.hex_800,
    error: palette.error.hex_800,
    dark: palette.background.value,
    lite: palette.secondary.hex_800,
  };

  const textColorsHover: Record<QuickActionTypes, string> = {
    default: palette.background.hex_200,
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
