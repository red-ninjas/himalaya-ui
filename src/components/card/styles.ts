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
      color: palette.foreground.value,
      bgColor: palette.background.value,
    },
    dark: {
      color: palette.background.value,
      bgColor: palette.foreground.value,
    },
    secondary: {
      color: palette.secondary.contrast,
      bgColor: palette.secondary.value,
    },
    success: {
      color: palette.success.contrast,
      bgColor: palette.success.value,
    },
    primary: {
      color: palette.primary.contrast,
      bgColor: palette.primary.value,
    },
    warning: {
      color: palette.warning.contrast,
      bgColor: palette.warning.value,
    },
    error: {
      color: palette.error.contrast,
      bgColor: palette.error.value,
    },
    lite: {
      color: palette.foreground.value,
      bgColor: palette.background.value,
    },
    alert: {
      color: 'white',
      bgColor: palette.error.value,
    },
    tertiary: {
      color: palette.tertiary.contrast,
      bgColor: palette.tertiary.value,
    },
  };
  const showBorder = type === 'default' && !isShadow;
  return {
    ...colors[type],
    borderColor: showBorder ? palette.border.value : 'transparent',
  };
};
