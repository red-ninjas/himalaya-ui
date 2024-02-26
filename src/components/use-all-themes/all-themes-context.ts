'use client';
import React from 'react';
import Themes from '../themes/themes';
import { UIThemes } from '../themes/presets';
import { DeepPartial } from '../utils/types';

export type AllThemesConfig = {
  themes: Array<UIThemes>;
  setTheme: (type: string) => void;
  themeType?: string | 'dark' | 'light';
  customTheme: DeepPartial<UIThemes>;
  updateCustomTheme: (theme: DeepPartial<UIThemes>) => void;
};

const defaultAllThemesConfig = {
  themes: Themes.getPresets(),
  setTheme: () => {},
  themeType: 'dark',
  customTheme: {},
  updateCustomTheme: () => {},
};

export const AllThemesContext: React.Context<AllThemesConfig> = React.createContext<AllThemesConfig>(defaultAllThemesConfig);

export const useAllThemes = (): AllThemesConfig => React.useContext<AllThemesConfig>(AllThemesContext);
