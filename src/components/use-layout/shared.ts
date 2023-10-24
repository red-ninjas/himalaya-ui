export interface BreakpointsItem {
  min: string;
  max: string;
}
export interface UIThemesBreakpoints {
  xs: BreakpointsItem;
  sm: BreakpointsItem;
  md: BreakpointsItem;
  lg: BreakpointsItem;
  xl: BreakpointsItem;
}

export const defaultBreakpoints: UIThemesBreakpoints = {
  xs: {
    min: '0',
    max: '650px',
  },
  sm: {
    min: '650px',
    max: '900px',
  },
  md: {
    min: '900px',
    max: '1280px',
  },
  lg: {
    min: '1280px',
    max: '1920px',
  },
  xl: {
    min: '1920px',
    max: '10000px',
  },
};

export interface LayoutProps {
  pageWidth: string;
  pageMargin: string;
  pageWidthWithMargin: string;
  gap: string;
  gapNegative: string;
  gapHalf: string;
  gapHalfNegative: string;
  gapQuarter: string;
  gapQuarterNegative: string;
  breakpointMobile: string;
  breakpointTablet: string;
  breakpoints: UIThemesBreakpoints;
  radius: string;
  unit: string;
}
