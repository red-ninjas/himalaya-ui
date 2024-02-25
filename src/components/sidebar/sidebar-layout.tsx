'use client';
import React, { createRef, useEffect, useState } from 'react';
import { pickChild } from '../utils/collections';
import { default as SidebarWithoutTypes } from './sidebar';
import { Sidebar } from './types';

import Drawer from '../drawer';
import { DrawerPlacement } from '../drawer/helper';
import { InnerScroll } from '../scroll';
import { useConfigs } from '../use-config';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';
import useSidebar from '../use-sidebar';
import useTheme from '../use-theme';

export interface SidebarLayoutProps {
  hasBorder?: boolean;
  hideOnMobile?: boolean;
  placement?: DrawerPlacement;
  backgroundColor?: string;
}

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      const offsetHeight = ref?.current?.getBoundingClientRect() || undefined;
      if (offsetHeight) {
        const space = offsetHeight?.bottom - offsetHeight?.height;
        if (space !== height) {
          setHeight(space);
        }
      }
    });

    resizeObserver.observe(ref.current);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return height;
};

const SidebarLayout: React.FC<React.PropsWithChildren<SidebarLayoutProps>> = ({
  children,
  hasBorder = true,
  placement = 'right',
  hideOnMobile = true,
  backgroundColor,
}) => {
  const [content, sidebar] = pickChild(children, Sidebar);
  const [contentExtra, sidebarWithoutTypes] = pickChild(content, SidebarWithoutTypes);

  const { isEnabled, setIsEnabled } = useSidebar();

  const ref = createRef<HTMLDivElement>();
  const theme = useTheme();
  const layout = useLayout();
  const { isMobile } = useConfigs();
  const height = useRefDimensions(ref);
  const { SCALES } = useScale();
  const isActive = (isMobile && !hideOnMobile) || !isMobile;
  const sideBarWidth = SCALES.w(1, '285px');

  return (
    <>
      {isMobile && (
        <Drawer p={0} w={SCALES.w(1, '85%')} visible={isEnabled} wrapClassName={'sidebar-drawer'} onClose={() => setIsEnabled(false)} placement={placement}>
          <div className="sidebar-content">
            <InnerScroll w={'100%'} h={'100%'} type="vertical">
              {sidebar}
              {sidebarWithoutTypes}
            </InnerScroll>
          </div>
        </Drawer>
      )}

      <div className="layout" ref={ref}>
        {isActive && (
          <div className="sidebar-holder">
            <div
              className="sidebar"
              style={{
                height: height === undefined ? '100%' : `calc(100% - ${height}px)`,
              }}
            >
              <InnerScroll transparentBg={true} w={'100%'} h={'100%'} type="vertical">
                {sidebar}
                {sidebarWithoutTypes}
              </InnerScroll>
            </div>
          </div>
        )}
        <main className="main" style={{ width: !isActive ? '100%' : `calc(100% - ${sideBarWidth})` }}>
          {contentExtra}
        </main>
        <div className="border-right-holder">
          <div
            className="border-right"
            style={{
              height: height === undefined ? '100%' : `calc(100% - ${height}px)`,
            }}
          ></div>
        </div>
        <style jsx>{`
          .main {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            flex: 1;
            padding: 0;
          }

          :global(.sidebar-content) {
            text-align: left;
            height: 100%;
            positon: relative;
            overflow: hidden;
            width: 100%;
          }
          .sidebar-holder {
            width: ${sideBarWidth};
            min-width: ${sideBarWidth};
            position: relative;
            height: 100%;
          }

          .border-right-holder {
            position: relative;
            height: 100%;
            width: 0.5px;
          }

          .sidebar {
            height: 100%;
            position: fixed;
            width: ${sideBarWidth};
            z-index: 100;
            overflow: hidden;
            border-right: ${hasBorder ? '1px solid ' + theme.palette.border : '0px solid transparent'};
            padding: 0;
            background: ${backgroundColor ? backgroundColor : 'transparent'};
          }

          :global(.sidebar-drawer) {
            max-width: 85% !important;
            min-width: 85% !important;
          }
          .layout {
            min-height: 100%;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;
            position: relative;
            padding: ${SCALES.pt(0)} ${SCALES.pr(1)} ${SCALES.pb(0)} ${SCALES.pl(1)};
          }

          .border-right {
            position: fixed;
            height: 100%;
            width: 0.5px;
            background: ${hasBorder ? theme.palette.border : 'transparent'};
          }

          @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
            .sidebar-holder {
              display: ${hideOnMobile === true ? 'none' : 'block'};
            }
            .border-right-holder {
              display: ${hideOnMobile === true ? 'none' : 'block'};
            }
            .layout {
              padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            }
          }
        `}</style>
      </div>
    </>
  );
};

SidebarLayout.displayName = 'HimalayaSidebarLayout';
export default withScale(SidebarLayout);
