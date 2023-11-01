import { SnippetTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';

export type TooltipColors = {
  bgColor: string;
  color: string;
};

export const getColors = (type: SnippetTypes, palette: UIThemesPalette): TooltipColors => {
  const colors: { [key in SnippetTypes]: string } = {
    default: palette.background,
    success: palette.success.value,
    warning: palette.warning.value,
    error: palette.error.value,
    secondary: palette.secondary.value,
    primary: palette.primary.value,
    tertiary: palette.tertiary.value,
    dark: palette.foreground,
    lite: palette.background,
  };
  const color = type === 'lite' || type === 'default' ? palette.foreground : palette.background;

  return {
    color,
    bgColor: colors[type],
  };
};
