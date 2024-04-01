'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { MobileMenuProps } from '.';
import Drawer, { DrawerProps } from '../drawer';
import { InnerScroll } from '../scroll';
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context';
import useScale, { ScaleResponsiveParameter, withScale } from '../use-scale';

type NativeAttrs = Omit<DrawerProps, keyof MobileMenuProps>;
export type MobileMenuPropsNative = MobileMenuProps & NativeAttrs;

const MobileMenu: React.FC<PropsWithChildren<MobileMenuPropsNative>> = ({ children, direction = 'left', animationTime = 300, ...props }) => {
  const { getScaleProps } = useScale();
  const { isEnabled, setIsEnabled, setDirection } = useMobileMenu();

  let scaleW = getScaleProps('w') as ScaleResponsiveParameter;

  if (scaleW == undefined) {
    scaleW = '80%';
  }

  useEffect(() => {
    setDirection(direction);
  }, [direction]);

  return (
    <Drawer
      transitionTime={animationTime}
      r={0}
      w={scaleW}
      visible={isEnabled}
      wrapClassName={'mobilemenu-drawer-nav'}
      onClose={() => {
        setIsEnabled(false);
      }}
      placement={direction}
      {...props}
    >
      <div className="mobilemenu-nav-content">
        <InnerScroll w={'100%'} h={'100%'} type="vertical">
          {children}
        </InnerScroll>

        <style jsx global>{`
          .mobilemenu-drawer-nav {
            padding: 0 !important;
          }
          .mobilemenu-nav-content {
            text-align: left;
            height: 100%;
            position: relative;
            overflow: hidden;
            width: 100%;
          }
        `}</style>
        <style jsx>{`
          .mobilemenu-nav-content .inner-container {
            display: flex;
          }

          .mobilemenu-nav-content .sub-group ~ .item {
            margin-left: 5px !important;
            border-left: 1px solid var(--color-border-1000);
          }
        `}</style>
      </div>
    </Drawer>
  );
};
MobileMenu.displayName = 'HimalayaMobileMenu';
export default withScale(MobileMenu);
