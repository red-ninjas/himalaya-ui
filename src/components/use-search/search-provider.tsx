'use client';
import React, { useState } from 'react';
import { SearchContext } from './search-context';

const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }: React.PropsWithChildren<{}>) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  return (
    <SearchContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.displayName = 'HimalayaSearchProvider';
export default SearchProvider;
