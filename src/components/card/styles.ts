import { CardTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';

export type CardStyles = {
  color: string;
  bgColor: string;
  borderColor: string;
};

export const getStyles = (type: CardTypes, palette: UIThemesPalette, isShadow?: boolean): CardStyles => {
  const colors: { [key in CardTypes]: Omit<CardStyles, 'borderColor'> } = {
    default: {
      color: palette.foreground.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    dark: {
      color: palette.background.hex_1000,
      bgColor: palette.foreground.hex_1000,
    },
    secondary: {
      color: palette.secondary.contrast,
      bgColor: palette.secondary.hex_1000,
    },
    success: {
      color: palette.success.contrast,
      bgColor: palette.success.hex_1000,
    },
    primary: {
      color: palette.primary.contrast,
      bgColor: palette.primary.hex_1000,
    },
    warning: {
      color: palette.warning.contrast,
      bgColor: palette.warning.hex_1000,
    },
    error: {
      color: palette.error.contrast,
      bgColor: palette.error.hex_1000,
    },
    lite: {
      color: palette.foreground.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    alert: {
      color: 'white',
      bgColor: palette.error.hex_1000,
    },
    tertiary: {
      color: palette.tertiary.contrast,
      bgColor: palette.tertiary.hex_1000,
    },
  };
  const showBorder = type === 'default' && !isShadow;
  return {
    ...colors[type],
    borderColor: showBorder ? palette.border.hex_1000 : 'transparent',
  };
};
