'use client';
import React, { useState } from 'react';
import { SidebarContext } from './sidebar-context';

const SidebarProvider: React.FC<React.PropsWithChildren> = ({ children }: React.PropsWithChildren<{}>) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  return (
    <SidebarContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.displayName = 'HimalayaSidebarProvider';
export default SidebarProvider;
