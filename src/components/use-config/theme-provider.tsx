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

  const colorKeys = Object.keys(currentTheme.palette);

  const [vars] = useMemo(() => {
    let vars: string = ``;

    for (const key of Object.keys(currentTheme.font)) {
      const kebabCaseString = _.kebabCase(key);
      vars += `--theme-font-${kebabCaseString}: ${currentTheme.font[key]};`;
    }

    for (const key of colorKeys) {
      const value = currentTheme.palette[key];

      if (key.startsWith('gradient_')) {
        const gradientIndex = key.replace('gradient_', '');
        vars += `
        --gradient-${gradientIndex}-from: ${value.from};
        --gradient-${gradientIndex}-to: ${value.to};
      `;
      } else {
        for (const colorKey of Object.keys(value)) {
          vars += `
          --color-${key}-${colorKey.replace('hex_', '')}: ${value[colorKey]};
          --color-${key}-${colorKey.replace('hex_', '')}-rgb: ${hexToRgb(value[colorKey])};
          `;
        }
      }
    }

    return [vars];
  }, [currentTheme.font, currentTheme.palette]);

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
              `}
            </style>
          </>
        )}
      </ThemeContext.Provider>
    </AllThemesContext.Provider>
  );
};

export default ThemeProvider;
