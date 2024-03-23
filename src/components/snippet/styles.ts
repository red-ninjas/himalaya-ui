import { SnippetTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';

export type SnippetStyles = {
  color: string;
  border: string;
  bgColor: string;
};

export const getStyles = (type: SnippetTypes, palette: UIThemesPalette, fill?: boolean) => {
  const styles: { [key in SnippetTypes]: SnippetStyles } = {
    default: {
      color: palette.foreground.hex_1000,
      border: palette.border.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    success: {
      color: palette.success.hex_1000,
      border: palette.success.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    warning: {
      color: palette.warning.hex_1000,
      border: palette.warning.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    error: {
      color: palette.error.hex_1000,
      border: palette.error.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    secondary: {
      color: palette.secondary.hex_1000,
      border: palette.secondary.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    primary: {
      color: palette.primary.hex_1000,
      border: palette.primary.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    tertiary: {
      color: palette.tertiary.hex_1000,
      border: palette.tertiary.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    lite: {
      color: palette.foreground.hex_1000,
      border: palette.border.hex_1000,
      bgColor: palette.background.hex_800,
    },
    dark: {
      color: palette.background.hex_1000,
      border: palette.foreground.hex_1000,
      bgColor: palette.foreground.hex_1000,
    },
  };

  const filledTypes: Array<SnippetTypes> = ['success', 'warning', 'error', 'secondary'];
  const style = styles[type];
  const shouldFilled = filledTypes.includes(type);
  if (!fill || !shouldFilled) return style;

  return {
    ...style,
    color: style.bgColor,
    bgColor: style.color,
  };
};
