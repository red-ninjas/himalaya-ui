import { NormalTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';

export type SelectColor = {
  border: string;
  borderActive: string;
  iconBorder: string;
  placeholderColor: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      border: palette.border.value,
      borderActive: palette.border.hex_1200,
      iconBorder: palette.background.hex_400,
      placeholderColor: palette.background.hex_600,
    },
    secondary: {
      border: palette.secondary.hex_900,
      borderActive: palette.secondary.hex_1200,
      iconBorder: palette.secondary.value,
      placeholderColor: palette.background.hex_600,
    },
    success: {
      border: palette.success.hex_900,
      borderActive: palette.success.hex_1200,
      iconBorder: palette.success.value,
      placeholderColor: palette.background.hex_600,
    },
    primary: {
      border: palette.primary.hex_900,
      borderActive: palette.primary.hex_1200,
      iconBorder: palette.primary.value,
      placeholderColor: palette.background.hex_600,
    },
    tertiary: {
      border: palette.tertiary.hex_900,
      borderActive: palette.tertiary.hex_1200,
      iconBorder: palette.tertiary.value,
      placeholderColor: palette.background.hex_600,
    },
    warning: {
      border: palette.warning.hex_900,
      borderActive: palette.warning.hex_1200,
      iconBorder: palette.warning.value,
      placeholderColor: palette.background.hex_600,
    },
    error: {
      border: palette.error.hex_900,
      borderActive: palette.error.hex_1200,
      iconBorder: palette.error.value,
      placeholderColor: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
