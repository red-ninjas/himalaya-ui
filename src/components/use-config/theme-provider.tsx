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

  const makeColors = Object.keys(currentTheme.palette).filter(key => isColorVariable(currentTheme.palette[key]));

  const [colorClasses, vars] = useMemo(() => {
    let colorClasses: string = ``;
    let vars: string = ``;

    for (const key of makeColors) {
      const value = currentTheme.palette[key];

      let colorClassesTemp: string = ``;
      for (const colorKey of Object.keys(value)) {
        vars += `
        --color-${key}-${colorKey.replace('hex_', '')}: ${value[colorKey]};
        `;

        vars += `
        --color-${key}-${colorKey.replace('hex_', '')}-rgb: ${hexToRgb(value[colorKey])};
        `;

        colorClassesTemp += `
          --color-${colorKey.replace('hex_', '')}: var(--color-${key}-${colorKey});
        `;
      }
      colorClasses += `
        .color-${key} {
          ${colorClassesTemp}
        }
      `;
    }

    return [colorClasses, vars];
  }, [currentTheme]);

  return (
    <AllThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>
        {inline ? (
          <div className="theme">
            {children}
            <style jsx>
              {`
                .theme {
                  width: 100%;
                  height: 100%;
                  ${vars}
                }
              `}
            </style>
          </div>
        ) : (
          <>
            {children}
            <style jsx global>
              {`
                html {
                  ${vars}
                }

                ${colorClasses}
              `}
            </style>
          </>
        )}
      </ThemeContext.Provider>
    </AllThemesContext.Provider>
  );
};

export default ThemeProvider;
