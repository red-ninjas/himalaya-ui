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
        <>{children}</>
      )}
    </LayoutContext.Provider>
  );
};

LayoutProvider.displayName = 'HimalayaLayoutProvider';
export default LayoutProvider;
