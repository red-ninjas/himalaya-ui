'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { MobileMenuProps } from '.';
import Drawer from '../drawer';
import { InnerScroll } from '../scroll';
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof MobileMenuProps>;
export type MobileMenuPropsNative = MobileMenuProps & NativeAttrs;

const MobileMenu: React.FC<PropsWithChildren<MobileMenuPropsNative>> = ({ children, direction = 'left', animationTime = 300, ...props }) => {
  const { SCALES } = useScale();
  const theme = useTheme();

  const { isEnabled, setIsEnabled, setDirection } = useMobileMenu();

  useEffect(() => {
    setDirection(direction);
  }, [direction]);

  return (
    <>
      <Drawer
        transitionTime={animationTime}
        w={SCALES.w(1, '80%')}
        radius={0}
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
        </div>
      </Drawer>

      <style jsx>{`
        :global(.mobilemenu-drawer-nav) {
          padding: 0 !important;
        }
        :global(.mobilemenu-nav-content) {
          text-align: left;
          height: 100%;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .mobilemenu-nav-content .inner-container {
          display: flex;
        }

        .mobilemenu-nav-content .sub-group ~ .item {
          margin-left: 5px !important;
          border-left: 1px solid var(--theme-color-border-1000);
        }
      `}</style>
    </>
  );
};

export default withScale(MobileMenu);
