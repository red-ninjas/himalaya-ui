'use client';
import { useConfigs } from 'components/use-config';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { LayoutContext, LayoutPropsContext } from '../use-layout/layout-context';

export type LayoutProviderProps = {
  inline?: boolean;
  layout?: LayoutPropsContext;
};

const LayoutProvider: React.FC<React.PropsWithChildren<LayoutProviderProps>> = ({ children, layout, inline = true }) => {
  const { layout: configLayout } = useConfigs();
  const mainLayout = _.merge(configLayout, layout);

  const varsCss: string = useMemo(() => {
    let cssCode: string = `
      .hide {display: none !important;}
    `;

    for (const key of Object.keys(mainLayout)) {
      const value = mainLayout[key];
      const kebabCaseString = _.kebabCase(key);

      if (key !== 'breakpoints') {
        cssCode += `--layout-${kebabCaseString}: ${value};`;
      }
    }
    return cssCode;
  }, Object.values(mainLayout));

  const [breakpointsVars, breakpointsCode] = useMemo(() => {
    let breakpointCode: string = ``;
    let breakPointsVars: string = ``;

    const breakpoints = mainLayout.breakpoints;

    for (const breakpointKey of Object.keys(breakpoints)) {
      const breakPointValue = breakpoints[breakpointKey];
      const breakpointKeyCase = _.kebabCase(breakpointKey);

      for (const responsiveKey of Object.keys(breakPointValue)) {
        const responsiveValue = breakPointValue[responsiveKey];
        const responsiveCaseKey = _.kebabCase(responsiveKey);

        breakPointsVars += `--layout-breakpoint-${breakpointKeyCase}-${responsiveCaseKey}: ${responsiveValue};`;
      }

      if (breakpointKey === 'xs') {
        breakpointCode += `
          @media only screen and (max-width: ${breakpoints[breakpointKey].max}) {
            .hide-${breakpointKey} {
              display: none !important;
            }
          }
        `;
      } else if (breakpointKey === 'xl') {
        breakpointCode += `
          @media only screen and (min-width: ${breakpoints[breakpointKey].min}) {
            .hide-${breakpointKey} {
              display: none !important;
            }
          }
        `;
      } else {
        breakpointCode += `
          @media only screen and (min-width: ${breakpoints[breakpointKey].min}) and (max-width: ${breakpoints[breakpointKey].max}) {
            .hide-${breakpointKey} {
              display: none !important;
            }
          }
        `;
      }
    }
    return [breakPointsVars, breakpointCode];
  }, Object.values(mainLayout.breakpoints));

  return (
    <LayoutContext.Provider value={mainLayout}>
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
                ${breakpointsVars}
              }
              ${breakpointsCode}
            `}
          </style>
        </>
      )}
    </LayoutContext.Provider>
  );
};

LayoutProvider.displayName = 'HimalayaLayoutProvider';
export default LayoutProvider;
