import { UIThemes, UIThemesExpressiveness, UIThemesPalette } from './index';
import { defaultFont, defaultStyles } from './shared';
import { generateAccents, generateColors } from '../utils';

const ascents = generateAccents('#060606', '#ffffff');
const colors = generateColors();
export const palette: UIThemesPalette = Object.assign(
  ascents,
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
  dropdownBoxShadow: '0 0 0 1px ' + palette.border,
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 0 0 1px ' + palette.border,
  shadowMedium: '0 0 0 1px ' + palette.border,
  shadowLarge: '0 0 0 1px ' + palette.border,
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
