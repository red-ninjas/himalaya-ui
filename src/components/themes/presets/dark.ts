import { makeColors } from '../utils';
import { UIThemes, UIThemesExpressiveness, UIThemesPalette } from './index';
import { defaultFont, defaultStyles } from './shared';

const colors = makeColors({
  gray: '#7d7d7d',
  foreground: '#ededed',
  border: '#242424',
  secondary: '#7d7d7d',
  primary: '#0062d1',
  tertiary: '#763da9',
  warning: '#ff990a',
  error: '#d93036',
  success: '#398e4a',
  link: '#0070f3',
  code: '#d73a49',
  background: '#000000',
});
export const palette: UIThemesPalette = Object.assign(
  {
    gradient_1: {
      from: '#c81f93',
      to: '#7214c5',
    },
    gradient_2: {
      from: '#29f5a0',
      to: '#01a1f8',
    },
    gradient_3: {
      from: '#fb6272',
      to: '#fd9746',
    },
  },
  colors,
);

export const expressiveness: UIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
  shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
  portalOpacity: 0.75,
};

export const font = defaultFont;
export const style = defaultStyles;

export const darkTheme = (): UIThemes => {
  return {
    type: 'dark',
    font,
    palette,
    expressiveness,
    style,
  };
};

export default darkTheme;
