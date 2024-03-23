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
      color: palette.foreground.value,
      border: palette.border.value,
      bgColor: palette.background.value,
    },
    success: {
      color: palette.success.value,
      border: palette.success.value,
      bgColor: palette.background.value,
    },
    warning: {
      color: palette.warning.value,
      border: palette.warning.value,
      bgColor: palette.background.value,
    },
    error: {
      color: palette.error.value,
      border: palette.error.value,
      bgColor: palette.background.value,
    },
    secondary: {
      color: palette.secondary.value,
      border: palette.secondary.value,
      bgColor: palette.background.value,
    },
    primary: {
      color: palette.primary.value,
      border: palette.primary.value,
      bgColor: palette.background.value,
    },
    tertiary: {
      color: palette.tertiary.value,
      border: palette.tertiary.value,
      bgColor: palette.background.value,
    },
    lite: {
      color: palette.foreground.value,
      border: palette.border.value,
      bgColor: palette.background.accents_1,
    },
    dark: {
      color: palette.background.value,
      border: palette.foreground.value,
      bgColor: palette.foreground.value,
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
