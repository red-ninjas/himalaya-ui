import { NormalTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';

export type InputColor = {
  color: string;
  borderColor: string;
  hoverBorder: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): InputColor => {
  const colors: { [key in NormalTypes]: InputColor } = {
    default: {
      color: palette.foreground,
      borderColor: palette.border,
      hoverBorder: palette.accents_5,
    },
    secondary: {
      color: palette.foreground,
      borderColor: palette.secondary.light,
      hoverBorder: palette.secondary.value,
    },
    success: {
      color: palette.foreground,
      borderColor: palette.success.light,
      hoverBorder: palette.success.value,
    },
    primary: {
      color: palette.foreground,
      borderColor: palette.primary.light,
      hoverBorder: palette.primary.value,
    },
    tertiary: {
      color: palette.foreground,
      borderColor: palette.tertiary.light,
      hoverBorder: palette.tertiary.value,
    },
    warning: {
      color: palette.foreground,
      borderColor: palette.warning.light,
      hoverBorder: palette.warning.value,
    },
    error: {
      color: palette.foreground,
      borderColor: palette.error.light,
      hoverBorder: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
