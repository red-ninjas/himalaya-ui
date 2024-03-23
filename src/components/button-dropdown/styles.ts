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
      color: palette.background.hex_400,
      bgColor: palette.background.value,
      borderLeftColor: palette.border.value,
      hoverBgColor: palette.background.hex_800,
      hoverBorder: palette.border.value,
    },
    secondary: {
      color: palette.background.value,
      bgColor: palette.foreground.value,
      borderLeftColor: palette.background.hex_200,
      hoverBgColor: palette.background.hex_200,
      hoverBorder: palette.background.hex_200,
    },
    success: {
      color: palette.success.contrast,
      bgColor: palette.success.value,
      borderLeftColor: palette.success.hex_1200,
      hoverBgColor: palette.success.hex_1200,
      hoverBorder: palette.success.hex_1200,
    },
    warning: {
      color: palette.warning.contrast,
      bgColor: palette.warning.value,
      borderLeftColor: palette.warning.hex_1200,
      hoverBgColor: palette.warning.hex_1200,
      hoverBorder: palette.warning.hex_1200,
    },
    error: {
      color: palette.error.contrast,
      bgColor: palette.error.value,
      borderLeftColor: palette.error.hex_1200,
      hoverBgColor: palette.error.hex_1200,
      hoverBorder: palette.error.hex_1200,
    },
    tertiary: {
      color: palette.tertiary.contrast,
      bgColor: palette.tertiary.value,
      borderLeftColor: palette.tertiary.hex_1200,
      hoverBgColor: palette.tertiary.hex_1200,
      hoverBorder: palette.tertiary.hex_1200,
    },
    primary: {
      color: palette.primary.contrast,
      bgColor: palette.primary.value,
      borderLeftColor: palette.primary.hex_1200,
      hoverBgColor: palette.primary.hex_1200,
      hoverBorder: palette.primary.hex_1200,
    },
  };

  if (disabled)
    return {
      ...colors.default,
      bgColor: palette.background.hex_800,
      color: palette.background.hex_500,
    };
  return type ? colors[type] : colors.default;
};
