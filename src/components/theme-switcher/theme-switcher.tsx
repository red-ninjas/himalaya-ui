'use client';

import React from 'react';
import Button from '../button';
import MoonIcon from '../icons/moon';
import SunIcon from '../icons/sun';
import { useConfigs } from '../use-context/config-context';
import { withScale } from '../use-scale';

const ThemeSwitcherComponent: React.FC<unknown> = () => {
  const { themeType, setTheme } = useConfigs();

  const icon = themeType === 'dark' ? <SunIcon /> : <MoonIcon />;
  const switchThemeOnClick = () => {
    setTheme(themeType === 'dark' ? 'light' : 'dark');
  };
  return <Button w="28px" h="28px" py={0} px={0} icon={icon} onClick={switchThemeOnClick} title={'Switch theme'} />;
};
const ThemeSwitcher = withScale(ThemeSwitcherComponent);
export default ThemeSwitcher;
