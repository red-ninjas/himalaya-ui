'use client';
import React from 'react';

export interface QuickBarContextProps {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

export const defaultConfigs: QuickBarContextProps = {
  setIsEnabled: () => {},
  isEnabled: false,
};

export const QuickBarContext = React.createContext<QuickBarContextProps>(defaultConfigs);
export const useQuickBar = (): QuickBarContextProps => React.useContext(QuickBarContext);
