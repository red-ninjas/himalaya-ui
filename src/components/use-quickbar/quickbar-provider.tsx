'use client';
import React, { useState } from 'react';
import { QuickBarProviderProps } from '.';
import { QuickBarContext } from './quickbar-context';

const QuickBarProvider: React.FC<React.PropsWithChildren<QuickBarProviderProps>> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState<boolean | undefined>(undefined);

  return (
    <QuickBarContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
      }}
    >
      {children}
    </QuickBarContext.Provider>
  );
};

QuickBarProvider.displayName = 'HimalayaQuickBarProvider';
export default QuickBarProvider;
