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
      color: palette.foreground.value,
      borderColor: palette.border.value,
      hoverBorder: palette.border.dark,
    },
    secondary: {
      color: palette.foreground.value,
      borderColor: palette.secondary.light,
      hoverBorder: palette.secondary.value,
    },
    success: {
      color: palette.foreground.value,
      borderColor: palette.success.light,
      hoverBorder: palette.success.value,
    },
    primary: {
      color: palette.foreground.value,
      borderColor: palette.primary.light,
      hoverBorder: palette.primary.value,
    },
    tertiary: {
      color: palette.foreground.value,
      borderColor: palette.tertiary.light,
      hoverBorder: palette.tertiary.value,
    },
    warning: {
      color: palette.foreground.value,
      borderColor: palette.warning.light,
      hoverBorder: palette.warning.value,
    },
    error: {
      color: palette.foreground.value,
      borderColor: palette.error.light,
      hoverBorder: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
