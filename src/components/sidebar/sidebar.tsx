'use client';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useConfigs } from '../use-context/config-context';
import useLayout from '../use-layout';
import useScale from '../use-scale';

export interface SidebarProps {
  header?: React.ReactNode;
}

const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = ({ children, ...props }) => {
  const layout = useLayout();
  const pathname = usePathname();
  const boxRef = useRef<HTMLDivElement>(null);
  const { sidebarScrollHeight, updateSidebarScrollHeight } = useConfigs();
  const { SCALES } = useScale();

  useEffect(() => {
    if (!boxRef.current) return;
    updateSidebarScrollHeight?.(boxRef.current.scrollTop || 0);
  }, [pathname]);

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.scrollTo({ top: sidebarScrollHeight });
  }, [boxRef.current]);

  return (
    <div ref={boxRef} className="sides box">
      {props.header}
      {children}
      <style jsx>{`
        .sides {
          width: 100%;
        }
        .box {
          overflow-y: auto;
          overflow-x: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${layout.gap};
          padding: ${SCALES.pt(0.5)} 0 ${SCALES.pb(0.5)} 0;
        }
        .box::-webkit-scrollbar {
          width: 0;
          background-color: transparent;
        }
        .box > :global(.item:first-child) {
          margin-top: ${layout.gap};
        }
        .box > :global(.item:last-child) {
          margin-bottom: ${layout.gap};
        }
      `}</style>
    </div>
  );
};

Sidebar.displayName = 'HimalayaSidebar';
export default Sidebar;
