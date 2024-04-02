import { ReactNode } from 'react';
import { UIColorTypes } from '../themes/presets';
import { ScaleResponsiveParameter } from '../use-scale';

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
export type QuickBarLayoutProps = LayoutProps & NativeAttrs;

export interface ActionProps {
  tooltip?: string | React.ReactNode;
  active?: boolean;
  type?: UIColorTypes;
  space?: ScaleResponsiveParameter<number | string>;
}

type ActionPropsNative = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ActionProps>;
export type QuickActionProps = ActionProps & ActionPropsNative;
