'use client';
import React, { useContext } from 'react';
import { ThemeContext } from './theme-context';

export const withThemeContext = <P extends {}>(Component: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = props => {
    const context = useContext(ThemeContext);
    return <Component context={context} {...props} />;
  };

  return Wrapper;
};
