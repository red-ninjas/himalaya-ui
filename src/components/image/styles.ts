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
        inputBgColor: palette.background.hex_100,
        borderColor: palette.background.hex_200,
        titleColor: palette.background.hex_700,
      }
    : {
        color: palette.foreground.value,
        barBgColor: palette.background.value,
        inputBgColor: palette.background.hex_800,
        borderColor: palette.border.value,
        titleColor: palette.background.hex_400,
      };
};
