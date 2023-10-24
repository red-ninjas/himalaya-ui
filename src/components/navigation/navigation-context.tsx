'use client';
import { ReactiveDomReact } from '../utils/layouts';
import React from 'react';

export interface NavigationConfig {
  rect?: ReactiveDomReact;
  onMouseOver: (e: ReactiveDomReact) => void;
}

export const defaultConfigs: NavigationConfig = {
  onMouseOver: () => {},
};

export const NavigationContext = React.createContext<NavigationConfig>(defaultConfigs);
export const useNavigation = (): NavigationConfig => React.useContext(NavigationContext);
