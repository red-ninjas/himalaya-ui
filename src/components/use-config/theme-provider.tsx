'use client';

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useConfigs } from '.';
import Themes from '../themes';
import { UIThemes } from '../themes/presets';
import { AllThemesConfig, AllThemesContext } from '../use-all-themes/all-themes-context';
import { ThemeContext } from '../use-theme/theme-context';
import { hexToRgb } from '../utils/color';
import _ from 'lodash';

export interface Props {
  themeType?: string;
  themes?: Array<UIThemes>;
  inline?: boolean;
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children, themeType, themes, inline = true }) => {
  const { themes: themesFromConfig, themeType: themeTypeFromConfig } = useConfigs();

  const currentThemes = themes ?? themesFromConfig;
  const configThemeType = themeType ?? themeTypeFromConfig;
  const [allThemes, setAllThemes] = useState<AllThemesConfig>({
    themes: currentThemes && currentThemes.length > 0 ? currentThemes : Themes.getPresets(),
  });

  const currentTheme = useMemo<UIThemes>(() => {
    const theme = allThemes.themes.find(item => item.type === configThemeType);
    if (theme) return theme;
    return Themes.getPresetStaticTheme();
  }, [allThemes, configThemeType]);

  useEffect(() => {
    if (!currentThemes?.length) return;
    setAllThemes({ themes: currentThemes });
  }, [currentThemes]);

  return (
    <AllThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>
    </AllThemesContext.Provider>
  );
};

export default ThemeProvider;
