'use client';
import React from 'react';
import { LayoutContext, LayoutPropsContext } from './layout-context';
import { defaultBreakpoints } from './shared';

const LayoutProvider: React.FC<React.PropsWithChildren<LayoutPropsContext>> = ({
  children,
  pageWidth = '920pt',
  pageMargin = '16pt',
  gap = '16pt',
  gapNegative = `-16pt`,
  gapHalf = `8pt`,
  gapHalfNegative = `-8pt`,
  gapQuarter = `4pt`,
  gapQuarterNegative = `-4pt`,
  breakpointMobile = defaultBreakpoints.xs.max,
  breakpointTablet = defaultBreakpoints.sm.max,
  breakpoints = defaultBreakpoints,
  radius = '6px',
  unit = '16px',
  pageWidthWithMargin = '950pt',
}) => {
  return (
    <LayoutContext.Provider
      value={{
        pageWidth,
        pageMargin,
        gap,
        gapNegative,
        gapHalf,
        gapHalfNegative,
        gapQuarter,
        gapQuarterNegative,
        breakpointMobile,
        breakpointTablet,
        breakpoints,
        radius,
        unit,
        pageWidthWithMargin,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.displayName = 'HimalayaLayoutProvider';
export default LayoutProvider;
