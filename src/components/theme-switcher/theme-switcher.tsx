'use client';

import React from 'react';
import Button, { ButtonProps } from '../button';
import MoonIcon from '../icons/moon';
import SunIcon from '../icons/sun';
import { useConfig } from '../use-config/config-context';
import { ScaleProps } from '../use-scale';

const ThemeSwitcherComponent: React.FC<ButtonProps & ScaleProps> = ({ ...props }) => {
  const { themeType, setTheme } = useConfig();

  const icon = themeType === 'dark' ? <SunIcon /> : <MoonIcon />;
  const switchThemeOnClick = () => {
    document.body.classList.add('font-light');

    setTheme(themeType === 'dark' ? 'light' : 'dark');
  };
  return <Button {...props} auto scale={2 / 3} px={0.6} iconRight={icon} onClick={switchThemeOnClick} title={'Switch theme'} />;
};
const ThemeSwitcher = ThemeSwitcherComponent;
export default ThemeSwitcher;
