import { UIThemes, UIThemesExpressiveness, UIThemesPalette } from './index'
import { defaultFont, defaultStyles } from './shared'

export const palette: UIThemesPalette = {
  accents_0: '#1c1c1f',
  accents_1: '#28282c',
  accents_2: '#2e2e32',
  accents_3: '#3e3e44',
  accents_4: '#504f57',
  accents_5: '#706f78',
  accents_6: '#7e7d86',
  accents_7: '#a09fa6',
  accents_8: '#ededef',
  background: '#161618',
  foreground: '#fcfcfc',
  selection: '#f81ce5',
  secondary: '#888',
  code: '#79ffe1',
  border: '#232326',
  error: '#e00',
  errorLighter: '#f7d4d6',
  errorLight: '#ff1a1a',
  errorDark: '#c50000',
  success: '#0070f3',
  successLighter: '#d3e5ff',
  successLight: '#3291ff',
  successDark: '#0761d1',
  warning: '#f5a623',
  warningLighter: '#ffefcf',
  warningLight: '#f7b955',
  warningDark: '#ab570a',
  cyan: '#50e3c2',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyanDark: '#29bc9b',
  violet: '#7928ca',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violetDark: '#4c2889',
  purple: '#f81ce5',
  alert: '#ff0080',
  magenta: '#eb367f',
  link: '#3291ff',

  gradient_1: {
    from: '#46e3b7',
    to: '#527cac',
  },
  gradient_2: {
    from: '#f537f9',
    to: '#f7be2b',
  },
  gradient_3: {
    from: '#e84e38',
    to: '#ba2cb8',
  },
}

export const expressiveness: UIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 0 0 1px ' + palette.border,
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 0 0 1px ' + palette.border,
  shadowMedium: '0 0 0 1px ' + palette.border,
  shadowLarge: '0 0 0 1px ' + palette.border,
  portalOpacity: 0.75,
}

export const font = defaultFont

export const style = defaultStyles

export const themes: UIThemes = {
  type: 'grey',
  font,
  palette,
  expressiveness,
  style,
}

export default themes
