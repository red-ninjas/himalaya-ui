'use client';
import React, { useEffect, useState } from 'react';
import { QuickBarContext } from './quickbar-context';
import { QuickBarProviderProps } from '.';
import { useConfigs } from '../use-context';

const QuickBarProvider: React.FC<React.PropsWithChildren<QuickBarProviderProps>> = ({ children, hideOnMobile = true }) => {
  const { isMobile } = useConfigs();
  const [isEnabled, setIsEnabled] = useState<boolean>(hideOnMobile && isMobile ? false : true);

  useEffect(() => {
    if (hideOnMobile) {
      setIsEnabled(!isMobile);
    }
  }, [isMobile]);
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
