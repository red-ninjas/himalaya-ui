'use client';
import React, { createRef, useEffect, useState } from 'react';
import { pickChild } from '../utils/collections';
import { default as SidebarWithoutTypes } from './sidebar';
import { Sidebar } from './types';

import useClasses from 'components/use-classes';
import { DrawerPlacement } from '../drawer/helper';
import { InnerScroll } from '../scroll';
import useLayout from '../use-layout';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute, withScale } from '../use-scale';
import useSidebar from '../use-sidebar';

export interface SidebarLayoutProps {
  placement?: DrawerPlacement;
  backgroundColor?: string;
  disabled?: ScaleResponsiveParameter<boolean>;
}

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [yCoodinate, setYCoodinate] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setYCoodinate((ref.current as HTMLDivElement).offsetTop);

    const resizeObserver = new ResizeObserver(() => {
      if (ref?.current) {
        setYCoodinate((ref.current as HTMLDivElement).offsetTop);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return yCoodinate;
};

const SidebarLayout: React.FC<React.PropsWithChildren<SidebarLayoutProps>> = ({ children, disabled, backgroundColor }) => {
  const [content, sidebar] = pickChild(children, Sidebar);
  const [contentExtra, sidebarWithoutTypes] = pickChild(content, SidebarWithoutTypes);

  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const chartOuterContainerRef = createRef<HTMLDivElement>();
  const { isEnabled } = useSidebar();

  const offset = useRefDimensions(chartOuterContainerRef);
  const layout = useLayout();

  return (
    <div
      ref={chartOuterContainerRef}
      className={useClasses('sidebar-layout', CLASS_NAMES, {
        disabled: isEnabled === false,
        enabled: isEnabled === true,
      })}
    >
      <aside className="sidebar">
        <InnerScroll transparentBg={true} w={'100%'} h={'100%'} type="vertical">
          {sidebar}
          {sidebarWithoutTypes}
        </InnerScroll>
      </aside>
      <main className="sidebar-content">{contentExtra}</main>

      <style jsx>{`
        .sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1;
          padding: 0;

          transition: transform var(--sidebar-transition) ease;
          width: calc(100% - var(--sidebar-left));
          box-sizing: border-box;
          transform: translate(var(--sidebar-left));
        }

        .sidebar-content.disabled {
          --sidebar-width: 100%;
        }

        .sidebar-holder-inner {
          position: absolute;
        }

        .sidebar {
          position: fixed;
          padding: 0;
          background: ${backgroundColor ? backgroundColor : 'transparent'};
          height: calc(100% - var(--sidebar-height));
          overflow: hidden;
          transition: transform var(--sidebar-transition) ease;
          transform: translateX(var(--sidebar-side));
          width: var(--sidebar-width);
        }

        .sidebar-layout {
          clip-path: inset(0);

          min-height: 100%;
          justify-content: space-between;
          box-sizing: border-box;
          width: 100%;
          position: relative;
          width: calc(100% - var(--sidebar-width));
          --sidebar-height: ${offset}px;

          --sidebar-transition: 200ms;
          --sidebar-left: var(--sidebar-width);
          --sidebar-side: 0;

          position: relative;
          width: 100%;
        }

        .sidebar-layout.disabled {
          --sidebar-left: 0;
          --sidebar-side: calc(var(--sidebar-width) * -1);
        }
        .sidebar-layout.enabled {
          --sidebar-left: var(--sidebar-width);
          --sidebar-side: 0;
        }

        ${customResponsiveAttribute(disabled, 'sidebar-layout', layout.breakpoints, (value, key) =>
          value === true ? ` --sidebar-left: 0; --sidebar-side: calc(var(--sidebar-width) * -1);` : `--sidebar-left: var(--sidebar-width); --sidebar-side: 0;`,
        )}
        ${SCALE.w(17.8, value => `--sidebar-width: ${value}`, undefined, 'sidebar-layout')}
        ${UNIT('sidebar-layout')}
      `}</style>
    </div>
  );
};

SidebarLayout.displayName = 'HimalayaSidebarLayout';
export default withScale(SidebarLayout);
