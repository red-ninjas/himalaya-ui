'use client';

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import Themes from '../themes';
import { UIThemes } from '../themes/presets';
import { ThemeContext, useTheme } from '../use-theme/theme-context';
import { AllThemesConfig, AllThemesContext } from '../use-all-themes/all-themes-context';
import { CUSTOM_THEME_TYPE, THEME_COOKIE_NAME } from '../constants';
import { DeepPartial } from '../utils/types';
import CssBaseline from '../css-baseline';

export interface Props {
  themeType?: string | 'dark' | 'light';
  detectTheme?: boolean;
  themes?: Array<UIThemes>;
}

export function detectTheme(fallBackTheme: string = 'dark') {
  return typeof window !== 'undefined' ? window.localStorage.getItem(THEME_COOKIE_NAME) ?? fallBackTheme : fallBackTheme;
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children, themes = [], themeType = 'dark', detectTheme = false }) => {
  const theme = useTheme();
  const [_themeType, setThemeType] = useState<string>(themeType);
  const [customTheme, setCustomTheme] = useState<UIThemes>(theme);

  const [allThemes, setAllThemes] = useState<Partial<AllThemesConfig>>({
    themes: themes && themes.length > 0 ? themes : Themes.getPresets(),
  });

  const setTheme = (type: string) => {
    setThemeType(type);
    if (detectTheme) {
      setCookie(null, THEME_COOKIE_NAME, type, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  };

  const currentTheme = useMemo<UIThemes>(() => {
    const theme = allThemes.themes?.find(item => item.type === _themeType);
    if (theme) return theme;
    return Themes.getPresetStaticTheme();
  }, [themes, _themeType]);

  useEffect(() => {
    if (!themes?.length) return;
    setAllThemes({ themes });
  }, [themes]);

  useEffect(() => {
    if (detectTheme) {
      const cookies = parseCookies();
      if (cookies && cookies[THEME_COOKIE_NAME] && cookies[THEME_COOKIE_NAME] != _themeType) {
        setThemeType(cookies[THEME_COOKIE_NAME]);
      }
    }
  }, []);

  const updateCustomTheme = (nextTheme: DeepPartial<UIThemes>) => {
    const mergedTheme = Themes.create(theme, { ...nextTheme, type: CUSTOM_THEME_TYPE });
    setCustomTheme(mergedTheme);
    setCustomTheme && setCustomTheme(mergedTheme);
  };

  const config: AllThemesConfig = useMemo(
    () => ({
      customTheme,
      updateCustomTheme,
      themeType: _themeType,
      setTheme,
      themes,
    }),
    [_themeType],
  );

  return (
    <AllThemesContext.Provider value={config}>
      <ThemeContext.Provider value={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </AllThemesContext.Provider>
  );
};

export default ThemeProvider;
