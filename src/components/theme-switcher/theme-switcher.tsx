'use client';

import React from 'react';
import Button from '../button';
import MoonIcon from '../icons/moon';
import SunIcon from '../icons/sun';
import { useConfigs } from '../use-config/config-context';
import { withScale } from '../use-scale';

const ThemeSwitcherComponent: React.FC<unknown> = () => {
  const { themeType, setTheme } = useConfigs();

  const icon = themeType === 'dark' ? <SunIcon /> : <MoonIcon />;
  const switchThemeOnClick = () => {
    setTheme(themeType === 'dark' ? 'light' : 'dark');
  };
  return <Button auto px={0.34} h={0.75} py={0} iconRight={icon} onClick={switchThemeOnClick} title={'Switch theme'} />;
};
const ThemeSwitcher = withScale(ThemeSwitcherComponent);
export default ThemeSwitcher;
