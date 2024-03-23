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
      hoverBorder: palette.border.hex_1200,
    },
    secondary: {
      color: palette.foreground.value,
      borderColor: palette.secondary.hex_900,
      hoverBorder: palette.secondary.value,
    },
    success: {
      color: palette.foreground.value,
      borderColor: palette.success.hex_900,
      hoverBorder: palette.success.value,
    },
    primary: {
      color: palette.foreground.value,
      borderColor: palette.primary.hex_900,
      hoverBorder: palette.primary.value,
    },
    tertiary: {
      color: palette.foreground.value,
      borderColor: palette.tertiary.hex_900,
      hoverBorder: palette.tertiary.value,
    },
    warning: {
      color: palette.foreground.value,
      borderColor: palette.warning.hex_900,
      hoverBorder: palette.warning.value,
    },
    error: {
      color: palette.foreground.value,
      borderColor: palette.error.hex_900,
      hoverBorder: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
