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
      color: palette.foreground,
      border: palette.border,
      bgColor: palette.background,
    },
    success: {
      color: palette.success.value,
      border: palette.success.value,
      bgColor: palette.background,
    },
    warning: {
      color: palette.warning.value,
      border: palette.warning.value,
      bgColor: palette.background,
    },
    error: {
      color: palette.error.value,
      border: palette.error.value,
      bgColor: palette.background,
    },
    secondary: {
      color: palette.secondary.value,
      border: palette.secondary.value,
      bgColor: palette.background,
    },
    primary: {
      color: palette.primary.value,
      border: palette.primary.value,
      bgColor: palette.background,
    },
    tertiary: {
      color: palette.tertiary.value,
      border: palette.tertiary.value,
      bgColor: palette.background,
    },
    lite: {
      color: palette.foreground,
      border: palette.border,
      bgColor: palette.accents_1,
    },
    dark: {
      color: palette.background,
      border: palette.foreground,
      bgColor: palette.foreground,
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
