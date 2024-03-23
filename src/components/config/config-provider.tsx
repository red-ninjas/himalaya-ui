'use client';

import { parseCookies, setCookie } from 'nookies';
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
  defaultToastLayout,
} from '../use-config/config-context';
import useMediaQuery from '../use-media-query';

import { RouteChangeProvider } from 'nextjs13-router-events';
import { CUSTOM_THEME_TYPE, THEME_COOKIE_NAME } from '../constants';
import ThemeProvider from '../use-config/theme-provider';
import useCurrentState from '../use-current-state';
import useTheme from '../use-theme';
import ToastContainer from '../use-toasts/toast-container';
import { DeepPartial } from '../utils/types';

export interface ConfigProps {
  themeType?: string | 'dark' | 'light';
  detectTheme?: boolean;
  themes?: Array<UIThemes>;
}

export function detectTheme(fallBackTheme: string = 'dark') {
  return typeof window !== 'undefined' ? window.localStorage.getItem(THEME_COOKIE_NAME) || fallBackTheme : fallBackTheme;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof ConfigProps>;
export type NativeConfigProps = ConfigProps & NativeAttrs;

const ConfigProvider: React.FC<React.PropsWithChildren<NativeConfigProps>> = ({
  children,
  themeType = 'dark',
  detectTheme = false,
  themes = [],
}: React.PropsWithChildren<NativeConfigProps>) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const mediaQuery = useMediaQuery('xs', { match: 'down' });
  const [isMobile, setIsMobile] = useState<boolean>();
  const theme = useTheme();
  const [_themeType, setThemeType] = useState<string>(themeType);
  const [customTheme, setCustomTheme] = useState<UIThemes>(theme);

  useEffect(() => {
    setIsMobile(mediaQuery);
  }, [mediaQuery]);

  useEffect(() => {
    if (detectTheme) {
      const cookies = parseCookies();
      if (cookies && cookies[THEME_COOKIE_NAME] && cookies[THEME_COOKIE_NAME] != _themeType) {
        setThemeType(cookies[THEME_COOKIE_NAME]);
      }
    }
  }, []);

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
    if (detectTheme) {
      setCookie(null, THEME_COOKIE_NAME, type, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  };
  const updateCustomTheme = (nextTheme: DeepPartial<UIThemes>) => {
    const mergedTheme = Themes.create(theme, { ...nextTheme, type: CUSTOM_THEME_TYPE });
    setCustomTheme(mergedTheme);
    setCustomTheme && setCustomTheme(mergedTheme);
  };

  const config: ConfigProviderContextParams = useMemo(
    () => ({
      customTheme,
      updateCustomTheme,
      sidebarScrollHeight: scrollHeight,
      updateSidebarScrollHeight,
      isMobile,
      themeType: _themeType,
      setTheme,
      themes,
      toasts,
      toastLayout,
      updateToasts,
      lastUpdateToastId,
      updateToastLayout,
      updateLastToastId,
    }),
    [isMobile, scrollHeight, _themeType, toasts, toastLayout, lastUpdateToastId],
  );

  return (
    <RouteChangeProvider>
      <LayoutProvider>
        <ConfigContext.Provider value={config}>
          <ThemeProvider inline={false} themes={themes} themeType={config.themeType}>
            <CssBaseline />
            {children}
            <ToastContainer />
          </ThemeProvider>
        </ConfigContext.Provider>
      </LayoutProvider>
    </RouteChangeProvider>
  );
};
ConfigProvider.displayName = 'HimalayaConfigProvider';
export default ConfigProvider;
