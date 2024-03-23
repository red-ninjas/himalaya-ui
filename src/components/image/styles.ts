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
        color: palette.background.hex_1000,
        barBgColor: palette.foreground.hex_1000,
        inputBgColor: palette.background.hex_100,
        borderColor: palette.background.hex_200,
        titleColor: palette.background.hex_700,
      }
    : {
        color: palette.foreground.hex_1000,
        barBgColor: palette.background.hex_1000,
        inputBgColor: palette.background.hex_800,
        borderColor: palette.border.hex_1000,
        titleColor: palette.foreground.hex_700,
      };
};
