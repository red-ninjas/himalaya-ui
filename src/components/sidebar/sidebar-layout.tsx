'use client';
import React, { createRef, useEffect, useState } from 'react';
import { pickChild } from '../utils/collections';
import { default as SidebarWithoutTypes } from './sidebar';
import { Sidebar } from './types';

import useClasses from 'components/use-classes';
import { DrawerPlacement } from '../drawer/helper';
import { InnerScroll } from '../scroll';
import useScale, { withScale } from '../use-scale';
import useSidebar from '../use-sidebar';

export interface SidebarLayoutProps {
  placement?: DrawerPlacement;
  backgroundColor?: string;
}

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [yCoodinate, setYCoodinate] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      const boundingRect = ref?.current?.getBoundingClientRect();
      if (boundingRect != undefined) {
        console.log(boundingRect);
        const { y } = boundingRect;
        setYCoodinate(y + 'px');
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return yCoodinate;
};

const SidebarLayout: React.FC<React.PropsWithChildren<SidebarLayoutProps>> = ({ children, backgroundColor }) => {
  const [content, sidebar] = pickChild(children, Sidebar);
  const [contentExtra, sidebarWithoutTypes] = pickChild(content, SidebarWithoutTypes);

  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const chartOuterContainerRef = createRef<HTMLDivElement>();
  const { isEnabled } = useSidebar();

  const yCoordinate = useRefDimensions(chartOuterContainerRef);

  return (
    <div
      ref={chartOuterContainerRef}
      className={useClasses('layout', 'active', SCALE_CLASSES, {
        active: isEnabled,
      })}
    >
      <aside className="sidebar">
        <InnerScroll transparentBg={true} w={'100%'} h={'100%'} type="vertical">
          {sidebar}
          {sidebarWithoutTypes}
        </InnerScroll>
      </aside>
      <main className="main">{contentExtra}</main>

      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1;
          padding: 0;

          transition: all var(--sidebar-transition) ease;
          width: calc(100% - var(--sidebar-left));
          box-sizing: border-box;
          transform: translate(var(--sidebar-left));
        }

        .main.disabled {
          --sidebar-width: 100%;
        }

        .sidebar-holder-inner {
          position: absolute;
        }

        .sidebar {
          position: fixed;
          padding: 0;
          background: ${backgroundColor ? backgroundColor : 'transparent'};
          top: var(--sidebar-top);
          bottom: 0;
          overflow: hidden;
          transition: all var(--sidebar-transition) ease;
          transform: translateX(var(--sidebar-side));
          width: var(--sidebar-width);
        }

        :global(.sidebar-drawer) {
          max-width: 85% !important;
          min-width: 85% !important;
        }

        .layout {
          clip-path: inset(0);

          min-height: 100%;
          justify-content: space-between;
          box-sizing: border-box;
          width: 100%;
          position: relative;
          width: calc(100% - var(--sidebar-width));
          --sidebar-top: ${yCoordinate};

          --sidebar-left: 0;
          --sidebar-side: calc(var(--sidebar-width) * -1);
          --sidebar-transition: 200ms;

          position: relative;
          width: 100%;
        }

        .layout.active {
          --sidebar-left: var(--sidebar-width);
          --sidebar-side: 0;
        }

        ${RESPONSIVE.w(17.8, value => `--sidebar-width: ${value}`, undefined, 'layout')}
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
