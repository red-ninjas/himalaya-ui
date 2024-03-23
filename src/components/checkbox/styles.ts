import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type CheckboxColor = {
  fill: string;
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): CheckboxColor => {
  const colors: { [key in NormalTypes]: CheckboxColor } = {
    default: {
      fill: palette.foreground.hex_1000,
      bg: palette.background.hex_1000,
    },
    secondary: {
      fill: palette.foreground.hex_1000,
      bg: palette.background.hex_1000,
    },
    success: {
      fill: palette.success.hex_1000,
      bg: palette.background.hex_1000,
    },
    warning: {
      fill: palette.warning.hex_1000,
      bg: palette.background.hex_1000,
    },
    error: {
      fill: palette.error.hex_1000,
      bg: palette.background.hex_1000,
    },
    primary: {
      fill: palette.primary.hex_1000,
      bg: palette.background.hex_1000,
    },
    tertiary: {
      fill: palette.tertiary.hex_1000,
      bg: palette.background.hex_1000,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
