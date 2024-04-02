import { ReactNode } from 'react';
import { ScaleResponsiveParameter } from '../use-scale';
export interface PageLayoutProviderProps {
  isQuickbarEnabled?: boolean;
  isSidebarEnabled?: boolean;
}

export interface PageLayoutProviderContextProps {
  isQuickbarEnabled: boolean | undefined;
  setQuickBarEnabled: (value: boolean | undefined) => void;
  isSidebarEnabled: boolean | undefined;
  setSideBarEnabled: (value: boolean | undefined) => void;
}

export interface LayoutProps {
  animationTime?: number;
  quickbarContent?: ReactNode;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
  headerHeight?: ScaleResponsiveParameter<string | number>;
  sidebarWidth?: ScaleResponsiveParameter<string | number>;
  quickbarWidth?: ScaleResponsiveParameter<string | number>;
  quickbarVisible?: ScaleResponsiveParameter<boolean>;
  sidebarVisible?: ScaleResponsiveParameter<boolean>;
  headerVisible?: ScaleResponsiveParameter<boolean>;
  withPageMargin?: ScaleResponsiveParameter<boolean>;
  maximalContentWidth?: ScaleResponsiveParameter<string>;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof LayoutProps>;
export type PageLayoutProps = LayoutProps & NativeAttrs;
