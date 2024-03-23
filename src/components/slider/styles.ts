import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type SelectColor = {
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      bg: palette.background.hex_100,
    },
    secondary: {
      bg: palette.secondary.hex_1000,
    },
    success: {
      bg: palette.success.hex_1000,
    },
    tertiary: {
      bg: palette.tertiary.hex_1000,
    },
    primary: {
      bg: palette.primary.hex_1000,
    },
    warning: {
      bg: palette.warning.hex_1000,
    },
    error: {
      bg: palette.error.hex_1000,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
