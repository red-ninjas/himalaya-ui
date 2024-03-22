import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type CheckboxColor = {
  fill: string;
  bg: string;
};

export const getColors = (palette: UIThemesPalette, status?: NormalTypes): CheckboxColor => {
  const colors: { [key in NormalTypes]: CheckboxColor } = {
    default: {
      fill: palette.foreground.value,
      bg: palette.background.value,
    },
    secondary: {
      fill: palette.foreground.value,
      bg: palette.background.value,
    },
    success: {
      fill: palette.success.value,
      bg: palette.background.value,
    },
    warning: {
      fill: palette.warning.value,
      bg: palette.background.value,
    },
    error: {
      fill: palette.error.value,
      bg: palette.background.value,
    },
    primary: {
      fill: palette.primary.value,
      bg: palette.background.value,
    },
    tertiary: {
      fill: palette.tertiary.value,
      bg: palette.background.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
