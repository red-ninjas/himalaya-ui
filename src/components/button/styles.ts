import { UIThemesPalette } from '../themes/presets'
import { addColorAlpha } from '../utils/color'
import { ButtonTypes } from '../utils/prop-types'
import { ButtonProps } from './button'

export interface ButtonColorGroup {
  bg: string
  border: string
  color: string,
}


export const getButtonGhostColors = (
  palette: UIThemesPalette,
  type: ButtonTypes,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.background,
      border: palette.foreground,
      color: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
      color: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
      color: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
      color: palette.error,
    },
  }

  return colors[type] || null
}

export const getButtonColors = (
  palette: UIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { type, disabled, ghost } = props
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    default: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
    secondary: {
      bg: palette.secondary,
      border: palette.border,
      color: palette.foreground,
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: '#fff',
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: '#fff',
    },
    error: {
      bg: palette.error,
      border: palette.error,
      color: '#fff',
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5,
    },
  }
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.border,
      color: '#ccc',
    }


  const defaultColor = colors.default as ButtonColorGroup

  if (ghost) return getButtonGhostColors(palette, type || 'default') || defaultColor
  return colors[type || 'default'] || defaultColor
}

export const getButtonGhostHoverColors = (
  palette: UIThemesPalette,
  type: ButtonTypes,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.foreground,
      border: palette.background,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.background,
      color: 'white',
    },
    warning: {
      bg: palette.warning,
      border: palette.background,
      color: 'white',
    },
    error: {
      bg: palette.error,
      border: palette.background,
      color: 'white',
    },
  }
  return colors[type || 'default'] || null
}

export const getButtonHoverColors = (
  palette: UIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { type, disabled, loading, shadow, ghost } = props
  const defaultColor = getButtonColors(palette, props)
  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
      color?: string
    }
  } = {
    default: {
      bg: palette.accents_7,
      border: palette.foreground,
      color: palette.background,
    },
    secondary: {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: palette.foreground,
    },
    success: {
      bg: palette.successLight,
      border: palette.successLighter,
      color: '#fff'
    },
    warning: {
      bg: palette.warningLight,
      border: palette.warningLighter,
      color: '#fff'
    },
    error: {
      bg: palette.errorLight,
      border: palette.errorLighter,
      color: '#fff'
    },
    abort: {
      bg: palette.accents_0,
      border: palette.accents_0,
      color: palette.accents_5,
    },
  }
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.border,
      color: '#ccc',
    }
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    }
  if (shadow) return defaultColor

  const hoverColor =
    (ghost ? getButtonGhostHoverColors(palette, type!) : colors[type!]) || colors.default
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  }
}

export const getButtonActivatedColors = (
  palette: UIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { type, disabled, loading, shadow, ghost } = props
  const defaultColor = getButtonColors(palette, props)
  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
      color?: string
    }
  } = {
    default: {
      bg: palette.accents_7,
      border: palette.foreground,
      color: palette.background,
    },
    secondary: {
      bg: palette.accents_0,
      border: palette.accents_0,
      color: palette.foreground,
    },
    success: {
      bg: palette.successDark,
      border: palette.success,
      color: '#fff'
    },
    warning: {
      bg: palette.warningDark,
      border: palette.warning,
      color: '#fff'
    },
    error: {
      bg: palette.errorDark,
      border: palette.error,
      color: '#fff'
    },
    abort: {
      bg: palette.accents_0,
      border: palette.accents_0,
      color: palette.accents_5,
    },
  }
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.border,
      color: '#ccc',
    }
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    }
  if (shadow) return defaultColor

  const hoverColor =
    (ghost ? getButtonGhostHoverColors(palette, type!) : colors[type!]) || colors.default
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  }
}

export interface ButtonCursorGroup {
  cursor: string
  events: string
}

export const getButtonCursor = (
  disabled: boolean,
  loading: boolean,
): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: 'not-allowed',
      events: 'auto',
    }
  if (loading)
    return {
      cursor: 'default',
      events: 'none',
    }

  return {
    cursor: 'pointer',
    events: 'auto',
  }
}

export const getButtonDripColor = (palette: UIThemesPalette) => {
  return addColorAlpha(palette.accents_2, 0.65)
}
