import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type RadioColor = {
  label: string;
  border: string;
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): RadioColor => {
  const colors: { [key in NormalTypes]: RadioColor } = {
    default: {
      label: palette.foreground.hex_1000,
      border: palette.border.hex_1000,
      bg: palette.foreground.hex_1000,
    },
    secondary: {
      label: palette.secondary.hex_1000,
      border: palette.secondary.hex_1000,
      bg: palette.secondary.hex_1000,
    },
    success: {
      label: palette.success.hex_1000,
      border: palette.success.hex_1000,
      bg: palette.success.hex_1000,
    },
    primary: {
      label: palette.primary.hex_1000,
      border: palette.primary.hex_1000,
      bg: palette.primary.hex_1000,
    },
    tertiary: {
      label: palette.tertiary.hex_1000,
      border: palette.tertiary.hex_1000,
      bg: palette.tertiary.hex_1000,
    },
    warning: {
      label: palette.warning.hex_1000,
      border: palette.warning.hex_1000,
      bg: palette.warning.hex_1000,
    },
    error: {
      label: palette.error.hex_1000,
      border: palette.error.hex_1000,
      bg: palette.error.hex_1000,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
