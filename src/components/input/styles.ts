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
      color: palette.foreground.hex_1000,
      borderColor: palette.border.hex_1000,
      hoverBorder: palette.border.hex_900,
    },
    secondary: {
      color: palette.foreground.hex_1000,
      borderColor: palette.secondary.hex_900,
      hoverBorder: palette.secondary.hex_1000,
    },
    success: {
      color: palette.foreground.hex_1000,
      borderColor: palette.success.hex_900,
      hoverBorder: palette.success.hex_1000,
    },
    primary: {
      color: palette.foreground.hex_1000,
      borderColor: palette.primary.hex_900,
      hoverBorder: palette.primary.hex_1000,
    },
    tertiary: {
      color: palette.foreground.hex_1000,
      borderColor: palette.tertiary.hex_900,
      hoverBorder: palette.tertiary.hex_1000,
    },
    warning: {
      color: palette.foreground.hex_1000,
      borderColor: palette.warning.hex_900,
      hoverBorder: palette.warning.hex_1000,
    },
    error: {
      color: palette.foreground.hex_1000,
      borderColor: palette.error.hex_900,
      hoverBorder: palette.error.hex_1000,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
