'use client';
import React from 'react';
import Themes from '../themes';
import { UIThemes } from '../themes/presets';

const defaultTheme = Themes.getPresetStaticTheme();
export const ThemeContext: React.Context<UIThemes> = React.createContext<UIThemes>(defaultTheme);
export const useTheme = (): UIThemes => React.useContext<UIThemes>(ThemeContext);
