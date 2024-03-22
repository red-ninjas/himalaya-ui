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
      borderActive: palette.border.dark,
      iconBorder: palette.background.accents.accents_5,
      placeholderColor: palette.background.accents.accents_3,
    },
    secondary: {
      border: palette.secondary.light,
      borderActive: palette.secondary.dark,
      iconBorder: palette.secondary.value,
      placeholderColor: palette.background.accents.accents_3,
    },
    success: {
      border: palette.success.light,
      borderActive: palette.success.dark,
      iconBorder: palette.success.value,
      placeholderColor: palette.background.accents.accents_3,
    },
    primary: {
      border: palette.primary.light,
      borderActive: palette.primary.dark,
      iconBorder: palette.primary.value,
      placeholderColor: palette.background.accents.accents_3,
    },
    tertiary: {
      border: palette.tertiary.light,
      borderActive: palette.tertiary.dark,
      iconBorder: palette.tertiary.value,
      placeholderColor: palette.background.accents.accents_3,
    },
    warning: {
      border: palette.warning.light,
      borderActive: palette.warning.dark,
      iconBorder: palette.warning.value,
      placeholderColor: palette.background.accents.accents_3,
    },
    error: {
      border: palette.error.light,
      borderActive: palette.error.dark,
      iconBorder: palette.error.value,
      placeholderColor: palette.error.value,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
