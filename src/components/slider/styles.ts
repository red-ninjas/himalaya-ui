import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type SelectColor = {
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      bg: palette.accents_8,
    },
    secondary: {
      bg: palette.secondary.value,
    },
    success: {
      bg: palette.success.value,
    },
    tertiary: {
      bg: palette.tertiary.value,
    },
    primary: {
      bg: palette.primary.value,
    },
    warning: {
      bg: palette.warning.value,
    },
    error: {
      bg: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
