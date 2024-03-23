import { UIThemesPalette } from '../themes/presets';

export type BrowserColors = {
  color: string;
  barBgColor: string;
  inputBgColor: string;
  borderColor: string;
  titleColor: string;
};

export const getBrowserColors = (invert: boolean, palette: UIThemesPalette): BrowserColors => {
  return invert
    ? {
        color: palette.background.value,
        barBgColor: palette.foreground.value,
        inputBgColor: palette.background.accents_8,
        borderColor: palette.background.accents_7,
        titleColor: palette.background.accents_2,
      }
    : {
        color: palette.foreground.value,
        barBgColor: palette.background.value,
        inputBgColor: palette.background.accents_1,
        borderColor: palette.border.value,
        titleColor: palette.background.accents_5,
      };
};
