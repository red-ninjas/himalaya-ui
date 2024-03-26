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
    let cssCode: string = ``;

    for (const key of Object.keys(mainLayout)) {
      const value = mainLayout[key];
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
  }, Object.values(mainLayout));

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
