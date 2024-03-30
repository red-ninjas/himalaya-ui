'use client';

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useConfigs } from '.';
import Themes from '../themes';
import { UIThemes } from '../themes/presets';
import { AllThemesConfig, AllThemesContext } from '../use-all-themes/all-themes-context';
import { ThemeContext } from '../use-theme/theme-context';
import { hexToRgb } from '../utils/color';

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

  const [colorClasses, vars] = useMemo(() => {
    let colorClasses: string = ``;
    let vars: string = ``;

    vars += `
  --theme-font-sans: ${currentTheme.font.sans};
  --theme-font-mono: ${currentTheme.font.mono};
  --theme-font-prism: ${currentTheme.font.prism};
  --theme-font-base-size: ${currentTheme.font.baseSize};
  --theme-font-heading-factor: ${currentTheme.font.headingFactor};
  --theme-font-line-height-base: ${currentTheme.font.baseLineHeight};
`;
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

        if (key === 'background') {
          colorClasses += `
        .color-default {
          --color-base: var(--color-background-1000);
          --color-base-rgb: var(--color-background-1000-rgb);
          --color-contrast: var(--color-foreground-1000);
          --color-contrast-rgb: var(--color-foreground-1000-rgb);

          --color-shade: var(--color-background-900);
          --color-shade-rgb: var(--color-background-900-rgb);
          --color-tint: var(--color-background-800);
          --color-tint-rgb: var(--color-background-800-rgb);

          --color-border:var(--color-border-1000);
          --color-shade-border: var(--color-border-800);
          --color-tint-border:var(--color-border-600);

          --color-border-rgb:var(--color-border-1000-rgb);
          --color-shade-border-rgb: var(--color-border-800-rgb);
          --color-tint-border-rgb:var(--color-border-600-rgb);
        }

        .color-dark {
          --color-base: var(--color-foreground-1000);
          --color-base-rgb: var(--color-foreground-1000-rgb);
          --color-contrast: var(--color-background-1000);
          --color-contrast-rgb: var(--color-background-1000-rgb);

          --color-shade: var(--color-foreground-900);
          --color-shade-rgb: var(--color-foreground-900-rgb);
          --color-tint: var(--color-foreground-700);
          --color-tint-rgb: var(--color-foreground-700-rgb);

          --color-border:var(--color-border-1000);
          --color-shade-border: var(--color-border-800);
          --color-tint-border:var(--color-border-600);

          --color-border-rgb:var(--color-border-1000-rgb);
          --color-shade-border-rgb: var(--color-border-800-rgb);
          --color-tint-border-rgb:var(--color-border-600-rgb);
        }

        .color-abort {
          --color-base: transparent;
          --color-contrast: var(--color-foreground-1000);
          --color-contrast-rgb: var(--color-foreground-1000-rgb);

          --color-shade: var(--color-background-900);
          --color-tint: var(--color-background-700);

          --color-shade-rgb: var(--color-background-900-rgb);
          --color-tint-rgb: var(--color-background-700-rgb);

          --color-shade-border: var(--color-base);
          --color-tint-border: var(--color-base);

          --color-border: var( --color-base);
        }
      `;
        }

        if (value['hex_1200'] !== 'undefined') {
          colorClasses += `
          .color-${key} {
            --color-base: var(--color-${key}-1000);
            --color-base-rgb: var(--color-${key}-1000-rgb);
            --color-contrast: var(--color-${key}-contrast);
            --color-contrast-rgb: var(--color-${key}-contrast-rgb);
            --color-shade: var(--color-${key}-1200);
            --color-tint: var(--color-${key}-800);
            --color-shade-rgb: var(--color-${key}-1200-rgb);
            --color-tint-rgb: var(--color-${key}-800-rgb);
            --color-shade-border: var(--color-shade);
            --color-tint-border: var(--color-tint);
            --color-border: var(--color-base);
            --color-border-rgb:var(--color-base-rgb);
            --color-shade-border-rgb:var(--color-shade-rgb);
            --color-tint-border-rgb:var(--color-tint-rgb);
          }
        `;
        }
      }
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
