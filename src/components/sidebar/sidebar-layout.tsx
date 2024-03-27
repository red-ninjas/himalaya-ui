'use client';
import React, { createRef, useEffect, useState } from 'react';
import { pickChild } from '../utils/collections';
import { default as SidebarWithoutTypes } from './sidebar';
import { Sidebar } from './types';

import { DrawerPlacement } from '../drawer/helper';
import { InnerScroll } from '../scroll';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

export interface SidebarLayoutProps {
  hasBorder?: boolean;
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

const SidebarLayout: React.FC<React.PropsWithChildren<SidebarLayoutProps>> = ({ children, hasBorder = true, backgroundColor }) => {
  const [content, sidebar] = pickChild(children, Sidebar);
  const [contentExtra, sidebarWithoutTypes] = pickChild(content, SidebarWithoutTypes);

  const ref = createRef<HTMLDivElement>();
  const theme = useTheme();
  const layout = useLayout();
  const height = useRefDimensions(ref);
  const { RESPONSIVE, SCALER } = useScale();

  return (
    <div className="layout" ref={ref}>
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
      <main className="main">{contentExtra}</main>
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
          width: var(--sidebar-width);
        }

        .main.disabled {
          --sidebar-width: 100%;
        }

        :global(.sidebar-content) {
          text-align: left;
          height: 100%;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .sidebar-holder {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
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
          width: var(--sidebar-width);
          z-index: 100;
          overflow: hidden;
          border-right: ${hasBorder ? '1px solid ' + theme.palette.border.hex_1000 : '0px solid transparent'};
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
          padding: var(--sidebar-padding);,
          width: calc(100% - var(--sidebar-width));
        }

        .border-right {
          position: fixed;
          height: 100%;
          width: 0.5px;
          background: ${hasBorder ? theme.palette.border.hex_1000 : 'transparent'};
        }

        ${RESPONSIVE.w(17.8, value => `--sidebar-width: ${value}`, undefined, 'layout')}
        ${RESPONSIVE.padding(
          {
            top: 0,
            left: 1,
            right: 1,
            bottom: 0,
          },
          value => `--sidebar-padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'layout',
        )}
        ${SCALER('layout')}
      `}</style>
    </div>
  );
};

/*

       @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
          .layout {
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          }
        }
     .sidebar-holder {
            display: ${hideOnMobile === true ? 'none' : 'block'};
          }
          .border-right-holder {
            display: ${hideOnMobile === true ? 'none' : 'block'};
          }
          */
SidebarLayout.displayName = 'HimalayaSidebarLayout';
export default withScale(SidebarLayout);
