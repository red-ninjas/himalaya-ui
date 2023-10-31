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
      label: palette.foreground,
      border: palette.border,
      bg: palette.foreground,
    },
    secondary: {
      label: palette.secondary.value,
      border: palette.secondary.value,
      bg: palette.secondary.value,
    },
    success: {
      label: palette.success.value,
      border: palette.success.value,
      bg: palette.success.value,
    },
    primary: {
      label: palette.primary.value,
      border: palette.primary.value,
      bg: palette.primary.value,
    },
    tertiary: {
      label: palette.tertiary.value,
      border: palette.tertiary.value,
      bg: palette.tertiary.value,
    },
    warning: {
      label: palette.warning.value,
      border: palette.warning.value,
      bg: palette.warning.value,
    },
    error: {
      label: palette.error.value,
      border: palette.error.value,
      bg: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
