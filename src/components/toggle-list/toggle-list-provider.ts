'use client';
import React from 'react';

export interface ToggleListConfig {
  updateState?: (value: string | number) => void;
  disabledAll: boolean;
  value?: string | number;
}

const defaultContext = {
  disabledAll: false,
  inGroup: false,
};

export const ToggleListContext = React.createContext<ToggleListConfig>(defaultContext);
export const useToggleListContext = (): ToggleListConfig => React.useContext<ToggleListConfig>(ToggleListContext);
