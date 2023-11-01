import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type CheckboxColor = {
  fill: string;
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): CheckboxColor => {
  const colors: { [key in NormalTypes]: CheckboxColor } = {
    default: {
      fill: palette.foreground,
      bg: palette.background,
    },
    secondary: {
      fill: palette.foreground,
      bg: palette.background,
    },
    success: {
      fill: palette.success.value,
      bg: palette.background,
    },
    warning: {
      fill: palette.warning.value,
      bg: palette.background,
    },
    error: {
      fill: palette.error.value,
      bg: palette.background,
    },
    primary: {
      fill: palette.primary.value,
      bg: palette.background,
    },
    tertiary: {
      fill: palette.tertiary.value,
      bg: palette.background,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
