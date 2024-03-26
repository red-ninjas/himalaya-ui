'use client';
import React from 'react';
import { defaultLayout } from '../use-config/config-context';
import { LayoutProps, UIThemesBreakpoints } from './shared';

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
  breakpoints?: UIThemesBreakpoints;
  radius?: string;
  unit?: string;
  sectionSpace?: string;
}

export const LayoutContext = React.createContext<LayoutProps>(defaultLayout);
export const useLayout = (): LayoutProps => React.useContext(LayoutContext);
