'use client';

import React from 'react';
import Button from '../button';
import MoonIcon from '../icons/moon';
import SunIcon from '../icons/sun';
import useAllThemes from '../use-all-themes';
import { useConfigs } from '../use-config/config-context';
import { withScale } from '../use-scale';

const ThemeSwitcherComponent: React.FC<unknown> = () => {
  const { themeType, setTheme } = useAllThemes();

  const icon = themeType === 'dark' ? <SunIcon /> : <MoonIcon />;
  const switchThemeOnClick = () => {
    setTheme(themeType === 'dark' ? 'light' : 'dark');
  };
  return <Button w="28px" h="28px" py={0} px={0} icon={icon} onClick={switchThemeOnClick} title={'Switch theme'} />;
};
const ThemeSwitcher = withScale(ThemeSwitcherComponent);
export default ThemeSwitcher;
