'use client';

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useConfigs } from '.';
import Themes from '../themes';
import { UIThemes } from '../themes/presets';
import { AllThemesConfig, AllThemesContext } from '../use-all-themes/all-themes-context';
import { ThemeContext } from '../use-theme/theme-context';
import { hexToRgb, isColorVariable } from '../utils/color';
import css from 'styled-jsx/css';

export interface Props {
  themeType?: string;
  themes?: Array<UIThemes>;
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children, themeType, themes }) => {
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

  const generateColors = Object.keys(currentTheme.palette).filter(key => isColorVariable(currentTheme.palette[key]));

  let colorClasses: string = ``;
  let vars: string = ``;

  for (const key of generateColors) {
    const value = currentTheme.palette[key];

    let colorClassesTemp: string = ``;

    for (const colorKey of Object.keys(value)) {
      vars += css`
      --theme-color-${key}-${colorKey.replace('hex_', '')}: ${value[colorKey]};
      `;

      vars += css`
      --theme-color-${key}-${colorKey.replace('hex_', '')}-rgb: ${hexToRgb(value[colorKey])};
      `;

      colorClassesTemp += css`
        --theme-color-${colorKey.replace('hex_', '')}: var(--theme-color-${key}-${colorKey});
      `;
    }
    colorClasses += css`
      .color-${key} {
        ${colorClassesTemp}
      }
    `;
  }

  return (
    <div className="theme">
      <AllThemesContext.Provider value={allThemes}>
        <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>
      </AllThemesContext.Provider>
      <style jsx>{`
        .theme {
          ${vars}
          ${colorClasses}
        }
      `}</style>
    </div>
  );
};

export default ThemeProvider;
