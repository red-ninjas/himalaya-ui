'use client';

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import Themes from '../themes';
import { UIThemes } from '../themes/presets';
import { ThemeContext } from '../use-theme/theme-context';
import { AllThemesConfig, AllThemesContext } from '../use-all-themes/all-themes-context';

export interface Props {
  themeType?: string;
  themes?: Array<UIThemes>;
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children, themeType, themes = [] }) => {
  const [allThemes, setAllThemes] = useState<AllThemesConfig>({
    themes: themes && themes.length > 0 ? themes : Themes.getPresets(),
  });

  const currentTheme = useMemo<UIThemes>(() => {
    const theme = allThemes.themes.find(item => item.type === themeType);
    if (theme) return theme;
    return Themes.getPresetStaticTheme();
  }, [allThemes, themeType]);

  useEffect(() => {
    if (!themes?.length) return;
    setAllThemes({ themes });
  }, [themes]);

  return (
    <AllThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>
    </AllThemesContext.Provider>
  );
};

export default ThemeProvider;
