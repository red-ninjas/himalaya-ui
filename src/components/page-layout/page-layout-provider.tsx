'use client';
import React, { useState } from 'react';
import { PageLayoutProviderProps } from './shared';
import { PageLayoutProviderContext } from './page-layout-context';

const PageLayoutProvider: React.FC<React.PropsWithChildren<PageLayoutProviderProps>> = ({ children, ...props }) => {
  const [isQuickbarEnabled, setQuickBarEnabled] = useState<boolean | undefined>(props.isQuickbarEnabled);
  const [isSidebarEnabled, setSideBarEnabled] = useState<boolean | undefined>(props.isSidebarEnabled);

  return (
    <PageLayoutProviderContext.Provider
      value={{
        isQuickbarEnabled,
        setQuickBarEnabled,
        isSidebarEnabled,
        setSideBarEnabled,
      }}
    >
      {children}
    </PageLayoutProviderContext.Provider>
  );
};

PageLayoutProvider.displayName = 'HimalayaPageLayoutProvider';
export default PageLayoutProvider;
