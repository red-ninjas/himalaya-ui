'use client';
import React from 'react';

export interface QuickBarContextProps {
  isQuickbarEnabled: boolean | undefined;
  setQuickBarEnabled: (value: boolean | undefined) => void;
  isSidebarEnabled: boolean | undefined;
  setSideBarEnabled: (value: boolean | undefined) => void;
}

export const defaultConfigs: QuickBarContextProps = {
  setQuickBarEnabled: () => {},
  isQuickbarEnabled: true,
  setSideBarEnabled: () => {},
  isSidebarEnabled: true,
};

export const QuickBarContext = React.createContext<QuickBarContextProps>(defaultConfigs);
export const useQuickBar = (): QuickBarContextProps => React.useContext(QuickBarContext);
