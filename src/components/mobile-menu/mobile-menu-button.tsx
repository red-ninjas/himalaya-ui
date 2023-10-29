'use client';

import React from 'react';
import MenuIcon from '../icons/menu';
import { MobileMenuButtonProps } from './index';
import Button, { ButtonProps } from '../button';
import { useConfigs } from '../use-context';
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context';
import { ScaleProps, withScale } from '../use-scale';

const MobileMenuButton: React.FC<MobileMenuButtonProps & ButtonProps & ScaleProps> = ({ notHiding, toggleMenu, ...props }) => {
  const { isMobile } = useConfigs();
  const { setIsEnabled } = useMobileMenu();

  return (
    (isMobile || (!isMobile && notHiding)) && (
      <Button
        {...props}
        scale={2 / 3}
        px={0.6}
        auto
        iconRight={<MenuIcon></MenuIcon>}
        onClick={() => {
          toggleMenu?.() ?? setIsEnabled(true);
        }}
      ></Button>
    )
  );
};

export default withScale(MobileMenuButton);
