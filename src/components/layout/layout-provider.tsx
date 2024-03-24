'use client';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { LayoutContext, LayoutPropsContext } from '../use-layout/layout-context';
import { defaultBreakpoints } from '../use-layout/shared';

export type LayoutProviderProps = {
  inline?: boolean;
} & LayoutPropsContext;

const LayoutProvider: React.FC<React.PropsWithChildren<LayoutProviderProps>> = ({
  children,
  pageWidth = '920pt',
  pageMargin = '16pt',
  gap = '16pt',
  gapNegative = `-16pt`,
  gapHalf = `8pt`,
  gapHalfNegative = `-8pt`,
  gapQuarter = `4pt`,
  gapQuarterNegative = `-4pt`,
  breakpoints = defaultBreakpoints,
  radius = '6px',
  unit = '16px',
  pageWidthWithMargin = '950pt',
  sectionSpace = '160px',
  inline = true,
}) => {
  const args = {
    pageWidth,
    pageMargin,
    gap,
    gapNegative,
    gapHalf,
    gapHalfNegative,
    gapQuarter,
    gapQuarterNegative,
    radius,
    unit,
    pageWidthWithMargin,
    sectionSpace,
    breakpoints,
    breakpointMobile: defaultBreakpoints.xs.max,
    breakpointTablet: defaultBreakpoints.sm.max,
  };

  const varsCss: string = useMemo(() => {
    let cssCode: string = ``;

    for (const key of Object.keys(args)) {
      const value = args[key];
      const kebabCaseString = _.kebabCase(key);

      if (key == 'breakpoints') {
        for (const breakpointKey of Object.keys(value)) {
          const breakPointValue = value[breakpointKey];
          const breakpointKeyCase = _.kebabCase(breakpointKey);

          for (const responsiveKey of Object.keys(breakPointValue)) {
            const responsiveValue = breakPointValue[responsiveKey];
            const responsiveCaseKey = _.kebabCase(responsiveKey);

            cssCode += `--layout-breakpoint-${breakpointKeyCase}-${responsiveCaseKey}: ${responsiveValue};`;
          }
        }
      } else {
        cssCode += `--layout-${kebabCaseString}: ${value};`;
      }
    }
    return cssCode;
  }, Object.values(args));

  return (
    <LayoutContext.Provider value={args}>
      {inline ? (
        <div className="theme-layout">
          {children}
          <style jsx>
            {`
              .theme-layout {
                width: 100%;
                height: 100%;
                ${varsCss}
              }
            `}
          </style>
        </div>
      ) : (
        <>
          {children}
          <style jsx global>
            {`
              html {
                ${varsCss}
              }
            `}
          </style>
        </>
      )}
    </LayoutContext.Provider>
  );
};

LayoutProvider.displayName = 'HimalayaLayoutProvider';
export default LayoutProvider;
