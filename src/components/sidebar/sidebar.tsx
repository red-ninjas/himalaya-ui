'use client';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useConfigs } from '../use-config/config-context';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute, withScale } from '../use-scale';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import { isCSSNumberValue } from '../utils/collections';

export interface SidebarProps {
  header?: React.ReactNode;
  hasBorder?: boolean;
  gap?: ScaleResponsiveParameter<number | string>;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof SidebarProps>;
export type SidebarPropsNative = SidebarProps & NativeAttrs;

const Sidebar: React.FC<PropsWithChildren<SidebarPropsNative>> = ({ children, hasBorder = true, gap = 1, className, ...props }) => {
  const pathname = usePathname();
  const boxRef = useRef<HTMLDivElement>(null);
  const { sidebarScrollHeight, updateSidebarScrollHeight } = useConfigs();
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const layout = useLayout();

  useEffect(() => {
    if (!boxRef.current) return;
    updateSidebarScrollHeight?.(boxRef.current.scrollTop || 0);
  }, [pathname]);

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.scrollTo({ top: sidebarScrollHeight });
  }, [boxRef.current]);

  return (
    <div ref={boxRef} {...props} className={useClasses('sidebar-inner', className, SCALE_CLASSES)}>
      {children}
      <style jsx>{`
        .sidebar-inner {
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--layout-gap);

          border-color: var(--color-border-1000);
          border-width: 0 ${hasBorder ? '1px' : '0'} 0 0;
          border-style: solid;
        }
        .sidebar-inner::-webkit-scrollbar {
          width: 0;
          background-color: transparent;
        }

        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'sidebar-inner')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, '100%', 'sidebar-inner')}
        ${RESPONSIVE.padding(
          {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          `var(--layout-page-margin)`,
          `sidebar-inner`,
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, `sidebar-inner`)}

        ${customResponsiveAttribute(gap, 'sidebar-inner', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `gap: ${value};` : `gap: calc(var(--scale-unit-scale) * ${value})`,
        )}
        ${SCALER('sidebar-inner')}
      `}</style>
    </div>
  );
};

Sidebar.displayName = 'HimalayaSidebar';
export default withScale(Sidebar);
