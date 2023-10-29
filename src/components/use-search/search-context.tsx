'use client';
import React from 'react';

export interface SearchContextProps {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

export const defaultConfigs: SearchContextProps = {
  setIsEnabled: () => {},
  isEnabled: false,
};

export const SearchContext = React.createContext<SearchContextProps>(defaultConfigs);
export const useSearch = (): SearchContextProps => React.useContext(SearchContext);
