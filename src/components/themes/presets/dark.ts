import { UIThemes, UIThemesExpressiveness, UIThemesPalette } from './index'
import { defaultFont, defaultStyles } from './shared'

export const palette: UIThemesPalette = {
  accents_0: '#0A0A0A',
  accents_1: '#111',
  accents_2: '#333',
  accents_3: '#444',
  accents_4: '#666',
  accents_5: '#888',
  accents_6: '#999',
  accents_7: '#eaeaea',
  accents_8: '#fafafa',
  background: '#000',
  foreground: '#fff',
  selection: '#f81ce5',
  secondary: '#888',
  code: '#79ffe1',
  border: '#1F1F1F',
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
    from: '#007cf0',
    to: '#01dfd8',
  },
  gradient_2: {
    from: '#7d00d9',
    to: '#ff0080',
  },
  gradient_3: {
    from: '#ff4d4d',
    to: '#fbca00',
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
  type: 'dark',
  font,
  palette,
  expressiveness,
  style,
}

export default themes
