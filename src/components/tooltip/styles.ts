import { SnippetTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';

export type TooltipColors = {
  bgColor: string;
  color: string;
};

export const getColors = (type: SnippetTypes, palette: UIThemesPalette): TooltipColors => {
  const colors: { [key in SnippetTypes]: string } = {
    default: palette.background.hex_1000,
    success: palette.success.hex_1000,
    warning: palette.warning.hex_1000,
    error: palette.error.hex_1000,
    secondary: palette.secondary.hex_1000,
    primary: palette.primary.hex_1000,
    tertiary: palette.tertiary.hex_1000,
    dark: palette.foreground.hex_1000,
    lite: palette.background.hex_1000,
  };
  const color = type === 'lite' || type === 'default' ? palette.foreground.hex_1000 : palette.background.hex_1000;

  return {
    color,
    bgColor: colors[type],
  };
};
