import { UIThemesPalette } from '../themes/presets';
import { addColorAlpha } from '../utils/color';
import { ButtonTypes } from '../utils/prop-types';
import { ButtonProps } from './button';

export interface ButtonColorGroup {
  bg: string;
  border: string;
  color: string;
}

export const getButtonGhostColors = (palette: UIThemesPalette, type: ButtonTypes): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.background.value,
      border: palette.secondary.value,
      color: palette.secondary.value,
    },

    success: {
      bg: palette.background.value,
      border: palette.success.value,
      color: palette.success.value,
    },
    tertiary: {
      bg: palette.background.value,
      border: palette.tertiary.value,
      color: palette.tertiary.value,
    },
    primary: {
      bg: palette.background.value,
      border: palette.primary.value,
      color: palette.primary.value,
    },
    warning: {
      bg: palette.background.value,
      border: palette.warning.value,
      color: palette.warning.value,
    },
    error: {
      bg: palette.background.value,
      border: palette.error.value,
      color: palette.error.value,
    },
  };

  return colors[type] || null;
};

export const getButtonColors = (palette: UIThemesPalette, props: ButtonProps): ButtonColorGroup => {
  const { type, disabled, ghost } = props;
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    default: {
      bg: palette.background.value,
      border: palette.border.value,
      color: palette.foreground.value,
    },
    secondary: {
      bg: palette.secondary.value,
      border: palette.secondary.light,
      color: palette.secondary.contrast,
    },
    primary: {
      bg: palette.primary.value,
      border: palette.primary.value,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.value,
      border: palette.tertiary.value,
      color: palette.tertiary.contrast,
    },
    success: {
      bg: palette.success.value,
      border: palette.success.value,
      color: palette.success.contrast,
    },
    warning: {
      bg: palette.warning.value,
      border: palette.warning.value,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.value,
      border: palette.error.value,
      color: palette.error.contrast,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.background.accents.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.background.accents.accents_1,
      border: palette.border.value,
      color: palette.background.accents.accents_3,
    };

  const defaultColor = colors.default as ButtonColorGroup;

  if (ghost) return getButtonGhostColors(palette, type || 'default') || defaultColor;
  return colors[type || 'default'] || defaultColor;
};

export const getButtonGhostHoverColors = (palette: UIThemesPalette, type: ButtonTypes): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.secondary.value,
      border: palette.secondary.light,
      color: palette.secondary.contrast,
    },
    success: {
      bg: palette.success.value,
      border: palette.background.value,
      color: 'white',
    },
    warning: {
      bg: palette.warning.value,
      border: palette.background.value,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.value,
      border: palette.background.value,
      color: palette.error.contrast,
    },
    primary: {
      bg: palette.primary.value,
      border: palette.background.value,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.value,
      border: palette.background.value,
      color: palette.tertiary.contrast,
    },
  };
  return colors[type || 'default'] || null;
};

export const getButtonHoverColors = (palette: UIThemesPalette, props: ButtonProps): ButtonColorGroup => {
  const { type, disabled, loading, shadow, ghost } = props;
  const defaultColor = getButtonColors(palette, props);
  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
      color?: string;
    };
  } = {
    default: {
      bg: palette.background.accents.accents_0,
      border: palette.border.dark,
      color: palette.foreground.value,
    },
    secondary: {
      bg: palette.secondary.light,
      border: palette.secondary.lighter,
      color: palette.secondary.contrast,
    },
    primary: {
      bg: palette.primary.light,
      border: palette.primary.lighter,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.light,
      border: palette.tertiary.lighter,
      color: palette.tertiary.contrast,
    },
    success: {
      bg: palette.success.light,
      border: palette.success.lighter,
      color: palette.success.contrast,
    },
    warning: {
      bg: palette.warning.light,
      border: palette.warning.lighter,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.light,
      border: palette.error.lighter,
      color: palette.error.contrast,
    },
    abort: {
      bg: palette.background.accents.accents_0,
      border: palette.background.accents.accents_0,
      color: palette.background.accents.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.background.accents.accents_1,
      border: palette.border.value,
      color: '#ccc',
    };
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    };
  if (shadow) return defaultColor;

  const hoverColor = (ghost ? getButtonGhostHoverColors(palette, type!) : colors[type!]) || colors.default;
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  };
};

export const getButtonActivatedColors = (palette: UIThemesPalette, props: ButtonProps): ButtonColorGroup => {
  const { type, disabled, loading, shadow, ghost } = props;
  const defaultColor = getButtonColors(palette, props);
  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
      color?: string;
    };
  } = {
    default: {
      bg: palette.background.accents.accents_1,
      border: palette.border.darker,
      color: palette.foreground.value,
    },

    secondary: {
      bg: palette.secondary.dark,
      border: palette.secondary.value,
      color: palette.secondary.contrast,
    },

    primary: {
      bg: palette.primary.dark,
      border: palette.primary.value,
      color: palette.primary.contrast,
    },

    tertiary: {
      bg: palette.tertiary.dark,
      border: palette.tertiary.value,
      color: palette.tertiary.contrast,
    },

    success: {
      bg: palette.success.dark,
      border: palette.success.value,
      color: palette.success.contrast,
    },

    warning: {
      bg: palette.warning.dark,
      border: palette.warning.value,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.dark,
      border: palette.error.value,
      color: palette.error.contrast,
    },
    abort: {
      bg: palette.background.accents.accents_0,
      border: palette.background.accents.accents_0,
      color: palette.background.accents.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.background.accents.accents_1,
      border: palette.border.value,
      color: '#ccc',
    };
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    };
  if (shadow) return defaultColor;

  const hoverColor = (ghost ? getButtonGhostHoverColors(palette, type!) : colors[type!]) || colors.default;
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  };
};

export interface ButtonCursorGroup {
  cursor: string;
  events: string;
}

export const getButtonCursor = (disabled: boolean, loading: boolean): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: 'not-allowed',
      events: 'auto',
    };
  if (loading)
    return {
      cursor: 'default',
      events: 'none',
    };

  return {
    cursor: 'pointer',
    events: 'auto',
  };
};

export const getButtonDripColor = (palette: UIThemesPalette) => {
  return addColorAlpha(palette.background.accents.accents_2, 0.65);
};
