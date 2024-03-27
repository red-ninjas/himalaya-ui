'use client';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useConfigs } from '../use-config/config-context';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export interface SidebarProps {
  header?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof SidebarProps>;
export type SidebarPropsNative = SidebarProps & NativeAttrs;

const Sidebar: React.FC<PropsWithChildren<SidebarPropsNative>> = ({ children, header, className, ...props }) => {
  const pathname = usePathname();
  const boxRef = useRef<HTMLDivElement>(null);
  const { sidebarScrollHeight, updateSidebarScrollHeight } = useConfigs();
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

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
      {header}
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
            right: 0,
            bottom: 1,
            left: 0,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          `sidebar-inner`,
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, `sidebar-inner`)}
        ${SCALER('sidebar-inner')}
      `}</style>
    </div>
  );
};

Sidebar.displayName = 'HimalayaSidebar';
export default withScale(Sidebar);
