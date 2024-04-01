export type BrowserColors = {
  color: string;
  barBgColor: string;
  inputBgColor: string;
  borderColor: string;
  titleColor: string;
};

export const getBrowserColors = (invert: boolean): BrowserColors => {
  return invert
    ? {
        color: `var(--color-background-1000)`,
        barBgColor: `var(--color-foreground-1000)`,
        inputBgColor: `var(--color-background-100)`,
        borderColor: `var(--color-background-200)`,
        titleColor: `var(--color-background-700)`,
      }
    : {
        color: `var(--color-foreground-1000)`,
        barBgColor: `var(--color-background-1000)`,
        inputBgColor: `var(--color-background-800)`,
        borderColor: `var(--color-border-1000)`,
        titleColor: `var(--color-foreground-700)`,
      };
};
