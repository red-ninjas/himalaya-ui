'use client';
import React from 'react';

export interface SidebarContextProps {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

export const defaultConfigs: SidebarContextProps = {
  setIsEnabled: () => {},
  isEnabled: false,
};

export const SidebarContext = React.createContext<SidebarContextProps>(defaultConfigs);
export const useSidebar = (): SidebarContextProps => React.useContext(SidebarContext);
