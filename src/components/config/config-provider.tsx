'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CssBaseline from '../css-baseline';
import { LayoutProvider } from '../layout';
import Themes, { UIThemes } from '../themes';
import {
  ConfigContext,
  ConfigProviderContextParams,
  UpdateToastsFunction,
  UpdateToastsIDFunction,
  UpdateToastsLayoutFunction,
  defaultLayout,
  defaultToastLayout,
} from '../use-config/config-context';
import useMediaQuery from '../use-media-query';

import { LayoutPropsContext } from 'components/use-layout/layout-context';
import _ from 'lodash';
import { RouteChangeProvider } from 'nextjs13-router-events';
import ThemeProvider from '../use-config/theme-provider';
import useCurrentState from '../use-current-state';
import ToastContainer from '../use-toasts/toast-container';
import { AllThemesConfig } from 'components';

export interface ConfigProps {
  themeType?: string | 'dark' | 'light';
  themes?: Array<UIThemes>;
  layout?: LayoutPropsContext;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof ConfigProps>;
export type NativeConfigProps = ConfigProps & NativeAttrs;

const ConfigProvider: React.FC<React.PropsWithChildren<NativeConfigProps>> = ({
  children,
  themeType = 'dark',
  themes = [],
  layout,
}: React.PropsWithChildren<NativeConfigProps>) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const mediaQuery = useMediaQuery('xs', { match: 'down' });
  const [isMobile, setIsMobile] = useState<boolean>();
  const [_themeType, setThemeType] = useState<string>(themeType);
  const allThemes = themes && themes.length > 0 ? themes : Themes.getPresets();

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

  const setTheme = (type: string) => {
    setThemeType(type);
  };

  const currentTheme = useMemo<UIThemes>(() => {
    const theme = themes.find(item => item.type === themeType);
    if (theme) return theme;
    return Themes.getPresetStaticTheme();
  }, [themes, themeType]);

  const config: ConfigProviderContextParams = useMemo(
    () => ({
      layout: _.merge(defaultLayout, layout),
      sidebarScrollHeight: scrollHeight,
      updateSidebarScrollHeight,
      isMobile,
      themeType: _themeType,
      setTheme,
      theme: currentTheme,
      themes: allThemes,
      toasts,
      toastLayout,
      updateToasts,
      lastUpdateToastId,
      updateToastLayout,
      updateLastToastId,
    }),
    [isMobile, scrollHeight, _themeType, toasts, layout, toastLayout, lastUpdateToastId, currentTheme, allThemes],
  );

  return (
    <RouteChangeProvider>
      <ConfigContext.Provider value={config}>
        <CssBaseline />
        {children}
        <ToastContainer />
      </ConfigContext.Provider>
    </RouteChangeProvider>
  );
};
ConfigProvider.displayName = 'HimalayaConfigProvider';
export default ConfigProvider;
