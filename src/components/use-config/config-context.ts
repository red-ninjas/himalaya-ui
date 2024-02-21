'use client';
import { Toast, ToastLayout } from '../use-toasts';
import { UIThemes } from '../themes';
import React from 'react';
import { SwipeEventData } from 'react-swipeable';
import { DeepPartial } from '../utils/types';

export type UpdateToastsFunction = (fn: (toasts: Array<Toast>) => Array<Toast>) => any;
export type UpdateToastsLayoutFunction = (fn: (layout: Required<ToastLayout>) => Required<ToastLayout>) => any;
export type UpdateToastsIDFunction = (fn: () => string | null) => any;

export const defaultToastLayout: Required<ToastLayout> = {
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
  swipeToRight?: SwipeEventData | undefined;
  swipedToLeft?: SwipeEventData | undefined;
  onSwiping?: SwipeEventData | undefined;
  themes?: Array<UIThemes>;
  themeType?: string | 'dark' | 'light';
  toasts: Array<Toast>;
  updateToasts: UpdateToastsFunction;
  toastLayout: Required<ToastLayout>;
  updateToastLayout: UpdateToastsLayoutFunction;
  lastUpdateToastId: string | null;
  updateLastToastId: UpdateToastsIDFunction;
  customTheme: DeepPartial<UIThemes>;
  updateCustomTheme: (theme: DeepPartial<UIThemes>) => void;
}

export const defaultConfigs: ConfigProviderContextParams = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  setTheme: () => {},
  isMobile: false,
  swipeToRight: undefined,
  swipedToLeft: undefined,
  onSwiping: undefined,
  themeType: 'dark',
  toasts: [],
  toastLayout: defaultToastLayout,
  updateToastLayout: t => t,
  updateToasts: t => t,
  lastUpdateToastId: null,
  updateLastToastId: () => null,
  customTheme: {},
  updateCustomTheme: () => {},
};

export const ConfigContext = React.createContext<ConfigProviderContextParams>(defaultConfigs);
export const useConfigs = (): ConfigProviderContextParams => React.useContext(ConfigContext);
