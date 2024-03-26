'use client';
import React from 'react';
import { UIThemes } from '../themes';
import { LayoutProps, defaultBreakpoints } from '../use-layout';
import { Toast, ToastLayout } from '../use-toasts';

export type UpdateToastsFunction = (fn: (toasts: Array<Toast>) => Array<Toast>) => any;
export type UpdateToastsLayoutFunction = (fn: (layout: Required<ToastLayout>) => Required<ToastLayout>) => any;
export type UpdateToastsIDFunction = (fn: () => string | null) => any;

export const defaultLayout: LayoutProps = {
  pageWidth: '1200px',
  pageMargin: '24px',
  pageWidthWithMargin: '1248px',
  gap: '16pt',
  gapNegative: '-16pt',
  gapHalf: '8pt',
  gapHalfNegative: '-8pt',
  gapQuarter: '4pt',
  gapQuarterNegative: '-4pt',
  breakpointMobile: defaultBreakpoints.xs.max,
  breakpointTablet: defaultBreakpoints.sm.max,
  breakpoints: defaultBreakpoints,
  radius: '6px',
  unit: '16px',
  sectionSpace: '160px',
};

export const defaultToastLayout: Required<ToastLayout> = {
  r: '6px',
  padding: '12px 16px',
  margin: '8px 0',
  width: '420px',
  maxWidth: '90vw',
  maxHeight: '75px',
  placement: 'bottomRight',
};

export interface ConfigProviderContextParams {
  sidebarScrollHeight?: number;
  updateSidebarScrollHeight?: (height: number) => void;
  setTheme: (type: string) => void;
  isMobile?: boolean;
  themes?: Array<UIThemes>;
  themeType?: string | 'dark' | 'light';
  toasts: Array<Toast>;
  updateToasts: UpdateToastsFunction;
  toastLayout: Required<ToastLayout>;
  layout: LayoutProps;
  updateToastLayout: UpdateToastsLayoutFunction;
  lastUpdateToastId: string | null;
  updateLastToastId: UpdateToastsIDFunction;
}

export const defaultConfigs: ConfigProviderContextParams = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  setTheme: () => {},
  isMobile: false,
  themeType: 'dark',
  toasts: [],
  layout: defaultLayout,
  toastLayout: defaultToastLayout,
  updateToastLayout: t => t,
  updateToasts: t => t,
  lastUpdateToastId: null,
  updateLastToastId: () => null,
};

export const ConfigContext = React.createContext<ConfigProviderContextParams>(defaultConfigs);
export const useConfigs = (): ConfigProviderContextParams => React.useContext(ConfigContext);
