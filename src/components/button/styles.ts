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
      bg: palette.background,
      border: palette.secondary.value,
      color: palette.secondary.value,
    },

    success: {
      bg: palette.background,
      border: palette.success.value,
      color: palette.success.value,
    },
    tertiary: {
      bg: palette.background,
      border: palette.tertiary.value,
      color: palette.tertiary.value,
    },
    primary: {
      bg: palette.background,
      border: palette.primary.value,
      color: palette.primary.value,
    },
    warning: {
      bg: palette.background,
      border: palette.warning.value,
      color: palette.warning.value,
    },
    error: {
      bg: palette.background,
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
      bg: palette.background,
      border: palette.border,
      color: palette.accents_5,
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
      color: palette.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.border,
      color: palette.accents_3,
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
      border: palette.background,
      color: 'white',
    },
    warning: {
      bg: palette.warning.value,
      border: palette.background,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.value,
      border: palette.background,
      color: palette.error.contrast,
    },
    primary: {
      bg: palette.primary.value,
      border: palette.background,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.value,
      border: palette.background,
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
      bg: palette.background,
      border: palette.foreground,
      color: palette.foreground,
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
      bg: palette.accents_0,
      border: palette.accents_0,
      color: palette.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.border,
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
      bg: palette.accents_7,
      border: palette.foreground,
      color: palette.background,
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
      bg: palette.accents_0,
      border: palette.accents_0,
      color: palette.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.border,
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
  return addColorAlpha(palette.accents_2, 0.65);
};
