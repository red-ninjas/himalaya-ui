'use client';
import React, { useState } from 'react';
import { QuickBarProviderProps } from '.';
import { QuickBarContext } from './quickbar-context';

const QuickBarProvider: React.FC<React.PropsWithChildren<QuickBarProviderProps>> = ({ children }) => {
  const [isQuickbarEnabled, setQuickBarEnabled] = useState<boolean | undefined>(undefined);
  const [isSidebarEnabled, setSideBarEnabled] = useState<boolean | undefined>(undefined);

  return (
    <QuickBarContext.Provider
      value={{
        isQuickbarEnabled,
        setQuickBarEnabled,
        isSidebarEnabled,
        setSideBarEnabled,
      }}
    >
      {children}
    </QuickBarContext.Provider>
  );
};

QuickBarProvider.displayName = 'HimalayaQuickBarProvider';
export default QuickBarProvider;
