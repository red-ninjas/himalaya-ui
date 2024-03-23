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
      bg: palette.background.hex_1000,
      border: palette.secondary.hex_1000,
      color: palette.secondary.hex_1000,
    },

    success: {
      bg: palette.background.hex_1000,
      border: palette.success.hex_1000,
      color: palette.success.hex_1000,
    },
    tertiary: {
      bg: palette.background.hex_1000,
      border: palette.tertiary.hex_1000,
      color: palette.tertiary.hex_1000,
    },
    primary: {
      bg: palette.background.hex_1000,
      border: palette.primary.hex_1000,
      color: palette.primary.hex_1000,
    },
    warning: {
      bg: palette.background.hex_1000,
      border: palette.warning.hex_1000,
      color: palette.warning.hex_1000,
    },
    error: {
      bg: palette.background.hex_1000,
      border: palette.error.hex_1000,
      color: palette.error.hex_1000,
    },
  };

  return colors[type] || null;
};

export const getButtonColors = (palette: UIThemesPalette, props: ButtonProps): ButtonColorGroup => {
  const { type, disabled, ghost } = props;
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    default: {
      bg: palette.background.hex_1000,
      border: palette.border.hex_1000,
      color: palette.foreground.hex_1000,
    },
    secondary: {
      bg: palette.secondary.hex_1000,
      border: palette.secondary.hex_900,
      color: palette.secondary.contrast,
    },
    primary: {
      bg: palette.primary.hex_1000,
      border: palette.primary.hex_1000,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.hex_1000,
      border: palette.tertiary.hex_1000,
      color: palette.tertiary.contrast,
    },
    success: {
      bg: palette.success.hex_1000,
      border: palette.success.hex_1000,
      color: palette.success.contrast,
    },
    warning: {
      bg: palette.warning.hex_1000,
      border: palette.warning.hex_1000,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.hex_1000,
      border: palette.error.hex_1000,
      color: palette.error.contrast,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.background.hex_400,
    },
  };
  if (disabled)
    return {
      bg: palette.background.hex_800,
      border: palette.border.hex_1000,
      color: palette.background.hex_600,
    };

  const defaultColor = colors.default as ButtonColorGroup;

  if (ghost) return getButtonGhostColors(palette, type || 'default') || defaultColor;
  return colors[type || 'default'] || defaultColor;
};

export const getButtonGhostHoverColors = (palette: UIThemesPalette, type: ButtonTypes): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.secondary.hex_1000,
      border: palette.secondary.hex_900,
      color: palette.secondary.contrast,
    },
    success: {
      bg: palette.success.hex_1000,
      border: palette.background.hex_1000,
      color: 'white',
    },
    warning: {
      bg: palette.warning.hex_1000,
      border: palette.background.hex_1000,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.hex_1000,
      border: palette.background.hex_1000,
      color: palette.error.contrast,
    },
    primary: {
      bg: palette.primary.hex_1000,
      border: palette.background.hex_1000,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.hex_1000,
      border: palette.background.hex_1000,
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
      bg: palette.background.hex_900,
      border: palette.border.hex_1200,
      color: palette.foreground.hex_1000,
    },
    secondary: {
      bg: palette.secondary.hex_900,
      border: palette.secondary.hex_800,
      color: palette.secondary.contrast,
    },
    primary: {
      bg: palette.primary.hex_900,
      border: palette.primary.hex_800,
      color: palette.primary.contrast,
    },
    tertiary: {
      bg: palette.tertiary.hex_900,
      border: palette.tertiary.hex_800,
      color: palette.tertiary.contrast,
    },
    success: {
      bg: palette.success.hex_900,
      border: palette.success.hex_800,
      color: palette.success.contrast,
    },
    warning: {
      bg: palette.warning.hex_900,
      border: palette.warning.hex_800,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.hex_900,
      border: palette.error.hex_800,
      color: palette.error.contrast,
    },
    abort: {
      bg: palette.background.hex_900,
      border: palette.background.hex_900,
      color: palette.background.hex_400,
    },
  };
  if (disabled)
    return {
      bg: palette.background.hex_800,
      border: palette.border.hex_1000,
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
      bg: palette.background.hex_800,
      border: palette.border.hex_1100,
      color: palette.foreground.hex_1000,
    },

    secondary: {
      bg: palette.secondary.hex_1200,
      border: palette.secondary.hex_1000,
      color: palette.secondary.contrast,
    },

    primary: {
      bg: palette.primary.hex_1200,
      border: palette.primary.hex_1000,
      color: palette.primary.contrast,
    },

    tertiary: {
      bg: palette.tertiary.hex_1200,
      border: palette.tertiary.hex_1000,
      color: palette.tertiary.contrast,
    },

    success: {
      bg: palette.success.hex_1200,
      border: palette.success.hex_1000,
      color: palette.success.contrast,
    },

    warning: {
      bg: palette.warning.hex_1200,
      border: palette.warning.hex_1000,
      color: palette.warning.contrast,
    },
    error: {
      bg: palette.error.hex_1200,
      border: palette.error.hex_1000,
      color: palette.error.contrast,
    },
    abort: {
      bg: palette.background.hex_900,
      border: palette.background.hex_900,
      color: palette.background.hex_400,
    },
  };
  if (disabled)
    return {
      bg: palette.background.hex_800,
      border: palette.border.hex_1000,
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
  return addColorAlpha(palette.background.hex_700, 0.65);
};
