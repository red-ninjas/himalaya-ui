'use client';
import React from 'react';

export interface MobileMenuContextProps {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
  direction: 'left' | 'right';
  setDirection: (value: 'left' | 'right') => void;
}

export const defaultConfigs: MobileMenuContextProps = {
  setIsEnabled: () => {},
  isEnabled: false,
  direction: 'left',
  setDirection: () => {},
};

export const MobileMenuContext = React.createContext<MobileMenuContextProps>(defaultConfigs);
export const useMobileMenu = (): MobileMenuContextProps => React.useContext(MobileMenuContext);
