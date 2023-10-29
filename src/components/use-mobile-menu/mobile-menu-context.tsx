'use client';
import React from 'react';

export interface MobileMenuContextProps {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

export const defaultConfigs: MobileMenuContextProps = {
  setIsEnabled: () => {},
  isEnabled: false,
};

export const MobileMenuContext = React.createContext<MobileMenuContextProps>(defaultConfigs);
export const useMobileMenu = (): MobileMenuContextProps => React.useContext(MobileMenuContext);
