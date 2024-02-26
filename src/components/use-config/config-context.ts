'use client';
import { Toast, ToastLayout } from '../use-toasts';
import React from 'react';

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
  isMobile?: boolean;
  toasts: Array<Toast>;
  updateToasts: UpdateToastsFunction;
  toastLayout: Required<ToastLayout>;
  updateToastLayout: UpdateToastsLayoutFunction;
  lastUpdateToastId: string | null;
  updateLastToastId: UpdateToastsIDFunction;
}

export const defaultConfigs: ConfigProviderContextParams = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  isMobile: false,
  toasts: [],
  toastLayout: defaultToastLayout,
  updateToastLayout: t => t,
  updateToasts: t => t,
  lastUpdateToastId: null,
  updateLastToastId: () => null,
};

export const ConfigContext = React.createContext<ConfigProviderContextParams>(defaultConfigs);
export const useConfigs = (): ConfigProviderContextParams => React.useContext(ConfigContext);
