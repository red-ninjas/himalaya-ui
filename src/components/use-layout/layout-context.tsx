'use client';
import React from 'react';
import { UIThemesBreakpoints, LayoutProps, defaultBreakpoints } from './shared';

export interface LayoutPropsContext {
  pageWidth?: string;
  pageMargin?: string;
  pageWidthWithMargin?: string;
  gap?: string;
  gapNegative?: string;
  gapHalf?: string;
  gapHalfNegative?: string;
  gapQuarter?: string;
  gapQuarterNegative?: string;
  breakpointMobile?: string;
  breakpointTablet?: string;
  breakpoints?: UIThemesBreakpoints;
  radius?: string;
  unit?: string;
}

export const defaultConfigs: LayoutProps = {
  pageWidth: '750pt',
  pageMargin: '16px',
  pageWidthWithMargin: '782pt',
  gap: '16pt',
  gapNegative: '-16pt',
  gapHalf: '8pt',
  gapHalfNegative: '-8pt',
  gapQuarter: '4pt',
  gapQuarterNegative: '-4pt',
  breakpointMobile: defaultBreakpoints.xs.max,
  breakpointTablet: defaultBreakpoints.sm.max,
  breakpoints: defaultBreakpoints,
  radius: '6px',
  unit: '16px',
};

export const LayoutContext = React.createContext<LayoutProps>(defaultConfigs);
export const useLayout = (): LayoutProps => React.useContext(LayoutContext);
