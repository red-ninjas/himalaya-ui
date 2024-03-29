import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type SelectColor = {
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      bg: palette.foreground.value,
    },
    secondary: {
      bg: palette.secondary.value,
    },
    success: {
      bg: palette.success.value,
    },
    warning: {
      bg: palette.warning.value,
    },
    error: {
      bg: palette.error.value,
    },
    primary: {
      bg: palette.primary.value,
    },
    tertiary: {
      bg: palette.tertiary.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
