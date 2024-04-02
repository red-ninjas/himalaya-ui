'use client';
import React from 'react';
import { PageLayoutProviderContextProps } from './shared';

export const DefaultPageLayoutProviderConfig: PageLayoutProviderContextProps = {
  setQuickBarEnabled: () => {},
  isQuickbarEnabled: true,
  setSideBarEnabled: () => {},
  isSidebarEnabled: true,
};

export const PageLayoutProviderContext = React.createContext<PageLayoutProviderContextProps>(DefaultPageLayoutProviderConfig);
export const usePageLayout = (): PageLayoutProviderContextProps => React.useContext(PageLayoutProviderContext);
