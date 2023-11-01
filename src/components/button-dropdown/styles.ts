import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

type ButtonDropdownColors = {
  color: string;
  bgColor: string;
  hoverBgColor: string;
  hoverBorder: string;
  borderLeftColor: string;
};

export const getColor = (palette: UIThemesPalette, type: NormalTypes | undefined, disabled: boolean = false) => {
  const colors: { [key in NormalTypes]: ButtonDropdownColors } = {
    default: {
      color: palette.accents_5,
      bgColor: palette.background,
      borderLeftColor: palette.border,
      hoverBgColor: palette.accents_1,
      hoverBorder: palette.border,
    },
    secondary: {
      color: palette.background,
      bgColor: palette.foreground,
      borderLeftColor: palette.accents_7,
      hoverBgColor: palette.accents_7,
      hoverBorder: palette.accents_7,
    },
    success: {
      color: palette.success.contrast,
      bgColor: palette.success.value,
      borderLeftColor: palette.success.dark,
      hoverBgColor: palette.success.dark,
      hoverBorder: palette.success.dark,
    },
    warning: {
      color: palette.warning.contrast,
      bgColor: palette.warning.value,
      borderLeftColor: palette.warning.dark,
      hoverBgColor: palette.warning.dark,
      hoverBorder: palette.warning.dark,
    },
    error: {
      color: palette.error.contrast,
      bgColor: palette.error.value,
      borderLeftColor: palette.error.dark,
      hoverBgColor: palette.error.dark,
      hoverBorder: palette.error.dark,
    },
    tertiary: {
      color: palette.tertiary.contrast,
      bgColor: palette.tertiary.value,
      borderLeftColor: palette.tertiary.dark,
      hoverBgColor: palette.tertiary.dark,
      hoverBorder: palette.tertiary.dark,
    },
    primary: {
      color: palette.primary.contrast,
      bgColor: palette.primary.value,
      borderLeftColor: palette.primary.dark,
      hoverBgColor: palette.primary.dark,
      hoverBorder: palette.primary.dark,
    },
  };

  if (disabled)
    return {
      ...colors.default,
      bgColor: palette.accents_1,
      color: palette.accents_4,
    };
  return type ? colors[type] : colors.default;
};
