'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { LayoutProvider } from '../layout';
import {
  ConfigContext,
  ConfigProviderContextParams,
  UpdateToastsFunction,
  UpdateToastsIDFunction,
  UpdateToastsLayoutFunction,
  defaultToastLayout,
} from '../use-config/config-context';
import useMediaQuery from '../use-media-query';
import useCurrentState from '../use-current-state';
import ToastContainer from '../use-toasts/toast-container';
export interface ConfigProps {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof ConfigProps>;
export type NativeConfigProps = ConfigProps & NativeAttrs;

const ConfigProvider: React.FC<React.PropsWithChildren<NativeConfigProps>> = ({ children }: React.PropsWithChildren<NativeConfigProps>) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const mediaQuery = useMediaQuery('xs', { match: 'down' });
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    setIsMobile(mediaQuery);
  }, [mediaQuery]);

  const [lastUpdateToastId, setLastUpdateToastId] = useState<ConfigProviderContextParams['lastUpdateToastId']>(null);
  const [toasts, setToasts, toastsRef] = useCurrentState<ConfigProviderContextParams['toasts']>([]);
  const [toastLayout, setToastLayout, toastLayoutRef] = useCurrentState<ConfigProviderContextParams['toastLayout']>(defaultToastLayout);
  const updateToasts: UpdateToastsFunction = fn => {
    const nextToasts = fn(toastsRef.current);
    setToasts(nextToasts);
  };
  const updateToastLayout: UpdateToastsLayoutFunction = fn => {
    const nextLayout = fn(toastLayoutRef.current);
    setToastLayout(nextLayout);
  };
  const updateLastToastId: UpdateToastsIDFunction = fn => {
    setLastUpdateToastId(fn());
  };

  const updateSidebarScrollHeight = (height: number) => {
    setScrollHeight(height);
  };

  const config: ConfigProviderContextParams = useMemo(
    () => ({
      sidebarScrollHeight: scrollHeight,
      updateSidebarScrollHeight,
      isMobile,
      toasts,
      toastLayout,
      updateToasts,
      lastUpdateToastId,
      updateToastLayout,
      updateLastToastId,
    }),
    [isMobile, scrollHeight, toasts, toastLayout, lastUpdateToastId],
  );

  return (
    <LayoutProvider>
      <ConfigContext.Provider value={config}>
        {children}
        <ToastContainer />
      </ConfigContext.Provider>
    </LayoutProvider>
  );
};
ConfigProvider.displayName = 'HimalayaConfigProvider';
export default ConfigProvider;
