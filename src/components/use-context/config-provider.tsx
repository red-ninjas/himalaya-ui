'use client';

import { parseCookies, setCookie } from 'nookies';
import React, { useEffect, useMemo, useState } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';
import CssBaseline from '../css-baseline';
import Themes, { UIThemes } from '../themes';
import { TranslationProvider } from '../use-language';
import { LayoutProvider } from '../use-layout';
import useMediaQuery from '../use-media-query';
import {
  ConfigContext,
  ConfigProviderContextParams,
  UpdateToastsFunction,
  UpdateToastsIDFunction,
  UpdateToastsLayoutFunction,
  defaultToastLayout,
} from './config-context';

import useCurrentState from '../use-current-state';
import ThemeProvider from './theme-provider';
import { THEME_COOKIE_NAME, CUSTOM_THEME_TYPE } from '../constants';
import { DeepPartial } from '../utils/types';
import useTheme from '../use-theme';
import ToastContainer from '../use-toasts/toast-container';
export interface ConfigProps {
  themeType?: string | 'dark' | 'light';
  detectTheme?: boolean;
  themes?: Array<UIThemes>;
}

export function detectTheme(fallBackTheme: string = 'dark') {
  return typeof window !== 'undefined' ? window.localStorage.getItem(THEME_COOKIE_NAME) || fallBackTheme : fallBackTheme;
}

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProps>> = ({
  children,
  themeType = 'dark',
  detectTheme = false,
  themes = [],
}: React.PropsWithChildren<ConfigProps>) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const mediaQuery = useMediaQuery('xs', { match: 'down' });
  const [isMobile, setIsMobile] = useState<boolean>();
  const theme = useTheme();
  const [onSwiping, setOnSwiping] = useState<SwipeEventData | undefined>(undefined);
  const [swipedToLeft, setSwipedLeft] = useState<SwipeEventData | undefined>(undefined);
  const [swipeToRight, setSwipeToRight] = useState<SwipeEventData | undefined>(undefined);
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
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: setSwipeToRight,
    onSwipedLeft: setSwipedLeft,
    onSwiping: setOnSwiping,
  });

  const config: ConfigProviderContextParams = useMemo(
    () => ({
      customTheme,
      updateCustomTheme,
      sidebarScrollHeight: scrollHeight,
      updateSidebarScrollHeight,
      isMobile,
      swipeToRight,
      swipedToLeft,
      onSwiping,
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
    <LayoutProvider>
      <TranslationProvider>
        <ConfigContext.Provider value={config}>
          <ThemeProvider themes={themes} themeType={_themeType}>
            <CssBaseline />
            <div className="ui-app" {...handlers}>
              {children}
            </div>
            <ToastContainer />
          </ThemeProvider>
        </ConfigContext.Provider>
      </TranslationProvider>
      <style global jsx>{`
        .ui-app {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
      `}</style>
    </LayoutProvider>
  );
};
ConfigProvider.displayName = 'HimalayaConfigProvider';
export default ConfigProvider;
