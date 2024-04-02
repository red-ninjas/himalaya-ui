'use client';

import React from 'react';
import Button, { ButtonProps } from '../button';
import MenuIcon from '../icons/menu';
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context';
import { ScaleProps } from '../use-scale';
import { MobileMenuButtonProps } from './index';

const MobileMenuButton: React.FC<MobileMenuButtonProps & ButtonProps & ScaleProps> = ({ ...props }) => {
  const { setIsEnabled } = useMobileMenu();

  return (
    <Button
      {...props}
      scale={2 / 3}
      px={0.6}
      auto
      iconRight={<MenuIcon></MenuIcon>}
      onClick={() => {
        setIsEnabled(true);
      }}
    ></Button>
  );
};

export default MobileMenuButton;
