import { UIThemesPalette } from '../themes/presets'
import { QuickActionTypes, SnippetTypes } from '../utils/prop-types'

export type QuickBarColors = {
  bgColor: string
  color: string
  colorHover: string
  bgColorHover: string
}

export const getColors = (
  type: SnippetTypes,
  palette: UIThemesPalette,
): QuickBarColors => {
  const colors: Record<QuickActionTypes, string> = {
    default: palette.accents_2,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    dark: palette.foreground,
    lite: 'transparent',
  }

  const hoverColors: Record<QuickActionTypes, string> = {
    default: palette.accents_3,
    secondary: palette.secondary,
    success: palette.successLight,
    warning: palette.warningLight,
    error: palette.errorLight,
    dark: palette.accents_7,
    lite: palette.accents_3,
  }

  const textColors: Record<QuickActionTypes, string> = {
    default: palette.accents_6,
    secondary: palette.secondary,
    success: palette.successLighter,
    warning: palette.warningLighter,
    error: palette.errorLighter,
    dark: palette.background,
    lite: palette.accents_6,
  }

  const textColorsHover: Record<QuickActionTypes, string> = {
    default: palette.accents_7,
    secondary: palette.secondary,
    success: palette.foreground,
    warning: palette.foreground,
    error: palette.foreground,
    dark: palette.foreground,
    lite: '#fff',
  }

  return {
    color: textColors[type],
    colorHover: textColorsHover[type],
    bgColor: colors[type],
    bgColorHover: hoverColors[type],
  }
}
