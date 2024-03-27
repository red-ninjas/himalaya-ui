'use client';
import React, { createRef, useEffect, useState } from 'react';
import { pickChild } from '../utils/collections';
import { default as SidebarWithoutTypes } from './sidebar';
import { Sidebar } from './types';

import useClasses from 'components/use-classes';
import { DrawerPlacement } from '../drawer/helper';
import { InnerScroll } from '../scroll';
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
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  return (
    <div className={useClasses('sidebar-layout')} ref={ref}>
      <div className={useClasses('sidebar-holder', SCALE_CLASSES)}>
        <div className="sidebar">
          <InnerScroll transparentBg={true} w={'100%'} h={'100%'} type="vertical">
            {sidebar}
            {sidebarWithoutTypes}
          </InnerScroll>
        </div>
      </div>
      <main className="main">{contentExtra}</main>

      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1;
          box-sizing: border-box;

          padding: 0;
          width: 100%;
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
          box-sizing: border-box;
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
          box-sizing: border-box;
        }

        :global(.sidebar-drawer) {
          max-width: 85% !important;
          min-width: 85% !important;
        }
        .sidebar-layout {
          min-height: 100%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          width: 100%;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          border-right: 1px solid ${hasBorder ? theme.palette.border.hex_1000 : 'transparent'};
        }

        ${RESPONSIVE.w(17.8, value => `--sidebar-width: ${value}`, undefined, 'sidebar-layout')}
        ${RESPONSIVE.padding(
          {
            top: 0,
            left: 1,
            right: 1,
            bottom: 0,
          },
          value => `--sidebar-padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'sidebar-layout',
        )}
        ${SCALER('sidebar-layout')}
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
