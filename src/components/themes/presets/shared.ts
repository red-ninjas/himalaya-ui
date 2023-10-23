import { UIStyling, UIThemesAccents, UIThemesColors, UIThemesFont } from './index'
import Values from 'values.js'

export const defaultFont: UIThemesFont = {
  sans: '"Figtree Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
  prism:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,"Liberation Mono", "Courier New", monospace',
}

export const defaultStyles: UIStyling = {
  radius: '6px',
}


export const generateColors = (dangerColor = '#f31155', successColor = '#4723f8', warningColor = '#f69646', cyanColor = '#23eea7', violet = '#7928ca'): UIThemesColors => {

  const successColorConverter = new Values(successColor)
  const warningColorConverter = new Values(warningColor)
  const dangerColorConverter = new Values(dangerColor)
  const cyanColorConverter = new Values(cyanColor)
  const violetColorConveter = new Values(violet)

  return {
    error: dangerColor,
    errorLighter: '#' + dangerColorConverter.tint(30).hex,
    errorLight: '#' + dangerColorConverter.tint(15).hex,
    errorDark: '#' + dangerColorConverter.shade(15).hex,
    success: successColor,
    successLighter: '#' + successColorConverter.tint(30).hex,
    successLight: '#' + successColorConverter.tint(15).hex,
    successDark: '#' + successColorConverter.shade(15).hex,
    warning: warningColor,
    warningLighter: '#' + warningColorConverter.tint(30).hex,
    warningLight: '#' + warningColorConverter.tint(15).hex,
    warningDark: '#' + warningColorConverter.shade(15).hex,
    cyan: cyanColor,
    cyanLighter: '#' + cyanColorConverter.tint(30).hex,
    cyanLight: '#' + cyanColorConverter.tint(15).hex,
    cyanDark: '#' + cyanColorConverter.shade(15).hex,
    violet: violet,
    violetLighter: '#' + violetColorConveter.tint(30).hex,
    violetLight: '#' + violetColorConveter.tint(15).hex,
    violetDark: '#' + violetColorConveter.shade(15).hex,
  }
}

export const generateAccents = (mainColor: string, isTint): UIThemesAccents => {

  const mainColorConverter = new Values(mainColor)
  return {
    accents_0: '#' + (isTint ? mainColorConverter.tint(5).hex : mainColorConverter.shade(5).hex),
    accents_1: '#' + (isTint ? mainColorConverter.tint(10).hex : mainColorConverter.shade(10).hex),
    accents_2: '#' + (isTint ? mainColorConverter.tint(20).hex : mainColorConverter.shade(20).hex),
    accents_3: '#' + (isTint ? mainColorConverter.tint(30).hex : mainColorConverter.shade(30).hex),
    accents_4: '#' + (isTint ? mainColorConverter.tint(40).hex : mainColorConverter.shade(40).hex),
    accents_5: '#' + (isTint ? mainColorConverter.tint(60).hex : mainColorConverter.shade(60).hex),
    accents_6: '#' + (isTint ? mainColorConverter.tint(70).hex : mainColorConverter.shade(70).hex),
    accents_7: '#' + (isTint ? mainColorConverter.tint(80).hex : mainColorConverter.shade(80).hex),
    accents_8: '#' + (isTint ? mainColorConverter.tint(90).hex : mainColorConverter.shade(90).hex),
    border: '#' + (isTint ? mainColorConverter.tint(8.5).hex : mainColorConverter.shade(8.5).hex),
    secondary: '#' + (isTint ? mainColorConverter.tint(7.5).hex : mainColorConverter.shade(7.5).hex),
    background: mainColor
  }
}